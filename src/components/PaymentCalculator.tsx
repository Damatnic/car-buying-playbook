'use client';
import { useState, useEffect, useCallback } from 'react';
import { calcPayment, isOverBudget, MONTHLY_CAP_DEFAULT } from '@/lib/calc';
import { cn, fmtCurrency } from '@/lib/utils';
import { storage } from '@/lib/storage';

interface PaymentCalculatorProps {
  initialPrice?: number;
  initialDown?: number;
  initialApr?: number;
  initialTerm?: number;
  vehicleId?: string;
  vehicleName?: string;
  showSave?: boolean;
}

const TERMS = [48, 60, 72, 84];

export function PaymentCalculator({
  initialPrice = 25000,
  initialDown = 3000,
  initialApr = 17,
  initialTerm = 72,
  vehicleId,
  vehicleName,
  showSave = false
}: PaymentCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(initialDown);
  const [apr, setApr] = useState(initialApr);
  const [term, setTerm] = useState(initialTerm);
  const [saved, setSaved] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const result = calcPayment({ stickerPrice: price, downPayment: down, aprPercent: apr, termMonths: term });
  const over = isOverBudget(result.monthlyPayment);

  const handleSave = useCallback(() => {
    if (!vehicleId) return;
    const id = `${vehicleId}-${Date.now()}`;
    storage.saveBuild({
      id,
      vehicleId,
      trim: vehicleName || 'Custom build',
      price,
      apr,
      termMonths: term,
      downPayment: down,
      notes: '',
      createdAt: Date.now()
    });
    setSaved(true);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }, [vehicleId, vehicleName, price, apr, term, down]);

  useEffect(() => {
    setSaved(false);
  }, [price, down, apr, term]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xl shadow-black/40 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="flex flex-col gap-5">
          <SliderRow
            label="Sticker Price"
            value={price}
            display={fmtCurrency(price)}
            min={15000} max={40000} step={500}
            onChange={setPrice}
          />
          <SliderRow
            label="Down Payment"
            value={down}
            display={fmtCurrency(down)}
            min={0} max={10000} step={250}
            onChange={setDown}
          />
          <SliderRow
            label="APR (subprime range)"
            value={apr}
            display={`${apr}%`}
            min={4} max={24} step={0.5}
            onChange={setApr}
          />
          <div>
            <label className="mb-2 block text-sm">Loan Term</label>
            <div className="flex gap-2">
              {TERMS.map(t => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className={cn(
                    'flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-all',
                    term === t
                      ? 'border-transparent bg-gradient text-white'
                      : 'border-border bg-surface-2 text-text-dim hover:text-text'
                  )}
                >
                  {t}mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className={cn(
          'relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-surface-2 p-6 text-center transition-all',
          over && 'ring-1 ring-danger/30'
        )}>
          <div className="mb-2 text-xs uppercase tracking-widest text-text-dim">Monthly Payment</div>
          <div className={cn(
            'text-5xl font-extrabold tabular-nums leading-none',
            over ? 'gradient-text-warn' : 'gradient-text'
          )}>
            {fmtCurrency(result.monthlyPayment)}
            <span className="text-2xl">/mo</span>
          </div>
          <div className={cn(
            'mt-4 rounded-full border px-3 py-1 text-sm font-semibold',
            over
              ? 'border-danger/30 bg-danger/15 text-danger'
              : 'border-success/30 bg-success/15 text-success'
          )}>
            {over
              ? `Over budget by ${fmtCurrency(result.monthlyPayment - MONTHLY_CAP_DEFAULT)}/mo`
              : `${fmtCurrency(MONTHLY_CAP_DEFAULT - result.monthlyPayment)}/mo under cap`}
          </div>
          <dl className="mt-5 grid w-full grid-cols-2 gap-2 text-left text-xs">
            <DetailRow label="OTD price" value={fmtCurrency(result.otdPrice)} />
            <DetailRow label="Financed" value={fmtCurrency(result.financed)} />
            <DetailRow label="Total paid" value={fmtCurrency(result.totalPaid + down)} />
            <DetailRow label="Interest" value={fmtCurrency(result.totalInterest)} />
          </dl>
          {showSave && vehicleId && (
            <button
              onClick={handleSave}
              className={cn(
                'mt-5 w-full rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all',
                savedFlash
                  ? 'border-success bg-success/10 text-success'
                  : saved
                  ? 'border-accent/30 bg-accent/10 text-accent'
                  : 'border-border bg-bg hover:border-accent hover:bg-accent/10 hover:text-accent'
              )}
            >
              {savedFlash ? '✓ Build saved' : saved ? '✓ Saved (save again to update)' : '+ Save this build'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label, value, display, min, max, step, onChange
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 flex items-baseline justify-between text-sm">
        <span>{label}</span>
        <span className="font-bold tabular-nums text-accent-2">{display}</span>
      </label>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/50 py-1">
      <dt className="text-text-faint">{label}:</dt>
      <dd className="font-semibold tabular-nums text-text-dim">{value}</dd>
    </div>
  );
}
