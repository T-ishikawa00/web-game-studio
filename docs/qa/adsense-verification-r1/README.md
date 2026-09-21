# Tinlumo AdSense ownership meta — production release

2026-09-21。Humanは指定したAdSense所有確認metaの追加に限り、checkpoint commit / normal push / production deployを明示許可。GoogleのVerify / Request review、広告JS、Auto ads、実広告、CMP変更は対象外。

正本は既存 `scripts/trust-ux-build.mjs --production`。公開head metadata処理で指定metaを1個だけ追加する。rootと日英の公開33ページが対象。共通publicHtmlやAstro Layout、本文、ゲームpayload、404、Analytics opt-in、CSP、Cloudflare設定は変更しない。通常local buildではタグを追加せず、Previewをdeployしない。

公開artifactは従来の `release-artifacts/tinlumo-trust-ux-r2`、manifestは `docs/qa/tinlumo-trust-ux-r2-release/distribution.json` を維持。新しいsource-of-truthや別配信経路は作らない。以前の版はGit `a2f8d3985c02d15f2952a734c360b5a8ae761a70` に保持される。

[対象QA](QA.json)：production/local build、既存R2 integration 4件、全64配布ファイルの比較。33ページはmetaを除去すると直前commitのbytesと一致し、残る31ファイルは完全一致。local/Preview候補64ファイルと無関係な既存差分を保全。ゲーム挙動・型の変更がないため全57問再生/215unit/既知旧試作型12errorsの再検査は行わない。意味のある差分検査と既存4統合テストを実施。

local再buildはmetaなしを確認したが、公開前の歴史的候補と現在のsourceの日付/動画文面の差で6ページが更新された。保存済みの文案を根拠にその6ページを再構成し、開始時SHA256との完全一致を全件確認して原状へ復元した。manifestも元bytesへ戻し、Previewの公開操作は行っていない。

Securityは全project（ignored含む）、配布物、full index、local historyを個別検査する。raw全projectは既知判定済み2FAILを保持し、新規候補があれば停止。TLS鍵はignoredかつindex/history不在。scanner/hook/例外は変更しない。提供されたmetaのPublisher IDは公開用識別子であり認証秘密ではない。

公開先は既存Worker `tinlumo-production`、Free構成、workers.dev / version Preview URLs無効。Wrangler 4.133.0の既存configと正確なassets root、keep-varsを使用しdry-runを先行。既存Preview Workerのversionを前後比較。直前production versionは `9a1d5f5a-3419-439b-a3b3-ef73aadceb34`、deployment `8a3cafad-3936-41bb-94e2-41367aa410eb`。この版を復旧基準として記録するが、rollbackは実施しない。

checkpointは今回のbuild source / manifest / 33HTML / このREADME / QAだけ。Currentの既存未commit追記、広告pilot、Provider調査、過去QAや動画を混入させない。実反映のSHA/version/deployment/HTML確認は後続のローカルPOSTFLIGHT.mdへ記録し、二度目のcheckpointは行わない。

主担当・独立read-onlyレビュー：gpt-6-astra。技能：[Cloudflare](C:/Users/PUBLIC_USER/.codex/plugins/cache/openai-curated-remote/cloudflare/0.1.2/skills/cloudflare/SKILL.md) / [Wrangler](C:/Users/PUBLIC_USER/.codex/plugins/cache/openai-curated-remote/cloudflare/0.1.2/skills/wrangler/SKILL.md)。[Cloudflare CLI公式](https://developers.cloudflare.com/workers/wrangler/commands/workers/)。

この反映は所有確認タグの公開であり、AdSenseサイト承認・H5承認・実広告・収益性のPASSではない。
