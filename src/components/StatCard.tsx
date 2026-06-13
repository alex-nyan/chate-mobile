import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useReduceMotion } from '../lib/useReduceMotion';
import { radius, spacing, type Palette } from '../theme/colors';
import { useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

// "$4M+" -> { prefix: '$', target: 4, suffix: 'M+' }. null when there's no number to count.
function parseValue(value: string): { prefix: string; target: number; suffix: string } | null {
  const m = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!m) return null;
  const target = parseFloat(m[2]);
  if (!Number.isFinite(target)) return null;
  return { prefix: m[1], target, suffix: m[3] };
}

export function StatCard({
  value,
  label,
  animate = false,
  index = 0,
}: {
  value: string;
  label: string;
  /** Count the numeric part up from 0 on mount. */
  animate?: boolean;
  /** Stagger index for a cascade when several animate together. */
  index?: number;
}) {
  const styles = useThemedStyles(createStyles);
  const reduceMotion = useReduceMotion();
  const parsed = parseValue(value);

  const av = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(() =>
    animate && parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    // No animation (disabled, reduce-motion, or unparseable): show the real value.
    if (!animate || reduceMotion || !parsed) {
      setDisplay(value);
      return;
    }
    setDisplay(`${parsed.prefix}0${parsed.suffix}`);
    const id = av.addListener(({ value: v }) => {
      setDisplay(`${parsed.prefix}${Math.round(v)}${parsed.suffix}`);
    });
    av.setValue(0);
    const anim = Animated.timing(av, {
      toValue: parsed.target,
      duration: 900,
      delay: index * 120,
      useNativeDriver: false, // we read the value via a listener to drive a number
    });
    anim.start(({ finished }) => {
      if (finished) setDisplay(value); // land on the exact source string
    });
    return () => {
      av.removeListener(id);
      av.stopAnimation();
    };
  }, [animate, reduceMotion, value, index, av]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.card}>
      <Text style={styles.value}>{display}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    card: {
      flexBasis: '47%',
      flexGrow: 1,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    value: {
      fontSize: 26,
      fontWeight: '900',
      color: colors.primary,
      marginBottom: 2,
    },
    label: {
      fontSize: 12.5,
      color: colors.textMuted,
      textAlign: 'center',
      lineHeight: 17,
    },
  });
