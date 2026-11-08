# Games & Releases

| 役割 | Commit / artifact | 規模 |
| --- | --- | --- |
| 2026-09-27公開5作品 | `d8ca30c36d94f1a9272267497c993a12dd0e9f25` / `release-artifacts/tinlumo-copy-debt-r1/` | 102 files、39 routes。HTTP101＋`_headers`1 |
| RIMBLOOM R2公開系統 | `d71fb6472514b6f86d4b5c0729d1b034fe8fadd5` | 後続6作品系統 |
| COILHOP追加 | `74dcbec52615e532ff9b39fc05f239f922b6abf3` | 7作品系統 |
| EMBER & GLAZE追加 | `f9d5d99277dd1e2a1ec9b5bcde4ea4d987bdde30` | 8作品系統 |
| 最終Visual Remaster公開系統 | `bb243407a760a117dcf892bfab26c5cdb18c20ad` / `tinlumo-visual-remaster-final-integration-r1/builds/candidate/` | 248 files、51 routes。HTTP247＋`_headers`1 |
| 終了時原本保全 | `ab91ae39c767b5cb0ff2f8ce10a10e9bab93dfad` / `archive/tinlumo-final-preservation-20261024` | 上記mainから1 commit、追加10＋変更12、削除0 |

9月27日版のPOSTFLIGHTは当時の101配信file / 39 routes照合の履歴です。今回のローカル公開準備で過去の配信bytesは再検証していません。元manifestの候補statusも当時の記録として保持します。

最終manifestのsourceHeadは構築基準で、release HEADではありません。releaseに残るPENDINGは当時の記録で、現在の承認ではありません。固定Git treeのfresh照合・不一致はこの公開準備作業では再検証していません。

## Sourceの入口

| 作品 / slug | 編集・保全source | 制約 |
| --- | --- | --- |
| Hakorilo / `tiny-delivery` | [hakorilo-u1-remaster-r1/src](../../hakorilo-u1-remaster-r1/src/) | 採用原本とbundleを区別 |
| Lightwork Garden / `light-garden` | [wave1/lightwork/src](../../tinlumo-remaster-wave1/lightwork/src/) | 18庭園、作品固有の保存・音 |
| Two Ways Home / `two-ways-home` | [wave1/two-ways/src](../../tinlumo-remaster-wave1/two-ways/src/) | 採用済み21面。旧18面へ戻さない |
| PROJECT MAGNET / `project-magnet` | [wave1/magnet/src](../../tinlumo-remaster-wave1/magnet/src/) | full / tempo等の制作段階も保全 |
| 島をつなぐ日 / `island-connections` | [game005-island](../../game005-island/) / [先行artifact](../../release-artifacts/game005-web-v1/) | 追加原本6点はarchiveのみ |
| RIMBLOOM / `rimbloom` | [R2 standalone](../../rimbloom-complete-r2-integration/inputs/standalone/) | final配布moduleは最終artifact内 |
| COILHOP / `coilhop` | [Game008 package](../../game008-009-production-r1/game008/inputs/package/source/) | 初期packageとfinal bitmapを区別 |
| EMBER & GLAZE / `ember-glaze` | [Game009 package](../../game008-009-production-r1/game009/inputs/package/source/) | 初期packageとfinal器素材を区別 |

routeは`/{ja|en}/games/{slug}/`と`/{ja|en}/play/{slug}/`。接続fixture、Design Preview、internal prototypeは公開8作品に含めません。番号の空きから作品を補いません。

## archive22パス

追加原本10点は以下です。差分全体は`git diff --name-status bb243407 ab91ae39 --`で読取りできます。

```text
game005-island/hillside-r1/src/core.ts
game005-island/hillside-r1/src/game.ts
game005-island/hillside-r1/src/save-key.ts
game005-island/hillside-r1/src/scene.ts
game005-island/hillside-r1/src/storage.ts
game005-island/web-v1-r1/src/game.ts
tinlumo-visual-remaster-final-integration-r1/r1/assets/bowl-states-source.png
tinlumo-visual-remaster-final-integration-r1/r1/assets/kiln-empty-source.png
tinlumo-visual-remaster-final-integration-r1/r1/assets/pitcher-states-source.png
tinlumo-visual-remaster-final-integration-r1/r1/assets/vase-states-source.png
```

変更12点はCURRENT、旧Security evidence、Hakorilo source、RIM adapter、Visual Remaster adapter / HTML helper、Island copy、site CSS、PublicOperations、Growth review2点、MAGNET sourceです。archive保管は全体の新規Human受入ではありません。既存rootのdirtyを今回commitへ混入させず、archive ref / 履歴 / bytesを保持します。
