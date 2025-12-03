import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[400],
  },
  content: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    minHeight: '100%',
  },
});
