import { StyleSheet } from 'react-native';

import { theme } from '@ui/styles/theme';
import { createVariants, VariantProps } from '@ui/styles/utils/createVariants';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export const buttonStyles = createVariants({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: theme.colors.lime[500],
      },
      secondary: {
        backgroundColor: theme.colors.gray[300],
      },
    },
    size: {
      default: {
        paddingHorizontal: 24,
        paddingVertical: 14,
      },
      icon: {
        width: 48,
        height: 48,
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
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    disabled: 'false',
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
