// Verify accepted Expansion bytes and rebuild in isolation; never rewrite accepted output/evidence.
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import {build} from '../game005-island/node_modules/vite/dist/node/index.js';
const fromIndex=process.argv.includes('--index'),mode=fromIndex?'index':'worktree',qa='docs/qa/game005-expansion-baseline-r1',base='game005-island/expansion-r1',out=path.resolve('game005-island/.cache/expansion-baseline-r1/'+mode);
if(process.cwd().replaceAll('\\','/').toLowerCase()!=='c:/projects/web game studio')throw Error('root');
const bytes=f=>fromIndex?execFileSync('git',['show',':'+f],{windowsHide:true,maxBuffer:64*1024*1024}):fs.readFileSync(f),sha=b=>createHash('sha256').update(b).digest('hex'),canonical=(b,f)=>/\.(ts|js|mjs|json|md|txt|html|css|ps1)$/.test(f)||f.endsWith('.gitignore')?Buffer.from(b.toString().replaceAll('\r\n','\n')):b;
const manifest=JSON.parse(bytes(qa+'/frozen-manifest.json')),normalizationOnly=[];
for(const e of [...manifest.artifacts,...manifest.dependencies]){const b=bytes(e.file);if(sha(canonical(b,e.file))!==e.canonicalSha256)throw Error('Frozen input changed: '+e.file);if(sha(b)!==e.sha256)normalizationOnly.push(e.file);if(e.file.startsWith(base+'/')&&/^(app|src|assets)\//.test(e.file.slice(base.length+1))){const target=path.join(out,'source',e.file.slice(base.length+1));fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,b);}}
await build({configFile:false,root:path.join(out,'source/app'),base:'./',publicDir:false,envDir:false,cacheDir:path.join(out,'vite'),build:{outDir:path.join(out,'dist'),emptyOutDir:true,sourcemap:false,target:'es2022'}});
fs.copyFileSync('game005-island/node_modules/three/LICENSE',path.join(out,'dist/THREE-LICENSE.txt'));
const derived=manifest.distribution.map(e=>{const b=fs.readFileSync(path.join(out,e.file.slice(base.length+1)));return {file:e.file,byteIdentical:sha(b)===e.sha256};});
if(derived.some(e=>!e.byteIdentical))throw Error('Accepted distribution reproduction mismatch');
const report={at:new Date().toISOString(),status:'PASS',mode,inputs:manifest.artifacts.length,dependencies:manifest.dependencies.length,normalizationOnly,derived,acceptedWrites:0};
fs.writeFileSync(qa+'/reproduction-'+mode+'.json',JSON.stringify(report,null,2));console.log({status:'PASS',mode,inputs:report.inputs,normalizationOnly:normalizationOnly.length,derived:derived.length});
