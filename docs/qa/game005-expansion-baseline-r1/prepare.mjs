import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
const root=process.cwd(),out='docs/qa/game005-expansion-baseline-r1',local='.cache/game005-expansion-baseline-r1';
if(root.replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('root');
fs.mkdirSync(local,{recursive:true});
const git=a=>execFileSync('git',a,{encoding:'utf8',windowsHide:true,maxBuffer:32_000_000}).trim();
const files=git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(f=>f&&!f.startsWith(out+'/')).map(file=>({file,sha256:createHash('sha256').update(fs.readFileSync(file)).digest('hex')}));
const b={at:new Date().toISOString(),head:git(['rev-parse','HEAD']),upstream:git(['rev-parse','@{upstream}']),branch:git(['branch','--show-current']),index:git(['ls-files','--stage']),status:git(['status','--porcelain=v1','--untracked-files=all']),current:fs.readFileSync('docs/games/PRODUCTION_CURRENT.md','utf8'),files};
fs.writeFileSync(local+'/before.json',JSON.stringify(b,null,2));
for(const name of ['all.summary.json','staged.summary.json','history.summary.json']){const f='.tmp/security-r1/'+name;if(fs.existsSync(f))fs.copyFileSync(f,local+'/prior-'+name);}
console.log({head:b.head,upstream:b.upstream,branch:b.branch,files:files.length,indexEntries:b.index.split('\n').length,staged:git(['diff','--cached','--name-only']),hooks:git(['config','--local','--get','core.hooksPath'])});
