import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const out=projectPath(path.join(projectRoot,'.tmp/r3-before'));
await mkdir(out,{recursive:true});
try{await readFile(path.join(out,'manifest.json'));throw Error('Baseline already exists; do not overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,encoding:'utf8'}).trim();
const files=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean);
const hashes={};
for(const file of files){hashes[file]=createHash('sha256').update(await readFile(projectPath(path.join(projectRoot,file)))).digest('hex');}
for(const dir of ['src/prototypes','src/pages/[locale]/prototypes'])await cp(projectPath(path.join(projectRoot,dir)),projectPath(path.join(out,dir)),{recursive:true});
await writeFile(projectPath(path.join(out,'manifest.json')),JSON.stringify({at:new Date().toISOString(),model:'gpt-6-astra',modelEvidence:'current session turn_context.model',head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),upstream:git('rev-parse','@{upstream}'),status:git('status','--porcelain=v1'),indexTree:git('write-tree'),stash:git('stash','list'),hashes},null,2)+'\n');
await writeFile(projectPath(path.join(out,'starting.diff')),git('diff','--no-ext-diff'));
await cp('C:/Users/PUBLIC_USER/Downloads/GAME_CONTROL_UI_AND_CAPTURE_R3.md',projectPath(path.join(projectRoot,'docs/games/GAME_CONTROL_UI_AND_CAPTURE_R3.md')),{errorOnExist:true,force:false});
console.log(`Preserved ${files.length} file hashes and prototype sources. Attached specification copied unchanged.`);
