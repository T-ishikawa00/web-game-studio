// Offline validation only. Does not invoke Wrangler, resolve DNS, or publish files.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {rcEvidenceDir as out} from './rc-evidence.mjs';
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const config=await json('config/release-final-r1/wrangler.template.json'),measurement=await json('config/release-final-r1/measurement.template.json'),site=await json('src/rc/site.json'),manifest=await json(`${out}/distribution-manifest.json`);
assert.equal(config.workers_dev,false);assert.equal(config.preview_urls,false);assert.equal(config.observability.enabled,false);
assert.equal(config.assets.directory,'../../.cache/tinlumo-approved-dist');assert.equal(config.assets.not_found_handling,'404-page');assert.equal(config.assets.html_handling,'auto-trailing-slash');
for(const field of ['main','routes','r2_buckets','d1_databases','kv_namespaces','analytics_engine_datasets'])assert.equal(config[field],undefined);
assert.equal(config.assets.run_worker_first,undefined);assert.equal(measurement.enabled,false);assert.equal(measurement.eventEndpoint,null);assert.equal(measurement.publicBeaconId,null);assert.equal(site.analyticsProvider,'disabled');
assert.ok(manifest.files.length<=20000);assert.ok(manifest.files.every(f=>f.bytes<=25*1024*1024));
const headers=await readFile('config/release-final-r1/_headers.template','utf8');assert.match(headers,/X-Frame-Options: SAMEORIGIN/);assert.match(headers,/Cache-Control: no-cache/);
const pages=manifest.files.filter(f=>/^(ja|en)\/.+index.html$|^(ja|en)\/index.html$/.test(f.file));
const seoPlan=pages.map(f=>{const path='/'+f.file.replace(/index.html$/,'');return {path,canonicalAfterDomainDecision:`https://<approved-domain>${path}`,ja:path.replace(/^\/en\//,'/ja/'),en:path.replace(/^\/ja\//,'/en/'),xDefault:'/',indexableAfterApproval:true};});
assert.equal(seoPlan.length,26);assert.ok(seoPlan.every(p=>pages.some(f=>'/'+f.file.replace(/index.html$/,'')===p.ja)&&pages.some(f=>'/'+f.file.replace(/index.html$/,'')===p.en)));
const report={at:new Date().toISOString(),status:'PASS',scope:'Offline template/limits/route projection only; not Wrangler schema/runtime/CDN validation',files:manifest.files.length,maxAssetBytes:Math.max(...manifest.files.map(f=>f.bytes)),deploymentEnabled:false,externalAnalyticsEnabled:false,domain:site.domain,seoPlan,publicArtifactGenerated:false,remaining:'Human decisions; approved production-only SEO/copy transition; schema validation with pinned Wrangler; authorized provider setup; HTTPS/header/cache/404 live smoke'};
await writeFile(`${out}/hosting-validation.json`,JSON.stringify(report,null,2));console.log('PASS offline hosting templates, limits and 26 localized SEO route pairs; no deployment');
