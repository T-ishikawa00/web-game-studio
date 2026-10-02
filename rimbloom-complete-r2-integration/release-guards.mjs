import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
export function validateAssets(manifest,expectedRoot){
 assert.equal(path.resolve(manifest.root),path.resolve(expectedRoot),'Unexpected asset root');assert.equal(fs.realpathSync(manifest.root),path.resolve(manifest.root),'Linked asset root prohibited');
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{assert(!e.isSymbolicLink(),'Linked asset prohibited');return e.isDirectory()?walk(dir+'/'+e.name).map(f=>e.name+'/'+f):[e.name];});
 assert.deepEqual(walk(manifest.root).sort(),manifest.files.map(e=>e.file).sort(),'Unmanifested asset prohibited');for(const e of manifest.files)assert.equal(sha(fs.readFileSync(manifest.root+'/'+e.file)),e.sha256,e.file);
}
export function validateStaticConfig(config){
 assert.equal(config.name,'tinlumo-production');assert.equal(config.workers_dev,false);assert.equal(config.preview_urls,false);assert.equal(config.observability.enabled,false);assert.deepEqual(Object.keys(config.observability),['enabled']);
 assert.deepEqual(Object.keys(config).sort(),['$schema','name','compatibility_date','workers_dev','preview_urls','assets','observability'].sort(),'New bindings/config require independent review');assert.deepEqual(Object.keys(config.assets).sort(),['directory','html_handling','not_found_handling'].sort(),'New asset binding/config prohibited');assert.equal(config.assets.html_handling,'auto-trailing-slash');assert.equal(config.assets.not_found_handling,'404-page');
}
export function claimDeploymentAttempt(file,receipt){fs.writeFileSync(file,JSON.stringify(receipt),{flag:'wx'});}
// A backend may only be inherited from the verified current published basis.
// The two local path changes do not change bindings, flags, schedules or routing.
export function validateInheritedConfig(config,basis,expectedAssets,expectedMain){
 assert.equal(basis.name,'tinlumo-production');assert.equal(basis.workers_dev,false);assert.equal(basis.preview_urls,false);
 assert.deepEqual(basis.observability,{enabled:false});assert.equal(basis.assets.binding,'ASSETS');assert.equal(basis.assets.html_handling,'auto-trailing-slash');assert.equal(basis.assets.not_found_handling,'404-page');assert.deepEqual(basis.assets.run_worker_first,['/__growth/events']);
 assert.deepEqual(Object.keys(basis).sort(),['$schema','name','main','compatibility_date','workers_dev','preview_urls','assets','observability','vars','d1_databases','triggers'].sort(),'Unexpected inherited configuration');
 assert.deepEqual(Object.keys(basis.assets).sort(),['directory','binding','html_handling','not_found_handling','run_worker_first'].sort());
 assert.deepEqual(basis.d1_databases,[{binding:'GROWTH_DB',database_name:'tinlumo-growth-r1-prod',database_id:'585eba67-ed8e-40a2-9166-a8c06fcc694f'}]);assert.deepEqual(Object.keys(basis.triggers),['crons']);assert.equal(basis.triggers.crons.length,1);assert(/^(?:[0-9]|[1-5][0-9]) \* \* \* \*$/.test(basis.triggers.crons[0]),'Only the single verified inherited hourly Cron is allowed');assert.equal(basis.vars.GROWTH_MODE,'production');assert(['true','false'].includes(basis.vars.GROWTH_ENABLED));assert.deepEqual(Object.keys(basis.vars).sort(),['GROWTH_ENABLED','GROWTH_MODE']);
 const expected=structuredClone(basis);expected.main=expectedMain;expected.assets.directory=expectedAssets;assert.deepEqual(config,expected,'Published Worker configuration must be inherited exactly');
}
