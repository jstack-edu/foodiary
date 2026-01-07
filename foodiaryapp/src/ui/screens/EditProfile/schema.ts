import { Gender } from '@app/types/Gender';
import z from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  birthDate: z.date({
    message: 'Informe a data de nascimento',
  }),
  height: z.string().min(1, 'Informe a altura'),
  weight: z.string().min(1, 'Informe o peso'),
  gender: z.enum(Gender),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
