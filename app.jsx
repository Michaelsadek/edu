// app.jsx — unified shell wiring every screen
const { useState:aUseState, useEffect:aUseEffect } = React;
const { AppCtx, cx:acx, FlagTile:AFlag, FlagSVG:AFlagSVG, Avatar:AAvatar, StreakFlame:AStreak, LevelChip:ALevel, Badge:ABadge, useT:auseT } = window.UI;
const {
  useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "uiLang": "en",
  "target": "ar",
  "level": "A2",
  "trial": "active",
  "subscribed": false,
  "screen": "landing"
}/*EDITMODE-END*/;

// route taxonomy: marketing (chromeless light), immersive (chromeless), app (full chrome)
const ROUTE_KIND = {
  landing:'marketing', onboarding:'immersive', upgrade:'immersive',
  lesson:'immersive', lessonComplete:'immersive', exam:'immersive',
  dashboard:'app', skillHub:'app', reading:'immersive', listening:'immersive',
  speaking:'immersive', writing:'immersive', profile:'app', settings:'app',
  levelSelect:'app', quiz:'immersive',
};
const VALID = Object.keys(ROUTE_KIND);

const APP_NAV = [
  { id:'dashboard', icon:'home',    label:'Home' },
  { id:'skillHub',  icon:'sparkles',label:'Practice' },
  { id:'lesson',    icon:'book',    label:'Lessons' },
  { id:'exam',      icon:'trophy',  label:'Exam' },
  { id:'profile',   icon:'user',    label:'Profile' },
];

const APP_NAV_AR = {
  dashboard:'الرئيسية', skillHub:'تدرّب', lesson:'الدروس', exam:'الاختبار', profile:'الملف'
};

function loadScreen(initial){ try{ const s=localStorage.getItem('lingo.screen'); return VALID.includes(s)?s:initial; }catch(e){ return initial; } }

function TopBar({ onNotif }){
  const { uiLang, targetCode, setTarget, level, nav, trial } = window.UI.useApp();
  const D = window.DATA;
  const I = window.Icons;
  const target = D.LANGS[targetCode];
  const [openLang, setOpenLang] = aUseState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur border-b border-ink-100">
      <div className="px-5 sm:px-7 h-16 flex items-center gap-3">
        {/* mobile logo */}
        <div className="md:hidden flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-400 text-white"><I.globe size={18}/></span>
          <span className="font-extrabold font-display text-ink-900">Lingo</span>
        </div>
        <div className="hidden md:block flex-1"/>

        {/* language switcher */}
        <div className="relative">
          <button onClick={()=>setOpenLang(o=>!o)}
            className="flex items-center gap-2 bg-white border border-ink-200 rounded-2xl px-3 h-10 hover:border-ink-300 transition-colors">
            <AFlag lang={target} size={26}/>
            <span className="text-sm font-bold font-display text-ink-800 hidden sm:inline">{target.name}</span>
            <ALevel level={level} active/>
            <I.chevronDown size={14} className="text-ink-400"/>
          </button>
          {openLang && (
            <div className="absolute end-0 mt-2 w-56 bg-white border border-ink-100 rounded-2xl shadow-lift p-2 animate-fade-up">
              <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-400 px-2 py-1.5">Studying</div>
              {['ar','de','en'].map(c=>{
                const L = D.LANGS[c];
                return (
                  <button key={c} onClick={()=>{ setTarget(c); setOpenLang(false); }}
                    className={acx('w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors',
                      targetCode===c?'bg-teal-50':'hover:bg-ink-50')}>
                    <AFlag lang={L} size={28}/>
                    <span className="flex-1 text-start text-sm font-bold font-display text-ink-800">{L.name}</span>
                    {targetCode===c && <I.check size={16} className="text-teal-600" stroke={3}/>}
                  </button>
                );
              })}
              <div className="border-t border-ink-100 mt-2 pt-1.5">
                <button onClick={()=>{ setOpenLang(false); nav('levelSelect'); }} className="w-full text-start px-2 py-2 rounded-xl text-sm font-bold font-display text-ink-600 hover:bg-ink-50 flex items-center gap-2">
                  <I.layers size={15}/> Change level
                </button>
              </div>
            </div>
          )}
        </div>

        {/* streak chip */}
        <div className="hidden sm:flex items-center gap-1.5 h-10 px-3 rounded-2xl bg-coral-50 text-coral-600">
          <AStreak count={24} size={16}/>
        </div>

        {/* notif */}
        <button onClick={onNotif} className="relative grid place-items-center w-10 h-10 rounded-xl text-ink-500 hover:bg-ink-100">
          <I.message size={20}/>
          <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-coral-400 ring-2 ring-white"/>
        </button>

        {/* avatar */}
        <button onClick={()=>nav('profile')} className="grid place-items-center rounded-full ring-2 ring-transparent hover:ring-teal-200 transition">
          <AAvatar name="Layla N." size={36}/>
        </button>
      </div>
    </header>
  );
}

function Sidebar(){
  const { screen, nav, uiLang } = window.UI.useApp();
  const I = window.Icons;
  return (
    <aside className="hidden md:flex flex-col w-[248px] shrink-0 bg-white border-e border-ink-100 sticky top-0 h-screen">
      <button onClick={()=>nav('landing')} className="px-6 h-16 flex items-center gap-2.5 hover:bg-ink-50 transition-colors">
        <span className="grid place-items-center w-10 h-10 rounded-2xl bg-teal-400 text-white shadow-glow"><I.globe size={20}/></span>
        <span className="text-xl font-extrabold font-display text-ink-900 tracking-tight">Lingo</span>
      </button>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {APP_NAV.map(it=>{
          const Icon = I[it.icon];
          const active = screen===it.id || (it.id==='lesson' && screen==='lessonComplete')
            || (it.id==='skillHub' && ['reading','listening','speaking','writing','levelSelect'].includes(screen));
          const label = uiLang==='ar' ? (APP_NAV_AR[it.id]||it.label) : it.label;
          return (
            <button key={it.id} onClick={()=>nav(it.id)}
              className={acx('w-full flex items-center gap-3 px-3.5 h-12 rounded-2xl font-semibold font-display transition-colors',
                active?'bg-teal-50 text-teal-700':'text-ink-500 hover:bg-ink-50 hover:text-ink-800')}>
              <Icon size={21}/>
              <span className="flex-1 text-start">{label}</span>
              {active && <span className="w-1.5 h-1.5 rounded-full bg-teal-400"/>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-ink-100 space-y-1">
        <button onClick={()=>nav('settings')} className="w-full flex items-center gap-3 px-3.5 h-10 rounded-xl text-sm font-semibold text-ink-500 hover:bg-ink-50 hover:text-ink-800">
          <I.settings size={17}/> {uiLang==='ar'?'الإعدادات':'Settings'}
        </button>
        <button onClick={()=>nav('upgrade')} className="w-full flex items-center gap-3 px-3.5 h-10 rounded-xl text-sm font-semibold text-coral-600 hover:bg-coral-50">
          <I.crown size={17}/> {uiLang==='ar'?'الترقية':'Upgrade'}
        </button>
        <AccountChip/>
      </div>
    </aside>
  );
}

function AccountChip(){
  const { trial, targetCode } = window.UI.useApp();
  const D = window.DATA;
  return (
    <div className="flex items-center gap-3 px-2.5 pt-3 mt-2 border-t border-ink-100">
      <AAvatar name="Layla N." size={36}/>
      <div className="min-w-0">
        <div className="font-bold font-display text-ink-900 text-sm truncate">Layla N.</div>
        <div className="text-xs text-ink-400 font-medium">{trial.subscribed?'Pro':trial.expired?'Trial expired':`Trial · ${trial.daysLeft}d`} · {D.LANGS[targetCode].name}</div>
      </div>
    </div>
  );
}

function MobileTabs(){
  const { screen, nav, uiLang } = window.UI.useApp();
  const I = window.Icons;
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-ink-100 h-[72px] px-2 flex items-center justify-around">
      {APP_NAV.map(it=>{
        const Icon = I[it.icon];
        const active = screen===it.id;
        const label = uiLang==='ar' ? (APP_NAV_AR[it.id]||it.label) : it.label;
        return (
          <button key={it.id} onClick={()=>nav(it.id)}
            className={acx('flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors',
              active?'text-teal-600':'text-ink-400')}>
            <Icon size={22}/>
            <span className="text-[11px] font-extrabold font-display">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function ScreenJumper({ onPick, screen }){
  const groups = [
    { label:'Marketing', items:[['landing','Landing']] },
    { label:'Auth', items:[['onboarding','Onboarding']] },
    { label:'App', items:[['dashboard','Dashboard'],['skillHub','Skill hub'],['levelSelect','Level select'],['lesson','Lesson'],['lessonComplete','Lesson complete'],['quiz','Quiz'],['exam','Exam'],['profile','Profile'],['settings','Settings']] },
    { label:'Modes', items:[['reading','Reading'],['listening','Listening'],['speaking','Speaking'],['writing','Writing']] },
    { label:'Paywall', items:[['upgrade','Upgrade']] },
  ];
  return (
    <div className="space-y-3">
      {groups.map(g=>(
        <div key={g.label}>
          <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink-400 px-1 mb-1.5">{g.label}</div>
          <div className="grid grid-cols-2 gap-1.5">
            {g.items.map(([id,label])=>(
              <button key={id} onClick={()=>onPick(id)}
                className={acx('h-9 px-2.5 rounded-xl text-[12px] font-bold font-display text-start transition-colors',
                  screen===id?'bg-teal-400 text-white':'bg-ink-100 text-ink-700 hover:bg-ink-200')}>
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function App(){
  const [t,setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen,setScreen] = aUseState(()=>loadScreen(t.screen||'landing'));
  const [notifOpen,setNotifOpen] = aUseState(false);
  const I = window.Icons;
  const D = window.DATA, C = window.CONTENT;

  const uiDir = D.STR[t.uiLang]?.dir || 'ltr';
  const STR = D.STR[t.uiLang] || D.STR.en;

  aUseEffect(()=>{ try{ localStorage.setItem('lingo.screen',screen); }catch(e){} },[screen]);
  aUseEffect(()=>{
    document.documentElement.dir = uiDir;
    document.documentElement.lang = t.uiLang;
    document.body.style.fontFamily = t.uiLang==='ar' ? "'Cairo','Tajawal',sans-serif" : "";
  },[uiDir,t.uiLang]);

  function nav(s){
    if(!VALID.includes(s)) s='dashboard';
    setScreen(s);
    setTweak('screen',s);
    window.scrollTo&&window.scrollTo(0,0);
  }

  const trial = (() => {
    if (t.subscribed) return { subscribed:true, active:false, daysLeft:0, total:7, expired:false };
    if (t.trial==='expired') return { subscribed:false, active:false, daysLeft:0, total:7, expired:true };
    return { subscribed:false, active:true, daysLeft:C.TRIAL.daysLeft, total:C.TRIAL.total, expired:false };
  })();

  const ctx = {
    uiLang:t.uiLang, setUiLang:(v)=>setTweak('uiLang',v),
    targetCode:t.target, setTarget:(v)=>setTweak('target',v),
    nativeCode:t.uiLang,
    level:t.level, setLevel:(v)=>setTweak('level',v),
    trial,
    subscribe:()=>setTweak({ subscribed:true, trial:'active' }),
    expireTrial:()=>setTweak('trial','expired'),
    screen, nav,
  };

  function renderScreen(){
    switch(screen){
      case 'landing':       return <window.Landing/>;
      case 'onboarding':    return <window.Onboarding/>;
      case 'dashboard':     return <window.Dashboard/>;
      case 'skillHub':      return <window.SkillHub/>;
      case 'levelSelect':   return <window.LevelSelect/>;
      case 'lesson':        return <window.Lesson/>;
      case 'lessonComplete':return <window.LessonComplete/>;
      case 'quiz':          return <window.QuizScreen/>;
      case 'reading':       return <window.Reading/>;
      case 'listening':     return <window.Listening/>;
      case 'speaking':      return <window.Speaking/>;
      case 'writing':       return <window.Writing/>;
      case 'exam':          return <window.Exam/>;
      case 'profile':       return <window.Profile/>;
      case 'settings':      return <window.Settings/>;
      case 'upgrade':       return <window.Upgrade/>;
      default:              return <window.Dashboard/>;
    }
  }

  const kind = ROUTE_KIND[screen] || 'app';

  return (
    <AppCtx.Provider value={ctx}>
      <div dir={uiDir} className={acx('min-h-screen', t.uiLang==='ar'&&'font-ar')} style={{ background:'#F4F7F9' }}>
        {kind==='app' ? (
          <div className="min-h-screen flex">
            <Sidebar/>
            <div className="flex-1 min-w-0 flex flex-col">
              <TopBar onNotif={()=>setNotifOpen(true)}/>
              <main className="flex-1 pb-24 md:pb-0">{renderScreen()}</main>
              <MobileTabs/>
            </div>
          </div>
        ) : (
          renderScreen()
        )}

        {notifOpen && <window.Notifications onClose={()=>setNotifOpen(false)}/>}

        {/* Tweaks panel */}
        <TweaksPanel title="Tweaks">
          <TweakSection label="Jump to screen"/>
          <ScreenJumper screen={screen} onPick={nav}/>

          <TweakSection label="Interface"/>
          <TweakRadio label="UI language" value={t.uiLang}
            options={[{value:'en',label:'English'},{value:'ar',label:'العربية'}]}
            onChange={(v)=>setTweak('uiLang',v)} />
          <p className="px-1 -mt-1 text-[11px] text-ink-400 leading-snug">
            Arabic flips the UI to RTL. Lesson content keeps the direction of the language being learned.
          </p>

          <TweakSection label="Learning"/>
          <TweakRadio label="Studying" value={t.target}
            options={[{value:'ar',label:'العربية'},{value:'de',label:'Deutsch'},{value:'en',label:'English'}]}
            onChange={(v)=>setTweak('target',v)} />
          <TweakSelect label="CEFR level" value={t.level}
            options={['A1','A2','B1','B2','C1','C2'].map(l=>({value:l,label:l}))}
            onChange={(v)=>setTweak('level',v)} />

          <TweakSection label="Account"/>
          <TweakRadio label="Trial state" value={t.subscribed?'subscribed':t.trial}
            options={[{value:'active',label:'Active'},{value:'expired',label:'Expired'},{value:'subscribed',label:'Pro'}]}
            onChange={(v)=>{
              if(v==='subscribed') setTweak({ subscribed:true, trial:'active' });
              else setTweak({ subscribed:false, trial:v });
            }} />
        </TweaksPanel>
      </div>
    </AppCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
