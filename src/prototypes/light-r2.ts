import { neighbor, type BaseLevel, type Dir } from './rules';

export interface LightGate { id: 'A' | 'B'; gate: number; switch: number }
export interface LightSplitter { cell: number; input: Dir; outputs: [Dir, Dir] }
export interface LightLevel extends BaseLevel {
  kind: 'light'; source: number; direction: Dir; mirrors: number[]; initial: boolean[];
  flowers: number[]; gate?: number; switch?: number;
  gates?: LightGate[]; splitter?: LightSplitter;
}
export interface LightState { mirrors: boolean[]; gate: boolean; gates?: boolean[] }
export function reflect(d: Dir, slash: boolean): Dir { return (slash ? [1, 0, 3, 2] : [3, 2, 1, 0])[d] as Dir; }

/** Input/output directions are travel headings. A splitter stops every other entry. */
export function traceLight(level: LightLevel, state: LightState) {
  const paths: number[][] = [], segments: [number, number][] = [], lit = new Set<number>();
  const switchedGates = new Set<number>();
  const queue = [{ p: level.source, d: level.direction, history: new Set<string>() }];
  const processed = new Set<string>();
  let switched = false, loop = false;
  while (queue.length) {
    const ray = queue.shift()!;
    let { p, d } = ray;
    const visited = new Set(ray.history), path = [p];
    paths.push(path);
    while (true) {
      const key = `${p}:${d}`;
      if (visited.has(key)) { loop = true; break; }
      // A merge is already traced. It is not, by itself, a cycle.
      if (processed.has(key)) break;
      visited.add(key); processed.add(key);
      const next = neighbor(p, d, level.size);
      if (next < 0) break;
      segments.push([p, next]); p = next; path.push(p);
      const gateIndex = level.gates?.findIndex(g => g.gate === p) ?? -1;
      if (level.walls.includes(p) || (level.gate === p && !state.gate) || (gateIndex >= 0 && !state.gates?.[gateIndex])) break;
      if (level.flowers.includes(p)) lit.add(p);
      if (level.switch === p) switched = true;
      level.gates?.forEach((g, i) => { if (g.switch === p) switchedGates.add(i); });
      if (level.splitter?.cell === p) {
        if (d === level.splitter.input) {
          for (const output of level.splitter.outputs) queue.push({ p, d: output, history: new Set(visited) });
        }
        break;
      }
      const mirror = level.mirrors.indexOf(p);
      if (mirror >= 0) d = reflect(d, state.mirrors[mirror]!);
    }
  }
  return { path: paths[0] ?? [level.source], paths, segments, lit: [...lit], switched,
    switchedGates: [...switchedGates], loop, won: level.flowers.every(p => lit.has(p)) };
}

/** Recalculate after each monotone gate opening; only final simultaneous light wins. */
export function settleLight(level: LightLevel, input: LightState) {
  const state: LightState = { mirrors: [...input.mirrors], gate: input.gate,
    ...(level.gates ? { gates: level.gates.map((_, i) => input.gates?.[i] === true) } : {}) };
  let trace = traceLight(level, state);
  const bound = (level.gates?.length ?? 0) + (level.gate === undefined ? 0 : 1);
  for (let pass = 0; pass < bound; pass++) {
    let changed = false;
    if (!state.gate && level.gate !== undefined && trace.switched) { state.gate = true; changed = true; }
    for (const i of trace.switchedGates) {
      if (!state.gates![i]) { state.gates![i] = true; changed = true; }
    }
    if (!changed) break;
    trace = traceLight(level, state);
  }
  return { state, ...trace };
}
export function turnMirror(level: LightLevel, input: LightState, index: number) {
  const mirrors = [...input.mirrors];
  if (Number.isInteger(index) && index >= 0 && index < mirrors.length) mirrors[index] = !mirrors[index];
  return settleLight(level, { ...input, mirrors });
}
