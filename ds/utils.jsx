// ds/utils.jsx — shared style-guide primitives → window.DS
const { useState:dsUseState, useEffect:dsUseEffect, useRef:dsUseRef } = React;
const dsCx = (...a)=>a.filter(Boolean).join(' ');

/* ---------- Layout / typography ---------- */
function Section({ id, label, eyebrow, title, lede, children }){
  return (
    <section id={id} className="py-16 sm:py-20 border-t border-ink-100 first:border-t-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="mono text-ink-400 font-semibold tracking-widest text-xs uppercase">{eyebrow}</span>
            <span className="h-px flex-1 bg-ink-200"/>
            <span className="mono text-ink-300 text-xs">{label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">{title}</h2>
          {lede && <p className="mt-3 text-ink-500 font-medium text-[17px] leading-relaxed max-w-2xl text-balance">{lede}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Sub({ title, lede, children, id }){
  return (
    <div id={id} className="mt-14 first:mt-0">
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="text-lg sm:text-xl font-extrabold font-display text-ink-900 tracking-tight">{title}</h3>
      </div>
      {lede && <p className="text-sm text-ink-500 font-medium mb-4 max-w-2xl">{lede}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

/* labeled white card that holds a worked example */
function Frame({ label, hint, children, dark, className='', pad=true }){
  return (
    <div className={dsCx('relative rounded-3xl border', dark?'bg-night-900 border-night-700':'bg-white border-ink-100', 'shadow-soft', className)}>
      {(label||hint) && (
        <div className={dsCx('flex items-center justify-between px-4 sm:px-5 py-2.5 border-b', dark?'border-night-700':'border-ink-100')}>
          {label && <span className={dsCx('text-[11px] uppercase tracking-widest font-extrabold font-display', dark?'text-ink-400':'text-ink-500')}>{label}</span>}
          {hint && <span className={dsCx('mono text-[11px]', dark?'text-ink-400':'text-ink-300')}>{hint}</span>}
        </div>
      )}
      <div className={pad?'p-5 sm:p-6':''}>{children}</div>
    </div>
  );
}

/* ---------- Token displays ---------- */
function Swatch({ color, name, value, contrast, big, dark, role }){
  return (
    <div className={dsCx('rounded-2xl p-3.5 flex flex-col gap-3 border', dark?'bg-night-800 border-night-700':'bg-white border-ink-100')}>
      <div className="relative rounded-xl overflow-hidden" style={{ background:color, height: big?96:64,
        boxShadow:'inset 0 0 0 1px rgba(0,0,0,.04)' }}>
        {contrast && <span className="absolute top-2 end-2 mono text-[10px] px-1.5 py-0.5 rounded-md"
          style={{ background:'rgba(255,255,255,.85)', color:'#0F1B2A' }}>{contrast}</span>}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className={dsCx('text-[12px] font-bold font-display', dark?'text-white':'text-ink-900')}>{name}</span>
          {role && <span className={dsCx('mono text-[10px]', dark?'text-ink-400':'text-ink-400')}>{role}</span>}
        </div>
        <span className={dsCx('mono text-[11px]', dark?'text-ink-400':'text-ink-500')}>{value}</span>
      </div>
    </div>
  );
}

function TokenRow({ swatch, name, value, hint, dark }){
  return (
    <div className={dsCx('grid grid-cols-[56px_1fr_auto] sm:grid-cols-[56px_1fr_1fr_auto] items-center gap-3 sm:gap-5 py-2.5 border-b last:border-b-0',
      dark?'border-night-700':'border-ink-100')}>
      <div className="rounded-lg w-12 h-10 sm:w-14 sm:h-10" style={swatch}/>
      <span className={dsCx('text-sm font-bold font-display', dark?'text-white':'text-ink-900')}>{name}</span>
      <span className={dsCx('mono text-[12px] hidden sm:inline', dark?'text-ink-400':'text-ink-500')}>{value}</span>
      <span className={dsCx('mono text-[11px] text-end', dark?'text-ink-400':'text-ink-400')}>{hint}</span>
    </div>
  );
}

/* code/mono chip */
function Mono({ children, className='', dark }){
  return <code className={dsCx('mono text-[12px] px-1.5 py-0.5 rounded-md', dark?'bg-night-700 text-ink-200':'bg-ink-100 text-ink-700', className)}>{children}</code>;
}

/* Inline flag (reused) */
function DSFlag({ code, size=28 }) {
  const r = size*0.16, clip=`dsflag-${code}-${size}`;
  if (code==='de') return (
    <svg width={size} height={size*0.72} viewBox="0 0 30 22"><defs><clipPath id={clip}><rect width="30" height="22" rx={r} ry={r}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}><rect width="30" height="7.34" fill="#1A1A1A"/><rect y="7.34" width="30" height="7.34" fill="#DD0000"/><rect y="14.66" width="30" height="7.34" fill="#FFCE00"/></g></svg>);
  if (code==='en') return (
    <svg width={size} height={size*0.72} viewBox="0 0 30 22"><defs><clipPath id={clip}><rect width="30" height="22" rx={r} ry={r}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="30" height="22" fill="#012169"/>
        <path d="M0 0 30 22 M30 0 0 22" stroke="#fff" strokeWidth="4.4"/>
        <path d="M0 0 30 22 M30 0 0 22" stroke="#C8102E" strokeWidth="2.4"/>
        <path d="M15 0V22 M0 11H30" stroke="#fff" strokeWidth="7"/>
        <path d="M15 0V22 M0 11H30" stroke="#C8102E" strokeWidth="4"/>
      </g></svg>);
  return (
    <svg width={size} height={size*0.72} viewBox="0 0 30 22"><defs><clipPath id={clip}><rect width="30" height="22" rx={r} ry={r}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="30" height="22" fill="#0B7A4B"/>
        <text x="15" y="16.5" textAnchor="middle" fontFamily="Cairo,Tajawal,sans-serif" fontSize="15" fontWeight="700" fill="#fff">ض</text>
      </g></svg>);
}

window.DS = { cx:dsCx, Section, Sub, Frame, Swatch, TokenRow, Mono, DSFlag };
