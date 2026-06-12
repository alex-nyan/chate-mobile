# Chate — The Hook (Mobile App)

A bilingual (English + မြန်မာ) iOS & Android reader app for **ချိတ် (Chate) — The Hook**,
the peer-to-peer platform helping Myanmar students reach international higher education.
Website: [chatethehook.com](https://chatethehook.com)

Built with **Expo (React Native)** — one codebase ships to both App Store and Google Play.
The app is a static reader: all content is bundled in, so it loads instantly and works offline.

## Running it

```bash
npm start          # start the dev server, then scan the QR code with Expo Go
npm run ios        # open in the iOS simulator (macOS + Xcode)
npm run android    # open in an Android emulator
```

Install the free **Expo Go** app on your phone to preview without any build step.

## What's inside

| Tab | Screen | Content |
| --- | --- | --- |
| Home | `HomeScreen` | Mission + impact stats ($4M+, 32K+, 60+, 40+) |
| Programs | `ProgramsScreen` | Advising, essay review (စုတုပြု), scholarships + countries |
| Guides | `GuidesScreen` → `ArticleDetailScreen` | Curriculum, SAT/ACT, IELTS/TOEFL, extracurriculars, essays |
| Connect | `ConnectScreen` | Webinar series + contact links (Messenger, FB, email, web) |

A globe button in every header flips the entire app between **English** and **Burmese**.

## Editing content (no React needed)

All copy lives in **`src/data/content.ts`** as `{ en, my }` pairs. To change wording,
add an article, or update a stat, edit that one file — the screens render whatever is there.
UI labels (tab names, buttons) live in `src/i18n/strings.ts`.

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

## Project structure

```
App.tsx                    Root: providers + navigation
src/
  theme/colors.ts          Brand palette, spacing, radius, shadows
  i18n/                    Language context + bilingual UI strings
  data/content.ts          ← all content (English + Burmese)
  components/               Reusable UI (Card, Hero, AppBar, LinkButton, …)
  screens/                 One file per screen
  navigation/              Bottom tabs + Guides stack
```

## Building for the stores

Use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas build --platform ios       # → .ipa for App Store
eas build --platform android   # → .aab for Google Play
```

Bundle IDs are set in `app.json` (`com.chatethehook.app`).
