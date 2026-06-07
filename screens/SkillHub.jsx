// screens/SkillHub.jsx → window.SkillHub
const { cx:hcx, useApp:huseApp, useT:huseT, Card:HCard, Button:HBtn, Badge:HBadge, FlagTile:HFlag, FlagSVG:HFlagSVG, LevelChip:HLevel } = window.UI;
const { TrialBanner:HTrial } = window.Shared;

function SkillCard({ skill, locked, onClick }){
  const I = window.Icons;
  const t = huseT();
  const labelKey = t.dir==='rtl'?'ar':'en';
  const Icon = I[skill.icon];
  return (
    <button onClick={onClick}
      className={hcx('group relative rounded-3xl p-6 sm:p-7 text-start bg-white border border-ink-100 shadow-soft transition-all duration-200',
        'hover:-translate-y-1 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-offset-2',
        locked&&'opacity-90')}
      style={{ '--ring':skill.tint }}>
      {/* big icon */}
      <div className="flex items-start justify-between">
        <span className="grid place-items-center w-16 h-16 rounded-3xl transition-transform group-hover:scale-105"
          style={{ background:skill.tintBg, color:skill.tint, boxShadow:`inset 0 0 0 1.5px ${skill.tintRing}` }}>
          <Icon size={32}/>
        </span>
        {locked && <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink-100 text-ink-400"><I.lock size={16}/></span>}
      </div>
      <h3 className="mt-5 text-2xl font-extrabold font-display text-ink-900 tracking-tight">{skill.label[labelKey]||skill.label.en}</h3>
      <p className="text-ink-500 font-medium mt-1.5 leading-relaxed text-[15px]">{skill.desc[labelKey]||skill.desc.en}</p>
      {/* affordance bar */}
      <div className="mt-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-sm font-extrabold font-display" style={{ color:skill.tint }}>
          {t.hub.start} <I.arrowRight size={16} className="rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"/>
        </span>
        <span className="h-1.5 w-12 rounded-full" style={{ background:skill.tintBg }}>
          <span className="block h-full rounded-full transition-all group-hover:w-full" style={{ background:skill.tint, width:'40%' }}/>
        </span>
      </div>
    </button>
  );
}

function SkillHub(){
  const I = window.Icons;
  const D = window.DATA, C = window.CONTENT;
  const { targetCode, level, nav, trial, setTarget, uiLang } = huseApp();
  const t = huseT();
  const target = D.LANGS[targetCode];
  const isExpired = trial.expired;

  return (
    <div className="min-h-screen flex flex-col">
      <HTrial/>

      {/* hero */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-10 pb-6">
        <div className="text-center sm:text-start max-w-3xl">
          <HBadge color="teal" className="mb-3"><I.sparkles size={13}/> AI-tailored to {level}</HBadge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-ink-900 tracking-tight text-balance">{t.hub.title}</h1>
          <p className="text-ink-500 font-medium mt-2.5 leading-relaxed text-[17px] text-balance">{t.hub.sub}</p>
        </div>
      </section>

      {/* 4 skill cards */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {C.SKILLS.map(s=> <SkillCard key={s.id} skill={s} locked={isExpired} onClick={()=> isExpired? nav('upgrade') : nav(s.id) }/>)}
        </div>

        {/* secondary row: tiny stats / context */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          <HCard pad={false} className="p-4 flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-coral-50 text-coral-500 shrink-0"><I.flame size={20}/></span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ink-400 font-bold uppercase tracking-widest">Today</div>
              <div className="font-extrabold font-display text-ink-900">3-day streak</div>
            </div>
          </HCard>
          <HCard pad={false} className="p-4 flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-teal-50 text-teal-600 shrink-0"><I.brain size={20}/></span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ink-400 font-bold uppercase tracking-widest">Mode tip</div>
              <div className="font-bold font-display text-ink-900 text-sm">Mix modes daily for retention.</div>
            </div>
          </HCard>
          <HCard pad={false} className="p-4 flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-grass-50 text-grass-600 shrink-0"><I.target size={20}/></span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ink-400 font-bold uppercase tracking-widest">Daily goal</div>
              <div className="font-bold font-display text-ink-900 text-sm">2 / 3 activities done</div>
            </div>
          </HCard>
        </div>
      </section>
    </div>
  );
}
window.SkillHub = SkillHub;
