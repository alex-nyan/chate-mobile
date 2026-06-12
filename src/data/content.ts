import type { Localized } from '../i18n/strings';

/**
 * All app content lives here as bilingual (English + Burmese) data.
 * Editing copy is as simple as updating the strings below — no screen changes needed.
 */

// ---------------------------------------------------------------------------
// About / Mission
// ---------------------------------------------------------------------------

export const about: {
  mission: Localized[];
  stats: { value: string; label: Localized }[];
} = {
  mission: [
    {
      en: 'Chate (ချိတ်) is a free, peer-to-peer education platform helping Myanmar students reach international higher education.',
      my: 'ချိတ် သည် မြန်မာကျောင်းသားများ နိုင်ငံတကာ အဆင့်မြင့်ပညာရေးသို့ ရောက်ရှိနိုင်စေရန် ကူညီပေးသော အခမဲ့ peer-to-peer ပညာရေး ပလက်ဖောင်းတစ်ခု ဖြစ်ပါသည်။',
    },
    {
      en: 'We connect Burmese students with admissions guidance, scholarships, and financial aid — delivered by volunteers and students already admitted to top universities around the world.',
      my: 'ကျွန်ုပ်တို့သည် မြန်မာကျောင်းသားများကို ဝင်ခွင့်လမ်းညွှန်မှု၊ ပညာသင်ဆုနှင့် ငွေကြေးအထောက်အပံ့များနှင့် ချိတ်ဆက်ပေးပါသည် — ကမ္ဘာ့ထိပ်တန်းတက္ကသိုလ်များတွင် ဝင်ခွင့်ရထားသူ ကျောင်းသားများနှင့် စေတနာ့ဝန်ထမ်းများက ဆောင်ရွက်ပေးပါသည်။',
    },
    {
      en: 'As one of the fastest-growing Burmese youth organizations, our mission is simple: no student should be held back from a world-class education by a lack of guidance.',
      my: 'အမြန်ဆုံး ကြီးထွားနေသော မြန်မာလူငယ်အဖွဲ့အစည်းတစ်ခုအနေဖြင့် ကျွန်ုပ်တို့၏ ရည်မှန်းချက်မှာ ရိုးရှင်းပါသည် — လမ်းညွှန်မှု မရှိခြင်းကြောင့် မည်သည့်ကျောင်းသားမျှ ကမ္ဘာ့အဆင့်မီ ပညာရေးမှ နောက်ကျမကျန်ရစ်စေရန် ဖြစ်ပါသည်။',
    },
  ],
  stats: [
    { value: '$4M+', label: { en: 'in scholarships facilitated', my: 'ပညာသင်ဆု ရရှိအောင် ကူညီ' } },
    { value: '32K+', label: { en: 'community followers', my: 'အသိုင်းအဝိုင်း Follower' } },
    { value: '60+', label: { en: 'active volunteers', my: 'တက်ကြွ စေတနာ့ဝန်ထမ်း' } },
    { value: '40+', label: { en: 'webinars hosted', my: 'Webinar ကျင်းပပြီး' } },
  ],
};

// ---------------------------------------------------------------------------
// Programs
// ---------------------------------------------------------------------------

export type Program = {
  id: string;
  icon: string; // Ionicons name
  title: Localized;
  summary: Localized;
  points: Localized[];
};

export const countries = [
  'United States', 'United Kingdom', 'Australia', 'Hong Kong',
  'Canada', 'Singapore', 'Japan', 'South Korea', 'Germany', 'Netherlands',
];

export const programs: Program[] = [
  {
    id: 'advising',
    icon: 'compass-outline',
    title: { en: 'College Admissions Advising', my: 'တက္ကသိုလ်ဝင်ခွင့် အကြံပေး အစီအစဉ်' },
    summary: {
      en: 'One-on-one peer mentoring that walks you through the entire application journey across 10+ countries.',
      my: 'နိုင်ငံ ၁၀ ကျော်အတွက် လျှောက်လွှာ လုပ်ငန်းစဉ်တစ်လျှောက်လုံးကို လမ်းပြပေးသော တစ်ဦးချင်း peer mentoring အစီအစဉ်။',
    },
    points: [
      { en: 'Matched with a mentor admitted to a university like yours', my: 'သင့်ရည်မှန်းချက်နှင့်တူသော တက္ကသိုလ်ဝင်ခွင့်ရထားသူ mentor နှင့် တွဲဖက်ပေးခြင်း' },
      { en: 'School selection, timelines, and application strategy', my: 'ကျောင်းရွေးချယ်ခြင်း၊ အချိန်ဇယားနှင့် လျှောက်လွှာ မဟာဗျူဟာ' },
      { en: 'Guidance on scholarships and financial aid', my: 'ပညာသင်ဆုနှင့် ငွေကြေးအထောက်အပံ့ဆိုင်ရာ လမ်းညွှန်မှု' },
    ],
  },
  {
    id: 'essay',
    icon: 'create-outline',
    title: { en: 'Essay Review — စုတုပြု Series', my: 'Essay ပြန်လည်သုံးသပ်ခြင်း — စုတုပြု' },
    summary: {
      en: 'Personalised feedback on your application essays from students who have written winning ones.',
      my: 'အောင်မြင်သော Essay များ ရေးသားခဲ့ဖူးသူ ကျောင်းသားများထံမှ သင်၏ Essay အတွက် တစ်ဦးချင်း အကြံပြုချက်များ။',
    },
    points: [
      { en: 'Structure, storytelling, and authentic voice', my: 'ဖွဲ့စည်းပုံ၊ ဇာတ်ကြောင်းပြောဆိုမှုနှင့် စစ်မှန်သော အသံ' },
      { en: 'Line-by-line and big-picture feedback', my: 'စာကြောင်းအလိုက်နှင့် ခြုံငုံသုံးသပ်ချက်များ' },
      { en: 'Common pitfalls to avoid in admissions essays', my: 'ဝင်ခွင့် Essay များတွင် ရှောင်ရှားသင့်သော အမှားများ' },
    ],
  },
  {
    id: 'scholarships',
    icon: 'school-outline',
    title: { en: 'Scholarships & Financial Aid', my: 'ပညာသင်ဆုနှင့် ငွေကြေးအထောက်အပံ့' },
    summary: {
      en: 'Find funding that fits — we help you understand and pursue scholarships and need-based aid.',
      my: 'သင့်လျော်သော ရန်ပုံငွေ ရှာဖွေခြင်း — ပညာသင်ဆုနှင့် လိုအပ်ချက်အလိုက် အထောက်အပံ့များကို နားလည်ပြီး လျှောက်ထားနိုင်ရန် ကူညီပေးပါသည်။',
    },
    points: [
      { en: 'Fully-funded and partial scholarship pathways', my: 'အပြည့်အဝနှင့် တစ်စိတ်တစ်ပိုင်း ပညာသင်ဆု လမ်းကြောင်းများ' },
      { en: 'Need-based aid and how to demonstrate it', my: 'လိုအပ်ချက်အလိုက် အထောက်အပံ့နှင့် တင်ပြနည်း' },
      { en: 'Building a financially realistic college list', my: 'ငွေကြေးအရ ဖြစ်နိုင်ချေရှိသော ကျောင်းစာရင်း ပြုစုခြင်း' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Guides / Articles
// ---------------------------------------------------------------------------

export type Article = {
  id: string;
  category: Localized;
  icon: string;
  title: Localized;
  summary: Localized;
  body: { heading: Localized; text: Localized }[];
};

export const articles: Article[] = [
  {
    id: 'curriculum',
    category: { en: 'High School', my: 'အထက်တန်း' },
    icon: 'library-outline',
    title: { en: 'Choosing Your High School Curriculum', my: 'အထက်တန်း သင်ရိုးညွှန်းတမ်း ရွေးချယ်ခြင်း' },
    summary: {
      en: 'GED, IGCSE, IBDP, American G12, or the Burmese National curriculum — how each is viewed by universities.',
      my: 'GED, IGCSE, IBDP, American G12 သို့မဟုတ် မြန်မာ အမျိုးသား သင်ရိုး — တက္ကသိုလ်များက မည်သို့ ရှုမြင်သည်ကို လေ့လာပါ။',
    },
    body: [
      {
        heading: { en: 'Why curriculum matters', my: 'သင်ရိုးက ဘာကြောင့် အရေးကြီးသလဲ' },
        text: {
          en: 'Your curriculum shapes which universities and countries you can apply to, and how your grades are interpreted. There is no single "best" track — the right choice depends on your target countries, budget, and timeline.',
          my: 'သင်၏ သင်ရိုးညွှန်းတမ်းသည် မည်သည့်တက္ကသိုလ်နှင့် နိုင်ငံများသို့ လျှောက်ထားနိုင်မည်ကိုလည်းကောင်း၊ သင်၏ အမှတ်များကို မည်သို့ အဓိပ္ပာယ်ဖွင့်ဆိုမည်ကိုလည်းကောင်း ပုံဖော်ပေးပါသည်။ အကောင်းဆုံး လမ်းကြောင်းဟူ၍ တစ်ခုတည်း မရှိပါ — သင့်ရည်မှန်းနိုင်ငံ၊ ဘတ်ဂျက်နှင့် အချိန်ဇယားပေါ်တွင် မူတည်ပါသည်။',
        },
      },
      {
        heading: { en: 'The main options', my: 'အဓိက ရွေးချယ်စရာများ' },
        text: {
          en: 'GED is fast and flexible but accepted by fewer selective schools. IGCSE + A-Levels is widely recognised across the UK, Australia, and Hong Kong. IBDP is rigorous and respected globally. American G12 diplomas suit US applications. The Burmese National curriculum can still lead abroad with strong test scores.',
          my: 'GED သည် မြန်ဆန်၍ ပြောင်းလွယ်သော်လည်း ရွေးချယ်မှုမြင့်သော ကျောင်းအနည်းငယ်သာ လက်ခံပါသည်။ IGCSE + A-Levels သည် UK, Australia, Hong Kong တွင် ကျယ်ကျယ်ပြန့်ပြန့် အသိအမှတ်ပြုခံရသည်။ IBDP သည် တင်းကြပ်ပြီး ကမ္ဘာတစ်ဝှမ်း လေးစားခံရသည်။ American G12 သည် US လျှောက်လွှာများအတွက် သင့်တော်သည်။ မြန်မာ အမျိုးသားသင်ရိုးဖြင့်လည်း စာမေးပွဲအမှတ်ကောင်းပါက ပြည်ပသို့ ဆက်သွားနိုင်ပါသည်။',
        },
      },
      {
        heading: { en: 'How to decide', my: 'မည်သို့ ဆုံးဖြတ်မလဲ' },
        text: {
          en: 'Start from your destination. List the countries you want to study in, check what credentials their universities expect, then pick the curriculum that opens the most of those doors within your means. A mentor can help you map this out.',
          my: 'သင်သွားလိုသော နေရာမှ စတင်ပါ။ လေ့လာလိုသော နိုင်ငံများကို စာရင်းပြုစုပါ၊ ၎င်းတို့၏ တက္ကသိုလ်များက မည်သည့်အရည်အချင်းကို မျှော်လင့်သည်ကို စစ်ဆေးပါ၊ ထို့နောက် သင့်တတ်နိုင်စွမ်းအတွင်း တံခါးအများဆုံး ဖွင့်ပေးနိုင်သော သင်ရိုးကို ရွေးချယ်ပါ။ Mentor တစ်ဦးက ဤအချက်ကို စီစဉ်ရာတွင် ကူညီနိုင်ပါသည်။',
        },
      },
    ],
  },
  {
    id: 'standardized-tests',
    category: { en: 'Testing', my: 'စာမေးပွဲ' },
    icon: 'document-text-outline',
    title: { en: 'Standardized Tests: SAT & ACT', my: 'စံသတ်မှတ် စာမေးပွဲများ — SAT နှင့် ACT' },
    summary: {
      en: 'What the SAT and ACT measure, when to take them, and how much they really matter today.',
      my: 'SAT နှင့် ACT သည် ဘာကို တိုင်းတာသည်၊ ဘယ်အချိန်ဖြေသင့်သည်နှင့် ယနေ့ခေတ်တွင် မည်မျှ အရေးကြီးသည်ကို လေ့လာပါ။',
    },
    body: [
      {
        heading: { en: 'SAT vs ACT', my: 'SAT နှင့် ACT' },
        text: {
          en: 'Both are accepted by US universities and many others. The SAT focuses on reading, writing, and math; the ACT adds a science-reasoning section and runs at a faster pace. Take a practice test of each and choose the one that suits your strengths.',
          my: 'နှစ်ခုလုံးကို US တက္ကသိုလ်များနှင့် အခြားအများအပြားက လက်ခံပါသည်။ SAT သည် Reading, Writing, Math ကို အာရုံစိုက်ပြီး၊ ACT တွင် Science-reasoning အပိုင်း ပါဝင်ကာ ပိုမြန်သော အရှိန်ဖြင့် ဖြေဆိုရပါသည်။ နှစ်ခုစလုံး၏ Practice Test ဖြေကြည့်ပြီး သင့်အားသာချက်နှင့် ကိုက်ညီသည့်ဟာကို ရွေးပါ။',
        },
      },
      {
        heading: { en: 'Test-optional, not test-blind', my: 'Test-optional ဆိုသည်မှာ' },
        text: {
          en: 'Many schools are now "test-optional," meaning scores are not required — but a strong score can still strengthen an international application, especially for scholarships. Decide based on each school’s policy and your own results.',
          my: 'ကျောင်းများစွာသည် ယခုအခါ "test-optional" ဖြစ်လာပြီး အမှတ်များ မလိုအပ်တော့ပါ — သို့သော် အမှတ်ကောင်းသည် နိုင်ငံတကာ လျှောက်လွှာ၊ အထူးသဖြင့် ပညာသင်ဆုများအတွက် အားကောင်းစေနိုင်ပါသည်။ ကျောင်းတစ်ခုစီ၏ မူဝါဒနှင့် သင်၏ ရလဒ်ပေါ်မူတည်၍ ဆုံးဖြတ်ပါ။',
        },
      },
      {
        heading: { en: 'A simple timeline', my: 'ရိုးရှင်းသော အချိန်ဇယား' },
        text: {
          en: 'Aim to finish testing by the autumn before your applications are due. That leaves room for one retake if needed, and time to focus on essays and recommendations afterward.',
          my: 'သင်၏ လျှောက်လွှာ ပိတ်ရက်မတိုင်မီ ဆောင်းဦးပေါက်တွင် စာမေးပွဲများ ပြီးအောင် ဖြေဆိုရန် ရည်မှန်းပါ။ ထိုသို့ဖြင့် လိုအပ်ပါက တစ်ကြိမ် ပြန်ဖြေရန် အချိန်ရှိပြီး၊ ထို့နောက် Essay နှင့် ထောက်ခံစာများကို အာရုံစိုက်နိုင်ပါသည်။',
        },
      },
    ],
  },
  {
    id: 'english-proficiency',
    category: { en: 'Testing', my: 'စာမေးပွဲ' },
    icon: 'language-outline',
    title: { en: 'English Proficiency: IELTS vs TOEFL', my: 'အင်္ဂလိပ်စာ ကျွမ်းကျင်မှု — IELTS နှင့် TOEFL' },
    summary: {
      en: 'Most universities require proof of English. Here is how the two main tests compare.',
      my: 'တက္ကသိုလ်အများစုသည် အင်္ဂလိပ်စာ အထောက်အထား လိုအပ်ပါသည်။ အဓိက စာမေးပွဲ နှစ်ခုကို နှိုင်းယှဉ်ကြည့်ပါ။',
    },
    body: [
      {
        heading: { en: 'What they test', my: 'ဘာတွေကို စစ်ဆေးသလဲ' },
        text: {
          en: 'Both IELTS and TOEFL assess reading, listening, speaking, and writing. TOEFL is fully computer-based with a built-in microphone speaking section; IELTS offers a face-to-face speaking interview and both paper and computer formats.',
          my: 'IELTS နှင့် TOEFL နှစ်ခုစလုံးသည် Reading, Listening, Speaking, Writing ကို စစ်ဆေးပါသည်။ TOEFL သည် ကွန်ပျူတာအခြေခံဖြစ်ပြီး Microphone ဖြင့် Speaking ဖြေရသည်။ IELTS တွင် မျက်နှာချင်းဆိုင် Speaking အင်တာဗျူးရှိပြီး စာရွက်နှင့် ကွန်ပျူတာ နှစ်မျိုးလုံး ရှိပါသည်။',
        },
      },
      {
        heading: { en: 'Which should you take?', my: 'ဘယ်ဟာ ဖြေသင့်သလဲ' },
        text: {
          en: 'Check your target universities’ accepted tests and minimum scores first — both are widely accepted. Then choose based on the format you are more comfortable with and which test centres or at-home options are available to you.',
          my: 'ဦးစွာ သင်ရည်မှန်းသော တက္ကသိုလ်များ လက်ခံသော စာမေးပွဲနှင့် အနိမ့်ဆုံးအမှတ်ကို စစ်ဆေးပါ — နှစ်ခုလုံး ကျယ်ကျယ်ပြန့်ပြန့် လက်ခံပါသည်။ ထို့နောက် သင် ပိုအဆင်ပြေသော ပုံစံနှင့် သင့်အတွက် ရရှိနိုင်သော စာမေးပွဲစင်တာ သို့မဟုတ် အိမ်တွင်ဖြေနိုင်သော ရွေးချယ်စရာအပေါ် မူတည်၍ ရွေးပါ။',
        },
      },
      {
        heading: { en: 'Preparing well', my: 'ကောင်းစွာ ပြင်ဆင်ခြင်း' },
        text: {
          en: 'Daily exposure beats last-minute cramming: read, listen to, and speak English every day. Take at least two full timed practice tests so the format holds no surprises on exam day.',
          my: 'နေ့စဉ် ထိတွေ့လေ့ကျင့်ခြင်းသည် နောက်ဆုံးမိနစ် အလျင်စလို ကျက်မှတ်ခြင်းထက် သာပါသည် — နေ့တိုင်း အင်္ဂလိပ်စာ ဖတ်ပါ၊ နားထောင်ပါ၊ ပြောပါ။ စာမေးပွဲနေ့တွင် ပုံစံက အံ့သြစရာ မဖြစ်စေရန် အချိန်ကန့်သတ် Practice Test အနည်းဆုံး နှစ်ကြိမ် ဖြေပါ။',
        },
      },
    ],
  },
  {
    id: 'extracurriculars',
    category: { en: 'Profile', my: 'ကိုယ်ရေးအချက်အလက်' },
    icon: 'people-outline',
    title: { en: 'Building Strong Extracurriculars', my: 'အားကောင်းသော သင်ရိုးပြင်ပ လုပ်ဆောင်ချက်များ' },
    summary: {
      en: 'Admissions officers look for depth and impact, not a long list. Here is how to build both.',
      my: 'ဝင်ခွင့်အရာရှိများသည် စာရင်းရှည်မဟုတ်ဘဲ နက်ရှိုင်းမှုနှင့် သက်ရောက်မှုကို ရှာဖွေပါသည်။ ၎င်းနှစ်ခုလုံး တည်ဆောက်နည်းကို လေ့လာပါ။',
    },
    body: [
      {
        heading: { en: 'Depth over breadth', my: 'များပြားမှုထက် နက်ရှိုင်းမှု' },
        text: {
          en: 'Sustained commitment to a few activities you genuinely care about is far more persuasive than a scattered list. Leadership, initiative, and measurable impact tell a stronger story than membership alone.',
          my: 'သင် တကယ်ဂရုစိုက်သော လုပ်ဆောင်ချက် အနည်းငယ်ကို တသမတ်တည်း ဆက်လက်လုပ်ဆောင်ခြင်းသည် ကွဲပြားသော စာရင်းရှည်ထက် များစွာ ပိုမို ယုံကြည်ဖွယ်ဖြစ်ပါသည်။ ဦးဆောင်မှု၊ ဦးစီးဦးဆောင်ပြုမှုနှင့် တိုင်းတာနိုင်သော သက်ရောက်မှုသည် အဖွဲ့ဝင်ဖြစ်ရုံထက် ပိုအားကောင်းသော ဇာတ်ကြောင်း ဖြစ်ပါသည်။',
        },
      },
      {
        heading: { en: 'Start where you are', my: 'ရှိရင်းစွဲမှ စတင်ပါ' },
        text: {
          en: 'You do not need expensive programs. Tutoring younger students, organising a community clean-up, building a small project, or growing a club at school all count. What matters is initiative and follow-through.',
          my: 'ဈေးကြီးသော အစီအစဉ်များ မလိုအပ်ပါ။ ညီငယ်များကို ကျူရှင်ပြခြင်း၊ ရပ်ရွာ သန့်ရှင်းရေး စီစဉ်ခြင်း၊ project ငယ်တစ်ခု တည်ဆောက်ခြင်း သို့မဟုတ် ကျောင်းတွင် club တစ်ခု ကြီးထွားအောင် လုပ်ခြင်းအားလုံး အကျုံးဝင်ပါသည်။ အရေးကြီးသည်မှာ ဦးစီးဦးဆောင်ပြုမှုနှင့် အဆုံးထိ လုပ်ဆောင်မှုဖြစ်ပါသည်။',
        },
      },
      {
        heading: { en: 'Tell the story clearly', my: 'ဇာတ်ကြောင်းကို ရှင်းရှင်းလင်းလင်း ပြောပါ' },
        text: {
          en: 'When you describe an activity, state your role, what you did, and the result. Concrete numbers and outcomes — students taught, funds raised, members gained — make your impact real to a reader.',
          my: 'လုပ်ဆောင်ချက်တစ်ခုကို ဖော်ပြသည့်အခါ သင်၏ အခန်းကဏ္ဍ၊ သင်လုပ်ခဲ့သည့်အရာနှင့် ရလဒ်ကို ဖော်ပြပါ။ တိကျသော ကိန်းဂဏန်းနှင့် ရလဒ်များ — သင်ကြားပေးခဲ့သော ကျောင်းသားအရေအတွက်၊ ရရှိခဲ့သော ရန်ပုံငွေ၊ တိုးပွားလာသော အဖွဲ့ဝင်များ — သည် သင်၏ သက်ရောက်မှုကို စာဖတ်သူအတွက် တကယ့်အရာ ဖြစ်စေပါသည်။',
        },
      },
    ],
  },
  {
    id: 'application-essay',
    category: { en: 'Essays', my: 'Essay' },
    icon: 'pencil-outline',
    title: { en: 'Writing Your Application Essay', my: 'လျှောက်လွှာ Essay ရေးသားခြင်း' },
    summary: {
      en: 'Your essay is where the reader meets you. Make it honest, specific, and unmistakably yours.',
      my: 'သင်၏ Essay သည် စာဖတ်သူနှင့် သင် တွေ့ဆုံရာ နေရာဖြစ်သည်။ ရိုးသား၍ တိကျပြီး သင်နှင့်သာ ကိုက်ညီအောင် ရေးပါ။',
    },
    body: [
      {
        heading: { en: 'Show, don’t tell', my: 'ပြောမနေဘဲ ပြသပါ' },
        text: {
          en: 'Instead of saying you are resilient, tell the small, true story that shows it. Specific moments and details are what readers remember — not adjectives.',
          my: 'သင် ခံနိုင်ရည်ရှိသည်ဟု ပြောမည့်အစား ၎င်းကို ပြသသော သေးငယ်၍ မှန်ကန်သော ဇာတ်ကြောင်းကို ပြောပြပါ။ တိကျသော အခိုက်အတန့်များနှင့် အသေးစိတ်များသည် စာဖတ်သူ မှတ်မိသောအရာဖြစ်သည် — နာမဝိသေသနများ မဟုတ်ပါ။',
        },
      },
      {
        heading: { en: 'Write like yourself', my: 'သင့်ပုံစံအတိုင်း ရေးပါ' },
        text: {
          en: 'Use your own voice, not what you think an admissions officer wants to hear. Authenticity is more memorable than a polished essay that could belong to anyone.',
          my: 'ဝင်ခွင့်အရာရှိ ကြားလိုသည်ဟု သင်ထင်သောအရာမဟုတ်ဘဲ သင်၏ကိုယ်ပိုင် အသံကို သုံးပါ။ မည်သူ့အတွက်မဆို ဖြစ်နိုင်သော ချောမွေ့သည့် Essay ထက် စစ်မှန်မှုသည် ပို၍ မှတ်မိဖွယ်ဖြစ်ပါသည်။',
        },
      },
      {
        heading: { en: 'Revise, then revise again', my: 'ပြန်ပြင်ပါ၊ ထပ်ပြန်ပြင်ပါ' },
        text: {
          en: 'Great essays are rewritten, not written once. Draft early, read it aloud, cut what does not serve the story, and get feedback — our စုတုပြု reviewers are here to help.',
          my: 'ကောင်းမွန်သော Essay များသည် တစ်ကြိမ်တည်း ရေးခြင်းမဟုတ်ဘဲ ပြန်လည် ရေးသားခြင်းဖြစ်သည်။ စောစော မူကြမ်းရေးပါ၊ အသံထွက်ဖတ်ပါ၊ ဇာတ်ကြောင်းကို အထောက်အကူမပြုသည်များကို ဖြတ်ပါ၊ အကြံပြုချက်ရယူပါ — ကျွန်ုပ်တို့၏ စုတုပြု reviewer များက ကူညီရန် ရှိနေပါသည်။',
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Webinars
// ---------------------------------------------------------------------------

export const webinars: { intro: Localized; topics: Localized[] } = {
  intro: {
    en: 'Our free webinar series brings admitted students and experts together to break down the application process — over 40 sessions hosted so far.',
    my: 'ကျွန်ုပ်တို့၏ အခမဲ့ Webinar အစီအစဉ်များသည် ဝင်ခွင့်ရထားသူ ကျောင်းသားများနှင့် ကျွမ်းကျင်သူများကို စုစည်းကာ လျှောက်လွှာ လုပ်ငန်းစဉ်ကို ရှင်းပြပေးပါသည် — ယခုအထိ အစီအစဉ် ၄၀ ကျော် ကျင်းပပြီးပါပြီ။',
  },
  topics: [
    { en: 'Scholarships & financial aid', my: 'ပညာသင်ဆုနှင့် ငွေကြေးအထောက်အပံ့' },
    { en: 'Country-by-country application guides', my: 'နိုင်ငံအလိုက် လျှောက်ထားနည်း လမ်းညွှန်များ' },
    { en: 'Standardized & English proficiency tests', my: 'စံသတ်မှတ် နှင့် အင်္ဂလိပ်စာ စာမေးပွဲများ' },
    { en: 'Essay writing & personal statements', my: 'Essay ရေးသားခြင်းနှင့် Personal Statement' },
    { en: 'Building your extracurricular profile', my: 'သင်ရိုးပြင်ပ ကိုယ်ရေးအချက်အလက် တည်ဆောက်ခြင်း' },
  ],
};

// ---------------------------------------------------------------------------
// Contact / links
// ---------------------------------------------------------------------------

export const contact = {
  email: 'chatethehook@gmail.com',
  website: 'https://chatethehook.com',
  facebook: 'https://www.facebook.com/chatethehook',
  messenger: 'https://m.me/chatethehook',
};
