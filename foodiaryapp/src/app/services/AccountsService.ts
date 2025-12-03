import { Gender } from '@app/types/Gender';
import { Goal } from '@app/types/Goal';
import { Service } from './Service';

export class AccountsService extends Service {
  static async getMe(): Promise<AccountsService.GetMeResponse> {
    const { data } = await this.client.get<AccountsService.GetMeResponse>(
      '/me',
    );

    return {
      ...data,
      profile: {
        ...data.profile,
        birthDate: new Date(data.profile.birthDate),
      },
    };
  }
}

export namespace AccountsService {
  export type GetMeResponse = {
    profile: {
      name: string;
      birthDate: Date;
      gender: Gender;
      height: number;
      weight: number;
      goal: Goal;
    };
    goal: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    };
  };
}
