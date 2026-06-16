import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Platform, Pressable, StyleSheet, View } from 'react-native';
import { haptics } from '../lib/haptics';
import { useReduceMotion } from '../lib/useReduceMotion';
import { withAlpha } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';

// Transform/opacity can run on the native thread on iOS/Android; react-native-web
// has no native driver, so fall back to the JS driver there.
const NATIVE = Platform.OS !== 'web';

// True iOS 26 "Liquid Glass" (UIGlassEffect, like the Reddit tab bar) when the OS
// supports it; everywhere else we fall back to the layered BlurView below. Guarded
// so a missing native module (web / Expo Go without it) can never crash on load.
const LIQUID_GLASS = (() => {
  try {
    return isLiquidGlassAvailable();
  } catch {
    return false;
  }
})();

const BAR_HEIGHT = 62;
const PAD_H = 8;
const PAD_V = 7;
const PILL_RADIUS = (BAR_HEIGHT - PAD_V * 2) / 2;

/**
 * Floating pill tab bar. On iOS 26 it uses the system Liquid Glass material
 * (`expo-glass-effect`) for the bar, the active-tab highlight and the held-tab
 * blob; elsewhere it renders a layered BlurView + gradient that approximates it.
 * The highlight springs/stretches between tabs and each tab squishes on press.
 */
export function LiquidGlassTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const routes = state.routes;
  const bottom = Math.max(insets.bottom + 6, 14);

  const { colors: theme, isDark } = useTheme();
  const ACTIVE = theme.primary;
  const INACTIVE = theme.textMuted;
  const glassScheme = isDark ? 'dark' : 'light';

  // Fallback (BlurView) glass tones. The dark values derive from the active
  // palette so the bar follows whichever dark variant is in use; only the
  // highlight keeps the teal brand accent.
  const blurTint = isDark ? 'dark' : 'light';
  const barBg = isDark ? withAlpha(theme.bg, 0.82) : 'rgba(255,255,255,0.82)';
  const barBorder = isDark ? withAlpha(theme.border, 0.7) : 'rgba(220,235,237,0.9)';
  const glassBg = isDark ? withAlpha(theme.surfaceAlt, 0.5) : 'rgba(255,255,255,0.5)';
  const glassBorder = isDark ? withAlpha(theme.primaryDark, 0.5) : 'rgba(255,255,255,0.85)';
  const glassGradient: readonly [string, string, string] = isDark
    ? [
        withAlpha(theme.primaryDark, 0.5),
        withAlpha(theme.surfaceAlt, 0.32),
        withAlpha(theme.primary, 0.3),
      ]
    : ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.28)', 'rgba(92,225,230,0.22)'];

  // Inner glow that makes the fallback highlight read as a raised drop of glass.
  // Keep it light-mode only (on dark the teal halo bleeds past the clipped pill).
  const glassGlow = isDark
    ? null
    : {
        shadowColor: theme.primaryBright,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      };

  // When the OS (or web prefers-reduced-motion) asks for less motion, drop the
  // gooey stretch and press squish and just snap the highlight into place.
  const reduceMotion = useReduceMotion();

  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth ? barWidth / routes.length : 0;

  // Position of the highlight (in px from the row's left edge) and its horizontal
  // stretch. translateX slides it under the active tab; scaleX gives the gooey
  // squash-and-stretch as it travels.
  const translateX = useRef(new Animated.Value(0)).current;
  const stretchX = useRef(new Animated.Value(1)).current;
  const placed = useRef(false);

  // Per-tab press feedback: a squish + a glass blob that wells up under the
  // finger while the tab is held (0 = hidden/zero-scale, 1 = fully raised). Scale
  // only — animating a GlassView's opacity to 0 stops it rendering entirely.
  const pressScales = useRef(routes.map(() => new Animated.Value(1))).current;
  const holdGlass = useRef(routes.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (!tabWidth) return;
    const target = state.index * tabWidth;

    // First measurement (snap from 0) or reduce-motion: jump straight to the
    // target with no gooey stretch.
    if (!placed.current || reduceMotion) {
      translateX.setValue(target);
      stretchX.setValue(1);
      placed.current = true;
      return;
    }

    Animated.parallel([
      Animated.spring(translateX, {
        toValue: target,
        useNativeDriver: NATIVE,
        friction: 7,
        tension: 90,
      }),
      Animated.sequence([
        Animated.timing(stretchX, {
          toValue: 1.28,
          duration: 110,
          useNativeDriver: NATIVE,
        }),
        Animated.spring(stretchX, {
          toValue: 1,
          useNativeDriver: NATIVE,
          friction: 5,
          tension: 140,
        }),
      ]),
    ]).start();
  }, [state.index, tabWidth, translateX, stretchX, reduceMotion]);

  const onRowLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w && Math.abs(w - barWidth) > 0.5) setBarWidth(w);
  };

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom }]}>
      <View
        style={[
          styles.bar,
          {
            backgroundColor: LIQUID_GLASS ? 'transparent' : barBg,
            borderColor: LIQUID_GLASS ? 'transparent' : barBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        {/* Bar material. */}
        {LIQUID_GLASS ? (
          <GlassView
            glassEffectStyle="regular"
            colorScheme={glassScheme}
            style={[StyleSheet.absoluteFill, styles.barBlur]}
          />
        ) : (
          <BlurView
            tint={blurTint}
            intensity={72}
            style={[StyleSheet.absoluteFill, styles.barBlur]}
          />
        )}

        {/* The animated liquid-glass highlight, sitting behind the tabs. */}
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.highlight,
              { width: tabWidth, transform: [{ translateX }, { scaleX: stretchX }] },
            ]}
          >
            {LIQUID_GLASS ? (
              <GlassView
                glassEffectStyle="clear"
                isInteractive
                tintColor={withAlpha(theme.primary, 0.3)}
                colorScheme={glassScheme}
                style={styles.glassNative}
              />
            ) : (
              <View
                style={[
                  styles.glass,
                  { backgroundColor: glassBg, borderColor: glassBorder },
                  glassGlow,
                ]}
              >
                <BlurView
                  tint={blurTint}
                  intensity={42}
                  style={[StyleSheet.absoluteFill, styles.glassBlur]}
                />
                <LinearGradient
                  colors={glassGradient}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            )}
          </Animated.View>
        )}

        {/* Tab buttons. */}
        <View style={styles.row} onLayout={onRowLayout}>
          {routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const rawLabel =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const color = isFocused ? ACTIVE : INACTIVE;
            const icon = options.tabBarIcon?.({ focused: isFocused, color, size: 22 });

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                haptics.selection();
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({ type: 'tabLongPress', target: route.key });
            };

            const pressTo = (to: number) => {
              if (reduceMotion) return; // no squish when reduce motion is on
              Animated.spring(pressScales[index], {
                toValue: to,
                useNativeDriver: NATIVE,
                friction: 6,
                tension: 180,
              }).start();
            };

            // Raise / drop the held-tab glass blob. Reduce-motion just snaps it.
            const holdTo = (to: number) => {
              if (reduceMotion) {
                holdGlass[index].setValue(to);
                return;
              }
              Animated.spring(holdGlass[index], {
                toValue: to,
                useNativeDriver: NATIVE,
                friction: 7,
                tension: 120,
              }).start();
            };

            const onPressIn = () => {
              haptics.light(); // tactile "grab" as the glass wells up under the finger
              pressTo(0.9);
              holdTo(1);
            };
            const onPressOut = () => {
              pressTo(1);
              holdTo(0);
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? String(rawLabel)}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.tab}
              >
                <Animated.View
                  pointerEvents="none"
                  style={[styles.holdGlass, { transform: [{ scale: holdGlass[index] }] }]}
                >
                  {LIQUID_GLASS ? (
                    <GlassView
                      glassEffectStyle="clear"
                      isInteractive
                      tintColor={withAlpha(theme.primary, 0.22)}
                      colorScheme={glassScheme}
                      style={styles.holdGlassNative}
                    />
                  ) : (
                    <View
                      style={[
                        styles.holdGlassInner,
                        { backgroundColor: glassBg, borderColor: glassBorder },
                        glassGlow,
                      ]}
                    >
                      <BlurView
                        tint={blurTint}
                        intensity={36}
                        style={[StyleSheet.absoluteFill, styles.holdGlassBlur]}
                      />
                      <LinearGradient
                        colors={glassGradient}
                        start={{ x: 0.2, y: 0 }}
                        end={{ x: 0.8, y: 1 }}
                        style={StyleSheet.absoluteFill}
                      />
                    </View>
                  )}
                </Animated.View>
                <Animated.View
                  style={[styles.tabInner, { transform: [{ scale: pressScales[index] }] }]}
                >
                  {icon}
                  <Text
                    numberOfLines={1}
                    style={[styles.label, { color, fontWeight: isFocused ? '800' : '600' }]}
                  >
                    {rawLabel}
                  </Text>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  bar: {
    height: BAR_HEIGHT,
    borderRadius: BAR_HEIGHT / 2,
    overflow: 'hidden',
    borderWidth: 1,
    paddingHorizontal: PAD_H,
    paddingVertical: PAD_V,
    // Soft float shadow (shadowColor is applied inline from the active palette).
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 14,
  },
  // Match the bar's radius so the blur's web `backdrop-filter` clips to the
  // pill instead of painting a rectangle (overflow:hidden alone doesn't clip it).
  barBlur: {
    borderRadius: BAR_HEIGHT / 2,
  },
  highlight: {
    position: 'absolute',
    left: PAD_H,
    top: PAD_V,
    bottom: PAD_V,
  },
  glass: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: PILL_RADIUS,
    overflow: 'hidden',
    borderWidth: 1,
  },
  // Native Liquid Glass pill — the material supplies its own edge/highlight, so
  // no border or inner blur/gradient layers are needed.
  glassNative: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: PILL_RADIUS,
  },
  // Same radius on the blur layer itself so its `backdrop-filter` is rounded
  // (the cause of the out-of-bounds rectangle behind the active tab).
  glassBlur: {
    borderRadius: PILL_RADIUS,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // The held-tab glass blob — sits behind the icon/label, inset within the tab
  // so it reads as a rounded drop welling up under the finger.
  holdGlass: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 6,
    right: 6,
  },
  holdGlassInner: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
  },
  holdGlassNative: {
    flex: 1,
    borderRadius: 18,
  },
  holdGlassBlur: {
    borderRadius: 18,
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
  },
});
