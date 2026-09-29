# CHANBARA PREMIUM PREPRODUCTION VALIDATION R1

2026-09-29 JST · **PLAN READY / HUMAN_PREPRODUCTION_GATE_PENDING**

## 一画面Review

**HumanはPREMIUM 3D PRODUCTION RESEARCH R1とPRIMARYをAccepted。今回完成したのは実装前準備で、Gold品質や素材採用の受入ではない。**

| 判断対象 | 結論と現在の証拠 |
|---|---|
| Production Strategy | **Unity6＋high-quality existing base＋Blender独自化＋animation重点補修＋limited/directional physics**をHuman採用 |
| Unity環境 | **6.3 LTS 6000.3.19f1導入済み**。Hub3.19.4、Windows11、32GB級RAM、RTX4060Ti8GB。exe/metadataのみ監査、起動・buildなし |
| 初回engine構成案 | 既存19f1、URP、D3D11、Windows x64 Mono。Windows IL2CPP moduleは未導入・初回必須にしない。後続25f1は更新候補だけ |
| Base shortlist | **16候補**：Character3 / arms3 / Sword3 / Rock-Cliff3 / Animation4。価格・権利・形式・不足を個別に記録 |
| 検討する組合せ | C1 Shinobi、F1 FPS Arms01、S1 Longsword/Scabbard、R1 Cliff Large Scan01、M1 Synty Sword Combat、必要ならM2 Base Locomotion |
| 費用の見通し | 上記6点の公開表示単純和USD190.48。購入可否/税/規約の未確定、独自化/検収/音/VFX工数を含まない。総費用UNKNOWN |
| AI境界 | 第三者素材・preview・派生render・animationを、許諾未確認のままAI input/解析/改変へ使わない。Human取得でも自動解除なし |
| 制作担当 | Blender造形・weight・key pose編集、素材の実視覚比較はHuman/artist。担当未確定。Codexは原素材を受け取らない汎用コード/設計を支援 |
| 最小validation | Enemy1、Sword/Arm1、Environment1、Lighting、小さいHit VFX。5–15秒のvisual testを設計。Unity sceneは未作成 |
| 最大のリスク | Aの黒い長肢enemyと板状cliffへは大きな独自化が残る。baseを入れただけでNorth Starに届く根拠はない |
| 次の停止点 | Humanがpreproduction計画と補修担当・検証対象を判断。Full Production、全体移植、取得・install・実装へ自動進行しない |

**North Star級を狙うための実行経路と候補は具体化できたが、到達可能性の実物検証はまだ行っていない。** この点は今回の「実装前準備だけ」という指示と整合する。候補のvisual評価は公開商品文面からの仮説で、preview画像のAI評価も行っていない。

## 1. Human Accepted記録

最新Human指示（2026-09-29 JST）を正本として、次を記録する。

| 項目 | 更新する判断 | 更新しない判断 |
|---|---|---|
| [Premium Research R1](../../research/chanbara-premium-r1/CHANBARA_PREMIUM_PRODUCTION_RESEARCH_R1.md) | **HUMAN ACCEPTED** | 当時のFACT/UNKNOWN、実聴/操作未検証という証拠範囲 |
| [PRIMARY推薦](../../research/chanbara-premium-r1/RECOMMENDED_PIPELINE_R1.md) | **PRODUCTION STRATEGY PRIMARY ACCEPTED** | engine/asset導入、購入、Full Productionの実行許可 |
| A-NS-R1 | 採用維持 | 新Art方向、代替North Starの追加 |
| 既存R2 Visual / asset study | 不採用・ASSET PIPELINE NOT READYの記録を保全 | 今回のresearch受入で過去不合格をPASSへ変更しない |
| Steam | Steam利用を想定したlicense/Windows経路を準備 | 登録・販売決定・公開許可は未取得 |

旧研究R1の本文は受入対象のexact成果物として保全し、本書と現在地へ新Human判断を追記する。旧本文にあるHUMAN_PRODUCTION_STRATEGY_GATE_PENDINGは当時の履歴で、この新記録が戦略選択の最新状態。

## 2. 成果物

| 資料 | 判断できる内容 |
|---|---|
| [Unity環境・module計画](UNITY_ENVIRONMENT_AND_MODULE_PLAN_R1.md) | installed/currentと未導入、必要module、patch候補、将来の導入範囲 |
| [Base Asset Shortlist](ASSET_SHORTLIST_R1.md) | 5カテゴリ各3〜4候補、exact SKU、価格、license/AI、format/rig、A適合の不足 |
| [License / AI境界](LICENSE_AI_BOUNDARY_R1.md) | commercialとAIの分離、Human/artistとCodexの分担、原素材をAIへ送らない経路 |
| [Animationデータ経路](ANIMATION_DATA_PIPELINE_R1.md) | locomotion→4phase補修→FBX→Avatar/IK→方向反応→限定physics |
| [最小Scene・7品質Gate](MINIMAL_SCENE_AND_VALIDATION_GATES_R1.md) | Enemy/Sword/Arm/環境各1、5–15秒試験、Aとのside-by-side、各停止条件 |
| [QA・保全](PREPRODUCTION_QA_R1.md) | 文書/権限/独立レビュー、開始時状態との比較、未実施項目 |

## 3. North Starとの比較を制作条件にする

Creative Authorityは[Human採用記録](../../games/chanbara-restart/CHANBARA_A_ACCEPTANCE_R1.md)の **A-NS-R1 / MONOLITH RUSH・朱の断崖**と[作品Bible](../../games/chanbara-restart/CHANBARA_A_VISUAL_BIBLE_R1.md)。原画像（参照原本はPrivate保全・候補には非同梱）を保全する。旧作品のArtを追加参照しない。

全Visual GateでAとUnity候補をside-by-sideにし、silhouette/proportion/material/light/composition/readabilityの差を記録する。Humanが素材画像のAI利用を許可していない間、比較はHuman/artistが直接行う。良いseller render、正常import、valid Avatar、polygon数、60fpsだけで品質を合格にしない。

Gateは **Character → Sword/Arm → Animation → Hit Reaction → Environment → Integrated Gold Scene → Gameplay**。前提としてRights/tool readinessを確認する。5–15秒の自動visual testと通常mouseによるGoldの証拠は別。未実装の今は全Gate NOT EXECUTEDであり、受入待ちはこの計画そのもの。

## 4. Goal / Delta / Keep / Done

- **Goal**：PRIMARYを使い、敵1体・一人称Sword/Arm・環境1区画でA級品質を検証するための準備。
- **Delta**：新しい計画/候補/権利/QA資料、read-only環境audit、現在地の短い状態追記。
- **Keep**：研究R1受入版、A画像、R2全体、既存asset study、Portal/Production/YouTube、既存dirty/untracked/必要ignored、Security判定、HEAD/index。
- **Done**：資料を一括review可能にし、HUMAN_PREPRODUCTION_GATE_PENDINGで停止。次回実装batchの許可を推定しない。

今回禁止を維持：既存Chanbara全体のUnity移植、Full gameplay制作、asset購入/無料download、Asset Store account操作、Steam登録、Unity/module/package導入・更新、stage/commit/push、deploy/public release。sourceasset解析・修正や外部サービス送信も実施していない。Unityが既存でもproject作成・起動の許可には読み替えない。

## 5. 次のHuman判断に必要な具体項目

今回これらへの回答は要求せず、完成した計画のreview対象として残す。

1. **Craft担当**：C1の長肢/無顔化、F1の握り、M1の接地/接触補修、R1の板状大面をHuman自身またはartistが担当できるか。AI素材解析を暗黙の代替にしない。
2. **候補の選択**：16点を一括取得せず、Humanが商品previewとAを比べ、最初に検収するexact SKUを決める。Characterとcliffはpreview一致を未確認のため特に重視する。
3. **権利と操作**：購入上限、無料取得、account、license照合、素材保管/AI遮断、Unity project作成/package解決の対象を明示する。engine更新が要る場合はexact版も決める。
4. **次batchの範囲**：まず取得許可された素材の手元検収から始め、Gate1–5の自己検収、5–15秒のvisual test、通常入力Goldのどこまでを許可するか固定する。GameplayとFull Productionは別判断。

## 6. 証拠と読込範囲

外部URLは各資料に近接配置、閲覧日は2026-09-29 JST。公開商品本文/公式docs/規約を使い、素材をdownloadして検証したようには記録しない。環境のlocal registry/paths/version/module inventoryと、公式の一般要件は別証拠。

読込：最新Human指示/AGENTS/現在地最新Chanbara状態/SECURITY（Authority・Keep）、Playbook§4.2/§8とCreation System/Firewall/Gold/template（process）、A採用/Bible（Creative）、前研究R1（Accepted research）、Unity公式と公開SKU規約（research）。前turnのSTART_HERE関連節の理解を維持し、旧作品Artリンク・他repo素材へ広げていない。Memory検索に現task関連の記録はなく、別Unity projectの情報は使用しない。

主担当が統合と最終責任を持ち、3担当は限定read-only調査/レビューのみ。書込み担当の追加、外部操作の委任なし。実model IDはコンテキスト未提示のため主担当/3担当とも **UNKNOWN**。

## Exact stop

```text
UNITY_PREPRODUCTION_PLAN_READY
ASSET_SHORTLIST_READY
LICENSE_AI_BOUNDARY_READY
ANIMATION_PIPELINE_READY
VALIDATION_GATES_READY
NO_ASSET_PURCHASE
NO_UNITY_INSTALL
NO_GAME_IMPLEMENTATION
HUMAN_PREPRODUCTION_GATE_PENDING
```

追加境界：**NO_ASSET_DOWNLOAD / NO_ACCOUNT_OPERATION / NO_FULL_PRODUCTION / NO_GIT_WRITE / NO_DEPLOY**。READYは準備資料の完成であり、Humanによる素材/実物品質/Gateの合格ではない。
