import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,out,ids} from './learning-helpers.mjs';
import {guideContent} from '../src/prototypes/guides.ts';
import {levelsByGame} from '../src/prototypes/levels.ts';
import {visualText} from '../src/prototypes/visual-language.ts';
const browser=await launch(),results=[];
async function check(name,fn,options={}){const u=await setup(browser,options);try{await fn(u);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);results.push({name,status:'PASS'});}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message);}finally{await u.c.close();}}
try{
await check('crest text keeps English articles; all authored hints/help use the same mapping',async()=>{
 for(const text of ['A flower opens','A switch and gate','A friend at home','A closed gate','A one-beat wait','A separate corner'])assert.equal(visualText(text),text);
 assert.equal(visualText('Visit A then B; Aが先。□'),'Visit ○ then ◇; ○が先。◇');
 for(const levels of Object.values(levelsByGame))for(const l of levels)for(const acted of [false,true]){
  const g=guideContent(l,true,acted);assert.doesNotMatch(g.body,/○ (flower|switch|friend|closed|one-beat|separate)\b/);
  assert.doesNotMatch(g.diagram,/NaN|undefined/);
 }
});
await check('Help renders the real character paint, readable English and explicit replay tips after action',async u=>{
 await u.open(ids[1]);await u.swipe(45,0);assert.equal(await u.f.locator('.input-cue').count(),0);const old=(await u.state()).progress.board;
 await u.menu('guide');const paint=await u.f.locator('.menu-dialog .character path').first().evaluate(e=>getComputedStyle(e).fill);assert.equal(paint,'rgb(255, 150, 63)');
 await u.a('show-cue').click();assert.equal(await u.f.locator('.input-cue').count(),1);assert.deepEqual((await u.state()).progress.board,old);
 await u.f.locator('[data-capture-frame]').screenshot({path:path.join(out,'screens','tips-replayed-en.png')});
});
await check('clock-free delivery lessons show following/swap cues',async u=>{
 await u.open(ids[2]);for(const index of [9,10]){await u.level(index);assert.equal(await u.a('clock:0').count(),0);const text=await u.f.locator('.input-cue').innerText();assert.doesNotMatch(text,/clock/i);assert.match(text,index===9?/vacated/:/Head-on/);}
});
await check('all eight mixed clock/arrow levels: separate art hit regions, touch commits once, popup never changes arrow',async u=>{
 await u.open(ids[2]);for(const index of [2,5,7,8,11,14,16,17]){
  await u.level(index);const l=levelsByGame[ids[2]][index];const cells=l.waitCells??[l.waitCell];
  for(const [clock,cell]of cells.entries()){const arrow=l.sockets.indexOf(cell);if(arrow<0)continue;
   const a=u.a('arrow:'+arrow),c=u.a('clock:'+clock),ar=await a.boundingBox(),cr=await c.boundingBox();assert.ok(ar.y+ar.height<=cr.y,'zero hit overlap');
   const old=(await u.state()).progress.board;await c.tap();await u.f.locator('[data-wait-value="1"]').tap();const now=(await u.state()).progress.board;assert.deepEqual(now.arrows,old.arrows);assert.equal(l.waitCells?now.waits[clock]:now.wait,1);
   await a.tap();assert.notDeepEqual((await u.state()).progress.board.arrows,now.arrows);
  }
 }
},{hasTouch:true,deviceScaleFactor:2.5,viewport:{width:360,height:800}});
await check('all 57 scenes expose R5 shared art, expected actor counts and bounded objects',async u=>{
 for(const id of ids){await u.open(id);for(const l of levelsByGame[id]){await u.menu('levels');await u.a('level:'+l.id).click();assert.equal(await u.f.locator('.world-label,.world-base,.book-title,.goal,.title-row').count(),0);assert.equal(await u.f.locator('.fixed-tile rect').count(),l.walls.length+(l.kind==='home'?l.otherWalls.length:0));
 if(l.kind==='home')assert.equal(await u.f.locator('.board .character').count(),2);if(l.kind==='delivery')assert.equal(await u.f.locator('.robot').count(),l.robots.length);
 }}
});
await check('320 px combined controls, DPR2.5 and every mode: real target centers remain actionable',async u=>{
 await u.open(ids[2]);await u.level(8);for(const mode of ['auto','portrait','landscape','auto']){await u.layout(mode);const before=(await u.state()).progress.board;await u.a('clock:0').tap();await u.f.locator('[data-wait-value="2"]').tap();assert.deepEqual((await u.state()).progress.board.arrows,before.arrows);await u.a('arrow:0').tap();assert.notDeepEqual((await u.state()).progress.board.arrows,before.arrows);}
},{hasTouch:true,deviceScaleFactor:2.5,viewport:{width:320,height:800}});
}finally{await browser.close();await writeFile(path.join(out,'visual-contract-results.json'),JSON.stringify(results,null,2));}
console.log('R5 contracts',results.length,'fail',results.filter(r=>r.status==='FAIL').length);if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
