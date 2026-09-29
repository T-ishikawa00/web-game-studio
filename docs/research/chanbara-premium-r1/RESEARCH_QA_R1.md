# CHANBARA PREMIUM RESEARCH — QA / PRESERVATION R1

2026-09-28 JST · DOCUMENTATION ONLY · NO_IMPLEMENTATION

[総合入口](CHANBARA_PREMIUM_PRODUCTION_RESEARCH_R1.md)

**最終検査：指定9資料＋本QA、ローカルリンク50件、文書検査・`git diff --check`通過。保全差異は許可したCurrent追記のみ、開始時本文・HEAD・indexは保持。research限定scanの新規候補0件。** 外部URLは104件を記載し、全件一括のリンク稼働検査ではなく研究時の閲覧に基づく。連続motion・実聴・操作比較は未実施。

## 1. 今回の変更範囲

指定の9 Markdown資料、本QA、repo内の検証記録のみを作成。`docs/games/PRODUCTION_CURRENT.md`へ研究状態を追記し、開始時本文をbyte単位で後ろに保持する。現行製品のsource、asset、bundle、gameplay、Portal、Production、YouTubeへの変更はない。

閲覧した外部資料は公式文書、開発者資料、Steam、市場の公開商品・規約ページ。既存のHuman採用A画像も直接確認した。外部assetのdownload・取得・購入・登録・upload、dependency追加、engine導入・移行、外部への問合せ・投稿、Git stage/commit/push/deployは実施していない。新規preview serverは起動せず、既存processも停止していない。

## 2. 文書QA

| 確認 | 実行 / 再利用 / 未実施と理由 |
|---|---|
| 9成果物と依頼20節のcoverage | 実行。総合資料のRequest coverageへ対応を記載 |
| Markdownローカルリンク・空ファイル・文字化け・code fence・末尾空白 | 実行結果は[validation.json](internal/validation.json) |
| tracked差分の空白検査 | `git diff --check`。既存dirtyも対象、修正は今回範囲だけ |
| 価格・規約・engine・市場情報 | 当日公式sourceを閲覧。source URLと全URL共通の閲覧日を文書に記録。将来のリンク・価格不変は保証しない |
| 価格計算と見積の区別 | $112、$210、$310、$98を照合。購入basket未確定、外注総額UNKNOWN、工数は計画仮説 |
| Game型/build/unit/route/responsive/入力/保存/mock広告 | 未実施。runtime変更なし。過去技術PASSを今回再実行済みと扱わない |
| 競合の連続motion・実聴・操作・実機比較 | 未実施。資料・静止画の研究と区別し、総合冒頭にも制限を表示 |
| Engine性能・AI3D出力・素材実ファイル検収 | 未実施。導入・生成・downloadを禁止した今回scopeの外 |
| Human strategy / Craft / market demand | PENDING / UNKNOWN。資料検査では受入判定できない |

## 3. 独立read-onlyレビュー

主担当が最終統合。subagentは市場、engine/配布、asset/licenseの3領域を調査し、書込み・素材取得・外部変更権限を委任していない。engine担当は総合・推薦の執筆前7資料を横断レビューし、asset担当は素材・費用・Artの3資料を重点レビューした。総合・推薦・保全scriptは主担当が確認した。実行model IDはコンテキスト未提示のため全員UNKNOWN。

| 指摘 | 対応 |
|---|---|
| Unity素材の独立抽出制限を「主目的」に弱めない | 修正。完成製品と別途extract/downloadを提供する設計の禁止を公式FAQに沿って明記 |
| 連続motion/実聴未実施をREADYの近くへ | 総合の一画面Review冒頭へ追記 |
| Mortal Sinの販売claimを固定記事へ | 該当記事URLと本文確認済みニュース一覧を併記。自己申告扱いを維持 |
| VFXがcategory調査止まり | Sword Slash-Stylized vfxの公開SKU/価格/URP条件を追加。採用・Web適合は未検証、費用basketから除外 |

## 4. 保全とGit境界

開始時：`C:\projects\Web Game Studio`、branch `main`、upstream `origin/main`、HEAD `d8ca30c36d94f1a9272267497c993a12dd0e9f25`。既存tracked dirty4件、既存untracked成果を継承。HEAD/upstreamのremote再照会や更新はしていない。

[baseline.json](internal/baseline.json)と[preservation.json](internal/preservation.json)で、16,298 filesのsize/mtime、3,625点の非秘密hash、HEAD、index、branch、upstream名を比較。hash範囲はtracked非秘密とChanbara source/画像/文書等。大きいblend/GLB/video等はsize/mtime比較であり、全binaryのbyte同一を証明するhash検査とは異なる。`.git`、`node_modules`、`.cache`、`.tmp`、`.astro`はfile walkから除外し、`.git/index`は個別hash。秘密候補ファイルの内容hashは収集しない。

既存Current本文は[validation.json](internal/validation.json)の`currentOriginalBytesPreserved`でbyte保持を照合。他の既存ファイルに許可差分を設けない。新規出力はresearchフォルダ内のみ。

## 5. Securityの判定範囲

既存のGitleaks 8.30.1とrepo設定を変更せず、今回researchフォルダへscopeを限定した検査を実行した。結果は[security-scoped.json](internal/security-scoped.json)。新規候補0件。候補が出た場合はfile/type/actionのみ記録する方式で、自動除外・削除・provider検証はしない。

これは全project・ignored・full index・historyの再検査ではない。commit/pushがないため今回それらを実行しない。**既存raw FAIL22 / historical FAIL11 / S04–S05 UNKNOWN / TRR1-NEW-05限定保持・平文UNKNOWNは維持。** scoped検査を全体Security PASSや公開許可へ昇格させない。

## 6. Stop

9本の研究成果物をHumanへ提出する段階で停止。**NO_IMPLEMENTATION / HUMAN_PRODUCTION_STRATEGY_GATE_PENDING**。Gold制作、asset取得、engine移行、販売・公開決定は開始していない。
