import fs from 'node:fs';
import assert from 'node:assert/strict';
import {read,sha,json,walk,verifyManifest,unchanged,git} from '../game008-009-production-r1/common.mjs';
import {preserved} from './preservation.mjs';
const root='manual-play-ads-r1',m=read(root+'/CANDIDATE_MANIFEST.json'),basis=read(m.basisManifest.manifestFile),p=read(root+'/internal/PREFLIGHT.json');
verifyManifest(m);verifyManifest(basis);preserved(p.tracked);
assert.equal(git('rev-parse','HEAD'),p.head);assert.equal(git('diff','--cached','--name-only'),'');
const slots=['6898213660','4699511455','9760266447'];
for(const route of m.playRoutes){
 const file=route.slice(1)+'index.html',html=fs.readFileSync(m.root+'/'+file,'utf8'),old=fs.readFileSync(basis.root+'/'+file,'utf8'),policy=m.policies.find(p=>p.route===route);
 const expectedSlots=[...(policy.width?slots.slice(0,2):[]),...(policy.bottom==='safe'?[slots[2]]:[])];
 const loader=[...html.matchAll(/<script[^>]+src="(https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=[^"]+)"[^>]*>/g)];
 assert.equal(loader.length,1);assert.equal(loader[0][1],'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2960465104451668');
 assert.deepEqual([...html.matchAll(/data-ad-slot="(\d+)"/g)].map(x=>x[1]),expectedSlots);
 assert.equal([...html.matchAll(/data-ad-client="ca-pub-2960465104451668"/g)].length,expectedSlots.length);
 assert.equal([...html.matchAll(/data-manual-ad="(?:left|right|bottom)"[^>]+hidden/g)].length,expectedSlots.length);
 assert.equal([...html.matchAll(/src="\/assets\/manual-play-ads-r1.js"/g)].length,1);
 assert(!/amp-ad|enable_page_level_ads|overlays|anchor-ad/i.test(html));
 // Remove only this adapter's markup and recover the exact accepted HTML.
 let reverted=html.replace(/<style id="manual-play-ads-style">[\s\S]*?<\/style><script type="module" src="\/assets\/manual-play-ads-r1.js"><\/script>/,'')
  .replace(/ data-manual-play-ads data-side-policy="[^"]+" data-side-breakpoint="\d+" data-mobile-policy="[^"]+" data-game-region="[^"]+"/,'')
  .replace(/<aside class="manual-play-ad [^"]+"[\s\S]*?<\/aside>/g,'');
 if(reverted.includes('<div class="manual-ad-layout">')){
  const start=reverted.indexOf('<div class="manual-ad-layout">'),tag='div',re=/<\/?div\b[^>]*>/g;re.lastIndex=start;let depth=0,token,end;
  while((token=re.exec(reverted))){depth+=token[0].startsWith('</')?-1:1;if(!depth){end=re.lastIndex;break;}}
  assert(end);reverted=reverted.slice(0,start)+reverted.slice(start+'<div class="manual-ad-layout">'.length,end-6)+reverted.slice(end);
 }
 assert.equal(reverted,old,'Accepted HTML altered '+route);
}
for(const file of basis.files){if(!m.changed.includes(file.file))assert.equal(sha(fs.readFileSync(m.root+'/'+file.file)),file.sha256);}
const cfg=read(root+'/wrangler.candidate.json'),oldcfg=read('game008-009-production-r1/game009/wrangler.production.json');cfg.assets.directory=oldcfg.assets.directory;assert.deepEqual(cfg,oldcfg);
for(const f of walk(root+'/runtime'))assert.equal(sha(fs.readFileSync(root+'/runtime/'+f)),sha(fs.readFileSync('game008-009-production-r1/game009/runtime/'+f)));
assert(!fs.readFileSync(m.root+'/assets/manual-play-ads-r1.js','utf8').includes('__local_qa'));
const result={at:new Date().toISOString(),status:'PASS',routes:m.routes.length,playRoutes:m.playRoutes.length,files:m.files.length,servedFiles:m.files.length-1,existingLoadersPerPlay:1,slots,acceptedHtmlRecoveredExact:true,unchangedGameAssets:true,unchangedPortalLegalAdsTxtConsentGrowth:true,unchangedWorker:true,unchangedProviderConfiguration:true,indexEmpty:true,stage:false,commit:false,push:false,deploy:false,manifestSha256:sha(fs.readFileSync(root+'/CANDIDATE_MANIFEST.json'))};
json(root+'/internal/static-check.json',result);console.log(JSON.stringify(result));
