import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=process.cwd();if(root.replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('Wrong root');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const hash=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const paths=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean).filter(p=>!p.startsWith('docs/qa/tinlumo-audit-r1/'));
const files=[];for(const file of paths)files.push({file,sha256:await hash(file)});
const walk=async d=>(await fs.readdir(d,{withFileTypes:true})).flatMap(e=>e.isDirectory()?[]:[d+'/'+e.name]);
async function recurse(d){let o=[];for(const e of await fs.readdir(d,{withFileTypes:true})){const p=d+'/'+e.name;if(e.isDirectory())o.push(...await recurse(p));else o.push({file:p,sha256:await hash(p)});}return o;}
const distribution=await recurse('release-artifacts/game004-production-r1');
await fs.writeFile('docs/qa/tinlumo-audit-r1/evidence/preflight.json',JSON.stringify({date:new Date().toISOString(),root,head:git('rev-parse','HEAD'),upstream:git('rev-parse','@{u}'),index:git('ls-files','--stage'),trackedDiff:git('diff','--numstat'),files,distribution},null,2));
console.log(JSON.stringify({files:files.length,distribution:distribution.length,head:git('rev-parse','HEAD')}));
