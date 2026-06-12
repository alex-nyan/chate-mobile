import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

/**
 * App-wide Text rendered in Lexend (the Chate brand typeface — see colors.ts).
 *
 * React Native can't synthesize weights from a single custom family, so each
 * weight is loaded as its own face (see App.tsx). We map the requested
 * fontWeight to the matching Lexend face and drop fontWeight itself so the
 * platform doesn't try to fake-bold an already-bold face.
 */
const FAMILY: Record<string, string> = {
  '400': 'Lexend_400Regular',
  '500': 'Lexend_500Medium',
  '600': 'Lexend_600SemiBold',
  '700': 'Lexend_700Bold',
  '800': 'Lexend_800ExtraBold',
  '900': 'Lexend_900Black',
  normal: 'Lexend_400Regular',
  bold: 'Lexend_700Bold',
};

export function Text({ style, ...rest }: TextProps) {
  const { fontWeight, ...others } = StyleSheet.flatten(style) ?? {};
  const family = FAMILY[String(fontWeight)] ?? 'Lexend_400Regular';
  return <RNText {...rest} style={[{ fontFamily: family }, others]} />;
}
