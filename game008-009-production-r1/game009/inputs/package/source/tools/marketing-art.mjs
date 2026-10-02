import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { drawVessel } from '../src/product/kiln-render.js';

const require=createRequire(import.meta.url);
const {createCanvas}=require(String.raw`C:\Users\PUBLIC_USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\@napi-rs\canvas`);
const root=resolve(import.meta.dirname,'..');
const outDir=resolve(root,'marketing');

const PALETTE={
  wall:'#382a24',wallHi:'#614435',dark:'#181312',dark2:'#231a17',light:'#f5e4cc',muted:'#d5b696',gold:'#f0bd70',copper:'#d7794d',
  clay:'#d98c64',moss:'#9caf77',blue:'#638f9a'
};

function background(ctx,w,h,variant){
  const base=ctx.createLinearGradient(0,0,w*.9,h);
  base.addColorStop(0,'#4a3429');base.addColorStop(.44,'#30231e');base.addColorStop(1,'#171312');
  ctx.fillStyle=base;ctx.fillRect(0,0,w,h);
  const glow=ctx.createRadialGradient(w*.69,h*.54,15,w*.69,h*.54,Math.max(w,h)*.61);
  glow.addColorStop(0,'rgba(224,125,70,.25)');glow.addColorStop(.45,'rgba(160,79,48,.12)');glow.addColorStop(1,'rgba(12,9,9,0)');
  ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
  // Plaster and hand-built brick lines lend the scene a place without turning into a dashboard.
  ctx.save();ctx.globalAlpha=.17;ctx.strokeStyle='#d7a47e';ctx.lineWidth=2;
  if(variant==='wide'){
    for(let y=92;y<h-104;y+=92){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.beginPath();ctx.moveTo(820,0);ctx.lineTo(820,h-116);ctx.moveTo(1580,0);ctx.lineTo(1580,h-116);ctx.stroke();
  }else{
    for(let y=90;y<h-150;y+=96){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(40,h);ctx.moveTo(w-40,0);ctx.lineTo(w-40,h);ctx.stroke();
  }
  ctx.restore();

  const arch=variant==='wide'
    ?{cx:1230,cy:468,r:344,left:886,right:1574,base:766}
    :{cx:540,cy:800,r:390,left:150,right:930,base:930};
  const kiln=ctx.createLinearGradient(arch.left,arch.cy,arch.right,arch.base);
  kiln.addColorStop(0,'#53372b');kiln.addColorStop(.5,'#2b201c');kiln.addColorStop(1,'#1a1412');
  ctx.fillStyle=kiln;ctx.beginPath();ctx.moveTo(arch.left,arch.base);ctx.lineTo(arch.left,arch.cy);ctx.arc(arch.cx,arch.cy,arch.r,Math.PI,0);ctx.lineTo(arch.right,arch.base);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#ad7655';ctx.globalAlpha=.82;ctx.lineWidth=8;ctx.beginPath();ctx.arc(arch.cx,arch.cy,arch.r,Math.PI,0);ctx.stroke();ctx.globalAlpha=1;
  const mouth=ctx.createRadialGradient(arch.cx,arch.base-104,20,arch.cx,arch.base-104,arch.r*.86);
  mouth.addColorStop(0,'rgba(224,108,52,.24)');mouth.addColorStop(1,'rgba(224,108,52,0)');ctx.fillStyle=mouth;ctx.fillRect(arch.left,arch.cy,arch.right-arch.left,arch.base-arch.cy);
  // Subtle masonry only along the arch edge.
  ctx.save();ctx.globalAlpha=.2;ctx.strokeStyle='#c18a65';ctx.lineWidth=2;
  const step=variant==='wide'?74:84;
  for(let x=arch.left+10;x<arch.right;x+=step){ctx.beginPath();ctx.moveTo(x,arch.base-30);ctx.lineTo(x,arch.base);ctx.stroke();}
  ctx.restore();
}

function shelf(ctx,w,y){
  const g=ctx.createLinearGradient(0,y,w,y+42);g.addColorStop(0,'#6e4b37');g.addColorStop(.3,'#38261f');g.addColorStop(1,'#241915');
  ctx.fillStyle=g;ctx.fillRect(0,y,w,48);ctx.fillStyle='#d0986a';ctx.fillRect(0,y,w,5);
  ctx.fillStyle='rgba(0,0,0,.24)';ctx.fillRect(0,y+8,w,3);
}
function title(ctx,w,h,{wide=false}={}){
  const margin=wide?112:84;
  const jaY=wide?350:276;
  const jaSize=wide?126:112;
  const enY=wide?433:353;
  const enSize=wide?54:48;
  ctx.save();ctx.textBaseline='alphabetic';ctx.textAlign='left';
  ctx.shadowColor='rgba(18,11,8,.45)';ctx.shadowBlur=26;ctx.shadowOffsetY=7;
  ctx.font=`800 ${jaSize}px "Yu Gothic UI", "Noto Sans JP", sans-serif`;
  ctx.fillStyle=PALETTE.light;ctx.fillText('火種と釉',margin,jaY,wide?700:900);
  ctx.shadowBlur=14;ctx.shadowOffsetY=4;
  ctx.font=`700 ${enSize}px Inter, "Arial", sans-serif`;ctx.fillStyle='#f4d6ac';
  ctx.fillText('EMBER & GLAZE',margin+4,enY,wide?650:920);
  ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.strokeStyle='rgba(240,189,112,.78)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(margin+5,enY+29);ctx.lineTo(margin+(wide?470:510),enY+29);ctx.stroke();
  ctx.restore();
}

function littleSparks(ctx,w,h,variant){
  const count=variant==='wide'?16:18;
  for(let i=0;i<count;i++){
    const x=variant==='wide'?820+(i*97%720):140+(i*137%790);
    const y=variant==='wide'?120+(i*79%590):395+(i*83%450);
    const r=1.4+(i%4)*.7;
    ctx.fillStyle=i%3===0?'rgba(255,217,146,.64)':'rgba(231,134,77,.42)';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }
}

function renderWide(){
  const w=1600,h=900,canvas=createCanvas(w,h),ctx=canvas.getContext('2d');
  background(ctx,w,h,'wide');
  title(ctx,w,h,{wide:true});
  // A single shelf holds the three authored pieces; the asymmetric silhouettes read at thumbnail scale.
  drawVessel(ctx,{x:916,y:603,scale:1.28,shape:'bowl',color:PALETTE.clay,quality:86,heat:.72,reducedMotion:true});
  drawVessel(ctx,{x:1177,y:582,scale:1.32,shape:'vase',color:PALETTE.moss,quality:91,heat:.72,reducedMotion:true});
  drawVessel(ctx,{x:1393,y:603,scale:1.16,shape:'pitcher',color:PALETTE.blue,quality:82,heat:.72,reducedMotion:true});
  shelf(ctx,w,766);littleSparks(ctx,w,h,'wide');
  const vignette=ctx.createRadialGradient(w*.5,h*.45,w*.2,w*.5,h*.45,w*.8);vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(8,5,4,.37)');ctx.fillStyle=vignette;ctx.fillRect(0,0,w,h);
  return canvas;
}

function renderSquare(){
  const w=1080,h=1080,canvas=createCanvas(w,h),ctx=canvas.getContext('2d');
  background(ctx,w,h,'square');
  title(ctx,w,h,{wide:false});
  drawVessel(ctx,{x:238,y:783,scale:1.2,shape:'bowl',color:PALETTE.clay,quality:86,heat:.72,reducedMotion:true});
  drawVessel(ctx,{x:540,y:760,scale:1.27,shape:'vase',color:PALETTE.moss,quality:91,heat:.72,reducedMotion:true});
  drawVessel(ctx,{x:839,y:783,scale:1.15,shape:'pitcher',color:PALETTE.blue,quality:82,heat:.72,reducedMotion:true});
  shelf(ctx,w,935);littleSparks(ctx,w,h,'square');
  const vignette=ctx.createRadialGradient(w*.5,h*.49,w*.2,w*.5,h*.49,w*.78);vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(8,5,4,.34)');ctx.fillStyle=vignette;ctx.fillRect(0,0,w,h);
  return canvas;
}

async function save(name,canvas){
  const path=resolve(outDir,name),bytes=canvas.toBuffer('image/png');
  await writeFile(path,bytes,{flag:'w'});
  return {path:`marketing/${name}`,name,width:canvas.width,height:canvas.height,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
}

await mkdir(outDir,{recursive:true});
const coverOnly=process.argv.includes('--cover-only');
const cover=await save('cover-16x9.png',renderWide());
let assets;
if(coverOnly){
  const png=await readFile(resolve(outDir,'thumbnail-square.png'));
  if(png.toString('hex',0,8)!=='89504e470d0a1a0a'||png.readUInt32BE(16)!==1080||png.readUInt32BE(20)!==1080)throw new Error('Existing square thumbnail is not the expected 1080 × 1080 PNG.');
  assets=[cover,{path:'marketing/thumbnail-square.png',name:'thumbnail-square.png',width:1080,height:1080,bytes:png.length,sha256:createHash('sha256').update(png).digest('hex')}];
}else{
  assets=[cover,await save('thumbnail-square.png',renderSquare())];
}
const provenance={
  title:{ja:'火種と釉',en:'EMBER & GLAZE'},
  method:'Original procedural Canvas2D illustration. The three vessel forms use this project’s src/product/kiln-render.js drawVessel renderer. Background and typography were drawn in tools/marketing-art.mjs.',
  externalAssets:[],
  runtimeFonts:'System font names only; no font files were copied or distributed.',
  spendUsd:0,
  spendJpy:0,
  generatedBy:'tools/marketing-art.mjs',
  assets
};
await writeFile(resolve(outDir,'art.json'),JSON.stringify(provenance,null,2)+'\n',{flag:'w'});
process.stdout.write(JSON.stringify(assets,null,2)+'\n');
