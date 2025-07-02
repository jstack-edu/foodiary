import { IFileEventHandler } from '@application/contracts/IFileEventHandler';
import { MealUploadedUseCase } from '@application/usecases/meals/MealUploadedUseCase';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class MealUploadedFileEventHandler implements IFileEventHandler {
  constructor(private readonly mealUploadedUseCase: MealUploadedUseCase) {}

  async handle({ fileKey }: IFileEventHandler.Input): Promise<void> {
    await this.mealUploadedUseCase.execute({ fileKey });
  }
}
