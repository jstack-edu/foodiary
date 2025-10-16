import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  progressBarBackground: {
    backgroundColor: theme.colors.gray[200],
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  progressBarForeground: {
    backgroundColor: theme.colors.lime[700],
    height: '100%',
    borderRadius: 4,
    width: 0,
  },
  rightActionPlaceholder: {
    width: 40,
    height: 40,
  },
});
