// ds/foundations.jsx → window.Foundations
const { cx:fcx, Section:FSection, Sub:FSub, Frame:FFrame, Swatch:FSwatch, TokenRow:FTok, Mono:FMono, DSFlag:FFlag } = window.DS;

/* ---------- COLOR ---------- */
function ColorRamp({ name, scale, role }){
  const keys = Object.keys(scale);
  return (
    <div className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden">
      <div className="flex items-baseline justify-between px-4 py-3 border-b border-ink-100">
        <span className="font-extrabold font-display text-ink-900 text-sm">{name}</span>
        <span className="mono text-[11px] text-ink-400">{role}</span>
      </div>
      <div className="grid grid-cols-10 sm:grid-cols-10">
        {keys.map((k,i)=>(
          <div key={k} className="flex flex-col items-center py-3 border-s first:border-s-0 border-ink-50">
            <span className="block w-7 h-7 sm:w-8 sm:h-8 rounded-md mb-1.5" style={{ background:scale[k] }}/>
            <span className="text-[10px] font-bold text-ink-700">{k}</span>
            <span className="mono text-[9px] text-ink-400 hidden sm:block">{scale[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TEAL = { 50:'#EFFCFB',100:'#D4F6F3',200:'#AEEEEA',300:'#7BE2DC',400:'#4ECDC4',500:'#2FB8AE',600:'#1F9A92',700:'#1B7B75',800:'#1A625E',900:'#19514E' };
const CORAL = { 50:'#FFF1F6',100:'#FFE0EC',200:'#FFC2D9',300:'#FF9CBE',400:'#FF6B9D',500:'#F84785',600:'#E42168',700:'#BF1453',800:'#9E1448',900:'#85143F' };
const INK = { 50:'#F8FAFB',100:'#F1F4F6',200:'#E4E9EE',300:'#CBD4DC',400:'#94A3B0',500:'#64748B',600:'#475569',700:'#334155',800:'#1E293B',900:'#0F1B2A' };
const GRASS = { 50:'#ECFDF3',100:'#D1FADF',400:'#34D399',500:'#22C55E',600:'#16A34A',700:'#15803D' };
const ROSE = { 50:'#FEF2F2',100:'#FEE2E2',400:'#F87171',500:'#EF4444',600:'#DC2626',700:'#B91C1C' };
const SUN = { 100:'#FFF4D6',400:'#FFD166',500:'#FBBF24' };

const SEMANTIC_LIGHT = [
  { name:'Background',         role:'bg',         token:'--bg',          value:'#F4F7F9', swatch:{ background:'#F4F7F9', boxShadow:'inset 0 0 0 1px #E4E9EE' } },
  { name:'Surface',            role:'surface',    token:'--surface',     value:'#FFFFFF', swatch:{ background:'#FFFFFF', boxShadow:'inset 0 0 0 1px #E4E9EE' } },
  { name:'Surface raised',     role:'surface-2',  token:'--surface-2',   value:'#F1F4F6', swatch:{ background:'#F1F4F6' } },
  { name:'Border / divider',   role:'border',     token:'--border',      value:'#E4E9EE', swatch:{ background:'#E4E9EE' } },
  { name:'Text · primary',     role:'text',       token:'--text',        value:'#0F1B2A', swatch:{ background:'#0F1B2A' } },
  { name:'Text · muted',       role:'text-muted', token:'--text-muted',  value:'#64748B', swatch:{ background:'#64748B' } },
  { name:'Text · subtle',      role:'text-subtle',token:'--text-subtle', value:'#94A3B0', swatch:{ background:'#94A3B0' } },
  { name:'Primary',            role:'primary',    token:'--primary',     value:'#4ECDC4', swatch:{ background:'#4ECDC4' } },
  { name:'Accent',             role:'accent',     token:'--accent',      value:'#FF6B9D', swatch:{ background:'#FF6B9D' } },
  { name:'Success',            role:'success',    token:'--success',     value:'#22C55E', swatch:{ background:'#22C55E' } },
  { name:'Danger',             role:'danger',     token:'--danger',      value:'#EF4444', swatch:{ background:'#EF4444' } },
  { name:'Focus ring',         role:'ring',       token:'--ring',        value:'rgba(79,205,196,.35)', swatch:{ background:'#AEEEEA' } },
];

const SEMANTIC_DARK = [
  { name:'Background',         role:'bg',         token:'--bg',          value:'#0A1220', swatch:{ background:'#0A1220' } },
  { name:'Surface',            role:'surface',    token:'--surface',     value:'#131C2E', swatch:{ background:'#131C2E' } },
  { name:'Surface raised',     role:'surface-2',  token:'--surface-2',   value:'#1B2638', swatch:{ background:'#1B2638' } },
  { name:'Border / divider',   role:'border',     token:'--border',      value:'#2A3548', swatch:{ background:'#2A3548' } },
  { name:'Text · primary',     role:'text',       token:'--text',        value:'#E7EBF1', swatch:{ background:'#E7EBF1' } },
  { name:'Text · muted',       role:'text-muted', token:'--text-muted',  value:'#94A3B0', swatch:{ background:'#94A3B0' } },
  { name:'Text · subtle',      role:'text-subtle',token:'--text-subtle', value:'#64748B', swatch:{ background:'#64748B' } },
  { name:'Primary',            role:'primary',    token:'--primary',     value:'#5EE0D7', swatch:{ background:'#5EE0D7' } },
  { name:'Accent',             role:'accent',     token:'--accent',      value:'#FF85B0', swatch:{ background:'#FF85B0' } },
  { name:'Success',            role:'success',    token:'--success',     value:'#4ADE80', swatch:{ background:'#4ADE80' } },
  { name:'Danger',             role:'danger',     token:'--danger',      value:'#F87171', swatch:{ background:'#F87171' } },
  { name:'Focus ring',         role:'ring',       token:'--ring',        value:'rgba(94,224,215,.4)', swatch:{ background:'rgba(94,224,215,.4)' } },
];

/* ---------- TYPE ---------- */
function TypeRow({ name, css, latin, ar, weight, lh }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 py-5 border-b border-ink-100 last:border-b-0">
      <div>
        <div className="font-extrabold font-display text-ink-900">{name}</div>
        <div className="mono text-[11px] text-ink-500 mt-0.5">{css} · {weight} · lh {lh}</div>
      </div>
      <div className="space-y-2 min-w-0">
        <div style={{ fontFamily:'Inter,sans-serif', fontSize:css, fontWeight:weight, lineHeight:lh }} className="text-ink-900 truncate">{latin}</div>
        <div dir="rtl" style={{ fontFamily:'Cairo,Tajawal,sans-serif', fontSize:css, fontWeight:weight, lineHeight:lh }} className="text-ink-900 truncate">{ar}</div>
      </div>
    </div>
  );
}

/* ---------- SPACING ---------- */
const SPACE = [
  { tok:'space-1', px:4, rem:'0.25rem' },
  { tok:'space-2', px:8, rem:'0.5rem' },
  { tok:'space-3', px:12, rem:'0.75rem' },
  { tok:'space-4', px:16, rem:'1rem' },
  { tok:'space-5', px:20, rem:'1.25rem' },
  { tok:'space-6', px:24, rem:'1.5rem' },
  { tok:'space-8', px:32, rem:'2rem' },
  { tok:'space-10', px:40, rem:'2.5rem' },
  { tok:'space-12', px:48, rem:'3rem' },
  { tok:'space-16', px:64, rem:'4rem' },
];

/* ---------- RADIUS ---------- */
const RADII = [
  { tok:'radius-sm', px:8,  use:'Chips, mini icons' },
  { tok:'radius-md', px:12, use:'Inputs, small buttons' },
  { tok:'radius-lg', px:16, use:'Buttons, badges' },
  { tok:'radius-xl', px:20, use:'Inputs · large' },
  { tok:'radius-2xl', px:24, use:'Cards · primary' },
  { tok:'radius-3xl', px:32, use:'Cards · hero & sheet' },
  { tok:'radius-pill', px:999, use:'Pills, FABs, segmented' },
];

/* ---------- SHADOWS ---------- */
const SHADOWS = [
  { tok:'shadow-soft', css:'0 1px 2px rgba(16,24,40,.04), 0 4px 16px rgba(16,24,40,.06)', use:'Default cards' },
  { tok:'shadow-lift', css:'0 2px 4px rgba(16,24,40,.05), 0 12px 32px rgba(16,24,40,.10)', use:'Hover, modals, popovers' },
  { tok:'shadow-glow', css:'0 8px 28px rgba(79,205,196,.35)', use:'Primary CTA · resting' },
  { tok:'shadow-coral', css:'0 8px 24px rgba(255,107,157,.35)', use:'Accent CTA · resting' },
  { tok:'shadow-focus', css:'0 0 0 4px rgba(79,205,196,.30)', use:'Keyboard focus ring' },
];

/* ---------- ICONS ---------- */
const ICON_DEMOS = ['home','book','headphones','mic','edit','flame','target','sparkles','bolt','clock','award','trophy','globe','check','x','arrowRight','lock','play','pause','rewind','volume','star','calendar','shield','crown','pencil','list','brain','refresh','gift','eye','send'];

const LANGS = {
  ar:{ code:'ar', name:'Arabic',  native:'العربية', tint:'#FF6B9D', tintBg:'#FFF1F6', tintRing:'#FFC2D9' },
  de:{ code:'de', name:'German',  native:'Deutsch', tint:'#4ECDC4', tintBg:'#EFFCFB', tintRing:'#AEEEEA' },
  en:{ code:'en', name:'English', native:'English', tint:'#7C8CF8', tintBg:'#EEF1FE', tintRing:'#C9D1FB' },
};

function Foundations(){
  const I = window.Icons;
  return (
    <FSection id="foundations" eyebrow="01 — Foundations" label="Tokens" title="Foundations"
      lede="Every visible decision lives in a token. Components and screens consume tokens; nothing else.">

      {/* COLOR */}
      <FSub id="color" title="Color"
        lede="Two scales carry meaning — Teal is primary, Coral is accent. Neutral Ink, semantic Grass/Rose/Sun, and a curated night palette make up the rest. Light tokens drive default; dark tokens drive the night theme.">
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <FFrame label="Primary · Teal" hint="--primary"><ColorRamp name="teal" scale={TEAL} role="primary"/></FFrame>
          <FFrame label="Accent · Coral" hint="--accent"><ColorRamp name="coral" scale={CORAL} role="accent"/></FFrame>
          <FFrame label="Neutral · Ink" hint="ink-50 → ink-900"><ColorRamp name="ink" scale={INK} role="neutral"/></FFrame>
          <FFrame label="Semantic" hint="--success / --danger / warn">
            <div className="space-y-3">
              <ColorRamp name="grass · success" scale={GRASS} role="--success"/>
              <ColorRamp name="rose · danger" scale={ROSE} role="--danger"/>
              <div className="rounded-2xl bg-white border border-ink-100 overflow-hidden">
                <div className="flex items-baseline justify-between px-4 py-3 border-b border-ink-100">
                  <span className="font-extrabold font-display text-ink-900 text-sm">sun · warn</span>
                  <span className="mono text-[11px] text-ink-400">streaks · trial</span>
                </div>
                <div className="grid grid-cols-3">
                  {Object.entries(SUN).map(([k,v])=>(
                    <div key={k} className="flex flex-col items-center py-3 border-s first:border-s-0 border-ink-50">
                      <span className="block w-8 h-8 rounded-md mb-1.5" style={{ background:v }}/>
                      <span className="text-[10px] font-bold text-ink-700">{k}</span>
                      <span className="mono text-[9px] text-ink-400">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FFrame>
        </div>

        {/* Semantic light & dark side by side */}
        <div className="grid lg:grid-cols-2 gap-5">
          <FFrame label="Semantic tokens · Light" hint="data-theme=light">
            {SEMANTIC_LIGHT.map(t=> <FTok key={t.token} swatch={t.swatch} name={t.name} value={<FMono>{t.token}</FMono>} hint={t.value}/>)}
          </FFrame>
          <FFrame label="Semantic tokens · Dark" hint="data-theme=dark" dark>
            {SEMANTIC_DARK.map(t=> <FTok key={t.token} dark swatch={t.swatch} name={t.name} value={<FMono dark>{t.token}</FMono>} hint={t.value}/>)}
          </FFrame>
        </div>
      </FSub>

      {/* TYPOGRAPHY */}
      <FSub id="type" title="Typography"
        lede="Inter (with Plus Jakarta for display weights) sets the Latin voice; Cairo carries the Arabic. Type is sized for comfortable reading on phones first.">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
          <FFrame label="Type scale" hint="latin · arabic">
            <TypeRow name="Display"   css="48px" weight={800} lh={1.05} latin="Learn a new language" ar="تعلَّم لغةً جديدة"/>
            <TypeRow name="Heading 1" css="32px" weight={800} lh={1.1}  latin="Read this passage aloud" ar="اقرأ هذه الجملة بصوتٍ عالٍ"/>
            <TypeRow name="Heading 2" css="24px" weight={700} lh={1.2}  latin="A morning at the café" ar="صباحٌ في المَقهى"/>
            <TypeRow name="Heading 3" css="20px" weight={700} lh={1.3}  latin="Comprehension" ar="الاستيعاب"/>
            <TypeRow name="Heading 4" css="17px" weight={700} lh={1.4}  latin="Next sentence" ar="الجملة التالية"/>
            <TypeRow name="Body · lg" css="18px" weight={500} lh={1.55} latin="Sami goes to the café every morning." ar="يَذهَبُ سامي إلى المَقهى كُلَّ صَباح."/>
            <TypeRow name="Body"      css="15px" weight={500} lh={1.55} latin="Pick a skill — the AI tailors the lesson to your level." ar="اختر مهارة — يكيّف الذكاء الاصطناعي الدرس مع مستواك."/>
            <TypeRow name="Caption"   css="12px" weight={600} lh={1.4}  latin="5 days left in your free trial" ar="٥ أيام متبقّية في تجربتك المجانية"/>
          </FFrame>

          <FFrame label="Mixing scripts on one screen" hint="this is the common case">
            <div className="text-sm text-ink-500 font-medium mb-3">Same screen, mixed scripts. Latin uses Inter; Arabic always uses Cairo, with looser line-height for diacritics.</div>
            <div className="rounded-2xl bg-ink-50 p-5 space-y-3">
              <div className="text-xs uppercase tracking-widest font-extrabold text-ink-400">A2 · Arabic</div>
              <div className="text-2xl font-extrabold font-display text-ink-900">A morning at the café</div>
              <div dir="rtl" className="font-ar text-2xl font-extrabold text-ink-900">صباحٌ في المَقهى</div>
              <div dir="rtl" className="font-ar text-[17px] text-ink-700 leading-loose">يَذهَبُ سامي إلى المَقهى كُلَّ صَباح. يَجلِسُ على طاوِلةٍ قُربَ النّافِذة ويَطلُبُ قَهوةً بالحَليب.</div>
              <div className="text-[14px] text-ink-600 font-medium">Sami goes to the café every morning. He sits at a table by the window and orders a coffee with milk.</div>
            </div>
            <div className="mt-4 space-y-1.5 text-[12px] text-ink-500 font-medium">
              <div><FMono>font-sans</FMono> → Inter, system-ui</div>
              <div><FMono>font-display</FMono> → Plus Jakarta Sans</div>
              <div><FMono>font-ar</FMono> → Cairo, Tajawal</div>
              <div><FMono>font-mono</FMono> → JetBrains Mono</div>
            </div>
          </FFrame>
        </div>
      </FSub>

      {/* SPACING */}
      <FSub id="spacing" title="Spacing"
        lede="A linear scale based on a 4px unit. Use multiples of 4 everywhere — paddings, gaps, gutters.">
        <FFrame label="Spacing scale" hint="4px base">
          <div className="space-y-2">
            {SPACE.map(s=>(
              <div key={s.tok} className="grid grid-cols-[100px_1fr_120px] items-center gap-3 py-1.5 border-b last:border-b-0 border-ink-100">
                <FMono>{s.tok}</FMono>
                <div className="flex items-center gap-3">
                  <span className="h-3 rounded bg-teal-400" style={{ width:s.px }}/>
                  <span className="mono text-[11px] text-ink-400 hidden sm:inline">{s.rem}</span>
                </div>
                <span className="mono text-[11px] text-ink-500 text-end">{s.px}px</span>
              </div>
            ))}
          </div>
        </FFrame>
      </FSub>

      {/* RADII + SHADOWS */}
      <FSub id="radius" title="Radius & elevation"
        lede="Soft, generous radii lean the brand warm. Elevation comes from layered shadows — never borders alone.">
        <div className="grid lg:grid-cols-2 gap-5">
          <FFrame label="Radius scale">
            <div className="space-y-3">
              {RADII.map(r=>(
                <div key={r.tok} className="grid grid-cols-[120px_1fr_1fr] items-center gap-3">
                  <FMono>{r.tok}</FMono>
                  <div className="h-12 bg-teal-50 border border-teal-100" style={{ borderRadius:Math.min(r.px,32) }}/>
                  <span className="text-xs text-ink-500 font-medium">{r.px}px · {r.use}</span>
                </div>
              ))}
            </div>
          </FFrame>
          <FFrame label="Shadows / elevation">
            <div className="space-y-4">
              {SHADOWS.map(s=>(
                <div key={s.tok} className="grid grid-cols-[120px_1fr_1fr] items-center gap-3">
                  <FMono>{s.tok}</FMono>
                  <div className="h-12 rounded-2xl bg-white" style={{ boxShadow:s.css }}/>
                  <span className="text-xs text-ink-500 font-medium">{s.use}</span>
                </div>
              ))}
            </div>
          </FFrame>
        </div>
      </FSub>

      {/* ICONS */}
      <FSub id="icons" title="Iconography"
        lede="Single rounded stroke family, 1.75px equivalent at 24px. No fill except for two marker glyphs (flame, play) where filled shapes read more clearly at small sizes.">
        <FFrame label="Icon set" hint="24 / 20 / 16 px sizes">
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2.5">
            {ICON_DEMOS.map(name=>{
              const Ic = I[name]; if(!Ic) return null;
              return (
                <div key={name} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-ink-50 hover:bg-ink-100 transition-colors">
                  <Ic size={22} className="text-ink-700"/>
                  <span className="mono text-[10px] text-ink-500 truncate w-full text-center">{name}</span>
                </div>
              );
            })}
          </div>
        </FFrame>
      </FSub>

      {/* LANGUAGE IDENTITY */}
      <FSub id="language-id" title="Language identity"
        lede="Each teachable language gets a flag glyph and a subtle accent tint. The tint backs the flag tile, drives the language chip, and accents progress bars / streak ribbons on that language’s screens.">
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.values(LANGS).map(L=>(
            <div key={L.code} className="rounded-3xl border border-ink-100 bg-white shadow-soft overflow-hidden">
              <div className="h-20" style={{ background:`linear-gradient(135deg, ${L.tintBg}, #fff 70%)` }}/>
              <div className="px-5 pb-5 -mt-8">
                <span className="inline-flex items-center justify-center rounded-2xl" style={{ width:56, height:56, background:L.tintBg, boxShadow:`inset 0 0 0 1.5px ${L.tintRing}` }}>
                  <FFlag code={L.code} size={34}/>
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold font-display text-ink-900">{L.name}</span>
                  <span dir={L.code==='ar'?'rtl':'ltr'} className={fcx('text-ink-400 font-semibold', L.code==='ar'&&'font-ar')}>{L.native}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold font-display px-2 py-0.5 rounded-md" style={{ background:L.tintBg, color:L.tint }}>tint <FMono className="bg-white/60">{L.tint}</FMono></span>
                </div>
                {/* mini progress in tint */}
                <div className="mt-4 h-2 rounded-full bg-ink-100 overflow-hidden">
                  <div className="h-full" style={{ width:'60%', background:L.tint }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-ink-500 font-medium max-w-3xl leading-relaxed">
          The Arabic flag uses a green field with the letter <span dir="rtl" className="font-ar text-lg text-grass-700 font-bold">ض</span> — the letter that traditionally symbolises the Arabic language — instead of any national flag, since Arabic isn’t one country.
        </div>
      </FSub>
    </FSection>
  );
}
window.Foundations = Foundations;
