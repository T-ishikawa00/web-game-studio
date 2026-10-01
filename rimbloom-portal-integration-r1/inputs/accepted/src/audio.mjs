// Original, local Web Audio synthesis. Every cue is finite; there is no music bus.
const MASTER_GAIN = .22;
const MAX_VOICES = 10;
const aliases = {launch:'dash',bounce:'bank',damage:'hurt',result:'end',enemy:'hit'};
const layer = (from,to,length,wave='sine',gain=.22,delay=0) => ({from,to,length,wave,gain,delay});

function recipe(type,chain){
  const count = Number.isFinite(chain) ? Math.max(1,Math.min(12,Math.floor(chain))) : 1;
  switch(type){
    // Keep the accepted prototype's launch, rim and enemy-break timing/pitch.
    case 'dash': return {priority:1,layers:[layer(240,80,.11,'sawtooth')]};
    case 'bank': return {priority:2,layers:[layer(740,1100,.15)]};
    case 'shield': return {priority:2,layers:[layer(135,78,.10,'triangle')]};
    case 'armor': return {priority:3,layers:[
      layer(320,120,.09,'triangle',.24),
      layer(1280,660,.065,'square',.075,.005)
    ]};
    case 'chain': {
      // Higher milestones rise in pitch and finish sooner, without a tempo hold.
      const [from,to,length,accent,delay,gain] = count >= 12
        ? [1397,2093,.082,1865,.010,.24]
        : count >= 8 ? [1174,1760,.092,1568,.015,.23]
        : count >= 5 ? [1046,1568,.105,1397,.020,.21]
        : [880,1320,.115,1174,.026,.19];
      return {priority:3,layers:[
        layer(from,to,length,'sine',gain),
        layer(accent,accent*1.5,length*.78,'sine',.07,delay)
      ]};
    }
    case 'hurt': return {priority:4,layers:[layer(100,42,.21,'sine',.4)]};
    case 'wave': return {priority:2,layers:[layer(380,650,.26,'sine',.15)]};
    case 'end': return {priority:4,layers:[layer(440,880,.4,'triangle')]};
    default: return {priority:1,layers:[layer(420+count*95,150,.12,'triangle')]};
  }
}

export class Sound {
  constructor(){
    this.ctx=null;
    this.master=null;
    this.capture=null;
    this.muted=false;
    this.voices=new Set();
    this.voiceData=new Map();
  }

  async unlock(){
    try {
      if(!this.ctx){
        const C=globalThis.AudioContext||globalThis.webkitAudioContext;
        if(!C)return;
        const ctx=new C();
        try {
          const master=ctx.createGain();
          master.gain.value=this.muted?0:MASTER_GAIN;
          const ceiling=ctx.createWaveShaper();
          const curve=new Float32Array(513);
          for(let i=0;i<curve.length;i++){
            const x=i*2/(curve.length-1)-1;
            curve[i]=Math.tanh(x*1.15)/1.15;
          }
          ceiling.curve=curve;
          ceiling.oversample='none';
          master.connect(ceiling);
          ceiling.connect(ctx.destination);
          const capture=typeof ctx.createMediaStreamDestination==='function'
            ? ctx.createMediaStreamDestination() : null;
          if(capture)ceiling.connect(capture);
          this.ctx=ctx;
          this.master=master;
          this.capture=capture;
          this.ceiling=ceiling;
        }catch(error){
          try{await ctx.close()}catch{}
          throw error;
        }
      }
      if(this.ctx.state==='suspended')await this.ctx.resume();
    }catch{
      // Gameplay remains available when browser audio permission/device fails.
    }
  }

  play(type,chain=1){
    if(!this.ctx||!this.master||this.muted||this.ctx.state!=='running')return;
    const cue=recipe(aliases[type]||type,chain);
    for(const part of cue.layers){
      if(!this.reserve(cue.priority))continue;
      const t=this.ctx.currentTime+part.delay;
      const source=this.ctx.createOscillator();
      const gain=this.ctx.createGain();
      const top=Math.min(8000,this.ctx.sampleRate*.4);
      source.type=part.wave;
      source.frequency.setValueAtTime(Math.min(top,part.from),t);
      source.frequency.exponentialRampToValueAtTime(Math.min(top,part.to),t+part.length);
      gain.gain.setValueAtTime(0,t);
      gain.gain.linearRampToValueAtTime(part.gain,t+.008);
      gain.gain.exponentialRampToValueAtTime(.001,t+part.length);
      source.connect(gain);
      gain.connect(this.master);
      this.voices.add(source);
      this.voiceData.set(source,{gain,priority:cue.priority});
      source.onended=()=>this.release(source);
      source.start(t);
      source.stop(t+part.length+.02);
    }
  }

  reserve(priority){
    if(this.voices.size<MAX_VOICES)return true;
    let candidate=null;
    let lowest=Infinity;
    for(const source of this.voices){
      const value=this.voiceData.get(source)?.priority??0;
      if(value<=priority&&value<lowest){candidate=source;lowest=value}
    }
    if(!candidate)return false;
    this.release(candidate,true);
    return true;
  }

  release(source,stop=false){
    const info=this.voiceData.get(source);
    if(!info)return;
    source.onended=null;
    if(stop){
      try {
        info.gain.gain.cancelScheduledValues(this.ctx.currentTime);
        info.gain.gain.setValueAtTime(0,this.ctx.currentTime);
        source.stop(this.ctx.currentTime);
      }catch{}
    }
    try{source.disconnect();info.gain.disconnect()}catch{}
    this.voices.delete(source);
    this.voiceData.delete(source);
  }

  stop(){
    for(const source of [...this.voices])this.release(source,true);
  }

  mute(value){
    this.muted=Boolean(value);
    this.stop();
    if(this.master){
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setValueAtTime(this.muted?0:MASTER_GAIN,this.ctx.currentTime);
    }
  }
}
