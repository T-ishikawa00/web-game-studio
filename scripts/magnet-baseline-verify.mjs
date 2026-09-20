// Read-only frozen inputs; reproducibility output is isolated below .tmp.
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {build} from 'vite';
import {projectRoot,projectPath} from './project-path.mjs';
const index=process.argv.includes('--index'),out=projectPath(`${projectRoot}/.tmp/magnet-baseline-verify/${index?'index':'worktree'}`);
const manifest=JSON.parse(await readFile('docs/qa/game004-magnet-baseline-r2-1/frozen-manifest.json','utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const canonical=(b,file)=>/\.(ts|mjs|json|md|txt|html|css)$/.test(file)?Buffer.from(b.toString('utf8').replaceAll('\r\n','\n')):b;
const bytes=async file=>index?execFileSync('git',['show',':'+file],{maxBuffer:128*1024*1024,windowsHide:true}):readFile(file);
await mkdir(out+'/source',{recursive:true});
for(const a of manifest.artifacts){
  let b;
  if(a.parts){
    const parts=[];
    for(const p of a.parts){const part=await bytes(p.file);if(part.length!==p.bytes||sha(part)!==p.sha256)throw Error('Archived part mismatch: '+p.file);parts.push(part);}
    b=Buffer.concat(parts);
    if(b.length!==a.bytes)throw Error('Archived media length mismatch');
  }else b=await bytes(a.file);
  if(sha(canonical(b,a.file))!==a.canonicalSha256)throw Error('Frozen content mismatch: '+a.file);
  if(a.file.startsWith('game004-magnet-tempo/'))await writeFile(out+'/source/'+a.file.split('/').at(-1),b);
}
await build({configFile:false,root:out+'/source',publicDir:false,build:{outDir:out+'/dist',emptyOutDir:true,rollupOptions:{input:{game:out+'/source/index.html',review:out+'/source/review.html'}}}});
const results=[];for(const a of manifest.derivedDistribution){const name=a.file.split('.cache/magnet-tempo-r2-1-dist/')[1],b=await readFile(out+'/dist/'+name);if(sha(canonical(b,a.file))!==a.canonicalSha256)throw Error('Rebuild mismatch: '+name);results.push({file:name,byteIdentical:sha(b)===a.sha256,canonicalIdentical:true});}
const result={mode:index?'full-index inputs':'working-tree inputs',artifacts:manifest.artifacts.length,outputs:results,status:'PASS',normalization:'Only CRLF/LF in text. Original byte hashes retained. Binary evidence is exact.',originalSourceOrDistributionWrites:0};
await writeFile(out+'/result.json',JSON.stringify(result,null,2));console.log(result);
