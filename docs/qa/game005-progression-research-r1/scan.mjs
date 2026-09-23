// Scoped Gitleaks scan; raw findings and secret values are never printed or saved.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd(),qa='docs/qa/game005-progression-research-r1';
if(root.replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('Unexpected root');
const scope='.tmp/game005-progression-research-r1-scan';fs.mkdirSync(scope,{recursive:true});
const files=['docs/games/PRODUCTION_CURRENT.md','docs/games/GAME005_PROGRESSION_RESEARCH_AND_EXPANSION_R1.md','docs/games/GAME005_PROGRESSION_RESEARCH_R1_SOURCES.md',...fs.readdirSync(qa).filter(f=>f!=='security.json').map(f=>qa+'/'+f)];
for(const file of files){const dest=path.join(scope,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest);}
const ignore=path.join(scope,'empty.ignore');fs.writeFileSync(ignore,'');
const binary=path.resolve('.cache/tools/gitleaks/8.30.1/gitleaks.exe');
const version=spawnSync(binary,['version'],{encoding:'utf8',windowsHide:true});
if(version.status!==0||version.stdout.trim()!=='8.30.1')throw Error('Required scanner unavailable');
const result=spawnSync(binary,['dir',scope,'--config',path.resolve('.gitleaks.toml'),'--redact=100','--no-banner','--no-color','--gitleaks-ignore-path',ignore,'--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'],{encoding:'utf8',windowsHide:true,maxBuffer:20_000_000});
if(![0,1].includes(result.status))throw Error('Scanner error; no PASS');
const raw=JSON.parse(result.stdout);if(!Array.isArray(raw))throw Error('Invalid scanner response');
const report={at:new Date().toISOString(),status:raw.length?'FAIL':'PASS',scanner:'gitleaks 8.30.1',scope:files,findings:raw.map(f=>({file:f.File,type:f.RuleID,action:'HUMAN REVIEW REQUIRED'})),fullProject:'NOT RERUN; prior raw FAIL with six findings retained',indexHistory:'NOT RERUN; no Git write authorized',settingsChanges:0};
fs.writeFileSync(qa+'/security.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,files:files.length,findings:report.findings}));if(raw.length)process.exitCode=1;
