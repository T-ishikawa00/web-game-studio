// Local packaging only. Never invokes Wrangler, DNS, a provider API or external telemetry.
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {releaseBlockers} from '../src/rc/readiness.mjs';

export function publicHtml(html,route,origin,publicBeaconId,{indexable=true}={}){
 assert.ok(route==='/'||/^\/(ja|en)\/(?:[a-z0-9-]+\/)*$/.test(route));
 if(publicBeaconId!==null)assert.match(publicBeaconId,/^[a-f0-9]{32}$/i);
 const u=new URL(origin);assert.equal(u.protocol,'https:');assert.equal(u.origin,origin);assert.equal(u.username,'');assert.equal(u.password,'');
 assert.ok(!/beacon\.min\.js|<link[^>]+rel="canonical"/.test(html),'Pre-existing production metadata: review instead of duplicating');
 html=html.replace(/<meta\b[^>]*name="robots"[^>]*>/g,`<meta name="robots" content="${indexable?'index, follow':'noindex, nofollow'}">`).replace(/<link\b[^>]*rel="alternate"[^>]*hreflang=[^>]*>/g,'');
 html=html.replace(/<div class="preview-strip"><div class="wrap">[^<]*<\/div><\/div>/,'').replace('<p>Local release candidate · 未公開</p>','');
 const pair=route==='/'?{ja:'/ja/',en:'/en/'}:{ja:route.replace(/^\/en\//,'/ja/'),en:route.replace(/^\/ja\//,'/en/')};
 const tags=`<link rel="canonical" href="${origin}${route}"><link rel="alternate" hreflang="ja" href="${origin}${pair.ja}"><link rel="alternate" hreflang="en" href="${origin}${pair.en}"><link rel="alternate" hreflang="x-default" href="${origin}/"><meta property="og:url" content="${origin}${route}">`;
 html=html.replace('</head>',tags+'</head>');
 html=html.replace(/(<meta property="og:image" content=")\//g,`$1${origin}/`);
 if(publicBeaconId!==null&&route!=='/'){
  assert.ok(html.includes('data-enabled="false" data-beacon-id=""'),'Consent component required before measurement configuration');
  html=html.replace('data-enabled="false" data-beacon-id=""',`data-enabled="true" data-beacon-id="${publicBeaconId}"`);
 }
 assert.ok(!/Local release candidate|ローカル公開候補/.test(html));
 if(indexable)assert.ok(!html.includes('noindex'));
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 return html;
}

// A reviewable local artifact precedes deployment approval. This filter grants no remote permission.
export const localPackagingBlockers=site=>releaseBlockers(site).filter(b=>b.phase!=='after-authorized-deployment'&&b.code!=='release');
export async function prepare(){
 // Retired write entry: it predates the actual receiving/replying and public-copy gates.
 // Keep this fail-closed response for old runbooks; use public-release-build.mjs.
 console.log(JSON.stringify({status:'BLOCKED',codes:['legacyPackagingRetiredUsePublicReleaseBuild'],outputCreated:false,externalOperations:0}));
 return false;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const ok=await prepare({write:process.argv.includes('--prepare')});if(!ok)process.exitCode=1;}
