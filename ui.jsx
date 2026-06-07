// ui.jsx — shared primitives & helpers → window.UI
const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;
const I = window.Icons;

const cx = (...a) => a.filter(Boolean).join(' ');

/* ---------- App context (UI language, target language) ---------- */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);
// i18n string getter bound to current UI language
function useT() {
  const { uiLang } = useApp();
  return window.DATA.STR[uiLang] || window.DATA.STR.en;
}

/* ---------- Button ---------- */
function Button({ variant='primary', size='md', icon:Icon, iconRight:IconR, full, className='', children, loading, ...rest }) {
  const sizes = {
    sm:'h-9 px-3.5 text-sm gap-1.5 rounded-xl',
    md:'h-11 px-5 text-[15px] gap-2 rounded-2xl',
    lg:'h-14 px-7 text-base gap-2.5 rounded-2xl',
  };
  const variants = {
    primary:'bg-teal-400 text-white shadow-glow hover:bg-teal-500 hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft',
    coral:'bg-coral-400 text-white shadow-coral hover:bg-coral-500 hover:-translate-y-0.5 active:translate-y-0',
    dark:'bg-ink-900 text-white hover:bg-ink-800 hover:-translate-y-0.5 active:translate-y-0',
    soft:'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100',
    ghost:'bg-transparent text-ink-700 hover:bg-ink-100',
    outline:'bg-white text-ink-800 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 shadow-soft',
    danger:'bg-rose-500 text-white hover:bg-rose-600',
  };
  return (
    <button className={cx('relative inline-flex items-center justify-center font-semibold font-display select-none transition-all duration-150 disabled:opacity-45 disabled:pointer-events-none whitespace-nowrap',
      sizes[size], variants[variant], full&&'w-full', className)} disabled={loading||rest.disabled} {...rest}>
      {loading && <span className="absolute inline-flex"><Spinner/></span>}
      <span className={cx('inline-flex items-center', size==='lg'?'gap-2.5':'gap-2', loading&&'opacity-0')}>
        {Icon && <Icon size={size==='lg'?20:18}/>}
        {children}
        {IconR && <IconR size={size==='lg'?20:18}/>}
      </span>
    </button>
  );
}

function Spinner({ size=18, className='' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={cx('animate-spin',className)} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".2"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

/* ---------- Card ---------- */
function Card({ className='', children, pad=true, hover=false, ...rest }) {
  return (
    <div className={cx('bg-white rounded-3xl border border-ink-100 shadow-soft', pad&&'p-6',
      hover&&'transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5', className)} {...rest}>
      {children}
    </div>
  );
}

/* ---------- Badge / Pill ---------- */
function Badge({ children, color='ink', className='' }) {
  const c = {
    ink:'bg-ink-100 text-ink-600', teal:'bg-teal-50 text-teal-700', coral:'bg-coral-50 text-coral-600',
    grass:'bg-grass-50 text-grass-700', sun:'bg-sun-100 text-amber-700', rose:'bg-rose-50 text-rose-600',
    white:'bg-white/80 text-ink-700 backdrop-blur',
  }[color];
  return <span className={cx('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-display tracking-wide', c, className)}>{children}</span>;
}

function LevelChip({ level, active, className='' }) {
  return <span className={cx('inline-flex items-center justify-center h-7 min-w-[2.4rem] px-2 rounded-lg text-xs font-extrabold font-display',
    active?'bg-teal-400 text-white':'bg-ink-100 text-ink-500', className)}>{level}</span>;
}

/* ---------- Inline SVG flags (robust across OSes) ---------- */
function FlagSVG({ code, size=28 }) {
  const r = size*0.16;
  const clip = `flagclip-${code}`;
  if (code==='de') return (
    <svg width={size} height={size*0.72} viewBox="0 0 30 22"><defs><clipPath id={clip}><rect width="30" height="22" rx={r} ry={r}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="30" height="7.34" fill="#1A1A1A"/><rect y="7.34" width="30" height="7.34" fill="#DD0000"/><rect y="14.66" width="30" height="7.34" fill="#FFCE00"/>
      </g></svg>);
  if (code==='en') return (
    <svg width={size} height={size*0.72} viewBox="0 0 30 22"><defs><clipPath id={clip}><rect width="30" height="22" rx={r} ry={r}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="30" height="22" fill="#012169"/>
        <path d="M0 0 30 22 M30 0 0 22" stroke="#fff" strokeWidth="4.4"/>
        <path d="M0 0 30 22 M30 0 0 22" stroke="#C8102E" strokeWidth="2.4"/>
        <path d="M15 0V22 M0 11H30" stroke="#fff" strokeWidth="7"/>
        <path d="M15 0V22 M0 11H30" stroke="#C8102E" strokeWidth="4"/>
      </g></svg>);
  // Arabic — green field with white 'ض' (the letter that symbolises the Arabic language)
  return (
    <svg width={size} height={size*0.72} viewBox="0 0 30 22"><defs><clipPath id={clip}><rect width="30" height="22" rx={r} ry={r}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="30" height="22" fill="#0B7A4B"/>
        <text x="15" y="16.5" textAnchor="middle" fontFamily="Cairo,Tajawal,sans-serif" fontSize="15" fontWeight="700" fill="#fff">ض</text>
      </g></svg>);
}

function FlagTile({ lang, size=44, className='' }) {
  return (
    <span className={cx('inline-flex items-center justify-center rounded-2xl shrink-0', className)}
      style={{ width:size, height:size, background:lang.tintBg||'#F1F4F6',
        boxShadow:`inset 0 0 0 1.5px ${lang.tintRing||'#E4E9EE'}` }}>
      <FlagSVG code={lang.code} size={size*0.62}/>
    </span>
  );
}

/* ---------- Progress ring (SVG) ---------- */
function ProgressRing({ value=0, size=132, stroke=12, color='#4ECDC4', track='#EDF1F4', children }) {
  const r = (size-stroke)/2, circ = 2*Math.PI*r, off = circ*(1-Math.min(1,value));
  return (
    <div className="relative inline-grid place-items-center" style={{ width:size, height:size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition:'stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)' }}/>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* ---------- Linear progress ---------- */
function ProgressBar({ value=0, color='#4ECDC4', track='#EDF1F4', h=8, className='' }) {
  return (
    <div className={cx('w-full rounded-full overflow-hidden', className)} style={{ height:h, background:track }}>
      <div className="h-full rounded-full" style={{ width:`${Math.min(100,value*100)}%`, background:color,
        transition:'width .6s cubic-bezier(.16,1,.3,1)' }}/>
    </div>
  );
}

/* ---------- Segmented control ---------- */
function Segmented({ options, value, onChange, size='md', className='' }) {
  const h = size==='sm'?'h-9 text-[13px]':'h-11 text-sm';
  return (
    <div className={cx('inline-flex p-1 bg-ink-100 rounded-2xl', className)}>
      {options.map(o => (
        <button key={o.value} onClick={()=>onChange(o.value)}
          className={cx('inline-flex items-center gap-1.5 px-3.5 rounded-xl font-semibold font-display transition-all', h,
            value===o.value?'bg-white text-ink-900 shadow-soft':'text-ink-500 hover:text-ink-700')}>
          {o.icon} {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Streak flame ---------- */
function StreakFlame({ count, size=20, lit=true }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-extrabold font-display">
      <span className={cx('inline-grid place-items-center rounded-full', lit?'text-coral-400 animate-flame':'text-ink-300')}>
        <I.flame size={size}/>
      </span>
      <span className={lit?'text-ink-900':'text-ink-400'}>{count}</span>
    </span>
  );
}

/* ---------- Avatar ---------- */
function Avatar({ name='Layla N.', size=44, src }) {
  const initials = name.split(' ').map(w=>w[0]).slice(0,2).join('');
  return (
    <span className="inline-grid place-items-center rounded-full font-extrabold font-display text-white shrink-0"
      style={{ width:size, height:size, fontSize:size*0.36,
        background:'linear-gradient(135deg,#4ECDC4,#7C8CF8)' }}>
      {src ? <img src={src} className="w-full h-full rounded-full object-cover" alt=""/> : initials}
    </span>
  );
}

/* ---------- Skeleton ---------- */
function Skeleton({ className='', rounded='rounded-xl' }) { return <div className={cx('skeleton', rounded, className)}/>; }

/* ---------- Bidi text: render content in the LANGUAGE-BEING-LEARNED direction ---------- */
function Learned({ dir, lang, className='', as:Tag='span', children, ...rest }) {
  const isRtl = dir==='rtl' || lang==='ar';
  return <Tag dir={isRtl?'rtl':'ltr'} className={cx(isRtl?'font-ar':'', className)} {...rest}>{children}</Tag>;
}

/* ---------- Confetti burst ---------- */
function Confetti({ fire }) {
  const [bits, setBits] = useState([]);
  useEffect(()=>{
    if(!fire) return;
    const cols=['#4ECDC4','#FF6B9D','#FFD166','#7C8CF8','#34D399'];
    setBits(Array.from({length:42},(_,i)=>({ id:i+'-'+fire, x:50+(Math.random()*60-30),
      c:cols[i%cols.length], d:Math.random()*.25, s:6+Math.random()*7, r:Math.random()*360 })));
    const t=setTimeout(()=>setBits([]),1400); return ()=>clearTimeout(t);
  },[fire]);
  if(!bits.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {bits.map(b=>(
        <span key={b.id} style={{ position:'absolute', left:b.x+'%', top:'60%', width:b.s, height:b.s*0.6,
          background:b.c, borderRadius:2, transform:`rotate(${b.r}deg)`,
          animation:`rise 1.2s ${b.d}s cubic-bezier(.2,.6,.3,1) forwards` }}/>
      ))}
    </div>
  );
}

/* ---------- Toast ---------- */
function Toast({ show, children, color='ink' }) {
  const c = { ink:'bg-ink-900 text-white', grass:'bg-grass-600 text-white', coral:'bg-coral-500 text-white' }[color];
  return (
    <div className={cx('fixed left-1/2 -translate-x-1/2 bottom-8 z-[70] transition-all duration-300',
      show?'opacity-100 translate-y-0':'opacity-0 translate-y-4 pointer-events-none')}>
      <div className={cx('px-5 py-3 rounded-2xl shadow-lift text-sm font-semibold font-display flex items-center gap-2', c)}>{children}</div>
    </div>
  );
}

window.UI = { cx, AppCtx, useApp, useT, Button, Spinner, Card, Badge, LevelChip, FlagTile, FlagSVG,
  ProgressRing, ProgressBar, Segmented, StreakFlame, Avatar, Skeleton, Learned, Confetti, Toast };
