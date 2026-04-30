import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const SECONDS_30_DAYS = 60 * 60 * 24 * 30;
const MAX_BODY_BYTES = 200_000;

function getKvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function sanitizeCode(raw: string): string | null {
  const code = raw.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (code.length < 3 || code.length > 40) return null;
  return code;
}

async function kvCommand(cmd: unknown[]): Promise<{ ok: true; result: unknown } | { ok: false; status: number; message: string }> {
  const cfg = getKvConfig();
  if (!cfg) return { ok: false, status: 501, message: 'KV not configured' };
  try {
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cmd),
      cache: 'no-store'
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, status: 502, message: `KV upstream error: ${text.slice(0, 200)}` };
    }
    const data = await res.json();
    return { ok: true, result: data.result };
  } catch (e) {
    return { ok: false, status: 502, message: 'KV network error' };
  }
}

const NOT_CONFIGURED_MESSAGE =
  'Cloud sync is not configured on this deployment. To enable: provision Vercel KV in your Vercel project (Storage tab > Create > KV), then redeploy. See the project README for full instructions.';

export async function GET(_req: NextRequest, { params }: { params: { code: string } }) {
  const code = sanitizeCode(params.code);
  if (!code) return new NextResponse('Invalid code. Use 3-40 letters, numbers, or dashes.', { status: 400 });
  const result = await kvCommand(['GET', `cbp:sync:${code}`]);
  if (!result.ok) {
    if (result.status === 501) return new NextResponse(NOT_CONFIGURED_MESSAGE, { status: 501 });
    return new NextResponse(result.message, { status: result.status });
  }
  if (!result.result) return new NextResponse('No data found for this code.', { status: 404 });
  return new NextResponse(String(result.result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const code = sanitizeCode(params.code);
  if (!code) return new NextResponse('Invalid code. Use 3-40 letters, numbers, or dashes.', { status: 400 });
  const body = await req.text();
  if (body.length === 0) return new NextResponse('Empty body', { status: 400 });
  if (body.length > MAX_BODY_BYTES) return new NextResponse('Payload too large', { status: 413 });
  try {
    JSON.parse(body);
  } catch {
    return new NextResponse('Body must be valid JSON', { status: 400 });
  }
  const result = await kvCommand(['SET', `cbp:sync:${code}`, body, 'EX', SECONDS_30_DAYS]);
  if (!result.ok) {
    if (result.status === 501) return new NextResponse(NOT_CONFIGURED_MESSAGE, { status: 501 });
    return new NextResponse(result.message, { status: result.status });
  }
  return new NextResponse('ok', { status: 200 });
}

export async function DELETE(_req: NextRequest, { params }: { params: { code: string } }) {
  const code = sanitizeCode(params.code);
  if (!code) return new NextResponse('Invalid code', { status: 400 });
  const result = await kvCommand(['DEL', `cbp:sync:${code}`]);
  if (!result.ok) {
    if (result.status === 501) return new NextResponse(NOT_CONFIGURED_MESSAGE, { status: 501 });
    return new NextResponse(result.message, { status: result.status });
  }
  return new NextResponse('ok', { status: 200 });
}
