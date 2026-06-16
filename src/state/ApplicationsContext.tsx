import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import {
  cancelReminders,
  ensureNotificationSetup,
  scheduleDeadlineReminders,
} from '../lib/notifications';

/**
 * The application/deadline tracker store. Persists a list of target schools and
 * scholarships (with a per-item checklist) to AsyncStorage, and keeps on-device
 * deadline reminders in sync as items are added, edited, or removed.
 */

export type ApplicationKind = 'school' | 'scholarship';
export type ChecklistItem = { id: string; label: string; done: boolean };

export type Application = {
  id: string;
  name: string;
  kind: ApplicationKind;
  deadline: string; // ISO date string
  checklist: ChecklistItem[];
  remindersOn: boolean;
  reminderIds: string[];
};

export type NewApplication = {
  name: string;
  kind: ApplicationKind;
  deadline: string;
  checklist: string[]; // labels for the default checklist
  remindersOn: boolean;
};

const STORAGE_KEY = 'chate.applications.v1';

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

type ApplicationsContextValue = {
  applications: Application[];
  hydrated: boolean;
  addApplication: (input: NewApplication) => Promise<void>;
  removeApplication: (id: string) => Promise<void>;
  toggleChecklistItem: (appId: string, itemId: string) => void;
  setReminders: (id: string, on: boolean) => Promise<void>;
};

const ApplicationsContext = createContext<ApplicationsContextValue | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const [applications, setApplications] = useState<Application[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as Application[];
        if (Array.isArray(parsed)) setApplications(parsed);
      })
      .catch(() => {})
      .finally(() => active && setHydrated(true));
    return () => {
      active = false;
    };
  }, []);

  // Persist whatever the next state will be, then commit it.
  const commit = (next: Application[]) => {
    setApplications(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  const addApplication = async (input: NewApplication) => {
    let reminderIds: string[] = [];
    if (input.remindersOn) {
      const granted = await ensureNotificationSetup();
      if (granted) reminderIds = await scheduleDeadlineReminders(input.name, input.deadline, lang);
    }
    const app: Application = {
      id: uid(),
      name: input.name,
      kind: input.kind,
      deadline: input.deadline,
      checklist: input.checklist.map((label) => ({ id: uid(), label, done: false })),
      remindersOn: input.remindersOn && reminderIds.length > 0,
      reminderIds,
    };
    commit([...applications, app]);
  };

  const removeApplication = async (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (app?.reminderIds.length) await cancelReminders(app.reminderIds);
    commit(applications.filter((a) => a.id !== id));
  };

  const toggleChecklistItem = (appId: string, itemId: string) => {
    commit(
      applications.map((a) =>
        a.id !== appId
          ? a
          : {
              ...a,
              checklist: a.checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)),
            },
      ),
    );
  };

  const setReminders = async (id: string, on: boolean) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    let reminderIds = app.reminderIds;
    if (on) {
      const granted = await ensureNotificationSetup();
      reminderIds = granted ? await scheduleDeadlineReminders(app.name, app.deadline, lang) : [];
    } else {
      await cancelReminders(app.reminderIds);
      reminderIds = [];
    }
    commit(
      applications.map((a) =>
        a.id === id ? { ...a, remindersOn: on && reminderIds.length > 0, reminderIds } : a,
      ),
    );
  };

  const value = useMemo(
    () => ({
      applications,
      hydrated,
      addApplication,
      removeApplication,
      toggleChecklistItem,
      setReminders,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [applications, hydrated, lang],
  );

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications(): ApplicationsContextValue {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error('useApplications must be used within an ApplicationsProvider');
  return ctx;
}
