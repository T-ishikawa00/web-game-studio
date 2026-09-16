# Tinlumo save/account policy — local RC review

2026-09-17。**最新3作品RCの公開候補受入：Human PASS済み。外部初見：DEFERRED / NOT TESTED。** 今回の保存方針反映・対象技術QAを完了し、今回差分のHuman確認待ち。既存候補受入を未受入へ巻き戻さない。公開許可は別。

## 試遊 / 1つのReview

- [最新Review](http://127.0.0.1:4351/save-policy-r1/REVIEW.html)
- [日本語Portal](http://127.0.0.1:4350/ja/) / [English Portal](http://127.0.0.1:4350/en/)
- [Hakorilo](http://127.0.0.1:4350/ja/play/tiny-delivery/) / [Lightwork](http://127.0.0.1:4350/ja/play/light-garden/) / [Two Ways](http://127.0.0.1:4350/ja/play/two-ways-home/)
- [日本語Privacy](http://127.0.0.1:4350/ja/privacy/) / [English Privacy](http://127.0.0.1:4350/en/privacy/) / [日本語Terms](http://127.0.0.1:4350/ja/terms/) / [English Terms](http://127.0.0.1:4350/en/terms/)

## 反映内容

Human決定を `src/rc/site.json` へ記録：アカウント/必須ログイン/Cloud Saveなし、各ゲームlocalStorage自動保存、同一端末/browser/originでの保存継続。別端末/browser、サイトデータ削除、private mode等では保証しない。無料3作品、課金なし、実広告なし、JA/EN、不要な個人情報を収集せず、外部Analytics未接続。将来の任意アカウント＋Cloud Saveは実需要確認後に検討する方針のみ。

Playに短い自然な日英保存説明を追加。詳細/About/Privacy/Termsは共有copyで整合し、過剰な警告モーダルは追加していない。保存は「保存された盤面・面・クリア記録からの継続」であり、配送中アニメーションの瞬間やUndo履歴の完全復元を約束しない。

resetは当該作品の進行・reduced motionを消し、音・guide・表示設定を残す。browser側サイトデータ削除で全作品の保存/設定を削除可能。保存拒否/破損時は既存の一時モード・正直なエラー・原データ保持をそのまま使用。ゲーム本体/保存adapter/shell/portalは変更なし。

Privacyのイベント保持件数を修正：ログ1つ最大50件。PlayではPortal用とshell用が別々のため合計最大100件。メモリ内だけで、永続化・外部送信なし。`wgs:session:v1`はsessionStorage内の固定`started`で個人IDではない。iframeのgenerationは再読込ごとの接続検証nonceで、永続ID/analytics payloadにせず、既存動作を維持。新しいID/fingerprint/アカウント/DB/Cloud Save/SDK/Analytics接続/CMSなし。

未確定operator/address/support email/domain/age/法的結論を補完せず、運営草案を維持。[Release Checklist](../../../planning/TINLUMO_RELEASE_CHECKLIST_R1.md)に決定済み事項・公開前blocker・承認deploy後の実URL smokeを分離。

## 対象QA

| 今回実行 | 結果 / 証拠 |
|---|---|
| 型 / RC build | PASS：0 errors / 0 warnings / 既存3 hints。RC28ページ、48配布ファイル |
| 日英説明 / responsive | PASS：About/Privacy/Terms/3詳細/3Play、Cloud Saveなし・private mode・draft等、320/1440幅、追加自動モーダルなし |
| 保存継続 | PASS：3作品とも旧schema1/version0.1.0を読み、実操作→自動保存→日英→reload→関連作品往復→同context新タブ再訪で同じ保存を使用。音/music設定不変 |
| reset / 削除 / 失敗 | PASS：取消は不変、確認後は対象進行だけ消去。他作品・音設定保持。browser storage削除相当のAPIシミュレーション、破損原データ保全・書込拒否時に成功扱いしない |
| イベント / network | PASS：イベントは許可fieldだけ・50件上限・新instance空。対象browser通信506件はすべて同origin GET。外部/非GET試行0、page error0 |
| 保全 | PASS：[preservation](preservation.json)。17非HTML配布ファイルbyte一致。registry/ゲーム名/保存/全57問/Art/Motion/Audio/全旧QA・Baselineを含む1637件byte一致 |
| 公開checker | [readiness](release-readiness.json)：19 blockerで期待どおりexit1。RC Human PASS保持、外部初見は延期表示。deploy後smokeはafter-authorized-deployment段階。対象unit2/2 PASS |
| 配布隔離 / Security | [audit](distribution-audit.json)：48ファイルallowlist、内部等11URL 404、RC配布scan0候補。既存full-project raw FAIL2はそのまま |

4群の詳細：[policy-results.json](policy-results.json)。[配布manifest](distribution-manifest.json)、[採用元照合](adoption-equivalence.json)、[最終変更/保全照合](final-verification.json)。主担当/独立read-only reviewer実モデル `gpt-6-astra`。

初回QAは前日serverが停止していたため接続拒否。結果を[初回記録](initial-server-unavailable.json)に保全し、空きport確認後に127.0.0.1:4350/4351限定で起動して再実行PASS。既存processの停止やLAN再公開なし。Humanの実browser保存には触れず隔離テストcontextを使用。

再利用：旧unit/全57問UI replay、音/lifecycle/比較動画、凍結再現結果は今回不変source/payloadに対応する過去証拠を再利用し、再実行しない。実機、private browsing固有挙動、実browser設定画面での削除、browser再起動、外部初見、全57問Human全編の新規試験、法務最終判断は今回未実施。技術試験からこれらへPASSを拡張しない。

Security既知SHAは限定FALSE POSITIVE / NON-CREDENTIAL / APPROVED、TLSは別のTRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTIONを維持。全project再scanは未実施、過去raw FAIL2をPASSに書換えない。鍵の読取/複製/Git収載/配布なし。

## 残件 / 停止

公開前：Tinlumo/Hakorilo等の名称・商標/権利、domain、公開運営者/問い合わせ先、対象市場・年齢・公開データ方針、hosting/log/保持/同意、法務・公開許可。実機/全57問の個別証拠範囲判断は旧Gateから分離して保持し、候補Human PASSの撤回にはしない。外部初見はDEFERRED / NOT TESTED。

deployは未承認/未実施。本番URL smokeは別途承認されたdeploy後、現在NOT TESTED。local QAを実URL smokeへ流用しない。既存RC Human PASSと今回の文言差分Human確認待ちを区別する。

stage / commit / push / deploy / domain購入 / 外部API接続 / 外部登録 / 契約 / LAN再公開0。**今回差分のHuman確認待ちで停止。**

再現（server起動後）：`npm run build:rc` / `npm run check` / `node --import tsx tests/rc-save-policy.mjs` / `node --import tsx --test tests/unit/rc-readiness.test.ts` / `node scripts/rc-audit.mjs` / `npm run check:release`。最後はBLOCKEDのexit1が期待値。
