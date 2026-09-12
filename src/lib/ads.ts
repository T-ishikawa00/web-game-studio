import type { StoragePort } from './save';
export type AdMode = 'disabled' | 'mock';
export type AdKind = 'interstitial' | 'rewarded';
export type AdDecision = 'show-mock' | 'unavailable' | 'cooldown' | 'busy';
export const PRESSURE_KEY = 'wgs:ad-pressure:v1';
export const AD_GAP_MS = 60_000;
export const INPUT_GAP_MS = 1_200;
export function createAdAdapter(getStorage: () => StoragePort, now = Date.now) {
  let busy = false;
  return {
    request(mode: AdMode, lastInputAt: number): AdDecision {
      if (mode === 'disabled') return 'unavailable';
      if (busy) return 'busy';
      const time = now();
      if (time - lastInputAt < INPUT_GAP_MS) return 'cooldown';
      try {
        const storage = getStorage();
        const raw = storage.getItem(PRESSURE_KEY);
        if (raw !== null) {
          const last = Number(raw);
          if (!Number.isFinite(last) || last < 0) return 'unavailable';
          if (time - last < AD_GAP_MS) return 'cooldown';
        }
        // Portal-scoped key intentionally has no game ID. If storage fails, show no ad.
        storage.setItem(PRESSURE_KEY, String(time));
        if (storage.getItem(PRESSURE_KEY) !== String(time)) return 'unavailable';
        busy = true;
        return 'show-mock';
      } catch { return 'unavailable'; }
    },
    complete(kind: AdKind, completed: boolean): { reward: boolean } {
      const reward = busy && kind === 'rewarded' && completed;
      busy = false;
      return { reward };
    },
  };
}
