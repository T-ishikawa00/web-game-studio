import fs from 'node:fs';
const r='game008-009-production-r1/builds/game009-candidate-r1';
for(const s of ['rimbloom','light-garden','two-ways-home']){
 const h=fs.readFileSync(r+'/ja/play/'+s+'/index.html','utf8');
 const paths=[...h.matchAll(/href="([^"]+\.css)"/g)].map(x=>x[1]);
 console.log(s,paths);
 for(const p of paths) {const c=fs.readFileSync(r+p,'utf8');console.log(c.split('}').filter(x=>/max-width|\.stage|\.toolbar|game-top|^body|body\{|#main\{|world-shell/.test(x)).join('}\n').slice(0,6500));}
}
