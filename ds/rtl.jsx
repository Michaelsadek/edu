// ds/rtl.jsx → window.RTL
const { cx:rcx, Section:RSection, Sub:RSub, Frame:RFrame, Mono:RMono, DSFlag:RFlag } = window.DS;

/* ---------- Mirror swatch panel ---------- */
function MirrorPanel({ dir, title, children, className='' }){
  const I = window.Icons;
  return (
    <div className={rcx('rounded-3xl border border-ink-100 bg-white shadow-soft overflow-hidden', className)}>
      <div className="px-4 py-2.5 border-b border-ink-100 flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-widest font-extrabold font-display text-ink-500">{title}</div>
        <RMono>dir="{dir}"</RMono>
      </div>
      <div dir={dir} className={rcx('p-5', dir==='rtl'&&'font-ar')}>{children}</div>
    </div>
  );
}

/* Sample top-bar molecule, the kind that flips */
function MiniTopBar({ ui }){
  const I = window.Icons;
  return (
    <div className="rounded-2xl bg-ink-50 p-3 flex items-center gap-3">
      <button className="grid place-items-center w-9 h-9 rounded-xl text-ink-500 bg-white border border-ink-200"><I.arrowLeft size={18} className={ui==='rtl'?'rotate-180':''}/></button>
      <span className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50 text-teal-600" style={{ boxShadow:'inset 0 0 0 1.5px #AEEEEA' }}><I.book size={18}/></span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-extrabold font-display text-ink-900 truncate">{ui==='rtl'?'القراءة':'Reading'}</div>
        <div className="text-[10px] text-ink-400 font-medium">{ui==='rtl'?'تتعلّم العربية · A2':'Studying Arabic · A2'}</div>
      </div>
      <span className="inline-flex items-center justify-center h-6 px-2 rounded-md text-[11px] font-extrabold font-display bg-teal-400 text-white">A2</span>
    </div>
  );
}

function ListItem({ ui, text }){
  const I = window.Icons;
  return (
    <div className="flex items-center gap-2.5 bg-white border border-ink-100 rounded-xl p-2.5">
      <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white">{I.check({size:14,stroke:3})}</span>
      <span className="flex-1 font-semibold text-ink-800 text-sm">{text}</span>
      <I.chevronRight size={16} className={rcx('text-ink-300', ui==='rtl'&&'rotate-180')}/>
    </div>
  );
}

function FlippedExample({ ui }){
  return (
    <div className="space-y-2.5">
      <MiniTopBar ui={ui}/>
      <ListItem ui={ui} text={ui==='rtl'?'القَواعد':'Grammar rule'}/>
      <ListItem ui={ui} text={ui==='rtl'?'المُفردات':'Vocabulary'}/>
      <ListItem ui={ui} text={ui==='rtl'?'القراءة':'Reading'}/>
    </div>
  );
}

/* The headline mixed-direction example */
function MixedDirectionExample(){
  const I = window.Icons;
  return (
    <div dir="rtl" className="rounded-3xl border border-ink-100 bg-white shadow-soft overflow-hidden font-ar">
      {/* RTL chrome */}
      <div className="px-4 py-2.5 border-b border-ink-100 flex items-center justify-between bg-ink-50">
        <div className="flex items-center gap-2 text-[11px] font-extrabold font-display text-ink-500">
          <span className="inline-block w-2 h-2 rounded-full bg-coral-400"/> واجهة عربية (RTL)
        </div>
        <RMono>dir="rtl"</RMono>
      </div>
      <div className="p-5 space-y-4">
        <div className="text-xs uppercase tracking-widest font-extrabold text-ink-400">القراءة · A2</div>
        <h3 className="text-2xl font-extrabold text-ink-900">صباحٌ في المَقهى — بالألمانية</h3>
        <p className="text-sm text-ink-500 font-medium">يدرس مستخدم عربيّ الواجهة لغةً ألمانية. تبقى الواجهة من اليمين إلى اليسار، بينما يظهر النص الألماني داخلها كما هو في اتجاهه الطبيعي من اليسار إلى اليمين.</p>
        {/* Embedded LTR German passage card */}
        <div dir="ltr" className="rounded-2xl bg-ink-50 border border-ink-200 p-4" style={{ fontFamily:'Inter, system-ui, sans-serif' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-extrabold text-ink-500">
              <span className="grid place-items-center w-5 h-5 rounded bg-white" style={{ boxShadow:'inset 0 0 0 1px #E4E9EE' }}><RFlag code="de" size={14}/></span>
              Deutsch · LTR content
            </span>
            <RMono>dir="ltr"</RMono>
          </div>
          <h4 className="text-lg font-extrabold font-display text-ink-900 mb-2">Ein Morgen im Café</h4>
          <p className="text-[15px] text-ink-700 leading-relaxed">Sami geht jeden Morgen ins Café. Er sitzt an einem Tisch am Fenster und bestellt einen Kaffee mit Milch.</p>
        </div>
        {/* Translation tip — back in Arabic */}
        <div className="flex items-start gap-2.5 bg-teal-50 rounded-2xl p-3.5">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-teal-400 text-white shrink-0">{I.sparkles({size:14,stroke:2.2})}</span>
          <p className="text-sm text-teal-800 font-semibold flex-1">المعنى: «يذهب سامي إلى المقهى كل صباح…» — الشرح والملاحظات تظهر دائمًا بلغة الواجهة.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Rules table ---------- */
function Rule({ tok, what, ltr, rtl }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_1fr_1fr] gap-3 py-3 border-b border-ink-100 last:border-b-0 items-start">
      <RMono>{tok}</RMono>
      <span className="text-sm text-ink-700 font-medium">{what}</span>
      <span className="text-sm text-ink-600">{ltr}</span>
      <span className="text-sm text-ink-600">{rtl}</span>
    </div>
  );
}

function RTL(){
  const I = window.Icons;
  return (
    <RSection id="rtl" eyebrow="03 — Bidi" label="Direction" title="RTL & bidirectional rules"
      lede="The interface mirrors with the UI language. Learning content does not — it follows the language being learned. This contract is the difference between a polyglot product and a polished one.">

      {/* Hard rule callout */}
      <div className="rounded-3xl border border-coral-200 bg-coral-50 p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-start gap-4">
        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-coral-400 text-white shrink-0">{I.shield({size:24})}</span>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-coral-700 mb-1">Critical rule</div>
          <p className="text-coral-900 font-semibold text-[17px] leading-relaxed">
            Learning-content direction follows the <b>language being learned</b>, not the UI language.
            An Arabic-UI learner studying German sees a German LTR passage <i>inside</i> an RTL interface.
          </p>
        </div>
      </div>

      {/* Side-by-side mirror */}
      <RSub id="mirror" title="Full UI mirror"
        lede="Switching the UI language flips chrome, icons that imply direction, and alignment — but not language-specific copy. Both views below render from identical components and tokens.">
        <div className="grid lg:grid-cols-2 gap-5">
          <MirrorPanel dir="ltr" title="LTR interface · English UI"><FlippedExample ui="ltr"/></MirrorPanel>
          <MirrorPanel dir="rtl" title="RTL interface · Arabic UI"><FlippedExample ui="rtl"/></MirrorPanel>
        </div>
      </RSub>

      {/* Headline mixed direction */}
      <RSub id="mixed" title="Mixed-direction content"
        lede="When the learner studies a language that doesn't match their UI, embed the passage in its own block with its own dir. Everything inside it — typography, hyphenation, alignment, even the focus order — follows the inner direction.">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5">
          <MixedDirectionExample/>
          <div className="rounded-3xl border border-ink-100 bg-white p-5 sm:p-6">
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink-500 mb-3">How the contract holds up</div>
            <ul className="space-y-3">
              {[
                'UI chrome (top bar, buttons, breadcrumb) flips with the UI language.',
                'Learning-content blocks (passage, prompt, target sentence) carry their own dir attribute.',
                'Translations, hints, error messages and explanations stay in the UI language.',
                'Icons with directional meaning (arrowRight, chevronRight) flip with the UI direction.',
                'Non-directional icons (check, sparkles, mic, headphones) never flip.',
                'Padding / alignment uses logical properties (start / end), not left / right.',
              ].map((line,i)=>(
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <span className="grid place-items-center w-5 h-5 rounded-md bg-teal-400 text-white mt-0.5 shrink-0">{I.check({size:13,stroke:3})}</span>
                  <span className="flex-1">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RSub>

      {/* Rules table */}
      <RSub id="rules" title="Mirroring contract" lede="Use logical properties everywhere; never hard-code left/right. The table below is the contract.">
        <RFrame label="Logical properties cheatsheet">
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_1fr_1fr] gap-3 pb-2 border-b border-ink-100 text-[11px] uppercase tracking-widest font-extrabold text-ink-500">
            <span>token</span><span>what it does</span><span>renders LTR</span><span>renders RTL</span>
          </div>
          <Rule tok="ps-4 / pe-4" what="Logical inline padding (start/end)" ltr="padding-left / padding-right" rtl="padding-right / padding-left"/>
          <Rule tok="ms-auto / me-auto" what="Logical margin (start/end)" ltr="margin-left / margin-right" rtl="margin-right / margin-left"/>
          <Rule tok="text-start / text-end" what="Logical text alignment" ltr="text-align: left / right" rtl="text-align: right / left"/>
          <Rule tok="border-s / border-e" what="Logical border side" ltr="border-left / border-right" rtl="border-right / border-left"/>
          <Rule tok="rtl:rotate-180" what="Conditional flip for directional icons" ltr="no rotation" rtl="rotate(180deg)"/>
          <Rule tok="font-ar" what="Arabic font stack (Cairo, Tajawal)" ltr="applied to ar content" rtl="applied to ar content"/>
        </RFrame>
      </RSub>

      {/* Implementation snippet */}
      <RSub id="impl" title="Implementation"
        lede="Set the root direction from the UI language. Render learning blocks with their own dir and font. Use Tailwind logical utilities everywhere.">
        <div className="grid lg:grid-cols-2 gap-5">
          <RFrame label="Root setup">
            <pre className="mono text-[12px] leading-relaxed text-ink-700 whitespace-pre-wrap">{`// app.jsx
useEffect(() => {
  document.documentElement.dir = STR[uiLang].dir;   // 'ltr' | 'rtl'
  document.documentElement.lang = uiLang;
  document.body.classList.toggle('font-ar', uiLang === 'ar');
}, [uiLang]);`}</pre>
          </RFrame>
          <RFrame label="Learning block">
            <pre className="mono text-[12px] leading-relaxed text-ink-700 whitespace-pre-wrap">{`// Passage component
<article
  dir={lesson.dir}                  // follows TARGET language
  className={cx(
    'text-start',                   // logical alignment
    lesson.dir === 'rtl' && 'font-ar'
  )}
>
  {lesson.body}
</article>`}</pre>
          </RFrame>
        </div>
      </RSub>
    </RSection>
  );
}
window.RTL = RTL;
