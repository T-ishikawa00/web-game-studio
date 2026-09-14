import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {launch,setup,ids,out} from './r5-helpers.mjs';
const b=await launch(),results=[];
const rgb=s=>(s.match(/[\d.]+/g)??[]).slice(0,3).map(Number);
const lum=s=>rgb(s).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
try{
 for(const id of ids){const u=await setup(b);await u.open(id,'portrait','en');await u.level(17);
  const colors=await u.f.locator('body').evaluate(()=>{const body=getComputedStyle(document.body),floor=getComputedStyle(document.querySelector('.tile')),wall=getComputedStyle(document.querySelector('.fixed-tile rect')),actorNode=document.querySelector('.mirror,.character path,.robot path'),actor=getComputedStyle(actorNode);return {background:body.backgroundColor,ink:body.color,floor:floor.fill,wall:wall.fill,actor:actorNode.classList.contains('mirror')?actor.backgroundColor:actor.fill};});
  const cdp=await u.c.newCDPSession(u.p);
  for(const type of ['achromatopsia','deuteranopia']){await cdp.send('Emulation.setEmulatedVisionDeficiency',{type});await u.f.locator('[data-capture-frame]').screenshot({path:path.join(out,'screens',`${id}-${type}.png`)});}
  await cdp.send('Emulation.setEmulatedVisionDeficiency',{type:'none'});await cdp.detach();
  results.push({id,colors,ratios:{textOnScene:ratio(colors.ink,colors.background),wallFloor:ratio(colors.wall,colors.floor),actorOutline:ratio(colors.ink,colors.actor)},method:'Computed rendered opaque colors; antialiasing/small marks assessed visually. Chromium vision simulation is supplementary, not certification.'});await u.c.close();
 }
 const c=await b.newContext({viewport:{width:1100,height:1600}}),p=await c.newPage();await p.goto('http://127.0.0.1:4325/MATERIALS.html');await p.locator('.sheet').screenshot({path:path.join(out,'screens','material-sheet.png'),animations:'disabled'});await c.close();
}finally{await b.close();await writeFile(path.join(out,'contrast-and-vision.json'),JSON.stringify(results,null,2));}
console.log(results.map(r=>({id:r.id,ratios:r.ratios})));
