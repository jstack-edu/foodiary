import z from 'zod';

export const confirmForgotPasswordSchema = z.object({
  email: z.string().min(1, '"email" is required').email('Invalid email'),
  confirmationCode: z.string().min(1, '"confirmationCode" is required'),
  password: z.string().min(8, '"password" should be at least 8 characters long'),
});

export type ConfirmForgotPasswordBody = z.infer<typeof confirmForgotPasswordSchema>;
