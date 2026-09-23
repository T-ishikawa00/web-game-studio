# Game005 Expansion R1 — checkpoint preflight

2026-09-23。主担当・独立read-only監査の実モデル：`gpt-6-astra`。

Human Authority：[S01〜S03限定承認／S04〜S05 checkpoint-only risk acceptance](../../security/GAME005_EXPANSION_R1_HUMAN_DISPOSITION.md)。後者は **historical UNKNOWN / UNRESOLVED** を維持する。安全性証明、他候補への承認、将来checkpoint／release許可へ転用しない。

## 対象と保全

[Accepted Progression Baseline](../../games/GAME005_EXPANSION_PROGRESS_BASELINE_R1.md)と[凍結manifest](frozen-manifest.json)を追加。Expansion入力／Review102files、既存dependency manifest4files、派生dist12files。受入manifestの元36資材はbytes不変。MVP入力133／派生22、既存未commit作業を保全する。

対象はExpansion本体・QA／Review・研究設計系譜・Human受入／Security資料・本checkpoint資料・新規凍結verifier。旧MVP／R2／R3.2と無関係なGame004／公開／Consent等の未commit作業は収載しない。cache、browser profile、node_modules、TLS、ignored dist、665MBの旧index snapshotも収載しない。一度限りのsetup／implement scriptsはローカルに残す。

CurrentはHEAD本文にGame005 progression／Slice／acceptance／今回freezeの4blockだけを追加した内容をindexへ収載し、worktreeの既存全文を保持する。広いgit add、reset／clean／stashは使わない。開始時3,682filesの保全inventoryはrepo内ignored `.cache/game005-expansion-baseline-r1/before.json`。対象リストはcheckpoint-manifest.jsonで固定する。

## QA

- Accepted MVP verifier：変更前133inputs／22派生buildの完全一致。最終／index照合も別証拠へ保存する。
- Expansion隔離build：受入入力102＋dependency4、派生12filesが元distとbytes一致。[worktree再現](reproduction-worktree.json)。原dist・旧証拠は上書きしない。
- strict TypeScript PASS、[unit22](unit-tests.txt) PASS。既存MVP回帰・4通りの順序／配置・保存再開・idle/work復帰を含む。
- Browser／通常入力2経路動画／性能／JA・EN／mobile viewportは、受入入力・動画の不変を確認して既存QAを再利用。今回browser profileを新規生成しない。Human製品受入を維持するが、Physical iPhone／Safari NOT TESTEDは別判定。
- 新規文書・リンク・staged manifest一致・Current分離・MVP保全・worktree保全をcommit前後に確認する。postflight証拠は1回のcheckpointの後にローカルへ追記し、追加commit／amendはしない。

最終scopeは153paths。indexからのExpansion102入力／12派生、MVP133入力／22派生の照合もPASS。textのGit改行正規化だけを許容し、派生buildはbytes一致。開始3,682filesはCurrent追記以外すべてbytes不変、旧Current本文も完全保持。独立read-only最終レビューは重大blocker0。

`git diff --cached --check` のraw結果はFAILで、採用前から存在した `scripts/model-assets.mjs:15` と `scripts/stop.ps1:12`（いずれもExpansion配下）の末尾空行2件だけ。受入済みbytesを検査都合で変更せず保持する。新規文書／verifierの空白指摘は0。

## Security

- full project ignored-inclusiveは既存の `node scripts/security-scan.mjs all` を使用。初回raw **FAIL／既知6件のみ／新規0**。[初回raw](full-project-initial.json)と[既知6件のexact provenance再照合](security-preflight.json)。既知SHA／TLS／C1〜C4の既存承認を拡張しない。
- 初回full index／local history PASS。[index](index-initial.json)／[history](history-initial.json)。対象stage後にfull indexを再実行し、通常pre-commit hookも実行する。hook bypassなし。
- [TLS・local refs/reflogs・配布検査](boundary-preflight.json)：TLSのパスと内容はindex／確認履歴に不在、既存ignored keyを複製・出力せずメモリ内だけで照合。5distribution scope PASS。post-commitも再確認する。
- S01〜S05の元profileは不存在、元値・fingerprintは未保持。今回のscanで過去5値の不在や再分類を証明したとは扱わない。元raw5FAIL、S04／S05 UNKNOWNを保持する。
- 新規candidateなら即停止。missing scanner／errorでも停止。scanner本体／config／allowlist／hookを変更しない。値・断片・key digestを記録しない。画像／動画OCR、dangling object、外部provider検証は行わない。
- remote metadataを既存Git認証でread-only確認し、[private／main](remote-preflight.json)を検証。origin/mainとactual remote mainは開始HEADと一致。remote設定変更やdeployは行わない。

対象stage前の最終full-project再検査も既知6件だけ、由来の再照合PASS、新規0。153pathsをstage後の明示full-index scanもPASS。commitでは既存hookによるfull-index scanをもう一度行い、その後history／TLS／distributionを確認してから通常pushする。これらの後続receiptはローカルpostflight証拠として保存する。

## 終了条件

今回だけ1 checkpoint、private origin/mainへ普通のpush。成功後HEAD／origin/main／actual remote main／ahead-behind／index／worktree保全をPOSTFLIGHTへ記録する。成功してもFull Game制作・deploy・public registry・Cloudflare・広告・App Store・外部設定変更は行わない。

**GAME005_EXPANSION_PROGRESS_BASELINE_FROZEN / FULL_GAME_SCOPE_RESEARCH_PENDING**。
