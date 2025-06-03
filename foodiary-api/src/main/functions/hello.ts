import 'reflect-metadata';

import { HelloController } from '@application/controllers/HelloController';
import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

const controller = Registry.getInstance().resolve(HelloController);

export const handler = lambdaHttpAdapter(controller);
