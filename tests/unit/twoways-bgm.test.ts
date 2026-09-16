import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderTwMusic,TW_MUSIC} from '../../src/prototypes/twoways-bgm-score';
import {validTwMusic,twMusicKey} from '../../src/prototypes/twoways-bgm-audio';
test('Two Ways music preferences are bounded and separate',()=>{assert.equal(twMusicKey,'wgs:music-pilot:two-ways-home');const v={version:1,enabled:true,direction:'D1',gain:.18};assert.ok(validTwMusic(v));for(const x of [null,{...v,version:2},{...v,gain:NaN},{...v,gain:.41},{...v,direction:'C'},{...v,other:true}])assert.equal(validTwMusic(x),false);});
for(const d of ['D1','D2'] as const)test(d+' loop is deterministic, unclipped and seam is no louder than ordinary adjacent samples',()=>{const pcm=renderTwMusic(d,12000);assert.equal(pcm.length,TW_MUSIC[d].seconds*12000);assert.deepEqual(pcm,renderTwMusic(d,12000));let peak=0,mean=0,maxDelta=0;for(let i=0;i<pcm.length;i++){const v=pcm[i]!;assert.ok(Number.isFinite(v));peak=Math.max(peak,Math.abs(v));mean+=v;if(i)maxDelta=Math.max(maxDelta,Math.abs(v-pcm[i-1]!));}assert.ok(peak>.05&&peak<.6);assert.ok(Math.abs(mean/pcm.length)<.000001);assert.ok(Math.abs(pcm[0]!-pcm.at(-1)!)<=maxDelta);});
