'use client';
import { useEffect, useState, useCallback } from 'react';
import { storage } from '@/lib/storage';
import type { LotFind } from '@/types';
import { cn, fmtCurrency } from '@/lib/utils';

interface Listing {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  heading: string;
  price: number;
  msrp?: number;
  mileage: number;
  exteriorColor?: string;
  drivetrain?: string;
  carfaxOneOwner: boolean;
  carfaxCleanTitle: boolean;
  daysOnMarket: number;
  priceChangePct: number;
  imageUrl?: string;
  listingUrl: string;
  dealerName?: string;
  dealerCity?: string;
  dealerState?: string;
  dealerDistance?: number;
}

interface InventoryResponse {
  source: string;
  count: number;
  totalAvailable: number;
  fetchedAt: number;
  listings: Listing[];
}

const MODELS = [
  { make: 'toyota', model: 'rav4', label: 'Toyota RAV4' },
  { make: 'honda', model: 'cr-v', label: 'Honda CR-V' },
  { make: 'subaru', model: 'forester', label: 'Subaru Forester' },
  { make: 'mazda', model: 'cx-5', label: 'Mazda CX-5' },
  { make: 'kia', model: 'sportage', label: 'Kia Sportage' },
  { make: 'hyundai', model: 'tucson', label: 'Hyundai Tucson' },
  { make: 'nissan', model: 'rogue', label: 'Nissan Rogue' },
  { make: 'mitsubishi', model: 'outlander', label: 'Mitsubishi Outlander' }
];

export function LiveInventory() {
  const [active, setActive] = useState(MODELS[0].model);
  const [zip, setZip] = useState('53186');
  const [radius, setRadius] = useState(50);
  const [maxPrice, setMaxPrice] = useState(28000);
  const [data, setData] = useState<Record<string, InventoryResponse | { error: string } | 'loading'>>({});
  const [savedVins, setSavedVins] = useState<Set<string>>(new Set());

  const refreshSavedVins = useCallback(() => {
    const vins = storage.getLotFinds().map(f => f.stockNumber).filter(Boolean) as string[];
    setSavedVins(new Set(vins));
  }, []);

  useEffect(() => {
    refreshSavedVins();
    const handler = () => refreshSavedVins();
    window.addEventListener('cbp:storage', handler);
    return () => window.removeEventListener('cbp:storage', handler);
  }, [refreshSavedVins]);

  const load = useCallback(async (model: string) => {
    const m = MODELS.find(x => x.model === model);
    if (!m) return;
    setData(prev => ({ ...prev, [model]: 'loading' }));
    try {
      const params = new URLSearchParams({
        make: m.make,
        model: m.model,
        zip,
        radius: String(radius),
        maxPrice: String(maxPrice),
        minYear: '2022',
        rows: '15'
      });
      const res = await fetch(`/api/inventory?${params}`);
      if (!res.ok) {
        const errBody = await res.text();
        setData(prev => ({ ...prev, [model]: { error: `${res.status}: ${errBody.slice(0, 200)}` } }));
        return;
      }
      const json = (await res.json()) as InventoryResponse;
      setData(prev => ({ ...prev, [model]: json }));
    } catch (e) {
      setData(prev => ({ ...prev, [model]: { error: e instanceof Error ? e.message : 'fetch failed' } }));
    }
  }, [zip, radius, maxPrice]);

  useEffect(() => {
    void load(active);
  }, [active, load]);

  const refreshActive = () => { void load(active); };

  const addToFinds = (l: Listing) => {
    const find: LotFind = {
      id: `${Date.now()}-${l.vin.slice(-4)}`,
      year: l.year,
      make: l.make,
      model: l.model,
      trim: l.trim,
      mileage: l.mileage,
      price: l.price,
      awd: !!(l.drivetrain && /awd|4wd|all/i.test(l.drivetrain)),
      color: l.exteriorColor,
      stockNumber: l.vin,
      vehicleHistory: l.carfaxCleanTitle ? 'clean' : 'unknown',
      notes: l.dealerName ? `From ${l.dealerName} (${l.dealerCity ?? ''}). ${l.daysOnMarket}d on market.` : '',
      createdAt: Date.now()
    };
    storage.saveLotFind(find);
    refreshSavedVins();
  };

  const current = data[active];
  const loading = current === 'loading';
  const isError = current && typeof current === 'object' && 'error' in current;

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="rounded-xl border border-border bg-surface p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-text-faint">Zip</label>
            <input
              type="text" inputMode="numeric" maxLength={5}
              value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              className="w-full rounded-md border border-border bg-surface-2 px-2 py-1.5 text-sm font-semibold tabular-nums"
            />
          </div>
          <div>
            <label className="mb-1 flex items-baseline justify-between text-[10px] font-bold uppercase tracking-wider text-text-faint">
              <span>Radius</span><span className="text-accent-2">{radius}mi</span>
            </label>
            <input
              type="range" min={10} max={150} step={10} value={radius}
              onChange={e => setRadius(Number(e.target.value))} className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 flex items-baseline justify-between text-[10px] font-bold uppercase tracking-wider text-text-faint">
              <span>Max</span><span className="text-accent-2">{fmtCurrency(maxPrice)}</span>
            </label>
            <input
              type="range" min={15000} max={35000} step={500} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))} className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Model tabs */}
      <div className="-mx-4 flex gap-1 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        {MODELS.map(m => (
          <button
            key={m.model}
            onClick={() => setActive(m.model)}
            className={cn(
              'shrink-0 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-semibold transition-all',
              active === m.model
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border bg-surface text-text-dim hover:border-accent/40 hover:text-text'
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Refresh + meta */}
      <div className="flex items-baseline justify-between">
        <div className="text-xs text-text-faint">
          {loading && '⏳ Loading…'}
          {!loading && current && typeof current === 'object' && 'count' in current && (
            <>📡 Showing {current.count} of {current.totalAvailable.toLocaleString()} found · sorted by newest listings</>
          )}
          {isError && (
            <span className="text-danger">Error: {(current as { error: string }).error}</span>
          )}
        </div>
        <button
          onClick={refreshActive}
          disabled={loading}
          className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-text-dim hover:border-accent hover:text-accent disabled:opacity-50"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Listings */}
      {loading ? (
        <SkeletonGrid />
      ) : current && typeof current === 'object' && 'listings' in current && current.listings.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {current.listings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              alreadySaved={savedVins.has(listing.vin)}
              onAdd={() => addToFinds(listing)}
            />
          ))}
        </div>
      ) : !isError ? (
        <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-text-dim">
          No listings found for this model in the selected area + price range.
        </div>
      ) : null}
    </div>
  );
}

function ListingCard({ listing, alreadySaved, onAdd }: { listing: Listing; alreadySaved: boolean; onAdd: () => void }) {
  const priceDrop = listing.priceChangePct < -1;
  const priceUp = listing.priceChangePct > 1;
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/40">
      {listing.imageUrl ? (
        <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer" className="block aspect-[16/10] overflow-hidden bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.imageUrl}
            alt={listing.heading}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-surface-2 text-3xl text-text-faint">🚙</div>
      )}
      <div className="p-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-bold leading-tight">
            {listing.year} {listing.make} {listing.model}
          </h3>
          <div className="text-right">
            <div className="text-lg font-extrabold tabular-nums text-accent-2">{fmtCurrency(listing.price)}</div>
            {priceDrop && <div className="text-[10px] font-bold text-success">▼ {Math.abs(listing.priceChangePct).toFixed(1)}%</div>}
            {priceUp && <div className="text-[10px] font-bold text-danger">▲ {listing.priceChangePct.toFixed(1)}%</div>}
          </div>
        </div>
        {listing.trim && <div className="text-xs text-text-faint">{listing.trim}</div>}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-text-faint">
          {listing.mileage > 0 && <span>{listing.mileage.toLocaleString()} mi</span>}
          {listing.exteriorColor && <span>{listing.exteriorColor}</span>}
          {listing.drivetrain && <span>{listing.drivetrain.toUpperCase()}</span>}
          {listing.daysOnMarket > 0 && <span>{listing.daysOnMarket}d on market</span>}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {listing.carfaxOneOwner && (
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">1-Owner</span>
          )}
          {listing.carfaxCleanTitle && (
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">Clean Title</span>
          )}
          {!listing.carfaxCleanTitle && (
            <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">Check Carfax</span>
          )}
        </div>
        {(listing.dealerName || listing.dealerDistance) && (
          <div className="mt-2 text-[11px] text-text-dim">
            📍 {listing.dealerName || 'Dealer'}
            {listing.dealerCity && <span> · {listing.dealerCity}, {listing.dealerState}</span>}
            {listing.dealerDistance !== undefined && <span> · {listing.dealerDistance.toFixed(0)}mi away</span>}
          </div>
        )}
        <div className="mt-3 flex gap-2">
          <a
            href={listing.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-center text-xs font-semibold text-text-dim hover:border-accent hover:text-accent"
          >
            View listing ↗
          </a>
          <button
            onClick={onAdd}
            disabled={alreadySaved}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
              alreadySaved
                ? 'border border-success bg-success/10 text-success'
                : 'bg-gradient text-white hover:opacity-90'
            )}
          >
            {alreadySaved ? '✓ Added' : '+ Add to my finds'}
          </button>
        </div>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="aspect-[16/10] animate-pulse bg-surface-2" />
          <div className="space-y-2 p-3">
            <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
