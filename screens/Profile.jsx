// screens/Profile.jsx → window.Profile, window.Settings, window.Notifications
const { cx:pcx, useApp:puseApp, useT:puseT, Button:PBtn, Card:PCard, Badge:PBadge, Avatar:PAvatar, StreakFlame:PStreak, FlagSVG:PFlag, LevelChip:PLevel, ProgressBar:PBar } = window.UI;

/* ---------- Streak heatmap ---------- */
function StreakHeatmap(){
  const I = window.Icons;
  const D = window.DATA;
  const grid = D.STREAK_GRID; // 6 weeks × 7 days = 42
  const days = ['M','T','W','T','F','S','S'];
  return (
    <PCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-coral-50 text-coral-500"><I.flame size={18}/></span>
          <h3 className="font-extrabold font-display text-ink-900">Streak history</h3>
        </div>
        <PStreak count={24}/>
      </div>
      <div className="flex gap-2">
        {/* day labels */}
        <div className="grid grid-rows-7 gap-1.5 mt-6">
          {days.map((d,i)=>(<span key={i} className="h-5 text-[10px] text-ink-400 font-bold">{d}</span>))}
        </div>
        <div className="flex-1 grid grid-cols-6 gap-1.5">
          {Array.from({length:6}).map((_,wk)=>(
            <div key={wk} className="grid grid-rows-7 gap-1.5">
              <div className="text-[10px] text-ink-400 font-bold text-center">{wk===0?'18w ago':wk===5?'now':''}</div>
              {Array.from({length:7}).map((_,d)=>{
                const v = grid[wk*7+d];
                const bg = v===2?'#FF6B9D': v===1?'#FFC2D9':'#F1F4F6';
                return <div key={d} className="h-5 rounded-md transition-transform hover:scale-110" style={{ background:bg }}/>;
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-ink-500 font-medium">
        <span>Last 6 weeks</span>
        <div className="flex items-center gap-1.5">
          Less
          {['#F1F4F6','#FFE0EC','#FFC2D9','#FF9CBE','#FF6B9D'].map((c,i)=>(<span key={i} className="w-3 h-3 rounded" style={{ background:c }}/>))}
          More
        </div>
      </div>
    </PCard>
  );
}

/* ---------- Certificate row ---------- */
function CertRow({ cert, target }){
  const I = window.Icons;
  const isEarned = cert.status==='earned';
  return (
    <div className={pcx('rounded-2xl border p-4 flex items-center gap-4 transition-all', isEarned?'border-ink-100 bg-white hover:shadow-soft':'border-dashed border-ink-200 bg-ink-50/40')}>
      <span className="grid place-items-center w-12 h-12 rounded-2xl shrink-0"
        style={{ background:isEarned?'linear-gradient(135deg,#FFF4D6,#fff)':'#F1F4F6', color:isEarned?'#D97706':'#94A3B0',
          boxShadow:isEarned?'inset 0 0 0 1.5px #FFE7A3':'inset 0 0 0 1.5px #E4E9EE' }}>
        {isEarned ? <I.award size={22}/> : <I.lock size={18}/>}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold font-display text-ink-900">{target.name} · {cert.level}</span>
          <PLevel level={cert.level} active={isEarned}/>
        </div>
        <div className="text-sm text-ink-500 font-medium mt-0.5">
          {isEarned
            ? <>Earned {cert.date} · <span className="text-grass-600 font-bold">Ready</span></>
            : <>In progress · {cert.pct}% to certification</>}
        </div>
        {!isEarned && (
          <div className="mt-2 max-w-xs"><PBar value={(cert.pct||0)/100} h={6} color="#FF6B9D"/></div>
        )}
      </div>
      {isEarned ? (
        <PBtn variant="outline" size="sm" icon={I.download}>PDF</PBtn>
      ) : (
        <PBtn variant="coral" size="sm" iconRight={I.arrowRight}>Continue</PBtn>
      )}
    </div>
  );
}

/* ---------- Profile ---------- */
function Profile(){
  const I = window.Icons; const D = window.DATA;
  const { targetCode, level, trial, nav } = puseApp();
  const target = D.LANGS[targetCode];
  const t = puseT();

  const tabs = [
    { id:'certs',   label:t.profile.certs,     ic:I.award },
    { id:'streak',  label:t.profile.streakHist,ic:I.flame },
    { id:'sub',     label:t.profile.sub,       ic:I.crown },
  ];
  const { useState } = React;
  const [tab,setTab] = useState('certs');

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-7 animate-fade-in">
      {/* header card */}
      <PCard pad={false} className="overflow-hidden mb-6">
        <div className="h-24" style={{ background:'linear-gradient(135deg,#EFFCFB,#FFF1F6 70%,#EEF1FE)' }}/>
        <div className="px-5 sm:px-7 pb-6 -mt-10 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <PAvatar name="Layla N." size={84}/>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 tracking-tight">Layla Najib</h1>
            <p className="text-ink-500 font-medium text-sm">{t.profile.member} · Feb 2026 · layla@example.com</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <PBadge color="teal">{target.name} · {level}</PBadge>
              {trial.subscribed ? <PBadge color="coral"><I.crown size={12}/> Pro · Annual</PBadge>
                : trial.expired ? <PBadge color="rose">Trial expired</PBadge>
                : <PBadge color="sun">Trial · {trial.daysLeft}d left</PBadge>}
              <PBadge color="grass"><I.flame size={12}/> 24-day streak</PBadge>
            </div>
          </div>
          <PBtn variant="outline" icon={I.settings} onClick={()=>nav('settings')}>Settings</PBtn>
        </div>
      </PCard>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { ic:'flame', l:'Streak', v:'24', sub:'days', c:'#F84785', bg:'#FFF1F6' },
          { ic:'bolt',  l:'Total XP', v:'2,840', sub:'this year', c:'#D97706', bg:'#FFF4D6' },
          { ic:'award', l:'Certificates', v:'1', sub:'earned', c:'#1F9A92', bg:'#EFFCFB' },
          { ic:'clock', l:'Time studied', v:'18h', sub:'last 30 days', c:'#5B6CF0', bg:'#EEF1FE' },
        ].map((s,i)=>{
          const Ic = I[s.ic];
          return (
            <PCard key={i} pad={false} className="p-4 flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-2xl shrink-0" style={{ background:s.bg, color:s.c }}><Ic size={20}/></span>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold font-display text-ink-900 leading-none">{s.v}</div>
                <div className="text-[11px] text-ink-400 font-bold mt-0.5">{s.l} · {s.sub}</div>
              </div>
            </PCard>
          );
        })}
      </div>

      {/* tabs */}
      <div className="flex items-center gap-1.5 mb-5 border-b border-ink-100">
        {tabs.map(tb=>{
          const active = tab===tb.id;
          return (
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              className={pcx('flex items-center gap-2 h-12 px-4 -mb-px border-b-2 font-bold font-display text-sm transition-colors',
                active?'border-teal-400 text-ink-900':'border-transparent text-ink-500 hover:text-ink-800')}>
              <tb.ic size={16}/> {tb.label}
            </button>
          );
        })}
      </div>

      {/* tab content */}
      {tab==='certs' && (
        <div className="space-y-2.5 animate-fade-up">
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-2">{target.name}</div>
          {D.CERTS.map(c=> <CertRow key={c.level} cert={c} target={target}/>)}
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mt-6 mb-2">Other languages</div>
          {/* show locked rows for other target languages to suggest more */}
          {['de','en'].filter(c=>c!==targetCode).map(code=>(
            <CertRow key={code} cert={{ level:'A1', status:'in-progress', pct:0 }} target={D.LANGS[code]}/>
          ))}
        </div>
      )}

      {tab==='streak' && <div className="animate-fade-up"><StreakHeatmap/></div>}

      {tab==='sub' && (
        <div className="animate-fade-up grid lg:grid-cols-2 gap-4">
          <PCard className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:'linear-gradient(90deg,#4ECDC4,#7C8CF8,#FF6B9D)' }}/>
            <div className="flex items-start justify-between">
              <div>
                <PBadge color="coral" className="mb-2"><I.crown size={12}/> Pro plan</PBadge>
                <div className="text-xl font-extrabold font-display text-ink-900">{trial.subscribed?'Annual · $99/yr':trial.expired?'Trial expired':'Free trial'}</div>
                <div className="text-sm text-ink-500 font-medium mt-0.5">{trial.subscribed?'Next renewal: Feb 12, 2027':trial.expired?'Subscribe to continue':`Trial ends in ${trial.daysLeft} days`}</div>
              </div>
              <div className="text-end">
                <div className="text-3xl font-extrabold font-display text-ink-900">$8.25</div>
                <div className="text-[11px] text-ink-400 font-bold">/month</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-ink-100 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400">Payment</div>
                <div className="mt-1 font-bold font-display text-ink-800 flex items-center gap-2">
                  <span className="grid place-items-center w-8 h-6 rounded-md bg-ink-900 text-white text-[9px] font-extrabold">VISA</span>
                  •••• 4242
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400">Renewal</div>
                <div className="mt-1 font-bold font-display text-ink-800">Annual · auto</div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              {trial.subscribed ? (
                <>
                  <PBtn variant="outline" full>{t.profile.manage}</PBtn>
                  <PBtn variant="ghost" full>Cancel plan</PBtn>
                </>
              ) : (
                <PBtn variant="coral" full size="lg" iconRight={I.arrowRight} onClick={()=>nav('upgrade')}>Upgrade to Pro</PBtn>
              )}
            </div>
          </PCard>
          <PCard>
            <div className="font-extrabold font-display text-ink-900 mb-2">Billing history</div>
            {[
              { d:'12 Feb 2026', a:'$99.00', s:'Paid' },
              { d:'12 Feb 2025', a:'$99.00', s:'Paid' },
            ].map((row,i)=>(
              <div key={i} className="flex items-center gap-3 py-3 border-t first:border-t-0 border-ink-100">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-grass-50 text-grass-600 shrink-0"><I.check size={16} stroke={3}/></span>
                <div className="flex-1">
                  <div className="font-bold font-display text-ink-900 text-sm">Annual subscription</div>
                  <div className="text-xs text-ink-500 font-medium">{row.d}</div>
                </div>
                <div className="text-sm font-extrabold font-display text-ink-800">{row.a}</div>
                <button className="text-xs font-bold font-display text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"><I.download size={13}/> Invoice</button>
              </div>
            ))}
          </PCard>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SETTINGS
   ============================================================ */
function Settings(){
  const I = window.Icons; const D = window.DATA;
  const { uiLang, setUiLang, targetCode, setTarget, level, setLevel, nav } = puseApp();
  const { useState } = React;
  const [notif,setNotif] = useState({ daily:true, streak:true, marketing:false, weekly:true });
  const [dailyMin,setDailyMin] = useState(20);

  function Row({ icon, title, sub, action }){
    const Icon = window.Icons[icon];
    return (
      <div className="flex items-center gap-4 py-4 border-t first:border-t-0 border-ink-100">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-ink-100 text-ink-600 shrink-0"><Icon size={18}/></span>
        <div className="flex-1 min-w-0">
          <div className="font-bold font-display text-ink-900">{title}</div>
          {sub && <div className="text-xs text-ink-500 font-medium mt-0.5">{sub}</div>}
        </div>
        {action}
      </div>
    );
  }

  function Toggle({ value, onChange }){
    return (
      <button onClick={()=>onChange(!value)}
        className={pcx('relative w-11 h-6 rounded-full transition-colors', value?'bg-teal-400':'bg-ink-200')}>
        <span className={pcx('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-soft transition-all', value?'left-[22px]':'left-0.5')}/>
      </button>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-7 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={()=>nav('profile')} className="grid place-items-center w-10 h-10 rounded-xl text-ink-400 hover:bg-ink-100"><I.arrowLeft size={20} className="rtl:rotate-180"/></button>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 tracking-tight">Settings</h1>
      </div>

      <PCard className="mb-4">
        <h3 className="font-extrabold font-display text-ink-900 mb-2">Account</h3>
        <Row icon="user" title="Layla Najib" sub="layla@example.com"
          action={<PBtn variant="outline" size="sm">Edit</PBtn>}/>
        <Row icon="shield" title="Password" sub="Last changed 12 Feb 2026"
          action={<PBtn variant="outline" size="sm">Change</PBtn>}/>
        <Row icon="logout" title="Sign out" sub="On this device"
          action={<PBtn variant="ghost" size="sm" onClick={()=>nav('landing')}>Sign out</PBtn>}/>
      </PCard>

      <PCard className="mb-4">
        <h3 className="font-extrabold font-display text-ink-900 mb-2">Learning</h3>
        <Row icon="globe" title="UI language" sub="Used for instructions and explanations"
          action={
            <div className="inline-flex p-1 bg-ink-100 rounded-xl">
              {['en','ar'].map(c=>(
                <button key={c} onClick={()=>setUiLang(c)}
                  className={pcx('h-9 px-3 rounded-lg text-sm font-extrabold font-display', uiLang===c?'bg-white text-ink-900 shadow-soft':'text-ink-500')}>
                  {c==='en'?'English':'العربية'}
                </button>
              ))}
            </div>
          }/>
        <Row icon="book" title="Studying" sub="The language you're learning"
          action={
            <div className="inline-flex p-1 bg-ink-100 rounded-xl">
              {['ar','de','en'].map(c=>(
                <button key={c} onClick={()=>setTarget(c)}
                  className={pcx('h-9 px-2.5 rounded-lg flex items-center', targetCode===c?'bg-white shadow-soft':'opacity-70 hover:opacity-100')}>
                  <PFlag code={c} size={18}/>
                </button>
              ))}
            </div>
          }/>
        <Row icon="layers" title="CEFR level" sub={`Current: ${level}`}
          action={
            <select value={level} onChange={e=>setLevel(e.target.value)} className="bg-white border-2 border-ink-200 rounded-xl h-10 px-3 text-sm font-extrabold font-display text-ink-800 outline-none focus:border-teal-400">
              {['A1','A2','B1','B2','C1','C2'].map(l=>(<option key={l}>{l}</option>))}
            </select>
          }/>
        <Row icon="target" title="Daily goal" sub={`${dailyMin} minutes per day`}
          action={
            <div className="flex items-center gap-2">
              <button onClick={()=>setDailyMin(Math.max(5,dailyMin-5))} className="grid place-items-center w-8 h-8 rounded-lg bg-ink-100 text-ink-700 hover:bg-ink-200"><I.minus size={16}/></button>
              <span className="font-extrabold font-display text-ink-900 w-12 text-center tabular-nums">{dailyMin}m</span>
              <button onClick={()=>setDailyMin(Math.min(120,dailyMin+5))} className="grid place-items-center w-8 h-8 rounded-lg bg-ink-100 text-ink-700 hover:bg-ink-200"><I.plus size={16}/></button>
            </div>
          }/>
      </PCard>

      <PCard className="mb-4">
        <h3 className="font-extrabold font-display text-ink-900 mb-2">Notifications</h3>
        {[
          { k:'daily',     ic:'clock',    t:'Daily reminder',   s:'8:30 PM, every day' },
          { k:'streak',    ic:'flame',    t:'Streak protection',s:'Notify me when I might break my streak' },
          { k:'weekly',    ic:'calendar', t:'Weekly summary',   s:'Sundays, with stats and goals' },
          { k:'marketing', ic:'gift',     t:'Product updates',  s:'New features and tips' },
        ].map(row=>(
          <Row key={row.k} icon={row.ic} title={row.t} sub={row.s}
            action={<Toggle value={notif[row.k]} onChange={v=>setNotif({...notif,[row.k]:v})}/>}/>
        ))}
      </PCard>

      <PCard className="mb-4">
        <h3 className="font-extrabold font-display text-ink-900 mb-2">Privacy</h3>
        <Row icon="download" title="Export my data" sub="Download a copy of your learning history"
          action={<PBtn variant="outline" size="sm" icon={I.download}>Export</PBtn>}/>
        <Row icon="xCircle" title="Delete account" sub="Permanently delete all data"
          action={<PBtn variant="ghost" size="sm" className="!text-rose-600 hover:!bg-rose-50">Delete</PBtn>}/>
      </PCard>
    </div>
  );
}

/* ============================================================
   NOTIFICATIONS PANEL (modal sheet)
   ============================================================ */
function Notifications({ onClose }){
  const I = window.Icons;
  const items = [
    { ic:'flame',   bg:'#FFF1F6', c:'#F84785', title:'You kept your streak!',     body:'24 days in a row. One activity today keeps it alive.', time:'2h', dot:true },
    { ic:'award',   bg:'#FFF4D6', c:'#D97706', title:'A2 certificate ready',      body:'Your German A2 PDF is ready to download.',           time:'1d', dot:true },
    { ic:'sparkles',bg:'#EFFCFB', c:'#1F9A92', title:'New AI passage just for you',body:'Topic: At the market. Continue when ready.',         time:'2d', dot:false },
    { ic:'gift',    bg:'#EEF1FE', c:'#5B6CF0', title:'5 days left in your trial', body:'Upgrade to keep all four skill modes.',              time:'3d', dot:false },
  ];
  return (
    <div className="fixed inset-0 z-50 grid sm:place-items-start sm:justify-end bg-ink-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="bg-white w-full sm:w-[400px] sm:m-4 sm:rounded-3xl rounded-t-3xl shadow-lift p-5 animate-fade-up max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold font-display text-ink-900">Notifications</h3>
          <button onClick={onClose} className="grid place-items-center w-9 h-9 rounded-xl text-ink-400 hover:bg-ink-100"><I.x size={18}/></button>
        </div>
        <div className="space-y-2">
          {items.map((it,i)=>{
            const Ic = window.Icons[it.ic];
            return (
              <div key={i} className={pcx('relative flex items-start gap-3 p-3 rounded-2xl transition-colors hover:bg-ink-50', it.dot&&'ring-1 ring-teal-100 bg-teal-50/30')}>
                {it.dot && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-teal-500"/>}
                <span className="grid place-items-center w-10 h-10 rounded-xl shrink-0" style={{ background:it.bg, color:it.c }}><Ic size={18}/></span>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold font-display text-ink-900 text-sm">{it.title}</div>
                  <div className="text-xs text-ink-500 font-medium mt-0.5 leading-relaxed">{it.body}</div>
                </div>
                <span className="text-[11px] font-bold text-ink-400 shrink-0">{it.time}</span>
              </div>
            );
          })}
        </div>
        <button className="mt-3 w-full h-10 rounded-xl text-sm font-extrabold font-display text-ink-500 hover:text-ink-800 hover:bg-ink-50">Mark all as read</button>
      </div>
    </div>
  );
}

window.Profile = Profile;
window.Settings = Settings;
window.Notifications = Notifications;
