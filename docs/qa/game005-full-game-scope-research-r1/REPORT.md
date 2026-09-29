# GAME005 Full Game Scope Research R1 — QA / preservation

2026-09-23。文書研究のみ。製品・Slice・stress fixtureは未実装。

Human Reviewは [単一のScope Review](../../games/GAME005_FULL_GAME_SCOPE_RESEARCH_R1.md)。推奨C1全3地区／3住民／2資源と代表中盤Slice Gateの提案であり、ScopeのHuman受入はPENDING。

## Authority・差分範囲

- cwd / Git root：`C:\projects\Web Game Studio`。HEAD authority：`39d2b13d09de5b85eed169fd79a6c3cb78270aef`。
- 書込みは本repo内。新規Review、本QA directory、隔離されたignored検証出力、Currentの今回blockだけ。ゲームsource・asset・save・registry・原build・凍結manifest・既存QAへの書込みなし。
- 開始snapshotはignored `.cache/game005-full-game-scope-research-r1/before.json`。全tracked＋nonignored untracked **3,715files**をhash記録。新規本QA directoryは対象外。既存Currentの全文も開始時に記録。
- Currentは過去内容をそのまま残し、今回blockだけを先頭へ追加。HEAD／local upstream／branch／full indexを比較。remote問い合わせ・fetch・stage・commit・pushなし。過去のactual remote一致は前回postflightの事実であり、今回再確認したとは主張しない。

## 選択した検証と結果

| 検証 | 結果／証拠 |
|---|---|
| MVP凍結入力・再現 | 開始・終了ともPASS。133入力の元bytes一致、隔離再build22派生bytes一致。[開始](mvp-before.json)／[終了](mvp-after.json) |
| Expansion凍結入力・再現 | 開始・終了ともPASS。102入力＋4直接依存、派生12bytes一致。[開始](expansion-before.json)／[終了](expansion-after.json) |
| 原証拠の保全 | Expansion verifierの元scriptは変更せず、本QA内のcopyでbuild／result出力だけを研究専用領域に変更。旧checkpointのtracked reproduction結果を上書きしない |
| 既存worktree・Git | [preservation.json](preservation.json)。Current以外の開始3,714filesのbytes、Currentの既存内容、HEAD／upstream／branch／indexを比較。新規pathも研究scopeだけであることを確認 |
| 文書整合・リンク | Review／QAのローカルリンク、Currentのgit diff --check、配置組合せ数を検証。出典は公式／PLAYER REPORTを区別し、実読したURL・時点・版の限界を記載 |
| 独立review | gpt-6-astraによる研究・Scopeとsource・技術のread-only review。接続／眺望の2択×2択と通常試遊範囲の不一致1件を修正。4構成・16技術状態と、混合構成を含む6通常比較に統一。他のmaterial blocker報告なし |
| 対象Security | [security.json](security.json)。Gitleaks8.30.1、既存config、empty ignore、inline allow無効でReview／Current／新QAのみをscan。全project／index／history／distributionの再検査とは別 |

`node scripts/game005-baseline-verify.mjs`、`node docs/qa/game005-full-game-scope-research-r1/verify-expansion.mjs`で隔離再現を実行。既存の500KB超bundle warningは再現されているが、今回変更・抑制しない。build成功・bytes一致を性能PASSへ読み替えない。

`verify-research.mjs`は今回の開始snapshotに対する検証。将来の別作業後の任意再実行でbaselineを取り直さないこと。`prepare.mjs`は今回の開始時に一度だけ実行したinventory手順で、再実行は開始証拠を上書きするため行わない。`scan-documents.mjs`は秘密値を出力せずfile/type/actionだけを保持する。

## 再利用・未実施・限界

Playbook §4.2の文書変更に応じた検証を選択。ゲームに変更がないため、新しい通常試遊／browser／機能unit／JA・EN画面／responsive／performance／保存テストは実行していない。Acceptedの既存記録を参照した。研究中に新しいbrowser profileや常駐previewを作成・終了していない。

性能値は既存Windows Edge短時間fixtureのみ。競合作品の新しい実プレイ、初見Human計測、30分soak、将来提案したstress fixtureは未実施。時間・制作U・費用案・性能予算は設計仮説。物理iPhone／Safariは**NOT TESTED**のまま、今回の必須Gateにはしていない。

今回のSecurityは変更対象の文書検査。新規候補なら停止する。過去全projectのraw FAILや既存個別判定は変更せず、全repo Security PASSとはしない。S01〜S03の過去承認は当該3件だけ。S04〜S05はhistorical UNKNOWN／UNRESOLVED、前回checkpoint-only risk acceptanceは使用済みで将来へ転用不可。秘密値取得・provider照会・自動削除・rotation・allowlist拡張・scanner緩和は0。

外部操作は公開資料のread-only取得のみ。外部送信・設定変更、stage／commit／push／deploy／public registry／Cloudflare／Ads／App Storeは0。Full Productionへ自動移行しない。

主担当・独立read-only調査／reviewの実モデル：**gpt-6-astra**。追加writerなし。今回の文書技術QA、研究READY、Human Scope Acceptance、公開許可を分離する。

**GAME005_FULL_GAME_SCOPE_RESEARCH_R1_READY / HUMAN_FULL_GAME_SCOPE_DECISION_PENDING**
