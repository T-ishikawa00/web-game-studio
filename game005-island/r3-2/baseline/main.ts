import {launch} from '../../r2/src/game';import {sample} from '../fixture/sample';
const game=launch(sample(),true),q=new URLSearchParams(location.search);
if(q.has('matched'))document.getElementById('pause')!.click();
if(q.get('screen')==='build')document.getElementById('catalog')!.click();if(q.get('screen')==='settings')document.getElementById('settings-open')!.click();
if(q.has('matched')&&game){game.view.panelOpen=innerWidth<=700;game.view.resize();}
Object.defineProperty(window,'__island',{value:game});
