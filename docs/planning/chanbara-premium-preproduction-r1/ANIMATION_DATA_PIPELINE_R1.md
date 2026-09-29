# Animation and Data Pipeline R1

2026-09-29 JST · **ANIMATION_PIPELINE_READY / NO_GAME_IMPLEMENTATION**

[総合入口](CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md) / [候補](ASSET_SHORTLIST_R1.md) / [AI境界](LICENSE_AI_BOUNDARY_R1.md)

## 1. 担当を明確にする

PRIMARYは採用済みだが、以下は実行前の設計。素材取得・import・clip編集・scene作成は0。**Blenderでの造形/weight/pose/clip補修と実物比較の担当はHumanまたは権利条件を満たしたartist。担当者は未確定。** Codexは素材を入力せず、一般的なC#制御、data contract、検証手順を設計する。AIへassetを渡せることを工数短縮の前提にしない。

初回の道具は既存Blender4.4.3とUnity6.3、Unity Animation Rigging候補。Cascadeur、Rokoko、AI motion生成は初回の必須工程から外す。追加toolへの素材入力権利と導入を別に判断する。ActorCore/Mixamoの利用も、今回登録・取得を実施する意味ではない。

## 2. 確定するデータ経路案

| 工程 | 担当tool / 人 | 入力 → 出力 | 検収・責任 |
|---|---|---|---|
| Source管理 | Human / asset ledger | 正規取得した原本 → 編集用copy、license証跡 | 原本と編集版を区別。rawをpublic配布しない |
| Base locomotion | Human / Blender Action Editor・NLA | 許諾済みFBXのidle/walk/run/stop → 正規skeletonの個別Actions | 同じstance・歩幅・root規約へ揃える。Aの長肢へ再target |
| Anticipation/contact | Human animator / Blender Dope Sheet・Graph Editor | base attack → 予備動作、支持脚、腰回旋、接触pose | 接触frameに踏み込み・blade方向・体幹の因果が成立 |
| Follow-through/recovery | Human animator / Blender | 接触後 → 反対側の支持脚、姿勢回復、idle復帰 | clipを短く切るだけで回復を消さない。肩・腰・足の速度を整える |
| Export | Human / Blender FBX exporter | `.blend`正本＋Actions → mesh/rig FBX、animation FBX、PBR画像 | deformation bonesをbake。control rig、IKconstraintをruntimeへ運んだと誤認しない |
| Runtime retarget | Human / Unity Model Importer・Avatar | FBX → Humanoid Avatar / AnimationClips | valid Avatarだけでなく、極端な体格差の肩/股/手首を実物で確認 |
| Blend / root | Unity Animator、C#設計はCodex支援可 | clips＋状態 → 独立したroot移動とpose | root移動の所有者を1つにする。二重移動を禁止 |
| IK / foot planting | Human設定 / Animation Rigging Two Bone IK等 | clip pose＋地面/握りtarget → 接地・grip補正 | IKで元motionの悪い重心を隠さない。接地区間と解除を定義 |
| Directional reaction | Human key pose＋Unity Animator/additive layer | contactの方向/強弱 → 左右/斜めのstagger/recovery | まず方向別の良いpose。独立したworld directionを再現 |
| Limited physics | Unity標準Rigidbody/joint、少数secondary部位 | reaction目標＋制限impulse → 胸/腕などの遅れ | 全身を同時に力任せにしない。姿勢所有・復帰条件を明示 |
| Validation | Human / Unity上の最終camera＋側面 | 各motionの無音/無VFX版、最終feedback版 | side-by-sideと実聴。AI原素材解析なしで合否を記録 |

公式の[Humanoid/Generic importer](https://docs.unity3d.com/6000.3/Documentation/Manual/FBXImporter-Rig.html)と[Two Bone IK](https://docs.unity3d.com/Packages/com.unity.animation.rigging@1.4/manual/constraints/TwoBoneIKConstraint.html)を機能根拠とする。これらの機能の存在はAの動作品質を保証しない。

## 3. 共通データ契約

将来の初回import前にHumanが次の条件を記録する。今回実ファイルは開かない。

- DCCはmetric、runtimeは1unit=1mとして、2m級enemyと剣・手の相対寸法を実寸確認。FBXの軸・scale変換は同一presetを使い、import時の100倍/0.01倍を見た目で誤魔化さない。
- enemyは全身Humanoid、armsだけのrigはGenericを第一候補。armsだけのskeletonにHumanoid Avatar成立を要求しない。手指・twist・weapon socketは保持する。
- M1のprop bone／weapon socketをexport対象に含め、custom rigとの対応付け・刀の軌跡・gripをHumanが確認する。deformation bonesのbakeとHumanoid retargetだけで追加prop boneの移送まで完了扱いにしない。[M1公式仕様](https://syntystore.com/products/animation-sword-combat)
- DCCのroot、pelvis、deformation skeletonとruntime rootの役割を分ける。root motionはapproachとattackをclip由来のdeltaで駆動する案。無制限のTransform移動と物理velocityを同時に加えない。
- Blender内の異種skeleton間転送は、Humanがrest pose/骨対応を設定し、constraintによる転送とBake Actionを行う案。標準importだけで自動retargetされるとは見込まない。C1のMaya Advanced Skeleton操作rigがBlendへ同等移植済みという根拠はなく、FBX deformation skeletonを検収する。外部retarget addonは必須にせず、必要になればlicense/導入を別判断する。
- foot plant区間とcontact markerをclipごとにHumanが定義。frame番号だけで固定せず、clip sample rate・normalized timeを台帳へ残す。権利未確認の元curve/bone階層をAIへ送らない。
- `.blend`をUnityへ直接読ませて暗黙変換する運用より、Humanが明示exportしたFBXをruntime境界にする。control rig用の第三者addonがあればその導入とlicenseも別確認。
- PBR材質はmesh/animationと別検収。Blender shader nodeをUnityへそのまま持ち込めると扱わず、URP Lit向けにmaps・色空間・normal方向・smoothnessを確認する。
- compressionを先に強めない。肩/手指/足の品質を無圧縮基準で見た後に、差分を比較して設定する。重要frameを破壊する最適化は差戻し。

## 4. 初回enemy motion inventory

| Motion | 最小variant | 調達元だけでは埋まらない補修 |
|---|---|---|
| Idle / ready | 1 | Aの長肢、膝の緊張、小さな頭、持剣pose |
| Approach run / stop | 1＋1 | 歩幅、前傾、支持脚、attack距離への止まり方 |
| Attack | 1方向を最初に完成 | anticipation→contact→follow-through→recoveryの4phase |
| Block | 1 | 剣同士の接触位置、手首・肘の逃げ、足の支持 |
| Hit / stagger | 左・右・斜めの3方向、弱/強weight | 胸と骨盤の時間差、方向保持、足の踏替え |
| Recovery | 1〜2 | hit終了poseと次idleの接続、stance復旧 |
| Knockdown/death | 初回integratedでは必須にしない | 過大な吹飛び・全身ragdollは別validation。非流血、切断なし |

初回5–15秒の中へ全clipを詰め込まない。無音・無VFXの別検証でinventoryを確認し、統合動画は代表攻防1回を読めるようにする。base locomotion packとcombat packが同じ作者でも、Aへそのまま使えるとは判定しない。

## 5. 状態と姿勢の所有

```text
Ready → Approach → Anticipation → Contact window → Follow-through → Recovery → Ready
                     └─ 有効contactで DirectionalHit → Stagger → Recovery

Animated state: clipのroot/pose + ground/grip IK
DirectionalHit: authored hit/rootへ切替、contact側のgrip/foot weightを必要に応じ解除
Limited physics: 別のphysics poseから少数secondary boneの最終poseへblend
Recovery: physics weightを落とし、root/支持脚を合わせてAnimatorへ戻す
```

AnimatorとRigidbodyが同じrender boneを同時に直接書く方式を避ける。render poseの最終書込みを一系統に集約し、IKはstateごとの接地/握り条件と整合させる。物理側のjoint角・速度・impulseに上限を持たせ、editor pause/restart時は残留速度を破棄する設計。実値は現物で決める。constraintを増やして不安定さを隠すのではなく、基礎motionが不合格ならAnimation Gateへ戻る。

## 6. 一人称Sword/Arm

刀はmouse deltaから作る操作目標へ追従し、enemy用の固定attack clipを一人称へ貼り付けない。手元baseは握り・手首・前腕の変形をHumanが補修する。rigid swordはgrip socket、armsはIK/補助poseで追従。render用刀とhit判定刀に共通のworld poseを用い、frame前後の刃の移動と回転を連続的に扱う設計。

初回は最終camera1台・同じworld空間の配置を原則とする。別viewmodel FOVやoverlayでclippingを隠す案は、壁/敵との接触位置が一致する証拠なしに採用しない。武器が不自然に短い・手が画面を覆う場合は、まず握り、pivot、構え、camera framingを直す。scale誇張やFOV変更を記録なしで使わない。

## 7. 未解決と次回の停止条件

Base素材の選択、DCC担当、license、weapon attachment骨、腕のrig再利用、retarget品質、rootの移動量、IK weight、physics定数は未検証。誰が補修するか未確定なら調達の前で止める。元assetのAI解析許可がないことを理由に、自動解析を隠して品質確認することはしない。**ANIMATION_PIPELINE_READYは手順と責任分担が準備できた意味で、motion完成ではない。**

外部source閲覧2026-09-29。既存researchの技術分類は再利用し、既存gameのanimation/音/clipはimportしない。
