import { IQueueConsumer } from '@application/contracts/IQueueConsumer';
import { MealsQueueGateway } from '@infra/gateways/MealsQueueGateway';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class MealsQueueConsumer implements IQueueConsumer<MealsQueueGateway.Message> {
  async process({ accountId, mealId }: MealsQueueGateway.Message): Promise<void> {
    console.log(JSON.stringify({ accountId, mealId }, null, 2));
  }
}
