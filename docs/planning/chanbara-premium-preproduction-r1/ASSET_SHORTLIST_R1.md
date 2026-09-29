# Base Asset Shortlist R1

2026-09-29 JST · **ASSET_SHORTLIST_READY / NO_ASSET_PURCHASE / NO_ASSET_DOWNLOAD**

[総合入口](CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md) / [AI・license境界](LICENSE_AI_BOUNDARY_R1.md)

## 1. 調査範囲と判定

**Character3件、First-person arms3件、Sword3件、Rock/Cliffの3D mesh3件、Animation4件＝16候補。** exact clipを選べていないMixamoやtextureだけの素材を、必要なbase候補数の水増しに使わない。候補のうち保留対象と補助用途は明示する。

全商品・規約URLの閲覧日は2026-09-29 JST。今回は公開説明・価格・規約のテキスト調査だけ。preview画像/動画・実ファイルをAIへ入力せず、download/purchase/loginは0。**Visual suitabilityは商品本文とA要件からの暫定分析、technical specsはvendor claim、Unity6.3・Blender roundtrip・品質は全候補NOT TESTED。** Unknownは取得後の課題として残す。

価格は単品の現在公開表示。USD以外・不明は明示し、税・為替・地域・checkout・割引は購入時再確認。CGTraderのsubscription換算や関連商品カードの価格は混ぜない。最有力は次回Humanが商品を検討する順番であり、購入・Visual Acceptanceではない。

## 2. 共通license表記

| Code | commercial game / modification / Steam use | Restricted / custom / AI |
|---|---|---|
| **CG-RF** | 商用gameへの組込・改変は条件付き可。Steam完成game配布はIncorporated Product条件の範囲と読む。raw再配布不可、合理的な素材アクセス防止措置が必要 | 表中の対象は本文でCustom/Editorial表示を確認せず。UnityのRestricted分類は対象外。Custom欄を取得前に再確認。同梱licenseも照合するが指定欄外の追加要求を自動で有効扱いしない（§20.7）。不一致は適用確認。RF表示でも§21A.7によりNoAIが適用され得る。subscriptionは§19A.19も確認 |
| **CG-NoAI** | 商用/改変/Steamは上と同じ条件 | 商品にNoAI明示。§21BのAI training制限とHumanのAI解析禁止を維持 |
| **CC0** | 商用・改変・Steam組込・再配布可。credit必須でない | CC0自体にNoAI追加条件なし。ただし本taskの取得・AI入力許可なし。サイトpreview等はasset本体と分離 |
| **RL-Base** | 無料CC Base専用Software EULA §5。商用game/改変の許諾経路あり、Original Character Creation等の適用確認が残る | Reallusion独自EULA。Unity Restricted対象外。AI訓練/ML等禁止。通常Content Standardだけで確定しない |
| **Synty-Direct** | 自社管理gameへの組込・販売・改変可。engine/platform制限なしという範囲でSteam利用。source再配布不可 | 独自One-Time EULA・5seats。Unity Store版と別。GenAI用途制限、asset AI入力はしない |
| **Ram-Direct** | gameの不可分な一部として商用/改変可。Steamはgame販売用途と読む | 独自EULA。AI-generated systems等への広い禁止の適用範囲未確定のためHOLD |
| **RL-Motion** | Standard licenseに商用game/改変許諾経路あり。iContentだけで外部export不可 | 独自Content EULA。embedded content制限との関係、購入SKUのStandard権利を確定する必要。AI-generated output等の制限あり、HOLD |

一次規約：[CGTrader Terms §21A/21B/23](https://www.cgtrader.com/pages/terms-and-conditions)、[CC0](https://creativecommons.org/publicdomain/zero/1.0/)、[Poly Haven](https://polyhaven.com/license)、[Reallusion Software EULA](https://www.reallusion.com/Content/EULA/AP/EULA_AP.htm)、[Reallusion Content EULA](https://www.reallusion.com/Content/EULA/EULA.htm)、[Synty One-Time EULA](https://syntystore.com/pages/one-time-purchase-licence)、[RamsterZ EULA](https://www.ramsterzanimations.com/end-user-license-agreement)。商用許諾があることをsellerの権利来歴やAI入力許諾の保証にしない。

## 3. Character — 3候補

| ID / 順位 / exact商品・作者・source | 現在価格 / license / Restricted・custom | format・rig・animation compatibility・Blender編集 | MONOLITH RUSH適合・修正量・不足 |
|---|---|---|---|
| **C1 暫定第一候補** [Shinobi PBR Gameready Rigged character](https://www.cgtrader.com/3d-models/character/man/modern-ninja-pbr-gameready-rigged-character) / danilsabirzhanov / CGTrader #3577154 | **USD25** / CG-RF。商用/改変/Steamは§2条件。Custom/Editorial記載未確認、購入時のCustom欄を再照合 | Maya `.ma`、FBX、OBJ、**Blend**。Advanced Skeleton/Mixamo系rig、UE4/Unity利用説明。4K PBR。Animatedタグはあるがclip数/名UNKNOWN。Blend内の操作rig、Unity6.3 Avatar、poly/LOD不明 | modern/cyberpunk ninjaで**Aの完成外観ではない**。無顔head、長肢、現代装備整理、黒/朱surface、weight/retargetの大修正が必要。優先理由はBlend＋FBXの編集経路。長肢化後の肩/股の変形を最初に検収 |
| **C2 低価格代替** [Game-Ready Ninja Character](https://www.cgtrader.com/3d-models/character/man/game-ready-ninja-character-636c40e7-5ce5-4494-a684-1b50a3b8264d) / 3DArtSpace / #6886307 | **USD8.99** / CG-RF。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | FBX/OBJ/PNG、UE標準系rig、17,610tris（knife含む）。idle/run/knife hit/knife combo/jump hitの5clip。native Blendなし、FBX編集は可能性あり。Unity6.3 retarget未検証。preview cloth/sceneは非同梱 | 長肢・無顔・衣服を大修正。knifeのmotionは長剣を代替しない。Blender control rig構築、剣grip/接触、cloth等の追加工数が価格差を超える可能性 |
| **C3 独自造形base・HOLD** [Free 3D Character Base Mesh — 5 Rigged Models / CC Base](https://www.reallusion.com/character-creator/free-3d-character-base.html) / Reallusion | **無料** / RL-Base、Software EULA §5（2026-05-25版）。独自規約、Steam/派生制作の適用範囲要確認 | FBX/OBJ/ZTL、5体、全身rig/150+facial morph、quad/UDIMの説明。Blender body/texture編集可。native Blend、clip、Unity6.3 setup不明。CC5の衣装/slider一式が無料同梱されるわけではない | Aに必要な長肢・無顔head・surfaceをほぼ独自制作。**修正特大**。rigged人体をそのまま人形として使わない。専門造形担当がいて、規約適用確認ができる場合だけ候補 |

**Characterの重要な未達：Aの黒い長肢戦士をそのまま満たす完成SKUは未特定。** C1/C2も色替え程度で済まない。Humanがpreviewを直接比較し、造形担当が修正量を見積もる前に購入を薦め切らない。名前がfacelessでも、AI生成・来歴/rig/LOD詳細が薄い候補を優先しない。

## 4. First-person arms — 3候補

| ID / 順位 / exact商品・作者・source | 現在価格 / license / Restricted・custom | format・rig・animation compatibility・Blender編集 | MONOLITH RUSH適合・修正量・不足 |
|---|---|---|---|
| **F1 暫定第一候補** [FPS Arms 01 Full](https://www.cgtrader.com/3d-models/character/human-anatomy/fps-arms-01-full) / golden-turtle / #5405040 | **USD17** / **CG-NoAI**。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | **Blend4.1/4.4**、FBX、PNG、UE等。Blendに2rig、13,292tris、4K PBR。UE4/UE5/Cascadeur互換説明。指retarget/手首twist補修をsellerが注意。剣clip付属未確認 | realistic handを元に黒い袖/手甲・限定朱・剣gripを作る案。修正中。UE用unitをそのままUnityへ使わず確認。Unity6.3、両手/片手の持剣poseは未検証 |
| **F2 無料代替** [Game Ready FPS Arms](https://www.cgtrader.com/free-3d-models/character/man/game-ready-fps-arms) / zahers / #2864994 | **無料** / **CG-NoAI**。商用/改変/Steamは§2条件。無料でもraw/AI条件は消えない | Blend2.91.2、FBX/OBJ、2K、11,492tris、quad/skeleton説明。standard骨格名、twist、clip不明。古いBlendから4.4への実import未検証 | 袖/材質/grip/motionを修正中〜大。無料の金額だけではF1より有利としない。指/手首のcontrolと変形が最初の検収点 |
| **F3 glove込み代替・低順位** [AAA FPS GLOVES AND ARMS PACK VOL 01](https://www.cgtrader.com/3d-models/character/man/aaa-fps-gloves-and-arm-pack) / SelfTarget / #5929928 | **USD60** / CG-RF。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | Blend4.5、FBX/Max/Maya/UE/PSD。UE骨格、5gloves＋1sleeve、rigged FBX12。52,992polygonsの集計単位不明。plugin詳細UNKNOWN | 現代軍用detailがAとずれる。修正中〜大。Blender4.4より新しいnative版、plugin依存、Unity6.3、剣clipが未確定。FBX経路も含めF1/F2より後 |

armsはenemyの全身rigと別に選び、Generic rigで専用grip/補助poseを作る案。どの候補も一人称直剣のattack/guard/recovery完成一式が付属すると確認できていない。

## 5. Sword — 3候補

| ID / 順位 / exact商品・作者・source | 現在価格 / license / Restricted・custom | format・rig・animation compatibility・Blender編集 | MONOLITH RUSH適合・修正量・不足 |
|---|---|---|---|
| **S1 暫定第一候補** [Longsword and Scabbard - 5 Color Variants](https://www.cgtrader.com/3d-models/military/melee/longsword-and-scabbard-5-color-variants) / coeptum / #5778518 | **USD10** / CG-RF。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | **Blend4.2/FBX/OBJ/glTF**。剣/鞘別、剣1.17m/3,444tris、鞘716tris、PBR1–4K、鍔付近pivot。rig/clip同梱未記載、rigid propとして使用。Unity6.3材質未検証 | 直剣baseとして優先。Aの一枚刃/先端/小さな朱鍔/柄は実形状をHuman確認。bevel、反射、grip補修は中。red variantがAの朱量を満たすと判断しない |
| **S2 代替** [Longsword 3](https://www.cgtrader.com/3d-models/military/melee/longsword-3) / inertan / #4407488 | **USD5** / CG-RF。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | Blend3.4.1/FBX/OBJ/DAE/MAX/glTF。1.45m、柄pivot、766polygons/739vertices、2K PBR、packed texture。plugin具体名UNKNOWN。rig/clip未記載 | native編集可だが、近接bevel・刃先・柄/鍔の独自化は中〜大。polygon数をtrisと取り違えない。Unity shader、collision、arm attachment別工程 |
| **S3 CC0・補修大** [3D swords lowpol (CC0)](https://opengameart.org/content/3d-swords-lowpol-cc0) / CC0 Game Assets（Cardano community collectionと説明） | **無料** / CC0。商用/改変/Steam可、custom追加表示なし。Unity Restricted対象外 | GLB、公開listにFBX zip。約300tris/剣、64×32maps。native Blend同梱は公開説明に記載なし、実ファイル未検収。rig/clip、個別寸法/pivot不明。FBX/GLBからBlenderへの経路のみ | cartoony/lowpoly仕様で、premium一人称heroへ直採用する根拠なし。形状/UV/metalを大修正。権利条件を優先する代替で、品質を下げる採用理由にはしない |

Swordは静的propなのでhumanoid rigは不要。腕側の握りとsocket、薄刃の反射、world poseとhit判定の一致をGate2で検収する。曲がったkatanaを既定にしない。

## 6. Rock/Cliff — 3つの3D mesh候補

| ID / 順位 / exact商品・作者・source | 現在価格 / license / Restricted・custom | format・rig・animation compatibility・Blender編集 | MONOLITH RUSH適合・修正量・不足 |
|---|---|---|---|
| **R1 暫定第一候補** [Cliff Large Scan 01](https://www.cgtrader.com/3d-models/scanned/various/cliff-large-scan-01) / Pers-Scan-Collection / #2690307 | **USD8.50** / **CG-NoAI**。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | **Blend/FBX/OBJ**、崖1点17,018tris/8,656vertices、8K PBR/Displacement、4K detail material。rig/animation不要。LOD/collision/Unity6.3材質UNKNOWN | 公開密度とsource形式が明確。ただし白亜色・板状大面への一致は未確認。輪郭/地質の階層/材質の修正中〜大。8Kのままruntime投入しない |
| **R2 CC0代替** [Coastal Cliff 01](https://polyhaven.com/a/coastal_cliff_01) / Rico Cilliers・Rob Tuytel / Poly Haven | **無料** / CC0。商用/改変/Steam可。asset本体の追加customなし、previewは別 | **Blend/glTF/USD/FBX**、92m幅、866Ktris掲載、1–8K、LOD tag。LOD各段の数UNKNOWN。静的mesh、rig/clip不要 | 海岸/苔/草/侵食の説明。Aへは部分選択、植生整理、板状構成、減量、淡色化が必要。修正大。丸ごとのarena採用は推奨しない |
| **R3 基部補助** [Limestone Boulder Pair](https://www.cgtrader.com/3d-models/exterior/landscape/limestone-boulder-pair) / ddesignstudio09 / #6642289 | **USD11** / CG-RF。商用/改変/Steamは§2条件。Custom/Editorial記載未確認 | **Blend/EXR/JPG**、石灰岩2点、29,000polygons/29,000vertices表示、resolution数値/必須plugin不明。FBX公開listなし→Blender exportが必要。静的mesh | beige/lightgray、層状破断という説明はAへ近いが、巨大断崖の代替ではない。足元/基部用なら修正中、herocliff化は大。大量scatterで主断崖を代用しない |

材質補助として[Marble Cliff 03 / Amal Kumar / Poly Haven](https://polyhaven.com/a/marble_cliff_03)も確認。無料CC0、Blend/glTF/MaterialX、PBR/Displacement1–8K、幅5.7m、warm beige-brown。これは**texture SKU**なので上記3D mesh候補数に含めない。形状と大面は別制作である。

## 7. Animation — 4つのexact pack候補

| ID / 順位 / exact商品・作者・source | 現在価格 / license / Restricted・custom | coverage・format・rig・Unity/Blender互換 | Aへの用途・不足 |
|---|---|---|---|
| **M1 条件付き第一候補** [ANIMATION – Sword Combat](https://syntystore.com/products/animation-sword-combat) / Synty **直販** | **USD59.99表示**、5seats / Synty-Direct。独自EULA。価格欄にLiquid error/Sold out/Add to cart併存、実購入可否・割引UNKNOWN | 105animation FBX、Unity2022.3+ package/FBXzip。light/heavy/stab、ReturnToIdle/ReturnToBlock、前後左右React/Stagger、KnockDown Begin/Loop/End、rootmotion。supportはPOLYGON系rigに限定、prop boneあり | 人体motionだけの候補でSyntyのvisual styleは採用しない。C1等のcustom rigでprop/grip/長肢・root/足を補修。6.3実動作、Blender roundtrip、contact timing/footplant品質はNOT TESTED |
| **M2 移動補完候補** [ANIMATION – Base Locomotion](https://syntystore.com/products/animation-base-locomotion) / Synty **直販** | **USD69.99表示**、5seats / Synty-Direct。M1と同様の表示不整合、購入可否UNKNOWN | 247clips、walk/run/strafe/start/stop/turn/jump等、rootmotion、LFoot/RFoot stop。Unity2022.3+、FBX、Mecanim Humanoid。Unity外は商品support上未試験 | M1だけで足りなければ移動/停止の系統を揃えるため併用。剣attack/hitを含むと扱わない。Blender編集は規約上の改変経路だが輸送は未実証 |
| **M3 AI適用範囲HOLD** [Greatsword Anims (FBX Only)](https://www.ramsterzanimations.com/store-buy/p/greatsword-anims-fbx-only) / RamsterZ直販 | **$34.99、通貨コードUNKNOWN** / Ram-Direct独自EULA。商用/改変/game組込許諾あり。AI-generated systems等の広い禁止が未解決 | rawFBX、UE4 Mannequin、UnityHumanoid/rootmotion説明。99clips：attack28/block9/evade5/idle10/jump16/paired5/run10/stagger5/turn3/walk8。controller/modelなし | 両手大剣の重量感がAの剣に合うかHuman確認。4phase区切り、directional hit詳細、footplant/6.3/Blender未検証。規約不明のまま購入経路を変えて迂回しない |
| **M4 SKU/権利HOLD** [Studio Mocap: Sword & Shield Moves](https://www.reallusion.com/ContentStore/iClone/pack/Motion-Sword-Shield-moves/default.html) / Reallusion Content Store | **価格・通貨・現在購入SKU UNKNOWN** / RL-Motion。Standard必要、iContent不可。独自規約 | move/attack/block、optical mocap、開始/終了poseを合わせる説明。現行clip数不明。ActorCore直DLはFBXのみ、BVHはiClone/CC等のexport経由。骨格/export presetは取得SKUで確認 | shield姿勢を剣単独にする補修。root/in-place/足/方向反応coverage、6.3/Blender未検証。必要権利と外部export経路が確定するまで保留 |

補足：[ActorCoreのFBX/BVHに関する公式担当回答](https://forum.reallusion.com/PrintTopic542027.aspx)、[Unity6.3 retarget要件](https://docs.unity.com/en-us/engine/6000.3/manual/animation-section/animation-mecanim/avatar-creationand-setup/retargeting)。M1＋M2の表示額合計はUSD129.98だが、sale/購入可否・税は未確定。

**購入経路を同一視しない。** [Synty Sword Unity Store版](https://assetstore-fallback.unity.com/packages/3d/animations/synty-animation-sword-combat-291806)はRestricted Single/Multi Entity表示。直販EULA/format/対応版をそのまま適用しない。[RamsterZ Unity版](https://assetstore-fallback.unity.com/packages/3d/animations/greatsword-anims-255817)はUSD39.99・Standard表示だが直販99clipsと同一か不明。どちらも今回購入候補の経路を勝手に切替えない。

Mixamoは無料・商用game利用経路があるが、今回loginなしではexact sword clipを確定できなかったため候補4件へ数えない。AI/MLのcreate/train/test/improve制限も残る。[Adobe FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) / [Mixamo規約](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf)

## 8. 暫定比較セットと残る判断

検討順は **C1＋F1＋S1＋R1＋M1、移動不足ならM2**。CGTrader4点USD60.50、M1を加えるとUSD120.49、M2も加えると**USD190.48の公開表示合計**。これは購入承認、完成部品表、税込見積、North Star到達費用ではない。衣装/頭部/weight/animation/環境独自化の人件費、SE/VFX、失敗時再調達は含まない。

次の実用上の判断は、Humanのpreview比較→担当artistの修正可否→exact license/AI境界→取得対象の承認という順。最初に全候補をdownloadしてAIに比較させる方式は使わない。**Aのenemy造形とhero cliffの大面は依然として最大の制作リスク。** cheapなbaseを選んでも、この独自化工程を省けない。
