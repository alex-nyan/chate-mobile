import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { LinkButton } from '../components/LinkButton';
import { SectionHeader } from '../components/SectionHeader';
import { contact, webinars } from '../data/content';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { colors, radius, spacing } from '../theme/colors';

export function ConnectScreen() {
  const { t } = useLang();

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
            icon="chatbubbles-outline"
            label={t(ui.applyNow)}
            sublabel="m.me/chatethehook"
            url={contact.messenger}
            variant="solid"
          />
          <LinkButton
            icon="logo-facebook"
            label={t(ui.messageFacebook)}
            sublabel="facebook.com/chatethehook"
            url={contact.facebook}
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
        </View>

        <Text style={styles.footer}>{t(ui.tagline)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
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
  topics: { gap: spacing.sm },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  topicText: { flex: 1, fontSize: 14.5, color: colors.text },
  links: { gap: spacing.sm },
  footer: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: spacing.xxl,
  },
});
