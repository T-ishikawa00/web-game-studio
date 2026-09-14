import { neighbor, type BaseLevel, type Dir } from './rules';

export interface Robot { id: string; start: number; direction: Dir; goal: number }
export interface DeliveryLevel extends BaseLevel {
  kind: 'delivery'; robots: Robot[]; sockets: number[]; initial: Dir[]; waitCell?: number;
  waitCells?: number[]; maxWait?: 2 | 3; allowedDirections?: Dir[][]; fixedArrows?: Record<number, Dir>;
}
export interface DeliveryEdit { arrows: Dir[]; wait: 0 | 1 | 2; waits?: number[] }
export interface Bot { id: string; p: number; d: Dir; remaining: number; delivered: boolean }
export type DeliveryFailure = 'wall' | 'boundary' | 'wrong-goal' | 'collision' | 'swap' | 'loop' | 'limit';
export interface DeliveryRun { bots: Bot[]; tick: number; seen: string[]; status: 'running' | 'won' | 'failed'; reason?: DeliveryFailure; failureCells?: number[] }
function runKey(bots: Bot[]) { return JSON.stringify([...bots].sort((a,b)=>a.id.localeCompare(b.id)).map(b=>[b.id,b.p,b.d,b.remaining,b.delivered])); }
export function startDelivery(level: DeliveryLevel): DeliveryRun {
  const bots = level.robots.map(r=>({id:r.id,p:r.start,d:r.direction,remaining:0,delivered:false}));
  return {bots,tick:0,seen:[runKey(bots)],status:'running'};
}
export function deliveryWaitCells(level: DeliveryLevel): number[] { return level.waitCells ?? (level.waitCell === undefined ? [] : [level.waitCell]); }
export function tickDelivery(level: DeliveryLevel, edit: DeliveryEdit, run: DeliveryRun): DeliveryRun {
  if(run.status!=='running') return run;
  const waitCells=deliveryWaitCells(level);
  const intents=run.bots.map(bot=>{
    if(bot.delivered) return {...bot};
    if(bot.remaining>0) return {...bot,remaining:bot.remaining-1};
    const socket=level.sockets.indexOf(bot.p);
    const d=socket>=0?edit.arrows[socket]!:(level.fixedArrows?.[bot.p]??bot.d);
    const p=neighbor(bot.p,d,level.size),waitIndex=waitCells.indexOf(p);
    // Only arrivals arm a wait. Consuming the final dot never re-arms that visit.
    const remaining=waitIndex<0?0:level.waitCells?(edit.waits?.[waitIndex]??0):edit.wait;
    return {...bot,p,d,remaining};
  });
  const failures=new Map<DeliveryFailure,Set<number>>();
  const mark=(reason:DeliveryFailure,...cells:number[])=>{const set=failures.get(reason)??new Set<number>();cells.filter(p=>p>=0).forEach(p=>set.add(p));failures.set(reason,set);};
  intents.forEach((bot,i)=>{
    if(bot.delivered)return;
    if(bot.p<0)mark('boundary',run.bots[i]!.p);
    if(level.walls.includes(bot.p))mark('wall',bot.p);
    if(level.robots.some(r=>r.id!==bot.id&&r.goal===bot.p))mark('wrong-goal',bot.p);
    intents.forEach((other,j)=>{
      if(i>=j||other.delivered)return;
      if(bot.p===other.p)mark('collision',bot.p);
      if(bot.p!==run.bots[i]!.p&&bot.p===run.bots[j]!.p&&other.p===run.bots[i]!.p)mark('swap',bot.p,other.p);
    });
  });
  const reason=(['boundary','wall','wrong-goal','collision','swap'] as const).find(r=>failures.has(r));
  // Keep the last valid positions while separately exposing the exact rejected cells.
  if(reason)return {...run,tick:run.tick+1,status:'failed',reason,failureCells:[...failures.get(reason)!].sort((a,b)=>a-b)};
  const bots=intents.map(b=>({...b,delivered:b.delivered||level.robots.some(r=>r.id===b.id&&r.goal===b.p)}));
  if(bots.every(b=>b.delivered))return {bots,tick:run.tick+1,seen:run.seen,status:'won'};
  const key=runKey(bots),loop=run.seen.includes(key),limit=run.tick+1>=100;
  return {bots,tick:run.tick+1,seen:[...run.seen,key],status:loop||limit?'failed':'running',...(loop||limit?{reason:loop?'loop' as const:'limit' as const,failureCells:bots.filter(b=>!b.delivered).map(b=>b.p)}:{})};
}
