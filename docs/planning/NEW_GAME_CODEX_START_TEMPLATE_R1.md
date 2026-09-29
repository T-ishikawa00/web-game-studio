# New Game Codex Start Template R1

2026-09-28 · **NEW_GAME_CODEX_TEMPLATE_READY / HUMAN_PROCESS_GATE_PENDING**

Game008 / 009等にも使うGreenfield開始依頼。以下をコピーし、角括弧を埋める。未記入は許可ではない。新作の番号はローカルregistry／台帳で確認する。過去の実行許可・画像採用を流用しない。

---

# [Working title] — GREENFIELD NEW GAME START

この依頼は新作の[許可Phase、未指定ならPHASE 0のみ]。既存作品の見た目を既定にせず、[TINLUMO_NEW_GAME_CREATION_SYSTEM_R1](TINLUMO_NEW_GAME_CREATION_SYSTEM_R1.md)と[Firewall](GREENFIELD_VISUAL_CONTEXT_FIREWALL_R1.md)、[Gold基準](GOLD_CRAFT_SLICE_STANDARD_R1.md)を適用してください。

## Goal / Delta / Keep / Done

- **Goal:** [プレイヤーに感じてほしいこと／Portalに加える価値]
- **Core concept:** [操作、目標、目に見える変化、再挑戦理由]
- **Delta:** [今回作る文書／画像案／承認された実装範囲]
- **Keep:** 既存ゲーム、Accepted素材、Portal、Production、save、Consent、広告状態、YouTube、未commit／untracked／必要なignored証拠。
- **Done:** [今回の提出物]を一括でReview可能にし、[明示Human Gate]で停止。空欄ならPHASE_0_PRODUCT_ROLE_READY / HUMAN_PRODUCT_ROLE_GATE_PENDING。主要Visual実装へ進まない。

## 環境・権限

- cwd / Git rootは `C:\projects\Web Game Studio`。不一致は停止。
- 書込みと一時出力はrepo内だけ。既存profile、Memory、global設定、他repo、既存Skillは変更しない。
- branch / HEAD / upstream / index / dirty / untrackedと必要なignored証拠を保全。reset / clean / stashで消さない。未push成果を古いremoteへ戻さない。
- stage / commit / push / deploy、外部API送信、公開、投稿、YouTube変更、広告、購入・契約、LAN・TLS・Firewall・tunnel操作はこのテンプレートからは許可しない。個別に明示された権限だけを使う。
- 依存追加：[未指定なら追加しない]。共通Runtime／保存／registry変更：[未指定なら変更しない]。
- Securityを適用し、秘密の値・断片を出さない。既存raw FAIL・限定判定・UNKNOWNを維持。新規候補はfile/type/actionのみで報告し、影響操作を停止。
- 通常previewはloopbackのみ。既存serverを停止しない。起動する場合は専用port・所有PID・起動停止手順を記録。

## 最初に読む／読まない

最新Human依頼、AGENTS、PRODUCTION_CURRENTの最新関連状態、SECURITY全文、新制作方式・Firewall・Gold基準を読む。START_HEREは共通の事業・品質・言語・static-heavy・権利等、Playbookは共通方針・§4.2・§8に限定し、[FirewallのRead Set](GREENFIELD_VISUAL_CONTEXT_FIREWALL_R1.md#1-最小read-set)に従う。

既存Hakorilo／Lightwork／Two Ways／PROJECT MAGNET／Island、旧North Star／Remaster／Visual Language、procedural造形、palette、world composition、UIの外観、motion、asset styleはデフォルトのCreative参照にしない。Memoryや過去chatにある好みも自動採用しない。

読込前に `source / exact section / role / purpose / authority / outcome` の台帳を用意する。保全用の旧資料はKEEP、技術部分はINFRA、原因調査はAUDIT_ONLY。これらをCREATIVEに昇格しない。

## この作品のCreative Authority

Human latest judgment → Human Accepted Visual North Star images → Game-specific Visual Bible → Human Accepted Gold Craft Slice → Game-specific gameplay/feel spec → Common technical standards → Existing implementation patterns。

安全・Security・費用・権利はこの順位とは別に常時適用する。

```text
Human latest judgment: [対象・日付・原文・範囲]
Accepted Visual North Star: [exact image path/version + Human採用記録、無ければNONE]
Game-specific Visual Bible: [path/version、無ければNONE]
Accepted Gold Craft Slice: [path/version + Human採用記録、無ければNONE]
Creative imports: NONE
```

既存のCreative参照を意図して採用するときだけ、Humanが次を埋める。

```text
IMPORT_REFERENCE:<specific item>
Exact source / version: [対象]
Allowed attribute / purpose: [範囲]
Excluded attributes: [持ち込まない要素]
```

未記入・AIによる提案・「既存品質を参考に」はCreative import承認ではない。

## Reuse

- **A — INFRA REUSE:** 見た目へ影響しないbuild/test/save safety/pause/security/localization/pure utilitiesは既定で可。機能契約と範囲を記録する。
- **B — MECHANIC RESEARCH REUSE:** [対象候補、なければNONE]。再利用前に、新作feelを旧速度・閾値・テンポへ固定しないか主担当が明示レビューする。
- **C — CREATIVE / VISUAL REUSE:** デフォルト不可。Humanのspecific importがない限り、mesh/material/shader/colors/layout/proportions/animation/HUD/VFX/visual componentを再利用しない。

## 今回の工程

1. **PHASE 0:** Product Roleを定義。既存作との体験差、replayability、first 30 seconds、Shorts potential、target session lengthを含める。実装しない。
2. **PHASE 1が今回許可されている場合だけ:** 原則3〜5方向の実ゲーム画面Concept。camera/player view/enemy scale/environment/lighting/materials/colors/VFX/composition/UI densityまで比較可能にする。許可がBriefまでなら文書で止め、Human/ChatGPTへ画像生成を渡す。コードでConceptを代用しない。
3. **画像採用後の別工程:** 当該画像からVisual Bibleを新規作成。主要Visual実装はAccepted画像・Bible・実装範囲の許可が揃ってから。
4. **Gold制作が許可されている場合:** 小範囲をFinal-quality visual/motion/sound/interaction/feedbackへ仕上げる。通常Play、自己調整、QAを完了し、一括Reviewへ。mechanics demoをGoldと呼ばない。
5. **Human Gate:** 最初の画面、操作感、North Star一致、独自性、15秒Shorts、続きを望むかの6問。Human Accepted後だけFull拡張へ。全編・実機・初見・権利・公開等は別判定。

## 自己評価・提出順

第一画面、冒頭3秒、約15秒の未編集実gameplayを確認する。1秒の理解、大きな変化、visible payoff、Beginning → Action → Payoffを記録する。第一印象が弱ければTechnical PASSでも **CREATIVE NOT READY**。

報告は `What it is / What changed → Play URL → screenshot/video → Human Craft判断 → known visual/gameplay concerns → technical QA → implementation/hash/Security` の順。未実装の段階ではPlay／映像はN/Aと明記する。

観察事実／設計仮説／UNKNOWNを分ける。実機、Human聴感、初見、市場性、採用を自動テストでPASSへ広げない。主担当が最終統合を担い、実利用model IDは取得できた値だけ記録し、不明ならUNKNOWN。

**[今回のDone / Human Gate]で停止してください。** 次Phaseを独断で始めず、同じ承認範囲内の局所作業は工程ごとの確認待ちにせずまとめて完了してください。

---

## 利用例（許可の代わりにはならない）

| 例 | 埋め方 |
|---|---|
| 008、発案だけある | PHASE 0のみ、Accepted画像NONE、Creative imports NONE、Product Role提出で停止 |
| 009、方向比較まで依頼 | PHASE 0＋1のBriefまで、3〜5案、画像はHuman/ChatGPTの次工程 |
| 採用画像から小範囲を作る | 画像のexact版とHuman採用記録、Bible、Gold実装範囲を指定。既存作品を保全しHuman Craft Gateへ |
