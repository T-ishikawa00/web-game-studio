# Tinlumo Content & Trust Polish R1

**TINLUMO_CONTENT_TRUST_POLISH_R1_LOCAL_READY / HUMAN_COPY_REVIEW_PENDING**

日英の推奨文面を実ページへ反映。採用済みレイアウト・ゲーム・Cover・ロゴ・ルート・保存・Consent C・広告状態を維持しています。stage / commit / push / deploy / 本番変更はありません。

- 一括Review: http://127.0.0.1:4416/review/
- 候補JA/EN: http://127.0.0.1:4416/ja/ / http://127.0.0.1:4416/en/
- Before: http://127.0.0.1:4417/ja/ / http://127.0.0.1:4417/en/
- Candidate: release-artifacts/tinlumo-content-trust-r1 — 101 files / 39 routes + 404
- Build: node scripts/visual-remaster-build.mjs --candidate content-trust-r1
- Preview: node tinlumo-content-trust-r1/scripts/server.mjs — loopback only, noindex HTTP header and local CSP. Internal/private directories are not served.

## 推奨とKEEP

共通帯は「無料・インストール不要。 / Free to play. No installation needed.」。Home/一覧/Studio/共通帯/404/metaから宣伝の固定総数と恒常的な無広告訴求を除きました。無料・登録不要は実態どおり維持。採用済み英語ブランド見出し、Magnet JA summary、Island JA/EN summary、良いDetail本文はKEEP。

カードは作品ごとに操作と結果を伝えます。DetailはHakoriloの時計・出発/編集、Lightworkの鏡と受光器、Two Waysの1人用同時操作、Magnetの左ボタンと2本指、Islandの出荷による資金を説明。設定のwithout permissionは任意analyticsの説明へ限定。Hakoriloは走行位置を保存しない点と作品別の消去範囲も明示。

## 法務差分の独立Review

広告は「現在、広告は配信していません / We do not currently serve ads」へ明確化。Privacyの旧sessionStorage説明は現行の一時メモリと保存対象の区別へ修正。旧版の案内設定が残る可能性を説明し、進行消去の場所を現行に合わせました。利用目的・保持期間・請求窓口・運営者・provider・問い合わせ情報の広告/AI学習不使用・Consent C・既存有効日は保全。差分はpolicy-diff.jsonで一対一比較。法的適合の包括PASSではなくHuman確認待ち。

## QA

- 対象Astro check: 0 errors / 0 warnings / 0 hints。既存root + integration 276 tests、現行Consent C 8 tests PASS。
- 日英40ページのBefore/After DOM・title・description・OG・alt・aria抽出。各情報ページdescriptionは固有。構造化データは既存どおり。
- 主要9画面 × 日英 × 6幅 (320/375/390/430/768/1440) = 108条件。390pxで200% text-only拡大8条件。横はみ出し0。保存展開30条件を追加。
- ブラウザーassert 253件、追加assert 34件 PASS。Consent defaultOFF/明示許可/撤回/close/Escape/focus、消去confirm/cancel/success/blocked-storage failure、5作品日英起動・戻りを確認。Console error0、外部request0。
- HTML以外の配布56ファイルは現行版と同一。CSS、ゲームJS、Cover/scene、音源、Consent JS、headers/robots/sitemapを保全。旧公開artifact・postflight・game input source等303対象も照合。
- 初回テストのIsland locale不一致はBefore/Afterとも同じAccepted挙動。HTML言語と実行時設定を分離して検証し、元の失敗記録を保持。
- 旧 tests/analytics-consent.mjs は1 PASS / 6 FAIL。Closeなしfixtureと旧公開前Gate期待値の既存不整合。全関係ファイルはHEADと同一。無関係な修正・assert削除なし。現行Consent C用8件は別途PASS。

## 保全・Security・未確認

HEAD af7016d14c9f151a9c1136379c85de26bbe24e2a / main / origin/mainを維持。index bytes不変。開始時のCurrentと旧distribution-securityの未commit差分を保全。候補専用出力・asset/cache・internal evidenceへ分離し、既定builder動作は維持。39というrouteノルマは公開選択から導出する式へ変更。

Scoped source/candidate/review scan0 findings。既存 raw FAIL22 / historical FAIL11 / S04・S05 UNKNOWN、TRR1-NEW-05限定保持・平文/復旧可能性UNKNOWNは維持。full-project/index/historyの将来Release Gateは今回未実施。既知profileを読み込まず複製せず配布せず、QAは既承認run専用OS tempルールに従い自身のprofileだけ終了時に削除。scanner/hook/allowlist変更なし。

ゲームpayload保全のためTwo Waysのaria-label「Tinlumoの5作品へ」、MagnetのGAME004とreset内制作番号は別残件。Portal本文・metadata・altの改稿とゲーム内残存を混同しません。

Physical iPhone/Android/Safari、実指touch、聴感、外部初見、検索順位/効果、法務包括判断はNOT TESTED / PENDING。全57問・Magnet/Island全編QAは不変payload/sourceを条件に前回Remaster証拠を再利用。今回の再完走とは報告しません。Humanコピー・法務差分Review待ち。実model IDは主担当・独立read-only調査2担当ともUNKNOWN。

## Sources / records

- research.json: 一次資料5系統・JA/EN計7ページ、保存仕様の補足2ページ。確認日2026-09-27。
- ledger.json: 360項目のroute/locale/UI/source/before/issue/fact/decision/after/implementation/verification。
- ad-residue.json: 法務内の広告表現と残す理由。
- policy-diff.json、deferred.json、qa.json、qa-supplement.json、verification.json、MAINTENANCE.md。

変更pathはsourceと候補/本Reviewに限定。開始時の既存差分を含むgit diffの全体は以下。今回の具体差分はverification.json.changedSourcesと新規src/production/copy.tsを参照。

- astro.visual-remaster.config.mjs
- docs/games/PRODUCTION_CURRENT.md
- docs/qa/game005-release-r1/distribution-security.json
- scripts/visual-remaster-build.mjs
- src/data/game-identities.json
- src/data/game004-release.json
- src/data/visual-release.json
- src/production/Cards.astro
- src/production/Credits.astro
- src/production/Detail.astro
- src/production/GamePage.astro
- src/production/Home.astro
- src/production/Layout.astro
- src/production/catalog.ts
- src/production/pages/404.astro
- src/production/pages/[locale]/[...path].astro
- src/rc/PublicOperations.astro
- src/rc/public-catalog.ts
