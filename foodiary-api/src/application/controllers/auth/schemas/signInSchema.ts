import z from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, '"email" is required').email('Invalid email'),
  password: z.string().min(8, '"password" should be at least 8 characters long'),
});

export type SignInBody = z.infer<typeof signInSchema>;
