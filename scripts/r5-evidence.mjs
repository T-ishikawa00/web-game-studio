import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {projectRoot,projectPath} from './project-path.mjs';
const out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r5'));
const baseline=JSON.parse(await readFile(path.join(projectRoot,'.tmp/r5-before/baseline.json'),'utf8'));
const git=(...a)=>execFileSync('git',a,{cwd:projectRoot,encoding:'utf8',windowsHide:true}).trim();
const changed=[],missing=[];let unchanged=0;
for(const r of baseline.records){try{const value=createHash('sha256').update(await readFile(projectPath(path.join(projectRoot,r.file)))).digest('hex');if(value===r.digest)unchanged++;else changed.push(r.file);}catch{missing.push(r.file);}}
const allowed=new Set(['src/prototypes/art.ts','src/prototypes/board-view.ts','src/prototypes/game-r2.ts','src/prototypes/guides.ts','scripts/prototype-assets.mjs','scripts/prototype-covers.mjs','docs/records/ASSET_REGISTER_R1.md']);
const evidence={at:new Date().toISOString(),actualModel:baseline.model,modelEvidence:baseline.modelEvidence,head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),headUnchanged:git('rev-parse','HEAD')===baseline.head,indexUnchanged:git('ls-files','--stage')===baseline.index,stagedCount:git('diff','--cached','--name-only').split('\n').filter(Boolean).length,upstreamLocalRef:git('rev-parse','@{upstream}'),remoteLiveChecked:false,baselineFiles:baseline.records.length,unchanged,changed,missing,unexpectedChanges:changed.filter(f=>!allowed.has(f)),attachmentCopyExact:Buffer.compare(await readFile('C:/Users/PUBLIC_USER/Downloads/GAME_VISUAL_LANGUAGE_R5.md'),await readFile(path.join(projectRoot,'docs/games/GAME_VISUAL_LANGUAGE_R5.md')))===0,operations:{stage:0,commit:0,push:0,deploy:0,realAds:0,purchase:0,newExternalServices:0,globalConfiguration:0}};
await writeFile(path.join(out,'git-state.json'),JSON.stringify(evidence,null,2));
const previous=JSON.parse(await readFile(path.join(projectRoot,'docs/qa/batch-01-r4/security-provenance.json'),'utf8'));
const security={...previous,at:new Date().toISOString(),priorEvidence:'docs/qa/batch-01-r4/security-provenance.json (preserved; existing candidate provenance reused, no repeated provider/candidate probe)',wholeProject:JSON.parse(await readFile(path.join(projectRoot,'.tmp/security-r1/all.summary.json'),'utf8')),fullIndex:JSON.parse(await readFile(path.join(projectRoot,'.tmp/security-r1/staged.summary.json'),'utf8')),disposition:'PENDING: Human has not approved an exception',newExceptions:0};
await writeFile(path.join(out,'security-provenance.json'),JSON.stringify(security,null,2));
console.log(JSON.stringify({headUnchanged:evidence.headUnchanged,indexUnchanged:evidence.indexUnchanged,baselineFiles:evidence.baselineFiles,changed,missing,unexpectedChanges:evidence.unexpectedChanges,attachmentCopyExact:evidence.attachmentCopyExact,wholeProject:security.wholeProject.status,fullIndex:security.fullIndex.status,disposition:'PENDING'}));
if(missing.length||evidence.unexpectedChanges.length||!evidence.headUnchanged||!evidence.indexUnchanged||!evidence.attachmentCopyExact||evidence.stagedCount)process.exitCode=1;
