import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

const ALLOWED_MAKES = new Set([
  'toyota', 'honda', 'subaru', 'mazda', 'kia', 'hyundai', 'nissan', 'mitsubishi', 'chevrolet', ''
]);
const ALLOWED_MODELS = new Set([
  'rav4', 'cr-v', 'forester', 'cx-5', 'sportage', 'tucson', 'rogue', 'outlander', 'equinox', ''
]);

export interface NormalizedListing {
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
  interiorColor?: string;
  drivetrain?: string;
  transmission?: string;
  bodyType?: string;
  inventoryType: string;
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
  dealerLat?: number;
  dealerLon?: number;
  dataSource?: string;
}

export interface InventoryResponse {
  source: string;
  count: number;
  totalAvailable: number;
  fetchedAt: number;
  query: { make: string; model: string; zip: string; radius: number; maxPrice: number; minYear: number };
  listings: NormalizedListing[];
  warning?: string;
}

function normalize(item: any): NormalizedListing | null {
  if (!item || !item.vin) return null;
  const build = item.build ?? {};
  const dealer = item.dealer ?? {};
  const media = item.media ?? {};
  const photos: string[] = media.photo_links ?? media.photo_links_cached ?? [];
  return {
    id: String(item.id ?? item.vin),
    vin: String(item.vin),
    year: Number(build.year ?? 0),
    make: String(build.make ?? ''),
    model: String(build.model ?? ''),
    trim: build.trim,
    heading: String(item.heading ?? ''),
    price: Number(item.price ?? 0),
    msrp: item.msrp ? Number(item.msrp) : undefined,
    mileage: Number(item.miles ?? 0),
    exteriorColor: item.exterior_color ?? item.base_ext_color,
    interiorColor: item.interior_color ?? item.base_int_color,
    drivetrain: build.drivetrain,
    transmission: build.transmission,
    bodyType: build.body_type,
    inventoryType: String(item.inventory_type ?? 'used'),
    carfaxOneOwner: Boolean(item.carfax_1_owner),
    carfaxCleanTitle: Boolean(item.carfax_clean_title),
    daysOnMarket: Number(item.dom_active ?? item.dom ?? 0),
    priceChangePct: Number(item.price_change_percent ?? 0),
    imageUrl: photos[0],
    listingUrl: String(item.vdp_url ?? ''),
    dealerName: dealer.name,
    dealerCity: dealer.city,
    dealerState: dealer.state,
    dealerDistance: dealer.distance ? Number(dealer.distance) : undefined,
    dealerLat: dealer.latitude ? Number(dealer.latitude) : undefined,
    dealerLon: dealer.longitude ? Number(dealer.longitude) : undefined,
    dataSource: item.data_source
  };
}

function clean(p: URLSearchParams, key: string, fallback = ''): string {
  return (p.get(key) ?? fallback).toString().toLowerCase().trim();
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.MARKETCHECK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'MARKETCHECK_API_KEY not configured', source: 'unconfigured', count: 0, listings: [] },
      { status: 501 }
    );
  }

  const params = req.nextUrl.searchParams;
  const make = clean(params, 'make', '');
  const model = clean(params, 'model', '');
  const zip = clean(params, 'zip', '53186').replace(/\D/g, '').slice(0, 5);
  const radius = Math.min(200, Math.max(10, Number(clean(params, 'radius', '50'))));
  const maxPrice = Math.min(60000, Math.max(5000, Number(clean(params, 'maxPrice', '28000'))));
  const minYear = Math.min(2026, Math.max(2010, Number(clean(params, 'minYear', '2022'))));
  const dealerFilter = clean(params, 'dealerFilter', '');
  const requestedRows = Math.min(50, Math.max(1, Number(clean(params, 'rows', '12'))));
  // When filtering by dealer, fetch the max allowed so client-side filter has enough to work with
  const rows = dealerFilter ? 50 : requestedRows;

  if (!ALLOWED_MAKES.has(make)) {
    return NextResponse.json({ error: 'make not in allowlist' }, { status: 400 });
  }
  if (!ALLOWED_MODELS.has(model)) {
    return NextResponse.json({ error: 'model not in allowlist' }, { status: 400 });
  }
  if (zip.length !== 5) {
    return NextResponse.json({ error: 'invalid zip' }, { status: 400 });
  }

  const yearList = [];
  for (let y = minYear; y <= 2026; y++) yearList.push(y);

  const url = new URL('https://api.marketcheck.com/v2/search/car/active');
  url.searchParams.set('api_key', apiKey);
  if (make) url.searchParams.set('make', make);
  if (model) url.searchParams.set('model', model);
  url.searchParams.set('year', yearList.join(','));
  url.searchParams.set('price_range', `5000-${maxPrice}`);
  url.searchParams.set('zip', zip);
  url.searchParams.set('radius', String(radius));
  url.searchParams.set('rows', String(rows));
  url.searchParams.set('sort_by', 'dom_active');
  url.searchParams.set('sort_order', 'asc');
  url.searchParams.set('inventory_type', 'used');

  // Retry with exponential backoff if MarketCheck rate-limits us
  let res: Response | null = null;
  let attempt = 0;
  const maxAttempts = 3;
  while (attempt < maxAttempts) {
    try {
      res = await fetch(url.toString(), {
        headers: { Accept: 'application/json' },
        next: { revalidate: 600 }
      });
      if (res.status !== 429) break;
      attempt++;
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, 500 * Math.pow(2, attempt - 1)));
      }
    } catch (e) {
      return NextResponse.json(
        { error: 'fetch failed', message: e instanceof Error ? e.message : 'unknown', listings: [] },
        { status: 502 }
      );
    }
  }
  try {
    if (!res || !res.ok) {
      const text = res ? await res.text() : 'no response';
      return NextResponse.json(
        { error: `MarketCheck API error: ${res?.status ?? 'unknown'}`, body: text.slice(0, 500), listings: [] },
        { status: res?.status === 429 ? 429 : 502 }
      );
    }
    const data = await res.json();
    const items: any[] = Array.isArray(data?.listings) ? data.listings : [];
    let normalized = items.map(normalize).filter((x): x is NormalizedListing => x !== null);
    if (dealerFilter) {
      const needle = dealerFilter.toLowerCase();
      normalized = normalized.filter(l => (l.dealerName ?? '').toLowerCase().includes(needle));
    }
    const sliced = normalized.slice(0, requestedRows);
    const response: InventoryResponse = {
      source: 'marketcheck',
      count: sliced.length,
      totalAvailable: dealerFilter ? normalized.length : Number(data?.num_found ?? normalized.length),
      fetchedAt: Date.now(),
      query: { make, model, zip, radius, maxPrice, minYear },
      listings: sliced
    };
    return NextResponse.json(response, {
      headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=1200' }
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'fetch failed', message: e instanceof Error ? e.message : 'unknown', listings: [] },
      { status: 502 }
    );
  }
}
