import { SimplifiedMeal } from '@app/types/Meal';
import { createContext } from 'react';

export interface IHomeContextValue {
  date: Date;
  meals: SimplifiedMeal[];
  isLoading: boolean;
  previousDay: () => void;
  nextDay: () => void;
}

export const HomeContext = createContext({} as IHomeContextValue);
