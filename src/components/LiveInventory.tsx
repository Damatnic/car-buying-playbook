'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
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
] as const;

type DealerScope = 'waukesha' | 'nearby_carmax' | 'all_dealers';
type ActiveModel = 'all' | typeof MODELS[number]['model'];

const SCOPE_DEALER_FILTER: Record<DealerScope, string> = {
  waukesha: 'Carmax Waukesha',
  nearby_carmax: 'carmax',
  all_dealers: ''
};

type CellState = InventoryResponse | { error: string } | 'loading' | undefined;

export function LiveInventory() {
  const [active, setActive] = useState<ActiveModel>('all');
  const [zip, setZip] = useState('53186');
  const [radius, setRadius] = useState(50);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [scope, setScope] = useState<DealerScope>('waukesha');
  const [data, setData] = useState<Record<string, CellState>>({});
  const [savedVins, setSavedVins] = useState<Set<string>>(new Set());
  const inflight = useRef<Set<string>>(new Set());

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

  const cacheKey = useCallback(
    (model: string) => `${model}|${scope}|${zip}|${radius}|${maxPrice}`,
    [scope, zip, radius, maxPrice]
  );

  const loadOne = useCallback(async (modelDef: typeof MODELS[number], rowsLimit: number) => {
    const key = cacheKey(modelDef.model);
    if (inflight.current.has(key)) return;
    inflight.current.add(key);
    setData(prev => ({ ...prev, [key]: 'loading' }));
    try {
      const params = new URLSearchParams({
        make: modelDef.make,
        model: modelDef.model,
        zip,
        radius: String(scope === 'waukesha' ? Math.min(radius, 25) : radius),
        maxPrice: String(maxPrice),
        minYear: '2022',
        rows: String(rowsLimit)
      });
      const filter = SCOPE_DEALER_FILTER[scope];
      if (filter) params.set('dealerFilter', filter);
      const res = await fetch(`/api/inventory?${params}`);
      if (!res.ok) {
        const errBody = await res.text();
        setData(prev => ({ ...prev, [key]: { error: `${res.status}: ${errBody.slice(0, 200)}` } }));
        return;
      }
      const json = (await res.json()) as InventoryResponse;
      setData(prev => ({ ...prev, [key]: json }));
    } catch (e) {
      setData(prev => ({ ...prev, [key]: { error: e instanceof Error ? e.message : 'fetch failed' } }));
    } finally {
      inflight.current.delete(key);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, zip, radius, maxPrice, scope]);

  const loadAll = useCallback(async () => {
    // Stagger requests to respect MarketCheck rate limits (free tier ~5 req/sec).
    // Sequential with small delay = no 429 errors.
    for (const m of MODELS) {
      await loadOne(m, 4);
      await new Promise(r => setTimeout(r, 250));
    }
  }, [loadOne]);

  useEffect(() => {
    if (active === 'all') {
      void loadAll();
    } else {
      const m = MODELS.find(x => x.model === active);
      if (m) void loadOne(m, 15);
    }
  }, [active, loadOne, loadAll]);

  const refreshActive = () => {
    setData({});
    inflight.current.clear();
    if (active === 'all') void loadAll();
    else {
      const m = MODELS.find(x => x.model === active);
      if (m) void loadOne(m, 15);
    }
  };

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

  return (
    <div className="space-y-3">
      {/* Dealer scope toggle - 3 modes */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setScope('waukesha')}
          className={cn(
            'rounded-xl border px-3 py-3 text-xs font-bold transition-all sm:text-sm',
            scope === 'waukesha'
              ? 'border-success bg-success/15 text-success'
              : 'border-border bg-surface text-text-dim hover:border-success/40'
          )}
        >
          🏠 Waukesha CarMax
          <div className="mt-0.5 text-[9px] font-normal text-text-faint sm:text-[10px]">Just your store</div>
        </button>
        <button
          onClick={() => setScope('nearby_carmax')}
          className={cn(
            'rounded-xl border px-3 py-3 text-xs font-bold transition-all sm:text-sm',
            scope === 'nearby_carmax'
              ? 'border-accent-2 bg-accent-2/15 text-accent-2'
              : 'border-border bg-surface text-text-dim hover:border-accent-2/40'
          )}
        >
          🚚 Nearby CarMax
          <div className="mt-0.5 text-[9px] font-normal text-text-faint sm:text-[10px]">Transferable to Waukesha</div>
        </button>
        <button
          onClick={() => setScope('all_dealers')}
          className={cn(
            'rounded-xl border px-3 py-3 text-xs font-bold transition-all sm:text-sm',
            scope === 'all_dealers'
              ? 'border-accent bg-accent/15 text-accent'
              : 'border-border bg-surface text-text-dim hover:border-accent/40'
          )}
        >
          🏢 All Dealers
          <div className="mt-0.5 text-[9px] font-normal text-text-faint sm:text-[10px]">Wider selection</div>
        </button>
      </div>

      {scope === 'waukesha' && (
        <div className="rounded-md border border-success/30 bg-success/5 px-3 py-2 text-[11px] text-success/90">
          📍 Showing inventory at <strong>CarMax Waukesha only</strong>. If empty, switch to &ldquo;Nearby CarMax&rdquo; — they transfer cars free between stores within ~250mi.
        </div>
      )}

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
              type="range" min={25} max={500} step={25} value={radius}
              onChange={e => setRadius(Number(e.target.value))} className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 flex items-baseline justify-between text-[10px] font-bold uppercase tracking-wider text-text-faint">
              <span>Max</span><span className="text-accent-2">{fmtCurrency(maxPrice)}</span>
            </label>
            <input
              type="range" min={15000} max={40000} step={500} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))} className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Model tabs - "All" is now first/default */}
      <div className="-mx-4 flex gap-1 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        <button
          onClick={() => setActive('all')}
          className={cn(
            'shrink-0 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-bold transition-all',
            active === 'all'
              ? 'border-accent bg-accent text-white'
              : 'border-accent/40 bg-accent/10 text-accent hover:bg-accent/20'
          )}
        >
          🌐 All Models
        </button>
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

      <div className="flex items-baseline justify-between">
        <div className="text-xs text-text-faint">
          {(() => {
            const scopeLabel =
              scope === 'waukesha' ? 'CarMax Waukesha only'
              : scope === 'nearby_carmax' ? 'Nearby CarMax stores'
              : 'All dealers';
            if (active === 'all') {
              return `📡 Showing top 4 per model · ${scopeLabel} · ${radius}mi from ${zip}`;
            }
            const cur = data[cacheKey(active)];
            if (cur === 'loading') return '⏳ Loading…';
            if (cur && typeof cur === 'object' && 'count' in cur) {
              return `📡 ${cur.count} of ${cur.totalAvailable.toLocaleString()} found · ${scopeLabel}`;
            }
            if (cur && typeof cur === 'object' && 'error' in cur) {
              return <span className="text-danger">Error: {cur.error}</span>;
            }
            return '';
          })()}
        </div>
        <button
          onClick={refreshActive}
          className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-text-dim hover:border-accent hover:text-accent"
        >
          🔄 Refresh
        </button>
      </div>

      {/* All Models view: grouped sections */}
      {active === 'all' ? (
        <div className="space-y-5">
          {MODELS.map(m => {
            const cell = data[cacheKey(m.model)];
            return (
              <ModelSection
                key={m.model}
                model={m}
                cell={cell}
                savedVins={savedVins}
                onAdd={addToFinds}
                onSeeMore={() => setActive(m.model)}
              />
            );
          })}
        </div>
      ) : (
        <SingleModelGrid
          cell={data[cacheKey(active)]}
          savedVins={savedVins}
          onAdd={addToFinds}
        />
      )}
    </div>
  );
}

function ModelSection({
  model, cell, savedVins, onAdd, onSeeMore
}: {
  model: typeof MODELS[number];
  cell: CellState;
  savedVins: Set<string>;
  onAdd: (l: Listing) => void;
  onSeeMore: () => void;
}) {
  const isLoading = cell === 'loading';
  const hasError = cell && typeof cell === 'object' && 'error' in cell;
  const hasData = cell && typeof cell === 'object' && 'listings' in cell;
  const listings = hasData ? cell.listings : [];
  const total = hasData ? cell.totalAvailable : 0;

  return (
    <section className="rounded-xl border border-border bg-surface/30 p-3 sm:p-4">
      <header className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-base font-bold sm:text-lg">{model.label}</h3>
        <div className="flex items-center gap-2 text-xs text-text-faint">
          {hasData && total > 0 && (
            <span><span className="font-bold text-text">{total}</span> available</span>
          )}
          {hasData && total > listings.length && (
            <button onClick={onSeeMore} className="font-semibold text-accent-2 hover:underline">
              See all →
            </button>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {[0, 1].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : hasError ? (
        <div className="rounded-md border border-danger/30 bg-danger/5 p-3 text-xs text-danger">
          {(cell as { error: string }).error}
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-bg/30 p-3 text-center text-xs text-text-faint">
          None at this store. Try the &ldquo;Nearby CarMax&rdquo; or &ldquo;All Dealers&rdquo; toggle above.
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {listings.map(l => (
            <ListingCard key={l.id} listing={l} compact alreadySaved={savedVins.has(l.vin)} onAdd={() => onAdd(l)} />
          ))}
        </div>
      )}
    </section>
  );
}

function SingleModelGrid({
  cell, savedVins, onAdd
}: {
  cell: CellState;
  savedVins: Set<string>;
  onAdd: (l: Listing) => void;
}) {
  if (cell === 'loading' || !cell) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }
  if ('error' in cell) {
    return null;
  }
  if (cell.listings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-text-dim">
        No listings found for this model in the selected area + price range.
      </div>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cell.listings.map(l => (
        <ListingCard key={l.id} listing={l} alreadySaved={savedVins.has(l.vin)} onAdd={() => onAdd(l)} />
      ))}
    </div>
  );
}

function ListingCard({
  listing, alreadySaved, onAdd, compact = false
}: {
  listing: Listing;
  alreadySaved: boolean;
  onAdd: () => void;
  compact?: boolean;
}) {
  const priceDrop = listing.priceChangePct < -1;
  const priceUp = listing.priceChangePct > 1;
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/40">
      {listing.imageUrl ? (
        <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer" className={cn('block overflow-hidden bg-surface-2', compact ? 'aspect-[16/9]' : 'aspect-[16/10]')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.imageUrl}
            alt={listing.heading}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      ) : (
        <div className={cn('flex items-center justify-center bg-surface-2 text-3xl text-text-faint', compact ? 'aspect-[16/9]' : 'aspect-[16/10]')}>🚙</div>
      )}
      <div className={cn(compact ? 'p-2.5' : 'p-3')}>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className={cn('font-bold leading-tight', compact ? 'text-xs' : 'text-sm')}>
            {listing.year} {listing.make} {listing.model}
          </h3>
          <div className="text-right">
            <div className={cn('font-extrabold tabular-nums text-accent-2', compact ? 'text-sm' : 'text-lg')}>
              {fmtCurrency(listing.price)}
            </div>
            {priceDrop && <div className="text-[10px] font-bold text-success">▼ {Math.abs(listing.priceChangePct).toFixed(1)}%</div>}
            {priceUp && <div className="text-[10px] font-bold text-danger">▲ {listing.priceChangePct.toFixed(1)}%</div>}
          </div>
        </div>
        {listing.trim && <div className="text-[11px] text-text-faint">{listing.trim}</div>}
        <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-text-faint">
          {listing.mileage > 0 && <span>{listing.mileage.toLocaleString()} mi</span>}
          {listing.exteriorColor && <span>{listing.exteriorColor}</span>}
          {listing.daysOnMarket > 0 && <span>{listing.daysOnMarket}d</span>}
        </div>
        {!compact && (
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
        )}
        {(listing.dealerName || listing.dealerDistance) && (
          <div className={cn('text-text-dim', compact ? 'mt-1 text-[10px]' : 'mt-2 text-[11px]')}>
            📍 {listing.dealerName || 'Dealer'}
            {listing.dealerCity && <span> · {listing.dealerCity}</span>}
            {listing.dealerDistance !== undefined && <span> · {listing.dealerDistance.toFixed(0)}mi</span>}
          </div>
        )}
        <div className={cn('flex gap-1.5', compact ? 'mt-2' : 'mt-3 gap-2')}>
          <a
            href={listing.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-md border border-border bg-surface-2 px-2 py-1.5 text-center text-[11px] font-semibold text-text-dim hover:border-accent hover:text-accent"
          >
            View ↗
          </a>
          <button
            onClick={onAdd}
            disabled={alreadySaved}
            className={cn(
              'rounded-md px-2 py-1.5 text-[11px] font-bold transition-colors',
              alreadySaved
                ? 'border border-success bg-success/10 text-success'
                : 'bg-gradient text-white hover:opacity-90'
            )}
          >
            {alreadySaved ? '✓ Added' : '+ Save'}
          </button>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="aspect-[16/10] animate-pulse bg-surface-2" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
