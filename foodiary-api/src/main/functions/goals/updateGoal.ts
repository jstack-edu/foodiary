import 'reflect-metadata';

import { UpdateGoalController } from '@application/controllers/goals/UpdateGoalController';
import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

const controller = Registry.getInstance().resolve(UpdateGoalController);

export const handler = lambdaHttpAdapter(controller);
