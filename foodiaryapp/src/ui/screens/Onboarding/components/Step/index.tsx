import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { styles } from './styles';

export function Step({ children }: { children: React.ReactNode }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {children}
    </View>
  );
}

export function StepHeader({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.header}>
      {children}
    </View>
  );
}

export function StepTitle({ children }: { children: string }) {
  return (
    <AppText size="3xl" weight="semiBold" style={styles.title}>
      {children}
    </AppText>
  );
}

export function StepSubtitle({ children }: { children: string }) {
  return (
    <AppText color={theme.colors.gray[700]} style={styles.subtitle}>
      {children}
    </AppText>
  );
}

interface IStepContentProps {
  children: React.ReactNode;
  position?: 'end' | 'center';
}

export function StepContent({ children, position = 'end' }: IStepContentProps) {
  return (
    <View style={[styles.content, position === 'center' && styles.contentCenter]}>
      {children}
    </View>
  );
}

interface IStepFooterProps {
  children: React.ReactNode;
  align?: 'start' | 'end';
}

export function StepFooter({ children, align = 'end' }: IStepFooterProps) {
  return (
    <View style={[styles.footer, align === 'end' && { alignItems: 'flex-end' }]}>
      {children}
    </View>
  );
}
