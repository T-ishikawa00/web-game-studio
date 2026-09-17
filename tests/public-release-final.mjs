import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chooseLanguage,installLanguageNavigation,languageKey} from '../src/rc/public-language.js';
test('Root language uses explicit choice, primary browser language, and manual fallback',()=>{
 assert.equal(chooseLanguage('en',['ja-JP']),'en');assert.equal(chooseLanguage('ja',['en-US']),'ja');
 assert.equal(chooseLanguage(null,['ja-JP','en']),'ja');assert.equal(chooseLanguage(null,['en-US','ja']),'en');
 assert.equal(chooseLanguage('other',[]),null);assert.equal(chooseLanguage(null,['fr-FR']),'en');
 let redirect,handler;const saved=new Map();
 const win={location:{pathname:'/',replace:v=>redirect=v},navigator:{languages:['ja-JP']},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)}};
 const doc={addEventListener:(_,h)=>handler=h};installLanguageNavigation(win,doc);assert.equal(redirect,'/ja/');
 handler({target:{closest:()=>({getAttribute:()=> 'en'})}});assert.equal(saved.get(languageKey),'en');
 redirect=null;installLanguageNavigation(win,doc);assert.equal(redirect,'/en/');
 for(const path of ['/ja/','/en/','/ja/play/tiny-delivery/']){redirect=null;win.location.pathname=path;installLanguageNavigation(win,doc);assert.equal(redirect,null);}
 win.location.pathname='/';win.localStorage={getItem(){throw Error();},setItem(){throw Error();}};installLanguageNavigation(win,doc);assert.equal(redirect,'/ja/');
 assert.doesNotThrow(()=>handler({target:{closest:()=>({getAttribute:()=> 'en'})}}));
 redirect=null;win.navigator={};installLanguageNavigation(win,doc);assert.equal(redirect,null);
});
