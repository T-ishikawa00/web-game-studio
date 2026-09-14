import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {levelsByGame} from '../src/prototypes/levels.ts';
import {launch,setup,out,ids} from './r4-helpers.mjs';
const answers=Object.fromEntries(await Promise.all(['light','home','delivery'].map(async(name,i)=>[ids[i],JSON.parse(await readFile(`src/prototypes/${name}-answers-r2.json`,'utf8'))]))),browser=await launch(),results=[];
try{for(const id of ids){const u=await setup(browser);try{
 await u.open(id);if(id===ids[1])await u.buttons();
 for(const [i,l]of levelsByGame[id].entries()){
  const answer=answers[id].find(a=>a.id===l.id);if(i)await u.a('next').click();assert.equal((await u.state()).progress.levelId,l.id);assert.equal(await u.a('next').count(),0);
  if(l.kind==='light')for(const [j,m]of answer.solution.entries()){await u.a(`mirror:${m}`).click();assert.deepEqual((await u.state()).progress.board,answer.intermediate[j].state);}
  else if(l.kind==='home')for(const [j,d]of answer.solution.entries()){await u.a(`move:${d}`).click();assert.deepEqual((await u.state()).progress.board,answer.intermediate[j].state);}
  else{
   for(let j=0;j<l.sockets.length;j++){const choices=l.allowedDirections?.[j]??[0,1,2,3],from=choices.indexOf(l.initial[j]),to=choices.indexOf(answer.solution.arrows[j]);for(let n=0;n<(to-from+choices.length)%choices.length;n++)await u.a(`arrow:${j}`).click();}
   if(l.waitCells)for(let j=0;j<l.waitCells.length;j++)await u.wait(j,answer.solution.waits[j]);else if(l.waitCell!==undefined)await u.wait(0,answer.solution.wait);
   await u.a('go').click();await u.a('go').click();
   for(const expected of answer.intermediate){await u.a('step').click();const actual=await u.state();assert.equal(actual.run.tick,expected.after);assert.deepEqual(actual.run.bots.map(b=>({id:b.id,p:b.p,d:b.d,remaining:b.remaining,delivered:b.delivered})),expected.bots.map(b=>({id:b.id,p:b.p,d:b.d,remaining:b.remaining,delivered:b.delivered})));}
  }
  const state=await u.state();assert.equal(state.won,true);assert.ok(state.progress.cleared.includes(l.id));results.push({id,level:l.id,status:'PASS',intermediates:answer.intermediate.length});
 }
 assert.equal((await u.state()).progress.cleared.length,18);assert.equal(await u.a('next').count(),0);assert.equal(await u.a('finish-levels').count(),1);await u.a('finish-levels').click();assert.equal(await u.f.locator('.menu-dialog .levels button').count(),18);await u.a('close-menu').click();await u.p.reload();await u.a('menu').waitFor();assert.equal((await u.state()).progress.cleared.length,18);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);console.log('PASS full 18 and ending/reload',id);
 }catch(e){results.push({id,status:'FAIL',error:e.message});console.log('FAIL',id,e.message);}finally{await u.c.close();}}}finally{await browser.close();await writeFile(path.join(out,'full-run-results.json'),JSON.stringify({results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
