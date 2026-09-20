# PROJECT MAGNET — Public Candidate Review Pack

2026-09-20 — **GAME004_PUBLIC_CANDIDATE_READY / HUMAN_RELEASE_GATE_PENDING**

Human Full Game acceptanceは **GAME004_FULL_GAME_GATE_PASS**。「これでいい」という実試遊判断に基づき、3作戦18区画・3Boss・4形態・4module・unlock/settings/records/checkpoint/Retry・現行Craft/Combat/Progression/Tempoを[Full Baseline](../../games/GAME004_FULL_GAME_BASELINE_R1.md)として凍結。追加コンテンツと追加polishは行っていない。

## 試す

- [一つのReview入口](http://127.0.0.1:4372/review/)
- [JA Play](http://127.0.0.1:4372/ja/play/project-magnet/) / [EN Play](http://127.0.0.1:4372/en/play/project-magnet/)
- [JA Portal](http://127.0.0.1:4372/ja/) / [EN Portal](http://127.0.0.1:4372/en/)
- [JA作品紹介・初回操作](http://127.0.0.1:4372/ja/games/project-magnet/) / [EN details](http://127.0.0.1:4372/en/games/project-magnet/)
- [Card / thumbnail](http://127.0.0.1:4372/covers/project-magnet.png)

すべてPCのloopback。物理スマホからこのURLへ接続できるという意味ではない。既存採用Fullの4371も変更せず保持。

確認順: A開始→吸引/照準/射出→クリアでB解放→途中でPortalへ戻る/再読込→区画開始から再開→B/C→Clear/Retry。上部の言語・音・動き・一時停止、作戦画面の記録/未解放表示/確認付きデータ消去も確認。

## 今回の差分

採用52-file Production配布物 `.cache/tinlumo-mvp-portal-baseline-r1` をhash照合し、別rootへ局所overlay。Production registry、元のHTML/CSS/source、3作品57問、保存・計測JS、Cloudflareは変更なし。候補のHome/catalogに4枚目のcard、作品紹介と全画面Play、関連する日英About/Terms/Privacy/Creditsとsitemapを追加・調整。Portalの設計や共通CSSは変更しない。

Game004の配布時差分は、内部Review/QA API除外、nested asset path、Portalへの戻るリンク、日英route/表示/ARIA/保存言語の整合だけ。英語開始時の保存言語と、リセット後の表示言語の不整合を独立レビューで発見して修正。コア戦闘・Art・区画・進化・保存schema/判定ロジックは凍結原本どおり。変更した投影箇所は[distribution.json](distribution.json)のtransforms、編集可能な入口は `game004-public/` と専用build script。

local候補は全体noindex、robots拒否、計測送信OFF。計測の選択UIはlocal候補で非表示。既存Productionの計測設定・JSは変更していない。候補HTMLのnoindex/計測OFFと、元の52files保全を混同しない。

## QA

|対象|結果・証拠|
|---|---|
|凍結再現|73採用artifactsをhash固定。worktree再build4files byte一致、Git index再build4filesはtext改行正規化後一致。binary動画は完全一致。Full source/証拠に上書き0|
|ゲーム対象unit|28/28 PASSをcheckpoint前に再実行。全作戦/4形態/6moduleペアのcheckpoint、unlock/records、失敗・破損・別タブ競合、敵/boss/module機構|
|公開candidate型/build|専用strict TypeScriptとVite build PASS。独立read-onlyレビューで検出した公開包装の問題は修正済み。[レビュー結果](independent-review.json)。レビュー用source/API/mediaをgame-onlyへ収載しない|
|公開candidate browser|[browser.json](browser.json)。JA/EN、全既存detail/play route、既存3作品入力/save/reload、4保存keyの分離、A/B/C表示、checkpoint/Portal戻り、pause、mute/reduced motion、破損/未知version/保存拒否/容量不足、audio初期化失敗、通常入力死亡/Retry。fault injectionとB/C fixtureを明示|
|Desktop / Mobile viewport|1280×800、390×844、844×390。Hubと実プレイのoverflowなし、2本指経路、主要操作への到達。追加[viewport-visibility.json](viewport-visibility.json)はdocument.hidden注入によるイベント検証。OS割込みや実機試験ではない|
|Clear / unlock / records|採用Fullの87 browser checksと、新規保存から等速A→B→C→NORMAL ENDの449.640秒実入力記録を再利用。[採用Review](../game004-magnet-full-r1/REVIEW.md)。公開candidateで全18区画を再び完走したとは主張しない。clear.pngは採用B clearのcopy|
|既存3作品・57問|20既存payload byte一致、52原配布files不変。日英Home/catalog/detail/playと3作品の代表入力/save/reloadを今回再実行。全57問は採用原本/既存受入証拠の保全で、今回の57問全再試遊ではない|
|network / 配布|localhostのみ、browserのpage error/external requests0。POST405、source/秘密/旧Review/API404。実配布_headersのXFO SAMEORIGIN/no-cache/CSPも検証。ローカルserverだけの保護を配布物の保護と取り違えない|
|Security|[security.json](security.json)。全project raw FAILは判定済み既知2件を維持、新規0。Portal候補/game-only配布はPASS。checkpoint全index/history PASS。TLS鍵ignored・index/history不在。新規例外・hook変更0|
|保全|[preservation.json](preservation.json)。開始時既存2817filesは現在地追記以外変更なし。snapshotには初期作成helper3件も含まれるため分離説明。HEAD/index差分は明示許可された1checkpointで、無許可変更ではない|

既存全体テストの旧前提 `rc-readiness` 1件と、旧3試作のTS18048計12件は、採用時の[production-regression.json](../game004-magnet-full-r1/production-regression.json)を既知のまま保持。今回それらのsourceは不変。対象PASSをrepo全体PASSへ広げず、旧assertionを緩めない。

## 配布物・権利

- Portal統合候補: `.cache/game004-public-candidate/`、62files。元の52filesのうち30filesは候補内でHTML/header/sitemap等を投影し、元ファイル自体は不変。[全file/hash/bytes](distribution.json)。Production rootとは別。
- game-only: `.cache/game004-public-game/`、5files / 263,098 bytes（index、JS、CSS、credits、Vite notice）。mount契約は `/games/project-magnet/full-r1/`。単独buildにはPortal全体・旧3ゲーム・QA・録画・source・source map・TLS・環境ファイルを含めない。
- [権利・ライセンス棚卸し](RIGHTS.md)。既存原制作のCanvas/WebAudio、system font、実プレイthumbnail。外部購入素材なし。公開権利・名称/商標の最終判断はHuman Release Gateで残す。

再現: repo rootで `node scripts/magnet-public-build.mjs`、`node scripts/magnet-public-server.mjs`。4372使用中なら自動停止しない。自分の候補serverは `.tmp/magnet-public-r1/server.json` のPIDとcommandを確認して扱う。既存4369/4370/4371や他のserverを止めない。node_modulesは既存lockfileを使用。未知fileが出力rootに混入した場合はbuildを停止し、勝手に配布対象へ加えない。

## 物理スマホ・実聴・未確認

**物理iPhone/Android・Safari・個別聴感・外部初見 = NOT TESTED。市場性・需要・継続率・収益 = UNKNOWN。** Human Full Game PASSやbrowser emulationで拡張しない。全組合せのHuman全編試遊、長時間heap解析、全OS/機種網羅も未実施。

実機確認シート: 端末/OS/browserと候補digestを記録→縦/横で2本指移動と吸引/射出→ホーム/別アプリへ移動して復帰→意図しない射出や音の継続がない→reload/区画再開→音ON/OFF・端末音量・speaker/headphoneの聴き取り→連続射出/破壊/B/C bossで音割れ・過密・遅れ→Retry。iOSの消音/中断、Androidの戻る、端末回転も別記録。

現時点ではLAN/tunnel/Firewall/証明書変更を実行していない。実機用経路は別途Humanが承認するUSB転送または限定LAN方式を確定してから、同じ配布hashで用意する。未接続を実機準備のPASSとしない。今すぐ可能なのはこのPCのloopback試遊と実聴で、スマホ試験は未実施のままGateへ渡す。

## Productionへ反映する場合 / rollback

今回deployなし。将来Human Release GO後の最小変更はGame004 5file・cover・JA/EN detail/play、Home/catalogのcardとinventory copy、関連About/Terms/Privacy/Credits・sitemap。既存3作品payload/保存key、Portal CSS、Cloudflare設定、広告を変更する必要はない。candidate用noindex/robots・計測OFFは公開用projectionを別途明示確認し、既存opt-in計測を勝手に変更しない。public registry収載は今回未実行。

rollbackは最新の正常Production配布root `.cache/tinlumo-mvp-portal-baseline-r1` とmanifestへ配信を戻す計画のみ。過去版 `.cache/tinlumo-approved-dist` へ誤って戻さない。実施には別承認。Game004のlocal save keyを削除/移行せず、再導入時にも元データを保持する。Git reset/rebase/history rewrite、他3作save、Preview/Access/DNS/メールの巻戻しは不要。今回はrollback未実行。

## checkpoint / モデル / 操作

commit **8589025926c2ca34d87548521e28d7277e668f66**。HEAD / origin/main / actual remote一致。[postflight](../game004-magnet-full-baseline-r1/postflight.json)。Private origin/mainへの通常fast-forward push1回、commit1回。phase2の候補/Reviewは未stage・未commit。2回目commit/amendなし。

actual models: 主担当/凍結/保存・統合・最終QA **gpt-6-astra**、範囲限定read-onlyレビュー **gpt-5.6-sol**。

許可されたGit push **1**、それ以外の外部書込み **0**、Production deploy **0**、public registry反映 **0**、Cloudflare変更 **0**、LAN/tunnel/Firewall **0**、広告/App Store/購入/契約/外部投稿 **0**。総外部操作0と偽ってGit pushを隠さない。

**GAME004_PUBLIC_CANDIDATE_READY / HUMAN_RELEASE_GATE_PENDING** で停止。追加ゲーム制作や公開へ自動移行しない。
