# Distribution R1 — QA / evidence

2026-09-27 JST。変更は隔離Distribution Packと現在地への追記。媒体・ゲーム・Portal・保存・広告・Consent・Productionの変更なし。今回の技術確認とHuman Distribution Gateを分離する。

|確認|結果|証拠と限界|
|---|---|---|
|Phase1 / HOLD / 除外|PASS|固定順15、EN8/JA7、5作品各3、3形式各5、最初の5投稿で5作品。HOLD15とDO NOT POST60は別状態。選択hashと除外hashの交差なし。|
|日程|PASS|9/28 00:00開始、10/16 00:00終了。19暦日、休4日、間隔24/28/44h、JST固定。予定と実予約は別列。|
|媒体|PASS / preserved|全30本のdelivery SHA256一致、1080×1920/30fps、15組の同一AAC/timing。新encode/remux/audio変更0。[media-verification](internal/media-verification.json)。|
|全尺・音|REUSED + sample PASS|[元Pack全30本の1x再生](../youtube-relaunch-r1-2026-09-27/public/reports/media-qa.json)、[音QA](../youtube-relaunch-r1-2026-09-27/public/reports/audio-qa.json)を同一hashで再利用。今回のReviewでもG01 ENが19.2秒の終端まで再生しerrorなし。今回の新しい実聴評価ではない。|
|冒頭/cover|REVIEWED WITH WATCH|全30本×4＝120フレームをPyAV18.1.0でdecodeしPTS記録。JA/ENとカバーを目視。G08/G09の黒領域、G10/G11の上端文字、G13の右端橋はWATCH。原本無変更。[監査詳細](public/cover-audit.json)。|
|ブラウザー媒体|PASS|30metadata、120seek。1080×1920・duration一致。[browser-qa](internal/browser-qa.json)。ブラウザーseek直後のcanvasは直前frameを返す場合があったため、監査画像はoffline exact PTS抽出へ修正。|
|レビューUI|PASS|15selector全件のtitle/description/hash/path/counterpart表示一致。前後循環、コピー両項目、0.5秒coverseek、G01再生完了。コピー確認後clipboardを復元。[ui-selection](internal/ui-selection.json)、[ui-qa](internal/ui-qa.json)。|
|レイアウト|PASS within browser|1440/768/390pxでpage水平overflowなし。768pxは1列へ調整後再確認。実機試験ではない。|
|監査UI|PASS|exact framesと参考UI表示。高速切替で旧描画が残る競合を見つけ、render世代ガードを追加。3行のみ表示することを再確認。|
|Excel|PASS in Artifact Tool|4sheet/15post/60snapshot。未知→UNKNOWN、実測0→0、0と100の平均→50、実公開時刻→期日を検証。試験入力は全て復元、formula error 0。全sheetをrenderして目視、折返しを修正。[workbook-checks](internal/workbook-checks.json)。Native ExcelはNOT TESTED。|
|Server / routes|PASS|loopback127.0.0.1:4466のみ。8HTTP経路、MP4 range206、internal/secret様path/不正media非公開、self-only CSP。外部送信コードなし。ブラウザーwarn/error0。[verification](internal/verification.json)。|
|保全|PASS|開始前保護3653files中3652はSHA256不変。PRODUCTION_CURRENTだけprefix追記、従来bytes完全保全。HEAD/branch/upstream/full index不変。元々変更済みdistribution-security.jsonも不変。|
|独立レビュー|COMPLETE|在庫/hash/選択・日程・copy・台帳のread-only監査、公式仕様調査。コピー2点修正済み。[independent-review](internal/independent-review.json)。|
|Scoped Security|SCOPED PASS|Gitleaks8.30.1、新規PackとCurrentを検査、候補0。設定変更/ignore拡大/bypassなし。新規コード、台帳、抽出画像等を含む。[security](public/security.json)。|
|全体Security|UNCHANGED|既存full raw FAIL22、historical11、S04/S05 UNKNOWN維持。full index/history scanは今回NOT RUN（stage/commit/pushなし）。Scoped PASSで全体PASSへ置換しない。|
|Public channel|READ ONLY OBSERVED|Tinlumo/@tinlumo、brand、tinlumo.comリンク、コンテンツなし表示。公開ページ上で旧動画/duplicate表示なし。Studio予約/非公開/限定公開はUNKNOWN。[channel-check](public/channel-check.json)。|

## 実施しないチェックと理由

- `npm run check/build/test/test:routes` のゲーム全体suite: Production/runtime/source変更がないため未実施。今回の隔離viewerの構文・媒体・routes・UI・台帳・保全を対象に検証。
- YouTube upload、reservation、publish、channel設定、platform transcode/crop/chrome、実アカウントcover selector: 今回は準備のみのため未実施。実行工程の承認後に既存Studio一覧と重複を最初に確認する。
- 実機iPhone/Android/Safari、Human実聴、Native Excel: NOT TESTED。ブラウザー幅検証・既存媒体証拠・Artifact Tool計算をその代替PASSとはしない。
- 本番live再deploy/変更、Git stage/commit/push、LAN/tunnel/証明書/Firewall変更、計測サービス導入: 全て0。

## ローカル補助物

`node_modules`は既存bundled artifact-tool依存へのrepo内junction。フレーム検証用PyAVはrepo内 `.tmp/youtube-distribution-r1/python` へ隔離導入。確認用のPNGとcontact sheetは既存MP4のdecode結果であり新規宣伝アートではない。新規依存導入・一時出力はrepo内のみ。Securityの新規Pack scopeからbundled依存junction・PyAV本体は除外し、任意binary/OCRまでの証明は行わない。

実利用model IDは主担当・read-only2名ともUNKNOWN。環境にIDが公開されないため、推奨名を実利用名として報告しない。

**HUMAN_DISTRIBUTION_GATE_PENDING**。技術的な準備完了は予約実行権限ではない。
