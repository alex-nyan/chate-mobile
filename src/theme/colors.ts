/**
 * Chate - The Hook brand palette.
 * Built around the website's blue sparkle identity with a gold accent.
 */
export const colors = {
  primary: '#1D6FE0',
  primaryDark: '#0B3D91',
  primaryTint: '#E6F1FF',
  accent: '#FFC83D',
  accentDark: '#E0A416',

  bg: '#FFFFFF',
  surface: '#F4F8FF',
  surfaceAlt: '#EDF3FE',

  text: '#0F1B2D',
  textMuted: '#5B6B82',
  textInverse: '#FFFFFF',

  border: '#E1E9F5',
  shadow: '#0B2A5E',

  success: '#1FA971',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
} as const;
