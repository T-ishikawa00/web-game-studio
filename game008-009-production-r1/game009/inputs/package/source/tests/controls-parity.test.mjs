import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bindInput} from '../src/common/input.js';
import {createGame} from '../src/games/kiln.js';

class EventTargetMock{
  listeners=new Map();
  addEventListener(type,callback,{signal}={}){
    const list=this.listeners.get(type)||new Set();
    list.add(callback);this.listeners.set(type,list);
    signal?.addEventListener('abort',()=>list.delete(callback),{once:true});
  }
  dispatch(type,fields={}){
    const event={type,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...fields};
    for(const callback of this.listeners.get(type)||[])callback(event);
    return event;
  }
}

function advance(game,seconds){
  for(let i=0;i<Math.round(seconds*10);i++)game.step(.1);
}

test('keyboard input emits one down and a matching up, including aliases and key-repeat suppression',()=>{
  const canvas=new EventTargetMock(),windowTarget=new EventTargetMock(),documentTarget=new EventTargetMock();
  canvas.getBoundingClientRect=()=>({left:0,top:0,width:720,height:720});
  canvas.setPointerCapture=()=>{};canvas.focus=()=>{};
  const down=[],up=[],cancel=[];
  const input=bindInput(canvas,{key:k=>down.push(k),keyUp:k=>up.push(k),cancel:()=>cancel.push(true)},{windowTarget,documentTarget});

  const first=canvas.dispatch('keydown',{key:' ',repeat:false});
  canvas.dispatch('keydown',{key:' ',repeat:true});
  canvas.dispatch('keydown',{key:'ArrowLeft',repeat:false});
  canvas.dispatch('keydown',{key:'A',repeat:false});
  canvas.dispatch('keyup',{key:' '});
  canvas.dispatch('keyup',{key:'ArrowLeft'});
  canvas.dispatch('keyup',{key:'a'});
  assert.deepEqual(down,[' ','ArrowLeft','A']);
  assert.deepEqual(up,[' ','ArrowLeft','A']);
  assert.equal(first.defaultPrevented,true);

  canvas.dispatch('keydown',{key:'Enter',repeat:false});
  windowTarget.dispatch('blur');
  assert.deepEqual(up,[' ','ArrowLeft','A','Enter'],'blur releases held keys to avoid stuck actions');
  assert.equal(cancel.length,1);

  canvas.dispatch('keydown',{key:'d',repeat:false});
  documentTarget.hidden=true;
  documentTarget.dispatch('visibilitychange');
  assert.deepEqual(up,[' ','ArrowLeft','A','Enter','d'],'backgrounding releases remaining held keys');
  assert.equal(cancel.length,2);
  input.dispose();
  assert.equal(cancel.length,3);
});

test('kiln Space and Enter sustain fuel only while each key remains held',()=>{
  const game=createGame({ctx:null,audio:null,settings:()=>({}),lang:()=> 'en'});
  game.reset();
  const initial=game.snapshot().ember;
  game.key(' ');
  const afterSpaceDown=game.snapshot().ember;
  assert.ok(afterSpaceDown>initial,'keydown gives the same immediate fuel pulse as a pointer press');
  advance(game,1);
  const afterHeldSpace=game.snapshot().ember;
  assert.ok(afterHeldSpace>afterSpaceDown,'holding Space adds fuel over time');

  game.key('Enter');
  const afterEnterDown=game.snapshot().ember;
  assert.ok(afterEnterDown>afterHeldSpace);
  game.keyUp(' ');
  advance(game,.5);
  const afterSpaceRelease=game.snapshot().ember;
  assert.ok(afterSpaceRelease>afterEnterDown,'releasing Space leaves Enter held and stoking');

  game.keyUp('Enter');
  advance(game,.1);
  const afterBothReleased=game.snapshot().ember;
  assert.ok(afterBothReleased<afterSpaceRelease,'no key remains held after both key-up events');
  game.dispose?.();
});

test('kiln cancellation clears keyboard and pointer holds without releasing another source early',()=>{
  const game=createGame({ctx:null,audio:null,settings:()=>({}),lang:()=> 'en'});
  game.reset();
  game.pointer('down',{x:150,y:630});
  game.key(' ');
  game.pointer('up',{x:150,y:630});
  advance(game,.5);
  const stillHeldByKeyboard=game.snapshot().ember;
  game.cancel();
  advance(game,.1);
  const afterCancel=game.snapshot().ember;
  assert.ok(afterCancel<stillHeldByKeyboard,'cancel stops held-key fueling after the pointer is released');

  game.key('Enter');
  game.cancel();
  advance(game,.1);
  const afterSecondCancel=game.snapshot().ember;
  advance(game,.1);
  assert.ok(game.snapshot().ember<afterSecondCancel,'a cancelled Enter key cannot leave phantom stoking active');
});
