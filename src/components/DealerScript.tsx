import { SCRIPT_OPENING, DEALER_DECODER, QUESTIONS_TO_ASK, DEFENSIVE_ANSWERS, MONTHLY_PAYMENT_PLAYBOOK } from '@/lib/data';

export function DealerScript() {
  return (
    <div className="space-y-10">
      <SectionBlock
        id="answers"
        icon="🛡️"
        title="When THEY Ask YOU Stuff"
        intro="The trickiest moments aren't when they're pitching — they're when they ask you a question that seems innocent. Here's how to answer the common ones without giving up leverage."
      >
        {/* Monthly payment philosophy box */}
        <div className="mb-4 overflow-hidden rounded-xl border border-accent/40 bg-gradient-to-br from-accent/10 to-accent-2/5">
          <div className="border-b border-accent/30 bg-accent/10 px-4 py-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent-2">⚠️ The Monthly Payment Paradox</div>
            <h3 className="mt-1 text-sm font-bold leading-snug sm:text-base">{MONTHLY_PAYMENT_PLAYBOOK.headline}</h3>
          </div>
          <div className="space-y-3 px-4 py-3">
            <p className="text-sm text-text sm:text-base">{MONTHLY_PAYMENT_PLAYBOOK.insight}</p>
            <ul className="space-y-1.5">
              {MONTHLY_PAYMENT_PLAYBOOK.rules.map((rule, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="shrink-0 font-bold text-accent-2">{i + 1}.</span>
                  <span className="text-text-dim">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          {DEFENSIVE_ANSWERS.map((q, i) => (
            <article key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <header className="flex items-start gap-2 border-b border-border bg-surface-2 px-4 py-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning/20 text-[11px] font-bold text-warning">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold italic text-text sm:text-base">{q.theyAsk}</p>
              </header>
              <div className="px-4 py-2.5 text-xs text-text-dim sm:text-sm">
                <span className="font-bold text-warning">Why they ask:</span> {q.whyTheyAsk}
              </div>
              <div className="border-t border-border/50 bg-danger/5 px-4 py-2 text-xs sm:text-sm">
                <span className="font-bold text-danger">Don&apos;t reveal:</span> <span className="text-text-dim">{q.dontReveal}</span>
              </div>
              <div className="border-l-4 border-l-success bg-success/5 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-success">Smart reply</div>
                <p className="mt-1 text-sm font-semibold text-text sm:text-base">&ldquo;{q.smartReply}&rdquo;</p>
              </div>
              <div className="border-l-4 border-l-accent bg-accent/5 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent">If they push harder</div>
                <p className="mt-1 text-sm text-text sm:text-base">&ldquo;{q.ifPushed}&rdquo;</p>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="opening"
        icon="🗣️"
        title="Opening Lines"
        intro="What to actually say at each moment when you walk onto a lot. Treat these as scripts you can deliver word-for-word."
      >
        <div className="space-y-3">
          {SCRIPT_OPENING.map((line, i) => (
            <article key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <header className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[11px] font-bold text-accent">
                  {i + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-text-dim">{line.situation}</span>
              </header>
              <div className="border-l-4 border-l-success bg-success/5 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-success">You say</div>
                <p className="mt-1 text-sm font-semibold text-text sm:text-base">&ldquo;{line.say}&rdquo;</p>
              </div>
              <div className="px-4 py-2.5 text-xs leading-relaxed text-text-dim sm:text-sm">
                <span className="font-bold text-text-dim">Why:</span> {line.why}
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="decoder"
        icon="🎭"
        title="Dealer Phrase Decoder"
        intro="Common things they'll say, what they actually mean underneath, and exactly how to respond. Save this — it's worth thousands."
      >
        <div className="space-y-3">
          {DEALER_DECODER.map((row, i) => (
            <article key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="border-l-4 border-l-warning bg-warning/5 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-warning">They say</div>
                <p className="mt-1 text-sm italic text-text sm:text-base">{row.theySay}</p>
              </div>
              <div className="border-l-4 border-l-danger bg-danger/5 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-danger">What it means</div>
                <p className="mt-1 text-sm leading-snug text-text-dim sm:text-base">{row.meaning}</p>
              </div>
              <div className="border-l-4 border-l-success bg-success/5 px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-success">You reply</div>
                <p className="mt-1 text-sm font-semibold text-text sm:text-base">&ldquo;{row.youReply}&rdquo;</p>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="ask"
        icon="❓"
        title="Questions YOU Should Ask"
        intro="Walk in with these in your phone. Asking even half of them changes the dynamic — they treat informed buyers very differently."
      >
        <div className="space-y-3">
          {QUESTIONS_TO_ASK.map((cat, i) => (
            <article key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
              <header className="border-b border-border bg-surface-2 px-4 py-2.5">
                <h3 className="text-sm font-bold sm:text-base">{cat.category}</h3>
              </header>
              <ol className="divide-y divide-border/40">
                {cat.items.map((q, j) => (
                  <li key={j} className="flex gap-3 px-4 py-2.5 text-sm">
                    <span className="shrink-0 font-bold text-accent-2">{j + 1}.</span>
                    <span className="text-text">{q}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </SectionBlock>

      <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-2/5 p-4 text-center">
        <p className="text-sm font-bold text-accent-2">🎯 The whole script in one sentence</p>
        <p className="mt-2 text-base font-semibold text-text sm:text-lg">
          &ldquo;What&apos;s the out-the-door price including everything? Email it to me.&rdquo;
        </p>
        <p className="mt-2 text-xs text-text-dim sm:text-sm">
          That single question forces transparency. If they refuse, walk. If they answer, you have leverage.
        </p>
      </div>
    </div>
  );
}

function SectionBlock({
  id, icon, title, intro, children
}: {
  id: string;
  icon: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-3">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          <span>{icon} {title}</span>
        </h2>
        <p className="mt-1 text-sm text-text-dim sm:text-base">{intro}</p>
      </div>
      {children}
    </section>
  );
}
