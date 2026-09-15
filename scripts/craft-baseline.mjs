import {mkdir,readFile,writeFile,cp} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
if(projectRoot!=='C:\\projects\\Web Game Studio')throw Error('Wrong project');
const out=projectPath(path.join(projectRoot,'.tmp/craft-before'));
await mkdir(out); // Deliberately refuse to overwrite a previous baseline.
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,windowsHide:true,encoding:'utf8'}).trim();
const files=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean),records=[];
for(const file of files){const source=projectPath(path.join(projectRoot,file));records.push({file,digest:createHash('sha256').update(await readFile(source)).digest('hex')});await cp(source,projectPath(path.join(out,'files',file)),{recursive:true});}
await writeFile(path.join(out,'baseline.json'),JSON.stringify({at:new Date().toISOString(),model:'gpt-6-astra',modelEvidence:'current session 01a0a28e-bb57-7681-88ae-7c696631245a turn_context.model',head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),upstream:git('rev-parse','@{upstream}'),status:git('status','--porcelain=v1'),index:git('ls-files','--stage'),stash:git('stash','list'),records},null,2)+'\n');
await writeFile(path.join(out,'starting.diff'),git('diff','--no-ext-diff'));
await cp('C:/Users/PUBLIC_USER/Downloads/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md',projectPath(path.join(projectRoot,'docs/planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md')),{errorOnExist:true,force:false});
console.log(JSON.stringify({preserved:records.length,head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),upstream:git('rev-parse','@{upstream}'),staged:git('diff','--cached','--name-only')}));
