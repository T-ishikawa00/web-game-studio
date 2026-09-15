import {execFileSync} from 'node:child_process';
import {mkdir,cp,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
assert.equal(process.cwd(),'C:\\projects\\Web Game Studio');
const git=(...a)=>execFileSync('git',a,{encoding:'utf8',windowsHide:true}).trim();assert.equal(git('diff','--name-only'),'');assert.equal(git('diff','--cached','--name-only'),'');
const out='.tmp/bgm-before';await mkdir(out);const records=[];for(const file of git('ls-files','-z').split('\0').filter(Boolean))records.push({file,sha256:createHash('sha256').update(await readFile(file)).digest('hex')});
await cp('src',out+'/src',{recursive:true});await cp('.cache/prototype-dist',out+'/prototype-dist',{recursive:true});
await writeFile(out+'/baseline.json',JSON.stringify({at:new Date().toISOString(),head:git('rev-parse','HEAD'),tracking:git('rev-parse','origin/main'),index:git('ls-files','--stage'),records,actualModel:'gpt-6-astra',effort:'high',modelEvidence:'Current session turn_context'},null,2)+'\n');console.log('Protected',records.length,'tracked files; baseline source/build snapshot retained.');
