import 'reflect-metadata';

import { ConfirmForgotPasswordController } from '@application/controllers/auth/ConfirmForgotPasswordController';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

export const handler = lambdaHttpAdapter(ConfirmForgotPasswordController);
