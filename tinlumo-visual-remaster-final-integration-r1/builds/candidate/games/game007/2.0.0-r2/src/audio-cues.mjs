import {Sound} from './audio.mjs';
// Add finite punctuation to the accepted short SE rhythm. No music/audio asset.
export class CompleteSound extends Sound{
  constructor(){super();this.pending=new Set();}
  later(delay,type,chain){const id=setTimeout(()=>{this.pending.delete(id);super.play(type,chain);},delay);this.pending.add(id);}
  play(type,chain=1){if(type==='finale'){super.play('wave');this.later(90,'chain',8);}
    else if(type==='clear'){super.play('bank');this.later(90,'chain',8);this.later(210,'end',12);}
    else super.play(type,chain);
  }
  stop(){for(const id of this.pending||[])clearTimeout(id);this.pending?.clear();super.stop();}
}
