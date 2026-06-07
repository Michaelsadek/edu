// screens/Writing.jsx → window.Writing
const { cx:wrcx, useApp:wruseApp, useT:wruseT, Card:WrCard, Button:WrBtn, Badge:WrBadge, ProgressRing:WrRing } = window.UI;
const { TrialBanner:WrTrial, ModeTopBar:WrTopBar, AILoading:WrLoading, LockedOverlay:WrLocked } = window.Shared;

function countWords(s){ return (s||'').trim().split(/\s+/).filter(Boolean).length; }

function Writing(){
  const { useState, useEffect } = React;
  const I = window.Icons; const C = window.CONTENT; const D = window.DATA;
  const { targetCode, level, trial, uiLang } = wruseApp();
  const t = wruseT();
  const skill = C.SKILLS.find(s=>s.id==='writing');

  const prompts = (C.WRITING[targetCode]||C.WRITING.en)[level] || (C.WRITING[targetCode]||C.WRITING.en).A2;
  const [pIdx,setPIdx] = useState(0);
  const prompt = prompts[pIdx % prompts.length];

  const [phase,setPhase] = useState('idle'); // idle | processing | result
  const [text,setText] = useState('');

  function loadMockSample(){ setText(prompt.mockSubmission||''); }
  function submit(){ setPhase('processing'); setTimeout(()=>setPhase('result'), 1600); }
  function tryAnother(){ setPIdx(i=>i+1); setText(''); setPhase('idle'); window.scrollTo&&window.scrollTo(0,0); }

  if(trial.expired) return (<div><WrTopBar skill={skill}/><WrLocked/></div>);

  const isRtl = prompt.dir==='rtl';
  const wc = countWords(text);
  const meetsMin = wc>=prompt.minWords;

  /* if no mock submission text was filled, hint user OR auto-fill on submit */
  const useMock = phase==='result' && (text===prompt.mockSubmission || text.trim().length<10);
  const correction = useMock ? prompt.mockCorrection : prompt.mockCorrection;
  const score = useMock ? prompt.score : Math.max(60, prompt.score-5);

  return (
    <div className="min-h-screen flex flex-col">
      <WrTrial/>
      <WrTopBar skill={skill}/>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-7 space-y-6">
        <div>
          <WrBadge color="sun" className="mb-3"><I.edit size={13}/> {t.writing.title} · {level}</WrBadge>
          <p className="text-xs uppercase tracking-widest font-extrabold text-ink-400">{t.writing.prompt}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 tracking-tight mt-1">{prompt.topic}</h1>
          <p dir={prompt.dir} className={wrcx('mt-1', isRtl?'font-ar text-lg text-ink-700':'text-ink-500 font-medium')}>{prompt.topicNative}</p>
          {prompt.instructions && <p className="text-sm text-ink-500 font-medium mt-2 max-w-xl">{prompt.instructions}</p>}
        </div>

        {phase!=='result' && (
          <WrCard pad={false} className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:`linear-gradient(90deg,${skill.tint},#FF6B9D)`, position:'relative' }}/>
            <div className="p-5 sm:p-6">
              {phase==='processing' ? (
                <WrLoading label={t.writing.processing} lines={4}/>
              ) : (
                <>
                  <textarea dir={prompt.dir} rows={10} value={text} onChange={e=>setText(e.target.value)}
                    placeholder={t.writing.editor}
                    className={wrcx('w-full p-4 rounded-2xl bg-ink-50 outline-none text-ink-900 font-medium resize-y leading-relaxed border-2 border-transparent focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-200 placeholder:text-ink-300',
                      isRtl?'font-ar text-lg':'text-[16px]')}/>
                  {/* meta row */}
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 text-sm text-ink-500 font-bold">
                      <span className={wrcx('inline-flex items-center gap-1.5', meetsMin?'text-grass-600':'')}>
                        <I.list size={15}/> {wc} {t.writing.wordCount}
                      </span>
                      <span className="text-ink-300">·</span>
                      <span className="text-ink-400">{t.writing.minWords}: {prompt.minWords}</span>
                      {prompt.mockSubmission && wc<10 && (
                        <>
                          <span className="text-ink-300">·</span>
                          <button onClick={loadMockSample} className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"><I.sparkles size={14}/> Insert sample</button>
                        </>
                      )}
                    </div>
                    <WrBtn size="lg" variant="coral" iconRight={I.send} disabled={wc<10} onClick={submit}>{t.writing.submit}</WrBtn>
                  </div>
                </>
              )}
            </div>
          </WrCard>
        )}

        {phase==='result' && (
          <div className="space-y-5 animate-fade-up">
            {/* summary card */}
            <WrCard className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:'linear-gradient(90deg,#22C55E,#FBBF24)' }}/>
              <div className="flex items-center gap-5">
                <WrRing value={score/100} size={104} color={score>=80?'#22C55E':'#FBBF24'}>
                  <div><div className="text-2xl font-extrabold font-display text-ink-900">{score}</div>
                    <div className="text-[10px] text-ink-400 font-bold">/100</div></div>
                </WrRing>
                <div className="flex-1 min-w-0">
                  <WrBadge color="grass" className="mb-1.5"><I.checkCircle size={13}/> {t.writing.feedback}</WrBadge>
                  <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400 mb-1">{t.writing.summary}</div>
                  {/* feedback ALWAYS appears in UI/native language */}
                  <p dir={uiLang==='ar'?'rtl':'ltr'} className={wrcx('font-semibold text-ink-800 leading-relaxed', uiLang==='ar'?'font-ar text-base':'text-[15px]')}>
                    {prompt.summary[uiLang==='ar'?'ar':'en']}
                  </p>
                </div>
              </div>
            </WrCard>

            {/* inline correction card */}
            <WrCard>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold font-display text-ink-900">Your text · with corrections</h3>
                <div className="flex items-center gap-3 text-[11px] text-ink-500 font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-grass-100 border border-grass-400"/> {t.writing.legend.good}</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-100 border border-rose-400"/> {t.writing.legend.fix}</span>
                </div>
              </div>
              <div dir={prompt.dir} className={wrcx('flex flex-wrap gap-x-1.5 gap-y-3 leading-loose', isRtl?'font-ar text-xl':'text-[17px]')}>
                {correction.map((w,i)=>{
                  if(w.ok) return <span key={i} className="text-ink-800">{w.word}</span>;
                  return (
                    <span key={i} className="relative inline-flex items-baseline gap-1 group">
                      <span className="line-through decoration-2 text-rose-500/80">{w.word}</span>
                      <span className="px-1.5 rounded-md bg-grass-50 text-grass-700 font-bold">{w.suggest}</span>
                      {w.note && (
                        <span className="absolute z-10 left-0 top-full mt-1 hidden group-hover:block w-64 p-2.5 bg-ink-900 text-white text-xs font-medium rounded-lg shadow-lift">
                          <span className="block font-bold text-coral-300 mb-0.5">Tip</span>{w.note}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
              {/* notes list (visible) */}
              <div className="mt-5 pt-4 border-t border-ink-100 space-y-2.5">
                {correction.filter(c=>!c.ok && c.note).map((c,i)=>(
                  <div key={i} className="flex gap-3 items-start">
                    <span className="grid place-items-center w-7 h-7 rounded-lg bg-rose-50 text-rose-500 shrink-0 mt-0.5"><I.pencil size={14}/></span>
                    <div className="flex-1 text-sm">
                      <span className="text-rose-500 line-through font-semibold">{c.word}</span>
                      <span className="mx-1.5 text-ink-300">→</span>
                      <span className="font-extrabold font-display text-grass-700">{c.suggest}</span>
                      <div className="text-ink-600 font-medium mt-0.5">{c.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </WrCard>

            <div className="flex gap-3">
              <WrBtn variant="outline" full icon={I.refresh} onClick={()=>setPhase('idle')}>Revise my answer</WrBtn>
              <WrBtn variant="coral" full iconRight={I.arrowRight} onClick={tryAnother}>{t.writing.tryAnother}</WrBtn>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
window.Writing = Writing;
