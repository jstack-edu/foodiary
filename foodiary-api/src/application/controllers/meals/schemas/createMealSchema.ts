import { mbToBytes } from '@shared/utils/mbToBytes';
import z from 'zod';

export const createMealSchema = z.object({
  file: z.object({
    type: z.enum(['audio/m4a', 'image/jpeg']),
    size: z.number()
      .min(1, 'The file should have at least 1 byte.')
      .max(mbToBytes(10), 'The file shoud have up to 10MB.'),
  }),
});

export type CreateMealBody = z.infer<typeof createMealSchema>;
