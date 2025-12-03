import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lime[900],
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  header: {
    alignItems: 'center',
    gap: 24,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    gap: 8,
    alignItems: 'center',
    maxWidth: 327,
  },
  title: {
    maxWidth: 300,
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  titleHighlight: {
    color: theme.colors.lime[500],
  },
  body: {
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 24,
  },
});
