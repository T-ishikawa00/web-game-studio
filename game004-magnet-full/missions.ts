export type MissionId='A'|'B'|'C';
export type SpawnKind='basic'|'heavy'|'shield'|'charger'|'gunner'|'support'|'carrier'|'controller';
export type Spawn=readonly [SpawnKind,number,number];
export type Encounter={id:string;title:[string,string];hint:[string,string];enemies:Spawn[];reinforcements?:Spawn[];relay:[number,number];quota:number;lane?:'x'|'y'|'alternate'};
export const modules=['field','brake','drive','shock'];
const e=(id:string,en:string,ja:string,h:string,j:string,enemies:Spawn[],reinforcements:Spawn[]=[],lane?:Encounter['lane']):Encounter=>({id,title:[en,ja],hint:[h,j],enemies,reinforcements,relay:id.endsWith('2')||id.endsWith('4')?[.25,.7]:[.74,.7],quota:enemies.some(x=>x[0]==='carrier'||x[0]==='controller')?0:Math.min(18,(enemies.length+reinforcements.length)*3),lane});
export const missions:Record<'B'|'C',Encounter[]>={
 B:[
 e('b1','CUT THE FIRING LINE','射線を断つ','Dodge the rail warning · flank the shield','砲の予告線を避け、盾の横へ回る',[['shield',.53,.40],['gunner',.76,.32],['basic',.28,.28]],[['gunner',.22,.62],['charger',.75,.25]]),
 e('b2','BREAK THE REPAIR LINK','修理網を崩す','Destroy support to expose its allies','支援機を壊すと仲間の盾が開く',[['support',.7,.3],['shield',.48,.45],['charger',.25,.32],['gunner',.77,.64]],[['support',.24,.3],['charger',.72,.72]]),
 e('b3','CROSS THE RAILS','交差射線を抜ける','Silence one rail · move into the cleared side','片側の砲を止め、空いた側へ移る',[['gunner',.25,.28],['gunner',.76,.64],['shield',.55,.4]],[['basic',.35,.66],['charger',.77,.3]]),
 e('b4','OPEN THE TRANSFER','搬送路を開く','Bait the charge off the marked transfer lane','床の予告帯から突進を誘い出す',[['charger',.25,.3],['support',.74,.35],['shield',.55,.64]],[['charger',.75,.7]],'x'),
 e('b5','SPLIT THE NETWORK','支援網を分断','Choose a side · break its support first','左右どちらかの支援を崩し、射線を確保',[['support',.22,.32],['shield',.34,.47],['support',.77,.6],['gunner',.73,.3]],[['charger',.5,.72]]),
 e('b6','STOP THE CARRIER','装甲運搬機を止める','Step off its route · strike the side vents','突進の進路を外れ、側面の冷却口を狙う',[['carrier',.53,.3],['shield',.66,.44],['gunner',.78,.57]])
 ],
 C:[
 e('c1','READ THE PULSE','磁場の間を読む','Gather between pulses · step off the warning','電流の合間に回収し、予告帯から移動',[['basic',.25,.35],['gunner',.73,.3],['basic',.62,.66]],[], 'y'),
 e('c2','CARRY THE OPENING','隙へ持ち込む','Keep metal while moving around the shields','金属を保持して盾の横へ回り込む',[['shield',.3,.32],['charger',.76,.32],['shield',.65,.62]],[['basic',.25,.68]]),
 e('c3','BREAK THEN COMMIT','支援を断ち、一斉射出','Support falls · use the brief exposed window','支援機を壊し、短い盾開放中に撃つ',[['support',.52,.3],['shield',.27,.5],['shield',.76,.5],['gunner',.75,.7]]),
 e('c4','CHANGE SAFE SIDES','安全側を渡る','Watch the next floor line before firing','次の床予告を見てから射出する',[['gunner',.24,.3],['charger',.72,.62],['basic',.7,.3]],[['charger',.28,.7]],'alternate'),
 e('c5','CHOOSE YOUR WINDOW','最後の射出位置','Make a firing line · save metal for the opening','射線を作り、開いた瞬間へ金属を残す',[['support',.76,.3],['shield',.55,.45],['gunner',.24,.33],['charger',.75,.65]],[['basic',.3,.66]],'x'),
 e('c6','SHUT DOWN THE MAGNET CORE','磁場中枢を止める','Leave the pulse ring · fire into the open coils','予告円から離れ、開いたコイルへ射出',[['controller',.52,.42],['gunner',.23,.28],['shield',.77,.6]])
 ]
};
