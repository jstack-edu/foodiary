import { useUpdateProfile } from '@app/hooks/mutations/useUpdateProfile';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Gender } from '@app/types/Gender';
import { formatDateToAPI } from '@ui/utils/formatDateToAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { editProfileSchema, EditProfileSchema } from './schema';

export function useEditProfileController() {
  const { top, bottom } = useSafeAreaInsets();
  const { account } = useAccount();
  const { updateProfile, isLoading } = useUpdateProfile();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: account?.profile.name ?? '',
      birthDate: account?.profile.birthDate ?? new Date(),
      height: String(account?.profile.height ?? ''),
      weight: String(account?.profile.weight ?? ''),
      gender: account?.profile.gender ?? Gender.MALE,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateProfile({
        name: data.name,
        birthDate: formatDateToAPI(data.birthDate),
        height: Number(data.height),
        weight: Number(data.weight),
        gender: data.gender,
      });

      Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    }
  });

  return {
    top,
    bottom,
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting || isLoading,
  };
}
