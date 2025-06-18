import 'reflect-metadata';

import { GetMeController } from '@application/controllers/accounts/GetMeController';
import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

const controller = Registry.getInstance().resolve(GetMeController);

export const handler = lambdaHttpAdapter(controller);
