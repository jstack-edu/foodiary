import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  icon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    letterSpacing: -0.16,
  },
});
