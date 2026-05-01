import type { SavedBuild, ChecklistState, UserProfile, LotFind } from '@/types';

const KEYS = {
  saved: 'cbp:savedBuilds',
  checklist: 'cbp:checklist',
  profile: 'cbp:profile',
  saved_vehicles: 'cbp:savedVehicles',
  lot_finds: 'cbp:lotFinds'
} as const;

const isClient = () => typeof window !== 'undefined';

function readJSON<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('cbp:storage', { detail: { key } }));
  } catch (e) {
    console.error('Storage write failed:', e);
  }
}

export const storage = {
  getSavedBuilds(): SavedBuild[] {
    return readJSON<SavedBuild[]>(KEYS.saved, []);
  },
  saveBuild(build: SavedBuild): void {
    const all = storage.getSavedBuilds();
    const idx = all.findIndex(b => b.id === build.id);
    if (idx >= 0) all[idx] = build;
    else all.push(build);
    writeJSON(KEYS.saved, all);
  },
  deleteBuild(id: string): void {
    const all = storage.getSavedBuilds().filter(b => b.id !== id);
    writeJSON(KEYS.saved, all);
  },
  clearBuilds(): void {
    writeJSON(KEYS.saved, []);
  },

  getSavedVehicles(): string[] {
    return readJSON<string[]>(KEYS.saved_vehicles, []);
  },
  toggleVehicle(vehicleId: string): boolean {
    const list = storage.getSavedVehicles();
    const idx = list.indexOf(vehicleId);
    let saved: boolean;
    if (idx >= 0) {
      list.splice(idx, 1);
      saved = false;
    } else {
      list.push(vehicleId);
      saved = true;
    }
    writeJSON(KEYS.saved_vehicles, list);
    return saved;
  },
  isVehicleSaved(vehicleId: string): boolean {
    return storage.getSavedVehicles().includes(vehicleId);
  },

  getChecklist(): ChecklistState {
    return readJSON<ChecklistState>(KEYS.checklist, {});
  },
  setChecklistItem(stepId: string, done: boolean): void {
    const state = storage.getChecklist();
    state[stepId] = done;
    writeJSON(KEYS.checklist, state);
  },
  clearChecklist(): void {
    writeJSON(KEYS.checklist, {});
  },

  getProfile(): UserProfile {
    return readJSON<UserProfile>(KEYS.profile, {
      zip: '53186',
      monthlyBudget: 500
    });
  },
  setProfile(profile: UserProfile): void {
    writeJSON(KEYS.profile, profile);
  },

  getLotFinds(): LotFind[] {
    return readJSON<LotFind[]>(KEYS.lot_finds, []);
  },
  saveLotFind(find: LotFind): void {
    const all = storage.getLotFinds();
    const idx = all.findIndex(f => f.id === find.id);
    if (idx >= 0) all[idx] = find;
    else all.push(find);
    writeJSON(KEYS.lot_finds, all);
  },
  deleteLotFind(id: string): void {
    const all = storage.getLotFinds().filter(f => f.id !== id);
    writeJSON(KEYS.lot_finds, all);
  },
  clearLotFinds(): void {
    writeJSON(KEYS.lot_finds, []);
  },

  exportAll(): string {
    return JSON.stringify({
      savedBuilds: storage.getSavedBuilds(),
      savedVehicles: storage.getSavedVehicles(),
      checklist: storage.getChecklist(),
      profile: storage.getProfile(),
      lotFinds: storage.getLotFinds()
    }, null, 2);
  },
  importAll(json: string): boolean {
    try {
      const data = JSON.parse(json);
      if (data.savedBuilds) writeJSON(KEYS.saved, data.savedBuilds);
      if (data.savedVehicles) writeJSON(KEYS.saved_vehicles, data.savedVehicles);
      if (data.checklist) writeJSON(KEYS.checklist, data.checklist);
      if (data.profile) writeJSON(KEYS.profile, data.profile);
      if (data.lotFinds) writeJSON(KEYS.lot_finds, data.lotFinds);
      return true;
    } catch {
      return false;
    }
  }
};
