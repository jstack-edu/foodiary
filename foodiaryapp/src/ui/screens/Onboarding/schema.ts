import { ActivityLevel } from '@app/types/ActivityLevel';
import { Gender } from '@app/types/Gender';
import { Goal } from '@app/types/Goal';
import z from 'zod';

export const onboardingSchema = z.object({
  goal: z.enum(Goal),
  gender: z.enum(Gender),
  birthDate: z.date(),
  height: z.string().min(1, 'Informe a sua altura'),
  weight: z.string().min(1, 'Informe o seu peso'),
  activityLevel: z.enum(ActivityLevel),
  account: z.object({
    name: z.string().min(1, 'Informe o seu nome'),
    email: z.email('Informe um e-mail válido'),
    password: z.string().min(8, 'Pelo menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a sua senha'),
  }).refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
      error: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  ),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
