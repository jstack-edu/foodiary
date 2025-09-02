import 'reflect-metadata';

import { UpdateGoalController } from '@application/controllers/goals/UpdateGoalController';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

export const handler = lambdaHttpAdapter(UpdateGoalController);
