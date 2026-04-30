'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { calcPayment } from '@/lib/calc';
import { fmtCurrency, cn } from '@/lib/utils';
import { getVehicleById } from '@/lib/data';
import type { SavedBuild } from '@/types';

export function SavedBuildsList() {
  const [builds, setBuilds] = useState<SavedBuild[]>([]);

  const refresh = useCallback(() => setBuilds(storage.getSavedBuilds()), []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [refresh]);

  if (builds.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <div className="mb-2 text-3xl">📋</div>
        <p className="font-semibold">No saved builds yet</p>
        <p className="mt-1 text-sm text-text-dim">
          Open a vehicle, configure the calculator, and hit &ldquo;Save this build&rdquo; to track configurations here.
        </p>
        <Link href="/vehicles" className="mt-4 inline-block rounded-lg bg-gradient px-4 py-2 text-sm font-semibold text-white">
          Browse vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {builds.sort((a, b) => b.createdAt - a.createdAt).map(b => {
        const v = getVehicleById(b.vehicleId);
        const calc = calcPayment({
          stickerPrice: b.price,
          downPayment: b.downPayment,
          aprPercent: b.apr,
          termMonths: b.termMonths
        });
        const over = calc.monthlyPayment > 500;
        return (
          <div key={b.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-bold">{v?.name || b.vehicleId}</div>
                <div className="text-xs text-text-faint">
                  Saved {new Date(b.createdAt).toLocaleDateString()} · {b.trim}
                </div>
              </div>
              <button
                onClick={() => { storage.deleteBuild(b.id); refresh(); }}
                className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-faint hover:border-danger hover:text-danger"
              >
                Delete
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
              <Field label="Price" value={fmtCurrency(b.price)} />
              <Field label="Down" value={fmtCurrency(b.downPayment)} />
              <Field label="APR" value={`${b.apr}%`} />
              <Field label="Term" value={`${b.termMonths}mo`} />
              <Field
                label="Monthly"
                value={fmtCurrency(calc.monthlyPayment)}
                highlight={over ? 'danger' : 'success'}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: 'success' | 'danger' }) {
  return (
    <div className={cn(
      'rounded-md bg-surface-2 px-2.5 py-1.5',
      highlight === 'success' && 'bg-success/10',
      highlight === 'danger' && 'bg-danger/10'
    )}>
      <div className="text-[10px] uppercase tracking-wide text-text-faint">{label}</div>
      <div className={cn(
        'font-semibold tabular-nums',
        highlight === 'success' && 'text-success',
        highlight === 'danger' && 'text-danger'
      )}>{value}</div>
    </div>
  );
}
