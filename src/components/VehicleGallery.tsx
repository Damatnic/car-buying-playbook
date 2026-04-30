'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface VehicleGalleryProps {
  exterior?: string;
  interior?: string;
  rear?: string;
  alt: string;
}

const VIEWS = [
  { key: 'exterior', label: 'Exterior' },
  { key: 'interior', label: 'Interior / Dashboard' },
  { key: 'rear', label: 'Rear / Cargo' }
] as const;

type ViewKey = typeof VIEWS[number]['key'];

export function VehicleGallery({ exterior, interior, rear, alt }: VehicleGalleryProps) {
  const images: Record<ViewKey, string | undefined> = { exterior, interior, rear };
  const availableViews = VIEWS.filter(v => images[v.key]);
  const [active, setActive] = useState<ViewKey>(availableViews[0]?.key || 'exterior');

  if (availableViews.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-border bg-surface text-6xl">
        🚙
      </div>
    );
  }

  const currentImage = images[active];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface">
        {currentImage && (
          <Image
            src={currentImage}
            alt={`${alt} ${active} view`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-opacity duration-300"
            priority
          />
        )}
        <div className="absolute bottom-3 left-3 rounded-md bg-bg/80 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
          {VIEWS.find(v => v.key === active)?.label}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {availableViews.map(view => (
          <button
            key={view.key}
            onClick={() => setActive(view.key)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all',
              active === view.key
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border bg-surface text-text-dim hover:border-accent/50 hover:text-text'
            )}
          >
            {view.label}
          </button>
        ))}
        {availableViews.length < 3 && (
          <span className="rounded-lg border border-border/50 bg-surface/50 px-3 py-1.5 text-xs text-text-faint">
            {3 - availableViews.length} view{3 - availableViews.length > 1 ? 's' : ''} unavailable
          </span>
        )}
      </div>
    </div>
  );
}
