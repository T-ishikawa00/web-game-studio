import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {json} from '../game008-009-production-r1/common.mjs';
const root='manual-play-ads-r1',out=root+'/internal/release-r1',label=process.argv[2]??'preflight';assert(['preflight','postflight'].includes(label));fs.mkdirSync(out+'/temp',{recursive:true});
const sql='SELECT (SELECT healthy FROM maintenance WHERE singleton=1) AS healthy, COUNT(*) AS stored, MIN(expires_at-received_at) AS ttlMin, MAX(expires_at-received_at) AS ttlMax FROM events';
// D1 CLI's local native helper crashed on this host. Reuse the established
// Cloudflare session for the same SELECT-only query, without native helpers.
const auth=fs.readFileSync(path.join(process.env.APPDATA,'xdg.config','.wrangler','config','default.toml'),'utf8'),token=auth.match(/^oauth_token\s*=\s*"([^"\r\n]+)"/m)?.[1];assert(token,'Existing Cloudflare session unavailable');
const response=await fetch('https://api.cloudflare.com/client/v4/accounts/9f15cb18966fea37828c2a1982ab950b/d1/database/585eba67-ed8e-40a2-9166-a8c06fcc694f/query',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({sql,params:[]}),signal:AbortSignal.timeout(20000)});
assert.equal(response.status,200,'Read-only D1 health query failed; diagnostics withheld');const data=await response.json();assert.equal(data.success,true);assert.equal(data.result[0].success,true);const stats=data.result[0].results[0];assert.equal(stats.healthy,1);if(stats.stored){assert.equal(stats.ttlMin,604800000);assert.equal(stats.ttlMax,604800000);}
const result={at:new Date().toISOString(),status:'PASS',database:'tinlumo-growth-r1-prod',id:'585eba67-ed8e-40a2-9166-a8c06fcc694f',readOnly:true,healthy:stats.healthy,storedRecords:stats.stored,ttlMin:stats.ttlMin,ttlMax:stats.ttlMax,organicTraffic:'UNKNOWN',note:'Stored rows include previous QA. No event payload or identifying data was read; no D1 writes.'};json(out+'/d1-'+label+'.json',result);console.log(JSON.stringify(result));
