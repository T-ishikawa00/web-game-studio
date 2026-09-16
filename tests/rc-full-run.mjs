import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {levelsByGame} from '../src/prototypes/levels.ts';
import {launch,setup,ids,out} from './rc-helpers.mjs';
const answers=Object.fromEntries(await Promise.all(['light','home','delivery'].map(async(n,i)=>[ids[i],JSON.parse(await readFile(`src/prototypes/${n}-answers-r2.json`))])));answers[ids[1]].push(...JSON.parse(await readFile('src/prototypes/home-answers-learning.json')));
const b=await launch(),results=[];
try{for(const id of ids){const u=await setup(b);try{await u.open(id);if(id===ids[1])await u.buttons();for(const [i,l] of levelsByGame[id].entries()){
 const answer=answers[id].find(a=>a.id===l.id);if(i)await u.a('next').click();
 if(l.kind==='light'||l.kind==='home'){for(const [j,n] of answer.solution.entries()){await u.a(`${l.kind==='light'?'mirror':'move'}:${n}`).press('Enter');assert.deepEqual((await u.progress()).board,answer.intermediate[j].state);}}
 else{for(let j=0;j<l.sockets.length;j++){const choices=l.allowedDirections?.[j]??[0,1,2,3],from=choices.indexOf(l.initial[j]),to=choices.indexOf(answer.solution.arrows[j]);for(let n=0;n<(to-from+choices.length)%choices.length;n++)await u.a('arrow:'+j).press('Enter');}
 if(l.waitCells)for(let j=0;j<l.waitCells.length;j++)await u.wait(j,answer.solution.waits[j]);else if(l.waitCell!==undefined)await u.wait(0,answer.solution.wait);
 const plan=(await u.progress()).board;assert.deepEqual(plan.arrows,answer.solution.arrows);if(l.waitCells)assert.deepEqual(plan.waits,answer.solution.waits);else assert.equal(plan.wait,answer.solution.wait??0);
 await u.a('go').click();await u.a('go').click();for(let step=0;step<answer.intermediate.length;step++){await u.a('step').click();}
 }
 await u.p.waitForFunction(({id,level})=>JSON.parse(localStorage.getItem('wgs:save:'+id))?.data.cleared.includes(level),{id,level:l.id},{timeout:3000});const s=await u.saved(id);assert.ok(s.data.cleared.includes(l.id));assert.equal(s.data.levelId,l.id);results.push({game:id,level:l.id,status:'PASS',uiSteps:answer.intermediate.length});
 }assert.equal((await u.saved(id)).data.cleared.length,levelsByGame[id].length);assert.equal(await u.a('next').count(),0);await u.a('finish-levels').click();assert.equal(await u.f.locator('.menu-dialog .levels button').count(),levelsByGame[id].length);await u.a('close-menu').click();await u.p.reload();await u.a('menu').waitFor();assert.equal((await u.saved(id)).data.cleared.length,levelsByGame[id].length);assert.deepEqual(u.errors,[]);assert.deepEqual(u.external,[]);console.log('PASS full RC UI sequence, ending and reload:',id);
 }catch(e){results.push({game:id,status:'FAIL',error:e.message});console.log('FAIL',id,e.message);}finally{await u.c.close();}}}finally{await b.close();await writeFile(`${out}/full-run-results.json`,JSON.stringify({at:new Date().toISOString(),method:'Real RC UI input; no in-game QA port, no injected game state. Light/Home intermediate checkpoints plus all 57 persisted clears.',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
