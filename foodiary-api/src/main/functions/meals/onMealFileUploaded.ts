import 'reflect-metadata';

import { MealUploadedFileEventHandler } from '@application/events/files/MealUploadedFileEventHandler';
import { lambdaS3Adapter } from '@main/adapters/lambdaS3Adapter';

export const handler = lambdaS3Adapter(MealUploadedFileEventHandler);
