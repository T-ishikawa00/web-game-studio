# Chanbara Restart — Phase 0 Product Role R1

2026-09-28 · **PHASE_0_RESTART_PREPARED / HUMAN_PROCESS_GATE_PENDING**

作業名はChanbara Restart。Game番号・正式名・public slugは未確定。新方式の最初の適用例として、作品の役割と比較用Briefを準備した。Humanによる新方式・方向の採用、実Concept画像、Visual Bible、R2 gameplayはまだない。

## Core concept — 最新Human指定

**「一人称3D。マウスの実移動そのものが刀の動きになり、迫ってくるstylized stick fightersを自分の手で斬る。」**

クリックで既定の攻撃アニメーションを再生する作品へ置き換えない。敵が迫る、剣を大きく振れる、Hitが一目で分かる、敵が振り方向に大きく反応する、複数敵で画面が面白くなる、を検討対象にする。Parryはskill expression候補であり、必須主役と決めない。

## Portalへ加える役割（設計仮説）

| 軸 | Phase 0の仮説 | 未決／検証 |
|---|---|---|
| Product role | 自分の手の動きが画面の大きな結果になる、短時間の一人称アクションを追加する | Portalへの追加・番号・公開は未承認 |
| 既存作との差 | 盤面や小さな世界を外から操作する体験とは異なる、等身大の接近感・手元の武器・振り方向に一致した反応を中心にする | 既存作品のArtを読んで差分を作らない。完成画面での独自性は画像・Goldで判断 |
| Replayability | 同じ固定攻撃clipでなく、切る角度・順序・間合いの自分なりの工夫。失敗から短く戻り、同じ状況を違う振りで試す | Wave、score、combo、被弾方式は未採用。作業量を増やす進行システムで弱い核を隠さない |
| First 30 seconds | 0〜3秒:手元の剣と前方の接近対象が読める。3〜8秒:実移動で大小・方向の異なる振りを試す。8〜18秒:分かりやすい最初のhitと大きな方向反応。18〜30秒:2〜3体の距離・左右差が作る次の判断とpayoff | 仮の体験構成。実装・計測・楽しいというHuman判定はまだない。時間合わせの待機は作らない |
| Shorts potential | 一振りと敵の大きな反応の因果が無音でも読める。迫る複数体→大きな振り→進路が開く、が約15秒で成立する | 需要・scroll-stop・再生数・訪問率はUNKNOWN |
| Target session length | 1回45〜90秒、Retryを含め2〜5分を初期仮説とする | Human採用前の仮置き。R1の約14秒自動完走や30〜60秒指定は正本にしない |
| Input / camera | PCマウスを起点として検討。マウスの実移動が刀へ伝わり、武器と敵が常に読めるcameraを画像で比較 | 固定／微小追従、FOV、入力倍率、可動域、端末展開は新作feel specで決める。タッチ／高Hzは未検証 |

安全・readabilityの最低線として、色だけでhitや脅威を伝えない、強制head-bob・強いflashに依存しない、Pauseと入力解放を明瞭にする。これらを旧R1のcamera／timing／SEの継承理由にしない。

## R1の扱い

既存の chanbara-core-slice-r1（参照原本はPrivate保全・候補には非同梱） は削除・上書きせず、次の状態へ**最新判断の索引上で**分類する。R1本文・source・録画・QAは当時の証拠として残す。

```text
CHANBARA_R1_TECH_RESEARCH_ONLY
NOT_VISUAL_AUTHORITY
NOT_GAME_FEEL_AUTHORITY
NOT_PRODUCT_DIRECTION
```

| 再利用候補 | 区分／条件 |
|---|---|
| Pointer Lock研究、pause / resume、QA知見 | Aの機能知見。安全契約を確認し、過去実装を丸ごと採用しない |
| mouse → sword input、sweep collision、sword contact | B。新作の大振り・間合い・複数敵を旧閾値／1vs1へ固定しないか、再利用前に明示レビュー |
| 基本的なSE実装知見 | Aの発音制御・停止・gain管理のみ。竹／木の音色・音楽方針は継承しない |
| 道場、竹／木Material、配色、敵構成、1vs1中心テンポ、Art Direction | C。現在はimport NONE。Creative Authorityにしない |

過去の仕様に1体ずつ・Parry中心の指定があったことは保存する。最新の製品方向はその試験仮説を継続採用していない。

## 次工程への受渡し

[Visual Direction Brief R1](CHANBARA_VISUAL_DIRECTION_BRIEF_R1.md)の4案は、形・素材・空間・反応の異なる比較案。色違いの同じ道場案ではない。**文書案のみ。Humanが画像を見て選ぶまで、どれもAcceptedではない。**

次はHuman / ChatGPT側で4案を実Visual Conceptへ生成し、第一印象・近接／複数敵の読みやすさ・hit payoffを画像で選ぶ。画像が決まった後に、その画像から新規Visual Bibleとfeel specを作る。実装はその後の明示された範囲だけ。

## 未決と停止点

大振りと視界の両立、複数敵の重なり、奥行きのhit判定、方向反応の強さ、入力とcameraの独立、R1 mechanics知見の適否は未検証。Parry、移動、連戦構成、武器材質、音、score、session lengthは未採用。物理マウス操作感・Human聴感・実機・需要・公開品質はUNKNOWN / PENDING。

**NO_CHANBARA_R2_IMPLEMENTATION / HUMAN_PROCESS_GATE_PENDING**。Concept画面のコード制作、ゲーム実装、依存追加、既存ゲーム・Portal・Production・外部サービス・Git書込みは行わない。
