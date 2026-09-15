import {boardView as baseBoardView,type View} from './board-view';
import {settleLight,type LightState} from './rules';
import {floor,flower} from './art';
import {crestText} from './visual-language';
import * as object from './light-object-art';
export {statusView,button,arrows,type View} from './board-view';

export function boardView(v:View){
 const {level:l,progress,en}=v;if(l.kind!=='light')return baseBoardView(v);
 const s=l.size,state=progress.board as LightState,r=settleLight(l,state),t=(ja:string,e:string)=>en?e:ja;
 const xy=(p:number)=>[p%s*60+30,Math.floor(p/s)*60+30] as const;
 const gates=l.gates??(l.gate===undefined?[]:[{id:'◇',gate:l.gate,switch:l.switch!}]);
 const beams=r.paths.map(p=>`<polyline class="beam-halo" points="${p.map(p=>xy(p).join(',')).join(' ')}"/><polyline class="beam" points="${p.map(p=>xy(p).join(',')).join(' ')}"/>`).join('');
 const devices=gates.map((g,i)=>{const active=l.gates?!!state.gates?.[i]:state.gate,receiving=l.gates?r.switchedGates.includes(i):r.switched;return object.gateArt(...xy(g.gate),active,g.id)+object.receiverArt(...xy(g.switch),g.id,receiving,active);}).join('');
 const mirrors=l.mirrors.map((p,i)=>`<button type="button" data-action="mirror:${i}" class="cell-control ${l.id==='L01'&&i===0&&v.guideOpen&&!v.acted?'spotlight':''}" style="left:${(p%s+.06)/s*100}%;top:${(Math.floor(p/s)+.06)/s*100}%;width:${.88/s*100}%;height:${.88/s*100}%" aria-label="${t(`鏡 ${i+1} を回す`,`Turn mirror ${i+1}`)}" ${v.paused||v.won?'disabled':''}>${object.mirrorArt(state.mirrors[i]!,r.paths.some(path=>path.includes(p)))}</button>`).join('');
 return `<div class="world-frame greenhouse"><div class="board garden object-garden" data-size="${s}" aria-label="${t('光の庭','Light garden')}"><svg viewBox="0 0 ${s*60} ${s*60}" aria-hidden="true">${floor(s,l.walls,'garden')}${beams}${devices}${l.flowers.map(p=>flower(...xy(p),r.lit.includes(p))).join('')}${object.lamp(...xy(l.source),l.direction)}${l.splitter?object.splitter(...xy(l.splitter.cell),l.splitter.input,l.splitter.outputs):''}</svg>${mirrors}</div></div><p class="feedback sr-only" role="status">${r.loop?t('光が巡回しています。鏡を変えてみよう。','The light loops. Try turning a mirror.'):v.notice||t('鏡をタップして回す','Tap a mirror to turn it')} ${gates.map((g,i)=>`${crestText(g.id)} ${(l.gates?state.gates?.[i]:state.gate)?t('開','open'):t('閉','closed')}`).join(' ')}</p>`;
}
