import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { tr, ui, type Lang } from '../i18n/strings';

/**
 * Local deadline reminders for the application tracker. We schedule on-device
 * notifications a few days before each deadline — no server / push tokens needed.
 */

// Show the reminder as a banner even when the app is foregrounded.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const ANDROID_CHANNEL = 'deadlines';
const REMINDER_OFFSETS_DAYS = [7, 1];
const REMINDER_HOUR = 9; // 9am local on the reminder day

/** Request permission (and set up the Android channel) — call before scheduling. */
export async function ensureNotificationSetup(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL, {
        name: 'Deadlines',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    const current = await Notifications.getPermissionsAsync();
    const status =
      current.status === 'granted'
        ? current.status
        : (await Notifications.requestPermissionsAsync()).status;
    return status === 'granted';
  } catch {
    return false;
  }
}

/** Schedule reminders for a deadline; returns the scheduled notification ids. */
export async function scheduleDeadlineReminders(
  name: string,
  deadlineISO: string,
  lang: Lang,
): Promise<string[]> {
  const ids: string[] = [];
  const due = new Date(deadlineISO);
  if (Number.isNaN(due.getTime())) return ids;

  for (const days of REMINDER_OFFSETS_DAYS) {
    const fire = new Date(due);
    fire.setDate(fire.getDate() - days);
    fire.setHours(REMINDER_HOUR, 0, 0, 0);
    if (fire.getTime() <= Date.now()) continue; // skip reminders already in the past

    const body =
      days === 1
        ? tr(ui.reminderTomorrow, lang)
        : tr(ui.reminderDays, lang).replace('{days}', String(days));
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: { title: name, body },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: fire,
          channelId: ANDROID_CHANNEL,
        },
      });
      ids.push(id);
    } catch {
      /* Ignore an individual scheduling failure — the others still register. */
    }
  }
  return ids;
}

/** Cancel previously-scheduled reminders by id. */
export async function cancelReminders(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id) => Notifications.cancelScheduledNotificationAsync(id).catch(() => {})),
  );
}
