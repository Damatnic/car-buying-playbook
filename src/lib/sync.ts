import { storage } from './storage';

export interface SyncSnapshot {
  v: 1;
  savedBuilds: ReturnType<typeof storage.getSavedBuilds>;
  savedVehicles: ReturnType<typeof storage.getSavedVehicles>;
  checklist: ReturnType<typeof storage.getChecklist>;
  profile: ReturnType<typeof storage.getProfile>;
  exportedAt: number;
}

export function buildSnapshot(): SyncSnapshot {
  return {
    v: 1,
    savedBuilds: storage.getSavedBuilds(),
    savedVehicles: storage.getSavedVehicles(),
    checklist: storage.getChecklist(),
    profile: storage.getProfile(),
    exportedAt: Date.now()
  };
}

export function applySnapshot(snap: SyncSnapshot, mode: 'replace' | 'merge' = 'merge'): boolean {
  if (snap.v !== 1) return false;
  try {
    if (mode === 'replace') {
      storage.importAll(JSON.stringify({
        savedBuilds: snap.savedBuilds,
        savedVehicles: snap.savedVehicles,
        checklist: snap.checklist,
        profile: snap.profile
      }));
    } else {
      const currentBuilds = storage.getSavedBuilds();
      const buildIds = new Set(currentBuilds.map(b => b.id));
      const mergedBuilds = [
        ...currentBuilds,
        ...snap.savedBuilds.filter(b => !buildIds.has(b.id))
      ];
      const currentVehicles = storage.getSavedVehicles();
      const mergedVehicles = Array.from(new Set([...currentVehicles, ...snap.savedVehicles]));
      const currentChecklist = storage.getChecklist();
      const mergedChecklist = { ...snap.checklist, ...currentChecklist };
      storage.importAll(JSON.stringify({
        savedBuilds: mergedBuilds,
        savedVehicles: mergedVehicles,
        checklist: mergedChecklist,
        profile: snap.profile
      }));
    }
    return true;
  } catch {
    return false;
  }
}

function base64UrlEncode(str: string): string {
  if (typeof window === 'undefined') return '';
  const utf8 = new TextEncoder().encode(str);
  let bin = '';
  utf8.forEach(b => { bin += String.fromCharCode(b); });
  return window.btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(s: string): string {
  if (typeof window === 'undefined') return '';
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = window.atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function snapshotToUrl(): string {
  if (typeof window === 'undefined') return '';
  const snap = buildSnapshot();
  const encoded = base64UrlEncode(JSON.stringify(snap));
  return `${window.location.origin}/sync?import=${encoded}`;
}

export function snapshotToCode(): string {
  if (typeof window === 'undefined') return '';
  return base64UrlEncode(JSON.stringify(buildSnapshot()));
}

export function snapshotToJson(pretty = true): string {
  return JSON.stringify(buildSnapshot(), null, pretty ? 2 : 0);
}

export function tryDecodeCode(code: string): SyncSnapshot | null {
  try {
    const json = base64UrlDecode(code.trim());
    const parsed = JSON.parse(json) as SyncSnapshot;
    if (parsed.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function tryDecodeJson(json: string): SyncSnapshot | null {
  try {
    const parsed = JSON.parse(json.trim()) as SyncSnapshot;
    if (parsed.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function summarize(snap: SyncSnapshot): string {
  const builds = snap.savedBuilds.length;
  const vehicles = snap.savedVehicles.length;
  const checked = Object.values(snap.checklist).filter(Boolean).length;
  const date = new Date(snap.exportedAt).toLocaleString();
  return `${builds} build${builds === 1 ? '' : 's'} · ${vehicles} saved vehicle${vehicles === 1 ? '' : 's'} · ${checked} checklist item${checked === 1 ? '' : 's'} done · exported ${date}`;
}
