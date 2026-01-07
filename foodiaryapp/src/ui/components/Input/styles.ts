import { theme } from '@ui/styles/theme';
import { createVariants } from '@ui/styles/utils/createVariants';
import { StyleSheet } from 'react-native';

export const inputStyles = createVariants({
  base: {
    backgroundColor: theme.colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 14,
    color: theme.colors.black[700],
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
  },
  variants: {
    status: {
      default: {
        borderColor: theme.colors.gray[400],
      },
      focus: {
        borderColor: theme.colors.gray[700],
      },
      error: {
        borderColor: theme.colors.support.red,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
      false: {
        opacity: 1,
      },
    },
    hasSuffix: {
      true: {
        flex: 1,
      },
      false: {},
    },
  },
  defaultVariants: {
    status: 'default',
    disabled: 'false',
    hasSuffix: 'false',
  },
});

export const styles = StyleSheet.create({
  inputWithSuffix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suffix: {
    width: 57,
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSize.base,
    backgroundColor: theme.colors.gray[100],
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
