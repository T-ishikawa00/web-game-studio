export type SaveData = { active: number[] };
export type StoragePort = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type SaveStatus = 'empty' | 'ok' | 'migrated' | 'invalid' | 'unavailable';
export const emptySave = (): SaveData => ({ active: [] });
export const saveKey = (id: string) => `wgs:save:${id}`;
export function validData(value: unknown): value is SaveData {
  if (!value || typeof value !== 'object' || !('active' in value)) return false;
  const active = value.active;
  return Array.isArray(active) && active.length <= 9 && new Set(active).size === active.length && active.every(n => Number.isInteger(n) && n >= 0 && n < 9);
}
export function createSaveAdapter(id: string, getStorage: () => StoragePort) {
  let writable = true;
  return {
    load(): { data: SaveData; status: SaveStatus } {
      try {
        const raw = getStorage().getItem(saveKey(id));
        if (raw === null) return { data: emptySave(), status: 'empty' };
        const record = JSON.parse(raw);
        if (record?.schema === 1 && record.gameId === id && typeof record.version === 'string' && validData(record.data)) {
          return { data: record.data, status: 'ok' };
        }
        // Explicit example migration: legacy schema 0 stored lit panel indices as `panels`.
        if (record?.schema === 0 && record.gameId === id && validData({ active: record.panels })) {
          const data = { active: record.panels };
          return { data, status: this.write(data) ? 'migrated' : 'unavailable' };
        }
        writable = false;
        return { data: emptySave(), status: 'invalid' };
      } catch (error) {
        writable = false;
        return { data: emptySave(), status: error instanceof SyntaxError ? 'invalid' : 'unavailable' };
      }
    },
    write(data: SaveData): boolean {
      if (!writable || !validData(data)) return false;
      try {
        const raw = JSON.stringify({ schema: 1, gameId: id, version: '0.1.0', data });
        const storage = getStorage();
        storage.setItem(saveKey(id), raw);
        return storage.getItem(saveKey(id)) === raw;
      } catch { return false; }
    },
    reset(): boolean {
      try {
        const storage = getStorage();
        storage.removeItem(saveKey(id));
        if (storage.getItem(saveKey(id)) !== null) return false;
        writable = true;
        return true;
      } catch { return false; }
    },
  };
}
