// screens/_shared.jsx — pieces reused across mode screens → window.Shared
const { cx:scx, useApp:suseApp, useT:suseT, Button:SBtn, Card:SCard, Badge:SBadge, LevelChip:SLevel, FlagTile:SFlag, FlagSVG:SFlagSVG } = window.UI;

/* ---------- TRIAL BANNER ---------- */
function TrialBanner(){
  const { trial, nav, uiLang } = suseApp();
  const t = suseT();
  const I = window.Icons;
  if(trial.subscribed) return null;
  if(trial.expired){
    return (
      <div className="w-full" style={{ background:'linear-gradient(90deg,#FFE0EC,#FFF1F6 60%,#FFE0EC)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-coral-400 text-white"><I.lock size={15}/></span>
          <span className="text-sm font-bold font-display text-coral-700 flex-1">{t.upgrade.trialEnded}</span>
          <SBtn variant="coral" size="sm" iconRight={I.arrowRight} onClick={()=>nav('upgrade')}>{t.common.upgrade}</SBtn>
        </div>
      </div>
    );
  }
  // active trial
  const pct = trial.daysLeft/trial.total;
  return (
    <div className="w-full bg-white border-b border-ink-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-50 text-teal-600 shrink-0"><I.gift size={15}/></span>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm font-bold font-display text-ink-800 whitespace-nowrap">{trial.daysLeft} {t.upgrade.trialBanner}</span>
          <span className="hidden sm:block flex-1 max-w-[160px]">
            <span className="block w-full bg-ink-100 rounded-full h-1.5 overflow-hidden">
              <span className="block h-full bg-teal-400 rounded-full" style={{ width:`${pct*100}%` }}/>
            </span>
          </span>
        </div>
        <button onClick={()=>nav('upgrade')} className="text-sm font-extrabold font-display text-teal-700 hover:text-teal-800 flex items-center gap-1">
          {t.common.upgrade} <I.arrowRight size={15} className="rtl:rotate-180"/>
        </button>
      </div>
    </div>
  );
}

/* ---------- MODE TOP BAR ---------- */
function ModeTopBar({ skill }){
  const { targetCode, level, nav } = suseApp();
  const t = suseT();
  const D = window.DATA, C = window.CONTENT;
  const target = D.LANGS[targetCode];
  const Icon = window.Icons[skill.icon];
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-ink-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <button onClick={()=>nav('skillHub')} className="grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-ink-100 shrink-0">{window.Icons.arrowLeft({size:20,className:'rtl:rotate-180'})}</button>
        <span className="grid place-items-center w-10 h-10 rounded-2xl shrink-0" style={{ background:skill.tintBg, color:skill.tint, boxShadow:`inset 0 0 0 1.5px ${skill.tintRing}` }}>
          <Icon size={20}/>
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-extrabold font-display text-ink-900 leading-tight truncate">{skill.label[t.dir==='rtl'?'ar':'en']||skill.label.en}</div>
          <div className="text-[11px] text-ink-400 font-medium">{t.common.studying||'Studying'} {target.name} · {level}</div>
        </div>
        <span className="hidden sm:inline-flex"><SFlag lang={target} size={32}/></span>
        <SLevel level={level} active/>
      </div>
    </div>
  );
}

/* ---------- AI GENERATING SHIMMER ---------- */
function AILoading({ label, lines=5 }){
  const I = window.Icons;
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2.5 text-teal-600 font-bold font-display mb-5">
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50"><I.sparkles size={18} className="animate-pulse"/></span>
        {label}
      </div>
      <div className="space-y-3">
        {Array.from({length:lines}).map((_,i)=>(
          <div key={i} className="skeleton h-4 rounded-lg" style={{ width:`${60+Math.random()*38}%` }}/>
        ))}
      </div>
    </div>
  );
}

/* ---------- COMPREHENSION (MCQ + open) ---------- */
function snorm(s){ return (s||'').trim().toLowerCase().replace(/[.،,!؟?]/g,''); }
function Comprehension({ questions, dir='ltr' }){
  const { useState } = React;
  const I = window.Icons;
  const t = suseT();
  const [answers,setAnswers] = useState(()=>questions.map(()=>undefined));
  const [checked,setChecked] = useState(false);

  const allFilled = answers.every((a,i)=>{
    if(questions[i].type==='mcq') return a!=null;
    return a!=null && String(a).trim().length>0;
  });

  function check(){ setChecked(true); }
  function reset(){ setChecked(false); setAnswers(questions.map(()=>undefined)); }

  const score = questions.reduce((s,q,i)=>{
    if(q.type==='mcq') return s+(answers[i]===q.answer?1:0);
    return s; // open: counted as engaged
  },0);
  const mcqCount = questions.filter(q=>q.type==='mcq').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold font-display text-ink-900 text-lg flex items-center gap-2"><I.eye size={18} className="text-teal-500"/> {t.reading.comp}</h3>
        {checked && <SBadge color={score===mcqCount?'grass':'sun'}>{t.reading.score}: {score}/{mcqCount}</SBadge>}
      </div>

      {questions.map((q,qi)=>{
        const ans = answers[qi];
        const correct = q.type==='mcq' && ans===q.answer;
        return (
          <SCard key={qi} className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="grid place-items-center w-8 h-8 rounded-xl bg-ink-100 text-ink-600 text-sm font-extrabold font-display shrink-0">{qi+1}</span>
              <div className="flex-1 font-semibold text-ink-800">{q.q}</div>
            </div>

            {q.type==='mcq' ? (
              <div className="grid gap-2">
                {q.choices.map((c,i)=>{
                  const sel = ans===i;
                  const looksAr = /[\u0600-\u06FF]/.test(c);
                  let cls='border-ink-200 hover:border-teal-300 hover:bg-teal-50/40';
                  let mark=null;
                  if(checked){
                    if(i===q.answer){ cls='border-grass-400 bg-grass-50'; mark=<I.checkCircle size={20} className="text-grass-500"/>; }
                    else if(sel){ cls='border-rose-400 bg-rose-50'; mark=<I.xCircle size={20} className="text-rose-500"/>; }
                    else cls='border-ink-200 opacity-55';
                  } else if(sel){ cls='border-teal-400 bg-teal-50 ring-2 ring-teal-200'; }
                  return (
                    <button key={i} disabled={checked} onClick={()=>{ const n=[...answers]; n[qi]=i; setAnswers(n); }}
                      className={scx('flex items-center gap-3 p-3.5 rounded-2xl border-2 text-start transition-all bg-white', cls)}>
                      <span className={scx('grid place-items-center w-7 h-7 rounded-lg shrink-0 text-xs font-extrabold font-display',
                        sel&&!checked?'bg-teal-400 text-white': checked&&i===q.answer?'bg-grass-500 text-white': checked&&sel?'bg-rose-500 text-white':'bg-ink-100 text-ink-500')}>
                        {String.fromCharCode(65+i)}
                      </span>
                      <span dir={looksAr?'rtl':'ltr'} className={scx('flex-1 font-semibold text-ink-800', looksAr?'font-ar text-lg':'')}>{c}</span>
                      {mark}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <textarea disabled={checked} value={ans||''} onChange={e=>{ const n=[...answers]; n[qi]=e.target.value; setAnswers(n); }}
                  rows={2} placeholder={t.reading.open}
                  className={scx('w-full p-3 rounded-2xl border-2 bg-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 text-ink-800 font-medium resize-none placeholder:text-ink-300',
                    checked?'border-teal-200 bg-teal-50/40':'border-ink-200')}/>
                {checked && q.sample && (
                  <div className="mt-2 p-3 rounded-xl bg-ink-50 text-sm">
                    <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400 mb-1">{t.reading.samplePrefix}</div>
                    <div className="text-ink-700 font-medium">{q.sample}</div>
                  </div>
                )}
              </div>
            )}
          </SCard>
        );
      })}

      <div className="flex gap-3 pt-1">
        {!checked
          ? <SBtn full size="lg" disabled={!allFilled} onClick={check}>{t.reading.check}</SBtn>
          : <><SBtn variant="outline" icon={window.Icons.refresh} onClick={reset}>{t.quiz?.retry||'Retry'}</SBtn>
              <SBtn full variant="primary" iconRight={window.Icons.arrowRight} onClick={reset}>{t.reading?.regen||'Generate another'}</SBtn></>}
      </div>
    </div>
  );
}

/* ---------- LOCKED OVERLAY (when trial expired) ---------- */
function LockedOverlay(){
  const { nav } = suseApp();
  const t = suseT();
  const I = window.Icons;
  return (
    <div className="max-w-md mx-auto px-5 py-12 animate-fade-up">
      <SCard className="text-center relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:'linear-gradient(90deg,#FF6B9D,#FBBF24)' }}/>
        <div className="inline-grid place-items-center w-20 h-20 rounded-full bg-coral-50 text-coral-500 mb-4 mt-2"><I.lock size={36}/></div>
        <h2 className="text-2xl font-extrabold font-display text-ink-900">{t.upgrade.trialEnded}</h2>
        <p className="text-ink-500 font-medium mt-2">{t.upgrade.locked}. Subscribe to keep all four skill modes, all levels, all languages.</p>
        <SBtn full size="lg" variant="coral" className="mt-5" iconRight={I.arrowRight} onClick={()=>nav('upgrade')}>{t.common.upgrade}</SBtn>
        <button onClick={()=>nav('skillHub')} className="mt-3 text-sm font-bold font-display text-ink-400 hover:text-ink-700">Back to skills</button>
      </SCard>
    </div>
  );
}

window.Shared = { TrialBanner, ModeTopBar, AILoading, Comprehension, LockedOverlay };
