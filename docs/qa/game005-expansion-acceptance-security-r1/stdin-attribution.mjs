// Attribute the diagnostic stdin result without printing candidate data.
import fs from 'node:fs';
import path from 'node:path';
import {spawn,execFileSync} from 'node:child_process';
const out='docs/qa/game005-expansion-acceptance-security-r1';
const snapshot=JSON.parse(fs.readFileSync(out+'/index-file-scan.json')).snapshot;
const entries=execFileSync('git',['ls-files','--stage','-z'],{encoding:'utf8',windowsHide:true}).split('\0').filter(Boolean).map(x=>{const [meta,file]=x.split('\t');return {file,oid:meta.split(' ')[1]};});
// Raw detector output remains in process memory solely for an equality test; never print or persist it.
const args=['stdin','--config',path.resolve('.gitleaks.toml'),'--redact=0','--no-banner','--no-color','--gitleaks-ignore-path',path.resolve(out+'/empty.ignore'),'--ignore-gitleaks-allow','--max-archive-depth=2','--report-format=json','--report-path=-'];
const detector=spawn(path.resolve('.cache/tools/gitleaks/8.30.1/gitleaks.exe'),args,{windowsHide:true});
let result='';detector.stdout.on('data',b=>result+=b);detector.stderr.resume();
const done=new Promise((resolve,reject)=>{detector.on('error',reject);detector.on('close',v=>[0,1].includes(v)?resolve(v):reject(Error('scan error')));});
const spans=[];let line=1;
async function write(b){if(!detector.stdin.write(b))await new Promise(r=>detector.stdin.once('drain',r));}
for(const e of entries){const b=fs.readFileSync(path.join(snapshot,e.file)),header=Buffer.from(`${e.oid} blob ${b.length}\n`);let lines=0;for(const c of b)if(c===10)lines++;spans.push({file:e.file,headerLine:line,start:line+1,end:line+1+lines});line+=lines+2;await write(header);await write(b);await write(Buffer.from('\n'));}
detector.stdin.end();const code=await done;
const findings=JSON.parse(result).map(f=>({file:spans.filter(s=>f.StartLine<=s.end&&f.EndLine>=s.headerLine).map(s=>s.file),type:f.RuleID,action:'Synthetic stream investigation; not an original profile finding',startLine:f.StartLine,endLine:f.EndLine,secretEqualsGitBatchHeaderOidFor:entries.filter(e=>e.oid===f.Secret).map(e=>e.file),detectedOidIsFromSyntheticHeader:spans.some(s=>s.headerLine>=f.StartLine&&s.headerLine<=f.EndLine&&entries.find(e=>e.file===s.file)?.oid===f.Secret)}));
const report={at:new Date().toISOString(),status:code===0?'PASS':'FAIL',scope:'Reproduction of index concatenation, attributed by line intervals; no values retained',findings};
fs.writeFileSync(out+'/stdin-attribution.json',JSON.stringify(report,null,2));console.log(report);
