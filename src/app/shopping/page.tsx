import { Section, Callout } from '@/components/Section';
import { DealerStops } from '@/components/DealerStops';
import { ShoppingPlan } from '@/components/ShoppingPlan';
import { QuickTipsCard } from '@/components/QuickTipsCard';

export default function ShoppingPage() {
  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">Shopping Day Plan</span>
        </h1>
        <p className="mt-2 text-sm text-text-dim sm:text-base">
          A real itinerary for tomorrow, the dealers worth visiting near Waukesha, and a quick-reference tips card you can pull up at the lot.
        </p>
      </header>

      <Section title="🗓️ Suggested Itinerary" intro="A full day designed to give you actual leverage. Don't try to do every dealer — better to nail 2-3 well than rush through 6.">
        <ShoppingPlan />
      </Section>

      <Section title="📍 Dealers Worth Visiting" intro="Specific dealers near Waukesha with high inventory of the SUVs in your lineup. Tap a phone number to call, tap directions to open Maps.">
        <DealerStops />
        <Callout title="💡 Strategy">
          Don&apos;t visit more than 3 dealers in one day. After that, fatigue makes you say yes to bad deals. Better to visit 2 today, sleep on it, and call the winner Monday morning.
        </Callout>
      </Section>

      <Section title="📱 Quick Tips Card" intro="Screenshot this section, or bookmark this page. Glance at it before walking onto a lot or signing anything.">
        <QuickTipsCard />
      </Section>
    </div>
  );
}
