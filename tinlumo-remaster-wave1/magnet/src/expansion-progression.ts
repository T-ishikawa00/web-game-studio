export const stages=[
 ['CUT THE FIRING LINE','射線を断つ','Dodge the rail warning · flank the shield','砲の予告線を避け、盾の横へ回る'],
 ['BREAK THE REPAIR LINK','修理網を崩す','Destroy the repair drone to expose its allies','支援機を壊すと味方の装甲が開く'],
 ['STOP THE ARMORED CARRIER','装甲運搬機を止める','Step off its route · strike the side vents','突進の進路を外れ、側面の冷却口を狙う'],
];
export const options:Record<string,string[]>={
 field:['WIDE FIELD','広域フィールド','While holding: gather from 100 farther away','押している間、吸引範囲+100。遠い破片へ届く'],
 brake:['RECOIL BRAKE','反動ブレーキ','Stay on your firing line after launch','射出の反動を抑え、狙った位置を保つ'],
 drive:['SALVAGE DRIVE','回収ドライブ','Enemy armor pickup gives 1.8s movement boost','敵装甲の回収後1.8秒、移動速度が上がる'],
 shock:['SHOCK RING','衝撃リング','Launch pushes nearby normal guards away','射出時、近くの通常敵を押し返す。ボス対象外'],
 swarm:['SWARM COIL','スウォームコイル','Wide collection · spreading volleys','広域吸引と扇状の一斉射出'],
 lance:['LANCE RAIL','ランスレール','Narrow fast shots · pierce a line of enemies','高速の細い射線。並んだ敵を貫く'],
 satellite:['SATELLITE GUARD','衛星ガード','Launch reserves 4 shields · hit pieces scatter briefly','射出時4片を盾に残す。被弾した片は一時離脱'],
 foundry:['FOUNDRY LANCE','収束ランス','Bundle up to 3 pieces per heavy shot · reclaim manually','最大3片を重い弾へ束ねる。外した弾は吸引で回収'],
 cyclone:['CYCLONE','サイクロン','Wide volley · launch opens nearby shields','広い一斉射出。近くの盾を射出時に開く'],
 return:['RETURN','リターン','Pierce 4 targets · shots return automatically','4体貫通。射出後の金属を自動回収'],
};

