import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {renderMusic} from '../../src/prototypes/music-score';import {rhythmScore} from '../../src/prototypes/music-rhythm';
test('Frozen Craft R2 B PCM reproduces the Human-accepted waveform and executable manifest',()=>{
 const reference=renderMusic('D1'),b=renderMusic('D1',32000,{score:rhythmScore('B'),noteBpm:80,normalization:reference.normalization});
 const wav=readFileSync('docs/qa/tiny-d1-rhythm-01/audio/B.wav'),pcm=Buffer.alloc(b.left.length*4);for(let i=0;i<b.left.length;i++){pcm.writeInt16LE(Math.round(b.left[i]!*32767),i*4);pcm.writeInt16LE(Math.round(b.right[i]!*32767),i*4+2);}assert.ok(pcm.equals(wav.subarray(44)));
 const manifest=JSON.parse(readFileSync('docs/qa/tiny-craft-r2-checkpoint/frozen-runtime.json','utf8'));assert.equal(createHash('sha256').update(wav).digest('hex'),manifest.files.find((r:{file:string})=>r.file==='bgm-audio/D1.wav').hash);assert.equal(b.score.bpm,80);assert.equal(b.score.seconds,96);
});
