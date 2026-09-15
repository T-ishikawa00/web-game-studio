import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
import path from 'node:path';
export const base=process.env.QA_R5_BASE_URL??'http://127.0.0.1:4324',ids=['light-garden','two-ways-home','tiny-delivery'];
export const out=projectPath(path.resolve(projectRoot,process.env.QA_R5_OUTPUT_DIR??'docs/qa/batch-01-r5'));
export const launch=()=>chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}});
export async function setup(browser,options={}){
 const errors=[],external=[],c=await browser.newContext({viewport:{width:1440,height:1600},...options});
 await c.route('**/*',r=>{if(new URL(r.request().url()).origin!==base){external.push(new URL(r.request().url()).origin);return r.abort();}return r.continue();});
 const p=await c.newPage();p.setDefaultTimeout(6000);p.on('pageerror',e=>errors.push(e.message));
 const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`),state=()=>f.locator('body').evaluate(()=>window.__prototypeState());
 const open=async(id,mode='auto',lang='en')=>{await p.goto(`${base}/${lang}/prototypes/play/${id}/?layout=${mode}`);await a('menu').waitFor();await p.locator('#prototype-loading').waitFor({state:'hidden'});};
 const menu=async action=>{await a('menu').click();if(action)await f.locator(`.menu-dialog [data-action="${action}"]`).click();};
 const level=async i=>{await menu('levels');await a(`level:${i}`).click();};
 const layout=async value=>{await menu('settings');await f.locator('#capture-layout').selectOption(value);await f.locator('#close-settings').click();};
 const buttons=async()=>{if(!(await state()).dpad){await menu('dpad');await a('close-menu').click();}};
 const wait=async(i,n)=>{await a(`clock:${i}`).click();await f.locator(`[data-wait-value="${n}"]`).click();};
 const swipe=async(dx,dy,board=0,steps=5)=>{const b=await f.locator(`[data-swipe-board="${board}"]`).boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2;await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+dx,y+dy,{steps});await p.mouse.up();};
 return {c,p,f,a,state,open,menu,level,layout,buttons,wait,swipe,errors,external};
}
