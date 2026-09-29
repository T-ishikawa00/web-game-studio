# CHANBARA — 3D Asset Pipeline R1

2026-09-28 · Blender → GLB → Three.js · **ASSET FEASIBILITY GATE**

## Execution result — 2026-09-28

**ASSET PIPELINE NOT READY / HUMAN_ASSET_GATE_PENDING / NO_FULL_PRODUCTION_YET**。Human指定の `C:\Program Files\Blender Foundation\Blender 4.4\blender.exe` で4.4.3 / Python / 内蔵exporterを確認して実行した。3資産のeditable .blend・GLB、8状態のBlender/browser比較、約8秒のasset motion、性能記録を作成。技術transport24/24、Review/media51/51は通ったが、敵・手元・環境のVisualはNorth Starに未達。資産ごとの製品候補READYは宣言しない。

[Local Review](http://127.0.0.1:4478/) / 結果報告（参照原本はPrivate保全・候補には非同梱） / Toolchain audit（参照原本はPrivate保全・候補には非同梱） / 次の制作方式（参照原本はPrivate保全・候補には非同梱）。以下の品質契約を下げずに停止。外部取得・追加dependency・R2本統合・Git・deployは未実行。

## Latest Human authority

- A / MONOLITH RUSH / 朱の断崖はVisual North Starとして継続。[A-NS-R1採用記録](CHANBARA_A_ACCEPTANCE_R1.md)と提供画像がCreative Authority。
- **現在のA-GOLD-R2.2 VisualはHuman不採用。TECH / GAMEPLAY RESEARCH ONLY / VISUAL REJECTEDとして保全。** 技術検証の履歴は取り消さないが、Visualの採用へ転用しない。
- 今回はEnemy × 1、first-person Sword + Hand/Forearm、Environment Slice × 1だけ。wave、12 enemies、full arena、進行、upgrade、full gameは作らない。
- 新資産をHuman採用前にR2へ本統合しない。North Star変更、旧作Visual流用、Game007確定、stage/commit/push/deploy/Production/YouTube変更なし。
- 新規dependencyの無断導入、外部asset取得、購入、登録は禁止。最新追記でHumanはBlender 4.4.3を標準設定で導入したと報告し、実行ファイルを再探索した上で続行するよう指示した。Codexによる追加導入の許可には広げない。

## Workspace and source of truth

新しい隔離領域: `chanbara-asset-pipeline-r1/`。旧R2のゲームsource、bundle、音、画像、録画はそのまま保全。旧READMEとReview入口にHumanの不採用表示を加える場合は、変更前bytesを新領域のinternalへ保全する。

予定配置（存在しない成果を完成扱いしない）:

| Path | Role |
|---|---|
| `blender/` | 編集可能な.blend原本、制作script、bake設定 |
| `exports/` | export直後の非圧縮GLBとmanifest |
| `public/assets/` | 実際に検査したGLBとtextureのみ |
| `src/` | GLTFLoaderを使う専用asset viewer。旧gameplayと独立 |
| `public/evidence/` | Blender render、browser render、比較、5–10秒のasset動作録画 |
| `internal/` | 保全、toolchain、検査ログ。browser配信外 |

## Asset contracts

### Enemy — one authored fighter

約2mの人間スケール。小さい頭、長い腕脚、前傾した危険な輪郭。肩・肘・膝を読める形にし、関節を丸い部品の連結として見せない。黒いmatteの体表、朱の胸・腕の帯を立体の面に沿わせる。写実的な皮膚、血、切断は不要。

最初にfront / side / three-quarterの輪郭と比率を作る。胴、肩、肘、膝のつながりを作品専用のmeshとして調整し、曲げたときの潰れ・隙間・断面を検査する。procedural処理は形の下地や制作補助に限り、primitiveの寄せ集めを最終候補にしない。

Armatureとweightを持つ編集可能なasset。最低3つのnamed action: `combat_neutral`、`run_forward`、`hit_reaction`。静止poseと時間変化の両方で確認する。大量のanimationは作らない。接近とhitはviewer内のasset presentationであり、ゲームplay証拠と呼ばない。

### First-person sword, glove and forearm

画面手前が優先。Bladeは長い鋼の一枚刃で、背・面・鋭いedgeをgeometryとPBR反射で分ける。柄は暗い巻き柄、鍔は小さい深い朱。刀身や前腕をtubeとして見せない。

Gloveは握り拳の各指、親指、手首の接続が分かり、柄への貫通や浮きを通常cameraで確認する。前腕のcloth/leatherの面とfoldは近接で見せられる密度に整える。3状態: `idle`、`swing_horizontal`、`swing_diagonal`。同じfirst-person cameraで、刃の向き、反射、画面遮蔽、手の形を比較する。

### Environment slice — one corner, not an arena

大きい白亜の割れた面と乾いた足元。主要な面、破断、欠損、erosionの順に調整し、micro-noiseで大きな形の不足を隠さない。均等な柱の列、押し出した箱、反復する模様、模型の輪郭は禁止。朱の縦accentは必要な一面だけ。

近景のhero cliff、地面、限定した欠片で一角を構成。遠景の方式は未決: 控えめな低poly台地 / baked背景 / skyboxを、輪郭・parallax・影・修正容易性で比較できる。今回、arena全体へ増やさない。

## Material and export contract

Principled BSDFを基準に、glTF metallic/roughness PBRとして保持できるchannelへ整理する。Blender専用のprocedural node treeを、GLBがそのまま運ぶと仮定しない。必要な表面はbase color / tangent normal / roughness / AO等へbakeし、bake後のassetでも形を再確認する。

Base colorは色texture、normal・roughness・metallic・AOはdata textureとして扱う。UV seam、法線、tangent、negative scale、transform、unit、clip、skin weightsをexport前後で照合する。公式glTF exporterはmesh、Principled material、camera、punctual light、skinning/keyframe animationを扱う。このPCのBlender exporterを実行し、今回使ったmesh/material/camera/skin/actionをGLBで確認済み。その他の機能全般の動作保証には広げない。[Blender glTF documentation](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)

最初のexportは非圧縮GLB。Draco/Meshopt/KTX2を品質問題の切り分けへ混ぜない。最終形が成立した後だけ圧縮やLODの候補を比較する。Blender exporterやWeb側addonを新規取得しない。

## Blender / web parity protocol

1. assetごとにscale、camera world transform、focal/FOV、aspect、frame、action/time、sun方向、shadow、exposureをmanifestへ記録する。
2. 同じcamera・poseをBlenderとThree.jsで再現する。Blender側の見栄え専用lightを使ってweb側との差を隠さない。
3. Blenderのdisplay transformとThree.js tone mappingが異なる場合は、設定を並記する。露出を個別に調整して一致と称さない。neutral比較と作品用の最終lookを区別する。
4. silhouette、scale、normal、色、metallic/roughness、skin変形、接地shadowをside-by-sideで目視確認。差を項目別に記録する。
5. browser側のtexture/GLB load、animation、停止/再開、resize、dispose、外部requestなしを検査する。Technical PASSと見た目の合否は別。

硬い斜光、短く読める影、明るく乾いた空間をA画像から決める。旧R2のcamera/light/sky/shaderは再使用しない。Bloomで素材品質を代替しない。

## Measurement contract

Enemy、Sword/arm、Environmentを個別に記録し、combined sceneの実測も別に出す。未制作・未計測は `null / NOT MEASURED` とし、0として埋めない。

| Metric | Method |
|---|---|
| triangles | export後のmesh primitive index数/3。skinを含む。重複instanceとunique meshを区別 |
| texture dimensions | GLBと外部画像の実寸。種類・channel packing・color spaceも記録 |
| estimated texture memory | 展開後formatとmipmapを前提に概算。圧縮file sizeをGPU memoryと扱わない |
| GLB bytes | 保存したexact fileのbytesとSHA256 |
| draw calls | browserのasset単独/combined、shadow条件付きの実測 |
| animation size | accessor bufferのunique範囲とclip metadataを区別。GLB全体をanimationサイズとしない |
| performance | viewport/DPR/browser/hardware/poseを併記。CPU frame intervalをGPU時間と呼ばない |

参考算式: RGBA8の2048²はbase level 16MiB、full mip込み約21.33MiB。3枚なら約64MiB。これはassetの実測値ではない。品質が成立する前に数値だけを減らさない。

## Human review / gate

最低限: A-NS-R1、EnemyのBlender/browser、SwordのBlender/first-person browser、Environment、combined browser、North Star side-by-side。Enemy 3状態とSword 3状態を揃える。録画を作る場合は5–10秒のasset presentationと明記する。

Human判断は、同じ世界か / 敵を画面へ出したいか / first-person剣が主役として耐えるか / 環境がtech demoに見えないか / BlenderからWebへ品質が維持されるか。大きなNOが1つでもあれば **ASSET PIPELINE NOT READY**。

期待する停止状態は、toolchain監査、3資産候補、parity review、performance記録、R2保全、HUMAN_ASSET_GATE_PENDING。実物がない項目をREADYへ上げない。Full Productionの許可にはならない。

## Escalation rule

Toolchainの問題とasset品質の問題を分ける。Blenderの実体がない間は品質到達可否は未検証。実制作後もNorth Starに届かない場合は、custom manual Blender、permissive base asset、有料asset、3D generation、外部character toolをcost / license / editability / originality / web performance / integrationで比較する。見積やlicenseは対象ごとに確認し、外部取得・購入・登録は実行前にHumanへ提示する。品質目標は下げない。

現時点の実行結果は toolchain audit（参照原本はPrivate保全・候補には非同梱） を正本とする。
