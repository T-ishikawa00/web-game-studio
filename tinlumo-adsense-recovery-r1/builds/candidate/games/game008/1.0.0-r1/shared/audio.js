// Original event synthesizer. No samples, music, network or autoplay.
export function createSynth(getSettings) {
  let context, bus, destination;
  const voices=new Set();
  async function unlock(){
    try {
      if(!context){context=new (window.AudioContext||window.webkitAudioContext)();bus=context.createGain();bus.gain.value=.42;bus.connect(context.destination);destination=context.createMediaStreamDestination();bus.connect(destination);}
      if(context.state==='suspended') await context.resume();
    }catch{}
  }
  function tone(notes,{type='sine',duration=.22,volume=.18,slide=1,spacing=.045}={}) {
    if(!context||context.state!=='running'||!getSettings().sound) return;
    const t=context.currentTime;
    notes.slice(0,6).forEach((freq,i)=>{
      if(voices.size>=16)return;
      const o=context.createOscillator(),g=context.createGain();o.type=type;
      o.frequency.setValueAtTime(freq,t+i*spacing);o.frequency.exponentialRampToValueAtTime(Math.max(40,freq*slide),t+i*spacing+duration);
      g.gain.setValueAtTime(0,t+i*spacing);g.gain.linearRampToValueAtTime(volume,t+i*spacing+.006);g.gain.exponentialRampToValueAtTime(.0001,t+i*spacing+duration);
      o.connect(g);g.connect(bus);voices.add(o);o.onended=()=>{voices.delete(o);o.disconnect();g.disconnect();};o.start(t+i*spacing);o.stop(t+i*spacing+duration+.02);
    });
  }
  function stop(){for(const v of voices){try{v.stop();}catch{}}voices.clear();}
  return {unlock,tone,stop,stream:()=>destination?.stream};
}
