const KEY='rimbloom.full-r1.local-records.v1';
const blank=()=>({version:1,best:0,bestChain:0,lastScore:0,runs:0});
function valid(v){return v&&v.version===1&&['best','bestChain','lastScore','runs'].every(k=>Number.isSafeInteger(v[k])&&v[k]>=0)&&v.best<=1e9&&v.lastScore<=v.best&&v.bestChain<=26&&v.runs<=1e6;}
export class Records{
  constructor(storage){this.data=blank();this.available=false;try{this.storage=storage===undefined?window.localStorage:storage;const text=this.storage?.getItem(KEY);if(text&&text.length<400){const v=JSON.parse(text);if(valid(v))this.data={version:1,best:v.best,bestChain:v.bestChain,lastScore:v.lastScore,runs:v.runs};}this.available=Boolean(this.storage);}catch{this.storage=null;}}
  result(score,chain){if(!Number.isSafeInteger(score)||score<0||score>1e9||!Number.isSafeInteger(chain)||chain<0||chain>26)return;this.data={version:1,best:Math.max(this.data.best,score),bestChain:Math.max(this.data.bestChain,chain),lastScore:score,runs:Math.min(1e6,this.data.runs+1)};try{this.storage?.setItem(KEY,JSON.stringify(this.data));}catch{this.available=false;}}
  reset(){this.data=blank();try{this.storage?.removeItem(KEY);}catch{this.available=false;}}
}
