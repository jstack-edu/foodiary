import { Meal } from '@app/types/Meal';
import { createContext } from 'react';

export interface IHomeContextValue {
  date: Date;
  meals: Meal[];
  isLoading: boolean;
  previousDay: () => void;
  nextDay: () => void;
}

export const HomeContext = createContext({} as IHomeContextValue);
