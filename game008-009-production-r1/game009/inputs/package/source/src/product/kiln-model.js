// Deterministic, browser-independent thermal rules for EMBER & GLAZE.
// Temperatures are fictional game values, not ceramic-firing guidance.

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const copyName = name => ({ ja: name.ja, en: name.en });

const definePhase = (id, ja, en, duration, low, high, kind) => ({
  id, name: { ja, en }, duration, low, high, kind
});

export const THERMAL_RULES = Object.freeze({
  minTemperature: 80,
  maxTemperature: 920,
  startTemperature: 150,
  startEmber: 0.16,
  startVent: 0.38,
  qualityGoal: 50,
  qualityNearWeight: 0.16,
  heatBase: 0.9,
  emberHeat: 23,
  ventBaseLoss: 3,
  ventTemperatureLoss: 0.008,
  emberDecay: 0.085,
  heldEmberGain: 0.24,
  heldFuelPerSecond: 0.0045,
  tapEmberGain: 0.12,
  tapFuelCost: 0.00225,
  maxStep: 0.1,
  finishQualityFloor: 50,
  finishTemperatureMargin: 26,
  shockRateThreshold: 26,
  shockLimit: 10
});

// Phase timings add to 6m52s across the three normal firings. Every changing
// target is public before the transition via describeFiring().
const authoredProfiles = [
  {
    id: 'dawn-bowl', index: 0, name: { ja: '朝の椀', en: 'Dawn bowl' },
    shape: 'bowl', color: '#d98c64', fuelMax: 0.15, qualityGoal: 50,
    phases: [
      definePhase('warm', '土を温める', 'Warm the clay', 40, 225, 315, 'heat'),
      definePhase('soften', '釉をほどく', 'Soften the glaze', 42, 355, 445, 'heat'),
      definePhase('set', '朝の艶を結ぶ', 'Set the morning sheen', 48, 465, 565, 'heat')
    ]
  },
  {
    id: 'moss-vase', index: 1, name: { ja: '苔色の花瓶', en: 'Moss vase' },
    shape: 'vase', color: '#9caf77', fuelMax: 0.16, qualityGoal: 50,
    phases: [
      definePhase('warm', '胴を温める', 'Warm the body', 32, 230, 330, 'heat'),
      definePhase('moss-glaze', '苔色をひらく', 'Open the moss glaze', 34, 400, 510, 'heat'),
      definePhase('dip', '深い色へ冷ます', 'Cool into the deep green', 30, 315, 390, 'cool'),
      definePhase('polish', '色をふたたび結ぶ', 'Set the color again', 40, 445, 550, 'heat')
    ]
  },
  {
    id: 'evening-pitcher', index: 2, name: { ja: '宵の水差し', en: 'Evening pitcher' },
    shape: 'pitcher', color: '#638f9a', fuelMax: 0.17, qualityGoal: 50,
    phases: [
      definePhase('warm', '厚みを温める', 'Warm the thick clay', 32, 245, 355, 'heat'),
      definePhase('blue-glaze', '青釉を深める', 'Deepen the blue glaze', 36, 425, 540, 'heat'),
      definePhase('dip', '余熱を落ち着かせる', 'Settle the stored heat', 26, 330, 415, 'cool'),
      definePhase('final-glaze', '水差しの艶を深める', 'Deepen the pitcher sheen', 32, 465, 575, 'heat'),
      definePhase('controlled-cool', '冷ましながら艶を決める', 'Cool gently to choose the final sheen', 20, 405, 460, 'cool')
    ]
  }
].map(profile => {
  const phases = profile.phases.map(phase => Object.freeze({
    ...phase,
    name: Object.freeze(copyName(phase.name))
  }));
  return Object.freeze({
    ...profile,
    name: Object.freeze(copyName(profile.name)),
    phases: Object.freeze(phases),
    totalDuration: phases.reduce((total, phase) => total + phase.duration, 0)
  });
});

export const PROFILES = Object.freeze(authoredProfiles);

const validProfileIndex = index => Number.isInteger(index) && index >= 0 && index < PROFILES.length
  ? index : 0;

const currentPhaseIndex = (profile, elapsed) => {
  let end = 0;
  for (let index = 0; index < profile.phases.length; index += 1) {
    end += profile.phases[index].duration;
    if (elapsed < end || index === profile.phases.length - 1) return index;
  }
  return profile.phases.length - 1;
};

const scoreQuality = state => {
  const profile = PROFILES[state.profileIndex];
  const earned = state.goodSeconds.reduce((sum, seconds, index) =>
    sum + seconds + state.nearSeconds[index] * THERMAL_RULES.qualityNearWeight, 0);
  return clamp(Math.round(earned / profile.totalDuration * 100), 0, 100);
};

const updateFinishReady = state => {
  const profile = PROFILES[state.profileIndex];
  const lastIndex = profile.phases.length - 1;
  const finalPhase = profile.phases[lastIndex];
  const phaseElapsed = state.elapsed - profile.phases
    .slice(0, lastIndex)
    .reduce((sum, phase) => sum + phase.duration, 0);
  state.finishReady = state.status === 'running'
    && state.phaseIndex === lastIndex
    && phaseElapsed >= Math.min(30, finalPhase.duration * 0.75)
    && state.quality >= Math.max(THERMAL_RULES.finishQualityFloor, profile.qualityGoal)
    && state.temperature >= finalPhase.low - THERMAL_RULES.finishTemperatureMargin
    && state.temperature <= finalPhase.high + THERMAL_RULES.finishTemperatureMargin;
};

export function createFiring(profileIndex = 0, seed = 9) {
  const selectedIndex = validProfileIndex(profileIndex);
  const selected = PROFILES[selectedIndex];
  const safeSeed = Number.isSafeInteger(seed) ? seed : 9;
  const state = {
    profileIndex: selectedIndex,
    seed: safeSeed,
    elapsed: 0,
    temperature: THERMAL_RULES.startTemperature,
    ember: THERMAL_RULES.startEmber,
    vent: THERMAL_RULES.startVent,
    fuel: selected.fuelMax,
    fuelMax: selected.fuelMax,
    quality: 0,
    shock: 0,
    burn: 0,
    phaseIndex: 0,
    status: 'running',
    reasonCode: '',
    finishReady: false,
    goodSeconds: selected.phases.map(() => 0),
    nearSeconds: selected.phases.map(() => 0),
    goodTime: 0,
    nearTime: 0,
  };
  updateFinishReady(state);
  return state;
}

export function feedFiring(state, strength = 0.12) {
  if (!state || state.status !== 'running') return state;
  const rules = THERMAL_RULES;
  const pulse = clamp(finite(strength, rules.tapEmberGain), 0, 0.35);
  const fuelCost = rules.tapFuelCost * pulse / rules.tapEmberGain;
  if (pulse === 0 || state.fuel + 1e-9 < fuelCost) return state;
  state.fuel = clamp(state.fuel - fuelCost, 0, state.fuelMax);
  state.ember = clamp(state.ember + pulse, 0, 1);
  return state;
}

export function setVent(state, value) {
  if (!state || state.status !== 'running') return state;
  state.vent = clamp(finite(value, state.vent), 0, 1);
  return state;
}

const stop = (state, status, reasonCode) => {
  if (state.status !== 'running') return;
  state.status = status;
  state.reasonCode = reasonCode;
  state.quality = scoreQuality(state);
  state.finishReady = false;
};

export function stepFiring(state, dt, { stoking = false } = {}) {
  if (!state || state.status !== 'running') return state;
  const rules = THERMAL_RULES;
  let remaining = clamp(finite(dt), 0, 60);
  while (remaining > 1e-9 && state.status === 'running') {
    const step = Math.min(remaining, rules.maxStep);
    const profile = PROFILES[state.profileIndex];
    state.phaseIndex = currentPhaseIndex(profile, state.elapsed);
    const phase = profile.phases[state.phaseIndex];

    if (stoking && state.fuel > 1e-9) {
      const actualStoke = Math.min(state.fuel, rules.heldFuelPerSecond * step);
      state.fuel = clamp(state.fuel - actualStoke, 0, state.fuelMax);
      state.ember = clamp(state.ember + rules.heldEmberGain * (actualStoke / (rules.heldFuelPerSecond * step)) * step, 0, 1);
    } else {
      state.ember = clamp(state.ember - rules.emberDecay * step, 0, 1);
    }

    const rate = rules.heatBase + state.ember * rules.emberHeat
      - state.vent * (rules.ventBaseLoss + state.temperature * rules.ventTemperatureLoss);
    state.temperature = clamp(state.temperature + rate * step, 0, rules.maxTemperature + 80);
    if (Math.abs(rate) > rules.shockRateThreshold) {
      state.shock = clamp(state.shock + (Math.abs(rate) - rules.shockRateThreshold) * step * 0.18, 0, 100);
    } else {
      state.shock = Math.max(0, state.shock - step * 1.8);
    }

    if (state.temperature >= rules.maxTemperature) {
      state.burn = clamp(state.burn + step * (state.temperature - rules.maxTemperature + 1) / 40, 0, 100);
      stop(state, 'lost', 'overfire');
    } else if (state.temperature < rules.minTemperature) {
      stop(state, 'lost', 'cold-crack');
    } else if (state.shock >= rules.shockLimit) {
      stop(state, 'lost', 'thermal-shock');
    }
    if (state.status !== 'running') break;

    const margin = 44;
    if (state.temperature >= phase.low && state.temperature <= phase.high) {
      state.goodSeconds[state.phaseIndex] += step;
      state.goodTime += step;
    } else if (state.temperature >= phase.low - margin && state.temperature <= phase.high + margin) {
      state.nearSeconds[state.phaseIndex] += step;
      state.nearTime += step;
    }
    state.quality = scoreQuality(state);
    state.elapsed += step;
    state.phaseIndex = currentPhaseIndex(profile, state.elapsed);

    if (state.elapsed >= profile.totalDuration) {
      const finalPhase = profile.phases[profile.phases.length - 1];
      if (state.temperature < finalPhase.low - rules.finishTemperatureMargin) {
        stop(state, 'lost', 'underfired');
      } else if (state.temperature > finalPhase.high + rules.finishTemperatureMargin) {
        stop(state, 'lost', 'overfired');
      } else if (state.quality < profile.qualityGoal) {
        stop(state, 'lost', 'uneven-glaze');
      } else {
        stop(state, 'lost', 'missed-finish');
      }
    } else {
      updateFinishReady(state);
    }
    remaining -= step;
  }
  return state;
}

export function finishFiring(state) {
  if (!state || state.status !== 'running' || !state.finishReady) return state;
  stop(state, 'won', 'glaze-set');
  return state;
}

export function describeFiring(state) {
  const profile = PROFILES[validProfileIndex(state?.profileIndex)];
  const elapsed = clamp(finite(state?.elapsed), 0, profile.totalDuration);
  const phaseIndex = currentPhaseIndex(profile, elapsed);
  let start = 0;
  for (let index = 0; index < phaseIndex; index += 1) start += profile.phases[index].duration;
  let nextPhase = null;
  if (phaseIndex < profile.phases.length - 1) {
    nextPhase = { ...profile.phases[phaseIndex + 1], name: copyName(profile.phases[phaseIndex + 1].name) };
  }
  return {
    phase: { ...profile.phases[phaseIndex], name: copyName(profile.phases[phaseIndex].name) },
    nextPhase,
    secondsToNext: nextPhase ? Math.max(0, start + profile.phases[phaseIndex].duration - elapsed) : 0,
    secondsRemaining: Math.max(0, profile.totalDuration - elapsed),
    finishReady: !!state?.finishReady
  };
}
