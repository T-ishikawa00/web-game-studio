import {HILL_NODES,hillEdges,groundHeight,type Connection,type Outlook} from './hill-layout';
import {COVE_NODES,COVE_EDGES,type CovePlot} from './layout';
export type Job='idle'|'wood'|'build'|'trade';
export type Build='dock'|'lumber'|'market'|'house'|'expansion'|'cove'|'commons'|'promenade'|'hillpath'|'lookout';
export type Plot='coast'|'village'|'sea'|'shade'|Connection|Outlook;
export type Leisure={stops:number[],index:number,dwell:number};
export type Point=[number,number];
export type Worker={id:number,job:Job,x:number,z:number,angle:number,phase:'walk'|'work'|'deliver',route:Point[],anchor:Point,clock:number,leisure:Leisure|null,visits:number};
export type State={schemaVersion:4,hillpath:Connection|null,lookout:Outlook|null,cove:boolean,commons:CovePlot|null,promenade:boolean,wood:number,coins:number,dock:boolean,lumber:boolean,house:boolean,market:'coast'|'village'|null,expanded:boolean,plan:{kind:Build,plot:Plot,wood:number}|null,priority:'construction'|'shipment',project:{kind:Build,plot:Plot,work:number}|null,order:number|null,courier:number|null,workers:Worker[],settings:{lang:'ja'|'en',mute:boolean,reduced:boolean,low:boolean},elapsed:number};
export const BALANCE={dock:{wood:8,coins:0,work:16},lumber:{wood:6,coins:2,work:12},market:{wood:10,coins:8,work:18},house:{wood:12,coins:10,work:20},expansion:{wood:14,coins:18,work:18},cove:{wood:12,coins:8,work:24},commons:{wood:12,coins:8,work:24},promenade:{wood:8,coins:8,work:24},hillpath:{wood:12,coins:6,work:20},lookout:{wood:8,coins:6,work:18}} as const;
export const SAVE_KEY='tinlumo:game005:island:hillside:r1';
const hub:Point=[0,.85];
const worker=(id:number):Worker=>({id,job:'idle',x:0,z:.85,angle:0,phase:'work',route:[],anchor:[0,.85],clock:0,leisure:null,visits:0});
export function fresh():State{return {schemaVersion:4,hillpath:null,lookout:null,cove:false,commons:null,promenade:false,wood:10,coins:4,dock:false,lumber:false,house:false,market:null,expanded:false,plan:null,priority:'construction',project:null,order:null,courier:null,workers:[worker(0),worker(1)],settings:{lang:'ja',mute:true,reduced:false,low:false},elapsed:0};}
export function goals(s:State){return [s.dock,!!s.market&&s.house,s.expanded,s.cove,!!s.commons&&s.promenade,!!s.hillpath&&!!s.lookout];}
export function built(s:State,b:Build){return b==='expansion'?s.expanded:!!s[b];}
export function canBuild(s:State,b:Build):'ok'|'busy'|'built'|'locked'|'resources'{if(s.project||s.plan)return 'busy';if(built(s,b))return 'built';if((b==='market'||b==='house')&&!s.dock||b==='expansion'&&(!s.house||!s.market)||b==='cove'&&!s.expanded||(b==='commons'||b==='promenade')&&!s.cove||b==='hillpath'&&(!s.commons||!s.promenade)||b==='lookout'&&!s.hillpath)return 'locked';return s.coins>=BALANCE[b].coins?'ok':'resources';}
function destination(s:State,job:Job):Point{if(job==='wood')return [-3.6,-.3];if(job==='build'){switch(s.project?.kind){case'dock':return [3.05,4.15];case'lumber':return [-3.5,2.65];case'market':return s.project.plot==='coast'?[2.8,2.15]:[-.9,3.8];case'house':return [-.85,.66];case'expansion':return [5.0,-1.05];case'hillpath':return s.project.plot==='village-link'?HILL_NODES[0]:HILL_NODES[7];case'lookout':return s.project.plot==='sea-view'?HILL_NODES[4]:HILL_NODES[5];case'cove':return COVE_NODES[1];case'commons':return s.project.plot==='shade'?COVE_NODES[6]:COVE_NODES[3];case'promenade':return COVE_NODES[2];}}if(job==='trade')return s.market==='coast'?[2.8,2.15]:s.market==='village'?[-.9,3.8]:[3.6,4.58];return hub;}
// Undirected fixed paths. A mid-edge reassignment may reach either endpoint,
// never cut across a building. Garden approach has worker-radius clearance.
export const NODES:Point[]=[hub,[-3.6,.65],[-3.6,-.3],[-3.05,.15],[-2.35,.85],[-2.35,2.65],[-3.5,2.65],[1.1,2.35],[2.8,2.15],[.48,3.85],[-.9,3.8],[2.35,3.6],[3.05,4.15],[3.6,4.58],[-.85,.66],[3.55,-.5],[5,-1.05],...COVE_NODES,...HILL_NODES];
export const EDGES=[[0,1],[1,2],[2,3],[3,1],[0,4],[4,5],[5,6],[0,7],[7,8],[7,9],[9,10],[7,11],[11,12],[12,13],[0,14],[0,15],[15,16],...COVE_EDGES,[0,33],[16,40]];
const nodeId=(p:Point)=>NODES.findIndex(n=>Math.hypot(n[0]-p[0],n[1]-p[1])<.001);
function validRoute(s:State,w:Worker){const ids=[nodeId(w.anchor),...w.route.map(nodeId)],edges=[...EDGES,...(s.hillpath?hillEdges(s.hillpath):[])];return ids.every((n,i)=>i===0||n===ids[i-1]||edges.some(e=>e.includes(n)&&e.includes(ids[i-1])));}
function shortest(from:Point,to:Point,s?:State){const start=nodeId(from),end=nodeId(to),distance=NODES.map(()=>Infinity),previous=NODES.map(()=>-1),visited=new Set<number>();distance[start]=0;for(let j=0;j<NODES.length;j++){let u=-1;for(let i=0;i<NODES.length;i++)if(!visited.has(i)&&(u<0||distance[i]<distance[u]))u=i;if(u<0||!Number.isFinite(distance[u]))break;visited.add(u);if(u===end)break;for(const e of [...EDGES,...(s?.hillpath?hillEdges(s.hillpath):[])]){if(s?.promenade&&s.commons!=='shade'&&e[0]===19&&e[1]===28)continue;const v=e[0]===u?e[1]:e[1]===u?e[0]:-1;if(v<0)continue;const d=distance[u]+Math.hypot(NODES[v][0]-NODES[u][0],NODES[v][1]-NODES[u][1]);if(d<distance[v]){distance[v]=d;previous[v]=u;}}}if(!Number.isFinite(distance[end]))throw Error('Unreachable authored path');const route:Point[]=[];for(let n=end;n!==start&&n>=0;n=previous[n])route.unshift([...NODES[n]]);return {distance:distance[end],route};}
function moveTo(s:State,w:Worker,job:Job){if(s.courier===w.id&&job!=='trade'){s.courier=null;s.order=0;}w.leisure=null;const next=destination(s,job),candidates=[w.anchor,...(w.route.length?[w.route[0]]:[])];const paths=candidates.map(p=>({p,...shortest(p,next,s),approach:Math.hypot(w.x-p[0],w.z-p[1])})).sort((a,b)=>(a.distance+a.approach)-(b.distance+b.approach));const best=paths[0];w.route=[best.p,...best.route].map(p=>[...p] as Point);w.job=job;w.phase='walk';w.clock=0;}
export function assign(s:State,id:number,job:Job){const w=s.workers.find(w=>w.id===id);if(!w||!['idle','wood','build','trade'].includes(job)||w.job===job)return false;if(job==='build'&&!s.project||job==='trade'&&!s.dock)return false;moveTo(s,w,job);return true;}
export function startBuild(s:State,kind:Build,plot:Plot='coast'){if(!(kind in BALANCE)||!validPlot(kind,plot)||canBuild(s,kind)!=='ok')return false;const c=BALANCE[kind],held=Math.min(c.wood,s.wood);s.wood-=held;s.coins-=c.coins;s.plan={kind,plot,wood:held};prepare(s);return true;}
export function cancelBuild(s:State){const p=s.project||s.plan;if(!p)return false;const c=BALANCE[p.kind];s.wood+=s.plan?s.plan.wood:c.wood;s.coins+=c.coins;for(const w of s.workers)if(w.job==='build')moveTo(s,w,'idle');s.project=null;s.plan=null;return true;}
export function sell(s:State){if(!s.dock||s.order!==null||s.wood<4)return false;s.wood-=4;s.order=0;return true;}
export function cancelOrder(s:State){if(s.order===null)return false;s.wood+=4;const id=s.courier;s.courier=null;s.order=null;if(id!==null)moveTo(s,s.workers[id],'trade');return true;}
export function relocate(s:State,plot:Plot){if(!s.market||s.market===plot||!['coast','village'].includes(plot)||s.project||s.plan||s.order!==null)return false;s.market=plot as 'coast'|'village';for(const w of s.workers)if(w.job==='trade')moveTo(s,w,'trade');return true;}
export const STOCK_TARGET=24;
function prepare(s:State){if(!s.plan)return;const p=s.plan,c=BALANCE[p.kind],take=Math.min(s.wood,c.wood-p.wood);s.wood-=take;p.wood+=take;if(p.wood===c.wood){s.project={kind:p.kind,plot:p.plot,work:0};s.plan=null;}}
// Assignment is automatic and stable until an arrival, delivery, or work beat.
// At most 2 builders, 1 courier, 2 gatherers. Cash only follows explicit shipments.
export function schedule(s:State){prepare(s);const slots:Job[]=[];const build=()=>{if(s.project)slots.push('build','build');},trade=()=>{if(s.order!==null)slots.push('trade');};if(s.priority==='shipment'){trade();build();}else{build();trade();}if(s.plan||s.wood<STOCK_TARGET)slots.push('wood','wood');
 const locked=new Set<number>();for(const w of s.workers){const valid=w.job==='wood'||w.job==='build'&&!!s.project||w.job==='trade'&&s.order!==null;const committed=valid&&(w.phase==='deliver'||w.phase==='walk'||w.job==='wood'&&w.clock>0||w.job==='build'&&w.clock>0);if(committed){locked.add(w.id);const i=slots.indexOf(w.job);if(i>=0)slots.splice(i,1);}}
 // Retain matching work first. Idle agents take the remaining highest priority task.
 const free=s.workers.filter(w=>!locked.has(w.id)).sort((a,b)=>Number(!!a.leisure)-Number(!!b.leisure)),wanted=slots.slice(0,free.length);for(const w of free){const i=wanted.indexOf(w.job);if(i>=0){wanted.splice(i,1);locked.add(w.id);}}
 for(const w of free)if(!locked.has(w.id)){const job=wanted.shift()||'idle';if(job!==w.job)moveTo(s,w,job);}
}
export function prioritize(s:State,p:State['priority']){if(!['construction','shipment'].includes(p))return false;s.priority=p;return true;}
export type Event='wood'|'trade'|'complete'|'work';
function complete(s:State){const p=s.project!;for(const w of s.workers)if(w.job==='build')moveTo(s,w,'idle');if(p.kind==='expansion')s.expanded=true;else if(p.kind==='market'){for(const w of s.workers)if(w.job==='trade')moveTo(s,w,'idle');s.market=p.plot as 'coast'|'village';}else if(p.kind==='hillpath')s.hillpath=p.plot as Connection;else if(p.kind==='lookout')s.lookout=p.plot as Outlook;else if(p.kind==='commons')s.commons=p.plot as CovePlot;else s[p.kind]=true;s.project=null;if(p.kind==='house')s.workers.push(worker(2));}
export function tick(s:State,dt:number):Event[]{if(!Number.isFinite(dt)||dt<=0)return [];dt=Math.min(dt,.1);schedule(s);s.elapsed+=dt;const events:Event[]=[];for(const w of s.workers){
 if(w.job==='idle')idleLife(s,w,dt);
 if(w.phase==='walk'||w.phase==='deliver'){let remaining=dt*1.9;while(w.route.length&&remaining>0){const p=w.route[0],dx=p[0]-w.x,dz=p[1]-w.z,d=Math.hypot(dx,dz,groundHeight(p[0],p[1])-groundHeight(w.x,w.z));w.angle=Math.atan2(dx,dz);if(d<=remaining){w.x=p[0];w.z=p[1];w.anchor=[...p];w.route.shift();remaining-=d;}else{w.x+=dx/d*remaining;w.z+=dz/d*remaining;remaining=0;}}
 if(!w.route.length){if(w.phase==='deliver'&&w.job==='wood'){s.wood=Math.min(999999,s.wood+2);events.push('wood');w.job='idle';w.phase='work';w.clock=0;}else if(w.phase==='deliver'&&w.job==='trade'&&s.courier===w.id&&s.order!==null){s.coins=Math.min(999999,s.coins+(s.market?8:6));s.order=null;s.courier=null;events.push('trade');w.job='idle';w.phase='work';w.clock=0;}else{w.phase='work';w.clock=0;}}continue;}
 if(w.job==='wood'){w.clock+=dt;if(w.clock>=(s.lumber?1.7:3)){w.clock=0;w.phase='deliver';w.route=[[-3.05,.15]];}}
 if(w.job==='build'&&s.project){w.clock+=dt;if(w.clock>=2)w.clock=0;const beat=Math.floor(s.project.work/2);s.project.work+=dt;if(Math.floor(s.project.work/2)!==beat)events.push('work');if(s.project.work>=BALANCE[s.project.kind].work){complete(s);events.push('complete');}}
 if(w.job==='trade'&&s.dock&&s.order!==null&&s.courier===null){s.order=Math.min(6,s.order+dt);if(s.order>=6){s.courier=w.id;w.phase='deliver';w.route=[...shortest(w.anchor,[3.6,4.58],s).route,[3.6,4.58]];w.clock=0;}}
 }return events;}
const finite=(n:unknown,min:number,max:number)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
export function validate(value:unknown):value is State{try{const s=value as State;if(!s||s.schemaVersion!==4||!finite(s.wood,0,999999)||!finite(s.coins,0,999999)||!Number.isInteger(s.wood)||!Number.isInteger(s.coins)||!finite(s.elapsed,0,1e10))return false;for(const key of ['dock','lumber','house','expanded','cove','promenade'] as const)if(typeof s[key]!=='boolean')return false;if(s.hillpath!==null&&!['village-link','cove-link'].includes(s.hillpath)||s.lookout!==null&&!['sea-view','town-view'].includes(s.lookout)||s.hillpath&&(!s.commons||!s.promenade)||s.lookout&&!s.hillpath)return false;if(s.market!==null&&!['coast','village'].includes(s.market))return false;if(s.commons!==null&&!['sea','shade'].includes(s.commons)||s.cove&&!s.expanded||(s.commons||s.promenade)&&!s.cove)return false;if((s.house||s.market)&&!s.dock||s.expanded&&(!s.house||!s.market))return false;if(!s.settings||!['ja','en'].includes(s.settings.lang)||['mute','reduced','low'].some(k=>typeof s.settings[k as 'mute']!=='boolean'))return false;
 if(!['construction','shipment'].includes(s.priority)||s.plan===undefined||s.project===undefined||s.plan&&s.project)return false;if(s.plan){const p=s.plan;if(!(p.kind in BALANCE)||!validPlot(p.kind,p.plot)||built(s,p.kind)||!Number.isInteger(p.wood)||!finite(p.wood,0,BALANCE[p.kind].wood-1)||(p.kind==='market'||p.kind==='house')&&!s.dock||p.kind==='expansion'&&(!s.house||!s.market)||p.kind==='cove'&&!s.expanded||(p.kind==='commons'||p.kind==='promenade')&&!s.cove||p.kind==='hillpath'&&(!s.commons||!s.promenade)||p.kind==='lookout'&&!s.hillpath)return false;}
 if(s.workers?.filter(w=>w.job==='trade').length>1||s.workers?.filter(w=>w.job==='build').length>2||s.workers?.filter(w=>w.job==='wood').length>2)return false;
 if(s.project){if(!(s.project.kind in BALANCE)||!validPlot(s.project.kind,s.project.plot)||built(s,s.project.kind)||!finite(s.project.work,0,BALANCE[s.project.kind].work))return false;if((s.project.kind==='market'||s.project.kind==='house')&&!s.dock||s.project.kind==='expansion'&&(!s.house||!s.market)||s.project.kind==='cove'&&!s.expanded||(s.project.kind==='commons'||s.project.kind==='promenade')&&!s.cove||s.project.kind==='hillpath'&&(!s.commons||!s.promenade)||s.project.kind==='lookout'&&!s.hillpath)return false;}
 if(s.order!==null&&(!s.dock||!finite(s.order,0,6)))return false;if(!Array.isArray(s.workers)||s.workers.length!==(s.house?3:2))return false;if(s.courier!==null&&(!Number.isInteger(s.courier)||!s.workers[s.courier]||s.workers[s.courier].job!=='trade'||s.workers[s.courier].phase!=='deliver'||s.order!==6))return false;
 return s.workers.every((w,i)=>validRoute(s,w)&&validLeisure(s,w)&&Number.isInteger(w.visits)&&finite(w.visits,0,1e9)&&w.id===i&&['idle','wood','build','trade'].includes(w.job)&&['walk','work','deliver'].includes(w.phase)&&finite(w.x,-12,12)&&finite(w.z,-8,8)&&finite(w.angle,-Math.PI,Math.PI)&&finite(w.clock,0,7)&&Array.isArray(w.anchor)&&nodeId(w.anchor)>=0&&(s.hillpath||nodeId(w.anchor)<34||nodeId(w.anchor)===40)&&Array.isArray(w.route)&&w.route.length<32&&w.route.every(p=>Array.isArray(p)&&p.length===2&&finite(p[0],-12,12)&&finite(p[1],-8,8)&&nodeId(p)>=0&&(s.hillpath||nodeId(p)<34||nodeId(p)===40))&&(w.job!=='build'||!!s.project)&&(w.job!=='trade'||s.dock)&&(w.phase!=='deliver'||w.job==='wood'||s.courier===w.id)&&((w.phase==='work')===(w.route.length===0)));
 }catch{return false;}}

export function validPlot(kind:Build,plot:Plot){return kind==='hillpath'?['village-link','cove-link'].includes(plot):kind==='lookout'?['sea-view','town-view'].includes(plot):kind==='commons'?['sea','shade'].includes(plot):['coast','village'].includes(plot);}
export function moveCommons(s:State,plot:CovePlot){
 if(!s.commons||s.commons===plot||!['sea','shade'].includes(plot)||s.project||s.plan||s.order!==null)return false;
 s.commons=plot;
 // Residents walk home from their real edge; no teleport or stale seat ownership.
 for(const w of s.workers)if(w.leisure){moveTo(s,w,'idle');w.clock=0;}
 return true;
}
function validLeisure(s:State,w:Worker){
 const l=w.leisure;if(l===null)return true;
 if(!l||w.job!=='idle'||!s.expanded||!Array.isArray(l.stops)||l.stops.length<2||l.stops.length>7||!Number.isInteger(l.index)||l.index<0||l.index>=l.stops.length||!finite(l.dwell,0,20))return false;
 const allowed=s.hillpath&&s.lookout?[0,7,9,10,15,16,17,18,22,24,...(s.commons==='sea'?[21,26]:[23,27]),36,s.lookout==='sea-view'?37:38,...(s.hillpath==='cove-link'?[41]:[]),33]:s.cove?[0,17,18,...(s.promenade?[22,24]:[]),...(s.commons==='sea'?[21,26]:s.commons==='shade'?[23,27]:[])]:[0,17];
 if(!l.stops.every(n=>Number.isInteger(n)&&allowed.includes(n)))return false;
 const target=NODES[l.stops[l.index]];if(w.phase==='work'&&(Math.hypot(w.x-target[0],w.z-target[1])>.001||nodeId(w.anchor)!==l.stops[l.index]))return false;
 if(w.phase==='walk'&&nodeId(w.route.at(-1)!)!==l.stops[l.index])return false;
 return true;
}
function idleLife(s:State,w:Worker,dt:number){
 if(!s.expanded||w.phase!=='work')return;
 if(!w.leisure){
  w.clock=Math.min(6,w.clock+dt);if(w.clock<2+w.id*1.2)return;w.clock=0;
  const used=new Set(s.workers.flatMap(v=>v.leisure?.stops||[]));
  const candidates=s.commons==='sea'?[21,26]:[23,27],seat=candidates.find(n=>!used.has(n));
  const oldSeat=seat;const hillSeat=s.lookout==='sea-view'?37:38;
  const tour=(w.visits+w.id)%3;
  const hillStops=s.hillpath==='village-link'?[hillSeat,...(oldSeat===undefined?[]:[oldSeat]),s.market==='village'?10:7,0]:[...(oldSeat===undefined?[]:[oldSeat]),hillSeat,s.market==='village'?10:7,0];
  const stops:number[]=s.hillpath&&s.lookout?(tour===2?[s.market==='village'?10:7,0]:!used.has(hillSeat)?hillStops:[24,...(oldSeat===undefined?[]:[oldSeat]),0]):s.commons&&seat!==undefined?(s.promenade?(s.commons==='sea'?[seat,22,24,0]:[24,seat,22,0]):[seat,0]):s.promenade?[22,24,0]:s.cove?[18,0]:[17,0];
  // Leave at least one worker near the original village until both projects exist.
  if(!(s.commons&&s.promenade)&&s.workers.some(v=>v.id!==w.id&&v.leisure))return;
  w.leisure={stops,index:0,dwell:0};w.visits++;leisureMove(s,w);return;
 }
 const l=w.leisure,target=l.stops[l.index];
 l.dwell+=dt;
 const sitting=[21,26,23,27,37,38].includes(target),duration=target===0?1:sitting?6+w.id:2.5+w.id*.4;
 if(l.dwell<duration)return;
 if(++l.index>=l.stops.length){w.leisure=null;w.clock=0;return;}
 l.dwell=0;leisureMove(s,w);
}
function leisureMove(s:State,w:Worker){
 const target=NODES[w.leisure!.stops[w.leisure!.index]];
 w.route=shortest(w.anchor,target,s).route.map(p=>[...p] as Point);w.phase=w.route.length?'walk':'work';w.clock=0;
}
export function leisurePose(w:Worker):'sit'|'look'|null{
 if(w.job!=='idle'||w.phase!=='work'||!w.leisure)return null;
 const n=w.leisure.stops[w.leisure.index];return [21,26,23,27,37,38].includes(n)?'sit':n===0?null:'look';
}
