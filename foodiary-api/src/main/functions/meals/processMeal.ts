import 'reflect-metadata';

import { MealsQueueConsumer } from '@application/queues/MealsQueueConsumer';
import { lambdaSQSAdapter } from '@main/adapters/lambdaSQSAdapter';

export const handler = lambdaSQSAdapter(MealsQueueConsumer);
