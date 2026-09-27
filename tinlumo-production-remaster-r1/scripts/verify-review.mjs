import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const task='tinlumo-production-remaster-r1';
const m=JSON.parse(fs.readFileSync(task+'/review/scoped-git-manifest.json'));
for(const f of m.files)assert.equal(createHash('sha256').update(fs.readFileSync(f.file)).digest('hex'),f.sha256,f.file);
const html=fs.readFileSync(task+'/review/index.html','utf8');let references=0;
for(const r of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 const p=r[1];if(p.startsWith('http')||p.startsWith('#'))continue;
 let target=p.startsWith('/')?'release-artifacts/tinlumo-visual-remaster-r1'+p:task+'/review/'+p;
 if(target.endsWith('/'))target+='index.html';assert(fs.existsSync(target),target);references++;
}
console.log({manifestHashes:m.files.length,reviewReferences:references,status:'PASS'});
