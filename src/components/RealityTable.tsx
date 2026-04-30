import { calcPayment } from '@/lib/calc';
import { cn, fmtCurrency } from '@/lib/utils';

const ROWS = [24000, 26000, 28000, 30000];
const TERMS_TO_SHOW = [72, 84];

export function RealityTable({ apr = 17, downPayment = 3000 }: { apr?: number; downPayment?: number }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-text-dim">
            <th className="px-4 py-3 text-left">Sticker</th>
            <th className="px-4 py-3 text-left">After WI Tax</th>
            <th className="px-4 py-3 text-left">Financed</th>
            {TERMS_TO_SHOW.map(t => (
              <th key={t} className="px-4 py-3 text-left">{t}mo @ {apr}%</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(price => {
            const r72 = calcPayment({ stickerPrice: price, downPayment, aprPercent: apr, termMonths: 72 });
            const r84 = calcPayment({ stickerPrice: price, downPayment, aprPercent: apr, termMonths: 84 });
            return (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Tag({ ok, tight }: { ok: boolean; tight: boolean }) {
  if (ok && !tight) return <span className="ml-1 inline-block rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">✓</span>;
  if (ok && tight) return <span className="ml-1 inline-block rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">tight</span>;
  return <span className="ml-1 inline-block rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-bold text-danger">✗</span>;
}
