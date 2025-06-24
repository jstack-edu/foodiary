import { Profile } from '@application/entities/Profile';
import z from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(1, '"name" is required'),
  birthDate: z.string()
    .min(1, '"birthDate" is required')
    .date('"birthDate" should be a valid date (YYYY-MM-DD)')
    .transform(date => new Date(date)),
  gender: z.nativeEnum(Profile.Gender),
  height: z.number(),
  weight: z.number(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
