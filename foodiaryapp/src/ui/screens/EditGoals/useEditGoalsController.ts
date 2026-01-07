import { useUpdateGoals } from '@app/hooks/mutations/useUpdateGoals';
import { useAccount } from '@app/hooks/queries/useAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { editGoalsSchema, EditGoalsSchema } from './schema';

export function useEditGoalsController() {
  const { top, bottom } = useSafeAreaInsets();
  const { account } = useAccount();
  const { updateGoals, isLoading } = useUpdateGoals();

  const form = useForm<EditGoalsSchema>({
    resolver: zodResolver(editGoalsSchema),
    defaultValues: {
      calories: String(account?.goal.calories ?? ''),
      carbohydrates: String(account?.goal.carbohydrates ?? ''),
      proteins: String(account?.goal.proteins ?? ''),
      fats: String(account?.goal.fats ?? ''),
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateGoals({
        calories: Number(data.calories),
        carbohydrates: Number(data.carbohydrates),
        proteins: Number(data.proteins),
        fats: Number(data.fats),
      });

      Alert.alert('Sucesso!', 'Metas atualizadas com sucesso');
    } catch (error) {
      console.error('Failed to update goals:', error);
      Alert.alert('Erro', 'Não foi possível atualizar as metas');
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
