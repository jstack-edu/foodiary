import { getFileInfo } from '@app/lib/getFileInfo';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { size, type, filename } = await getFileInfo(fileUri);

      console.log({
        size, type, filename,
      });

      // const { mealId } = await MealsService.createMeal({
      //   file: {
      //     size,
      //     type,
      //     name: filename,
      //     uri: fileUri,
      //   },
      // });

      // return { mealId };
    },
  });

  return {
    createMeal: mutateAsync,
    isLoading: isPending,
    createdMealId: data?.mealId,
  };
}
