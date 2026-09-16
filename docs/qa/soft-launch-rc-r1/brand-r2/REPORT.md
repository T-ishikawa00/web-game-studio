# Tinlumo brand R2 — local RC / Human review pending

2026-09-16。最新Human判断を中央設定へ反映。**Tinlumo / ティンルモ / Tinlumo Studio**。Nolippa / Nolippa Studio採用は撤回済み。Hakorilo / ハコリロ / ちいさな配送パズルと他2作品は維持。主担当実モデル `gpt-6-astra`。

- [日本語Portal](http://127.0.0.1:4350/ja/) / [English Portal](http://127.0.0.1:4350/en/)
- [Hakorilo](http://127.0.0.1:4350/ja/play/tiny-delivery/)
- [最新Review](http://127.0.0.1:4351/brand-r2/REVIEW.html)

## 差分と履歴

ブランドの正本 `src/rc/site.json` だけでHeader/Footer/title/description/OG/運営草案/言語入口/404の現行名を更新。domain/candidateはnull、制作元表記は法人名・運営者ではない。商標・権利承認はfalseのまま。

Humanは営業中の既存事業NORIPPA（ノリッパ）を追加調査で確認したと報告し、Nolippa採用を撤回した。[決定記録](../../../planning/TINLUMO_BRAND_R2.md)と権利台帳へ記録。事業のURL・業種・運営主体・登録商標は未提示で推測せず、こちらで独立検証したとは扱わない。以前確認したジョルダンの2014年norippa発表とは区別する。

旧Nolippa選択文書に撤回注記を追加し、過去本文・旧QA/Reviewは削除せず保持。現在地で旧判断を撤回済みと明示。旧 `naming-r1/` は過去時点の証拠であり、最新採用判断ではない。

## 最小回帰結果

| 対象 | 結果 |
|---|---|
| RC build | PASS：28ページ、48配布ファイル。既存テンプレート/ゲームsourceの変更なし |
| 表示/route | PASS：既存31 HTML URLが200。日英Header/Footer/読みに対応するアクセシブル名、旧ブランドの配布HTML残存0。320/1440幅で横overflowなし。Homeリンク確認 |
| 起動/保存 | PASS：3作品起動、旧schema1/version0.1.0のsave読込。Hakorilo入力→保存→reload→日英切替で継続。別作品保存と音/music設定キー不変。Humanのbrowser storageには触れず、隔離テストcontextのみ使用 |
| 保全 | PASS：全17非HTML配布ファイルbyte一致（全ゲームJS/CSS/WAV、shell/portal、covers、favicon、Portal CSS等）。開始時source/証拠1937件のうち意図した7ファイル以外1930件byte一致。registry/作品名/slug/ID/57問/Art/Motion/Audio・全旧QA証拠・Baseline不変 |
| network/Git | 外部request試行0、page error0。HEAD/index不変、diff check PASS。既存loopback4350/4351プロセスを継続使用 |
| 公開判定 | BLOCKED：18項目、期待どおりexit1。TinlumoとHakoriloの権利/商標確認、domain/運営情報、Human Gate等は残る |

証拠：[brand-results.json](brand-results.json)、[manifest](distribution-manifest.json)、[採用byte照合](adoption-equivalence.json)、[公開blocker](release-readiness.json)。再現：`npm run build:rc`、`node --import tsx tests/rc-brand.mjs`、`npm run check:release`（最後はexit1が期待値）。本フォルダを出力先にし、過去QAを上書きしない。

既存名称QAのブランド期待値も中央設定参照へ更新し、旧ブランドのhardcodeを継続要件にしない。今回その広いQAは再実行せず、上記の対象回帰だけを実施。全57問replay・型全件・全unit・比較動画・聴感・実機試験は再実施なし。ゲーム/配布payload不変に基づき過去結果を再利用する。

Securityの全project過去raw FAIL（2件）、SHAの限定FALSE POSITIVE承認、TLS鍵のLOCAL DEV ONLY保持承認は維持。今回scanner再実行なし、既存の限定判定を新しい候補へ拡張せず、鍵に触れていない。

## Human確認待ち

最新表示の確認後も、Tinlumo/Hakorilo等の商標・権利、domain、運営者/連絡先/市場・年齢/運用、法務、実機・初見・全57問Human全編受入、公開承認は別Gate。制作元Tinlumo Studioは法人の確定ではない。公開在庫0。

stage / commit / push / deploy / LAN再公開 / 購入 / 契約 / 外部登録・問い合わせ送信0。**Human確認待ちで停止。**
