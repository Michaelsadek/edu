// screens/Landing.jsx → window.Landing
const { cx:landcx, useApp:landUseApp, Button:LandBtn, Badge:LandBadge, FlagSVG:LandFlagSVG } = window.UI;

function NavTop(){
  const I = window.Icons;
  const { nav } = landUseApp();
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-10 h-10 rounded-2xl bg-teal-400 text-white shadow-glow"><I.globe size={20}/></span>
          <span className="text-xl font-extrabold font-display text-ink-900 tracking-tight">Lingo</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold font-display text-ink-700">
          <a href="#how" className="hover:text-teal-700">How it works</a>
          <a href="#levels" className="hover:text-teal-700">Levels</a>
          <a href="#pricing" className="hover:text-teal-700">Pricing</a>
          <a href="#faq" className="hover:text-teal-700">FAQ</a>
        </nav>
        <div className="flex items-center gap-2.5">
          <button onClick={()=>nav('dashboard')} className="hidden sm:inline-flex h-10 px-4 items-center rounded-xl text-sm font-bold font-display text-ink-700 hover:bg-ink-100">Sign in</button>
          <LandBtn size="sm" onClick={()=>nav('onboarding')} iconRight={I.arrowRight}>Get started</LandBtn>
        </div>
      </div>
    </header>
  );
}

function HeroVisual(){
  const I = window.Icons;
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* tilted phone */}
      <div className="rounded-[36px] p-2.5 shadow-lift bg-ink-900 rotate-[-3deg] origin-center">
        <div className="relative overflow-hidden rounded-[28px] bg-[#F4F7F9]" style={{ width:300, height:580, margin:'0 auto' }}>
          {/* status */}
          <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-5 z-30 text-[10px] font-extrabold font-display text-ink-900 tabular-nums">
            <span>9:41</span>
            <span className="w-16 h-5 rounded-b-xl bg-ink-900"/>
            <span>•••</span>
          </div>
          <div className="pt-9 px-4 space-y-3">
            {/* tiny header */}
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white"><I.globe size={14}/></span>
              <span className="font-extrabold font-display text-ink-900 text-sm">Lingo</span>
              <span className="ms-auto inline-flex items-center gap-1 bg-coral-50 text-coral-600 rounded-lg px-2 py-1 text-[11px] font-extrabold"><I.flame size={12}/> 24</span>
            </div>
            {/* greeting */}
            <div className="text-xs text-ink-400 font-medium">Welcome back,</div>
            <div className="text-xl font-extrabold font-display text-ink-900">Layla 👋</div>
            {/* current lesson card */}
            <div className="rounded-2xl bg-white border border-ink-100 shadow-soft p-3" style={{ background:'linear-gradient(135deg,#FFF1F6,#fff 70%)' }}>
              <div className="inline-flex items-center gap-1 bg-coral-100 text-coral-600 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold mb-1.5"><I.sparkles size={10}/> NEXT UP</div>
              <div className="text-sm font-extrabold font-display text-ink-900">At the Café</div>
              <div className="text-[11px] text-ink-500 font-medium">Unit 4 · Everyday life</div>
              <div dir="rtl" className="font-ar text-base text-coral-500 font-bold mt-1">في المَقهى</div>
              <div className="mt-2 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-coral-400 text-white text-[11px] font-extrabold">
                Continue <I.arrowRight size={11}/>
              </div>
            </div>
            {/* mini stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { v:'A2', l:'Level',  c:'#1F9A92', bg:'#EFFCFB' },
                { v:'30', l:'XP',     c:'#D97706', bg:'#FFF4D6' },
                { v:'64%', l:'Goal',  c:'#5B6CF0', bg:'#EEF1FE' },
              ].map((s,i)=>(
                <div key={i} className="rounded-xl bg-white border border-ink-100 p-2 text-center">
                  <div className="text-base font-extrabold font-display" style={{ color:s.c }}>{s.v}</div>
                  <div className="text-[9px] text-ink-400 font-bold mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
            {/* roadmap */}
            <div className="rounded-2xl bg-white border border-ink-100 p-3">
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink-400 mb-2">Roadmap</div>
              <div className="flex items-center gap-1">
                {['A1','A2','B1','B2','C1','C2'].map((l,i)=>{
                  const done=i===0, cur=i===1;
                  return (
                    <React.Fragment key={l}>
                      <div className={landcx('grid place-items-center w-8 h-8 rounded-xl text-[10px] font-extrabold font-display',
                        done?'bg-white border-2 border-teal-400 text-teal-500':
                        cur?'bg-coral-400 text-white':'bg-ink-100 text-ink-400')}>
                        {done?<I.check size={12} stroke={3}/>:l}
                      </div>
                      {i<5 && <div className="flex-1 h-0.5 rounded" style={{ background:i===0?'#4ECDC4':'#E4E9EE' }}/>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* floating chips */}
      <div className="hidden md:flex absolute -top-3 -end-4 items-center gap-2 bg-white rounded-2xl shadow-lift px-3 py-2 rotate-[6deg]">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-grass-500 text-white"><I.check size={14} stroke={3}/></span>
        <div>
          <div className="text-[11px] font-extrabold font-display text-ink-900">Correct!</div>
          <div className="text-[10px] text-ink-500 font-medium">+10 XP</div>
        </div>
      </div>
      <div className="hidden md:flex absolute -bottom-4 -start-4 items-center gap-2 bg-white rounded-2xl shadow-lift px-3 py-2 rotate-[-4deg]">
        <span className="grid place-items-center w-7 h-7 rounded-xl bg-coral-50 text-coral-500"><I.flame size={16}/></span>
        <div>
          <div className="text-[11px] font-extrabold font-display text-ink-900">24-day streak</div>
          <div className="text-[10px] text-ink-500 font-medium">Keep it alive!</div>
        </div>
      </div>
    </div>
  );
}

function Hero(){
  const I = window.Icons;
  const { nav } = landUseApp();
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden"
      style={{ background:'radial-gradient(80% 60% at 20% 0%, #EFFCFB 0%, transparent 60%), radial-gradient(70% 60% at 110% 100%, #FFF1F6 0%, transparent 55%), #FBFBFD' }}>
      <NavTop/>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="text-center lg:text-start">
          <LandBadge color="teal" className="mb-4"><I.sparkles size={13}/> AI-tailored lessons</LandBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-ink-900 tracking-[-0.02em] leading-[1.05] text-balance">
            Learn English, Arabic, or German —
            <span className="block sm:inline relative">
              <span className="text-teal-500 whitespace-nowrap">taught in YOUR language</span>
              <svg viewBox="0 0 360 14" className="absolute -bottom-1 sm:-bottom-2 inset-x-0 w-full pointer-events-none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9 Q90 2 180 6 T358 8" stroke="#FF6B9D" strokeWidth="5" fill="none" strokeLinecap="round"/></svg>
            </span>
          </h1>
          <p className="mt-5 text-ink-500 font-medium text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Reading, listening, speaking, and writing — practiced with an AI tutor that adapts to your CEFR level. Explanations in English or Arabic. Cancel anytime.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <LandBtn size="lg" variant="coral" iconRight={I.arrowRight} onClick={()=>nav('onboarding')}>Start free trial</LandBtn>
            <LandBtn size="lg" variant="outline" icon={I.play} onClick={()=>nav('dashboard')}>Watch the tour</LandBtn>
          </div>
          <div className="mt-6 flex items-center gap-3 justify-center lg:justify-start text-sm text-ink-500 font-medium">
            <div className="flex -space-x-2">
              {['#4ECDC4','#FF6B9D','#7C8CF8','#FBBF24'].map((c,i)=>(
                <span key={i} className="grid place-items-center w-7 h-7 rounded-full text-white border-2 border-white font-extrabold font-display text-xs"
                  style={{ background:`linear-gradient(135deg, ${c}, ${c}cc)` }}>
                  {['L','M','A','J'][i]}
                </span>
              ))}
            </div>
            <span>15,000+ learners · <span className="text-ink-700 font-bold">4.8 ★</span> avg rating</span>
          </div>
        </div>
        <div className="relative">
          <HeroVisual/>
        </div>
      </div>
    </section>
  );
}

function Languages(){
  const I = window.Icons; const D = window.DATA;
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <LandBadge color="teal" className="mb-3"><I.globe size={13}/> Three languages</LandBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">Pick a language. Bring a goal.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {['en','de','ar'].map(code=>{
            const L = D.LANGS[code];
            return (
              <div key={code} className="relative rounded-3xl border border-ink-100 bg-white shadow-soft overflow-hidden hover:shadow-lift hover:-translate-y-0.5 transition-all">
                <div className="h-24" style={{ background:`linear-gradient(135deg, ${L.tintBg}, #fff 70%)` }}/>
                <div className="px-6 pb-6 -mt-10">
                  <span className="inline-flex items-center justify-center rounded-2xl shadow-soft" style={{ width:64, height:64, background:L.tintBg, boxShadow:`inset 0 0 0 1.5px ${L.tintRing}` }}>
                    <LandFlagSVG code={code} size={38}/>
                  </span>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold font-display text-ink-900">{L.name}</span>
                    <span dir={code==='ar'?'rtl':'ltr'} className={code==='ar'?'font-ar text-ink-400':'text-ink-400'}>{L.native}</span>
                  </div>
                  <div className="mt-2 text-sm text-ink-500 font-medium">{L.learners} active learners</div>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-extrabold font-display text-ink-500">
                    <span className="inline-flex items-center gap-1 bg-ink-100 rounded-md px-2 py-1">A1 → C2</span>
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1" style={{ background:L.tintBg, color:L.tint }}><I.sparkles size={11}/> AI-tailored</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks(){
  const I = window.Icons;
  const steps = [
    { ic:'target',    t:'Pick a level',     d:'A1 to C2. Not sure? Take a 3-minute placement test.' },
    { ic:'sparkles',  t:'Choose a mode',    d:'Reading, listening, speaking, or writing — each tailored by AI.' },
    { ic:'brain',     t:'Practice + feedback', d:'Instant correction, pronunciation scoring, and inline writing edits.' },
    { ic:'award',     t:'Earn certificates',d:'Pass the level exam and download a PDF you can show.' },
  ];
  return (
    <section id="how" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <LandBadge color="coral" className="mb-3"><I.bolt size={13}/> How it works</LandBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">From hello to fluent — without the textbook drag.</h2>
          <p className="mt-3 text-ink-500 font-medium leading-relaxed">No tracks, no homework guilt. Just one tailored activity at a time.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s,i)=>{
            const Ic = window.Icons[s.ic];
            return (
              <div key={i} className="relative rounded-3xl bg-white border border-ink-100 p-6 shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all">
                <div className="absolute top-4 end-5 mono text-[10px] text-ink-300 font-bold">0{i+1}</div>
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mb-4" style={{ boxShadow:'inset 0 0 0 1.5px #AEEEEA' }}><Ic size={22}/></span>
                <div className="font-extrabold font-display text-ink-900 text-lg">{s.t}</div>
                <p className="text-sm text-ink-500 font-medium mt-1.5 leading-relaxed">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Modes(){
  const I = window.Icons; const C = window.CONTENT;
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <LandBadge color="teal" className="mb-3"><I.sparkles size={13}/> Four skills</LandBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">Practice every skill, every day.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {C.SKILLS.map(s=>{
            const Ic = window.Icons[s.icon];
            return (
              <div key={s.id} className="rounded-3xl bg-white border border-ink-100 p-5 shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all">
                <span className="grid place-items-center w-12 h-12 rounded-2xl mb-4" style={{ background:s.tintBg, color:s.tint, boxShadow:`inset 0 0 0 1.5px ${s.tintRing}` }}><Ic size={22}/></span>
                <div className="font-extrabold font-display text-ink-900">{s.label.en}</div>
                <p className="text-sm text-ink-500 font-medium mt-1.5 leading-relaxed">{s.desc.en}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Levels(){
  const I = window.Icons; const D = window.DATA;
  return (
    <section id="levels" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <LandBadge color="teal" className="mb-3"><I.layers size={13}/> CEFR levels</LandBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">Beginner to fluent — guided, not graded.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {D.CEFR.map((lvl,i)=>{
            const accents = ['#4ECDC4','#7C8CF8','#FBBF24','#FF6B9D','#34D399','#5B6CF0'];
            return (
              <div key={lvl.id} className="rounded-2xl bg-white border border-ink-100 shadow-soft p-4 hover:shadow-lift hover:-translate-y-0.5 transition-all">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold font-display text-ink-900">{lvl.id}</span>
                  <span className="text-xs font-bold text-ink-500">· {lvl.label}</span>
                </div>
                <p className="text-xs text-ink-500 font-medium mt-2 leading-relaxed">{lvl.blurb}</p>
                <div className="mt-3 h-1 rounded-full" style={{ background:accents[i] }}/>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing(){
  const I = window.Icons; const C = window.CONTENT;
  const { nav } = landUseApp();
  return (
    <section id="pricing" className="py-16 sm:py-24"
      style={{ background:'radial-gradient(80% 50% at 50% 0%, #FFF1F6 0%, transparent 60%), #FBFBFD' }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <LandBadge color="coral" className="mb-3"><I.bolt size={13}/> One simple plan</LandBadge>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">One plan. Every language. Every mode.</h2>
        <p className="mt-3 text-ink-500 font-medium">Start with a 7-day free trial. Cancel any time.</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {/* monthly */}
          <div className="rounded-3xl bg-white border border-ink-100 p-6 shadow-soft text-start">
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500">Monthly</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold font-display text-ink-900">$13</span>
              <span className="text-ink-400 font-bold">/month</span>
            </div>
            <p className="text-sm text-ink-500 font-medium mt-1">Pay as you go. Cancel anytime.</p>
            <LandBtn variant="outline" full className="mt-5" onClick={()=>nav('upgrade')}>Choose monthly</LandBtn>
          </div>
          {/* annual */}
          <div className="relative rounded-3xl bg-white border-2 border-coral-300 p-6 shadow-lift text-start">
            <span className="absolute -top-3 inset-x-0 mx-auto w-fit bg-coral-400 text-white text-[11px] font-extrabold font-display px-3 py-1 rounded-full">Save 36%</span>
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-coral-500">Annual · best value</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold font-display text-ink-900">$8.25</span>
              <span className="text-ink-400 font-bold">/month</span>
            </div>
            <p className="text-sm text-ink-500 font-medium mt-1">Billed annually as $99 — 4 months free.</p>
            <LandBtn variant="coral" full className="mt-5" iconRight={I.arrowRight} onClick={()=>nav('onboarding')}>Start free trial</LandBtn>
          </div>
        </div>
        <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-start max-w-2xl mx-auto">
          {C.PRICING.features.map((f,i)=>(
            <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-ink-700">
              <span className="grid place-items-center w-5 h-5 rounded-md bg-teal-400 text-white mt-0.5 shrink-0">{I.check({size:13,stroke:3})}</span>
              {f.en}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQ(){
  const I = window.Icons;
  const { useState } = React;
  const [open,setOpen] = useState(0);
  const items = [
    { q:'Do I need any prior knowledge?', a:'No. Lessons start from absolute beginner (A1) and you can take a 3-minute placement test to skip ahead.' },
    { q:'What happens after the free trial?', a:'After 7 days, you can choose monthly ($13) or annual ($99). No charge if you cancel before then.' },
    { q:'Is my Arabic / German / English speech understood?', a:'Yes. We score pronunciation at the word level and show you exactly which sounds to fix.' },
    { q:'Can I learn more than one language?', a:'Yes — your plan covers all three. Switch any time without losing progress.' },
    { q:'Do you offer certificates?', a:'A PDF certificate is generated after you pass each CEFR level exam.' },
  ];
  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-ink-100">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <LandBadge color="teal" className="mb-3"><I.message size={13}/> Questions</LandBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">Quick answers.</h2>
        </div>
        <div className="space-y-2.5">
          {items.map((it,i)=>(
            <div key={i} className="rounded-2xl border border-ink-100 bg-white overflow-hidden">
              <button onClick={()=>setOpen(open===i?-1:i)} className="w-full px-5 py-4 flex items-center gap-3 text-start hover:bg-ink-50/50">
                <span className="flex-1 font-extrabold font-display text-ink-900">{it.q}</span>
                <I.chevronDown size={18} className={landcx('text-ink-400 transition-transform', open===i&&'rotate-180')}/>
              </button>
              {open===i && <div className="px-5 pb-4 text-sm text-ink-600 font-medium leading-relaxed animate-fade-up">{it.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist(){
  const I = window.Icons;
  const { useState } = React;
  const { nav } = landUseApp();
  const [email,setEmail] = useState('');
  const [done,setDone] = useState(false);
  function submit(e){ e.preventDefault(); if(!email) return; setDone(true); }
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ background:'linear-gradient(135deg, #4ECDC4 0%, #5B6CF0 60%, #FF6B9D 130%)' }}>
          <div className="absolute -top-10 -end-10 w-40 h-40 rounded-full bg-white/10"/>
          <div className="absolute -bottom-16 -start-10 w-48 h-48 rounded-full bg-white/10"/>
          <h2 className="relative text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight text-balance">Ready to learn?</h2>
          <p className="relative text-white/80 font-medium mt-2 max-w-xl mx-auto">Start your free 7-day trial. No credit card needed up front.</p>
          {!done ? (
            <form onSubmit={submit} className="relative mt-7 flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto">
              <div className="flex items-center gap-2 bg-white rounded-2xl px-4 h-12 flex-1 w-full shadow-soft">
                <I.send size={16} className="text-ink-300"/>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@email.com" className="flex-1 bg-transparent outline-none text-ink-900 font-semibold placeholder:text-ink-300"/>
              </div>
              <LandBtn type="submit" size="lg" variant="dark" iconRight={I.arrowRight}>Join the waitlist</LandBtn>
            </form>
          ) : (
            <div className="relative mt-7 inline-flex items-center gap-2 bg-white text-grass-700 rounded-2xl px-5 h-12 font-extrabold font-display animate-fade-up shadow-soft">
              <I.checkCircle size={18}/> You're on the list — we'll be in touch!
            </div>
          )}
          <div className="relative mt-5 flex items-center gap-3 justify-center text-white/80 text-xs font-semibold">
            <I.shield size={14}/> Cancel anytime. No hidden fees.
            <span className="opacity-50">·</span>
            <button onClick={()=>nav('onboarding')} className="underline underline-offset-2 hover:text-white">Skip and start now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  const I = window.Icons;
  return (
    <footer className="border-t border-ink-100 bg-white py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-400 text-white"><I.globe size={18}/></span>
            <span className="text-lg font-extrabold font-display text-ink-900">Lingo</span>
          </div>
          <p className="text-sm text-ink-500 font-medium leading-relaxed">AI-powered language learning. English, Arabic, German.</p>
        </div>
        {[
          ['Product',['Reading','Listening','Speaking','Writing']],
          ['Company',['About','Blog','Careers','Press']],
          ['Legal',['Terms','Privacy','Refund policy','Contact']],
        ].map(([h,items])=>(
          <div key={h}>
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">{h}</div>
            <ul className="space-y-1.5 text-sm font-bold font-display text-ink-700">
              {items.map(it=>(<li key={it}><a className="hover:text-teal-700">{it}</a></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-8 pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-400 font-medium">
        <span>© 2026 Lingo Inc. All rights reserved.</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}

function Landing(){
  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      <Hero/>
      <Languages/>
      <HowItWorks/>
      <Modes/>
      <Levels/>
      <Pricing/>
      <FAQ/>
      <Waitlist/>
      <Footer/>
    </div>
  );
}
window.Landing = Landing;
