import Link from 'next/link';
import {
  CARMAX_BROOKFIELD,
  CARMAX_SEARCH_LINKS,
  CARMAX_TACTICS,
  TEST_DRIVE_CHECKLIST,
  CARFAX_RED_FLAGS
} from '@/lib/data';
import { cn } from '@/lib/utils';
import { LotFinds } from '@/components/LotFinds';
import { TierList } from '@/components/TierList';
import { LiveInventory } from '@/components/LiveInventory';

const SEVERITY_STYLES = {
  WALK: 'bg-danger/15 text-danger border-danger/40',
  INVESTIGATE: 'bg-warning/15 text-warning border-warning/40',
  NEGOTIATE: 'bg-accent/15 text-accent border-accent/40'
} as const;

export default function CarMaxPage() {
  const phoneClean = CARMAX_BROOKFIELD.phone.replace(/\D/g, '');
  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-bold text-success">
          🎯 4PM APPOINTMENT
        </div>
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">CarMax Brookfield</span>
        </h1>
        <p className="mt-2 text-sm text-text-dim sm:text-base">
          Everything you need for tonight: live inventory links, what to do at the lot, what to check on every test drive, and how to read a Carfax.
        </p>
      </header>

      {/* Store info card */}
      <section className="mt-6 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <h2 className="text-base font-bold sm:text-lg">📍 {CARMAX_BROOKFIELD.name}</h2>
        <p className="mt-1 text-sm text-text-dim">{CARMAX_BROOKFIELD.address}</p>
        <p className="mt-0.5 text-sm text-text-dim">{CARMAX_BROOKFIELD.driveTime} · {CARMAX_BROOKFIELD.hours}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={`tel:${phoneClean}`} className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent hover:bg-accent/15">
            📞 {CARMAX_BROOKFIELD.phoneDisplay}
          </a>
          <a href={CARMAX_BROOKFIELD.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-text-dim hover:border-accent hover:text-accent">
            📍 Directions
          </a>
          <a href={CARMAX_BROOKFIELD.storeUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-text-dim hover:border-accent hover:text-accent">
            Store page ↗
          </a>
        </div>
      </section>

      {/* LIVE INVENTORY - the headline feature */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          📡 Live Inventory Near You
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          Real listings from CarMax, dealer lots, and private sellers within 50 miles of 53186 — pulled live from the MarketCheck inventory database. Tap a card to view the full listing or add it to your finds with one click.
        </p>
        <LiveInventory />
      </section>

      {/* Tier List - which cars to focus on */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          🏆 Tier List — Which SUVs to Focus On
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          Ranked across 8 categories that matter for your situation. Look at S-tier cars first, A-tier as alternates, B/C only if the price is unbeatable.
        </p>
        <TierList />
      </section>

      {/* Lot Finds - the killer feature */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          📋 Found at the Lot
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          Tap a car at the lot, type in price + year + mileage, see if it fits your budget instantly. Saves locally so you can compare 5-6 cars side-by-side without losing track.
        </p>
        <LotFinds />
      </section>

      {/* Live inventory links */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          🔴 Browse Inventory Online
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          Pre-filtered CarMax search URLs (compact SUVs, max $28k, 2022+). Click these to see what&apos;s in stock at Brookfield right now — opens in your browser session so you see real-time inventory.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CARMAX_SEARCH_LINKS.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold">{link.label}</span>
                <span className="text-text-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent-2">→</span>
              </div>
              <p className="mt-1 text-xs text-text-dim">{link.description}</p>
            </a>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm">
          <p className="font-bold text-warning">⚠️ Inventory changes hourly</p>
          <p className="mt-1 text-text-dim">If a car you like online isn&apos;t there when you arrive, it sold or got transferred. Don&apos;t panic — they likely have similar in their network and can transfer free.</p>
        </div>
      </section>

      {/* CarMax tactics */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          💡 CarMax-Specific Tactics
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          CarMax is different from a regular dealer. Here&apos;s what that means for you tonight.
        </p>
        <div className="grid gap-3 lg:grid-cols-3">
          <TacticCard tactic={CARMAX_TACTICS.pricing} accent="success" />
          <TacticCard tactic={CARMAX_TACTICS.upsells} accent="danger" />
          <TacticCard tactic={CARMAX_TACTICS.advantages} accent="accent" />
        </div>
      </section>

      {/* Test drive checklist */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          ✅ Test Drive Checklist
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          Three phases, three lists. Pull this up on your phone DURING the test drive — actually run through them.
        </p>
        <div className="space-y-3">
          {TEST_DRIVE_CHECKLIST.map(section => (
            <article key={section.category} className="overflow-hidden rounded-xl border border-border bg-surface">
              <header className="border-b border-border bg-surface-2 px-4 py-2.5">
                <h3 className="text-sm font-bold sm:text-base">{section.category}</h3>
              </header>
              <ul className="divide-y divide-border/40">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 px-4 py-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border text-[10px] text-text-faint">
                      {i + 1}
                    </span>
                    <span className="text-text">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Carfax red flags */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded bg-gradient" />
          🚨 Carfax / AutoCheck Red Flags
        </h2>
        <p className="mb-4 text-sm text-text-dim sm:text-base">
          ASK CarMax for the Carfax on every car you sit in — they give it free. Then scan for these red flags before you fall in love.
        </p>
        <div className="space-y-2">
          {CARFAX_RED_FLAGS.map(rf => {
            const sev = SEVERITY_STYLES[rf.severity as keyof typeof SEVERITY_STYLES];
            return (
              <article key={rf.flag} className="rounded-xl border border-border bg-surface px-4 py-3">
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold">{rf.flag}</h3>
                  <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider', sev)}>
                    {rf.severity}
                  </span>
                </div>
                <p className="text-sm text-text-dim">{rf.why}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          <div className="rounded-lg border border-danger/30 bg-danger/5 p-3 text-center">
            <div className="font-bold text-danger">WALK</div>
            <div className="text-xs text-text-dim">Disqualifying — find a different car</div>
          </div>
          <div className="rounded-lg border border-warning/30 bg-warning/5 p-3 text-center">
            <div className="font-bold text-warning">INVESTIGATE</div>
            <div className="text-xs text-text-dim">Get inspection + ask hard questions</div>
          </div>
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-center">
            <div className="font-bold text-accent">NEGOTIATE</div>
            <div className="text-xs text-text-dim">Make them fix it before you sign</div>
          </div>
        </div>
      </section>

      {/* Bring with you reminder */}
      <section className="mt-8 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-2/5 p-4 sm:p-5">
        <h3 className="text-base font-bold sm:text-lg">🎒 Bring tonight</h3>
        <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
          {[
            'Driver\'s license (both you AND your wife if she\'s a co-driver)',
            'Proof of insurance',
            'Two recent pay stubs',
            'Capital One Auto Navigator pre-approval (if you have it)',
            'Phone with this page open',
            'Notepad or use phone notes',
            'Snacks/water — could be a 2-3 hour visit',
            'Patience — don\'t buy if anything feels off'
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-success">✓</span>
              <span className="text-text-dim">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Decision framework */}
      <section className="mt-8 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <h3 className="text-base font-bold sm:text-lg">🎯 Tonight&apos;s decision framework</h3>
        <div className="mt-3 space-y-2 text-sm text-text-dim">
          <p><strong className="text-text">Goal tonight:</strong> Identify your top 1-2 SUVs, get the OTD price for each, leave without buying.</p>
          <p><strong className="text-text">If something feels perfect:</strong> Use the 7-day hold ($99 refundable) to lock the car. Don&apos;t buy outright tonight.</p>
          <p><strong className="text-text">If everything is mid:</strong> Take pictures, leave, come back tomorrow with fresh eyes if anything sticks.</p>
          <p><strong className="text-text">If they push hard:</strong> Remember — they&apos;re salaried, not commissioned. The push is store policy, not personal pressure. Smile, decline, leave.</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/script" className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-text-dim hover:border-accent hover:text-accent">
            Open dealer script →
          </Link>
          <Link href="/shopping#tips" className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-text-dim hover:border-accent hover:text-accent">
            Quick tips card →
          </Link>
          <Link href="/vehicles" className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm font-semibold text-text-dim hover:border-accent hover:text-accent">
            Vehicle reference →
          </Link>
        </div>
      </section>
    </div>
  );
}

function TacticCard({ tactic, accent }: { tactic: { title: string; items: string[] }; accent: 'success' | 'danger' | 'accent' }) {
  const styles = {
    success: 'border-success/30 bg-success/5',
    danger: 'border-danger/30 bg-danger/5',
    accent: 'border-accent/30 bg-accent/5'
  };
  const dotStyles = {
    success: 'bg-success',
    danger: 'bg-danger',
    accent: 'bg-accent'
  };
  return (
    <article className={cn('overflow-hidden rounded-xl border bg-surface', styles[accent])}>
      <header className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-bold sm:text-base">{tactic.title}</h3>
      </header>
      <ul className="divide-y divide-border/40">
        {tactic.items.map((item, i) => (
          <li key={i} className="flex gap-2 px-4 py-2.5 text-sm">
            <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', dotStyles[accent])} />
            <span className="text-text">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
