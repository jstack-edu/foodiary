import { Service } from './Service';

export class GoalsService extends Service {
  static async updateGoals(payload: GoalsService.UpdateGoalsPayload): Promise<void> {
    await this.client.put('/goals', payload);
  }
}

export namespace GoalsService {
  export type UpdateGoalsPayload = {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };
}
