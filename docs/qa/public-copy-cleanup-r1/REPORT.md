# Tinlumo Public Copy Cleanup R1

Status: **LOCAL_COPY_REVIEW_READY / DEPLOY_PENDING_HUMAN**. 2026-09-17. Primary and independent read-only reviewer: `gpt-6-astra`.

公開中の版は変更していません。HEAD/upstreamは `cce29ca91f9dd9c5f81c120e94eb2fc872e145cb` のまま。stage / commit / push / deploy / Cloudflare設定変更 / 外部送信は0です。

## Human review

| ページ | 変更前 | 今回の候補 |
| --- | --- | --- |
| About | ゲーム紹介に市場・メール・保持・法務の共通一覧が続く | 3つの無料パズル、日英、登録・購入・広告なし、ブラウザ保存、運営表記を簡潔に説明 |
| Contact / Operator | Human、専用受信箱、Soft Launchなどの内部運営説明 | Tinlumo Studio（個人運営）、support@tinlumo.com、通常返信方針、必要な運営者情報の請求方法、Privacyへの導線 |
| Privacy | データ説明と市場戦略・開発判断・実装詳細が混在 | 保存する情報と目的、削除方法、Cloudflare配信・任意計測、問い合わせデータ、保持・国外処理、法定請求に整理 |
| Terms | 保存の説明が重複し、共通運営一覧も表示 | 無料サービスの条件、保存・可用性の限界、権利・ライセンス、不正利用等の禁止事項 |
| Credits | 採用BGM、SVG/CSS Art等の内部寄りの表現 | 制作・画像・音声など自然な表現へ変更。AI支援来歴、素材・フォント・Astroライセンスの事実は維持 |

[日英の変更後全文](COPY_REVIEW.md) / [ソース差分](source.diff) / [配布差分・保全検査](copy-qa.json)

ローカル表示：
- http://127.0.0.1:4353/ja/about/ / http://127.0.0.1:4353/en/about/
- http://127.0.0.1:4353/ja/privacy/ / http://127.0.0.1:4353/en/privacy/
- http://127.0.0.1:4353/ja/terms/ / http://127.0.0.1:4353/en/terms/
- http://127.0.0.1:4353/ja/contact/ / http://127.0.0.1:4353/en/contact/

## 維持した実質的な説明

- localStorageの進捗・設定と利用目的、端末/browser/site依存、期限なし、削除時の喪失、作品別消去と全サイトデータ消去の違い。一時的なsessionStorage/メモリ情報も説明。
- Cloudflareの配信・保護に伴うIP等の処理、国外取扱い、provider側保持。計測default OFF、許可/拒否、拒否時も機能制限なし、送信項目、選択保存、撤回後の停止と開始済み通信の留保。ID/fingerprintや独自ゲーム操作イベントを追加しない。
- 問い合わせの自発的な送信情報・利用目的、Cloudflare Email Routing/Gmail、90日目安・月次確認・法的/セキュリティ等の保持例外、trash/backup/国外処理。SMTPや専用受信箱の構成説明は削除。返信元が異なる場合がある点だけユーザー向けに残し、非公開アドレスは表示しない。
- 法令上の運営者情報・個人情報請求、必要な本人確認、遅滞ない対応。通常問い合わせの任意返信とは区別。
- 権利/個別ライセンス/OSS許諾、禁止行為、可用性/保存回復を保証しない条件と制限できない法定権利。

市場の内部判断や過去の承認履歴はsite.json/既存資料に保全し、HTMLに表示しないようにしました。新しい法的保証や実名・住所の公開はありません。

## QA結果

- 公開候補のAstro build：**PASS、28ページ/52ファイル**。既存public-release-buildを参照したrepo内一時helperで出力先だけ分離。`.cache/tinlumo-copy-cleanup-r1`、[manifest](candidate-manifest.json)。通常のfixture用buildではなく、今回変更が実際に使われる公開profileを検証。
- 型検査 `npm run check`：**0 errors / 0 warnings / 3既存hints**。
- `npm test`：**214/215 PASS、1件FAIL**。下表の既存前提によるもの。
- 既存locale/analytics consent/release projectionテスト：**10/11 PASS、1件FAIL**。locale/consentの8件はすべてPASS。
- 既存公開QAのローカル部分：**PASS**、27Portalページ・3frame、リンク/metadata/公開support表示/メールアドレス制限/隔離・12HTTP確認。出力先とportを今回候補へ向け、外部Preview照会部分は今回再実行せず0件と記録。元のテストとprovider設定は変更なし。
- 配布比較：**日英5ページ=10HTMLの本文差分のみ**。local review用noindexとrobots/headersの差は公開用変更として扱わない。その他の配布payloadは本番manifestと一致。26ページのconsent componentは文字列一致。ゲーム全57問・素材・音・保存・consent JS・locale JSは不変。
- 公開HTMLの内部語検査：Human、Soft Launch、SMTP、専用受信箱、市場順位/Geo-block戦略等は**0件**。内部設定JSONは配布されない。
- Browser：JA Contactの390×844表示で横はみ出しなし（375/375px）、Contact→Privacy請求節、Privacy→既存計測設定→拒否、EN Privacyへの言語切替を確認。ローカルでAnalytics resource0。デスクトップ表示も確認。実機や全57問を再試験したとは扱わない。
- 配布secret scan：**PASS0**。[結果](distribution-security.json)。全project raw：**FAIL、既知2件のみ、新規0**。既知SHAの誤検出とlocal TLS鍵の実秘密判定は別々に保持。scanner/hook/allowlist変更なし。
- 独立copy review：一時保存の英語説明を「ゲームの二重起動防止」から実態に合う「開始記録の重複抑制」へ自己修正。実質的な説明欠落なし。

### 既存テストの失敗（今回の差分へ帰属しないもの）

| テスト | 古い期待 / 現在の事実 | 確認 |
| --- | --- | --- |
| `tests/unit/rc-readiness.test.ts:20` | publicContactがnull / 現行authorityはsupport@tinlumo.com | HEADのsite.jsonをrepo内一時fixtureへ読取り複製し、同じテストを再実行。同じassertion失敗を再現。対象期待値・readiness logicは今回不変 |
| `tests/release-prepare.mjs:18` | `.cache/tinlumo-approved-dist`が未作成 / 前工程で公開済み配布物が存在 | テスト・prepare関数はHEADと不変。prepareはfalseで新規出力なし。既存公開artifact52ファイルが公開時manifestと一致。旧不存在assertionを満たすために配布物を消さない |

今回、テストを弱めたり旧前提に合わせて連絡先や公開artifactを戻したりしていません。全件greenではなく、上記2件を残したHuman review用差分です。

## 変更・保全・再起動

変更source：`src/rc/PublicOperations.astro`、`src/rc/site.json`（公開文言だけ）。現在地索引：`docs/games/PRODUCTION_CURRENT.md`。新規証拠：本ディレクトリ。既存27 untrackedファイル（無関係13・以前のpostflight・前回公開証拠を含む）をhash一致で保全。採用済み公開artifact52ファイルも不変。Git index空。

停止している場合のみ、repoルートから `node .tmp/public-copy-cleanup-r1/server.mjs` で127.0.0.1:4353を起動。再buildは `node .tmp/public-copy-cleanup-r1/build.mjs --verify-manual-snippet`。既存4352/Preview/Productionは操作しない。候補はnoindex・loopback限定で、localhostではconsentロジックにより外部計測を開始しません。

今回の停止点：Humanによる文章レビュー。本番反映は別途Human承認が必要です。
