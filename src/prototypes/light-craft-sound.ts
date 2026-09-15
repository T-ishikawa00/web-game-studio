/** Lightwork Pilot 01 original synthesis. No samples, Tiny assets, randomness or BGM.
 * PCM is not peak-normalized. Apply the role gain exactly once in the scheduler.
 * Numerical checks establish signal safety only; listening/Human approval is separate.
 */
export const LIGHT_SOUND_IDS = [
  'mirror_turn', 'switch_on', 'gate_open', 'flower_lit',
  'puzzle_clear', 'run_complete', 'undo',
] as const;
export type LightSoundId = typeof LIGHT_SOUND_IDS[number];

export interface LightSoundSpec {
  readonly durationMs: number;
  readonly gain: number;
  readonly priority: number;
  readonly description: string;
}

export const LIGHT_SOUND_SPECS = {
  mirror_turn: { durationMs: 96, gain: .24, priority: 1, description: 'Dry rounded wooden-glass contact' },
  switch_on: { durationMs: 144, gain: .23, priority: 2, description: 'Soft single mechanism point' },
  gate_open: { durationMs: 168, gain: .26, priority: 2, description: 'Two-part small wooden latch' },
  flower_lit: { durationMs: 260, gain: .27, priority: 3, description: 'Rounded mallet arrival, short warm harmonic tail' },
  puzzle_clear: { durationMs: 480, gain: .29, priority: 4, description: 'Three quiet rising resolution notes' },
  run_complete: { durationMs: 720, gain: .30, priority: 5, description: 'Three-note cadence with a settling final pair' },
  undo: { durationMs: 88, gain: .16, priority: 1, description: 'Weaker descending contact, no result reward' },
} as const satisfies Record<LightSoundId, LightSoundSpec>;

interface Tone {
  at: number; length: number; frequency: number; level: number;
  attack?: number; decay?: number; bend?: number; harmonic?: number;
}
interface Texture { at: number; length: number; level: number; cutoff: number }
interface Recipe { tones: readonly Tone[]; texture?: readonly Texture[] }

// Seconds and linear amplitudes. Each event is authored independently; shared
// rounded harmonics connect contact, mechanism and garden-result timbres.
const RECIPES: Record<LightSoundId, Recipe> = {
  mirror_turn: {
    tones: [{ at: 0, length: .09, frequency: 620, level: .38, bend: -85, decay: 6, harmonic: .14 }],
    texture: [{ at: 0, length: .032, level: .12, cutoff: 1900 }],
  },
  switch_on: {
    tones: [
      { at: 0, length: .138, frequency: 740, level: .34, bend: 22, harmonic: .12 },
      { at: .009, length: .10, frequency: 1110, level: .075, decay: 6 },
    ],
    texture: [{ at: 0, length: .026, level: .045, cutoff: 1700 }],
  },
  gate_open: {
    tones: [
      { at: 0, length: .075, frequency: 390, level: .30, bend: -65, decay: 6, harmonic: .20 },
      { at: .025, length: .137, frequency: 585, level: .24, bend: -38, harmonic: .13 },
    ],
    texture: [
      { at: 0, length: .04, level: .13, cutoff: 1450 },
      { at: .025, length: .055, level: .075, cutoff: 1200 },
    ],
  },
  flower_lit: {
    tones: [
      { at: 0, length: .25, frequency: 784, level: .35, attack: .005, harmonic: .13 },
      { at: .007, length: .23, frequency: 1176, level: .085, attack: .006, decay: 5.5 },
    ],
    texture: [{ at: 0, length: .03, level: .035, cutoff: 1800 }],
  },
  puzzle_clear: {
    tones: [
      { at: 0, length: .205, frequency: 588, level: .27, attack: .004, harmonic: .12 },
      { at: .095, length: .215, frequency: 735, level: .29, attack: .004, harmonic: .12 },
      { at: .195, length: .275, frequency: 882, level: .32, attack: .005, harmonic: .10 },
    ],
    texture: [{ at: 0, length: .03, level: .025, cutoff: 1600 }],
  },
  run_complete: {
    tones: [
      { at: 0, length: .25, frequency: 588, level: .27, attack: .004, harmonic: .12 },
      { at: .14, length: .265, frequency: 735, level: .28, attack: .005, harmonic: .12 },
      { at: .30, length: .41, frequency: 784, level: .30, attack: .006, decay: 5, harmonic: .10 },
      { at: .30, length: .40, frequency: 588, level: .11, attack: .008, decay: 5 },
    ],
    texture: [{ at: 0, length: .03, level: .025, cutoff: 1600 }],
  },
  undo: {
    tones: [{ at: 0, length: .082, frequency: 500, level: .31, bend: -130, decay: 6, harmonic: .09 }],
    texture: [{ at: 0, length: .025, level: .06, cutoff: 1300 }],
  },
};

function envelope(t: number, length: number, attack = .003, decay = 5): number {
  if (t <= 0 || t >= length) return 0;
  const rise = Math.sin(Math.min(1, t / attack) * Math.PI / 2) ** 2;
  const release = Math.sin(Math.min(1, (length - t) / .014) * Math.PI / 2) ** 2;
  return rise * Math.exp(-decay * t / length) * release;
}

export function synthesizeLightSound(id: LightSoundId, sampleRate = 48000): Float32Array {
  if (!Number.isInteger(sampleRate) || sampleRate < 8000 || sampleRate > 192000) {
    throw new RangeError('Lightwork sample rate must be an integer from 8000 to 192000');
  }
  const spec = LIGHT_SOUND_SPECS[id], recipe = RECIPES[id];
  if (!spec || !recipe) throw new RangeError('Unknown Lightwork sound');
  const length = Math.ceil(spec.durationMs * sampleRate / 1000);
  const work = new Float64Array(length);
  for (const tone of recipe.tones) {
    const start = Math.round(tone.at * sampleRate);
    const end = Math.min(length, start + Math.ceil(tone.length * sampleRate));
    for (let i = start; i < end; i++) {
      const t = (i - start) / sampleRate;
      const phase = 2 * Math.PI * (tone.frequency * t + .5 * (tone.bend ?? 0) * t * t / tone.length);
      const harmonics = Math.sin(phase) + (tone.harmonic ?? .06) * Math.sin(phase * 2) + .025 * Math.sin(phase * 3);
      work[i] = work[i]! + tone.level * envelope(t, tone.length, tone.attack, tone.decay) * harmonics;
    }
  }
  // Fixed per-event seed; no Math.random, external recording or imported sample.
  let seed = (LIGHT_SOUND_IDS.indexOf(id) + 1) * 7919;
  for (const texture of recipe.texture ?? []) {
    const start = Math.round(texture.at * sampleRate);
    const end = Math.min(length, start + Math.ceil(texture.length * sampleRate));
    const alpha = 1 - Math.exp(-2 * Math.PI * texture.cutoff / sampleRate);
    let filtered = 0;
    for (let i = start; i < end; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      filtered += alpha * (seed / 2147483648 - 1 - filtered);
      const t = (i - start) / sampleRate;
      work[i] = work[i]! + filtered * texture.level * envelope(t, texture.length, .002, 7);
    }
  }
  // Remove tiny DC bias through a smooth window, preserving exact silent edges.
  // This is DC correction, not peak/RMS normalization or role-gain equalization.
  let sum = 0, weight = 0;
  for (let i = 0; i < length; i++) {
    sum += work[i]!;
    weight += Math.sin(Math.PI * i / (length - 1)) ** 2;
  }
  const correction = sum / weight;
  const output = new Float32Array(length);
  for (let i = 1; i < length - 1; i++) {
    output[i] = work[i]! - correction * Math.sin(Math.PI * i / (length - 1)) ** 2;
  }
  return output;
}
