import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {root,read} from './common.mjs';
import {installCoilhopObserver} from './game008/observe.mjs';
const game=process.env.RELEASE_GAME??'game008',m=read(root+'/'+game+'/RELEASE_MANIFEST.json');
const {installGrowth}=await import(pathToFileURL(process.cwd()+'/'+m.root+'/assets/growth-client.js'));
const {validEvent,fields}=await import(pathToFileURL(process.cwd()+'/'+root+'/'+game+'/runtime/event-schema.mjs'));
function browser(slug,{allow=false,fail=false}={}){
 const listeners={},clicks={},sent=[],storage=new Map(allow?[['tinlumo:growth-consent:production-r1','allow']]:[]),timers=new Set();
 const panel={dataset:{growthEnabled:'true'},querySelector:()=>({textContent:''}),querySelectorAll:()=>['allow','deny'].map(x=>({dataset:{growthChoice:x},addEventListener:(_,fn)=>clicks[x]=fn}))};
 const win={location:{pathname:'/en/play/'+slug+'/',hostname:'127.0.0.1',protocol:'http:',search:''},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},crypto:{randomUUID:()=> '12345678-1234-4123-8123-123456789abc'},AbortController,setTimeout:(fn,ms)=>{const t=setTimeout(fn,ms);t.unref();timers.add(t);return t;},clearTimeout:t=>{clearTimeout(t);timers.delete(t);},addEventListener:(name,fn)=>listeners[name]=fn,fetch:async(_,o)=>{sent.push(JSON.parse(o.body));return {ok:!fail,status:fail?503:201};}};win.top=win;
 const doc={documentElement:{lang:'en'},querySelector:()=>panel};const growth=installGrowth(win,doc);
 return {growth,clicks,sent,storage,cleanup:()=>{clicks.deny();for(const t of timers)clearTimeout(t);}};
}
const settle=()=>new Promise(r=>setTimeout(r,10));
for(const slug of ['tiny-delivery','rimbloom','coilhop',...(game==='game009'?['ember-glaze']:[])]){
 test(slug+' preserves default OFF and never replays previous attempts',async()=>{const b=browser(slug);b.growth.emit('game_ready');b.growth.emit('trial_start',{retry_kind:'new'});b.growth.emit('first_meaningful_input',{input_mode:'keyboard'});b.growth.emit('game_result',{result_type:'stage_clear'});assert.equal(b.sent.length,0);b.clicks.allow();await settle();assert.deepEqual(b.sent.map(e=>e.event_name),['game_reach']);b.cleanup();});
 test(slug+' accepts the existing funnel fields and drops sends on withdrawal',async()=>{const b=browser(slug,{allow:true});b.growth.emit('game_ready');b.growth.emit('trial_start',{retry_kind:'new'});b.growth.emit('first_meaningful_input',{input_mode:'touch'});b.growth.emit('game_result',{result_type:'stage_clear'});b.growth.emit('trial_start',{retry_kind:'same'});await settle();assert.deepEqual(b.sent.map(e=>e.event_name),['game_reach','game_ready','trial_start','first_meaningful_input','game_result','trial_start','retry']);for(const e of b.sent){assert.equal(validEvent({...e,release_version:'growth-r1'}),true);assert.deepEqual(Object.keys(e),fields);}const n=b.sent.length;b.clicks.deny();b.growth.emit('game_result',{result_type:'failure'});await settle();assert.equal(b.sent.length,n);assert.equal(b.storage.get('tinlumo:growth-consent:production-r1'),'deny');b.cleanup();});
}
test('receiver failure remains bounded and does not throw into gameplay',async()=>{const b=browser('coilhop',{allow:true,fail:true});assert.doesNotThrow(()=>{b.growth.emit('trial_start',{retry_kind:'new'});b.growth.emit('first_meaningful_input',{input_mode:'pointer'});b.growth.emit('game_result',{result_type:'failure'});});await settle();assert.equal(b.sent.length,8);b.cleanup();});
test('new game remains direct, stage none, and rejects added tracking dimensions',()=>{const p={schema:1,event_id:'12345678-1234-4123-8123-123456789abc:1',document_id:'12345678-1234-4123-8123-123456789abc',seq:1,game_id:'coilhop',release_version:'growth-r1',language:'ja',input_mode:'none',campaign:'direct',event_name:'game_reach',run_ordinal:0,stage:'none',result_type:'none',retry_kind:'none'};assert(validEvent(p));assert(!validEvent({...p,campaign:'rimbloom_direct_01'}));assert(!validEvent({...p,stage:'D01'}));assert(!validEvent({...p,score:10}));assert(!validEvent({...p,game_id:'unknown'}));});
test('COILHOP observer counts accepted launches and results, ignores pause/canceled charge',async()=>{
 let callback;const frame={dataset:{state:'menu',pad:'0',course:'course-01'}},status={dataset:{state:'menu'}},handlers={};const canvas={addEventListener:(n,f)=>handlers[n]=f,removeEventListener(){}};
 const doc={getElementById:id=>id==='gameFrame'?frame:id==='gameStatus'?status:canvas,addEventListener:(n,f)=>handlers[n]=f,removeEventListener(){}};
 class Observer{constructor(fn){callback=fn;}observe(){}disconnect(){}}
 const sent=[];installCoilhopObserver(doc,(name,detail)=>sent.push({name,detail}),Observer);
 function change(state,pad=frame.dataset.pad,course=frame.dataset.course){frame.dataset.state=state;status.dataset.state=state;frame.dataset.pad=pad;frame.dataset.course=course;callback();}
 change('ready');change('charging');change('paused');change('ready');assert.equal(sent.length,2);
 const down={isTrusted:true,type:'pointerdown',pointerType:'touch',pointerId:7,defaultPrevented:true};status.dataset.state='charging';handlers.pointerdown(down);await settle();handlers.keydown({isTrusted:true,type:'keydown',code:'Enter',target:canvas});handlers.keyup({isTrusted:true,type:'keyup',code:'Enter'});handlers.pointerdown({isTrusted:true,type:'pointerdown',pointerType:'mouse',pointerId:8});handlers.pointerup({isTrusted:true,type:'pointerup',pointerId:8});handlers.pointercancel({pointerId:8});status.dataset.state='flying';handlers.pointerup({isTrusted:true,type:'pointerup',pointerId:7});handlers.lostpointercapture({pointerId:7});await settle();change('ready','1');change('charging');change('flying');change('falling');change('failed');
 assert.deepEqual(sent.map(e=>e.name),['game_ready','trial_start','first_meaningful_input','game_result']);assert.equal(sent[2].detail.input_mode,'touch');assert.equal(sent.at(-1).detail.result_type,'failure');change('ready');assert.equal(sent.at(-1).detail.retry_kind,'same');change('charging');change('flying');change('course-clear');assert.equal(sent.at(-1).detail.result_type,'stage_clear');change('ready');assert.equal(sent.at(-1).detail.retry_kind,'same');
 change('failed');change('ready','0','course-02');assert.equal(sent.at(-1).detail.retry_kind,'new');
 change('paused');const n=sent.length;change('ready');assert.equal(sent.length,n,'Resume is not a new trial');
 change('paused');handlers.click({isTrusted:true,target:{closest:()=>({})}});change('ready','0');assert.equal(sent.length,n+1);assert.equal(sent.at(-1).detail.retry_kind,'same','Course-map restart is a fresh same-course trial');
});
test('six existing game runtimes and RIMBLOOM R2 play bytes remain preserved',()=>{const basis=read(root+'/game008/inputs/PRODUCTION_BASIS.json');for(const e of basis.files.filter(e=>e.file.startsWith('games/')||/^(ja|en)\/play\/(light-garden|two-ways-home|project-magnet|island-connections)\//.test(e.file))){assert.deepEqual(fs.readFileSync(m.root+'/'+e.file),fs.readFileSync(root+'/game008/inputs/published-current/'+e.file),e.file);}});
