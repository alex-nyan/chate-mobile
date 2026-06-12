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
  tagline: { en: 'Guided by Peers, Admitted Worldwide', my: 'အတွေ့အကြုံရှိသူများ၏ လမ်းညွှန်မှုဖြင့် ကမ္ဘာအနှံ့ဝင်ခွင့်ရ' },

  tabHome: { en: 'Home', my: 'ပင်မ' },
  tabPrograms: { en: 'Programs', my: 'ပရိုဂရမ်' },
  tabArticles: { en: 'Guides', my: 'လမ်းညွှန်' },
  tabConnect: { en: 'Connect', my: 'ဆက်သွယ်ရန်' },

  readMore: { en: 'Read', my: 'ဖတ်ရန်' },
  ourImpact: { en: 'Our Impact', my: 'ကျွန်ုပ်တို့၏ အကျိုးသက်ရောက်မှု' },
  ourMission: { en: 'Our Mission', my: 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက်' },
  whatWeOffer: { en: 'What We Offer', my: 'ကျွန်ုပ်တို့ ပံ့ပိုးပေးသည်များ' },
  exploreGuides: { en: 'Explore Guides', my: 'လမ်းညွှန်များ ကြည့်ရှုရန်' },
  countriesCovered: { en: 'Countries we guide you to', my: 'ဝင်ခွင့်လျှောက်ထားနိုင်သော နိုင်ငံများ' },
  topics: { en: 'Topics covered', my: 'ပါဝင်သော အကြောင်းအရာများ' },
  upcomingTopics: { en: 'What we cover', my: 'ဆွေးနွေးသည့် အကြောင်းအရာများ' },
  getInTouch: { en: 'Get in Touch', my: 'ဆက်သွယ်ရန်' },
  joinUs: { en: 'Join the Community', my: 'အသိုင်းအဝိုင်းတွင် ပါဝင်ရန်' },
  webinars: { en: 'Webinar Series', my: 'Webinar အစီအစဉ်' },
  language: { en: 'မြန်မာ', my: 'EN' }, // toggle shows the OTHER language
  langSwitchHint: { en: 'Switch language', my: 'ဘာသာစကား ပြောင်းရန်' },

  emailUs: { en: 'Email us', my: 'အီးမေးလ် ပို့ရန်' },
  messageFacebook: { en: 'Message on Facebook', my: 'Facebook မှ စာပို့ရန်' },
  visitWebsite: { en: 'Visit our website', my: 'ဝက်ဘ်ဆိုဒ် ကြည့်ရန်' },
  applyNow: { en: 'Apply / Request advising', my: 'လျှောက်လွှာ တင်ရန်' },
  qaGroup: { en: 'Q&A Facebook Group', my: 'မေး/ဖြေ Facebook အုပ်စု' },
  followUs: { en: 'Follow us', my: 'ကျွန်ုပ်တို့ကို Follow လုပ်ပါ' },
  freeNote: {
    en: 'Everything we offer is 100% free — run by volunteers and admitted students.',
    my: 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုအားလုံးသည် လုံးဝအခမဲ့ဖြစ်ပြီး စေတနာ့ဝန်ထမ်းများနှင့် ဝင်ခွင့်ရထားသူ ကျောင်းသားများက လုပ်ဆောင်ပေးပါသည်။',
  },
} as const;
