import 'reflect-metadata';

import { SignUpController } from '@application/controllers/auth/SignUpController';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

export const handler = lambdaHttpAdapter(SignUpController);
