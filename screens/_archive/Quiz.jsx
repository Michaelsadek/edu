// screens/Quiz.jsx → window.QuizRunner, window.QuizScreen
const { cx:qcx, useApp:quseApp, useT:quseT, Button:QBtn, Card:QCard, Badge:QBadge, ProgressBar:QBar, Confetti:QConfetti, ProgressRing:QRing } = window.UI;

function norm(s){ return (s||'').trim().replace(/\s+/g,' ').toLowerCase(); }

/* one question renderer */
function Question({ q, state, picked, setPicked, built, setBuilt }) {
  const I = window.Icons;
  const t = quseT();
  const checked = state!=='idle';
  const cdir = q.dirChoices || q.dir || 'ltr';
  const isAr = cdir==='rtl';

  if (q.type==='mcq' || q.type==='tf') {
    const choices = q.type==='tf' ? [t.quiz.true, t.quiz.false] : q.choices;
    const correctIdx = q.type==='tf' ? (q.answer?0:1) : q.answer;
    return (
      <div className="grid gap-2.5">
        {choices.map((c,i)=>{
          const sel = picked===i;
          let cls='border-ink-200 hover:border-teal-300 hover:bg-teal-50/40';
          let mark=null;
          if(checked){
            if(i===correctIdx){ cls='border-grass-400 bg-grass-50'; mark=<I.checkCircle size={22} className="text-grass-500"/>; }
            else if(sel){ cls='border-rose-400 bg-rose-50'; mark=<I.xCircle size={22} className="text-rose-500"/>; }
            else cls='border-ink-200 opacity-55';
          } else if(sel){ cls='border-teal-400 bg-teal-50 ring-2 ring-teal-200'; }
          return (
            <button key={i} disabled={checked} onClick={()=>setPicked(i)}
              className={qcx('flex items-center gap-3.5 p-4 rounded-2xl border-2 text-start transition-all duration-150 bg-white', cls)}>
              <span className={qcx('grid place-items-center w-8 h-8 rounded-xl shrink-0 text-sm font-extrabold font-display',
                sel&&!checked?'bg-teal-400 text-white': checked&&i===correctIdx?'bg-grass-500 text-white': checked&&sel?'bg-rose-500 text-white':'bg-ink-100 text-ink-500')}>
                {String.fromCharCode(65+i)}
              </span>
              <span dir={cdir} className={qcx('flex-1 font-semibold', isAr?'font-ar text-lg':'font-display text-[15px]', 'text-ink-800')}>{c}</span>
              {mark}
            </button>
          );
        })}
      </div>
    );
  }

  if (q.type==='fill') {
    let cls = 'border-ink-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-200';
    if(checked) cls = state==='correct' ? 'border-grass-400 bg-grass-50' : 'border-rose-400 bg-rose-50';
    return (
      <div>
        <div dir={q.dir||'ltr'} className={qcx('text-xl font-bold mb-4 text-ink-800', q.dir==='rtl'?'font-ar':'font-display')}>{q.prompt}</div>
        <div className={qcx('flex items-center gap-2 rounded-2xl border-2 bg-white px-4 h-14 transition-all', cls)}>
          <I.pencil size={18} className="text-ink-300"/>
          <input dir={q.dir||'ltr'} disabled={checked} value={picked||''} onChange={e=>setPicked(e.target.value)}
            placeholder={t.quiz.typeAnswer}
            className={qcx('flex-1 bg-transparent outline-none text-lg font-semibold text-ink-900 placeholder:text-ink-300', q.dir==='rtl'&&'font-ar text-right')}/>
          {checked && (state==='correct'?<I.checkCircle size={22} className="text-grass-500"/>:<I.xCircle size={22} className="text-rose-500"/>)}
        </div>
        {q.hint && !checked && <div className="mt-2 text-xs text-ink-400 font-medium flex items-center gap-1"><I.sparkles size={13}/> Hint: {q.hint}</div>}
      </div>
    );
  }

  if (q.type==='rearrange') {
    const remaining = q.tokens.filter(tok => !built.includes(tok) || built.filter(b=>b===tok).length < q.tokens.filter(x=>x===tok).length && false);
    // build pool: tokens not yet placed (by index to allow dups)
    const used = [...built];
    const pool = q.tokens.map((tok,i)=>({tok,i})).filter(({tok})=>{
      const usedCount = used.filter(u=>u===tok).length;
      const placedSoFar = built.slice(0).filter(u=>u===tok).length;
      return true;
    });
    const isAr2 = q.dir==='rtl';
    const right = state==='correct';
    return (
      <div>
        {/* build zone */}
        <div dir={q.dir||'ltr'} className={qcx('min-h-[64px] rounded-2xl border-2 border-dashed p-3 flex flex-wrap gap-2 items-center mb-4 transition-colors',
          checked?(right?'border-grass-400 bg-grass-50':'border-rose-400 bg-rose-50'):'border-ink-200 bg-ink-50/50')}>
          {built.length===0 && <span className="text-ink-300 text-sm font-medium px-2">{t.quiz.tapToBuild}</span>}
          {built.map((tok,i)=>(
            <button key={i} disabled={checked} onClick={()=>setBuilt(built.filter((_,j)=>j!==i))}
              className={qcx('px-3.5 py-2 rounded-xl bg-white border border-ink-200 shadow-soft font-semibold animate-pop',
                isAr2?'font-ar text-lg':'font-display text-[15px]', 'text-ink-800 hover:border-rose-300')}>{tok}</button>
          ))}
        </div>
        {/* token pool */}
        <div dir={q.dir||'ltr'} className="flex flex-wrap gap-2">
          {q.tokens.map((tok,i)=>{
            const placedCount = built.filter(b=>b===tok).length;
            const totalCount = q.tokens.filter(x=>x===tok).length;
            const idxAmongSame = q.tokens.slice(0,i+1).filter(x=>x===tok).length;
            const isUsed = idxAmongSame<=placedCount;
            return (
              <button key={i} disabled={checked||isUsed} onClick={()=>setBuilt([...built,tok])}
                className={qcx('px-3.5 py-2 rounded-xl border font-semibold transition-all',
                  isAr2?'font-ar text-lg':'font-display text-[15px]',
                  isUsed?'opacity-30 bg-ink-100 border-ink-100 text-ink-400':'bg-white border-ink-200 text-ink-800 hover:border-teal-300 hover:bg-teal-50/50 shadow-soft')}>{tok}</button>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}

function feedbackText(q, state, t){
  if(state==='correct') return { title:t.quiz.correct, color:'grass' };
  // incorrect: show correct answer
  let ans='';
  if(q.type==='mcq') ans = q.choices[q.answer];
  else if(q.type==='tf') ans = q.answer? t.quiz.true : t.quiz.false;
  else if(q.type==='fill') ans = q.answer;
  else if(q.type==='rearrange') ans = q.answer.join(' ');
  return { title:t.quiz.incorrect, color:'rose', ans };
}

function QuizRunner({ questions, target, onDone, onExit, title }) {
  const t = quseT();
  const I = window.Icons;
  const D = window.DATA;
  const { useState, useRef } = React;
  const [i,setI] = useState(0);
  const [state,setState] = useState('idle'); // idle|correct|wrong
  const [picked,setPicked] = useState(null);
  const [built,setBuilt] = useState([]);
  const [score,setScore] = useState(0);
  const [fireCon,setFireCon] = useState(0);
  const [finished,setFinished] = useState(false);
  const [shakeKey,setShakeKey] = useState(0);

  const q = questions[i];
  const canCheck = q && (q.type==='rearrange' ? built.length===q.tokens.length :
    q.type==='fill' ? (picked&&picked.trim()) : picked!=null);

  function check(){
    let ok=false;
    if(q.type==='mcq') ok = picked===q.answer;
    else if(q.type==='tf') ok = (picked===0)===q.answer;
    else if(q.type==='fill'){ const a=[q.answer,...(q.accept||[])].map(norm); ok=a.includes(norm(picked)); }
    else if(q.type==='rearrange') ok = JSON.stringify(built)===JSON.stringify(q.answer);
    setState(ok?'correct':'wrong');
    if(ok){ setScore(s=>s+1); setFireCon(f=>f+1); } else { setShakeKey(k=>k+1); }
  }
  function next(){
    if(i+1>=questions.length){ setFinished(true); return; }
    setI(i+1); setState('idle'); setPicked(null); setBuilt([]);
  }
  function retry(){ setI(0); setState('idle'); setPicked(null); setBuilt([]); setScore(0); setFinished(false); }

  if(finished){
    const pct = Math.round(score/questions.length*100);
    const pass = pct>=60;
    return (
      <div className="max-w-lg mx-auto px-5 py-8 animate-fade-up text-center">
        <QConfetti fire={pass?'done':0}/>
        <div className="inline-grid place-items-center w-24 h-24 rounded-full mb-5"
          style={{ background: pass?'#ECFDF3':'#FFF1F6' }}>
          {pass? <I.trophy size={46} className="text-grass-500"/> : <I.refresh size={42} className="text-coral-400"/>}
        </div>
        <h2 className="text-3xl font-extrabold font-display text-ink-900">{pass?'Great work!':'Almost there'}</h2>
        <p className="text-ink-500 font-medium mt-1.5">{t.quiz.score}</p>
        <div className="my-6 flex items-center justify-center">
          <QRing value={score/questions.length} size={150} color={pass?'#22C55E':'#FF6B9D'}>
            <div><div className="text-4xl font-extrabold font-display text-ink-900">{pct}%</div>
              <div className="text-xs text-ink-400 font-bold">{score}/{questions.length}</div></div>
          </QRing>
        </div>
        {pass && <div className="flex items-center justify-center gap-2 text-grass-700 bg-grass-50 rounded-2xl py-3 font-bold font-display mb-5"><I.checkCircle size={18}/> {t.quiz.unlocked}</div>}
        <div className="flex gap-3">
          <QBtn variant="outline" full icon={I.refresh} onClick={retry}>{t.quiz.retry}</QBtn>
          <QBtn variant={pass?'primary':'coral'} full iconRight={I.arrowRight} onClick={()=>onDone&&onDone({score,total:questions.length,pass})}>
            {pass? t.dash.continue : t.quiz.retry==='Retry'?'Continue anyway':'متابعة'}
          </QBtn>
        </div>
      </div>
    );
  }

  const fb = state!=='idle' ? feedbackText(q,state,t) : null;
  return (
    <div className="max-w-2xl mx-auto px-5 py-6 sm:py-8">
      {/* progress header */}
      <div className="flex items-center gap-3 mb-6">
        {onExit && <button onClick={onExit} className="grid place-items-center w-9 h-9 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={20}/></button>}
        <QBar value={(i+(state!=='idle'?1:0))/questions.length} className="flex-1" h={10}/>
        <span className="text-sm font-bold font-display text-ink-500 tabular-nums">{i+1}/{questions.length}</span>
      </div>

      <QBadge color="teal" className="mb-3"><I.brain size={13}/> {title||t.lesson.quiz}</QBadge>
      <h2 key={shakeKey} className={qcx('text-xl sm:text-2xl font-extrabold font-display text-ink-900 mb-6 text-balance', state==='wrong'&&'animate-shake')}>{q.q}</h2>

      <Question q={q} state={state} picked={picked} setPicked={setPicked} built={built} setBuilt={setBuilt}/>

      {/* feedback bar */}
      <div className={qcx('mt-6 transition-all', state!=='idle'?'opacity-100':'opacity-0 h-0 overflow-hidden')}>
        {fb && (
          <div className={qcx('rounded-2xl p-4 flex items-start gap-3 animate-fade-up',
            fb.color==='grass'?'bg-grass-50':'bg-rose-50')}>
            <span className={qcx('grid place-items-center w-9 h-9 rounded-xl shrink-0 text-white', fb.color==='grass'?'bg-grass-500':'bg-rose-500')}>
              {fb.color==='grass'?<I.check size={20} stroke={3}/>:<I.x size={20} stroke={3}/>}
            </span>
            <div className="flex-1">
              <div className={qcx('font-extrabold font-display', fb.color==='grass'?'text-grass-700':'text-rose-700')}>{fb.title}</div>
              {fb.ans && <div className="text-sm text-ink-600 font-medium mt-0.5">Correct answer: <span className={q.dir==='rtl'||q.dirChoices==='rtl'?'font-ar text-base':''} dir={q.dir||q.dirChoices||'ltr'}>{fb.ans}</span></div>}
            </div>
          </div>
        )}
      </div>

      {/* action */}
      <QConfetti fire={state==='correct'?fireCon:0}/>
      <div className="mt-6">
        {state==='idle'
          ? <QBtn full size="lg" disabled={!canCheck} onClick={check}>{t.quiz.check}</QBtn>
          : <QBtn full size="lg" variant={state==='correct'?'primary':'coral'} iconRight={I.arrowRight} onClick={next}>
              {i+1>=questions.length? t.quiz.results : t.quiz.next}</QBtn>}
      </div>
    </div>
  );
}

/* standalone screen wrapper */
function QuizScreen(){
  const { targetCode, nav } = quseApp();
  const D = window.DATA;
  return (
    <div className="min-h-full py-6">
      <QuizRunner questions={D.QUIZZES[targetCode]} target={D.LANGS[targetCode]}
        onDone={()=>nav('dashboard')} onExit={()=>nav('dashboard')}/>
    </div>
  );
}

window.QuizRunner = QuizRunner;
window.QuizScreen = QuizScreen;
