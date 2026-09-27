import {deliveryLevelsR2 as levels} from '../../src/prototypes/delivery-levels-r2';
import type {Progress} from '../../src/prototypes/state';
import {districts} from './stage-art';
export function nextDelivery(progress:Progress){return levels.find(l=>!progress.cleared.includes(l.id))?.id??'D01';}
export function renderJourney(root:HTMLElement,progress:Progress,lang:'ja'|'en',choose:(id:string,event:Event)=>void){
 const t=(ja:string,en:string)=>lang==='ja'?ja:en;root.replaceChildren();
 districts.forEach((district,chapter)=>{const section=document.createElement('section');section.className='journey-chapter';section.dataset.chapter=String(chapter+1);
  const intro=document.createElement('div');intro.className='chapter-intro';const small=document.createElement('p');small.className='eyebrow';small.textContent=`0${chapter+1} / PARCEL GROVE`;const title=document.createElement('h3');title.textContent=district[lang];const note=document.createElement('p');note.textContent=lang==='ja'?district.noteJa:district.noteEn;const seal=document.createElement('span');seal.className='chapter-seal';seal.textContent=['✿','❧','⌂'][chapter]!;seal.setAttribute('aria-hidden','true');intro.append(seal,small,title,note);
  const stops=document.createElement('div');stops.className='journey-stops';stops.setAttribute('role','group');stops.setAttribute('aria-label',district[lang]);
  for(const [local,l] of levels.slice(chapter*6,chapter*6+6).entries()){const completed=progress.cleared.includes(l.id),current=progress.levelId===l.id,recommended=nextDelivery(progress)===l.id&&!completed;const b=document.createElement('button');b.type='button';b.className='delivery-stop';b.dataset.level=l.id;b.dataset.completed=String(completed);b.dataset.current=String(current);b.dataset.recommended=String(recommended);b.dataset.unlocked='true';b.style.setProperty('--stop',String(local));if(current)b.setAttribute('aria-current','step');
   b.setAttribute('aria-label',`${l.id} ${l.title[lang]} · ${completed?t('お届け済み','Delivered'):t('選択できます','Available')}${current?t(' · 現在の配達',' · Current delivery'):''}`);
   const number=document.createElement('span');number.className='stop-number';number.textContent=l.id.slice(1);const stamp=document.createElement('span');stamp.className='stop-stamp';stamp.textContent=completed?'✓':recommended?'→':'◇';stamp.setAttribute('aria-hidden','true');const name=document.createElement('strong');name.textContent=l.title[lang];const state=document.createElement('small');state.textContent=completed?t('お届け済み','Delivered'):current?t('この配達のつづき','Your current stop'):recommended?t('次のおすすめ','Up next'):t('配達する','Make a delivery');b.append(number,stamp,name,state);b.addEventListener('click',e=>choose(l.id,e));stops.append(b);
  }section.append(intro,stops);root.append(section);
 });
}
