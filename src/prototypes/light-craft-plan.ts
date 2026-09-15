import {lightCause,lightCauseTiming as timing} from './light-cause';
import {traceLight,type LightLevel,type LightState} from './light-r2';
import type {LightSoundId} from './light-craft-sound';

export interface LightCue {id:LightSoundId;at:number;targets:number[]}
export function lightCraftPlan(level:LightLevel,before:LightState,after:LightState,complete=false){
 const cause=lightCause(level,before,after),state:LightState={...before,mirrors:[...after.mirrors],...(before.gates?{gates:[...before.gates]}:{})};
 const seen=new Set<number>(),flowers:{cell:number;at:number}[]=[],sounds:LightCue[]=[{id:'mirror_turn',at:0,targets:[]}];
 const phases=cause.phases.map((phase,index)=>{
  const at=index*timing.phase,lit=traceLight(level,state).lit;
  for(const cell of cause.newFlowers)if(lit.includes(cell)&&!seen.has(cell)){seen.add(cell);flowers.push({cell,at:at+timing.switchArrival});}
  if(phase.opened.length){sounds.push({id:'switch_on',at:at+timing.switchArrival,targets:phase.opened.map(i=>cause.gates[i]!.switch)},{id:'gate_open',at:at+timing.gate,targets:phase.opened.map(i=>cause.gates[i]!.gate)});}
  for(const i of phase.opened){if(level.gates){state.gates??=cause.gates.map(()=>false);state.gates[i]=true;}else state.gate=true;}
  // Trace branches begin at the splitter; array position itself is not time.
  return {...phase,at,rays:phase.paths.map(path=>({path,at:at+(path[0]===level.splitter?.cell&&path[0]!==level.source?timing.branchDelay:0)}))};
 });
 const won=!traceLight(level,before).won&&traceLight(level,after).won;
 const resultAt=Math.max(0,...flowers.map(f=>f.at));
 for(const at of new Set(flowers.map(f=>f.at))){const targets=flowers.filter(f=>f.at===at).map(f=>f.cell);sounds.push({id:won&&at===resultAt?(complete?'run_complete':'puzzle_clear'):'flower_lit',at,targets});}
 return {cause,phases,flowers,sounds:sounds.sort((a,b)=>a.at-b.at),duration:Math.max((phases.length-1)*timing.phase+290,cause.retained.length?650:0)};
}
export type LightCraftPlan=ReturnType<typeof lightCraftPlan>;
