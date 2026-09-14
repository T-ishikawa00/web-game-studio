import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const out=projectPath(path.join(projectRoot,'.tmp/r4-before'));
await mkdir(out); // Fail closed: never replace a previous baseline.
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,encoding:'utf8'}).trim();
const files=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean);
const records=[];
for(const file of files) records.push({file,digest:createHash('sha256').update(await readFile(projectPath(path.join(projectRoot,file)))).digest('hex')});
for(const dir of ['src/prototypes','src/pages/[locale]/prototypes','scripts'])await cp(projectPath(path.join(projectRoot,dir)),projectPath(path.join(out,dir)),{recursive:true});
await writeFile(path.join(out,'baseline.json'),JSON.stringify({at:new Date().toISOString(),model:'gpt-6-astra',modelEvidence:'current turn_context.model',head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),upstream:git('rev-parse','@{upstream}'),status:git('status','--porcelain=v1'),index:git('ls-files','--stage'),stash:git('stash','list'),records},null,2)+'\n');
await writeFile(path.join(out,'starting.diff'),git('diff','--no-ext-diff'));
await cp('C:/Users/PUBLIC_USER/Downloads/GAME_DIRECT_MANIPULATION_R4.md',projectPath(path.join(projectRoot,'docs/games/GAME_DIRECT_MANIPULATION_R4.md')),{errorOnExist:true,force:false});
console.log(`Preserved ${files.length} file digests, prototype sources and scripts; copied R4 specification byte-for-byte.`);
