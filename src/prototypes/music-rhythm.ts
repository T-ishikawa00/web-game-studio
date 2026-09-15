import {musicScore} from './music-score';
export function rhythmScore(condition:'A'|'B'|'C'){
 const score=musicScore('D1');if(condition==='A')return score;
 for(const n of score.notes){const bar=Math.floor(n.beat/4),local=n.beat%4,phrase=bar%8;
  // Move existing dry brush into the long empty back half of odd bars.
  if([1,3,5].includes(phrase)&&n.instrument==='brush'&&local===1)n.beat+=1.5;
  // Redistribute two existing closing notes into the formerly empty eighth bar.
  if(phrase===6&&n.instrument==='pulse'&&local===2.5)n.beat=bar*4+4;
  if(phrase===6&&n.instrument==='pluck'&&local===2.75)n.beat=bar*4+6;
 }
 if(condition==='C'){score.bpm=82.4;score.seconds=score.bars*4*60/score.bpm;}
 return score;
}
