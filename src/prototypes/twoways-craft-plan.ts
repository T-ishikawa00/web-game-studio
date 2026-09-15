import {homeWon,type HomeLevel,type HomeState,type Dir} from './rules';
import type {TwSoundId} from './twoways-craft-sound';
export interface TwCue {id:TwSoundId;at:number;targets:number[]}
export function twCraftPlan(level:HomeLevel,before:HomeState,after:HomeState,direction:Dir,complete=false){
 const moved=after.positions.map((p,i)=>p!==before.positions[i]);
 const arrived=after.positions.map((p,i)=>p===level.homes[i]&&before.positions[i]!==p);
 const departed=before.positions.map((p,i)=>p===level.homes[i]&&after.positions[i]!==p);
 const clear=!homeWon(level,before)&&homeWon(level,after),targets=moved.flatMap((m,i)=>m?[i]:[]);
 const sounds:TwCue[]=[{id:targets.length===2?'step_pair':targets[0]===0?'step_round':targets[0]===1?'step_mimi':'rest',at:0,targets}];
 if(clear)sounds.push({id:complete?'complete':'clear',at:180,targets:[0,1]});
 else for(const [i,a]of arrived.entries())if(a)sounds.push({id:i===0?'home_round':'home_mimi',at:180,targets:[i]});
 return {duration:180,direction,before:structuredClone(before),after:structuredClone(after),moved,blocked:moved.map(m=>!m),arrived,departed,clear,complete:clear&&complete,sounds};
}
export type TwPlan=ReturnType<typeof twCraftPlan>;
