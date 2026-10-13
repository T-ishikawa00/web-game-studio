import {clamp} from './math.js';

const SUPPORTED_KEYS = new Set([
  'ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Space','Spacebar',
  'Escape','Enter','a','d','w','s','r','f'
]);
const isSupportedKey=key=>SUPPORTED_KEYS.has(key)||SUPPORTED_KEYS.has(String(key).toLowerCase());

function keyToken(key){
  const value=String(key).toLowerCase();
  if(value==='space'||value==='spacebar')return ' ';
  return value;
}

export function bindInput(canvas,handlers,{windowTarget=globalThis.window,documentTarget=globalThis.document}={}){
  const controller=new AbortController(),opts={signal:controller.signal};
  const pressedKeys=new Map();
  let pointerId=null;
  const point=e=>{
    const r=canvas.getBoundingClientRect();
    return {x:clamp((e.clientX-r.left)/r.width*720,0,720),y:clamp((e.clientY-r.top)/r.height*720,0,720)};
  };
  const releaseKeys=()=>{
    const released=[...pressedKeys.values()];
    pressedKeys.clear();
    for(const key of released)handlers.keyUp?.(key);
  };
  const cancel=()=>{
    pointerId=null;
    releaseKeys();
    handlers.cancel?.();
  };

  canvas.addEventListener('pointerdown',e=>{
    if(pointerId!==null||e.button!==0)return;
    e.preventDefault();
    pointerId=e.pointerId;
    canvas.setPointerCapture(pointerId);
    canvas.focus({preventScroll:true});
    handlers.down?.(point(e));
  },opts);
  canvas.addEventListener('pointermove',e=>{
    if(pointerId!==null&&e.pointerId!==pointerId)return;
    handlers.move?.(point(e),pointerId!==null);
  },opts);
  canvas.addEventListener('pointerup',e=>{
    if(e.pointerId!==pointerId)return;
    handlers.up?.(point(e));
    pointerId=null;
  },opts);
  canvas.addEventListener('pointercancel',cancel,opts);
  canvas.addEventListener('lostpointercapture',()=>{if(pointerId!==null)cancel();},opts);

  canvas.addEventListener('keydown',e=>{
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    if(!isSupportedKey(e.key))return;
    e.preventDefault();
    const token=keyToken(e.key);
    if(e.repeat||pressedKeys.has(token))return;
    pressedKeys.set(token,e.key);
    handlers.key?.(e.key);
  },opts);
  canvas.addEventListener('keyup',e=>{
    if(!isSupportedKey(e.key))return;
    e.preventDefault();
    const token=keyToken(e.key),original=pressedKeys.get(token);
    if(original===undefined)return;
    pressedKeys.delete(token);
    handlers.keyUp?.(original);
  },opts);

  windowTarget?.addEventListener?.('blur',cancel,opts);
  documentTarget?.addEventListener?.('visibilitychange',()=>{
    if(documentTarget.hidden)cancel();
  },opts);

  return {cancel,dispose:()=>{cancel();controller.abort();}};
}
