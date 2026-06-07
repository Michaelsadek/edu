// screens/Exam.jsx → window.Exam
const { cx:excx, useApp:exUseApp, useT:exUseT, Button:ExBtn, Card:ExCard, Badge:ExBadge, ProgressRing:ExRing, Confetti:ExCon, FlagSVG:ExFlag } = window.UI;

function fmtTime(s){
  const m=Math.floor(s/60), sec=s%60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function buildExamQuestions(base, total){
  // tile the 8 authored questions across 25 slots
  const out=[];
  for(let i=0;i<total;i++) out.push({ ...base[i%base.length], slot:i });
  return out;
}

function ExamIntro({ onStart, onBack, exam, target }){
  const I = window.Icons;
  return (
    <div className="min-h-screen grid place-items-center p-6"
      style={{ background:'radial-gradient(110% 60% at 50% -10%, #FFF4D6 0%, #F4F7F9 60%)' }}>
      <div className="w-full max-w-lg text-center">
        <div className="inline-grid place-items-center w-20 h-20 rounded-3xl bg-coral-50 text-coral-500 mb-5"><I.trophy size={38}/></div>
        <ExBadge color="sun" className="mb-3"><I.shield size={13}/> Level exam · {exam.level}</ExBadge>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight">Ready to certify your {target.name}?</h1>
        <p className="text-ink-500 font-medium mt-2 leading-relaxed">25 questions · 45 minutes. Pass with 70% and we'll generate a PDF certificate for level {exam.level}.</p>
        <ExCard className="mt-6 text-start">
          {[
            { ic:I.list,     t:`${exam.total} questions`,         d:'MCQ, true/false, and fill-in-the-blank.' },
            { ic:I.clock,    t:`${exam.durationMin} minutes`,     d:'Auto-submits when time runs out.' },
            { ic:I.shield,   t:`${exam.passPct}% to pass`,        d:`That's ${Math.ceil(exam.total*exam.passPct/100)} correct out of ${exam.total}.` },
            { ic:I.award,    t:'Certificate on pass',             d:'PDF, downloadable, dated.' },
          ].map((row,i)=>(
            <div key={i} className="flex items-start gap-3 py-2.5 border-t first:border-t-0 border-ink-100">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50 text-teal-600 shrink-0"><row.ic size={18}/></span>
              <div className="flex-1">
                <div className="font-extrabold font-display text-ink-900">{row.t}</div>
                <div className="text-sm text-ink-500 font-medium">{row.d}</div>
              </div>
            </div>
          ))}
        </ExCard>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <ExBtn variant="outline" full size="lg" onClick={onBack}>Cancel</ExBtn>
          <ExBtn variant="coral" full size="lg" icon={I.bolt} onClick={onStart}>Begin exam</ExBtn>
        </div>
      </div>
    </div>
  );
}

function Question({ q, pick, setPick }){
  const I = window.Icons;
  const t = exUseT();
  if (q.type==='mcq' || q.type==='tf'){
    const choices = q.type==='tf' ? [t.quiz.true, t.quiz.false] : q.choices;
    return (
      <div className="grid gap-2.5">
        {choices.map((c,i)=>{
          const sel = pick===i;
          const looksAr = /[\u0600-\u06FF]/.test(c);
          return (
            <button key={i} onClick={()=>setPick(i)}
              className={excx('flex items-center gap-3.5 p-4 rounded-2xl border-2 text-start transition-all bg-white',
                sel?'border-teal-400 bg-teal-50 ring-2 ring-teal-200':'border-ink-200 hover:border-teal-300 hover:bg-teal-50/40')}>
              <span className={excx('grid place-items-center w-8 h-8 rounded-xl shrink-0 text-sm font-extrabold font-display', sel?'bg-teal-400 text-white':'bg-ink-100 text-ink-500')}>{String.fromCharCode(65+i)}</span>
              <span dir={looksAr?'rtl':'ltr'} className={excx('flex-1 font-semibold text-ink-800', looksAr?'font-ar text-lg':'text-[15px]')}>{c}</span>
            </button>
          );
        })}
      </div>
    );
  }
  if (q.type==='fill'){
    return (
      <div>
        <div dir={q.dir||'ltr'} className={excx('text-xl font-bold mb-4 text-ink-800', q.dir==='rtl'?'font-ar':'font-display')}>{q.prompt}</div>
        <div className="flex items-center gap-2 rounded-2xl border-2 border-ink-200 bg-white px-4 h-14 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-200">
          <I.pencil size={18} className="text-ink-300"/>
          <input dir={q.dir||'ltr'} value={pick||''} onChange={e=>setPick(e.target.value)} placeholder="Type your answer"
            className={excx('flex-1 bg-transparent outline-none text-lg font-semibold text-ink-900 placeholder:text-ink-300', q.dir==='rtl'&&'font-ar text-right')}/>
        </div>
      </div>
    );
  }
  return null;
}

function ExamCertificate({ target, level, score, total }){
  const I = window.Icons;
  return (
    <div className="rounded-3xl bg-white border-2 border-ink-100 relative overflow-hidden shadow-soft" style={{ background:'radial-gradient(120% 80% at 0% 0%, #EFFCFB, white 60%), radial-gradient(120% 80% at 100% 100%, #FFF1F6, white 60%)' }}>
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:'linear-gradient(90deg,#4ECDC4,#7C8CF8,#FF6B9D)' }}/>
      <div className="p-6 sm:p-8 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-extrabold text-ink-500">
          <I.shield size={14} className="text-teal-500"/> Lingo Certificate of Achievement
        </span>
        <div className="mt-5 text-2xl sm:text-3xl font-extrabold font-display text-ink-900 tracking-tight">Layla N.</div>
        <p className="text-sm text-ink-500 font-medium mt-1">has successfully achieved</p>
        <div className="mt-4 inline-flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-2xl shadow-soft" style={{ width:60, height:60, background:target.tintBg, boxShadow:`inset 0 0 0 1.5px ${target.tintRing}` }}>
            <ExFlag code={target.code} size={36}/>
          </span>
          <div className="text-start">
            <div className="text-4xl font-extrabold font-display text-ink-900">{target.name} · {level}</div>
            <div className="text-xs font-bold text-ink-500">Common European Framework of Reference</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center max-w-md mx-auto">
          {[['Score',`${score}/${total}`],['Date','12 Feb 2026'],['Ref #','LG-A2-7821']].map(([l,v])=>(
            <div key={l} className="bg-white rounded-xl p-2.5 border border-ink-100">
              <div className="font-extrabold font-display text-ink-900 text-sm">{v}</div>
              <div className="text-[10px] text-ink-400 font-bold mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-400 font-medium">
          <I.award size={14} className="text-coral-400"/> Issued by Lingo · Verified by AI assessment
        </div>
      </div>
    </div>
  );
}

function ExamResult({ pass, score, total, exam, target, onReview, onLeave }){
  const I = window.Icons;
  const pct = Math.round(score/total*100);
  return (
    <div className="min-h-screen p-6 grid place-items-center"
      style={{ background: pass ? 'radial-gradient(110% 60% at 50% -10%, #ECFDF3 0%, #F4F7F9 60%)' : 'radial-gradient(110% 60% at 50% -10%, #FEF2F2 0%, #F4F7F9 60%)' }}>
      <div className="w-full max-w-2xl">
        {pass && <ExCon fire="exam-pass"/>}
        <div className="text-center mb-6">
          <div className="inline-grid place-items-center w-24 h-24 rounded-full mb-4"
            style={{ background: pass?'#ECFDF3':'#FEF2F2' }}>
            {pass? <I.trophy size={46} className="text-grass-500"/> : <I.refresh size={42} className="text-coral-400"/>}
          </div>
          <h1 className="text-4xl font-extrabold font-display text-ink-900 tracking-tight">{pass?'You passed!':'Not passed yet'}</h1>
          <p className="text-ink-500 font-medium mt-2">{pass?'Your certificate is ready.':'You can retake the exam any time.'}</p>
          <div className="my-6 inline-flex items-center justify-center">
            <ExRing value={score/total} size={150} color={pass?'#22C55E':'#FF6B9D'}>
              <div><div className="text-4xl font-extrabold font-display text-ink-900">{pct}%</div>
                <div className="text-xs text-ink-400 font-bold">{score}/{total}</div></div>
            </ExRing>
          </div>
        </div>

        {pass && <ExamCertificate target={target} level={exam.level} score={score} total={total}/>}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <ExBtn variant="outline" full size="lg" icon={I.refresh} onClick={onReview}>{pass?'Retake':'Try again'}</ExBtn>
          {pass && <ExBtn variant="primary" full size="lg" icon={I.download} onClick={onLeave}>Download PDF</ExBtn>}
          <ExBtn variant="dark" full size="lg" iconRight={I.arrowRight} onClick={onLeave}>Back to dashboard</ExBtn>
        </div>
      </div>
    </div>
  );
}

function Exam(){
  const { useState, useEffect, useRef } = React;
  const I = window.Icons; const D = window.DATA;
  const { targetCode, level, nav } = exUseApp();
  const t = exUseT();
  const target = D.LANGS[targetCode];
  const exam = D.EXAM[targetCode] || D.EXAM.en;
  const total = exam.total;
  const passNeeded = Math.ceil(total*exam.passPct/100);

  const [stage,setStage] = useState('intro'); // intro | running | result
  const [questions] = useState(()=>buildExamQuestions(exam.questions, total));
  const [answers,setAnswers] = useState(()=>Array(total).fill(null));
  const [i,setI] = useState(0);
  const [showNav,setShowNav] = useState(false);
  const [secondsLeft,setSecondsLeft] = useState(exam.durationMin*60);
  const [confirmSubmit,setConfirmSubmit] = useState(false);
  const tickRef = useRef();

  // start the timer when running
  useEffect(()=>{
    if(stage!=='running') return;
    tickRef.current = setInterval(()=>{
      setSecondsLeft(s=>{
        if(s<=1){ clearInterval(tickRef.current); submit(true); return 0; }
        return s-1;
      });
    },1000);
    return ()=>clearInterval(tickRef.current);
  },[stage]); // eslint-disable-line

  function start(){ setStage('running'); setI(0); }
  function pick(v){ const n=[...answers]; n[i]=v; setAnswers(n); }
  function go(n){ setI(Math.max(0,Math.min(total-1,n))); setShowNav(false); }

  function submit(auto){
    clearInterval(tickRef.current);
    setStage('result');
  }
  function score(){
    return answers.reduce((s,a,idx)=>{
      const q=questions[idx];
      if(a==null) return s;
      if(q.type==='mcq' && a===q.answer) return s+1;
      if(q.type==='tf' && (a===0)===q.answer) return s+1;
      if(q.type==='fill'){
        const accept=[q.answer,...(q.accept||[])].map(x=>(x||'').toLowerCase().trim());
        return s+(accept.includes(String(a||'').toLowerCase().trim())?1:0);
      }
      return s;
    },0);
  }

  const answered = answers.filter(a=>a!=null).length;
  const lowTime = secondsLeft <= 5*60;

  if(stage==='intro') return <ExamIntro exam={exam} target={target} onStart={start} onBack={()=>nav('dashboard')}/>;
  if(stage==='result'){
    const sc = score();
    return <ExamResult pass={sc>=passNeeded} score={sc} total={total} exam={exam} target={target}
      onReview={()=>{ setAnswers(Array(total).fill(null)); setI(0); setSecondsLeft(exam.durationMin*60); setStage('running'); }}
      onLeave={()=>nav('dashboard')}/>;
  }

  const q = questions[i];
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F9]">
      {/* top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-ink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={()=>setConfirmSubmit(true)} className="grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={20}/></button>
          <span className="grid place-items-center w-10 h-10 rounded-2xl bg-coral-50 text-coral-500 shrink-0" style={{ boxShadow:'inset 0 0 0 1.5px #FFC2D9' }}><I.trophy size={20}/></span>
          <div className="min-w-0 flex-1">
            <div className="font-extrabold font-display text-ink-900 leading-tight">Level exam · {exam.level}</div>
            <div className="text-[11px] text-ink-400 font-medium">{target.name} · {answered}/{total} answered</div>
          </div>
          {/* timer */}
          <div className={excx('inline-flex items-center gap-1.5 rounded-2xl px-3 h-10 font-extrabold font-display tabular-nums',
            lowTime?'bg-rose-50 text-rose-600 animate-pulse':'bg-ink-100 text-ink-700')}>
            <I.clock size={16}/> {fmtTime(secondsLeft)}
          </div>
        </div>
        {/* progress dots */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-3">
          <div className="flex items-center gap-1">
            {questions.map((_,idx)=>(
              <button key={idx} onClick={()=>go(idx)}
                className={excx('h-1.5 flex-1 rounded-full transition-colors',
                  idx===i ? 'bg-coral-400' :
                  answers[idx]!=null ? 'bg-teal-400' : 'bg-ink-200')}/>
            ))}
          </div>
        </div>
      </header>

      {/* question */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <ExBadge color="ink">Question {i+1} of {total}</ExBadge>
          <button onClick={()=>setShowNav(true)} className="inline-flex items-center gap-1.5 text-sm font-extrabold font-display text-ink-700 hover:text-ink-900"><I.grid size={16}/> Navigator</button>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold font-display text-ink-900 mb-6 text-balance">{q.q}</h2>
        <Question q={q} pick={answers[i]} setPick={pick}/>
      </main>

      {/* footer */}
      <footer className="sticky bottom-0 bg-white border-t border-ink-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          <ExBtn variant="ghost" icon={I.arrowLeft} onClick={()=>go(i-1)} disabled={i===0}>Previous</ExBtn>
          {i+1<total
            ? <ExBtn variant="primary" iconRight={I.arrowRight} onClick={()=>go(i+1)}>Next</ExBtn>
            : <ExBtn variant="coral" iconRight={I.checkCircle} onClick={()=>setConfirmSubmit(true)}>Submit exam</ExBtn>}
        </div>
      </footer>

      {/* Navigator modal */}
      {showNav && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center bg-ink-900/50 backdrop-blur-sm animate-fade-in" onClick={()=>setShowNav(false)}>
          <div onClick={e=>e.stopPropagation()} className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 shadow-lift animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <div className="font-extrabold font-display text-ink-900">Question navigator</div>
              <button onClick={()=>setShowNav(false)} className="grid place-items-center w-9 h-9 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={18}/></button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_,idx)=>{
                const answered = answers[idx]!=null;
                const cur = idx===i;
                return (
                  <button key={idx} onClick={()=>go(idx)}
                    className={excx('h-12 rounded-xl font-extrabold font-display text-sm transition-all',
                      cur ? 'bg-coral-400 text-white' :
                      answered ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-200' :
                      'bg-ink-100 text-ink-500 hover:bg-ink-200')}>
                    {idx+1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-ink-500 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-coral-400"/> Current</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-teal-100 ring-1 ring-teal-200"/> Answered</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-ink-100"/> Unseen</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit confirm */}
      {confirmSubmit && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/50 backdrop-blur-sm animate-fade-in" onClick={()=>setConfirmSubmit(false)}>
          <div onClick={e=>e.stopPropagation()} className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-lift animate-fade-up mx-4">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 mb-3"><I.shield size={22}/></span>
            <div className="text-xl font-extrabold font-display text-ink-900">Submit your exam?</div>
            <p className="text-sm text-ink-500 font-medium mt-1.5">You've answered <b>{answered}/{total}</b>. Unanswered questions count as wrong.</p>
            <div className="flex gap-3 mt-5">
              <ExBtn variant="outline" full onClick={()=>setConfirmSubmit(false)}>Keep going</ExBtn>
              <ExBtn variant="coral" full onClick={()=>{ setConfirmSubmit(false); submit(); }}>Submit</ExBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
window.Exam = Exam;
