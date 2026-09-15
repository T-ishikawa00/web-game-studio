// Reproduce the Human Accepted B runtime from committed source and preserved WAV evidence.
import {build} from 'esbuild';
import {mkdir,cp,copyFile,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {projectRoot,projectPath} from './project-path.mjs';
const root=projectPath('.cache/craft-r2');await mkdir(root,{recursive:true});await cp(projectPath('.cache/prototype-dist'),root,{recursive:true});
await build({absWorkingDir:projectRoot,entryPoints:['src/prototypes/music-pilot.ts'],outfile:projectPath(root+'/prototype-assets/music-pilot.js'),bundle:true,format:'esm',target:'es2022',minify:true});
await mkdir(root+'/bgm-audio',{recursive:true});await copyFile('docs/qa/tiny-d1-rhythm-01/audio/B.wav',root+'/bgm-audio/D1.wav');
// D2 is retained only to reproduce the original comparison runtime; it is not accepted R2.
await copyFile('docs/qa/tiny-bgm-pilot-01/audio/D2.wav',root+'/bgm-audio/D2.wav');
const frozen=JSON.parse(await readFile('docs/qa/tiny-craft-r2-checkpoint/frozen-runtime.json','utf8'));for(const r of frozen.files)assert.equal(createHash('sha256').update(await readFile(root+'/'+r.file)).digest('hex'),r.hash,'Frozen file '+r.file);
const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(d=>d.isDirectory()?walk(dir+'/'+d.name):[dir+'/'+d.name]))).flat();assert.equal((await walk(root)).length,frozen.files.length);
await writeFile(projectPath('.tmp/craft-r2-build.json'),JSON.stringify({at:new Date().toISOString(),status:'PASS',files:frozen.files.length,accepted:'B / D1 Rhythm Refine /80 BPM',codeAndAudioExact:true})+'\n');console.log('Craft R2 frozen build exact:',frozen.files.length,'files');
