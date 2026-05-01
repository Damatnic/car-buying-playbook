import Link from 'next/link';
import { TIER_RANKINGS, TIER_CATEGORIES, type Tier } from '@/lib/data';
import { cn } from '@/lib/utils';

const TIER_STYLES: Record<Tier, { bg: string; text: string; border: string; bar: string }> = {
  S: { bg: 'bg-success/15', text: 'text-success', border: 'border-success/40', bar: 'bg-success' },
  A: { bg: 'bg-accent-2/15', text: 'text-accent-2', border: 'border-accent-2/40', bar: 'bg-accent-2' },
  B: { bg: 'bg-warning/15', text: 'text-warning', border: 'border-warning/40', bar: 'bg-warning' },
  C: { bg: 'bg-danger/15', text: 'text-danger', border: 'border-danger/40', bar: 'bg-danger' }
};

const TIER_LABELS: Record<Tier, string> = {
  S: 'Best in class',
  A: 'Strong',
  B: 'Acceptable',
  C: 'Weak'
};

export function TierList() {
  const grouped = (['S', 'A', 'B', 'C'] as Tier[]).map(tier => ({
    tier,
    cars: TIER_RANKINGS.filter(c => c.overall === tier)
  })).filter(g => g.cars.length > 0);

  return (
    <div className="space-y-6">
      {/* Overall Tier List */}
      <div>
        <h3 className="mb-3 text-base font-bold sm:text-lg">🏆 Overall Tier List</h3>
        <p className="mb-3 text-xs text-text-dim sm:text-sm">
          Composite of all 8 categories below. S = best for your situation, C = real downsides to weigh.
        </p>
        <div className="space-y-2">
          {grouped.map(({ tier, cars }) => {
            const styles = TIER_STYLES[tier];
            return (
              <div key={tier} className={cn('flex items-stretch gap-2 rounded-xl border bg-surface', styles.border)}>
                <div className={cn('flex w-14 shrink-0 items-center justify-center text-3xl font-extrabold sm:w-16 sm:text-4xl', styles.bg, styles.text)}>
                  {tier}
                </div>
                <div className="flex-1 py-2 pr-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-faint">
                    {TIER_LABELS[tier]}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {cars.map(c => (
                      <Link
                        key={c.vehicleId}
                        href={`/vehicles/${c.vehicleId}`}
                        className={cn(
                          'rounded-md border bg-surface-2 px-2.5 py-1 text-xs font-semibold transition-all hover:scale-105',
                          styles.border, styles.text
                        )}
                      >
                        {c.short}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-vehicle scoring */}
      <div>
        <h3 className="mb-3 text-base font-bold sm:text-lg">📊 By Category</h3>
        <p className="mb-3 text-xs text-text-dim sm:text-sm">
          Each car ranked across 8 dimensions that matter for your situation. Tap a car name to jump to its full detail page.
        </p>

        {/* Mobile: stacked card per car */}
        <div className="space-y-3 sm:hidden">
          {TIER_RANKINGS.map(car => {
            const overallStyles = TIER_STYLES[car.overall];
            return (
              <article key={car.vehicleId} className={cn('overflow-hidden rounded-xl border bg-surface', overallStyles.border)}>
                <header className="flex items-start gap-3 border-b border-border bg-surface-2 px-3 py-2.5">
                  <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-extrabold', overallStyles.bg, overallStyles.text)}>
                    {car.overall}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/vehicles/${car.vehicleId}`} className="text-sm font-bold leading-tight hover:underline">
                      {car.name}
                    </Link>
                    <p className="mt-0.5 text-[11px] leading-snug text-text-dim">{car.oneliner}</p>
                  </div>
                </header>
                <div className="grid grid-cols-4 divide-x divide-y divide-border/40 bg-bg/30">
                  {TIER_CATEGORIES.map(cat => {
                    const tier = car[cat.key];
                    const ts = TIER_STYLES[tier];
                    return (
                      <div key={cat.key} className="px-1 py-1.5 text-center">
                        <div className="text-[10px]" title={cat.label}>{cat.icon}</div>
                        <div className={cn('mt-0.5 text-sm font-extrabold', ts.text)}>{tier}</div>
                        <div className="text-[8px] uppercase tracking-wide text-text-faint">{cat.short}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border/50 bg-surface-2/50 px-3 py-2 text-[11px] leading-snug text-text-faint">
                  {car.proof}
                </div>
              </article>
            );
          })}
        </div>

        {/* Desktop: comparison table */}
        <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface scrollbar-thin sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-text-dim">
                <th className="sticky left-0 bg-surface-2 px-3 py-2 text-left">Vehicle</th>
                {TIER_CATEGORIES.map(cat => (
                  <th key={cat.key} className="px-2 py-2 text-center" title={cat.label}>
                    <span className="text-base">{cat.icon}</span>
                    <div className="text-[10px]">{cat.short}</div>
                  </th>
                ))}
                <th className="px-3 py-2 text-center">Overall</th>
              </tr>
            </thead>
            <tbody>
              {TIER_RANKINGS.map((car, i) => (
                <tr key={car.vehicleId} className={cn('border-b border-border/40', i % 2 === 1 && 'bg-bg/30')}>
                  <td className="sticky left-0 bg-surface px-3 py-2">
                    <Link href={`/vehicles/${car.vehicleId}`} className="block">
                      <div className="text-sm font-bold hover:text-accent">{car.name}</div>
                      <div className="text-[11px] text-text-faint">{car.oneliner}</div>
                    </Link>
                  </td>
                  {TIER_CATEGORIES.map(cat => {
                    const tier = car[cat.key];
                    const ts = TIER_STYLES[tier];
                    return (
                      <td key={cat.key} className="px-2 py-2 text-center">
                        <span className={cn('inline-block w-7 rounded-md py-0.5 text-sm font-extrabold', ts.bg, ts.text)}>
                          {tier}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-center">
                    <span className={cn('inline-block w-9 rounded-md py-1 text-base font-extrabold', TIER_STYLES[car.overall].bg, TIER_STYLES[car.overall].text)}>
                      {car.overall}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {(['S', 'A', 'B', 'C'] as Tier[]).map(tier => {
            const ts = TIER_STYLES[tier];
            return (
              <div key={tier} className={cn('flex items-center gap-2 rounded-md border bg-surface px-2 py-1.5', ts.border)}>
                <span className={cn('flex h-6 w-6 items-center justify-center rounded font-extrabold', ts.bg, ts.text)}>
                  {tier}
                </span>
                <span className="text-text-dim">{TIER_LABELS[tier]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
