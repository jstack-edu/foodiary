import { Profile } from '@application/entities/Profile';

export class GoalCalculator {
  private static macroRatios: Record<Profile.Goal, GoalCalculator.MacroRatio> = {
    [Profile.Goal.LOSE]: {
      proteins: 2,
      fats: 0.8,
    },
    [Profile.Goal.GAIN]: {
      proteins: 2.2,
      fats: 1,
    },
    [Profile.Goal.MAINTAIN]: {
      proteins: 2,
      fats: 0.9,
    },
  } as const;

  private static activityMultipliers: Record<Profile.ActivityLevel, number> = {
    [Profile.ActivityLevel.SEDENTARY]: 1.2,
    [Profile.ActivityLevel.LIGHT]: 1.375,
    [Profile.ActivityLevel.MODERATE]: 1.55,
    [Profile.ActivityLevel.HEAVY]: 1.725,
    [Profile.ActivityLevel.ATHLETE]: 1.9,
  };

  static calculate(profile: Profile): GoalCalculator.CalculateGoalResult {
    const { weight, goal } = profile;
    const { proteins, fats } = this.macroRatios[goal];

    const calories = this.calcCalories(profile);

    const proteinGrams = Math.round(weight * proteins);
    const proteinCalories = proteinGrams * 4;

    const fatGrams = Math.round(weight * fats);
    const fatCalories = fatGrams * 9;

    const remainingCalories = calories - proteinCalories - fatCalories;

    const carbsGrams = Math.round(remainingCalories / 4);
    const carbsCalories = carbsGrams * 4;

    const realCalories = proteinCalories + fatCalories + carbsCalories;

    return {
      calories: realCalories,
      carbohydrates: carbsGrams,
      fats: fatGrams,
      proteins: proteinGrams,
    };
  }

  private static calcCalories({
    height,
    weight,
    gender,
    birthDate,
    activityLevel,
    goal,
  }: Profile): number {
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const age = today.getFullYear() - birthYear;

    // Basal Metabolic Rate
    const bmr =
      gender === Profile.Gender.MALE
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;

    // Total Daily Energy Expenditure
    const tdee = bmr * this.activityMultipliers[activityLevel];

    if (goal === Profile.Goal.MAINTAIN) {
      return Math.round(tdee);
    }

    if (goal === Profile.Goal.GAIN) {
      return Math.round(tdee + 500);
    }

    return Math.round(tdee - 500);
  }
}

export namespace GoalCalculator {
  export type CalculateGoalResult = {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };

  export type MacroRatio = {
    proteins: number;
    fats: number;
  };
}
