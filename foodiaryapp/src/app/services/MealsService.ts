import { Meal } from '@app/types/Meal';
import { Service } from './Service';

export class MealsService extends Service {
  static async getMealsByDate(date: string): Promise<MealsService.GetMealsByDateResponse> {
    const { data } = await this.client.get<MealsService.GetMealsByDateResponse>(
      '/meals',
      {
        params: {
          date,
        },
      },
    );

    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
      meals: data.meals.map(meal => ({
        ...meal,
        createdAt: new Date(meal.createdAt),
      })),
    };
  }
}

export namespace MealsService {
  export type GetMealsByDateResponse = {
    meals: Meal[];
  };
}
