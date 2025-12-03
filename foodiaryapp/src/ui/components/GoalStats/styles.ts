import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arcsContainer: {
    alignItems: 'center',
    position: 'relative',
    minHeight: 172,
  },
  proteinArc: {
    position: 'absolute',
    top: 20,
  },
  carbohydrateArc: {
    position: 'absolute',
    top: 40,
  },
  fatArc: {
    position: 'absolute',
    top: 60,
  },
  caloriesTextContainer: {
    marginTop: -64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caloriesValue: {
    fontFamily: theme.fontFamily.sans.semiBold,
    color: theme.colors.support.tomato,
    fontSize: theme.fontSize.xl,
  },
  caloriesGoal: {
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[700],
  },
  caloriesLabel: {
    color: theme.colors.gray[700],
    marginTop: 4,
    textAlign: 'center',
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSize.sm,
  },
  macrosContainer: {
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    width: '33.333%',
    justifyContent: 'center',
  },
  proteinValue: {
    fontFamily: theme.fontFamily.sans.semiBold,
    color: theme.colors.support.teal,
    fontSize: theme.fontSize.base,
  },
  carbohydrateValue: {
    fontFamily: theme.fontFamily.sans.semiBold,
    color: theme.colors.support.yellow,
    fontSize: theme.fontSize.base,
  },
  fatValue: {
    fontFamily: theme.fontFamily.sans.semiBold,
    color: theme.colors.support.orange,
    fontSize: theme.fontSize.base,
  },
  macroGoal: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[700],
  },
  macroLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[700],
  },
});
