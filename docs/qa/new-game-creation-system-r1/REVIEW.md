# Tinlumo New Game Creation System R1 — Human Process Review

2026-09-28 · **HUMAN_PROCESS_GATE_PENDING**

新作の完成像を画像で選んでから、小範囲の完成品質を作る制作方式へ整理した。既存R1は技術研究として保全し、新作のVisual / Feel / Product Directionから外した。今回のReviewは制作方式と4案の画像生成Brief。新しいゲームPlayやConcept画像はまだない。

**[Local Reviewを開く](http://127.0.0.1:4474/)**。A〜Iを一画面の切替で確認できる。文書は以下から独立して読める。UIは工程の説明だけで、コード製のVisual Conceptではない。

## A. Root Cause

旧依頼はNorth Star／Remasterの学習、明るい稽古場・玩具的闘技場、三方向選考へ戻らない一候補を指定し、実際の読込経路も確認できた。1vs1・Parry中心も当時の試験条件。既存資料そのものが画風の統一を強制したとは言えず、Art componentの直接importも確認できない。

問題は、**技術検証用の仮仕様と製品品質の見本を、同じ「Core Feel / Quality Slice」で扱ったこと**。新作専用のAccepted画像がなく、技術評価に対して第一印象・独自性・Shortsの評価が弱かった。旧finalにはPlayと画像が先にあり、Human未判定も明記されていた事実は残す。

[監査全文](ROOT_CAUSE_AUDIT.md) / [原依頼抜粋とread trace](HISTORICAL_EVIDENCE.md)。断定できない影響はHYPOTHESIS、未取得の内部履歴等はUNKNOWN。

## B. Old process → New process

**Product Role → Visual Direction 3〜5案の画像選択 → 新作Visual Bible → Gold Craft Slice → Human Craft Gate → Full Production。**

Phase 0でゲーム実装しない。Human Accepted画像がないまま主要Visualを実装しない。旧A–Fの中後半検証・逆算・全編Human受入は維持。旧H1はGold自己試遊とHuman Craft Gateへ統合し、H2/H3との対応を明記した。

[制作方式の正本](../../planning/TINLUMO_NEW_GAME_CREATION_SYSTEM_R1.md)。

## C. Context Firewall — 今後読む／読まない

| 区分 | 資料 |
|---|---|
| **既定で読む** | 最新Human依頼、AGENTS、Currentの最新関連状態、SECURITY全文、新制作方式・Firewall・Gold基準・開始template、当該新作の資料 |
| **共通部分だけ読む** | START_HERE §0・5〜7・16〜20の事業・品質・言語・static-heavy・権利。Playbook §1・4.2・8。旧H1/H2の対応が必要なときだけ§2 |
| **必要時に読む** | 保存namespace/version/破損保全、pause/accessibility/performance/browser制約、Portal/runtimeの技術契約、対象テスト。Secret/Gitの追加資料はその作業時 |
| **デフォルトでCreative参照しない** | Hakorilo / Lightwork / Two Ways / PROJECT MAGNET / IslandのArt/Craft、旧Visual Language、旧North Star/Remaster、procedural造形、palette、world、UIの見た目、motion、asset style、R1の道場・竹/木・敵構成・1vs1テンポ |
| **Humanのspecific import時だけ** | `IMPORT_REFERENCE:<specific item>` で指定された具体物・版・属性。指定外は継承しない |
| **今回の監査だけ** | 旧依頼・read trace・R1 source・旧資料の関連箇所はAUDIT ONLY。新BriefのCreative Authorityにしない |

[詳細Read Set・例外・台帳](../../planning/GREENFIELD_VISUAL_CONTEXT_FIREWALL_R1.md)。AGENTSとPlaybookにこの入口を追加し、旧「新作」汎用ルートの重複を解消した。

## D. Reuse classification

- **A — INFRA / DEFAULT ALLOWED:** build/test/save safety/pause/security/localization等、Visualへ影響しない機能。
- **B — MECHANIC RESEARCH / EXPLICIT REVIEW:** 剣入力・collision等。新作feelを旧挙動へ固定しないか再利用前に確認。
- **C — CREATIVE / VISUAL / DEFAULT DENIED:** mesh/material/shader/colors/layout/proportions/animation/HUD/VFX。Humanのspecific importが必須。

混在componentを丸ごとA扱いしない。R1はPointer Lock、mouse→sword、sweep collision、sword contact、pause/resume、基本SE実装・QA知見だけが候補。

## E. Authority hierarchy

Human latest judgment → Human Accepted Visual North Star images → Game-specific Visual Bible → Human Accepted Gold Craft Slice → Game-specific gameplay/feel spec → Common technical standards → Existing implementation patterns。

安全・Security・Git・費用・権利は常時適用。既存作品のVisual Authorityは自動参加しない。

## F. Gold Craft Slice

**範囲は小さいが、HumanがそのままFinal Productの一部として受け入れられる品質。** Final-quality visual/motion/sound/interaction/feedbackとNorth Star一致、実プレイが必須。

Codexもfirst screenshot / first 3 seconds / 約15秒のunedited gameplayを見て評価する。1秒の理解、大きなvisual change、visible payoff、Beginning → Action → Payoffを確認。弱ければ技術PASSでも **CREATIVE NOT READY**。

[Gold基準・証拠・報告template](../../planning/GOLD_CRAFT_SLICE_STANDARD_R1.md)。

## G. Human Gate

今後のGoldでHumanが通常Playする6問：最初の画面で遊びたいか／操作して気持ちいいか／North Starに見えるか／旧作の焼き直しでないか／15秒Shortsに成立するか／続きを望むか。

**今回の判断対象は新制作方式とBriefの内容。** 方式を採用しても4案の画像は未生成・未採用。次はHuman / ChatGPTで画像化し、実画像を見て選ぶ。R2実装やFullへは進まない。

## H. Chanbara 4案

| Direction | 画面と反応 | 懸念 |
|---|---|---|
| A · MONOLITH RUSH / 朱の断崖 | 白亜の崖、黒い長肢、硬い日差し、鋼。一振りで体ごと方向へ飛ぶ | 汎用闘技場化、黒つぶれ |
| B · INK TEMPEST / 墨嵐 | 3Dの墨のfighter、岩壁と余白、筆線の崩れ | 平面ポスター化、hitと装飾の混同 |
| C · PRISM BREAK / 光晶回廊 | 暗い長い回廊、晶面の肢体、大きな扇状の破片 | 輪郭と可読性、描画負荷 |
| D · SKY RIBBON / 空裂くリボン | 高空の張力、布帯のstick fighter、打撃方向へ全身がほどける | 斬撃感不足、帯の遮蔽 |

各案に指定15項目とVisual AI用の指示を用意。16:9・同じhit局面・近中遠の3体で比較し、色替えだけにしない。敵数は画像比較条件でありゲーム仕様の採用ではない。

[Phase 0 Product Role](../../games/chanbara-restart/PRODUCT_ROLE_R1.md) / [4案の全文・画像生成hand-off](../../games/chanbara-restart/CHANBARA_VISUAL_DIRECTION_BRIEF_R1.md)。

## I. Future Codex Template

[NEW_GAME_CODEX_START_TEMPLATE_R1](../../planning/NEW_GAME_CODEX_START_TEMPLATE_R1.md)。Game008/009でも使える。未記入ならPhase 0のみ、Accepted画像NONE、Creative imports NONE。既存許可やAI提案から次Phaseを自動開始しない。

## 検証・保全・起動

検証の詳細と未実施理由は [QA](QA.md)。既存R1、既存ゲーム、Portal、Production、保存、Consent C、YouTube、AdSense、依存、旧Security判定は保全対象。ゲームのbuild・全編再試遊は今回の文書変更に対して実施しない。

Local Reviewは `127.0.0.1:4474` のみ、専用Node process。`internal/server.json` に所有PID・script・開始時刻を記録。配信はこのReviewと指定した新規Markdownだけ。repo root・source・internal・既存R1・鍵は配信しない。

repo内で起動する場合は、既存4474の所有を確認してから以下を実行する。port使用中なら別processを停止しない。

```powershell
Set-Location -LiteralPath 'C:\projects\Web Game Studio'
node docs/qa/new-game-creation-system-r1/scripts/server.mjs
```

停止は自分で前景起動したterminalのCtrl+C、または `internal/server.json` のPIDと `scripts/server.mjs` のprocess command lineを照合した上でそのPIDだけを停止する。他のpreviewには触れない。現在のserverはHuman Review用に起動したままにする。

## 完了状態

```text
NEW_GAME_CREATION_SYSTEM_R1_READY
ROOT_CAUSE_AUDIT_READY
VISUAL_CONTEXT_FIREWALL_READY
REUSE_CLASSIFICATION_READY
GOLD_CRAFT_SLICE_STANDARD_READY
NEW_GAME_CODEX_TEMPLATE_READY
CHANBARA_VISUAL_DIRECTION_3_TO_5_READY
NO_CHANBARA_R2_IMPLEMENTATION
HUMAN_PROCESS_GATE_PENDING
```

Human Review待ちで停止。実Concept画像生成、R2 gameplay、依存追加、既存ゲーム・Portal・本番・外部サービスの変更、stage / commit / push / deployは今回0。
