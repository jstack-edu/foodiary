import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: theme.colors.white,
  },
  title: {
    flex: 1,
    marginLeft: 8,
  },
  rightAction: {
    marginLeft: 8,
    width: 48,
    height: 48,
  },
});
