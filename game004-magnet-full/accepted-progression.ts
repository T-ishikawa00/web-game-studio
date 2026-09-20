export const stages=[
 ['BOOT THE CRANE','クレーンを再起動','Clear guards to auto-power · shoot relays early to open shields','敵がいなくなると自動送電 / 戦闘中の送電で盾を開く'],
 ['BYPASS THE GUARD','装甲を迂回','Flank shields · power both relays','盾の横を取り、2つの設備へ送電'],
 ['OPEN THE PRESS','プレスを開放','Bait the charge · reclaim the firing lane','突進を誘い、射出する場所をつくる'],
 ['ROUTE THE CURRENT','電流をつなぐ','Leave the marked floor lane · connect three relays','床の予告線を避け、3つの設備を接続'],
 ['BREAK THE OVERSEER','監督機を突破','Mixed guards · crossing current · final evolution next','混成敵と横切る電流。次は最終進化'],
 ['RECLAIM THE REACTOR','炉心を取り戻す','Power a lock · dodge · strike the open core','送電 → 反撃を回避 → 炉心を攻撃。3回で決着'],
];
export const options:Record<string,string[]>={
 recycler:['RETURN CIRCUIT','回収回路','Missed / spent shots return automatically','外れた弾・使用済み金属を自動回収'],
 rack:['SIDE RACK','拡張ラック','Carry 3 extra pieces on any chassis','どの機体でも保持数を3個追加'],
 guard:['RESERVE PLATE','予備装甲','One additional armor cell · fully repair','装甲上限+1、全回復'],
 swarm:['SWARM COIL','スウォームコイル','Wide pull · 24 pieces · spreading volleys','広域吸引・24個保持・扇状の一斉射出'],
 lance:['LANCE RAIL','ランスレール','12 pieces · fast narrow shot · pierce 3 targets','12個保持・高速の細い射線・3体貫通'],
 cyclone:['CYCLONE CROWN','サイクロンクラウン','30 pieces · launch pushes nearby guards open','30個保持・射出の衝撃波で近くの盾を開く'],
 return:['RETURN LANCE','リターンランス','Pierce 4 targets · automatically reclaim shots','4体貫通・射出後の金属を自動回収'],
};
