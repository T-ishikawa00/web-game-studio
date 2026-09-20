# Public information — Trust & UX R2

R2の有効な生成入口は `node scripts/trust-ux-build.mjs`。出力は `.cache/tinlumo-trust-ux-r2` のローカルレビュー専用。deploy機能・production modeは持たない。旧3本のpublic buildと旧astro.public.configは、書込み開始前に停止してこの入口を案内する。旧配布物と過去の証拠は保持。

|情報|正本|導出されるもの|
|---|---|---|
|ID、slug、正式名称、長い説明|`src/data/games.ts` のregistry（既存identityとGame004 releaseを参照）|Home・詳細・Playの作品同一性|
|公開選択、配送形式/version、カード短文|`src/rc/public-catalog.ts` のpublicSelection|4作品一覧、件数、ルート、全ての他作品、Home/About/Terms/言語入口の件数|
|ゲーム別の操作・保存差分|同public-catalogのgameFacts / magnetSave、旧3作品の既存profile / save-copy|詳細と必要なPrivacy/Termsの説明。ゲーム内容から独立した勝手な文言変更はしない|
|運営者、問い合わせ、配信・計測・保持説明|`src/rc/site.json` のpublicLaunch|Contact/Privacy/Terms/Credits。古いapproval/release履歴は公開可否の判定に使わない|
|動画方針、改定概要、文書の日付|`src/rc/public-documents.ts`|日英動画ページとTerms/Privacy/Videoの版表示|
|レイアウトとリンク|`GameCards.astro`, `PublicOperations.astro`, locale route, `MagnetPlay.astro`|Astroで直接生成。件数や本文の生成後置換はしない|
|採用済みゲーム配布資材|`docs/qa/game004-magnet-release-r1/distribution.json`|26 payload/assetをhash照合後に限定コピー。ゲームソースの再ビルドなし|

SEOと既存Analyticsの公開ID設定にだけ、既存 `publicHtml` を再利用。これは本文・件数・relatedの置換ではない。local hostでは、元のAnalytics runtimeのguardとserver CSPにより外部計測は送らない。元のmanual opt-inコード、measurement、Cloudflare設定は不変。

`softLaunchPolicy.freeGames` と未使用の `publicLaunch.videoPolicy` nullを削除し、重複する可変値を除去した。過去Human判断の説明文は履歴として残す。これらを現行公開copyやR2の承認に解釈しない。

Game005時はregistryのmetadataとpublicSelectionの1項目を追加する。件数・共通本文・相互リンク・静的ルートを各所で手動置換する必要はない。新しいゲームの操作/保存説明、採用payloadとmanifest、必要なら配送adapter、個別Creditsの確認は引き続き必要。現在の `gameFacts` は旧3作品とMagnetに対応しており、新ゲームの仕様を推測しない。Portal全体や旧Previewのregistryを再設計していない。

MagnetのPlayは、採用済み全画面launch HTMLに対応する `MagnetPlay.astro` から出す。参照するJS/CSSは採用manifestで検証する。上部の既存Detailsへの戻りを保持し、結果画面には日英併記の他作品リンクだけを追加した。ゲーム内の言語切替が独立しているため、このリンクは常に両言語を表示する。

## 日付と公開への引継ぎ

文書のpreparedは実装草案の日付2026-09-20。effective / lastUpdatedはnull。ブラウザには「改定案・未適用」と実際に表示する。build時の今日を適用日に流用しない。Human全文確認後、実際の公開作業で適用日・最終更新日を確定し、重要変更の案内を公開する。R2の技術QAは法的適用の証明ではない。公開用packagingを行う将来タスクではnull・未確定文を拒否し、local noindexから公開SEOへの変更も別途確認する。今回、公開packaging/deployは実行していない。

## 運用への引継ぎ

- 一般問い合わせ：既存の通常返信方針を適用。不具合情報は作品名・端末/ブラウザ・症状のみを必要範囲で求める。
- 運営者情報：実名/住所はHumanの非公開管理を維持。照会だけの本人確認書類は原則不要として回答を準備する。全法域で照会方式だけで足りるとの判断はしていない。
- 個人データ請求：受付日・請求種別・適用法と期限・必要最小限の本人確認・回答/保持例外をHumanが管理。新たな外部台帳やメール送信は作成しない。
- 90日目安、月次未解決確認、合理的例外、provider trash/backupsの制限を維持。実運用実施済みという証明は追加しない。
- consumer Gmail契約、EEA/UK適用・代表者等の監査未確認は残る。SMTP導入・外部初見を必須ゲートに戻さない。
