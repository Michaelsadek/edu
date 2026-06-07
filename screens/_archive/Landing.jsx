// screens/Landing.jsx → window.Landing
const { cx:lncx, useApp:lnuseApp, Card:LnCard, Button:LnBtn, Badge:LnBadge, FlagTile:LnFlag, FlagSVG:LnFlagSVG } = window.UI;

/* sub: a CEFR pricing tier card */
function PricingCard({ tier, popular }){
  const I = window.Icons;
  return (
    <div className={lncx('relative rounded-3xl p-6 transition-all flex flex-col h-full',
      popular?'bg-ink-900 text-white shadow-lift -translate-y-1':'bg-white border border-ink-100 shadow-soft hover:-translate-y-0.5 hover:shadow-lift')}>
      {popular && <span className="absolute -top-3 start-6"><LnBadge color="coral"><I.sparkles size={13}/> Most popular</LnBadge></span>}
      <div className="flex items-baseline gap-2">
        <span className={lncx('text-2xl font-extrabold font-display', popular?'text-white':'text-ink-900')}>{tier.id}</span>
        <span className={lncx('text-sm font-bold', popular?'text-white/70':'text-ink-400')}>· {tier.label}</span>
      </div>
      <p className={lncx('text-sm mt-1.5 font-medium', popular?'text-white/70':'text-ink-500')}>{tier.blurb}</p>
      <div className="my-5">
        <div className="flex items-baseline gap-1">
          <span className={lncx('text-4xl font-extrabold font-display', popular?'text-white':'text-ink-900')}>${tier.price}</span>
          <span className={lncx('font-bold', popular?'text-white/60':'text-ink-400')}>/month</span>
        </div>
        <div className={lncx('text-xs font-bold mt-1', popular?'text-white/60':'text-ink-400')}>billed annually · all 3 languages</div>
      </div>
      <ul className={lncx('space-y-2.5 text-sm font-medium flex-1', popular?'text-white/90':'text-ink-700')}>
        {[
          'AI-generated reading passages',
          'Grammar lessons + worked examples',
          'Daily goal & streak tracking',
          tier.price>=14 ? 'Speaking practice with AI tutor' : 'Vocabulary in real contexts',
          tier.price>=19 ? 'Mock CEFR oral examination' : 'CEFR certificate on exam pass',
        ].map((f,i)=>(
          <li key={i} className="flex gap-2.5"><I.check size={18} stroke={2.5} className={popular?'text-teal-300 mt-0.5 shrink-0':'text-teal-500 mt-0.5 shrink-0'}/>{f}</li>
        ))}
      </ul>
      <LnBtn variant={popular?'primary':'outline'} full className="mt-6">Choose {tier.id}</LnBtn>
    </div>
  );
}

function HowStep({ n, icon:Icon, title, body, accent }){
  return (
    <div className="relative">
      <div className="grid place-items-center w-12 h-12 rounded-2xl text-white shadow-glow" style={{ background:accent }}>
        <Icon size={22}/>
      </div>
      <div className="absolute -top-2 -end-1 grid place-items-center w-7 h-7 rounded-full bg-white border-2 border-ink-100 text-xs font-extrabold font-display text-ink-700">{n}</div>
      <h3 className="font-extrabold font-display text-ink-900 text-lg mt-4">{title}</h3>
      <p className="text-ink-600 font-medium text-[15px] mt-1.5 leading-relaxed">{body}</p>
    </div>
  );
}

/* mini "phone" preview shown in the hero */
function HeroPreview(){
  const I = window.Icons; const D = window.DATA;
  return (
    <div className="relative">
      {/* faux device */}
      <div className="relative mx-auto rounded-[36px] bg-ink-900 p-2 shadow-lift" style={{ width:300, height:560 }}>
        <div className="relative bg-white rounded-[28px] h-full overflow-hidden">
          {/* notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink-900 rounded-b-2xl z-10"/>
          {/* status */}
          <div className="flex items-center justify-between text-[10px] font-bold text-ink-500 px-5 pt-2.5 pb-1">
            <span>9:41</span><span className="flex gap-1"><I.bolt size={11}/> 100%</span>
          </div>
          {/* card list */}
          <div className="px-4 pt-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] text-ink-400 font-bold">Welcome back,</div>
                <div className="text-base font-extrabold font-display text-ink-900">Layla</div>
              </div>
              <span className="flex items-center gap-1 text-coral-500 font-extrabold font-display text-sm"><I.flame size={14}/>24</span>
            </div>
            {/* streak ring */}
            <div className="rounded-2xl p-3 mb-3 flex items-center gap-3" style={{ background:'linear-gradient(135deg,#FFF1F6,#EFFCFB)' }}>
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 52 52" className="-rotate-90"><circle cx="26" cy="26" r="22" fill="none" stroke="#FFE0EC" strokeWidth="5"/>
                  <circle cx="26" cy="26" r="22" fill="none" stroke="#FF6B9D" strokeWidth="5" strokeLinecap="round" strokeDasharray={2*Math.PI*22} strokeDashoffset={2*Math.PI*22*0.4}/></svg>
                <div className="absolute inset-0 grid place-items-center text-xs font-extrabold font-display text-ink-900">60%</div>
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-ink-500 font-bold">Daily goal</div>
                <div className="font-extrabold font-display text-ink-900 text-sm">30 / 50 XP</div>
              </div>
            </div>
            {/* lesson card */}
            <div className="rounded-2xl border border-ink-100 p-3 mb-2 shadow-soft">
              <div className="flex items-center gap-2 mb-1.5"><LnFlag lang={D.LANGS.ar} size={26}/><span className="text-[11px] text-ink-400 font-bold">Arabic · A2</span></div>
              <div className="font-extrabold font-display text-ink-900 text-sm">At the Café</div>
              <div dir="rtl" className="font-ar text-coral-500 text-base font-bold">في المَقهى</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden"><div className="h-full bg-teal-400 rounded-full" style={{width:'55%'}}/></div>
                <span className="text-[10px] font-bold text-ink-400">4/6</span>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-100 p-3 shadow-soft">
              <div className="flex items-center gap-2 mb-1.5"><LnFlag lang={D.LANGS.de} size={26}/><span className="text-[11px] text-ink-400 font-bold">German · B1</span></div>
              <div className="font-extrabold font-display text-ink-900 text-sm">Im Restaurant</div>
              <div className="text-teal-600 text-[13px] font-bold">Bestellen & bezahlen</div>
            </div>
          </div>
        </div>
      </div>
      {/* floating accents */}
      <div className="absolute -top-4 -end-4 bg-white rounded-2xl shadow-lift p-3 flex items-center gap-2 animate-fade-up">
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-grass-50 text-grass-600"><I.checkCircle size={20}/></span>
        <div>
          <div className="text-xs text-ink-400 font-bold">+10 XP</div>
          <div className="text-sm font-extrabold font-display text-ink-900">Correct!</div>
        </div>
      </div>
      <div className="absolute -bottom-3 -start-4 bg-white rounded-2xl shadow-lift p-3 flex items-center gap-2 animate-fade-up" style={{ animationDelay:'.2s' }}>
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-coral-50 text-coral-500"><I.flame size={20}/></span>
        <div>
          <div className="text-xs text-ink-400 font-bold">Streak kept</div>
          <div className="text-sm font-extrabold font-display text-ink-900">24 days 🎉</div>
        </div>
      </div>
    </div>
  );
}

function Landing(){
  const { useState } = React;
  const I = window.Icons; const D = window.DATA;
  const { nav } = lnuseApp();
  const [email,setEmail] = useState('');
  const [joined,setJoined] = useState(false);

  return (
    <div className="min-h-screen" style={{ background:'#F4F7F9' }}>
      {/* nav */}
      <header className="bg-white/85 backdrop-blur border-b border-ink-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-400 text-white shadow-glow"><I.globe size={20}/></span>
            <span className="text-lg font-extrabold font-display text-ink-900">Lingo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold font-display text-ink-600">
            <a href="#how" className="hover:text-ink-900">How it works</a>
            <a href="#pricing" className="hover:text-ink-900">Pricing</a>
            <a href="#waitlist" className="hover:text-ink-900">Waitlist</a>
          </nav>
          <div className="flex items-center gap-2">
            <LnBtn variant="ghost" size="sm" onClick={()=>nav('onboarding')}>Sign in</LnBtn>
            <LnBtn variant="coral" size="sm" onClick={()=>nav('onboarding')}>Get started</LnBtn>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background:'radial-gradient(70% 60% at 80% 0%, #FFE0EC, transparent 70%), radial-gradient(60% 50% at 10% 30%, #D4F6F3, transparent 70%)' }}/>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div>
            <LnBadge color="coral" className="mb-4"><I.sparkles size={13}/> Now in beta · CEFR A1 → C2</LnBadge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-ink-900 leading-[1.05] tracking-tight text-balance">
              Learn <span className="text-teal-500">English</span>, <span className="text-coral-500">Arabic</span>, or <span style={{ color:'#5B6CF0' }}>German</span> —
              <br className="hidden sm:block"/>
              taught in <span className="relative">your language<svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M2 7 Q 80 -2 198 6" stroke="#FFD166" strokeWidth="4" fill="none" strokeLinecap="round"/></svg></span>.
            </h1>
            <p className="mt-6 text-lg text-ink-600 font-medium max-w-xl text-balance leading-relaxed">
              An AI tutor that writes you new reading passages, explains grammar in your native tongue, and adapts to your pace — until you can hold the conversation yourself.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LnBtn size="lg" variant="coral" iconRight={I.arrowRight} onClick={()=>nav('onboarding')}>Start learning free</LnBtn>
              <LnBtn size="lg" variant="outline" icon={I.play} onClick={()=>nav('dashboard')}>See the app</LnBtn>
            </div>
            {/* language chips */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-ink-400 uppercase tracking-widest">Now teaching</span>
              {['en','ar','de'].map(c=>(
                <span key={c} className="inline-flex items-center gap-2 bg-white border border-ink-100 rounded-full ps-1 pe-3 py-1 shadow-soft">
                  <LnFlag lang={D.LANGS[c]} size={26}/>
                  <span className="text-sm font-bold font-display text-ink-800">{D.LANGS[c].name}</span>
                  <span className="text-xs text-ink-400">·</span>
                  <span className="text-xs text-ink-500 font-medium">{D.LANGS[c].learners}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center"><HeroPreview/></div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-ink-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[['15M+','learners'],['CEFR','certified'],['4.9★','App Store'],['3','languages']].map(([v,l])=>(
            <div key={l}>
              <div className="text-2xl font-extrabold font-display text-ink-900">{v}</div>
              <div className="text-xs text-ink-500 font-bold uppercase tracking-widest mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <LnBadge color="teal" className="mb-3"><I.brain size={13}/> How it works</LnBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">Personal, paced, and patient.</h2>
            <p className="text-ink-600 font-medium mt-2 leading-relaxed">Every learner gets a different lesson because every learner brings a different starting point. Our AI keeps the ladder one rung above where you are.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
            <HowStep n="1" icon={I.target} title="Place yourself" body="A 10-question diagnostic finds your CEFR level so you don't waste a minute on what you already know." accent="#4ECDC4"/>
            <HowStep n="2" icon={I.sparkles} title="AI-tailored lessons" body="Grammar, vocabulary and reading passages generated fresh — at the right level, in your topic of interest." accent="#FF6B9D"/>
            <HowStep n="3" icon={I.bolt} title="Daily 15 minutes" body="Tiny, deliberate sessions. Streaks and a daily XP goal keep momentum without the burnout." accent="#FBBF24"/>
            <HowStep n="4" icon={I.award} title="Earn certificates" body="Pass a timed CEFR-style exam to unlock the next level and get a downloadable certificate." accent="#5B6CF0"/>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 sm:py-20 bg-white border-y border-ink-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <LnBadge color="coral" className="mb-3"><I.crown size={13}/> Pricing</LnBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight">Pay for the level you're learning.</h2>
            <p className="text-ink-600 font-medium mt-2 leading-relaxed">Tiered by CEFR difficulty, not arbitrary feature gates. Cancel anytime. Free trial for 14 days.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              { ids:['A1','A2'], price:9,  label:'Foundations', blurb:'For total beginners building survival vocabulary and grammar.' },
              { ids:['B1','B2'], price:14, label:'Conversational', blurb:'Hold real conversations in everyday and work contexts.', popular:true },
              { ids:['C1','C2'], price:19, label:'Mastery',       blurb:'Express anything with nuance, idiom and confidence.' },
            ].map((tier,i)=>(
              <PricingCard key={i} popular={tier.popular} tier={{ id:tier.ids.join(' · '), label:tier.label, price:tier.price, blurb:tier.blurb }}/>
            ))}
          </div>
          {/* per-level tier breakdown */}
          <div className="mt-10 bg-ink-50 rounded-3xl p-2">
            <div className="grid grid-cols-6 text-center">
              {D.CEFR.map((t,i)=>(
                <div key={t.id} className={lncx('py-4 px-2', i<D.CEFR.length-1&&'border-e border-ink-100')}>
                  <div className="text-lg font-extrabold font-display text-ink-900">{t.id}</div>
                  <div className="text-[11px] text-ink-400 font-bold uppercase tracking-widest mt-0.5">{t.label}</div>
                  <div className="mt-2 text-sm font-bold text-ink-700">${t.price}<span className="text-ink-400 text-xs font-medium">/mo</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <LnBadge color="teal" className="mb-3"><I.gift size={13}/> Beta</LnBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-ink-900 tracking-tight text-balance">Join the waitlist for the next language.</h2>
          <p className="text-ink-600 font-medium mt-2">French, Spanish and Japanese are next. Get a one-month free Pro upgrade when your language launches.</p>
          {!joined ? (
            <form onSubmit={(e)=>{ e.preventDefault(); if(email) setJoined(true); }} className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
                className="flex-1 h-14 px-5 rounded-2xl border-2 border-ink-200 bg-white outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 text-ink-900 font-semibold placeholder:text-ink-300"/>
              <LnBtn size="lg" variant="coral" type="submit" iconRight={I.send}>Join</LnBtn>
            </form>
          ) : (
            <div className="mt-7 max-w-md mx-auto bg-grass-50 rounded-2xl p-5 flex items-center gap-3 animate-fade-up">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-grass-500 text-white shrink-0"><I.checkCircle size={22}/></span>
              <div className="text-start"><div className="font-extrabold font-display text-grass-700">You're on the list!</div><div className="text-sm text-grass-700/80 font-medium">We'll email <b>{email}</b> when the next language ships.</div></div>
            </div>
          )}
          <div className="mt-8 flex items-center justify-center gap-3 text-ink-400 text-xs font-bold">
            <I.shield size={14}/> No spam · unsubscribe anytime
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid sm:grid-cols-2 gap-6 items-center">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-400 text-white"><I.globe size={20}/></span>
            <span className="text-lg font-extrabold font-display text-ink-900">Lingo</span>
            <span className="text-sm text-ink-400 font-medium ms-2">© 2026</span>
          </div>
          <div className="flex items-center gap-5 sm:justify-end text-sm font-bold font-display text-ink-500">
            <a href="#" className="hover:text-ink-900">Privacy</a>
            <a href="#" className="hover:text-ink-900">Terms</a>
            <a href="#" className="hover:text-ink-900">Contact</a>
            <a href="#" className="hover:text-ink-900">Press kit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
window.Landing = Landing;
