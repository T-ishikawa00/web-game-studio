import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'file:///C:/Users/PUBLIC_USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {projectPath,projectRoot} from '../scripts/project-path.mjs';
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r3')),screens=projectPath(path.join(out,'screens'));await mkdir(screens,{recursive:true});const results=[];
const browser=await chromium.launch({channel:'msedge',env:{...process.env,TEMP:projectPath(path.join(projectRoot,'.tmp')),TMP:projectPath(path.join(projectRoot,'.tmp'))}});
function luminance(color){const values=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return values[0]*.2126+values[1]*.7152+values[2]*.0722;}
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
try{for(const id of ['light-garden','two-ways-home','tiny-delivery']){
 const p=await browser.newPage({viewport:{width:1440,height:1400}});await p.goto(`http://127.0.0.1:4324/ja/prototypes/play/${id}/?layout=auto`);const f=p.frameLocator('iframe'),a=k=>f.locator(`[data-action="${k}"]`);await a('close-guide').click();const bar=f.locator('.control-deck');
 await bar.screenshot({path:projectPath(path.join(screens,`${id}-controls-after.png`))});
 const key=id==='two-ways-home'?'move:1':id==='light-garden'?'retry':'go',target=a(key);await target.scrollIntoViewIfNeeded();const before=await target.boundingBox();await p.mouse.move(before.x+before.width/2,before.y+before.height/2);await p.mouse.down();await p.waitForTimeout(150);assert.deepEqual(await target.boundingBox(),before);await (id==='two-ways-home'?f.locator('.dpad'):bar).screenshot({path:projectPath(path.join(screens,`${id}-controls-pressed.png`))});await p.mouse.up();
 if(id==='tiny-delivery'){await a('retry').click();await a('arrow:0').click();await a('arrow:0').click();await a('arrow:0').click();await a('arrow:1').click();await a('go').click();await a('go').click();for(let n=0;n<8&&!(await f.locator('body').evaluate(()=>window.__prototypeState().won));n++)await a('step').click();}
 else if(id==='light-garden')await a('mirror:0').click();else await a('move:1').click();
 assert.equal(await a('next').isVisible(),true);await bar.screenshot({path:projectPath(path.join(screens,`${id}-controls-clear.png`))});
 const colors=await f.locator('.control-deck .control:not(:disabled)').evaluateAll(nodes=>nodes.map(n=>{const c=getComputedStyle(n);return {action:n.dataset.action,color:c.color,background:c.backgroundColor,border:c.borderTopColor};}));const ratios=colors.map(c=>({...c,textContrast:contrast(c.color,c.background),edgeContrast:contrast(c.border,c.background)}));assert.ok(ratios.every(c=>c.textContrast>=4.5));
 await a('settings').click();assert.equal(await f.locator('dialog[open]').getAttribute('aria-label'),'設定');await f.locator('#motion-setting').check();await f.locator('#close-settings').click();await p.keyboard.press('Tab');await a('retry').focus();const ring=await a('retry').evaluate(e=>({style:getComputedStyle(e).outlineStyle,width:getComputedStyle(e).outlineWidth}));assert.equal(ring.style,'solid');assert.equal(ring.width,'3px');assert.equal(await a('retry').locator('.control-face').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 results.push({id,status:'PASS',stablePressedHitArea:true,colors:ratios,focus:ring,reducedMotion:true});await p.close();
}}finally{await browser.close();await writeFile(projectPath(path.join(out,'control-results.json')),JSON.stringify({results},null,2));}
console.log('Control visuals',results.length,'PASS');
