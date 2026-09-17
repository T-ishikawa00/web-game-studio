# Tinlumo — MVP Portal Visual Baseline R1

2026-09-17 **HUMAN ACCEPTED / FROZEN**。

HumanはPublic Copy Cleanup R1とTinlumo MVP Visual Polish R1のプレビューを確認し、全体UI、ゲームカード、Header/Footer、Analytics consent UI、公開文面を受入れた。明確な不具合または実データ上の根拠が出るまで、追加のVisual Polishを行わない。

## 固定する範囲

- Home/Gamesの3作品・画像・タイトル・説明・CTA、既存limeとdark text、軽量な背景、Header/Footer、日英運営ページの読み幅と余白。
- Public Copy CleanupのAbout/Privacy/Terms/Contact/Credits本文と必要なデータ・権利説明。
- 未選択時または設定を開いた時だけのcompact consent banner。許可/拒否を同等に提供し、拒否でも機能制限なし。選択後は消え、Footer/Privacyから変更可能。
- 3作品57問、game internals、保存互換性、採用素材/音は変更なし。manual Cloudflare Web Analyticsの既存consent JS、Automatic injection OFF、Preview Access/Analytics OFF、Free構成を維持。

受入れsourceは `src/rc/Layout.astro`、`src/rc/portal-polish.css`、`src/rc/AnalyticsConsent.astro`、`src/rc/PublicOperations.astro`、`src/rc/site.json`。共通runtime/consent JSは変更しない。

## Authority / evidence

- [Copy Cleanup R1](../qa/public-copy-cleanup-r1/REPORT.md) / [Visual R1 Before/After・画像・QA](../qa/visual-polish-r1/REPORT.md)。これらの当時の「Human待ち」は履歴として保全し、本記録の受入れ判断と分離。
- [受入れ候補manifest](../qa/visual-polish-r1/candidate-manifest.json) / [本番配布manifest](../qa/mvp-portal-release-r1/distribution-manifest.json)。本番向け差分は27Portalのindex設定とrobots/headersだけ。UI・文面・game payloadを再編集しない。
- この文書とmanifestを含むcheckpointを公開authorityとする。SHA・Version・Deployment・Production Smokeは [本工程のpostflight](../qa/mvp-portal-release-r1/POSTFLIGHT.md) へ別記し、自己参照のためのamendや追加commitをしない。

## 判定の分離

- Human Visual Acceptance：**PASS**。
- 実機Mobile：**NOT TESTED**。viewport確認を実機PASSへ拡張しない。新しい全57問のHuman全編試験・聴感試験も実施済みにしない。
- 外部初見：**DEFERRED / NOT TESTED**。
- 既知test failure2件は旧連絡先null / 公開artifact不存在という前提。今回regressionではなく、期待値・テストをついでに修正しない。
- Security raw既知SHA/TLSの別判定維持。新規Security候補・本番障害で停止。過去承認を新候補へ広げない。

今回Humanが許可した外部操作は対象checkpointの通常push、既存 `tinlumo-production` へのassets-only更新と `tinlumo.com` のsmoke。Preview、DNS、Analytics/メール設定、プラン、追加resourceを変更しない。正常な旧Production version `90d43a3e-d38f-4738-a7e7-19313d481ea7` を復旧先として保持する。
