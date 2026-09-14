// Deterministic rules shared by the shipped games and offline QA. No DOM or clock.
export type Dir = 0 | 1 | 2 | 3; // north, east, south, west
export type Text = { ja: string; en: string };
export interface BaseLevel { id: string; version: number; answerKey?: string; size: number; title: Text; lesson: Text; walls: number[]; hints?: [Text,Text] }
export const directions: Dir[] = [0, 1, 2, 3];
export function neighbor(p: number, d: Dir, size: number): number {
  const x = p % size + [0, 1, 0, -1][d]!, y = Math.floor(p / size) + [-1, 0, 1, 0][d]!;
  return x < 0 || y < 0 || x >= size || y >= size ? -1 : y * size + x;
}
export { reflect, traceLight, settleLight, turnMirror } from './light-r2';
import type {LightLevel} from './light-r2';
export type {LightLevel,LightState} from './light-r2';
export interface HomeLevel extends BaseLevel { kind: 'home'; otherWalls: number[]; starts: [number, number]; homes: [number, number] }
export interface HomeState { positions: [number, number] }
export function homeWon(level: HomeLevel, s: HomeState) { return s.positions.every((p, i) => p === level.homes[i]); }
export function moveHome(level: HomeLevel, s: HomeState, d: Dir) {
  const blocked: boolean[] = [];
  const positions = s.positions.map((p, i) => {
    const n = neighbor(p, d, level.size), stop = n < 0 || (i === 0 ? level.walls : level.otherWalls).includes(n);
    blocked.push(stop); return stop ? p : n;
  }) as [number, number];
  const state = { positions };
  return { state, blocked, changed: positions.some((p, i) => p !== s.positions[i]), won: homeWon(level, state) };
}
export { startDelivery, tickDelivery } from './delivery-r2';
import type {DeliveryLevel} from './delivery-r2';
export type {Robot,DeliveryLevel,DeliveryEdit,Bot,DeliveryFailure,DeliveryRun} from './delivery-r2';
export type Level = LightLevel | HomeLevel | DeliveryLevel;
