import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: -16,
  },
  divider: {
    backgroundColor: theme.colors.gray[200],
    width: '100%',
    height: 1,
    marginTop: 12,
    marginBottom: 20,
  },
  mealsLabel: {
    letterSpacing: 1.28,
    paddingHorizontal: 12,
  },
});
