// screens/LevelSelect.jsx → window.LevelSelect
const { cx:lvcx, useApp:lvuseApp, useT:lvuseT, Card:LvCard, Button:LvBtn, Badge:LvBadge, FlagTile:LvFlag, LevelChip:LvLevel } = window.UI;

const LEVEL_HINTS = {
  A1:{ blurb:'Survival basics', detail:'Greetings, numbers, everyday words.' },
  A2:{ blurb:'Elementary',      detail:'Simple conversations on familiar topics.' },
  B1:{ blurb:'Intermediate',    detail:'Handle travel & daily life confidently.' },
  B2:{ blurb:'Upper-Int.',      detail:'Fluent enough for work & nuanced talk.' },
  C1:{ blurb:'Advanced',        detail:'Idiom, register, complex ideas.' },
  C2:{ blurb:'Mastery',         detail:'Near-native precision in any topic.' },
};

function LevelCard({ id, hint, accent, selected, onClick }){
  return (
    <button onClick={onClick} aria-pressed={selected}
      className={lvcx('group relative rounded-3xl p-5 sm:p-6 text-start transition-all duration-150 bg-white',
        selected?'shadow-lift -translate-y-1':'border-2 border-ink-200 hover:border-ink-300 hover:shadow-soft hover:-translate-y-0.5')}
      style={selected?{ borderColor:'transparent', boxShadow:`0 0 0 2.5px ${accent}, 0 16px 40px rgba(16,24,40,.12)` }:{}}>
      {/* accent corner */}
      <span className={lvcx('absolute -top-2 -end-2 w-10 h-10 rounded-2xl transition-transform', selected?'scale-100':'scale-0')}
        style={{ background:accent }}>
        <span className="grid place-items-center w-full h-full text-white">{window.Icons.check({size:18,stroke:3})}</span>
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold font-display text-ink-900 tracking-tight">{id}</span>
        <span className="text-sm font-bold font-display text-ink-500">· {hint.blurb}</span>
      </div>
      <p className="text-sm text-ink-500 font-medium mt-2 leading-relaxed">{hint.detail}</p>
      {/* mini scale */}
      <div className="mt-4 flex items-center gap-1">
        {['A1','A2','B1','B2','C1','C2'].map(l=>{
          const i = ['A1','A2','B1','B2','C1','C2'].indexOf(l);
          const cur = ['A1','A2','B1','B2','C1','C2'].indexOf(id);
          return <span key={l} className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: i<=cur ? accent : '#E4E9EE' }}/>;
        })}
      </div>
    </button>
  );
}

function LevelSelect(){
  const { useState, useEffect } = React;
  const I = window.Icons; const D = window.DATA;
  const { targetCode, setTarget, level, setLevel, nav, uiLang } = lvuseApp();
  const t = lvuseT();
  const [pick,setPick] = useState(level||'A2');
  const target = D.LANGS[targetCode];

  useEffect(()=>{ setPick(level||'A2'); },[level]);

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8 sm:py-12"
      style={{ background:'radial-gradient(110% 60% at 50% -10%, #EFFCFB 0%, #F4F7F9 60%)' }}>
      <div className="w-full max-w-4xl">
        {/* title */}
        <div className="text-center mb-8">
          <LvBadge color="teal" className="mb-3"><I.layers size={13}/> CEFR · {target.name}</LvBadge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">{t.levelSel.title}</h1>
          <p className="text-ink-500 font-medium mt-2">{t.levelSel.sub}</p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {Object.keys(LEVEL_HINTS).map((id,i)=>{
            const accents = ['#4ECDC4','#7C8CF8','#FBBF24','#FF6B9D','#34D399','#5B6CF0'];
            return <LevelCard key={id} id={id} hint={LEVEL_HINTS[id]} accent={accents[i]} selected={pick===id} onClick={()=>setPick(id)}/>;
          })}
        </div>

        {/* footer cta */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <p className="text-sm text-ink-400 font-medium">Not sure? <button className="text-teal-700 font-bold font-display hover:text-teal-800">Take the placement test</button> instead.</p>
          <LvBtn size="lg" variant="coral" iconRight={I.arrowRight} onClick={()=>{ setLevel(pick); nav('skillHub'); }}>
            {t.levelSel.cont} <span className="opacity-75">· {pick}</span>
          </LvBtn>
        </div>
      </div>
    </div>
  );
}
window.LevelSelect = LevelSelect;
