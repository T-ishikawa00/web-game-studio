const KEY='rimbloom.full-r1.local-records.v1';
const blank=()=>({version:1,best:0,bestChain:0,lastScore:0,runs:0});
function valid(v){return v&&v.version===1&&['best','bestChain','lastScore','runs'].every(k=>Number.isSafeInteger(v[k])&&v[k]>=0)&&v.best<=1e9&&v.lastScore<=v.best&&v.bestChain<=26&&v.runs<=1e6;}
// Same schema, key and score semantics. Invalid raw data stays in its original key until an explicit reset.
export class Records{
 constructor(storage){
  this.data=blank();this.available=false;this.blockedReason='unavailable';
  try{
   this.storage=storage===undefined?window.localStorage:storage;
   if(!this.storage)return;
   const text=this.storage.getItem(KEY);
   if(text!==null){
    let value;try{if(text.length>=400)throw Error();value=JSON.parse(text);}catch{this.blockedReason='corrupt';return;}
    if(!valid(value)){this.blockedReason='corrupt';return;}
    this.data={version:1,best:value.best,bestChain:value.bestChain,lastScore:value.lastScore,runs:value.runs};
   }
   this.available=true;this.blockedReason=null;
  }catch{this.storage=null;}
 }
 result(score,chain){
  if(!Number.isSafeInteger(score)||score<0||score>1e9||!Number.isSafeInteger(chain)||chain<0||chain>26)return;
  this.data={version:1,best:Math.max(this.data.best,score),bestChain:Math.max(this.data.bestChain,chain),lastScore:score,runs:Math.min(1e6,this.data.runs+1)};
  if(!this.available)return;
  try{const serialized=JSON.stringify(this.data);this.storage.setItem(KEY,serialized);if(this.storage.getItem(KEY)!==serialized)throw Error();}catch{this.available=false;this.blockedReason='unavailable';}
 }
 reset(){
  this.data=blank();
  try{if(!this.storage)throw Error();this.storage.removeItem(KEY);if(this.storage.getItem(KEY)!==null)throw Error();this.available=true;this.blockedReason=null;}catch{this.available=false;this.blockedReason='unavailable';}
 }
}
