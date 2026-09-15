# 指示基盤整理 — Review report

2026-09-15 Human依頼。対象 `C:\projects\Web Game Studio`。**文書整理と読み取り検証を完了し、Humanレビュー待ちで停止。ゲーム改修には着手していない。**

## 構成と変更ファイル

| ファイル | 役割・変更 |
|---|---|
| AGENTS.md（参照原本はPrivate保全・候補には非同梱） | 恒久境界・Tier/責任・基本コマンド・作業別参照の入口。常時読むのは入口と現在地 |
| PRODUCTION_CURRENT.md（参照原本はPrivate保全・候補には非同梱） | 最新Human判断、ローカル差分、次の未実装、停止点。LG-C Motion/SFX採用、Object Design未実装、Tiny R2凍結・実機限定PASS、外部初見DEFERREDを反映 |
| [既存Playbook](../../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change) | §4.2に影響別QAを集約。冒頭で旧snapshot/再開バッチを履歴と明示。既存本文は保持 |
| 履歴索引（参照原本はPrivate保全・候補には非同梱） | 過去工程・完了済み単発Git許可から元の仕様/結果へ誘導。再利用不可を明記 |
| AGENTS.before.txt（参照原本はPrivate保全・候補には非同梱） | 整理開始時の未commit AGENTS全文をbyte単位で保存 |
| PRODUCTION_CURRENT.before.txt（参照原本はPrivate保全・候補には非同梱） | 整理開始時の未commit current全文をbyte単位で保存 |
| 本REPORT.md | 変更範囲、保全、読込量、3例の読み取り検証と限界 |

上記7ファイルのみが今回の納品差分。新Skill・管理システムは追加していない。ignored `.tmp/instruction-router-2026-09-15/` に開始時manifestと編集前3文書・確認結果だけを保持し、ゲーム成果・画像・音源を重複生成していない。

## 維持した重要条件

- START_HERE原本/事業方針、repo内限定、外部操作・費用・LAN境界、現在のno-stage/commit/push。
- Tiny R2、Portal/R5、全57問、日英/3表示、保存、公開0・Preview10隔離、既存Art・音・比較証拠とLightwork未反映成果。
- 技術QA、Human採用、実機、外部初見、全57問全編受入、公開/法務/広告を分離。機種・OS・browser不明はUNKNOWN。LG-C採用を根拠に実機や全編受入へPASSを拡張していない。
- SHA誤検出とTLS実秘密鍵は別判定のまま。raw FAILと限定Human承認を分け、新規候補へ拡張しない。既存Security文書・テスト・hook・scanner設定は不変。

## 3例の読み取り確認（実装なし）

| 例 | 新入口からの参照先 | 導ける変更範囲 | 導ける停止条件・QA |
|---|---|---|---|
| LightworkのArt変更 | AGENTS → Current → Pilot §0/2/5–6/11–12 → R5基準/Lightwork QA → R5にあるart/visual-language/board-view source参照 | 次の差分は鏡・受光器・門の意味を伝えるObject Design。採用LG-C Motion/SFX・BGMなし・R5・18問・ルール/保存・Tiny凍結を保全。Artの具体仕様・変更ファイルは次の依頼とsource依存確認で決める | **今回実装不可**。将来も共通sourceやTiny frozen出力への波及を先に調べ、凍結を保てない場合は該当変更停止。権利不明/Secret/外部影響は解決・承認前に進めない。対象型/build/代表局面の実ブラウザ・3表示/日英と関連回帰、必要なTiny厳密再現。不要な全画像撮り直しを標準にしない |
| 保存変更 | AGENTSのS担当 → START_HERE §13 → Portal仕様の保存契約 → Playbook §4.2/5.3–5.4 → `src/prototypes/state.ts` / `src/lib/save.ts`・関連unit/browser tests | game別namespace/version、既存schema/安定ID、破損/未知版時の原データ、読戻しで成功確認、明示resetを維持。共通adapterとprototype保存は区別し、音設定を進行へ無造作に混ぜない | **今回変更不可**。将来も未承認の移行/互換性破壊、Tiny凍結不整合、予期しない失敗はS判断・該当変更停止。共通Runtimeなら広い回帰、旧save/拒否/破損/書込失敗/reset/他作品不干渉を確認 |
| 新規Secret検出 | AGENTS Security → SECURITY全文 → Incident §1–7 → Register → SHA/TLSの個別判定 | file/type/actionだけで候補と必要判断を記録。独立した安全な文書作業は継続可。実在候補の検出・追加承認をこの例で作ったわけではない | 対象commit/push/releaseを止めHuman判定。既知承認の流用、値/断片/画像の開示、provider検証、自動削除・rotation/履歴改変/allowlist拡張をしない。露出があればTLS判定の即時停止。後の許可されたGit操作では全project/index/history・hook要件を適用 |

主担当による3経路の読取り：PASS。元資料の旧PENDING/54問/単発許可はCurrentと履歴の区別で解消し、原資料自体は書き換えていない。保存sourceのnamespace、厳密validation、読戻し/resetも読み取り確認した。新しいゲーム仕様の承認・実装QAではない。

## 検証と実行範囲

開始時 `main` / HEAD / local upstream `origin/main`：`e24556ba57284d993cdb0ac9c476a975f63bef11`。index差分なし、stashなし。既存未追跡74ファイルを含む1654ファイルを開始時manifestで確認。実remoteの最新状態は今回未照会であり、GitHubとの現在一致を主張しない。

| 確認 | 結果・範囲 |
|---|---|
| CWD / Git root・差分範囲 | PASS。本repo、既存変更3文書＋新規4文書のみ |
| 既存ファイル保全 | PASS。開始時1654ファイルのうち変更対象3文書を除く1651ファイルがbyte不変。START_HERE・ゲームsource/Art/音/問題/保存/依存・テスト/hook/scanner・既存QAを含む |
| 履歴の全文保全 | PASS。旧AGENTS/currentの2コピーは開始時版とbyte一致。Playbookは冒頭注記と§4.2を除く既存本文が一致（改行を正規化して照合） |
| 参照/節/権限 | PASS。変更Markdownのローカルリンク66件のファイル/anchor存在を確認。参照対象節と3経路は主担当/独立担当が読取り確認 |
| 差分whitespace | PASS。trackedの`git diff --check`、新規Markdownのno-index差分確認。履歴txtは旧改行を含むbyte保全を優先 |
| Git保全 | PASS。HEAD/branch/local upstream/stash不変、index差分なし。remoteは未照会 |
| 独立レビュー | PASS。Astra read-only担当が3例、旧指示と最新判断の優先関係、安全/QA境界を確認。重要不整合なし |
| ゲームQA / scanner | 今回は未実行。下記の理由と以前の証拠を区別 |
| Human整理結果レビュー | PENDING。本作業の技術/文書検証から自動受入にしない |

保全manifestはGit管理対象と非ignored未追跡ファイルが対象。既存ignoredキャッシュ/秘密鍵はコピー・編集せず、全ignored領域のbyte不変や全PCの状態不変までは主張しない。検査の一時結果は `.tmp/instruction-router-2026-09-15/verification.json`。初回no-index確認で差分ありのexit 1をエラーと分類したが、診断出力なしの正常な差分と切り分けた。検査ロジックを修正し、文書を緩和して通したものではない。

## 常時読込量の前後

UTF-8本文をUnicode文字数で集計、CRLFはLFへ正規化。token数ではない。作業別の追加読込は別枠とし、リンクの先まで常時全文を読む量には含めない。

| 比較 | 変更前 | 変更後 |
|---|---:|---:|
| AGENTS単体 | 11,778文字 / 67行 | 4,658文字 / 45行 |
| Current単体 | 7,721文字 / 39行 | 2,654文字 / 31行 |
| 入口で一律必須の最小量 | 31,844文字 / 904行（旧AGENTS＋START_HERE全文） | 7,312文字 / 76行（新AGENTS＋Current） |

旧運用でCurrentも読んだ場合は39,565文字 / 943行。旧Pilotの全関連資料まで含めた最大量は比較に使っていない。START_HEREは20,066文字 / 837行の原本をそのまま保持し、該当作業の節を必要時に読む。削減率は必読最小量との比較で約77%であり、品質条件の削減率ではない。

実利用モデル：主担当 `gpt-6-astra` / high（本タスクsessionのturn_contextで確認）。独立read-onlyレビュー `gpt-6-astra`（担当報告）。Sol/Lunaは未使用。global設定・Memory・他repo・既存Skillへの書込なし。

stage / commit / push / deploy / LAN再公開 / 購入 / 外部送信：0。サーバー起動なし。コード/build依存変更がない文書整理のためゲームtest/build/全問再生・画像/動画/音源再生成は未実施。Security scannerも今回未実行で、直近raw FAIL/2件・index/history PASSは [既存証拠](../lightwork-craft-pilot-01/security.json) の記録として参照し、今回のscan PASSにはしない。
