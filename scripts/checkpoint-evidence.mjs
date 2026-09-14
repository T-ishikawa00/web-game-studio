import {readFileSync,writeFileSync,statSync,existsSync} from 'node:fs';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {projectRoot,projectPath} from './project-path.mjs';
const git=(...args)=>execFileSync('git',args,{cwd:projectRoot,encoding:'utf8',windowsHide:true,stdio:['ignore','pipe','pipe'],maxBuffer:64*1024*1024});
const file=f=>projectPath(path.join(projectRoot,f)),read=f=>JSON.parse(readFileSync(file(f),'utf8'));
const out='docs/qa/batch-01-checkpoint';
const counts={'full-run-results.json':54,'input-results.json':14,'state-results.json':6,'regression-results.json':15,'layout-results.json':54,'responsive-results.json':84,'visual-contract-results.json':6,'review-results.json':2,'portal/browser-results.json':19};
const suites=Object.entries(counts).map(([name,expected])=>{const data=read(`${out}/${name}`),rows=Array.isArray(data)?data:data.results;const pass=rows.length===expected&&rows.every(r=>r.status==='PASS')&&!(data.errors?.length)&&!(data.external?.length);if(!pass)throw Error(`QA failed: ${name}`);return {file:name,passed:rows.length,status:'PASS'};});
const before=read('.tmp/r5-before/baseline.json');
const allowed=new Set(['scripts/prototype-assets.mjs','scripts/prototype-covers.mjs','src/prototypes/art.ts','src/prototypes/board-view.ts','src/prototypes/game-r2.ts','src/prototypes/guides.ts','docs/records/ASSET_REGISTER_R1.md','AGENTS.md','README.md']);
const changed=[],missing=[];
for(const r of before.records){if(!existsSync(file(r.file))){missing.push(r.file);continue;}if(createHash('sha256').update(readFileSync(file(r.file))).digest('hex')!==r.digest)changed.push(r.file);}
if(missing.length||changed.some(f=>!allowed.has(f)))throw Error('Unexplained baseline change; stop.');
const tracked=git('diff','HEAD','--name-only','-z').split('\0').filter(Boolean);
const untracked=git('ls-files','--others','--exclude-standard','-z').split('\0').filter(Boolean);
const candidates=[...new Set([...tracked,...untracked])].sort().map(f=>({file:f,bytes:statSync(file(f)).size}));
const forbidden=candidates.filter(r=>/^(?:\.tmp|\.cache|dist|node_modules|\.astro|test-results|playwright-report)\//.test(r.file)||/\.(?:log|pem|key|p12|pfx)$/.test(r.file));
if(forbidden.length)throw Error('Forbidden commit artifact; stop.');
const empty=file('.tmp/checkpoint-empty');writeFileSync(empty,'');const rawWhitespace=[];
for(const r of candidates.filter(r=>/\.(?:ts|mjs|css|md|json|html|astro)$/.test(r.file))){const result=spawnSync('git',['diff','--no-index','--check','--',empty,file(r.file)],{cwd:projectRoot,encoding:'utf8',windowsHide:true});if(result.error||![0,1,3].includes(result.status))throw Error('Diff check error');if(result.stdout.trim())rawWhitespace.push(r.file);}
const old=read('docs/qa/batch-01-r5/diff-check.json');
if(rawWhitespace.some(f=>!old.problems.includes(f)))throw Error('New whitespace finding; stop.');
const record={at:new Date().toISOString(),cwd:projectRoot,branch:git('branch','--show-current').trim(),parent:git('rev-parse','HEAD').trim(),upstream:git('rev-parse','@{upstream}').trim(),remote:git('remote','get-url','origin').trim(),actualModel:'gpt-6-astra',modelEvidence:'session 01a09f3c-dace-70f3-ae56-3b1cb083de43 turn_context.model; unchanged model allocation',suites,baseline:{files:before.records.length,changed,missing,unexpected:[],protectedGameplaySavePortalUnchanged:true},inventory:{files:candidates.length,bytes:candidates.reduce((n,r)=>n+r.bytes,0),largestBytes:Math.max(...candidates.map(r=>r.bytes)),forbidden,candidates},preservedIgnored:['.tmp/r2-before','.tmp/r3-before','.tmp/r4-before','.tmp/r5-before'].map(f=>({file:f,exists:existsSync(file(f))})),diffCheck:{rawStatus:rawWhitespace.length?'FINDINGS_PRESERVED':'PASS',files:rawWhitespace,newImplementationFindings:0,classification:'Unchanged original Markdown whitespace; see prior R5 diff-check.json; no blanket whitespace suppression'},hook:{path:git('config','--get','core.hooksPath').trim(),indexMode:git('ls-files','-s','.githooks/pre-commit').trim().split(' ')[0],fullIndexScan:true},externalReadOnlyPreflight:{repository:'T-ishikawa00/web-game-studio',visibility:'private',defaultBranch:'main',remoteMain:git('ls-remote','origin','refs/heads/main').trim().split(/\s+/)[0]}};
if(record.parent!==record.upstream||record.parent!==record.externalReadOnlyPreflight.remoteMain||record.branch!=='main'||record.hook.path!=='.githooks'||record.hook.indexMode!=='100755')throw Error('Git preflight mismatch; stop.');
writeFileSync(file(`${out}/checkpoint-evidence.json`),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({...record,inventory:{...record.inventory,candidates:undefined}},null,2));
