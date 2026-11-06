# Architecture

静的Portalと作品別runtimeを中心とした構成です。開発fixture、当時の配布物、後続作品の統合が同居しているため、rootを1回buildすれば全releaseが再現する構造ではありません。

| 層 | 入口 | 責務 |
| --- | --- | --- |
| Metadata | `src/data/games.ts` | registry、locale、slug / build path。fixture等とproductionCandidateRegistryが共存 |
| 通常Portal | `src/pages/`、`src/components/`、`src/lib/` | 初期Portal、接続fixture、保存・mock広告の基盤 |
| Production Portal | `src/production/` | 採用済み5作品Portalの日英templates、copy、CSS、settings |
| 公開共通部分 | `src/rc/` | 同意、言語、保存説明等 |
| 作品runtime | [source一覧](RELEASES.md) | 描画、入力、進行、音、保存 |
| 初期build | `astro.config.mjs` / `scripts/astro.mjs` | `src/pages`と`public`から`dist/`へ |
| 5作品builder | `scripts/visual-remaster-build.mjs` / `astro.visual-remaster.config.mjs` | 個別source、先行Island配布物、Three.js等を組み合わせる専用build |
| 後続統合 | `rimbloom-complete-r2-integration/`、`game008-009-production-r1/` | 固定package入力、adapter、release検証 |
| 最終保存物 | `tinlumo-visual-remaster-final-integration-r1/builds/candidate/` | 8作品のHTML / JS / media等248ファイル |

相対パスはrepo root基準です。[Release catalog](RELEASES.md)から固定版へ移動できます。

## 配信・保存・同意

公開時はCloudflare Workers Static AssetsとWorkerを使用していました。GrowthにはD1、明示同意した利用者の限定event、TTL用scheduled処理がありました。これは過去の構成で、現在の接続やDB存在を意味しません。旧Worker / configは再公開の実行指示ではありません。

browser保存はoriginごと、game別namespace / versionで管理します。rootの共通保存基盤と独立作品の保存実装が併存します。復元previewは旧productionと異なるoriginで、旧本番saveを復元・移行しません。account / cloud saveは追加していません。

Consent C、後期Growth同意、Google CMP、広告表示は別の仕組みです。新previewでは外部subresource / connect / formsをCSPで制限し、Growth / APIを無効化します。広告fillやCMP live動作は再現しません。

## 配布物と再build

artifactにはminified bundleと、後続作品の編集可能なJS / MJS moduleがあります。一方、最終remasterの独立workspaceと最終pipelineの完全性は別問題です。配布moduleの保全を根拠に、全制作環境の再build成功とは記載しません。

過去の`release-artifacts/`は後続builderの入力の場合があります。古いdistという理由だけで削除しません。manifestに候補時点のPENDINGが残る場合は、release commit、POSTFLIGHT、採用記録を併せて確認します。

今回追加した`scripts/release-preview/`はNode標準libraryだけで固定Git objectを読み、検証済みfileだけをloopback配信します。ゲームsource、runtime、保存形式、既存builderは変更していません。
