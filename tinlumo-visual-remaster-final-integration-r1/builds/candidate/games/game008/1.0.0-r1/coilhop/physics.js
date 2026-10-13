// COILHOP production flight model. It keeps the slice's deliberately readable
// arc, with the same slow-motion world scale and one hold/release control.
export const FLIGHT_TIME_SCALE = 2.5;
export const GRAVITY = 710 / (FLIGHT_TIME_SCALE * FLIGHT_TIME_SCALE);
export const MAX_CHARGE_SECONDS = 1.25;
export const FOOT_RADIUS = 14;

export function clamp01(value) {
  return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
}

export function chargePower(elapsedSeconds, maxSeconds = MAX_CHARGE_SECONDS) {
  if (!Number.isFinite(elapsedSeconds) || !Number.isFinite(maxSeconds) || maxSeconds <= 0) return 0;
  return clamp01(elapsedSeconds / maxSeconds);
}

export function launchVelocity(power) {
  const amount = clamp01(power);
  return {
    vx: (135 + 290 * amount) / FLIGHT_TIME_SCALE,
    vy: -(335 + 245 * amount) / FLIGHT_TIME_SCALE,
  };
}

export function advanceBallistic(state, deltaSeconds, gravity = GRAVITY) {
  const dt = Math.max(0, Math.min(0.04, Number.isFinite(deltaSeconds) ? deltaSeconds : 0));
  const g = Number.isFinite(gravity) && gravity >= 0 ? gravity : GRAVITY;
  return {
    x: state.x + state.vx * dt,
    y: state.y + state.vy * dt + 0.5 * g * dt * dt,
    vx: state.vx,
    vy: state.vy + g * dt,
  };
}

/** Find a descending crossing of a pad's top plane, using the hero's foot point. */
export function landingCrossing(previous, next, platform, footRadius = FOOT_RADIUS) {
  if (!(previous.y <= platform.top && next.y >= platform.top && next.vy > 0)) return null;
  const spanY = next.y - previous.y;
  if (spanY <= 0) return null;
  const fraction = Math.max(0, Math.min(1, (platform.top - previous.y) / spanY));
  const x = previous.x + (next.x - previous.x) * fraction;
  if (x + footRadius < platform.left || x - footRadius > platform.right) return null;
  return { x, y: platform.top, fraction };
}

/** Deterministic sine motion; time is the course's elapsed play time in seconds. */
export function padAt(pad, timeSeconds) {
  const time = Number.isFinite(timeSeconds) ? timeSeconds : 0;
  const moving = Number.isFinite(pad.freq) && pad.freq > 0;
  const phase = Number.isFinite(pad.phase) ? pad.phase : 0;
  const x = pad.x + (moving ? Math.sin(time * pad.freq + phase) * (pad.ampX || 0) : 0);
  const y = pad.y + (moving ? Math.sin(time * pad.freq * 0.83 + phase * 1.4) * (pad.ampY || 0) : 0);
  const width = pad.width;
  return { x, y, left: x - width / 2, right: x + width / 2, top: y, width };
}

/** Analytical descending time for a fixed target top; useful to route-authoring tools. */
export function descendingFlightTime(deltaY, power) {
  if (!Number.isFinite(deltaY)) return null;
  const { vy } = launchVelocity(power);
  const discriminant = vy * vy + 2 * GRAVITY * deltaY;
  if (discriminant < 0) return null;
  return (-vy + Math.sqrt(discriminant)) / GRAVITY;
}
