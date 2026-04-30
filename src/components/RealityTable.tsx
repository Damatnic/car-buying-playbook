import { calcPayment } from '@/lib/calc';
import { cn, fmtCurrency } from '@/lib/utils';

const ROWS = [24000, 26000, 28000, 30000];

export function RealityTable({ apr = 17, downPayment = 3000 }: { apr?: number; downPayment?: number }) {
  const rows = ROWS.map(price => {
    const r72 = calcPayment({ stickerPrice: price, downPayment, aprPercent: apr, termMonths: 72 });
    const r84 = calcPayment({ stickerPrice: price, downPayment, aprPercent: apr, termMonths: 84 });
    return { price, r72, r84 };
  });

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface scrollbar-thin sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-text-dim">
              <th className="px-4 py-3 text-left">Sticker</th>
              <th className="px-4 py-3 text-left">After WI Tax</th>
              <th className="px-4 py-3 text-left">Financed</th>
              <th className="px-4 py-3 text-left">72mo @ {apr}%</th>
              <th className="px-4 py-3 text-left">84mo @ {apr}%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ price, r72, r84 }) => (
              <tr key={price} className="border-b border-border/40 hover:bg-accent/5">
                <td className="px-4 py-3 font-semibold tabular-nums">{fmtCurrency(price)}</td>
                <td className="px-4 py-3 tabular-nums text-text-dim">{fmtCurrency(r72.otdPrice)}</td>
                <td className="px-4 py-3 tabular-nums text-text-dim">{fmtCurrency(r72.financed)}</td>
                <td className="px-4 py-3 tabular-nums">
                  {fmtCurrency(r72.monthlyPayment)} <Tag ok={r72.monthlyPayment <= 500} tight={r72.monthlyPayment <= 510} />
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {fmtCurrency(r84.monthlyPayment)} <Tag ok={r84.monthlyPayment <= 500} tight={r84.monthlyPayment <= 510} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="space-y-2 sm:hidden">
        {rows.map(({ price, r72, r84 }) => (
          <div key={price} className="rounded-xl border border-border bg-surface p-3.5">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="text-lg font-bold tabular-nums">{fmtCurrency(price)}</div>
              <div className="text-xs text-text-faint tabular-nums">
                OTD {fmtCurrency(r72.otdPrice)} · Fin {fmtCurrency(r72.financed)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PaymentCell label={`72mo @ ${apr}%`} amount={r72.monthlyPayment} />
              <PaymentCell label={`84mo @ ${apr}%`} amount={r84.monthlyPayment} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PaymentCell({ label, amount }: { label: string; amount: number }) {
  const ok = amount <= 500;
  const tight = amount <= 510;
  return (
    <div className={cn(
      'rounded-md border px-3 py-2',
      ok && !tight ? 'border-success/30 bg-success/10' :
      tight ? 'border-warning/30 bg-warning/10' :
      'border-danger/30 bg-danger/10'
    )}>
      <div className="text-[10px] uppercase tracking-wide text-text-faint">{label}</div>
      <div className="font-bold tabular-nums">
        {fmtCurrency(amount)}
        <span className="ml-1 text-xs">/mo</span>
      </div>
      <Tag ok={ok && !tight} tight={tight && ok} />
    </div>
  );
}

function Tag({ ok, tight }: { ok: boolean; tight: boolean }) {
  if (ok && !tight) return <span className="ml-1 inline-block rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">✓</span>;
  if (tight) return <span className="ml-1 inline-block rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">tight</span>;
  return <span className="ml-1 inline-block rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-bold text-danger">over</span>;
}
