import {launch} from '../src/game';import {sample} from './sample';
const game=launch(sample(),true),q=new URLSearchParams(location.search);
if(q.has('matched')){document.getElementById('pause')!.click();if(innerWidth<=700&&game){game.view.panelOpen=true;game.view.resize();}}
if(q.get('screen')==='build'){document.getElementById('catalog')!.click();if(q.has('matched'))document.getElementById('site-market')!.click();}if(q.get('screen')==='settings')document.getElementById('settings-open')!.click();
if(q.has('matched')&&game){game.view.panelOpen=innerWidth<=700;game.view.resize();}
// Read-only evidence accessor exists only in this separately built, save-disabled fixture.
Object.defineProperty(window,'__island',{value:game});
