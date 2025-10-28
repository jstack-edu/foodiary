import { KeyboardAvoidingView, Platform } from 'react-native';

import { theme } from '@ui/styles/theme';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingHeader } from './components/OnboardingHeader';
import { OnboardingProvider } from './context/OnboardingProvider';

export function Onboarding() {
  return (
    <OnboardingProvider>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <OnboardingHeader />
        <OnboardingStack />
      </KeyboardAvoidingView>
    </OnboardingProvider>
  );
}
