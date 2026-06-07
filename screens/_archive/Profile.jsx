// screens/Profile.jsx → window.Profile
const { cx:pcx, useApp:puseApp, useT:puseT, Card:PCard, Button:PBtn, Badge:PBadge, FlagTile:PFlag, FlagSVG:PFlagSVG, Avatar:PAvatar, ProgressBar:PBar, StreakFlame:PStreak } = window.UI;

/* certificate card — drawn, downloadable look */
function CertCard({ cert, target, name='Layla Nasser' }){
  const I = window.Icons;
  const earned = cert.status==='earned';
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lift" style={{
      background: earned
        ? 'linear-gradient(135deg, #fff 0%, #EFFCFB 50%, #FFF1F6 100%)'
        : 'linear-gradient(135deg, #F8FAFB 0%, #F1F4F6 100%)'
    }}>
      {/* decorative seal */}
      <svg className="absolute -right-10 -top-10 opacity-30" width="220" height="220" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" stroke={earned?'#FF6B9D':'#CBD4DC'} strokeWidth="1" fill="none"/>
        <circle cx="100" cy="100" r="70" stroke={earned?'#4ECDC4':'#CBD4DC'} strokeWidth="1" fill="none"/>
        <circle cx="100" cy="100" r="50" stroke={earned?'#FF6B9D':'#CBD4DC'} strokeWidth="1" fill="none"/>
      </svg>
      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-10 h-10 rounded-2xl bg-teal-400 text-white shadow-glow"><I.globe size={20}/></span>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] font-extrabold font-display text-ink-500">Lingo Language Academy</div>
              <div className="text-xs text-ink-400 font-bold">Certificate of Achievement</div>
            </div>
          </div>
          <PFlag lang={target} size={42}/>
        </div>

        <div className="mt-5">
          <div className="text-xs text-ink-400 font-bold mb-1">This certifies that</div>
          <div className="text-2xl font-extrabold font-display text-ink-900">{name}</div>
          <div className="text-xs text-ink-400 font-bold mt-3 mb-1">has achieved CEFR level</div>
          <div className="flex items-end gap-2">
            <div className="text-5xl font-extrabold font-display" style={{ color: earned?'#1F9A92':'#94A3B0' }}>{cert.level}</div>
            <div className="text-lg font-bold font-display text-ink-700 pb-1.5">· {cert.title}</div>
          </div>
          <div className="text-sm text-ink-500 font-medium mt-1">in {target.name}</div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] text-ink-400 font-bold uppercase tracking-widest">{earned?'Awarded':'Status'}</div>
            <div className="font-extrabold font-display text-ink-900">{earned? cert.date : `In progress · ${cert.pct||0}%`}</div>
          </div>
          {earned ? (
            <PBtn variant="dark" icon={I.download}>PDF</PBtn>
          ) : (
            <div className="flex-1 max-w-[180px]"><PBar value={(cert.pct||0)/100} h={8} color="#FF6B9D"/></div>
          )}
        </div>

        {!earned && <span className="absolute top-5 end-5"><PBadge color="coral">In progress</PBadge></span>}
        {earned && <span className="absolute top-5 end-5"><PBadge color="grass"><I.checkCircle size={13}/> Earned</PBadge></span>}
      </div>
    </div>
  );
}

function StreakHistory(){
  const D = window.DATA;
  const I = window.Icons;
  const grid = D.STREAK_GRID;
  // 6 rows × 7 days
  return (
    <PCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold font-display text-ink-900">Streak history</h3>
          <p className="text-sm text-ink-500 font-medium">Last 6 weeks · 24 active days</p>
        </div>
        <div className="flex items-center gap-1"><PStreak count={24} size={16}/></div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-[10px] text-ink-400 font-bold py-0.5">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><span key={d}>{d[0]}</span>)}
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1">
          {grid.map((v,i)=>{
            const bg = v===2? '#4ECDC4' : v===1? '#AEEEEA' : '#EDF1F4';
            return <div key={i} className="rounded-md" style={{ background:bg, aspectRatio:'1/1', minWidth:14 }} title={`Day ${i+1}`}/>;
          })}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 text-[11px] text-ink-400 font-bold">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink-100"/> Rest</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{background:'#AEEEEA'}}/> Partial</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{background:'#4ECDC4'}}/> Goal met</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[['24','Current','coral'],['58','Longest','teal'],['142','Total days','grass']].map(([v,l,c])=>(
          <div key={l} className="bg-ink-50 rounded-2xl py-3 text-center">
            <div className={pcx('text-2xl font-extrabold font-display', c==='coral'?'text-coral-500':c==='teal'?'text-teal-600':'text-grass-600')}>{v}</div>
            <div className="text-[11px] text-ink-400 font-bold mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </PCard>
  );
}

function Subscription(){
  const I = window.Icons;
  return (
    <PCard pad={false} className="p-6 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background:'linear-gradient(90deg,#4ECDC4,#7C8CF8,#FF6B9D)' }}/>
      <div className="flex items-start justify-between gap-3">
        <div>
          <PBadge color="teal" className="mb-2"><I.crown size={13}/> Pro plan</PBadge>
          <h3 className="font-extrabold font-display text-ink-900 text-lg">Lingo Pro · Annual</h3>
          <p className="text-sm text-ink-500 font-medium mt-0.5">All CEFR levels · 3 languages · AI tutor included</p>
        </div>
        <PBadge color="grass"><I.checkCircle size={13}/> Active</PBadge>
      </div>
      <div className="grid grid-cols-2 gap-3 my-5">
        <div className="bg-ink-50 rounded-2xl p-4">
          <div className="text-xs text-ink-400 font-bold uppercase tracking-widest">Next billing</div>
          <div className="font-extrabold font-display text-ink-900 mt-1">Feb 12, 2027</div>
          <div className="text-xs text-ink-500 font-medium mt-0.5">$168.00 / year · Visa •••• 4242</div>
        </div>
        <div className="bg-ink-50 rounded-2xl p-4">
          <div className="text-xs text-ink-400 font-bold uppercase tracking-widest">Member since</div>
          <div className="font-extrabold font-display text-ink-900 mt-1">Aug 3, 2025</div>
          <div className="text-xs text-ink-500 font-medium mt-0.5">10 months · 142 lessons completed</div>
        </div>
      </div>
      <div className="flex gap-2">
        <PBtn variant="outline" full icon={I.settings}>Manage plan</PBtn>
        <PBtn variant="ghost" icon={I.download}>Receipts</PBtn>
      </div>
    </PCard>
  );
}

function Profile(){
  const I = window.Icons; const D = window.DATA;
  const { targetCode, nav } = puseApp();
  const target = D.LANGS[targetCode];
  const t = puseT();

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-7 animate-fade-in">
      {/* header card */}
      <PCard pad={false} className="overflow-hidden mb-6">
        <div className="h-28 sm:h-32" style={{ background:'linear-gradient(135deg, #4ECDC4 0%, #7C8CF8 70%, #FF6B9D 130%)' }}/>
        <div className="px-6 sm:px-8 pb-6 -mt-12 sm:-mt-14 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <span className="ring-4 ring-white rounded-full"><PAvatar name="Layla Nasser" size={96}/></span>
          <div className="flex-1 sm:pb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-ink-900">Layla Nasser</h1>
            <p className="text-ink-500 font-medium">{t.profile.member} Aug 2025 · learning {target.name}</p>
          </div>
          <div className="flex gap-2">
            <PBtn variant="outline" icon={I.settings}>Settings</PBtn>
            <PBtn variant="ghost" icon={I.logout}>Sign out</PBtn>
          </div>
        </div>
        {/* stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-ink-100">
          {[
            { ic:I.flame, v:'24', l:'Day streak', c:'#F84785' },
            { ic:I.bolt,  v:'2,840', l:'Total XP', c:'#D97706' },
            { ic:I.book,  v:'142', l:'Lessons done', c:'#1F9A92' },
            { ic:I.trophy,v:'1', l:'Certificates', c:'#5B6CF0' },
          ].map((s,i)=>(
            <div key={i} className={pcx('flex items-center gap-3.5 px-5 py-4', i&&'border-s border-ink-100')}>
              <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background:s.c+'18', color:s.c }}><s.ic size={20}/></span>
              <div>
                <div className="text-xl font-extrabold font-display text-ink-900 leading-none">{s.v}</div>
                <div className="text-xs text-ink-400 font-bold mt-1">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </PCard>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* certificates */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold font-display text-ink-900 flex items-center gap-2"><I.award size={20} className="text-teal-500"/> {t.profile.certs}</h2>
            <span className="text-sm text-ink-500 font-medium">{D.CERTS.filter(c=>c.status==='earned').length} earned · {D.CERTS.length-D.CERTS.filter(c=>c.status==='earned').length} in progress</span>
          </div>
          {D.CERTS.map(c=> <CertCard key={c.level} cert={c} target={target}/>)}
          <PCard className="bg-gradient-to-br from-ink-50 to-white text-center border-dashed">
            <I.lock size={28} className="mx-auto text-ink-300"/>
            <h3 className="font-extrabold font-display text-ink-900 mt-3">Next up · B1 Intermediate</h3>
            <p className="text-sm text-ink-500 font-medium mt-1">Complete the A2 unit and pass the exam to unlock.</p>
            <PBtn variant="soft" className="mt-4" iconRight={I.arrowRight} onClick={()=>nav('exam')}>Continue to A2 exam</PBtn>
          </PCard>
        </div>

        {/* right column */}
        <div className="space-y-5">
          <StreakHistory/>
          <Subscription/>
        </div>
      </div>
    </div>
  );
}
window.Profile = Profile;
