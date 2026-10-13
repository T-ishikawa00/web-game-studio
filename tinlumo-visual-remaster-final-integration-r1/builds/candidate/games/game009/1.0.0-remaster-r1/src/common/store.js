export const KEY = 'tinlumo.game009.v1';
export const CAMPAIGN_ID = 'ember-glaze-campaign-v1';
export const CAMPAIGN_MODE = 'ember-glaze-campaign-v1';
export const CAMPAIGN_VERSION = 1;

let resetCounter = 0;

export const defaults = () => ({
  version: 1,
  language: 'ja',
  muted: false,
  volume: .45,
  reducedMotion: false,
  highContrast: false,
  bests: {},
  completed: [],
  resume: null
});

export function validate(value) {
  if (!value || typeof value !== 'object' || value.version !== 1 || Array.isArray(value)) return false;
  if (!['ja', 'en'].includes(value.language) || typeof value.muted !== 'boolean' || !Number.isFinite(value.volume) || value.volume < 0 || value.volume > 1) return false;
  if (typeof value.reducedMotion !== 'boolean' || typeof value.highContrast !== 'boolean') return false;
  if (!value.bests || typeof value.bests !== 'object' || Array.isArray(value.bests) || !Array.isArray(value.completed) || !value.completed.every(x => typeof x === 'string' && x.length < 50)) return false;
  if (!Object.entries(value.bests).every(([key, score]) => /^[a-z0-9_-]{1,50}$/.test(key) && !['__proto__', 'constructor', 'prototype'].includes(key) && Number.isFinite(score) && score >= 0 && score <= (key === CAMPAIGN_ID ? 300 : 1e9))) return false;
  if (value.resume !== null && (!value.resume || typeof value.resume.mode !== 'string' || !Number.isInteger(value.resume.stage) || value.resume.stage < 0 || value.resume.stage > 50)) return false;
  if (value.resume?.mode === CAMPAIGN_MODE && !validCampaignResume(value.resume)) return false;
  if (Object.hasOwn(value, 'resetGeneration') && (typeof value.resetGeneration !== 'string' || value.resetGeneration.length < 1 || value.resetGeneration.length > 120)) return false;
  return true;
}

function validCampaignResume(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (value.mode !== CAMPAIGN_MODE || value.campaignVersion !== CAMPAIGN_VERSION) return false;
  if (!Number.isInteger(value.stage) || value.stage < 0 || value.stage > 2 || !Number.isSafeInteger(value.seed)) return false;
  if (typeof value.runId !== 'string' || value.runId.length < 1 || value.runId.length > 80 || !/^[\w-]+$/.test(value.runId)) return false;
  if (!Array.isArray(value.qualities) || value.qualities.length !== value.stage || !value.qualities.every(score => Number.isFinite(score) && score >= 0 && score <= 100)) return false;
  return Object.keys(value).every(key => ['mode', 'campaignVersion', 'stage', 'seed', 'runId', 'qualities'].includes(key));
}

function campaignResume({ stage, seed, runId, qualities }) {
  return { mode: CAMPAIGN_MODE, campaignVersion: CAMPAIGN_VERSION, stage, seed, runId, qualities: [...qualities] };
}

function sameValue(a, b) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

function campaignTransitionAllowed(kind, savedState, candidate, authority) {
  const savedResume = savedState.resume;
  if (!authority) return !((savedResume?.mode === CAMPAIGN_MODE) || (candidate?.mode === CAMPAIGN_MODE) || (savedResume?.mode === CAMPAIGN_MODE && candidate === null));
  if (kind === 'start') {
    if (!validCampaignResume(candidate) || !sameValue(candidate, authority.targetResume) || candidate.stage !== 0 || candidate.qualities.length !== 0) return false;
    return sameValue(savedResume, candidate) || sameValue(savedResume, authority.expectedResume);
  }
  if (kind === 'checkpoint') {
    if (!validCampaignResume(savedResume) || !validCampaignResume(candidate)) return false;
    if (!sameValue(candidate, authority.targetResume)) return false;
    if (savedResume.runId !== authority.runId || candidate.runId !== authority.runId || savedResume.seed !== candidate.seed) return false;
    if (sameValue(savedResume, candidate)) return true;
    if (candidate.stage < savedResume.stage || candidate.stage > savedResume.stage + 1) return false;
    if (candidate.qualities.length < savedResume.qualities.length) return false;
    return savedResume.qualities.every((quality, index) => candidate.qualities[index] === quality);
  }
  if (kind === 'clear' || kind === 'complete') {
    if (candidate !== null || !sameValue(candidate, authority.targetResume)) return false;
    if (savedResume === null) {
      if (kind === 'clear') return validCampaignResume(authority.expectedResume) && authority.expectedResume.runId === authority.runId;
      return (savedState.bests?.[CAMPAIGN_ID] ?? -1) >= authority.score && savedState.completed?.includes(CAMPAIGN_ID);
    }
    if (!validCampaignResume(savedResume) || savedResume.runId !== authority.runId) return false;
    return kind !== 'complete' || savedResume.stage === 2;
  }
  return false;
}

function generationOf(value) {
  return value.resetGeneration ?? null;
}

function newGeneration(previous) {
  resetCounter++;
  let token;
  try {
    token = globalThis.crypto?.randomUUID?.();
  } catch {
    // The generation is a change marker, not a credential. The fallback only
    // needs to distinguish resets made by this runtime.
  }
  token ||= `reset-${Date.now().toString(36)}-${resetCounter.toString(36)}-${Math.random().toString(36).slice(2)}`;
  if (token === previous) token += `-${resetCounter.toString(36)}`;
  return token;
}

function mergeProgress(...values) {
  const bests = {};
  const completed = new Set();
  for (const value of values) {
    if (!value) continue;
    for (const [key, score] of Object.entries(value.bests || {})) bests[key] = Math.max(bests[key] || 0, score);
    for (const id of value.completed || []) completed.add(id);
  }
  return { bests, completed: [...completed] };
}

function accumulatePending(previous, patch) {
  const next = { ...previous, ...patch };
  const progress = mergeProgress(previous, patch);
  if (Object.hasOwn(previous, 'bests') || Object.hasOwn(patch, 'bests')) next.bests = progress.bests;
  if (Object.hasOwn(previous, 'completed') || Object.hasOwn(patch, 'completed')) next.completed = progress.completed;
  return next;
}

function readStored(storage) {
  const raw = storage.getItem(KEY);
  if (raw === null) return { raw, state: defaults() };
  let state;
  try {
    state = JSON.parse(raw);
  } catch {
    throw Object.assign(new Error('corrupt'), { kind: 'corrupt' });
  }
  if (!validate(state)) throw Object.assign(new Error('corrupt'), { kind: 'corrupt' });
  return { raw, state };
}

export function createStore(storage) {
  let state = defaults();
  let status = 'ready';
  let blocked = false;
  let pending = {};
  let pendingCampaignAuthority = null;
  let baselineGeneration = null;
  let baselineHadSave = false;

  try {
    const saved = readStored(storage);
    state = saved.state;
    baselineGeneration = generationOf(saved.state);
    baselineHadSave = saved.raw !== null;
  } catch (error) {
    if (error?.kind === 'corrupt') status = 'corrupt-preserved';
    else status = 'unavailable';
    blocked = true;
  }

  function markExternalReset() {
    status = 'external-reset';
    blocked = true;
    return false;
  }

  function writePatch(patch, campaignAuthority = null) {
      if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new Error('Invalid save patch');
      const containsResume = Object.hasOwn(patch, 'resume');
      if (containsResume && !campaignAuthority && !pendingCampaignAuthority && (patch.resume?.mode === CAMPAIGN_MODE || state.resume?.mode === CAMPAIGN_MODE)) {
        status = 'checkpoint-conflict';
        return false;
      }
      if (campaignAuthority && pendingCampaignAuthority && !sameValue(campaignAuthority, pendingCampaignAuthority)) {
        status = 'checkpoint-conflict';
        return false;
      }
      const activeAuthority = campaignAuthority || pendingCampaignAuthority;
      const proposal = { ...state, ...pending, ...patch };
      if (!validate(proposal)) throw new Error('Invalid save patch');
      if (blocked) return false;

      let saved;
      try {
        saved = readStored(storage);
      } catch (error) {
        status = error?.kind === 'corrupt' ? 'corrupt-preserved' : 'unavailable';
        if (error?.kind === 'corrupt') blocked = true;
        return false;
      }

      if ((saved.raw === null && baselineHadSave) || generationOf(saved.state) !== baselineGeneration) {
        status = 'external-reset';
        blocked = true;
        return false;
      }

      const accumulated = accumulatePending(pending, patch);
      const next = { ...saved.state, ...accumulated };
      const candidateResume = Object.hasOwn(accumulated, 'resume') ? accumulated.resume : saved.state.resume;
      if ((containsResume || Object.hasOwn(pending, 'resume')) && !campaignTransitionAllowed(activeAuthority?.kind, saved.state, candidateResume, activeAuthority)) {
        status = 'checkpoint-conflict';
        return false;
      }
      const progress = mergeProgress(saved.state, state, accumulated);
      next.bests = progress.bests;
      next.completed = progress.completed;
      if (generationOf(saved.state) === null) delete next.resetGeneration;
      else next.resetGeneration = generationOf(saved.state);
      if (!validate(next)) throw new Error('Invalid save patch');

      // Keep the local view and pending intent when quota/readback fails. A
      // later successful update can then retry it without losing progress.
      state = next;
      pending = accumulated;
      if (campaignAuthority) pendingCampaignAuthority = campaignAuthority;
      let raw;
      try {
        raw = JSON.stringify(next);
        storage.setItem(KEY, raw);
        if (storage.getItem(KEY) !== raw) throw new Error('readback');
      } catch {
        status = 'write-failed';
        return false;
      }

      pending = {};
      pendingCampaignAuthority = null;
      baselineGeneration = generationOf(next);
      baselineHadSave = true;
      status = 'saved';
      return true;
    }

  return {
    get state() { return state; },
    get status() { return status; },

    update(patch) {
      return writePatch(patch);
    },

    startCampaign({ seed, runId } = {}) {
      const resume = campaignResume({ stage: 0, seed, runId, qualities: [] });
      if (!validCampaignResume(resume)) throw new Error('Invalid campaign start');
      const authority = { kind: 'start', expectedResume: state.resume ?? null, targetResume: resume };
      return writePatch({ resume }, authority);
    },

    checkpointCampaign({ runId, stage, seed, qualities } = {}) {
      const resume = campaignResume({ stage, seed, runId, qualities });
      if (!validCampaignResume(resume)) throw new Error('Invalid campaign checkpoint');
      const authority = { kind: 'checkpoint', runId, targetResume: resume };
      return writePatch({ resume }, authority);
    },

    clearCampaign({ runId } = {}) {
      if (typeof runId !== 'string' || runId.length < 1 || runId.length > 80 || !/^[\w-]+$/.test(runId)) throw new Error('Invalid campaign run id');
      return writePatch({ resume: null }, { kind: 'clear', runId, expectedResume: state.resume ?? null, targetResume: null });
    },

    completeCampaign({ runId, score } = {}) {
      if (!Number.isFinite(score) || score < 0 || score > 300 || typeof runId !== 'string' || runId.length < 1 || runId.length > 80 || !/^[\w-]+$/.test(runId)) {
        status = 'checkpoint-conflict';
        return false;
      }
      return writePatch({ resume: null, bests: { [CAMPAIGN_ID]: score }, completed: [CAMPAIGN_ID] }, { kind: 'complete', runId, expectedResume: state.resume ?? null, targetResume: null, score });
    },

    backup() {
      try { return storage.getItem(KEY); } catch { return null; }
    },

    reset() {
      let previousGeneration = baselineGeneration;
      try {
        const raw = storage.getItem(KEY);
        if (raw !== null) {
          try {
            const current = JSON.parse(raw);
            if (validate(current)) previousGeneration = generationOf(current);
          } catch {
            // An explicit reset is the user's instruction to replace even an
            // unreadable save; the subsequent exact readback remains required.
          }
        }
        const fresh = { ...defaults(), resetGeneration: newGeneration(previousGeneration) };
        const serialized = JSON.stringify(fresh);
        storage.setItem(KEY, serialized);
        if (storage.getItem(KEY) !== serialized) throw new Error('reset-readback');
        state = fresh;
        pending = {};
        pendingCampaignAuthority = null;
        baselineGeneration = generationOf(fresh);
        baselineHadSave = true;
        blocked = false;
        status = 'ready';
        return true;
      } catch {
        status = 'write-failed';
        return false;
      }
    }
  };
}
