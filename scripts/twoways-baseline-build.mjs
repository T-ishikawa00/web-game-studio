// Reproduce accepted TW-C and compare against its original frozen manifest.
import {spawnSync} from 'node:child_process';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {projectRoot,projectPath} from './project-path.mjs';
for(const args of [['scripts/astro.mjs','build','--prototype-preview'],['scripts/twoways-build.mjs']]){
 const run=spawnSync(process.execPath,args,{cwd:projectRoot,stdio:'inherit',windowsHide:true});assert.equal(run.status,0,args[0]);
}
const frozen=JSON.parse(await readFile(projectPath('docs/qa/twoways-craft-baseline-r1/frozen-runtime.json'),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
for(const f of frozen.sources)assert.equal(hash((await readFile(projectPath(f.file),'utf8')).replaceAll('\r\n','\n')),f.normalizedTextHash,'Frozen source '+f.file);
for(const f of frozen.files)assert.equal(hash(await readFile(projectPath('.cache/twoways-craft/'+f.file))),f.hash,'Frozen runtime '+f.file);
const walk=async d=>(await Promise.all((await readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(d+'/'+e.name):[e.name]))).flat();assert.equal((await walk(projectPath('.cache/twoways-craft'))).length,frozen.files.length);
await mkdir(projectPath('.tmp/twoways-freeze'),{recursive:true});await writeFile(projectPath('.tmp/twoways-freeze/reproduction.json'),JSON.stringify({at:new Date().toISOString(),status:'PASS',files:frozen.files.length,profile:frozen.accepted},null,2));console.log('Two Ways frozen runtime exact:',frozen.files.length);
