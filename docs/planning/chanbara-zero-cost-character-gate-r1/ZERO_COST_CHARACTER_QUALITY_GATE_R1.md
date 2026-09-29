# ZERO-COST CHARACTER QUALITY GATE R1

2026-09-29 JST · **HUMAN_DOWNLOAD_GATE_PENDING / ENEMY 1 ONLY / USD 0 / JPY 0**

**CC0の既存Human BaseをCodex＋Blender automationでAの敵へ調整する。Humanの担当はCreative Judgment。新規取得が必要なため、exact無料対象を下記2点に固定してdownload前で停止した。Enemy・Unity viewerはまだ制作していない。**

## 最新Human判断

- ZERO-COST PREMIUM 3D PIPELINE R1は**Human Review済み**。ShortlistのProduction採用ではない。研究R1のHuman Accepted、North Star A採用、USD0/JPY0は維持。
- Humanの長時間の専門モデリング・Rig・Animation修正を成立条件とする旧計画は今回不採用。Codexが権利確認済みのbaseを解析し、Blender scriptで加工・rig・motion補修・自己検収する経路へ変更。
- NoAI Assetは今回のAI中心Production Candidateから除外。旧F01/S01のCGTrader NoAI素材、MixamoのAI制限素材は使用しない。Sword/first-person Arms/Environment/VFXは今回の対象外。
- 既存baseを出発点にする。primitiveから人体を再生成したものや、旧不採用enemyをbaseとして再提出しない。
- **Humanが「このEnemyを完成ゲーム画面に出したいか」にYESと判断した場合だけ次Gateへ進める。NOなら改善を自動継続せず、`ZERO-COST / AI-CENTERED CHARACTER PIPELINE NOT READY`で停止して原因を報告する。**

## 取得前に確認したlocal状態

[local-inventory.json](internal/local-inventory.json)を参照。repo内のfilename inventory（ignoredを含む、.git/node_modules/.cache/.tmp/.astroを除外）では、今回のHuman Base/Animation packageは見つからなかった。唯一の関連.blendは旧`monolith-assets-r1.blend`で、採用済み人体baseではないため再利用しない。PC全域に存在しないという断定ではない。

既存Unity `6000.3.19f1`、Blender4.4のexe、**同梱Rigify folder**の存在を確認。Blender4.4.3という版は直前監査を継承。Rigifyの有効状態/実行成功は未検証。PATH上の`unity`/`unity-cli`は検出されず。Editor/Blenderは今回起動せず、license file・account・global設定へアクセスしていない。

## Human Download Gate — exact対象2点

| ID / 対象 | exact source / 版 / 掲載容量 | License / AI利用判断 | 承認後の用途 |
|---|---|---|---|
| **B01 — Human Base Meshes v1.4.1** / Blender Studio + community | [公式Asset Bundles](https://www.blender.org/download/demo-files/#assets)。公式カードのZIP hrefは[human-base-meshes-bundle-v1.4.1.zip](https://www.blender.org/download/demo/asset-bundles/human-base-meshes/human-base-meshes-bundle-v1.4.1.zip)。**49 MB表示、Blender4.2 LTS以上** | **CC0 1.0、USD0/JPY0**。商用/Steam組込/改変/raw再配布可、credit義務なし。CC0法文にAI固有制限なし。Codexによるmesh解析、Blender script改変、派生renderのAI自己検収を今回のHuman指定の条件内へ組み込める | packageから全身人体1体を選定。native meshを保ち、長肢/小さい頭/無顔化/黒材質/朱/rigへ加工。個別mesh名、rig同梱、頂点数は取得後検査 |
| **M01 — Universal Animation Library[Standard].zip** / Quaternius | [作者公式配布ページ](https://quaternius.itch.io/universal-animation-library)。**Standardのみ、15 MB表示**。公開changelog最新v3.0（2026-06-16）、page更新2026-09-16。ZIP内部版はUNKNOWN | **CC0 1.0、USD0/JPY0**。商用/Steam組込/改変/raw再配布可、credit義務なし。商品/作者FAQにAI入力・改変の追加禁止なし。`No generative AI was used`は作者の制作来歴で、利用者のNoAI条項ではない | humanoid FBX/glTF系motionを選別。run等のbaseをretargetし、重心/支持脚/4phase/方向反応をCodex＋Blenderで補修。単純clip再生で合格にしない |

B01は公式HTML本文とhrefを照合した。検索toolの直接openが失敗する場合があったが、公開HTMLのテキスト確認は成功。**ZIPそのものへアクセスしていない**ためredirect先、HTTP応答、hash、内容、実容量はUNKNOWN。M01もDownloadボタンを押さず、公式掲載名を固定した。トークン付き直リンクを推測しない。

根拠：[CC0法文 §2–4](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en) / [Blender Base Mesh技術説明](https://developer.blender.org/docs/release_notes/3.6/asset_bundles/) / [Quaternius FAQ](https://quaternius.com/faq.html) / [Animation公式product](https://quaternius.com/packs/universalanimationlibrary.html)。AI可は**CC0の用途制限のない許諾範囲からの判断**であり、Blenderが別途AI使用の保証文を出しているという主張ではない。第三者の商標・肖像等まで一括保証しない。

M01の旧Standard紹介は45animationsだが、現在の無料ZIPのexact clip一覧、idle/run/attack/recovery/方向hitの収録はUNKNOWN。120+やnative .blendを無料版の保証へ移さない。無料版に必要clipがなければ既存rigに対して独自curveを補修/作成する。取得物に同梱されるlicenseが公開条件と矛盾すれば当該素材を使用せず停止する。

**今回求めるdownload許可はB01/M01の2点だけ。** account作成/login、購入/donation、有料版、AI3D service、別素材の自動追加は含めない。取得経路がaccountや支払いを要求した場合は止める。新しいtool/packageの導入・認証は本asset download許可と分ける。

保存予定はrepo内の隔離領域`chanbara-zero-cost-character-r1/source-assets/`。まだ作成・取得していない。承認後に原archiveのSHA-256、取得日時、final URL、license同梱情報を台帳へ記録し、原本を保全して作業copyだけを加工する。[機械可読manifest](DOWNLOAD_MANIFEST_R1.json)

## AI利用境界の更新

最新HumanはAI中心工程を求めているため、CC0対象まで旧計画の「AI入力未許可」を無期限に適用しない。**Human download許可と実ファイルのCC0照合後は、このEnemy GateのためのCodex解析・Blender automation・派生render/motion reviewを予定経路にする。** 取得前のasset解析は行わない。商品preview、対象外asset、NoAI素材、外部AI3D serviceへの送信へ拡張しない。

Blender本体/rig scriptのGPLと、使用するbase/animationのCC0を分ける。自作artworkがBlenderを使っただけでGPLになるわけではない。[Blender License](https://www.blender.org/about/license/)。同梱Rigifyをまず使えるか確認し、外部addon取得を既定にしない。第三者.blend内の自動実行scriptは実行せず、管理したscriptだけで加工する。

## Characterの制作契約（download後、まだ未実行）

**担当**：Codexが素材inventory、比率/表面編集、rig/weight調整、animation補修、Unity viewer、技術/視覚の自己検収を行う。Humanは最終的な見た目と動きをYES/NOで判断する。専門DCC操作をHumanへ渡して穴を埋める工程にしない。

| 工程 | 自動化で行うこと | Evidence / fail条件 |
|---|---|---|
| 原本と人体選択 | B01のmesh/topology/UV/armature有無を検査し、全身人体1体を選ぶ | 原本hash、object名、変更前後の来歴。人体をprimitiveで置換した場合は失格 |
| silhouette / proportion | 既存人体の形状を長肢・小さい頭へ編集。肩/肘/膝/手足を読みやすくし、無顔のhead surfaceへ調整 | front/side/3-quarter、neutralと動作pose。頭をsphereへ置換して終えない。関節の球/円柱感を残さない |
| material / vermilion | 黒のroughness/面の明暗差、胸と前腕を中心に限定朱。必要なsurface/maskはbaseから作る | 固定露出/neutral lightと方向lightで確認。真黒に潰して造形不足を隠さない。色替えだけでA一致にしない |
| rig / deformation | 既存rigを検査。必要なら同梱Rigify/armatureをscriptで作成し、weightとjoint位置を補修 | 肩挙上、肘曲げ、膝踏込、腰捻り、指/足。自動weight成功だけで通さない |
| base motion | M01を骨対応/rest pose/root scaleを揃えてretargetし、bakeする | source clip名・自作curve区分・root/in-placeを記録。constraintそのもののUnity輸送を期待しない |
| motion craft | idle、forward run、attackの予備動作→接触→振抜き→回復、左右/斜めhitを補修 | 下記6項目を等速連続とframe stepで比較。不足をVFX/物理/速度変更だけで覆わない |
| Unity輸送 | .blend原本→deform skeleton＋baked FBX、材質をUnityで構成。Enemy1体のviewerへ | scale、bone/weight、法線、root、clip遷移、元Blenderとのpose対応。Unityで実見できることが必要 |

Human Baseの全体置換は禁止だが、rig追加、topology補修、顔のdetail整理、材質mask生成等の補助処理はbase由来の敵を完成させるために行う。仕様が許す自動化と、primitive造形への逆戻りを区別する。

## Motion Reviewの6項目

| 項目 | Reviewする内容 |
|---|---|
| Center of mass | 支持脚に対する腰/体幹の位置、runの推進、attackの荷重移動、hit後の回収。骨位置からの重心proxyは診断用で、厳密な人体力学の証明とはしない |
| Anticipation | 接近からattackへの予備動作で方向/重さが読める。支持脚→腰→肩が連動し、急なpose切替で始めない |
| Foot planting | 接地区間の足滑り/浮き/貫通、膝の方向、足の踏替えを検査。足targetで固定した結果の腰/膝破綻も確認 |
| Contact | attackの体幹/腕の到達と仮想contact時点を一致させる。今回はSwordなしなのでblade衝突や武器gripの合格とはしない |
| Follow-through | 腰/肩と末端の遅れ、勢いの減衰が読める。全骨が同時に止まらない |
| Recovery | 攻撃/hitから支持姿勢へ戻り、root/足/手のpopがない。idleへblendしただけで回復成立としない |

今回は方向別authored reactionを先に検証し、全面ragdollは作らない。Swordを作らず、Enemyの全身attack pose/腕軌道と仮想contactをReviewする。敵自身の腕・手は全身baseの一部として含むが、player first-person Armsは制作しない。

## Unity viewer契約

- Enemy1体のみ。無地の測定床、neutral背景、必要最小限のcamera/lightは検査器具として置く。Environment asset、岩、VFX、player武器、戦闘systemは追加しない。
- 切替は **1 neutral pose / 2 run toward camera / 3 attack anticipation / 4 attack / 5 directional hit reaction**。idleを再生/停止でき、hitは左/右/斜めを選べる。reset、pause、frame step、等速playを持つ。
- runはcameraへ実際にrootが前進する状態を確認し、in-place clipだけを接近と表示しない。cameraを動かして移動に見せない。
- A原画像＋candidateを常時side-by-side表示。全体画像の比較とenemy部分の比較を分け、同一の候補camera/露出を固定する。cropだけで体型やscaleの不一致を隠さない。
- 自動再生viewerはCharacter/Motion検証。Full gameplayやmouse sword成立の証拠として出さない。

参照は[North Star A採用記録](../../games/chanbara-restart/CHANBARA_A_ACCEPTANCE_R1.md)と[A Visual BibleのEnemy/Reaction](../../games/chanbara-restart/CHANBARA_A_VISUAL_BIBLE_R1.md)。今回A原画像を再確認したが、candidateが未制作なのでside-by-side実施済みとはしない。静止Aから正解のattack timingや骨格値を捏造しない。

## Unity automationの公式経路

**UNITY_OFFICIAL_ZERO_COST_AGENT_ROUTE_IDENTIFIED**。前資料の「Human-operated Unityを前提」は本Gateの制作方法へ継承しない。公式Unity CLI＋Unity Pipeline経由でCodexがviewerを構築する経路を優先する。

| 公式根拠 | 本Gateでの判断 |
|---|---|
| [公式移行文書](https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli)はCLI無料、Unity AI subscription不要、Unity6以降、shell agent向け`unity command`/`unity eval`を明記 | AI中心工程の具体的な公式候補。旧Assistant内MCPを必須にしない |
| [CLI release notes](https://docs.unity.com/en-us/unity-cli/release-notes)はCodex shellからlocalhost Editorへのcommand接続を説明 | Codexで利用するサポート根拠あり。独自bridgeやUnity.exe直接自動操作を既定にしない |
| [Personal pricing](https://unity.com/products)と[AI FAQ](https://unity.com/features/ai)は無料MCP/CLIを説明 | 追加Unity利用料0の経路。ただしpricing内の旧比較表にはsubscription必要表記が残り、旧Gatewayと新CLIを混同しない。paid trial/AI creditsを開始しない |
| [Pipeline導入](https://docs.unity.com/en-us/unity-cli/unity-pipeline/unity-pipeline-package)にはCLI、package/dependency、login、再compile/接続確認が必要 | 未導入/未認証/未接続。asset2件の取得許可だけでこれらの操作まで許可されたと扱わない |
| [CLI use guide](https://docs.unity.com/en-us/unity-cli/use-unity-cli)は新規projectのCloud既定動作と`--no-cloud`を説明 | 将来はrepo内隔離project、Cloud作成なし。login/ライセンス通信まで不要という意味ではない |

Unity CLIはexperimental。現行PCでPATH検出なし、Pipeline/認証状態は未検査、Personal適格性もUNKNOWN。**UNITY_AGENT_ACCESS_AND_LOCAL_READINESS_GATE_PENDING**として、導入・認証・対象Editor接続を別の未実証項目に残す。「無料経路が存在しない」とは判定しない。[一般TermsのAuthorized Agentic Access](https://unity.com/legal/terms-of-service)に沿い、公式docsによる許可範囲で使う。

`unity mcp configure codex`はsandbox/network設定も変更するため自動実行計画へ含めない。global設定・既存Skill変更やsecurity緩和をせず、公式shell command経路で足りるか確認する。BlenderのPython/background自動化は別に公式対応があり、Unityの未準備を理由にHuman専門DCC作業へ戻さない。[Blender Python automation](https://docs.blender.org/api/main/info_tips_and_tricks.html)

## 判定と停止

今回の実状態は **ASSET_NOT_ACQUIRED / CHARACTER_NOT_CREATED / UNITY_VIEWER_NOT_CREATED / SIDE_BY_SIDE_NOT_EXECUTED / HUMAN_DOWNLOAD_GATE_PENDING**。これをCharacterの品質NOやpipeline失敗と混同しない。

将来viewerを提出したときのHumanの質問は一つ：**「このEnemyを完成ゲーム画面に出したいか」**。

- **YES**：このexact enemy版のCharacter Gateのみ採用。次GateはHumanの指示範囲で進む。Sword/Arms/Environment/Full Productionの自動許可ではない。
- **NO**：`ZERO-COST / AI-CENTERED CHARACTER PIPELINE NOT READY`。原因をbaseの形状、変形、motion、automation、Unity輸送、Aとの差に分け、同じ版を無理に改善し続けない。再試行は新しいHuman指示から。
- 自己検収段階で破綻が解消できない場合も、無料素材/技術PASSを理由に提出品質を偽らず、未解決点を報告する。有料fallbackやHuman長時間DCCへの委譲は行わない。

Enemy限定の制作依頼は受領済み。ただし今はHuman download gate前のため、素材取得・制作を開始せずここで止める。取得許可後も今回のEnemy限定scopeを維持し、工程ごとの不要な再承認を要求しない。tool導入・認証など別の未許可操作は上記の範囲で扱う。購入/account作成/Steam/Production/stage/commit/push/deployは0。
