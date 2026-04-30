import Link from 'next/link';
import { PaymentCalculator } from '@/components/PaymentCalculator';
import { RealityTable } from '@/components/RealityTable';
import { VehicleCard } from '@/components/VehicleCard';
import { Section, Callout } from '@/components/Section';
import { SavedBuildsList } from '@/components/SavedBuildsList';
import { VEHICLES } from '@/lib/data';

export default function Home() {
  const topPicks = VEHICLES.filter(v => v.topPick);

  return (
    <div>
      {/* Hero */}
      <header className="border-b border-border pb-6 pt-1 text-center sm:pb-8 sm:pt-2">
        <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          <span className="gradient-text">SUV Buying Playbook</span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-text-dim sm:mt-3 sm:text-base">
          Subprime credit strategy for compact SUVs with real interior room. Wisconsin focused.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-xs sm:mt-5 sm:gap-2 sm:text-sm">
          {[
            ['Budget', '$25-30k'],
            ['Monthly', '< $500'],
            ['Down', '$3k'],
            ['Credit', 'Subprime'],
            ['No co-signer', '']
          ].map(([k, v]) => (
            <span key={k} className="rounded-full border border-border bg-surface px-2.5 py-1 text-text-dim sm:px-3">
              {k}{v && <strong className="ml-1 text-text sm:ml-1.5">{v}</strong>}
            </span>
          ))}
        </div>
      </header>

      <Section id="calculator" title="💵 Payment Calculator" intro="Move the sliders. Red means over $500/mo. Wisconsin sales tax (5.5%) is included in the math.">
        <PaymentCalculator />
      </Section>

      <Section id="reality" title="📊 Reality Check" intro="Compact SUVs run pricier than sedans. Here's what each sticker price actually lands at monthly with subprime APR.">
        <RealityTable apr={17} downPayment={3000} />
        <Callout title="⚡ Honest take">
          Stick to <strong className="text-text">$24-26k sticker</strong> for breathing room. The &ldquo;$30k&rdquo; upper bound is a fantasy with subprime APR
          unless you land a manufacturer captive promo (sub-12%) or a credit union miracle.
          CPO 2-3 year old compact SUVs hit this sweet spot perfectly.
        </Callout>
      </Section>

      <Section id="picks" title="🏆 Top Picks" intro="Best matches for your situation: real cargo room, reliable, fits the math.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topPicks.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
        <div className="mt-4 text-center">
          <Link href="/vehicles" className="inline-block rounded-lg border border-border bg-surface px-5 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">
            See all {VEHICLES.length} compact SUVs →
          </Link>
        </div>
      </Section>

      <Section id="saved" title="💾 Your Saved Builds" intro="Configurations you've saved from the calculator. Stored locally on this device.">
        <SavedBuildsList />
      </Section>

      <Section title="🔗 Next Steps">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: '/vehicles', icon: '🚙', title: 'Browse Vehicles', body: 'Photos, features, full specs for all 8 picks' },
            { href: '/compare', icon: '⚖️', title: 'Compare Saved', body: 'Side-by-side feature matrix' },
            { href: '/checklist', icon: '📋', title: 'Buying Checklist', body: '4-week persistent strategy' },
            { href: '/resources', icon: '🔗', title: 'Resources', body: 'Pre-qual sites, dealers, configurators' }
          ].map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="mb-2 text-3xl">{card.icon}</div>
              <div className="font-bold transition-colors group-hover:text-accent-2">{card.title}</div>
              <div className="mt-1 text-sm text-text-dim">{card.body}</div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
