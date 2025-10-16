import { use } from 'react';
import { OnboardingContext } from '.';

export function useOnboarding() {
  const value = use(OnboardingContext);

  if (!value) {
    throw new Error('`useOnboarding` must be used only inside `<OnboardingProvider />`');
  }

  return value;
}
