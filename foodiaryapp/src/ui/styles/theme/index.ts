const colors = {
  white: '#fff',
  'white/40': 'rgba(255, 255, 255, .4)',
  lime: {
    400: '#e8fb86',
    500: '#bef264',
    600: '#a2e635',
    700: '#64a30d',
    '700/10': 'rgba(101, 163, 13, .1)',
    800: '#1a2e05',
    900: '#022c22',
  },
  support: {
    ambar: '#ffff00',
    green: '#10b981',
    orange: '#f4a462',
    red: '#ef4444',
    teal: '#2a9d90',
    tomato: '#e76e50',
    yellow: '#e8c468',
  },
  gray: {
    100: '#fafafa',
    200: '#f4f4f5',
    300: '#f3f4f6',
    400: '#e4e4e7',
    500: '#d9d9d9',
    600: '#a1a1aa',
    700: '#71717a',
  },
  black: {
    600: '#1e293b',
    700: '#18181b',
    800: '#09090b',
    900: '#000000',
  },
} as const;

const fontFamily = {
  sans: {
    regular: 'HostGrotesk_400Regular',
    medium: 'HostGrotesk_500Medium',
    semiBold: 'HostGrotesk_600SemiBold',
  },
} as const;

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
} as const;

export const theme = {
  colors,
  fontFamily,
  fontSize,
} as const;
