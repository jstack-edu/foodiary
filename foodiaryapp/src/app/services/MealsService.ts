import { Meal, SimplifiedMeal } from '@app/types/Meal';
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

    return {
      meals: data.meals.map(meal => ({
        ...meal,
        createdAt: new Date(meal.createdAt),
      })),
    };
  }

  static async getMealById(id: string): Promise<MealsService.GetMealByIdResponse> {
    const { data } = await this.client.get<MealsService.GetMealByIdResponse>(
      `/meals/${id}`,
    );

    return {
      meal: {
        ...data.meal,
        createdAt: new Date(data.meal.createdAt),
      },
    };
  }

  static async createMeal(
    payload: MealsService.CreateMealPayload,
  ): Promise<MealsService.CreateMealResponse> {
    const { data } = await this.client.post('/meals', payload);

    await this.uploadPresignedPOST({
      uploadSignature: data.uploadSignature,
      file: {
        type: payload.file.type,
        uri: payload.file.uri,
        name: payload.file.name,
      },
    });

    return {
      mealId: data.mealId,
    };
  }
}

export namespace MealsService {
  export type GetMealsByDateResponse = {
    meals: SimplifiedMeal[];
  };

  export type CreateMealPayload = {
    file: {
      type: 'audio/m4a' | 'image/jpeg';
      size: number;
      uri: string;
      name: string;
    };
  };

  export type CreateMealResponse = {
    mealId: string;
  };

  export type GetMealByIdResponse = {
    meal: Meal;
  }
}
