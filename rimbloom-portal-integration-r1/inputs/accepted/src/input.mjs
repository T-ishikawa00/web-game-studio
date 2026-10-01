import {W,H,B} from './core.mjs';
const directions=new Set(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d']);
export class Controls{
  constructor(canvas,hooks){
    this.canvas=canvas;this.hooks=hooks;this.aim=null;this.pending=null;this.keys=new Set();this.keyboardAngle=-Math.PI/2;
    canvas.addEventListener('pointerdown',e=>this.down(e));canvas.addEventListener('pointermove',e=>this.move(e));canvas.addEventListener('pointerup',e=>this.up(e));
    canvas.addEventListener('pointercancel',e=>this.cancelPointer(e.pointerId));canvas.addEventListener('lostpointercapture',e=>this.cancelPointer(e.pointerId));
    window.addEventListener('keydown',e=>this.key(e));window.addEventListener('keyup',e=>this.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur',()=>{this.clear();hooks.hidden();});document.addEventListener('visibilitychange',()=>{if(document.hidden){this.clear();hooks.hidden();}});
  }
  point(e){const r=this.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H};}
  down(e){
    this.hooks.trace?.({event:'down',id:e.pointerId,kind:e.pointerType,...this.point(e),active:this.hooks.active(),canAim:this.hooks.canAim(),pending:Boolean(this.pending)});
    if(!this.hooks.active()||!this.hooks.canAim()||this.pending||e.isPrimary===false||(e.pointerType==='mouse'&&e.button!==0)||this.aim&&!this.aim.keyboard)return;
    const p=this.point(e);if(p.x<B.l||p.x>B.r||p.y<B.t||p.y>B.b)return;
    e.preventDefault();this.canvas.focus({preventScroll:true});this.canvas.setPointerCapture(e.pointerId);this.hooks.unlock();this.aim={...p,id:e.pointerId,kind:e.pointerType||'mouse',at:performance.now()};
  }
  move(e){if(this.aim&&!this.aim.keyboard&&this.aim.id===e.pointerId)Object.assign(this.aim,this.point(e));}
  up(e){
    this.hooks.trace?.({event:'up',id:e.pointerId,kind:e.pointerType,...this.point(e),owner:this.aim?.id??null});
    if(!this.aim||this.aim.keyboard||this.aim.id!==e.pointerId)return;
    const a={...this.aim,...this.point(e)},p=this.hooks.player();this.aim=null;
    // Normal capture release is no longer an active aim, so its lost-capture event cannot cancel this shot.
    if(this.canvas.hasPointerCapture(e.pointerId))this.canvas.releasePointerCapture(e.pointerId);
    this.release(a.x-p.x,a.y-p.y,a.kind);
  }
  release(dx,dy,kind){
    if(!this.hooks.active()||!this.hooks.canAim()||!Number.isFinite(dx)||!Number.isFinite(dy)||Math.hypot(dx,dy)<1)return false;
    if(this.hooks.launch(dx,dy,kind,0))return true;
    if(this.hooks.cooldown()>0){this.pending={dx,dy,kind,at:performance.now()};return true;}return false;
  }
  update(){
    if(!this.pending)return;if(!this.hooks.active()){this.clear();return;}
    if(this.hooks.canAim()&&this.hooks.cooldown()<=0){const q=this.pending;this.pending=null;this.hooks.launch(q.dx,q.dy,q.kind,performance.now()-q.at);}
  }
  cancelPointer(id){if(this.aim&&!this.aim.keyboard&&this.aim.id===id){this.aim=null;this.pending=null;}}
  clear(){const a=this.aim;this.aim=null;this.pending=null;this.keys.clear();if(a&&!a.keyboard&&this.canvas.hasPointerCapture(a.id)){try{this.canvas.releasePointerCapture(a.id);}catch{}}}
  key(e){
    if(e.key==='Escape'&&this.hooks.activeOrPaused()){e.preventDefault();this.clear();this.hooks.pause();return;}
    if(document.activeElement!==this.canvas||!this.hooks.active()||this.aim&&!this.aim.keyboard)return;
    const k=e.key.toLowerCase();if(!directions.has(k)&&k!==' '&&k!=='enter')return;e.preventDefault();if(this.pending)return;this.keys.add(k);
    const dx=Number(this.keys.has('d')||this.keys.has('arrowright'))-Number(this.keys.has('a')||this.keys.has('arrowleft'));
    const dy=Number(this.keys.has('s')||this.keys.has('arrowdown'))-Number(this.keys.has('w')||this.keys.has('arrowup'));
    if(dx||dy){this.keyboardAngle=Math.atan2(dy,dx);this.aim={keyboard:true,kind:'keyboard'};}
    if((k===' '||k==='enter')&&!e.repeat){this.release(Math.cos(this.keyboardAngle),Math.sin(this.keyboardAngle),'keyboard');this.aim=null;}
  }
  visibleAim(){if(!this.aim)return null;const p=this.hooks.player();return this.aim.keyboard?{...this.aim,x:p.x+Math.cos(this.keyboardAngle)*240,y:p.y+Math.sin(this.keyboardAngle)*240}:this.aim;}
}
