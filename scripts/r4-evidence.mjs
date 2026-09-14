import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const digest=b=>createHash('sha256').update(b).digest('hex'),out=projectPath(path.join(projectRoot,'docs/qa/batch-01-r4'));
const baseline=JSON.parse(await readFile(projectPath(path.join(projectRoot,'.tmp/r4-before/baseline.json')),'utf8'));
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,encoding:'utf8',windowsHide:true}).trim();
const changed=[],missing=[];let unchanged=0;
for(const r of baseline.records){try{if(digest(await readFile(projectPath(path.join(projectRoot,r.file))))===r.digest)unchanged++;else changed.push(r.file);}catch{missing.push(r.file);}}
const protectedFile=p=>/^(public\/|src\/(?!prototypes\/)|START_HERE|AGENTS\.md|SECURITY\.md|docs\/qa\/(?!batch-01-r4)|docs\/security\/)/.test(p);
const rulesArtSave=p=>/^src\/prototypes\//.test(p)&&/(levels|answers|rules|state|protocol|art\.ts|light-r2|delivery-r2|game-r2\.css|game-r3\.css)/.test(p);
const evidence={at:new Date().toISOString(),actualModel:'gpt-6-astra',modelEvidence:'current session 01a09e26-075f-77d3-989a-ee4afd287d7a turn_context.model; read-only review subagent inherited Astra, no separate attestation',head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),headUnchanged:git('rev-parse','HEAD')===baseline.head,indexUnchanged:git('ls-files','--stage')===baseline.index,stagedCount:git('diff','--cached','--name-only').split('\n').filter(Boolean).length,upstreamLocalRef:git('rev-parse','@{upstream}'),remoteLiveChecked:false,baselineFiles:baseline.records.length,unchanged,changed,missing,protectedChanged:changed.filter(protectedFile),rulesArtSaveChanged:changed.filter(rulesArtSave),attachmentCopyExact:Buffer.compare(await readFile('C:/Users/PUBLIC_USER/Downloads/GAME_DIRECT_MANIPULATION_R4.md'),await readFile(path.join(projectRoot,'docs/games/GAME_DIRECT_MANIPULATION_R4.md')))===0,status:git('status','--porcelain=v1'),operations:{stage:0,commit:0,push:0,deploy:0,realAds:0,purchase:0,newExternalServices:0,globalConfiguration:0}};
await writeFile(path.join(out,'git-state.json'),JSON.stringify(evidence,null,2));
console.log(JSON.stringify({headUnchanged:evidence.headUnchanged,indexUnchanged:evidence.indexUnchanged,staged:evidence.stagedCount,changed,missing,protectedChanged:evidence.protectedChanged,rulesArtSaveChanged:evidence.rulesArtSaveChanged,attachmentCopyExact:evidence.attachmentCopyExact}));
// Candidate value stays in memory. Never report the value, fragments or source line.
const original=JSON.parse(await readFile(path.join(projectRoot,'.tmp/r3-before/manifest.json'),'utf8')),file='docs/security/SECRETS_REGISTER.md';
const blob=execFileSync('git',['show',`${original.head}:${file}`],{cwd:projectRoot,windowsHide:true});
const findingScan=spawnSync(path.join(projectRoot,'.cache/tools/gitleaks/8.30.1/gitleaks.exe'),['dir',path.join(projectRoot,'.tmp/r3-before/manifest.json'),'--config',path.join(projectRoot,'.gitleaks.toml'),'--redact=100','--no-banner','--no-color','--report-format=json','--report-path=-'],{cwd:projectRoot,encoding:'utf8',windowsHide:true});
if(![0,1].includes(findingScan.status))throw Error('Candidate scan unavailable; preserve PENDING');
const findings=JSON.parse(findingScan.stdout).map(f=>({rule:f.RuleID,line:f.StartLine}));
const security={at:new Date().toISOString(),candidateFile:'.tmp/r3-before/manifest.json',findings,jsonKey:'hashes["docs/security/SECRETS_REGISTER.md"]',generator:'scripts/r3-baseline.mjs:10-14',sourceType:'local file SHA256 integrity digest',sameGenerationBackupContainsTarget:false,baselineGitBlobMatch:original.hashes[file]===digest(blob),currentFileMatch:original.hashes[file]===digest(await readFile(path.join(projectRoot,file))),baselineStatusMentionsTarget:original.status.includes(file),baselineDiffMentionsTarget:(await readFile(path.join(projectRoot,'.tmp/r3-before/starting.diff'),'utf8')).includes(file),currentTargetDiffEmpty:git('diff',original.head,'--',file)==='',recommendation:'Generated non-secret file-integrity SHA256; proposed false positive',disposition:'PENDING: Human judgment required; no exception added',wholeProject:JSON.parse(await readFile(path.join(projectRoot,'.tmp/security-r1/all.summary.json'),'utf8')),fullIndex:JSON.parse(await readFile(path.join(projectRoot,'.tmp/security-r1/staged.summary.json'),'utf8')),valuesEmitted:false,providerValidation:false};
await writeFile(path.join(out,'security-provenance.json'),JSON.stringify(security,null,2));
console.log('Security provenance: baselineGitBlobMatch='+security.baselineGitBlobMatch+'; Human disposition PENDING.');
if(missing.length||evidence.protectedChanged.length||evidence.rulesArtSaveChanged.length||!evidence.headUnchanged||!evidence.indexUnchanged||evidence.stagedCount||!evidence.attachmentCopyExact)process.exitCode=1;
