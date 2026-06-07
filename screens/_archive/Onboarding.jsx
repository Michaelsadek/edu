// screens/Onboarding.jsx → window.Onboarding
const { cx:ocx, useApp:ouseApp, Button:OBtn, Card:OCard, Badge:OBadge, FlagTile:OFlag, FlagSVG:OFlagSVG, ProgressBar:OBar, ProgressRing:ORing } = window.UI;

// quick placement questions (target-agnostic phrasing; instruction in English)
const PLACEMENT = {
  ar:[
    { q:'Which word means “hello”?', c:['مَرحَبًا','شُكرًا','وَداعًا','نَعَم'], a:0 },
    { q:'Pick the number “three”.', c:['واحِد','اِثنان','ثَلاثة','أَربَعة'], a:2 },
    { q:'“قَهوة” means…', c:['tea','water','coffee','juice'], a:2 },
    { q:'Complete: أنا ____ طالِب. (I am a student)', c:['هو','أنا','نحن','هي'], a:1 },
    { q:'Which is a question word?', c:['أَين','بَيت','كِتاب','باب'], a:0 },
    { q:'“يَذهَبُ” is a verb meaning…', c:['he eats','he goes','he sleeps','he reads'], a:1 },
    { q:'Choose the correct article form for “the book”.', c:['كِتاب','الكِتاب','كُتُب','كاتِب'], a:1 },
    { q:'Past tense of “to write” (he wrote):', c:['يَكتُب','كَتَبَ','كاتِب','مَكتوب'], a:1 },
    { q:'“بِالرَّغمِ مِن” roughly means…', c:['because','in spite of','therefore','after'], a:1 },
    { q:'Pick the most formal/advanced connector:', c:['و','لكن','عَلاوةً على ذلك','ثُمَّ'], a:2 },
  ],
  de:[
    { q:'Which word means “hello”?', c:['Hallo','Danke','Tschüss','Ja'], a:0 },
    { q:'Pick the number “three”.', c:['eins','zwei','drei','vier'], a:2 },
    { q:'“Kaffee” means…', c:['tea','water','coffee','juice'], a:2 },
    { q:'Complete: Ich ____ Student. (I am a student)', c:['ist','bin','bist','sind'], a:1 },
    { q:'Which is a question word?', c:['wo','Haus','Buch','Tür'], a:0 },
    { q:'Article for “das Buch” in plural (the books):', c:['der','die','das','den'], a:1 },
    { q:'Choose the correct case: Ich sehe ____ Mann.', c:['der','den','dem','des'], a:1 },
    { q:'Perfect tense: Ich habe ein Buch ____.', c:['lesen','gelesen','liest','las'], a:1 },
    { q:'“trotzdem” roughly means…', c:['because','nevertheless','therefore','after'], a:1 },
    { q:'Most advanced connector:', c:['und','aber','nichtsdestotrotz','dann'], a:2 },
  ],
  en:[
    { q:'Which word is a greeting?', c:['Hello','Apple','Run','Blue'], a:0 },
    { q:'Pick the number “three”.', c:['one','two','three','four'], a:2 },
    { q:'Choose the correct verb: She ____ tea.', c:['drink','drinks','drinking','drank'], a:1 },
    { q:'Complete: I ____ a student.', c:['is','am','are','be'], a:1 },
    { q:'Which is a question word?', c:['where','house','book','door'], a:0 },
    { q:'Plural of “child”:', c:['childs','children','childes','child'], a:1 },
    { q:'Past simple of “go”:', c:['goed','went','gone','going'], a:1 },
    { q:'Present perfect: I have ____ the book.', c:['read','reading','reads','readed'], a:0 },
    { q:'“nevertheless” roughly means…', c:['because','in spite of that','therefore','after'], a:1 },
    { q:'Most advanced connector:', c:['and','but','notwithstanding','then'], a:2 },
  ],
};

function LangChoiceCard({ lang, selected, onClick }){
  const D = window.DATA;
  return (
    <button onClick={onClick}
      className={ocx('relative w-full flex items-center gap-4 p-4 rounded-3xl border-2 text-start transition-all duration-150 bg-white',
        selected?'border-transparent shadow-lift -translate-y-0.5':'border-ink-200 hover:border-ink-300 hover:shadow-soft')}
      style={selected?{ boxShadow:`0 0 0 2.5px ${lang.tint}, 0 12px 32px rgba(16,24,40,.10)` }:{}}>
      <OFlag lang={lang} size={56}/>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold font-display text-ink-900 text-lg">{lang.name}</span>
          <span dir={lang.dir} className={ocx('text-ink-400 font-semibold', lang.dir==='rtl'&&'font-ar')}>{lang.native}</span>
        </div>
        <div className="text-sm text-ink-500 font-medium">{lang.learners} learners</div>
      </div>
      <span className={ocx('grid place-items-center w-7 h-7 rounded-full border-2 transition-all shrink-0',
        selected?'border-transparent text-white':'border-ink-200 text-transparent')}
        style={selected?{ background:lang.tint }:{}}>
        {window.Icons.check({size:16,stroke:3})}
      </span>
    </button>
  );
}

function Onboarding(){
  const { useState } = React;
  const I = window.Icons; const D = window.DATA;
  const { setUiLang, nav } = ouseApp();
  const app = ouseApp();
  const [stage,setStage] = useState(0); // 0 target,1 native,2 test,3 result
  const [target,setTarget] = useState(app.targetCode);
  const [native,setNative] = useState('en');
  // test state
  const [qi,setQi] = useState(0);
  const [answers,setAnswers] = useState([]);
  const [picking,setPicking] = useState(null);

  const questions = PLACEMENT[target] || PLACEMENT.ar;
  const targetLang = D.LANGS[target];

  function selectAnswer(idx){
    setPicking(idx);
    setTimeout(()=>{
      const next=[...answers]; next[qi]=idx; setAnswers(next); setPicking(null);
      if(qi+1>=questions.length){ setStage(3); } else setQi(qi+1);
    },260);
  }
  const score = answers.reduce((s,a,i)=> s+(a===questions[i].a?1:0),0);
  const level = score<=2?'A1':score<=4?'A2':score<=6?'B1':score<=8?'B2':'C1';
  const levelInfo = D.CEFR.find(c=>c.id===level);

  const Logo = (
    <div className="flex items-center gap-2.5 justify-center mb-6">
      <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-400 text-white shadow-glow"><I.globe size={20}/></span>
      <span className="text-lg font-extrabold font-display text-ink-900">Lingo</span>
    </div>
  );
  const steps = ['Language','You','Placement','Result'];

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8 sm:py-12" style={{ background:'radial-gradient(120% 80% at 50% -10%, #EFFCFB, #F4F7F9 60%)' }}>
      <div className="w-full max-w-xl">
        {Logo}
        {/* step progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s,i)=>(
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <span className={ocx('grid place-items-center w-7 h-7 rounded-full text-xs font-extrabold font-display transition-colors',
                  i<stage?'bg-teal-400 text-white': i===stage?'bg-ink-900 text-white':'bg-ink-200 text-ink-400')}>
                  {i<stage? I.check({size:14,stroke:3}) : i+1}
                </span>
                <span className={ocx('text-xs font-bold font-display hidden sm:block', i===stage?'text-ink-900':'text-ink-400')}>{s}</span>
              </div>
              {i<steps.length-1 && <div className={ocx('flex-1 h-0.5 rounded', i<stage?'bg-teal-400':'bg-ink-200')}/>}
            </React.Fragment>
          ))}
        </div>

        {/* STAGE 0 — target language */}
        {stage===0 && (
          <div className="animate-fade-up">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 text-balance">What do you want to learn?</h1>
            <p className="text-ink-500 font-medium mt-1.5 mb-6">Pick one language to start. You can add more later.</p>
            <div className="space-y-3">
              {['ar','de','en'].map(code=> <LangChoiceCard key={code} lang={D.LANGS[code]} selected={target===code} onClick={()=>setTarget(code)}/>)}
            </div>
            <OBtn full size="lg" className="mt-7" iconRight={I.arrowRight} onClick={()=>{ app.setTarget(target); setStage(1); }}>Continue</OBtn>
          </div>
        )}

        {/* STAGE 1 — native language */}
        {stage===1 && (
          <div className="animate-fade-up">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 text-balance">What language should we explain things in?</h1>
            <p className="text-ink-500 font-medium mt-1.5 mb-6">Grammar tips and instructions appear in your native language.</p>
            <div className="space-y-3">
              {['en','ar'].map(code=> <LangChoiceCard key={code} lang={{...D.NATIVE_LANGS[code], tint:'#7C8CF8', tintBg:'#EEF1FE', tintRing:'#C9D1FB', learners:D.LANGS[code]?.learners||'—'}} selected={native===code} onClick={()=>setNative(code)}/>)}
            </div>
            <div className="flex gap-3 mt-7">
              <OBtn variant="outline" icon={I.arrowLeft} onClick={()=>setStage(0)} className="rtl:flex-row-reverse">Back</OBtn>
              <OBtn full size="lg" iconRight={I.arrowRight} onClick={()=>{ setUiLang(native); setStage(2); }}>Continue</OBtn>
            </div>
          </div>
        )}

        {/* STAGE 2 — placement test */}
        {stage===2 && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-3">
              <OBadge color="teal"><I.target size={13}/> Placement test</OBadge>
              <span className="text-sm font-bold font-display text-ink-500 tabular-nums">{qi+1} / {questions.length}</span>
            </div>
            <OBar value={qi/questions.length} className="mb-6" h={10}/>
            <OCard>
              <div className="flex items-center gap-2 mb-4 text-ink-400 text-sm font-bold"><OFlagSVG code={target} size={22}/> {targetLang.name} · question {qi+1}</div>
              <h2 className="text-xl font-extrabold font-display text-ink-900 mb-5 text-balance">{questions[qi].q}</h2>
              <div className="grid gap-2.5">
                {questions[qi].c.map((c,i)=>{
                  const sel = picking===i;
                  const looksAr = /[\u0600-\u06FF]/.test(c);
                  return (
                    <button key={i} onClick={()=>picking===null&&selectAnswer(i)}
                      className={ocx('flex items-center gap-3.5 p-4 rounded-2xl border-2 text-start transition-all bg-white',
                        sel?'border-teal-400 bg-teal-50 ring-2 ring-teal-200':'border-ink-200 hover:border-teal-300 hover:bg-teal-50/40')}>
                      <span className={ocx('grid place-items-center w-8 h-8 rounded-xl shrink-0 text-sm font-extrabold font-display', sel?'bg-teal-400 text-white':'bg-ink-100 text-ink-500')}>{String.fromCharCode(65+i)}</span>
                      <span dir={looksAr?'rtl':'ltr'} className={ocx('flex-1 font-semibold text-ink-800', looksAr?'font-ar text-lg':'font-display text-[15px]')}>{c}</span>
                    </button>
                  );
                })}
              </div>
            </OCard>
            <button onClick={()=>qi>0?setQi(qi-1):setStage(1)} className="mt-4 text-sm font-bold font-display text-ink-400 hover:text-ink-700 flex items-center gap-1"><I.arrowLeft size={16} className="rtl:rotate-180"/> Back</button>
          </div>
        )}

        {/* STAGE 3 — result */}
        {stage===3 && (
          <div className="animate-fade-up text-center">
            <window.UI.Confetti fire="onb"/>
            <p className="text-ink-500 font-bold font-display mb-4">Based on your answers, your level is</p>
            <div className="inline-flex flex-col items-center">
              <ORing value={(['A1','A2','B1','B2','C1','C2'].indexOf(level)+1)/6} size={180} color={targetLang.tint}>
                <div><div className="text-5xl font-extrabold font-display text-ink-900">{level}</div>
                  <div className="text-sm text-ink-400 font-bold mt-1">{levelInfo?.label}</div></div>
              </ORing>
            </div>
            <OCard className="mt-7 text-start">
              <div className="flex items-center gap-3">
                <OFlag lang={targetLang} size={48}/>
                <div className="flex-1">
                  <div className="font-extrabold font-display text-ink-900">{targetLang.name} · {level}</div>
                  <div className="text-sm text-ink-500 font-medium">{levelInfo?.blurb}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[['Score',`${score}/10`],['Daily goal','20 min'],['First unit','Everyday life']].map(([l,v])=>(
                  <div key={l} className="bg-ink-50 rounded-2xl py-3">
                    <div className="font-extrabold font-display text-ink-900">{v}</div>
                    <div className="text-[11px] text-ink-400 font-bold mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </OCard>
            <OBtn full size="lg" variant="coral" className="mt-7" iconRight={I.arrowRight} onClick={()=>nav('dashboard')}>Start learning</OBtn>
            <button onClick={()=>{ setStage(0); setQi(0); setAnswers([]); }} className="mt-3 text-sm font-bold font-display text-ink-400 hover:text-ink-700">Retake the test</button>
          </div>
        )}
      </div>
    </div>
  );
}
window.Onboarding = Onboarding;
