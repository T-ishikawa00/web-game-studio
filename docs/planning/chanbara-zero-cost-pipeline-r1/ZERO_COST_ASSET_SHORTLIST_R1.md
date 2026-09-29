# ZERO-COST — Asset Shortlist R1

2026-09-29 JST · **USD 0 / JPY 0 / SHORTLIST REVIEW ONLY**

[Review入口](ZERO_COST_PREMIUM_3D_PIPELINE_R1.md) / [licenseの共通解釈](LICENSE_AI_BOUNDARY_R1.md) / [tool・工程・Gate](ZERO_COST_TOOLCHAIN_AND_GATES_R1.md)

## 判定方法

**REVIEW CANDIDATE**は、無料商用条件と編集経路を確認でき、Aへ近づける具体的な補修方針を持つbase。完成品採用、Visual PASS、取得許可ではない。**HOLD / EXCLUDED**は現在のProduction Candidateへ入れない。全件のdownload、実ファイル解析、Unity6.3 import、A side-by-sideは未実施。外観の記述は商品説明とA要件を照合した仮説であり、preview画像の検収ではない。

旧依頼の3–5件という数より、最新Humanの「0円・商用可・A級を妥協しない」を優先する。適合根拠が薄い素材で数を埋めない。価格欄の0は調査時点の本体価格。任意donation、subscription、credits購入、paid Source版は選ばない。

## Character / First-person arms / Sword

| ID / exact product・source | 価格 / license / Restricted・custom | Format・rig・Blender編集性・Unity互換 | Aへの用途・不足 / 判定 |
|---|---|---|---|
| **C01 — MPFB + MakeHuman core base mesh / targets / skins**。MakeHuman Community。[MPFB](https://static.makehumancommunity.org/mpfb.html) / [機能](https://static.makehumancommunity.org/mpfb/about.html) | **$0 / ¥0**。core assets CC0、MPFB code GPL。第三者community assetsは含めない。独自asset EULAなし | Blender内parametric編集、GameEngine/他rigを選択、FBX export。GameEngine rigのMecanim互換は公式説明。Unity6.3 mappingとskin weightは未検証 | **REVIEW CANDIDATE：人体・rig基盤**。長肢、無顔head、面構成、黒材質、朱、衣装/手足をHuman制作。完成enemyではない。造形工数大 |
| **C02 — Human Base Meshes v1.4.1**。Blender Studio/community。[公式Asset Bundles](https://www.blender.org/download/demo-files/) / [技術説明](https://developer.blender.org/docs/release_notes/3.6/asset_bundles/) | **$0 / ¥0、CC0**。別商品Free Male Base MeshのCC-BYと混同しない | native Blender、4.2 LTS以上。quad、UV/UDIM、realistic meshのmultires詳細。完成animation rigの同梱はUNKNOWN。Humanがrig/bakeしてFBXへ。既存4.4との版条件は満たすが実読込未実施 | **REVIEW CANDIDATE：独自造形のbase**。解剖detailを利用しAのsilhouetteを作り直す。腕・手の部分利用も制作案。顔が細かいことはA適合の根拠にならない |
| **F01 — Game Ready FPS Arms / zahers / CGTrader #2864994**。[exact listing](https://www.cgtrader.com/free-3d-models/character/man/game-ready-fps-arms) | **$0 / ¥0、Royalty Free License (no AI)**。Custom/Editorial指定は公開欄で確認されず | Blend2.91.2/Eevee、FBX、OBJ。11,492tris、2K、high-res sculpt、quad/skeleton明記。指/twist骨・clip・Humanoid規格はUNKNOWN。Blenderで通常編集、UnityはGeneric候補、材質再設定 | **REVIEW CANDIDATE：Human編集専用arms**。黒手甲/前腕、握り、指節、手首を補修。専用FPS解剖baseとして見込みはあるがAのhero hand品質未確認。AI自動補修不可 |
| **S01 — Realistic Medieval Long Sword lowpoly / Nezerim / CGTrader #4353123**。[exact listing](https://www.cgtrader.com/free-3d-models/military/melee/realistic-medieval-long-sword-lowpoly) | **$0 / ¥0、Royalty Free License (no AI)**。Custom/Editorial指定は公開欄で確認されず | Blend3.4.1/Eevee、FBX/OBJ/DAE。4,850polygons、2,527vertices、PBR、rigged掲載、blade8K/handle4K。animation不明。Unity HD説明はURP互換の証明ではない。通常Blender編集→FBX→URP材質を再構築 | **REVIEW CANDIDATE：Human編集専用の直剣base**。薄い鋼、断面/bevel、小さな朱のguard、黒gripへ調整。高解像度だけでA級としない。剣rigを採用せずgrip socketへ固定する案も未検証 |

C01の商用closed-source game、rig、export根拠：[license](https://static.makehumancommunity.org/about/license.html) / [closed-source FAQ](https://static.makehumancommunity.org/mpfb/faq/use_in_closed_source.html) / [rig](https://static.makehumancommunity.org/mpfb/docs/characters/rig.html) / [export](https://static.makehumancommunity.org/mpfb/docs/exporting.html)。C02の公式一覧はweb openで取得できない応答があり、名称・CC0・必要版は公式ドメインの検索取得本文で照合した。zipは開いていない。

**Characterの完成無料asset：未確保。** C01/C02はshape/rigの出発点に限定する。Human担当が造形と変形を仕上げられない場合、これらを採用済み敵へ格上げせず停止する。CC0だけで統一したい場合のarmsはC01/C02から自作する案だが、F01より工数が少ない証拠はなく、独立した無料FPS完成品として数えない。

## Rock / Cliff / Texture / Material / HDRI / Lighting

| ID / exact product・source | 価格 / license | Format・Blender編集性・Unity互換 / rig | Aへの用途・不足 / 判定 |
|---|---|---|---|
| **T01 — Rock 026 / ambientCG**。[product](https://ambientcg.com/view?id=Rock026) | **$0 / ¥0、CC0**。追加customなし | photogrammetry PBR surface、1–12K、JPG/PNG。Blenderで材質編集可、Unity URPへ各mapを再構築。個別map一覧は未開封。rig/animationは対象外 | **REVIEW CANDIDATE：断崖材質第一候補**。Cliff/Gray/Lightタグが淡色断崖と対応。ivory、実寸tiling、roughnessを合わせる。**形状meshは含まない** |
| **T02 — Marble Cliff 05 / Amal Kumar / Poly Haven**。[product](https://polyhaven.com/a/marble_cliff_05) | **$0 / ¥0、CC0** | Blend/glTF/MaterialX、EXR/JPG/PNG、1–8K、20m相当。Diffuse/AO/Roughness/Normal DX・GL/Displacement。Blender編集可、Unityでは画像mapから材質再構築。rigなし | **REVIEW CANDIDATE：断崖材質代替**。淡beige/grayの地層。脈理/亀裂のcontrastが大面を壊さないよう調整。**.blend付きでも完成断崖meshではない** |
| **T03 — Rocks Ground 05 / Rob Tuytel / Poly Haven**。[product](https://polyhaven.com/a/rocks_ground_05) | **$0 / ¥0、CC0** | Blend/glTF/MaterialX、EXR/JPG/PNG、1–8K、3m相当PBR。Blender/UnityはT02と同じ手動map経路。rigなし | **REVIEW CANDIDATE：乾いた地面**。dry soil/coarse gravel。小石detailを抑え、足と接地影、遠景への尺度を優先 |
| **H01 — Kloofendal 48d Partly Cloudy (PureSky) / Greg Zaal・Jarod Guest / Poly Haven**。[product](https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky) | **$0 / ¥0、CC0** | HDR/EXR、1–16K、21EV。Blender Worldへ使用可。Unity Panoramic Skybox/reflection、rigなし。HDRIの環境照明とDirectional Lightの太陽方向を整合 | **REVIEW CANDIDATE：日中の空/反射**。sky-onlyなので草木背景を持ち込まず試せる。雲量・空色・太陽高度は未検収。必須素材にはしない |
| **L01 — Unity Procedural Skybox + Directional Light**。[Procedural](https://docs.unity3d.com/6000.3/Documentation/Manual/shader-skybox-procedural.html) / [Panoramic](https://docs.unity3d.com/6000.3/Documentation/Manual/shader-skybox-panoramic.html) | **追加asset代$0 / ¥0**。Unity利用資格条件付き。外部asset SKUではなくtool route | Unity6.3のURP対応。skybox設定はBlenderへ同一結果を直接移す形式ではない。rigなし | **REVIEW CANDIDATE：基準照明**。高い太陽、短く硬い接地影、固定露出。Aの光に合わせてHuman調整。無料HDRIを入れただけでlight完成としない |

各素材の公式license：[ambientCG](https://docs.ambientcg.com/license/) / [Poly Haven](https://polyhaven.com/license)。PBR材質はroughness→smoothness、normal方向、sRGB/linear、channel packing、scaleをUnity側で確認する。Blenderのnode graphがそのままUnity shaderへ移る前提ではない。

**Rock/Cliffの完成geometry候補：NONE。** 無料でも丸いboulderや地層の細かい海岸scanをAの巨大板状面の代用品として採用しない。無料toolのBlenderでHumanがhero cliffを造形し、T01/T02を用いる経路はあるが、担当・完成品質が未確定のため形状工程はbottleneck。既存の不採用procedural岩を完成候補へ戻さない。

## Animation / Rig / VFX

| ID / exact対象・source | 価格 / license | Format・rig・Blender・Unity | Aへの用途・不足 / 判定 |
|---|---|---|---|
| **A01 — Universal Animation Library [Standard].zip / Quaternius**。[作者公式配布一覧](https://quaternius.itch.io/universal-animation-library) / [公式product](https://quaternius.com/packs/universalanimationlibrary.html) | **$0 / ¥0、CC0**。Name your own priceの無料Standardだけ。Pro/Sourceは今回対象外 | humanoid retarget用FBX/glTF系、Unity対応を説明。無料版にnative .blendを含めない。FBXをBlenderでHuman編集→bake→Unity Humanoid。現行ZIPのexact clip一覧は未検証 | **REVIEW CANDIDATE：base locomotion第一候補**。Standardは作者の[説明](https://opengameart.org/content/universal-animation-library)で45animations。現行総数/派生数は未検証。製品全体の120+を無料版へ転記しない。長肢・剣grip・重さ・4phaseは専用補修 |
| **A02 — Adobe Mixamo animation library**。[公式FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | **$0 / ¥0**、Adobe ID必要、CC契約不要。Adobe/Mixamo独自規約 | humanoid/FBX。Blender通常編集→Unity Humanoidは候補経路。[FBX説明](https://community.adobe.com/questions-696/additional-fbx-export-option-now-available-589945)。exact clip名/coverage/root設定は未確定 | **HOLD：無料補助service**。exact asset shortlistには数えない。A01不足時に人がclipを検収する研究先。NoAI経路、専用motion補修は残る |
| **G01 — Blender Rigify**。[公式Introduction](https://docs.blender.org/manual/en/4.3/addons/rigging/rigify/introduction.html) | **$0 / ¥0、GPL tool**。第三者asset自体のlicenseは残る | .blend内control rig→deform skeleton/baked FBX。rig生成がskin weight/握り完成を保証しない。Unityにcontrol/UI/constraintを丸ごと移せない | **REVIEW CANDIDATE：Human rig制作**。指・手首twist・肩股・膝の変形を検収。対象Blenderの同梱/有効状態は未確認 |
| **G02 — MPFB GameEngine rig（C01の構成要素）**。[公式rig説明](https://static.makehumancommunity.org/mpfb/docs/characters/rig.html) | **$0 / ¥0**。core asset CC0 / tool GPL。別商品として水増ししない | .blend/FBX。Mecanim互換はprovider説明。Unity6.3、Aの長肢比率でのmapping/weightは未検証 | **REVIEW CANDIDATE：enemyの骨格基盤**。C01と一緒に選択。rigが適切でも敵の造形Gateは別 |
| **V01 — Particle Pack / Kenney**。[product](https://kenney.nl/assets/particle-pack) / [公式license説明](https://kenney.nl/support) | **$0 / ¥0、CC0**。donation任意、支払いなし | 2D/VFX、80files、512×512。個々の拡張子/presetは公開本文ではUNKNOWN。画像素材をBlender/Unityで扱う経路。native .blend/rig/animation packではない | **REVIEW CANDIDATE：小さなdust/spark用texture**。最終VFXはHuman authoring。512²という値だけで近接品質を保証しない。大きなflipbookや全画面flashに依存しない |
| **V02 — Unity6.3 Particle System + Human original mesh/texture/trail**。[公式manual](https://docs.unity3d.com/6000.3/Documentation/Manual/PartSysUsage.html) | **追加asset代$0 / ¥0**。Unity terms＋使う素材のlicense。外部packではない | HumanがUnityでparameter/materialを作成。独自小mesh/textureはBlender→FBX/画像。particle設定のBlender互換は対象外 | **REVIEW CANDIDATE：VFX制作主経路**。接触位置と方向、短い白spark、乾いたdust。VFXでmotion/造形の不足を隠さない |

Human original animationは既存Blenderで追加tool費0の制作方法であり、無料既製clipの確保数には含めない。[Blender出力license](https://www.blender.org/about/license/) / [FBXとbake/constraintの制約](https://docs.blender.org/manual/en/4.4/addons/import_export/scene_fbx.html)。無料retarget serviceやRigifyの機能だけでAのbody mechanicsが成立したことにはならない。

## 候補別の権利8項目

下表の「可」は記載licenseの条件内。全candidateに共通して**今回AI入力/AI改変は未許可・未実行**。商用許可とHuman作業許可を区別する。Blender/Unityについての実行確認は全件NOT TESTEDで、上表は形式からの経路確認。

| 対象 | Commercial / Steam | Modification | Redistribution restriction | Attribution | AI input / AI modification | Blender / Unity |
|---|---|---|---|---|---|---|
| C01 core | 可 / 可 | 可 | CC0素材raw可。tool codeはGPL等を別適用 | coreは不要 | CC0にNoAI追加なし。community素材へ拡張しない | native編集 / FBXとHumanoid候補 |
| C02 | 可 / 可 | 可 | CC0 raw可 | 不要 | CC0にNoAI追加なし | native編集 / 自作rig→FBX |
| F01 | 組込gameで可 / 同左 | 人手の通常編集可 | raw再配布不可、抽出対策 | 明示義務未確認。exact条件照合 | NoAI学習等禁止。推論/AI改変許可を推測しない | Blend編集可 / FBX Generic候補 |
| S01 | 組込gameで可 / 同左 | 人手の通常編集可 | raw再配布不可、抽出対策 | 明示義務未確認。exact条件照合 | F01と同じ | Blend編集可 / FBX材質再設定 |
| T01 | 可 / 可 | 可 | CC0 raw可 | 不要 | CC0にNoAI追加なし。previewもCC0だが今回入力なし | 画像材質編集 / PBR手動構成 |
| T02 | 可 / 可 | 可 | CC0 raw可 | 不要 | CC0本体と保護対象previewを区別 | Blend/画像 / PBR手動構成 |
| T03 | 可 / 可 | 可 | CC0 raw可 | 不要 | T02と同じ | T02と同じ |
| H01 | 可 / 可 | 可 | CC0 raw可 | 不要 | T02と同じ | HDR/EXR / Panoramic候補 |
| L01 | Personal等の適格性条件 / 組込可 | 自作設定可 | engine単体とゲーム内runtimeを区別 | engine notice条件 | Unity agentic経路UNKNOWN、Human操作 | Unity専用設定、DCC互換対象外 |
| A01 Standard | 可 / 可 | 可 | CC0 raw可 | 不要 | CC0にNoAI追加なし | FBX import/edit / Humanoid候補 |
| A02 Mixamo HOLD | End Useで可 / 同左 | Adobe §3.6内で可 | raw単独配布不可 | 公式Community FAQは不要と説明 | content/outputによるML/AI作成・学習・検証・改善禁止 | FBX編集 / Humanoid候補 |
| G01 Rigify | 自身のartwork可 / 同左 | 可、元asset条件維持 | tool/Python UIはGPL、単純bone出力と区別 | code/license noticeと作品creditを区別 | tool GPLにNoAI追加なし、元asset規制維持 | native rig / deform骨+bake |
| G02 core rig | 可 / 可 | 可 | core CC0 raw可 | 不要 | core CC0にNoAI追加なし | native/FBX / mapping未検証 |
| V01 | 可 / 可 | 可 | CC0 raw可 | 不要 | CC0にNoAI追加なし。website素材全体へ拡張しない | 画像用途 / particle material候補 |
| V02 | 自作成果とUnity適格性条件 / 組込可 | 自作部分可 | 元asset/engineの条件維持 | 自作texture不要、engine notice別 | Unity操作はHuman。混入素材のNoAI維持 | 自作mesh画像のみDCC経路、UnityでVFX作成 |

根拠：[CC0](https://creativecommons.org/publicdomain/zero/1.0/) / [CGTrader Terms §21A・21B](https://www.cgtrader.com/pages/terms-and-conditions) / [Adobe §3.6](https://www.adobe.com/legal/terms.html) / [Mixamo追加規約](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf) / [Mixamo credit FAQ](https://community.adobe.com/questions-696/mixamo-faq-licensing-royalties-ownership-eula-and-tos-589400?lang=en)。Unity/Rigifyの詳細と追加無料IK toolのlicenseは[tool表](ZERO_COST_TOOLCHAIN_AND_GATES_R1.md)で確認。

## AI 3D — 無料商用条件を満たす探索先と、Production採否

**A向けProduction Candidate：NONE。** 無料で生成できること、exportできること、Aの敵/剣/断崖として使えることは別。以下のE01は商用条件の研究記録に限定し、主pipelineへ入れない。

| E01 — Meshy web Free plan / Meshy 6 Lite限定 | 確認結果 |
|---|---|
| Current price / 無料量 | **$0 / ¥0**、100credits/月、6 Lite生成物10download/月。APIはFree対象外。creditはモデル個数ではない。[公式Free plan](https://help.meshy.ai/en/articles/15696428-what-is-included-on-the-free-plan) |
| License / commercial / Steam / modification | Free outputはCC BY4.0。商用・改変・Steam組込は条件内で可。Terms上のFree outputの権利はMeshy、利用者の独占所有ではない。[Terms §3.2](https://www.meshy.ai/terms-of-use) |
| Redistribution / attribution | CC BY素材の再配布可、Meshy credit・license link・変更表示が必要。追加の法的/技術的制限を素材へ課さない。[CC BY4.0](https://creativecommons.org/licenses/by/4.0/) |
| AI input / modification restriction | 送信権を持つ入力だけ。Termsの生成識別metadata除去・競合AI学習等の制限を保持。無料枠をprivate/学習不使用と扱わない。NoAI素材やA画像を自動入力しない |
| 公式記述の不一致 | pricing FAQの同意なし学習不使用という説明に対し、2026-09-19 Terms §2.9は非Enterprise input/outputのtrain/validate/test/improve利用を認める。送信保留、provider利用可能な前提。[pricing](https://www.meshy.ai/pricing) / [Terms](https://www.meshy.ai/terms-of-use) |
| Format / Blender / Unity | 機能ページはFBX/GLB/OBJ/BLEND等を説明。6 Liteの各format entitlement、rig、UV/手指/密度、Unity6.3 importは未検証。Blender補修→FBXの技術案。[形式説明](https://www.meshy.ai/features/text-to-3d) |
| 採否 | **RIGHTS-QUALIFIED EXPLORATION ONLY / NOT A PRODUCTION CANDIDATE**。cloud生成でも品質・remesh/retopo工数・近接detailを証明できない。今回生成0 |

## 今回のProduction Candidateから除外したもの

| 対象 | 除外理由 |
|---|---|
| 旧Preproductionに含まれた全有料asset/tool、価格不明で無料未確認の候補 | **予算方針に不適合**。旧資料は履歴として保全し、現行候補/購入Gateとして使用しない。有料fallbackなし |
| [3D swords lowpol (CC0)](https://opengameart.org/content/3d-swords-lowpol-cc0) | 旧候補。300tris/64×32のcartoony仕様は今回の近接hero剣の品質根拠にならない |
| [Simple PBR sword / coryleeio](https://opengameart.org/content/simple-pbr-sword) | 無料CC0、.blend、Unity5 metallic向けmapは確認。Aに必要な断面/刃先/guard/近接品質の根拠が弱く、S01に加えて数を埋めるために採用しない |
| [Coastal Cliff 01](https://polyhaven.com/a/coastal_cliff_01) | 無料CC0、Blend/FBX/glTF/USD、866Ktris/92m。海岸地層・苔/草を含むscanをAの板状白亜cliffとして成立させる修正量が大きい。完成hero geometry候補から外す。切り出し可能というだけで採用しない |
| [Countrytrax Midday](https://polyhaven.com/a/countrytrax_midday) | CC0の昼光だが草原/樹木背景はAとの適合が弱い。空だけのH01/標準照明で候補を絞る |
| [Reallusion Free CC Base](https://www.reallusion.com/character-creator/free-3d-character-base.html) | 無料商用baseだがAの完成外観は別制作。CC0案を上回る品質根拠未確認、独自EULA/AI境界が増えるため今回は保留。無料でないからではない。[独自EULA §5](https://www.reallusion.com/Content/EULA/AP/EULA_AP.htm) |
| [Tripo Free](https://www.tripo3d.ai/help/privacy-policy/how-to-use-tripo-models-commercially) | 公式商用FAQでFreeのcommercial rightsが付与されない。今回不適合 |
| Meshy6/7本体 | Free export対象外。6 Liteと混同しない。[公式export条件](https://help.meshy.ai/en/articles/10421033-why-can-t-i-download-my-model) |
| [Hunyuan3D-2](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) | shape-only6GBという技術経路があっても、現行[LICENSE §5(c)](https://raw.githubusercontent.com/Tencent-Hunyuan/Hunyuan3D-2/main/LICENSE)はOutput/resultsを含めEU/UK/韓国での利用・配布等を制限。広域Steam向け主候補にしない |
| [Hunyuan3D-2.1](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) / [TRELLIS](https://github.com/microsoft/TRELLIS) / [TRELLIS.2](https://github.com/microsoft/TRELLIS.2) | 公式要件は順にshape10GB・texture21GB、16GB以上、24GB以上。現行8GB GPUの標準経路では成立未確認。非公式改変・外部有料computeを前提にしない |

全URLは2026-09-29の公開本文調査。全assetの原ファイル未取得。価格/規約の将来変更時は再照合し、0円・商用・A見込みが崩れた候補を外す。scopeと品質基準を緩める理由にしない。
