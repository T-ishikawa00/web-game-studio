import { record, validProgress } from './state';
import type { GameId } from './levels';
export const PROTOCOL='wgs-prototype-v1';
export function trustedEnvelope(event: Pick<MessageEvent,'origin'|'source'|'data'>, source: MessageEventSource | null, origin:string, gameId:GameId, generation:string) {
  return !!source && event.source===source && event.origin===origin && record(event.data) && event.data.protocol===PROTOCOL && event.data.gameId===gameId && event.data.generation===generation;
}
export function validGameMessage(id:GameId, m:Record<string,unknown>) {
  const keys=['protocol','gameId','generation','type',...(m.type==='checkpoint'?['data']:m.type==='error'?['code']:m.type==='resize'?['height']:[])];
  if(Object.keys(m).length!==keys.length || !keys.every(k=>Object.hasOwn(m,k)))return false;
  if(m.type==='ready'||m.type==='first-input')return true;
  if(m.type==='checkpoint')return validProgress(id,m.data);
  if(m.type==='error')return m.code==='runtime-error';
  if(m.type==='resize')return Number.isInteger(m.height)&&Number(m.height)>=400&&Number(m.height)<=1600;
  return false;
}
