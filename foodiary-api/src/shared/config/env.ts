import { z } from 'zod';

const schema = z.object({
  // Cognito
  COGNITO_CLIENT_ID: z.string().min(1),
  COGNITO_CLIENT_SECRET: z.string().min(1),
  COGNITO_POOL_ID: z.string().min(1),

  // Database
  MAIN_TABLE_NAME: z.string().min(1),

  // Buckets
  MEALS_BUCKET: z.string().min(1),

  // CDN
  MEALS_CDN_DOMAIN_NAME: z.string().min(1),

  // Queues
  MEALS_QUEUE_URL: z.string().min(1),
});

export const env = schema.parse(process.env);
