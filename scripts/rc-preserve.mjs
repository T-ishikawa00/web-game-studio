import {readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {projectPath} from './project-path.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
const git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim();
const file='docs/qa/soft-launch-rc-r1/preservation.json';
const profiles=[['tiny-craft-r2-checkpoint','.cache/craft-r2'],['lightwork-craft-baseline-r1','.cache/lightwork-polish'],['twoways-craft-baseline-r1','.cache/twoways-craft']];
if(process.argv.includes('--record')){
 const paths=[...git('ls-files','src','public','docs/qa','docs/games','scripts').split('\n'),...git('ls-files','--others','--exclude-standard').split('\n')].filter(p=>p&&!p.includes('soft-launch-rc-r1')&&!p.includes('rc-'));
 const files=[];for(const p of new Set(paths))files.push({file:p,hash:hash(await readFile(p))});
 const runtime=[];for(const [name,dir] of profiles){const f=JSON.parse(await readFile(`docs/qa/${name}/frozen-runtime.json`));for(const r of f.files)assert.equal(hash(await readFile(`${dir}/${r.file}`)),r.hash,`${name}/${r.file}`);runtime.push({name,dir,files:f.files.length,status:'PASS'});}
 await writeFile(projectPath(file),JSON.stringify({at:new Date().toISOString(),head:git('rev-parse','HEAD'),upstream:git('rev-parse','origin/main'),branch:git('branch','--show-current'),initialStatus:git('status','--porcelain=v1','-uall'),files,runtime},null,2));console.log('Baseline and existing untracked retained:',files.length,runtime);
}else{const before=JSON.parse(await readFile(file));const allowed=['src/data/games.ts','docs/games/PRODUCTION_CURRENT.md'];let count=0;for(const f of before.files){if(allowed.includes(f.file)||f.file.startsWith('docs/records/'))continue;assert.equal(hash(await readFile(f.file)),f.hash,'Preservation '+f.file);count++;}for(const r of before.runtime){const frozen=JSON.parse(await readFile(`docs/qa/${r.name}/frozen-runtime.json`));for(const f of frozen.files)assert.equal(hash(await readFile(`${r.dir}/${f.file}`)),f.hash,'Frozen '+f.file);}console.log('PASS preserved',count,'files and all frozen runtime files');}
