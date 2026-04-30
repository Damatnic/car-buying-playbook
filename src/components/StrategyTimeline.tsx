'use client';
import { useEffect, useState, useCallback } from 'react';
import { CHECKLIST_STEPS } from '@/lib/data';
import { storage } from '@/lib/storage';
import { cn } from '@/lib/utils';

export function StrategyTimeline({ interactive = false }: { interactive?: boolean }) {
  const [state, setState] = useState<Record<string, boolean>>({});

  const refresh = useCallback(() => setState(storage.getChecklist()), []);

  useEffect(() => {
    if (!interactive) return;
    refresh();
    const handler = () => refresh();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [interactive, refresh]);

  const toggle = (id: string) => {
    if (!interactive) return;
    const next = !state[id];
    storage.setChecklistItem(id, next);
    setState(s => ({ ...s, [id]: next }));
  };

  const totalCount = CHECKLIST_STEPS.reduce((sum, w) => sum + w.items.length, 0);
  const doneCount = Object.values(state).filter(Boolean).length;
  const pct = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  return (
    <div>
      {interactive && (
        <div className="mb-6 rounded-xl border border-border bg-surface p-4">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-semibold">Your progress</span>
            <span className="font-bold tabular-nums text-accent-2">
              {doneCount} / {totalCount} done · {pct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-gradient transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          {doneCount > 0 && (
            <button
              onClick={() => { storage.clearChecklist(); setState({}); }}
              className="mt-3 text-xs text-text-faint underline-offset-2 hover:text-danger hover:underline"
            >
              Reset checklist
            </button>
          )}
        </div>
      )}

      <div className="relative space-y-6 pl-8">
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
        {CHECKLIST_STEPS.map(step => {
          const stepDone = step.items.every(i => state[i.id]);
          return (
            <div key={step.id} className="relative">
              <div
                className={cn(
                  'absolute -left-[26px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-bg transition-all',
                  stepDone ? 'bg-success' : 'bg-gradient'
                )}
              />
              <div className="mb-1 text-xs font-bold uppercase tracking-widest text-accent-2">{step.week}</div>
              <h3 className="mb-3 text-lg font-bold">{step.title}</h3>
              <ul className="space-y-1.5">
                {step.items.map(item => {
                  const done = !!state[item.id];
                  return (
                    <li key={item.id}>
                      {interactive ? (
                        <button
                          onClick={() => toggle(item.id)}
                          className={cn(
                            'flex w-full items-start gap-2 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-surface',
                            done && 'text-text-faint line-through'
                          )}
                        >
                          <span className={cn(
                            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold transition-colors',
                            done ? 'border-success bg-success/20 text-success' : 'border-border'
                          )}>
                            {done ? '✓' : ''}
                          </span>
                          <span>{item.text}</span>
                        </button>
                      ) : (
                        <div className="flex items-start gap-2 px-2 py-1 text-sm text-text-dim">
                          <span className="text-success">✓</span>
                          <span>{item.text}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
