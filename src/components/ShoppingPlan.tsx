import { SHOPPING_DAY_PLAN, SHOPPING_DAY_BRING } from '@/lib/data';

export function ShoppingPlan() {
  return (
    <div className="space-y-4">
      <div className="relative space-y-3 pl-6 sm:pl-8">
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-border sm:left-2" />
        {SHOPPING_DAY_PLAN.map((step, i) => (
          <div key={step.timeBlock} className="relative">
            <div className="absolute -left-[18px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient ring-4 ring-bg sm:-left-[22px]">
              <span className="text-[9px] font-bold text-white">{i + 1}</span>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-accent-2">
                {step.timeBlock}
              </div>
              <h3 className="mt-0.5 text-base font-bold sm:text-lg">{step.title}</h3>
              <ul className="mt-2 space-y-1.5">
                {step.notes.map((n, j) => (
                  <li key={j} className="flex gap-2 text-sm text-text-dim">
                    <span className="mt-0.5 text-accent-2">→</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-2 text-base font-bold">🎒 Bring with you</h3>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {SHOPPING_DAY_BRING.map(item => (
            <li key={item} className="flex gap-2 text-sm">
              <span className="text-success">✓</span>
              <span className="text-text-dim">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
