import{test}from'node:test';import assert from'node:assert/strict';import{judgeShot,subjectAt,visibleCues,createGame,meta}from'../src/games/lens.js';
const shot={frame:{x:360,y:300},subject:{x:360,y:300,bloom:1},focus:1,age:3,obscured:false};
test('finite-film portrait requires all three player-controlled conditions',()=>{assert.equal(judgeShot(shot).ok,true);for(const [p,reason]of [[{focus:.84},'focus'],[{subject:{x:426,y:300,bloom:1}},'frame'],[{subject:{x:360,y:300,bloom:.47}},'bloom'],[{age:1},'emerging'],[{obscured:true},'mist']])assert.equal(judgeShot({...shot,...p}).reason,reason);});
test('quality rewards centering and optimal timing',()=>{assert.equal(judgeShot(shot).quality,100);assert.ok(judgeShot({...shot,frame:{x:410,y:345},subject:{x:360,y:300,bloom:.6},focus:.86}).quality<80);});
test('composition and bloom cues match their earned thresholds without changing shot acceptance',()=>{
 const centered=visibleCues({frame:{x:100,y:100},subject:{x:118,y:82,bloom:.9},age:2.1,obscured:false});
 assert.equal(centered.centered,true,'the center cue includes the exact ±18 boundary on both axes');
 assert.deepEqual(centered.nudge,[]);
 assert.equal(centered.lightOpen,true);
 assert.equal(centered.bloomPeak,true,'peak is announced at exactly .90');
 const nudge=visibleCues({frame:{x:100,y:100},subject:{x:119,y:80,bloom:.899},age:3,obscured:false});
 assert.equal(nudge.centered,false);
 assert.deepEqual(nudge.nudge,['RIGHT','UP']);
 assert.equal(nudge.bloomPeak,false,'peak is not announced below .90');
 assert.equal(judgeShot({...shot,frame:{x:379,y:281},subject:{x:360,y:300,bloom:.9}}).ok,true,'the new center cue does not tighten the existing acceptance bounds');
 assert.equal(visibleCues({frame:shot.frame,subject:{...shot.subject,bloom:1},age:3,obscured:true}).bloomPeak,false,'mist keeps the photo peak cue hidden');
 assert.ok(meta.hint.ja.includes('中央の十字')&&meta.hint.ja.includes('星印')&&meta.hint.ja.includes('ピントの円'));
 assert.ok(meta.hint.en.includes('center cross')&&meta.hint.en.includes('peak star')&&meta.hint.en.includes('focus circle'));
 assert.ok(!meta.hint.ja.includes('18')&&!meta.hint.en.includes('18'),'logical position units stay in implementation and tests');
});
test('public report adds center and peak labels exactly when the corresponding shot is already acceptable',()=>{
 for(const [language,centerLabel,peakLabel] of [['ja','フレームOK · 中心','光がひらいた · 満開'],['en','FRAME OK · CENTERED','LIGHT OPEN · PEAK']]){
  const reports=[],g=createGame({ctx:null,audio:{play(){}},settings:()=>({}),lang:()=>language,onReport:r=>reports.push(r)});
  g.reset();
  g.pointer('down',{x:300,y:300});g.step(.02);
  assert.ok(reports.at(-1).detail.includes(language==='ja'?'少し右へ':'NUDGE RIGHT'),'misaligned compositions receive a concise directional cue');
  g.reset();
  let cueShot=null;
  for(let tick=0;tick<180&&!cueShot;tick++){
   let s=g.snapshot();const target=subjectAt(s.age+.02,s.index);
   if(!s.holding)g.pointer('down',target);else g.pointer('move',{...target,held:true});
   g.step(.02);s=g.snapshot();
   const cues=visibleCues({frame:s.frame,subject:s.subject,age:s.age,obscured:s.obscured});
   if(cues.centered&&cues.bloomPeak&&s.focus>=.85){
    const decision=judgeShot({frame:s.frame,subject:s.subject,focus:s.focus,age:s.age,obscured:s.obscured});
    assert.equal(decision.ok,true,'center and peak prompts correspond to an eligible release');
    cueShot=reports.at(-1).detail;
   }
  }
  assert.ok(cueShot,'simulation reached the centered, peak-bloom window');
  assert.ok(cueShot.includes(centerLabel));
  assert.ok(cueShot.includes(peakLabel));
 }
});
test('subjects remain reachable in frame bounds through long exposure',()=>{for(let i=0;i<8;i++)for(let t=0;t<100;t+=.2){const p=subjectAt(t,i);assert.ok(p.x>112&&p.x<608);assert.ok(p.y>105&&p.y<528);assert.ok(p.bloom>=0&&p.bloom<=1);}});
function game(){const reports=[],g=createGame({ctx:null,audio:{play(){}},settings:()=>({}),lang:()=> 'en',onReport:r=>reports.push(r)});g.reset();return{g,reports};}
test('blind tap spam spends film and reaches honest failure',()=>{const{g,reports}=game();for(let i=0;i<14;i++){g.pointer('down',{x:20,y:20});g.pointer('up',{x:20,y:20});}assert.equal(g.snapshot().film,0);assert.equal(g.snapshot().photos.length,0);assert.equal(reports.at(-1).status,'lost');});
test('cancelled pointer cannot take a phantom exposure',()=>{const{g}=game();g.pointer('down',{x:360,y:300});g.cancel();g.pointer('up',{x:360,y:300});assert.equal(g.snapshot().film,14);assert.equal(g.snapshot().holding,false);});
test('release position is the actual shutter location',()=>{const{g}=game();g.pointer('down',{x:360,y:300});for(let i=0;i<60;i++)g.step(.05);g.pointer('up',{x:608,y:105});assert.equal(g.snapshot().photos.length,0);assert.equal(g.snapshot().frame.x,608);assert.equal(g.snapshot().frame.y,105);});
test('a skilled simulated tracking policy can clear the slice',()=>{const{g}=game();for(let tick=0;tick<6000&&g.snapshot().status==='running';tick++){let s=g.snapshot();const p=subjectAt(s.age+.02,s.index);if(!s.holding)g.pointer('down',p);else g.pointer('move',{...p,held:true});g.step(.02);s=g.snapshot();if(s.age>2.6&&s.focus>=.97&&s.subject.bloom>.75&&!s.obscured)g.pointer('up',s.subject);}assert.equal(g.snapshot().status,'won');assert.equal(g.snapshot().photos.length,8);assert.ok(g.snapshot().time>=25);assert.ok(g.snapshot().time<100);});
test('keyboard release shoots once and cancel clears continuous movement',()=>{const{g}=game();g.key('ArrowRight');g.step(.1);assert.equal(g.snapshot().aim.x,384);g.keyUp('ArrowRight');g.key(' ');for(let i=0;i<60;i++)g.step(.05);g.keyUp(' ');assert.equal(g.snapshot().photos.length,1);const film=g.snapshot().film;g.keyUp(' ');assert.equal(g.snapshot().film,film);g.key('ArrowLeft');g.key(' ');g.cancel();const x=g.snapshot().aim.x;g.step(.1);g.keyUp(' ');assert.equal(g.snapshot().aim.x,x);assert.equal(g.snapshot().film,film);});

function recordingContext(){
 const calls=[],stack=[];let target;
 class Gradient{constructor(){this.stops=[];}addColorStop(offset,color){this.stops.push({offset,color});calls.push({op:'gradient-stop',color});}}
 target=new Proxy({globalAlpha:1,lineWidth:1,lineDash:[],canvas:{clientWidth:720}},{
  get(object,key){if(key in object)return object[key];if(key==='createLinearGradient'||key==='createRadialGradient')return()=>new Gradient();if(key==='save')return()=>{stack.push({...object,lineDash:[...object.lineDash]});calls.push({op:'save'});};if(key==='restore')return()=>{const saved=stack.pop();if(saved)Object.assign(object,saved);calls.push({op:'restore'});};if(key==='setLineDash')return value=>{object.lineDash=[...value];calls.push({op:'dash',value:[...value]});};return(...args)=>{if(['stroke','fill','fillRect','strokeText','fillText','roundRect'].includes(key))calls.push({op:key,strokeStyle:object.strokeStyle,fillStyle:object.fillStyle,lineWidth:object.lineWidth,lineDash:[...object.lineDash],args});};},
  set(object,key,value){object[key]=value;return true;}
 });
 return{ctx:target,calls};
}

function renderContrastRun(highContrast){
 const {ctx,calls}=recordingContext(),config={highContrast,reducedMotion:false};
 const g=createGame({ctx,audio:{play(){}},settings:()=>config,lang:()=> 'en',onReport(){}});
 g.reset();g.render(0);
 if(highContrast){
  for(let tick=0;tick<6000&&g.snapshot().photos.length<3;tick++){
   let s=g.snapshot();const p=subjectAt(s.age+.02,s.index);
   if(!s.holding)g.pointer('down',p);else g.pointer('move',{...p,held:true});
   g.step(.02);s=g.snapshot();
   const cue=visibleCues({frame:s.frame,subject:s.subject,age:s.age,obscured:s.obscured});
   if(cue.centered&&cue.bloomPeak)g.render(0);
   if(s.age>2.6&&s.focus>=.97&&s.subject.bloom>.75&&!s.obscured)g.pointer('up',s.subject);
  }
  assert.equal(g.snapshot().photos.length,3,'the deterministic render setup reaches the fourth subject');
  for(let tick=0;tick<1200&&!g.snapshot().obscured;tick++)g.step(.02);
  assert.equal(g.snapshot().obscured,true,'the setup reaches a real sea-mist state');
  g.render(0);
 }
 return calls;
}

test('high contrast adds a distinct subject outline, light/focus strokes, and patterned mist while default palette stays intact',()=>{
 const normal=renderContrastRun(false),contrast=renderContrastRun(true);
 assert.ok(normal.some(x=>x.op==='gradient-stop'&&x.color==='#ffc19b'));
 assert.ok(!normal.some(x=>x.op==='gradient-stop'&&x.color==='#fff36d'));
 assert.ok(contrast.some(x=>x.op==='gradient-stop'&&x.color==='#fff36d'),'subject uses a luminous neutral-accent fill');
 assert.ok(contrast.some(x=>x.op==='stroke'&&x.strokeStyle==='#03161c'&&x.lineWidth>=8),'light and focus rings have a dark outer contour');
 assert.ok(contrast.some(x=>x.op==='stroke'&&x.strokeStyle==='#fff36d'&&x.lineWidth===4),'open light has a solid yellow inner contour');
 assert.ok(contrast.some(x=>x.op==='stroke'&&x.strokeStyle==='#ffffff'&&x.lineWidth===4),'unopened light is a white dashed contour');
 assert.ok(contrast.some(x=>x.op==='fillRect'&&x.fillStyle==='#fff36d'&&x.args[1]===240),'sea mist becomes a bright full-width cue band');
 assert.ok(contrast.some(x=>x.op==='strokeText'&&x.args[0]==='SEA MIST'),'mist label receives a dark text outline');
 assert.ok(contrast.some(x=>x.op==='dash'&&x.value.length===2),'unopened light uses a dashed cue distinct from the solid open state');
 assert.ok(contrast.some(x=>x.op==='roundRect'&&x.args[2]===22&&x.args[3]===22),'the composition center cue is a distinct square reticle');
 assert.ok(contrast.some(x=>x.op==='fill'&&x.fillStyle==='#fff36d'),'the peak marker is a filled star rather than color-only feedback');
 const markers=contrast.filter(x=>x.op==='roundRect'&&x.args[2]===22&&x.args[3]===22);
 assert.ok(markers.every(x=>x.args[0]>=70&&x.args[0]+22<=650&&x.args[1]>=70&&x.args[1]+22<535),'quality markers stay clear of the title area and phone-sized control strip');
});
