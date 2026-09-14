// CSS-pixel thresholds, shared by every level. No engine or save logic here.
export const SWIPE_DISTANCE=20;
export const SWIPE_DOMINANCE=1.3;
const TAP_SLOP=10;
export function directInput(root:HTMLElement,enabled:()=>boolean,move:(direction:number)=>void){
 type Pending={id:number;x:number;y:number;target:HTMLElement;kind:'tap'|'swipe';rect:DOMRect;drift:boolean};
 let pending:Pending|undefined,clickTarget:HTMLElement|undefined;
 const pointers=new Set<number>();
 const clear=()=>{const old=pending;pending=undefined;clickTarget=undefined;if(old){old.target.classList.remove('pointer-pressed');if(old.target.hasPointerCapture(old.id))old.target.releasePointerCapture(old.id);}};
 const cancel=()=>clear();
 const sameRect=(a:DOMRect,b:DOMRect)=>['x','y','width','height'].every(k=>Math.abs(a[k as keyof DOMRect] as number-(b[k as keyof DOMRect] as number))<.5);
 document.addEventListener('pointerdown',e=>{pointers.add(e.pointerId);if(pointers.size>1)clear();},true);
 root.addEventListener('pointerdown',e=>{
  clear();if(!enabled()||!e.isPrimary||e.button!==0||pointers.size!==1||!(e.target instanceof Element))return;
  const target=e.target.closest<HTMLElement>('.cell-control,[data-swipe-board]');
  if(!target||!root.contains(target)||(target instanceof HTMLButtonElement&&target.disabled))return;
  pending={id:e.pointerId,x:e.clientX,y:e.clientY,target,kind:target.hasAttribute('data-swipe-board')?'swipe':'tap',rect:target.getBoundingClientRect(),drift:false};
  target.classList.add('pointer-pressed');if(pending.kind==='swipe'){target.setPointerCapture(e.pointerId);root.focus({preventScroll:true});}
 });
 document.addEventListener('pointermove',e=>{if(pending?.id===e.pointerId&&pending.kind==='tap'&&Math.hypot(e.clientX-pending.x,e.clientY-pending.y)>TAP_SLOP){pending.drift=true;pending.target.classList.remove('pointer-pressed');}});
 document.addEventListener('pointerup',e=>{
  const p=pending;const alone=pointers.size===1;pointers.delete(e.pointerId);if(!p||p.id!==e.pointerId)return;clear();
  const r=p.target.getBoundingClientRect();
  if(!enabled()||!alone||p.drift||!p.target.isConnected||!sameRect(p.rect,r)||e.clientX<r.left||e.clientX>=r.right||e.clientY<r.top||e.clientY>=r.bottom)return;
  if(p.kind==='tap'){
   if(document.elementFromPoint(e.clientX,e.clientY)?.closest('.cell-control')===p.target)clickTarget=p.target;
   return;
  }
  const dx=e.clientX-p.x,dy=e.clientY-p.y,ax=Math.abs(dx),ay=Math.abs(dy);
  if(Math.max(ax,ay)<SWIPE_DISTANCE||Math.max(ax,ay)<Math.min(ax,ay)*SWIPE_DOMINANCE)return;
  move(ax>ay?(dx>0?1:3):(dy>0?2:0));
 });
 document.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);clear();});
 root.addEventListener('lostpointercapture',()=>{if(pending)clear();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')clear();});
 window.addEventListener('pagehide',()=>{pointers.clear();clear();});
 window.addEventListener('blur',()=>{pointers.clear();clear();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){pointers.clear();clear();}});
 window.addEventListener('resize',clear);parent.addEventListener('resize',clear);parent.addEventListener('scroll',clear,{passive:true});
 const observer=new ResizeObserver(()=>{if(pending&&!sameRect(pending.rect,pending.target.getBoundingClientRect()))clear();});
 return {cancel,refresh(){observer.disconnect();for(const e of root.querySelectorAll('.board'))observer.observe(e);},acceptClick(e:MouseEvent,b:HTMLElement){
  if(!b.classList.contains('cell-control'))return true;
  // Native keyboard/AT activation has no pointer transaction.
  if(e.detail===0)return true;
  const valid=b===clickTarget;clickTarget=undefined;return valid;
 }};
}
