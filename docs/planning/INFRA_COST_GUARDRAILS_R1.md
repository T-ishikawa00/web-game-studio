# Infrastructure Cost Guardrails R1

ローカル限定。Cloudflareが第一候補、購入/有料resource/契約/deployなし。正確な将来請求額・無料維持は保証しない。

## 構成
静的HTML/CSS/JS/画像とクライアントゲームをCDN向けに出力する。Portalの更新と `games/<slug>/<version>/` のゲーム版を識別可能にする。初期保存は端末側。Worker、DB、object storage、外部analyticsは導入していない。静的配信だけなら動的計算を足す理由はない。

## 混同しない単位
| 単位 | 意味 / 監視ポイント |
|---|---|
| Page views | ページの表示。asset数や広告回数とは異なる |
| Sessions | 訪問のまとまり。定義・期限により値が変わる |
| Requests | HTML、CSS、JS、画像等のHTTP要求。1PVで複数発生 |
| Storage | 保管容量。版を保持するほど増える |
| Object reads | object storageからの読取操作。CDN hitとorigin readを分ける |
| Worker invocations | 動的処理の呼出し。全assetを経由させると不要に増える |
| Logs | 量、送信、取り込み、保持期間。毎フレーム保存は禁止 |
| Analytics | event数、サービス/保持/クエリの課金。PVと同一視しない |
| DB / API | query/read/write/connection/API呼出しと転送量 |

ゲーム配信量は「実測転送バイト/初回ロード × 新規ロード数」を起点に見積もり、キャッシュ、再訪、バージョン更新、地域を別に感度分析する。PVだけから請求額を断言しない。

## コスト制御
1. 静的assetを一律Worker経由にしない。動的機能は必要箇所だけ。
2. 本番導入前に月額上限（Human決定）、サービス別予算、通知先、可能なbilling alertsを設定。数値も通知先も未設定。
3. 大きなassetを計測。初回JS/画像/ゲームロードを分離し、ゲームはプレイ画面でのみ取得。
4. eventを用途に絞り、sampling/保持期限/レート制限を実装するまで外部telemetryを有効にしない。
5. 版付きassetは将来immutable cacheの対象、HTMLは新しいmanifestに追従させる。保持数と削除手順は公開運用時に決定。
6. 非必須機能の障害時はanalytics停止→広告機会見送り→推薦等の任意API停止の順に縮退。既存の公開ゲームは静的ファイルだけで遊べる状態を保つ。
7. 復旧は検証済みPortal manifest/HTMLと対応ゲーム版の組で戻す。前schemaの保存互換性も確認する。rollbackのために全データresetをしない。

## 将来のCloudflare確認項目
PagesまたはWorkers Static Assetsの適合、リクエスト/ファイル/サイズ上限、build制約、帯域や動的処理の最新料金、log/analytics保持、billing alertの機能と限界、失敗時挙動、秘密情報の管理、domain/SSL、rollback。今回採用サービスの比較決定や課金見積はしていない。

参照: [Cloudflare Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)（2026-09-13閲覧）。この資料の存在は無料または最安の保証ではない。
