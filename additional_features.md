# Chate — The Hook · Improvement & Feature Ideas

A living backlog of UI/UX, content, and feature suggestions. Status legend:
✅ done · 🚧 in progress · ⬜ not started.

---

## UI / UX

| #   | Idea                                                                                                                                                | Status |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Contrast on small teal labels** — category labels failed WCAG AA in teal; switched Home / Guides / Article labels to `colors.primaryDark`.        | ✅     |
| 2   | **Reading screen dead-end** — `ArticleDetailScreen` has no reading-time, progress, or "next guide" link. Add reading time + a "Continue to →" card. | ⬜     |
| 3   | **"Featured Guides" showed everything** — Home carousel renamed to "Explore Guides" (it's a browse launcher, not curated).                          | ✅     |
| 4   | **Image skeletons** — webinar/blog thumbnails pop in on slow connections; add placeholders.                                                         | ⬜     |
| 5   | **Blog list virtualization** — the ~80-post blog list renders via `.map()` in a `ScrollView`; convert to `FlatList`.                                | ⬜     |
| —   | Component unification (`Row`, `IconBadge`)                                                                                                          | ✅     |
| —   | Brand `primaryColor` fix in `app.json`                                                                                                              | ✅     |
| —   | Home top-bar title → "Home" (reduced header/brand duplication)                                                                                      | ✅     |
| —   | Centered blog filter-pill text + min touch height                                                                                                   | ✅     |
| —   | Native iOS 26 Liquid Glass tab bar (`expo-glass-effect`) + hold interaction                                                                         | ✅     |
| —   | Global haptics on/off toggle (Settings → Accessibility)                                                                                             | ✅     |
| —   | Friendly alerts on failed external links (`openExternal`)                                                                                           | ✅     |

## Content

| #   | Idea                                                                                                                                              | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 6   | **Expand the guide library** — grew from 5 → 10 (rec letters, interviews, timeline, financial aid, student visas).                                | ✅     |
| 7   | **Stats freshness** — followers updated to 34K+, "fastest-growing…" softened to "one of the fastest-growing…", and an "As of 2026" caption added. | ✅     |
| 8   | **Per-article metadata** — reading time, last-updated date, level.                                                                                | ⬜     |
| 9   | **Country chips are dead ends** — 10 countries listed, no per-country guidance. Link each to filtered content.                                    | ⬜     |
| 10  | **Bilingual glossary** — admissions jargon (ED/EA, need-blind, CSS Profile, IELTS bands) is a barrier; add a searchable EN/မြန်မာ glossary.       | ⬜     |
| 11  | **Blog is English-only** for Burmese readers (Blogger feed). Label it or add Burmese summaries.                                                   | ⬜     |

## Features

| #   | Idea                                                                                                                  | Status |
| --- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| 12  | **Deadline & application tracker** — Deadlines tab with deadlines + per-item checklist, persisted.                    | ✅     |
| 13  | **Reminders / notifications** (`expo-notifications`) — on-device deadline reminders (7d + 1d before).                 | ✅     |
| 14  | **In-app advising & essay-review requests** — forms instead of external links; serves the flagship programs directly. | ⬜     |
| 15  | **Scholarship finder** — searchable list with deadlines/eligibility (ties to "$4M+" mission).                         | ⬜     |
| 16  | **Webinar RSVP + add-to-calendar** with reminders.                                                                    | ⬜     |
| 17  | **Bookmark blog posts & webinars** (not just guides).                                                                 | ⬜     |
| 18  | **First-run onboarding** — language pick + "where are you in your journey?" to personalize Home.                      | ⬜     |

---

### Recommended next

Quick wins remaining: #2 (reading time + next-guide), #8 (article metadata). Larger: #5 (FlatList), #14 (in-app request forms), #15 (scholarship finder).
