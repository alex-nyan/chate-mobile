# Chate — The Hook (Mobile App)

A bilingual (English + မြန်မာ) iOS & Android reader app for **ချိတ် (Chate) — The Hook**,
the peer-to-peer platform helping Myanmar students reach international higher education.
Website: [chatethehook.com](https://chatethehook.com)

Built with **Expo (React Native)** — one codebase ships to both App Store and Google Play.
The reader content (mission, programs, guide articles, webinar info, and UI copy) is bundled
in, so the core app loads instantly and reads offline. Network-backed extras — webinar
thumbnails & videos and the live blog feed — need a connection; when offline, thumbnails fall
back to a placeholder, the blog shows a bundled snapshot, and an "offline" notice appears
above the tab bar.

## Running it

```bash
npm install        # first time only
npm start          # start the dev server, then scan the QR code with Expo Go
npm run ios        # open in the iOS simulator (macOS + Xcode)
npm run android    # open in an Android emulator
npm run web        # open in a browser (react-native-web)
```

Install the free **Expo Go** app on your phone to preview without any build step.

## What's inside

| Tab | Screen | Content |
| --- | --- | --- |
| Home | `HomeScreen` | Mission / Vision / Commitment, featured guides carousel, latest webinar, impact stats ($4M+, 32K+, 60+, 40+) |
| Programs | `ProgramsScreen` | MEXT & Global scholarship application links, advising, essay review (စုတုပြု), scholarships + countries |
| Guides | `GuidesScreen` → `ArticleDetailScreen` | Three sub-tabs — **Guides** (curriculum, SAT/ACT, IELTS/TOEFL, extracurriculars, essays), **Webinars** (video series), **Blog** (live feed with category filter) — plus full-text search |
| Settings | `SettingsScreen` → `SavedArticlesScreen` | Appearance (System/Light/Dark + Blue/Black dark styles), language, text size, saved articles, contact + socials, app version |

Bookmark any guide to read it later (saved under Settings → Saved articles), and the Guides
tab surfaces a "Continue reading" card for the last article you opened. Language is switched
in **Settings → Language** and flips the entire app between **English** and **Burmese**.

## Editing content (no React needed)

All copy lives in **`src/data/content.ts`** as `{ en, my }` pairs. To change wording,
add an article, or update a stat, edit that one file — the screens render whatever is there.
UI labels (tab names, buttons, section headers) live in `src/i18n/strings.ts`.

```ts
// Add a new guide article:
{
  id: 'visas',
  category: { en: 'Logistics', my: 'ထောက်ပံ့ပို့ဆောင်ရေး' },
  icon: 'airplane-outline',           // any Ionicons name
  title: { en: 'Student Visas 101', my: '...' },
  summary: { en: '...', my: '...' },
  body: [{ heading: { en: '...', my: '...' }, text: { en: '...', my: '...' } }],
}
```

## Design system

Theme tokens (brand palette, spacing, radius, shadow) live in `src/theme/colors.ts` and are
**semantic** — light/dark/black palettes share the same keys, so components read the active
palette via `useTheme()` / `useThemedStyles()` rather than importing colors directly. All text
renders in the Lexend brand typeface through the shared `Text` component.

Reusable UI lives in `src/components/`. Notable building block: **`Row`** — the single
tappable/info row used across the app. It renders a tinted icon badge, a label (+ optional
sublabel), an optional right-aligned value, and a trailing affordance, and covers three cases:

```tsx
<Row icon="mail-outline" label="Email us" sublabel={email} url={`mailto:${email}`} />   // external link → "open" icon
<Row icon="bookmark-outline" label="Saved" value="3" onPress={openSaved} />             // in-app action → chevron
<Row label="Version" value="1.0.0" />                                                   // static info → no trailing
```

Pass `variant="card"` for an elevated, standalone CTA (e.g. the scholarship links on the
Programs tab); the default `list` variant is a flat row for settings-style lists.

## Project structure

```
App.tsx                    Root: providers (theme, language, text-size, bookmarks) + navigation
src/
  theme/                   Semantic palette + ThemeContext (light / dark / black)
  i18n/                    Language context + bilingual UI strings
  data/content.ts          ← all bundled content (English + Burmese)
  components/               Reusable UI (Row, Card, Chip, AppBar, HomeHero, StatCard,
                            VideoCard, SegmentedControl, LiquidGlassTabBar, OfflineBanner, …)
  screens/                 One file per screen
  navigation/              Bottom tabs + Guides / Settings stacks
  lib/                     blogger feed, share, haptics, network + reduce-motion hooks, error reporting
  state/                   Bookmarks + text-scale contexts (persisted via AsyncStorage)
```

## Building for the stores

Use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas build --platform ios       # → .ipa for App Store
eas build --platform android   # → .aab for Google Play
```

Bundle IDs are set in `app.json` (`com.chatethehook.app`).
