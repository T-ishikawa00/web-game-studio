# ZERO-COST — Toolchain / Bottlenecks / Gates R1

2026-09-29 JST · **PLAN ONLY / NO_INSTALL / NO_IMPLEMENTATION**

[Review入口](ZERO_COST_PREMIUM_3D_PIPELINE_R1.md) / [無料候補](ZERO_COST_ASSET_SHORTLIST_R1.md) / [権利とAI](LICENSE_AI_BOUNDARY_R1.md)

## 無料toolの成立条件

**Unity 6.3 LTS + Blender + 無料素材 + Humanによる専用造形/animation補修 + directional reaction / limited physics**を検討経路とする。有料animation editor、rigging plugin、素材subscription、AI credits、外注を必須にしない。Humanの自作時間と技能が確保されているとは仮定しない。

| Exact tool / 価格 | Licenseと商用・Steam・改変 | 配布・attribution・AI境界 | 編集と互換 / 状態 |
|---|---|---|---|
| Unity Personal / Unity6.3 LTS **6000.3.19f1** / 適格なら$0 | Editor Software Terms。Personalは直近12か月Total Financesが$200,000を超えない等の条件。法人/個人/受託で算定対象が異なる。ゲーム商用制作・runtime組込み可 | runtimeはゲーム内配布。Editor再配布やUnity codeの無制限改変権ではない。既存notice、creditsがある場合のUnity指定表示を保持。AI操作は一般Termsの許可経路確認が必要 | 導入exeは今回もfile情報だけ再確認。license適格性/activation/起動はUNKNOWN。適格でなければこのUnity経路は**0円条件で停止** |
| Blender **4.4.3** / $0 | GPL。商用DCC作業可。自身の成果物はSteam利用・改変可。取り込んだ素材の権利は別 | 出力artworkが自動的にGPLになるわけではない。本体/addon code配布はGPL条件。元素材NoAIを解除しない | 既存4.4 exe再確認。4.4.3の版は前回実行/registry証拠を継承。native .blend保存、FBX/画像をUnityへ。今回起動なし |
| Blender Rigify / $0 | GPLのrig制作tool。自作deform骨とbaked motionを商用利用する経路 | control rigに付くPython UI等と、単なるbone/animation出力を区別。source配布にGPL表示等が必要な部分を残す | 対象4.4への同梱/有効状態は未確認。外部extensionは取得しない。rig/weight/指gripをHumanが検収 |
| Unity **Animation Rigging 1.4.1** / $0のpackage候補 | Unity Companion License。valid Unity engine license下の制作/配布に限定。改変可。Unity依存を外して自由なtoolとして再配布する許諾ではない | substantial portionsにlicense/copyright、同梱third-party notices。engine AI制約を解除しない | Unity内のIK/constraint。Blender用addonではない。未取得、未解決。exact依存版は将来の承認範囲で固定 |
| Unity標準Animator / Physics / Particle System / URP / 追加購入$0 | engine termsと各package同梱license。自作scene・material・VFXを商用ゲームへ組込み | 外部Store packを必須にしない。ThirdPartyNoticesを完成buildで記録。AIがEditorを自動操作できるとは仮定しない | FBX骨・mesh、PBR画像をimportし、URP materialをHumanが再構築。外部shaderの自動一致は保証しない |

根拠：[Personal商用FAQ](https://unity.com/products/unity-personal) / [Editor Terms §1・2.2・2.12](https://unity.com/legal/editor-terms-of-service/software) / [Blender License](https://www.blender.org/about/license/) / [Rigify](https://docs.blender.org/manual/en/4.3/addons/rigging/rigify/introduction.html) / [Animation Rigging 1.4.1 license](https://docs.unity3d.com/Packages/com.unity.animation.rigging@1.4/license/LICENSE.html) / [Unity Companion License v1.4](https://unity.com/legal/licenses/unity-companion-license) / [Unity6.3 IK](https://docs.unity3d.com/6000.3/Documentation/Manual/InverseKinematics.html) / [URP](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/urp-introduction.html)。2026-09-29確認。表の改変可は制作物と各toolの許諾範囲を区別したもの。

Personalの商品ページは「$200K未満」、法的Termsは「$200Kを超えない」と記載。実利用判定はTermsのTotal Finances定義と適用契約で行う。予算0であることやEditor導入済みだけでは適格性を証明しない。財務値やlicense fileは今回取得していない。

Windows11 / i7-14700F / RAM31.82GiB / RTX4060Ti 8188MiB、Windows Monoあり、Windows IL2CPP未導入は[直前の環境監査](../chanbara-premium-preproduction-r1/UNITY_ENVIRONMENT_AND_MODULE_PLAN_R1.md)を再利用。今回のexe確認は[installed-tools-readonly.json](internal/installed-tools-readonly.json)。新規install/update/module追加は0。初回のvisual評価は既存19f1 + Windows x64 / URP / D3D11 / Monoを候補とし、IL2CPPを必須にしない。

## Animationの担当とデータ経路

担当は**Humanの造形・animation制作者**。専任者が存在するか、無償で必要時間を確保できるかはUNKNOWN。Codexが原素材を見てweight/poseを自動修正する前提を置かない。

| 段階 | Toolと作業 | データ経路 / 次へ渡すもの | 0円でも残る作業 |
|---|---|---|---|
| Base locomotion | 無料clip候補をHuman選定、またはBlenderで歩行/接近を自作 | source FBX → Blender action → 対象骨格へretarget/bake | 元のrig比率とAの長肢は異なる。stock歩行の速度変更だけで脅威を作らない |
| Anticipation → contact → follow-through → recovery | Blender Pose / Graph Editor / Dope Sheet / NLA。足→腰→肩、支持脚、刃先軌道をHumanが編集 | .blend原本＋deform skeleton＋baked FBX clips | 専用の剣grip、手首twist、急停止、重心、transitionを制作。clip購入による代替なし |
| IK / foot planting | Blenderで基本pose/weight検収 → Unity Animator IKまたはAnimation Rigging1.4.1 | Unity Humanoid mapping＋足/手target。腕だけはGeneric rig候補 | Blender constraintをFBXでそのまま移植しない。足滑り、膝方向、浮き、指貫通を検収 |
| Directional hit reaction | Blenderで左右/斜めの体幹反応と回復を自作。Unityで方向に応じてblend | 方向別reaction clip＋接触点/方向の抽象仕様 | 見た目だけの左右反転で支持脚を破綻させない。胸/腰が先、末端は遅れる |
| Limited physics | Unity標準Rigidbody/Jointを限定使用する設計 | authored motion → 短時間の限定反応 → 安定した回復pose | Animatorとの二重駆動防止、振動/過大吹飛び/復帰popを検収。全面ragdoll化を解決策にしない |

enemyはHumanoid候補、first-person armsは指と手首を含むGeneric候補。Humanoid retargetはBlender用retargeterを提供しないため、Blenderでは骨対応・rest pose・scale・root/hipを人が合わせ、constraintの結果をbakeする。1m単位、法線/接線、bind pose、clip名、root motionの有無をexport時に固定する。素材/rigごとの実施は全て未実行。

## 最小sceneと7 Gateを維持

Enemy×1、First-person Sword/Arm×1、Environment slice×1、太陽/ambient/reflection、少量の白いhit sparkと乾いたdust。約10–12秒（許容5–15秒）のvisual test案。全体移植、score/連戦/save/Portal/Steamworksは含めない。最小sceneと比較方法の詳細は[前計画](../chanbara-premium-preproduction-r1/MINIMAL_SCENE_AND_VALIDATION_GATES_R1.md)を継承し、素材・費用の選択だけ本0円版を優先する。

| Gate | 0円版の通過基準 | 現在 |
|---|---|---|
| Character | A side-by-sideで長肢・小さい頭・黒い面の階層・限定朱・関節変形。無料人体の色替えだけで通さない | NOT EXECUTED / 最大のbottleneck |
| Sword / Arm | Aの刃の薄さ、方向で動く鋼反射、小さな朱の鍔、指のgrip。低poly玩具・青い板・発光で代替しない | NOT EXECUTED / heroの仕上げが必要 |
| Animation | Aの脅威poseを静止比較し、無音/無VFXの連続motionで体重移動・4phase・footplantを検収 | NOT EXECUTED / 専用制作が必要 |
| Hit Reaction | 実接触方向と胸腰・末端・踏替えの因果、限定physicsの安定 | NOT EXECUTED |
| Environment | A全体と並べ、大きな白亜の面、左壁/右一枚岩/遠景、硬い日差しと短い影。scanやtextureの貼付だけで通さない | NOT EXECUTED |
| Integrated Gold Scene | A全体＋第一画面/開始3秒/5–15秒、通常mouse入力と実contact・実SE、16:9/9:16でHuman評価 | NOT EXECUTED。自動再生visual testだけならGOLD PENDING |
| Gameplay | Gold採用後の別許可。直接mouse剣操作、間合い、上達、再挑戦、必要な入力/停止QA | 今回対象外 / NOT AUTHORIZED |

静止画Aからmotionの正解値を捏造しない。asset/engineが入った、解像度やpolygon数が高い、60fpsが出たという理由でVisual GateをPASSにしない。AI入力未許可の素材/renderのside-by-sideはHumanが実施する。

## ZERO-COSTの停止理由

1. **Character**：Aの完成敵を無料既製品として確認できていない。CC0人体基盤からの造形/retopo/weight担当が未確定。現時点で完成品質へ届く工程能力は証明できない。
2. **Hero sword/arms**：編集可能な無料baseは存在するが、近接画面の鋼・薄い刃・手指gripを合格させる作業が残る。単体の無料downloadで解決した扱いにしない。
3. **Animation / reaction**：無料locomotionは開始材料。Aの長肢と剣に専用の予備動作・接触・回復・方向反応は自作が必要で、Human工数/技能はUNKNOWN。
4. **Unity利用資格/操作経路**：Personal適格性と起動、Humanの操作担当、AI自動操作を行うなら適法な許可経路が未確認。無料asset選択でこれらは解消しない。

**ZERO_COST_FEASIBILITY_NOT_PROVEN / HUMAN_ZERO_COST_REVIEW_PENDING**。無料の環境素材や人体baseがあるため不可能とは断言しない。しかし、上記を解決しないままA級品質が狙えるProduction Pipeline完成とは宣言しない。有料fallbackも品質目標の引下げも提示せず、今回の無料Shortlistで停止する。
