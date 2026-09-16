import {rcEvidenceDir} from './rc-evidence.mjs';
import assert from 'node:assert/strict';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {projectRoot,projectPath} from './project-path.mjs';
const out=rcEvidenceDir,root='.cache/rc-dist';
const walk=async d=>(await Promise.all((await readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]))).flat();
const ids='(?:tiny-delivery|light-garden|two-ways-home)';
const allowed=new RegExp(`^(?:index\\.html|404\\.html|favicon\\.svg|robots\\.txt|licenses/astro\\.txt|_astro/[\\w.-]+\\.css|assets/(?:shell|portal)\\.js|covers/${ids}\\.png|games/${ids}/rc-r1/(?:index\\.html|game\\.js|base\\.css)|games/light-garden/rc-r1/game\\.css|games/tiny-delivery/rc-r1/music\\.wav|(?:ja|en)/(?:index\\.html|(?:games|about|terms|privacy|contact|credits)/index\\.html|(?:games|play)/${ids}/index\\.html))$`);
const files=await walk(root);for(const file of files){const name=file.slice(root.length+1);assert.ok(allowed.test(name),'Distribution allowlist '+name);if(/\.(html|js|css|txt)$/.test(name)){const s=await readFile(file,'utf8');assert.ok(!/C:[\\/]|sourceMappingURL|BEGIN (?:RSA |EC )?PRIVATE KEY|__prototypeState["']?\s*[,=:]\s*Object|connection-lab|design-preview\/|\/prototype-assets\/|home-answers|delivery-answers|light-answers|function solve/i.test(s),'Distribution content '+name);if(name.endsWith('.html'))assert.match(s,/noindex/);}}
const forbidden=['/src/rc/site.json','/docs/qa/soft-launch-rc-r1/preservation.json','/.tmp/physical-mobile-r2/tls/server.key','/prototype-assets/game.html','/ja/prototypes/','/ja/play/connection-lab/','/en/design-preview/','/games/tiny-delivery/rc-r1/D2.wav','/games/light-garden/rc-r1/music.wav','/%2e%2e%5cpackage.json','/missing/'];
for(const url of forbidden)assert.equal((await fetch('http://127.0.0.1:4350'+url)).status,404,url);
const binary=projectPath('.cache/tools/gitleaks/8.30.1/gitleaks.exe');
await writeFile(projectPath('.tmp/rc/empty.ignore'),'');
const scan=spawnSync(binary,['dir',root,'--config',projectPath('.gitleaks.toml'),'--redact=100','--no-banner','--no-color','--gitleaks-ignore-path',projectPath('.tmp/rc/empty.ignore'),'--ignore-gitleaks-allow','--report-format=json','--report-path=-'],{cwd:projectRoot,encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024});
assert.ok(!scan.error&&[0,1].includes(scan.status),'Scanner available');const findings=JSON.parse(scan.stdout).map(f=>({file:f.File,type:f.RuleID,action:'HUMAN REVIEW REQUIRED'}));
const report={at:new Date().toISOString(),distributionAllowlist:'PASS',files:files.length,internalPaths404:forbidden.length,noExternalFonts:true,scanner:'gitleaks 8.30.1',distributionScan:scan.status===0&&!findings.length?'PASS':'FAIL',findings,existingFullProjectScan:'Historical raw FAIL (2), separate approved SHA and local-only TLS dispositions retained. Not relabeled PASS.'};
await writeFile(`${out}/distribution-audit.json`,JSON.stringify(report,null,2));console.log(report);if(findings.length||scan.status!==0)process.exitCode=1;
