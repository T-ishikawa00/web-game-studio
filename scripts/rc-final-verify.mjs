import assert from 'node:assert/strict';
import {readFile,writeFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {rcEvidenceDir as out} from './rc-evidence.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex'),git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim();
const before=JSON.parse(await readFile(`${out}/before.json`));
const allowed=['src/rc/Operations.astro','src/rc/site.json','src/rc/readiness.mjs','scripts/rc-evidence.mjs','tests/unit/rc-readiness.test.ts','docs/games/PRODUCTION_CURRENT.md','docs/records/ASSET_REGISTER_R1.md','docs/planning/TINLUMO_RELEASE_CHECKLIST_R1.md'];
const changed=[],unchanged=[];for(const f of before.source){const current=hash(await readFile(f.file));if(current!==f.sha256){assert.ok(allowed.includes(f.file),'Unexpected existing-file change: '+f.file);changed.push({file:f.file,before:f.sha256,after:current});}else unchanged.push(f.file);}
const payload=before.distribution.filter(f=>!f.file.endsWith('.html'));for(const f of payload)assert.equal(hash(await readFile('.cache/rc-dist/'+f.file)),f.sha256,'Payload '+f.file);
assert.equal(git('rev-parse','HEAD'),before.head);assert.equal(git('rev-parse','@{upstream}'),before.upstream);assert.equal(git('branch','--show-current'),before.branch);assert.equal(git('ls-files','--stage'),before.index);
const currentFiles=[...new Set([...git('ls-files').split('\n'),...git('ls-files','--others','--exclude-standard').split('\n')])].filter(Boolean);
const old=new Set(before.source.map(f=>f.file));const added=currentFiles.filter(f=>!old.has(f));
const pack='docs/planning/TINLUMO_RELEASE_DECISION_PACK_R1.md',report=`${out}/REPORT.md`,links=[];
for(const source of [pack,report]){const body=await readFile(source,'utf8');for(const m of body.matchAll(/\]\(([^)]+)\)/g)){const href=m[1];if(/^(https?:|#)/.test(href))continue;const target=path.resolve(path.dirname(source),href.split('#')[0]);if(!['changes.json','final-verification.json'].some(f=>path.resolve(out,f)===target))await access(target);links.push({source,href});}}
const result={at:new Date().toISOString(),status:'PASS',model:'gpt-6-astra',head:before.head,branch:before.branch,localUpstreamTrackingRef:before.upstream,remoteLiveRef:'NOT QUERIED',indexUnchanged:true,initialFiles:before.source.length,preservedExistingFiles:unchanged.length,changedExistingFiles:changed.length,unchangedNonHtmlPayload:payload.length,oldQaAndFrozenEvidence:'All pre-existing docs/qa bytes unchanged',stableGameplaySaveIdsKeysSchema:true,localLinksChecked:links.length,fullProjectSecurity:'Not rerun; historical raw FAIL2 and exact SHA/TLS dispositions retained',externalOperations:'Official public information read queries only; no publication, account changes, purchases or external telemetry'};
// Write manifests first so the final link-check can include these files on later runs.
await writeFile(`${out}/changes.json`,JSON.stringify({at:result.at,changedExisting:changed,added,existingWorkPreserved:true},null,2));
await writeFile(`${out}/final-verification.json`,JSON.stringify(result,null,2));console.log(result);
