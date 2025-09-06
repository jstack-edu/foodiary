import { Text } from 'react-native';

import { theme } from '@ui/styles/theme';

interface IAppTextProps extends React.ComponentProps<typeof Text> {
  size?: keyof typeof theme.fontSize;
  family?: keyof typeof theme.fontFamily;
  weight?: keyof typeof theme.fontFamily.sans;
  color?: string;
};

export function AppText({
  size = 'base',
  family = 'sans',
  weight = 'regular',
  color = theme.colors.black[700],
  style,
  ...props
}: IAppTextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily[family][weight],
          fontSize: theme.fontSize[size],
          color,
        },
        style,
      ]}
      {...props}
    />
  );
}
