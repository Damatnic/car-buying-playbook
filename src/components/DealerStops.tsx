import { SHOPPING_DAY_DEALERS } from '@/lib/data';
import { cn } from '@/lib/utils';

export function DealerStops() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SHOPPING_DAY_DEALERS.map(d => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapsQuery)}`;
        const cleanPhone = d.phone?.replace(/\D/g, '');
        const fmtPhone = d.phone
          ? `(${d.phone.slice(2, 5)}) ${d.phone.slice(5, 8)}-${d.phone.slice(8)}`
          : null;
        return (
          <article
            key={d.name}
            className={cn(
              'flex flex-col rounded-xl border bg-surface p-4 transition-all',
              d.noPressure
                ? 'border-success/40 ring-1 ring-success/20'
                : 'border-border'
            )}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold leading-tight">{d.name}</h3>
                <p className="text-xs text-text-faint">{d.brand} · {d.city}, WI</p>
              </div>
              {d.noPressure && (
                <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                  Start here
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-snug text-text-dim">{d.whyVisit}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.vehicles.map(v => (
                <span key={v} className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-text-dim">
                  {v}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold text-text-dim hover:border-accent hover:text-accent"
              >
                Website ↗
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold text-text-dim hover:border-accent hover:text-accent"
              >
                📍 Directions
              </a>
              {cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/15"
                >
                  📞 {fmtPhone}
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
