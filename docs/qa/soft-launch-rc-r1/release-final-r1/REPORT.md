# Tinlumo Release Readiness Final R1 — local QA

2026-09-17 JST。**ローカル技術準備完了、Human判断待ち。公開BLOCKED。** [一つのRelease Decision Pack](../../../planning/TINLUMO_RELEASE_DECISION_PACK_R1.md)が判断・公式出典・外部実行/費用/rollbackの正本。最新RCのHuman候補PASSと外部初見DEFERRED / NOT TESTEDを維持。

実利用モデル：主担当 `gpt-6-astra`（当該taskのturn_contextを読取確認）。名称/domain・権利の独立read-only担当も同モデル、配信調査は親モデル継承。独立担当の書込み・外部実行なし。

## 実行した確認

| 今回実行 | 結果・範囲 |
|---|---|
| 型 / RC build | 0 errors / 0 warnings、既存unused-import hints3件。28 HTML pages、48配布ファイル。ゲーム採用元の凍結JS3件一致とBGM B byte一致をbuild時にassert |
| 公開checker unit | 2/2 PASS。欠落/空白/仮値/不正型と新7決定項目を拒否。候補PASS/外部初見延期を維持、実URLsmokeは承認deploy後 |
| 通常導線 / 保存 / pause | 日英Home→詳細→全3作品。実操作後の作品別schema1/version0.1.0保存、reload、reset dialogによるpause/cancel復帰。JA保存からENでも同originの保存を使う。新たなゲーム状態注入なし |
| 運営copy / responsive | 日英About/Contact/Privacy/Termsで中央の未確定値と草案を確認。320/1440幅でoverflowなし、架空フォームなし、試験通信はloopback限定。別途Contactの390px画面とPackの1440px画面を実撮影2枚（.tmp/rc）で目視確認。Human視覚受入の代用にはしない |
| BGM低速 / 失敗 | 下表。採用WAVの差替え・圧縮・音設定変更なし |
| 配布 / security | 48ファイルallowlist、内部/比較/fixture/key等11URLが404、Gitleaks8.30.1 RC配布scan0候補。配布font binaryなし |
| hosting雛形 | offlineの構造・Free上限・disabled計測・非公開route・26日英SEO URL対を確認。Cloudflare/Wrangler runtime実検証ではない |
| 保全 / Git | [最終照合](final-verification.json)。開始/終了HEAD・upstream tracking ref・index不変、既存1966件をsnapshotして明示変更以外をbyte照合、17非HTMLpayload保全。旧Baseline/無関係なuntracked保持 |
| 公開判定 | BLOCKED、exit1が期待値。26件＝公開前25＋deploy後smoke1。外部初見はblocker0 |

[browser-results.json](browser-results.json)、[distribution-audit.json](distribution-audit.json)、[distribution-manifest.json](distribution-manifest.json)、[adoption-equivalence.json](adoption-equivalence.json)、[hosting-validation.json](hosting-validation.json)、[release-readiness.json](release-readiness.json)。

### Hakorilo BGM 12.29 MB

Windows Edge headless、loopback、CDPの回線シミュレーション：**1 Mbps download / 0.5 Mbps upload / latency150 ms**、cold cache、CPU throttleなし。回線自体の実測や実機試験ではない。初期build時のbyte保持と、今回の実browser操作を組み合わせた限定証拠。

| 条件 | 操作可能まで | 初操作→保存 | BGM | 遊べた範囲 |
|---|---:|---:|---|---|
| 低速 | 約5.7秒 | 29 ms | 初操作前request0、操作後1、観察中complete0 | BGM取得を待たずarrow編集・再編集・保存・出発後の進行 |
| 取得失敗 | 約5.7秒 | 32 ms | abortを注入。3操作でrequest/失敗3、complete0 | 音源なしで同じ編集・保存・進行 |

丸め値。正確な各回数値/時刻はbrowser-resultsに保持。音源全体の完了を待つ試験ではなく、取得中と失敗時の非blocking確認。最終観察は初操作から約1.4秒まで。12,288,044 Bを1 Mbpsで全取得する理論時間は約98秒＋遅延等で、これは実測完了時間ではない。初期game資産も低速化したため5.7秒程度を要した。

**音源変更を必要とする入力blockingは再現しなかった。置換/圧縮を提案して採用を変更する根拠はない。** 失敗後は次のtrusted操作で再取得する既存挙動を観測した。連続失敗時のrequest抑制/中断は将来の局所runtime改善候補だが、今回の非blocking確認を理由に無断変更しない。実回線での帯域/decode/電池/音の開始待ち、低メモリ端末はNOT TESTED。

### 自己修正

追加テストの初回は、JAでクリアしたLightworkの同じ面をENで再操作して保存変化を要求しtimeout。採用済みのクリア状態入力禁止に反するテスト前提だった。失敗を [initial-browser-results.json](initial-browser-results.json) に保持。ENでは通常メニューから未クリアのL12/T12/D12を選び、実操作→保存を確認するよう修正。製品の入力/保存/クリア処理は変更していない。

独立reviewでSQLの進行節目/エラー別GROUP BYと、将来本番folderへの`_headers`配置手順の不足を修正。名称権利理由も具体的2登録へ更新し、公開checkerを再生成した。

## 再利用した証拠

- [初回全57問実UI replay](../full-run-results.json)、代表Art/Motion/SFX同等性、[音/lifecycle](../lifecycle-results.json)、旧凍結manifest46/48/44と再現結果。未変更payload/sourceの保全照合を条件に再利用し、今回再実行とは表示しない。
- [保存方針QA](../save-policy-r1/policy-results.json)：保存拒否・破損原データ保持・旧保存/音設定・関連作品往復・session・内部event上限。保存adapter/shell/portalと非HTMLpayload不変なので再利用。
- 旧unit213/213、旧Portal routes3/3、mock ads/pressure/失敗系。今回は非接続運営copy・独立雛形・公開checkerだけで共通runtime変更なし。全問再生・大量動画/画像の再生成なし。

## 未実施・残件

実機/実回線/聴感、全57問Human全編の新規試験、外部初見、法務最終判断、Wrangler/CDN/TLS実設定、受信返信、domain取得、実URLsmokeは未実施。外部初見延期は必須Gate化しない。Tinyの過去Human実機PASSも記録された範囲に限定し、他作品や今回全端末へ拡張しない。

全project raw scanは今回再実行なし。過去 **FAIL2件** と、SHAのFALSE POSITIVE / NON-CREDENTIAL / APPROVED、TLSの別TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTIONを保持。鍵の値/断片/鍵hashを出力/複製せず、Git/配布に収載しない。全projectを今回PASS、新規全project候補0と主張しない。将来Git checkpointは既存SECURITYに従い全project/index/historyを再検査する。

## 変更・再現

変更範囲：日英Operations、中央site/readiness、新決定項目unit、最新evidence先、配信/計測雛形、対象browser/hosting検証、今回Pack/QA、現在地・既存Checklist/素材台帳の追記。詳細は [changes.json](changes.json)。旧RC/名称/保存実装や既存tracked差分を戻していない。

```powershell
npm run build:rc
npm run check
# preview/reviewが停止中の場合だけ、空きport確認後に別terminalで起動
npm run preview:rc
npm run review:rc
# 試験と公開判定
node --import tsx tests/rc-release-final.mjs
node --import tsx --test tests/unit/rc-readiness.test.ts
node scripts/rc-hosting-check.mjs
node scripts/rc-audit.mjs
npm run check:release
# 最後は未確定のためexit1が期待値
node scripts/rc-final-verify.mjs
node scripts/rc-final-review.mjs
```

[日本語](http://127.0.0.1:4350/ja/)・[English](http://127.0.0.1:4350/en/)・[最新Review](http://127.0.0.1:4351/release-final-r1/REVIEW.html)。既存4350/4351 loopback processを継続使用し、無断停止/LAN再公開なし。

stage / commit / push / deploy / DNS / LAN / 証明書 / Firewall / 購入 / 契約 / 商標登録 / 問い合わせ送信 / 外部計測・音源API利用は0。Human判断待ちで停止。
