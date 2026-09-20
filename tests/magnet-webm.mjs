import {readFile} from 'node:fs/promises';
// Bounded inspector for this Chrome MediaRecorder WebM, not a general demuxer.
function vint(b,o){let mask=128,n=1;while(n<=8&&!(b[o]&mask)){mask>>=1;n++;}if(n>8||o+n>b.length)throw Error('Invalid EBML integer');let v=BigInt(b[o]&(mask-1));for(let i=1;i<n;i++)v=v*256n+BigInt(b[o+i]);return{length:n,value:Number(v),unknown:v===(1n<<BigInt(n*7))-1n};}
function idLength(v){let m=128,n=1;while(n<=4&&!(v&m)){m>>=1;n++;}if(n>4)throw Error('Invalid EBML ID');return n;}
export async function inspectWebm(file){
 const b=await readFile(file),scaleId=Buffer.from([0x2a,0xd7,0xb1]),scaleAt=b.indexOf(scaleId);if(scaleAt<0)throw Error('Timecode scale not found');const ss=vint(b,scaleAt+3);let scale=0;for(let i=0;i<ss.value;i++)scale=scale*256+b[scaleAt+3+ss.length+i];if(scale!==1000000)throw Error('This inspector expects verified 1ms scale');
 const clusterId=Buffer.from([0x1f,0x43,0xb6,0x75]),clusters=[];for(let pos=0;;){pos=b.indexOf(clusterId,pos);if(pos<0)break;clusters.push(pos);pos+=4;}
 const tracks=new Map();
 for(let k=0;k<clusters.length;k++){let cursor=clusters[k]+4;const cs=vint(b,cursor);cursor+=cs.length;const end=Math.min(cs.unknown?b.length:cursor+cs.value,clusters[k+1]??b.length,b.length);let clock=0;
  while(cursor<end){const id=b[cursor],n=idLength(id),size=vint(b,cursor+n),start=cursor+n+size.length,stop=start+size.value;if(stop>end)break;if(id===0xe7){clock=0;for(let i=start;i<stop;i++)clock=clock*256+b[i];}else if(id===0xa3&&size.value>=4){const track=vint(b,start),pts=clock+b.readInt16BE(start+track.length),list=tracks.get(track.value)??[];list.push(pts);tracks.set(track.value,list);}cursor=stop;}
 }
 const result={timecodeScaleNs:scale,clusters:clusters.length,tracks:{},scope:'Chrome MediaRecorder SimpleBlock timestamp inspection; codec ordering verified by recorder and ffmpeg input metadata; no payload rewriting'};
 for(const [track,pts]of tracks){if(!pts.every((p,i)=>!i||p>=pts[i-1]))throw Error('Non-monotonic track timestamp');result.tracks[track]={blocks:pts.length,firstPtsMs:pts[0],lastPtsMs:pts.at(-1),gaps:pts.slice(1).map((p,i)=>({fromMs:pts[i],toMs:p,gapMs:p-pts[i]})).filter(x=>x.gapMs>100)};}return result;
}
