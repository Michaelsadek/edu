// ds/components.jsx → window.Components
const { cx:ccx, Section:CSection, Sub:CSub, Frame:CFrame, Mono:CMono, DSFlag:CFlag } = window.DS;
const { useState:cUseState, useEffect:cUseEffect, useRef:cUseRef } = React;

/* ============================================================
   Buttons
   ============================================================ */
function DSButton({ variant='primary', size='md', icon:Icon, iconRight:IconR, full, className='', children, loading, disabled, ...rest }) {
  const sizes = {
    sm:'h-9 px-3.5 text-sm rounded-xl',
    md:'h-11 px-5 text-[15px] rounded-2xl',
    lg:'h-14 px-7 text-base rounded-2xl',
  };
  const variants = {
    primary:'bg-teal-400 text-white shadow-glow hover:bg-teal-500 hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft',
    secondary:'bg-white text-ink-800 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 shadow-soft',
    ghost:'bg-transparent text-ink-700 hover:bg-ink-100',
    destructive:'bg-rose-500 text-white hover:bg-rose-600',
    accent:'bg-coral-400 text-white shadow-coral hover:bg-coral-500 hover:-translate-y-0.5',
  };
  return (
    <button className={ccx('relative inline-flex items-center justify-center gap-2 font-semibold font-display select-none transition-all duration-150 whitespace-nowrap',
      sizes[size], variants[variant], full&&'w-full', (disabled||loading)&&'opacity-45 pointer-events-none', className)}
      disabled={disabled||loading} {...rest}>
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" className="animate-spin" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".2"/>
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </span>
      )}
      <span className={ccx('inline-flex items-center', size==='lg'?'gap-2.5':'gap-2', loading&&'opacity-0')}>
        {Icon && <Icon size={size==='lg'?20:18}/>}
        {children}
        {IconR && <IconR size={size==='lg'?20:18}/>}
      </span>
    </button>
  );
}

function ButtonRow({ label, children }){
  return (
    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] items-center gap-4 py-3 border-b last:border-b-0 border-ink-100">
      <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500">{label}</div>
      <div className="flex flex-wrap items-center gap-2.5">{children}</div>
    </div>
  );
}

function ButtonsSection(){
  const I = window.Icons;
  return (
    <CFrame label="Buttons" hint="primary · secondary · ghost · destructive · accent">
      <ButtonRow label="Primary">
        <DSButton>Start lesson</DSButton>
        <DSButton className="!bg-teal-500 !-translate-y-0.5 !shadow-glow">Hover</DSButton>
        <DSButton className="!bg-teal-600 !shadow-soft">Active</DSButton>
        <DSButton disabled>Disabled</DSButton>
        <DSButton loading>Loading</DSButton>
        <DSButton icon={I.bolt} iconRight={I.arrowRight}>With icons</DSButton>
      </ButtonRow>
      <ButtonRow label="Secondary">
        <DSButton variant="secondary">Cancel</DSButton>
        <DSButton variant="secondary" className="!bg-ink-50 !border-ink-300">Hover</DSButton>
        <DSButton variant="secondary" disabled>Disabled</DSButton>
        <DSButton variant="secondary" icon={I.arrowLeft}>Back</DSButton>
      </ButtonRow>
      <ButtonRow label="Ghost">
        <DSButton variant="ghost">Skip</DSButton>
        <DSButton variant="ghost" className="!bg-ink-100">Hover</DSButton>
        <DSButton variant="ghost" disabled>Disabled</DSButton>
        <DSButton variant="ghost" icon={I.x}>Close</DSButton>
      </ButtonRow>
      <ButtonRow label="Destructive">
        <DSButton variant="destructive">Delete</DSButton>
        <DSButton variant="destructive" className="!bg-rose-600">Hover</DSButton>
        <DSButton variant="destructive" loading>Deleting</DSButton>
      </ButtonRow>
      <ButtonRow label="Accent">
        <DSButton variant="accent">Upgrade</DSButton>
        <DSButton variant="accent" iconRight={I.arrowRight}>Continue</DSButton>
      </ButtonRow>
      <ButtonRow label="Sizes">
        <DSButton size="sm">Small</DSButton>
        <DSButton size="md">Medium</DSButton>
        <DSButton size="lg">Large</DSButton>
      </ButtonRow>
    </CFrame>
  );
}

/* ============================================================
   Cards
   ============================================================ */
function LevelCardEx({ id, label, accent, selected, onClick }){
  return (
    <button onClick={onClick}
      className={ccx('relative rounded-3xl p-5 text-start bg-white transition-all',
        selected?'shadow-lift -translate-y-0.5':'border-2 border-ink-200 hover:border-ink-300 hover:shadow-soft')}
      style={selected?{ borderColor:'transparent', boxShadow:`0 0 0 2.5px ${accent}, 0 12px 32px rgba(16,24,40,.10)` }:{}}>
      {selected && (
        <span className="absolute -top-2 -end-2 grid place-items-center w-9 h-9 rounded-2xl text-white" style={{ background:accent }}>
          {window.Icons.check({size:18,stroke:3})}
        </span>
      )}
      <div className="flex items-baseline gap-2"><span className="text-3xl font-extrabold font-display text-ink-900">{id}</span><span className="text-sm font-bold text-ink-500">· {label}</span></div>
      <div className="mt-3 flex items-center gap-1">{['A1','A2','B1','B2','C1','C2'].map((l,i)=>{
        const cur=['A1','A2','B1','B2','C1','C2'].indexOf(id);
        return <span key={l} className="h-1.5 flex-1 rounded-full" style={{ background: i<=cur?accent:'#E4E9EE' }}/>;
      })}</div>
    </button>
  );
}

function SkillCardEx({ tint, tintBg, tintRing, icon:Icon, title, desc, locked }){
  const I = window.Icons;
  return (
    <div className="group relative rounded-3xl p-5 sm:p-6 bg-white border border-ink-100 shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all">
      <div className="flex items-start justify-between">
        <span className="grid place-items-center w-14 h-14 rounded-2xl" style={{ background:tintBg, color:tint, boxShadow:`inset 0 0 0 1.5px ${tintRing}` }}><Icon size={28}/></span>
        {locked && <span className="grid place-items-center w-8 h-8 rounded-xl bg-ink-100 text-ink-400"><I.lock size={14}/></span>}
      </div>
      <h4 className="mt-4 text-xl font-extrabold font-display text-ink-900">{title}</h4>
      <p className="text-sm text-ink-500 font-medium mt-1 leading-relaxed">{desc}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold font-display" style={{ color:tint }}>
        Start <I.arrowRight size={15}/>
      </span>
    </div>
  );
}

function CardsSection(){
  const I = window.Icons;
  return (
    <CFrame label="Cards" hint="level · skill · content · plan">
      {/* Level cards */}
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">Level cards · selectable</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <LevelCardEx id="A1" label="Beginner" accent="#4ECDC4"/>
          <LevelCardEx id="A2" label="Elementary" accent="#7C8CF8" selected/>
          <LevelCardEx id="B1" label="Intermediate" accent="#FBBF24"/>
        </div>
      </div>
      {/* Skill cards */}
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">Skill-mode cards</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <SkillCardEx tint="#4ECDC4" tintBg="#EFFCFB" tintRing="#AEEEEA" icon={I.book} title="Reading" desc="Read an AI-generated passage at your level"/>
          <SkillCardEx tint="#FF6B9D" tintBg="#FFF1F6" tintRing="#FFC2D9" icon={I.mic}  title="Speaking" desc="Read aloud and get pronunciation feedback" locked/>
        </div>
      </div>
      {/* Content card */}
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">Content card</div>
        <div className="bg-white border border-ink-100 rounded-3xl p-5 shadow-soft relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-400 to-indigo-400"/>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold font-display px-2 py-1 rounded-md bg-ink-100 text-ink-600">EVERYDAY LIFE</span>
            <span className="text-[11px] font-bold text-ink-400 inline-flex items-center gap-1"><I.clock size={12}/> 1 min read</span>
          </div>
          <h4 className="text-xl font-extrabold font-display text-ink-900 mb-2">A Morning at the Café</h4>
          <p className="text-ink-700 text-[15px] leading-relaxed">Sami goes to the café every morning. He sits at a table by the window and orders a coffee with milk.</p>
        </div>
      </div>
      {/* Plan card */}
      <div>
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">Plan card · selected state</div>
        <div className="bg-white border border-ink-100 rounded-3xl shadow-soft p-5 relative overflow-hidden max-w-md">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-400 via-indigo-400 to-coral-400"/>
          <div className="inline-flex p-1 bg-ink-100 rounded-2xl mb-4">
            <span className="px-3 h-9 grid place-items-center text-sm font-bold text-ink-500">Monthly</span>
            <span className="px-3 h-9 grid place-items-center text-sm font-extrabold rounded-xl bg-white shadow-soft text-ink-900">Annual</span>
          </div>
          <div className="flex items-baseline gap-1.5"><span className="text-5xl font-extrabold font-display text-ink-900">$8.25</span><span className="text-ink-400 font-bold">/month</span></div>
          <div className="text-sm text-ink-500 font-medium mt-1">billed annually · <span className="text-grass-600 font-extrabold">Save 36%</span></div>
          <DSButton variant="accent" full size="lg" className="mt-4" icon={I.bolt}>Start subscription</DSButton>
        </div>
      </div>
    </CFrame>
  );
}

/* ============================================================
   Inputs (text input, textarea + word count, MCQ, fill-in-blank)
   ============================================================ */
function InputsSection(){
  const I = window.Icons;
  const [text,setText] = cUseState('I wake up at six. I drink a coffee and go to work.');
  const wc = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <CFrame label="Inputs" hint="text · text-editor · MCQ · fill-blank">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* basic input */}
        <div>
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">Text input · states</div>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-extrabold font-display text-ink-600 mb-1.5 block">Default</span>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-ink-200 bg-white px-4 h-12">
                <I.pencil size={16} className="text-ink-300"/>
                <input className="flex-1 bg-transparent outline-none text-ink-900 font-semibold placeholder:text-ink-300" placeholder="Type something…"/>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-extrabold font-display text-ink-600 mb-1.5 block">Focused</span>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-teal-400 bg-white px-4 h-12" style={{ boxShadow:'0 0 0 4px rgba(79,205,196,.25)' }}>
                <I.pencil size={16} className="text-teal-500"/>
                <input className="flex-1 bg-transparent outline-none text-ink-900 font-semibold" defaultValue="Layla"/>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-extrabold font-display text-grass-600 mb-1.5 block">Success · validated</span>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-grass-400 bg-grass-50 px-4 h-12">
                <input className="flex-1 bg-transparent outline-none text-ink-900 font-semibold" defaultValue="trinke"/>
                <I.checkCircle size={20} className="text-grass-500"/>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-extrabold font-display text-rose-600 mb-1.5 block">Error</span>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-rose-400 bg-rose-50 px-4 h-12">
                <input className="flex-1 bg-transparent outline-none text-ink-900 font-semibold" defaultValue="drinkt"/>
                <I.xCircle size={20} className="text-rose-500"/>
              </div>
              <span className="mono text-[11px] text-rose-600 mt-1 block">Verb form mismatched — try “trinke” (ich-form)</span>
            </label>
            <label className="block">
              <span className="text-xs font-extrabold font-display text-ink-400 mb-1.5 block">Disabled</span>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-ink-200 bg-ink-100 px-4 h-12 opacity-60">
                <input disabled className="flex-1 bg-transparent outline-none text-ink-500 font-semibold" defaultValue="—"/>
              </div>
            </label>
          </div>
        </div>

        {/* textarea + word count */}
        <div>
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">Text editor · word count</div>
          <div className="bg-white border border-ink-100 rounded-2xl p-3.5">
            <textarea value={text} onChange={e=>setText(e.target.value)} rows={7}
              className="w-full p-3 rounded-xl bg-ink-50 outline-none text-ink-900 font-medium resize-none focus:bg-white focus:ring-2 focus:ring-teal-200 focus:border-teal-400 border-2 border-transparent"/>
            <div className="mt-2.5 flex items-center justify-between text-sm font-bold">
              <span className={ccx('inline-flex items-center gap-1.5', wc>=60?'text-grass-600':'text-ink-500')}>
                <I.list size={15}/> {wc} words
              </span>
              <span className="text-ink-400">min 60</span>
            </div>
          </div>
        </div>

        {/* MCQ */}
        <div>
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">MCQ option · states</div>
          <div className="space-y-2">
            <McqRow letter="A" text="By the door" state="idle"/>
            <McqRow letter="B" text="By the window" state="selected"/>
            <McqRow letter="C" text="Outside" state="correct"/>
            <McqRow letter="D" text="At the counter" state="wrong"/>
            <McqRow letter="E" text="Disabled choice" state="disabled"/>
          </div>
        </div>

        {/* Fill in blank */}
        <div>
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">Fill-in-blank</div>
          <div className="space-y-3">
            <div className="rounded-2xl border-2 border-teal-400 bg-white p-3.5" style={{ boxShadow:'0 0 0 4px rgba(79,205,196,.25)' }}>
              <div className="text-[15px] font-bold text-ink-700 mb-2">Ich <span className="inline-block min-w-[80px] mx-1"><input className="w-full text-center bg-teal-50 border-2 border-teal-400 rounded-lg h-9 outline-none text-teal-700 font-extrabold font-display" defaultValue="trinke"/></span> Kaffee.</div>
              <div className="text-[11px] text-ink-400 font-medium flex items-center gap-1"><I.sparkles size={12}/> Hint: verb is “trinken”, ich-form</div>
            </div>
            <div className="rounded-2xl border-2 border-grass-400 bg-grass-50 p-3.5">
              <div dir="rtl" className="font-ar text-xl font-bold text-ink-800 leading-loose">نحن <span className="inline-block mx-1"><span className="px-2 py-0.5 bg-grass-100 border-2 border-grass-400 rounded-lg text-grass-700">نشرب</span></span> القهوة.</div>
              <div className="mt-1.5 text-[12px] font-extrabold text-grass-700 flex items-center gap-1"><I.checkCircle size={13}/> Correct</div>
            </div>
          </div>
        </div>
      </div>
    </CFrame>
  );
}

function McqRow({ letter, text, state }){
  const I = window.Icons;
  const cfg = {
    idle:     { cls:'border-ink-200 bg-white',                      pillBg:'bg-ink-100 text-ink-500',                   mark:null },
    selected: { cls:'border-teal-400 bg-teal-50 ring-2 ring-teal-200', pillBg:'bg-teal-400 text-white',                  mark:null },
    correct:  { cls:'border-grass-400 bg-grass-50',                 pillBg:'bg-grass-500 text-white',                    mark:<I.checkCircle size={20} className="text-grass-500"/> },
    wrong:    { cls:'border-rose-400 bg-rose-50',                   pillBg:'bg-rose-500 text-white',                     mark:<I.xCircle size={20} className="text-rose-500"/> },
    disabled: { cls:'border-ink-200 opacity-55',                    pillBg:'bg-ink-100 text-ink-300',                    mark:null },
  }[state] || {};
  return (
    <div className={ccx('flex items-center gap-3 p-3.5 rounded-2xl border-2', cfg.cls)}>
      <span className={ccx('grid place-items-center w-7 h-7 rounded-lg text-xs font-extrabold font-display', cfg.pillBg)}>{letter}</span>
      <span className="flex-1 font-semibold text-ink-800">{text}</span>
      {cfg.mark}
      <CMono className="!bg-white/60 !text-ink-400">{state}</CMono>
    </div>
  );
}

/* ============================================================
   Audio player
   ============================================================ */
function AudioPlayerEx(){
  const I = window.Icons;
  const [playing,setPlaying] = cUseState(false);
  const [pos,setPos] = cUseState(38);
  const [speed,setSpeed] = cUseState(1);
  const dur = 96;
  return (
    <CFrame label="Audio player" hint="play · scrubber · replay · speed">
      <div className="rounded-2xl bg-white border border-ink-100 p-5 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-400 to-teal-400"/>
        <div className="h-16 grid place-items-center bg-gradient-to-b from-ink-50 to-white rounded-2xl mb-4">
          <div className="flex items-end gap-1 h-10">
            {Array.from({length:32}).map((_,i)=>{
              const h = 0.3 + 0.7*Math.abs(Math.sin(i*0.6));
              const played = i/32 < pos/dur;
              return <span key={i} className="rounded-full" style={{ width:5, height:`${h*100}%`, background:played?'#5B6CF0':'#CBD4DC' }}/>;
            })}
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="mono text-[11px] text-ink-500 tabular-nums w-10 text-end">{`0:${String(pos).padStart(2,'0')}`}</span>
          <input type="range" min={0} max={dur} value={pos} onChange={e=>setPos(+e.target.value)} className="flex-1 accent-[#5B6CF0]"/>
          <span className="mono text-[11px] text-ink-400 tabular-nums w-10">1:36</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button onClick={()=>setPos(p=>Math.max(0,p-10))} className="grid place-items-center w-11 h-11 rounded-2xl bg-ink-100 text-ink-700 hover:bg-ink-200"><I.rewind size={18}/></button>
          <button onClick={()=>setPlaying(p=>!p)} className="grid place-items-center w-14 h-14 rounded-full text-white shadow-glow hover:scale-105 transition-transform" style={{ background:'#5B6CF0' }}>
            {playing? <I.pause size={22}/> : <I.play size={24}/>}
          </button>
          <div className="inline-flex p-1 bg-ink-100 rounded-2xl">
            {[0.75,1].map(s=>(
              <button key={s} onClick={()=>setSpeed(s)} className={ccx('h-9 px-3 rounded-xl text-sm font-extrabold font-display', speed===s?'bg-white text-ink-900 shadow-soft':'text-ink-500')}>
                {s===1?'1×':`${s}×`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CFrame>
  );
}

/* ============================================================
   Record button — 4 states
   ============================================================ */
function RecWave({ active }){
  const [heights,setHeights] = cUseState(()=>Array(20).fill(0.3));
  cUseEffect(()=>{
    if(!active){ setHeights(Array(20).fill(0.06)); return; }
    let t; const tick = ()=>{ setHeights(h=>h.map(()=>0.2+Math.random()*0.8)); t=setTimeout(tick,140); }; tick();
    return ()=>clearTimeout(t);
  },[active]);
  return (
    <div className="flex items-end justify-center gap-1 h-10 w-32">
      {heights.map((h,i)=>(
        <span key={i} className="rounded-full" style={{ width:4, height:`${h*100}%`, background:active?'#FF6B9D':'#CBD4DC' }}/>
      ))}
    </div>
  );
}

function RecState({ label, children, sub }){
  return (
    <div className="rounded-2xl bg-white border border-ink-100 p-5 flex flex-col items-center">
      <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink-500 mb-4">{label}</div>
      {children}
      {sub && <div className="text-xs text-ink-500 font-medium mt-3 text-center">{sub}</div>}
    </div>
  );
}

function RecordSection(){
  const I = window.Icons;
  return (
    <CFrame label="Record button" hint="idle → recording → processing → result">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <RecState label="Idle" sub="Tap to record">
          <RecWave/>
          <button className="mt-2 grid place-items-center w-20 h-20 rounded-full text-white shadow-coral transition-transform hover:scale-105"
            style={{ background:'linear-gradient(135deg,#FF6B9D,#F84785)' }}>
            <I.mic size={36}/>
          </button>
        </RecState>
        <RecState label="Recording" sub="0:04 — tap to stop">
          <div className="flex items-center gap-1.5 text-coral-600 font-extrabold font-display text-xs"><span className="w-2 h-2 rounded-full bg-coral-500 animate-rec"/> REC</div>
          <div className="mt-2"><RecWave active/></div>
          <button className="mt-2 grid place-items-center w-20 h-20 rounded-full bg-ink-900">
            <span className="w-7 h-7 rounded-md bg-white block"/>
          </button>
        </RecState>
        <RecState label="Processing" sub="Transcribing…">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 mb-2"><I.sparkles size={26} className="animate-pulse"/></span>
          <div className="w-32 h-1.5 bg-ink-100 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-teal-400 rounded-full" style={{ width:'62%' }}/>
          </div>
        </RecState>
        <RecState label="Result" sub="84% accuracy">
          <div className="relative inline-grid place-items-center">
            <svg width="84" height="84" className="-rotate-90">
              <circle cx="42" cy="42" r="36" stroke="#EDF1F4" strokeWidth="9" fill="none"/>
              <circle cx="42" cy="42" r="36" stroke="#22C55E" strokeWidth="9" fill="none" strokeLinecap="round"
                strokeDasharray="226" strokeDashoffset="36"/>
            </svg>
            <span className="absolute text-lg font-extrabold font-display text-ink-900">84%</span>
          </div>
          <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-coral-600">Try again <I.refresh size={13}/></button>
        </RecState>
      </div>
    </CFrame>
  );
}

/* ============================================================
   Feedback elements
   ============================================================ */
function ProgressRingEx({ value, color }){
  const r=36, circ=2*Math.PI*r, off=circ*(1-value);
  return (
    <div className="relative inline-grid place-items-center" style={{ width:88, height:88 }}>
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} stroke="#EDF1F4" strokeWidth="9" fill="none"/>
        <circle cx="44" cy="44" r={r} stroke={color} strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}/>
      </svg>
      <span className="absolute font-extrabold font-display text-ink-900">{Math.round(value*100)}%</span>
    </div>
  );
}

function FeedbackSection(){
  const I = window.Icons;
  return (
    <CFrame label="Feedback" hint="correct · incorrect · diff · pronunciation · score · progress · streak">
      {/* Inline correction diff */}
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">Inline writing correction</div>
        <div className="bg-white border border-ink-100 rounded-2xl p-4">
          <div className="text-[17px] leading-loose flex flex-wrap gap-x-1.5 gap-y-2">
            <span>Ich</span><span>trinke</span>
            <span className="inline-flex items-baseline gap-1">
              <span className="line-through decoration-2 text-rose-500/80">ein</span>
              <span className="px-1.5 rounded-md bg-grass-50 text-grass-700 font-bold">einen</span>
            </span>
            <span>Kaffee</span><span>und</span><span>gehe</span>
            <span className="inline-flex items-baseline gap-1">
              <span className="line-through decoration-2 text-rose-500/80">zu</span>
              <span className="px-1.5 rounded-md bg-grass-50 text-grass-700 font-bold">zur</span>
            </span>
            <span>Arbeit.</span>
          </div>
        </div>
      </div>

      {/* Word-level pronunciation */}
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">Word-level pronunciation</div>
        <div className="bg-white border border-ink-100 rounded-2xl p-5">
          <div dir="rtl" className="font-ar text-2xl font-extrabold text-ink-900 flex flex-wrap gap-2 justify-center">
            {['أَشرَبُ','القَهوةَ','بِالحَليبِ','كُلَّ','صَباح.'].map((w,i)=>(
              <span key={i} className={ccx('px-2 py-1 rounded-xl',
                i===2?'bg-rose-50 text-rose-600 underline decoration-wavy decoration-rose-400':'bg-grass-50 text-grass-700')}>{w}</span>
            ))}
          </div>
          <div className="mt-3 text-xs text-ink-500 font-medium text-center">Green = pronounced cleanly · Red wavy underline = mispronounced</div>
        </div>
      </div>

      {/* Score + progress + streak */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-white border border-ink-100 rounded-2xl p-4 flex items-center gap-4">
          <ProgressRingEx value={0.84} color="#22C55E"/>
          <div>
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500">Pronunciation</div>
            <div className="font-extrabold font-display text-ink-900">Great!</div>
            <div className="text-xs text-ink-400 font-bold">4/5 words clean</div>
          </div>
        </div>
        <div className="bg-white border border-ink-100 rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">Linear progress</div>
          <div className="text-sm font-bold text-ink-700 mb-1">Lesson 4 of 6</div>
          <div className="h-2 rounded-full bg-ink-100 overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{ width:'55%' }}/></div>
          <div className="mt-3 text-sm font-bold text-ink-700 mb-1">Daily goal</div>
          <div className="h-2 rounded-full bg-ink-100 overflow-hidden"><div className="h-full rounded-full" style={{ width:'60%', background:'#FF6B9D' }}/></div>
        </div>
        <div className="bg-white border border-ink-100 rounded-2xl p-4 flex items-center gap-4">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-coral-50 text-coral-500"><I.flame size={28} className="animate-flame"/></span>
          <div>
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500">Streak</div>
            <div className="text-2xl font-extrabold font-display text-ink-900">24 days</div>
            <div className="text-xs text-coral-500 font-bold">Keep it alive!</div>
          </div>
        </div>
      </div>
    </CFrame>
  );
}

/* ============================================================
   Banners · Toasts · Modal · Empty · Error · Skeleton · Nav
   ============================================================ */
function NotificationsSection(){
  const I = window.Icons;
  return (
    <CFrame label="Banners, toasts, modals" hint="trial · system · dialog">
      {/* Trial banner — active */}
      <div className="mb-3 rounded-2xl bg-white border border-ink-100 overflow-hidden">
        <div className="px-4 sm:px-6 py-2.5 flex items-center gap-3">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-50 text-teal-600 shrink-0"><I.gift size={15}/></span>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-sm font-bold font-display text-ink-800">5 days left in your free trial</span>
            <span className="hidden sm:block flex-1 max-w-[160px]">
              <span className="block w-full bg-ink-100 rounded-full h-1.5 overflow-hidden">
                <span className="block h-full bg-teal-400 rounded-full" style={{ width:'70%' }}/>
              </span>
            </span>
          </div>
          <button className="text-sm font-extrabold font-display text-teal-700 inline-flex items-center gap-1">Upgrade <I.arrowRight size={14}/></button>
        </div>
      </div>
      {/* Trial banner — expired */}
      <div className="mb-5 rounded-2xl overflow-hidden" style={{ background:'linear-gradient(90deg,#FFE0EC,#FFF1F6 60%,#FFE0EC)' }}>
        <div className="px-4 sm:px-6 py-2.5 flex items-center gap-3">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-coral-400 text-white shrink-0"><I.lock size={15}/></span>
          <span className="text-sm font-bold font-display text-coral-700 flex-1">Your free trial has ended</span>
          <DSButton variant="accent" size="sm" iconRight={I.arrowRight}>Upgrade</DSButton>
        </div>
      </div>

      {/* Toasts */}
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div className="px-4 py-3 rounded-2xl bg-ink-900 text-white shadow-lift text-sm font-semibold flex items-center gap-2"><I.checkCircle size={16} className="text-grass-400"/> Saved</div>
        <div className="px-4 py-3 rounded-2xl bg-grass-600 text-white shadow-lift text-sm font-semibold flex items-center gap-2"><I.sparkles size={16}/> Lesson unlocked!</div>
        <div className="px-4 py-3 rounded-2xl bg-coral-500 text-white shadow-lift text-sm font-semibold flex items-center gap-2"><I.xCircle size={16}/> Couldn't save — try again</div>
      </div>

      {/* Modal */}
      <div className="relative rounded-3xl overflow-hidden border border-ink-100" style={{ minHeight:240 }}>
        <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"/>
        <div className="absolute inset-0 grid place-items-center p-5">
          <div className="bg-white rounded-3xl shadow-lift max-w-sm w-full p-6 relative">
            <button className="absolute top-4 end-4 grid place-items-center w-9 h-9 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={18}/></button>
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 mb-3"><I.flame size={24}/></span>
            <h4 className="text-xl font-extrabold font-display text-ink-900">Don't break your streak</h4>
            <p className="text-sm text-ink-500 font-medium mt-1.5">Complete one quick activity today to keep your 24-day streak.</p>
            <div className="flex gap-2.5 mt-5">
              <DSButton variant="secondary" full>Later</DSButton>
              <DSButton variant="accent" full iconRight={I.arrowRight}>Start now</DSButton>
            </div>
          </div>
        </div>
      </div>
    </CFrame>
  );
}

function EmptyErrorSection(){
  const I = window.Icons;
  return (
    <CFrame label="Empty · error · loading" hint="AI generating…">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-ink-100 p-6 text-center">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-ink-100 text-ink-400 mx-auto mb-3"><I.doc size={26}/></span>
          <div className="font-extrabold font-display text-ink-900">No passages yet</div>
          <p className="text-sm text-ink-500 font-medium mt-1">Generate your first reading to begin.</p>
          <DSButton size="sm" variant="secondary" className="mt-4" icon={I.sparkles}>Generate</DSButton>
        </div>
        <div className="rounded-2xl bg-white border border-rose-200 p-6 text-center">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 mx-auto mb-3"><I.xCircle size={26}/></span>
          <div className="font-extrabold font-display text-ink-900">Couldn't reach the server</div>
          <p className="text-sm text-ink-500 font-medium mt-1">Check your connection and retry.</p>
          <DSButton size="sm" variant="destructive" className="mt-4" icon={I.refresh}>Retry</DSButton>
        </div>
        <div className="rounded-2xl bg-white border border-ink-100 p-5">
          <div className="flex items-center gap-2.5 text-teal-600 font-bold font-display mb-4">
            <span className="grid place-items-center w-8 h-8 rounded-xl bg-teal-50"><I.sparkles size={16} className="animate-pulse"/></span>
            AI is generating…
          </div>
          <div className="space-y-2.5">
            <div className="skeleton h-3.5 rounded-lg" style={{ width:'92%' }}/>
            <div className="skeleton h-3.5 rounded-lg" style={{ width:'78%' }}/>
            <div className="skeleton h-3.5 rounded-lg" style={{ width:'88%' }}/>
            <div className="skeleton h-3.5 rounded-lg" style={{ width:'60%' }}/>
          </div>
        </div>
      </div>
    </CFrame>
  );
}

/* ============================================================
   Navigation
   ============================================================ */
function NavSection(){
  const I = window.Icons;
  return (
    <CFrame label="Navigation" hint="top bar · back · breadcrumb">
      <div className="space-y-4">
        {/* Top bar */}
        <div className="rounded-2xl overflow-hidden border border-ink-100">
          <div className="bg-white/90 backdrop-blur border-b border-ink-100 h-16 px-4 sm:px-6 flex items-center gap-3">
            <button className="grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-ink-100"><I.arrowLeft size={20}/></button>
            <span className="grid place-items-center w-10 h-10 rounded-2xl bg-coral-50 text-coral-500" style={{ boxShadow:'inset 0 0 0 1.5px #FFC2D9' }}><I.mic size={20}/></span>
            <div className="min-w-0 flex-1">
              <div className="font-extrabold font-display text-ink-900 leading-tight">Speaking</div>
              <div className="text-[11px] text-ink-400 font-medium">Studying Arabic · A2</div>
            </div>
            <span className="inline-flex items-center justify-center rounded-2xl" style={{ width:32, height:32, background:'#FFF1F6', boxShadow:'inset 0 0 0 1.5px #FFC2D9' }}><CFlag code="ar" size={20}/></span>
            <span className="inline-flex items-center justify-center h-7 min-w-[2.4rem] px-2 rounded-lg text-xs font-extrabold font-display bg-teal-400 text-white">A2</span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="rounded-2xl border border-ink-100 bg-white p-3.5">
          <nav className="flex items-center gap-1.5 text-sm font-bold font-display flex-wrap">
            <button className="px-2.5 py-1 rounded-lg text-ink-500 hover:bg-ink-50 inline-flex items-center gap-1.5"><CFlag code="ar" size={16}/> Arabic</button>
            <I.chevronRight size={14} className="text-ink-300"/>
            <button className="px-2.5 py-1 rounded-lg text-ink-500 hover:bg-ink-50">A2 · Elementary</button>
            <I.chevronRight size={14} className="text-ink-300"/>
            <span className="px-2.5 py-1 rounded-lg bg-coral-50 text-coral-600 inline-flex items-center gap-1.5"><I.mic size={14}/> Speaking</span>
          </nav>
        </div>

        {/* Mobile bottom nav */}
        <div className="rounded-2xl border border-ink-100 bg-white p-3 flex items-center justify-around">
          {[
            { ic:'home',       l:'Home',     active:false },
            { ic:'layers',     l:'Levels',   active:false },
            { ic:'sparkles',   l:'Practice', active:true },
            { ic:'user',       l:'Profile',  active:false },
          ].map((it,i)=>{
            const Ic = I[it.ic] || I.home;
            return (
              <button key={i} className={ccx('flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl', it.active?'text-teal-600':'text-ink-400')}>
                <Ic size={22}/>
                <span className="text-[11px] font-extrabold font-display">{it.l}</span>
              </button>
            );
          })}
        </div>
      </div>
    </CFrame>
  );
}

/* ============================================================
   Section wrapper
   ============================================================ */
function Components(){
  return (
    <CSection id="components" eyebrow="02 — Components" label="Library" title="Core components"
      lede="Each component is consumed via tokens. Hover, active, disabled, loading and result states are all defined — no improvising at the screen level.">
      <CSub id="buttons" title="Buttons"><ButtonsSection/></CSub>
      <CSub id="cards" title="Cards"><CardsSection/></CSub>
      <CSub id="inputs" title="Inputs"><InputsSection/></CSub>
      <CSub id="audio" title="Audio player"><AudioPlayerEx/></CSub>
      <CSub id="record" title="Record button"><RecordSection/></CSub>
      <CSub id="feedback" title="Feedback elements"><FeedbackSection/></CSub>
      <CSub id="notify" title="Banners, toasts & modals"><NotificationsSection/></CSub>
      <CSub id="empty" title="Empty, error & loading"><EmptyErrorSection/></CSub>
      <CSub id="nav" title="Navigation"><NavSection/></CSub>
    </CSection>
  );
}
window.Components = Components;
window.DSButton = DSButton; // export for screens section
