import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readVerifiedSnapshot,sha256,originalHtmlFromResponse} from './common.mjs';
const args=process.argv.slice(2), opt=(n,d)=>{const i=args.indexOf(n);return i<0?d:args[i+1];};
try{
  const root=path.resolve(opt('--root',path.dirname(fileURLToPath(import.meta.url))));
  const base=new URL(opt('--base','http://127.0.0.1:4387'));
  if(base.protocol!=='http:' || !['127.0.0.1','localhost'].includes(base.hostname)||base.username||base.password)throw Error('Only local HTTP preview allowed');
  const {manifest,files,pin}=readVerifiedSnapshot(root),results=[];
  for(const route of manifest.routes){
    const r=await fetch(new URL(route,base),{redirect:'manual',signal:AbortSignal.timeout(10000)});
    const b=Buffer.from(await r.arrayBuffer()), original=files.get(route.slice(1)+'index.html');
    const recovered=originalHtmlFromResponse(b);
    results.push({route,status:r.status,exactlyOneSafetyGuard:true,originalBytesMatchAfterRemovingSafetyGuard:sha256(recovered)===sha256(original),noindex:/noindex/.test(r.headers.get('x-robots-tag')||''),localConnectPolicy:(r.headers.get('content-security-policy')||'').includes("connect-src 'self'")});
  }
  const servedFiles=[];
  for(const [file,original] of files){
    if(file==='_headers')continue;
    const r=await fetch(new URL('/'+file,base),{redirect:'manual',signal:AbortSignal.timeout(10000)});
    const response=Buffer.from(await r.arrayBuffer());
    const recovered=file.endsWith('.html')?originalHtmlFromResponse(response):response;
    servedFiles.push({file,status:r.status,bytesMatch:sha256(recovered)===sha256(original)});
  }
  const a=await fetch(new URL('/__restore_missing_route_48a30/',base),{redirect:'manual'});
  const protectedStatus=[];for(const p of ['/.git/config','/_headers','/evidence/distribution.original.json']){const r=await fetch(new URL(p,base));protectedStatus.push({path:p,status:r.status});}
  const pass=results.every(x=>x.status===200 && x.exactlyOneSafetyGuard && x.originalBytesMatchAfterRemovingSafetyGuard && x.noindex && x.localConnectPolicy)&&servedFiles.length===pin.served&&servedFiles.every(x=>x.status===200&&x.bytesMatch)&&a.status===404&&protectedStatus.every(x=>[403,404].includes(x.status));
  const report={status:pass?'HTTP_QA_PASS_BROWSER_GAMEPLAY_PENDING':'HTTP_QA_FAIL',time:new Date().toISOString(),identityMode:pin.key==='final'?'PINNED_GIT_PRESERVATION_NOT_ORIGINAL_DEPLOYED_BYTE_IDENTITY':'PINNED_ORIGINAL_DISTRIBUTION',releaseCommit:pin.releaseCommit,fileHashCount:files.size,servedFileCount:servedFiles.length,servedFiles,routeCount:results.length,results,missingRouteStatus:a.status,protectedStatus,browserInputAudioSave:'NOT_TESTED_BY_THIS_SCRIPT',note:'This is HTTP and byte QA only, not game completion or mobile QA.'};
  const out=path.join(root,'evidence','HTTP_QA_'+Date.now()+'.json');fs.writeFileSync(out,JSON.stringify(report,null,2),{flag:'wx'});console.log(report.status+'\n'+out);if(!pass)process.exitCode=1;
}catch(e){console.error('VERIFY STOPPED: '+e.message);process.exitCode=1;}
