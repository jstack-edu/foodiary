import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class CreateMealUseCase {
  async execute(): Promise<any> {
    return {
      CreateMealUseCase: 'CREATE MEAL!!!',
    };
  }
}
