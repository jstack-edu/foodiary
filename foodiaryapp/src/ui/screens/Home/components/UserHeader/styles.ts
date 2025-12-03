import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.colors.lime[400],
    paddingBottom: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greetings: {
    gap: 2,
  },
});
