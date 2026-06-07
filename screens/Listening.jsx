// screens/Listening.jsx → window.Listening
const { cx:lscx, useApp:lsuseApp, useT:lsuseT, Card:LsCard, Button:LsBtn, Badge:LsBadge } = window.UI;
const { TrialBanner:LsTrial, ModeTopBar:LsTopBar, AILoading:LsLoading, Comprehension:LsComp, LockedOverlay:LsLocked } = window.Shared;

function fmtMs(s){ return `${String(Math.floor(s/60)).padStart(1,'0')}:${String(s%60).padStart(2,'0')}`; }

function Listening(){
  const { useState, useEffect, useRef } = React;
  const I = window.Icons; const C = window.CONTENT; const D = window.DATA;
  const { targetCode, level, trial } = lsuseApp();
  const t = lsuseT();
  const skill = C.SKILLS.find(s=>s.id==='listening');

  const items = (C.LISTENING[targetCode]||C.LISTENING.en)[level] || (C.LISTENING[targetCode]||C.LISTENING.en).A2;
  const audio = items[0];
  const dur = audio.durationSec;

  const [loading,setLoading] = useState(true);
  const [playing,setPlaying] = useState(false);
  const [pos,setPos] = useState(0);
  const [speed,setSpeed] = useState(1);
  const [showTr,setShowTr] = useState(false);
  const tickRef = useRef();

  useEffect(()=>{ setLoading(true); const tm=setTimeout(()=>setLoading(false),1200); return ()=>clearTimeout(tm); },[targetCode,level]);

  useEffect(()=>{
    clearInterval(tickRef.current);
    if(!playing) return;
    tickRef.current = setInterval(()=>{
      setPos(p=>{
        const n = p + speed;
        if(n>=dur){ clearInterval(tickRef.current); setPlaying(false); return dur; }
        return n;
      });
    },1000);
    return ()=>clearInterval(tickRef.current);
  },[playing,speed,dur]);

  if(trial.expired) return (<div><LsTopBar skill={skill}/><LsLocked/></div>);

  const isRtl = audio.dir==='rtl';
  const pct = pos/dur;

  return (
    <div className="min-h-screen flex flex-col">
      <LsTrial/>
      <LsTopBar skill={skill}/>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-7 space-y-6">
        <div>
          <LsBadge color="ink" className="mb-3" style={{background:'#EEF1FE',color:'#5B6CF0'}}><I.headphones size={13}/> {t.listening.title} · {level}</LsBadge>
          <h1 className="text-3xl font-extrabold font-display text-ink-900 tracking-tight">{audio.title}</h1>
          <p className="text-ink-500 font-medium mt-1">Listen as many times as you need before answering.</p>
        </div>

        {loading ? <LsCard><LsLoading label={t.listening.generating} lines={4}/></LsCard> : (
          <>
            {/* audio player */}
            <LsCard className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:`linear-gradient(90deg,#7C8CF8,${skill.tint})` }}/>
              <div className="flex items-center justify-between mb-4">
                <LsBadge color="ink">{audio.topic}</LsBadge>
                <div className="flex items-center gap-3 text-xs text-ink-400 font-bold">
                  <span className="inline-flex items-center gap-1"><I.headphones size={13}/> {audio.narrator}</span>
                  <span className="inline-flex items-center gap-1"><I.clock size={13}/> {fmtMs(dur)}</span>
                </div>
              </div>

              {/* visual EQ bars */}
              <div className="h-20 grid place-items-center bg-gradient-to-b from-ink-50 to-white rounded-2xl mb-5">
                <div className="flex items-end gap-1 h-12">
                  {Array.from({length:42}).map((_,i)=>{
                    const wave = 0.3 + 0.7*Math.abs(Math.sin(i*0.55));
                    const playedThis = i/42 < pct;
                    return <span key={i} className="rounded-full transition-all" style={{ width:5,
                      height:`${(playing?wave:wave*.7)*100}%`,
                      background: playedThis?'#5B6CF0':'#CBD4DC',
                      transform: playing? `scaleY(${0.8+Math.random()*0.4})`:'none', transition:'transform .15s' }}/>;
                  })}
                </div>
              </div>

              {/* scrubber */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-ink-500 tabular-nums w-10 text-end">{fmtMs(pos)}</span>
                <input type="range" min={0} max={dur} step={1} value={pos} onChange={e=>setPos(+e.target.value)}
                  className="flex-1 accent-[#5B6CF0] h-1.5"/>
                <span className="text-xs font-bold text-ink-400 tabular-nums w-10">{fmtMs(dur)}</span>
              </div>

              {/* controls */}
              <div className="flex items-center justify-center gap-3">
                <button onClick={()=>setPos(p=>Math.max(0,p-10))} className="grid place-items-center w-11 h-11 rounded-2xl bg-ink-100 text-ink-700 hover:bg-ink-200" title={t.listening.replay}>
                  <I.rewind size={20}/>
                </button>
                <button onClick={()=>{ if(pos>=dur) setPos(0); setPlaying(p=>!p); }}
                  className="grid place-items-center w-16 h-16 rounded-full text-white shadow-glow transition-transform hover:scale-105"
                  style={{ background:'#5B6CF0' }} aria-label={playing?t.listening.pause:t.listening.play}>
                  {playing? <I.pause size={26}/> : <I.play size={28}/>}
                </button>
                {/* speed */}
                <div className="inline-flex p-1 bg-ink-100 rounded-2xl">
                  {[0.75, 1].map(s=>(
                    <button key={s} onClick={()=>setSpeed(s)}
                      className={lscx('h-9 px-3 rounded-xl text-sm font-extrabold font-display transition-all', speed===s?'bg-white text-ink-900 shadow-soft':'text-ink-500')}>
                      {s===1?'1×':`${s}×`}
                    </button>
                  ))}
                </div>
              </div>

              {/* transcript reveal */}
              <div className="mt-6 pt-4 border-t border-ink-100">
                <button onClick={()=>setShowTr(s=>!s)} className="flex items-center gap-2 text-sm font-extrabold font-display text-ink-600 hover:text-ink-900">
                  {showTr? <I.minus size={16}/> : <I.plus size={16}/>}
                  {showTr? t.listening.hide : t.listening.show}
                  <I.eye size={14} className="text-ink-300"/>
                </button>
                {showTr && (
                  <div dir={audio.dir} className={lscx('mt-3 p-4 rounded-2xl bg-ink-50 space-y-2 animate-fade-up', isRtl?'font-ar':'')}>
                    {audio.transcript.map((p,i)=>(
                      <p key={i} className={lscx('text-ink-800 leading-relaxed', isRtl?'text-lg':'text-[15px]')}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </LsCard>

            <LsComp questions={audio.questions} dir={audio.dir}/>
          </>
        )}
      </main>
    </div>
  );
}
window.Listening = Listening;
