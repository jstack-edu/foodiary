import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
  },
  header: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealDetails: {
    gap: 2,
    flexShrink: 1,
  },
  body: {
    borderRadius: 8,
    backgroundColor: theme.colors.gray[100],
    padding: 16,
    gap: 16,
  },
  mealStatsRow: {
    flexDirection: 'row',
  },
  mealStat: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
