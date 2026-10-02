import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  PROFILES, THERMAL_RULES, createFiring, describeFiring, feedFiring,
  setVent, stepFiring, finishFiring
} from '../src/product/kiln-model.js';

function setPointController(state, description, anticipatory, ventQuantum = 0) {
  const phase = description.phase;
  const next = description.nextPhase;
  const center = (phase.low + phase.high) / 2;
  let target = center;
  if (anticipatory && next && description.secondsToNext < 16) {
    const blend = Math.max(0, Math.min(1, (16 - description.secondsToNext) / 16));
    const change = (next.low + next.high) / 2 - center;
    target += change * blend + Math.sign(change) * 20 * blend;
  }
  const error = target - state.temperature;
  const desiredRate = Math.max(-9, Math.min(8, error * 0.085));
  const denominator = THERMAL_RULES.ventBaseLoss + state.temperature * THERMAL_RULES.ventTemperatureLoss;
  let vent = Math.max(0, Math.min(1,
    (THERMAL_RULES.heatBase + state.ember * THERMAL_RULES.emberHeat - desiredRate) / denominator));
  if (ventQuantum > 0) vent = Math.max(0, Math.min(1, Math.round(vent / ventQuantum) * ventQuantum));
  const feed = error > 30 && state.ember < 0.65 && state.fuel > 0.025;
  return { vent, stoking: feed, feed: feed && state.ember < 0.18 };
}

function runPolicy(profileIndex, anticipatory, {
  log = false, finish = true, ventQuantum = 0, ventTapInterval = 0.3, tapOnly = false
} = {}) {
  const state = createFiring(profileIndex, 900 + profileIndex);
  let nextTapAt = 0;
  let nextVentAt = 0;
  let stokeSeconds = 0;
  let taps = 0;
  let arrows = 0;
  while (state.status === 'running' && state.elapsed < PROFILES[profileIndex].totalDuration) {
    const description = describeFiring(state);
    const input = setPointController(state, description, anticipatory, ventQuantum);
    if (ventQuantum > 0) {
      if (state.elapsed >= nextVentAt && Math.abs(input.vent - state.vent) >= ventQuantum / 2) {
        setVent(state, Math.max(0, Math.min(1, state.vent + Math.sign(input.vent - state.vent) * ventQuantum)));
        nextVentAt = state.elapsed + ventTapInterval;
        arrows += 1;
      }
    } else {
      setVent(state, input.vent);
    }
    const wantsFeed = tapOnly ? (input.feed && state.ember < 0.7) : (input.feed && state.ember < 0.18);
    if (wantsFeed && state.elapsed >= nextTapAt) {
      feedFiring(state);
      taps += 1;
      nextTapAt = state.elapsed + (tapOnly ? 0.8 : 2.4);
    }
    if (input.stoking && !tapOnly) stokeSeconds += 0.1;
    stepFiring(state, 0.1, { stoking: !tapOnly && input.stoking });
    if (finish && state.finishReady) finishFiring(state);
  }
  if (log) console.log(JSON.stringify({ profile: PROFILES[profileIndex].id, anticipatory, status: state.status,
    reason: state.reasonCode, quality: state.quality, elapsed: Number(state.elapsed.toFixed(1)),
    fuel: Number(state.fuel.toFixed(3)), stokeSeconds: Number(stokeSeconds.toFixed(1)), taps, arrows }));
  return state;
}

test('three authored firings have distinct, finite tasks within the six-to-eight-minute route', () => {
  assert.equal(PROFILES.length, 3);
  assert.deepEqual(PROFILES.map(profile => profile.shape), ['bowl', 'vase', 'pitcher']);
  const total = PROFILES.reduce((sum, profile) => sum + profile.totalDuration, 0);
  assert.ok(total >= 360 && total <= 480, `campaign duration ${total}s must be 6–8 minutes`);
  assert.ok(PROFILES[1].phases.some(phase => phase.kind === 'cool'));
  assert.equal(PROFILES[2].phases.at(-1).kind, 'cool', 'pitcher must finish through controlled cooling');
  assert.ok(PROFILES[2].phases.at(-1).high < PROFILES[2].phases.at(-2).low,
    'the final cooling target must be announced as a real lower band');
  assert.ok(new Set(PROFILES.map(profile => profile.phases.map(phase => phase.kind).join(','))).size > 1);
});

test('the visible firing description announces the next band and its countdown', () => {
  const state = createFiring(1, 4);
  const description = describeFiring(state);
  assert.equal(description.phase.id, 'warm');
  assert.equal(description.nextPhase.id, 'moss-glaze');
  assert.equal(description.secondsToNext, description.phase.duration);
  assert.equal(description.secondsRemaining, PROFILES[1].totalDuration);
  assert.equal(description.finishReady, false);
});

test('no-input and indiscriminate-stoke runs do not produce a successful firing', () => {
  const idle = createFiring(0, 5);
  while (idle.status === 'running') stepFiring(idle, 0.1);
  assert.equal(idle.status, 'lost');
  assert.ok(idle.quality < PROFILES[0].qualityGoal);

  const reckless = createFiring(0, 5);
  while (reckless.status === 'running') {
    setVent(reckless, 0.1);
    stepFiring(reckless, 0.1, { stoking: true });
  }
  assert.equal(reckless.status, 'lost');
});

test('keyboard-tap control with visible next-band anticipation beats current-band-only for all three firings', () => {
  let totalElapsed = 0;
  for (let profileIndex = 0; profileIndex < PROFILES.length; profileIndex += 1) {
    const reactive = runPolicy(profileIndex, false, { tapOnly: true, ventQuantum: 0.07, ventTapInterval: 0.3 });
    const anticipatory = runPolicy(profileIndex, true, { tapOnly: true, ventQuantum: 0.07, ventTapInterval: 0.3 });
    assert.equal(anticipatory.status, 'won',
      `${PROFILES[profileIndex].id} anticipatory policy failed: ${anticipatory.reasonCode}, quality ${anticipatory.quality}`);
    assert.ok(anticipatory.quality >= PROFILES[profileIndex].qualityGoal);
    assert.equal(reactive.status, 'won', `${PROFILES[profileIndex].id} reactive result: ${reactive.reasonCode}`);
    assert.ok(anticipatory.quality >= reactive.quality + 10,
      `${PROFILES[profileIndex].id} current-band quality ${reactive.quality} was not materially below ${anticipatory.quality}`);
    assert.ok(anticipatory.fuel > 0 && anticipatory.fuel < anticipatory.fuelMax * 0.55,
      `${PROFILES[profileIndex].id} should use a meaningful but survivable share of its limited reserve`);
    assert.equal(anticipatory.reasonCode, 'glaze-set', 'the controller must manually finish inside the final window');
    assert.ok(anticipatory.elapsed < PROFILES[profileIndex].totalDuration,
      'successful completion must require the manual Finish action before timeout');
    totalElapsed += anticipatory.elapsed;
  }
  assert.ok(totalElapsed >= 360 && totalElapsed <= 480,
    `keyboard-tap campaign simulation took ${totalElapsed}s, outside 6–8 minutes`);
});

test('firing inputs stay bounded and the finish is an explicit manual action', () => {
  const state = createFiring(0, 9);
  const initial = state.temperature;
  feedFiring(state);
  assert.equal(state.temperature, initial);
  assert.ok(state.ember > THERMAL_RULES.startEmber);
  assert.ok(state.fuel < state.fuelMax);
  setVent(state, 4);
  assert.equal(state.vent, 1);
  for (let i = 0; i < 20; i += 1) stepFiring(state, 0.1);
  assert.equal(finishFiring(state), state);
  assert.equal(state.status, 'running');
});
