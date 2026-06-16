# Chate — The Hook · Improvement & Feature Ideas

A living backlog of UI/UX, content, and feature suggestions. Status legend:
✅ done · 🚧 in progress · ⬜ not started.

---

## UI / UX

| #   | Idea                                                                                                                                                                    | Status |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Contrast on small teal labels** — uppercase category labels use `colors.primary` (~2.5:1 on white) at 11–12px, failing WCAG AA. Switch those to `colors.primaryDark`. | ⬜     |
| 2   | **Reading screen dead-end** — `ArticleDetailScreen` has no reading-time, progress, or "next guide" link. Add reading time + a "Continue to →" card.                     | ⬜     |
| 3   | **"Featured Guides" shows everything** — Home maps _all_ articles. Curate a `featured` flag or rename "Browse Guides."                                                  | ⬜     |
| 4   | **Image skeletons** — webinar/blog thumbnails pop in on slow connections; add placeholders.                                                                             | ⬜     |
| 5   | **Blog list virtualization** — the ~80-post blog list renders via `.map()` in a `ScrollView`; convert to `FlatList`.                                                    | ⬜     |
| —   | Component unification (`Row`, `IconBadge`)                                                                                                                              | ✅     |
| —   | Brand `primaryColor` fix in `app.json`                                                                                                                                  | ✅     |
| —   | Home top-bar title → "Home" (reduced header/brand duplication)                                                                                                          | ✅     |
| —   | Centered blog filter-pill text + min touch height                                                                                                                       | ✅     |
| —   | Native iOS 26 Liquid Glass tab bar (`expo-glass-effect`) + hold interaction                                                                                             | ✅     |
| —   | Global haptics on/off toggle (Settings → Accessibility)                                                                                                                 | ✅     |
| —   | Friendly alerts on failed external links (`openExternal`)                                                                                                               | ✅     |

## Content

| #   | Idea                                                                                                                                                                            | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 6   | **Expand the guide library** — only 5 bundled guides. Add evergreen topics: recommendation letters, interviews, financial aid, application platforms, student visas, timelines. | 🚧     |
| 7   | **Stats freshness** — `$4M+ / 32K+ / 60+ / 40+` are hardcoded and "fastest-growing…" is an unverifiable superlative. Add an "as of YYYY" qualifier; soften the claim.           | ⬜     |
| 8   | **Per-article metadata** — reading time, last-updated date, level.                                                                                                              | ⬜     |
| 9   | **Country chips are dead ends** — 10 countries listed, no per-country guidance. Link each to filtered content.                                                                  | ⬜     |
| 10  | **Bilingual glossary** — admissions jargon (ED/EA, need-blind, CSS Profile, IELTS bands) is a barrier; add a searchable EN/မြန်မာ glossary.                                     | ⬜     |
| 11  | **Blog is English-only** for Burmese readers (Blogger feed). Label it or add Burmese summaries.                                                                                 | ⬜     |

## Features

| #   | Idea                                                                                                                                          | Status |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 12  | **Deadline & application tracker** — add target schools/scholarships with deadlines + a checklist. Turns a reader app into a weekly-use tool. | 🚧     |
| 13  | **Reminders / notifications** (`expo-notifications`) — deadline alerts; new webinar / blog post. Pairs with #12.                              | 🚧     |
| 14  | **In-app advising & essay-review requests** — forms instead of external links; serves the flagship programs directly.                         | ⬜     |
| 15  | **Scholarship finder** — searchable list with deadlines/eligibility (ties to "$4M+" mission).                                                 | ⬜     |
| 16  | **Webinar RSVP + add-to-calendar** with reminders.                                                                                            | ⬜     |
| 17  | **Bookmark blog posts & webinars** (not just guides).                                                                                         | ⬜     |
| 18  | **First-run onboarding** — language pick + "where are you in your journey?" to personalize Home.                                              | ⬜     |

---

### Recommended order

1. Quick wins: #1, #3, #7, #8.
2. Content depth (#6) — in progress.
3. Deadline tracker + reminders (#12–13) — the biggest differentiator; in progress.
