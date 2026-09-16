import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import path from 'node:path';
export const base='http://127.0.0.1:4350',out='docs/qa/soft-launch-rc-r1';
export const ids=['light-garden','two-ways-home','tiny-delivery'];
export const launch=()=>chromium.launch({channel:'msedge',env:{...process.env,TEMP:path.resolve('.tmp/rc'),TMP:path.resolve('.tmp/rc')}});
export async function setup(browser,options={}){
 const c=await browser.newContext({viewport:{width:1440,height:1400},...options}),errors=[],external=[];
 await c.route('**/*',r=>{if(new URL(r.request().url()).origin!==base){external.push(new URL(r.request().url()).origin);return r.abort();}return r.continue();});
 // Test instrumentation observes actual messages and WebAudio, never enters the shipped bundle.
 await c.addInitScript(()=>{window.__qa={messages:[],audio:[],contexts:[]};window.addEventListener('message',e=>{if(e.origin===location.origin&&e.data?.protocol==='wgs-prototype-v1')window.__qa.messages.push(e.data);});
 const A=window.AudioContext;window.AudioContext=class extends A{constructor(...a){super(...a);window.__qa.contexts.push(this);}createBufferSource(){const s=super.createBufferSource(),start=s.start.bind(s),stop=s.stop.bind(s);s.start=(...a)=>{window.__qa.audio.push({type:'start',at:performance.now(),loop:s.loop,context:this.state,duration:s.buffer?.duration});return start(...a);};s.stop=(...a)=>{window.__qa.audio.push({type:'stop',at:performance.now(),loop:s.loop});return stop(...a);};return s;}};
 });
 const p=await c.newPage();p.setDefaultTimeout(7000);p.on('pageerror',e=>errors.push(e.message));const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`);
 const open=async(id,locale='en',query='')=>{await p.goto(`${base}/${locale}/play/${id}/${query}`);await a('menu').waitFor();await p.locator('#rc-loading').waitFor({state:'hidden'});};
 const saved=id=>p.evaluate(id=>JSON.parse(localStorage.getItem('wgs:save:'+id)),id);
 const progress=async()=>{await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));return p.evaluate(()=>[...window.__qa.messages].reverse().find(m=>m.type==='checkpoint')?.data??[...window.__qa.messages].reverse().find(m=>m.type==='init')?.data);};
 const menu=async key=>{await a('menu').click();if(key)await f.locator(`.menu-dialog [data-action="${key}"]`).click();};
 const level=async id=>{await menu('levels');await a('level:'+id).click();};
 const buttons=async()=>{if(!await a('move:0').count()){await menu('dpad');await a('close-menu').click();}};
 const wait=async(i,n)=>{await a('clock:'+i).click();await f.locator(`[data-wait-value="${n}"]`).click();};
 return {c,p,f,a,open,saved,progress,menu,level,buttons,wait,errors,external};
}
