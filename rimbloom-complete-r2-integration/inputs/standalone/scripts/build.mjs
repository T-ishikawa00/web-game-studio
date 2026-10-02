import {mkdir,copyFile,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const files=['index.html',...(await readdir(path.join(root,'src'))).filter(f=>/\.(?:mjs|css)$/.test(f)).map(f=>'src/'+f)];
const manifest=[];
for(const file of files){const data=await readFile(path.join(root,file));if(/reviewMode|__qa|__record|capture-panel|window\.__|localhost|127\.0\.0\.1/.test(data.toString()))throw Error('Private review surface in '+file);await mkdir(path.dirname(path.join(root,'dist',file)),{recursive:true});await copyFile(path.join(root,file),path.join(root,'dist',file));manifest.push({file,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});}
const hash=createHash('sha256').update(manifest.sort((a,b)=>a.file.localeCompare(b.file,'en')).map(f=>`${f.file}\t${f.bytes}\t${f.sha256}\n`).join('')).digest('hex');
await writeFile(path.join(root,'BUILD_MANIFEST.json'),JSON.stringify({version:'2.0.0-r2',runtimeSha256:hash,dependencies:0,files:manifest},null,2)+'\n');
process.stdout.write(`Static R2 build: ${manifest.length} files, ${manifest.reduce((n,f)=>n+f.bytes,0)} bytes, SHA256 ${hash}\n`);
