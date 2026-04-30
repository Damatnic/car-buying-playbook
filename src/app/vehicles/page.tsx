import { VEHICLES } from '@/lib/data';
import { VehicleCard } from '@/components/VehicleCard';
import { Section } from '@/components/Section';

export default function VehiclesPage() {
  const cpo = VEHICLES.filter(v => v.segment === 'CPO');
  const newSuvs = VEHICLES.filter(v => v.segment === 'NEW');

  return (
    <div>
      <header className="border-b border-border pb-5 sm:pb-6">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">Vehicle Lineup</span>
        </h1>
        <p className="mt-2 text-text-dim">
          Compact SUVs with real interior room. Click any card for photos, features, and the build calculator.
        </p>
      </header>

      <Section title={`🏆 CPO (Sweet Spot) — ${cpo.length}`} intro="2-3 year old certified pre-owned. Same room, same reliability, often $5-8k cheaper than new. Best fit for the budget.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cpo.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      </Section>

      <Section title={`🆕 New — ${newSuvs.length}`} intro="Captive financing (manufacturer's bank) is often friendlier to subprime than third-party lenders. New = full warranty.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newSuvs.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      </Section>
    </div>
  );
}
