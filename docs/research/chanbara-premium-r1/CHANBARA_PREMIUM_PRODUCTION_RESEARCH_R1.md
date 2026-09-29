# TINLUMO / CHANBARA — PREMIUM 3D PRODUCTION RESEARCH R1

2026-09-28 JST · Local research pack · **HUMAN_PRODUCTION_STRATEGY_GATE_PENDING**

## 一画面Review

**資料調査と掲載静止画の分析を完了。競合の連続motion・実聴・操作比較は未実施。** 以下の推薦はこの証拠範囲に基づく制作戦略案で、製品品質やNorth Star到達を実証した結果ではない。

**主推薦：Unity 6＋高品質既存base＋Blender独自化＋既成motionの重点補修＋局所physics。Steam向け小規模premiumを本命候補にして、1体・1剣・1区画のGoldだけを先に検証する。**

**代替：Web無料が必須ならBabylon.js＋Web許諾済み素材＋Blender＋authored motion主体。** Three.js継続も比較したが、既存実装が動くことを継続理由にしない。UEは高品質の有力案で、UE技能/technical artist支援が揃えば順位が変わる。

| Humanが今判断すること | 本研究の回答 |
|---|---|
| 何がボトルネックか | rendererだけでなく、hero形状、変形topology、接地、contact/recoveryの制作工程。20万trisで解決しない |
| どこへ少額投資するか | 良い腕/rigged base/一貫したmotion。重点craftの専門補修は見積が必要 |
| AI 3Dを主力にできるか | hero敵・腕・刀の自動完成は未立証。base/prop探索候補に限定。privacy/AI input権利を先に確認 |
| どの美術方向か | Aを維持したstylized realistic。Mortal Sinの強い様式は研究し、Aを無断変更しない |
| 費用は | 比較候補3点の掲載価格合計$112。剣・音・VFX・独自化等を除くため総制作費ではない。総費用UNKNOWN |
| 期間は | 主案Gold候補約230–560hの計画仮説。週20hなら約12–28週。実績・納期保証ではない |
| 次は | strategy/予算/担当/取得範囲をHuman選択。今回実装は開始しない |

最初に[推薦と7 Gate](RECOMMENDED_PIPELINE_R1.md)、次に[費用とリスク](COST_AND_RISK_MATRIX_R1.md)を読むと判断しやすい。

## 成果物9本

| File | 内容 |
|---|---|
| 本書 | 総合判断、研究の限界、authority、coverage、停止点 |
| [MARKET_COMPETITOR_MATRIX_R1](MARKET_COMPETITOR_MATRIX_R1.md) | 必須5作品、現行価格/レビュー、制作体制、Visual/Motion/Sound/Camera、市場の意味 |
| [3D_ART_PIPELINE_RESEARCH_R1](3D_ART_PIPELINE_RESEARCH_R1.md) | 5制作方式、Concept→Runtime、20万tris問題、AI3D、環境、5 Art Style |
| [ANIMATION_COMBAT_FEEL_RESEARCH_R1](ANIMATION_COMBAT_FEEL_RESEARCH_R1.md) | mouse-direct、慣性/接触、身体動作、motion調達、first-person arms/sword |
| [ASSET_SOURCING_AND_LICENSE_R1](ASSET_SOURCING_AND_LICENSE_R1.md) | 主要market/tool、7具体SKUとカテゴリ、商用/Web/AI条件、Meshy/Tripo |
| [ENGINE_DECISION_MATRIX_R1](ENGINE_DECISION_MATRIX_R1.md) | Three/Babylon/Unity/UE/Godot、tooling、性能/配布/ライセンス |
| [PRODUCTION_PIPELINE_OPTIONS_R1](PRODUCTION_PIPELINE_OPTIONS_R1.md) | 4 pipeline、Web-only/二本立て/Steam-firstの戦略比較 |
| [COST_AND_RISK_MATRIX_R1](COST_AND_RISK_MATRIX_R1.md) | 確認価格、4段階予算案、初期/月額、計画工数、リスク |
| [RECOMMENDED_PIPELINE_R1](RECOMMENDED_PIPELINE_R1.md) | PRIMARY1案、SECONDARY1案、推薦理由、未実施の7 Gate |

追加の[QA・保全記録](RESEARCH_QA_R1.md)は資料の完全性・既存成果保全の証拠であり、新たな製品実装ではない。本Markdown自体がLocal Review入口。専用server・dependency・engineの追加は不要。

## 研究の要点

1. **市場は存在するが、Tinlumoの需要は未検証。** 5作品は同じ物理剣戟ではない。mouse-direct、全身physics、文脈action、moveset編集、roguelike comboを分ける。レビュー数は売上推計に使わない。Mortal Sinの30万本超は公式の自己申告としてのみ記録。
2. **品質を作る役割分担を変える必要がある。** AIはコード・batch処理・検査・比較に使い、hero形状・weight・key poseの専門作業を省かない。assetを買うだけでもArt Directionは終わらない。
3. **動きはhybridが本命。** authored attackと踏み込み、IKによる握り/接地、方向別hit、局所physical reaction、最後のragdollを分担。全hitの吹き飛ばしは身体の因果を失いやすい。
4. **WebとSteamで権利・制作条件が変わる。** 公開GLB配布の条件、Web負荷、native packaging、controller、Deckは別に検証。二製品を同時に作る案は保守負荷が最大。
5. **engine変更はGold前に判断する価値がある。** 現在の技術経路は再利用可能な知見だがsunk costではない。Unity/UEに移っても素材とmotionの課題は残る。

一次資料の例：[BLOODFALL公式](https://steamcommunity.com/app/4219700/allnews/)、[Mortal Sin公式](https://steamcommunity.com/app/1494810/allnews/)、[Threeのgame制作範囲](https://threejs.org/manual/pages/game.html)、[Babylon仕様](https://www.babylonjs.com/specifications/)、[Unity2026価格](https://unity.com/products/pricing-updates)、[Unreal EULA](https://www.unrealengine.com/eula/unreal)、[Meshy Terms](https://www.meshy.ai/terms-of-use)、[Steam Direct](https://partner.steamgames.com/steamdirect)。詳細事実のsource/URLは各文書の該当段落に配置。閲覧日は全て2026-09-28。

## Scope / Authority / Keep

- Goal：個人＋AI中心でNorth Star級の一人称mouse swordplayを現実的に作る方法を調査。制作・販売判断を代行しない。
- Delta：このresearch packと、現在地の短い研究状態更新だけ。数値例や工程は未承認提案。
- Keep：A-NS-R1の採用と原画像、R2 source/bundle/gameplay/media、asset study、既存Portal/Production/各作品/保存/広告/YouTube、既存dirty/untracked/必要ignored成果。
- 最新Human依頼がRESEARCH ONLYへ切替。前回のmanual hero制作案は今回実行しない。BlenderとThreeの輸送成立は既存報告の事実、asset品質はNOT READYを維持。
- Steam premium案は今回明示的に許可された**戦略研究**で、既存無料・広告方針や自作game方針を更新する決定ではない。stock利用も独自game実装と権利条件の確認が必要。
- stage/commit/push/reset/clean/stash/branch変更等のGit書込みなし。status/diff/refs/indexのread-only確認のみ。

## Evidence / Unknown

FACT、DEVELOPER CLAIM、OBSERVED、ANALYSIS/PROPOSALを区別。文書・機能・規約の研究と、実機の性能・実プレイ・Human聴感・商用成果を混ぜない。

| 調査したもの | 今回の確認範囲 |
|---|---|
| 市場5作品 | 公式文書/Steamの公開情報、掲載静止画の確認。音の実聴・プレイなし |
| 価格/規約 | 公開公式ページ。価格は取得時点、SKU/planの個別適合と法務判断は残る |
| AI3D | 現行機能/terms/pricing。画像送信・生成・cleanup比較なし |
| Engine | 公式機能とlicense。install/build比較/benchmarkなし |
| A | repo内のHuman採用画像を直接確認。新画像生成/変更なし |
| 既存3D結果 | 既存REPORTの199,136tris等を引用。再測定なし |
| 売上/収益 | 公式自己申告を限定引用。Tinlumo需要/価格/売上/費用回収はUNKNOWN |
| 人材/時間 | engine熟練度、週稼働、外注単価、修正時間はUNKNOWN。工数は仮説 |

公開情報だけでcompetitorの全camera mode、内部hit stop値、animation/IK/physics比率、音layer、全motion品質は確定できない。これらはUNKNOWNのまま将来検証へ渡す。sourceが古い場合はその日付を併記し、現在仕様と混ぜない。

## 読込・Creative参照の記録

| Source | 範囲 / Role / 目的 |
|---|---|
| 今回貼付依頼 | 全文 / AUTHORITY / research-onlyと9成果物・停止点 |
| AGENTS / SECURITY | 全文 / KEEP・SAFETY / cwd・既存成果・秘密・Git権限 |
| PRODUCTION_CURRENT | 最新Chanbara状態を主使用 / KEEP・AUDIT_ONLY / R2拒否とasset pipeline未達。初回取得は全体で出力切詰めあり、後に冒頭を限定再確認。旧Artリンクは追跡しない |
| START_HERE | §0–2、5–6、16–20 / BUSINESS・SAFETY / 自作game・費用・権利・言語。PhaseはCreation Systemを参照 |
| Playbook | §4.2/8と共通方針 / QA・RECORD / 文書のみQA |
| Creation System / Firewall / Gold / template | Phase/最小readset/quality stop / PROCESS / 新制作権限を得る資料として使わない |
| A acceptance/Bible/原画像 | 当該作品 / CREATIVE_AUTHORITY / Humanが採用したAを維持 |
| 既存asset REPORT | 性能表と未達理由 / AUDIT_ONLY / 20万trisと品質の分離 |
| 外部競合・技術・marketplace | 今回Human指定の調査 / RESEARCH / 属性分析のみ。素材コピー/取得なし |

Memoryは関連語でregistry検索したが該当なし。Memory由来のcreative/工程情報は採用していない。実行model IDは本コンテキストで明示されず **主担当・3 read-only subagentsともUNKNOWN**。役割名や推奨名から推測しない。

## Request coverage

| 依頼節 | 格納先 |
|---|---|
| 1 Goal / 15推薦 | 本書・RECOMMENDED_PIPELINE |
| 2市場 | MARKET_COMPETITOR_MATRIX |
| 3Combat / 4一人称 / 8Animation | ANIMATION_COMBAT_FEEL |
| 5Character / 7AI3D / 9Environment / 10Art Style | 3D_ART_PIPELINE、AI規約はASSET |
| 6Asset sourcing | ASSET_SOURCING_AND_LICENSE |
| 11Engine | ENGINE_DECISION_MATRIX |
| 12Web vs Steam / 13Pipeline | PRODUCTION_PIPELINE_OPTIONS |
| 14Cost | COST_AND_RISK_MATRIX |
| 16Gate | RECOMMENDED_PIPELINE |
| 17Source quality | 各文書の近接sourceリンク・共通閲覧日・UNKNOWN表記 |
| 18成果物 / 19禁止 / 20Done | 本書・RESEARCH_QA |

## Exact stop

```text
PREMIUM_3D_MARKET_RESEARCH_READY
3D_ART_PIPELINE_RESEARCH_READY
ANIMATION_COMBAT_FEEL_RESEARCH_READY
ASSET_SOURCING_RESEARCH_READY
ENGINE_DECISION_MATRIX_READY
PRODUCTION_PIPELINE_OPTIONS_READY
COST_RISK_MATRIX_READY
PRIMARY_RECOMMENDATION_READY
NO_IMPLEMENTATION
HUMAN_PRODUCTION_STRATEGY_GATE_PENDING
```

READYは調査資料の準備完了を意味する。Humanのstrategy選択、asset採用、Gold受入、engine移行、販売・公開の承認は含まない。
