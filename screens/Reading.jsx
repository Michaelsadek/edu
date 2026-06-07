// screens/Reading.jsx → window.Reading
const { cx:rdcx, useApp:rduseApp, useT:rduseT, Card:RdCard, Button:RdBtn, Badge:RdBadge } = window.UI;
const { TrialBanner:RdTrial, ModeTopBar:RdTopBar, AILoading:RdLoading, Comprehension:RdComp, LockedOverlay:RdLocked } = window.Shared;

function Reading(){
  const { useState, useEffect } = React;
  const I = window.Icons;
  const C = window.CONTENT;
  const { targetCode, level, trial, nav } = rduseApp();
  const t = rduseT();
  const skill = C.SKILLS.find(s=>s.id==='reading');

  const passages = (C.READING[targetCode]||C.READING.en)[level] || (C.READING[targetCode]||C.READING.en).A2;
  const [idx,setIdx] = useState(0);
  const [loading,setLoading] = useState(true);
  const passage = passages[idx % passages.length];

  useEffect(()=>{ setLoading(true); const tm=setTimeout(()=>setLoading(false),1500); return ()=>clearTimeout(tm); },[idx,targetCode,level]);

  function regenerate(){ setIdx(i=>i+1); window.scrollTo&&window.scrollTo({top:0,behavior:'smooth'}); }

  if(trial.expired) return (<div><RdTopBar skill={skill}/><RdLocked/></div>);

  const isRtl = passage.dir==='rtl';
  const minRead = Math.max(1, Math.round(passage.wordCount/180));

  return (
    <div className="min-h-screen flex flex-col">
      <RdTrial/>
      <RdTopBar skill={skill}/>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-7 space-y-7">
        <div>
          <RdBadge color="teal" className="mb-3"><I.sparkles size={13}/> AI-generated · {level}</RdBadge>
          <h1 className="text-3xl font-extrabold font-display text-ink-900 tracking-tight">{t.reading.title}</h1>
          <p className="text-ink-500 font-medium mt-1">Read at your pace. Tap any word to look it up.</p>
        </div>

        {loading ? (
          <RdCard><RdLoading label={t.reading.generating} lines={6}/></RdCard>
        ) : (
          <>
            <RdCard className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:`linear-gradient(90deg, ${skill.tint}, #7C8CF8)` }}/>
              {/* meta */}
              <div className="flex items-center justify-between mb-4">
                <RdBadge color="ink">{passage.topic}</RdBadge>
                <div className="flex items-center gap-3 text-xs text-ink-400 font-bold">
                  <span className="inline-flex items-center gap-1"><I.doc size={13}/> {passage.wordCount} {t.reading.words}</span>
                  <span className="inline-flex items-center gap-1"><I.clock size={13}/> {minRead} {t.reading.est}</span>
                </div>
              </div>
              <div dir={passage.dir} className={isRtl?'text-right':''}>
                <h2 className={rdcx('font-extrabold text-ink-900 mb-5', isRtl?'font-ar text-3xl':'font-display text-2xl')}>{passage.title}</h2>
                <div className={rdcx('space-y-4', isRtl?'font-ar':'')}>
                  {passage.body.map((p,i)=>(
                    <p key={i} className={rdcx('text-ink-800 leading-loose', isRtl?'text-[20px] leading-[2.1]':'text-[18px] leading-relaxed')}>{p}</p>
                  ))}
                </div>
              </div>
              {/* footer actions */}
              <div className="mt-6 pt-4 border-t border-ink-100 flex flex-wrap items-center gap-4">
                <button onClick={regenerate} className="flex items-center gap-2 text-sm font-bold font-display text-teal-600 hover:text-teal-700">
                  <I.refresh size={16}/> {t.reading.regen}
                </button>
                <span className="text-ink-200">|</span>
                <button className="flex items-center gap-2 text-sm font-bold font-display text-ink-500 hover:text-ink-700">
                  <I.volume size={16}/> Read aloud
                </button>
                <span className="text-ink-200">|</span>
                <button className="flex items-center gap-2 text-sm font-bold font-display text-ink-500 hover:text-ink-700">
                  <I.sparkles size={16}/> {t.reading.explain}
                </button>
              </div>
            </RdCard>

            <RdComp questions={passage.questions} dir={passage.dir}/>
          </>
        )}
      </main>
    </div>
  );
}
window.Reading = Reading;
