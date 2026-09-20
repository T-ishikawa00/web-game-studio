import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MagnetArt } from '../game004-magnet-tempo/art';

type RectCall = { x: number; y: number; width: number; height: number; fill: string };
type PointCall = { method: 'moveTo' | 'lineTo'; x: number; y: number };

function renderLane(lane: {
  axis: 'x' | 'y';
  position: number;
  width: number;
  telegraph: number;
  active: number;
}) {
  const rects: RectCall[] = [];
  const points: PointCall[] = [];
  const context = {
    fillStyle: '',
    strokeStyle: '',
    globalAlpha: 1,
    lineWidth: 1,
    lineCap: 'butt',
    save() {},
    restore() {},
    beginPath() {},
    stroke() {},
    setLineDash(_dash: number[]) {},
    fillRect(x: number, y: number, width: number, height: number) {
      rects.push({ x, y, width, height, fill: this.fillStyle });
    },
    moveTo(x: number, y: number) { points.push({ method: 'moveTo', x, y }); },
    lineTo(x: number, y: number) { points.push({ method: 'lineTo', x, y }); },
  };
  const art = Object.create(MagnetArt.prototype) as MagnetArt;
  art.c = context as unknown as CanvasRenderingContext2D;
  art.world = {
    width: 960,
    height: 640,
    relays: [{ id: 0, x: 100, y: 100, charge: 0, max: 1, done: false, flash: 0 }],
    lane,
  } as unknown as MagnetArt['world'];

  art.circuit();
  return { rects, points };
}

test('x-axis collision coordinate renders a vertical lane with the same half-width bounds', () => {
  const lane = { axis: 'x' as const, position: 288, width: 28, telegraph: 1.6, active: 1 };
  const { rects, points } = renderLane(lane);

  assert.deepEqual(rects, [{
    x: lane.position - lane.width / 2,
    y: 0,
    width: lane.width,
    height: 640,
    fill: '#d8a35b',
  }]);
  assert.deepEqual(points, [
    { method: 'moveTo', x: lane.position, y: 0 },
    { method: 'lineTo', x: lane.position, y: 640 },
  ]);
  assert.deepEqual(
    [rects[0]!.x, rects[0]!.x + rects[0]!.width],
    [lane.position - lane.width / 2, lane.position + lane.width / 2],
  );
});

test('y-axis collision coordinate renders a horizontal lane with the same half-width bounds', () => {
  const lane = { axis: 'y' as const, position: 416, width: 28, telegraph: 1.6, active: 1 };
  const { rects, points } = renderLane(lane);

  assert.deepEqual(rects, [{
    x: 0,
    y: lane.position - lane.width / 2,
    width: 960,
    height: lane.width,
    fill: '#d8a35b',
  }]);
  assert.deepEqual(points, [
    { method: 'moveTo', x: 0, y: lane.position },
    { method: 'lineTo', x: 960, y: lane.position },
  ]);
  assert.deepEqual(
    [rects[0]!.y, rects[0]!.y + rects[0]!.height],
    [lane.position - lane.width / 2, lane.position + lane.width / 2],
  );
});

test('lane stays amber during telegraph and changes to coral only once active', () => {
  const warning = renderLane({ axis: 'x', position: 300, width: 28, telegraph: .4, active: 1 });
  const active = renderLane({ axis: 'x', position: 300, width: 28, telegraph: 0, active: .9 });

  assert.equal(warning.rects[0]?.fill, '#d8a35b');
  assert.equal(active.rects[0]?.fill, '#d95e45');
});

