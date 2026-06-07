// screens/Upgrade.jsx → window.Upgrade
const { cx:upcx, useApp:upuseApp, useT:upuseT, Card:UpCard, Button:UpBtn, Badge:UpBadge, Confetti:UpCon } = window.UI;

function Upgrade(){
  const { useState } = React;
  const I = window.Icons; const C = window.CONTENT; const D = window.DATA;
  const { uiLang, trial, subscribe, nav } = upuseApp();
  const t = upuseT();
  const labelKey = uiLang==='ar'?'ar':'en';

  const [plan,setPlan] = useState('annual');
  const [done,setDone] = useState(false);
  const isRtl = uiLang==='ar';

  const monthly = C.PRICING.monthly, annual = C.PRICING.annual;
  const isAnnual = plan==='annual';

  function start(){
    setDone(true);
    setTimeout(()=>{ subscribe(); nav('skillHub'); }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background:'radial-gradient(120% 60% at 50% -10%, #FFF1F6 0%, #F4F7F9 55%)' }}>
      {/* mini header */}
      <header className="bg-white/70 backdrop-blur border-b border-ink-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-xl bg-teal-400 text-white"><I.globe size={16}/></span>
            <span className="font-extrabold font-display text-ink-900">Lingo</span>
          </div>
          <button onClick={()=>nav('skillHub')} className="grid place-items-center w-9 h-9 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={20}/></button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="text-center mb-7">
          {trial.expired ? <UpBadge color="coral" className="mb-3"><I.lock size={13}/> {t.upgrade.trialEnded}</UpBadge>
                          : <UpBadge color="teal" className="mb-3"><I.sparkles size={13}/> Lingo Pro</UpBadge>}
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">{t.upgrade.title}</h1>
          <p className="text-ink-500 font-medium mt-2 max-w-xl mx-auto leading-relaxed">{t.upgrade.sub}</p>
        </div>

        {/* plan card */}
        <UpCard className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:'linear-gradient(90deg,#4ECDC4,#7C8CF8,#FF6B9D)' }}/>

          {/* monthly/annual toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-ink-100 rounded-2xl">
              {[
                { id:'monthly', label:t.upgrade.monthly },
                { id:'annual',  label:t.upgrade.annual, badge:annual.badge },
              ].map(opt=>(
                <button key={opt.id} onClick={()=>setPlan(opt.id)}
                  className={upcx('relative h-11 px-5 rounded-xl font-extrabold font-display transition-all', plan===opt.id?'bg-white text-ink-900 shadow-soft':'text-ink-500 hover:text-ink-700')}>
                  {opt.label}
                  {opt.badge && plan!==opt.id && (
                    <span className="absolute -top-2 -end-2 bg-coral-400 text-white text-[10px] font-extrabold font-display px-1.5 py-0.5 rounded-md whitespace-nowrap">{opt.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* price block */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-ink-900 tracking-tight">
                ${isAnnual ? annual.equivPerMonth.toFixed(2) : monthly.price}
              </span>
              <span className="text-ink-400 font-bold">{t.upgrade.perMonth}</span>
            </div>
            <div className="text-sm text-ink-500 font-medium mt-1.5">
              {isAnnual
                ? <>{t.upgrade.billedAnnually.replace('${total}', `$${annual.price}`)} · <span className="text-grass-600 font-extrabold font-display">{t.upgrade.savings}</span></>
                : t.upgrade.billedMonthly}
            </div>
          </div>

          {/* features */}
          <div className="bg-ink-50 rounded-2xl p-5 mb-6">
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400 mb-3">{t.upgrade.features}</div>
            <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
              {C.PRICING.features.map((f,i)=>(
                <li key={i} className="flex items-start gap-2.5 text-[15px] font-medium text-ink-700">
                  <span className="grid place-items-center w-5 h-5 rounded-md bg-teal-400 text-white mt-0.5 shrink-0">{I.check({size:13,stroke:3})}</span>
                  <span dir={uiLang==='ar'?'rtl':'ltr'} className={uiLang==='ar'?'font-ar text-base':''}>{f[labelKey]||f.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          {!done ? (
            <UpBtn full size="lg" variant="coral" icon={I.bolt} onClick={start}>
              {t.upgrade.startSub} · ${isAnnual?annual.price:monthly.price}/{isAnnual?'yr':'mo'}
            </UpBtn>
          ) : (
            <div className="relative">
              <UpCon fire="sub"/>
              <div className="text-center py-4 rounded-2xl bg-grass-50 text-grass-700 font-extrabold font-display flex items-center justify-center gap-2 animate-fade-up">
                <I.checkCircle size={22}/> Welcome to Lingo Pro!
              </div>
            </div>
          )}

          {/* footnote */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-400 font-bold">
            <I.shield size={14}/> {t.upgrade.cancel}
          </div>
        </UpCard>

        {/* trust strip */}
        <div className="mt-7 grid grid-cols-3 gap-3 text-center">
          {[
            { ic:I.bolt,   v:'Unlimited', l:'AI lessons' },
            { ic:I.globe,  v:'3 → 6',     l:'Languages (soon)' },
            { ic:I.award,  v:'CEFR',      l:'Certificates' },
          ].map((s,i)=>(
            <div key={i} className="bg-white rounded-2xl border border-ink-100 py-4">
              <s.ic size={20} className="mx-auto text-teal-500"/>
              <div className="font-extrabold font-display text-ink-900 mt-1.5">{s.v}</div>
              <div className="text-[11px] text-ink-400 font-bold mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* FAQ-ish reassurance */}
        <div className="mt-7 max-w-xl mx-auto space-y-2.5 text-center">
          <p className="text-xs text-ink-400 font-medium">Questions? <a className="text-teal-700 font-bold">Contact support</a> · We're a small team and we'll get back to you within a day.</p>
        </div>
      </main>
    </div>
  );
}
window.Upgrade = Upgrade;
