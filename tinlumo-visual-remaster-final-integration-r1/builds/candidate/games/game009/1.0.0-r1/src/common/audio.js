const OUTPUT_SCALE = 0.65;
const TONE_PROFILES = Object.freeze({
  tap: [360, 520, 0.09, 'sine'],
  impact: [170, 55, 0.17, 'triangle'],
  success: [660, 990, 0.27, 'sine'],
  fail: [180, 85, 0.4, 'triangle'],
  step: [420, 630, 0.14, 'sine'],
  finale: [440, 880, 0.8, 'sine'],
  swish: [190, 370, 0.11, 'triangle']
});

function setAudioParam(param, value) {
  if (!param) return;
  try {
    if (typeof param.setValueAtTime === 'function') param.setValueAtTime(value, 0);
    else param.value = value;
  } catch {
    try { param.value = value; } catch { /* Unsupported or closed context. */ }
  }
}

function disconnect(node) {
  try { node?.disconnect?.(); } catch { /* Nodes may already be disconnected. */ }
}

function ignorePromise(value) {
  try { Promise.resolve(value).catch(() => {}); } catch { /* A host stub may throw synchronously. */ }
}

export class AudioBank {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.limiter = null;
    this.stream = null;
    this.volume = 0.45;
    this.muted = false;
    this.active = false;
    this.disposed = false;
    this.last = new Map();
    this.nodes = new Set();
    this.lifecycle = 0;
  }

  _gainValue() {
    return this.muted ? 0 : this.volume * OUTPUT_SCALE;
  }

  _initialize() {
    const AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AudioContextClass) return false;

    try {
      const ctx = new AudioContextClass();
      this.ctx = ctx;
      this.master = ctx.createGain();
      setAudioParam(this.master.gain, this._gainValue());

      try {
        this.limiter = ctx.createDynamicsCompressor?.() || null;
      } catch {
        this.limiter = null;
      }

      if (this.limiter) {
        setAudioParam(this.limiter.threshold, -8);
        setAudioParam(this.limiter.knee, 0);
        setAudioParam(this.limiter.ratio, 20);
        setAudioParam(this.limiter.attack, 0.003);
        setAudioParam(this.limiter.release, 0.12);
        this.master.connect(this.limiter);
        this.limiter.connect(ctx.destination);
      } else {
        this.master.connect(ctx.destination);
      }

      try {
        const stream = ctx.createMediaStreamDestination?.() || null;
        if (stream) {
          try {
            (this.limiter || this.master).connect(stream);
            this.stream = stream;
          } catch {
            for (const track of stream.stream?.getTracks?.() || []) {
              try { track.stop?.(); } catch { /* The track may already be stopped. */ }
            }
            disconnect(stream);
          }
        }
      } catch {
        this.stream = null;
      }
      return true;
    } catch {
      const ctx = this.ctx;
      this._releaseGraph();
      if (ctx) ignorePromise(ctx.close?.());
      this.ctx = null;
      this.master = null;
      this.limiter = null;
      this.stream = null;
      return false;
    }
  }

  _releaseGraph() {
    for (const node of this.nodes) {
      try { node.stop?.(); } catch { /* A source may already have ended. */ }
      disconnect(node);
    }
    this.nodes.clear();

    const tracks = this.stream?.stream?.getTracks?.() || [];
    for (const track of tracks) {
      try { track.stop?.(); } catch { /* The track may already be stopped. */ }
    }
    disconnect(this.master);
    disconnect(this.limiter);
    disconnect(this.stream);
  }

  async unlock() {
    if (this.disposed) return false;
    if (!this.ctx && !this._initialize()) return false;
    const lifecycle = this.lifecycle;

    try {
      if (this.ctx.state !== 'running') await this.ctx.resume();
    } catch {
      return false;
    }

    if (this.disposed || lifecycle !== this.lifecycle || this.ctx.state !== 'running') {
      if (!this.disposed && !this.active && this.ctx.state === 'running') ignorePromise(this.ctx.suspend?.());
      return false;
    }
    this.active = true;
    return true;
  }

  settings(muted, volume) {
    if (typeof muted === 'boolean') this.muted = muted;
    if (Number.isFinite(volume)) this.volume = Math.min(1, Math.max(0, volume));

    if (!this.disposed && this.master?.gain) {
      const gain = this.master.gain;
      try {
        if (typeof gain.setTargetAtTime === 'function') gain.setTargetAtTime(this._gainValue(), this.ctx.currentTime, 0.03);
        else setAudioParam(gain, this._gainValue());
      } catch {
        setAudioParam(gain, this._gainValue());
      }
    }
  }

  _tone(from, to, duration, type, time, peak = 0.35) {
    if (!this.ctx || !this.master || this.disposed) return false;
    let oscillator;
    let gain;
    try {
      oscillator = this.ctx.createOscillator();
      gain = this.ctx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(from, time);
      oscillator.frequency.exponentialRampToValueAtTime(to, time + duration);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(peak, time + 0.007);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      oscillator.connect(gain);
      gain.connect(this.master);
      this.nodes.add(oscillator);
      this.nodes.add(gain);
      oscillator.onended = () => {
        this.nodes.delete(oscillator);
        this.nodes.delete(gain);
        disconnect(oscillator);
        disconnect(gain);
      };
      oscillator.start(time);
      oscillator.stop(time + duration + 0.01);
      return true;
    } catch {
      this.nodes.delete(oscillator);
      this.nodes.delete(gain);
      disconnect(oscillator);
      disconnect(gain);
      return false;
    }
  }

  play(kind, pitch = 1) {
    if (!this.active || !this.ctx || this.ctx.state !== 'running' || this.muted || this.disposed) return;
    const now = Number.isFinite(this.ctx.currentTime) ? this.ctx.currentTime : 0;
    if (now - (this.last.get(kind) ?? -10) < 0.045) return;
    const [from, to, duration, type] = TONE_PROFILES[kind] || TONE_PROFILES.tap;
    const safePitch = Number.isFinite(pitch) && pitch > 0 ? Math.min(4, Math.max(0.25, pitch)) : 1;
    if (!this._tone(from * safePitch, to * safePitch, duration, type, now)) return;
    this.last.set(kind, now);

    if (kind === 'finale') {
      for (const [index, multiplier] of [1, 1.25, 1.5, 2].entries()) {
        this._tone(440 * multiplier, 440 * multiplier, 0.45, 'sine', now + index * 0.12, 0.14);
      }
    }
  }

  pause() {
    this.active = false;
    this.lifecycle++;
    if (this.ctx?.state === 'running') ignorePromise(this.ctx.suspend?.());
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.active = false;
    this.lifecycle++;
    this._releaseGraph();
    if (this.ctx) ignorePromise(this.ctx.close?.());
  }
}
