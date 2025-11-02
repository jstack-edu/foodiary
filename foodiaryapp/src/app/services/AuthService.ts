import { ActivityLevel } from '@app/types/ActivityLevel';
import { Gender } from '@app/types/Gender';
import { Goal } from '@app/types/Goal';
import { Service } from './Service';

export class AuthService extends Service {
  static async signIn(
    payload: AuthService.SignInPayload,
  ): Promise<AuthService.SignInResponse> {
    const { data } = await this.client.post<AuthService.SignInResponse>(
      '/auth/sign-in',
      payload,
    );

    return data;
  }

  static async signUp(
    payload: AuthService.SignUpPayload,
  ): Promise<AuthService.SignUpResponse> {
    const { data } = await this.client.post<AuthService.SignUpResponse>(
      '/auth/sign-up',
      payload,
    );

    return data;
  }
}

export namespace AuthService {
  export type SignInPayload = {
    email: string;
    password: string;
  };

  export type SignInResponse = {
    accessToken: string;
    refreshToken: string;
  };

  export type SignUpPayload = {
    account: {
      email: string;
      password: string;
    };
    profile: {
      name: string;
      birthDate: string;
      gender: Gender;
      goal: Goal;
      height: number;
      weight: number;
      activityLevel: ActivityLevel;
    };
  }

  export type SignUpResponse = {
    accessToken: string;
    refreshToken: string;
  };
}
