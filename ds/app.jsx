// ds/app.jsx — style-guide shell: hero, sticky nav, mount
const { useState:appUseState, useEffect:appUseEffect } = React;
const { cx:appCx, DSFlag:AppFlag } = window.DS;

const NAV = [
  { kind:'h', label:'01 — Foundations' },
  { id:'foundations', label:'Overview', section:'foundations' },
  { id:'color',       label:'Color',           section:'color' },
  { id:'type',        label:'Typography',      section:'type' },
  { id:'spacing',     label:'Spacing',         section:'spacing' },
  { id:'radius',      label:'Radius & shadow', section:'radius' },
  { id:'icons',       label:'Icons',           section:'icons' },
  { id:'language-id', label:'Language identity', section:'language-id' },

  { kind:'h', label:'02 — Components' },
  { id:'buttons',  label:'Buttons' },
  { id:'cards',    label:'Cards' },
  { id:'inputs',   label:'Inputs' },
  { id:'audio',    label:'Audio player' },
  { id:'record',   label:'Record button' },
  { id:'feedback', label:'Feedback' },
  { id:'notify',   label:'Banners & modals' },
  { id:'empty',    label:'Empty / error / loading' },
  { id:'nav',      label:'Navigation' },

  { kind:'h', label:'03 — Bidi' },
  { id:'rtl',    label:'Overview' },
  { id:'mirror', label:'Full UI mirror' },
  { id:'mixed',  label:'Mixed-direction' },
  { id:'rules',  label:'Mirroring contract' },
  { id:'impl',   label:'Implementation' },

  { kind:'h', label:'04 — Applied' },
  { id:'screens',         label:'Overview' },
  { id:'screens-light',   label:'Core flows · light' },
  { id:'screens-more',    label:'Writing · upgrade · locked' },
  { id:'screens-rtl-dark',label:'Dark + RTL' },

  { kind:'h', label:'05 — Motion' },
  { id:'motion',           label:'Overview' },
  { id:'motion-durations', label:'Durations & easings' },
  { id:'motion-examples',  label:'Worked examples' },

  { kind:'h', label:'06 — Layout' },
  { id:'layout',           label:'Overview' },
  { id:'layout-grid',      label:'Responsive grid' },
  { id:'layout-patterns',  label:'Page patterns' },

  { kind:'h', label:'07 — Access' },
  { id:'a11y',             label:'Overview' },
  { id:'a11y-contrast',    label:'Color contrast' },
  { id:'a11y-focus',       label:'Focus & targets' },
  { id:'a11y-checklist',   label:'Component checklist' },

  { kind:'h', label:'08 — Export' },
  { id:'export',           label:'Tailwind config' },
];

/* ---------- Hero ---------- */
function Hero(){
  const I = window.Icons;
  return (
    <header className="relative overflow-hidden border-b border-ink-100"
      style={{ background:'radial-gradient(60% 100% at 10% 0%, #EFFCFB 0%, transparent 60%), radial-gradient(60% 100% at 100% 100%, #FFF1F6 0%, transparent 55%), #FBFBFD' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="grid place-items-center w-11 h-11 rounded-2xl bg-teal-400 text-white shadow-glow"><I.globe size={22}/></span>
          <span className="text-2xl font-extrabold font-display text-ink-900 tracking-tight">LinguaAI</span>
          <span className="mono text-xs text-ink-400 mt-1">/ design system v1.0</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold font-display text-ink-900 tracking-[-0.02em] leading-[0.95] text-balance max-w-4xl">
          A design system for learning <span className="relative inline-block">
            <span className="relative text-teal-500">a new language</span>
            <svg viewBox="0 0 240 12" className="absolute -bottom-2 inset-x-0 w-full" preserveAspectRatio="none"><path d="M2 8 Q60 2 120 6 T238 7" stroke="#FF6B9D" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
          </span>.
        </h1>
        <p className="mt-6 text-ink-500 font-medium text-lg leading-relaxed max-w-2xl">
          Foundations, components, bidirectional rules, and applied screens for an AI-powered language-learning web app. Three languages — English, Arabic, German — six CEFR levels, four skill modes, one system.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <a href="#foundations" className="inline-flex items-center gap-2 h-11 px-5 rounded-2xl bg-ink-900 text-white font-extrabold font-display text-sm hover:bg-ink-800">
            Start with foundations <I.arrowRight size={16}/>
          </a>
          <a href="#screens" className="inline-flex items-center gap-2 h-11 px-5 rounded-2xl bg-white border border-ink-200 text-ink-800 font-extrabold font-display text-sm hover:border-ink-300">
            Jump to applied screens
          </a>
        </div>

        {/* meta strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {[
            { v:'3', l:'Languages', I:I.globe },
            { v:'A1–C2', l:'CEFR levels', I:I.layers },
            { v:'4', l:'Skill modes', I:I.sparkles },
            { v:'Light + Dark', l:'Themes', I:I.shield },
          ].map((s,i)=>(
            <div key={i} className="rounded-2xl bg-white/80 backdrop-blur border border-ink-100 p-3.5 flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50 text-teal-600"><s.I size={17}/></span>
              <div>
                <div className="font-extrabold font-display text-ink-900 text-sm">{s.v}</div>
                <div className="text-[11px] text-ink-400 font-bold">{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* language identity strip at the right */}
        <div className="absolute end-8 top-12 hidden lg:flex flex-col gap-2">
          {['en','de','ar'].map(c=>(
            <span key={c} className="grid place-items-center rounded-2xl bg-white/80 border border-ink-100 p-2 shadow-soft" style={{ width:44, height:44 }}>
              <AppFlag code={c} size={26}/>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ---------- Side nav ---------- */
function SideNav({ active }){
  return (
    <nav className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto py-10 pe-3 border-e border-ink-100 bg-white/60 backdrop-blur">
      <div className="px-3 mb-4 flex items-center gap-2">
        <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white"><window.Icons.globe size={14}/></span>
        <span className="font-extrabold font-display text-ink-900 text-sm">LinguaAI</span>
        <span className="mono text-[10px] text-ink-400 mt-0.5">DS</span>
      </div>
      <ul className="text-[13px]">
        {NAV.map((item,i)=> item.kind==='h' ? (
          <li key={i} className="mt-5 mb-1.5 px-3 text-[10px] uppercase tracking-widest font-extrabold text-ink-400">{item.label}</li>
        ) : (
          <li key={i}>
            <a href={`#${item.id}`} className={appCx('block px-3 py-1.5 rounded-lg transition-colors',
              active===item.id?'bg-teal-50 text-teal-700 font-extrabold font-display':'text-ink-600 hover:bg-ink-50 hover:text-ink-900 font-semibold')}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Footer ---------- */
function Footer(){
  return (
    <footer className="border-t border-ink-100 py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-xl bg-teal-400 text-white"><window.Icons.globe size={16}/></span>
          <span className="font-extrabold font-display text-ink-900">LinguaAI Design System</span>
          <span className="mono text-xs text-ink-400 mt-0.5">v1.0</span>
        </div>
        <div className="text-xs text-ink-400 font-medium">
          Built with React · Tailwind · Inter · Cairo. All tokens map to <code className="mono bg-ink-100 text-ink-700 px-1.5 py-0.5 rounded">tailwind.config.js</code>.
        </div>
      </div>
    </footer>
  );
}

function App(){
  const [active,setActive] = appUseState('foundations');

  // observe sections for active nav state
  appUseEffect(()=>{
    const ids = NAV.filter(n=>!n.kind).map(n=>n.id);
    const els = ids.map(id=>document.getElementById(id)).filter(Boolean);
    if(!els.length) return;
    const io = new IntersectionObserver((entries)=>{
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(visible[0]) setActive(visible[0].target.id);
    },{ rootMargin:'-20% 0px -70% 0px', threshold:[0,.1,.5] });
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);

  return (
    <div className="min-h-screen text-ink-900">
      <Hero/>
      <div className="flex max-w-[1400px] mx-auto">
        <SideNav active={active}/>
        <div className="flex-1 min-w-0">
          <window.Foundations/>
          <window.Components/>
          <window.RTL/>
          <window.Screens/>
          <window.Motion/>
          <window.Layout/>
          <window.A11y/>
          <window.TailwindConfig/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
