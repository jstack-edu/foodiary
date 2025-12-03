import { useMeals } from '@app/hooks/queries/useMeals';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useHomeController() {
  const [isRefreshig, setIsRefreshing] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const [date, setDate] = useState(new Date());

  const { isInitialLoading, meals, isLoading, reloadMeals } = useMeals(date);

  async function handleRefresh() {
    setIsRefreshing(true);
    await reloadMeals();
    setIsRefreshing(false);
  }

  function handleNextDay() {
    setDate(prevState => {
      const newDate = new Date(prevState);
      newDate.setDate(prevState.getDate() + 1);

      return newDate;
    });
  }

  function handlePreviousDay() {
    setDate(prevState => {
      const newDate = new Date(prevState);
      newDate.setDate(prevState.getDate() - 1);

      return newDate;
    });
  }

  return {
    isRefreshig,
    top,
    bottom,
    date,
    isInitialLoading,
    meals,
    isLoading: isLoading && !isRefreshig,
    handleRefresh,
    handleNextDay,
    handlePreviousDay,
  };
}
