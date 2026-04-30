import { TRAPS } from '@/lib/data';

export function TrapsList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TRAPS.map(t => (
        <div
          key={t.title}
          className="rounded-lg border border-border border-l-4 border-l-danger bg-surface px-4 py-3"
        >
          <div className="mb-1 font-bold text-danger">⚠️ {t.title}</div>
          <p className="text-sm leading-snug text-text-dim">{t.body}</p>
        </div>
      ))}
    </div>
  );
}
