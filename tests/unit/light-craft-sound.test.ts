import test from 'node:test';
import assert from 'node:assert/strict';
import { LIGHT_SOUND_IDS, LIGHT_SOUND_SPECS, synthesizeLightSound } from '../../src/prototypes/light-craft-sound';

function measurements(data: Float32Array) {
  let sum = 0, peak = 0, squares = 0;
  for (const sample of data) {
    assert.ok(Number.isFinite(sample));
    sum += sample; squares += sample * sample; peak = Math.max(peak, Math.abs(sample));
  }
  return { peak, dc: sum / data.length, rms: Math.sqrt(squares / data.length) };
}

test('Lightwork PCM has finite samples, low DC, prompt onset, silent edges and bounded mix headroom', () => {
  for (const sampleRate of [8000, 22050, 44100, 48000, 96000]) {
    for (const id of LIGHT_SOUND_IDS) {
      const spec = LIGHT_SOUND_SPECS[id], data = synthesizeLightSound(id, sampleRate);
      const m = measurements(data);
      assert.equal(data.length, Math.ceil(spec.durationMs * sampleRate / 1000));
      assert.equal(data[0], 0); assert.equal(data.at(-1), 0);
      assert.ok(Math.abs(m.dc) < 1e-8, `${id}: DC ${m.dc}`);
      assert.ok(m.peak > .1 && m.peak < .65, `${id}: peak ${m.peak}`);
      assert.ok(m.peak * spec.gain * 3 < .60, `${id}: three-voice role mix`);
      assert.ok(data.slice(0, Math.ceil(.008 * sampleRate)).some(x => Math.abs(x) > .01), `${id}: onset within 8 ms`);
      const end = data.slice(-Math.ceil(.003 * sampleRate));
      assert.ok(end.every(x => Math.abs(x) < .001), `${id}: no abrupt tail`);
    }
  }
});

test('Lightwork synthesis is deterministic and each role has a distinct waveform', () => {
  const fingerprints = new Set<string>();
  for (const id of LIGHT_SOUND_IDS) {
    const first = synthesizeLightSound(id);
    assert.deepEqual(first, synthesizeLightSound(id));
    fingerprints.add(Array.from(first.slice(0, 100)).join(','));
  }
  assert.equal(fingerprints.size, LIGHT_SOUND_IDS.length);
});

test('frequent operation and undo stay quieter than outcomes without blanket peak normalization', () => {
  const rms = (id: typeof LIGHT_SOUND_IDS[number]) => measurements(synthesizeLightSound(id)).rms * LIGHT_SOUND_SPECS[id].gain;
  assert.ok(rms('undo') < rms('mirror_turn'));
  assert.ok(rms('mirror_turn') < rms('flower_lit'));
  assert.ok(rms('mirror_turn') < rms('puzzle_clear'));
  assert.ok(LIGHT_SOUND_SPECS.run_complete.priority > LIGHT_SOUND_SPECS.puzzle_clear.priority);
  assert.ok(LIGHT_SOUND_SPECS.puzzle_clear.priority > LIGHT_SOUND_SPECS.gate_open.priority);
  assert.ok(LIGHT_SOUND_SPECS.run_complete.durationMs <= 800);
});

test('invalid sample rates fail before allocating a signal', () => {
  for (const sampleRate of [0, -1, 7999, 192001, NaN, Infinity, 44100.5]) {
    assert.throws(() => synthesizeLightSound('mirror_turn', sampleRate), RangeError);
  }
});
