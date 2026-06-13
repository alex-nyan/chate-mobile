import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import type { VideoEpisode, VideoSeries } from '../data/content';
import { haptics } from '../lib/haptics';
import { radius, shadow, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';
import { Text } from './Text';

function openURL(url: string) {
  haptics.light();
  Linking.openURL(url).catch(() => {});
}

/** A webinar/video tile: YouTube thumbnail (with offline fallback) → opens YouTube. */
export function VideoCard({ ep, series }: { ep: VideoEpisode; series: VideoSeries }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const url = `https://www.youtube.com/watch?v=${ep.youtubeId}`;
  const thumb = `https://img.youtube.com/vi/${ep.youtubeId}/mqdefault.jpg`;
  // Thumbnails are fetched from YouTube, so they fail when offline / blocked —
  // fall back to a branded placeholder instead of a broken-image box.
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <Pressable
      onPress={() => openURL(url)}
      style={({ pressed }) => [styles.videoCard, pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel={ep.title}
    >
      <View style={styles.thumbWrap}>
        {thumbFailed ? (
          <View style={styles.thumbFallback}>
            <Ionicons name="logo-youtube" size={36} color={colors.primary} />
          </View>
        ) : (
          <Image
            source={{ uri: thumb }}
            style={styles.thumb}
            resizeMode="cover"
            onError={() => setThumbFailed(true)}
          />
        )}
        <View style={styles.playOverlay}>
          <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.92)" />
        </View>
      </View>
      <View style={styles.videoMeta}>
        <View style={styles.seriesChip}>
          <Text style={styles.seriesChipText} numberOfLines={1}>{series.name}</Text>
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>{ep.title}</Text>
        <View style={styles.videoFooter}>
          <Text style={styles.videoSpeaker} numberOfLines={1}>{ep.speaker ?? ''}</Text>
          <Text style={styles.videoDate}>{ep.date}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    videoCard: {
      backgroundColor: colors.bg,
      borderRadius: radius.lg,
      marginBottom: spacing.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.card,
    },
    pressed: { opacity: 0.7 },
    thumbWrap: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: colors.primaryTint,
      position: 'relative',
    },
    thumb: { width: '100%', height: '100%' },
    thumbFallback: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryTint,
    },
    playOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(11,49,64,0.25)',
    },
    videoMeta: { padding: spacing.md },
    seriesChip: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primaryTint,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.sm,
      paddingVertical: 3,
      marginBottom: spacing.xs,
    },
    seriesChipText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.primaryDark,
    },
    videoTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
      lineHeight: 22,
      marginBottom: spacing.xs,
    },
    videoFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    videoSpeaker: {
      flex: 1,
      fontSize: 12,
      color: colors.textMuted,
      marginRight: spacing.sm,
    },
    videoDate: {
      fontSize: 12,
      color: colors.textMuted,
      fontWeight: '600',
    },
  });
