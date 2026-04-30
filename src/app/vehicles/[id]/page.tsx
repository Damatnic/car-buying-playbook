import { notFound } from 'next/navigation';
import Link from 'next/link';
import { VEHICLES, getVehicleById } from '@/lib/data';
import { VehicleGallery } from '@/components/VehicleGallery';
import { FeatureList } from '@/components/FeatureList';
import { PaymentCalculator } from '@/components/PaymentCalculator';
import { SaveButton } from '@/components/SaveButton';
import { Section } from '@/components/Section';
import { LinkGrid } from '@/components/LinkGrid';
import { fmtCurrencyRange } from '@/lib/utils';
import { buildSearchUrls } from '@/lib/calc';

export function generateStaticParams() {
  return VEHICLES.map(v => ({ id: v.id }));
}

export default function VehiclePage({ params }: { params: { id: string } }) {
  const vehicle = getVehicleById(params.id);
  if (!vehicle) notFound();

  const ZIP = '53186';
  const search = buildSearchUrls(vehicle.searchUrlSlug.make, vehicle.searchUrlSlug.model, ZIP);
  const initialPrice = Math.round((vehicle.priceLow + vehicle.priceHigh) / 2);

  return (
    <div>
      <Link href="/vehicles" className="mb-4 inline-block text-sm text-text-faint hover:text-accent">
        ← All vehicles
      </Link>

      {/* Header */}
      <header className="mb-5 sm:mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-text-faint">
          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-semibold">
            {vehicle.segment === 'CPO' ? 'Certified Pre-Owned' : 'New'}
          </span>
          {vehicle.topPick && (
            <span className="rounded-full bg-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Top pick
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">{vehicle.name}</h1>
            <p className="mt-1 text-sm text-text-dim sm:text-base">{vehicle.trim}</p>
          </div>
          <SaveButton vehicleId={vehicle.id} />
        </div>
        <div className="mt-3 text-2xl font-extrabold tabular-nums text-accent-2 sm:text-3xl">
          {fmtCurrencyRange(vehicle.priceLow, vehicle.priceHigh)}
        </div>
        <p className="mt-3 max-w-3xl text-sm text-text-dim sm:text-base">{vehicle.note}</p>
      </header>

      {/* Gallery + Specs */}
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <VehicleGallery
          exterior={vehicle.images.exterior}
          interior={vehicle.images.interior}
          rear={vehicle.images.rear}
          alt={vehicle.name}
        />
        <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
          <h3 className="mb-3 text-base font-bold">📊 Specs</h3>
          <dl className="grid grid-cols-2 gap-2 text-sm sm:gap-3">
            <SpecRow label="Cargo (max)" value={`${vehicle.cargoMax} cu ft`} />
            <SpecRow label="Cargo (behind seats)" value={`${vehicle.cargoBehind} cu ft`} />
            <SpecRow label="Seating" value={`${vehicle.specs.seating} passengers`} />
            <SpecRow label="MPG (city/hwy)" value={vehicle.specs.mpg} />
            <SpecRow label="Horsepower" value={`${vehicle.specs.horsepower} hp`} />
            <SpecRow label="Towing" value={`${vehicle.specs.towingLb.toLocaleString()} lb`} />
            <SpecRow label="Ground clearance" value={`${vehicle.specs.groundClearanceIn}"`} />
            <SpecRow label="AWD" value={
              vehicle.awd === 'standard' ? 'Standard ✓' :
              vehicle.awd === 'available' ? 'Available' : 'Not offered'
            } />
            <SpecRow label="Warranty" value={vehicle.warranty} className="col-span-2" />
            <SpecRow label="Safety suite" value={vehicle.safety.suite} className="col-span-2" />
          </dl>
          <a
            href={vehicle.manufacturerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Build & Price on {vehicle.searchUrlSlug.make.charAt(0).toUpperCase() + vehicle.searchUrlSlug.make.slice(1)}.com →
          </a>
        </div>
      </div>

      {/* Features */}
      <Section title="🎯 What This SUV Has" intro="Standard equipment vs available on higher trims. Subprime tip: base/mid trims still get most safety tech as standard.">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <FeatureList vehicle={vehicle} category="safety" />
          <FeatureList vehicle={vehicle} category="tech" />
          <FeatureList vehicle={vehicle} category="comfort" />
        </div>
      </Section>

      {/* Payment Calculator */}
      <Section title="💵 Build Your Payment" intro="Slide the values to see your monthly. Save the build to track it across visits.">
        <PaymentCalculator
          initialPrice={initialPrice}
          vehicleId={vehicle.id}
          vehicleName={`${vehicle.name} ${vehicle.trim}`}
          showSave
        />
      </Section>

      {/* Live Listings */}
      <Section title="🔍 Find Live Listings" intro={`Pre-built searches near 53186 (Waukesha, WI), 100mi radius, max $28k, 2022+ year. Click to open inventory in a new tab.`}>
        <LinkGrid items={[
          { name: 'CarGurus', url: search.cargurus, detail: 'Best deal-rating algorithm' },
          { name: 'Cars.com (CPO)', url: search.carsCom, detail: 'Filtered to certified pre-owned' },
          { name: 'Autotrader', url: search.autotrader, detail: 'Largest inventory' },
          { name: 'TrueCar', url: search.truecar, detail: 'See what others paid' },
          { name: 'CarMax', url: search.carmax, detail: 'No-haggle pricing' }
        ]} />
      </Section>
    </div>
  );
}

function SpecRow({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-md bg-surface-2 px-3 py-2 ${className}`}>
      <dt className="text-[10px] uppercase tracking-wide text-text-faint">{label}</dt>
      <dd className="mt-0.5 font-semibold text-text">{value}</dd>
    </div>
  );
}
