import type { Localized } from '../i18n/strings';

/**
 * All app content lives here as bilingual (English + Burmese) data.
 * Editing copy is as simple as updating the strings below — no screen changes needed.
 */

// ---------------------------------------------------------------------------
// About / Mission
// ---------------------------------------------------------------------------

export const about: {
  mission: Localized;
  vision: Localized;
  commitment: Localized;
  stats: { value: string; label: Localized }[];
} = {
  mission: {
    en: 'The “ချိတ်” project connects Myanmar students with the world of international education through peer-to-peer guidance on admissions, scholarships, and financial aid.',
    my: '“ချိတ်” ပရောဂျက်သည် မြန်မာကျောင်းသားများကို ဝင်ခွင့်၊ ပညာသင်ဆုနှင့် ငွေကြေးအထောက်အပံ့ဆိုင်ရာ peer-to-peer လမ်းညွှန်မှုဖြင့် နိုင်ငံတကာ ပညာရေးလောကနှင့် ချိတ်ဆက်ပေးရန် ရည်ရွယ်ပါသည်။',
  },
  vision: {
    en: 'By offering free advising, webinars, articles, and resources, our goal is to create opportunities — helping fellow Myanmar students navigate the college admissions process.',
    my: 'အခမဲ့ အကြံပေးမှု၊ webinar၊ ဆောင်းပါးနှင့် အရင်းအမြစ်များ ပေးအပ်ခြင်းဖြင့် မြန်မာကျောင်းသားများ တက္ကသိုလ်ဝင်ခွင့် လုပ်ငန်းစဉ်ကို ဖြတ်သန်းနိုင်ရန် ကူညီကာ အခွင့်အလမ်းများ ဖန်တီးပေးရန် ကျွန်ုပ်တို့ ရည်မှန်းပါသည်။',
  },
  commitment: {
    en: '“ချိတ်” is the fastest-growing Burmese youth organization — operating under its own constitution and powered by dedicated volunteers who take pride in the platform they have built.',
    my: '“ချိတ်” သည် မိမိကိုယ်ပိုင် ဖွဲ့စည်းပုံအခြေခံဥပဒေဖြင့် လည်ပတ်ပြီး မိမိတို့ တည်ဆောက်ထားသော ပလက်ဖောင်းကို ဂုဏ်ယူသော စေတနာ့ဝန်ထမ်းများက အားဖြည့်ထားသည့် အမြန်ဆုံးကြီးထွားနေသော မြန်မာလူငယ်အဖွဲ့အစည်း ဖြစ်ပါသည်။',
  },
  stats: [
    { value: '$4M+', label: { en: 'in scholarships', my: 'ပညာသင်ဆု' } },
    { value: '32K+', label: { en: 'followers', my: 'Follower' } },
    { value: '60+', label: { en: 'volunteers', my: 'စေတနာ့ဝန်ထမ်း' } },
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

export const webinars: { intro: Localized; series: Localized[]; topics: Localized[] } = {
  intro: {
    en: 'Our free webinar series bring admitted students and experts together to break down the application process — over 40 sessions hosted so far.',
    my: 'ကျွန်ုပ်တို့၏ အခမဲ့ Webinar အစီအစဉ်များသည် ဝင်ခွင့်ရထားသူ ကျောင်းသားများနှင့် ကျွမ်းကျင်သူများကို စုစည်းကာ လျှောက်လွှာ လုပ်ငန်းစဉ်ကို ရှင်းပြပေးပါသည် — ယခုအထိ အစီအစဉ် ၄၀ ကျော် ကျင်းပပြီးပါပြီ။',
  },
  series: [
    { en: 'Above & Beyond', my: 'Above & Beyond' },
    { en: 'A Stepping Stone', my: 'A Stepping Stone' },
    { en: 'ကျောင်းလျှောက်ကြမယ်', my: 'ကျောင်းလျှောက်ကြမယ်' },
  ],
  topics: [
    { en: 'Scholarships & financial aid', my: 'ပညာသင်ဆုနှင့် ငွေကြေးအထောက်အပံ့' },
    { en: 'Country-by-country application guides', my: 'နိုင်ငံအလိုက် လျှောက်ထားနည်း လမ်းညွှန်များ' },
    { en: 'Standardized & English proficiency tests', my: 'စံသတ်မှတ်နှင့် အင်္ဂလိပ်စာ စာမေးပွဲများ' },
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
  applyForm: 'https://forms.gle/72JWLVBTUHxNnoDj9',
  constitution:
    'https://docs.google.com/document/d/1FQs_tt6eSS0R5iMg7npOsuZQhxQ49O-8eeiG9_ggiQs/edit',
  voaVideo: 'https://www.youtube.com/watch?v=u5jjnT3j17M',
  facebook: 'https://www.facebook.com/profile.php?id=61557409119325',
  instagram: 'https://www.instagram.com/chate_thehook',
  tiktok: 'https://www.tiktok.com/@chate_thehook',
  youtube: 'https://www.youtube.com/@Chate_TheHook',
  telegram: 'https://t.me/chatethehook',
  linkedin: 'https://www.linkedin.com/company/chate-the-hook',
};

/** Social channels rendered as a row of icon buttons on the Connect screen. */
export const socials: { id: string; icon: string; label: string; url: string }[] = [
  { id: 'facebook', icon: 'logo-facebook', label: 'Facebook', url: contact.facebook },
  { id: 'instagram', icon: 'logo-instagram', label: 'Instagram', url: contact.instagram },
  { id: 'tiktok', icon: 'logo-tiktok', label: 'TikTok', url: contact.tiktok },
  { id: 'youtube', icon: 'logo-youtube', label: 'YouTube', url: contact.youtube },
  { id: 'telegram', icon: 'paper-plane', label: 'Telegram', url: contact.telegram },
  { id: 'linkedin', icon: 'logo-linkedin', label: 'LinkedIn', url: contact.linkedin },
];

// ---------------------------------------------------------------------------
// Blog posts  (chatethehook.blogspot.com)
// ---------------------------------------------------------------------------

export type BlogCategory = 'US' | 'UK' | 'Scholarships' | 'Testing' | 'About';

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  category: BlogCategory;
  url: string;
};

const BLOG_CAT_URLS: Record<BlogCategory, string> = {
  US: 'https://chatethehook.blogspot.com/search/label/US',
  UK: 'https://chatethehook.blogspot.com/search/label/UK',
  Scholarships: 'https://chatethehook.blogspot.com/search/label/Scholarships',
  Testing: 'https://chatethehook.blogspot.com/search/label/Testing%20%26%20Curriculum',
  About: 'https://chatethehook.blogspot.com/search/label/About%20%E1%80%85%E1%80%BB%E1%80%85%E1%80%BA%20-%20The%20Hook',
};

export const blogPosts: BlogPost[] = [
  // 2026
  { id: 'germany-interview', title: 'Interview with a Current Student Studying in Germany', date: 'Apr 2026', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'germany-scholarships', title: 'Germany School-Specific Undergraduate Scholarship Opportunities', date: 'Apr 2026', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  // 2025
  { id: 'asean-maybank', title: 'ASEAN MayBank Scholarship', date: 'Oct 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'childs-dream', title: "Child's Dream Scholarship", date: 'Oct 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'gsk-scholarship', title: 'GSK Scholarship', date: 'Oct 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'uk-undergrad-system', title: 'UK Undergraduate Education System', date: 'Sep 2025', category: 'UK', url: BLOG_CAT_URLS.UK },
  { id: 'uk-course-choice', title: 'How to Choose the Right Course When Applying to UK Universities', date: 'Sep 2025', category: 'UK', url: BLOG_CAT_URLS.UK },
  { id: 'transfer-scholarships', title: 'Transfer Scholarships', date: 'Sep 2025', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'pathways-myanmar-uni', title: 'Pathways After မြန်မာတက္ကသိုလ်ဝင်တန်း', date: 'Aug 2025', category: 'Testing', url: BLOG_CAT_URLS.Testing },
  { id: 'pathways-ossd', title: 'Pathways After OSSD', date: 'Aug 2025', category: 'Testing', url: BLOG_CAT_URLS.Testing },
  { id: 'pathways-ibdp', title: 'Pathways After IBDP (International Baccalaureate)', date: 'Aug 2025', category: 'Testing', url: BLOG_CAT_URLS.Testing },
  { id: 'pathways-a-levels', title: 'Pathways After International A Levels', date: 'Aug 2025', category: 'Testing', url: BLOG_CAT_URLS.Testing },
  { id: 'top-tips-study-abroad', title: 'Top Tips Before Studying Abroad', date: 'Jul 2025', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'student-visa', title: 'Student Visa Application Process and Tips for Visa Interview', date: 'May 2025', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'aisl-harrow', title: 'AISL Harrow Scholarship', date: 'Apr 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'asean-moe', title: 'ASEAN MOE Scholarship', date: 'Apr 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'admissions-landscape', title: 'Navigating the 2024 College Admissions Landscape', date: 'Mar 2025', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'intl-financial-aid', title: 'International Student Financial Aid Application', date: 'Feb 2025', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'greek-life', title: 'Greek Life in College', date: 'Feb 2025', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'boarding-schools', title: 'Boarding Schools for High School Students', date: 'Feb 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'merit-scholarships', title: 'Merit-based Scholarships', date: 'Jan 2025', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  // 2024
  { id: 'college-interview', title: 'College Interview', date: 'Dec 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'essay-tone', title: 'Tone in your College Essays', date: 'Dec 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'uwc-scholarship', title: 'UWC Scholarship', date: 'Dec 2024', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'rise-scholarship', title: 'RISE Global Scholarship', date: 'Nov 2024', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'research-opportunities', title: 'Research Opportunities', date: 'Nov 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'yield-protection', title: 'What is Yield Protection?', date: 'Oct 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'top-public-unis', title: 'Top Public Universities in the US (Part 1)', date: 'Oct 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'essay-types', title: 'Types of College Essays', date: 'Oct 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'save-money-application', title: 'How to Save Money during College Application', date: 'Oct 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'top-tier-us-p2', title: 'Top-Tier Colleges in the US (Part 2)', date: 'Sep 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'admissions-decisions', title: 'About Admissions Decisions', date: 'Aug 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'common-app', title: 'About the Common App', date: 'Aug 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'extracurriculars-properly', title: 'How to do Extracurriculars Properly', date: 'Aug 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'css-profile', title: 'About the CSS Profile', date: 'Aug 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'demonstrated-interest', title: 'About Demonstrated Interest', date: 'Jul 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'top-tier-us-p1', title: 'Top-Tier Colleges in the US (Part 1)', date: 'Jul 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'ap-exams', title: 'What are Advanced Placement Exams?', date: 'Jun 2024', category: 'Testing', url: BLOG_CAT_URLS.Testing },
  { id: 'why-advisors', title: 'Why Do We Need College Application Advisors?', date: 'Jun 2024', category: 'About', url: BLOG_CAT_URLS.About },
  { id: 'ibdp-what-is', title: 'What is the IB Diploma Program?', date: 'Jun 2024', category: 'Testing', url: BLOG_CAT_URLS.Testing },
  { id: 'uc-system', title: 'What is the University of California?', date: 'May 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'financial-aid-about', title: 'About Financial Aid', date: 'May 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'financial-aid-lacs', title: 'Financial Aid Granting Liberal Arts Colleges', date: 'Apr 2024', category: 'Scholarships', url: BLOG_CAT_URLS.Scholarships },
  { id: 'us-institution-types', title: 'Types of Higher Academic Institutions in the US', date: 'Apr 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'college-rankings', title: 'What are College Rankings?', date: 'Apr 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'holistic-process', title: 'What does Holistic Process Mean?', date: 'Apr 2024', category: 'US', url: BLOG_CAT_URLS.US },
  { id: 'public-vs-private', title: 'Public vs Private Universities', date: 'Apr 2024', category: 'US', url: BLOG_CAT_URLS.US },
];

// ---------------------------------------------------------------------------
// Video series  (YouTube)
// ---------------------------------------------------------------------------

export type VideoEpisode = {
  id: string;
  title: string;
  youtubeId: string;
  date: string;
  speaker?: string;
};

export type VideoSeries = {
  id: string;
  name: string;
  description: string;
  episodes: VideoEpisode[];
};

export const videoSeries: VideoSeries[] = [
  {
    id: 'above-beyond',
    name: 'Above & Beyond',
    description: 'Country spotlights — students share their study abroad experience from universities worldwide',
    episodes: [
      { id: 'ab-21', title: 'Study in France — Schiller International University', youtubeId: 'z_YtGp17-0I', date: 'Jul 2025', speaker: 'Thazin Oo' },
      { id: 'ab-20', title: 'Study in Malaysia — INTI International University', youtubeId: 'elXtWhFaDbE', date: 'Jul 2025', speaker: 'Hein Pyae Sone & Thant Thant Myo Oo' },
      { id: 'ab-19', title: 'Study in Belgium — Vrije Universiteit Brussels', youtubeId: 'VWOEg_zwxtQ', date: 'Jul 2025', speaker: 'Kate @ Khin Nandar Su' },
      { id: 'ab-18', title: 'Study in Switzerland — Swiss Hotel Management School', youtubeId: 'xu14htv1jFw', date: 'Jul 2025', speaker: 'Myat Eaindray Hmoo' },
      { id: 'ab-17', title: 'Study in Spain — IE Business School', youtubeId: 'Dv_J2Vcys-M', date: 'Jul 2025', speaker: 'Khaing Zin Lin' },
      { id: 'ab-16', title: 'Study in New Zealand — University of Auckland', youtubeId: 'Vkncx-PdNpg', date: 'Jul 2025', speaker: 'Wunna Aung' },
      { id: 'ab-14', title: 'Study in Canada — University of Toronto', youtubeId: '_Mug8J-VbwQ', date: 'Jul 2025', speaker: 'Soe Nyi Nyi Aung' },
      { id: 'ab-13', title: 'Study in Hungary — Eötvös Loránd University', youtubeId: 'wuO8ICQ12fg', date: 'Jul 2025', speaker: 'Thet Naing Soe' },
      { id: 'ab-12', title: 'Study in Czech Republic — Masaryk University', youtubeId: '6AcKNIQO4Po', date: 'Jul 2025', speaker: 'Thant Hmue Tii' },
      { id: 'ab-11', title: 'Study in Germany — TH Nürnberg Georg Simon Ohm', youtubeId: 'OzWM44DzHlk', date: 'Jul 2025', speaker: 'Thar Lon Lin Htet' },
      { id: 'ab-10', title: 'Study in Thailand — Chulalongkorn University', youtubeId: 'NGlLFPYE6Xs', date: 'Jun 2025', speaker: 'Win Htut Aung' },
      { id: 'ab-9', title: 'Study in Japan — Okayama University', youtubeId: 'yyZ_fwzek6c', date: 'Jun 2025', speaker: 'Pyae Phyo Aung' },
      { id: 'ab-8', title: 'Study in Indonesia — Universitas Pelita Harapan', youtubeId: 'mymhiff7DUQ', date: 'Jun 2025', speaker: 'Nilar Aye' },
      { id: 'ab-7', title: 'Study in Australia — University of New South Wales', youtubeId: 'o2GQU86bjQQ', date: 'Jun 2025', speaker: 'Thoon Set Paing' },
      { id: 'ab-6', title: 'Study in China — Zhejiang University', youtubeId: 'iJfnMv-unGI', date: 'Jun 2025', speaker: 'Thet No Htwe' },
      { id: 'ab-5', title: 'Study in Italy — University of Parma', youtubeId: 'c9Jju6BJkMU', date: 'Jun 2025', speaker: 'Thiha Swe' },
      { id: 'ab-3', title: 'Study in Hong Kong — University of Hong Kong', youtubeId: 'TJpuk50nJBg', date: 'Jun 2025', speaker: 'Shinn Thant Ein' },
      { id: 'ab-2', title: 'Study in Singapore — National University of Singapore', youtubeId: 'ZiYrvpB8ERE', date: 'Jun 2025', speaker: 'Yoon Su Lin' },
      { id: 'ab-1', title: 'Study in Korea — KAIST', youtubeId: '0Ly0gA8MJjU', date: 'May 2025', speaker: 'Naing Zaw Lu & team' },
    ],
  },
  {
    id: 'kyaung-lhaut',
    name: 'ကျောင်းလျှောက်ကြမယ်',
    description: 'Deep-dive webinars covering every aspect of the college application process',
    episodes: [
      { id: 'kl-20', title: 'Getting Ready for The Next College Application Season', youtubeId: 'SwAWNbovm9U', date: 'Jan 2025', speaker: 'Soe Thway Ko, Swan Tayza Aung' },
      { id: 'kl-19', title: 'Guide to University Education in Singapore: NUS Pathway Focus', youtubeId: '_aZ2EyM0_xo', date: 'Dec 2024', speaker: 'Yoon Su Lin' },
      { id: 'kl-18', title: 'How to Build a Passion Project?', youtubeId: 'p3vHgpWsyuQ', date: 'Dec 2024', speaker: 'Yoon Yati' },
      { id: 'kl-17', title: 'Applying to Russell Group UK Universities with Chevening Scholarship', youtubeId: 'BxII9HokTxY', date: 'Oct 2024', speaker: 'Phyo Thiri' },
      { id: 'kl-16', title: 'UCAS Walkthrough', youtubeId: 'ujOhp7wzUF4', date: 'Sep 2024', speaker: 'Julia Moe Chan Myae' },
      { id: 'kl-15', title: 'CommonApp Walkthrough', youtubeId: 'RM1r0l_KSGw', date: 'Sep 2024', speaker: 'Aung Khant Paing' },
      { id: 'kl-14', title: 'UWC and US Universities', youtubeId: 'GVaAJLHp62A', date: 'Aug 2024', speaker: 'Htet Htet Paing' },
      { id: 'kl-13', title: 'Study in the UK', youtubeId: 'IIGXhLFzaxY', date: 'Aug 2024', speaker: 'Yamin Thet @ Rachel Joy' },
      { id: 'kl-12', title: 'Stepping into UK Universities', youtubeId: 'pM91wTXkhJI', date: 'Aug 2024', speaker: 'Swan Yee Htun Wah' },
      { id: 'kl-11', title: 'Transferring from Community College to Universities', youtubeId: 'jmHSHLbcIXc', date: 'Jul 2024', speaker: 'Thet Htoo Naung' },
      { id: 'kl-10', title: 'Fully Funded Undergraduate Scholarship in the US with a GED', youtubeId: 'xn7rv-xiWAM', date: 'Jul 2024', speaker: 'Allei Mar' },
      { id: 'kl-9', title: 'Doing the Best with What I Have', youtubeId: 'C60d95ecPMg', date: 'Jul 2024', speaker: 'John Ten Khant' },
      { id: 'kl-8', title: 'Extracurricular Activities for Colleges', youtubeId: 'I-2qd55aBeA', date: 'Jul 2024', speaker: 'Yone Waddy Aung' },
      { id: 'kl-7', title: 'Financial Aid at US Colleges', youtubeId: 'sNl1rv3X39k', date: 'Jun 2024', speaker: 'Wai Yan Win Aung' },
      { id: 'kl-4', title: 'My Journey from Community College to Columbia University', youtubeId: 'sxHyH7kSoNU', date: 'May 2024', speaker: 'Rachel Soe' },
      { id: 'kl-3', title: 'Misconceptions in College Applications', youtubeId: 'YOwYQ56EZaA', date: 'May 2024', speaker: 'Yin Min Thant' },
      { id: 'kl-2', title: 'Why Liberal Arts Colleges?', youtubeId: 'HRfzWAFDMQk', date: 'Apr 2024', speaker: 'Sai Nyi Bhone Htut, Myat Nadi Kyaw' },
    ],
  },
  {
    id: 'stepping-stone',
    name: 'A Stepping Stone',
    description: 'High school scholarship opportunities for Myanmar students',
    episodes: [
      { id: 'ss-3', title: 'ASEAN Scholarship', youtubeId: 'LZntciYO-nQ', date: 'Nov 2024', speaker: 'Arnt Hmue Ti Kyi' },
      { id: 'ss-2', title: 'United World College Scholarship', youtubeId: '1J9_feIj9J4', date: 'Nov 2024', speaker: 'Yoon Ei Ko Ko, Hema Lian Duh Kip Tial' },
      { id: 'ss-1', title: 'AISL Harrow Scholarship', youtubeId: 'wqxR-ZU2hPY', date: 'Nov 2024', speaker: 'Swan Tayza Aung' },
    ],
  },
  {
    id: 'su-tu-pyu',
    name: 'စုတုပြု — Accepted Essays',
    description: 'Real accepted college essays read aloud — MIT, Brown, Duke, UCLA, and more',
    episodes: [
      { id: 'stp-14', title: "Child Dream Scholarship Essay", youtubeId: 'pYs7wKK-G3g', date: '2025', speaker: 'Saw Chit Tun' },
      { id: 'stp-13', title: 'UNSW Accepted Essay', youtubeId: '2NMzGdZLfQ0', date: '2025', speaker: 'Thoon Set Naing' },
      { id: 'stp-12', title: 'Duke Accepted Essay', youtubeId: 'v0szovCc0bA', date: '2025', speaker: 'Myat Theingi' },
      { id: 'stp-11', title: 'MIT Accepted Essay', youtubeId: 'MiaqKwu8cm0', date: '2025', speaker: 'Soe Lin Htet' },
      { id: 'stp-10', title: "UCLA Chancellor's Scholarship Winning Essay", youtubeId: '2u0sUV8Wzdk', date: '2025', speaker: 'May Kyi Phyu Thin' },
      { id: 'stp-9', title: 'Tufts University Accepted Essay', youtubeId: 'yreDDP0Jp9c', date: '2024', speaker: 'Thang Dopmul' },
      { id: 'stp-8', title: 'Brown University Accepted Essay', youtubeId: 'DQo_3gRPBu0', date: '2024', speaker: 'Swan Tayza Aung' },
      { id: 'stp-7', title: 'Occidental College Accepted Essay', youtubeId: 'dWnR9Bos4jU', date: '2024', speaker: 'Aung Myat Htet' },
      { id: 'stp-6', title: 'Vanderbilt University Accepted Essay', youtubeId: 'T-snQV67LdQ', date: '2024', speaker: 'Sai Nyi Bhone Htut' },
      { id: 'stp-5', title: 'Rice University Accepted Essay', youtubeId: '4daBKoIkShM', date: '2024', speaker: 'Yin Min Thant' },
      { id: 'stp-4', title: 'Brown University Accepted Essay', youtubeId: 'yZzQSwoaYOg', date: '2024', speaker: 'Yone Waddy Aung' },
      { id: 'stp-3', title: 'Swarthmore Accepted Essay', youtubeId: 'BVY2fMzcBvo', date: '2024', speaker: 'Sai Nyi Bhone Htut' },
      { id: 'stp-2', title: 'Dartmouth Accepted Essay', youtubeId: 'vbB0sdRjTQ4', date: '2024', speaker: 'Wai Yan Win Aung' },
      { id: 'stp-1', title: 'MIT Accepted Essay', youtubeId: 'DMwt8OBGQSM', date: '2024', speaker: 'Nyan Lin Htet @ Alex' },
    ],
  },
  {
    id: 'scholars-diaries',
    name: "Scholars' Diaries",
    description: 'In-depth student interviews about life studying abroad',
    episodes: [
      { id: 'sd-2', title: 'Extracurricular Activities', youtubeId: 'T2Wu9_0DPU0', date: '2024', speaker: 'Swan Yee Htun Wah' },
      { id: 'sd-1', title: 'The United World College (UWC) Experience', youtubeId: 'qDaJNip0cyc', date: '2024', speaker: 'Yoon Ei Ko Ko' },
    ],
  },
];
