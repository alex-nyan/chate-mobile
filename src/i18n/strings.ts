export type Lang = 'en' | 'my';

/** A piece of text available in both supported languages. */
export type Localized = { en: string; my: string };

/** Resolve a Localized value (or plain string) for the active language. */
export function tr(value: Localized | string, lang: Lang): string {
  if (typeof value === 'string') return value;
  return value[lang] ?? value.en;
}

/** Static UI chrome strings (tab labels, buttons, section headers). */
export const ui = {
  appName: { en: 'Chate — The Hook', my: 'ချိတ် — The Hook' },
  slogan: { en: 'Chate your dreams', my: 'Chate your dreams' },
  tagline: {
    en: 'Guided by Peers, Admitted Worldwide',
    my: 'အတွေ့အကြုံရှိသူများ၏ လမ်းညွှန်မှုဖြင့် ကမ္ဘာအနှံ့ဝင်ခွင့်ရ',
  },

  tabHome: { en: 'Home', my: 'ပင်မ' },
  tabPrograms: { en: 'Programs', my: 'ပရိုဂရမ်' },
  tabArticles: { en: 'Guides', my: 'လမ်းညွှန်' },

  readMore: { en: 'Read', my: 'ဖတ်ရန်' },
  ourImpact: { en: 'Our Impact', my: 'ကျွန်ုပ်တို့၏ အကျိုးသက်ရောက်မှု' },
  ourMission: { en: 'Our Mission', my: 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက်' },
  ourVision: { en: 'Our Vision', my: 'ကျွန်ုပ်တို့၏ မျှော်မှန်းချက်' },
  ourCommitment: { en: 'Our Commitment', my: 'ကျွန်ုပ်တို့၏ ကတိကဝတ်' },
  whatWeOffer: { en: 'What We Offer', my: 'ကျွန်ုပ်တို့ ပံ့ပိုးပေးသည်များ' },
  featuredPrograms: { en: 'Featured Programs', my: 'အထူးပြု ပရိုဂရမ်များ' },
  exploreGuides: { en: 'Explore Guides', my: 'လမ်းညွှန်များ ကြည့်ရှုရန်' },
  countriesCovered: {
    en: 'Countries we guide you to',
    my: 'ဝင်ခွင့်လျှောက်ထားနိုင်သော နိုင်ငံများ',
  },
  topics: { en: 'Topics covered', my: 'ပါဝင်သော အကြောင်းအရာများ' },
  upcomingTopics: { en: 'What we cover', my: 'ဆွေးနွေးသည့် အကြောင်းအရာများ' },
  getInTouch: { en: 'Get in Touch', my: 'ဆက်သွယ်ရန်' },
  joinUs: { en: 'Join the Community', my: 'အသိုင်းအဝိုင်းတွင် ပါဝင်ရန်' },
  webinars: { en: 'Webinar Series', my: 'Webinar အစီအစဉ်' },
  ourSeries: { en: 'Our series', my: 'ကျွန်ုပ်တို့၏ အစီအစဉ်များ' },
  language: { en: 'မြန်မာ', my: 'EN' }, // toggle shows the OTHER language
  langSwitchHint: { en: 'Switch language', my: 'ဘာသာစကား ပြောင်းရန်' },

  emailUs: { en: 'Email us', my: 'အီးမေးလ် ပို့ရန်' },
  messageFacebook: { en: 'Message on Facebook', my: 'Facebook မှ စာပို့ရန်' },
  visitWebsite: { en: 'Visit our website', my: 'ဝက်ဘ်ဆိုဒ် ကြည့်ရန်' },
  applyNow: { en: 'Apply / Request advising', my: 'လျှောက်လွှာ တင်ရန်' },
  applyHint: { en: 'Open application form', my: 'လျှောက်လွှာ ဖောင် ဖွင့်ရန်' },
  scholarships: { en: 'Scholarship Applications', my: 'ပညာသင်ဆု လျှောက်လွှာများ' },
  qaGroup: { en: 'Q&A Facebook Group', my: 'မေး/ဖြေ Facebook အုပ်စု' },
  followUs: { en: 'Follow us', my: 'ကျွန်ုပ်တို့ကို Follow လုပ်ပါ' },
  readConstitution: { en: 'Read our Constitution', my: 'ကျွန်ုပ်တို့၏ ဖွဲ့စည်းပုံ ဖတ်ရန်' },
  watchVoa: { en: 'Watch: VOA interview (2024)', my: 'VOA အင်တာဗျူး (၂၀၂၄) ကြည့်ရန်' },
  freeNote: {
    en: 'Everything we offer is 100% free — run by volunteers and admitted students.',
    my: 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုအားလုံးသည် လုံးဝအခမဲ့ဖြစ်ပြီး စေတနာ့ဝန်ထမ်းများနှင့် ဝင်ခွင့်ရထားသူ ကျောင်းသားများက လုပ်ဆောင်ပေးပါသည်။',
  },

  // Guides screen — segmented control + blog category filter
  segGuides: { en: 'Guides', my: 'လမ်းညွှန်' },
  segWebinars: { en: 'Webinars', my: 'Webinar' },
  segBlog: { en: 'Blog', my: 'ဘလော့' },
  blogAll: { en: 'All', my: 'အားလုံး' },
  blogScholarships: { en: 'Scholarships', my: 'ပညာသင်ဆု' },
  blogTesting: { en: 'Testing', my: 'စာမေးပွဲ' },
  blogAbout: { en: 'About ချိတ်', my: 'ချိတ် အကြောင်း' },
  blogCountNote: {
    en: '{count} articles — tap to read',
    my: 'ဆောင်းပါး {count} ပုဒ် — ဖတ်ရန် နှိပ်ပါ',
  },
  blogLoading: { en: 'Loading posts…', my: 'ပို့စ်များ ဖွင့်နေသည်…' },
  blogLoadError: {
    en: "Couldn't load the latest posts",
    my: 'နောက်ဆုံး ပို့စ်များကို ဖွင့်၍ မရပါ',
  },
  blogNotFound: { en: 'Post not found', my: 'ပို့စ် ရှာမတွေ့ပါ' },
  readOnBlog: { en: 'Read on the blog →', my: 'ဘလော့တွင် ဖတ်ရန် →' },

  // Search
  searchPlaceholder: {
    en: 'Search guides, webinars, blog…',
    my: 'လမ်းညွှန်၊ webinar၊ ဘလော့ ရှာရန်…',
  },
  searchClear: { en: 'Clear search', my: 'ရှာဖွေမှု ရှင်းရန်' },
  searchNoResults: {
    en: 'No results for “{query}”',
    my: '“{query}” အတွက် ရှာမတွေ့ပါ',
  },
  searchResultsCount: {
    en: '{count} results',
    my: 'ရလဒ် {count} ခု',
  },

  // Bookmarks / continue reading
  continueReading: { en: 'Continue reading', my: 'ဆက်ဖတ်ရန်' },
  savedHeader: { en: 'Saved', my: 'သိမ်းဆည်းထားသည်' },
  save: { en: 'Save', my: 'သိမ်းရန်' },
  saved: { en: 'Saved', my: 'သိမ်းပြီး' },
  share: { en: 'Share', my: 'မျှဝေရန်' },
  shareVia: { en: 'Share via', my: 'မျှဝေရန်' },
  shareMore: { en: 'More…', my: 'နောက်ထပ်…' },

  // Robustness — error boundary + offline state
  errorTitle: { en: 'Something went wrong', my: 'တစ်ခုခု မှားယွင်းသွားပါသည်' },
  errorBody: {
    en: 'The app ran into an unexpected problem. You can try again.',
    my: 'အက်ပ်တွင် မမျှော်လင့်သော ပြဿနာတစ်ခု ဖြစ်ပွားခဲ့ပါသည်။ ထပ်မံ ကြိုးစားနိုင်ပါသည်။',
  },
  errorRetry: { en: 'Try again', my: 'ထပ်စမ်းကြည့်ရန်' },
  offline: {
    en: "You're offline — some content may not load",
    my: 'အင်တာနက် မရှိပါ — အချို့ အကြောင်းအရာများ ပြသနိုင်မည် မဟုတ်ပါ',
  },

  // Home screen
  featuredGuides: { en: 'Featured Guides', my: 'အထူးပြု လမ်းညွှန်များ' },
  latestWebinar: { en: 'Latest Webinar', my: 'နောက်ဆုံး Webinar' },
  watchOnYoutube: { en: 'Watch on YouTube', my: 'YouTube တွင် ကြည့်ရန်' },

  // Settings screen
  tabSettings: { en: 'Settings', my: 'ဆက်တင်' },
  appearance: { en: 'Appearance', my: 'အသွင်အပြင်' },
  themeSystem: { en: 'System', my: 'စနစ်' },
  themeLight: { en: 'Light', my: 'အလင်း' },
  themeDark: { en: 'Dark', my: 'အမှောင်' },
  darkStyle: { en: 'Dark style', my: 'အမှောင် ပုံစံ' },
  darkBlue: { en: 'Blue', my: 'အပြာ' },
  darkBlack: { en: 'Black', my: 'အနက်' },
  languageHeader: { en: 'Language', my: 'ဘာသာစကား' },
  textSize: { en: 'Text size', my: 'စာလုံးအရွယ်အစား' },
  textSmall: { en: 'Small', my: 'သေး' },
  textDefault: { en: 'Default', my: 'ပုံမှန်' },
  textLarge: { en: 'Large', my: 'ကြီး' },
  textXL: { en: 'XL', my: 'အကြီးဆုံး' },
  savedArticles: { en: 'Saved articles', my: 'သိမ်းထားသော ဆောင်းပါးများ' },
  noSavedArticles: { en: 'No saved articles yet', my: 'သိမ်းထားသော ဆောင်းပါး မရှိသေးပါ' },
  about: { en: 'About', my: 'အကြောင်း' },
  version: { en: 'Version', my: 'ဗားရှင်း' },
  buildNumber: { en: 'Build', my: 'Build' },
} as const;
