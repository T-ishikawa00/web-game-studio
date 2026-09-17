// Local packaging only. Never invokes Wrangler, DNS, a provider API or external telemetry.
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {releaseBlockers} from '../src/rc/readiness.mjs';
import {rcEvidenceDir} from './rc-evidence.mjs';
import {projectRoot,projectPath} from './project-path.mjs';

export function publicHtml(html,route,origin,publicBeaconId){
 assert.ok(route==='/'||/^\/(ja|en)\/(?:[a-z0-9-]+\/)*$/.test(route));
 assert.match(publicBeaconId,/^[a-f0-9]{32}$/i);
 const u=new URL(origin);assert.equal(u.protocol,'https:');assert.equal(u.origin,origin);assert.equal(u.username,'');assert.equal(u.password,'');
 assert.ok(!/beacon\.min\.js|<link[^>]+rel="canonical"/.test(html),'Pre-existing production metadata: review instead of duplicating');
 html=html.replace(/<meta\b[^>]*name="robots"[^>]*>/g,'<meta name="robots" content="index, follow">').replace(/<link\b[^>]*rel="alternate"[^>]*hreflang=[^>]*>/g,'');
 html=html.replace(/<div class="preview-strip"><div class="wrap">[^<]*<\/div><\/div>/,'').replace('<p>Local release candidate · 未公開</p>','');
 const pair=route==='/'?{ja:'/ja/',en:'/en/'}:{ja:route.replace(/^\/en\//,'/ja/'),en:route.replace(/^\/ja\//,'/en/')};
 const tags=`<link rel="canonical" href="${origin}${route}"><link rel="alternate" hreflang="ja" href="${origin}${pair.ja}"><link rel="alternate" hreflang="en" href="${origin}${pair.en}"><link rel="alternate" hreflang="x-default" href="${origin}/"><meta property="og:url" content="${origin}${route}">`;
 html=html.replace('</head>',tags+'</head>');
 html=html.replace(/(<meta property="og:image" content=")\//g,`$1${origin}/`);
 html=html.replace('</body>',`<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({token:publicBeaconId})}'></script></body>`);
 assert.ok(!/noindex|Local release candidate|ローカル公開候補/.test(html));
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 return html;
}

// A reviewable local artifact precedes deployment approval. This filter grants no remote permission.
export const localPackagingBlockers=site=>releaseBlockers(site).filter(b=>b.phase!=='after-authorized-deployment'&&b.code!=='release');
export async function prepare({write=false}={}){
 assert.equal(path.resolve(process.cwd()).toLowerCase(),projectRoot.toLowerCase());
 const site=JSON.parse(await readFile(projectPath('src/rc/site.json'))),measurement=JSON.parse(await readFile(projectPath('config/release-production/measurement.json')));
 const blockers=localPackagingBlockers(site);
 const operations=await readFile(projectPath('src/rc/Operations.astro'),'utf8');
 if(/Local draft|unapproved draft|未承認草案/.test(operations))blockers.push({code:'publicCopyDraft'});
 if(!measurement.enabled||!measurement.activationApproval||!measurement.publicBeaconId||site.analyticsProvider!=='cloudflare-web-analytics')blockers.push({code:'analyticsActivationNotApprovedOrPrepared'});
 if(blockers.length){console.log(JSON.stringify({status:'BLOCKED',codes:blockers.map(b=>b.code),outputCreated:false,externalOperations:0}));return false;}
 assert.equal(measurement.selectedOption,'A');assert.equal(measurement.provider,'Cloudflare Web Analytics');
 assert.equal(measurement.customEvents,false);assert.equal(measurement.persistentUserId,false);assert.equal(measurement.fingerprint,false);
 const raw=site.domain,origin=new URL(raw.includes('://')?raw:'https://'+raw);
 assert.equal(origin.protocol,'https:');assert.equal(origin.pathname,'/');assert.equal(origin.search,'');assert.equal(origin.hash,'');assert.equal(origin.username,'');assert.equal(origin.password,'');
 const manifest=JSON.parse(await readFile(projectPath(`${rcEvidenceDir}/distribution-manifest.json`))),files=new Map(),urls=[];
 const hash=b=>createHash('sha256').update(b).digest('hex');
 for(const f of manifest.files){assert.ok(!f.file.includes('..')&&!path.isAbsolute(f.file));const b=await readFile(projectPath('.cache/rc-dist/'+f.file));assert.equal(hash(b),f.sha256,'Build/manifest mismatch: '+f.file);files.set(f.file,b);
  if(f.file==='index.html'||/^(ja|en)\/(?:[a-z0-9-]+\/)*index\.html$/.test(f.file)){
   const route='/'+f.file.replace(/index\.html$/,'');let html=publicHtml(b.toString(),route,origin.origin,measurement.publicBeaconId);
   assert.ok(!/未確定（公開前に決定）|Undecided \(required before publication\)|Local draft|unapproved draft|未承認草案/.test(html),'Draft copy remains');files.set(f.file,Buffer.from(html));urls.push(origin.origin+route);
  }
 }
 assert.equal(urls.length,27);assert.equal(manifest.files.length,48);
 files.set('robots.txt',Buffer.from(`User-agent: *\nAllow: /\nSitemap: ${origin.origin}/sitemap.xml\n`));
 files.set('sitemap.xml',Buffer.from(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(loc=>`<url><loc>${loc}</loc></url>`).join('')}</urlset>`));
 files.set('_headers',await readFile(projectPath('config/release-final-r1/_headers.template')));
 assert.ok(files.size<=20000);assert.ok([...files.values()].every(b=>b.length<=25*1024*1024));
 const output=projectPath('.cache/tinlumo-approved-dist');
 if(write){let exists=false;try{await access(output);exists=true;}catch{}assert.ok(!exists,'Existing approved artifact must be preserved; archive separately before another preparation');await mkdir(output);
  for(const [name,b]of files){const dest=projectPath(path.join(output,name));await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,b,{flag:'wx'});}
  await writeFile(projectPath('.tmp/rc/production-manifest.json'),JSON.stringify({at:new Date().toISOString(),origin:origin.origin,files:[...files].map(([file,b])=>({file,sha256:hash(b),bytes:b.length})),externalOperations:0},null,2));
 }
 console.log(JSON.stringify({status:'LOCAL_PACKAGE_VALID',files:files.size,publicUrls:urls.length,outputCreated:write,externalOperations:0,liveSmoke:'NOT TESTED'}));return true;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const ok=await prepare({write:process.argv.includes('--prepare')});if(!ok)process.exitCode=1;}
