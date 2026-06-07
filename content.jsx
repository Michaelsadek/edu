// content.jsx — content for new skill-based product → extends window.DATA
(function(){
  const D = window.DATA;

  /* ---------- SKILL MODES ---------- */
  const SKILLS = [
    { id:'reading',   icon:'book',       tint:'#4ECDC4', tintBg:'#EFFCFB', tintRing:'#AEEEEA',
      label:{ en:'Reading',   ar:'القراءة' },
      desc: { en:'Read an AI-generated passage at your level',
              ar:'اقرأ نصًّا من إنشاء الذكاء الاصطناعي مناسبًا لمستواك' } },
    { id:'listening', icon:'headphones', tint:'#7C8CF8', tintBg:'#EEF1FE', tintRing:'#C9D1FB',
      label:{ en:'Listening', ar:'الاستماع' },
      desc: { en:'Listen to audio and test your understanding',
              ar:'استمع إلى المقطع واختبر استيعابك' } },
    { id:'speaking',  icon:'mic',        tint:'#FF6B9D', tintBg:'#FFF1F6', tintRing:'#FFC2D9',
      label:{ en:'Speaking',  ar:'المحادثة' },
      desc: { en:'Read aloud and get pronunciation feedback',
              ar:'اقرأ بصوت عالٍ واحصل على ملاحظات على النطق' } },
    { id:'writing',   icon:'edit',       tint:'#FBBF24', tintBg:'#FFF4D6', tintRing:'#FFE7A3',
      label:{ en:'Writing',   ar:'الكتابة' },
      desc: { en:'Write about a topic and get corrections',
              ar:'اكتب عن موضوع واحصل على تصحيحات' } },
  ];

  /* ---------- TRIAL ---------- */
  const TRIAL = { total:7, daysLeft:5, freeActivities:{ used:2, limit:8 } };

  /* ---------- PRICING ---------- */
  const PRICING = {
    monthly:{ price:13, period:'month', label:'Monthly' },
    annual: { price:99, period:'year',  label:'Annual', equivPerMonth:8.25, save:36, badge:'Save 36%' },
    features:[
      { en:'All three languages — English, Arabic, German', ar:'اللغات الثلاث: الإنجليزية، العربية، الألمانية' },
      { en:'All CEFR levels (A1 → C2)',                     ar:'جميع مستويات CEFR من A1 إلى C2' },
      { en:'Reading, Listening, Speaking, Writing modes',   ar:'وضعيات القراءة والاستماع والمحادثة والكتابة' },
      { en:'Unlimited AI-generated lessons & feedback',     ar:'دروس وملاحظات لا محدودة من الذكاء الاصطناعي' },
      { en:'Pronunciation scoring & written corrections',   ar:'تقييم النطق وتصحيح الكتابة' },
      { en:'Progress tracking, streaks, and downloadable certificates', ar:'تتبع التقدم وسلاسل الأيام وشهادات قابلة للتنزيل' },
    ],
  };

  /* ---------- READING PASSAGES (per language, per level) ----------
     Each passage: { title, topic, body[], wordCount, dir, questions[] } */
  const READING = {
    ar: {
      A2:[
        { title:'في المَقهى', topic:'Everyday life', wordCount:78, dir:'rtl',
          body:[
            'يَذهَبُ سامي إلى المَقهى كُلَّ صَباح. يَجلِسُ على طاوِلةٍ قُربَ النّافِذة ويَطلُبُ قَهوةً بالحَليب.',
            'يَأتي النّادِلُ ويَقولُ: «صَباحَ الخَير! ماذا تُريد؟» يَطلُبُ سامي قَهوةً وقِطعةَ كَعك. القَهوةُ لَذيذةٌ والكَعكُ طازَج.',
            'بَعدَ نِصفِ ساعة، يَطلُبُ سامي الفاتورة، يَدفَعُ، ويَشكُرُ النّادِل. ثُمَّ يَذهَبُ إلى عَمَلِه سَعيدًا.',
          ],
          questions:[
            { type:'mcq', q:'Where does Sami sit?', choices:['Near the door','Near the window','Outside','At the counter'], answer:1 },
            { type:'mcq', q:'What does Sami order?', choices:['Tea and bread','Coffee and cake','Juice only','Nothing'], answer:1 },
            { type:'open', q:'In your own words, how does Sami feel at the end?', sample:'He feels happy and goes to work.' },
          ]},
        { title:'في السّوق', topic:'Shopping', wordCount:71, dir:'rtl',
          body:[
            'تَذهَبُ ليلى إلى السّوق يَومَ الجُمعة. تَشتَري الخُضارَ والفواكِه الطازَجة من نَفسِ البائِع.',
            'اليَومَ تَشتَري طَماطِم وخِيار وتُفّاح. السِّعرُ مَعقول، والبائِعُ لَطيف ويُعطيها كيسًا إضافيًّا.',
            'تَعودُ إلى البَيت وتُحَضِّرُ سَلَطةً لذيذةً لِعائِلَتِها.',
          ],
          questions:[
            { type:'mcq', q:'When does Layla go to the market?', choices:['Sunday','Monday','Friday','Saturday'], answer:2 },
            { type:'mcq', q:'What does she NOT buy?', choices:['Tomatoes','Cucumber','Apples','Bread'], answer:3 },
            { type:'open', q:'Why does Layla return to the same seller?', sample:'Because he is friendly and the prices are reasonable.' },
          ]},
      ],
    },
    de: {
      A2:[
        { title:'Ein Morgen im Café', topic:'Everyday life', wordCount:82, dir:'ltr',
          body:[
            'Sami geht jeden Morgen ins Café. Er sitzt an einem Tisch am Fenster und bestellt einen Kaffee mit Milch.',
            'Der Kellner kommt und sagt: „Guten Morgen! Was möchten Sie?" Sami bestellt einen Kaffee und ein Stück Kuchen. Der Kaffee ist lecker und der Kuchen ist frisch.',
            'Nach einer halben Stunde bittet Sami um die Rechnung, bezahlt und dankt dem Kellner. Dann geht er glücklich zur Arbeit.',
          ],
          questions:[
            { type:'mcq', q:'Where does Sami sit?', choices:['By the door','By the window','Outside','At the counter'], answer:1 },
            { type:'mcq', q:'What does Sami order?', choices:['Tea and bread','Coffee and cake','Juice','Just water'], answer:1 },
            { type:'open', q:'How does Sami feel at the end of the passage?', sample:'He feels happy and goes to work.' },
          ]},
        { title:'Auf dem Markt', topic:'Shopping', wordCount:69, dir:'ltr',
          body:[
            'Layla geht freitags auf den Markt. Sie kauft Gemüse und frisches Obst immer beim selben Händler.',
            'Heute kauft sie Tomaten, Gurken und Äpfel. Der Preis ist fair, und der Händler ist freundlich — er gibt ihr eine extra Tüte.',
            'Sie geht nach Hause und bereitet einen leckeren Salat für ihre Familie zu.',
          ],
          questions:[
            { type:'mcq', q:'When does Layla go to the market?', choices:['Sunday','Monday','Friday','Saturday'], answer:2 },
            { type:'mcq', q:'What is NOT on her list?', choices:['Tomatoes','Cucumber','Apples','Bread'], answer:3 },
            { type:'open', q:'Why does she always go to the same seller?', sample:'He is friendly and the prices are fair.' },
          ]},
      ],
    },
    en: {
      A2:[
        { title:'A Morning at the Café', topic:'Everyday life', wordCount:88, dir:'ltr',
          body:[
            'Sami goes to the café every morning. He sits at a table by the window and orders a coffee with milk.',
            'The waiter comes and says, "Good morning! What would you like?" Sami orders a coffee and a piece of cake. The coffee is delicious and the cake is fresh.',
            'After half an hour, Sami asks for the bill, pays, and thanks the waiter. Then he goes to work, happy.',
          ],
          questions:[
            { type:'mcq', q:'Where does Sami sit?', choices:['By the door','By the window','Outside','At the counter'], answer:1 },
            { type:'mcq', q:'What does Sami order?', choices:['Tea and bread','Coffee and cake','Juice','Water'], answer:1 },
            { type:'open', q:'How does Sami feel at the end?', sample:'He feels happy and goes to work.' },
          ]},
        { title:'At the Market', topic:'Shopping', wordCount:74, dir:'ltr',
          body:[
            'Layla goes to the market on Fridays. She buys vegetables and fresh fruit from the same seller every week.',
            'Today she buys tomatoes, cucumbers, and apples. The prices are fair, and the seller is friendly — he gives her an extra bag.',
            'She goes home and makes a delicious salad for her family.',
          ],
          questions:[
            { type:'mcq', q:'When does Layla go to the market?', choices:['Sunday','Monday','Friday','Saturday'], answer:2 },
            { type:'mcq', q:'What does she NOT buy?', choices:['Tomatoes','Cucumber','Apples','Bread'], answer:3 },
            { type:'open', q:'Why does she keep going to the same seller?', sample:'He is friendly and the prices are fair.' },
          ]},
      ],
    },
  };

  /* fill missing levels with A2 content (for the prototype) */
  ['ar','de','en'].forEach(lang=>{
    ['A1','B1','B2','C1','C2'].forEach(lvl=>{ if(!READING[lang][lvl]) READING[lang][lvl] = READING[lang].A2; });
  });

  /* ---------- LISTENING (reuse passages — same text, with audio metadata) ---------- */
  const LISTENING = {
    ar:{ A2:[{ title:'صباحٌ في المقهى', topic:'Everyday life', durationSec:96, narrator:'Sara · MSA',
      transcript: READING.ar.A2[0].body, dir:'rtl', questions: READING.ar.A2[0].questions }]},
    de:{ A2:[{ title:'Ein Morgen im Café', topic:'Everyday life', durationSec:104, narrator:'Anja · Hochdeutsch',
      transcript: READING.de.A2[0].body, dir:'ltr', questions: READING.de.A2[0].questions }]},
    en:{ A2:[{ title:'A Morning at the Café', topic:'Everyday life', durationSec:88, narrator:'Sam · Neutral',
      transcript: READING.en.A2[0].body, dir:'ltr', questions: READING.en.A2[0].questions }]},
  };
  ['ar','de','en'].forEach(lang=>['A1','B1','B2','C1','C2'].forEach(lvl=>{ if(!LISTENING[lang][lvl]) LISTENING[lang][lvl] = LISTENING[lang].A2; }));

  /* ---------- SPEAKING PROMPTS ----------
     target: the sentence to read aloud, with mispronounced word indices for the demo. */
  const SPEAKING = {
    ar:{ A2:[
      { text:'أَشرَبُ القَهوةَ بِالحَليبِ كُلَّ صَباح.', words:['أَشرَبُ','القَهوةَ','بِالحَليبِ','كُلَّ','صَباح.'],
        translation:'I drink coffee with milk every morning.', dir:'rtl',
        mockResult:{ heardWords:['أَشرَبُ','القَهوةَ','بِالحَليب','كُلَّ','صباح'], wrongIdx:[2], score:84 } },
      { text:'بِكَم الفاتورة من فَضلِك؟', words:['بِكَم','الفاتورة','من','فَضلِك؟'],
        translation:'How much is the bill, please?', dir:'rtl',
        mockResult:{ heardWords:['بِكام','الفاتورة','من','فَضلِك'], wrongIdx:[0], score:78 } },
    ]},
    de:{ A2:[
      { text:'Ich trinke jeden Morgen einen Kaffee mit Milch.', words:['Ich','trinke','jeden','Morgen','einen','Kaffee','mit','Milch.'],
        translation:'I drink coffee with milk every morning.', dir:'ltr',
        mockResult:{ heardWords:['Ich','trinke','jeden','Morgen','ein','Kaffee','mit','Milch'], wrongIdx:[4], score:88 } },
      { text:'Können Sie mir bitte die Rechnung bringen?', words:['Können','Sie','mir','bitte','die','Rechnung','bringen?'],
        translation:'Could you bring me the bill, please?', dir:'ltr',
        mockResult:{ heardWords:['Können','Sie','mir','bitter','die','Rechnung','bringen'], wrongIdx:[3], score:82 } },
    ]},
    en:{ A2:[
      { text:'I drink coffee with milk every morning.', words:['I','drink','coffee','with','milk','every','morning.'],
        translation:'', dir:'ltr',
        mockResult:{ heardWords:['I','drink','coffe','with','milk','every','morning'], wrongIdx:[2], score:90 } },
      { text:'Could you bring me the bill, please?', words:['Could','you','bring','me','the','bill,','please?'],
        translation:'', dir:'ltr',
        mockResult:{ heardWords:['Could','you','bring','me','the','bill','peace'], wrongIdx:[6], score:81 } },
    ]},
  };
  ['ar','de','en'].forEach(lang=>['A1','B1','B2','C1','C2'].forEach(lvl=>{ if(!SPEAKING[lang][lvl]) SPEAKING[lang][lvl] = SPEAKING[lang].A2; }));

  /* ---------- WRITING PROMPTS ---------- */
  const WRITING = {
    ar:{ A2:[
      { topic:'My morning routine', topicNative:'روتيني الصباحي', minWords:60, dir:'rtl',
        instructions:'Write about how you spend your morning. Use the present tense.',
        mockSubmission:'أنا أَستَيقِظُ في السادسة. أَشرَبُ قهوة وأَذهَبُ إلى عَمَلي. في الطَّريق أَستَمِعُ إلى الموسيقى. أُحِبُّ صَباحي.',
        mockCorrection:[
          { word:'أَستَيقِظُ', ok:true },
          { word:'في', ok:true },
          { word:'السادسة.', ok:true },
          { word:'أَشرَبُ', ok:true },
          { word:'قهوة', suggest:'قَهوةً', note:'Add the accusative tanwīn — كلمة “قهوة” مفعول به.', ok:false },
          { word:'وأَذهَبُ', ok:true },
          { word:'إلى', ok:true },
          { word:'عَمَلي.', ok:true },
          { word:'في', ok:true },
          { word:'الطَّريق', ok:true },
          { word:'أَستَمِعُ', ok:true },
          { word:'إلى', ok:true },
          { word:'الموسيقى.', ok:true },
          { word:'أُحِبُّ', ok:true },
          { word:'صَباحي.', ok:true },
        ],
        score:86,
        summary:{ en:'Strong present-tense work. One small case-marking slip on “قهوة”. Sentences are clear and connected.',
                  ar:'استخدام جيّد للفعل المضارع. خطأ بسيط في علامة النصب على «قَهوةً». الجمل واضحة ومترابطة.' } },
      { topic:'A place I love in my city', topicNative:'مكانٌ أُحِبُّه في مدينتي', minWords:60, dir:'rtl',
        instructions:'Describe a place and why you like it. Use adjectives.', mockSubmission:'', mockCorrection:[], score:0 },
    ]},
    de:{ A2:[
      { topic:'My morning routine', topicNative:'Mein Morgenroutine', minWords:60, dir:'ltr',
        instructions:'Write about how you spend your morning. Use the present tense.',
        mockSubmission:'Ich stehe um sechs auf. Ich trinke ein Kaffee und gehe zu Arbeit. Auf dem Weg höre ich Musik. Ich liebe meinen Morgen.',
        mockCorrection:[
          { word:'Ich', ok:true },{ word:'stehe', ok:true },{ word:'um', ok:true },{ word:'sechs', ok:true },{ word:'auf.', ok:true },
          { word:'Ich', ok:true },{ word:'trinke', ok:true },
          { word:'ein', suggest:'einen', note:'Accusative: Kaffee is masculine — der Kaffee → einen Kaffee.', ok:false },
          { word:'Kaffee', ok:true },{ word:'und', ok:true },{ word:'gehe', ok:true },
          { word:'zu', suggest:'zur', note:'zu + der → zur Arbeit (contraction with dative feminine).', ok:false },
          { word:'Arbeit.', ok:true },
          { word:'Auf', ok:true },{ word:'dem', ok:true },{ word:'Weg', ok:true },{ word:'höre', ok:true },{ word:'ich', ok:true },{ word:'Musik.', ok:true },
          { word:'Ich', ok:true },{ word:'liebe', ok:true },{ word:'meinen', ok:true },{ word:'Morgen.', ok:true },
        ],
        score:78,
        summary:{ en:'Good sentence flow. Two case slips: accusative “einen Kaffee” and dative contraction “zur Arbeit”. Try to learn each noun with its article.',
                  ar:'تدفق جيد للجمل. خطآن في الإعراب: «einen Kaffee» و«zur Arbeit». احفظ كل اسم مع أداة تعريفه.' } },
      { topic:'A place I love in my city', topicNative:'Ein Ort, den ich in meiner Stadt liebe', minWords:60, dir:'ltr',
        instructions:'Describe a place and why you like it. Use adjectives.', mockSubmission:'', mockCorrection:[], score:0 },
    ]},
    en:{ A2:[
      { topic:'My morning routine', topicNative:'My morning routine', minWords:60, dir:'ltr',
        instructions:'Write about how you spend your morning. Use the present tense.',
        mockSubmission:'I wake up at six. I drink a coffee and go to work. On my way I listen music. I love my morning.',
        mockCorrection:[
          { word:'I', ok:true },{ word:'wake', ok:true },{ word:'up', ok:true },{ word:'at', ok:true },{ word:'six.', ok:true },
          { word:'I', ok:true },{ word:'drink', ok:true },
          { word:'a', suggest:'a', ok:true },
          { word:'coffee', ok:true },{ word:'and', ok:true },{ word:'go', ok:true },{ word:'to', ok:true },{ word:'work.', ok:true },
          { word:'On', ok:true },{ word:'my', ok:true },{ word:'way', ok:true },
          { word:'I', ok:true },{ word:'listen', suggest:'listen to', note:'Use “listen to” + noun.', ok:false },
          { word:'music.', ok:true },{ word:'I', ok:true },{ word:'love', ok:true },{ word:'my', ok:true },{ word:'morning.', ok:true },
        ],
        score:88,
        summary:{ en:'Clear and well-structured. One small preposition slip: we say “listen to music”, not “listen music”.',
                  ar:'الكتابة واضحة ومنظَّمة. خطأ صغير في حرف الجر: نقول «listen to music».' } },
      { topic:'A place I love in my city', topicNative:'A place I love in my city', minWords:60, dir:'ltr',
        instructions:'Describe a place and why you like it. Use adjectives.', mockSubmission:'', mockCorrection:[], score:0 },
    ]},
  };
  ['ar','de','en'].forEach(lang=>['A1','B1','B2','C1','C2'].forEach(lvl=>{ if(!WRITING[lang][lvl]) WRITING[lang][lvl] = WRITING[lang].A2; }));

  /* ---------- I18N additions ---------- */
  const ADD_STR = {
    en:{
      levelSel:{ title:'Pick your level', sub:'You can change this any time.', cont:'Continue', studying:'Studying' },
      hub:{ title:'What do you want to practice today?', sub:'Pick a skill — the AI tailors the lesson to your level.',
        free:'free activities', start:'Start' },
      reading:{ title:'Reading', generating:'Generating a fresh passage…', regen:'Generate another',
        words:'words', est:'min read', comp:'Comprehension', check:'Check answers', correct:'Correct',
        incorrect:'Try again', open:'Your answer', samplePrefix:'Sample answer', score:'Score',
        explain:'Explain in my language' },
      listening:{ title:'Listening', generating:'Generating audio…', play:'Play', pause:'Pause',
        speed:'Speed', show:'Show transcript', hide:'Hide transcript', replay:'Replay',
        narrator:'Narrator' },
      speaking:{ title:'Speaking', prompt:'Read this sentence aloud',
        idle:'Tap to record', recording:'Recording — tap to stop', processing:'Transcribing…',
        result:'Pronunciation score', heardYou:'We heard you say', tryAgain:'Try again',
        nextSentence:'Next sentence', accuracy:'Accuracy', missed:'mispronounced', perfect:'Pronounced cleanly',
        denied:'Microphone access denied' },
      writing:{ title:'Writing', prompt:'Today\u2019s topic', editor:'Start writing…', wordCount:'words',
        minWords:'minimum', submit:'Submit for correction', processing:'Reading your writing…',
        feedback:'Feedback', summary:'Summary', tryAnother:'Try another topic',
        legend:{ good:'Looks good', fix:'Suggestion' } },
      upgrade:{ title:'Keep learning without limits',
        sub:'One simple plan unlocks every language, every level, every mode.',
        monthly:'Monthly', annual:'Annual', startSub:'Start subscription',
        cancel:'Cancel anytime. No hidden fees.', perMonth:'/month', perYear:'/year',
        billedAnnually:'billed annually as ${total}', billedMonthly:'billed monthly',
        savings:'Save 36% — like getting 4 months free', features:'Everything in your plan',
        trialBanner:'days left in your free trial',
        trialEnded:'Your free trial has ended',
        locked:'This activity is part of Lingo Pro',
        unlock:'Unlock' },
      common:{ back:'Back', changeLevel:'Change level', changeMode:'Change mode', upgrade:'Upgrade' },
    },
    ar:{
      levelSel:{ title:'اختر مستواك', sub:'يمكنك تغييره في أيِّ وقت.', cont:'متابعة', studying:'تتعلّم' },
      hub:{ title:'ماذا تريد أن تتدرّب اليوم؟', sub:'اختر مهارة — يُكيِّف الذكاءُ الاصطناعيُّ الدرسَ مع مستواك.',
        free:'نشاط مجاني', start:'ابدأ' },
      reading:{ title:'القراءة', generating:'يُنشِئ الذكاءُ الاصطناعيُّ نصًّا جديدًا…', regen:'إنشاء نصٍّ آخر',
        words:'كلمة', est:'دقيقة قراءة', comp:'الاستيعاب', check:'تحقّق من الإجابات', correct:'صحيح',
        incorrect:'حاول مجدّدًا', open:'إجابتك', samplePrefix:'إجابة نموذجية', score:'النتيجة',
        explain:'اشرح بلغتي' },
      listening:{ title:'الاستماع', generating:'يُنشِئ المقطع الصوتي…', play:'تشغيل', pause:'إيقاف',
        speed:'السرعة', show:'عرض النص', hide:'إخفاء النص', replay:'إعادة',
        narrator:'الراوي' },
      speaking:{ title:'المحادثة', prompt:'اقرأ هذه الجملة بصوتٍ عالٍ',
        idle:'اضغط للتسجيل', recording:'يجري التسجيل — اضغط للإيقاف', processing:'يُحلَّل صوتك…',
        result:'تقييم النطق', heardYou:'سمعناك تقول', tryAgain:'أعد المحاولة',
        nextSentence:'الجملة التالية', accuracy:'الدقّة', missed:'نُطقت بشكل خاطئ', perfect:'نُطقت بوضوح',
        denied:'تمَّ رفض إذن الميكروفون' },
      writing:{ title:'الكتابة', prompt:'موضوع اليوم', editor:'اِبدأ بالكتابة…', wordCount:'كلمة',
        minWords:'الحد الأدنى', submit:'إرسال للتصحيح', processing:'يُراجَع نصك…',
        feedback:'الملاحظات', summary:'الخلاصة', tryAnother:'موضوع آخر',
        legend:{ good:'جيّد', fix:'اقتراح' } },
      upgrade:{ title:'تابِع التعلّم بلا حدود',
        sub:'خطّة واحدة بسيطة تفتح لك كلّ اللغات والمستويات والوضعيات.',
        monthly:'شهري', annual:'سنوي', startSub:'ابدأ الاشتراك',
        cancel:'يمكنك الإلغاء في أيّ وقت. بدون رسوم خفيّة.', perMonth:'/شهر', perYear:'/سنة',
        billedAnnually:'يُدفَع سنويًّا بمبلغ ${total}', billedMonthly:'يُدفع شهريًّا',
        savings:'وفّر 36% — كأنّك تحصل على 4 أشهر مجّانًا', features:'كلُّ ما في خطّتك',
        trialBanner:'يوم متبقٍّ في تجربتك المجانية',
        trialEnded:'انتهت تجربتك المجانية',
        locked:'هذا النشاط جزء من Lingo Pro',
        unlock:'افتح' },
      common:{ back:'رجوع', changeLevel:'تغيير المستوى', changeMode:'تغيير الوضع', upgrade:'الترقية' },
    }
  };
  // merge into existing STR
  Object.keys(ADD_STR).forEach(k=>{ Object.assign(D.STR[k], ADD_STR[k]); });

  /* ---------- COMMIT TO WINDOW ---------- */
  window.CONTENT = { SKILLS, TRIAL, PRICING, READING, LISTENING, SPEAKING, WRITING };
})();
