import {mkdir,writeFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {synthesize,soundIds} from '../src/prototypes/craft-sound';
import {projectRoot,projectPath} from './project-path.mjs';
const out=projectPath(path.join(projectRoot,'docs/qa/tiny-craft-pilot-01/audio'));await mkdir(out,{recursive:true});
function wav(data:Float32Array,sr=44100){const b=Buffer.alloc(44+data.length*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(sr,24);b.writeUInt32LE(sr*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(data.length*2,40);for(let i=0;i<data.length;i++)b.writeInt16LE(Math.round(Math.max(-1,Math.min(1,data[i]!))*32767),44+i*2);return b;}
const rows=[];
for(const id of soundIds)for(const variant of (['arrow','arrive','clear'].includes(id)?[0,1]:[0])){
 const raw=synthesize(id,variant),gain=.35*.65,data=raw.map(n=>n*gain),file=id+'-'+variant+'.wav';await writeFile(path.join(out,file),wav(data));
 const peak=raw.reduce((p,n)=>Math.max(p,Math.abs(n)),0),rms=Math.sqrt(data.reduce((s,n)=>s+n*n,0)/data.length);
 rows.push({id,variant,file:'audio/'+file,durationMs:data.length/44.1,bytes:(await stat(path.join(out,file))).size,rawPeak:peak,previewPeak:peak*gain,previewRms:rms,previewGain:gain,source:'src/prototypes/craft-sound.ts',listening:'NOT TESTED; Human review pending'});
}
const max=Math.max(...rows.map(r=>r.rawPeak));
await writeFile(path.join(out,'../audio-measurements.json'),JSON.stringify({sampleRate:44100,format:'mono PCM16 WAV',rows,hardVoiceLimit:3,maximumUserGain:1,voiceGain:.65,conservativeWorstCasePeak:max*3*.65,clipBoundPass:max*3*.65<1,method:'Triangle inequality across three simultaneous voices at maximum user gain. Preview files use actual default gain, not equal-peak normalization. Numeric result is not listening approval.'},null,2)+'\n');
console.log(JSON.stringify({samples:rows.length,maxRawPeak:max,conservativeMixPeak:max*3*.65}));
