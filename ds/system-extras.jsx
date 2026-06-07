// ds/system-extras.jsx → Motion, Layout, A11y, TailwindConfig
const { cx:xcx, Section:XSection, Sub:XSub, Frame:XFrame, Mono:XMono } = window.DS;
const { useState:xUseState, useEffect:xUseEffect, useRef:xUseRef } = React;

/* ================================================================
   MOTION
   ================================================================ */
const DURATIONS = [
  { tok:'duration-instant', ms:80,  use:'Toggles, segmented switches, hover affordance flips' },
  { tok:'duration-quick',   ms:150, use:'Default button hover, link underline, tooltip in/out' },
  { tok:'duration-base',    ms:240, use:'Card hover lift, modal/sheet entry, page transitions' },
  { tok:'duration-slow',    ms:400, use:'Reveal animations, streak/score reveals, confetti tail' },
  { tok:'duration-marquee', ms:1600, use:'Looping decorative motion (flame, pulse, rec dot)' },
];

const EASINGS = [
  { tok:'ease-out',      css:'cubic-bezier(.16, 1, .3, 1)',     use:'UI in — feels light, decelerates fast' },
  { tok:'ease-in-out',   css:'cubic-bezier(.65, 0, .35, 1)',     use:'Cross-fades, color transitions, reorders' },
  { tok:'ease-spring',   css:'cubic-bezier(.34, 1.56, .64, 1)',   use:'Confirmations — confetti, score pop' },
  { tok:'linear',        css:'linear',                          use:'Progress fills, scrubbers, looping motion' },
];

const PRINCIPLES = [
  { i:'sparkles',  t:'Reward, don\u2019t punish', d:'Celebrate correct answers (gentle pop, soft confetti). Never animate the wrong-answer state for more than 300ms — feedback should feel kind.' },
  { i:'bolt',      t:'Anticipate the next action',d:'When the AI is generating, animate forward — a shimmer, a pulse — so the learner knows progress is real.' },
  { i:'shield',    t:'Reduced motion is honoured',d:'All non-essential motion respects prefers-reduced-motion. Looping decorative animations stop; durations halve.' },
];

function PlayBox({ children, onClick, label }){
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4">
      <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">{label}</div>
      <div className="flex items-center justify-center min-h-[120px]">{children}</div>
      {onClick && <button onClick={onClick} className="mt-3 text-xs font-extrabold font-display text-teal-700 hover:text-teal-800 flex items-center gap-1"><window.Icons.refresh size={13}/> Replay</button>}
    </div>
  );
}

function PopDemo(){
  const [k,setK] = xUseState(0); const I = window.Icons;
  return (
    <PlayBox label="ease-spring · 350ms" onClick={()=>setK(k+1)}>
      <div key={k} className="grid place-items-center w-20 h-20 rounded-full bg-grass-500 text-white" style={{ animation:'fade-in .35s cubic-bezier(.34,1.56,.64,1) both, pop .35s cubic-bezier(.34,1.56,.64,1) both' }}>
        <I.check size={36} stroke={3}/>
      </div>
      <style>{`@keyframes pop{0%{transform:scale(.6)}70%{transform:scale(1.12)}100%{transform:scale(1)}}`}</style>
    </PlayBox>
  );
}

function FadeUpDemo(){
  const [k,setK] = xUseState(0);
  return (
    <PlayBox label="ease-out · 500ms" onClick={()=>setK(k+1)}>
      <div key={k} className="space-y-2 w-full">
        {[0,1,2].map(i=>(
          <div key={i} className="h-3.5 rounded-lg bg-ink-100" style={{ width:`${90-i*15}%`, animation:`fade-up .5s ${i*.08}s cubic-bezier(.16,1,.3,1) both` }}/>
        ))}
      </div>
    </PlayBox>
  );
}

function ShimmerDemo(){
  return (
    <PlayBox label="linear · 1.4s loop">
      <div className="space-y-2 w-full">
        {[0,1,2].map(i=>(
          <div key={i} className="skeleton h-3.5 rounded-lg" style={{ width:`${85-i*12}%` }}/>
        ))}
      </div>
    </PlayBox>
  );
}

function FlameDemo(){
  const I = window.Icons;
  return (
    <PlayBox label="ease-in-out · 1.6s loop">
      <span className="text-coral-500 animate-flame"><I.flame size={56}/></span>
    </PlayBox>
  );
}

function Motion(){
  return (
    <XSection id="motion" eyebrow="05 — Motion" label="Movement" title="Motion"
      lede="Motion sets the brand’s emotional tone: encouraging, decisive, never showy. Five durations and four easings cover everything — anything outside this set is a mistake.">

      {/* principles */}
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {PRINCIPLES.map((p,i)=>{
          const Ic = window.Icons[p.i];
          return (
            <div key={i} className="rounded-2xl bg-white border border-ink-100 p-5">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-coral-50 text-coral-500 mb-3"><Ic size={20}/></span>
              <div className="font-extrabold font-display text-ink-900">{p.t}</div>
              <p className="text-sm text-ink-500 font-medium mt-1.5 leading-relaxed">{p.d}</p>
            </div>
          );
        })}
      </div>

      <XSub id="motion-durations" title="Durations & easings">
        <div className="grid lg:grid-cols-2 gap-5">
          <XFrame label="Durations">
            {DURATIONS.map(d=>(
              <div key={d.tok} className="grid grid-cols-[160px_60px_1fr] items-center gap-3 py-2 border-b last:border-b-0 border-ink-100">
                <XMono>{d.tok}</XMono>
                <span className="text-sm font-extrabold font-display text-ink-900 tabular-nums">{d.ms}ms</span>
                <span className="text-xs text-ink-500 font-medium">{d.use}</span>
              </div>
            ))}
          </XFrame>
          <XFrame label="Easings">
            {EASINGS.map(e=>(
              <div key={e.tok} className="grid grid-cols-[140px_1fr] gap-3 py-2.5 border-b last:border-b-0 border-ink-100">
                <div>
                  <XMono>{e.tok}</XMono>
                  <div className="mono text-[11px] text-ink-400 mt-1.5">{e.css}</div>
                </div>
                <span className="text-xs text-ink-500 font-medium pt-1">{e.use}</span>
              </div>
            ))}
          </XFrame>
        </div>
      </XSub>

      <XSub id="motion-examples" title="Worked examples"
        lede="The four animations you'll see most often — built from the duration + easing tokens above.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <PopDemo/>
          <FadeUpDemo/>
          <ShimmerDemo/>
          <FlameDemo/>
        </div>
      </XSub>
    </XSection>
  );
}

/* ================================================================
   LAYOUT & GRID
   ================================================================ */
const BREAKPOINTS = [
  { tok:'sm', px:640,  label:'Phone (large)',  cols:4,  cont:'full', gut:16 },
  { tok:'md', px:768,  label:'Tablet',         cols:8,  cont:720,    gut:20 },
  { tok:'lg', px:1024, label:'Laptop',         cols:12, cont:960,    gut:24 },
  { tok:'xl', px:1280, label:'Desktop',        cols:12, cont:1152,   gut:24 },
  { tok:'2xl',px:1536, label:'Desktop · wide', cols:12, cont:1280,   gut:32 },
];

function GridRibbon({ cols }){
  return (
    <div className="grid gap-1.5 my-2" style={{ gridTemplateColumns:`repeat(${cols},minmax(0,1fr))` }}>
      {Array.from({length:cols}).map((_,i)=>(
        <div key={i} className="h-5 rounded bg-teal-100 border border-teal-200"/>
      ))}
    </div>
  );
}

function Layout(){
  const I = window.Icons;
  return (
    <XSection id="layout" eyebrow="06 — Layout" label="Grid" title="Layout & grid"
      lede="Mobile-first 4-column → 12-column responsive grid, with named container widths. Every page is a column subset of this grid — never one-off.">

      <XSub id="layout-grid" title="Responsive grid">
        <XFrame label="Breakpoints">
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr_1fr_1fr_1fr] gap-3 pb-3 mb-3 border-b border-ink-100 text-[11px] uppercase tracking-widest font-extrabold text-ink-500">
            <span>token</span><span>min width</span><span>cols</span><span>container</span><span>gutter</span>
          </div>
          {BREAKPOINTS.map(b=>(
            <div key={b.tok} className="grid grid-cols-1 sm:grid-cols-[120px_1fr_1fr_1fr_1fr] gap-3 items-center py-2 border-b last:border-b-0 border-ink-100">
              <div className="flex items-center gap-2">
                <XMono>{b.tok}:</XMono>
                <span className="text-[11px] text-ink-400 font-medium">{b.label}</span>
              </div>
              <span className="mono text-[12px] text-ink-700 font-bold">≥ {b.px}px</span>
              <span className="text-sm font-bold text-ink-700">{b.cols} cols</span>
              <span className="mono text-[12px] text-ink-500">{typeof b.cont==='number'?`${b.cont}px`:'fluid'}</span>
              <span className="mono text-[12px] text-ink-500">{b.gut}px</span>
            </div>
          ))}
        </XFrame>

        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          <XFrame label="Mobile · 4 columns" hint="< 768px">
            <GridRibbon cols={4}/>
            <div className="text-xs text-ink-500 font-medium mt-2">Lesson content spans the full width. Skill-mode cards stack 2×2.</div>
          </XFrame>
          <XFrame label="Desktop · 12 columns" hint="≥ 1024px">
            <GridRibbon cols={12}/>
            <div className="text-xs text-ink-500 font-medium mt-2">Hub uses 4×3-col cards. Reading uses an 8-col content well and a 4-col rail.</div>
          </XFrame>
        </div>
      </XSub>

      <XSub id="layout-patterns" title="Page-level patterns"
        lede="Three reusable scaffolds. Pick the one that matches the page's primary job.">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Focused — single column */}
          <XFrame label="Focused" hint="onboarding · paywall · single task">
            <div className="rounded-xl bg-ink-50 p-3 grid place-items-center min-h-[180px]">
              <div className="w-3/4 max-w-[280px] space-y-2">
                <div className="h-6 rounded-md bg-white border border-ink-200"/>
                <div className="h-12 rounded-xl bg-white border border-ink-200"/>
                <div className="h-12 rounded-xl bg-white border border-ink-200"/>
                <div className="h-9 rounded-xl bg-teal-400"/>
              </div>
            </div>
            <div className="text-xs text-ink-500 font-medium mt-2">Centered max-w 480-640px. One thing matters; everything else recedes.</div>
          </XFrame>

          {/* Hub — stacked cards */}
          <XFrame label="Hub" hint="skill hub · level select · roadmap">
            <div className="rounded-xl bg-ink-50 p-3 min-h-[180px]">
              <div className="h-4 w-2/3 rounded bg-white border border-ink-200 mb-3"/>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({length:4}).map((_,i)=>(
                  <div key={i} className="h-16 rounded-xl bg-white border border-ink-200"/>
                ))}
              </div>
            </div>
            <div className="text-xs text-ink-500 font-medium mt-2">Container max-w 1024px. Grid of equal-weight cards; user makes a choice.</div>
          </XFrame>

          {/* Workspace — two-column */}
          <XFrame label="Workspace" hint="reading · listening · writing">
            <div className="rounded-xl bg-ink-50 p-3 min-h-[180px] grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2">
                <div className="h-4 rounded bg-white border border-ink-200"/>
                <div className="h-24 rounded-xl bg-white border border-ink-200"/>
                <div className="h-9 rounded-xl bg-white border border-ink-200"/>
              </div>
              <div className="space-y-2">
                <div className="h-6 rounded bg-white border border-ink-200"/>
                <div className="h-9 rounded-xl bg-white border border-ink-200"/>
                <div className="h-9 rounded-xl bg-white border border-ink-200"/>
              </div>
            </div>
            <div className="text-xs text-ink-500 font-medium mt-2">Container max-w 1280px. 8-col content + 4-col rail (questions, transcript, info).</div>
          </XFrame>
        </div>
      </XSub>
    </XSection>
  );
}

/* ================================================================
   ACCESSIBILITY
   ================================================================ */
/* sRGB → relative luminance */
function relLum(hex){
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16)/255;
  const g = parseInt(h.slice(2,4),16)/255;
  const b = parseInt(h.slice(4,6),16)/255;
  const f = c => c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4);
  return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b);
}
function contrast(a,b){ const L1=relLum(a), L2=relLum(b); const [hi,lo] = L1>L2?[L1,L2]:[L2,L1]; return (hi+0.05)/(lo+0.05); }
function passLabel(ratio, large){
  if(ratio>=7) return { label:'AAA', cls:'bg-grass-500 text-white' };
  if(ratio>=4.5) return { label:'AA', cls:'bg-grass-500 text-white' };
  if(large && ratio>=3) return { label:'AA · large', cls:'bg-sun-500 text-ink-900' };
  return { label:'Fail', cls:'bg-rose-500 text-white' };
}

function ContrastRow({ fg, bg, label, size='body' }){
  const r = contrast(fg,bg);
  const p = passLabel(r, size==='large');
  return (
    <div className="grid grid-cols-[1fr_64px_44px] sm:grid-cols-[1.4fr_120px_64px_64px] items-center gap-3 py-2 border-b last:border-b-0 border-ink-100">
      <div className="flex items-center gap-2">
        <span className="rounded-lg" style={{ width:32, height:32, background:bg, boxShadow:`inset 0 0 0 1px rgba(0,0,0,.05)` }}/>
        <span className="rounded-lg" style={{ width:32, height:32, background:fg, boxShadow:`inset 0 0 0 1px rgba(0,0,0,.05)` }}/>
        <span className="text-xs text-ink-500 font-medium hidden sm:inline">{label}</span>
      </div>
      <div className="rounded-md px-2 py-1 text-[13px] font-bold font-display truncate hidden sm:block" style={{ background:bg, color:fg }}>Sample · مَرحَبًا</div>
      <span className="mono text-[12px] font-bold text-ink-700 tabular-nums">{r.toFixed(2)}:1</span>
      <span className={xcx('inline-flex items-center justify-center h-6 px-2 rounded-md text-[10px] font-extrabold font-display', p.cls)}>{p.label}</span>
    </div>
  );
}

function FocusDemo(){
  const I = window.Icons;
  return (
    <div className="rounded-2xl bg-white border border-ink-100 p-5">
      <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">Focus ring</div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="h-11 px-5 rounded-2xl bg-teal-400 text-white font-extrabold font-display text-[15px]"
          style={{ boxShadow:'0 0 0 4px rgba(79,205,196,.4), 0 8px 28px rgba(79,205,196,.35)' }}>
          Focused button
        </button>
        <div className="flex items-center gap-2 rounded-2xl bg-white border-2 border-teal-400 px-4 h-12" style={{ boxShadow:'0 0 0 4px rgba(79,205,196,.25)' }}>
          <I.pencil size={16} className="text-teal-500"/>
          <input className="flex-1 bg-transparent outline-none text-ink-900 font-semibold" defaultValue="Focused input"/>
        </div>
      </div>
      <p className="text-xs text-ink-500 font-medium mt-3">
        Every interactive element gets a visible 4px ring on keyboard focus, regardless of pointer state. The ring color is <XMono>--ring</XMono> at 40% opacity — never <XMono>outline:none</XMono> without a replacement.
      </p>
    </div>
  );
}

function TargetDemo(){
  return (
    <div className="rounded-2xl bg-white border border-ink-100 p-5">
      <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">Hit targets</div>
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 -m-2 rounded-2xl border-2 border-dashed border-teal-400/40"/>
          <button className="grid place-items-center w-11 h-11 rounded-xl bg-coral-400 text-white">
            <window.Icons.mic size={20}/>
          </button>
        </div>
        <div className="text-sm text-ink-700 font-medium leading-relaxed">
          Minimum <b>44×44px</b> hit area on every tap target. The dashed box shows the expanded tap region around the visible chip.
        </div>
      </div>
    </div>
  );
}

function A11y(){
  const I = window.Icons;
  return (
    <XSection id="a11y" eyebrow="07 — Access" label="Accessibility" title="Accessibility"
      lede="Color contrast, focus, hit targets, motion. Verified — not assumed. The pairings below are computed against the WCAG 2.1 formula.">

      <XSub id="a11y-contrast" title="Color contrast"
        lede="Every text-on-surface combination we ship is at least AA. Decorative chrome may sit at AA-large; never below.">
        <XFrame label="Light theme · text on surface">
          <ContrastRow fg="#0F1B2A" bg="#FFFFFF" label="ink-900 on surface"/>
          <ContrastRow fg="#64748B" bg="#FFFFFF" label="ink-500 muted on surface"/>
          <ContrastRow fg="#1B7B75" bg="#FFFFFF" label="teal-700 on surface (links)"/>
          <ContrastRow fg="#FFFFFF" bg="#4ECDC4" label="white on teal-400 button" size="large"/>
          <ContrastRow fg="#FFFFFF" bg="#F84785" label="white on coral-500 button"/>
          <ContrastRow fg="#15803D" bg="#ECFDF3" label="grass-700 on grass-50 (correct)"/>
          <ContrastRow fg="#B91C1C" bg="#FEF2F2" label="rose-700 on rose-50 (wrong)"/>
        </XFrame>
        <XFrame label="Dark theme · text on surface" className="mt-4">
          <ContrastRow fg="#E7EBF1" bg="#131C2E" label="text on dark surface"/>
          <ContrastRow fg="#94A3B0" bg="#131C2E" label="muted on dark surface"/>
          <ContrastRow fg="#5EE0D7" bg="#131C2E" label="teal on dark surface (link)"/>
          <ContrastRow fg="#0F1B2A" bg="#5EE0D7" label="ink-900 on teal-400 dark button"/>
          <ContrastRow fg="#FFFFFF" bg="#FF85B0" label="white on coral dark accent" size="large"/>
        </XFrame>
      </XSub>

      <XSub id="a11y-focus" title="Focus & hit targets">
        <div className="grid lg:grid-cols-2 gap-5">
          <FocusDemo/>
          <TargetDemo/>
        </div>
      </XSub>

      <XSub id="a11y-checklist" title="Per-component checklist"
        lede="What we verify before shipping any component.">
        <XFrame label="Definition of done">
          <ul className="space-y-3">
            {[
              ['Keyboard',         'Reachable by Tab; usable by Enter/Space; closes by Esc; arrow-key support where natural.'],
              ['Focus visible',    'Distinct 4px ring on focus-visible. Never relies on color alone.'],
              ['Screen reader',    'Semantic role; aria-label on icon-only buttons; aria-live for AI generation, results, and toasts.'],
              ['Contrast',         'AA for body text · AAA for body where feasible · AA-large allowed for decorative.'],
              ['Hit target',       '≥ 44×44px tappable region, even when the visible chip is smaller.'],
              ['Reduced motion',   'prefers-reduced-motion disables loops and halves duration of essential transitions.'],
              ['RTL',              'Renders identically when document.dir flips; logical properties only.'],
              ['State coverage',   'Default / hover / active / focus / disabled / loading / error all defined.'],
            ].map(([k,v])=>(
              <li key={k} className="grid grid-cols-[140px_1fr] gap-3 items-start">
                <span className="text-[12px] font-extrabold font-display text-ink-700 mt-0.5">{k}</span>
                <span className="text-sm text-ink-700 font-medium">{v}</span>
              </li>
            ))}
          </ul>
        </XFrame>
      </XSub>
    </XSection>
  );
}

/* ================================================================
   TAILWIND CONFIG (copyable)
   ================================================================ */
const TW_CONFIG = `// tailwind.config.js — LinguaAI design tokens, mapped 1:1 to the system above.
// Drop this into your app, then use the classes shown throughout the components catalog.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal:  { 50:'#EFFCFB',100:'#D4F6F3',200:'#AEEEEA',300:'#7BE2DC',400:'#4ECDC4',500:'#2FB8AE',600:'#1F9A92',700:'#1B7B75',800:'#1A625E',900:'#19514E' },
        coral: { 50:'#FFF1F6',100:'#FFE0EC',200:'#FFC2D9',300:'#FF9CBE',400:'#FF6B9D',500:'#F84785',600:'#E42168',700:'#BF1453',800:'#9E1448',900:'#85143F' },
        sun:   { 100:'#FFF4D6',400:'#FFD166',500:'#FBBF24' },
        ink:   { 50:'#F8FAFB',100:'#F1F4F6',200:'#E4E9EE',300:'#CBD4DC',400:'#94A3B0',500:'#64748B',600:'#475569',700:'#334155',800:'#1E293B',900:'#0F1B2A' },
        grass: { 50:'#ECFDF3',100:'#D1FADF',400:'#34D399',500:'#22C55E',600:'#16A34A',700:'#15803D' },
        rose:  { 50:'#FEF2F2',100:'#FEE2E2',400:'#F87171',500:'#EF4444',600:'#DC2626',700:'#B91C1C' },
        night: { 500:'#3A4660',600:'#2A3548',700:'#1B2638',800:'#131C2E',900:'#0A1220',950:'#070C16' },
      },
      fontFamily: {
        sans:    ['Inter','Plus Jakarta Sans','system-ui','sans-serif'],
        display: ['Plus Jakarta Sans','Inter','system-ui','sans-serif'],
        ar:      ['Cairo','Tajawal','sans-serif'],
        mono:    ['JetBrains Mono','ui-monospace','monospace'],
      },
      borderRadius: { '4xl':'2rem' },
      boxShadow: {
        soft:  '0 1px 2px rgba(16,24,40,.04), 0 4px 16px rgba(16,24,40,.06)',
        lift:  '0 2px 4px rgba(16,24,40,.05), 0 12px 32px rgba(16,24,40,.10)',
        glow:  '0 8px 28px rgba(79,205,196,.35)',
        coral: '0 8px 24px rgba(255,107,157,.35)',
        focus: '0 0 0 4px rgba(79,205,196,.40)',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(.16, 1, .3, 1)',
        'spring':   'cubic-bezier(.34, 1.56, .64, 1)',
      },
      transitionDuration: { '80':'80ms','150':'150ms','240':'240ms','400':'400ms','1600':'1600ms' },
      keyframes: {
        'fade-up': { '0%':{opacity:0,transform:'translateY(8px)'},'100%':{opacity:1,transform:'translateY(0)'} },
        'pop':     { '0%':{transform:'scale(.85)',opacity:0},'70%':{transform:'scale(1.04)'},'100%':{transform:'scale(1)',opacity:1} },
        'flame':   { '0%,100%':{transform:'scale(1) rotate(-2deg)'},'50%':{transform:'scale(1.07) rotate(2deg)'} },
        'shimmer': { '100%':{transform:'translateX(100%)'} },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.16,1,.3,1) both',
        'pop':     'pop .35s cubic-bezier(.34,1.56,.64,1) both',
        'flame':   'flame 1.6s ease-in-out infinite',
        'shimmer': 'shimmer 1.4s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

// styles/tokens.css — semantic tokens; the rest of the app reads these, not raw hex.
:root {
  --bg:         #F4F7F9;
  --surface:    #FFFFFF;
  --surface-2:  #F1F4F6;
  --border:     #E4E9EE;
  --text:       #0F1B2A;
  --text-muted: #64748B;
  --text-subtle:#94A3B0;
  --primary:    #4ECDC4;
  --accent:     #FF6B9D;
  --success:    #22C55E;
  --danger:     #EF4444;
  --ring:       rgba(79,205,196,.35);
}
[data-theme="dark"] {
  --bg:         #0A1220;
  --surface:    #131C2E;
  --surface-2:  #1B2638;
  --border:     #2A3548;
  --text:       #E7EBF1;
  --text-muted: #94A3B0;
  --text-subtle:#64748B;
  --primary:    #5EE0D7;
  --accent:     #FF85B0;
  --success:    #4ADE80;
  --danger:     #F87171;
  --ring:       rgba(94,224,215,.40);
}`;

function TailwindConfig(){
  const [copied,setCopied] = xUseState(false);
  const I = window.Icons;
  function copy(){
    navigator.clipboard.writeText(TW_CONFIG).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),1500); });
  }
  return (
    <XSection id="export" eyebrow="08 — Export" label="Tokens" title="Tailwind config"
      lede="Drop this into a fresh React + Tailwind project and every class used in this guide is yours. Semantic tokens live in CSS variables so theme swaps are one attribute.">
      <XFrame label="tailwind.config.js + tokens.css" hint="copy & paste">
        <div className="relative">
          <button onClick={copy} className={xcx('absolute top-3 end-3 inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-extrabold font-display border transition-colors',
            copied?'bg-grass-50 border-grass-300 text-grass-700':'bg-white border-ink-200 text-ink-700 hover:border-ink-300')}>
            {copied?<><I.check size={14}/> Copied</>:<><I.doc size={14}/> Copy</>}
          </button>
          <pre className="mono text-[12px] leading-relaxed text-ink-100 bg-ink-900 rounded-2xl p-5 overflow-x-auto whitespace-pre">{TW_CONFIG}</pre>
        </div>
      </XFrame>
    </XSection>
  );
}

window.Motion = Motion;
window.Layout = Layout;
window.A11y = A11y;
window.TailwindConfig = TailwindConfig;
