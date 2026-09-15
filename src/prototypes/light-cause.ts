import {traceLight,type LightLevel,type LightState} from './light-r2';

export const lightCauseTiming={ray:100,branchDelay:110,switchArrival:215,gate:245,gateDuration:45,phase:300} as const;

// Display evidence only. The engine settles and saves immediately, independently.
export function lightCause(level:LightLevel,before:LightState,after:LightState){
 const gates=level.gates??(level.gate===undefined?[]:[{id:'◇',gate:level.gate,switch:level.switch!}]);
 const state:LightState={...before,mirrors:[...after.mirrors],...(before.gates?{gates:[...before.gates]}:{})};
 const phases=[];
 for(let pass=0;pass<=gates.length;pass++){
  const trace=traceLight(level,state);
  const opened=gates.flatMap((_,i)=>!(level.gates?state.gates?.[i]:state.gate)&&(level.gates?trace.switchedGates.includes(i):trace.switched)?[i]:[]);
  phases.push({paths:trace.paths,opened});
  if(!opened.length)break;
  for(const i of opened){if(level.gates){state.gates??=gates.map(()=>false);state.gates[i]=true;}else state.gate=true;}
 }
 const final=traceLight(level,after);
 const retained=gates.flatMap((_,i)=>(level.gates?before.gates?.[i]&&after.gates?.[i]:before.gate&&after.gate)&&!(level.gates?final.switchedGates.includes(i):final.switched)?[i]:[]);
 const previous=traceLight(level,before);
 return {gates,phases,retained,previousPaths:previous.paths,newFlowers:final.lit.filter(p=>!previous.lit.includes(p))};
}
