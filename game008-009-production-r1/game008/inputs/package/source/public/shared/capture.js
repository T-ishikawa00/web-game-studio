// Local marketing/QA capture only; this panel is absent in ordinary play.
export function attachCapture(canvas,synth){
  if(!['127.0.0.1','localhost'].includes(location.hostname)||new URLSearchParams(location.search).get('capture')!=='1')return;
  const panel=document.createElement('div');panel.className='capture-tools';
  panel.innerHTML='<button type="button">Record gameplay</button><button type="button" disabled>Stop recording</button><span role="status"></span>';
  document.body.append(panel);
  const [start,stop]=panel.querySelectorAll('button'),status=panel.querySelector('span');let recorder,chunks=[],tracks=[];
  start.onclick=async()=>{
    await synth.unlock();
    const stream=canvas.captureStream(30),audio=synth.stream();
    if(audio)for(const track of audio.getAudioTracks())stream.addTrack(track.clone());
    tracks=stream.getTracks();chunks=[];
    const mime=MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')?'video/webm;codecs=vp9,opus':'video/webm';
    recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:3500000});
    recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onstop=()=>{tracks.forEach(t=>t.stop());const blob=new Blob(chunks,{type:mime}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${document.documentElement.dataset.game||'game008'}-${Date.now()}.webm`;a.textContent='Download recording';panel.append(a);status.textContent='Recording ready';
      if(location.hostname==='127.0.0.1'){
        const save=document.createElement('button');save.type='button';save.textContent='Save recording locally';panel.append(save);
        save.onclick=async()=>{save.disabled=true;try{const response=await fetch('/__local_capture',{method:'POST',headers:{'Content-Type':'video/webm','X-Game008-Capture':'1'},body:blob});if(!response.ok)throw new Error('Local export unavailable');const result=await response.json();status.textContent=`Saved ${result.filename} (${result.bytes} bytes)`;}catch{status.textContent='Local save failed; download remains available';save.disabled=false;}};
      }
    };
    recorder.start(1000);start.disabled=true;stop.disabled=false;status.textContent='Recording real gameplay';
  };
  stop.onclick=()=>{recorder.stop();stop.disabled=true;start.disabled=false;};
}
