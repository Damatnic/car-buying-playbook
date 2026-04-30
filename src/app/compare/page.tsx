import { CompareView } from '@/components/CompareView';
import { Section } from '@/components/Section';

export default function ComparePage() {
  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          <span className="gradient-text">Compare Vehicles</span>
        </h1>
        <p className="mt-2 text-text-dim">
          Side-by-side feature matrix of your saved vehicles. Save vehicles from the lineup to add them here.
        </p>
      </header>
      <Section title="Saved Vehicle Comparison" intro="Standard (✓), available on higher trims (◯), or not offered (✗) for each saved SUV.">
        <CompareView />
      </Section>
    </div>
  );
}
