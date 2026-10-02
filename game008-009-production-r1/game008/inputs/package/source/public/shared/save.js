const VERSION = 1;
const CORRUPT_BACKUP_MARKER = '::corrupt-backup::';
let backupSequence = 0;

function isRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function putOwn(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    value,
    writable: true,
  });
}

function cloneJson(value, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'object' || seen.has(value)) throw new TypeError('Value must be JSON-safe.');
  if (Object.getOwnPropertySymbols(value).length !== 0) throw new TypeError('Symbol keys are not supported.');

  seen.add(value);
  let result;
  if (Array.isArray(value)) {
    result = value.map((item) => cloneJson(item, seen));
  } else {
    if (!isRecord(value)) throw new TypeError('Only plain objects are supported.');
    result = {};
    for (const key of Object.keys(value)) putOwn(result, key, cloneJson(value[key], seen));
  }
  seen.delete(value);
  return result;
}

function copyMap(source, accept) {
  if (!isRecord(source)) throw new TypeError('Save maps must be plain objects.');
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    if (!accept(value)) throw new TypeError('Save map contains an invalid value.');
    putOwn(result, key, value);
  }
  return result;
}

function makeDefaults(defaults) {
  if (defaults === undefined) defaults = {};
  if (!isRecord(defaults)) throw new TypeError('Defaults must be a plain object.');

  const completed = copyMap(defaults.completed ?? {}, (value) => value === true);
  const best = copyMap(defaults.best ?? {}, (value) => typeof value === 'number' && Number.isFinite(value));
  const settings = cloneJson(defaults.settings ?? {});
  if (!isRecord(settings)) throw new TypeError('Default settings must be a plain object.');
  return { version: VERSION, generation: 0, completed, best, settings };
}

function decodeRecord(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'malformed-data', locked: true, raw };
  }

  if (!isRecord(parsed) || !Object.hasOwn(parsed, 'version')) {
    return { ok: false, reason: 'malformed-data', locked: true, raw };
  }
  if (parsed.version !== VERSION) {
    return { ok: false, reason: 'unknown-version', locked: true, raw };
  }

  const fields = ['version', 'generation', 'completed', 'best', 'settings'];
  if (Object.keys(parsed).length !== fields.length || fields.some((field) => !Object.hasOwn(parsed, field))) {
    return { ok: false, reason: 'malformed-data', locked: true, raw };
  }
  if (!Number.isSafeInteger(parsed.generation) || parsed.generation < 0) {
    return { ok: false, reason: 'malformed-data', locked: true, raw };
  }

  try {
    const completed = copyMap(parsed.completed, (value) => value === true);
    const best = copyMap(parsed.best, (value) => typeof value === 'number' && Number.isFinite(value));
    const settings = cloneJson(parsed.settings);
    if (!isRecord(settings)) throw new TypeError('Settings must be a plain object.');
    return {
      ok: true,
      value: { version: VERSION, generation: parsed.generation, completed, best, settings },
    };
  } catch {
    return { ok: false, reason: 'malformed-data', locked: true, raw };
  }
}

function publicClone(value) {
  return cloneJson(value);
}

function quotaError(error) {
  const name = String(error?.name ?? '').toLowerCase();
  return name.includes('quota') || error?.code === 22 || error?.code === 1014;
}

function storageError(error) {
  return quotaError(error) ? 'quota-exceeded' : 'storage-denied';
}

function failure(reason, details = {}) {
  return { ok: false, reason, ...details };
}

/**
 * Create an origin-local store. `read()` returns `{ ok, value }`; mutations return
 * that shape or `{ ok: false, reason }`. `write()` accepts completed/best/settings
 * patches; progress only moves forward, while each setting key uses last-write-wins.
 * Corrupt data blocks writes; explicit `reset()` backs up its raw value first.
 * Pass `{ storage }` as the optional third argument to inject another Web Storage.
 */
export function createStore(key, defaults = {}, options = {}) {
  if (typeof key !== 'string' || key.length === 0) throw new TypeError('A non-empty storage key is required.');
  if (!isRecord(options)) throw new TypeError('Options must be a plain object.');
  const initial = makeDefaults(defaults);
  let observedGeneration;

  function getStorage() {
    if (Object.hasOwn(options, 'storage')) return options.storage;
    try {
      return globalThis.localStorage;
    } catch (error) {
      throw error;
    }
  }

  function load() {
    let storage;
    try {
      storage = getStorage();
      if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
        return { ok: false, reason: 'storage-unavailable' };
      }
      const raw = storage.getItem(key);
      if (raw === null) return { ok: true, value: publicClone(initial), raw: null, exists: false, storage };
      if (typeof raw !== 'string') return { ok: false, reason: 'malformed-data', locked: true, raw, storage };
      return { ...decodeRecord(raw), raw, exists: true, storage };
    } catch (error) {
      return { ok: false, reason: storageError(error) };
    }
  }

  function publicFailure(loaded) {
    const details = {};
    if (Object.hasOwn(loaded, 'raw')) details.raw = loaded.raw;
    if (loaded.locked) details.locked = true;
    return failure(loaded.reason, details);
  }

  function persist(storage, value, details = {}) {
    const serialized = JSON.stringify(value);
    try {
      storage.setItem(key, serialized);
    } catch (error) {
      return failure(storageError(error), details);
    }
    try {
      if (storage.getItem(key) !== serialized) return failure('persistence-failed', details);
    } catch (error) {
      return failure(storageError(error), details);
    }
    observedGeneration = value.generation;
    return { ok: true, value: publicClone(value), ...details };
  }

  function normalizePatch(patch) {
    if (!isRecord(patch) || Object.getOwnPropertySymbols(patch).length !== 0) {
      throw new TypeError('Patch must be a plain object.');
    }
    const allowed = new Set(['completed', 'best', 'settings']);
    if (Object.keys(patch).some((field) => !allowed.has(field))) {
      throw new TypeError('Patch may contain only completed, best, and settings.');
    }

    const normalized = {};
    if (Object.hasOwn(patch, 'completed')) {
      normalized.completed = copyMap(patch.completed, (value) => typeof value === 'boolean');
    }
    if (Object.hasOwn(patch, 'best')) {
      normalized.best = copyMap(patch.best, (value) => typeof value === 'number' && Number.isFinite(value));
    }
    if (Object.hasOwn(patch, 'settings')) {
      normalized.settings = cloneJson(patch.settings);
      if (!isRecord(normalized.settings)) throw new TypeError('Settings patch must be a plain object.');
    }
    return normalized;
  }

  function backupCorrupt(storage, raw) {
    for (let attempt = 0; attempt < 1000; attempt += 1) {
      const suffix = `${Date.now().toString(36)}-${(++backupSequence).toString(36)}`;
      const backupKey = `${key}${CORRUPT_BACKUP_MARKER}${suffix}`;
      try {
        if (storage.getItem(backupKey) !== null) continue;
        storage.setItem(backupKey, raw);
        if (storage.getItem(backupKey) !== raw) return failure('persistence-failed', { backupKey });
        return { ok: true, backupKey };
      } catch (error) {
        return failure(storageError(error));
      }
    }
    return failure('backup-key-exhausted');
  }

  function generationHint(raw) {
    try {
      const parsed = JSON.parse(raw);
      return Number.isSafeInteger(parsed?.generation) && parsed.generation >= 0 ? parsed.generation : 0;
    } catch {
      return 0;
    }
  }

  // Capture the generation when this tab opens, so a later reset invalidates its stale writes.
  const opened = load();
  if (opened.ok) observedGeneration = opened.value.generation;

  return {
    read() {
      const loaded = load();
      if (!loaded.ok) return publicFailure(loaded);
      observedGeneration = loaded.value.generation;
      return { ok: true, value: publicClone(loaded.value) };
    },

    write(patch) {
      const loaded = load();
      if (!loaded.ok) return publicFailure(loaded);

      let normalized;
      try {
        normalized = normalizePatch(patch);
      } catch {
        return failure('invalid-patch');
      }

      if (observedGeneration === undefined) observedGeneration = loaded.value.generation;
      if (loaded.value.generation !== observedGeneration) return failure('stale-generation');

      const next = publicClone(loaded.value);
      for (const [id, completed] of Object.entries(normalized.completed ?? {})) {
        if (completed) putOwn(next.completed, id, true);
      }
      for (const [id, score] of Object.entries(normalized.best ?? {})) {
        if (!Object.hasOwn(next.best, id) || score > next.best[id]) putOwn(next.best, id, score);
      }
      for (const [name, value] of Object.entries(normalized.settings ?? {})) {
        putOwn(next.settings, name, value);
      }
      return persist(loaded.storage, next);
    },

    reset() {
      const loaded = load();
      if (!Object.hasOwn(loaded, 'storage')) return publicFailure(loaded);

      let backupKey;
      if (!loaded.ok && loaded.locked) {
        const backup = backupCorrupt(loaded.storage, loaded.raw);
        if (!backup.ok) return failure(backup.reason, { raw: loaded.raw, backupKey: backup.backupKey });
        backupKey = backup.backupKey;
      } else if (!loaded.ok) {
        return publicFailure(loaded);
      }

      const currentGeneration = loaded.ok ? loaded.value.generation : generationHint(loaded.raw);
      const generation = Math.max(currentGeneration, observedGeneration ?? 0) + 1;
      if (!Number.isSafeInteger(generation)) return failure('generation-exhausted', { backupKey });
      const next = { ...publicClone(initial), generation };
      return persist(loaded.storage, next, backupKey ? { backupKey } : {});
    },
  };
}
