import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {launch,setup} from './r5-helpers.mjs';
const answers=JSON.parse(await readFile('src/prototypes/delivery-answers-r2.json','utf8')),browser=await launch(),results=[];
try{for(const mode of ['silent','sound','reduced']){const u=await setup(browser);try{
 await u.c.addInitScript(mode=>localStorage.setItem('wgs:audio:tiny-delivery',JSON.stringify({version:1,mute:mode==='silent',gain:.35})),mode);await u.open('tiny-delivery');
 if(mode==='reduced'){await u.menu('settings');await u.f.locator('#motion-setting').check();await u.f.locator('#close-settings').click();}
 for(const answer of answers){await u.menu('levels');await u.a('level:'+answer.id).click();for(let i=0;i<answer.solution.arrows.length;i++){let n=0;while((await u.state()).progress.board.arrows[i]!==answer.solution.arrows[i]){assert.ok(++n<=4);await u.a('arrow:'+i).click();}}for(let i=0;i<(answer.solution.waits??[answer.solution.wait]).length;i++){const value=(answer.solution.waits??[answer.solution.wait])[i];if(value)await u.wait(i,value);}
  await u.a('go').click();await u.a('go').click();for(const expected of answer.intermediate){await u.a('step').click();const s=await u.state();assert.equal(s.run.tick,expected.after);assert.deepEqual(s.run.bots,expected.bots);assert.equal(s.run.status,expected.status);}
  assert.equal((await u.state()).won,true);if(mode==='reduced')assert.equal(await u.f.locator('body').evaluate(()=>window.__craftState().motion.animations),0);results.push({mode,id:answer.id,status:'PASS',intermediateStates:answer.intermediate.length});
 }
 await u.p.waitForTimeout(1000);const s=await u.f.locator('body').evaluate(()=>window.__craftState());assert.ok(s.audio.counts.maxVoices<=3);assert.equal(s.audio.voices,0);if(mode==='silent')assert.equal(s.audio.counts.played,0);else assert.ok(s.audio.counts.played>0);await u.p.reload();await u.a('menu').waitFor();assert.equal((await u.state()).progress.cleared.length,18);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);console.log(mode,'18/18 PASS');
 }catch(e){results.push({mode,status:'FAIL',error:e.stack});console.log('FAIL',mode,e.message);}finally{await u.c.close();}}}finally{await browser.close();await writeFile((process.env.QA_CRAFT_OUTPUT_DIR??'docs/qa/tiny-craft-pilot-01')+'/mode-results.json',JSON.stringify({results},null,2)+'\n');}
if(results.some(x=>x.status==='FAIL'))process.exitCode=1;
