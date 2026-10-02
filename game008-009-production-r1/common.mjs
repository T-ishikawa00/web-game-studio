import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync,execFileSync} from 'node:child_process';
export const root='game008-009-production-r1';
export const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
export const sha=b=>createHash('sha256').update(b).digest('hex');
export function put(p,b){fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,b);}
export function json(p,b){put(p,JSON.stringify(b,null,2)+'\n');}
export const git=(...args)=>execFileSync('git',args,{encoding:'utf8',windowsHide:true,maxBuffer:64e6,env:{...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'}}).trim();
export function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{assert(!e.isSymbolicLink(),'Linked input prohibited');return e.isDirectory()?walk(dir+'/'+e.name).map(f=>e.name+'/'+f):[e.name];}).sort();}
export function env(){return {...process.env,WRANGLER_SEND_METRICS:'false',WRANGLER_WRITE_LOGS:'false',WRANGLER_LOG_SANITIZE:'true',CI:'true',TEMP:path.resolve(root+'/internal/temp'),TMP:path.resolve(root+'/internal/temp')};}
export function cli(args){fs.mkdirSync(root+'/internal/temp',{recursive:true});const r=spawnSync(process.execPath,['.cache/tools/wrangler-r1/node_modules/wrangler/bin/wrangler.js',...args],{env:env(),encoding:'utf8',windowsHide:true,maxBuffer:64e6});assert.equal(r.status,0,'Cloudflare operation failed; authentication diagnostics withheld');return r.stdout;}
export function state(config){const d=JSON.parse(cli(['deployments','status','--config',config,'--json']));return {id:d.id,versions:d.versions.map(v=>({version:v.version_id,percentage:v.percentage}))};}
export function unchanged(records){for(const e of records)assert.equal(sha(fs.readFileSync(e.file)),e.sha256,'Preserved file changed: '+e.file);}
export function verifyManifest(m){assert.deepEqual(walk(m.root),m.files.map(e=>e.file).sort());for(const e of m.files)assert.equal(sha(fs.readFileSync(m.root+'/'+e.file)),e.sha256,e.file);}
export function ensureRoot(){assert.equal(fs.realpathSync('.').replaceAll('\\','/').toLowerCase(),'c:/projects/web game studio');assert.equal(git('branch','--show-current'),'main');assert.equal(git('remote','get-url','origin'),'https://github.com/T-ishikawa00/web-game-studio.git');}
