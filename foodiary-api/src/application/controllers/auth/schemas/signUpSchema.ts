import { Profile } from '@application/entities/Profile';
import z from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    email: z.string().min(1, '"email" is required').email('Invalid email'),
    password: z.string().min(8, '"password" should be at least 8 characters long'),
  }),
  profile: z.object({
    name: z.string().min(1, '"name" is required'),
    birthDate: z.string()
      .min(1, '"birthDate" is required')
      .date('"birthDate" should be a valid date (YYYY-MM-DD)')
      .transform(date => new Date(date)),
    gender: z.nativeEnum(Profile.Gender),
    goal: z.nativeEnum(Profile.Goal),
    height: z.number(),
    weight: z.number(),
    activityLevel: z.nativeEnum(Profile.ActivityLevel),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
