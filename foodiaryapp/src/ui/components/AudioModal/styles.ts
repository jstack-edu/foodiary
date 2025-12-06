import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black[900],
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  circle1: {
    width: 266,
    height: 266,
    borderWidth: 1,
    borderColor: theme.colors.gray['700/10'],
    borderRadius: 133,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1Recording: {
    borderColor: theme.colors.lime['600/10'],
  },
  circle2: {
    width: 228,
    height: 228,
    borderWidth: 1,
    borderColor: theme.colors.gray['700/50'],
    borderRadius: 114,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2Recording: {
    borderColor: theme.colors.lime['600/50'],
  },
  circle3: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.colors.gray['700/10'],
  },
  circle3Recording: {
    backgroundColor: theme.colors.lime['600/10'],
  },
  instructionsLabel: {
    maxWidth: 192,
  },
  footer: {
    height: 112,
    marginBottom: 80,
  },
  actionsContainer: {
    gap: 16,
    alignItems: 'center',
  },
  actionLabel: {
    maxWidth: 180,
  },
  actionsGroup: {
    flexDirection: 'row',
    gap: 32,
  },
});
