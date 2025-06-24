import { Goal } from '@application/entities/Goal';
import { GetCommand, PutCommand, PutCommandInput, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { GoalItem } from '../items/GoalItem';

@Injectable()
export class GoalRepository {
  constructor(private readonly config: AppConfig) { }

  async findByAccountId(accountId: string): Promise<Goal | null> {
    const command = new GetCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: GoalItem.getPK(accountId),
        SK: GoalItem.getSK(accountId),
      },
    });

    const { Item: goalItem } = await dynamoClient.send(command);

    if (!goalItem) {
      return null;
    }

    return GoalItem.toEntity(goalItem as GoalItem.ItemType);
  }

  async save(goal: Goal) {
    const goalItem = GoalItem.fromEntity(goal).toItem();

    const command = new UpdateCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: goalItem.PK,
        SK: goalItem.SK,
      },
      UpdateExpression: 'SET #calories = :calories, #proteins = :proteins, #carbohydrates = :carbohydrates, #fats = :fats',
      ExpressionAttributeNames: {
        '#calories': 'calories',
        '#proteins': 'proteins',
        '#carbohydrates': 'carbohydrates',
        '#fats': 'fats',
      },
      ExpressionAttributeValues: {
        ':calories': goalItem.calories,
        ':proteins': goalItem.proteins,
        ':carbohydrates': goalItem.carbohydrates,
        ':fats': goalItem.fats,
      },
      ReturnValues: 'NONE',
    });

    await dynamoClient.send(command);
  }

  getPutCommandInput(goal: Goal): PutCommandInput {
    const goalItem = GoalItem.fromEntity(goal);

    return {
      TableName: this.config.db.dynamodb.mainTable,
      Item: goalItem.toItem(),
    };
  }

  async create(goal: Goal): Promise<void> {
    await dynamoClient.send(
      new PutCommand(this.getPutCommandInput(goal)),
    );
  }
}
