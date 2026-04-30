import type { Vehicle } from '@/types';

interface FeatureListProps {
  vehicle: Vehicle;
  category: 'safety' | 'tech' | 'comfort';
}

const TITLES = {
  safety: '🛡️ Safety Features',
  tech: '📱 Tech & Connectivity',
  comfort: '🛋️ Comfort & Convenience'
};

export function FeatureList({ vehicle, category }: FeatureListProps) {
  const data = vehicle[category];
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-bold">{TITLES[category]}</h3>
        {category === 'safety' && (
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            {vehicle.safety.suite}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <div>
          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-success">
            ✓ Standard ({data.standard.length})
          </div>
          <ul className="space-y-1">
            {data.standard.map(item => (
              <li key={item} className="flex gap-2 text-sm text-text-dim">
                <span className="text-success">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {data.available.length > 0 && (
          <div className="border-t border-border/50 pt-3">
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-warning">
              ◯ Available on higher trims ({data.available.length})
            </div>
            <ul className="space-y-1">
              {data.available.map(item => (
                <li key={item} className="flex gap-2 text-sm text-text-faint">
                  <span className="text-warning">◯</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
