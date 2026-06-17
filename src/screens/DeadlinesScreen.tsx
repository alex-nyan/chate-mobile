import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import {
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { IconBadge } from '../components/IconBadge';
import { SectionHeader } from '../components/SectionHeader';
import { SegmentedControl, type Segment } from '../components/SegmentedControl';
import { Text } from '../components/Text';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { haptics } from '../lib/haptics';
import { useApplications, type ApplicationKind } from '../state/ApplicationsContext';
import { radius, spacing, type Palette } from '../theme/colors';
import { useTheme, useThemedStyles } from '../theme/ThemeContext';

// Enable the expand/collapse layout animation on Android (no-op on iOS).
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DAY_MS = 86400000;
const startOfDay = (d: Date) => {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c.getTime();
};
const daysUntil = (iso: string) =>
  Math.round((startOfDay(new Date(iso)) - startOfDay(new Date())) / DAY_MS);

const KIND_ICON: Record<ApplicationKind, 'school-outline' | 'ribbon-outline'> = {
  school: 'school-outline',
  scholarship: 'ribbon-outline',
};

export function DeadlinesScreen() {
  const { t, lang } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { applications, addApplication, removeApplication, toggleChecklistItem, setReminders } =
    useApplications();

  const [adding, setAdding] = useState(false);
  // Ids whose checklist is collapsed (cards start expanded).
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapsed = (id: string) => {
    haptics.selection();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed((c) => ({ ...c, [id]: !c[id] }));
  };

  const sorted = useMemo(
    () =>
      [...applications].sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      ),
    [applications],
  );

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'my' ? 'my-MM' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const statusFor = (iso: string): { text: string; urgent: boolean; over: boolean } => {
    const d = daysUntil(iso);
    if (d < 0) return { text: t(ui.overdue), urgent: true, over: true };
    if (d === 0) return { text: t(ui.dueToday), urgent: true, over: false };
    if (d === 1) return { text: t(ui.dueTomorrow), urgent: true, over: false };
    return { text: t(ui.dueInDays).replace('{days}', String(d)), urgent: d <= 7, over: false };
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppBar title={t(ui.tabDeadlines)} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>{t(ui.deadlinesIntro)}</Text>

        <Pressable
          onPress={() => {
            haptics.light();
            setAdding(true);
          }}
          accessibilityRole="button"
          accessibilityLabel={t(ui.addApplication)}
          style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
        >
          <Ionicons name="add-circle" size={20} color={colors.textInverse} />
          <Text style={styles.addBtnText}>{t(ui.addApplication)}</Text>
        </Pressable>

        {sorted.length === 0 ? (
          <View style={styles.empty}>
            <IconBadge name="calendar-outline" size={56} iconSize={28} />
            <Text style={styles.emptyTitle}>{t(ui.noApplications)}</Text>
            <Text style={styles.emptyHint}>{t(ui.noApplicationsHint)}</Text>
          </View>
        ) : (
          sorted.map((app) => {
            const status = statusFor(app.deadline);
            const done = app.checklist.filter((c) => c.done).length;
            const hasChecklist = app.checklist.length > 0;
            const open = hasChecklist && !collapsed[app.id];
            return (
              <Card key={app.id} style={styles.card}>
                <View style={styles.cardHead}>
                  <Pressable
                    onPress={() => hasChecklist && toggleCollapsed(app.id)}
                    disabled={!hasChecklist}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: open }}
                    accessibilityLabel={app.name}
                    accessibilityHint={hasChecklist ? t(ui.toggleChecklistHint) : undefined}
                    style={styles.cardHeadMain}
                  >
                    <IconBadge name={KIND_ICON[app.kind]} size={44} iconSize={22} />
                    <View style={styles.cardHeadText}>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {app.name}
                      </Text>
                      <Text
                        style={[
                          styles.cardStatus,
                          { color: status.urgent ? colors.accentDark : colors.textMuted },
                        ]}
                      >
                        {status.text} · {dateFmt(app.deadline)}
                      </Text>
                    </View>
                    {hasChecklist && (
                      <Ionicons
                        name={open ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.textMuted}
                      />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      haptics.light();
                      void removeApplication(app.id);
                    }}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={t(ui.deleteAction)}
                    style={styles.iconBtn}
                  >
                    <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
                  </Pressable>
                </View>

                {open && (
                  <View style={styles.checklist}>
                    {app.checklist.map((item) => (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          haptics.selection();
                          toggleChecklistItem(app.id, item.id);
                        }}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: item.done }}
                        style={({ pressed }) => [styles.checkRow, pressed && styles.pressed]}
                      >
                        <Ionicons
                          name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
                          size={20}
                          color={item.done ? colors.success : colors.textMuted}
                        />
                        <Text style={[styles.checkLabel, item.done && styles.checkLabelDone]}>
                          {item.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                <View style={styles.cardFooter}>
                  <Text style={styles.progress}>
                    {done}/{app.checklist.length}
                  </Text>
                  <Pressable
                    onPress={() => {
                      haptics.light();
                      void setReminders(app.id, !app.remindersOn);
                    }}
                    hitSlop={8}
                    accessibilityRole="switch"
                    accessibilityState={{ checked: app.remindersOn }}
                    accessibilityLabel={t(ui.remindersLabel)}
                    style={styles.reminderToggle}
                  >
                    <Ionicons
                      name={app.remindersOn ? 'notifications' : 'notifications-off-outline'}
                      size={16}
                      color={app.remindersOn ? colors.primary : colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.reminderText,
                        { color: app.remindersOn ? colors.primaryDark : colors.textMuted },
                      ]}
                    >
                      {t(ui.remindersLabel)}
                    </Text>
                  </Pressable>
                </View>
              </Card>
            );
          })
        )}
      </ScrollView>

      <AddDeadlineModal visible={adding} onClose={() => setAdding(false)} onAdd={addApplication} />
    </SafeAreaView>
  );
}

function AddDeadlineModal({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: ReturnType<typeof useApplications>['addApplication'];
}) {
  const { t } = useLang();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const [name, setName] = useState('');
  const [kind, setKind] = useState<ApplicationKind>('school');
  const [date, setDate] = useState(() => new Date(Date.now() + 30 * DAY_MS));
  const [remind, setRemind] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  const kindSegments: Segment<ApplicationKind>[] = [
    { value: 'school', label: t(ui.kindSchool) },
    { value: 'scholarship', label: t(ui.kindScholarship) },
  ];
  const remindSegments: Segment<boolean>[] = [
    { value: true, label: t(ui.hapticsOn) },
    { value: false, label: t(ui.hapticsOff) },
  ];

  const reset = () => {
    setName('');
    setKind('school');
    setDate(new Date(Date.now() + 30 * DAY_MS));
    setRemind(true);
    setShowPicker(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const checklist = (
      kind === 'school'
        ? [ui.clEssays, ui.clRecs, ui.clTests, ui.clForm, ui.clAid]
        : [ui.clEligibility, ui.clEssays, ui.clDocuments, ui.clSubmit]
    ).map((s) => t(s));
    haptics.light();
    await onAdd({
      name: trimmed,
      kind,
      deadline: date.toISOString(),
      checklist,
      remindersOn: remind,
    });
    close();
  };

  const onDateChange = (_e: DateTimePickerEvent, picked?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (picked) setDate(picked);
  };

  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <View style={styles.modalBackdrop}>
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <SectionHeader title={t(ui.addApplication)} />

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t(ui.applicationName)}
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            returnKeyType="done"
          />

          <SegmentedControl segments={kindSegments} value={kind} onChange={setKind} />

          <Pressable
            onPress={() => {
              haptics.light();
              setShowPicker((s) => !s);
            }}
            style={({ pressed }) => [styles.dateRow, pressed && styles.pressed]}
          >
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            <Text style={styles.dateLabel}>{t(ui.deadlineLabel)}</Text>
            <Text style={styles.dateValue}>{dateLabel}</Text>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onDateChange}
            />
          )}

          <View style={styles.remindRow}>
            <Text style={styles.remindLabel}>{t(ui.remindersLabel)}</Text>
            <View style={styles.remindControl}>
              <SegmentedControl segments={remindSegments} value={remind} onChange={setRemind} />
            </View>
          </View>

          <View style={styles.modalActions}>
            <Pressable
              onPress={close}
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
            >
              <Text style={styles.secondaryBtnText}>{t(ui.cancelAction)}</Text>
            </Pressable>
            <Pressable
              onPress={submit}
              disabled={!name.trim()}
              style={({ pressed }) => [
                styles.primaryBtn,
                !name.trim() && styles.primaryBtnDisabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryBtnText}>{t(ui.addAction)}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface },
    content: { padding: spacing.lg, paddingBottom: 120 },
    intro: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.textMuted,
      marginBottom: spacing.md,
    },
    addBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      backgroundColor: colors.primary,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      marginBottom: spacing.lg,
    },
    addBtnText: { fontSize: 15, fontWeight: '800', color: colors.textInverse },
    pressed: { opacity: 0.7 },

    empty: { alignItems: 'center', paddingTop: spacing.xxl, gap: spacing.sm },
    emptyTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginTop: spacing.sm },
    emptyHint: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.textMuted,
      textAlign: 'center',
      paddingHorizontal: spacing.lg,
    },

    card: { marginBottom: spacing.md },
    cardHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    cardHeadMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    cardHeadText: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: '800', color: colors.text },
    cardStatus: { fontSize: 13, fontWeight: '600', marginTop: 2 },
    iconBtn: { padding: spacing.xs },

    checklist: { marginTop: spacing.md, gap: spacing.xs },
    checkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: 6,
    },
    checkLabel: { flex: 1, fontSize: 14, color: colors.text },
    checkLabelDone: { color: colors.textMuted, textDecorationLine: 'line-through' },

    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.sm,
    },
    progress: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
    reminderToggle: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    reminderText: { fontSize: 13, fontWeight: '700' },

    // Add modal
    modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: {
      backgroundColor: colors.bg,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      padding: spacing.lg,
      paddingBottom: spacing.xxl,
      gap: spacing.md,
    },
    sheetHandle: {
      alignSelf: 'center',
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
      marginBottom: spacing.xs,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: 15,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    dateLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
    dateValue: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
    remindRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    remindLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
    remindControl: { flex: 1 },
    modalActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
    secondaryBtn: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryBtnText: { fontSize: 15, fontWeight: '700', color: colors.text },
    primaryBtn: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      backgroundColor: colors.primary,
    },
    primaryBtnDisabled: { opacity: 0.5 },
    primaryBtnText: { fontSize: 15, fontWeight: '800', color: colors.textInverse },
  });
