import z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, '"email" is required').email('Invalid email'),
});

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
