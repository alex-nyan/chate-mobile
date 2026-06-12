/**
 * Chate - The Hook brand palette.
 * Exact values pulled from the website source (src/style.css :root):
 * teal family + orange + gold + dark slate, on the Lexend typeface.
 */
export const colors = {
  primary: '#0CB4BB', // teal — text/buttons/icons
  primaryBright: '#5CE1E6', // bright teal — accents & gradients
  primaryDark: '#0B7177', // deep teal
  primaryTint: '#E1F3F4', // teal wash background
  accent: '#D68321', // orange
  accentDark: '#B36C18',
  gold: '#F2DEA2',

  bg: '#FFFFFF',
  surface: '#F6F6F6',
  surfaceAlt: '#E1F3F4',

  text: '#233142', // dark slate
  textMuted: '#6B7480',
  textInverse: '#FFFFFF',

  border: '#DCE7E8',
  shadow: '#0B3A40',

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
