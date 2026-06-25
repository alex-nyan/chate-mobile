# App Store Submission Kit — *Chate — The Hook*

Everything to fill in App Store Connect for `com.chatethehook.app`. Copy-paste the
**copy blocks**, answer the **structured fields**, and host the **privacy policy**.
Character limits are noted; App Store Connect shows a live counter for each field.

---

## 0. Pre-submission checklist

- [ ] **Build #8 processed** and selected for this version (it's in TestFlight).
- [ ] **App record created** in App Store Connect for `com.chatethehook.app`.
- [ ] **Privacy policy hosted** at a public URL (see §7) — required.
- [ ] **Screenshots uploaded** — iPhone 6.9"/6.7" **and** iPad 13" (because
      `supportsTablet: true`). See §6.
- [ ] **App Privacy** questionnaire completed → "Data Not Collected" (see §5).
- [ ] **Age rating** questionnaire completed (see §4).
- [ ] **Category** set (see §3).
- [ ] **Support URL** reachable (see §2).
- [ ] **Review notes + contact** filled (see §8).
- [ ] Pricing = **Free**, territories selected (incl. Myanmar).

> **Decision needed:** keep iPad support (and provide iPad screenshots), or set
> `ios.supportsTablet: false` in `app.json`, rebuild, and submit iPhone-only.

---

## 1. Copy blocks (paste these)

### App Name — *max 30 chars*
```
Chate — The Hook
```

### Subtitle — *max 30 chars*
```
Study-abroad guide & tracker
```

### Promotional text — *max 170 chars; editable anytime without review*
```
Your bilingual study-abroad companion for Myanmar students — guides, scholarship deadlines, and reminders. Works fully offline, in English and Burmese.
```

### Keywords — *max 100 chars, comma-separated, no spaces*
```
scholarship,university,admissions,college,application,deadline,abroad,Myanmar,Burmese,IELTS,SAT
```
*(~95 chars. Don't repeat the app name or category — Apple already indexes those.)*

### Description — *max 4000 chars*
```
Chate — The Hook is the study-abroad companion built for Myanmar students. Whether you're chasing a scholarship, preparing for the SAT or IELTS, or piecing together a university application, Chate brings the guidance, deadlines, and inspiration into one calm, bilingual app — fully in English and မြန်မာ.

WHY STUDENTS LOVE IT
• Bilingual, instantly — switch the entire app between English and Burmese with one tap.
• Works offline — guides and resources are built in, so they load instantly and read with no connection or data.
• No account, no ads, no tracking — your notes and deadlines stay private on your device.

WHAT'S INSIDE
• Guide library — clear, step-by-step articles on scholarships, standardized tests, essays, and the whole application journey.
• Deadline & application tracker — add the schools and scholarships you're targeting, build a checklist for each, and get on-device reminders so you never miss a date.
• Curated blog — fresh stories, tips, and announcements from the Chate community.
• Webinars & videos — learn from sessions and series made for applicants like you.
• Save for later — bookmark the articles that matter and find them in one place.

BUILT FOR REAL CONDITIONS
Connectivity isn't always reliable, and admissions information is often scattered and English-heavy. Chate puts the essentials in your pocket — bilingual, offline-ready, and easy to navigate — so you can focus on your future instead of hunting for answers.

Start your journey today. Your hook into studying abroad.

Learn more at chatethehook.com
```

### What's New (release notes) — *for v1.0.0*
```
Welcome to Chate — The Hook! Our first release includes a bilingual (English & Burmese) guide library, a deadline and application tracker with reminders, a curated blog, and webinars — all working offline. We'd love your feedback.
```

---

## 2. URLs

| Field | Value | Notes |
|---|---|---|
| **Support URL** | `https://chatethehook.com` | Required & must load. A `/support` or contact page is ideal. |
| **Marketing URL** | `https://chatethehook.com` | Optional. |
| **Privacy Policy URL** | `https://alex-nyan.github.io/chate-mobile/privacy.html` | ✅ **Live** (GitHub Pages, source `docs/privacy.html`). |

---

## 3. App information

- **Primary category:** Education
- **Secondary category:** Reference *(or Productivity, given the tracker — pick one)*
- **Content rights:** You own or have rights to all content (your own guides/blog).
- **Bundle ID:** `com.chatethehook.app`

---

## 4. Age rating

Answer the questionnaire honestly. For this app, expect **4+**. Watch one question:

- **"Unrestricted Web Access"** → **No.** The in-app web view shows *your* blog
  posts (curated content), not an open browser. External links opening in Safari
  do **not** count as unrestricted web access.
- No violence, mature themes, gambling, or user-generated content → all **None**.

---

## 5. App Privacy (data collection)

**Answer: "Data Not Collected."** This is accurate for the current build:

- No account, no sign-in, no personal info requested.
- Bookmarks, tracked deadlines, checklists, and settings are stored **on-device**
  (AsyncStorage) and never transmitted.
- Deadline reminders are **local** notifications — no push server, no tokens.
- The app fetches **public, read-only** content (blog feed, optional Google Sheet)
  and sends no personal data with those requests.
- No third-party analytics or advertising SDKs.

> ⚠️ **If you ever wire up analytics or Sentry** (the error reporter is currently a
> stub), you must come back and update this section *before* that build ships.

---

## 6. Screenshots

Apple derives smaller sizes from the largest, so you need:

| Device | Required size (px) | Required? |
|---|---|---|
| iPhone 6.9" (16 Pro Max) | 1320 × 2868 | ✅ Yes (or 6.7" 1290×2796) |
| iPad 13" | 2064 × 2752 | ✅ **Yes — because `supportsTablet: true`** |

- 1–10 screenshots per device; **3–5 is the sweet spot.**
- Suggested order: Home → Guides/article → Deadline tracker → Blog → language toggle
  (show the Burmese UI on at least one — it's a differentiator).
- App icon (1024×1024, no alpha) comes from the build automatically. ✅

> To dodge the iPad requirement entirely: set `ios.supportsTablet: false`, rebuild,
> resubmit. Only do this if you don't want the app on iPad.

---

## 7. Privacy Policy (host this at the Privacy Policy URL)

> Copy this to `chatethehook.com/privacy` (or any public URL) and put that link in
> the Privacy Policy URL field. Fill the bracketed bits.

```
Privacy Policy — Chate — The Hook
Last updated: [DATE]

Chate — The Hook ("the app", "we", "us") respects your privacy. This policy
explains what the app does and does not do with information.

Information we collect
None. The app does not require an account and does not ask for your name, email,
or any other personal information.

Data stored on your device
Your bookmarks, the schools and scholarships you add to the tracker, your
checklists, and your settings (such as language and theme) are stored only on your
device. This information never leaves your device and is not sent to us or any
third party. Deleting the app removes this data.

Notifications
If you enable deadline reminders, the app schedules local notifications on your
device. They are generated and delivered entirely on your device; we do not
operate a push-notification server and receive no information about your reminders.

Network requests
To show the latest articles and posts, the app fetches publicly available content
from our blog and content sources. These are standard read-only requests for
public content; the app sends no personal information with them. As with any
internet request, the host may receive your device's IP address, which we do not
use to identify you.

Third-party services
The app does not include third-party advertising or analytics SDKs.

Children's privacy
The app does not knowingly collect personal information from anyone, including
children.

Changes
We may update this policy from time to time. Material changes will be posted on
this page with a new "Last updated" date.

Contact
Questions? Contact us at [support email] or via chatethehook.com.
```

---

## 8. App Review Information

- **Sign-in required:** No.
- **Demo account:** Not applicable (no login).
- **Contact:** [your name] · [phone] · [email]
- **Notes for the reviewer:**
```
Chate — The Hook is a free, bilingual (English/Burmese) educational app for students applying to universities abroad.

• No account or login is required — all features are available immediately.
• The app works fully offline; bundled content is available with no network.
• It also displays a public, read-only blog feed and optional content from a public Google Sheet. No user data is collected or transmitted.
• Deadline reminders use local (on-device) notifications only — there is no push server.
• To view the Burmese interface, open Settings inside the app and switch the language.

Thank you for reviewing!
```

---

## 9. What I can't do for you (portal steps)

These happen in App Store Connect / your website — not from code:

1. Create the app record (Apps → ＋ → New App; bundle id `com.chatethehook.app`).
2. Host the privacy policy and confirm the URL loads.
3. Upload screenshots.
4. Paste the copy blocks above into the matching fields.
5. Select build #8, complete App Privacy + age rating, then **Add for Review**.

Once you submit, Apple review for a first version is typically 1–3 days.
```
