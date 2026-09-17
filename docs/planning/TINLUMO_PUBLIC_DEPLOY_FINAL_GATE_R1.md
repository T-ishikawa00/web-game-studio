# Tinlumo Public Deploy — Final Gate R1

2026-09-17 / **PUBLIC_RELEASE_BLOCKED — FINAL_DEPLOY_GATE_PENDING**。
主担当・独立レビューの実利用モデル：`gpt-6-astra`。

## 最新差分 — manual Analytics checkpoint

Humanがtinlumo.comを **Enable with JS Snippet installation / Automatic injection OFF**へ変更済み。Cloudflare API読取でauto_install=falseと手動snippetを確認し、実際の公開用識別子・module形式を設定した。識別子は認証credentialではない。標準候補は非接続、`--verify-manual-snippet`候補は本番限定設定付き・noindexのまま。**deploymentHold=true / analyticsActive=false**を維持し、本番deploy・公開接続は0。

| QA | 実測と範囲 |
|---|---|
| consent前 | Analytics JS 0 / beacon送信処理0 |
| 拒否後・拒否を保存した再読込 | Analytics JS 0 / beacon送信処理0 |
| 許可後 | 実Cloudflare module HTTP200、script1、XHR送信試行1。応答status0のため、配送・Cloudflare集計成功は**未確認** |
| 許可の再クリック | script1、追加送信処理0。script重複なし |
| 撤回して再読込 | 新documentはJS0 / beacon送信処理0。旧documentで開始済みの通信完了は別扱い |
| Automatic injection | **0（設定上）**。本番レスポンスでの挿入0は未接続のためNOT TESTED |
| Preview | Access匿名6要求遮断、disable_rum=true、workers.dev/version preview=false |

実通信は配布対象外のloopback fixtureで検証し、controllerのproduction location判定だけをfixture adapterで供給。providerが見るoriginは実localhostのまま、HTTPヘッダー偽装なし。通常のローカル候補は許可後もscript0。status0の原因は未確定で、CORS等の可能性を確定事実にしない。[詳細証拠](../qa/public-release-final-r1/manual-analytics-qa.json)。採用ゲーム・全57問・音源は変更なし。

11単体テスト、型315ファイル0error/0warning（既存hint3）、配布52ファイル・27Portal/3iframe、RC48/採用payload18/旧資料1690の保全、配布scan0を確認。全project raw FAIL2は既存SHA/TLSの限定判定と分離し、新規候補0。最終Git receiptは [checkpoint-postflight.json](../qa/public-release-final-r1/checkpoint-postflight.json) に追補する（checkpoint後のローカル記録）。今回の許可はcheckpoint/通常pushまでで消費し、Deploy権限へ拡張しない。

**残る公開前Human Gateは本番公開操作の最終承認。** 本番のtransport・集計・重複なし検証は承認後のsmokeであり、今回PASSにしない。以下の旧「接続未設定」「Git未許可」は本差分で更新される履歴。

## 完了した判断・実装

- メール受信Gate **CLOSED（Human）**。実受信PASS、初回Spam到達は運用注意として保持。独自domain SMTP不要。未実施の返信・ヘッダー試験をPASSにせず、今回の公開Gateから外した。転送先の個人アドレスは収載しない。
- Human Final Decisionを日英About / Privacy / Terms / Contactへ反映。個人運営、Global/English-first・日本第二市場、日英正式、Geo-blockなし。問い合わせ本文等は自発提供、90日目安削除・月次未解決確認・合理的例外とprovider保持を説明。実名住所は収載せず、世界中の法令への適合保証を記載しない。
- 進捗・設定用localStorageを必要保存として継続。目的、対象、同一端末/browser/origin、消去による進捗喪失、継続保証なしを明示。ゲームのID/key/schema・57問・Art/Motion/Audioは変更なし。
- 同意UI：`Allow analytics` / `Continue without analytics`（日英）。default OFF、未選択・拒否でも全ゲーム利用可能。許可後だけ本番Portalで単一beaconを読み込む。選択変更はPrivacyとfooterから可能。計測設定はallow/denyだけで個人IDではない。撤回はdeny保存＋再読込、保存失敗は旧許可除去を試み、固定fragmentを用いて次の読込をOFFにする。進行中の旧通信が完了する可能性は説明済み。
- Terms：無料browser game、account/purchase/paid itemなし、可用性・保存継続/復旧の保証なし、不正利用・無断複製/再配布の禁止。通常プレイ・法令・個別OSSライセンスの許諾は妨げない。
- 採用素材の台帳・生成原本・配布Astro noticeを再確認。新規の不足許諾なし。権利保証や新規動画許諾は加えず、動画セクション/必須Gateを削除。旧台帳の一般的PENDINGは過去記録として保全する。

## QAと限界

11単体テストPASS：default OFF、拒否・未選択、許可一回、Preview/iframe/非本番除外、再読込、撤回、他tab拒否、保存を読めるが書けないケース、旧包装入口停止、Humanメールclosureと未実施証拠の分離。独立レビューで見つかった撤回保存失敗時の再開問題は修正・再確認済み。

日英Privacy / Terms / Contactに未確定表示なし。連絡先はsupportだけ。公開候補52ファイル/27 Portal URL/3 game iframe、RC48ファイルと採用18payloadのbyte一致、旧資料1690件・全凍結runtimeを保全。loopback12要求、Preview匿名6要求のAccess遮断を確認。配布検査は [QA](../qa/public-release-final-r1/consent-qa.json)・[manifest](../qa/public-release-final-r1/candidate-manifest.json)・[配布Security](../qa/public-release-final-r1/distribution-security.json) を参照。

ブラウザでは未選択・拒否・許可・再選択、拒否したまま3作品起動/保存再開とHakorilo入力、390×844 / 844×390で横溢れなし。ボタン高さ約50px。ローカル候補は接続設定OFFのため許可しても外部beaconを取得しない。実beaconの送信/集計・本番HTTPS smokeは未実施で、単体mockからPASSへ拡張しない。実機・聴感・全57問再採点なし。

## PUBLIC_RELEASE_BLOCKEDの残件

| 残件 | 解消条件・担当 |
|---|---|
| **Human最終Deploy Gate** | この成果を対象に、下記の本番公開操作を許可するかHumanが判断。今回の「まだproduction deployしない」をdeploymentHoldとして明示保持 |
| 本番Analytics smoke（承認後） | 手動設定とローカルmodule/送信試行を確認済み。本番実URLで未同意/拒否の通信0、許可後の正常応答・集計、エッジ自動挿入0を確認。未接続段階で完了扱いしない |
| 配布物の最終包装（承認後） | 今回checkpointのsource/configと52ファイルの候補manifestを基に、公開許可後に本番SEO/noindex差分だけ包装・検査。ゲーム18payloadは同一。候補manifestと本番manifestは別物として対応を記録 |

メール送信サービス、市場選択、必要保存、今回のPrivacy/Terms方針、一般的な法務再審査、動画方針を再質問しない。技術接続待ちと本番公開承認を、完了済みHuman方針と分離する。

## Humanが最後に承認する操作の一群

**このRCをFree構成で一般公開する最終許可**：今回checkpoint/refsとCloudflare設定を再確認 → 公開許可を正本へ反映し本番包装/QA/Security → 新規assets-only `tinlumo-production`へ配布 → `tinlumo.com` Custom Domain接続 → 衝突がなければwwwからpath/query保持転送 → 匿名smokeとopt-in送信/集計を確認。今回の単発commit/push許可は再利用しない。次回承認には公開許可反映・最終包装manifestを保存するGit範囲も含めて判断する。

匿名公開開始点はtinlumo.com接続。workers.dev/version previews無効、PreviewはAccess/noindex/Analytics OFFのまま。メール・既存DNS・保存を巻き込まない。Freeのみ、追加有料契約・購入なし。接続・費用条件に予想外の変更があれば停止。

初回本番に正常versionがなければ本番公開経路と今回のwww転送だけ閉じる。正常な本番versionがあればrollback後に再smoke。Preview版や空の検証ページを一般公開の復旧先にしない。

## 確認URL・証拠

- [English Privacy](http://127.0.0.1:4352/en/privacy/) / [日本語Privacy](http://127.0.0.1:4352/ja/privacy/) / [English Terms](http://127.0.0.1:4352/en/terms/) / [日本語Terms](http://127.0.0.1:4352/ja/terms/)
- 再起動：repoで `node scripts/public-release-server.mjs`。loopback限定。再build：`node scripts/public-release-build.mjs`。
- [実ファイル状態とrefs](../qa/public-release-final-r1/final-state.json)。従来のcheckpoint後成果・無関係untrackedを保全。全project raw FAIL2と限定Human disposition、配布scan PASSを分離。前回エッジ挿入の送信量UNKNOWNとAstro直接実行の既存逸脱は旧報告に保全。
- 公式実装根拠：[Cloudflare手動組込み](https://developers.cloudflare.com/web-analytics/get-started/)、[収集・送信先](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/)、[計測項目](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)。自動挿入を許すと同意UIを迂回するため、本番接続時の必須確認とする。
