import { Ionicons } from '@expo/vector-icons';
import * as Application from 'expo-application';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appJson from '../../app.json';
import { AppBar } from '../components/AppBar';
import { Row } from '../components/Row';
import { SectionHeader } from '../components/SectionHeader';
import { SegmentedControl, type Segment } from '../components/SegmentedControl';
import { Text } from '../components/Text';
import { contact, socials } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui, type Lang } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { useBookmarks } from '../state/BookmarksContext';
import { type TextScale, useTextScale } from '../state/TextScaleContext';
import { radius, spacing, type Palette } from '../theme/colors';
import { type DarkVariant, type ThemeMode, useTheme, useThemedStyles } from '../theme/ThemeContext';
import type { SettingsHomeProps } from '../navigation/types';

export function SettingsScreen({ navigation }: SettingsHomeProps) {
  const { t } = useLang();
  const { colors, mode, setMode, isDark, darkVariant, setDarkVariant } = useTheme();
  const { lang, setLang } = useLang();
  const { scale, setScale } = useTextScale();
  const { bookmarks } = useBookmarks();
  const styles = useThemedStyles(createStyles);

  const themeSegments: Segment<ThemeMode>[] = [
    { value: 'system', label: t(ui.themeSystem) },
    { value: 'light', label: t(ui.themeLight) },
    { value: 'dark', label: t(ui.themeDark) },
  ];
  const langSegments: Segment<Lang>[] = [
    { value: 'en', label: 'English' },
    { value: 'my', label: 'မြန်မာ' },
  ];
  const darkStyleSegments: Segment<DarkVariant>[] = [
    { value: 'blue', label: t(ui.darkBlue) },
    { value: 'black', label: t(ui.darkBlack) },
  ];
  const sizeSegments: Segment<TextScale>[] = [
    { value: 'small', label: t(ui.textSmall) },
    { value: 'default', label: t(ui.textDefault) },
    { value: 'large', label: t(ui.textLarge) },
    { value: 'xl', label: t(ui.textXL) },
  ];

  // Native build shows the EAS-injected build number; web/Expo Go has none.
  const appVersion = Application.nativeApplicationVersion ?? appJson.expo.version;
  const buildVersion = Application.nativeBuildVersion ?? '—';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabSettings)} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title={t(ui.appearance)} />
        <SegmentedControl segments={themeSegments} value={mode} onChange={setMode} />

        {isDark && (
          <>
            <SectionHeader title={t(ui.darkStyle)} />
            <SegmentedControl
              segments={darkStyleSegments}
              value={darkVariant}
              onChange={setDarkVariant}
            />
          </>
        )}

        <SectionHeader title={t(ui.languageHeader)} />
        <SegmentedControl segments={langSegments} value={lang} onChange={setLang} />

        <SectionHeader title={t(ui.textSize)} />
        <SegmentedControl segments={sizeSegments} value={scale} onChange={setScale} />

        <SectionHeader title={t(ui.savedArticles)} />
        <Row
          icon="bookmark-outline"
          label={t(ui.savedArticles)}
          value={String(bookmarks.length)}
          onPress={() => navigation.navigate('SavedArticles')}
        />

        <SectionHeader title={t(ui.getInTouch)} />
        <View style={styles.links}>
          <Row
            icon="mail-outline"
            label={t(ui.emailUs)}
            sublabel={contact.email}
            url={`mailto:${contact.email}`}
          />
          <Row
            icon="globe-outline"
            label={t(ui.visitWebsite)}
            sublabel="chatethehook.com"
            url={contact.website}
          />
        </View>
        <View style={styles.socialRow}>
          {socials.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => {
                haptics.light();
                Linking.openURL(s.url).catch(() => {});
              }}
              accessibilityRole="link"
              accessibilityLabel={s.label}
              style={({ pressed }) => [styles.socialBtn, pressed && styles.socialPressed]}
            >
              <Ionicons name={s.icon as any} size={23} color={colors.primaryDark} />
            </Pressable>
          ))}
        </View>

        <SectionHeader title={t(ui.about)} />
        <View style={styles.links}>
          <Row label={t(ui.version)} value={appVersion ?? '—'} />
          <Row label={t(ui.buildNumber)} value={String(buildVersion)} />
        </View>

        <Text style={styles.footer}>
          {t(ui.slogan)} · {t(ui.tagline)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },
    content: { padding: spacing.lg, paddingBottom: 100 },
    links: { gap: spacing.sm },
    socialRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      paddingTop: spacing.md,
    },
    socialBtn: {
      width: 48,
      height: 48,
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialPressed: { opacity: 0.6 },
    footer: {
      textAlign: 'center',
      color: colors.textMuted,
      fontSize: 13,
      fontStyle: 'italic',
      marginTop: spacing.xxl,
    },
  });
