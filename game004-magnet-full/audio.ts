type MagnetEvent = 'snap' | 'launch' | 'hit' | 'break' | 'upgrade' | 'bump' |
  'block' | 'warning' | 'damage' | 'complete';

type Voice = {
  sources: AudioScheduledSourceNode[];
  nodes: AudioNode[];
  output: GainNode;
  ended: boolean;
  stopping: boolean;
};

type AudioMetrics = {
  unlockAttempts: number;
  unlocks: number;
  failures: number;
  events: Record<MagnetEvent, number>;
  suppressed: Record<'snap' | 'hit' | 'warning', number>;
  voicesStarted: number;
  voicesDropped: number;
  voicesStopped: number;
  pullStarts: number;
};

const EVENT_KINDS: MagnetEvent[] = [
  'snap', 'launch', 'hit', 'break', 'upgrade', 'bump',
  'block', 'warning', 'damage', 'complete',
];
const MAX_VOICES = 18;

/** Original procedural sound design for the PROJECT MAGNET micro slice. */
export class MagnetAudio {
  private expansionCounts: Record<string,number> = {};
  private expansionAt: Record<string,number> = {};
  expansionEvent(kind:string): void {
    if(!this.ready())return;
    const now=this.context!.currentTime;
    if(now-(this.expansionAt[kind]??-Infinity)<.12)return;
    this.expansionAt[kind]=now;this.expansionCounts[kind]=(this.expansionCounts[kind]??0)+1;
    switch(kind){
      case 'rail-fire': this.metal(820,.13,.027,.42);this.noise(.06,.02,2200);break;
      case 'carrier-charge': this.body(62,.38,.055,1.7);this.rattle(.45);break;
      case 'support-break': this.metal(730,.22,.028,.38);this.body(115,.23,.04,.5);break;
      case 'repair-link': this.metal(470,.14,.015,1.6);break;
      case 'satellite-block': this.metal(940,.17,.028,.7);this.body(150,.1,.03,.5);break;
      case 'foundry': this.body(48,.26,.06,.42);this.metal(220,.18,.02,.5);break;
      case 'armor-impact': this.metal(190,.12,.023,.65);break;
      case 'shock': this.body(115,.17,.025,.35);break;
      case 'magnet-pulse': this.body(52,.5,.045,.6);this.metal(160,.35,.018,.5);break;
      case 'core-open': this.metal(620,.32,.025,1.5);break;
    }
  }
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private capture: MediaStreamAudioDestinationNode | null = null;
  private voices = new Set<Voice>();
  private pullVoice: Voice | null = null;
  private muted = false;
  private paused = false;
  private disposed = false;
  private failed = false;
  private extended = false;
  private lastSnapAt = -Infinity;
  private lastHitAt = -Infinity;
  private lastWarningAt = -Infinity;
  private snapCluster = 0;
  private randomState = 0x4d41474e;
  private readonly counters: AudioMetrics = {
    unlockAttempts: 0,
    unlocks: 0,
    failures: 0,
    events: {
      snap: 0, launch: 0, hit: 0, break: 0, upgrade: 0, bump: 0,
      block: 0, warning: 0, damage: 0, complete: 0,
    },
    suppressed: { snap: 0, hit: 0, warning: 0 },
    voicesStarted: 0,
    voicesDropped: 0,
    voicesStopped: 0,
    pullStarts: 0,
  };

  async unlock(): Promise<void> {
    this.counters.unlockAttempts += 1;
    if (this.disposed || this.failed) return;

    // When the browser exposes transient activation, refuse programmatic creation.
    const activation = navigator.userActivation;
    if (activation && !activation.isActive && !this.context) return;

    try {
      if (!this.context) this.createGraph();
      const context = this.context;
      if (!context || context.state === 'closed') return;
      if (context.state !== 'running') await context.resume();
      if (this.disposed) return;
      if (context.state === 'running') this.counters.unlocks += 1;
    } catch {
      this.failClosed();
    }
  }

  setMuted(muted: boolean): void {
    if (this.disposed || this.muted === muted) return;
    this.muted = muted;
    if (muted) {
      this.stopAll();
    }
  }

  setPaused(paused: boolean): void {
    if (this.disposed || this.paused === paused) return;
    this.paused = paused;
    if (paused) {
      this.stopAll();
    }
  }

  setExtended(extended: boolean): void {
    if (this.extended === extended) return;
    this.extended = extended;
    this.lastSnapAt = -Infinity;
    this.lastHitAt = -Infinity;
    this.lastWarningAt = -Infinity;
    this.snapCluster = 0;
  }

  pull(active: boolean, charge: number): void {
    if (!active || !this.ready()) {
      this.stopPull();
      return;
    }

    const context = this.context;
    if (!context) return;
    const amount = clamp(charge, 0, 1);
    if (!this.pullVoice) this.startPull(amount);
    const voice = this.pullVoice;
    if (!voice) return;

    const low = voice.sources[0] as OscillatorNode | undefined;
    const motor = voice.sources[1] as OscillatorNode | undefined;
    const gain = voice.nodes[1] as GainNode | undefined;
    const now = context.currentTime;
    low?.frequency.setTargetAtTime(48 + amount * 23, now, 0.035);
    motor?.frequency.setTargetAtTime(96 + amount * 31, now, 0.045);
    gain?.gain.setTargetAtTime(0.018 + amount * 0.018, now, 0.025);
  }

  event(kind: MagnetEvent, intensity = 1): void {
    if (!EVENT_KINDS.includes(kind) || !this.ready()) return;
    const now = this.context?.currentTime ?? 0;
    if (this.extended && kind === 'snap') {
      const clustered = now - this.lastSnapAt < 0.045;
      this.lastSnapAt = now;
      this.snapCluster = clustered ? this.snapCluster + 1 : 0;
      if ((clustered && this.snapCluster % 3 !== 0) || this.voices.size >= 12) {
        this.counters.suppressed.snap += 1;
        return;
      }
      if (clustered) intensity *= 0.48;
    }
    if (this.extended && kind === 'warning') {
      if (now - this.lastWarningAt < 0.28) {
        this.counters.suppressed.warning += 1;
        return;
      }
      this.lastWarningAt = now;
    }
    this.counters.events[kind] += 1;
    const force = clamp(intensity, 0.15, 1.5);
    switch (kind) {
      case 'snap': this.metal(560, 0.085, 0.038 * force, 1.65); break;
      case 'launch':
        this.body(125, 0.16, 0.055 * force, 0.48);
        this.metal(390, 0.11, 0.03 * force, 0.68);
        break;
      case 'hit':
        if (this.extended && this.voices.size >= 12) {
          this.counters.suppressed.hit += 1;
        } else if (this.extended && now - this.lastHitAt < 0.075) {
          this.counters.suppressed.hit += 1;
          this.body(82, 0.14, 0.034 * force, 0.46);
        } else {
          this.body(82, 0.19, 0.075 * force, 0.42);
          this.noise(0.065, 0.045 * force, 520);
        }
        this.lastHitAt = now;
        break;
      case 'break':
        this.body(68, 0.25, 0.085 * force, 0.38);
        this.noise(0.17, 0.055 * force, 1700);
        this.rattle(force);
        break;
      case 'upgrade': this.reward(force); break;
      case 'bump': this.body(105, 0.1, 0.035 * force, 0.62); break;
      case 'block':
        this.body(96, 0.13, 0.045 * force, 0.52);
        this.metal(275, 0.09, 0.026 * force, 0.61);
        break;
      case 'warning':
        this.metal(315, 0.12, 0.022 * force, 1.16);
        break;
      case 'damage':
        this.body(58, 0.22, 0.07 * force, 0.48);
        this.metal(205, 0.1, 0.024 * force, 0.72);
        break;
      case 'complete':
        this.body(76, 0.28, 0.055 * force, 0.72);
        this.metal(420, 0.16, 0.025 * force, 1.18);
        this.metal(690, 0.24, 0.022 * force, 0.94);
        break;
    }
  }

  captureStream(): MediaStream | null {
    return this.disposed ? null : this.capture?.stream ?? null;
  }

  metrics(): object {
    return {
      expansionEvents:{...this.expansionCounts},
      ...this.counters,
      events: { ...this.counters.events },
      suppressed: { ...this.counters.suppressed },
      available: Boolean(this.context && !this.failed),
      contextState: this.context?.state ?? 'uninitialized',
      contextTime: this.context?.currentTime ?? 0,
      muted: this.muted,
      paused: this.paused,
      activeVoices: this.voices.size,
      pullActive: Boolean(this.pullVoice),
      extended: this.extended,
    };
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stopAll();
    this.capture?.disconnect();
    this.compressor?.disconnect();
    this.master?.disconnect();
    const context = this.context;
    this.context = null;
    this.capture = null;
    this.compressor = null;
    this.master = null;
    if (context && context.state !== 'closed') void context.close().catch(() => undefined);
  }

  private createGraph(): void {
    const AudioContextClass = globalThis.AudioContext;
    if (!AudioContextClass) throw new Error('Web Audio unavailable');
    const context = new AudioContextClass({ latencyHint: 'interactive' });
    const master = context.createGain();
    const compressor = context.createDynamicsCompressor();
    master.gain.value = 0.62;
    compressor.threshold.value = -18;
    compressor.knee.value = 14;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.14;
    master.connect(compressor);
    compressor.connect(context.destination);

    try {
      const capture = context.createMediaStreamDestination();
      compressor.connect(capture);
      this.capture = capture;
    } catch {
      this.capture = null;
    }
    this.context = context;
    this.master = master;
    this.compressor = compressor;
  }

  private ready(): boolean {
    return Boolean(
      !this.disposed && !this.failed && !this.muted && !this.paused &&
      this.context?.state === 'running' && this.master,
    );
  }

  private startPull(charge: number): void {
    const context = this.context;
    const master = this.master;
    if (!context || !master || this.voices.size >= MAX_VOICES) return;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const low = context.createOscillator();
    const motor = context.createOscillator();
    low.type = 'sine';
    motor.type = 'triangle';
    low.frequency.value = 48 + charge * 23;
    motor.frequency.value = 96 + charge * 31;
    motor.detune.value = 7;
    filter.type = 'lowpass';
    filter.frequency.value = 310;
    filter.Q.value = 0.7;
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(0.018 + charge * 0.018, context.currentTime, 0.03);
    low.connect(filter);
    motor.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    const voice = this.register([low, motor], [filter, gain], gain);
    if (!voice) return;
    this.pullVoice = voice;
    this.counters.pullStarts += 1;
    low.start();
    motor.start();
  }

  private metal(frequency: number, duration: number, level: number, fall: number): void {
    const context = this.context;
    const master = this.master;
    if (!context || !master) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const highpass = context.createBiquadFilter();
    const first = context.createOscillator();
    const second = context.createOscillator();
    const variation = this.variation(0.045);
    first.type = 'triangle';
    second.type = 'sine';
    first.frequency.setValueAtTime(frequency * variation, now);
    second.frequency.setValueAtTime(frequency * 2.43 * variation, now);
    first.frequency.exponentialRampToValueAtTime(Math.max(30, frequency * fall), now + duration);
    second.frequency.exponentialRampToValueAtTime(Math.max(60, frequency * 1.72), now + duration);
    highpass.type = 'highpass';
    highpass.frequency.value = 180;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(level, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    first.connect(highpass);
    second.connect(highpass);
    highpass.connect(gain);
    gain.connect(master);
    const voice = this.register([first, second], [highpass, gain], gain);
    if (!voice) return;
    first.start(now); second.start(now);
    first.stop(now + duration + 0.01); second.stop(now + duration + 0.01);
  }

  private body(frequency: number, duration: number, level: number, fall: number): void {
    const context = this.context;
    const master = this.master;
    if (!context || !master) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency * this.variation(0.035), now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(28, frequency * fall), now + duration);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(master);
    const voice = this.register([oscillator], [gain], gain);
    if (!voice) return;
    oscillator.start(now);
    oscillator.stop(now + duration + 0.01);
  }

  private noise(duration: number, level: number, cutoff: number): void {
    const context = this.context;
    const master = this.master;
    if (!context || !master) return;
    const length = Math.max(1, Math.ceil(context.sampleRate * duration));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    let previous = 0;
    for (let index = 0; index < data.length; index += 1) {
      const white = this.random() * 2 - 1;
      previous = previous * 0.38 + white * 0.62;
      data[index] = previous * (1 - index / data.length);
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const now = context.currentTime;
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = cutoff * this.variation(0.08);
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    const voice = this.register([source], [filter, gain], gain);
    if (!voice) return;
    source.start(now);
    source.stop(now + duration + 0.01);
  }

  private rattle(intensity: number): void {
    this.metal(720, 0.055, 0.022 * intensity, 0.71);
    this.metal(930, 0.07, 0.018 * intensity, 0.66);
  }

  private reward(intensity: number): void {
    // A compact transformation signature, not a melody or background loop.
    this.metal(440, 0.11, 0.025 * intensity, 1.12);
    this.metal(660, 0.14, 0.027 * intensity, 1.08);
    this.metal(990, 0.18, 0.023 * intensity, 0.96);
  }

  private register(
    sources: AudioScheduledSourceNode[],
    nodes: AudioNode[],
    output: GainNode,
  ): Voice | null {
    if (this.voices.size >= MAX_VOICES) {
      this.counters.voicesDropped += 1;
      for (const node of [...sources, ...nodes]) node.disconnect();
      return null;
    }
    const voice: Voice = { sources, nodes, output, ended: false, stopping: false };
    this.voices.add(voice);
    this.counters.voicesStarted += 1;
    let remaining = sources.length;
    for (const source of sources) {
      source.addEventListener('ended', () => {
        remaining -= 1;
        if (remaining === 0) this.cleanup(voice);
      }, { once: true });
    }
    return voice;
  }

  private cleanup(voice: Voice): void {
    if (voice.ended) return;
    voice.ended = true;
    this.voices.delete(voice);
    if (this.pullVoice === voice) this.pullVoice = null;
    for (const node of [...voice.sources, ...voice.nodes]) node.disconnect();
  }

  private stopVoice(voice: Voice): void {
    if (voice.ended || voice.stopping) return;
    voice.stopping = true;
    if (this.pullVoice === voice) this.pullVoice = null;
    const now = this.context?.currentTime;
    const stopAt = now === undefined ? undefined : now + 0.008;
    if (now !== undefined) {
      voice.output.gain.cancelAndHoldAtTime(now);
      voice.output.gain.linearRampToValueAtTime(0.0001, stopAt!);
    }
    for (const source of voice.sources) {
      try { source.stop(stopAt); } catch { /* already stopped */ }
    }
    this.counters.voicesStopped += 1;
  }

  private stopPull(): void {
    if (this.pullVoice) this.stopVoice(this.pullVoice);
  }

  private stopAll(): void {
    for (const voice of [...this.voices]) this.stopVoice(voice);
    this.pullVoice = null;
  }

  private failClosed(): void {
    this.failed = true;
    this.recordFailure();
    this.stopAll();
  }

  private recordFailure(): void {
    this.counters.failures += 1;
  }

  private random(): number {
    this.randomState = (Math.imul(this.randomState, 1664525) + 1013904223) >>> 0;
    return this.randomState / 0x100000000;
  }

  private variation(amount: number): number {
    return 1 + (this.random() * 2 - 1) * amount;
  }
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));
}
