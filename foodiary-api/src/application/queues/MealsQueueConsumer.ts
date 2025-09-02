import { IQueueConsumer } from '@application/contracts/IQueueConsumer';
import { ProcessMealUseCase } from '@application/usecases/meals/ProcessMealUseCase';
import { MealsQueueGateway } from '@infra/gateways/MealsQueueGateway';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class MealsQueueConsumer implements IQueueConsumer<MealsQueueGateway.Message> {
  constructor(private readonly processMealUseCase: ProcessMealUseCase) {}

  async process({ accountId, mealId }: MealsQueueGateway.Message): Promise<void> {
    await this.processMealUseCase.execute({ accountId, mealId });
  }
}
