import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {musicScore,renderMusic} from '../../src/prototypes/music-score';
import {rhythmScore} from '../../src/prototypes/music-rhythm';

test('Original D1 and D2 renderers reproduce reviewed PCM exactly',()=>{
 for(const d of ['D1','D2'] as const){const r=renderMusic(d),old=readFileSync(`docs/qa/tiny-bgm-pilot-01/audio/${d}.wav`),pcm=Buffer.alloc(r.left.length*4);assert.equal(old.length,44+pcm.length);for(let i=0;i<r.left.length;i++){pcm.writeInt16LE(Math.round(r.left[i]!*32767),i*4);pcm.writeInt16LE(Math.round(r.right[i]!*32767),i*4+2);}assert.ok(pcm.equals(old.subarray(44)),d+' original PCM');}
});
test('Rhythm refinement retains all note identities and chronological melody with only 20 moved onsets',()=>{
 const a=musicScore('D1'),b=rhythmScore('B');assert.equal(b.bpm,a.bpm);assert.equal(b.seconds,96);assert.equal(b.notes.length,a.notes.length);assert.equal(b.notes.filter((n,i)=>n.beat!==a.notes[i]!.beat).length,20);
 for(let i=0;i<a.notes.length;i++){const {beat,...x}=a.notes[i]!,{beat:y,...z}=b.notes[i]!;assert.deepEqual(z,x);}
 const melody=(s:typeof a)=>s.notes.filter(n=>n.instrument==='pluck').sort((x,y)=>x.beat-y.beat).map(n=>n.midi);assert.deepEqual(melody(b),melody(a));
 const beats=[...new Set(b.notes.map(n=>n.beat))].sort((x,y)=>x-y);assert.equal(Math.max(...beats.map((n,i)=>(beats[i+1]??beats[0]!+128)-n)),2.5);
});
test('Tempo candidate changes only the onset clock and loop duration relative to B',()=>{
 const b=rhythmScore('B'),c=rhythmScore('C');assert.deepEqual(c.notes,b.notes);assert.equal(c.bpm,82.4);assert.equal(c.seconds,128*60/82.4);assert.deepEqual(rhythmScore('A'),musicScore('D1'));
 const base=renderMusic('D1'),r=renderMusic('D1',32000,{score:c,noteBpm:80,normalization:base.normalization});assert.equal(r.normalization,base.normalization);assert.equal(r.left.length,Math.round(c.seconds*32000));assert.equal(r.left[0],r.left.at(-1));
});
