export interface ArrivalClock {schedule:(fn:()=>void,delay:number)=>unknown;cancel:(handle:unknown)=>void}
const browserClock:ArrivalClock={schedule:(fn,delay)=>globalThis.setTimeout(fn,delay),cancel:handle=>globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>)};

/** Result visibility is presentation state, separate from the canonical win and an explicit "Enjoy the view" choice. */
export class ArrivalPresentation {
 private timer:unknown;
 private epoch=0;
 private phase:'pending'|'visible'|'dismissed'='visible';
 constructor(private readonly changed:()=>void,private readonly clock:ArrivalClock=browserClock){}
 private stop(){this.epoch++;if(this.timer!==undefined)this.clock.cancel(this.timer);this.timer=undefined;}
 start(delay:number){this.stop();this.phase='pending';const epoch=this.epoch;this.timer=this.clock.schedule(()=>{if(epoch!==this.epoch)return;this.timer=undefined;this.phase='visible';this.changed();},delay);}
 cancelPending(){if(this.phase!=='pending')return false;this.stop();this.phase='visible';return true;}
 dismiss(){this.stop();this.phase='dismissed';}
 reset(){this.stop();this.phase='visible';}
 get visible(){return this.phase==='visible';}
}
