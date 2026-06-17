# Chate — The Hook · Mobile App (Technical Overview)

> A reference doc for résumés, portfolios, and technical conversations. It covers
> what the app is, who it's for, the full tech stack, the architecture, and the
> notable engineering decisions behind it.

---

## 1. What it is

**Chate — The Hook** is a bilingual (English + မြန်မာ/Burmese) iOS & Android app
that helps Myanmar students navigate the international university-admissions
process — scholarships, standardized tests, essays, application deadlines, and
peer guidance. It ships from a single Expo / React Native codebase to both the
App Store and Google Play, and the core experience works **fully offline**.

- **Platforms:** iOS, Android, and web (via `react-native-web`) from one codebase.
- **Languages:** Full English ⇄ Burmese localization across the entire UI _and_
  content, switchable at runtime with no reload.
- **Offline-first:** All guides, mission/program copy, and UI strings are bundled,
  so the app loads instantly and reads with no connection. Network-backed extras
  (live blog feed, webinar thumbnails/video) degrade gracefully to cached
  snapshots and placeholders.

---

## 2. Target audience & problem

**Primary users:** Myanmar high-school and undergraduate students (and their
families) pursuing scholarships and admission to universities abroad — many on
slow, intermittent, or data-capped mobile connections.

**The problem it solves:**

- Admissions information is fragmented, English-heavy, and assumes context that
  first-generation applicants don't have.
- Connectivity in Myanmar is unreliable, so a network-dependent web experience
  fails exactly when students need it.
- Deadlines (scholarships, application platforms, test dates) are easy to miss.

**How the app responds:** bilingual content, an offline-first reader, a curated
guide library, and a **deadline/application tracker** with on-device reminders —
turning a one-time reference into a recurring planning tool.

---

## 3. Tech stack

| Layer              | Technology                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Language**       | TypeScript (strict), React 19                                                                                 |
| **Framework**      | Expo SDK 55 / React Native 0.83                                                                               |
| **Navigation**     | React Navigation 7 — bottom tabs + native stacks, typed routes, deep linking                                  |
| **State**          | React Context + hooks (theme, language, bookmarks, text-scale, haptics, applications)                         |
| **Persistence**    | AsyncStorage (settings, bookmarks, trackers, offline feed snapshot)                                           |
| **Networking**     | `fetch` with `AbortController` timeouts; stale-while-revalidate caching                                       |
| **Notifications**  | `expo-notifications` — scheduled, on-device local reminders (no push server)                                  |
| **Native UI**      | `expo-glass-effect` (native iOS 26 Liquid Glass tab bar), `expo-blur`, `expo-haptics`, `expo-linear-gradient` |
| **Connectivity**   | `@react-native-community/netinfo` for offline detection                                                       |
| **Typography**     | Lexend brand typeface via `@expo-google-fonts/lexend`                                                         |
| **Icons**          | `@expo/vector-icons` (Ionicons)                                                                               |
| **Web rendering**  | `react-native-webview` (blog post detail), `react-native-web`                                                 |
| **Build & deploy** | EAS Build + EAS Submit + EAS Update (OTA), per-channel profiles                                               |
| **Tooling**        | ESLint 9, Prettier, Jest (`jest-expo`), `tsc --noEmit` typecheck                                              |
| **CI**             | GitHub Actions — typecheck, lint, test, and format-check on every push/PR                                     |

---

## 4. Architecture

```
App.tsx                  Root: provider stack (theme → language → text-size →
                         haptics → bookmarks) + ErrorBoundary + navigation
src/
  theme/                 Semantic color palette + ThemeContext (light/dark/black)
  i18n/                  Language context + bilingual UI strings (tr() resolver)
  data/content.ts        ALL bundled content as { en, my } pairs (~1,350 lines)
  components/            16 reusable UI primitives (Row, Card, Chip, AppBar,
                         HomeHero, StatCard, VideoCard, LiquidGlassTabBar, …)
  screens/               8 screens, one file each
  navigation/            Bottom tabs + Guides/Settings stacks, typed + deep-linked
  lib/                   Blog feed client, share, haptics, notifications,
                         network/reduce-motion hooks, error reporting
  state/                 Bookmarks, text-scale, haptics, applications (AsyncStorage)
```

~7,000 lines of TypeScript/TSX across the app.

### Key design decisions

**Content/UI fully decoupled from components.** Every string lives as an
`{ en, my }` pair in `src/data/content.ts` (content) or `src/i18n/strings.ts`
(UI labels). Screens render whatever is in the data files, so a non-engineer can
add a guide, fix copy, or update a stat by editing one file — no React knowledge
required. Localization is a single `t(value)` / `tr(value, lang)` resolver, not a
heavyweight i18n library.

**Semantic theming with three palettes.** `src/theme/colors.ts` defines light,
dark, and "black" (Material charcoal) palettes that share _identical keys_. Tokens
are semantic (e.g. `primaryDark` = "emphasized heading text"), so the dark palette
_flips values_ — `primaryDark` becomes a _light_ teal so headings stay legible on
dark backgrounds. Components read the active palette through `useTheme()` /
`useThemedStyles()` and never import raw colors, so the whole app re-themes from
one source of truth.

**Offline-first with stale-while-revalidate.** The live blog feed (Blogger JSON,
~80 posts) uses a two-level cache: an in-memory map for instant in-session
navigation, plus an AsyncStorage snapshot that hydrates on cold start and renders
immediately while a fresh fetch revalidates in the background. Network failures
fall back to the last snapshot, then to a bundled list — the user always sees
_something_. Fetches are bounded by an `AbortController` timeout.

**On-device deadline reminders, no backend.** The application tracker
(`ApplicationsContext`) persists target schools/scholarships with per-item
checklists, and keeps `expo-notifications` reminders (7 days + 1 day before, 9am
local) in sync as items are added, edited, toggled, or removed — handling
permission gating and Android notification channels, with zero server or push
infrastructure.

**Resilience baked into the provider stack.** An `ErrorBoundary` wraps the tree;
`initErrorReporting()` funnels uncaught errors and unhandled rejections through a
single reporter with a documented Sentry swap-in point. The splash screen is held
until the brand fonts load so the UI never flashes the system font.

**Accessibility & polish.** Runtime text-size scaling, a "reduce motion" hook,
a global haptics on/off toggle, safe-area handling, WCAG-aware contrast choices,
and friendly fallback alerts when external links fail to open.

---

## 5. Notable engineering highlights

- **Native iOS 26 "Liquid Glass" tab bar** via `expo-glass-effect`, with a
  custom hold interaction and haptic feedback — using a brand-new platform
  capability rather than a faked blur.
- **Runtime language switching** that flips the _entire_ app (UI + content)
  between English and Burmese instantly, with the choice persisted and hydrated
  before first paint to avoid a flash of the wrong language.
- **Three-way theming** (system/light/dark + a separate neutral "black" dark
  style) driven entirely by semantic tokens.
- **Graceful degradation everywhere** — offline banner, cached feeds, image
  placeholders, link-failure alerts, best-effort persistence that never throws.
- **Typed navigation** with param lists and deep linking configured per stack.

---

## 6. Quality & delivery

- **CI on every push/PR** (GitHub Actions): `tsc --noEmit` typecheck → ESLint →
  Jest → Prettier format check.
- **Unit tests** for the pure feed parser and color utilities (`jest-expo`).
- **Strict TypeScript** throughout; ESLint (`eslint-config-expo`) + Prettier
  enforced.
- **EAS pipeline**: development / preview / production build profiles, OTA
  updates via `expo-updates` (runtime version pinned to app version), and EAS
  Submit configured for both stores.

---

## 7. Skills demonstrated (résumé-ready)

- Built and shipped a **cross-platform (iOS/Android/web) React Native app** from
  a single Expo/TypeScript codebase, including the full EAS build, OTA-update, and
  store-submission pipeline.
- Designed an **offline-first architecture** with stale-while-revalidate caching,
  bounded network requests, and multi-level graceful degradation for users on
  unreliable connections.
- Implemented **full runtime localization** (English ⇄ Burmese) across UI and
  content via a data-driven `{ en, my }` model that decouples copy from code.
- Created a **semantic, multi-palette theming system** (light/dark/black) with a
  single source of truth and zero hard-coded colors in components.
- Built an **on-device reminder/scheduling feature** with `expo-notifications`
  (permissions, Android channels, lifecycle-synced local notifications) and no
  backend.
- Adopted **native platform capabilities** (iOS 26 Liquid Glass, haptics) and
  shipped **accessibility features** (text scaling, reduce-motion, contrast, haptic
  toggle).
- Set up **CI/CD and code quality gates**: GitHub Actions, Jest, ESLint, Prettier,
  and strict TypeScript.

---

## 8. At a glance

|                  |                                                                  |
| ---------------- | ---------------------------------------------------------------- |
| **Type**         | Cross-platform mobile app (iOS + Android + web)                  |
| **Codebase**     | ~7,000 LOC TypeScript / TSX, single Expo project                 |
| **Surface**      | 4 tabs · 8 screens · 16 reusable components                      |
| **Languages**    | English + Burmese (full UI + content)                            |
| **Backend**      | None — bundled content + on-device storage + public Blogger feed |
| **Distribution** | App Store + Google Play via EAS, OTA updates via `expo-updates`  |
| **Website**      | [chatethehook.com](https://chatethehook.com)                     |

```

```
