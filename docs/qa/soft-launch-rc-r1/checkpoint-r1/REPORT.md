# Tinlumo Soft Launch RC — checkpoint R1

2026-09-17 JST。実利用主担当モデル `gpt-6-astra`。Human RC Acceptance **PASS**、名称はSoft Launch用Human FREEZE。外部初見 **DEFERRED / NOT TESTED**。一般公開0、公開BLOCKED。

## 範囲と保全

開始時main / HEAD / origin/main / actual remoteは `44ce3ca2e079aa64733be7da3435726e400a54c6`。GitHub metadataでPrivateを確認。既存uncommitted RC・名称・保存方針をすべて引継ぎ、今回のHuman決定をsite.json、About/Privacy/Terms、Decision Pack、Checklist、Currentへ反映。

全57問、game ID、save key/schema、Art/Motion/Audio、旧Baseline・旧QA・比較資料は変更なし。無関係なtiny-physical-mobile-r2証拠、LAN helper、Lightwork preservation/security helperは初期状態を保全し今回のstageから除外。詳細は[verification](verification.json)。

## 実行QA

- `npm run check`：0 errors / 0 warnings、既存3 hints（旧音源証拠scriptの未使用import。今回差分外）。
- `node --import tsx --test tests/unit/rc-readiness.test.ts`：3 PASS。名称FREEZE・A方針選択でdomain/contact/公開承認が自動PASSしないことを確認。
- `npm run build:rc`：28 pages / 48 files、3作品の採用元bundle byte一致、現RCの非HTML17 payload byte不変。
- `node tests/rc-release-final.mjs --navigation-only`：日英×3作品の通常導線・入力・作品別保存/reload・pause/resume、運営草案320/1440幅、外部request0。[結果](browser-results.json)
- 日英8運営ページ：個人運営/一般向け/計測方針、未取得support address非掲載、beacon未接続、noindex継続を確認。
- `node scripts/rc-audit.mjs`：配布allowlist48、内部/秘密等11 URLは404、配布Gitleaks0候補。[配布manifest](distribution-manifest.json) / [監査](distribution-audit.json)
- `node scripts/rc-hosting-check.mjs`：offline設定、25MiB/20,000 files上限、日英26 route投影PASS。Wrangler/CDN/公開TLSを試験済みとはしない。[結果](hosting-validation.json)
- `node scripts/rc-preserve.mjs`：旧source/evidence1690件と凍結runtime照合PASS。
- `node scripts/rc-release-check.mjs`：意図どおりBLOCKED（exit1）。Human RC PASS、first-use deferral維持。[残件](release-readiness.json)

## 再利用・未実施

全57問技術再生、既存音/停止復帰/保存失敗/広告mock等は旧RC QAを再利用。ゲームpayload不変を確認したため全問再生・大量画像を増やしていない。Hakorilo BGM 12,288,044 bytesは前工程の1Mbps/150ms cold-cacheと取得失敗検証を再利用（初操作/保存29ms・32ms、取得中/失敗でも継続）。[旧回線シミュレーション](../release-final-r1/browser-results.json)。実回線/実機試験・Human全編・外部初見・本番smokeへPASSを拡張しない。

## Security・Git境界

全project（ignored含む）raw scan **FAIL2**。既知SHAは **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**、TLS鍵は **TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION** を分離。新規候補0のときだけ進む。全indexとlocal historyは独立検査し、TLS path/content不在、認可されたlocal file外への複製なしを照合。[値を含まない結果](security.json)

補助検査の旧「承認済みSHAの候補ファイル内出現0」前提は、既存4工程のbefore.jsonにあるSECRETS_REGISTER自身のsha256保全記録で不成立。4件すべての用途・対象file・同一原本由来と、metadata以外の使用0を局所確認して補助検査を修正。scanner候補の追加・例外追加・raw FAILのPASS化はしていない。

今回のみ1 checkpoint commit、Private origin/mainへ通常fast-forward push1回。pre-commit hook維持、force/rebase/history rewriteなし。push後のSHA一致はPhase2/3のreceiptに記録（commit自己SHAを内部へ捏造しない）。購入/resource作成/deploy/DNS/Analytics/Email Routing/契約/外部問い合わせ送信は0。

## ローカル確認

[日本語](http://127.0.0.1:4350/ja/) / [English](http://127.0.0.1:4350/en/) / [Decision Pack表示](http://127.0.0.1:4351/checkpoint-r1/REVIEW.html)。再起動はrepoで `npm run build:rc`、portが未使用のときだけ `npm run preview:rc` と `npm run review:rc`。loopback限定、既存process停止/LAN再公開なし。
