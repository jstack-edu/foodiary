import { createContext } from 'react';

interface IOnboardingContextValue {
  currentStepIndex: number;
  nextStep: () => void;
  previousStep: () => void;
}

export const OnboardingContext = createContext({} as IOnboardingContextValue);
