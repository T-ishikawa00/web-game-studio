import * as art from './art';
import {crestText,visualText} from './visual-language';
import type {Level} from './rules';

// Separate explanatory pictures: never read or mutate a play state.
const ink='#172533', green='#335A6F', gold='#7B4900', red='#982E32';
const esc=(s:string)=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const box=(x:number,y:number,w:number,h:number,fill='#f1f0df',stroke='#cbd5be',r=5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" style="fill:${fill};stroke:${stroke};stroke-width:1.3"/>`;
const path=(d:string,color=ink,width=2)=>`<path d="${d}" style="fill:none;stroke:${color};stroke-width:${width};stroke-linecap:round;stroke-linejoin:round"/>`;
const txt=(x:number,y:number,s:string,size=13,color=ink)=>`<text x="${x}" y="${y}" text-anchor="middle" style="font-size:${size}px;fill:${color};font-family:Segoe UI,Yu Gothic UI,sans-serif;font-weight:600">${esc(s)}</text>`;
const dot=(x:number,y:number,r:number,fill:string,stroke=fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
function arrow(x:number,y:number,xx:number,yy:number,color=ink,width=2){
 const angle=Math.atan2(yy-y,xx-x),a=5;
 return path(`M${x} ${y}L${xx} ${yy}M${xx-a*Math.cos(angle-.55)} ${yy-a*Math.sin(angle-.55)}L${xx} ${yy}L${xx-a*Math.cos(angle+.55)} ${yy-a*Math.sin(angle+.55)}`,color,width);
}
const cross=(x:number,y:number)=>path(`M${x-6} ${y-6}l12 12m0-12-12 12`,red,3);
const check=(x:number,y:number)=>path(`M${x-6} ${y}l4 5 9-11`,green,3);
const frame=(x:number,label:string)=>txt(x+77,15,label)+box(x,22,154,92,'#fbf8eb','#d1d6c3',10);
const pair=(left:string,right:string,a:string,b:string)=>frame(2,left)+frame(184,right)+arrow(162,68,177,68)+a+b;
const svg=(label:string,content:string)=>`<svg class="guide-diagram" viewBox="0 0 340 120" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${content}</svg>`;
function flower(x:number,y:number,lit:boolean){return '<g transform="translate('+x+' '+y+') scale(.4)">'+art.flower(0,0,lit)+'</g>';}
function mirror(x:number,y:number,slash:boolean){return box(x-11,y-11,22,22,'#4EBCF5','#172533',5)+path(slash?`M${x-7} ${y+7}l14-14`:`M${x-7} ${y-7}l14 14`,'#172533',3);}
function lamp(x:number,y:number){return box(x-8,y-9,16,18,'#617d72','#405f55',4)+dot(x,y,4,'#ffe0a0');}
function friend(x:number,y:number,other:boolean){return '<g transform="translate('+x+' '+y+') scale(.36)">'+art.character(0,0,other,false,false)+'</g>';}
function house(x:number,y:number,other:boolean){return '<g transform="translate('+x+' '+y+') scale(.4)">'+art.house(0,0,other,false)+'</g>';}
function roadRow(x:number,y:number,n=4){return Array.from({length:n},(_,i)=>box(x+i*28,y,27,25,'#eee9d8','#d9d2bd',3)).join('');}
function robot(x:number,y:number,id:'A'|'B',heading='→'){return '<g transform="translate('+x+' '+y+') scale(.36)">'+art.robot(0,0,id,heading,0)+'</g>';}
function clock(x:number,y:number){return dot(x,y,6,'#fff8df',gold)+path(`M${x} ${y-3}v3l3 1`,gold,1.5);}
function crossing(x:number,y:number){return Array.from({length:3},(_,row)=>Array.from({length:3},(_,col)=>box(x+col*24,y+row*24,23,23,row===1||col===1?'#e9e4d3':'#dce6d2',row===1||col===1?'#c7c2ae':'#d0dcc5',3)).join('')).join('');}

export function homeInputDiagram(en:boolean){
 return `<svg class="shared-input-diagram" viewBox="0 0 220 42" role="img" aria-label="${en?'One direction moves both friends. Try it in either garden.':'ひとつの方向で、ふたりが一歩。どちらの庭でも試せます。'}"><path d="M10 21H54M46 13l8 8-8 8M56 21H82M82 21V9H110M82 21V33H110" fill="none" stroke="#253145" stroke-width="2.5"/>${friend(130,10,false)}${friend(130,33,true)}<path d="M150 10h42m-8-6 8 6-8 6M150 33h42m-8-6 8 6-8 6" fill="none" stroke="#253145" stroke-width="2.5"/></svg>`;
}
export function guideContent(level:Level,en:boolean,acted:boolean){
 const t=(ja:string,eng:string)=>en?eng:ja;
 let title='',body='',diagram='';
 if(level.kind==='light'){
  if(level.splitter){
   title=t('ひとすじから、ふたつへ','One ray, two branches');
   body=t('分光器は固定。印の入口へ届くと、描かれた2方向へ光が分かれます。ほかの方向からは止まります。','The splitter is fixed. Light entering its marked inlet takes both shown exits. Other approaches stop.');
   const device=(x:number,full:boolean)=>{
    const vx=[0,1,0,-1],vy=[-1,0,1,0],d=level.splitter!.input,cx=x+77,cy=67;
    let picture=lamp(cx-vx[d]!*34,cy-vy[d]!*34)+arrow(cx-vx[d]!*25,cy-vy[d]!*25,cx-vx[d]!*12,cy-vy[d]!*12,gold,3);
    for(const out of level.splitter!.outputs)picture+=arrow(cx+vx[out]!*12,cy+vy[out]!*12,cx+vx[out]!*36,cy+vy[out]!*36,full?gold:'#c7c8b4',full?3:1.5);
    return picture+`<polygon points="${cx},${cy-12} ${cx+12},${cy} ${cx},${cy+12} ${cx-12},${cy}" fill="#c4d5ce" stroke="#5b7c73" stroke-width="2"/>`+path(`M${cx-4} ${cy+4}l8-8`,'#f9fff5',2);
   };
   diagram=svg(t('指定の入口に光を届けると、固定された二つの出口から光が出る図','Light arriving at the marked inlet leaves through both fixed outlets'),pair(t('入口を確認','Find the inlet'),t('2つに分かれる','Two outputs'),device(2,false),device(184,true)));
  }else if(level.gate!==undefined||level.gates){
   title=t('開いた門は、そのまま','An open gate stays open');
   body=acted?t('光を外しても門は開いたまま。「1手戻す」は鏡と門を一緒に、操作前へ戻します。','The gate stays open when light moves away. Undo restores the previous mirror and gate states together.'):t('同じ印のスイッチと門が一組。スイッチを照らすと開き、光を外しても閉じません。','A switch and gate share a crest. Light the switch to open the gate; it stays open when the light moves away.');
   const latch=(x:number,on:boolean)=>{
    const sx=x+54,gy=69,gx=x+106,badge=crestText(level.gates?.[0]?.id??'◇');
    return (on?arrow(x+15,gy,x+136,gy,gold,3):'')+`<polygon points="${sx},${gy-12} ${sx+12},${gy} ${sx},${gy+12} ${sx-12},${gy}" fill="${on?'#f6d898':'#dfdfcb'}" stroke="#a89161" stroke-width="2"/>`+txt(sx,gy+4,badge,12)+path(`M${gx-11} 88V52h22v36`,green,3)+txt(gx,47,badge,12)+path(`M${gx-9} 57l-9 5v23m29-28 9 5v23`,green,2)+flower(x+136,gy,on)+txt(gx,105,t('開いたまま','OPEN'),11);
   };
   diagram=svg(t('同じ印のスイッチを照らすと門が開く。光を外した後も門は開いたまま','Light the matching switch to open its gate. The gate remains open after the light moves away'),pair(t('スイッチに光','Light the switch'),t('光を外しても','Move light away'),latch(2,true),latch(184,false)));
  }else{
   title=acted?t('光の曲がり方が変わりました','The ray changed direction'):t('鏡をひとつ、回してみよう','Turn one mirror');
   body=acted?t('光が届くと花が開きます。すべての花が同時に灯る道を探しましょう。','A flower opens when light reaches it. Find a route that lights every flower at the same time.'):t('金属の枠が付いた鏡をタップ。斜めの向きが切り替わり、光を曲げます。石や花は固定です。','Tap a metal-framed mirror. Its diagonal flips and bends the ray. Stones and flowers stay fixed.');
   const turn=(x:number,after:boolean)=>arrow(x+25,72,x+77,72,gold,3)+arrow(x+77,72,x+77,after?41:101,gold,3)+lamp(x+17,72)+mirror(x+77,72,after)+flower(x+77,35,after);
   diagram=svg(t('左から来る光は、回す前の鏡では下へ、回した後の鏡では上の花へ曲がる','Light arriving from the left turns down before the tap, then up toward the flower after the tap'),pair(t('タップ前','Before tap'),t('タップ後','After tap'),turn(2,false),turn(184,true)));
  }
 }else if(level.kind==='home'){
  const leaving=['T04','T10','T13','T14','T15','T16','T17','T18'].includes(level.id),wall=level.id==='T20'||level.id==='T02';
  if(leaving){title=t('家に着いても、また動ける','You can leave home again');body=t('一人の先着では終わりません。家からも次の入力で動きます。最後はふたり同時に家へ。','One arrival is not the finish. A friend at home still moves with the next input. Finish with both home together.');}
  else if(wall){title=t('壁を、待ち合わせに使おう','Let a wall wait for you');body=acted?t('片方だけ止まると、ふたりの位置の差が変わります。次は両方の家を見比べよう。','When one stops and the other moves, their spacing changes. Compare both homes next.'):t('同じ右入力でも、壁に当たる子だけ止まります。動ける子は一マス進みます。','With one right input, only the friend facing a wall stops. The other moves one square.');}
  else{title=acted?t('次の一歩も、ふたりを見て','Watch both for the next step'):t('ひとつの矢印で、ふたり','One arrow moves both');body=acted?t('次の一歩は、両方の家を見比べて。壁に当たる子だけが止まります。','Compare both homes before the next step. Only the friend facing a wall stays still.'):t('どちらかの庭をスワイプ、または方向ドラッグ。ふたりが同じ向きへ一マス動きます。矢印キー／WASD、選択式の方向ボタンも使えます。','Swipe or drag in either garden. Both friends move one square in that direction. Arrow keys / WASD and optional direction buttons work too.');}
  const gardens=(x:number,after:boolean)=>{
   let drawing='';
   for(const [i,y]of [43,79].entries()){
    drawing+=roadRow(x+21,y)+house(x+(leaving&&i===0?62:118),y+11,i===1);
    if(wall&&i===0)drawing+=box(x+78,y,26,25,'#c3c0b0','#999d8a',3)+path(`M${x+78} ${y+12}h26m-13-12v12`,'#8d9784',1.5);
    const pos=wall?(i===0?62:after?90:62):leaving?(i===0?after?90:62:after?62:34):after?62:34;
    drawing+=friend(x+pos,y+12,i===1);
    if(!after&&!(wall&&i===0))drawing+=arrow(x+pos+11,y+12,x+pos+24,y+12,ink,1.8);
   }
   return drawing;
  };
  diagram=svg(leaving?t('同じ右入力で、先に家に着いた子も家から一マス出る。もう一人も右へ一歩進む','One right input moves the early arrival out of home, while the other friend also moves right'):wall?t('同じ右入力。上の子は壁の前で止まり、下の子だけ右へ一マス進む','One right input: the upper friend stays at the wall and the lower friend moves right'):t('一回の右入力で、二つの庭の子がともに右へ一マス動く','One right input moves both friends one square to the right'),pair(t('右を1回','Right once'),leaving?t('家からも一歩','Home can be left'):wall?t('片方だけ進む','Only one moves'):t('ふたりが一歩','Both take a step'),gardens(2,false),gardens(184,true)));
 }else if(level.id==='D04'){
  title=t('待つ拍を、一つずつ','Count each waiting beat');
  body=t('時計へ到着したら、表示の拍数だけその場に留まります。残りが0になった次の拍で進みます。停止中のコマ送りでも確かめよう。','After reaching a clock, stay for its shown number of beats. Move on the beat after the count reaches zero. Pause and step to check.');
  const stages=[{x:2,label:t('到着','Arrive'),move:false,left:1},{x:121,label:t('1拍待つ','Wait one beat'),move:false,left:0},{x:240,label:t('次に進む','Then move'),move:true,left:0}];
  let picture='';for(const s of stages){picture+=txt(s.x+48,15,s.label,12)+box(s.x,22,98,92,'#fbf8eb','#d1d6c3',9)+roadRow(s.x+7,49,3)+clock(s.x+45,43)+robot(s.x+(s.move?77:49),62,'A')+dot(s.x+49,94,5,s.left?gold:'#fbf8eb',gold);if(s.move)picture+=arrow(s.x+49,79,s.x+77,79);}
  picture+=arrow(106,66,115,66)+arrow(225,66,234,66);
  diagram=svg(t('1拍待機の例。到着時は点が一つ。同じマスで一拍待つと点が消え、その次の拍で一マス進む','One-beat wait example: arrive with one filled dot, stay on the same cell while the dot clears, then move on the following beat'),picture);
 }else if(level.id==='D10'){
  title=t('出たマスへ、同じ拍で','Enter the cell just vacated');
  body=t('Aが北へ出るのと同じ拍に、Bはその空いたマスへ進めます。待たせる必要はありません。','On the same beat that A leaves north, B may enter the cell A vacates. No wait is needed.');
  const scene=(x:number,after:boolean)=>crossing(x+41,32)+(after?robot(x+77,44,'A','↑')+robot(x+77,68,'B')+check(x+130,89):robot(x+77,68,'A','↑')+robot(x+53,68,'B')+arrow(x+77,57,x+77,45)+arrow(x+63,68,x+74,68));
  diagram=svg(t('同じ拍にAは北へ進み、BはAのいたマスへ進む。別のマスに着くので衝突しない','A moves north while B enters the cell A leaves. They end in different cells, so this is allowed'),pair(t('同じ拍で','On the same beat'),t('空いたマスへ','Into the empty cell'),scene(2,false),scene(184,true)));
 }else if(level.id==='D11'){
  title=t('向かい合う交換はできない','No head-on swaps');
  body=t('同じ道でAとBが正面から入れ替わると衝突です。相手が出たマスへ後ろから続く動きは通れます。','A and B exchanging cells head-on collide. Following into a cell the other robot just left is allowed.');
  const swap=roadRow(23,56,4)+robot(65,68,'A')+robot(93,68,'B','←')+arrow(65,44,93,44,red)+arrow(93,95,65,95,red)+cross(125,96);
  const follow=roadRow(205,56,4)+robot(247,68,'B')+robot(275,68,'A')+arrow(247,44,275,44,green)+arrow(275,95,303,95,green)+check(313,95);
  diagram=svg(t('左はAとBが互いのマスを正面から交換しようとして衝突。右は同じ方向に続いて進める','Left: A and B try to swap each other’s cells head-on and collide. Right: moving together in the same direction is allowed'),frame(2,t('交換：衝突','Swap: collision'))+frame(184,t('後続：通行可','Follow: allowed'))+swap+follow);
 }else if(level.id==='D03'||Number(level.id.slice(1))>=9){
  title=t('一拍ゆずると、道が空く','One beat can make room');
  body=t('この小さな交差点では、待たないと二台が同じマスへ。Aが時計で1拍待つと、Bが先に通れます。','In this example crossing, both enter the same cell without a wait. A one-beat wait at A’s clock lets B go first.');
  const scene=(x:number,wait:boolean)=>crossing(x+41,32)+robot(x+53,68,'A')+robot(x+77,wait?68:44,'B','↓')+(wait?clock(x+44,78)+txt(x+53,100,'1',11)+arrow(x+77,78,x+77,95,green)+check(x+130,93):arrow(x+63,68,x+77,68,red)+arrow(x+77,54,x+77,68,red)+cross(x+77,68));
  diagram=svg(t('説明用の直交する交差点。左からA、上からBが同時に中央へ進むと衝突。Aが一拍止まるとBだけが中央を通る','A separate perpendicular crossing: A approaches from the left and B from above. Simultaneous entry collides; waiting A lets B cross first'),pair(t('待機0：同時','Wait 0: together'),t('待機1：Bが先','Wait 1: B first'),scene(2,false),scene(184,true)));
 }else{
  title=acted?t('道ができたら、出発','Ready to test your route'):t('矢印を変えて、出発','Set an arrow, then go');
  body=acted?t('「出発」で走らせよう。ぶつかったら「調整に戻る」。今の配置を残して直せます。','Press Go to test the route. If it fails, choose Back to edit. Your current plan stays in place.'):t('枠つき矢印をタップして、出る向きを変えます。普通の道は直進。道をつないだら「出発」。','Tap a framed arrow plate to change its exit direction. Plain roads go straight. Connect the route, then press Go.');
  const route=(x:number,ready:boolean)=>roadRow(x+23,71,4)+box(x+79,43,27,27,'#eee9d8','#d9d2bd',3)+'<g transform="translate('+(x+92)+' 41) scale(.4)">'+art.depot(0,0,'A',false)+'</g>'+box(x+108,71,27,25,'#c5c5b7','#9aa48e',3)+(ready?arrow(x+38,83,x+92,83,gold,2.5)+arrow(x+92,83,x+92,52,gold,2.5):'')+robot(x+36,83,'A')+dot(x+92,83,10,'#f6f4e8','#799387')+arrow(x+92,ready?88:83,x+(ready?92:99),ready?76:83,ink,2)+(ready?check(x+132,46):cross(x+122,51));
  diagram=svg(t('説明用の曲がり角。右向きの矢印は壁へ向かう。上向きに変えると受取口へ進む','A separate corner example: a right arrow leads toward a wall. Turn it upward to reach the depot'),pair(t('矢印を編集','Edit the arrow'),t('道ができたら出発','Set, then Go'),route(2,false),route(184,true)));
 }
 // CSS cannot override the imported masters' presentation attributes in Help.
 diagram=diagram.replace(/<(path|rect|circle|ellipse|polygon)([^>]*?)(\/?)>/g,(tag,name,attrs,close)=>{
  if(attrs.includes('style='))return tag;
  const paint=[...attrs.matchAll(/\b(fill|stroke|stroke-width)="([^"]+)"/g)].map(m=>m[1]+':'+m[2]).join(';');
  return '<'+name+attrs+(paint?' style="'+paint+'"':'')+close+'>';
 });
 return {title,body:visualText(body),diagram:visualText(diagram)};
}
export const introductionLevels=new Set(['L01','L04','L09','T19','T20','T04','D01','D03','D04','D10','D11']);
