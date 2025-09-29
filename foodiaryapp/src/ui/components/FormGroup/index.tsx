import { cloneElement } from 'react';
import { View } from 'react-native';

import { theme } from '@ui/styles/theme';

import { AppText } from '../AppText';
import { styles } from './styles';

interface IFormGroupProps {
  label: string;
  children: React.ReactElement<{ error?: boolean }>;
  error?: string;
}

export function FormGroup({ label, children, error }: IFormGroupProps) {
  return (
    <View style={styles.container}>
      <AppText weight="medium">{label}</AppText>
      {cloneElement(children, { error: !!error })}
      {error && (
        <AppText size="sm" color={theme.colors.support.red}>{error}</AppText>
      )}
    </View>
  );
}
