# CHANBARA — ZERO-COST PREMIUM 3D PIPELINE R1

2026-09-29 JST · **Human Review用無料Shortlist / USD 0 / JPY 0**

**無料の商用制作基盤と素材候補は整理できた。ただし、North Star A級の完成品質に届く工程能力はまだ証明できない。特にCharacter造形、hero sword/hand、巨大板状cliff、専用Animationがボトルネックであり、ここで停止する。**

## 最新Human判断と適用範囲

- PREMIUM 3D PRODUCTION RESEARCH R1はHuman Accepted。Unity6＋高品質base＋Blender customization＋animation重点補修＋limited/directional physicsというPRIMARYの考え方を維持する。
- 最新の予算指定は**第三者Asset・Toolへの支払い USD 0 / JPY 0**。旧Preproductionの有料候補は全て今回のProduction Candidateから除外。**購入Gateは廃止**し、有料fallbackを提示しない。
- 今回は無料候補と公式権利条件、工程の不足を調査するだけ。download、install、generation、account操作、game実装、全体Unity移植、Full gameplay、Steam登録、stage/commit/push/deploy/public releaseは行わない。
- Creative Authorityは[Human Accepted North Star A](../../games/chanbara-restart/CHANBARA_A_ACCEPTANCE_R1.md)と[A Visual Bible](../../games/chanbara-restart/CHANBARA_A_VISUAL_BIBLE_R1.md)。旧R2 Visual不採用とasset pipeline NOT READYを維持。無料であることを品質合格理由にしない。

## 無料候補の結論

全てHuman Review用。下表の候補は公開仕様から編集経路を持つbaseであり、原素材/previewのAI解析や実物比較はしていない。完成assetの採用やVisual PASSを意味しない。

| 対象 | 無料経路・exact候補 | 現時点の判断 |
|---|---|---|
| Character | **MPFB + MakeHuman core（C01）**、**Blender Human Base Meshes v1.4.1（C02）** | CC0人体基盤。Aの黒い長肢・無顔の完成敵は未確保。造形/weight担当が必要 |
| First-person arms | **Game Ready FPS Arms / zahers（F01）**。CC0を選ぶならC01/C02から人手制作 | 無料・商用組込可、F01はNoAI。指grip、手首、黒い手甲のhero品質は未検証 |
| Sword | **Realistic Medieval Long Sword lowpoly / Nezerim（S01）** | 無料NoAIの編集可能base。薄い刃、動く鋼反射、小さな朱の鍔を仕上げる必要 |
| Rock / Cliff | **既製geometry候補なし**。BlenderでHuman造形＋T01/T02の材質経路 | Aの巨大な板状面を満たす無料既製meshは未確認。geometry工程がボトルネック |
| Texture / Material | **Rock026（T01） / Marble Cliff05（T02） / Rocks Ground05（T03）** | CC0の有力候補。材質と完成断崖meshを混同しない |
| HDRI / Lighting | **Kloofendal 48d Partly Cloudy PureSky（H01）**、**Unity標準sky＋sun（L01）** | CC0 HDRIと追加asset代0の照明。Aの硬い日差しはHuman調整が必要 |
| Animation | **Quaternius Universal Animation Library [Standard]（A01）**＋Blenderで専用補修 | 無料CC0の具体的base pack。Mixamo（A02）はexact clip未確定の補助調査先としてHOLD |
| Rig | **Blender Rigify（G01） / MPFB GameEngine rig（G02）** | 無料。自動rigと完成したskin weight/footplant/握りを同一視しない |
| VFX | **Kenney Particle Pack（V01） / Unity Particle SystemでHuman制作（V02）** | CC0補助texture＋0円の制作機能。Aの接触を隠さない短いspark/dustが用途 |
| AI 3D | **Production Candidateなし**。Meshy6 Lite Free（E01）は権利条件付き探索記録のみ | 無料商用export条件は確認。ただしA品質/手指/retopo工数未証明、provider入力利用条件あり |

具体的な商品URL、現行無料条件、商用/Steam/改変/再配布/credit/AI/Blender/Unityは[候補別Shortlist](ZERO_COST_ASSET_SHORTLIST_R1.md)。有料商品と、有料版にしかないnative source/clip/exportを混ぜない。

## 成立見込みと停止理由

**材質・照明・rig機能・基本animation素材は0円で選択できる。最大の不足は、素材をAへ変える制作能力。** 人体を黒く塗る、剣を置く、scanへtextureを貼るだけではAに届く根拠がない。既製baseの修正では足りず、敵の面構成、手指、cliffの大きな輪郭、支持脚から始まる専用motionをHumanが作る必要がある。

Humanの造形/animation担当と無償で確保できる作業時間はUNKNOWN。CodexへNoAI素材を見せて自動補修する計画では埋められない。したがって**ZERO_COST_FEASIBILITY_NOT_PROVEN**とし、素材探しが済んだことをProduction開始理由にしない。無料での達成が不可能という断定でもない。

Unity6.3 LTS **6000.3.19f1**とBlender4.4は既存exeをread-only再確認。新規installなし。Unity Personalの無料商用利用にはTotal Finances等の条件があり、本件の適格性/activationはUNKNOWN。Unityの現行Termsにはagentic access条件もあるため、無料素材だけでCodex/MCPのEditor操作まで許可済みにしない。[無料toolchainと実行境界](ZERO_COST_TOOLCHAIN_AND_GATES_R1.md)

## Human Review用の資料

1. [無料Asset Shortlist・候補ごとの8項目・除外理由](ZERO_COST_ASSET_SHORTLIST_R1.md)
2. [公式licenseとAI input / modificationの境界](LICENSE_AI_BOUNDARY_R1.md)
3. [無料Toolchain・Animation経路・ボトルネック・7 Gate](ZERO_COST_TOOLCHAIN_AND_GATES_R1.md)
4. [今回の変更・資料QA・既存成果保全](ZERO_COST_REVIEW_QA_R1.md)

後続の評価対象はEnemy×1、Sword/Arm×1、Environment slice×1、5–15秒に限定したまま。Character、Sword、Animation、Hit Reaction、Environment、Integrated Gold Scene、GameplayのGateを維持し、Visual Gateでは毎回Aとside-by-side比較する。**全Gate NOT EXECUTED**。素材/engine導入やtechnical QAは品質達成を代替しない。

旧[Accepted研究R1](../../research/chanbara-premium-r1/CHANBARA_PREMIUM_PRODUCTION_RESEARCH_R1.md)と[直前Preproduction](../chanbara-premium-preproduction-r1/CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md)は履歴としてbyte保全。現行の候補・予算・購入Gateについては本0円版が優先する。旧資料内の有料候補、購入を含む将来手順、未反映のAI3D無料枠情報を実行に使わない。

## Exact stop

```text
ZERO_COST_SHORTLIST_REVIEW_READY
LICENSE_AI_BOUNDARY_READY / ZERO_COST_PIPELINE_PLAN_READY / VALIDATION_GATES_READY
ZERO_COST_FEASIBILITY_NOT_PROVEN / HUMAN_ZERO_COST_REVIEW_PENDING
NO_ASSET_PURCHASE / NO_ASSET_DOWNLOAD / NO_UNITY_INSTALL / NO_TOOL_INSTALL / NO_GAME_IMPLEMENTATION
NO_ACCOUNT_OPERATION / NO_STEAM_REGISTRATION / NO_GIT_STAGE_COMMIT_PUSH / NO_DEPLOY_PUBLIC_RELEASE
```

これはHumanの無料候補Review待ちであり、download/install/implementationの許可依頼や開始ではない。品質ボトルネックを未解決のまま次工程へ進めない。
