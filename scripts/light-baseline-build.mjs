// Reproduce the Human-accepted Lightwork profile; never regenerate its manifest.
import {spawnSync} from 'node:child_process';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {projectRoot,projectPath} from './project-path.mjs';
for(const args of [['scripts/astro.mjs','build','--prototype-preview'],['scripts/lightwork-build.mjs'],['scripts/light-object-build.mjs'],['scripts/light-polish-build.mjs']]){
 const run=spawnSync(process.execPath,args,{cwd:projectRoot,stdio:'inherit',windowsHide:true});assert.equal(run.status,0,args[0]);
}
const frozen=JSON.parse(await readFile(projectPath('docs/qa/lightwork-craft-baseline-r1/frozen-runtime.json'),'utf8'));
for(const f of frozen.sources)assert.equal(createHash('sha256').update((await readFile(projectPath(f.file),'utf8')).replaceAll('\r\n','\n')).digest('hex'),f.normalizedTextHash,'Frozen source '+f.file);
for(const f of frozen.files)assert.equal(createHash('sha256').update(await readFile(projectPath('.cache/lightwork-polish/'+f.file))).digest('hex'),f.hash,'Frozen Lightwork '+f.file);
const walk=async d=>(await Promise.all((await readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(d+'/'+e.name):[e.name]))).flat();assert.equal((await walk(projectPath('.cache/lightwork-polish'))).length,frozen.files.length);
await mkdir(projectPath('.tmp/lightwork-freeze'),{recursive:true});await writeFile(projectPath('.tmp/lightwork-freeze/reproduction.json'),JSON.stringify({at:new Date().toISOString(),status:'PASS',files:frozen.files.length,profile:'LG-C + Object Design 01 + Art Polish 01'},null,2));console.log('Lightwork frozen runtime exact:',frozen.files.length);
