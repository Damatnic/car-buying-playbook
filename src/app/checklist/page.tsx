import { StrategyTimeline } from '@/components/StrategyTimeline';
import { Section, Callout } from '@/components/Section';

export default function ChecklistPage() {
  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">4-Week Buying Checklist</span>
        </h1>
        <p className="mt-2 text-text-dim">
          Tap each item to check it off. Progress is saved to your browser and persists across visits.
        </p>
      </header>

      <Section title="Your Strategy" intro="Work through this in order. Don't skip the pre-approval step — it's the single biggest cost saver.">
        <StrategyTimeline interactive />
        <Callout title="🚩 Walk-away red flags">
          Dealer won&apos;t give OTD price in writing · &quot;What monthly payment can you afford?&quot; sales tactics ·
          Pressure to sign same day · Refuses pre-purchase inspection · &quot;We need your social to give you a price&quot;
        </Callout>
      </Section>
    </div>
  );
}
