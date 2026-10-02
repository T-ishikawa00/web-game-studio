import fs from 'node:fs';
const rows=JSON.parse(fs.readFileSync('manual-play-ads-r1/internal/browser-layout.json','utf8'));
const differences=[];
for(const row of rows)for(let i=0;i<row.baseline.regions.length;i++){
 const b=row.baseline.regions[i],c=row.candidate.regions[i];
 for(const key of ['width','height','x','y'])if(Math.abs(b.rect[key]-(c?.rect[key]??-1))>.5)differences.push({slug:row.slug,lang:row.lang,viewport:row.viewport,selector:b.selector,key,before:b.rect[key],after:c?.rect[key]});
}
console.log(JSON.stringify({pairs:rows.length,differences,overflow:rows.filter(r=>r.candidate.scroll[0]>r.candidate.inner[0]).map(r=>({slug:r.slug,viewport:r.viewport})),mobile:rows.filter(r=>r.lang==='ja'&&r.viewport[0]<=1024).map(r=>({slug:r.slug,width:r.viewport[0],ads:r.candidate.ads.map(a=>({unit:a.unit,hidden:a.hidden,state:a.state,push:a.push}))}))}));
