# RECOMMENDED PIPELINE R1

2026-09-28 JST · **PRIMARY_RECOMMENDATION_READY** · **HUMAN_PRODUCTION_STRATEGY_GATE_PENDING**

[総合入口](CHANBARA_PREMIUM_PRODUCTION_RESEARCH_R1.md) / [比較案](PRODUCTION_PIPELINE_OPTIONS_R1.md) / [費用・限界](COST_AND_RISK_MATRIX_R1.md)

## 1. PRIMARY RECOMMENDATION

**Steam向け小規模premiumを本命候補に置き、Unity 6＋高品質既存base＋Blenderでの独自化＋既成motionの手修正＋限定的なphysical reactionを検証する。**

Artは **Aを維持したstylized realistic**。黒く長い敵、白亜の断崖、朱の限定accent、鋼の長剣と手元へ集中する。heroのsilhouette/weight/接触演技にはHumanまたは将来承認する専門artistの作業を組み込み、Codexのzero-based mesh生成へ品質責任を丸投げしない。

Blenderは編集・export・検証の中核として残すが、全assetをゼロから自動制作する前提は外す。Mixamo/ActorCoreはbase motion候補、Cascadeur/Blenderは補修候補であり、全部を購入・導入する推奨ではない。ActorCore等のlicense確認が成立しない場合は別素材へ置換する。

| 判断軸 | 推薦理由 | 残る条件 |
|---|---|---|
| Visual | 良いtopology・素材を土台に、少数heroの比率/材質/構図をAへ集中できる | Aにそのまま一致するenemy SKUは未特定。独自化担当が必要 |
| Animation | humanoid retarget、手編集、IK、局所physicsで意図と接触を分担 | 踏み込み/接地/握り/recoveryは実物で合否確認 |
| Game Feel | C#で入力・sweep・hit状態を管理し、Editorでmotion/physicsを調整しやすい | マウス→刀の遅延とviewmodel/world接触一致は未試験 |
| Cost | Personal適格ならengine前払0。少数assetから進められる | artist/cleanup総額UNKNOWN。素材の$112例は完成費でない |
| Development speed | full game前に1体/1剣/1区画の輸送と品質を検証できる | Unity熟練度/週稼働UNKNOWN。移植0工数ではない |
| AI compatibility | C#/Editor script、検査、export設定、QA整理をコードで再現しやすい | stock素材のAI input禁止を守る。visual/motionのHuman判断は残る |
| Steam potential | native Windows、設定/保存/Controller/Steam連携への通常経路 | 販売価値、全編QA、Deck、権利、store準備は別Gate |

この推薦は「UnityがUEより常に高画質」という主張ではない。[Engine比較](ENGINE_DECISION_MATRIX_R1.md)のとおり、UE技能とtechnical artistの確保が明確ならUE案が逆転し得る。現在は技能・人員がUNKNOWNで、個人＋AIの反復可能性を重く評価した。

## 2. SECONDARY FALLBACK

**無料Webが必須、またはSteam向け制作範囲を選ばない場合は、Babylon.js＋Web配布許諾が明確なasset＋Blender＋authored animation中心のhybridへ限定する。**

Aの方向を保ち、1arena・少数敵・短いsession・軽い局所反応に集中する。CC0を環境に優先し、hero敵/腕/剣のWeb licenseは先に確定する。UIとrecordingのために作品を大きくするのではなく、最初の15秒を完成品質へ合わせる。

| 判断軸 | Fallbackの価値 | 代償 |
|---|---|---|
| Visual | 良いhero素材と光で高品質を狙える | Web memory/転送/影/VFX予算を厳しく管理 |
| Animation | clip＋IK＋小さい物理反応で重点motionを維持 | 全身active ragdollを同時に追わない |
| Game Feel | browserから即play、TSで入力検証しやすい | browser/device/Pointer Lockの差 |
| Cost | engine前払0、CC0環境 | Web許諾のhero素材と独自化はUNKNOWN |
| Speed | scene/physics/animation工具がThree単独よりまとまる | Three→Babylonの移植・回帰費用は残る |
| AI | textコードとasset検査に親和性 | 同じくcraftの専門判断は必要 |
| Steam | 将来の展開可能性を残せる | wrapper/SDK/Deckを追加検証。Steam版と同時完成を約束しない |

無予算のままNorth Star品質を保証できるfallbackは確認できていない。少額asset投資も人的craftも選ばない場合、再びprocedural造形を増やすより、制作開始を保留する方が合理的である。

## 3. 次工程に必要なHuman判断

今回これらを選択・実行していない。資料一式を読んだ上で、次の**一括戦略判断**へ進める。

1. 製品の主軸：Steam premium検証／Web-only継続。両方同時制作を初期条件にしない。
2. Goldまでの現金上限、週稼働、Humanが担えるBlender/animation/engine作業、専門craftを依頼できる範囲。
3. 次回許可する操作の具体範囲：engine導入、素材取得、登録、月額試験、購入、外注問い合わせはそれぞれ明示する。
4. 1体・1剣・1区画の将来検証batchと、下記Gateの停止条件。

販売決定、公開、実広告、Steam登録、費用発生、Production変更、Git操作への許可ではない。無回答を選択や承認にしない。

## 4. FUTURE VALIDATION GATES（今回は全て未実施）

各GateでA-NS-R1を主基準とし、競合は下記の特定属性だけ比較する。競合の血・切断・配色・世界観をimportしない。自動QAとHuman Acceptanceは別。部分検証を次Phaseの許可へ広げない。

| Gate | 提出物と比較 | 通過条件案 | 不合格なら止めること |
|---|---|---|---|
| 1 — Character quality | enemy1体、前側背面、neutral/走り/接触pose、同一light。Aの長肢/黒衣/朱、Half Swordの身体と接地の整合を比較 | mannequinの球状関節感、肩/腰/手足の破綻がなく、無演出でAの敵に見える。license/rig source確認 | 敵variation・stage量産 |
| 2 — First-person sword | 専用arms＋剣、通常cameraでidle/横/斜め/壁際。Aの刀/握り、BLOODFALLの接触位置の可読性 | grip/刃面/scale、viewmodelとworld接触の一致、clipping対策が成立 | 武器数追加・派手なtrailで隠すこと |
| 3 — Animation quality | 無音・VFXなしのIdle/Run/Attack/Block/Recovery。側面と最終camera、Aの脅威・Shadyの動作接続を比較 | 支持脚と腰が一致、踏み込みとcontactが読める、遷移で足滑り/pose popが目立たない | 物理/VFXを追加して基礎motionの不足を覆うこと |
| 4 — Hit reaction | 通常mouseの弱/強/左右/斜め/guard/空振り、30/60/120fps条件。Aの方向反応とHalf Swordの身体連動 | 同じcontactが判定/映像/音で一致、重心→足→四肢の連鎖、入力遅延のHuman納得 | 大量敵・full ragdollの拡張 |
| 5 — Environment | hero cliff1区画、昼光、近中遠、動く敵。Aの構図/岩面/影/空間 | primitiveの寄せ集めでなく、尺度と地質の階層がある。target機frame/転送budgetを満たす | world拡張・大量scatter |
| 6 — Integrated 15-second Gold Scene | first screenshot、開始3秒、15秒等速/連続/通常入力/実SE、16:9と9:16。A＋上記競合の属性を比較 | Visual/Motion/Sound/Input/Feedback全て自己レビューを通り、Humanがexact版をGold採用。楽しさはtest件数で代替しない | 「完成後に見た目を直す」前提でfull制作 |
| 7 — Full Gameplay | Gate6採用後の短いdemo→中後半→全編。Mortal Sinの再挑戦/選択、Shadyの上達を比較 | 反復が作業にならず、JA/EN・設定・保存・失敗・実機・初見・権利・Securityを検証。Human全編判断 | 発売日確約、公開、広告/販売の自動開始 |

数値の性能budgetとlatency合格値は、次回Humanが選ぶtarget機/Hz/配布方式で先に定義する。今回未計測の値を合格値や実績に捏造しない。hit pause 0/20/40ms等の候補は比較実験値で、採用値ではない。

## 5. 作業順と中止基準

将来許可されたbatch内で1→2→3→4→5→6を進める。局所的な修正ごとにHuman確認を乱立させず、自己検証・修正をまとめて提出する。ただし上位Art変更、費用・外部操作、次Phaseへの権限追加は別。最初のengine実験はruntimeで1資産のcamera/rig/texture/poseが成立する確認までで、主要visualの代用品をGoldに昇格させない。

同じ原因で2回の局所修正後も改善の証拠がない場合、試行数だけを増やさずcraft担当/素材/方法を見直す。2回という回数は本研究の提案であり既存Authorityを改定しない。全身の人形感が残るなら、triangleや敵数を増やす工程へ進まない。

**停止：PRIMARY_RECOMMENDATION_READY + NO_IMPLEMENTATION + HUMAN_PRODUCTION_STRATEGY_GATE_PENDING。**
