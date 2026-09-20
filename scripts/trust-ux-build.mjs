// Local packaging only. --production builds a separate artifact; never deploys.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync,execFileSync} from 'node:child_process';
import {projectPath,projectRoot} from './project-path.mjs';
import {publicHtml} from './release-prepare.mjs';
assert.equal(path.resolve(process.cwd()),projectRoot);
const production=process.argv[2]==='--production';
assert.ok(process.argv.length===2||(production&&process.argv.length===3));
const root=production?'release-artifacts/tinlumo-trust-ux-r2':'.cache/tinlumo-trust-ux-r2',assets='.cache/tinlumo-trust-ux-r2-assets',qa=production?'docs/qa/tinlumo-trust-ux-r2-release':'docs/qa/tinlumo-trust-ux-r2';
const hash=b=>createHash('sha256').update(b).digest('hex');
const write=async(p,b)=>{const dest=projectPath(p);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,b);};
const baseline=JSON.parse(await fs.readFile('docs/qa/game004-magnet-release-r1/distribution.json'));
const retained=[];
for(const f of baseline.files){
 const b=await fs.readFile(baseline.root+'/'+f.file);assert.equal(hash(b),f.sha256,'Accepted artifact changed: '+f.file);
 if(/^(games\/|assets\/|covers\/|licenses\/)/.test(f.file)||f.file==='favicon.svg'){await write(assets+'/'+f.file,b);retained.push(f);}
}
// Refuse unexpected content in the dedicated assets directory. No broad copy.
async function walk(dir,prefix=''){const a=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){assert.ok(!e.isSymbolicLink());const f=prefix+e.name;if(e.isDirectory())a.push(...await walk(dir+'/'+e.name,f+'/'));else a.push(f);}return a;}
assert.deepEqual((await walk(assets)).sort(),retained.map(f=>f.file).sort());
await fs.mkdir(projectPath('.tmp/trust-ux-r2'),{recursive:true});
const build=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--config','astro.trust.config.mjs'],{cwd:projectRoot,stdio:'inherit',windowsHide:true,env:{...process.env,TINLUMO_TRUST_RELEASE:production?'1':'0',ASTRO_TELEMETRY_DISABLED:'1',TEMP:projectPath('.tmp/trust-ux-r2'),TMP:projectPath('.tmp/trust-ux-r2')}});
assert.equal(build.status,0,'Astro build failed');
const measurement=JSON.parse(await fs.readFile('config/release-production/measurement.json'));
assert.equal(measurement.enabled,true);assert.equal(measurement.automaticInsertionConfirmedDisabled,true);
const urls=[];
for(const file of await walk(root)){
 if(file==='index.html'||/^(ja|en)\/.*index\.html$/.test(file)){
  const route='/'+file.replace(/index\.html$/,'');urls.push('https://tinlumo.com'+route);
  let html=await fs.readFile(root+'/'+file,'utf8');
  // Fullscreen launch documents have no site analytics, matching production.
  const consent=html.includes('data-analytics-consent');
  html=publicHtml(html,route,'https://tinlumo.com',consent?measurement.publicBeaconId:null,{indexable:production});
  await write(root+'/'+file,html);
 }
}
await write(root+'/robots.txt',production?'User-agent: *\nAllow: /\nSitemap: https://tinlumo.com/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
await write(root+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>`);
await write(root+'/_headers',(await fs.readFile(baseline.root+'/_headers','utf8'))+(production?'':'\n/*\n  X-Robots-Tag: noindex, nofollow\n'));
for(const f of retained)assert.equal(hash(await fs.readFile(root+'/'+f.file)),f.sha256,'Runtime or asset changed: '+f.file);
const files=[];for(const file of (await walk(root)).sort()){const b=await fs.readFile(root+'/'+file);assert.ok(b.length<25*1024*1024);files.push({file,bytes:b.length,sha256:hash(b)});}
const sourcePaths=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z','--','src/rc','src/components','src/data','src/i18n','src/styles','src/prototypes','astro.trust.config.mjs','scripts/trust-ux-build.mjs','scripts/release-prepare.mjs','config/release-production/measurement.json'],{encoding:'utf8',windowsHide:true}).split('\0').filter(Boolean);
const sources=[];for(const file of [...new Set(sourcePaths)].sort())sources.push({file,sha256:hash(await fs.readFile(file))});
const manifest={status:production?'PRODUCTION_ARTIFACT_PENDING_QA':'LOCAL_REVIEW_ONLY',deployAllowed:false,root,files,sources,retained,baseline:'docs/qa/game004-magnet-release-r1/distribution.json',publicUrls:urls.length,analytics:'Original consent runtime; production-only hostname guard; no local transmission',models:['gpt-6-astra'],externalOperations:0};
await write(qa+'/distribution.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({status:manifest.status,files:files.length,runtimeAssetsRetained:retained.length,urls:urls.length}));
