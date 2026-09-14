import { levelsByGame, type GameId } from './levels';
import type { Level, LightState, HomeState, DeliveryEdit } from './rules';
import type { StoragePort, SaveStatus } from '../lib/save';
export type Board = LightState | HomeState | DeliveryEdit;
export interface Progress { levelId: string; levelVersion: number; cleared: string[]; settings: { reducedMotion: boolean }; board: Board }
export const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const exact = (v: Record<string, unknown>, keys: string[]) => Object.keys(v).length === keys.length && keys.every(k => Object.hasOwn(v,k));
export function initialBoard(level: Level): Board {
  if (level.kind === 'light') return { mirrors: [...level.initial], gate: false, ...(level.gates?{gates:level.gates.map(()=>false)}:{}) };
  if (level.kind === 'home') return { positions: [...level.starts] };
  return { arrows: [...level.initial], wait: 0, ...(level.waitCells?{waits:level.waitCells.map(()=>0)}:{}) };
}
export function emptyProgress(id: GameId): Progress { const l=levelsByGame[id][0]!; return { levelId:l.id, levelVersion:1, cleared:[], settings:{reducedMotion:false}, board:initialBoard(l) }; }
export function validBoard(level: Level, v: unknown): v is Board {
  if (!record(v)) return false;
  if (level.kind === 'light') return exact(v,level.gates?['mirrors','gate','gates']:['mirrors','gate']) && Array.isArray(v.mirrors) && v.mirrors.length === level.mirrors.length && Array.from(v.mirrors).every(b=>typeof b==='boolean') && typeof v.gate==='boolean' && (level.gate!==undefined || v.gate===false) && (!level.gates || Array.isArray(v.gates)&&v.gates.length===level.gates.length&&Array.from(v.gates).every(b=>typeof b==='boolean'));
  if (level.kind === 'home') return exact(v,['positions']) && Array.isArray(v.positions) && v.positions.length===2 && Array.from(v.positions).every((p,i)=>Number.isInteger(p) && p>=0 && p<level.size**2 && !(i===0?level.walls:level.otherWalls).includes(p));
  return exact(v,level.waitCells?['arrows','wait','waits']:['arrows','wait']) && Array.isArray(v.arrows) && v.arrows.length===level.sockets.length && Array.from(v.arrows).every((d,i)=>Number.isInteger(d)&&d>=0&&d<=3&&(!level.allowedDirections?.[i]||level.allowedDirections[i]!.includes(d))) && [0,1,2].includes(v.wait as number) && (level.waitCell!==undefined || v.wait===0) && (!level.waitCells || Array.isArray(v.waits)&&v.waits.length===level.waitCells.length&&Array.from(v.waits).every(n=>Number.isInteger(n)&&n>=0&&n<=(level.maxWait??2)));
}
export function validProgress(id: GameId, v: unknown): v is Progress {
  if (!record(v) || !exact(v,['levelId','levelVersion','cleared','settings','board'])) return false;
  const levels = levelsByGame[id], l=levels.find(l=>l.id===v.levelId);
  return !!l && v.levelVersion===l.version && Array.isArray(v.cleared) && v.cleared.length<=levels.length && new Set(v.cleared).size===v.cleared.length && Array.from(v.cleared).every(id=>levels.some(l=>l.id===id)) && record(v.settings) && exact(v.settings,['reducedMotion']) && typeof v.settings.reducedMotion==='boolean' && validBoard(l,v.board);
}
export function createPrototypeSave(id: GameId, storage: ()=>StoragePort) {
  let writable=true;
  const key=`wgs:save:${id}`;
  return {
    load(): { data:Progress; status:SaveStatus } {
      try {
        const raw=storage().getItem(key);
        if(raw===null) return {data:emptyProgress(id),status:'empty'};
        const v:unknown=JSON.parse(raw);
        if(record(v) && v.schema===1 && v.gameId===id && v.version==='0.1.0' && validProgress(id,v.data)) return {data:v.data,status:'ok'};
        writable=false; return {data:emptyProgress(id),status:'invalid'};
      } catch(e) { writable=false; return {data:emptyProgress(id),status:e instanceof SyntaxError?'invalid':'unavailable'}; }
    },
    write(data:Progress) {
      if(!writable || !validProgress(id,data))return false;
      try { const s=storage(),raw=JSON.stringify({schema:1,gameId:id,version:'0.1.0',data});s.setItem(key,raw);return s.getItem(key)===raw; } catch {return false;}
    },
    reset() {try {const s=storage();s.removeItem(key);if(s.getItem(key)!==null)return false;writable=true;return true;}catch{return false;}}
  };
}
