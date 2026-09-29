# Minimal Scene and Validation Gates R1

2026-09-29 JST · **VALIDATION_GATES_READY / NO_GAME_IMPLEMENTATION**

[総合入口](CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md) / [Animation経路](ANIMATION_DATA_PIPELINE_R1.md)

## 1. 今回設計する最小scene

**Enemy×1、First-person Sword/Arm×1、Environment slice×1。** 既存Chanbara全体をUnityへ移植しない。下記hierarchyは設計図で、Unity project・scene・prefab・C# gameplayは作成していない。

```text
ChanbaraPreproductionValidation
 ├─ ValidationDirector        再生/停止/再初期化と証拠条件
 ├─ WorldCamera              Aに対応する最終一人称framing
 ├─ PlayerView
 │   ├─ Arms                 Generic rig / grip補助pose
 │   └─ Sword                鋼の直剣 / grip socket / world接触位置
 ├─ Enemy01
 │   ├─ RenderRig            Humanoid + authored motion + rig constraints
 │   ├─ ReactionRig          方向反応と限定physicsの比較用pose
 │   └─ ContactVolumes       最小の剣/体/地面判定
 ├─ EnvironmentSlice
 │   ├─ Ground               足と接地影が読める乾いた岩盤
 │   ├─ HeroCliff            左の大面と右の高い一枚岩
 │   └─ DistantMasses        遠景の尺度/地平、少数のmesh
 ├─ Lighting                 太陽1 / ambient / reflection probe
 ├─ Feedback                 小さい白火花 / 砂塵 / 短いtrail
 └─ ValidationOverlay        再生状態等、capture本体では隠せる
```

最初はURP Lit、単一の高い太陽、hardな接地影、固定露出、控えめな空気遠近を基準とする。HDRP/ray tracing、広大なTerrain、cloth simulation、GPU VFX pack、sky有料素材を必須にしない。PBR原本をUnityの材質へ合わせる作業はHuman担当。追加gameplay UI、score、連戦、progression、save、Portal、広告、network、Steam SDKはこのsceneへ含めない。

環境寸法・camera FOVはAに合わせて将来測る。説明用に敵約2m、戦闘面数m〜十数mを初期探索域とするが、確定仕様ではない。Cameraと剣のscaleを変えて比較を有利に見せない。Aで示されない背面造形や微細textureは人が補完する必要がある。

## 2. 5〜15秒のintegrated visual test

初回の設計目安は約10〜12秒。成果物は**Visual/Motion test**と明記し、まだfull gameplayとは呼ばない。

| 時間の目安 | 画面で確かめる内容 |
|---|---|
| 0–2秒 | Aに近い第一画面。鋼の剣、長肢enemy、白亜の大面、接地影が即座に読める |
| 2–4秒 | enemyの数歩の接近と停止。足・腰・体の重さ、画面上の尺度 |
| 4–6秒 | anticipationとcontact。剣/握り/支持脚、接触位置 |
| 6–9秒 | 接触方向に対応した胸・腰のstagger、遅れる四肢、足の踏替え |
| 9–12秒 | 姿勢回復と静止。残留振動・足滑り・pose popが残らない |

比較は(1)無音/無VFX、(2)限定VFX、(3)権利確認済みSEありの順。SE取得は今回scope外で、無音しか検証できなければSoundをNOT TESTEDとしてGold合格にしない。自動再生/timelineと通常mouse入力を別証拠にする。入力なしの演出試験で「マウス剣戟成立」と判定しない。

Visual testの後、Gate6 Goldを名乗るには、同じsceneで実mouseの連続入力と実際のcontactによる反応を示す必要がある。将来の実装許可がその入力試験を含まない場合は**INTEGRATED VISUAL TEST ONLY / GOLD PENDING**で止める。今回どちらも未実施。

## 3. Aとのside-by-side共通ルール

基準は[Human採用記録](../../games/chanbara-restart/CHANBARA_A_ACCEPTANCE_R1.md)の **A-NS-R1**。原画像を変更・再生成しない。既存R2不採用画面を合格基準へ下げない。

1. 左にA原画像（または比較対象を明示したcrop）、右に候補のUnity最終cameraを同じ表示幅で並べる。A全体を含む比較を最低1枚残し、cropだけで構図不足を隠さない。
2. 各Visual Gateは「silhouette／proportion／material／light／composition／readability」の差分を記録。素材のseller renderを候補のruntime画面として使わない。
3. 候補のneutral viewと最終lightの両方を見る。強いBloom、暗転、motion blur、火花で破綻を隠さない。asset導入・polygon数・test件数は合格理由にならない。
4. Aは静止画なので時間設計・入力感・実聴の正解を示していない。静止poseのA比較と、連続motionの身体的妥当性・操作感を別に評価する。
5. asset/派生renderをAIへ見せる許可がない限り、比較実施者はHuman/artist。CodexはHumanの合否・差分所見を記録し、見ていない候補を視覚PASSとしない。
6. 自己検収はREADY FOR HUMAN、最終はHumanのexact版 **Accepted / Changes requested / Hold / Reject**。画像の一致率や「90%再現」等の擬似数値は使わない。

## 4. Gate定義

全Gateの現在statusは **NOT EXECUTED**。候補取得・費用・AI入力等の権限はGateの定義から発生しない。

| Gate | 証拠 / Aとの比較 | 技術・Craftの通過条件 | 不合格時 |
|---|---|---|---|
| 0 — Rights / tool readiness | exact SKU、license、担当、Editor/package版 | 取得範囲が承認され、商用/改変/Steam/seat/AI分離が解決。起動・輸送も別確認 | 未解決素材は取得しない。Gold制作を開始しない |
| 1 — Character | Aのenemy領域とruntimeをside-by-side。前側背、neutral/構え/踏込pose | 黒い長肢・小さい頭・限定朱・足と手が成立。mannequin球関節感、肩/股の崩れなし。rig/weightは3poseで検収 | 色替えだけでAに見えないならbase/担当/造形を再選択。enemy追加禁止 |
| 2 — Sword/Arm | Aの剣と右下手元、runtimeの正面/斜め/横。握り・壁際も | 直線的鋼、刃の薄さと反射の移動、暗い柄、小さな朱、手指のgrip。clipping/手首破綻/接触位置不一致なし | FOVや発光trailで隠さない。武器追加禁止 |
| 3 — Animation | Aの脅威/poseと比較＋最終camera/側面の無音・無VFX連続motion | 支持脚→腰→肩の因果。anticipation/contact/follow-through/recovery、footplant、grip、遷移が成立 | IK/physics/VFXで基礎動作を覆わない。元clip/retargetへ戻る |
| 4 — Hit Reaction | Aの方向性を参照。左/右/斜め、弱/強、block/空振りを比較 | 接触点と方向が判定・身体・VFX/音で一致。足と重心が追従。kinematic/physicsの二重駆動、過大吹飛び、復帰popなし | 物理自由度を減らし、pose/支持脚を修正。full ragdoll化で解決扱いしない |
| 5 — Environment | A全体の大面/左壁/右一枚岩/地平とside-by-side。近中遠 | 白亜の尺度・地質の階層・hardな日光・接地影・少量朱。石を大量配置したtech demoに見えない | 小物scatterを増やさず、hero面・輪郭・構図から直す |
| 6 — Integrated Gold Scene | A全体＋第一画面＋開始3秒＋5–15秒連続、16:9/9:16比較。通常入力・実SEの証拠 | 1–5が揃い、見た目/動き/操作/反応/音が同じ体験になる。Humanがexact版をGoldとして明示採用 | 見た目だけならVisual test止まり。音/入力が未検証ならGold PENDING |
| 7 — Gameplay | Gate6採用後、別承認の小さな遊びbatch。AのVisual維持を毎回比較 | 上達・間合い・再挑戦意欲をHuman通常playで評価。失敗/停止/設定など必要QA | Full gameplay、全体移植、content量産、Steam登録、公開へ自動進行しない |

Gate1–5の局所修正は将来承認された同一batch内でまとめて自己検収できるが、費用/原素材入力/Full Productionの権限は拡張しない。部分合格だけでGate6を飛ばさない。

## 5. 検証条件と性能の扱い

最初の測定機は現在のWindows/RTX4060Tiとし、1920×1080で60fpsを**設計目標**に置く。実測PASSではない。EditorとWindows standaloneを分け、30/60/120fpsの入力・hit安定性も将来の対象とする。target consumer最小spec、Steam Deck、controller、mobile/Webは今回NOT TESTED。初回sceneで高fpsでも製品全体の性能を保証しない。

各runにEditor/package/asset版、camera、resolution、入力方法、音有無、recording有無、known gapsを記録。装飾を足す前に1つずつ原因を特定する。処理負荷の問題と造形・motionの問題を混同しない。

## 6. Exact stop

今回完成させるのは設計・素材候補・権利境界・Gate資料。**NO_GAME_IMPLEMENTATION / HUMAN_PREPRODUCTION_GATE_PENDING**。Humanが次回許可した場合も、既存Chanbara全体の移植、Full gameplay、購入・download、engine更新、Git、公開をひとまとめに自動実行しない。
