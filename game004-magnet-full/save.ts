import type {MissionId} from './missions';
export const SAVE_KEY='tinlumo.game004.magnet.full.v1';
export const CONTENT_VERSION='magnet-full-r1';
export type Settings={locale:'ja'|'en';muted:boolean;reducedMotion:boolean};
export type Checkpoint={mission:MissionId;zone:number;seed:number;elapsed:number;hp:number;maxHp:number;upgrade:number;build:'base'|'swarm'|'lance';form:string;modules:string[];evolution:number;armor:number;repairKills:number;kills:number;shots:number;nx:number;ny:number;scraps:{kind:number;salvaged:boolean;reward:boolean;reserved:boolean;orbit:boolean;earnedStage:number}[]};
export type RecordEntry={clears:number;best:number;form:string};
export type SaveData={schemaVersion:1;contentVersion:typeof CONTENT_VERSION;settings:Settings;unlocked:MissionId[];records:Partial<Record<MissionId,RecordEntry>>;run:Checkpoint|null};
type StoragePort=Pick<Storage,'getItem'|'setItem'|'removeItem'>;
const mission=(x:unknown):x is MissionId=>x==='A'||x==='B'||x==='C';
const finite=(x:unknown,a:number,b:number)=>typeof x==='number'&&Number.isFinite(x)&&x>=a&&x<=b;
const integer=(x:unknown,a:number,b:number)=>finite(x,a,b)&&Number.isInteger(x);
const obj=(x:unknown):x is Record<string,any>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const forms=['','cyclone','satellite','return','foundry'];
export function validCheckpoint(x:unknown):x is Checkpoint {
 if(!obj(x)||!mission(x.mission)||!integer(x.zone,0,5)||!integer(x.seed,0,4294967295)||!finite(x.elapsed,0,86400)||!integer(x.hp,1,7)||!integer(x.maxHp,6,7)||x.hp>x.maxHp||!integer(x.upgrade,0,3)||!['base','swarm','lance'].includes(x.build)||!forms.includes(x.form)||!integer(x.evolution,0,2)||!integer(x.repairKills,0,100000)||!integer(x.armor,0,100000)||!integer(x.kills,0,100000)||!integer(x.shots,0,100000)||!finite(x.nx,0,1)||!finite(x.ny,0,1))return false;
 if(!Array.isArray(x.modules)||x.modules.length>2||new Set(x.modules).size!==x.modules.length||!x.modules.every((m:unknown)=>['field','brake','drive','shock'].includes(String(m))))return false;
 if((x.zone<2&&x.build!=='base')||(x.zone>=2&&x.build==='base')||(x.zone<5&&x.form!=='')||(x.zone===5&&x.form===''))return false;
 if(x.form&&(x.build==='swarm'?!['cyclone','satellite'].includes(x.form):!['return','foundry'].includes(x.form)))return false;
 if(x.evolution!==(x.zone<2?0:x.zone<5?1:2)||x.modules.length!==(x.zone===0?0:x.zone<=2?1:2))return false;
 const capacity=x.build==='swarm'?(x.evolution===2?30:24):x.build==='lance'?12:x.upgrade?16:11;
 return Array.isArray(x.scraps)&&x.scraps.filter((s:any)=>s?.orbit===true).length<=capacity&&x.scraps.filter((s:any)=>s?.reserved===true).length<=(x.form==='satellite'?4:0)&&x.scraps.length>0&&x.scraps.length<=70&&x.scraps.every((s:unknown)=>obj(s)&&integer(s.kind,0,2)&&typeof s.salvaged==='boolean'&&typeof s.reward==='boolean'&&typeof s.reserved==='boolean'&&typeof s.orbit==='boolean'&&integer(s.earnedStage,-1,5));
}
export function validSave(x:unknown):x is SaveData {
 if(!obj(x)||x.schemaVersion!==1||x.contentVersion!==CONTENT_VERSION||!obj(x.settings)||!['ja','en'].includes(x.settings.locale)||typeof x.settings.muted!=='boolean'||typeof x.settings.reducedMotion!=='boolean')return false;
 if(!Array.isArray(x.unlocked)||!x.unlocked.length||x.unlocked.length>3||x.unlocked[0]!=='A'||!x.unlocked.every(mission)||new Set(x.unlocked).size!==x.unlocked.length||x.unlocked.includes('C')&&!x.unlocked.includes('B'))return false;
 if(!obj(x.records)||!Object.entries(x.records).every(([m,r])=>mission(m)&&obj(r)&&integer(r.clears,1,100000)&&finite(r.best,0,86400)&&forms.includes(r.form)))return false;
 if(x.unlocked.includes('B')&&!x.records.A||x.unlocked.includes('C')&&!x.records.B)return false;
 return x.run===null||(validCheckpoint(x.run)&&x.unlocked.includes(x.run.mission));
}
export const defaults=():SaveData=>({schemaVersion:1,contentVersion:CONTENT_VERSION,settings:{locale:'ja',muted:false,reducedMotion:false},unlocked:['A'],records:{},run:null});
export class SaveStore {
 data=defaults();status:'saved'|'memory'|'corrupt'|'conflict'='memory';private original:string|null=null;private writable=true;
 constructor(private storage:StoragePort|null){try{if(!storage)throw Error();this.original=storage.getItem(SAVE_KEY);if(this.original!==null){const parsed=JSON.parse(this.original);if(!validSave(parsed)){this.status='corrupt';this.writable=false;return;}this.data=parsed;}this.status='saved';}catch{if(this.original!==null){this.status='corrupt';this.writable=false;}else this.status='memory';}}
 get hasSave(){return this.original!==null&&this.status!=='corrupt';}
 change(mutator:(data:SaveData)=>void){const next=structuredClone(this.data);mutator(next);if(!validSave(next)){this.status='memory';return false;}this.data=next;if(!this.writable||!this.storage)return false;try{if(this.storage.getItem(SAVE_KEY)!==this.original){this.status='conflict';this.writable=false;return false;}const serialized=JSON.stringify(next);this.storage.setItem(SAVE_KEY,serialized);if(this.storage.getItem(SAVE_KEY)!==serialized)throw Error('Readback mismatch');this.original=serialized;this.status='saved';return true;}catch{this.status='memory';return false;}}
 checkpoint(run:Checkpoint){return this.change(d=>{d.run=run;});}
 endRun(){return this.change(d=>{d.run=null;});}
 clear(missionId:MissionId,seconds:number,form:string){return this.change(d=>{const old=d.records[missionId];d.records[missionId]={clears:(old?.clears??0)+1,best:Math.min(old?.best??Infinity,seconds),form:!old||seconds<old.best?form:old.form};if(missionId==='A'&&!d.unlocked.includes('B'))d.unlocked.push('B');if(missionId==='B'&&!d.unlocked.includes('C'))d.unlocked.push('C');d.run=null;});}
 reset(){if(!this.storage)return false;try{this.storage.removeItem(SAVE_KEY);if(this.storage.getItem(SAVE_KEY)!==null)throw Error();this.original=null;this.writable=true;this.data=defaults();this.status='saved';return true;}catch{this.status='memory';return false;}}
}
