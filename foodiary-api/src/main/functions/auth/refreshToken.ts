import 'reflect-metadata';

import { RefreshTokenController } from '@application/controllers/auth/RefreshTokenController';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

export const handler = lambdaHttpAdapter(RefreshTokenController);
