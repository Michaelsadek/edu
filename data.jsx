// data.jsx — languages, lesson content, quizzes, exam, certificates. → window.DATA
// Instruction/UI strings live in two native languages: en, ar.

/* ---------- LANGUAGES ---------- */
const LANGS = {
  ar: { code:'ar', name:'Arabic',  native:'العربية', flag:'🇸🇦', dir:'rtl',
        tint:'#FF6B9D', tintBg:'#FFF1F6', tintRing:'#FFC2D9', learners:'2.4M' },
  de: { code:'de', name:'German',  native:'Deutsch', flag:'🇩🇪', dir:'ltr',
        tint:'#4ECDC4', tintBg:'#EFFCFB', tintRing:'#AEEEEA', learners:'3.1M' },
  en: { code:'en', name:'English', native:'English', flag:'🇬🇧', dir:'ltr',
        tint:'#7C8CF8', tintBg:'#EEF1FE', tintRing:'#C9D1FB', learners:'9.8M' },
};

const NATIVE_LANGS = {
  en: { code:'en', name:'English', native:'English', flag:'🇬🇧', dir:'ltr' },
  ar: { code:'ar', name:'Arabic',  native:'العربية', flag:'🇸🇦', dir:'rtl' },
};

const CEFR = [
  { id:'A1', label:'Beginner',        price:9,  blurb:'Survival basics — greetings, numbers, everyday words.' },
  { id:'A2', label:'Elementary',      price:9,  blurb:'Simple conversations about familiar topics.' },
  { id:'B1', label:'Intermediate',    price:14, blurb:'Handle most travel & daily situations with confidence.' },
  { id:'B2', label:'Upper-Int.',      price:14, blurb:'Fluent enough for work and complex discussion.' },
  { id:'C1', label:'Advanced',        price:19, blurb:'Express ideas fluently, nuance and idiom included.' },
  { id:'C2', label:'Mastery',         price:19, blurb:'Near-native precision across any subject.' },
];

/* ---------- UI STRINGS (i18n) ---------- */
const STR = {
  en: {
    dir:'ltr',
    nav:{ home:'Home', lessons:'Lessons', exam:'Exam', profile:'Profile' },
    dash:{ greeting:'Welcome back', streak:'day streak', goal:'Daily goal',
      continue:'Continue learning', roadmap:'Your roadmap', xpToday:'XP today',
      keepGoing:'Keep your streak alive!', minLeft:'min left today', next:'Next up' },
    lesson:{ grammar:'Grammar', vocab:'Vocabulary', reading:'Reading', video:'Watch',
      quiz:'Quiz', comprehension:'Comprehension', step:'Step', of:'of',
      generating:'AI is generating your passage…', continue:'Continue', back:'Back',
      finish:'Finish lesson', explainMore:'Explain this differently', examples:'Examples',
      newWords:'10 new words in context', listen:'Listen' },
    quiz:{ check:'Check', next:'Next', correct:'Correct!', incorrect:'Not quite',
      retry:'Retry', results:'Results', score:'Your score', unlocked:'Next lesson unlocked',
      tapToBuild:'Tap the words in order', typeAnswer:'Type your answer', true:'True', false:'False' },
    exam:{ title:'Level Exam', begin:'Begin exam', q:'Question', submit:'Submit exam',
      timeLeft:'Time left', navigator:'Questions', pass:'Passed!', fail:'Not passed yet',
      certReady:'Your certificate is ready', review:'Review & retake', leave:'Leave exam' },
    profile:{ certs:'Certificates', streakHist:'Streak history', sub:'Subscription',
      member:'Member since', download:'Download PDF', active:'Active', manage:'Manage plan' },
    common:{ studying:'Studying', native:'I speak', loading:'Loading…' },
  },
  ar: {
    dir:'rtl',
    nav:{ home:'الرئيسية', lessons:'الدروس', exam:'الاختبار', profile:'الملف' },
    dash:{ greeting:'مرحبًا بعودتك', streak:'يوم متتالٍ', goal:'الهدف اليومي',
      continue:'تابع التعلّم', roadmap:'خريطة تقدّمك', xpToday:'نقاط اليوم',
      keepGoing:'حافظ على سلسلتك!', minLeft:'دقيقة متبقية اليوم', next:'التالي' },
    lesson:{ grammar:'القواعد', vocab:'المفردات', reading:'القراءة', video:'مشاهدة',
      quiz:'اختبار', comprehension:'الاستيعاب', step:'الخطوة', of:'من',
      generating:'يقوم الذكاء الاصطناعي بإنشاء النص…', continue:'متابعة', back:'رجوع',
      finish:'إنهاء الدرس', explainMore:'اشرح بطريقة أخرى', examples:'أمثلة',
      newWords:'١٠ كلمات جديدة في سياقها', listen:'استمع' },
    quiz:{ check:'تحقّق', next:'التالي', correct:'صحيح!', incorrect:'ليس تمامًا',
      retry:'إعادة', results:'النتائج', score:'نتيجتك', unlocked:'تم فتح الدرس التالي',
      tapToBuild:'اضغط الكلمات بالترتيب', typeAnswer:'اكتب إجابتك', true:'صحيح', false:'خطأ' },
    exam:{ title:'اختبار المستوى', begin:'ابدأ الاختبار', q:'سؤال', submit:'إرسال الاختبار',
      timeLeft:'الوقت المتبقي', navigator:'الأسئلة', pass:'ناجح!', fail:'لم تنجح بعد',
      certReady:'شهادتك جاهزة', review:'مراجعة وإعادة', leave:'مغادرة الاختبار' },
    profile:{ certs:'الشهادات', streakHist:'سجل السلسلة', sub:'الاشتراك',
      member:'عضو منذ', download:'تنزيل PDF', active:'نشِط', manage:'إدارة الخطة' },
    common:{ studying:'تتعلّم', native:'لغتي الأم', loading:'جارٍ التحميل…' },
  }
};

/* ---------- LESSON CONTENT (per target language) ----------
   Each lesson keyed by target code. `dir` follows language being learned. */
const LESSONS = {
  ar: {
    target:'ar', dir:'rtl', level:'A2', unit:'Unit 4 · Everyday life',
    title:'At the Café', titleNative:'في المَقهى',
    grammar:{
      rule:'The present tense (الفِعل المُضارع)',
      ai:'In Arabic, present-tense verbs change their prefix to match who is doing the action. The stem stays the same — only the beginning (and sometimes the ending) shifts. For "to drink" (يَشرَب), watch the first letter change with the subject.',
      table:[
        { p:'I drink',        ar:'أَشرَبُ',  tr:'ashrabu' },
        { p:'You (m) drink',  ar:'تَشرَبُ',  tr:'tashrabu' },
        { p:'You (f) drink',  ar:'تَشرَبِينَ', tr:'tashrabīna' },
        { p:'He drinks',      ar:'يَشرَبُ',  tr:'yashrabu' },
        { p:'She drinks',     ar:'تَشرَبُ',  tr:'tashrabu' },
        { p:'We drink',       ar:'نَشرَبُ',  tr:'nashrabu' },
      ],
      examples:[
        { ar:'أَشرَبُ القَهوةَ كُلَّ صَباح.', tr:'ashrabu al-qahwata kulla ṣabāḥ', en:'I drink coffee every morning.' },
        { ar:'هي تَشرَبُ الشّايَ بالنَّعناع.', tr:'hiya tashrabu ash-shāya bil-naʿnāʿ', en:'She drinks tea with mint.' },
      ],
    },
    vocab:[
      { ar:'مَقهى',   tr:'maqhā',   en:'café' },
      { ar:'قَهوة',   tr:'qahwa',   en:'coffee' },
      { ar:'شاي',    tr:'shāy',    en:'tea' },
      { ar:'حليب',   tr:'ḥalīb',   en:'milk' },
      { ar:'سُكّر',   tr:'sukkar',  en:'sugar' },
      { ar:'كوب',    tr:'kūb',     en:'cup' },
      { ar:'فاتورة',  tr:'fātūra',  en:'bill / check' },
      { ar:'نادِل',   tr:'nādil',   en:'waiter' },
      { ar:'طاوِلة',  tr:'ṭāwila',  en:'table' },
      { ar:'لَذيذ',   tr:'ladhīdh', en:'delicious' },
    ],
    reading:{
      title:'صباحٌ في المقهى',
      paras:[
        'يَذهَبُ سامي إلى المَقهى كُلَّ صَباح. يَجلِسُ على طاوِلةٍ قُربَ النّافِذة ويَطلُبُ قَهوةً بالحَليب.',
        'يَأتي النّادِلُ ويَقولُ: «صَباحَ الخَير! ماذا تُريد؟» يَطلُبُ سامي قَهوةً وقِطعةَ كَعك. القَهوةُ لَذيذةٌ والكَعكُ طازَج.',
        'بَعدَ نِصفِ ساعة، يَطلُبُ سامي الفاتورة، يَدفَعُ، ويَشكُرُ النّادِل. ثُمَّ يَذهَبُ إلى عَمَلِه سَعيدًا.',
      ],
      en:'Sami goes to the café every morning. He sits at a table near the window and orders coffee with milk…',
    },
    comprehension:[
      { type:'mcq', q:'Where does Sami sit?', qNative:'أين يجلس سامي؟',
        choices:['Near the door','Near the window','Outside','At the counter'], answer:1 },
      { type:'tf', q:'Sami pays the bill before leaving.', answer:true },
    ],
  },

  de: {
    target:'de', dir:'ltr', level:'A2', unit:'Einheit 4 · Alltag',
    title:'At the Café', titleNative:'Im Café',
    grammar:{
      rule:'Definite articles: der, die, das',
      ai:'German nouns have a gender — masculine (der), feminine (die) or neuter (das). The article changes with gender, and again with grammatical case. Learn each noun together with its article, like one word.',
      table:[
        { p:'the coffee (m)', ar:'der Kaffee', tr:'masculine' },
        { p:'the milk (f)',   ar:'die Milch',  tr:'feminine' },
        { p:'the water (n)',  ar:'das Wasser', tr:'neuter' },
        { p:'the cup (f)',    ar:'die Tasse',  tr:'feminine' },
        { p:'the bill (f)',   ar:'die Rechnung', tr:'feminine' },
        { p:'the waiter (m)', ar:'der Kellner', tr:'masculine' },
      ],
      examples:[
        { ar:'Ich trinke den Kaffee.', tr:'accusative', en:'I drink the coffee.' },
        { ar:'Die Milch ist kalt.', tr:'nominative', en:'The milk is cold.' },
      ],
    },
    vocab:[
      { ar:'das Café',     tr:'n.', en:'café' },
      { ar:'der Kaffee',   tr:'m.', en:'coffee' },
      { ar:'der Tee',      tr:'m.', en:'tea' },
      { ar:'die Milch',    tr:'f.', en:'milk' },
      { ar:'der Zucker',   tr:'m.', en:'sugar' },
      { ar:'die Tasse',    tr:'f.', en:'cup' },
      { ar:'die Rechnung', tr:'f.', en:'bill / check' },
      { ar:'der Kellner',  tr:'m.', en:'waiter' },
      { ar:'der Tisch',    tr:'m.', en:'table' },
      { ar:'lecker',       tr:'adj.', en:'delicious' },
    ],
    reading:{
      title:'Ein Morgen im Café',
      paras:[
        'Sami geht jeden Morgen ins Café. Er sitzt an einem Tisch am Fenster und bestellt einen Kaffee mit Milch.',
        'Der Kellner kommt und sagt: „Guten Morgen! Was möchten Sie?" Sami bestellt einen Kaffee und ein Stück Kuchen. Der Kaffee ist lecker und der Kuchen ist frisch.',
        'Nach einer halben Stunde bittet Sami um die Rechnung, bezahlt und dankt dem Kellner. Dann geht er glücklich zur Arbeit.',
      ],
      en:'Sami goes to the café every morning. He sits at a table by the window and orders a coffee with milk…',
    },
    comprehension:[
      { type:'mcq', q:'Where does Sami sit?', qNative:'Wo sitzt Sami?',
        choices:['By the door','By the window','Outside','At the counter'], answer:1 },
      { type:'tf', q:'Sami pays before he leaves.', answer:true },
    ],
  },

  en: {
    target:'en', dir:'ltr', level:'A2', unit:'Unit 4 · Everyday life',
    title:'At the Café', titleNative:'At the Café',
    grammar:{
      rule:'Present simple: do / does',
      ai:'In English the present simple adds -s for he/she/it. For questions and negatives we use the helper "do" (or "does" for he/she/it) and the base verb stays the same.',
      table:[
        { p:'I drink',   ar:'I drink',     tr:'base' },
        { p:'You drink', ar:'you drink',   tr:'base' },
        { p:'He drinks', ar:'he drinks',   tr:'+s' },
        { p:'She drinks',ar:'she drinks',  tr:'+s' },
        { p:'We drink',  ar:'we drink',    tr:'base' },
        { p:'They drink',ar:'they drink',  tr:'base' },
      ],
      examples:[
        { ar:'I drink coffee every morning.', tr:'statement', en:'positive' },
        { ar:'Does she drink tea?', tr:'question', en:'with “does”' },
      ],
    },
    vocab:[
      { ar:'café', tr:'/ˈkæfeɪ/', en:'a place to drink coffee' },
      { ar:'coffee', tr:'/ˈkɒfi/', en:'a hot drink' },
      { ar:'tea', tr:'/tiː/', en:'a hot drink from leaves' },
      { ar:'milk', tr:'/mɪlk/', en:'white drink' },
      { ar:'sugar', tr:'/ˈʃʊɡər/', en:'sweet' },
      { ar:'cup', tr:'/kʌp/', en:'small container' },
      { ar:'bill', tr:'/bɪl/', en:'what you pay' },
      { ar:'waiter', tr:'/ˈweɪtər/', en:'serves food' },
      { ar:'table', tr:'/ˈteɪbl/', en:'furniture' },
      { ar:'delicious', tr:'/dɪˈlɪʃəs/', en:'tastes great' },
    ],
    reading:{
      title:'A Morning at the Café',
      paras:[
        'Sami goes to the café every morning. He sits at a table by the window and orders a coffee with milk.',
        'The waiter comes and says: "Good morning! What would you like?" Sami orders a coffee and a piece of cake. The coffee is delicious and the cake is fresh.',
        'After half an hour, Sami asks for the bill, pays, and thanks the waiter. Then he goes to work, happy.',
      ],
      en:'',
    },
    comprehension:[
      { type:'mcq', q:'Where does Sami sit?', qNative:'Where does Sami sit?',
        choices:['By the door','By the window','Outside','At the counter'], answer:1 },
      { type:'tf', q:'Sami pays before he leaves.', answer:true },
    ],
  },
};

/* ---------- MINI QUIZ (end of lesson) — per target ---------- */
const QUIZZES = {
  ar: [
    { type:'mcq', q:'How do you say "coffee" in Arabic?',
      choices:['شاي','قَهوة','حليب','كوب'], answer:1, dirChoices:'rtl' },
    { type:'fill', q:'Complete: أنا ____ القهوة كل صباح. (I drink coffee every morning)',
      prompt:'أَ____بُ', answer:'أشرب', accept:['اشرب','أشرب'], dir:'rtl', hint:'present tense of يَشرَب' },
    { type:'tf', q:'«النادِل» means "the table".', answer:false },
    { type:'rearrange', q:'Build the sentence: "I drink tea."',
      tokens:['الشّاي','أَشرَبُ','أنا'], answer:['أنا','أَشرَبُ','الشّاي'], dir:'rtl' },
  ],
  de: [
    { type:'mcq', q:'Which article goes with “Milch”?',
      choices:['der','die','das','den'], answer:1 },
    { type:'fill', q:'Complete: Ich ____ einen Kaffee. (I drink a coffee)',
      prompt:'Ich ____ einen Kaffee.', answer:'trinke', accept:['trinke'], dir:'ltr', hint:'verb: trinken, ich-form' },
    { type:'tf', q:'“der Kellner” means “the waiter”.', answer:true },
    { type:'rearrange', q:'Build the sentence: “I drink the coffee.”',
      tokens:['den','Ich','Kaffee','trinke'], answer:['Ich','trinke','den','Kaffee'], dir:'ltr' },
  ],
  en: [
    { type:'mcq', q:'Which is correct?',
      choices:['She drink tea','She drinks tea','She drinking tea','She drinked tea'], answer:1 },
    { type:'fill', q:'Complete: ____ she drink coffee?',
      prompt:'____ she drink coffee?', answer:'Does', accept:['does'], dir:'ltr', hint:'helper for he/she/it' },
    { type:'tf', q:'“delicious” describes something that tastes great.', answer:true },
    { type:'rearrange', q:'Build the sentence: “I drink coffee every morning.”',
      tokens:['coffee','I','every','drink','morning'], answer:['I','drink','coffee','every','morning'], dir:'ltr' },
  ],
};

/* ---------- ROADMAP ---------- */
const ROADMAP = [
  { id:'A1', state:'done',     lessons:24, label:'Beginner' },
  { id:'A2', state:'current',  lessons:28, label:'Elementary' },
  { id:'B1', state:'locked',   lessons:32, label:'Intermediate' },
  { id:'B2', state:'locked',   lessons:34, label:'Upper-Int.' },
  { id:'C1', state:'locked',   lessons:36, label:'Advanced' },
  { id:'C2', state:'locked',   lessons:30, label:'Mastery' },
];

/* lessons within current unit shown on dashboard "next up" + roadmap detail */
const UNIT_LESSONS = [
  { id:1, title:'Greetings & introductions', state:'done' },
  { id:2, title:'Numbers and time',           state:'done' },
  { id:3, title:'Family and people',          state:'done' },
  { id:4, title:'At the café',                state:'current' },
  { id:5, title:'Shopping at the market',     state:'locked' },
  { id:6, title:'Directions in the city',     state:'locked' },
];

/* ---------- EXAM (25 Qs; we author 8, repeat-fill the rest at runtime) ---------- */
const EXAM = {
  ar: { level:'A2', total:25, durationMin:45, passPct:70,
    questions:[
      { type:'mcq', q:'Choose the correct verb: هي ____ الشّاي.', choices:['أشرب','تَشرَب','نشرب','يشرب'], answer:1 },
      { type:'mcq', q:'"بِكَم الفاتورة؟" means…', choices:['Where is the table?','How much is the bill?','What time is it?','Who is the waiter?'], answer:1 },
      { type:'tf',  q:'«طازَج» means "fresh".', answer:true },
      { type:'mcq', q:'Pick the café word:', choices:['طاوِلة','سيّارة','مَدرسة','بَحر'], answer:0 },
      { type:'fill',q:'Complete: نحن ____ القهوة. (we drink)', prompt:'نحن ____ القهوة', answer:'نشرب', accept:['نشرب'], dir:'rtl' },
      { type:'mcq', q:'Which is a polite greeting in the morning?', choices:['تُصبِح على خير','صباح الخير','مع السلامة','تصبح بخير'], answer:1 },
      { type:'tf',  q:'In «يَشرَبُ», the prefix يـ marks "he".', answer:true },
      { type:'mcq', q:'"a delicious cup of tea" — choose the adjective:', choices:['كوب','شاي','لذيذ','نادِل'], answer:2 },
    ]},
  de: { level:'A2', total:25, durationMin:45, passPct:70,
    questions:[
      { type:'mcq', q:'Choose the article: ____ Wasser.', choices:['der','die','das','den'], answer:2 },
      { type:'mcq', q:'"Was möchten Sie?" means…', choices:['Where are you?','What would you like?','How are you?','Who are you?'], answer:1 },
      { type:'tf',  q:'“lecker” means “delicious”.', answer:true },
      { type:'mcq', q:'Pick the café word:', choices:['der Tisch','das Auto','die Schule','das Meer'], answer:0 },
      { type:'fill',q:'Complete: Wir ____ Kaffee. (we drink)', prompt:'Wir ____ Kaffee', answer:'trinken', accept:['trinken'], dir:'ltr' },
      { type:'mcq', q:'A polite morning greeting:', choices:['Gute Nacht','Guten Morgen','Tschüss','Bis bald'], answer:1 },
      { type:'tf',  q:'“die” is the article for feminine nouns.', answer:true },
      { type:'mcq', q:'Choose the adjective:', choices:['Tasse','Tee','frisch','Kellner'], answer:2 },
    ]},
  en: { level:'A2', total:25, durationMin:45, passPct:70,
    questions:[
      { type:'mcq', q:'Choose: He ____ coffee.', choices:['drink','drinks','drinking','drinked'], answer:1 },
      { type:'mcq', q:'"How much is the bill?" asks about…', choices:['time','price','place','people'], answer:1 },
      { type:'tf',  q:'“fresh” can describe bread.', answer:true },
      { type:'mcq', q:'Pick the café word:', choices:['table','car','school','sea'], answer:0 },
      { type:'fill',q:'Complete: ____ they drink tea?', prompt:'____ they drink tea?', answer:'Do', accept:['do'], dir:'ltr' },
      { type:'mcq', q:'A polite morning greeting:', choices:['Good night','Good morning','Goodbye','See you'], answer:1 },
      { type:'tf',  q:'We add -s for “he/she/it” in present simple.', answer:true },
      { type:'mcq', q:'Choose the adjective:', choices:['cup','tea','delicious','waiter'], answer:2 },
    ]},
};

/* ---------- CERTIFICATES / STREAK ---------- */
const CERTS = [
  { level:'A1', title:'Beginner', date:'12 Feb 2026', status:'earned' },
  { level:'A2', title:'Elementary', date:null, status:'in-progress', pct:64 },
];

// 18-week streak grid (0=none,1=partial,2=full)
const STREAK_GRID = (() => {
  const seed=[2,2,1,2,2,2,0, 2,1,2,2,2,2,2, 0,2,2,1,2,2,2, 2,2,2,0,1,2,2, 2,2,2,2,2,1,0, 2,2,2,2,2,2,2];
  return seed;
})();

window.DATA = { LANGS, NATIVE_LANGS, CEFR, STR, LESSONS, QUIZZES, ROADMAP, UNIT_LESSONS, EXAM, CERTS, STREAK_GRID };
