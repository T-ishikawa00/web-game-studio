import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,out,ids} from './learning-helpers.mjs';
const browser=await launch(),results=[];
try{for(const width of [1440,768,390,360,320])for(const lang of ['ja','en'])for(const id of ids){
 const height=width===1440?900:width===390?844:800,u=await setup(browser,{viewport:{width,height}});
 try{await u.open(id,'auto',lang);for(const stage of [0,17]){if(stage)await u.level(stage);for(const on of id===ids[1]?[false,true]:[false]){
 if(on)await u.buttons();else if((await u.state()).dpad){await u.menu('dpad');await u.a('close-menu').click();}
 const measure=await u.f.locator('body').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,targets:[...el.querySelectorAll('#game button:not(:disabled)')].map(b=>{const r=b.getBoundingClientRect();return {action:b.dataset.action,w:r.width,h:r.height};}).filter(b=>b.w&&b.h),boards:[...el.querySelectorAll('.board')].map(b=>{const r=b.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};})}));
 assert.ok(measure.scroll<=measure.width+1,JSON.stringify(measure));assert.ok(measure.targets.filter(b=>! /^(mirror|arrow|clock):/.test(b.action)).every(b=>b.w>=43.5&&b.h>=43.5),JSON.stringify(measure.targets.filter(b=>b.w<43.5||b.h<43.5)));
 if(id===ids[1]){const b=measure.boards;assert.equal(b.length,2);assert.ok(Math.max(...b.map(r=>r.y+r.h))-Math.min(...b.map(r=>r.y))<height-130,'both gardens fit viewport together');if(on){const pad=await u.f.locator('.dpad').boundingBox(),boards=await u.f.locator('.storybook').boundingBox();assert.ok(pad.y>=boards.y+boards.height,'D-pad does not overlay boards');}}
 if(stage===17&&(!on||id===ids[1]))await u.f.locator('[data-capture-frame]').screenshot({path:path.join(out,'screens',`${id}-auto-${lang}-${width}-final${on?'-buttons':''}.png`)});
 results.push({name:`${id} ${lang} ${width} stage${stage+1} buttons${on}`,status:'PASS',measure});
 }}
 // Menu/help is reachable and can scroll in narrow/short windows; close restores focus.
 await u.menu('guide');const dialog=u.f.locator('.menu-dialog');await dialog.screenshot({path:path.join(out,'screens',`${id}-help-${lang}-${width}.png`)});await dialog.hover();await u.p.mouse.wheel(0,450);await u.p.keyboard.press('Escape');assert.equal(await u.a('menu').evaluate(e=>document.activeElement===e),true);
 const scroll=await u.p.evaluate(()=>scrollY);await u.p.mouse.move(3,300);await u.p.mouse.wheel(0,500);await u.p.waitForTimeout(50);assert.ok(await u.p.evaluate(()=>scrollY)>=scroll);
 assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);
 }catch(e){results.push({name:`${id} ${lang} ${width}`,status:'FAIL',error:e.message});console.log('FAIL',id,lang,width,e.message);}finally{await u.c.close();}
}
// Small capture frames with D-pad on/off retain both gardens and no active target overlaps.
for(const width of [390,1440])for(const on of [false,true]){const u=await setup(browser,{viewport:{width,height:1600}});try{await u.open(ids[1],'portrait');if(on)await u.buttons();const m=await u.f.locator('[data-capture-frame]').evaluate(el=>{const r=el.getBoundingClientRect();return {w:r.width,h:r.height,boxes:[...el.querySelectorAll('.board,.dpad,.control-deck')].map(e=>{const b=e.getBoundingClientRect();return {cls:e.className,x:b.x-r.x,y:b.y-r.y,w:b.width,h:b.height};})};});assert.ok(m.boxes.every(b=>b.x>=0&&b.y>=0&&b.x+b.w<=m.w+.5&&b.y+b.h<=m.h+.5),JSON.stringify(m));await u.f.locator('[data-capture-frame]').screenshot({path:path.join(out,'screens',`two-ways-home-portrait-${width}-buttons${on}.png`)});results.push({name:`portrait ${width} buttons${on}`,status:'PASS',m});}catch(e){results.push({name:`portrait ${width} buttons${on}`,status:'FAIL',error:e.message});console.log('FAIL',e.message);}finally{await u.c.close();}}
}finally{await browser.close();await writeFile(path.join(out,'responsive-results.json'),JSON.stringify({results},null,2));}
console.log('responsive',results.length,'fail',results.filter(r=>r.status==='FAIL').length);if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
