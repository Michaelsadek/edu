// ds/screens.jsx → window.Screens — miniature renditions of the 7 screens
const { cx:scx, Section:SSection, Sub:SSub, Frame:SFrame, Mono:SMono, DSFlag:SFlag } = window.DS;

/* small helpers reused across screens */
function Pill({ children, color='ink', className='' }){
  const c = { ink:'bg-ink-100 text-ink-600', teal:'bg-teal-50 text-teal-700', coral:'bg-coral-50 text-coral-600', sun:'bg-sun-100 text-amber-700', grass:'bg-grass-50 text-grass-700' }[color];
  return <span className={scx('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold font-display', c, className)}>{children}</span>;
}

function MiniBtn({ children, variant='primary', icon:Icon, iconRight:IconR, full, className='' }){
  const v = {
    primary:'bg-teal-400 text-white shadow-glow',
    accent:'bg-coral-400 text-white shadow-coral',
    secondary:'bg-white border border-ink-200 text-ink-800 shadow-soft',
    ghost:'text-ink-600 hover:bg-ink-100',
    dark:'bg-ink-900 text-white',
  }[variant];
  return (
    <button className={scx('inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl font-extrabold font-display text-sm', v, full&&'w-full justify-center', className)}>
      {Icon && <Icon size={15}/>}
      {children}
      {IconR && <IconR size={15}/>}
    </button>
  );
}

function StreakBar(){
  const I = window.Icons;
  return (
    <div className="bg-white border border-ink-100 rounded-2xl px-3 py-2 flex items-center gap-2 text-sm">
      <span className="text-coral-500"><I.flame size={16}/></span>
      <span className="font-extrabold font-display text-ink-900">24</span>
      <span className="text-ink-300">·</span>
      <Pill color="teal">A2</Pill>
    </div>
  );
}

function TrialBar({ daysLeft=5, expired }){
  const I = window.Icons;
  if(expired) return (
    <div className="px-4 py-2 flex items-center gap-2 text-[12px]" style={{ background:'linear-gradient(90deg,#FFE0EC,#FFF1F6 60%,#FFE0EC)' }}>
      <span className="grid place-items-center w-5 h-5 rounded-md bg-coral-400 text-white"><I.lock size={11}/></span>
      <span className="font-bold text-coral-700 flex-1">Your free trial has ended</span>
      <span className="inline-flex items-center gap-1 font-extrabold font-display text-coral-700">Upgrade <I.arrowRight size={12}/></span>
    </div>
  );
  return (
    <div className="bg-white border-b border-ink-100 px-4 py-2 flex items-center gap-2 text-[12px]">
      <span className="grid place-items-center w-5 h-5 rounded-md bg-teal-50 text-teal-600"><I.gift size={11}/></span>
      <span className="font-bold text-ink-800 flex-1">{daysLeft} days left in your free trial</span>
      <span className="inline-flex items-center gap-1 font-extrabold font-display text-teal-700">Upgrade <I.arrowRight size={12}/></span>
    </div>
  );
}

/* ---------- DEVICE FRAME wrapping a mini screen ---------- */
function Device({ label, caption, children, w=420, ratio=2.05, dark, rtl, accent='#4ECDC4' }){
  // ratio = height/width
  const h = Math.round(w*ratio);
  return (
    <figure className="space-y-3">
      <div className="rounded-[36px] p-2.5 shadow-lift" style={{ background:dark?'#0A1220':'#0F1B2A' }}>
        <div className={scx('relative overflow-hidden rounded-[28px]', dark?'bg-night-900':'bg-[#F4F7F9]')}
          style={{ width:w, height:h, margin:'0 auto' }} dir={rtl?'rtl':'ltr'}>
          {/* status notch */}
          <div className={scx('absolute top-0 inset-x-0 h-7 flex items-center justify-between px-5 z-30 text-[10px] font-extrabold font-display tabular-nums',
            dark?'text-white':'text-ink-900')}>
            <span>9:41</span>
            <span className="w-16 h-5 rounded-b-xl" style={{ background:dark?'#0A1220':'#0F1B2A' }}/>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="9" viewBox="0 0 16 9" fill="currentColor"><rect x="0" y="0" width="13" height="9" rx="2"/><rect x="14" y="2" width="2" height="5" rx=".5"/></svg>
            </span>
          </div>
          <div className={scx('absolute inset-0 pt-7 overflow-hidden', rtl&&'font-ar')}>{children}</div>
        </div>
      </div>
      <figcaption className="text-center">
        <div className="font-extrabold font-display text-ink-900 text-sm">{label}</div>
        {caption && <div className="text-[11px] text-ink-400 font-medium mt-0.5">{caption}</div>}
      </figcaption>
    </figure>
  );
}

/* ============================================================
   1) Level Selection
   ============================================================ */
function LevelSelectMock(){
  const I = window.Icons;
  return (
    <div className="h-full overflow-hidden flex flex-col bg-[radial-gradient(120%_60%_at_50%_-10%,#EFFCFB_0%,#F4F7F9_60%)]">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white"><I.globe size={14}/></span>
          <span className="font-extrabold font-display text-ink-900 text-sm">Lingo</span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-white border border-ink-100 rounded-xl h-8 px-2 shadow-soft text-[11px] font-bold">
          <SFlag code="de" size={20}/> German
        </div>
      </div>
      <div className="px-5 pt-2 text-center">
        <Pill color="teal" className="mb-2"><I.layers size={11}/> CEFR · German</Pill>
        <div className="text-xl font-extrabold font-display text-ink-900 leading-tight">Pick your level</div>
        <div className="text-[11px] text-ink-500 font-medium mt-1">You can change this any time.</div>
      </div>
      <div className="px-4 mt-4 grid grid-cols-2 gap-2.5">
        {[
          { id:'A1', l:'Beginner', a:'#4ECDC4', cur:0, sel:false },
          { id:'A2', l:'Elementary', a:'#7C8CF8', cur:1, sel:true },
          { id:'B1', l:'Intermed.', a:'#FBBF24', cur:2, sel:false },
          { id:'B2', l:'Upper-Int.', a:'#FF6B9D', cur:3, sel:false },
        ].map(c=>(
          <div key={c.id} className={scx('relative rounded-2xl bg-white p-3', c.sel?'shadow-lift':'border border-ink-200')}
            style={c.sel?{ boxShadow:`0 0 0 2.5px ${c.a}, 0 10px 24px rgba(16,24,40,.10)` }:{}}>
            {c.sel && (<span className="absolute -top-2 -end-2 grid place-items-center w-7 h-7 rounded-xl text-white" style={{ background:c.a }}>{I.check({size:13,stroke:3})}</span>)}
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold font-display text-ink-900">{c.id}</span>
              <span className="text-[11px] font-bold text-ink-500">· {c.l}</span>
            </div>
            <div className="mt-2 flex items-center gap-0.5">
              {[0,1,2,3,4,5].map(i=>(<span key={i} className="h-1 flex-1 rounded-full" style={{ background:i<=c.cur?c.a:'#E4E9EE' }}/>))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 mt-auto pb-5">
        <MiniBtn variant="accent" full iconRight={window.Icons.arrowRight}>Continue · A2</MiniBtn>
      </div>
    </div>
  );
}

/* ============================================================
   2) Skill Hub
   ============================================================ */
function SkillHubMock({ expired }){
  const I = window.Icons;
  const skills = [
    { id:'reading',   ic:I.book,       tint:'#4ECDC4', bg:'#EFFCFB', ring:'#AEEEEA', t:'Reading',   d:'Read an AI-generated passage' },
    { id:'listening', ic:I.headphones, tint:'#7C8CF8', bg:'#EEF1FE', ring:'#C9D1FB', t:'Listening', d:'Listen and check yourself' },
    { id:'speaking',  ic:I.mic,        tint:'#FF6B9D', bg:'#FFF1F6', ring:'#FFC2D9', t:'Speaking',  d:'Read aloud, get scored' },
    { id:'writing',   ic:I.edit,       tint:'#FBBF24', bg:'#FFF4D6', ring:'#FFE7A3', t:'Writing',   d:'Write & get corrections' },
  ];
  return (
    <div className="h-full overflow-hidden flex flex-col bg-[#F4F7F9]">
      <TrialBar expired={expired}/>
      <div className="bg-white border-b border-ink-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white"><I.globe size={14}/></span>
          <span className="font-extrabold font-display text-ink-900 text-sm">Lingo</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold">
          <SFlag code="de" size={20}/>
          <Pill color="teal">A2</Pill>
        </div>
      </div>
      <div className="px-5 pt-5">
        <Pill color="teal" className="mb-2"><I.sparkles size={11}/> AI-tailored to A2</Pill>
        <div className="text-lg font-extrabold font-display text-ink-900 leading-snug text-balance">What do you want to practice today?</div>
        <div className="text-[11px] text-ink-500 font-medium mt-1">Pick a skill — the AI tailors it to your level.</div>
      </div>
      <div className="px-4 mt-4 grid grid-cols-2 gap-2.5">
        {skills.map(s=>(
          <div key={s.id} className="rounded-2xl bg-white border border-ink-100 shadow-soft p-3 relative">
            <div className="flex items-start justify-between">
              <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background:s.bg, color:s.tint, boxShadow:`inset 0 0 0 1.5px ${s.ring}` }}><s.ic size={20}/></span>
              {expired && <span className="grid place-items-center w-6 h-6 rounded-lg bg-ink-100 text-ink-400"><I.lock size={11}/></span>}
            </div>
            <div className="mt-2 font-extrabold font-display text-ink-900 text-sm">{s.t}</div>
            <div className="text-[10.5px] text-ink-500 font-medium mt-0.5 leading-snug">{s.d}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-extrabold" style={{ color:s.tint }}>Start <I.arrowRight size={11}/></div>
          </div>
        ))}
      </div>
      <div className="px-4 mt-auto pb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-ink-100 rounded-xl p-2.5 flex items-center gap-1.5">
            <I.flame size={14} className="text-coral-500"/>
            <span className="text-[11px] font-extrabold font-display">3 days</span>
          </div>
          <div className="bg-white border border-ink-100 rounded-xl p-2.5 flex items-center gap-1.5">
            <I.target size={14} className="text-grass-600"/>
            <span className="text-[11px] font-extrabold font-display">2/3</span>
          </div>
          <div className="bg-white border border-ink-100 rounded-xl p-2.5 flex items-center gap-1.5">
            <I.brain size={14} className="text-teal-600"/>
            <span className="text-[11px] font-extrabold font-display">Mix daily</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3) Reading
   ============================================================ */
function ReadingMock({ dir='ltr', dark, ui='ltr' }){
  const I = window.Icons;
  const isAr = dir==='rtl';
  const body = isAr
    ? ['يَذهَبُ سامي إلى المَقهى كُلَّ صَباح. يَجلِسُ على طاوِلةٍ قُربَ النّافِذة.','يَطلُبُ قَهوةً وقِطعةَ كَعك. القَهوةُ لَذيذةٌ والكَعكُ طازَج.','بَعدَ نِصفِ ساعة، يَدفَعُ، ويَذهَبُ إلى عَمَلِه سَعيدًا.']
    : ['Sami geht jeden Morgen ins Café. Er sitzt an einem Tisch am Fenster.','Er bestellt einen Kaffee und ein Stück Kuchen. Der Kaffee ist lecker und der Kuchen frisch.','Nach einer halben Stunde bezahlt er und geht glücklich zur Arbeit.'];
  const surface = dark?'bg-night-900':'bg-[#F4F7F9]';
  const card    = dark?'bg-night-800 border-night-700':'bg-white border-ink-100';
  const text    = dark?'text-ink-100':'text-ink-800';
  const muted   = dark?'text-ink-400':'text-ink-500';
  return (
    <div className={scx('h-full overflow-hidden flex flex-col', surface)} dir={ui}>
      <div className={scx('px-4 py-3 flex items-center gap-2 border-b', dark?'border-night-700':'border-ink-100')}>
        <button className={scx('grid place-items-center w-8 h-8 rounded-lg', dark?'text-ink-400 bg-night-800':'text-ink-400 bg-white border border-ink-100')}>
          <I.arrowLeft size={16} className={ui==='rtl'?'rotate-180':''}/>
        </button>
        <span className="grid place-items-center w-8 h-8 rounded-xl" style={{ background:dark?'rgba(94,224,215,.15)':'#EFFCFB', color:dark?'#5EE0D7':'#1F9A92', boxShadow:dark?'inset 0 0 0 1.5px rgba(94,224,215,.3)':'inset 0 0 0 1.5px #AEEEEA' }}><I.book size={15}/></span>
        <div className="min-w-0 flex-1">
          <div className={scx('text-sm font-extrabold font-display', dark?'text-white':'text-ink-900')}>{ui==='rtl'?'القراءة':'Reading'}</div>
          <div className={scx('text-[10px] font-medium', muted)}>{ui==='rtl'?'تتعلّم العربية · A2':(dir==='rtl'?'Studying Arabic · A2':'Studying German · A2')}</div>
        </div>
        <SFlag code={dir==='rtl'?'ar':'de'} size={20}/>
        <Pill color="teal">A2</Pill>
      </div>
      <div className="px-4 pt-3 pb-2">
        <Pill color="teal" className="mb-2"><I.sparkles size={11}/> AI · A2</Pill>
        <div className={scx('text-lg font-extrabold font-display leading-tight', dark?'text-white':'text-ink-900')}>{ui==='rtl'?'القراءة':'Reading'}</div>
      </div>
      <div className="px-4 mt-1 flex-1 overflow-hidden">
        <div className={scx('rounded-2xl border relative overflow-hidden', card)}>
          <div className="absolute inset-x-0 top-0 h-1" style={{ background:'linear-gradient(90deg,#4ECDC4,#7C8CF8)' }}/>
          <div className="p-3.5">
            <div className="flex items-center justify-between mb-2">
              <Pill color="ink">Everyday life</Pill>
              <div className="flex items-center gap-2 text-[10px] font-bold text-ink-400">
                <span className="inline-flex items-center gap-1"><I.doc size={11}/> 82w</span>
                <span className="inline-flex items-center gap-1"><I.clock size={11}/> 1m</span>
              </div>
            </div>
            <div dir={dir} className={isAr?'font-ar':''}>
              <h3 className={scx('font-extrabold mb-2', dark?'text-white':'text-ink-900', isAr?'text-xl':'text-base font-display')}>
                {isAr?'صباحٌ في المقهى':'Ein Morgen im Café'}
              </h3>
              <div className="space-y-2">
                {body.map((p,i)=>(<p key={i} className={scx('leading-relaxed', text, isAr?'text-[15px] leading-loose':'text-[12.5px]')}>{p}</p>))}
              </div>
            </div>
            <div className={scx('mt-3 pt-2.5 border-t flex items-center gap-3 text-[11px] font-extrabold', dark?'border-night-700':'border-ink-100')}>
              <span className="text-teal-500 inline-flex items-center gap-1"><I.refresh size={12}/> Generate</span>
              <span className={muted}>·</span>
              <span className={scx('inline-flex items-center gap-1', muted)}><I.volume size={12}/> Aloud</span>
            </div>
          </div>
        </div>
      </div>
      {/* Comprehension preview */}
      <div className="px-4 py-3 space-y-1.5">
        <div className={scx('text-[11px] uppercase tracking-widest font-extrabold', muted)}>Comprehension</div>
        <div className={scx('rounded-xl border p-2.5 text-[11.5px] font-bold flex items-center gap-2', dark?'bg-night-800 border-night-700 text-ink-200':'bg-white border-ink-100 text-ink-800')}>
          <span className="grid place-items-center w-5 h-5 rounded-md bg-teal-400 text-white text-[10px]">A</span>
          By the door
        </div>
        <div className={scx('rounded-xl border-2 p-2.5 text-[11.5px] font-bold flex items-center gap-2',
          dark?'border-grass-400 bg-grass-400/10 text-grass-200':'border-grass-400 bg-grass-50 text-grass-700')}>
          <span className="grid place-items-center w-5 h-5 rounded-md bg-grass-500 text-white text-[10px]">B</span>
          By the window
          <I.checkCircle size={14} className="ms-auto"/>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   4) Listening
   ============================================================ */
function ListeningMock(){
  const I = window.Icons;
  return (
    <div className="h-full overflow-hidden flex flex-col bg-[#F4F7F9]">
      <div className="px-4 py-3 flex items-center gap-2 bg-white border-b border-ink-100">
        <button className="grid place-items-center w-8 h-8 rounded-lg text-ink-400 bg-white border border-ink-100"><I.arrowLeft size={16}/></button>
        <span className="grid place-items-center w-8 h-8 rounded-xl text-indigo-500" style={{ background:'#EEF1FE', boxShadow:'inset 0 0 0 1.5px #C9D1FB' }}><I.headphones size={15}/></span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-extrabold font-display text-ink-900">Listening</div>
          <div className="text-[10px] font-medium text-ink-400">Studying English · A2</div>
        </div>
        <SFlag code="en" size={20}/>
        <Pill color="teal">A2</Pill>
      </div>
      <div className="px-4 pt-3 pb-2">
        <Pill color="ink" className="mb-2" style={{ background:'#EEF1FE', color:'#5B6CF0' }}><I.headphones size={11}/> Listening · A2</Pill>
        <div className="text-lg font-extrabold font-display text-ink-900 leading-tight">A Morning at the Café</div>
      </div>

      <div className="px-4">
        <div className="rounded-2xl bg-white border border-ink-100 shadow-soft p-3.5 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 to-teal-400"/>
          <div className="flex items-center justify-between mb-2">
            <Pill color="ink">Everyday life</Pill>
            <div className="flex items-center gap-2 text-[10px] font-bold text-ink-400">
              <span className="inline-flex items-center gap-1"><I.headphones size={11}/> Sam</span>
              <span className="inline-flex items-center gap-1"><I.clock size={11}/> 1:36</span>
            </div>
          </div>
          {/* eq bars */}
          <div className="h-12 grid place-items-center bg-gradient-to-b from-ink-50 to-white rounded-xl mb-3">
            <div className="flex items-end gap-0.5 h-8">
              {Array.from({length:24}).map((_,i)=>{
                const h = 0.3 + 0.7*Math.abs(Math.sin(i*0.55));
                const played = i/24 < 0.42;
                return <span key={i} className="rounded-full" style={{ width:3, height:`${h*100}%`, background:played?'#5B6CF0':'#CBD4DC' }}/>;
              })}
            </div>
          </div>
          {/* scrubber */}
          <div className="flex items-center gap-2 mb-3">
            <span className="mono text-[10px] text-ink-500 tabular-nums w-7 text-end">0:38</span>
            <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width:'42%', background:'#5B6CF0' }}/></div>
            <span className="mono text-[10px] text-ink-400 tabular-nums w-7">1:36</span>
          </div>
          {/* controls */}
          <div className="flex items-center justify-center gap-2.5">
            <button className="grid place-items-center w-9 h-9 rounded-xl bg-ink-100 text-ink-700"><I.rewind size={14}/></button>
            <button className="grid place-items-center w-12 h-12 rounded-full text-white shadow-glow" style={{ background:'#5B6CF0' }}><I.play size={18}/></button>
            <div className="inline-flex p-0.5 bg-ink-100 rounded-xl">
              <span className="h-7 px-2 grid place-items-center rounded-lg text-[10px] font-extrabold font-display text-ink-500">0.75×</span>
              <span className="h-7 px-2 grid place-items-center rounded-lg bg-white shadow-soft text-[10px] font-extrabold font-display text-ink-900">1×</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-ink-100 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-ink-600">
            <I.plus size={12}/> Show transcript <I.eye size={11} className="text-ink-300"/>
          </div>
        </div>
      </div>
      <div className="px-4 mt-3 text-[11px] uppercase tracking-widest font-extrabold text-ink-500">Comprehension</div>
      <div className="px-4 mt-2 space-y-1.5">
        <div className="rounded-xl border border-ink-100 bg-white p-2.5 text-[11.5px] font-bold text-ink-800 flex items-center gap-2">
          <span className="grid place-items-center w-5 h-5 rounded-md bg-ink-100 text-ink-500 text-[10px]">1</span>
          What does Sami order?
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   5) Speaking
   ============================================================ */
function SpeakingMock(){
  const I = window.Icons;
  return (
    <div className="h-full overflow-hidden flex flex-col bg-[#F4F7F9]">
      <div className="px-4 py-3 flex items-center gap-2 bg-white border-b border-ink-100">
        <button className="grid place-items-center w-8 h-8 rounded-lg text-ink-400 bg-white border border-ink-100"><I.arrowLeft size={16}/></button>
        <span className="grid place-items-center w-8 h-8 rounded-xl text-coral-500" style={{ background:'#FFF1F6', boxShadow:'inset 0 0 0 1.5px #FFC2D9' }}><I.mic size={15}/></span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-extrabold font-display text-ink-900">Speaking</div>
          <div className="text-[10px] font-medium text-ink-400">Studying Arabic · A2</div>
        </div>
        <SFlag code="ar" size={20}/>
        <Pill color="teal">A2</Pill>
      </div>
      <div className="px-4 pt-3 pb-2">
        <Pill color="coral" className="mb-2"><I.mic size={11}/> Speaking · A2</Pill>
        <div className="text-lg font-extrabold font-display text-ink-900 leading-tight">Read this sentence aloud</div>
        <div className="text-[11px] text-ink-500 font-medium mt-0.5">I drink coffee with milk every morning.</div>
      </div>
      <div className="px-4">
        <div className="rounded-2xl bg-white border border-ink-100 shadow-soft p-4 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background:'linear-gradient(90deg,#FF6B9D,#FBBF24)' }}/>
          <div dir="rtl" className="font-ar flex flex-wrap gap-1.5 justify-center mt-2">
            {[['أَشرَبُ','ok'],['القَهوةَ','ok'],['بِالحَليبِ','wrong'],['كُلَّ','ok'],['صَباح.','ok']].map(([w,st],i)=>(
              <span key={i} className={scx('px-1.5 py-0.5 rounded-md text-[15px] font-bold',
                st==='wrong'?'bg-rose-50 text-rose-600 underline decoration-wavy decoration-rose-400':'bg-grass-50 text-grass-700')}>{w}</span>
            ))}
          </div>
          {/* ring */}
          <div className="flex justify-center mt-3">
            <div className="relative inline-grid place-items-center">
              <svg width="80" height="80" className="-rotate-90">
                <circle cx="40" cy="40" r="34" stroke="#EDF1F4" strokeWidth="8" fill="none"/>
                <circle cx="40" cy="40" r="34" stroke="#22C55E" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="214" strokeDashoffset="34"/>
              </svg>
              <span className="absolute text-base font-extrabold font-display text-ink-900">84%</span>
            </div>
          </div>
        </div>
        {/* record cluster */}
        <div className="mt-3 rounded-2xl bg-white border border-ink-100 p-3.5 flex flex-col items-center">
          <div className="flex items-end gap-0.5 h-6">
            {Array.from({length:20}).map((_,i)=>{
              const h = 0.4 + 0.6*Math.abs(Math.sin(i*0.6));
              return <span key={i} className="rounded-full" style={{ width:3, height:`${h*100}%`, background:'#FF6B9D' }}/>;
            })}
          </div>
          <button className="mt-2 grid place-items-center w-14 h-14 rounded-full text-white shadow-coral" style={{ background:'linear-gradient(135deg,#FF6B9D,#F84785)' }}>
            <I.mic size={22}/>
          </button>
          <div className="mt-1.5 text-[10px] font-bold text-ink-500">Tap to record</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   6) Writing
   ============================================================ */
function WritingMock(){
  const I = window.Icons;
  return (
    <div className="h-full overflow-hidden flex flex-col bg-[#F4F7F9]">
      <div className="px-4 py-3 flex items-center gap-2 bg-white border-b border-ink-100">
        <button className="grid place-items-center w-8 h-8 rounded-lg text-ink-400 bg-white border border-ink-100"><I.arrowLeft size={16}/></button>
        <span className="grid place-items-center w-8 h-8 rounded-xl text-amber-600" style={{ background:'#FFF4D6', boxShadow:'inset 0 0 0 1.5px #FFE7A3' }}><I.edit size={15}/></span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-extrabold font-display text-ink-900">Writing</div>
          <div className="text-[10px] font-medium text-ink-400">Studying German · A2</div>
        </div>
        <SFlag code="de" size={20}/>
        <Pill color="teal">A2</Pill>
      </div>
      <div className="px-4 pt-3">
        <Pill color="sun" className="mb-2"><I.edit size={11}/> Writing · A2</Pill>
        <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink-400">Today's topic</div>
        <div className="text-base font-extrabold font-display text-ink-900 leading-tight mt-0.5">My morning routine</div>
      </div>
      {/* result card */}
      <div className="px-4 mt-3 space-y-3">
        <div className="rounded-2xl bg-white border border-ink-100 p-3 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background:'linear-gradient(90deg,#22C55E,#FBBF24)' }}/>
          <div className="flex items-center gap-3">
            <div className="relative inline-grid place-items-center">
              <svg width="64" height="64" className="-rotate-90">
                <circle cx="32" cy="32" r="26" stroke="#EDF1F4" strokeWidth="7" fill="none"/>
                <circle cx="32" cy="32" r="26" stroke="#22C55E" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray="164" strokeDashoffset="36"/>
              </svg>
              <span className="absolute text-sm font-extrabold font-display text-ink-900">78</span>
            </div>
            <div className="flex-1 min-w-0">
              <Pill color="grass" className="mb-1"><I.checkCircle size={11}/> Feedback</Pill>
              <div className="text-[11px] text-ink-700 font-semibold leading-snug">Good sentence flow. Two case slips: <i>einen Kaffee</i> and <i>zur Arbeit</i>.</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-ink-100 p-3">
          <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink-400 mb-1.5">Your text · corrected</div>
          <div className="text-[12px] leading-loose flex flex-wrap gap-x-1 gap-y-1.5">
            <span>Ich</span><span>trinke</span>
            <span className="inline-flex items-baseline gap-0.5">
              <span className="line-through decoration-1.5 text-rose-500/80">ein</span>
              <span className="px-1 rounded bg-grass-50 text-grass-700 font-bold">einen</span>
            </span>
            <span>Kaffee</span><span>und</span><span>gehe</span>
            <span className="inline-flex items-baseline gap-0.5">
              <span className="line-through decoration-1.5 text-rose-500/80">zu</span>
              <span className="px-1 rounded bg-grass-50 text-grass-700 font-bold">zur</span>
            </span>
            <span>Arbeit.</span>
          </div>
        </div>
        <MiniBtn variant="accent" full iconRight={window.Icons.arrowRight}>Try another topic</MiniBtn>
      </div>
    </div>
  );
}

/* ============================================================
   7) Upgrade
   ============================================================ */
function UpgradeMock(){
  const I = window.Icons;
  return (
    <div className="h-full overflow-hidden flex flex-col bg-[radial-gradient(120%_60%_at_50%_-10%,#FFF1F6_0%,#F4F7F9_55%)]">
      <div className="px-4 py-3 flex items-center justify-between bg-white/70 backdrop-blur border-b border-ink-100">
        <div className="flex items-center gap-1.5">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white"><I.globe size={14}/></span>
          <span className="font-extrabold font-display text-ink-900 text-sm">Lingo</span>
        </div>
        <button className="grid place-items-center w-7 h-7 rounded-lg text-ink-400"><I.x size={15}/></button>
      </div>
      <div className="px-5 pt-4 text-center">
        <Pill color="teal" className="mb-2"><I.sparkles size={11}/> Lingo Pro</Pill>
        <div className="text-lg font-extrabold font-display text-ink-900 leading-tight text-balance">Keep learning without limits</div>
        <div className="text-[11px] text-ink-500 font-medium mt-1">One plan unlocks every language, level, and mode.</div>
      </div>
      <div className="px-4 mt-3">
        <div className="rounded-2xl bg-white border border-ink-100 shadow-soft p-3.5 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background:'linear-gradient(90deg,#4ECDC4,#7C8CF8,#FF6B9D)' }}/>
          {/* toggle */}
          <div className="flex justify-center">
            <div className="inline-flex p-0.5 bg-ink-100 rounded-xl">
              <span className="h-8 px-3 grid place-items-center text-[11px] font-extrabold font-display text-ink-500 rounded-lg">Monthly</span>
              <span className="relative h-8 px-3 grid place-items-center text-[11px] font-extrabold font-display bg-white shadow-soft text-ink-900 rounded-lg">Annual</span>
            </div>
          </div>
          {/* price */}
          <div className="text-center mt-3">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-extrabold font-display text-ink-900">$8.25</span>
              <span className="text-[11px] text-ink-400 font-bold">/month</span>
            </div>
            <div className="text-[10px] text-ink-500 font-medium mt-0.5">billed annually as $99 · <span className="text-grass-600 font-extrabold">Save 36%</span></div>
          </div>
          {/* features */}
          <div className="mt-3 bg-ink-50 rounded-xl p-2.5 space-y-1.5">
            {['3 languages · 6 levels','Reading · Listening · Speaking · Writing','Unlimited AI lessons & feedback','Pronunciation & writing scoring'].map((f,i)=>(
              <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700">
                <span className="grid place-items-center w-4 h-4 rounded bg-teal-400 text-white">{I.check({size:10,stroke:3})}</span>{f}
              </div>
            ))}
          </div>
          <button className="mt-3 inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-xl bg-coral-400 text-white shadow-coral font-extrabold font-display text-sm">
            <I.bolt size={14}/> Start subscription · $99/yr
          </button>
          <div className="mt-2 text-center text-[10px] text-ink-400 font-bold inline-flex items-center justify-center gap-1 w-full">
            <I.shield size={11}/> Cancel anytime. No hidden fees.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Wrapper
   ============================================================ */
function Screens(){
  return (
    <SSection id="screens" eyebrow="04 — Applied" label="Screens" title="System applied"
      lede="Seven core screens built from the same tokens and components. Shown in light by default; one in dark and one in Arabic RTL to verify the system holds up.">

      <SSub id="screens-light" title="Light · 5 core flows"
        lede="From level selection through the four skill modes — chrome, type, color, and elevation are identical to the components catalog above.">
        <div className="overflow-x-auto -mx-5 sm:-mx-8 px-5 sm:px-8">
          <div className="flex gap-6 min-w-max pb-4 no-scrollbar">
            <Device label="1 · Level selection" caption="A1 → C2 cards · Studying German"><LevelSelectMock/></Device>
            <Device label="2 · Skill hub" caption="Four modes · trial banner"><SkillHubMock/></Device>
            <Device label="3 · Reading" caption="AI passage · LTR German content"><ReadingMock dir="ltr"/></Device>
            <Device label="4 · Listening" caption="Audio player · transcript reveal"><ListeningMock/></Device>
            <Device label="5 · Speaking" caption="Per-word pronunciation result"><SpeakingMock/></Device>
          </div>
        </div>
      </SSub>

      <SSub id="screens-more" title="Writing · Upgrade · trial-expired hub"
        lede="Same system across editorial, paywall, and the locked state.">
        <div className="overflow-x-auto -mx-5 sm:-mx-8 px-5 sm:px-8">
          <div className="flex gap-6 min-w-max pb-4 no-scrollbar">
            <Device label="6 · Writing" caption="Inline correction diff + score"><WritingMock/></Device>
            <Device label="7 · Upgrade" caption="Single plan · Monthly / Annual"><UpgradeMock/></Device>
            <Device label="Trial expired" caption="Hub gates on lock icons"><SkillHubMock expired/></Device>
          </div>
        </div>
      </SSub>

      <SSub id="screens-rtl-dark" title="Dark theme · RTL interface"
        lede="The dark Reading view uses dark semantic tokens — same elevation rhythm, contrast preserved. The RTL Reading view shows full UI mirror with native Arabic content rendering RTL.">
        <div className="overflow-x-auto -mx-5 sm:-mx-8 px-5 sm:px-8">
          <div className="flex gap-6 min-w-max pb-4 no-scrollbar">
            <Device label="Reading · dark" caption="Dark tokens · same component" dark><ReadingMock dir="ltr" dark/></Device>
            <Device label="Reading · Arabic RTL" caption="UI flipped · content also Arabic" rtl><ReadingMock dir="rtl" ui="rtl"/></Device>
            <Device label="Reading · Arabic UI / German content" caption="Headline mixed-direction case" rtl><ReadingMock dir="ltr" ui="rtl"/></Device>
          </div>
        </div>
      </SSub>
    </SSection>
  );
}
window.Screens = Screens;
