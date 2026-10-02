// Original RIMBLOOM encounters. The accepted Quick Run content is independent.
export const STAGES=Object.freeze([
  {id:'first',ja:'はじまりの庭',en:'First Bloom',seconds:50,quota:32,pace:3.8,band:0,patterns:[0,1],hint:'relay'},
  {id:'gold',ja:'金色の縁',en:'Gilded Rim',seconds:55,quota:40,pace:3.7,band:0,patterns:[2,3],hint:'armor'},
  {id:'drift',ja:'流れる花びら',en:'Drifting Petals',seconds:60,quota:44,pace:3.5,band:1,patterns:[4,5],hint:'skater'},
  {id:'thorn',ja:'棘の灯り',en:'Thornlight',seconds:60,quota:44,pace:3.5,band:1,patterns:[1,3,5],hint:'thorn'},
  {id:'mirror',ja:'鏡の庭',en:'Mirror Garden',seconds:65,quota:60,pace:3.3,band:1,patterns:[2,6],hint:'mirror'},
  {id:'tide',ja:'満ちる光',en:'High Tide',seconds:70,quota:70,pace:3.1,band:2,patterns:[3,4,6,7],hint:'surge'},
  {id:'crown',ja:'冠を咲かせる',en:'Crown Bloom',seconds:90,pace:4.2,band:2,patterns:[0,7],hint:'crown'}
]);
export const PRE_FINALE=STAGES.slice(0,-1).reduce((n,s)=>n+s.seconds,0);
export const DURATION=PRE_FINALE+STAGES.at(-1).seconds;
const shapes=[
  [['relay',0,0],['soft',-48,-26],['soft',48,26],['soft',-48,26]],
  [['relay',0,0],['soft',-45,-50],['soft',-62,0],['soft',-45,50]],
  [['armor',0,-63],['relay',0,0],['soft',0,62],['soft',-55,12]],
  [['relay',0,0],['armor',-58,0],['soft',42,-35],['soft',42,35]],
  [['skater',-64,-40],['relay',0,0],['skater',64,40],['soft',52,-40]],
  [['relay',0,0],['skater',-50,-54],['skater',-50,54],['armor',58,0]],
  [['relay',0,0],['soft',-55,-55],['soft',55,55],['armor',55,-55],['armor',-55,55]],
  [['relay',0,-55],['relay',0,55],['skater',-66,0],['skater',66,0],['soft',-48,48]]
];
export function packet(g){
  const stage=STAGES[g.stage],id=stage.patterns[Math.floor(g.rng()*stage.patterns.length)];
  const zones=[[126,220],[414,220],[124,560],[416,560],[270,230],[270,592]];
  const candidates=zones.filter(([x,y])=>Math.hypot(x-g.p.x,y-g.p.y)>150);
  const [cx,cy]=candidates[Math.floor(g.rng()*candidates.length)];
  const a=(g.rng()-.5)*.75+(cx>270?Math.PI:0),c=Math.cos(a),s=Math.sin(a);
  const types=shapes[id].map(([type,x,y])=>({type,x:Math.max(68,Math.min(472,cx+x*c-y*s)),y:Math.max(154,Math.min(660,cy+x*s+y*c))}));
  // Opening introduces relays after a few launches, not with a text interruption.
  if(g.stage===0&&g.t<10)for(const e of types)if(e.type==='relay')e.type='soft';
  return {name:'garden-'+id,targets:types};
}
export function rails(stage,variant=0){
  if(stage<4||stage===6)return [];
  return variant%2===0?[{x:177,y:300,w:7,h:112},{x:356,y:464,w:7,h:112}]:[{x:118,y:337,w:112,h:7},{x:310,y:520,w:112,h:7}];
}
export function thorns(stage,variant=0){
  if(stage<3||stage===4)return [];
  const points=variant%2===0?[[178,454],[372,318]]:[[166,315],[374,518]];
  return points.map(([x,y],i)=>({x,y,r:34,offset:i*3.6}));
}
export function thornPhase(g,h){return(g.t-g.stageAt+h.offset)%8;}
export function crownLayout(g){
  const circuit=g.circuit,swap=(g.seed+circuit)%2===0;
  const centers=circuit===0?[[115,226],[425,226],[115,580],[425,580]]:circuit===1?[[125,380],[415,380],[270,188],[270,610]]:swap?[[110,250],[430,520],[170,606],[370,184]]:[[430,250],[110,520],[370,606],[170,184]];
  return centers.map(([x,y])=>({type:'armor',x,y,seal:true,homeX:x,homeY:y}));
}
