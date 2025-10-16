import { View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { OnboardingStack } from './OnboardingStack';
import { OnboardingHeader } from './components/OnboardingHeader';
import { OnboardingProvider } from './context/OnboardingProvider';

export function Onboarding() {
  return (
    <OnboardingProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
        <OnboardingHeader />
        <OnboardingStack />
      </View>
    </OnboardingProvider>
  );
}
