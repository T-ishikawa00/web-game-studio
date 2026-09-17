# MVP Portal baseline release — preflight

2026-09-17。実利用主担当/reviewer `gpt-6-astra`。Human Visual Acceptance PASSとcheckpoint/normal push/production deploy GOを受領。

- 開始時 HEAD / origin/main / actual remote main は `cce29ca91f9dd9c5f81c120e94eb2fc872e145cb` で一致。Private `T-ishikawa00/web-game-studio`、main。index空、既存未commit/untracked成果をsnapshot保全。
- 受入れ候補52ファイル/39sourceを再照合。独立read-only review PASS。Copy本文10ページ一致、ゲーム・保存・計測JS・Cloudflare configは不変。既存typecheck/build/対象browser QAを再利用し、旧前提test failure2件は維持。
- 既存正常Production version `90d43a3e-d38f-4738-a7e7-19313d481ea7` / deployment `68bfa6b1-2d16-43db-9993-868c560a6513`。APIで100%配信を確認。
- tinlumo.com zone active、既存Human account一致、Free Website。Workers Freeは同日直前のDashboard確認証拠を再利用（subscription API読取権限なし、拡張しない）。今回は課金・plan APIを呼ばず、static-assets-onlyを維持。[公式静的配信条件](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)。
- 既存Custom Domain：tinlumo.com→tinlumo-production、preview.tinlumo.com→tinlumo-preview。両Workerのworkers.dev/version preview無効をAPI確認。DNS/domain変更は不要。
- Preview version `590239ba-da9d-43b4-835a-57c165fb6e65` / deployment `a75b3b1b-71fe-4abd-93e8-699343c428f2`。Accessはself-hosted、email1件Allow、Everyone/Bypassなし。preview限定disable-RUM rule有効。
- Web Analytics API：manual snippetあり、auto_install=false。設定変更なし。
- 旧公開artifactを保全し、受入れ候補へ既存production projectionだけ適用。新root `.cache/tinlumo-mvp-portal-baseline-r1`。52ファイル、27Portal index設定とrobots/headersだけ変更。配布secret scan0。
- Wrangler4.133.0 dry-run PASS。既存 `config/release-production/wrangler.json` をそのまま使い、`--assets`で今回rootを指定。workers_dev=false、preview_urls=false、assets-only。ログのdisk書込・telemetryを今回child processだけで停止、認証情報や個人表示を出力しない。

## 再現・配信

受入れbuildの再現元は既存 `scripts/public-release-build.mjs` と `.tmp/visual-polish-r1/build.mjs --verify-manual-snippet`。後者は出力/cache/evidence/configパスをVisual用に分離。凍結済みmanifestの各sourceと各fileの一致を必ず確認する。

今回packageは `.tmp/mvp-portal-release-r1/prepare.mjs`。初回だけ新rootへ書き、既存出力があれば停止。ソースのdeploymentHoldは変更せず、今回Human GOをpackage作成時に適用。本番projectionは前回の `.tmp/public-deploy-go-r1/package.mjs` と同一。

checkpoint/push後 `.tmp/mvp-portal-release-r1/wrangler.mjs --deploy`。このhelperはrefs一致・index/作業差分・commit source・配布manifestを検証して既存Wranglerを実行。RepoやReview Packを丸ごとuploadしない。旧公開artifactとPreviewは変更しない。

## Security / checkpoint

全project raw、full index、historyの各結果は `security.json` へ記録。既知raw2件はFAILを維持しHuman dispositionを別記。TLS鍵のindex/history不在を再確認。許可pathだけstageし、旧public-deploy-go-r1未tracked証拠・以前のcheckpoint-postflight・無関係13成果は収載しない。

Production Smokeで障害が出た場合、正常な旧Production versionへ戻して停止する。Accessを外したりPreview/メール/DNS/ユーザー保存/Repo履歴を巻き戻さない。配信後のreceiptやQA追補は未commitのpostflightとして残す。
