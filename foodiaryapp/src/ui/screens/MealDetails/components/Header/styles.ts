import { theme } from '@ui/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black[700],
  },
  image: {
    height: 211,
  },
  overlay: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
  },
  blurView: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 2,
    padding: 20,
  },
  macro: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  macrosProgressContainer: {
    marginTop: 4,
    marginHorizontal: 20,
  },
  macrosProgress: {
    height: 4,
    flexDirection: 'row',
  },
  proteinProgress: {
    height: '100%',
    backgroundColor: theme.colors.support.teal,
  },
  carbohydratesProgress: {
    height: '100%',
    backgroundColor: theme.colors.support.yellow,
  },
  fatsProgress: {
    height: '100%',
    backgroundColor: theme.colors.support.orange,
  },
  divider: {
    marginTop: 20,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[400],
    borderStyle: Platform.select({
      ios: 'solid',
      android: 'dashed',
    }),
  },
  mealNameContainer: {
    margin: 20,
    marginBottom: 24,
  },
  mealName: {
    letterSpacing: -0.24,
  },
  mealItemsHeader: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
});
