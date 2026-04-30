import type { Vehicle } from '@/types';
import { cn } from '@/lib/utils';

type Category = 'safety' | 'tech' | 'comfort';

const CATEGORY_LABEL: Record<Category, string> = {
  safety: '🛡️ Safety Features',
  tech: '📱 Tech Features',
  comfort: '🛋️ Comfort & Convenience'
};

interface FeatureMatrixProps {
  vehicles: Vehicle[];
  category: Category;
}

export function FeatureMatrix({ vehicles, category }: FeatureMatrixProps) {
  if (vehicles.length === 0) return null;

  const allFeatures = new Set<string>();
  vehicles.forEach(v => {
    v[category].standard.forEach(f => allFeatures.add(f));
    v[category].available.forEach(f => allFeatures.add(f));
  });
  const sortedFeatures = Array.from(allFeatures).sort();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-surface-2 px-4 py-3">
        <h3 className="font-bold">{CATEGORY_LABEL[category]}</h3>
        {category === 'safety' && (
          <p className="mt-0.5 text-xs text-text-faint">
            Suite: {vehicles.map(v => v.safety.suite).join(' · ')}
          </p>
        )}
        {vehicles.length >= 3 && (
          <p className="mt-1 text-[11px] text-text-faint sm:hidden">← swipe →</p>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/50">
              <th className="sticky left-0 z-10 min-w-[180px] bg-surface-2 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-text-dim sm:min-w-[260px] sm:px-4">
                Feature
              </th>
              {vehicles.map(v => (
                <th key={v.id} className="min-w-[100px] px-2 py-2 text-center text-xs font-semibold text-text sm:min-w-[120px] sm:px-3">
                  {v.name.replace('Toyota ', '').replace('Honda ', '').replace('Mazda ', '').replace('Subaru ', '').replace('Kia ', '').replace('Hyundai ', '').replace('Nissan ', '').replace('Mitsubishi ', '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFeatures.map((feature, i) => (
              <tr key={feature} className={cn('border-b border-border/40', i % 2 === 1 && 'bg-bg/30')}>
                <td className="sticky left-0 bg-surface px-3 py-2 text-xs text-text sm:px-4">
                  {feature}
                </td>
                {vehicles.map(v => {
                  const isStandard = v[category].standard.includes(feature);
                  const isAvailable = v[category].available.includes(feature);
                  return (
                    <td key={v.id} className="px-2 py-2 text-center sm:px-3">
                      {isStandard ? (
                        <span className="inline-block rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-bold text-success sm:px-2">
                          ✓ STD
                        </span>
                      ) : isAvailable ? (
                        <span className="inline-block rounded-full bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold text-warning sm:px-2">
                          OPT
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-danger/10 px-1.5 py-0.5 text-[10px] font-bold text-danger/70 sm:px-2">
                          ✗
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border bg-surface-2/50 px-4 py-2 text-[11px] text-text-faint">
        <span className="mr-3"><span className="font-bold text-success">✓ STD</span> Standard equipment</span>
        <span className="mr-3"><span className="font-bold text-warning">OPT</span> Optional / higher trim</span>
        <span><span className="font-bold text-danger/70">✗</span> Not available</span>
      </div>
    </div>
  );
}
