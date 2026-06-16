/**
 * Chate - The Hook brand palette.
 * Light values pulled from the website source (src/style.css :root):
 * teal family + orange + gold + dark slate, on the Lexend typeface.
 *
 * Tokens are SEMANTIC (e.g. `primaryDark` = "emphasised teal text"), so the dark
 * palette flips values rather than hues: `primaryDark` becomes a LIGHT teal so
 * headings stay legible on a dark background. Components read the active palette
 * via `useTheme()` / `useThemedStyles()` — never import `colors` directly inside
 * a component if it needs to react to the theme.
 */

export const lightColors = {
  primary: '#0CB4BB', // teal — text/buttons/icons
  primaryBright: '#5CE1E6', // bright teal — accents & gradients
  primaryDark: '#0B7177', // deep teal — emphasised text/headings
  primaryTint: '#E1F3F4', // teal wash background (icon badges, active chips)
  accent: '#D68321', // orange
  accentDark: '#B36C18',
  gold: '#F2DEA2',

  bg: '#FFFFFF', // cards, app bar, raised surfaces
  surface: '#F6F6F6', // screen background
  surfaceAlt: '#E1F3F4', // chips / teal wash

  text: '#233142', // dark slate
  textMuted: '#6B7480',
  textInverse: '#FFFFFF', // text on a solid primary fill

  border: '#DCE7E8',
  shadow: '#0B3A40',

  success: '#1FA971',

  // "Everything is free" note (gold).
  noteBg: '#FFF8E6',
  noteBorder: '#F4E2B0',
  noteText: '#7A5A12',
};

/** Every palette has the exact same keys as the light one. */
export type Palette = typeof lightColors;

export const darkColors: Palette = {
  primary: '#1FC2C9', // teal stays vibrant on dark
  primaryBright: '#5CE1E6',
  primaryDark: '#7FE6EB', // FLIPPED: light teal so headings pop on dark
  primaryTint: '#16323A', // dark teal wash (icon badges, active chips)
  accent: '#E0912E',
  accentDark: '#E9A94A',
  gold: '#F2DEA2',

  bg: '#16232A', // cards, app bar — slightly raised
  surface: '#0E1A1F', // screen background — darkest
  surfaceAlt: '#1C3A40', // chips / teal wash

  text: '#EAF2F3', // near-white
  textMuted: '#9AB0B5',
  textInverse: '#F4FBFB', // text on a solid primary fill (teal reads with light text)

  border: '#283A40',
  shadow: '#000000',

  success: '#28B57E',

  noteBg: 'rgba(242,222,162,0.10)',
  noteBorder: 'rgba(242,222,162,0.30)',
  noteText: '#E7CE92',
};

/**
 * "Black" dark variant — a neutral, Material-style dark mode (the now-standard
 * `#121212` charcoal, not pure black). Same semantic keys as the light palette,
 * but backgrounds are neutral dark greys instead of the teal-tinted slate of
 * `darkColors`, with cards/app bar raised via lighter elevation greys. The teal
 * brand accent is preserved so headings, chips and active states still read as
 * Chate.
 */
export const blackColors: Palette = {
  primary: '#1FC2C9', // teal stays vibrant on charcoal
  primaryBright: '#5CE1E6',
  primaryDark: '#7FE6EB', // light teal so headings pop
  primaryTint: '#16292D', // faint teal wash (icon badges, active chips)
  accent: '#E0912E',
  accentDark: '#E9A94A',
  gold: '#F2DEA2',

  bg: '#1E1E1E', // cards, app bar — elevated surface
  surface: '#121212', // screen background — Material dark base
  surfaceAlt: '#272727', // chips / neutral wash

  text: '#ECECEC', // near-white, neutral (not teal-tinted)
  textMuted: '#9A9A9A',
  textInverse: '#F4FBFB', // text on a solid primary fill

  border: '#333333',
  shadow: '#000000',

  success: '#28B57E',

  noteBg: 'rgba(242,222,162,0.10)',
  noteBorder: 'rgba(242,222,162,0.30)',
  noteText: '#E7CE92',
};

/**
 * Back-compat default export = the light palette. Use this ONLY for module-scope
 * constants that never change with the theme; anything rendered should read the
 * active palette via `useTheme()`.
 */
export const colors = lightColors;

/**
 * `#rgb`/`#rrggbb` → an `rgba()` string at the given alpha. Lets translucent
 * chrome (e.g. the blurred tab bar) tint itself from the active palette instead
 * of hard-coding per-theme rgba values.
 */
export function withAlpha(hex: string, alpha: number): string {
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
