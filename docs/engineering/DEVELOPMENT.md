# Development & Testing

## 環境

Node要件は22.12以上。Astro 7.3.2、TypeScript 6.0.3、@astrojs/check 0.9.10、tsx 4.23.13等はlockfileで固定しています。今回の環境はWindows / Node v24.14.0 / npm 11.9.0。最小version22.12.0で全commandを試験したという意味ではありません。

既存rootには終了時の意図した削除と別企画が残ります。reset / clean / stash / pullで整えず、隔離checkoutを使います。Git書込み権限はAGENTS（参照原本はPrivate保全・候補には非同梱）と最新Human依頼を確認してください。

新規checkoutの依存導入は`npm ci`です。lockfileを維持し、勝手にupgradeしません。今回worktreeのQAは既存rootの固定依存をrepo内junctionで参照して開始しました。独立再取得・依存導入の結果はReport（参照原本はPrivate保全・候補には非同梱）に分けて記載します。

```powershell
npm ci
npm run dev -- --port 4321
```

4321の`/ja/`は初期Portal / fixtureです。完成版閲覧は[Local Preview](LOCAL_PREVIEW.md)を使います。

## Commandと検査対象

| Command | 対象 | 今回の位置づけ |
| --- | --- | --- |
| `npm test` | `tests/unit/*.test.ts`。保存、logic、PCM等 | 215 tests PASS |
| `npm run build` | 通常Astroの初期Portal / fixture、18 pages | PASS。8作品の再buildではない |
| `npm run preview -- --port 4322` | 上記distのloopback配信 | route QA前提 |
| `npm run test:routes` | 日英Portal、fixture、link / asset、404、draft | 3 tests PASS。production artifactとは別Gate |
| `npm run check` | rootの広いAstro / TypeScript | 完走、582 errors。全体PASSではない |
| `node --test scripts/release-preview/server.test.mjs` | 新previewのHTTP / 安全境界 | fresh結果はReport |
| `node <復元先>/verify.mjs --root <復元先> --base <loopback URL>` | 固定版bytes / HTTP / guard | gameplayの代替ではない |

Astroがbackground preview起動を通知した場合は、そのcheckoutのCLIが示す`astro preview stop`を使います。今回のowned serverを識別せず他processを停止しません。新しい保存版previewはforeground Node serverで、`Ctrl+C`を使います。

## 型検査

`astro/tsconfigs/strict`、`noUncheckedIndexedAccess:true`を維持しています。今回、strict、既存check、scanner、hook、allowlistは変更していません。

以前の9,985 roots / 8,009追加copy / 4GB・12GB OOMは過去の記録です。今回、cleanな保存mainにpreview helper初期版を加えた時点では1,286 filesで完走し、582 errors、0 warnings、1,324 hintsでした。最終helper追加後のfresh結果はReportを参照してください。

`include:["**/*"]`が制作履歴、複製source、配布moduleも読みます。canonical source対応を確認せず一括除外するとエラーを見逃します。今回は対象を減らしてPASSにする変更をしていません。将来分割する場合、root外のTS原本を明示matrixで保持し、同等のstrictと`noUncheckedIndexedAccess`を検証する必要があります。

## Troubleshooting / cache

既存復元先には上書きせず別名を使います。manifest mismatchは停止理由であり、hashを置換して通しません。port使用中は別portを選びます。WebGL不調はbrowser / GPU環境も記録します。

cacheの一括削除は含めません。`.tmp`、`.cache`、`dist`にも保全資料・input・未判定候補がある場合があります。所有者・再生成条件・対象を確認して限定処置します。今回生成した約1GBの保全パッチ1件だけはHuman個別承認で除去しました。元のdirty・削除状態・資産には触れていません。

commit前は[SECURITY](../../SECURITY.md)に従い、ignoredを含む全projectとfull index、push前は全local historyを検査します。既知raw FAILと限定Human dispositionは別判定。新規候補、scanner missing / ERROR、index / history FAILは停止条件です。

QA選択は[Playbook §4.2](../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change)。技術、視覚、独立レビュー、実機、Human受入、法務、外部配信を区別します。
