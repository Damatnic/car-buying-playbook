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
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="border-b border-border bg-surface-2 px-4 py-3">
        <h3 className="font-bold">{CATEGORY_LABEL[category]}</h3>
        {category === 'safety' && (
          <p className="mt-0.5 text-xs text-text-faint">
            Suite: {vehicles.map(v => v.safety.suite).join(' · ')}
          </p>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/50">
              <th className="sticky left-0 z-10 min-w-[260px] bg-surface-2 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-text-dim">
                Feature
              </th>
              {vehicles.map(v => (
                <th key={v.id} className="min-w-[120px] px-3 py-2 text-center text-xs font-semibold text-text">
                  {v.name.replace('Toyota ', '').replace('Honda ', '').replace('Mazda ', '').replace('Subaru ', '').replace('Kia ', '').replace('Hyundai ', '').replace('Nissan ', '').replace('Mitsubishi ', '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFeatures.map((feature, i) => (
              <tr key={feature} className={cn('border-b border-border/40', i % 2 === 1 && 'bg-bg/30')}>
                <td className="sticky left-0 bg-surface px-4 py-2 text-xs text-text">
                  {feature}
                </td>
                {vehicles.map(v => {
                  const isStandard = v[category].standard.includes(feature);
                  const isAvailable = v[category].available.includes(feature);
                  return (
                    <td key={v.id} className="px-3 py-2 text-center">
                      {isStandard ? (
                        <span className="inline-block rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                          ✓ STD
                        </span>
                      ) : isAvailable ? (
                        <span className="inline-block rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">
                          OPT
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-bold text-danger/70">
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
