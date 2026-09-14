import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
import path from 'node:path';
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r4/screens'));await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}}),records=[];
try{for(const id of ['light-garden','two-ways-home','tiny-delivery'])for(const mode of ['auto','portrait','landscape']){
 const c=await browser.newContext({viewport:{width:1440,height:1600}}),p=await c.newPage();
 await p.goto(`http://127.0.0.1:4324/ja/prototypes/play/${id}/?layout=${mode}`);const f=p.frameLocator('iframe');await f.locator('[data-action="close-guide"]').click();
 const frame=f.locator('[data-capture-frame]');await frame.screenshot({path:path.join(out,`${id}-${mode}-r3.png`)});
 records.push({id,mode,viewport:{width:1440,height:1600},box:await frame.boundingBox(),state:await f.locator('body').evaluate(()=>window.__prototypeState())});await c.close();
}}finally{await browser.close();}
await writeFile(path.join(out,'../comparison-before.json'),JSON.stringify(records,null,2));console.log('R3 comparison frames preserved:',records.length);
