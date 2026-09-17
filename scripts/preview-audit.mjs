import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { projectRoot, projectPath } from './project-path.mjs';

const out='docs/qa/production-deploy-r1',root='.cache/tinlumo-protected-preview-r1';
const manifest=JSON.parse(await readFile(projectPath(out+'/distribution-manifest.json')));
const hash=b=>createHash('sha256').update(b).digest('hex');
async function walk(dir,prefix='') {
  const files=[];
  for(const e of await readdir(projectPath(dir),{withFileTypes:true})) {
    assert.ok(!e.isSymbolicLink(),'Symlink forbidden');
    if(e.isDirectory())files.push(...await walk(dir+'/'+e.name,prefix+e.name+'/'));
    else {assert.ok(e.isFile());files.push(prefix+e.name);}
  }
  return files.sort();
}
assert.deepEqual(await walk(root),manifest.files.map(f=>f.file).sort(),'Actual distribution file set');
const sourceBytes=await readFile(projectPath(manifest.sourceManifest));
assert.equal(hash(sourceBytes),manifest.sourceManifestSha256,'Source manifest digest');
const source=JSON.parse(sourceBytes);
const gitSource=spawnSync('git',['show',manifest.sourceCheckpoint+':'+manifest.sourceManifest],{cwd:projectRoot,encoding:'utf8',windowsHide:true});
assert.equal(gitSource.status,0);assert.deepEqual(source,JSON.parse(gitSource.stdout),'Accepted checkpoint origin');
assert.deepEqual(manifest.files.filter(f=>f.file!=='_headers').map(({file,bytes,sha256})=>({file,bytes,sha256})).sort((a,b)=>a.file.localeCompare(b.file)),source.files.map(({file,bytes,sha256})=>({file,bytes,sha256})).sort((a,b)=>a.file.localeCompare(b.file)),'Original 48 RC files');
const ids='(?:tiny-delivery|light-garden|two-ways-home)';
const allowed=new RegExp(`^(?:_headers|index\\.html|404\\.html|favicon\\.svg|robots\\.txt|licenses/astro\\.txt|_astro/[\\w.-]+\\.css|assets/(?:shell|portal)\\.js|covers/${ids}\\.png|games/${ids}/rc-r1/(?:index\\.html|game\\.js|base\\.css)|games/light-garden/rc-r1/game\\.css|games/tiny-delivery/rc-r1/music\\.wav|(?:ja|en)/(?:index\\.html|(?:games|about|terms|privacy|contact|credits)/index\\.html|(?:games|play)/${ids}/index\\.html))$`);
for(const {file,bytes,sha256} of manifest.files) {
  const actual=await readFile(projectPath(root+'/'+file));
  assert.equal(actual.length,bytes,file);assert.equal(hash(actual),sha256,file);
  assert.ok(allowed.test(file),'Distribution allowlist '+file);
  assert.ok(bytes<=25*1024*1024,'Cloudflare individual asset limit');
  if(/\.(html|js|css|txt)$/.test(file)) {
    const s=await readFile(projectPath(root+'/'+file),'utf8');
    assert.ok(!/C:[\\/]|sourceMappingURL|BEGIN (?:RSA |EC )?PRIVATE KEY|__prototypeState["']?\s*[,=:]\s*Object|connection-lab|design-preview\/|\/prototype-assets\/|home-answers|delivery-answers|light-answers|function solve/i.test(s),'Internal content '+file);
    assert.ok(!/static\.cloudflareinsights\.com|cloudflareinsights\.com\/beacon/.test(s),'Analytics enabled');
    if(file.endsWith('.html'))assert.match(s,/noindex/);
  }
}
assert.ok(manifest.files.length<=20000);
await mkdir(projectPath('.tmp/production-deploy-r1'),{recursive:true});
const ignore=projectPath('.tmp/production-deploy-r1/empty.ignore');
await writeFile(ignore,'');
const scan=spawnSync(projectPath('.cache/tools/gitleaks/8.30.1/gitleaks.exe'),['dir',root,'--config',projectPath('.gitleaks.toml'),'--redact=100','--no-banner','--no-color','--gitleaks-ignore-path',ignore,'--ignore-gitleaks-allow','--report-format=json','--report-path=-'],{cwd:projectRoot,encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024});
assert.ok(!scan.error&&[0,1].includes(scan.status),'Scanner available');
const findings=JSON.parse(scan.stdout).map(f=>({file:f.File,type:f.RuleID,action:'HUMAN REVIEW REQUIRED'}));
await writeFile(projectPath(out+'/distribution-audit.json'),JSON.stringify({at:new Date().toISOString(),allowlist:'PASS',files:manifest.files.length,scanner:'gitleaks 8.30.1',distributionScan:scan.status===0&&!findings.length?'PASS':'FAIL',findings,maximumAssetBytes:Math.max(...manifest.files.map(f=>f.bytes)),workersFreeAssetLimits:'PASS',analytics:'disabled',allHtmlNoindex:true,publicRelease:'BLOCKED',externalAccessTests:'PENDING'},null,2)+'\n');
assert.equal(scan.status,0,'Distribution secret scan');assert.equal(findings.length,0);
console.log('PASS: 49-file allowlist, no internal fixtures/analytics, noindex, Free asset limits, distribution secret scan 0 findings.');
