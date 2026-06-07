// screens/Exam.jsx → window.Exam
const { cx:ecx, useApp:euseApp, useT:euseT, Button:EBtn, Card:ECard, Badge:EBadge, FlagTile:EFlag, FlagSVG:EFlagSVG, ProgressBar:EBar, ProgressRing:ERing, Confetti:EConfetti } = window.UI;

function fmt(sec){ const m=Math.floor(sec/60), s=sec%60; return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }

/* fill 25 questions by cycling through the 8 authored ones */
function buildExam(authored, total){
  const out=[]; for(let i=0;i<total;i++) out.push({...authored[i%authored.length], _i:i }); return out;
}

function enorm(s){ return (s||'').trim().replace(/\s+/g,' ').toLowerCase(); }

function ExamQuestion({ q, answer, setAnswer, dir }){
  const I = window.Icons;
  const isAr = dir==='rtl';
  if(q.type==='mcq' || q.type==='tf'){
    const choices = q.type==='tf' ? ['True','False'] : q.choices;
    return (
      <div className="grid gap-2.5">
        {choices.map((c,i)=>{
          const sel = answer===i;
          const looksAr = /[\u0600-\u06FF]/.test(c);
          return (
            <button key={i} onClick={()=>setAnswer(i)}
              className={ecx('flex items-center gap-3.5 p-4 rounded-2xl border-2 text-start transition-all bg-white',
                sel?'border-teal-400 bg-teal-50 ring-2 ring-teal-200':'border-ink-200 hover:border-teal-300 hover:bg-teal-50/40')}>
              <span className={ecx('grid place-items-center w-8 h-8 rounded-xl shrink-0 text-sm font-extrabold font-display', sel?'bg-teal-400 text-white':'bg-ink-100 text-ink-500')}>{String.fromCharCode(65+i)}</span>
              <span dir={looksAr?'rtl':'ltr'} className={ecx('flex-1 font-semibold text-ink-800', looksAr?'font-ar text-lg':'font-display text-[15px]')}>{c}</span>
            </button>
          );
        })}
      </div>
    );
  }
  if(q.type==='fill'){
    return (
      <div>
        <div dir={q.dir||'ltr'} className={ecx('text-xl font-bold mb-4 text-ink-800', q.dir==='rtl'?'font-ar':'font-display')}>{q.prompt}</div>
        <div className="flex items-center gap-2 rounded-2xl border-2 border-ink-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-200 bg-white px-4 h-14">
          <I.pencil size={18} className="text-ink-300"/>
          <input dir={q.dir||'ltr'} value={answer||''} onChange={e=>setAnswer(e.target.value)}
            placeholder="Type your answer"
            className={ecx('flex-1 bg-transparent outline-none text-lg font-semibold text-ink-900 placeholder:text-ink-300', q.dir==='rtl'&&'font-ar text-right')}/>
        </div>
      </div>
    );
  }
  return null;
}

function Exam(){
  const { useState, useEffect, useRef } = React;
  const I = window.Icons; const D = window.DATA;
  const { targetCode, nav } = euseApp();
  const target = D.LANGS[targetCode];
  const meta = D.EXAM[targetCode] || D.EXAM.ar;
  const TOTAL = meta.total;

  const [phase,setPhase] = useState('intro'); // intro|live|done
  const [questions] = useState(()=> buildExam(meta.questions, TOTAL));
  const [i,setI] = useState(0);
  const [answers,setAnswers] = useState(()=>Array(TOTAL).fill(undefined));
  const [flagged,setFlagged] = useState(()=>new Set());
  const [secs,setSecs] = useState(meta.durationMin*60);
  const [showNav,setShowNav] = useState(false);
  const [leaveConfirm,setLeaveConfirm] = useState(false);
  const tickRef = useRef();

  // timer
  useEffect(()=>{
    if(phase!=='live') return;
    tickRef.current = setInterval(()=>{
      setSecs(s=>{
        if(s<=1){ clearInterval(tickRef.current); submit(); return 0; }
        return s-1;
      });
    },1000);
    return ()=>clearInterval(tickRef.current);
  },[phase]);

  function setAnswer(v){ const next=[...answers]; next[i]=v; setAnswers(next); }
  function toggleFlag(){ const ns=new Set(flagged); ns.has(i)?ns.delete(i):ns.add(i); setFlagged(ns); }
  function submit(){ setPhase('done'); }

  // grade
  const scored = answers.reduce((s,a,idx)=>{
    const q=questions[idx]; if(a===undefined) return s;
    if(q.type==='mcq') return s+(a===q.answer?1:0);
    if(q.type==='tf')  return s+((a===0)===q.answer?1:0);
    if(q.type==='fill') return s+([q.answer,...(q.accept||[])].map(enorm).includes(enorm(a))?1:0);
    return s;
  },0);
  const pct = Math.round(scored/TOTAL*100);
  const passed = pct>=meta.passPct;

  /* ---------- INTRO ---------- */
  if(phase==='intro'){
    return (
      <div className="min-h-screen flex items-center justify-center px-5 py-10" style={{ background:'radial-gradient(120% 80% at 50% -10%, #FFF1F6, #F4F7F9 60%)' }}>
        <div className="w-full max-w-lg text-center">
          <button onClick={()=>nav('dashboard')} className="absolute top-5 start-5 grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-white"><I.x size={20}/></button>
          <EFlag lang={target} size={64} className="mx-auto"/>
          <h1 className="mt-5 text-3xl font-extrabold font-display text-ink-900">{target.name} · {meta.level} exam</h1>
          <p className="text-ink-500 font-medium mt-2">Pass with {meta.passPct}% or higher to earn your CEFR {meta.level} certificate.</p>
          <div className="grid grid-cols-3 gap-3 my-7">
            {[[I.list,`${meta.total}`,'Questions'],[I.clock,`${meta.durationMin} min`,'Duration'],[I.shield,`${meta.passPct}%`,'To pass']].map(([Ic,v,l],i)=>(
              <div key={i} className="bg-white rounded-2xl border border-ink-100 shadow-soft py-4">
                <Ic size={22} className="mx-auto text-teal-500"/>
                <div className="font-extrabold font-display text-ink-900 mt-2">{v}</div>
                <div className="text-[11px] text-ink-400 font-bold mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <ECard className="text-start mb-6">
            <div className="font-extrabold font-display text-ink-900 mb-2 flex items-center gap-2"><I.shield size={18} className="text-teal-500"/> Exam rules</div>
            <ul className="text-sm text-ink-600 font-medium space-y-1.5">
              <li className="flex gap-2"><I.check size={16} className="mt-0.5 text-grass-500 shrink-0"/> The timer cannot be paused once you begin.</li>
              <li className="flex gap-2"><I.check size={16} className="mt-0.5 text-grass-500 shrink-0"/> Flag questions and return to them before submitting.</li>
              <li className="flex gap-2"><I.check size={16} className="mt-0.5 text-grass-500 shrink-0"/> The exam auto-submits when the timer runs out.</li>
            </ul>
          </ECard>
          <EBtn full size="lg" variant="coral" iconRight={I.arrowRight} onClick={()=>setPhase('live')}>Begin exam</EBtn>
          <button onClick={()=>nav('dashboard')} className="mt-3 text-sm font-bold font-display text-ink-400 hover:text-ink-700">Maybe later</button>
        </div>
      </div>
    );
  }

  /* ---------- DONE ---------- */
  if(phase==='done'){
    return (
      <div className="min-h-screen flex items-center justify-center px-5 py-10" style={{ background:'radial-gradient(120% 80% at 50% -10%, #EFFCFB, #F4F7F9 60%)' }}>
        <EConfetti fire={passed?'exam':0}/>
        <div className="w-full max-w-lg text-center">
          <div className={ecx('inline-grid place-items-center w-24 h-24 rounded-full mb-5', passed?'bg-grass-50':'bg-rose-50')}>
            {passed? <I.trophy size={50} className="text-grass-500"/> : <I.refresh size={44} className="text-rose-500"/>}
          </div>
          <h1 className="text-3xl font-extrabold font-display text-ink-900">{passed? 'Passed!' : 'Not passed yet'}</h1>
          <p className="text-ink-500 font-medium mt-1.5">CEFR {meta.level} · {target.name}</p>
          <div className="my-6 flex items-center justify-center">
            <ERing value={pct/100} size={170} color={passed?'#22C55E':'#FF6B9D'}>
              <div><div className="text-4xl font-extrabold font-display text-ink-900">{pct}%</div>
                <div className="text-xs text-ink-400 font-bold mt-1">{scored}/{TOTAL} correct</div></div>
            </ERing>
          </div>
          {passed && (
            <ECard className="text-start mb-5 border-grass-100 bg-grass-50/50">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-grass-500 text-white"><I.award size={24}/></span>
                <div className="flex-1">
                  <div className="font-extrabold font-display text-ink-900">Certificate ready</div>
                  <div className="text-sm text-ink-600 font-medium">Lingo · {target.name} · CEFR {meta.level}</div>
                </div>
                <EBtn variant="soft" size="sm" icon={I.download} onClick={()=>nav('profile')}>PDF</EBtn>
              </div>
            </ECard>
          )}
          <div className="grid grid-cols-3 gap-2 mb-7">
            {[['Correct',scored],['Wrong',TOTAL-scored-answers.filter(a=>a===undefined).length],['Blank',answers.filter(a=>a===undefined).length]].map(([l,v])=>(
              <div key={l} className="bg-white rounded-2xl border border-ink-100 py-3">
                <div className="font-extrabold font-display text-ink-900 text-lg">{v}</div>
                <div className="text-[11px] text-ink-400 font-bold mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <EBtn variant="outline" full icon={I.refresh} onClick={()=>{ setPhase('intro'); setI(0); setAnswers(Array(TOTAL).fill(undefined)); setFlagged(new Set()); setSecs(meta.durationMin*60); }}>Review & retake</EBtn>
            <EBtn variant={passed?'primary':'coral'} full iconRight={I.arrowRight} onClick={()=>nav(passed?'profile':'dashboard')}>{passed?'View certificate':'Back to dashboard'}</EBtn>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- LIVE ---------- */
  const q = questions[i];
  const lowTime = secs<=120;
  const answered = answers.filter(a=>a!==undefined).length;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* sticky top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-ink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={()=>setLeaveConfirm(true)} className="grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={20}/></button>
          <EFlag lang={target} size={34}/>
          <div className="min-w-0 flex-1">
            <div className="font-extrabold font-display text-ink-900 leading-tight">{target.name} · {meta.level} exam</div>
            <div className="text-[11px] text-ink-400 font-medium">Auto-submits at 00:00</div>
          </div>
          <span className={ecx('flex items-center gap-2 px-3.5 h-10 rounded-xl font-extrabold font-display tabular-nums transition-colors',
            lowTime?'bg-rose-50 text-rose-600 animate-pulse':'bg-ink-100 text-ink-800')}>
            <I.clock size={18}/> {fmt(secs)}
          </span>
          <button onClick={()=>setShowNav(s=>!s)} className="hidden sm:grid place-items-center w-10 h-10 rounded-xl text-ink-500 hover:bg-ink-100" title="Questions"><I.grid size={20}/></button>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-3 flex items-center gap-3">
          <EBar value={(i+1)/TOTAL} className="flex-1" h={8}/>
          <span className="text-xs font-bold font-display text-ink-500 tabular-nums">Q {i+1}/{TOTAL} · {answered} answered</span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1fr_220px] gap-8">
        {/* question */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <EBadge color="teal">Question {i+1}</EBadge>
            <button onClick={toggleFlag} className={ecx('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-display transition-colors',
              flagged.has(i)?'bg-sun-100 text-amber-700':'bg-ink-100 text-ink-500 hover:bg-ink-200')}>
              <I.flag size={13}/> {flagged.has(i)?'Flagged':'Flag for review'}
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-ink-900 mb-6 text-balance">{q.q}</h2>
          <ExamQuestion q={q} answer={answers[i]} setAnswer={setAnswer} dir={q.dir||target.dir}/>
          <div className="mt-7 flex items-center justify-between">
            <EBtn variant="outline" icon={I.arrowLeft} disabled={i===0} onClick={()=>setI(i-1)} className="rtl:flex-row-reverse">Previous</EBtn>
            {i+1<TOTAL
              ? <EBtn iconRight={I.arrowRight} onClick={()=>setI(i+1)}>Next</EBtn>
              : <EBtn variant="coral" icon={I.checkCircle} onClick={submit}>Submit exam</EBtn>}
          </div>
        </div>

        {/* desktop nav */}
        <aside className="hidden lg:block">
          <ECard pad={false} className="p-5 sticky top-32">
            <div className="font-extrabold font-display text-ink-900 mb-3 flex items-center gap-2"><I.grid size={17}/> Questions</div>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((_,idx)=>{
                const ans = answers[idx]!==undefined;
                const cur = idx===i, fl = flagged.has(idx);
                return (
                  <button key={idx} onClick={()=>setI(idx)}
                    className={ecx('relative h-9 rounded-lg text-xs font-extrabold font-display transition-all',
                      cur?'bg-ink-900 text-white ring-2 ring-ink-900 ring-offset-2': ans?'bg-teal-100 text-teal-800 hover:bg-teal-200':'bg-ink-100 text-ink-500 hover:bg-ink-200')}>
                    {idx+1}
                    {fl && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sun-500 ring-2 ring-white"/>}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 text-[12px] text-ink-500 font-medium">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-teal-100"/> Answered ({answered})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-ink-100"/> Unanswered ({TOTAL-answered})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-sun-500"/> Flagged ({flagged.size})</div>
            </div>
            <EBtn full variant="coral" className="mt-4" icon={I.checkCircle} onClick={submit}>Submit exam</EBtn>
          </ECard>
        </aside>
      </div>

      {/* mobile nav drawer */}
      {showNav && (
        <div className="lg:hidden fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm" onClick={()=>setShowNav(false)}>
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl p-5 animate-fade-up" onClick={e=>e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-ink-200 rounded-full mx-auto mb-4"/>
            <div className="font-extrabold font-display text-ink-900 mb-3">Questions</div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_,idx)=>(
                <button key={idx} onClick={()=>{ setI(idx); setShowNav(false); }} className={ecx('h-10 rounded-lg text-sm font-extrabold font-display',
                  idx===i?'bg-ink-900 text-white': answers[idx]!==undefined?'bg-teal-100 text-teal-800':'bg-ink-100 text-ink-500')}>{idx+1}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* leave confirm */}
      {leaveConfirm && (
        <div className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm grid place-items-center px-5" onClick={()=>setLeaveConfirm(false)}>
          <ECard className="max-w-sm w-full" onClick={e=>e.stopPropagation()}>
            <h3 className="font-extrabold font-display text-ink-900 text-lg">Leave the exam?</h3>
            <p className="text-sm text-ink-500 font-medium mt-1.5">Your progress will be lost and the timer reset.</p>
            <div className="flex gap-2 mt-5">
              <EBtn variant="outline" full onClick={()=>setLeaveConfirm(false)}>Stay</EBtn>
              <EBtn variant="danger" full onClick={()=>nav('dashboard')}>Leave</EBtn>
            </div>
          </ECard>
        </div>
      )}

      <button onClick={()=>setShowNav(true)} className="sm:hidden fixed bottom-6 end-6 grid place-items-center w-14 h-14 rounded-full bg-ink-900 text-white shadow-lift z-30"><I.grid size={22}/></button>
    </div>
  );
}
window.Exam = Exam;
