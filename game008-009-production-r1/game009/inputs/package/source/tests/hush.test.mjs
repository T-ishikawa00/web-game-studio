import test from "node:test";
import assert from "node:assert/strict";
import { createGame, meta } from "../src/games/hush.js";

class FakeContext {
  constructor(width = 720) {
    this.globalAlpha = 1;
    this.labels = [];
    this.canvas = { getBoundingClientRect: () => ({ width, height: width }) };
  }
  clearRect() {}
  fillRect() {}
  beginPath() {}
  moveTo() {}
  lineTo() {}
  quadraticCurveTo() {}
  closePath() {}
  fill() {}
  stroke() {}
  save() {}
  restore() {}
  translate() {}
  arc() {}
  ellipse() {}
  fillText(...args) { this.labels.push({ text: args[0], x: args[1], y: args[2] }); }
  scale() {}
  createRadialGradient() {
    return { addColorStop() {} };
  }
}

function makeGame(overrides = {}) {
  const reports = [];
  const game = createGame({
    ctx: new FakeContext(),
    audio: { play() {} },
    settings: () => ({ reducedMotion: true, highContrast: true }),
    lang: () => "en",
    onReport: (value) => reports.push(value),
    ...overrides,
  });
  return { game, reports };
}

function tick(game, seconds) {
  const count = Math.ceil(seconds / 0.05);
  for (let i = 0; i < count; i += 1) game.step(0.05);
}

function until(game, predicate, limitSeconds = 10) {
  const count = Math.ceil(limitSeconds / 0.05);
  for (let i = 0; i < count; i += 1) {
    if (predicate(game.snapshot())) return true;
    game.step(0.05);
  }
  return predicate(game.snapshot());
}

function choosePose(game, target) {
  let guard = 0;
  while (game.snapshot().selected !== target && guard < 3) {
    game.key("ArrowRight");
    guard += 1;
  }
  assert.equal(game.snapshot().selected, target, "keyboard can select each requested silhouette");
}

function resolveInspection(game, targetIsCorrect) {
  const before = game.snapshot().inspections;
  const target = game.snapshot().target;
  choosePose(game, targetIsCorrect ? target : (target + 1) % 3);
  game.key("Enter");
  const resolved = until(game, (s) => s.inspections > before || s.status !== "running");
  assert.equal(resolved, true, "inspection reaches the fixed performer and resolves");
  return game.snapshot();
}

test("exports the standalone game contract and stays idle until reset", () => {
  const context = new FakeContext();
  const { game, reports } = makeGame({ ctx: context });
  assert.equal(meta.id, "hush");
  for (const field of ["name", "hook", "controls", "goal", "hint", "role"]) {
    assert.ok(meta[field]?.ja && meta[field]?.en, field + " is localized");
  }
  assert.match(meta.accent, /^#[0-9A-F]{6}$/i);
  assert.equal(game.snapshot().status, "idle");
  game.render(0);
  game.step(1);
  assert.equal(reports.length, 0, "idle does not start a run or report a result");
  assert.ok(context.labels.some(({ text }) => text === "CHOOSE. SHAPE. HOLD."), "idle draws a static preview before Play");
  const started = game.reset(9);
  assert.equal(started.status, "running");
  assert.equal(started.phase, "prepare");
  assert.equal(reports[0].goal, 1080);
  assert.equal(reports[0].status, "running");
  assert.equal(typeof reports[0].detail, "string");
  assert.doesNotThrow(() => game.render(0.5));
});

test("public cues name the selected pose and time the incoming inspection", () => {
  const { game, reports } = makeGame();
  game.reset(23);
  assert.match(reports.at(-1).detail, /CALL .* NOW SPIRE .* FROM .* Gaze in about/);

  game.key("ArrowRight");
  assert.match(reports.at(-1).detail, /NOW FAN/);
  game.key("Space");
  assert.match(reports.at(-1).detail, /HELD/);

  game.key("Space");
  const enteredScan = until(game, (snapshot) => snapshot.phase === "scan");
  assert.equal(enteredScan, true);
  assert.match(reports.at(-1).detail, /Center in about .*s/);
});

test("narrow canvas keeps the title, phase, call, and card rows separate", () => {
  const context = new FakeContext(390);
  const { game } = makeGame({ ctx: context });
  game.render(0);
  assert.ok(context.labels.some(({ text, y }) => text === "CHOOSE. SHAPE. HOLD." && y === 556));
  game.reset(9);
  game.render(0.25);
  assert.ok(context.labels.some(({ text, y }) => text === "H U S H" && y === 29));
  assert.ok(context.labels.some(({ text, y }) => text === "THIS CALL" && y === 184));
  assert.ok(context.labels.some(({ text, y }) => text === "SET SHAPE" && y === 30));
  assert.ok(context.labels.some(({ text, y }) => text === "FOLD" && y === 695));
});

test("nine correct, settled holds win and report localized progress", () => {
  const { game, reports } = makeGame();
  game.reset(173);
  for (let round = 0; round < 9; round += 1) {
    const ready = until(game, (s) => s.status !== "running" || (s.phase === "prepare" && s.inspections === round));
    assert.equal(ready, true, "a new pose call appears for inspection " + (round + 1));
    if (game.snapshot().status !== "running") break;
    const result = resolveInspection(game, true);
    assert.equal(result.inspections, round + 1);
    assert.equal(result.alarms, 0);
  }
  assert.equal(game.snapshot().status, "won");
  assert.equal(game.snapshot().passed, 9);
  assert.ok(game.snapshot().elapsed >= 45 && game.snapshot().elapsed <= 90, "a clean run stays in the intended short-session window");
  const finish = reports.at(-1);
  assert.equal(finish.status, "won");
  assert.equal(finish.value, 900 + game.snapshot().clean * 20);
  assert.equal(finish.goal, 1080);
  assert.match(finish.detail, /Nine/);
});

test("wrong silhouettes create three alarms and a real loss state", () => {
  const { game, reports } = makeGame();
  game.reset(422);
  for (let alarm = 0; alarm < 3; alarm += 1) {
    const round = game.snapshot().inspections;
    assert.equal(until(game, (s) => s.phase === "prepare" && s.inspections === round), true);
    const result = resolveInspection(game, false);
    assert.equal(result.alarms, alarm + 1);
    if (alarm < 2) {
      tick(game, 3.5);
      assert.equal(game.snapshot().status, "running");
    }
  }
  assert.equal(game.snapshot().status, "lost");
  assert.equal(game.snapshot().alarms, 3);
  const loss = reports.at(-1);
  assert.equal(loss.status, "lost");
  assert.equal(loss.reason, "Wrong silhouette");
  assert.notEqual(loss.reason, "shape", "internal failure codes never reach the player");
  assert.match(loss.detail, /Three alarms/);
});

test("single-pointer pose cards and HOLD work; cancel drops an incomplete touch", () => {
  const { game } = makeGame({ lang: () => "ja" });
  game.reset(6);
  game.pointer("down", { x: 580, y: 618 });
  game.pointer("cancel");
  game.pointer("up", { x: 580, y: 618 });
  assert.equal(game.snapshot().selected, 1);
  assert.equal(game.snapshot().locked, false);

  game.pointer("down", { x: 580, y: 618 });
  game.pointer("up", { x: 580, y: 618 });
  assert.equal(game.snapshot().selected, 2);
  game.pointer("down", { x: 350, y: 530 });
  game.pointer("up", { x: 350, y: 530 });
  assert.equal(game.snapshot().locked, true);
  game.pointer("down", { x: 350, y: 530 });
  game.pointer("up", { x: 350, y: 530 });
  assert.equal(game.snapshot().locked, false);

  game.key("Escape");
  assert.equal(game.snapshot().status, "running");
});
