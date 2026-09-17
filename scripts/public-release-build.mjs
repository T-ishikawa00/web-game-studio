// Local-only candidate and gated production packaging. No provider calls.
import {readFile,writeFile,mkdir,readdir,access} from 'node:fs/promises';
import {spawnSync,execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
import {publicHtml} from './release-prepare.mjs';
import {publicPrerequisites} from './public-release-readiness.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
const evidence='docs/qa/public-release-final-r1',candidate='.cache/tinlumo-public-candidate',assets='.cache/tinlumo-public-assets';
const site=JSON.parse(await readFile('src/rc/site.json')),measurement=JSON.parse(await readFile('config/release-production/measurement.json'));
const blockers=publicPrerequisites(site,measurement),ready=process.argv.includes('--production');
const manualReview=process.argv.includes('--verify-manual-snippet');
const configuredAnalytics=ready||manualReview;
if(configuredAnalytics){assert.equal(measurement.enabled,true);assert.equal(measurement.automaticInsertionConfirmedDisabled,true);assert.match(measurement.publicBeaconId??'',/^[a-f0-9]{32}$/i);}
await mkdir(projectPath(evidence),{recursive:true});
await writeFile(projectPath(evidence+'/readiness.json'),JSON.stringify({at:new Date().toISOString(),status:blockers.length?'PUBLIC_RELEASE_BLOCKED':'PUBLIC_PREREQUISITES_READY',blockers,evidence:site.publicLaunch.evidence,afterDeployment:'Actual anonymous production smoke NOT TESTED',externalOperations:0},null,2)+'\n');
if(process.argv.includes('--check')||(ready&&blockers.length)){console.log(JSON.stringify({status:blockers.length?'PUBLIC_RELEASE_BLOCKED':'PUBLIC_PREREQUISITES_READY',codes:blockers.map(b=>b.code),outputCreated:false}));process.exit(blockers.length?1:0);}
assert.equal(path.resolve(process.cwd()).toLowerCase(),projectRoot.toLowerCase());
const original=JSON.parse(await readFile('docs/qa/soft-launch-rc-r1/checkpoint-r1/distribution-manifest.json'));
assert.equal(original.files.length,48);
const retained=[];
for(const f of original.files){
 const b=await readFile(projectPath('.cache/rc-dist/'+f.file));assert.equal(hash(b),f.sha256,'Accepted RC changed: '+f.file);
 if(/^(games\/|assets\/|covers\/|licenses\/)/.test(f.file)||f.file==='favicon.svg'){
  const dest=projectPath(assets+'/'+f.file);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,b);retained.push(f);
 }
}
await writeFile(projectPath(assets+'/assets/public-language.js'),await readFile('src/rc/public-language.js'));
await writeFile(projectPath(assets+'/assets/analytics-consent.js'),await readFile('src/rc/analytics-consent.js'));
const build=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--config','astro.public.config.mjs'],{cwd:projectRoot,stdio:'inherit',windowsHide:true,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',TINLUMO_PUBLIC_CANDIDATE:'1',TEMP:projectPath('.tmp'),TMP:projectPath('.tmp')}});
assert.equal(build.status,0,'Public candidate Astro build failed');
const urls=[];
async function walk(dir,prefix=''){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){assert.ok(!e.isSymbolicLink());const f=prefix+e.name;if(e.isDirectory())out.push(...await walk(path.join(dir,e.name),f+'/'));else out.push(f);}return out;}
const allowed=new Set([...original.files.map(f=>f.file).filter(f=>!f.startsWith('_astro/')), 'assets/public-language.js','assets/analytics-consent.js','sitemap.xml','_headers']);
for(const f of await walk(candidate)){
 assert.ok(allowed.has(f)||/^_astro\/[a-zA-Z0-9_.-]+\.css$/.test(f),'Unexpected candidate file: '+f);
 if(f==='index.html'||/^(ja|en)\/(?:[a-z0-9-]+\/)*index\.html$/.test(f)){
  const route='/'+f.replace(/index\.html$/,'');urls.push('https://tinlumo.com'+route);
  let html=await readFile(candidate+'/'+f,'utf8');
  if(ready)assert.ok(!/data-public-unresolved|未確定|Undecided|await review|under review|確認中/.test(html),'Unresolved public text: '+f);
  html=publicHtml(html,route,'https://tinlumo.com',configuredAnalytics?measurement.publicBeaconId:null,{indexable:ready});
  await writeFile(projectPath(candidate+'/'+f),html);
 }
}
assert.equal(urls.length,27);
await writeFile(projectPath(candidate+'/robots.txt'),ready?'User-agent: *\nAllow: /\nSitemap: https://tinlumo.com/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
await writeFile(projectPath(candidate+'/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(loc=>`<url><loc>${loc}</loc></url>`).join('')}</urlset>`);
const headers=await readFile('config/release-final-r1/_headers.template','utf8');
await writeFile(projectPath(candidate+'/_headers'),headers+(ready?'\n/games/*\n  X-Robots-Tag: noindex, nofollow\n\n/404.html\n  X-Robots-Tag: noindex, nofollow\n':'\n/*\n  X-Robots-Tag: noindex, nofollow\n'));
for(const f of retained)assert.equal(hash(await readFile(candidate+'/'+f.file)),f.sha256,'Runtime/asset changed: '+f.file);
const files=[];for(const file of (await walk(candidate)).sort()){const b=await readFile(candidate+'/'+file);assert.ok(b.length<=25*1024*1024);files.push({file,bytes:b.length,sha256:hash(b)});}
const sources=[];for(const file of [...new Set([...execFileSync('git',['ls-files','src/rc','src/components','src/data','src/i18n','src/styles'],{encoding:'utf8',windowsHide:true}).trim().split('\n'),'src/rc/PublicOperations.astro','src/rc/public-language.js','src/rc/AnalyticsConsent.astro','src/rc/analytics-consent.js','astro.public.config.mjs','scripts/public-release-build.mjs','scripts/public-release-readiness.mjs','scripts/release-prepare.mjs','config/release-production/measurement.json','config/release-production/wrangler.json'])].sort())sources.push({file,sha256:hash(await readFile(file))});
if(ready){
 const out=projectPath('.cache/tinlumo-approved-dist');let exists=false;try{await access(out);exists=true;}catch{}assert.ok(!exists,'Preserve existing approved artifact; no overwrite');
 for(const f of files){const target=projectPath(out+'/'+f.file);await mkdir(path.dirname(target),{recursive:true});await writeFile(target,await readFile(candidate+'/'+f.file),{flag:'wx'});}
}
const report={at:new Date().toISOString(),mode:ready?'PRODUCTION_PACKAGE':manualReview?'LOCAL_MANUAL_ANALYTICS_REVIEW':'LOCAL_REVIEW_ONLY',deployAllowed:false,checkpointRequired:ready,root:candidate,approvedRoot:ready?'.cache/tinlumo-approved-dist':null,files,sources,retainedAcceptedPayloads:retained.length,acceptedRcFilesVerified:48,publicUrls:urls.length,analyticsIncluded:configuredAnalytics,gameChanges:0,externalOperations:0};
await writeFile(projectPath(evidence+(ready?'/production-manifest.json':'/candidate-manifest.json')),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({mode:report.mode,files:files.length,retainedAcceptedPayloads:retained.length,status:blockers.length?'PUBLIC_RELEASE_BLOCKED':'PUBLIC_PREREQUISITES_READY'}));
