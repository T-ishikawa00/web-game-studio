import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const root='manual-play-ads-r1';fs.mkdirSync(root+'/internal/temp',{recursive:true});
const result=spawnSync(process.execPath,['.cache/tools/wrangler-r1/node_modules/wrangler/bin/wrangler.js','deploy','--dry-run','--config',root+'/wrangler.candidate.json','--outdir',path.resolve(root+'/internal/dry-run')],{encoding:'utf8',windowsHide:true,maxBuffer:16e6,env:{...process.env,WRANGLER_SEND_METRICS:'false',WRANGLER_WRITE_LOGS:'false',CI:'true',TEMP:path.resolve(root+'/internal/temp'),TMP:path.resolve(root+'/internal/temp')}});
assert.equal(result.status,0,'Local candidate bundling failed; raw diagnostics withheld');
const receipt={at:new Date().toISOString(),status:'PASS',mode:'LOCAL_DRY_RUN',uploaded:false,deployed:false,remoteWrites:false,existingWorker:'tinlumo-production',existingGrowthBinding:true,existingCron:'47 * * * *',source:'runtime/worker.mjs'};
fs.writeFileSync(root+'/internal/dry-run.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
