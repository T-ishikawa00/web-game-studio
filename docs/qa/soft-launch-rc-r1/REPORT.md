# Three-game Soft Launch — Local RC R1

2026-09-16。**ローカル実装・技術QA完了。公開準備はBLOCKED。実公開0本。** 主担当・統合・独立read-only調査/レビューとも実利用モデル `gpt-6-astra`。外部操作を委任していない。

## 試遊・再現

```text
RC language entry: http://127.0.0.1:4350/
Japanese Portal:   http://127.0.0.1:4350/ja/
English Portal:    http://127.0.0.1:4350/en/
Integrated Review: http://127.0.0.1:4351/
```

Repo `C:\projects\Web Game Studio` で実行：

```powershell
npm run build:rc
npm run preview:rc
# 別ターミナル
npm run review:rc
# RCの2プロセスだけ停止（PID・コマンド・loopback portを照合）
powershell -NoProfile -File scripts/rc-stop.ps1 -Target both
# 公開準備判定。現在は18 blockerでexit 1が正しい
npm run check:release
```

RCは `.cache/rc-dist` だけを127.0.0.1:4350でserveし、内部Reviewは別サーバー4351。Repo rootは配信しない。noindexはアクセス制御の代用ではなく、loopbackと出力分離を境界とする。本番配信・SEO切替・計測・広告は未着手。

## 実装

- Registry metadataの正本は既存 `src/data/games.ts` から `registry` として既存prototype metadataを参照。RCは固定ID `tiny-delivery / light-garden / two-ways-home` を選ぶ。別カタログへタイトルを複製せず、全てdraftのまま。関連作品は自分以外の実2作品。
- `src/rc/` + 専用Astro configで日英Home/一覧/詳細/Play/運営5ページを生成。既存Portalの色・タイポグラフィ・カード文法を保持し、3列と実画面coverへ局所調整。モバイルは読みやすい1列。ルート `/` は明示言語選択。各ページの日英切替は同じ作品/ページを保持。
- RC Playは `wgs-prototype-v1` / `createPrototypeSave` / `validProgress` を再利用する薄い接続。fixtureの9パネル保存を流用しない。origin/source/gameId/generation/形状照合、8秒timeout、再読込、pause/reset、書込後読戻し、破損原データ保持を維持。QA用必須DOMへの依存なし。
- 全57問のルール/ID/導入順/保存version `0.1.0`、通常/9:16/16:9、音・進行の独立性を維持。TinyにUndoは追加していない。Tinyだけ採用BGM B、Lightwork/Two Waysは採用SFX・BGMなし。既存BGM enabled/gainとmaster muteを尊重。
- 原本のゲーム実装を編集せず、assert付き採用hookをRC接続で適用。比較selector・query/session overrideを除去。Tiny音楽の既存内部QA getter依存はbundle内private portへ置換し、window QA APIを配布しない。旧schemaが許すD2値は読み込み互換性のため認識するが、実行はD1に固定。比較曲/score/動画/解答/solver/fixture/Design/秘密鍵/内部docs/source mapは配布外。
- `site.json` の正式名・domain・運営者・連絡先・対象市場/年齢・運用は未設定。JA/EN運営ページは明示草案。架空の人物・法人・連絡先・年齢、送信フォーム/送信成功表示を作成していない。

## 技術結果と証拠

| 検査 | 結果 | 証拠 / 範囲 |
|---|---|---|
| 型・通常build・RC build | PASS | `npm run check`：0 errors / 0 warnings。既存未使用import hintsは区別。RC28 HTMLページ |
| Unit | **213/213 PASS** | `npm test`。既存ルール/独立solver/保存/広告pressure/音・新規公開placeholder拒否を含む |
| 旧Portal routes | **3/3 PASS** | `npm run test:routes`。fixture・旧16 locale routes・404・内部隔離保持 |
| 新RC routes/リンク/日英/保存/失敗/入力/表示 | **6/6 groups PASS** | [browser-results](browser-results.json)。全日英一覧/詳細/Play/運営、旧query/モード拒否、同origin保存、破損/未知version/拒否、偽message、ready timeoutとreload、1440/390/320幅×日英×3作品×3表示、touch/keyboard |
| 全57問・終端・reload | **57/57 PASS** | [full-run](full-run-results.json)。実RC UIで解答再生。Light/Homeは中間checkpoint照合、Tinyは配置/待ち設定と全UI step/最終保存を検証。ゲーム状態の直接注入・出荷QAポートなし |
| Audio/lifecycle | **3/3 groups PASS** | [lifecycle](lifecycle-results.json)。trusted unlock、BGM gain/mute、無音設定保持、pause/resume/表示変更、入力連打、破損音設定、離脱。pagehide/pageshowの一部は明示synthetic、物理割込み試験ではない |
| 採用同等性 | **3/3 PASS** | [adoption-equivalence](adoption-equivalence.json)：比較機能除去前の3game bundleが凍結JSとbyte一致。[representative-equivalence](representative-equivalence.json)：実凍結版とRCの代表操作で盤面DOM・animation keyframes/timing・SFX PCM SHA256一致。BGM masterはbyte一致 |
| 旧凍結版再現 | **46 / 48 / 44全件PASS** | Tiny `craft-r2-build`、Lightwork `light-baseline-build`、Two Ways `twoways-baseline-build`。元manifest不変。shared metadata拡張後も旧buildから再現できる |
| 保全 | PASS | [preservation](preservation.json)、`node scripts/rc-preserve.mjs`。保存依頼の仕様を含む1692ファイルを記録、許可した現行索引/registryの差分を除く1690ファイルと全凍結出力を照合。既存untracked13件不変 |
| 出力・内部URL・秘密情報 | PASS（RC配布） | [distribution-audit](distribution-audit.json)。48ファイルallowlist、内部/鍵URL等11件404、Gitleaks8.30.1配布scan0候補。外部フォントなし |
| 全project Security | **raw FAIL / 既知2件** | [security](security.json)。SHAは限定FALSE POSITIVE承認、TLS鍵は別のTRUE SECRET / LOCAL DEV ONLY保持承認。新規候補0。値/断片/鍵hashをReportへコピーしていない |
| 公開準備checker | **BLOCKED・期待どおりexit 1** | [release-readiness](release-readiness.json)。欠落/空白/仮値/不適切な型/approval欠落を拒否。config旗だけで残る法務草案をPASSにしない |

テスト側の修正：postMessage checkpointを同期扱いしていたassertを非同期の到達待ちへ変更。指が動く/親scroll時に入力を取り消す採用済みガードを弱めていない。盤面操作はkeyboardでも再現し、touch/pointerは別の代表試験。新RCの日本語BGM設定は初期化順による英語固定をRC内で修正。新たなゲームルール/音の調整なし。

再利用した証拠：未変更ルール/Art/synthesis原本と元frozen manifests、既存の長時間音源/比較動画/QA。新RCの物理端末・主観聴感・初見理解の証拠としては再利用しない。重い比較動画の再生成なし。

## 配布容量・性能

[配布manifest](distribution-manifest.json) に起点commit、tracked差分digest、未tracked実装digest、profile、全配布digest/容量を記録。[実測](cost-media.json) はWindows / Edge headless / 1280×1000 / loopback / CPU・回線制限なし、各作品1サンプル。

| 対象 | 初期取得（非圧縮） | gzip / Brotli推定 | 操作可能まで |
|---|---:|---:|---:|
| Lightwork Play | 320,450 B / 11 assets | 103,595 / 90,711 B | 165 ms |
| Two Ways Play | 335,061 B / 10 assets | 126,277 / 113,753 B | 150 ms |
| Tiny Play（BGM前） | 328,467 B / 10 assets | 121,908 / 109,626 B | 139 ms |
| Tiny操作後（BGM含む） | 12,616,511 B / 11 assets | 3,915,296 / 1,760,976 B | decode/playbackは非同期 |
| 全配布（48ファイル） | 13,205,092 B | 4,112,193 / 1,923,338 B | — |

現在のloopback serverは圧縮せず配信。圧縮値はファイル単位の生成見積りで、実回線転送時間ではない。Tinyの採用原音WAVは12,288,044 Bを初回有効操作後にfetchし、入力は待たない。原音を維持した結果であり、本番の圧縮配信、実回線・実端末のdecode/メモリは別確認。数値をスマホ実機や本番性能PASSへ拡張しない。

## 権利・運営・Human

[既存素材/権利台帳](../../records/ASSET_REGISTER_R1.md) と [既存依存台帳](../../records/DEPENDENCY_LICENSES_R1.json) を更新。実出力にはnode_modules由来clientコード0件、Astroはgeneratorとして全文LICENSEを同梱。初期・現行音の来歴、実画面cover、保存/音/ガイド/表示/イベントの実データ表、法域別の一次資料/確認範囲を記録。

**Tiny Deliveryには既存同名の配送ロボットゲームがある。** [Steam公式販売ページ](https://store.steampowered.com/app/3812830/Tiny_Delivery/)。侵害との断定ではなく、名称・検索識別・具体表現の要確認事項。Two Ways Homeも他エンタメ用途で既存使用。日本/米国/EU/英国の公式登録検索結果は取得できず未確認。名称クリアランスPASSではない。

Human確認は [確認票](HUMAN_REVIEW.md) の3群：**ブランド、運営、対象とデータ**。さらに新RCの実機・聴感・全57問ゲーム性、法務/素材/実況範囲の最終判断を待つ。外部初見はDEFERRED / NOT TESTED。公開checkerのPASS自体もdeploy権限にはならない。

## Gitと停止

開始/終了HEADは `44ce3ca2e079aa64733be7da3435726e400a54c6`、branch `main`。開始時のlocal `origin/main`も同値。今回remote照会・fetch/pushは行わず、現在の外部ref一致を新たに主張しない。既存13 untrackedと今回RC差分は [変更一覧](changes.json) で区別。stage/commit/push/deploy/LAN再公開/証明書/Firewall/購入/契約/外部API・計測接続送信は **0**。

保存した添付仕様は利用者の今回依頼で指定されたローカル実装仕様として適用し、仕様内の過去refや外部URLから新たな外部操作許可は推定していない。
