import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import {
  GRAVITY, MAX_CHARGE_SECONDS, FOOT_RADIUS, chargePower, launchVelocity,
  advanceBallistic, landingCrossing, padAt,
} from '../public/coilhop/physics.js';
import { COURSES } from '../public/coilhop/courses.js';

function edgesFor(course) {
  const byId = new Map(course.pads.map((pad) => [pad.id, pad]));
  return course.pads.flatMap((pad) => pad.next.map((id) => [pad, byId.get(id)]));
}

function phasePeriod(a, b) {
  const frequencies = [a.freq, b.freq].filter((value) => Number.isFinite(value) && value > 0);
  if (frequencies.length === 0) return 0;
  return 6 * Math.PI / Math.min(...frequencies);
}

function trial(launchPad, targetPad, launchTime, power) {
  const origin = padAt(launchPad, launchTime);
  let state = { x: origin.x, y: origin.top, ...launchVelocity(power) };
  let elapsed = 0;
  let previous = state;
  for (let tick = 0; tick < 175; tick += 1) {
    elapsed += 0.04;
    state = advanceBallistic(state, 0.04);
    const surface = padAt(targetPad, launchTime + elapsed);
    const crossed = landingCrossing(previous, state, surface, FOOT_RADIUS);
    if (crossed) return { ...crossed, elapsed, surface, power, launchTime };
    previous = state;
  }
  return null;
}

function solveEdge(a, b) {
  const period = phasePeriod(a, b);
  const phaseCount = period === 0 ? 1 : 48;
  const powerCount = 101;
  const hits = [];
  for (let phaseIndex = 0; phaseIndex < phaseCount; phaseIndex += 1) {
    const launchTime = period === 0 ? 0 : period * phaseIndex / phaseCount;
    for (let powerIndex = 0; powerIndex < powerCount; powerIndex += 1) {
      const power = powerIndex / (powerCount - 1);
      const hit = trial(a, b, launchTime, power);
      if (hit) hits.push({ ...hit, phaseIndex, powerIndex });
    }
  }
  if (hits.length === 0) return null;
  hits.sort((left, right) => left.elapsed - right.elapsed || left.power - right.power || left.launchTime - right.launchTime);
  const representative = hits[Math.floor(hits.length / 2)];
  const samePhasePowers = hits.filter((hit) => hit.phaseIndex === representative.phaseIndex).map((hit) => hit.powerIndex).sort((left, right) => left - right);
  const containingPowers = [];
  for (const value of samePhasePowers) {
    if (containingPowers.length === 0 || value === containingPowers.at(-1) + 1) containingPowers.push(value);
    else if (containingPowers.includes(representative.powerIndex)) break;
    else containingPowers.length = 0;
  }
  const samePowerPhases = hits.filter((hit) => hit.powerIndex === representative.powerIndex).map((hit) => hit.phaseIndex).sort((left, right) => left - right);
  const phaseGroups = [];
  for (const value of samePowerPhases) {
    const latest = phaseGroups.at(-1);
    if (!latest || value > latest.end + 1) phaseGroups.push({ start: value, end: value });
    else latest.end = value;
  }
  if (phaseGroups.length > 1 && phaseGroups[0].start === 0 && phaseGroups.at(-1).end === phaseCount - 1) {
    const wraps = { start: phaseGroups.at(-1).start, end: phaseGroups[0].end, wraps: true };
    phaseGroups.shift();
    phaseGroups.pop();
    phaseGroups.unshift(wraps);
  }
  const phaseStep = phaseCount === 1 ? 0 : period / phaseCount;
  return {
    from: a.id,
    to: b.id,
    chargeSeconds: Number((representative.power * MAX_CHARGE_SECONDS).toFixed(3)),
    power: Number(representative.power.toFixed(3)),
    flightSeconds: Number(representative.elapsed.toFixed(3)),
    launchPhaseSeconds: Number(representative.launchTime.toFixed(3)),
    sampledPhaseHorizonSeconds: Number(period.toFixed(3)),
    phaseSampleStepSeconds: Number(phaseStep.toFixed(3)),
    validPhaseWindowsAtCalibratedHold: phaseGroups.map((group) => ({
      startSeconds: Number((group.start * phaseStep).toFixed(3)),
      endSeconds: Number((group.end * phaseStep).toFixed(3)),
      wraps: Boolean(group.wraps),
    })),
    powerWindowAtCalibratedPhase: [Number((Math.min(...containingPowers) / 100).toFixed(3)), Number((Math.max(...containingPowers) / 100).toFixed(3))],
    landingError: Number((representative.x - representative.surface.x).toFixed(2)),
  };
}

function allPaths(course) {
  const byId = new Map(course.pads.map((pad) => [pad.id, pad]));
  const found = [];
  const visit = (id, path, seen) => {
    assert.equal(seen.has(id), false, `${course.id} has a route cycle at ${id}`);
    const pad = byId.get(id);
    assert.ok(pad, `${course.id} references missing pad ${id}`);
    const nextPath = [...path, pad];
    if (pad.final) {
      found.push(nextPath);
      return;
    }
    assert.ok(pad.next.length > 0, `${course.id} dead-ends at non-final pad ${id}`);
    for (const next of pad.next) visit(next, nextPath, new Set([...seen, id]));
  };
  visit(0, [], new Set());
  return found;
}

test("production flight helpers preserve the slice's bounded charge and crossing model", () => {
  assert.equal(GRAVITY, 113.6);
  assert.equal(MAX_CHARGE_SECONDS, 1.25);
  assert.equal(chargePower(0.625), 0.5);
  assert.equal(chargePower(Number.NaN), 0);
  assert.ok(launchVelocity(1).vx > launchVelocity(0).vx);
  assert.deepEqual(advanceBallistic({ x: 10, y: 20, vx: 100, vy: -50 }, -1), { x: 10, y: 20, vx: 100, vy: -50 });
  assert.ok(landingCrossing({ x: 50, y: 80 }, { x: 150, y: 120, vy: 100 }, { left: 90, right: 130, top: 100 }));
  assert.equal(landingCrossing({ x: 50, y: 80 }, { x: 150, y: 120, vy: -1 }, { left: 90, right: 130, top: 100 }), null);
  const moving = { x: 100, y: 200, width: 80, ampX: 20, ampY: 12, freq: 0.4, phase: 0.5 };
  assert.notEqual(padAt(moving, 0).x, padAt(moving, 3).x);
  assert.equal(padAt(moving, 0).width, 80);
});

test('eight authored courses form forward, nonempty paths with checkpoints and a distinct summit', () => {
  assert.equal(COURSES.length, 8);
  const padSchema = ['ampX', 'ampY', 'beacon', 'final', 'freq', 'id', 'next', 'phase', 'width', 'x', 'y'];
  const themeSchema = ['leaf', 'mist', 'platform', 'skyBottom', 'skyTop'];
  for (const course of COURSES) {
    assert.deepEqual(Object.keys(course.title).sort(), ['en', 'ja']);
    assert.deepEqual(Object.keys(course.hint).sort(), ['en', 'ja']);
    assert.ok(course.theme.skyTop && course.theme.platform && course.theme.leaf);
    assert.deepEqual(Object.keys(course.theme).sort(), themeSchema);
    assert.equal(course.pads[0].id, 0);
    assert.equal(course.pads[0].x, 140);
    assert.equal(course.pads[0].y, 620);
    assert.ok(course.pads.every((pad) => Number.isInteger(pad.width) && pad.width >= 100));
    for (const pad of course.pads) assert.deepEqual(Object.keys(pad).sort(), padSchema, `${course.id} pad ${pad.id} schema`);
    const pads = new Map(course.pads.map((pad) => [pad.id, pad]));
    for (const [from, to] of edgesFor(course)) {
      assert.ok(to, `${course.id} has a missing edge from ${from.id}`);
      assert.ok(to.x > from.x, `${course.id} does not advance rightward on ${from.id} -> ${to.id}`);
    }
    const paths = allPaths(course);
    assert.ok(paths.length >= 1);
    for (const path of paths) {
      const landings = path.length - 1;
      assert.ok(landings >= 9 && landings <= 12, `${course.id} path has ${landings} landings`);
      assert.ok(path.slice(1, -1).some((pad) => pad.beacon), `${course.id} has no recovery beacon`);
      for (const ordinal of [3, 6, 9]) assert.equal(path[ordinal]?.beacon, true, `${course.id} needs a beacon after landing ${ordinal}`);
      assert.equal(path.at(-1).final, true);
    }
    assert.equal([...pads.values()].filter((pad) => pad.final).length, 1);
  }
  assert.ok(COURSES[7].pads.at(-1).y < 0, 'summit finale should rise above the opening field');
  assert.ok(COURSES[2].pads.some((pad) => pad.ampX > 0), 'course 3 must teach horizontal motion');
  assert.ok(COURSES[3].pads.some((pad) => pad.ampY > 0), 'course 4 must teach vertical motion');
});

test('every authored route edge has an ordinary-charge landing under a sampled platform phase', async () => {
  const routeSolutions = [];
  for (const course of COURSES) {
    for (const [from, to] of edgesFor(course)) {
      const solution = solveEdge(from, to);
      assert.ok(solution, `${course.id} edge ${from.id} -> ${to.id} is unreachable`);
      routeSolutions.push({ courseId: course.id, ...solution });
    }
  }
  assert.ok(routeSolutions.length >= 82);
  const report = {
    schemaVersion: 1,
    title: 'COILHOP authored route solutions',
    method: 'Deterministic source-data simulation from pad centers. Charge power was sampled from 0 to 1 in 0.01 increments; moving-pad launch times were sampled across three periods of the slowest route motion. Each edge uses the runtime ballistic integrator and descending foot-contact rule.',
    evidenceClass: 'Developer analytical simulation only; not ordinary-input gameplay QA, human playtesting, or release acceptance.',
    limitations: [
      'Moving target phases were sampled at finite intervals, not exhaustively searched.',
      'Each solution certifies one directed launch-to-pad edge, not a completed course played by a person.',
      'Camera framing, visual comprehension, retries, audio, touch hardware, and perceived difficulty are outside this simulation.',
    ],
    courses: COURSES.map((course) => ({
      courseId: course.id,
      edges: routeSolutions.filter((solution) => solution.courseId === course.id).map(({ courseId, ...solution }) => solution),
    })),
  };
  await writeFile(new URL('../qa/course-route-solutions.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
});

test('each fork presents meaningfully different holds and its routes rejoin', () => {
  const forkCourses = COURSES.filter((course) => course.pads.some((pad) => pad.next.length === 2));
  assert.deepEqual(forkCourses.map((course) => course.id), ['course-05', 'course-07']);
  for (const course of forkCourses) {
    const fork = course.pads.find((pad) => pad.next.length === 2);
    const options = fork.next.map((id) => course.pads.find((pad) => pad.id === id));
    const joinIds = options.map((pad) => pad.next[0]);
    assert.equal(joinIds[0], joinIds[1], `${course.id} choices must visibly rejoin`);
    const directSolutions = options.map((pad) => solveEdge(fork, pad));
    assert.ok(Math.abs(directSolutions[0].power - directSolutions[1].power) >= 0.2, `${course.id} fork charges collapsed into one choice`);
    const upper = options.find((pad) => pad.y < fork.y);
    const lower = options.find((pad) => pad.y > fork.y);
    assert.ok(upper && lower, `${course.id} must offer upper/far and lower/near geometry`);
    assert.ok(upper.x > lower.x, `${course.id} upper choice should be farther`);
  }
});
