import * as T from 'three';
import {NODES} from './core';
import {type CovePlot} from './layout';
import {groundHeight,hillEdges,type Connection,type Outlook} from './hill-layout';

// A brief line of warm light follows the actual connected paths, then disappears.
// No progression, save flag, input lock, score, or additional gameplay resource.
export class CompletionCue {
 readonly material=new T.LineBasicMaterial({color:'#ffdfa0',transparent:true,opacity:0,depthWrite:false});
 readonly line=new T.LineSegments(new T.BufferGeometry(),this.material);
 private began=-1;
 constructor(){this.line.visible=false;this.line.renderOrder=3;}
 show(connection:Connection,outlook:Outlook,commons:CovePlot,time:number,reduced:boolean){
  this.clear();if(reduced)return;
  const unused=outlook==='sea-view'?38:37;
  const shared=[[16,17],[17,18],[18,19],[19,20],[20,22],[22,30],[30,28],[28,24],[24,25],[25,18]];
  const seats=commons==='sea'?[[20,32],[32,21],[32,31],[31,26]]:[[28,23],[28,29],[29,27]];
  const edges=[...hillEdges(connection).filter(e=>!e.includes(unused)),[0,7],[7,11],[11,12],...shared,...seats],positions:number[]=[];
  for(const [a,b] of edges){const from=NODES[a],to=NODES[b];for(let n=0;n<12;n++)for(const f of [n/12,(n+1)/12]){const x=from[0]+(to[0]-from[0])*f,z=from[1]+(to[1]-from[1])*f;positions.push(x,groundHeight(x,z)+.09,z);}}
  this.line.geometry.dispose();this.line.geometry=new T.BufferGeometry();this.line.geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));this.began=time;this.line.visible=true;
 }
 update(time:number){if(this.began<0)return;const p=(time-this.began)/2.4;if(p>=1){this.clear();return;}this.material.opacity=Math.sin(Math.PI*Math.max(0,p))*.8;}
 clear(){this.began=-1;this.line.visible=false;this.material.opacity=0;}
 get active(){return this.began>=0;}
 dispose(){this.line.geometry.dispose();this.material.dispose();}
}
