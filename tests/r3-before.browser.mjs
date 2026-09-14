import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdir} from 'node:fs/promises';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
import path from 'node:path';
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3/screens'));await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}});
try{for(const id of ['light-garden','two-ways-home','tiny-delivery']){
 const context=await browser.newContext({viewport:{width:1440,height:1600}}),page=await context.newPage();
 await page.goto(`http://127.0.0.1:4324/ja/prototypes/play/${id}/`);const f=page.frameLocator('iframe');await f.locator('[data-action="close-guide"]').click();
 await f.locator('.game-wrap').screenshot({path:projectPath(path.join(out,`${id}-before.png`))});
 await f.locator(id==='tiny-delivery'?'.delivery-controls':'.game-controls').screenshot({path:projectPath(path.join(out,`${id}-controls-before.png`))});await context.close();
}}finally{await browser.close();}
