import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
const task='tinlumo-production-remaster-r1',read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',windowsHide:true,maxBuffer:32e6}).trim();
const tracked=new Set(git('ls-files','-z').split('\0')),before=read(task+'/internal/before.json');
const dist=read(task+'/internal/distribution.json'),defs=read('src/data/visual-release.json').games;
assert.equal(git('rev-parse','HEAD'),before.head);assert.equal(git('diff','--cached','--name-only'),'');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
const proposed=new Map(),dependencies=new Set();
function add(file,reason){file=file.replaceAll('\\','/');assert(fs.existsSync(file),file);assert(!/(?:node_modules|browser-profile|Secure Preferences|\.key$|\.pem$|\.dev.vars|\.env(?:\.|$))/.test(file),file);proposed.set(file,reason);}
for(const p of walk('src/production'))add(p,'Production source');
for(const p of ['src/data/games.ts','src/data/visual-release.json','astro.visual-remaster.config.mjs','tsconfig.visual-remaster.json',...fs.readdirSync('scripts').filter(p=>p.startsWith('visual-remaster')).map(p=>'scripts/'+p)])add(p,'Production integration / build');
for(const p of walk(task+'/scripts'))add(p,'Reproduction and audit tools');
for(const p of walk(task+'/tests'))add(p,'Integration tests');
for(const name of ['analyze.mjs','DISPOSITION_REVIEW.md','disposition.json','HUMAN_DISPOSITION.md','human-approval.json','fresh-gate.mjs','apply-gate-report.mjs']){const p=task+'/security-new5/'+name;if(fs.existsSync(p))add(p,'Value-free current-RC security disposition / local verification');}
for(const p of walk(task+'/review'))if(!p.endsWith('/scoped-git-manifest.json'))add(p,'Review evidence');
for(const p of fs.readdirSync(task+'/internal'))if((p.endsWith('.json')&&!['before.json','server.json'].includes(p))||['HUMAN_REQUEST.txt'].includes(p))add(task+'/internal/'+p,'Scoped QA receipt / authority');
for(const p of walk(task+'/internal/metafiles'))add(p,'Exact bundle dependency graph');
for(const p of walk(task+'/internal/adapted'))add(p,'Reviewable compile adapter output');
for(const f of dist.files)add(dist.root+'/'+f.file,'New candidate artifact');
for(const row of dist.sourceProvenance)if(!row.file.includes('node_modules/'))dependencies.add(row.file);
for(const d of defs.filter(d=>d.id!=='game005'))for(const f of [d.entry,'game.css',...(d.id==='tiny-delivery'?['full.css','bgm-audio/D1.wav']:[])])dependencies.add(d.source+'/public/'+f);
for(const f of ['tinlumo-remaster-wave1/magnet/internal/browser-qa.json','tinlumo-remaster-wave1/magnet/internal/canonical-inputs.json','tinlumo-remaster-wave1/public/reports/PERFORMANCE.md','docs/qa/game005-release-r1/route-B-play.json','docs/qa/game005-release-r1/play.mjs'])dependencies.add(f);
const requiredAlreadyTracked=[];
for(const p of dependencies){assert(fs.existsSync(p),p);if(tracked.has(p))requiredAlreadyTracked.push(p);else add(p,'Accepted input or reused QA dependency, preserved unchanged');}
const files=[...proposed].sort(([a],[b])=>a.localeCompare(b)).map(([file,reason])=>({file,reason,tracked:tracked.has(file),bytes:fs.statSync(file).size,sha256:hash(fs.readFileSync(file))}));
const ignored=spawnSync('git',['check-ignore','--stdin'],{input:files.map(f=>f.file).join('\n'),encoding:'utf8',windowsHide:true});assert([0,1].includes(ignored.status));assert.equal(ignored.stdout.trim(),'','Ignored file proposed');
const result={status:'MANIFEST_READY_NO_STAGE_AUTHORIZED',head:before.head,branch:git('branch','--show-current'),upstream:git('rev-parse','--abbrev-ref','@{upstream}'),indexEmpty:true,files,
 partialFile:{file:'docs/games/PRODUCTION_CURRENT.md',onlyBlock:'<!-- tinlumo-production-remaster-r1:start --> through <!-- tinlumo-production-remaster-r1:end -->',existingDirtyContentPreserved:true,wholeFileStageForbidden:true},
 manifestSelf:{file:task+'/review/scoped-git-manifest.json',sha256:'EXCLUDED_FROM_SELF_HASH'},
 requiredAlreadyTracked:requiredAlreadyTracked.sort(),existingTrackedBuildDependencies:['package.json','package-lock.json','game005-island/package.json','game005-island/package-lock.json','src/rc/','scripts/release-prepare.mjs','config/release-production/','release-artifacts/game005-web-v1/','docs/qa/game005-release-r1/distribution.json'],
 excluded:['All unrelated pre-existing dirty/untracked work','marketing/** and all browser profiles','TLS keys, environment files, private data','node_modules/**','.cache/**','.tmp/**','internal/before.json','internal/PRODUCTION_CURRENT.before.md','internal/temp/**','internal/*.log','internal/server.json','internal/scan.ignore'],
 reproduction:'Install locked root and game005-island dependencies; node scripts/visual-remaster-build.mjs. Security/entry-preservation audit scripts intentionally require local ignored evidence; do not commit that private audit input.',
 futureGate:'New five have current-RC-only Human dispositions; fresh security-fresh-gate.json controls technical readiness. Prior17/historical11/S04/S05 remain unchanged. No stage/commit/push/deploy until explicit scoped Human authorization. Never git add .'};
fs.writeFileSync(task+'/review/scoped-git-manifest.json',JSON.stringify(result,null,2)+'\n');console.log({manifestFiles:files.length,acceptedTrackedDependencies:requiredAlreadyTracked.length,indexEmpty:true});
