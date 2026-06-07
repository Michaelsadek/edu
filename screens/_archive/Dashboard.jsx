// screens/Dashboard.jsx → window.Dashboard
const { cx, useApp, useT, Card, Button, Badge, LevelChip, FlagTile, ProgressRing, ProgressBar, StreakFlame, Avatar } = window.UI;

function StatTile({ icon, label, value, sub, color, bg }) {
  return (
    <Card pad={false} className="p-5 flex items-center gap-4" hover>
      <span className="grid place-items-center w-12 h-12 rounded-2xl shrink-0" style={{ background:bg, color }}>{icon}</span>
      <div className="min-w-0">
        <div className="text-2xl font-extrabold font-display text-ink-900 leading-none">{value}</div>
        <div className="text-[13px] text-ink-500 font-medium mt-1 truncate">{label}{sub&&<span className="text-ink-400"> · {sub}</span>}</div>
      </div>
    </Card>
  );
}

function RoadmapNode({ node, target, isLast }) {
  const I = window.Icons;
  const state = node.state;
  const ring = target.tint;
  const styles = {
    done:{ bg:'#fff', border:ring, fg:ring, badge:'teal' },
    current:{ bg:ring, border:ring, fg:'#fff', badge:'coral' },
    locked:{ bg:'#F1F4F6', border:'#E4E9EE', fg:'#94A3B0', badge:'ink' },
  }[state];
  return (
    <div className="flex flex-col items-center shrink-0" style={{ width:96 }}>
      <div className="relative">
        <div className="grid place-items-center rounded-3xl border-2 transition-transform hover:scale-105"
          style={{ width:64, height:64, background:styles.bg, borderColor:styles.border, color:styles.fg }}>
          {state==='locked' ? <I.lock size={22}/> : state==='done' ? <I.check size={26} stroke={3}/> :
            <span className="font-extrabold font-display text-lg">{node.id}</span>}
          {state==='current' && <span className="absolute -inset-1 rounded-[26px] border-2 animate-ping" style={{ borderColor:ring, opacity:.4 }}/>}
        </div>
      </div>
      <div className={cx('mt-2.5 text-sm font-extrabold font-display', state==='locked'?'text-ink-400':'text-ink-800')}>{node.id}</div>
      <div className="text-[11px] text-ink-400 font-medium">{node.lessons} lessons</div>
    </div>
  );
}

function Connector({ done }) {
  return <div className="flex-1 h-1 rounded-full mt-8 mx-1" style={{ background: done?'#4ECDC4':'#E4E9EE' }}/>;
}

function Dashboard() {
  const t = useT();
  const { targetCode, nav } = useApp();
  const D = window.DATA, I = window.Icons;
  const target = D.LANGS[targetCode];
  const lesson = D.LESSONS[targetCode];
  const goalDone = 30, goalTotal = 50; // XP
  const goalPct = goalDone/goalTotal;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-7 animate-fade-in">
      {/* header */}
      <div className="flex items-center justify-between gap-4 mb-7">
        <div>
          <div className="text-sm text-ink-500 font-medium">{t.dash.greeting},</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900 tracking-tight">Layla 👋</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-2 bg-white border border-ink-100 rounded-2xl px-3.5 h-11 shadow-soft">
            <FlagTile lang={target} size={26}/>
            <span className="text-sm font-bold font-display text-ink-800">{target.name}</span>
            <LevelChip level={lesson.level} active/>
          </span>
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <StatTile icon={<I.layers size={22}/>} value={lesson.level} label="Current level" sub={D.CEFR.find(c=>c.id===lesson.level)?.label} color="#1F9A92" bg="#EFFCFB"/>
        <StatTile icon={<I.flame size={22}/>} value="24" label={t.dash.streak} sub={t.dash.keepGoing} color="#F84785" bg="#FFF1F6"/>
        <StatTile icon={<I.bolt size={22}/>} value="30" label={t.dash.xpToday} sub="+12 vs avg" color="#D97706" bg="#FFF4D6"/>
        <StatTile icon={<I.target size={22}/>} value="64%" label="Level progress" color="#5B6CF0" bg="#EEF1FE"/>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* continue lesson — spans 2 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card pad={false} className="overflow-hidden">
            <div className="relative p-6 sm:p-7" style={{ background:`linear-gradient(135deg, ${target.tintBg}, #fff 70%)` }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge color="coral"><I.sparkles size={13}/> {t.dash.next}</Badge>
                  <h2 className="mt-3 text-xl sm:text-2xl font-extrabold font-display text-ink-900">{lesson.title}</h2>
                  <div className="mt-1 text-ink-500 text-sm font-medium">{lesson.unit} · {t.lesson.grammar} → {t.lesson.quiz}</div>
                  {/* learned-language subtitle renders in learned direction */}
                  <div dir={lesson.dir} className={cx('mt-2 text-lg font-bold', lesson.dir==='rtl'?'font-ar text-coral-500':'text-teal-600')}>{lesson.titleNative}</div>
                </div>
                <FlagTile lang={target} size={56} className="hidden sm:inline-flex"/>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <Button size="lg" variant="coral" iconRight={I.arrowRight} onClick={()=>nav('lesson')}>{t.dash.continue}</Button>
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-xs font-semibold text-ink-500 mb-1.5"><span>Lesson 4 of 6</span><span>~8 min</span></div>
                  <ProgressBar value={0.55} color={target.tint}/>
                </div>
              </div>
            </div>
          </Card>

          {/* unit lessons */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold font-display text-ink-900">{lesson.unit}</h3>
              <Badge color="teal">{D.UNIT_LESSONS.filter(l=>l.state==='done').length}/{D.UNIT_LESSONS.length} done</Badge>
            </div>
            <div className="flex flex-col gap-1.5">
              {D.UNIT_LESSONS.map(l=>{
                const lock = l.state==='locked';
                return (
                  <button key={l.id} disabled={lock} onClick={()=>nav('lesson')}
                    className={cx('group flex items-center gap-3.5 p-3 rounded-2xl text-start transition-all',
                      lock?'opacity-60 cursor-not-allowed':'hover:bg-ink-50', l.state==='current'&&'bg-teal-50/60 ring-1 ring-teal-100')}>
                    <span className={cx('grid place-items-center w-9 h-9 rounded-xl shrink-0 text-sm font-extrabold font-display',
                      l.state==='done'?'bg-teal-400 text-white': l.state==='current'?'bg-coral-400 text-white':'bg-ink-100 text-ink-400')}>
                      {l.state==='done'?<I.check size={18} stroke={3}/>: lock?<I.lock size={15}/>: l.id}
                    </span>
                    <span className="flex-1 font-semibold font-display text-ink-800">{l.title}</span>
                    {l.state==='current' && <Badge color="coral">Continue</Badge>}
                    {!lock && <I.chevronRight size={18} className="text-ink-300 group-hover:text-ink-500 rtl:rotate-180"/>}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* right column: goal ring + roadmap teaser */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col items-center text-center">
            <h3 className="self-start font-extrabold font-display text-ink-900 mb-1">{t.dash.goal}</h3>
            <p className="self-start text-sm text-ink-500 font-medium mb-4">{20} {t.dash.minLeft}</p>
            <ProgressRing value={goalPct} size={150} color="#FF6B9D">
              <div className="text-center">
                <div className="text-3xl font-extrabold font-display text-ink-900">{goalDone}</div>
                <div className="text-xs text-ink-400 font-bold">/ {goalTotal} XP</div>
              </div>
            </ProgressRing>
            <div className="mt-5 w-full flex items-center justify-center gap-2 bg-coral-50 text-coral-600 rounded-2xl py-3 font-bold font-display text-sm">
              <StreakFlame count={24}/> <span className="text-coral-400">·</span> {t.dash.keepGoing}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-1">
              <I.award size={18} className="text-teal-500"/>
              <h3 className="font-extrabold font-display text-ink-900">{t.dash.roadmap}</h3>
            </div>
            <p className="text-sm text-ink-500 font-medium mb-4">A1 → C2 · {target.name}</p>
            <div className="-mx-2 px-2 overflow-x-auto no-scrollbar">
              <div className="flex items-start min-w-max pb-1">
                {D.ROADMAP.map((n,i)=>(
                  <React.Fragment key={n.id}>
                    <RoadmapNode node={n} target={target} isLast={i===D.ROADMAP.length-1}/>
                    {i<D.ROADMAP.length-1 && <Connector done={n.state==='done'}/>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <Button variant="soft" full className="mt-4" iconRight={I.arrowRight} onClick={()=>nav('exam')}>
              Take the {lesson.level} level exam
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
window.Dashboard = Dashboard;
