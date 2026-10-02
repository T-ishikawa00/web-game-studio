import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {read,sha,json,put,walk,verifyManifest,unchanged,git} from '../game008-009-production-r1/common.mjs';
import {preserved} from './preservation.mjs';
const root='manual-play-ads-r1',before=read(root+'/internal/PREFLIGHT.json'),basis=read(before.basis.manifestFile),dist=root+'/builds/candidate';
verifyManifest(basis);preserved(before.tracked);
assert.equal(git('rev-parse','HEAD'),before.head);assert.equal(git('diff','--cached','--name-only'),'');
const plans={
 'rimbloom':{region:'main.stage',anchor:'<main class="stage">',width:1080,bottom:'safe'},
 'light-garden':{region:'#main',anchor:'<main id="main">',width:1600,bottom:'safe'},
 'two-ways-home':{region:'.world-shell',anchor:'<div class="world-shell">',width:1800,bottom:'safe'},
 'coilhop':{region:'#standalone-game',bottom:'safe',reason:'Full-width accepted iframe; no exterior horizontal space.'},
 'ember-glaze':{region:'#standalone-game',bottom:'safe',reason:'Full-width accepted iframe; no exterior horizontal space.'},
 'tiny-delivery':{region:'main#game',bottom:'hold',reason:'Full-width canvas; accepted fixed title/settings UI remains over the bottom ad when the parent scrolls.'},
 'island-connections':{region:'main#app',bottom:'hold',reason:'Accepted full-screen canvas and body scroll lock.'},
 'project-magnet':{region:'main#game',bottom:'hold',reason:'Accepted full-screen canvas and body scroll lock.'}
};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;');
const publisher='ca-pub-2960465104451668';
function unit(name,slot,l){return `<aside class="manual-play-ad manual-play-ad-${name}" data-manual-ad="${name}" aria-label="${l==='ja'?'広告':'Advertisement'}" hidden><span class="manual-ad-label">${l==='ja'?'広告':'Advertisement'}</span><ins class="adsbygoogle manual-play-unit" style="display:block" data-ad-client="${publisher}" data-ad-slot="${slot}"></ins></aside>`;}
function spanOf(html,anchor){
 assert.equal(html.split(anchor).length,2,'Unique measured region '+anchor);
 const start=html.indexOf(anchor),tag=anchor.match(/^<(\w+)/)[1],re=new RegExp('<\\/?'+tag+'\\b[^>]*>','g');re.lastIndex=start;
 let depth=0,token;while((token=re.exec(html))){depth+=token[0].startsWith('</')?-1:1;if(depth===0)return{start,end:re.lastIndex};}
 throw new Error('Unbalanced measured region');
}
function change(html,l,p){
 // Current Human release approval requires no advertising slot DOM for HOLD.
 const left=p.width?unit('left','6898213660',l):'',right=p.width?unit('right','4699511455',l):'',bottom=p.bottom==='safe'?unit('bottom','9760266447',l):'',breakpoint=p.width?p.width+940:100000;
 const css=`<style id="manual-play-ads-style">
.manual-play-ad[hidden]{display:none!important}
.manual-ad-layout{display:contents}
.manual-play-ad{box-sizing:border-box;position:static!important;float:none!important;font:12px/20px system-ui;text-align:center;color:#737373;background:transparent}
.manual-ad-label{display:block;height:20px;margin:0 0 4px;letter-spacing:.02em}
.manual-play-ad-left,.manual-play-ad-right{display:none;width:300px;margin:150px 0 0}
.manual-play-ad-left ins,.manual-play-ad-right ins{width:300px;height:250px}
.manual-play-ad-bottom{display:none;width:calc(100% - 24px);max-width:480px;margin:150px auto 24px}
.manual-play-ad-bottom ins{width:100%;height:100px}
ins.adsbygoogle[data-ad-status="unfilled"],ins.adsbygoogle[data-ad-status="unfill-optimized"]{display:none!important}
${p.width?`@media(min-width:${breakpoint}px){.manual-ad-layout{display:grid;grid-template-columns:300px ${p.width}px 300px;column-gap:150px;align-items:start;max-width:${p.width+900}px;margin:0 auto}.manual-ad-layout>:not(.manual-play-ad){grid-column:2;grid-row:1;width:100%;min-width:0}.manual-play-ad-left{display:block;grid-column:1;grid-row:1}.manual-play-ad-right{display:block;grid-column:3;grid-row:1}}`:''}
${p.bottom==='safe'?'@media(max-width:1024px){.manual-play-ad-bottom{display:block}}':''}
</style><script type="module" src="/assets/manual-play-ads-r1.js"></script>`;
 html=html.replace('</head>',css+'</head>');
 html=html.replace('<body',`<body data-manual-play-ads data-side-policy="${p.width?'safe':'hold'}" data-side-breakpoint="${breakpoint}" data-mobile-policy="${p.bottom}" data-game-region="${esc(p.region)}"`);
 if(p.width){const {start,end}=spanOf(html,p.anchor);html=html.slice(0,start)+`<div class="manual-ad-layout">${left}`+html.slice(start,end)+right+'</div>'+html.slice(end);}
 else html=html.replace('</body>',left+right+'</body>');
 return html.replace('</body>',bottom+'</body>');
}
fs.mkdirSync(dist,{recursive:true});fs.cpSync(basis.root,dist,{recursive:true,errorOnExist:false});
const routes=basis.routes.filter(r=>/^\/(ja|en)\/play\//.test(r)),policies=[];
for(const route of routes){const [,l,,slug]=route.split('/'),p=plans[slug];assert(p,'New registry route needs measured layout policy: '+slug);
 const file=route.slice(1)+'index.html',html=fs.readFileSync(dist+'/'+file,'utf8');
 assert.equal((html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g)||[]).length,1);
 assert(!html.includes('data-ad-slot='));put(dist+'/'+file,change(html,l,p));policies.push({route,slug,...p,sideBreakpoint:p.width?p.width+940:null});}
put(dist+'/assets/manual-play-ads-r1.js',fs.readFileSync(root+'/play-ads.js'));
const config=read('game008-009-production-r1/game009/wrangler.production.json');config.main='runtime/worker.mjs';config.assets.directory='./builds/candidate';json(root+'/wrangler.candidate.json',config);
for(const f of walk('game008-009-production-r1/game009/runtime'))put(root+'/runtime/'+f,fs.readFileSync('game008-009-production-r1/game009/runtime/'+f));
const files=walk(dist).map(file=>({file,bytes:fs.statSync(dist+'/'+file).size,sha256:sha(fs.readFileSync(dist+'/'+file))}));
const changed=files.filter(e=>basis.files.some(b=>b.file===e.file&&b.sha256!==e.sha256)).map(e=>e.file),added=files.filter(e=>!basis.files.some(b=>b.file===e.file)).map(e=>e.file);
assert.deepEqual(changed.sort(),routes.map(r=>r.slice(1)+'index.html').sort());assert.deepEqual(added,['assets/manual-play-ads-r1.js']);
json(root+'/CANDIDATE_MANIFEST.json',{at:new Date().toISOString(),sourceHead:before.head,productionBasis:before.production,basisManifest:before.basis,root:dist,routes:basis.routes,playRoutes:routes,policies,changed,added,files,workerUnchanged:true,providerConfigurationUnchanged:true,autoAdsExclusion:'HUMAN_CONFIRMED_UNCHANGED',release:'HUMAN_RELEASE_REVIEW_PENDING'});
console.log(JSON.stringify({status:'CANDIDATE_BUILT',playRoutes:routes.length,changed,added,files:files.length}));
