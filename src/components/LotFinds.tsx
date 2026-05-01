'use client';
import { useEffect, useState, useCallback } from 'react';
import type { LotFind } from '@/types';
import { storage } from '@/lib/storage';
import { calcPayment } from '@/lib/calc';
import { cn, fmtCurrency } from '@/lib/utils';

const COMMON_MODELS = [
  { make: 'Toyota', model: 'RAV4' },
  { make: 'Honda', model: 'CR-V' },
  { make: 'Subaru', model: 'Forester' },
  { make: 'Mazda', model: 'CX-5' },
  { make: 'Kia', model: 'Sportage' },
  { make: 'Hyundai', model: 'Tucson' },
  { make: 'Nissan', model: 'Rogue' },
  { make: 'Mitsubishi', model: 'Outlander' }
];

const TERMS = [60, 72, 84];
const DEFAULT_DOWN = 3000;
const DEFAULT_APR = 17;

interface NewLotFind {
  year: string;
  make: string;
  model: string;
  trim: string;
  mileage: string;
  price: string;
  awd: boolean;
  color: string;
  stockNumber: string;
  notes: string;
  vehicleHistory: 'clean' | 'accident' | 'unknown';
}

const EMPTY_FIND: NewLotFind = {
  year: '',
  make: '',
  model: '',
  trim: '',
  mileage: '',
  price: '',
  awd: false,
  color: '',
  stockNumber: '',
  notes: '',
  vehicleHistory: 'unknown'
};

export function LotFinds() {
  const [finds, setFinds] = useState<LotFind[]>([]);
  const [draft, setDraft] = useState<NewLotFind>(EMPTY_FIND);
  const [showForm, setShowForm] = useState(false);
  const [downPayment, setDownPayment] = useState(DEFAULT_DOWN);
  const [apr, setApr] = useState(DEFAULT_APR);

  const refresh = useCallback(() => setFinds(storage.getLotFinds()), []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [refresh]);

  const validToSave =
    draft.year.length === 4 &&
    Number(draft.year) >= 2018 &&
    Number(draft.year) <= 2026 &&
    draft.make.trim().length > 0 &&
    draft.model.trim().length > 0 &&
    Number(draft.price) >= 5000 &&
    Number(draft.price) <= 60000;

  const save = () => {
    if (!validToSave) return;
    const find: LotFind = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      year: Number(draft.year),
      make: draft.make.trim(),
      model: draft.model.trim(),
      trim: draft.trim.trim() || undefined,
      mileage: draft.mileage ? Number(draft.mileage) : undefined,
      price: Number(draft.price),
      awd: draft.awd,
      color: draft.color.trim() || undefined,
      stockNumber: draft.stockNumber.trim() || undefined,
      notes: draft.notes.trim() || undefined,
      vehicleHistory: draft.vehicleHistory,
      createdAt: Date.now()
    };
    storage.saveLotFind(find);
    refresh();
    setDraft(EMPTY_FIND);
    setShowForm(false);
  };

  const remove = (id: string) => {
    storage.deleteLotFind(id);
    refresh();
  };

  const setRating = (find: LotFind, rating: 'up' | 'down' | 'clear') => {
    const updated: LotFind = {
      ...find,
      thumbsUp: rating === 'up',
      thumbsDown: rating === 'down'
    };
    storage.saveLotFind(updated);
    refresh();
  };

  const quickPick = (m: { make: string; model: string }) => {
    setDraft(d => ({ ...d, make: m.make, model: m.model }));
  };

  return (
    <div className="space-y-4">
      {/* APR + Down quick adjusters */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="mb-1 flex items-baseline justify-between text-xs">
              <span className="text-text-dim">Your down payment</span>
              <span className="font-bold tabular-nums text-accent-2">{fmtCurrency(downPayment)}</span>
            </label>
            <input
              type="range" min={0} max={8000} step={250} value={downPayment}
              onChange={e => setDownPayment(Number(e.target.value))} className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 flex items-baseline justify-between text-xs">
              <span className="text-text-dim">Your APR</span>
              <span className="font-bold tabular-nums text-accent-2">{apr}%</span>
            </label>
            <input
              type="range" min={4} max={24} step={0.5} value={apr}
              onChange={e => setApr(Number(e.target.value))} className="w-full"
            />
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className="self-center text-[10px] font-bold uppercase tracking-wider text-text-faint">APR presets:</span>
          {[
            { value: 7, label: '7%', sub: 'excellent', color: 'success' },
            { value: 11, label: '11%', sub: 'good pre-approval', color: 'success' },
            { value: 14, label: '14%', sub: 'fair pre-approval', color: 'warning' },
            { value: 17, label: '17%', sub: 'subprime default', color: 'warning' },
            { value: 21, label: '21%', sub: 'dealer subprime', color: 'danger' }
          ].map(p => (
            <button
              key={p.value}
              onClick={() => setApr(p.value)}
              className={cn(
                'rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-all',
                apr === p.value
                  ? p.color === 'success' ? 'border-success bg-success/15 text-success' :
                    p.color === 'warning' ? 'border-warning bg-warning/15 text-warning' :
                    'border-danger bg-danger/15 text-danger'
                  : 'border-border bg-surface-2 text-text-faint hover:border-accent hover:text-text'
              )}
            >
              {p.label} <span className="opacity-70">{p.sub}</span>
            </button>
          ))}
        </div>
        <div className="mt-2.5 rounded-md border border-accent/20 bg-accent/5 px-3 py-2 text-[11px] text-text-dim">
          <strong className="text-accent-2">💡 Why monthly is high:</strong> 17% subprime APR adds ~$5,500 of interest over 72 months on a $25k loan. Get a Capital One Auto Navigator soft-pull pre-approval (no credit hit) — if you land 11-13% APR, monthly drops $50-80/mo on the same car.
        </div>
      </div>

      {/* Add button or form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 px-4 py-4 text-base font-bold text-accent transition-colors hover:bg-accent/10"
        >
          + Add a car you spotted at the lot
        </button>
      ) : (
        <div className="rounded-xl border border-accent/40 bg-surface p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="font-bold">📝 New find</h3>
            <button onClick={() => { setShowForm(false); setDraft(EMPTY_FIND); }} className="text-xs text-text-faint hover:text-danger">
              Cancel
            </button>
          </div>
          <div className="mb-3 flex flex-wrap gap-1">
            {COMMON_MODELS.map(m => (
              <button
                key={`${m.make}-${m.model}`}
                onClick={() => quickPick(m)}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-text-dim hover:border-accent hover:text-accent"
              >
                {m.make} {m.model}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Year" required>
              <input type="number" inputMode="numeric" placeholder="2023" value={draft.year}
                onChange={e => setDraft({ ...draft, year: e.target.value })} className="input" />
            </Field>
            <Field label="Price" required>
              <input type="number" inputMode="decimal" placeholder="24500" value={draft.price}
                onChange={e => setDraft({ ...draft, price: e.target.value })} className="input" />
            </Field>
            <Field label="Make" required>
              <input type="text" placeholder="Toyota" value={draft.make}
                onChange={e => setDraft({ ...draft, make: e.target.value })} className="input" />
            </Field>
            <Field label="Model" required>
              <input type="text" placeholder="RAV4" value={draft.model}
                onChange={e => setDraft({ ...draft, model: e.target.value })} className="input" />
            </Field>
            <Field label="Trim">
              <input type="text" placeholder="XLE" value={draft.trim}
                onChange={e => setDraft({ ...draft, trim: e.target.value })} className="input" />
            </Field>
            <Field label="Mileage">
              <input type="number" inputMode="numeric" placeholder="42000" value={draft.mileage}
                onChange={e => setDraft({ ...draft, mileage: e.target.value })} className="input" />
            </Field>
            <Field label="Color">
              <input type="text" placeholder="Silver" value={draft.color}
                onChange={e => setDraft({ ...draft, color: e.target.value })} className="input" />
            </Field>
            <Field label="Stock #">
              <input type="text" placeholder="2384921" value={draft.stockNumber}
                onChange={e => setDraft({ ...draft, stockNumber: e.target.value })} className="input" />
            </Field>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm">
              <input type="checkbox" checked={draft.awd}
                onChange={e => setDraft({ ...draft, awd: e.target.checked })} />
              <span>AWD</span>
            </label>
            <select
              value={draft.vehicleHistory}
              onChange={e => setDraft({ ...draft, vehicleHistory: e.target.value as NewLotFind['vehicleHistory'] })}
              className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm"
            >
              <option value="unknown">Carfax: not checked</option>
              <option value="clean">Carfax: clean</option>
              <option value="accident">Carfax: accident</option>
            </select>
          </div>
          <Field label="Notes" className="mt-3">
            <textarea
              placeholder="What stood out about this car?"
              value={draft.notes}
              onChange={e => setDraft({ ...draft, notes: e.target.value })}
              className="textarea" rows={2}
            />
          </Field>
          <div className="mt-3 flex gap-2">
            <button
              onClick={save}
              disabled={!validToSave}
              className="flex-1 rounded-lg bg-gradient px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              {validToSave ? '✓ Save this find' : 'Fill year + make + model + price'}
            </button>
          </div>
        </div>
      )}

      {/* Saved finds */}
      {finds.length === 0 && !showForm ? (
        <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center">
          <div className="mb-1 text-2xl">🚗</div>
          <p className="text-sm font-semibold">No finds yet</p>
          <p className="mt-1 text-xs text-text-dim">Tap a car at the lot, fill the form, see if it fits your budget instantly.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {finds.length > 1 && (
            <p className="text-xs text-text-faint">{finds.length} cars logged · sorted newest first · all monthly payments use your settings above</p>
          )}
          {[...finds].sort((a, b) => b.createdAt - a.createdAt).map(f => (
            <FindCard key={f.id} find={f} apr={apr} downPayment={downPayment}
              onDelete={() => remove(f.id)}
              onRate={(r) => setRating(f, r)}
            />
          ))}
        </div>
      )}

      {finds.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => { if (confirm('Delete all lot finds?')) { storage.clearLotFinds(); refresh(); } }}
            className="text-xs text-text-faint hover:text-danger"
          >
            Clear all
          </button>
        </div>
      )}

      <style jsx>{`
        .input, .textarea {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px 10px;
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
        }
        .textarea { resize: vertical; }
        .input:focus, .textarea:focus { outline: none; border-color: var(--accent); }
      `}</style>
    </div>
  );
}

function Field({
  label, required, className = '', children
}: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-text-faint">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
    </div>
  );
}

function FindCard({
  find, apr, downPayment, onDelete, onRate
}: {
  find: LotFind;
  apr: number;
  downPayment: number;
  onDelete: () => void;
  onRate: (r: 'up' | 'down' | 'clear') => void;
}) {
  const calcs = TERMS.map(term => {
    const result = calcPayment({
      stickerPrice: find.price,
      downPayment,
      aprPercent: apr,
      termMonths: term
    });
    return { term, ...result, over: result.monthlyPayment > 500 };
  });
  const fitness = calcs[1].over ? 'over' : calcs[1].monthlyPayment > 480 ? 'tight' : 'ok';

  return (
    <article className={cn(
      'overflow-hidden rounded-xl border bg-surface',
      fitness === 'ok' && 'border-success/40',
      fitness === 'tight' && 'border-warning/40',
      fitness === 'over' && 'border-danger/40',
      find.thumbsDown && 'opacity-60'
    )}>
      <header className="flex items-start gap-3 border-b border-border bg-surface-2 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-base font-bold leading-tight">
              {find.year} {find.make} {find.model}
            </h3>
            {find.trim && <span className="text-xs text-text-dim">{find.trim}</span>}
          </div>
          <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-text-faint">
            {find.mileage !== undefined && <span>{find.mileage.toLocaleString()} mi</span>}
            {find.awd && <span className="text-success">AWD</span>}
            {find.color && <span>{find.color}</span>}
            {find.stockNumber && <span>#{find.stockNumber}</span>}
            {find.vehicleHistory === 'clean' && <span className="text-success">✓ Clean Carfax</span>}
            {find.vehicleHistory === 'accident' && <span className="text-danger">⚠ Accident</span>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-extrabold tabular-nums text-accent-2">{fmtCurrency(find.price)}</div>
        </div>
      </header>

      <div className="grid grid-cols-3 divide-x divide-border bg-bg/50">
        {calcs.map(c => (
          <div key={c.term} className="px-2 py-2.5 text-center">
            <div className="text-[10px] uppercase tracking-wide text-text-faint">{c.term}mo</div>
            <div className={cn(
              'mt-0.5 font-bold tabular-nums',
              c.monthlyPayment > 500 ? 'text-danger' : c.monthlyPayment > 480 ? 'text-warning' : 'text-success'
            )}>
              {fmtCurrency(c.monthlyPayment)}
            </div>
            <div className="text-[9px] text-text-faint">/mo</div>
          </div>
        ))}
      </div>

      {find.notes && (
        <div className="border-t border-border/50 bg-surface-2/50 px-4 py-2 text-xs italic text-text-dim">
          &ldquo;{find.notes}&rdquo;
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <div className="flex gap-1">
          <button
            onClick={() => onRate(find.thumbsUp ? 'clear' : 'up')}
            className={cn(
              'rounded-md border px-2.5 py-1 text-sm transition-colors',
              find.thumbsUp ? 'border-success bg-success/15 text-success' : 'border-border text-text-faint hover:border-success hover:text-success'
            )}
            aria-label="Like"
          >
            👍
          </button>
          <button
            onClick={() => onRate(find.thumbsDown ? 'clear' : 'down')}
            className={cn(
              'rounded-md border px-2.5 py-1 text-sm transition-colors',
              find.thumbsDown ? 'border-danger bg-danger/15 text-danger' : 'border-border text-text-faint hover:border-danger hover:text-danger'
            )}
            aria-label="Dislike"
          >
            👎
          </button>
        </div>
        <button
          onClick={onDelete}
          className="rounded-md border border-border px-2.5 py-1 text-xs text-text-faint hover:border-danger hover:text-danger"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
