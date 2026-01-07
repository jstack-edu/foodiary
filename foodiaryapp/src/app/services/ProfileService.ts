import { Gender } from '@app/types/Gender';
import { Service } from './Service';

export class ProfileService extends Service {
  static async updateProfile(payload: ProfileService.UpdateProfilePayload): Promise<void> {
    await this.client.put('/profiles', payload);
  }
}

export namespace ProfileService {
  export type UpdateProfilePayload = {
    name: string;
    birthDate: string;
    height: number;
    weight: number;
    gender: Gender;
  };
}
