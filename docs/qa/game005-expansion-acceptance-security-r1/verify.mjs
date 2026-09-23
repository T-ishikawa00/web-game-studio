import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {execFileSync,spawnSync} from 'node:child_process';
const out='docs/qa/game005-expansion-acceptance-security-r1',before=JSON.parse(fs.readFileSync(out+'/before.json')),git=a=>execFileSync('git',a,{encoding:'utf8',windowsHide:true,maxBuffer:16_000_000});
if(process.cwd().replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('root');
const hash=f=>createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const current='docs/games/PRODUCTION_CURRENT.md',changed=before.files.filter(e=>!fs.existsSync(e.file)||hash(e.file)!==e.sha256).map(e=>e.file);
const text=fs.readFileSync(current,'utf8'),without=text.replace(/<!-- game005-expansion-acceptance-r1:start -->[\s\S]*?<!-- game005-expansion-acceptance-r1:end -->\r?\n\r?\n/,'');
const prior=before.current;
const preserved={existingFiles:before.files.length,changed,onlyIntendedCurrentChanged:changed.length===1&&changed[0]===current,priorCurrentTextExact:without===prior,head:git(['rev-parse','HEAD']).trim()===before.head,upstream:git(['rev-parse','@{upstream}']).trim()===before.upstream,branch:git(['branch','--show-current']).trim()===before.branch,index:git(['ls-files','--stage']).trim()===before.index,stagedDeltaEmpty:git(['diff','--cached','--name-only']).trim()===''};
const expansion=JSON.parse(fs.readFileSync('game005-island/expansion-r1/review/candidate-manifest.json')).files;
preserved.expansionArtifacts=expansion.length;preserved.expansionChanges=expansion.filter(e=>hash('game005-island/expansion-r1/'+e.file)!==e.sha256).map(e=>e.file);
const docs=['docs/games/GAME005_EXPANSION_SLICE_R1_ACCEPTANCE.md','docs/security/GAME005_EXPANSION_R1_CANDIDATE_DISPOSITION_PENDING.md',out+'/REPORT.md'];
const missing=[];for(const file of docs){for(const m of fs.readFileSync(file,'utf8').matchAll(/\]\(([^)]+)\)/g)){const rel=m[1];if(!/^(https?:|#)/.test(rel)&&!rel.endsWith('verification.json')&&!fs.existsSync(path.resolve(path.dirname(file),rel.split('#')[0])))missing.push({file,target:rel});}}
const snapshot=path.resolve(out+'/.cache/document-scan');fs.mkdirSync(snapshot,{recursive:true});
const newqa=fs.readdirSync(out,{withFileTypes:true}).filter(e=>e.isFile()).map(e=>out+'/'+e.name);
for(const file of [...docs,current,...newqa]){const dest=path.join(snapshot,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest);}
const scan=spawnSync(path.resolve('.cache/tools/gitleaks/8.30.1/gitleaks.exe'),['dir',snapshot,'--config',path.resolve('.gitleaks.toml'),'--redact=100','--no-banner','--no-color','--gitleaks-ignore-path',path.resolve(out+'/empty.ignore'),'--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:16_000_000});
if(![0,1].includes(scan.status))throw Error('scan error');const rows=JSON.parse(scan.stdout);
const documentScan={status:scan.status===0?'PASS':'FAIL',files:newqa.length+docs.length+1,snapshotRetained:true,findings:rows.map(r=>({file:r.File,type:r.RuleID,action:'HUMAN REVIEW REQUIRED'}))};
const baselines=['before','after'].map(phase=>{const b=JSON.parse(fs.readFileSync(out+'/baseline-'+phase+'.json'));return {phase,status:b.status,inputs:b.frozenInputs,exact:b.exactInputBytes,derived:b.rebuilt.length,derivedExact:b.rebuilt.every(x=>x.byteIdentical)};});
const diff=spawnSync('git',['diff','--check'],{encoding:'utf8',windowsHide:true});
const passed=preserved.onlyIntendedCurrentChanged&&preserved.priorCurrentTextExact&&preserved.head&&preserved.upstream&&preserved.branch&&preserved.index&&preserved.stagedDeltaEmpty&&preserved.expansionChanges.length===0&&missing.length===0&&scan.status===0&&diff.status===0&&baselines.every(x=>x.status==='PASS'&&x.inputs===133&&x.exact===133&&x.derived===22&&x.derivedExact);
const report={at:new Date().toISOString(),status:passed?'PASS':'FAIL',preserved,missingLinks:missing,documentScan,baselines,diffCheck:diff.status===0?'PASS':'FAIL',securityDisposition:'HUMAN_DISPOSITION_PENDING for original five; technical document verification is not incident resolution'};
fs.writeFileSync(out+'/verification.json',JSON.stringify(report,null,2));console.log(report);if(!passed)process.exitCode=1;
