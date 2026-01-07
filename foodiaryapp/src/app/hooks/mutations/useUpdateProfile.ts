import { queryClient } from '@app/lib/queryClient';
import { ProfileService } from '@app/services/ProfileService';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: ProfileService.UpdateProfilePayload) => {
      await ProfileService.updateProfile(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });

  return {
    updateProfile: mutateAsync,
    isLoading: isPending,
  };
}
