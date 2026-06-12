import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { LinkButton } from '../components/LinkButton';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import { contact, socials, webinars } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';

export function ConnectScreen() {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabConnect)} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Webinars */}
        <SectionHeader title={t(ui.webinars)} />
        <Card>
          <View style={styles.webinarHead}>
            <View style={styles.iconBadge}>
              <Ionicons name="videocam-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.webinarIntro}>{t(webinars.intro)}</Text>
          </View>

          <View style={styles.topicsLabelRow}>
            <Text style={styles.topicsLabel}>{t(ui.ourSeries)}</Text>
          </View>
          <View style={styles.seriesChips}>
            {webinars.series.map((sName, i) => (
              <Chip key={i} label={t(sName)} />
            ))}
          </View>

          <View style={styles.topicsLabelRow}>
            <Text style={styles.topicsLabel}>{t(ui.upcomingTopics)}</Text>
          </View>
          <View style={styles.topics}>
            {webinars.topics.map((topic, i) => (
              <View key={i} style={styles.topicRow}>
                <Ionicons name="ellipse" size={7} color={colors.accent} />
                <Text style={styles.topicText}>{t(topic)}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Get in touch */}
        <SectionHeader title={t(ui.getInTouch)} />
        <View style={styles.links}>
          <LinkButton
            icon="create-outline"
            label={t(ui.applyNow)}
            sublabel="forms.gle"
            url={contact.applyForm}
            variant="solid"
          />
          <LinkButton
            icon="mail-outline"
            label={t(ui.emailUs)}
            sublabel={contact.email}
            url={`mailto:${contact.email}`}
          />
          <LinkButton
            icon="globe-outline"
            label={t(ui.visitWebsite)}
            sublabel="chatethehook.com"
            url={contact.website}
          />
          <LinkButton
            icon="document-text-outline"
            label={t(ui.readConstitution)}
            sublabel="Google Docs"
            url={contact.constitution}
          />
          <LinkButton
            icon="logo-youtube"
            label={t(ui.watchVoa)}
            sublabel="YouTube"
            url={contact.voaVideo}
          />
        </View>

        {/* Follow us */}
        <SectionHeader title={t(ui.followUs)} />
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

        <Text style={styles.footer}>{t(ui.slogan)} · {t(ui.tagline)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },
    content: { padding: spacing.lg, paddingBottom: 100 },
    webinarHead: {
      flexDirection: 'row',
      gap: spacing.md,
      alignItems: 'flex-start',
    },
    iconBadge: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    webinarIntro: {
      flex: 1,
      fontSize: 14.5,
      lineHeight: 22,
      color: colors.text,
    },
    topicsLabelRow: { marginTop: spacing.lg, marginBottom: spacing.sm },
    topicsLabel: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    seriesChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    topics: { gap: spacing.sm },
    topicRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    topicText: { flex: 1, fontSize: 14.5, color: colors.text },
    links: { gap: spacing.sm },
    socialRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    socialBtn: {
      width: 48,
      height: 48,
      borderRadius: radius.md,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialPressed: {
      opacity: 0.6,
    },
    footer: {
      textAlign: 'center',
      color: colors.textMuted,
      fontSize: 13,
      fontStyle: 'italic',
      marginTop: spacing.xxl,
    },
  });
