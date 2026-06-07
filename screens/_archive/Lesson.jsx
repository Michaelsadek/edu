// screens/Lesson.jsx → window.Lesson
const { cx:lcx, useApp:luseApp, useT:luseT, Card:LCard, Button:LBtn, Badge:LBadge, ProgressBar:LBar, FlagTile:LFlag, Skeleton:LSkel } = window.UI;

const STEP_DEFS = [
  { key:'grammar',       icon:'book' },
  { key:'vocab',         icon:'list' },
  { key:'reading',       icon:'doc' },
  { key:'comprehension', icon:'eye' },
  { key:'video',         icon:'play' },
  { key:'quiz',          icon:'brain' },
];

/* ---- AI generating shimmer block ---- */
function Generating({ label }) {
  const I = window.Icons;
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2.5 text-teal-600 font-bold font-display mb-5">
        <span className="grid place-items-center w-8 h-8 rounded-xl bg-teal-50"><I.sparkles size={18} className="animate-pulse"/></span>
        {label}
      </div>
      <div className="space-y-3">
        <LSkel className="h-4 w-3/4"/><LSkel className="h-4 w-full"/><LSkel className="h-4 w-5/6"/>
        <div className="h-3"/>
        <LSkel className="h-4 w-2/3"/><LSkel className="h-4 w-full"/><LSkel className="h-4 w-1/2"/>
      </div>
    </div>
  );
}

/* ---- GRAMMAR ---- */
function GrammarStep({ lesson, target }){
  const t = luseT(); const I = window.Icons;
  const { useState } = React;
  const [alt,setAlt] = useState(false);
  const [loading,setLoading] = useState(false);
  const g = lesson.grammar;
  const isRtl = lesson.dir==='rtl';
  function explainAgain(){ setLoading(true); setTimeout(()=>{ setAlt(a=>!a); setLoading(false); },1100); }
  const altText = "Think of it like a name tag on the verb: the front letter announces who's speaking. Swap the tag, keep the word — the meaning of the action never changes, only the doer.";
  return (
    <div className="animate-fade-up space-y-5">
      <div>
        <LBadge color="teal"><I.book size={13}/> {t.lesson.grammar}</LBadge>
        <h2 className="mt-3 text-2xl font-extrabold font-display text-ink-900">{g.rule}</h2>
      </div>
      <LCard className="bg-gradient-to-br from-teal-50/70 to-white border-teal-100">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 text-teal-700 font-bold font-display text-sm"><I.sparkles size={16}/> AI explanation</span>
          <LBtn size="sm" variant="ghost" icon={I.refresh} loading={loading} onClick={explainAgain}>{t.lesson.explainMore}</LBtn>
        </div>
        {loading ? <div className="space-y-2.5 py-1"><LSkel className="h-3.5 w-full"/><LSkel className="h-3.5 w-11/12"/><LSkel className="h-3.5 w-2/3"/></div>
          : <p className="text-ink-700 leading-relaxed text-[15px]">{alt? altText : g.ai}</p>}
      </LCard>

      {/* conjugation / declension table */}
      <LCard pad={false} className="overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto]">
          {g.table.map((row,idx)=>(
            <React.Fragment key={idx}>
              <div className={lcx('px-5 py-3.5 text-ink-600 font-medium border-ink-100', idx&&'border-t')}>{row.p}</div>
              <div dir={lesson.dir} className={lcx('px-5 py-3.5 font-bold text-ink-900 border-ink-100 text-end', idx&&'border-t', isRtl?'font-ar text-xl':'font-display text-lg')}>{row.ar}</div>
              <div className={lcx('hidden sm:flex items-center px-5 py-3.5 text-ink-400 text-sm font-medium border-ink-100 justify-end', idx&&'border-t')}>{row.tr}</div>
            </React.Fragment>
          ))}
        </div>
      </LCard>

      <div>
        <h3 className="font-extrabold font-display text-ink-900 mb-2.5 flex items-center gap-2"><I.message size={17} className="text-coral-400"/> {t.lesson.examples}</h3>
        <div className="grid gap-2.5">
          {g.examples.map((ex,i)=>(
            <LCard key={i} pad={false} className="p-4">
              <div dir={lesson.dir} className={lcx('font-bold text-ink-900', isRtl?'font-ar text-xl':'font-display text-lg')}>{ex.ar}</div>
              <div className="text-sm text-ink-400 font-medium mt-1">{ex.tr}</div>
              {ex.en && <div className="text-sm text-ink-600 mt-1">{ex.en}</div>}
            </LCard>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- VOCAB ---- */
function VocabStep({ lesson, target }){
  const t = luseT(); const I = window.Icons;
  const isRtl = lesson.dir==='rtl';
  return (
    <div className="animate-fade-up">
      <LBadge color="coral" className="mb-3"><I.list size={13}/> {t.lesson.vocab}</LBadge>
      <h2 className="text-2xl font-extrabold font-display text-ink-900 mb-1">{t.lesson.newWords}</h2>
      <p className="text-ink-500 font-medium mb-5">Tap <I.volume size={15} className="inline -mt-0.5"/> to hear each word.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {lesson.vocab.map((w,i)=>(
          <LCard key={i} pad={false} className="p-4 flex items-center gap-3.5 group" hover>
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink-100 text-ink-400 text-xs font-extrabold font-display shrink-0">{String(i+1).padStart(2,'0')}</span>
            <div className="flex-1 min-w-0">
              <div dir={lesson.dir} className={lcx('font-bold text-ink-900 truncate', isRtl?'font-ar text-xl':'font-display text-lg')}>{w.ar}</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-ink-400 font-medium">{w.tr}</span>
                <span className="text-ink-300">·</span>
                <span className="text-ink-600 font-medium truncate">{w.en}</span>
              </div>
            </div>
            <button className="grid place-items-center w-9 h-9 rounded-xl text-teal-500 bg-teal-50 hover:bg-teal-100 transition-colors shrink-0" title={t.lesson.listen}>
              <I.volume size={18}/>
            </button>
          </LCard>
        ))}
      </div>
    </div>
  );
}

/* ---- READING (AI-generated) ---- */
function ReadingStep({ lesson, target, ready, onGenerate }){
  const t = luseT(); const I = window.Icons;
  const isRtl = lesson.dir==='rtl';
  if(!ready) return <Generating label={t.lesson.generating}/>;
  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <LBadge color="teal"><I.doc size={13}/> {t.lesson.reading}</LBadge>
        <span className="flex items-center gap-1.5 text-xs font-bold text-ink-400"><I.sparkles size={13} className="text-teal-400"/> AI-generated · {lesson.level}</span>
      </div>
      <LCard className="relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5" style={{ background:`linear-gradient(90deg,${target.tint},#7C8CF8)` }}/>
        <div dir={lesson.dir} className={isRtl?'text-right':''}>
          <h3 className={lcx('font-extrabold text-ink-900 mb-4', isRtl?'font-ar text-2xl':'font-display text-xl')}>{lesson.reading.title}</h3>
          <div className={lcx('space-y-4', isRtl?'font-ar':'')}>
            {lesson.reading.paras.map((p,i)=>(
              <p key={i} className={lcx('text-ink-800 leading-loose', isRtl?'text-xl':'text-[17px] leading-relaxed')}>{p}</p>
            ))}
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-ink-100 flex items-center gap-3">
          <button onClick={onGenerate} className="flex items-center gap-2 text-sm font-bold font-display text-teal-600 hover:text-teal-700">
            <I.refresh size={16}/> Regenerate passage
          </button>
          <span className="text-ink-200">|</span>
          <button className="flex items-center gap-2 text-sm font-bold font-display text-ink-500 hover:text-ink-700">
            <I.volume size={16}/> {t.lesson.listen}
          </button>
        </div>
      </LCard>
    </div>
  );
}

/* ---- VIDEO ---- */
function VideoStep({ lesson, target }){
  const t = luseT(); const I = window.Icons;
  const { useState } = React;
  const [playing,setPlaying] = useState(false);
  return (
    <div className="animate-fade-up">
      <LBadge color="coral" className="mb-3"><I.play size={13}/> {t.lesson.video}</LBadge>
      <h2 className="text-2xl font-extrabold font-display text-ink-900 mb-1">Watch & repeat</h2>
      <p className="text-ink-500 font-medium mb-5">A short clip using today's words in real conversation.</p>
      <LCard pad={false} className="overflow-hidden">
        <div className="relative aspect-video grid place-items-center"
          style={{ background:`radial-gradient(120% 120% at 30% 20%, ${target.tintBg}, #0F1B2A 130%)` }}>
          {/* faux subtitle */}
          <div dir={lesson.dir} className={lcx('absolute bottom-4 inset-x-0 text-center px-6 text-white/90 font-semibold', lesson.dir==='rtl'?'font-ar text-lg':'')}>
            <span className="bg-black/40 rounded-lg px-3 py-1">{lesson.reading.paras[0].slice(0,46)}…</span>
          </div>
          <button onClick={()=>setPlaying(p=>!p)} className="grid place-items-center w-20 h-20 rounded-full bg-white/95 text-ink-900 shadow-lift hover:scale-105 transition-transform">
            {playing? <I.minus size={30}/> : <I.play size={32}/>}
          </button>
          <span className="absolute top-4 left-4"><LBadge color="white"><I.headphones size={13}/> {target.name} · CC</LBadge></span>
        </div>
        <div className="p-4 flex items-center gap-3">
          <span className="text-sm font-bold font-display text-ink-500 tabular-nums">{playing?'0:42':'0:00'}</span>
          <LBar value={playing?0.28:0} color={target.tint} className="flex-1"/>
          <span className="text-sm font-bold font-display text-ink-400 tabular-nums">2:30</span>
        </div>
      </LCard>
    </div>
  );
}

/* ---- main Lesson shell ---- */
function Lesson(){
  const t = luseT(); const I = window.Icons;
  const D = window.DATA;
  const { targetCode, nav } = luseApp();
  const { useState, useEffect } = React;
  const target = D.LANGS[targetCode];
  const lesson = D.LESSONS[targetCode];

  const [step,setStep] = useState(0);
  const [readingReady,setReadingReady] = useState(false);
  const cur = STEP_DEFS[step].key;

  // trigger AI generation when reaching reading step
  useEffect(()=>{
    if(cur==='reading' && !readingReady){ const tm=setTimeout(()=>setReadingReady(true),1700); return ()=>clearTimeout(tm); }
  },[cur,readingReady]);

  function regenerate(){ setReadingReady(false); setTimeout(()=>setReadingReady(true),1500); }

  const isDriven = cur==='quiz' || cur==='comprehension'; // quiz drives its own footer
  const progress = (step+1)/STEP_DEFS.length;

  function go(n){ setStep(Math.max(0,Math.min(STEP_DEFS.length-1,n))); window.scrollTo&&window.scrollTo(0,0); }

  return (
    <div className="min-h-full flex flex-col">
      {/* top bar */}
      <div className="sticky top-0 z-20 bg-white/85 backdrop-blur border-b border-ink-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={()=>nav('dashboard')} className="grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-ink-100 shrink-0"><I.x size={20}/></button>
          <LFlag lang={target} size={34}/>
          <div className="min-w-0 flex-1">
            <div className="font-extrabold font-display text-ink-900 leading-tight truncate">{lesson.title}</div>
            <div className="text-xs text-ink-400 font-medium">{lesson.unit}</div>
          </div>
          <span className="text-sm font-bold font-display text-ink-500 tabular-nums shrink-0">{t.lesson.step} {step+1} {t.lesson.of} {STEP_DEFS.length}</span>
        </div>
        {/* step dots */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-3">
          <div className="flex items-center gap-1.5">
            {STEP_DEFS.map((s,idx)=>{
              const Icon = I[s.icon];
              const done = idx<step, active = idx===step;
              return (
                <button key={s.key} onClick={()=>idx<=step&&go(idx)} disabled={idx>step}
                  className={lcx('group flex-1 flex flex-col items-center gap-1', idx>step&&'cursor-default')}>
                  <div className={lcx('w-full h-1.5 rounded-full transition-colors', done?'bg-teal-400': active?'bg-coral-400':'bg-ink-200')}/>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* content */}
      <div className="flex-1 w-full">
        {isDriven ? (
          <div className="py-2">
            {cur==='comprehension' && <window.QuizRunner questions={lesson.comprehension} target={target} title={t.lesson.comprehension} onDone={()=>go(step+1)}/>}
            {cur==='quiz' && <window.QuizRunner questions={D.QUIZZES[targetCode]} target={target} title={t.lesson.quiz} onDone={()=>nav('lessonComplete')}/>}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-7">
            {cur==='grammar' && <GrammarStep lesson={lesson} target={target}/>}
            {cur==='vocab' && <VocabStep lesson={lesson} target={target}/>}
            {cur==='reading' && <ReadingStep lesson={lesson} target={target} ready={readingReady} onGenerate={regenerate}/>}
            {cur==='video' && <VideoStep lesson={lesson} target={target}/>}
          </div>
        )}
      </div>

      {/* footer */}
      {!isDriven && (
        <div className="sticky bottom-0 bg-white/85 backdrop-blur border-t border-ink-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
            <LBtn variant="ghost" icon={I.arrowLeft} onClick={()=>step===0?nav('dashboard'):go(step-1)} className="rtl:flex-row-reverse">{t.lesson.back}</LBtn>
            <LBtn size="lg" iconRight={I.arrowRight} disabled={cur==='reading'&&!readingReady} onClick={()=>go(step+1)}>{t.lesson.continue}</LBtn>
          </div>
        </div>
      )}
    </div>
  );
}

/* lesson complete celebration */
function LessonComplete(){
  const t = luseT(); const I = window.Icons; const D = window.DATA;
  const { targetCode, nav } = luseApp();
  const { Confetti } = window.UI;
  return (
    <div className="max-w-md mx-auto px-5 py-12 text-center animate-fade-up">
      <Confetti fire="lc"/>
      <div className="inline-grid place-items-center w-28 h-28 rounded-full bg-gradient-to-br from-teal-100 to-coral-100 mb-6">
        <I.trophy size={54} className="text-coral-400"/>
      </div>
      <h1 className="text-3xl font-extrabold font-display text-ink-900">Lesson complete!</h1>
      <p className="text-ink-500 font-medium mt-2">You earned <b className="text-ink-800">+20 XP</b> and kept your <span className="text-coral-500 font-bold">24-day streak</span> alive.</p>
      <div className="grid grid-cols-3 gap-3 my-7">
        {[['+20','XP','teal'],['24','Streak','coral'],['5/6','Unit','grass']].map(([v,l,c])=>(
          <div key={l} className="bg-white rounded-2xl border border-ink-100 shadow-soft py-4">
            <div className={lcx('text-2xl font-extrabold font-display', c==='teal'?'text-teal-600':c==='coral'?'text-coral-500':'text-grass-600')}>{v}</div>
            <div className="text-xs text-ink-400 font-bold mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <LBtn size="lg" variant="coral" iconRight={I.arrowRight} onClick={()=>nav('lesson')}>Next lesson</LBtn>
        <LBtn size="lg" variant="outline" onClick={()=>nav('dashboard')}>Back to dashboard</LBtn>
      </div>
    </div>
  );
}

window.Lesson = Lesson;
window.LessonComplete = LessonComplete;
