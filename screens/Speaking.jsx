// screens/Speaking.jsx → window.Speaking
const { cx:spcx, useApp:spuseApp, useT:spuseT, Card:SpCard, Button:SpBtn, Badge:SpBadge, ProgressRing:SpRing, Confetti:SpCon } = window.UI;
const { TrialBanner:SpTrial, ModeTopBar:SpTopBar, LockedOverlay:SpLocked } = window.Shared;

/* live "waveform" — animated bars */
function Wave({ active }){
  const { useState, useEffect } = React;
  const [heights,setHeights] = useState(()=>Array(28).fill(0));
  useEffect(()=>{
    if(!active){ setHeights(Array(28).fill(0)); return; }
    let raf;
    const tick = ()=>{
      setHeights(h => h.map(()=> 0.18 + Math.random()*0.82));
      raf = setTimeout(tick,110);
    };
    tick();
    return ()=>clearTimeout(raf);
  },[active]);
  return (
    <div className="flex items-end justify-center gap-1 h-16 w-full max-w-sm">
      {heights.map((h,i)=>(
        <span key={i} className="rounded-full transition-[height] duration-150"
          style={{ width:5, height:`${(active?h:0.06)*100}%`, background: active?'#FF6B9D':'#CBD4DC' }}/>
      ))}
    </div>
  );
}

function fmtSec(s){ return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }

function Speaking(){
  const { useState, useEffect, useRef } = React;
  const I = window.Icons; const C = window.CONTENT; const D = window.DATA;
  const { targetCode, level, trial, nav } = spuseApp();
  const t = spuseT();
  const skill = C.SKILLS.find(s=>s.id==='speaking');

  const prompts = (C.SPEAKING[targetCode]||C.SPEAKING.en)[level] || (C.SPEAKING[targetCode]||C.SPEAKING.en).A2;
  const [pIdx,setPIdx] = useState(0);
  const prompt = prompts[pIdx % prompts.length];

  const [phase,setPhase] = useState('idle'); // idle | recording | processing | result | denied
  const [elapsed,setElapsed] = useState(0);
  const timerRef = useRef();
  const [fire,setFire] = useState(0);

  useEffect(()=>()=>clearInterval(timerRef.current),[]);

  function startRec(){
    setPhase('recording'); setElapsed(0);
    timerRef.current = setInterval(()=>setElapsed(e=>e+1),1000);
    // auto-stop at 12s for the prototype
    setTimeout(()=>{ if(phase!=='processing') stopRec(); },12000);
  }
  function stopRec(){
    clearInterval(timerRef.current);
    setPhase('processing');
    setTimeout(()=>{
      setPhase('result');
      if((prompt.mockResult?.score||0)>=85) setFire(f=>f+1);
    },1500);
  }
  function reset(){ setPhase('idle'); setElapsed(0); }
  function nextSentence(){ setPIdx(i=>i+1); reset(); }

  if(trial.expired) return (<div><SpTopBar skill={skill}/><SpLocked/></div>);

  const isRtl = prompt.dir==='rtl';
  const result = prompt.mockResult || {};
  const score = result.score||0;

  /* ---------- target sentence display, with per-word coloring after result ---------- */
  function SentenceDisplay(){
    return (
      <div dir={prompt.dir} className={spcx('flex flex-wrap gap-x-2 gap-y-3 justify-center', isRtl&&'font-ar')}>
        {prompt.words.map((w,i)=>{
          const wrong = phase==='result' && result.wrongIdx?.includes(i);
          const good  = phase==='result' && !result.wrongIdx?.includes(i);
          return (
            <span key={i} className={spcx('px-2 py-1 rounded-xl font-bold transition-colors',
              isRtl?'text-3xl':'text-2xl font-display',
              wrong?'bg-rose-50 text-rose-600 underline decoration-wavy decoration-rose-400':
              good ?'bg-grass-50 text-grass-700':
              'text-ink-900')}>{w}</span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SpTrial/>
      <SpTopBar skill={skill}/>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-7 space-y-6">
        <div>
          <SpBadge color="coral" className="mb-3"><I.mic size={13}/> {t.speaking.title} · {level}</SpBadge>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 tracking-tight text-balance">{t.speaking.prompt}</h1>
          {prompt.translation && <p className="text-ink-500 font-medium mt-1.5">{prompt.translation}</p>}
        </div>

        {/* main card */}
        <SpCard className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:`linear-gradient(90deg, ${skill.tint}, #FBBF24)` }}/>
          <div className="py-6 sm:py-8 text-center">
            <SentenceDisplay/>
            {phase==='result' && (
              <div className="mt-7 inline-flex flex-col items-center animate-fade-up">
                <SpRing value={score/100} size={120} color={score>=80?'#22C55E':'#FBBF24'}>
                  <div><div className="text-3xl font-extrabold font-display text-ink-900">{score}%</div>
                    <div className="text-[11px] text-ink-400 font-bold mt-0.5">{t.speaking.accuracy}</div></div>
                </SpRing>
              </div>
            )}
          </div>
        </SpCard>

        {/* recorder */}
        <SpCard pad={false} className="p-6">
          {phase==='idle' && (
            <div className="flex flex-col items-center animate-fade-in">
              <Wave active={false}/>
              <p className="text-ink-500 font-medium mt-3">{t.speaking.idle}</p>
              <button onClick={startRec} className="mt-5 grid place-items-center w-24 h-24 rounded-full text-white shadow-coral hover:scale-105 active:scale-100 transition-transform"
                style={{ background:'linear-gradient(135deg,#FF6B9D,#F84785)' }} aria-label={t.speaking.idle}>
                <I.mic size={42}/>
              </button>
              <button onClick={()=>setPhase('denied')} className="mt-4 text-xs font-bold text-ink-300 hover:text-ink-500">Simulate denied permission</button>
            </div>
          )}

          {phase==='recording' && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="flex items-center gap-2 text-coral-600 font-extrabold font-display"><span className="inline-block w-2.5 h-2.5 rounded-full bg-coral-500 animate-pulse"/> REC <span className="text-ink-400 font-bold tabular-nums">· {fmtSec(elapsed)}</span></div>
              <div className="mt-4 w-full max-w-sm"><Wave active/></div>
              <button onClick={stopRec} className="mt-5 grid place-items-center w-24 h-24 rounded-full text-white shadow-coral transition-all"
                style={{ background:'#0F1B2A' }} aria-label={t.speaking.recording}>
                <div className="w-8 h-8 rounded-md bg-white"/>
              </button>
              <p className="mt-4 text-ink-500 font-medium text-sm">{t.speaking.recording}</p>
            </div>
          )}

          {phase==='processing' && (
            <div className="flex flex-col items-center animate-fade-in py-2">
              <span className="grid place-items-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mb-3"><I.sparkles size={28} className="animate-pulse"/></span>
              <p className="text-ink-700 font-extrabold font-display">{t.speaking.processing}</p>
              <div className="mt-4 w-48 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full" style={{ width:'66%', transition:'width 1.2s' }}/>
              </div>
            </div>
          )}

          {phase==='denied' && (
            <div className="flex flex-col items-center animate-fade-in py-2">
              <span className="grid place-items-center w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mb-3"><I.micOff size={30}/></span>
              <p className="text-ink-900 font-extrabold font-display">{t.speaking.denied}</p>
              <p className="text-sm text-ink-500 font-medium mt-1 text-center max-w-xs">Allow Lingo to use your microphone in browser settings, then try again.</p>
              <SpBtn className="mt-4" variant="outline" icon={I.refresh} onClick={reset}>Try again</SpBtn>
            </div>
          )}

          {phase==='result' && (
            <div className="animate-fade-up">
              <SpCon fire={score>=85?fire:0}/>
              {/* what we heard */}
              <div className="mb-4">
                <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400 mb-1.5">{t.speaking.heardYou}</div>
                <div dir={prompt.dir} className={spcx('p-3.5 rounded-2xl bg-ink-50 text-ink-800 font-semibold', isRtl?'font-ar text-xl':'text-lg')}>
                  {(result.heardWords||[]).join(' ')}
                </div>
              </div>
              {/* stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { l:t.speaking.perfect, v:(prompt.words.length-(result.wrongIdx?.length||0)), c:'#16A34A', bg:'#ECFDF3' },
                  { l:t.speaking.missed,  v:(result.wrongIdx?.length||0),                       c:'#DC2626', bg:'#FEF2F2' },
                  { l:'Words total',      v:prompt.words.length,                                c:'#475569', bg:'#F1F4F6' },
                ].map((s,i)=>(
                  <div key={i} className="rounded-2xl p-3 text-center" style={{ background:s.bg }}>
                    <div className="text-2xl font-extrabold font-display" style={{ color:s.c }}>{s.v}</div>
                    <div className="text-[11px] text-ink-500 font-bold mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              {/* actions */}
              <div className="flex gap-3">
                <SpBtn variant="outline" full icon={I.refresh} onClick={()=>{ reset(); startRec(); }}>{t.speaking.tryAgain}</SpBtn>
                <SpBtn variant="coral" full iconRight={I.arrowRight} onClick={nextSentence}>{t.speaking.nextSentence}</SpBtn>
              </div>
            </div>
          )}
        </SpCard>

        {/* progress through prompts */}
        <div className="flex items-center justify-center gap-1.5">
          {prompts.map((_,i)=>(<span key={i} className={spcx('w-2 h-2 rounded-full', i===pIdx%prompts.length?'bg-coral-400':'bg-ink-200')}/>))}
        </div>
      </main>
    </div>
  );
}
window.Speaking = Speaking;
