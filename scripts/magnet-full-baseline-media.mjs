// Restore the archived QA recording without replacing any existing evidence.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectRoot} from './project-path.mjs';
const root=path.resolve(projectRoot),sha=b=>createHash('sha256').update(b).digest('hex');
const local=file=>{
  const resolved=path.resolve(root,file);
  if(!resolved.startsWith(root+path.sep))throw Error('Media path outside project');
  return resolved;
};
const manifest=JSON.parse(await readFile(local('docs/qa/game004-magnet-full-baseline-r1/frozen-manifest.json'),'utf8'));
for(const artifact of manifest.artifacts.filter(a=>a.parts)){
  const parts=[];
  for(const part of artifact.parts){
    const data=await readFile(local(part.file));
    if(data.length!==part.bytes||sha(data)!==part.sha256)throw Error('Media part mismatch: '+part.file);
    parts.push(data);
  }
  const data=Buffer.concat(parts);
  if(data.length!==artifact.bytes||sha(data)!==artifact.sha256)throw Error('Reconstructed media mismatch');
  const target=local(artifact.file);
  try{
    const existing=await readFile(target);
    if(sha(existing)!==artifact.sha256)throw Error('Existing evidence differs; refusing overwrite');
    console.log({file:artifact.file,status:'EXISTING EXACT MATCH',bytes:existing.length});
  }catch(error){
    if(error.code!=='ENOENT')throw error;
    await mkdir(path.dirname(target),{recursive:true});
    await writeFile(target,data,{flag:'wx'});
    console.log({file:artifact.file,status:'RESTORED EXACT BYTES',bytes:data.length});
  }
}
