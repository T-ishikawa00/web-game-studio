export const SAVE_KEY='rimbloom.complete-r2.records.v2';
export const SETTINGS_KEY='rimbloom.complete-r2.settings.v1';
const empty=()=>({best:0,chain:0,runs:0,clears:0,stage:0,time:0,last:0});
const blank=()=>({version:2,normal:empty(),wild:empty(),assist:empty()});
const int=(v,max)=>Number.isSafeInteger(v)&&v>=0&&v<=max;
export function validRecord(v){return v&&int(v.best,1e9)&&int(v.last,1e9)&&v.last<=v.best&&int(v.chain,26)&&int(v.runs,1e6)&&int(v.clears,v.runs)&&int(v.stage,7)&&int(v.time,450000);}
function parse(raw){if(raw===null)return blank();if(typeof raw!=='string'||raw.length>=2048)throw Error('corrupt');const v=JSON.parse(raw);if(v?.version!==2||!['normal','wild','assist'].every(k=>validRecord(v[k])))throw Error('corrupt');return {version:2,...Object.fromEntries(['normal','wild','assist'].map(k=>[k,Object.fromEntries(Object.keys(empty()).map(key=>[key,v[k][key]]))]))};}
export class JourneyRecords{
  constructor(storage){this.data=blank();this.available=false;this.blockedReason='unavailable';try{this.storage=storage===undefined?window.localStorage:storage;if(!this.storage)return;this.observed=this.storage.getItem(SAVE_KEY);try{this.data=parse(this.observed);}catch{this.blockedReason='corrupt';return;}this.available=true;this.blockedReason=null;}catch{this.storage=null;}}
  result(g){const d=this.data[g.route];if(!d||!['won','lost'].includes(g.status)||!int(g.score,1e9)||!int(g.bestChain,26)||!Number.isFinite(g.t)||g.t<0||g.t>450)return;
    if(this.available)try{const raw=this.storage.getItem(SAVE_KEY);if(raw===null&&this.observed!==null){this.available=false;this.blockedReason='reset';}else{const latest=parse(raw);for(const k of ['normal','wild','assist'])Object.assign(this.data[k],latest[k]);this.observed=raw;}}catch{this.available=false;this.blockedReason='corrupt';}
    const time=Math.round(g.t*1000),won=g.status==='won';Object.assign(d,{best:Math.max(d.best,g.score),last:g.score,chain:Math.max(d.chain,g.bestChain),runs:Math.min(1e6,d.runs+1),clears:Math.min(1e6,d.clears+Number(won)),stage:Math.max(d.stage,won?7:g.stage+1),time:won?d.time?Math.min(d.time,time):time:d.time});if(!this.available)return;try{const raw=JSON.stringify(this.data);this.storage.setItem(SAVE_KEY,raw);if(this.storage.getItem(SAVE_KEY)!==raw)throw Error();this.observed=raw;}catch{this.available=false;this.blockedReason='unavailable';}
  }
}
export class Settings{
  constructor(storage){this.available=false;this.data={lang:null,muted:false,reduced:null,contrast:false};try{this.storage=storage===undefined?window.localStorage:storage;const raw=this.storage?.getItem(SETTINGS_KEY);if(raw&&raw.length<300){const v=JSON.parse(raw);if(v?.version===1){if(['ja','en'].includes(v.lang))this.data.lang=v.lang;for(const k of ['muted','reduced','contrast'])if(typeof v[k]==='boolean')this.data[k]=v[k];}}this.available=Boolean(this.storage);}catch{this.storage=null;}}
  write(values){Object.assign(this.data,values);try{this.storage?.setItem(SETTINGS_KEY,JSON.stringify({version:1,...this.data}));}catch{this.available=false;}}
}
export function rank(g){if(g.status!=='won')return '—';return g.score>=100000&&g.bestChain>=12?'S':g.score>=65000&&g.bestChain>=8?'A':g.score>=35000?'B':'C';}
