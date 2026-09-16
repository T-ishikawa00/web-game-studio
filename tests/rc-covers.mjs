import {launch,setup,out} from './rc-helpers.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
const b=await launch(),records=[];await mkdir(`${out}/covers`,{recursive:true});
try{for(const [id,level] of [['tiny-delivery','D12'],['light-garden','L12'],['two-ways-home','T12']]){const u=await setup(b,{viewport:{width:1280,height:1200},reducedMotion:'reduce'});await u.open(id);await u.level(level);await u.f.locator('.play-area').screenshot({path:`${out}/covers/${id}.png`});records.push({id,level,source:'RC accepted profile / real UI .play-area screenshot',viewport:{width:1280,height:1200},reducedMotion:true,generatedAt:new Date().toISOString()});await u.c.close();}}finally{await b.close();await writeFile(`${out}/covers/provenance.json`,JSON.stringify(records,null,2));}
