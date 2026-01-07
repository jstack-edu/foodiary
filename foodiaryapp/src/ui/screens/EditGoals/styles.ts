import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingTop: 24,
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[600],
  },
  form: {
    gap: 32,
    marginBottom: 32,
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[400],
    flexDirection: 'row',
    gap: 16,
  },
});
