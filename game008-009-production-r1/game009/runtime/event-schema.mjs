export const fields=['schema','event_id','document_id','seq','game_id','release_version','language','input_mode','campaign','event_name','run_ordinal','stage','result_type','retry_kind'];
const events=['game_reach','game_ready','game_load_error','first_meaningful_input','trial_start','game_result','retry'];
const campaigns=['direct','hakorilo_pmg_en_01','hakorilo_x_c01_en_01','hakorilo_x_c02_en_01','rimbloom_direct_01'];
export function validEvent(p){
 if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).length!==fields.length||fields.some(f=>!Object.hasOwn(p,f)))return false;
 if(p.schema!==1||p.release_version!=='growth-r1'||!['tiny-delivery','rimbloom','coilhop','ember-glaze'].includes(p.game_id)||!['ja','en'].includes(p.language)||!events.includes(p.event_name)||!campaigns.includes(p.campaign))return false;
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(p.document_id)||!Number.isInteger(p.seq)||p.seq<1||p.seq>1000||p.event_id!==p.document_id+':'+p.seq)return false;
 if(!Number.isInteger(p.run_ordinal)||p.run_ordinal<0||p.run_ordinal>1000||!['none','pointer','touch','keyboard','departure'].includes(p.input_mode)||!['none','same','new'].includes(p.retry_kind)||!['none','stage_clear','failure','time_up','webgl_unavailable'].includes(p.result_type))return false;
 if(!(p.stage==='none'||p.game_id==='tiny-delivery'&&/^D(0[1-9]|1[0-8])$/.test(p.stage)))return false;
 if(p.game_id==='rimbloom'&&p.campaign!=='direct'&&p.campaign!=='rimbloom_direct_01'||p.game_id==='tiny-delivery'&&p.campaign==='rimbloom_direct_01')return false;
 if(['coilhop','ember-glaze'].includes(p.game_id)&&p.campaign!=='direct')return false;
 if(p.campaign.startsWith('hakorilo_')&&p.language!=='en')return false;
 if(['trial_start','game_result','retry'].includes(p.event_name)&&p.run_ordinal===0)return false;
 if(p.event_name==='game_result'&&!['stage_clear','failure','time_up'].includes(p.result_type))return false;
 if(p.event_name==='game_load_error'&&p.result_type!=='webgl_unavailable')return false;
 if(p.event_name==='retry'&&!['same','new'].includes(p.retry_kind))return false;
 return true;
}
