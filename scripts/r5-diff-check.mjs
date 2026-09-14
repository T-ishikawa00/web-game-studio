import {execFileSync,spawnSync} from 'node:child_process';
import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,encoding:'utf8',windowsHide:true,stdio:['ignore','pipe','pipe']});
git('diff','--check');const files=git('ls-files','--others','--exclude-standard','-z').split('\0').filter(f=>/\.(ts|mjs|css|md|json|html|astro)$/.test(f));
const empty=projectPath(path.join(projectRoot,'.tmp/r5-empty'));await writeFile(empty,'');const problems=[];
for(const file of files){const r=spawnSync('git',['diff','--no-index','--check','--',empty,projectPath(path.join(projectRoot,file))],{cwd:projectRoot,encoding:'utf8',windowsHide:true});if(r.stdout.trim()||r.status>1||r.error)problems.push(file);}
const baseline=JSON.parse(await readFile(projectPath(path.join(projectRoot,'.tmp/r5-before/baseline.json')),'utf8')),classified=[];
for(const file of problems){const bytes=await readFile(projectPath(path.join(projectRoot,file))),old=baseline.records.find(r=>r.file===file);const unchanged=old&&old.digest===createHash('sha256').update(bytes).digest('hex');const attachment=file==='docs/games/GAME_VISUAL_LANGUAGE_R5.md'&&Buffer.compare(bytes,await readFile('C:/Users/PUBLIC_USER/Downloads/GAME_VISUAL_LANGUAGE_R5.md'))===0;classified.push({file,classification:unchanged?'UNCHANGED_R4_INPUT':attachment?'BYTE_EXACT_HUMAN_ATTACHMENT':'NEW_UNREVIEWED'});}
const unresolved=classified.filter(r=>r.classification==='NEW_UNREVIEWED');
const evidence={status:problems.length?'RAW_WHITESPACE_FINDINGS_PRESERVED':'PASS',trackedDiffCheck:true,untrackedTextFiles:files.length,problems,classified,newImplementationFindings:unresolved.length,notes:'Markdown source line breaks / existing EOF whitespace retained. No originals reformatted; raw findings remain recorded.',stagedCount:git('diff','--cached','--name-only').trim()?1:0};await writeFile(projectPath(path.join(projectRoot,'docs/qa/batch-01-r5/diff-check.json')),JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence));if(unresolved.length)process.exitCode=1;
