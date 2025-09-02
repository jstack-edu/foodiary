import 'reflect-metadata';

import { UpdateProfileController } from '@application/controllers/profiles/UpdateProfileController';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';

export const handler = lambdaHttpAdapter(UpdateProfileController);
