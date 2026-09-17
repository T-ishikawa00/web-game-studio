# Tinlumo — Initial Soft Launch decisions and Release Checklist

2026-09-17 最新 manual Analytics差分：Cloudflareのmanual snippetとauto_install=falseを確認。default OFF、許可後のみmoduleを1個読み込む。未同意/拒否/拒否再読込のJS・beacon送信処理0、許可後JS HTTP200・XHR送信試行1、応答status0につき配送/集計未確認。Preview保護/計測OFF維持。本番deploy/公開接続0、最終Human承認待ち。今回許可された1checkpoint/通常pushの詳細と残Gateは [最新Final Gate](TINLUMO_PUBLIC_DEPLOY_FINAL_GATE_R1.md) を正本とする。以下の接続未設定・stage/commit/push0等は過去時点の記録。


2026-09-17 最新：Human Final Decision Public Data / Analytics / Legal R1を反映。メールGate CLOSED、必要保存・日英Privacy/Terms・default-OFF opt-in UIの実装/QA完了。動画方針・独自domain送信は初回必須Gateではない。**PUBLIC_RELEASE_BLOCKED / FINAL_DEPLOY_GATE_PENDING**。[本番Deploy直前の最終Gate](TINLUMO_PUBLIC_DEPLOY_FINAL_GATE_R1.md)が現在の正本。以下の旧blocker/未確定表示は過去時点の記録で、最新承認へ再適用しない。


最新の公開準備・Human判断・blockerは [Public Release Final R1](TINLUMO_PUBLIC_RELEASE_FINAL_R1.md) を参照。Global/English-first、専用受信箱返信を採用済み。旧資料の「domain未取得」「support名義SMTP必須」「日本中心」の案を現状へ流用しない。旧 `release-prepare.mjs --prepare` は書込み廃止・常にBLOCKED。現行入口は `public-release-build.mjs`。以下は当時の証拠として保全。


2026-09-17 Final R1追記：最新の公開判断は [Release Decision Pack](TINLUMO_RELEASE_DECISION_PACK_R1.md) へ集約。下記の初回方針・候補PASS・外部初見DEFERREDは維持。名称調査結果、運営/データ未確定、Workers静的構成とA/B比較、全blocker/担当/次回外部許可/rollbackは同Packを参照。

2026-09-17 最新Human決定。**最新3作品ローカルRCの公開候補受入はHuman PASS済み。外部初見はDEFERRED / NOT TESTED。** これは実際の公開許可ではない。過去Reviewの未受入表記へ巻き戻さない。技術QAとHuman判断の正本を分ける。

最新checkpoint判断：名称はSoft Launch用Human FREEZE。TIRMO unresolved / WIPO UNKNOWNを残し法的保証なし。個人運営（Studioはブランド）、一般向け、DOB/年齢入力・年齢Gateなし、子ども向け積極訴求なし。初回計測はCloudflare Web Analyticsのみを選択、custom events対象外、現在未接続。Workers Static Assets Free第一候補、Paidは別承認。support@tinlumo.comはdomain取得後の候補のみ。

## 固定した初回仕様

| 項目 | Human決定 / 現実装 |
|---|---|
| アカウント / 必須ログイン / Cloud Save | すべてなし |
| 進行 | 各ゲームごとのlocalStorage自動保存。対応する盤面/面/クリア記録/動きを控える設定を保持 |
| 再訪 | 同一端末・同一browser・同じoriginで保存領域が利用可能なら保存された続きから遊べる。アカウントがなくても毎回最初からにはならない |
| 継続を保証しない条件 | 別端末、別browser、サイトデータ削除、private mode、保存領域の拒否/消失、別domain/port等。配送アニメーションの途中フレームやUndo履歴の完全復元・クラウド復旧も約束しない |
| reset / browser削除 | ゲームの進行消去は当該作品の保存（盤面・クリア・reduced motion）だけ。音・guide・表示設定は残る。browser側のサイトデータ削除で同サイトの全作品の保存/設定を削除可能 |
| 作品 / 費用 / 言語 | 初回無料3作品、全57問、課金なし、実広告なし、日本語/英語 |
| データ | 不要な個人情報を収集しない。fingerprint・個人識別子・不要なpersistent IDを追加しない。外部Analytics未接続 |
| イベント | メモリ内ログ各50件。PlayはPortalとshellの2ログで最大100件。ページ破棄で消失。外部送信・永続化なし。`wgs:session:v1`はsessionStorage内の固定値`started`であり個人IDではない |
| 将来 | 実需要を確認できた場合だけ任意アカウント＋Cloud Saveを検討。今回の追加実装/DB/接続許可ではない |

## 互換性と正本

`src/rc/site.json`の`softLaunchPolicy`/`humanReview`に仕様決定と候補受入を記録。名前の正本と旧registryを保持。Hakoriloの表示名は内部`tiny-delivery`や`wgs:save:tiny-delivery`を変更する理由にしない。全ゲームでschema1 / version0.1.0、既存gameId、slug、audio/music key、保存済progressは不変。

実装 `src/prototypes/state.ts` / `src/rc/shell.ts` は元のまま。shared copy `src/rc/save-copy.ts`をPlay・詳細・運営草案へ適用。説明だけで保存失敗を成功扱いしない。個人情報を一切扱わない/法令完全準拠等の法的保証を新設しない。operator/address/email/domain/対象国/保持同意の未確定事項は捏造せずDRAFTを継続。一般向けの年齢方針はHuman確定済み。

## Release Checklist

| 段階 / 対象 | 現在の判定 |
|---|---|
| 初回製品方針 | **Human決定済み**。上表で固定 |
| 最新3作品RCの候補受入 | **Human PASS**。今回のHuman報告が根拠。公開許可を意味しない |
| 今回の保存方針反映・対象技術QA | 過去差分PASSを保持。今回checkpoint差分QAはcheckpoint-r1のREPORTを参照 |
| 外部初見 | **DEFERRED / NOT TESTED**。延期を未受入/PASSのいずれにも置換しない |
| Tinlumo / Hakorilo等の名称・商標・権利 | Soft Launch用名称はHuman FREEZE。TIRMO unresolved/WIPO UNKNOWNを記録済み。素材配布権利の最終判断は残る |
| domain | 公開前BLOCKER、未確定/未取得扱い。購入なし |
| 公開運営者 / 問い合わせ先 / 処理 | 公開前BLOCKER、名前/住所/support emailは未設定 |
| 対象市場 / 年齢 / 公開データ方針 | 一般向け/no age gate、Aのみは決定済み。対象国・providerアクセス処理・保持/同意の最終判断は残る |
| hosting / log / retention / consent / 法務草案 | 公開前BLOCKER。対象市場に合わせた最終確認を残す |
| 実機 / 全57問Human全編の個別証拠範囲 | 既存の限定証拠だけを保持。RC候補PASSから全端末/全編試験実施を推測しない。旧gateの証拠/適用範囲判断を別記し、候補受入の巻戻しにしない |
| deploy / 公開 | **未承認・未実施**。上記解消後も別途明示許可が必要 |
| 実URL smoke test | **別途承認されたdeploy後に実施 / NOT TESTED**。local smokeを代用せず、deploy前達成条件との循環を作らない |

`npm run check:release`は現時点でBLOCKED。レポートの`humanReview.rcCandidate=PASS`を維持し、`externalFirstUse=DEFERRED / NOT TESTED`を表示。`deployedUrlSmoke`は`after-authorized-deployment`段階に分離。これらのflagが外部操作を実行/承認することはない。

## 確認資料と停止

[1つの最新Review](http://127.0.0.1:4351/checkpoint-r1/REVIEW.html)、[対象QA/実行・再利用・未実施の区別](../qa/soft-launch-rc-r1/checkpoint-r1/REPORT.md)。旧Baseline・全比較証拠は変更せず保持。

主担当および独立read-only reviewer実モデル `gpt-6-astra`。今回Phase1に限り1 checkpoint commit/Private通常pushを許可。その他deploy / LAN再公開 / domain購入 / 外部API接続・送信 / 外部登録 / 契約0。追加アカウント/Cloud Save/DB/広告SDK/Analytics/CMS/ゲームpolishなし。**checkpoint後、domain読取調査と配信手順準備まで実施し、次の外部操作のHuman承認待ちで停止。既存RC受入PASSを維持する。**
