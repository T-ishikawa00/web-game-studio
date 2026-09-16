import {rcEvidenceDir} from './rc-evidence.mjs';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gzipSync,brotliCompressSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
import {projectPath} from './project-path.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex'),root=projectPath('.cache/rc-dist');
const walk=async d=>(await Promise.all((await readdir(d,{withFileTypes:true})).map(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]))).flat();
const files=[];for(const file of await walk(root)){const b=await readFile(file);files.push({file:file.slice(root.length+1).replaceAll('\\','/'),sha256:hash(b),bytes:b.length,gzip:gzipSync(b).length,brotli:brotliCompressSync(b).length});}
const diff=execFileSync('git',['diff','--binary'],{maxBuffer:100*1024*1024});
const untracked=execFileSync('git',['ls-files','--others','--exclude-standard'],{encoding:'utf8'}).trim().split('\n').filter(f=>f&&(/^(src\/(?:rc\/|data\/game-identities\.json)|scripts\/rc-|astro.rc|tests\/rc)/.test(f)));
const inputs=[];for(const file of untracked)inputs.push({file,sha256:hash(await readFile(file))});
await writeFile(`${rcEvidenceDir}/distribution-manifest.json`,JSON.stringify({at:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingDiffSha256:hash(diff),untrackedSource:inputs,profile:'three-game-soft-launch-rc-r1',actualReleasedGames:0,files,totals:{assets:files.length,bytes:files.reduce((n,f)=>n+f.bytes,0),gzip:files.reduce((n,f)=>n+f.gzip,0),brotli:files.reduce((n,f)=>n+f.brotli,0)},validation:'See REPORT.md for current targeted QA; prior full technical QA retained separately; release check independently blocked'},null,2));
console.log('RC manifest:',files.length,'files');
