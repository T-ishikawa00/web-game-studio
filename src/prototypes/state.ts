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
export function emptyProgress(id: GameId): Progress { const l=levelsByGame[id][0]!; return { levelId:l.id, levelVersion:l.version, cleared:[], settings:{reducedMotion:false}, board:initialBoard(l) }; }
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
  const generationKey=key+':generation';
  let generation:string|undefined;
  // Each completion is an independent atomic setItem, never a shared RMW set.
  // Old generations remain ignored after reset; board/settings keep snapshot semantics.
  const currentGeneration=(s:StoragePort)=>{const g=s.getItem(generationKey);if(g===null)return 'legacy';if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(g))throw new SyntaxError('Invalid reset generation');return g;};
  const marker=(g:string,level:string)=>`${key}:completed:${g}:${level}`;
  const snapshot=(g:string)=>g==='legacy'?key:`${key}:state:${g}`;
  function read(s:StoragePort,g:string): {data:Progress;status:SaveStatus} {
    const raw=s.getItem(snapshot(g));
    let data=emptyProgress(id),status:SaveStatus='empty';
    if(raw!==null){
      const v:unknown=JSON.parse(raw);
      if(!record(v)||v.schema!==1||v.gameId!==id||v.version!=='0.1.0'||!validProgress(id,v.data)||
         (v.generation!==undefined&&typeof v.generation!=='string'))throw new SyntaxError('Invalid save');
      if((v.generation??'legacy')===g){data=v.data;status='ok';}
    }
    for(const level of levelsByGame[id])if(s.getItem(marker(g,level.id))==='1'&&!data.cleared.includes(level.id))data.cleared.push(level.id);
    if(data.cleared.length)status='ok';
    return {data,status};
  }
  return {
    load(): { data:Progress; status:SaveStatus } {
      try {
        const s=storage(),g=currentGeneration(s);
        // A refreshed load must not grant an old adapter a new reset epoch.
        // The current board can be read, but saving requires a fresh adapter.
        if(generation!==undefined&&generation!==g)writable=false;
        generation??=g;
        const result=read(s,g);
        if(currentGeneration(s)!==g)throw Error('Reset during load');
        return result;
      } catch(e) { writable=false; return {data:emptyProgress(id),status:e instanceof SyntaxError?'invalid':'unavailable'}; }
    },
    write(data:Progress) {
      if(!writable || !validProgress(id,data))return false;
      try {
        const s=storage(),g=currentGeneration(s);generation??=g;
        if(g!==generation)return false;
        const stored=read(s,g);
        const cleared=[...new Set([...stored.data.cleared,...data.cleared])];
        for(const level of cleared){
          if(currentGeneration(s)!==g)return false;
          s.setItem(marker(g,level),'1');
          if(s.getItem(marker(g,level))!=='1')return false;
        }
        if(currentGeneration(s)!==g)return false;
        // Read markers again after writing to include concurrent completions.
        const merged=read(s,g).data.cleared;
        const next={...data,cleared:[...new Set([...cleared,...merged])]};
        const raw=JSON.stringify({schema:1,gameId:id,version:'0.1.0',...(g==='legacy'?{}:{generation:g}),data:next});
        s.setItem(snapshot(g),raw);
        if(currentGeneration(s)!==g||s.getItem(snapshot(g))!==raw)return false;
        // Compatibility mirror. New-generation loads never rely on this shared key.
        if(g!=='legacy'){s.setItem(key,raw);if(s.getItem(key)!==raw)return false;}
        data.cleared=next.cleared;
        return true;
      } catch {return false;}
    },
    reset() {try {
      const s=storage(),g=globalThis.crypto?.randomUUID?.();
      // No UUID generator: fail closed for deletion, ordinary saves still work.
      if(!g)return false;
      // From the first mutating step onward, even a partially failed reset must
      // not let this adapter adopt the changed epoch through a later write.
      writable=false;
      s.setItem(generationKey,g);if(s.getItem(generationKey)!==g)return false;
      s.removeItem(key);if(s.getItem(key)!==null)return false;
      // Full browser Storage supports enumeration. Remove only this game's obsolete
      // generation keys, preserving current writes and other games/Consent/audio.
      const enumerable=s as StoragePort&Partial<Pick<Storage,'key'|'length'>>;
      if(typeof enumerable.key==='function'&&typeof enumerable.length==='number'){
        for(let i=enumerable.length-1;i>=0;i--){const k=enumerable.key(i);if(k&&
          ((k.startsWith(key+':completed:')&&!k.startsWith(key+':completed:'+currentGeneration(s)+':'))||
           (k.startsWith(key+':state:')&&k!==snapshot(currentGeneration(s)))))s.removeItem(k);}
      }
      // Retire this adapter permanently. Old callbacks and cloned Progress objects
      // cannot receive a new epoch. The UI creates a fresh adapter after reset.
      writable=false;return true;
    }catch{return false;}}
  };
}
