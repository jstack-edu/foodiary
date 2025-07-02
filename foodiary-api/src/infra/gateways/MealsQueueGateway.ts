import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '@infra/clients/sqsClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';

@Injectable()
export class MealsQueueGateway {
  constructor(private readonly config: AppConfig) {}

  async publish(message: MealsQueueGateway.Message) {
    const command = new SendMessageCommand({
      QueueUrl: this.config.queues.mealsQueueUrl,
      MessageBody: JSON.stringify(message),
    });

    await sqsClient.send(command);
  }
}

export namespace MealsQueueGateway {
  export type Message = {
    accountId: string;
    mealId: string;
  };
}
