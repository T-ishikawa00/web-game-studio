# Public Release Final R1 — QA / execution record

2026-09-17 最新 manual Analytics差分：Cloudflareのmanual snippetとauto_install=falseを確認。default OFF、許可後のみmoduleを1個読み込む。未同意/拒否/拒否再読込のJS・beacon送信処理0、許可後JS HTTP200・XHR送信試行1、応答status0につき配送/集計未確認。Preview保護/計測OFF維持。本番deploy/公開接続0、最終Human承認待ち。今回許可された1checkpoint/通常pushの詳細と残Gateは [最新Final Gate](../../planning/TINLUMO_PUBLIC_DEPLOY_FINAL_GATE_R1.md) を正本とする。以下の接続未設定・stage/commit/push0等は過去時点の記録。


2026-09-17 最新：Human Final Decision Public Data / Analytics / Legal R1を反映。メールGate CLOSED、必要保存・日英Privacy/Terms・default-OFF opt-in UIの実装/QA完了。動画方針・独自domain送信は初回必須Gateではない。**PUBLIC_RELEASE_BLOCKED / FINAL_DEPLOY_GATE_PENDING**。[本番Deploy直前の最終Gate](../../planning/TINLUMO_PUBLIC_DEPLOY_FINAL_GATE_R1.md)が現在の正本。以下の旧blocker/未確定表示は過去時点の記録で、最新承認へ再適用しない。


2026-09-17 / **PUBLIC_RELEASE_BLOCKED / LOCAL_PUBLIC_CANDIDATE_READY**。
主担当と独立read-only reviewerの実モデル `gpt-6-astra`。
判断・一次資料・外部手順は [Release Decision](../../planning/TINLUMO_PUBLIC_RELEASE_FINAL_R1.md) に集約。

2026-09-17 Human再確認後の差分：中央設定に受信転送のみ/既存domain送信なし/SMTP必須ではないこと、Global主力・日本第二市場を明示。日英Contactの「予定窓口・未開通」と読める古い表現を訂正。7件目の単体検証では、実値を変更しないfixtureでメール実試験済みを仮定し、SMTPなしでもメールゲートが解消することと、法務・計測ゲートは残ることを確認。独立read-onlyレビューも旧SMTP必須・日本限定条件の残存なし。今回の再開区間では外部設定・送信・Git書込み0。

## 実行結果

- Cloudflare Email Routing：Human登録・検証済み宛先1件と既存support完全一致ルールを確認し、管理画面から不足DNS（MX3、SPF1、DKIM1）だけ追加。Routing enabled/ready、catch-all無効、Preview DNS保全。APIによる同じ設定の試行は10000で失敗し、変更不成立を確認後に管理画面を使用。権限追加なし。[設定証拠](email-routing-setup.json)
- 実メール受信はHuman報告PASS。初回は迷惑メールフォルダへ到達したため運用注意を記録。専用箱からの返信・認証ヘッダー・個人常用アドレス非露出等は未報告。受信PASSを他の試験へ拡張しない。support名義SMTPは未追加・初回対象外。
- Public Production Worker、upload、deploy、apex/www接続、Analytics有効化：すべて0。Public version/deployment IDなし。今回stage/commit/push 0、index空。追加購入・有料化・AI送信0。Free構成、今回追加費用$0（既存domain費用を除く）。
- 既存Protected Previewは変更なし。Worker `tinlumo-preview` / version `590239ba-da9d-43b4-835a-57c165fb6e65` / deployment `a75b3b1b-71fe-4abd-93e8-699343c428f2`。Accessと別URL無効・preview限定RUM停止を保全。
- HEAD / origin/main / actual remote はすべて `f43c4cdfb4d3bad792e681d6eee5a9af212e942d`。この工程の条件付き1checkpoint権限は未消費。

## 技術QA

| 対象 | 結果・範囲 |
|---|---|
| 公開候補build | PASS、51ファイル、27 Portal URL、3 iframe。全noindex・beaconなし・LOCAL_REVIEW_ONLY、approved-distなし |
| 採用成果の保全 | RC48ファイル、採用18payloadのbyte一致。旧source/証拠1690件・全凍結runtime一致。全57問、Art/Motion/Audio/save不変 |
| 単体QA | 7/7 PASS。locale優先・直リンク・保存失敗fallback、beaconホスト/iframe/重複制御雛形、未達mail/dataゲート、旧包装入口停止、SMTPなしの選択済み構成でメール条件を解消可能 |
| 型 | 0 errors / 0 warnings、既存hint3。既存Astro wrapper使用 |
| 配布/HTTP/SEO | PASS、27ページcanonical/hreflang/sitemap、内部ファイル除外、loopback12要求、51manifest照合 |
| ブラウザ | 3作品代表面入力/クリア/保存再開、JA/EN、root→明示言語優先・Back非ループ、390×844と844×390の運営ページで横溢れなし |
| Preview匿名遮断 | HTML・JS・画像・iframe・音源を含む6要求でAccessへ302。ゲームの200応答と混同しない |
| Hakorilo BGM | 変更なし。既存1Mbps/150ms・WAV取得失敗時操作/保存継続証拠を再利用。実回線試験ではない |
| 公開ゲート | 期待どおりPUBLIC_RELEASE_BLOCKED、approved配布物を生成しない |
| 本番smoke・実機・聴感 | NOT TESTED。Human Protected Preview PASSから機種/OS/全57問試験を推測しない |

[manifest](candidate-manifest.json) / [技術QA](technical-qa.json) / [ブラウザQAと制約](browser-qa.json) / [公開前判定](release-check.json)。Edgeの英語Portal自動翻訳が有効だったため英語原文はsource/HTML側でも確認し、利用者の翻訳設定は変更していない。

## Security

配布物scan：PASS / 0 findings。[証拠](distribution-security.json)
全project（ignored含む）raw scan：**FAIL / 既知2件**。SHA false positiveとlocal TLS true secretは別の限定承認のまま。raw結果を書き換えていない。新規未承認候補0、full index/history scan PASS、TLSはindex/history/copy不在。前回Access識別子2件の承認はそれだけに限定し、今回へ拡張しない。広いallowlist・hook/scanner変更0。[Security証拠](security.json)

## ローカル確認・再起動・変更ファイル

[日本語](http://127.0.0.1:4352/ja/) / [English](http://127.0.0.1:4352/en/) はloopback限定候補。停止時はrepoで `node scripts/public-release-server.mjs`。buildは `node scripts/public-release-build.mjs`。採用RCのbuildを上書きしない。

今回の変更対象：中央 `src/rc/site.json`、PublicOperationsと旧Operationsの連絡先未検証表示、Layout・root・locale route、public-language、public build/readiness/QA/server、release-prepare旧入口、rc-release-check、Astro public設定、production設定/手順、3つの既存Release文書・Current、今回Decision/QA。全ファイル状態は [final-state.json](final-state.json) に記録。

前回postflight4ファイル、RUM停止設定、Protected Preview計画書の既存差分、無関係untracked13ファイルを保全。今回checkpointなしのため、すべて従来のcheckpoint後の未commit差分であり、新しいcommit後の差分は存在しない。

## 残件と復旧

実メール試験、Globalでの必要表示/同意の最終判断と実装、Terms・配布権利の確定が残る。決める具体案はRelease Decisionの3群にまとめた。承認済みブランド・市場・90日・専用箱返信は再判断不要。

一般公開を開始していないため本番rollbackは不要。将来の初回失敗時は今回作成した本番公開経路とwww転送だけを閉じ、正常本番versionが存在すればそこへ戻す。Preview・Access・メール・他DNS・保存を変更しない。受信転送を止める必要が生じた場合は、別途Human指示でsupport完全一致ruleだけを無効にする方法を優先し、DNSや検証済み宛先を一括削除しない。今回停止操作は未実施。

## 実行方針からの逸脱

初回の型確認で既存wrapperを使わずAstro CLIを直接実行し、標準通知処理がユーザー側Astro設定の通知日・Telemetry既定値を更新した。repo内限定方針からの逸脱として記録。当該check経路の実装では送信呼出しを確認できず、実通信の観測はUNKNOWN。以後はTelemetry無効の既存wrapperを使用。global設定の復元・追加変更は行っていない。過去のCloudflareエッジ挿入事故とその送信量UNKNOWNの記録も別途保全。

最新受信証拠：[mail-receipt-human.json](mail-receipt-human.json)。受信PASSを中央設定と日英Contactへ反映し、公開ゲートから受信未試験だけが解消されることを確認。他の未達条件は保持。今回外部メール送信・設定変更・commit/push/deployなし。
