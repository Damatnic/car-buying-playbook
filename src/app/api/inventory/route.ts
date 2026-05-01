import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

const ALLOWED_STORES = new Set(['7102']);
const ALLOWED_MAKES = new Set([
  'toyota', 'honda', 'subaru', 'mazda', 'kia', 'hyundai', 'nissan', 'mitsubishi', 'chevrolet', ''
]);
const ALLOWED_MODELS = new Set([
  'rav4', 'cr-v', 'forester', 'cx-5', 'sportage', 'tucson', 'rogue', 'outlander', 'equinox', ''
]);

interface NormalizedListing {
  stockNumber: string;
  vin?: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage: number;
  price: number;
  exteriorColor?: string;
  interiorColor?: string;
  drivetrain?: string;
  mpgCity?: number;
  mpgHighway?: number;
  imageUrl?: string;
  detailUrl: string;
  storeName?: string;
  storeId?: string;
  transferEligible?: boolean;
}

interface InventoryResponse {
  source: string;
  count: number;
  fetchedAt: number;
  listings: NormalizedListing[];
  warning?: string;
}

const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Origin: 'https://www.carmax.com',
  Referer: 'https://www.carmax.com/cars/all',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin'
};

async function tryCarmaxSearchApi(params: {
  storeId: string;
  make: string;
  model: string;
  maxPrice: number;
  minYear: number;
}): Promise<NormalizedListing[] | null> {
  const filters: string[] = [];
  filters.push(`bodystyles=suv`);
  if (params.make) filters.push(`makes=${encodeURIComponent(params.make)}`);
  if (params.model) filters.push(`models=${encodeURIComponent(params.model)}`);
  filters.push(`prices=10000-${params.maxPrice}`);
  filters.push(`year=${params.minYear}-2025`);
  filters.push(`stores=${params.storeId}`);

  const candidateUrls = [
    `https://www.carmax.com/cars/api/search/run?${filters.join('&')}&perPage=24&page=1`,
    `https://www.carmax.com/api/cars/search?${filters.join('&')}&perPage=24&page=1`,
    `https://api.carmax.com/v1/api/search?${filters.join('&')}&perPage=24&page=1`
  ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, { headers: BROWSER_HEADERS, cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      const items =
        data?.items ?? data?.results ?? data?.vehicles ?? data?.listings ?? data?.data?.items;
      if (Array.isArray(items) && items.length > 0) {
        return items.map(normalizeCarmaxItem).filter((x): x is NormalizedListing => x !== null);
      }
    } catch {
      continue;
    }
  }
  return null;
}

function normalizeCarmaxItem(item: any): NormalizedListing | null {
  if (!item || typeof item !== 'object') return null;
  const stockNumber = String(item.stockNumber ?? item.stockNo ?? item.id ?? '');
  if (!stockNumber) return null;
  return {
    stockNumber,
    vin: item.vin,
    year: Number(item.year) || 0,
    make: String(item.make ?? ''),
    model: String(item.model ?? ''),
    trim: item.trim ?? item.trimDescription,
    mileage: Number(item.mileage ?? item.miles ?? 0),
    price: Number(item.price ?? item.salesPrice ?? item.basePrice ?? 0),
    exteriorColor: item.exteriorColor ?? item.color,
    interiorColor: item.interiorColor,
    drivetrain: item.driveTrain ?? item.drivetrain,
    mpgCity: item.mpgCity ? Number(item.mpgCity) : undefined,
    mpgHighway: item.mpgHighway ? Number(item.mpgHighway) : undefined,
    imageUrl: item.imageUrl ?? item.primaryImageUrl ?? item.images?.[0],
    detailUrl: item.detailUrl ?? `https://www.carmax.com/car/${stockNumber}`,
    storeName: item.storeName ?? item.location?.name,
    storeId: item.storeId ? String(item.storeId) : undefined,
    transferEligible: item.transferEligible ?? item.canTransfer
  };
}

function clean(p: URLSearchParams, key: string, fallback = ''): string {
  return (p.get(key) ?? fallback).toString().toLowerCase().trim();
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const storeId = clean(params, 'store', '7102');
  const make = clean(params, 'make', '');
  const model = clean(params, 'model', '');
  const maxPrice = Math.min(40000, Math.max(10000, Number(clean(params, 'maxPrice', '28000'))));
  const minYear = Math.min(2025, Math.max(2018, Number(clean(params, 'minYear', '2022'))));

  if (!ALLOWED_STORES.has(storeId)) {
    return NextResponse.json({ error: 'store not in allowlist' }, { status: 400 });
  }
  if (!ALLOWED_MAKES.has(make)) {
    return NextResponse.json({ error: 'make not in allowlist' }, { status: 400 });
  }
  if (!ALLOWED_MODELS.has(model)) {
    return NextResponse.json({ error: 'model not in allowlist' }, { status: 400 });
  }

  const listings = await tryCarmaxSearchApi({ storeId, make, model, maxPrice, minYear });

  if (!listings) {
    const fallbackUrl = buildFallbackSearchUrl({ storeId, make, model, maxPrice, minYear });
    const response: InventoryResponse = {
      source: 'unavailable',
      count: 0,
      fetchedAt: Date.now(),
      listings: [],
      warning: `CarMax inventory API is currently blocked or unreachable. Open the live search directly: ${fallbackUrl}`
    };
    return NextResponse.json(response, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' }
    });
  }

  const response: InventoryResponse = {
    source: 'carmax',
    count: listings.length,
    fetchedAt: Date.now(),
    listings
  };
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 's-maxage=600, stale-while-revalidate=1200'
    }
  });
}

function buildFallbackSearchUrl(p: { storeId: string; make: string; model: string; maxPrice: number; minYear: number }): string {
  if (p.make && p.model) {
    return `https://www.carmax.com/cars/${p.make}/${p.model}?stores=${p.storeId}&priceMax=${p.maxPrice}&year=${p.minYear}-2025`;
  }
  if (p.make) {
    return `https://www.carmax.com/cars/${p.make}?stores=${p.storeId}&priceMax=${p.maxPrice}&year=${p.minYear}-2025`;
  }
  return `https://www.carmax.com/cars/suvs?stores=${p.storeId}&priceMax=${p.maxPrice}&year=${p.minYear}-2025`;
}
