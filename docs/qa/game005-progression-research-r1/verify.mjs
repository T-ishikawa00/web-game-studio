// Local document-only QA. No Git mutations or external calls.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
const root=process.cwd(),out='docs/qa/game005-progression-research-r1';
if(root.replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('Unexpected workspace');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=a=>execFileSync('git',a,{windowsHide:true,maxBuffer:20_000_000}).toString().trim();
const before=JSON.parse(fs.readFileSync(out+'/before.json'));
const changed=before.files.filter(a=>!fs.existsSync(a.file)||hash(fs.readFileSync(a.file))!==a.sha256).map(a=>a.file);
const current='docs/games/PRODUCTION_CURRENT.md';
const currentBytes=fs.readFileSync(current,'utf8').replace(/<!-- game005-progression-research-r1:start -->[\s\S]*?<!-- game005-progression-research-r1:end -->\r?\n\r?\n/,'');
const currentPreserved=hash(currentBytes)===before.files.find(a=>a.file===current).sha256;
const docs=['docs/games/GAME005_PROGRESSION_RESEARCH_AND_EXPANSION_R1.md','docs/games/GAME005_PROGRESSION_RESEARCH_R1_SOURCES.md',out+'/REPORT.md'];
const badLinks=[],whitespace=[];
for(const file of docs){const s=fs.readFileSync(file,'utf8');for(const match of s.matchAll(/\]\(([^)]+)\)/g)){const dest=match[1];if(/^(https?:|#)/.test(dest))continue;const local=dest.split('#')[0];if(!fs.existsSync(path.resolve(path.dirname(file),local)))badLinks.push({file,target:dest});}s.split('\n').forEach((l,i)=>{if(/[\t ]+$/.test(l.replace(/\r$/,'')))whitespace.push({file,line:i+1});});}
const frozen=JSON.parse(fs.readFileSync('docs/qa/game005-high-quality-mvp-baseline/frozen-manifest.json'));
const derived=frozen.derivedDistribution.map(a=>({file:`game005-island/r3-2/${a.directory}/${a.file}`,expected:a.sha256}));
const derivedChanged=derived.filter(a=>!fs.existsSync(a.file)||hash(fs.readFileSync(a.file))!==a.expected).map(a=>a.file);
const files=git(['ls-files','-c','-o','--exclude-standard','-z']).split('\0').filter(Boolean);
const newFiles=files.filter(f=>!before.files.some(a=>a.file===f));
const allowedNew=f=>f.startsWith(out+'/')||docs.includes(f);
const diff=spawnSync('git',['diff','--check'],{encoding:'utf8',windowsHide:true});
const checks={headUnchanged:git(['rev-parse','HEAD'])===before.head,branchUnchanged:git(['branch','--show-current'])===before.branch,upstreamUnchanged:git(['rev-parse','@{upstream}'])===before.upstream,indexUnchanged:git(['ls-files','--stage'])===before.index,existingChangesOnlyCurrent:changed.every(f=>f===current),currentOriginalTextBytePreserved:currentPreserved,newFilesInScope:newFiles.every(allowedNew),localLinks:badLinks.length===0,whitespace:whitespace.length===0&&diff.status===0,originalDerivedBuildBytes:derivedChanged.length===0};
const report={at:new Date().toISOString(),status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks,existingFiles:before.files.length,unchangedExistingFiles:before.files.length-changed.length,changedExistingFiles:changed,newFiles,badLinks,whitespace,originalDerivedBuildCount:derived.length,derivedChanged};
fs.writeFileSync(out+'/verification.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.status!=='PASS')process.exitCode=1;
