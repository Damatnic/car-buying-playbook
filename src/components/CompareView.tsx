'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { storage } from '@/lib/storage';
import { VEHICLES, getVehicleById } from '@/lib/data';
import { FeatureMatrix } from '@/components/FeatureMatrix';
import { fmtCurrencyRange, cn } from '@/lib/utils';
import type { Vehicle } from '@/types';

export function CompareView() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const refresh = useCallback(() => setSavedIds(storage.getSavedVehicles()), []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [refresh]);

  const saved = savedIds.map(getVehicleById).filter((v): v is Vehicle => Boolean(v));

  if (saved.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <div className="mb-2 text-3xl">⚖️</div>
        <p className="font-semibold">No saved vehicles yet</p>
        <p className="mt-1 text-sm text-text-dim">
          Tap the ☆ Save button on any vehicle card to add it here.
        </p>
        <Link href="/vehicles" className="mt-4 inline-block rounded-lg bg-gradient px-4 py-2 text-sm font-semibold text-white">
          Browse vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick stats matrix */}
      <div className="overflow-x-auto rounded-xl border border-border bg-surface scrollbar-thin">
        {saved.length >= 3 && (
          <p className="border-b border-border bg-surface-2 px-3 py-1.5 text-[11px] text-text-faint sm:hidden">← swipe to see all vehicles →</p>
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-text-dim">
              <th className="sticky left-0 bg-surface-2 px-3 py-3 text-left sm:px-4">Quick Stats</th>
              {saved.map(v => (
                <th key={v.id} className="min-w-[130px] px-2 py-3 text-center sm:min-w-[160px] sm:px-3">
                  <div className="space-y-1">
                    {v.images.exterior && (
                      <div className="relative mx-auto h-12 w-20 overflow-hidden rounded sm:h-16 sm:w-24">
                        <Image src={v.images.exterior} alt={v.name} fill sizes="96px" className="object-cover" />
                      </div>
                    )}
                    <div className="text-xs font-bold text-text sm:text-sm">{v.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Price range', get: (v: Vehicle) => fmtCurrencyRange(v.priceLow, v.priceHigh) },
              { label: 'Segment', get: (v: Vehicle) => v.segment },
              { label: 'Cargo (max)', get: (v: Vehicle) => `${v.cargoMax} cu ft` },
              { label: 'Cargo (behind)', get: (v: Vehicle) => `${v.cargoBehind} cu ft` },
              { label: 'Seating', get: (v: Vehicle) => `${v.specs.seating} pax` },
              { label: 'MPG', get: (v: Vehicle) => v.specs.mpg },
              { label: 'Horsepower', get: (v: Vehicle) => `${v.specs.horsepower} hp` },
              { label: 'AWD', get: (v: Vehicle) => v.awd === 'standard' ? '✓ Standard' : v.awd === 'available' ? 'Optional' : '✗' },
              { label: 'Towing', get: (v: Vehicle) => `${v.specs.towingLb.toLocaleString()} lb` },
              { label: 'Ground clearance', get: (v: Vehicle) => `${v.specs.groundClearanceIn}"` },
              { label: 'Safety suite', get: (v: Vehicle) => v.safety.suite },
              { label: 'Warranty', get: (v: Vehicle) => v.warranty }
            ].map((row, i) => (
              <tr key={row.label} className={cn('border-b border-border/40', i % 2 === 1 && 'bg-bg/30')}>
                <td className="sticky left-0 bg-surface px-3 py-2 text-xs font-semibold text-text-dim sm:px-4">{row.label}</td>
                {saved.map(v => (
                  <td key={v.id} className="px-2 py-2 text-center text-xs sm:px-3 sm:text-sm">{row.get(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature matrices */}
      <FeatureMatrix vehicles={saved} category="safety" />
      <FeatureMatrix vehicles={saved} category="tech" />
      <FeatureMatrix vehicles={saved} category="comfort" />

      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-dim">
        <strong className="text-text">Saved {saved.length} of {VEHICLES.length} vehicles.</strong>{' '}
        Visit the <Link href="/vehicles" className="text-accent-2 hover:underline">vehicles page</Link> to add or remove from this comparison.
      </div>
    </div>
  );
}
