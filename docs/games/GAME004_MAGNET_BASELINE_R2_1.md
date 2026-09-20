# PROJECT MAGNET R2.1 — Human Baseline / adoption checkpoint

2026-09-20 **HUMAN_PROGRESSION_GATE_PASS / BASELINE FROZEN**。

Humanが実際に試遊したR2.1の体験を採用。「かなり満足」と評価し、既に評価したCraft・Combat・発展性に加え、充電テンポとクリア→強化の接続を採用した。固定対象は現行6区画・3回の選択・SWARM／LANCE・炉心戦・既存Art／主要SFX。追加Polish・敵・進化・区画の制作を開始しない。

**受入範囲は今回Humanが試遊した体験だけ**。両Build全編のHuman受入、物理スマホ、個別の聴感、外部初見、市場性、公開可否はUNKNOWN / NOT TESTED / PENDINGのまま。自動QAの両Build完走をHuman全編PASSへ変換しない。旧Reviewや検証JSONのPENDINGは当時の記録として凍結し、この採用判断が現在のAuthorityとなる。過去の事実を書き換えない。

## 採用checkpointの内容

[凍結manifest](../qa/game004-magnet-baseline-r2-1/frozen-manifest.json) がソース・必要証拠・依存・配布物hashの正本。[選択manifest](../qa/game004-magnet-baseline-r2-1/checkpoint-manifest.json) は今回のindex対象を列挙。最終commit SHA／push／実remote照合は、自己参照のamendや2commit目を作らず、ローカルの [postflight](../qa/game004-magnet-baseline-r2-1/POSTFLIGHT.md) に記録する。このpostflightのみcheckpoint後の未commit証拠となる。

|必要なもの|正本 / 扱い|
|---|---|
|採用ゲーム|`game004-magnet-tempo/` の9ファイル。core/main/progression、Canvas art、WebAudio synthesis、CSS、HTML、env型。今回一切変更しない|
|素材|絵・音の編集可能な原本はart.ts/audio.ts。外部画像・音源・fontファイルなし、system font。AI-assisted local original codeという出自であり法的保証ではない|
|ビルド|`scripts/magnet-tempo-build.mjs`、`scripts/project-path.mjs`、既存package.json/package-lock.json。configFile:false/publicDir:false、専用Vite 2entry。Productionビルドとは隔離|
|再現検査|`scripts/magnet-baseline-verify.mjs`。凍結入力のhashと別出力先の再buildを照合。元ソース・元配布物・証拠を上書きしない|
|試遊|`scripts/magnet-tempo-server.mjs`、loopback4369。公開サーバーではない。既存プロセスは止めず、port使用中なら既存previewを利用|
|Research / 判断|[Gold research](GAME004_MAGNET_RESEARCH_R1.md)、[Progression research](GAME004_MAGNET_PROGRESSION_RESEARCH_R1.md)、[R2](GAME004_MAGNET_PROGRESSION_SLICE_R2.md)、[R2.1](GAME004_MAGNET_TEMPO_R2_1.md)。新規の機能探索調査なし|
|必要QA|[R2.1 Review](../qa/game004-magnet-tempo-r2-1/REVIEW.md)、最終の型/22unit/15browser/4terminal/入力取消/遷移/media結果、両Build実入力trace、失敗記録、Before/After無編集動画、SWARM通し動画、代表画像。詳細はmanifest|
|祖先への限定依存|`game004-magnet/core.ts` はGold不変性比較のunit fixtureとしてのみ選択。R2のProduction回帰JSON1件も不変再利用の根拠として選択。旧試作一式の一括stageはしない|

SWARM通し動画104,523,012bytesは、既存full-index scannerの64MiB読取り上限により最初の検査がERRORとなった。検査を変更・迂回せず、原本をローカルにそのまま保持し、Gitには52,261,506bytesずつの2個のbinary partsとして保存する。再encodeなし、順に結合すると原本SHAと完全一致する。`node scripts/magnet-baseline-media.mjs` がhashを検証して未存在時だけ元の動画パスへ復元する。Before/After動画は通常のwebmで収載。必要な証拠以外のhighlight重複や大量の同種画面は選択しない。

旧Nurture／Gold／R1／R2のsource・build・証拠、公開中Tinlumo・3作品57問・保存・計測・Cloudflareは不変。旧資料内のリンクにはローカルに保持した未checkpointの履歴を指すものがあり、このcheckpointから旧試作を再構築する約束ではない。採用R2.1の再現は完結している。

## 再現方法

検証環境はWindows、Node24.14.0、lock済みVite8.3.0。ゲーム再現に秘密値・外部API・DB・Cloudflareは不要。

1. このcheckpointをcheckoutしたrepoで依存が未導入なら `npm ci`。node_modulesをGitに入れない。
2. `node scripts/magnet-baseline-verify.mjs`。manifest入力と`.tmp/magnet-baseline-verify/worktree/dist`への再buildを検査。Git checkoutのCRLF/LFだけを正規化して比較し、元のbyte hashも保持する。動画等binaryは完全一致。通し動画は収載したpartsのhashと結合後の原本hashも検証する。
3. 通常の専用previewを再生成する場合のみ `node scripts/magnet-tempo-build.mjs`。`.cache/magnet-tempo-r2-1-dist`を生成し、build.jsonの実行日時を更新するため、採用証拠の検査だけなら手順2を使う。
4. Reviewの通し動画は `node scripts/magnet-baseline-media.mjs` で復元（既存原本は検査だけで上書きしない）。4369が空いているときだけ `node scripts/magnet-tempo-server.mjs`。試遊 `http://127.0.0.1:4369/`、ENは`/?lang=en`、旧Reviewは`/review/`。旧Review内の採用前PENDINGはこの文書で更新される。
5. unit再現: `node_modules/.bin/tsx --test tests/magnet-tempo-core.test.ts tests/magnet-tempo-art.test.ts tests/magnet-tempo-safety.test.ts`（Windowsはtsx.cmd）。browser harnessは既存tests/r5-helpers.mjsのローカルPlaywright/Edgeに依存し、既存QA出力を更新するので凍結証拠へ無目的に再実行しない。

[QA再利用記録](../qa/game004-magnet-baseline-r2-1/qa-reuse.json)に最終変更との対応を明記。通しrunは最終HUD文言修正前、SWARM候補DOMは背景修正前だが、core/入力は不変、最終After動画と追加QAで修正経路を検証済み。型のtuple注記はruntimeを変えない。今回新たなゲーム試験・全57問再撮影は必要ない。`git diff --cached --check` は今回初めて追跡する既存ファイルの空白11件を検出（FAIL）。開始時hashと一致する末尾空行/末尾空白で、新しい差分ではない。採用ソースを変えずに分類記録し、今回の新文書/補助script部分はPASS。Git設定/検査を緩和していない。既知の旧前提テスト失敗2件（連絡先null／公開artifact不存在）は今回回帰ではなく、未修正のまま区別する。

## 第4作として公開する最小スコープ — 提案のみ

完成範囲は**今ある6区画・SWARM／LANCE・炉心・短いRunと再挑戦**。長さや在庫を増やす制作は公開条件にしない。下表は次のHuman判断材料であり、実装・公開許可ではない。

|分類|項目・最小提案|理由・現状|
|---|---|---|
|公開前に必要|日英の導入・操作・目的・勝敗説明を点検し、自動送電と炉心の手動送電を短く伝える|main.ts/progression.tsに日英はあるがindex.htmlの補助/ARIAや一部操作文は英語固定。表示文字の全翻訳より、操作と目的が日英で誤解なく通ることを優先|
|公開前に必要|対象実機ブラウザで同時touch、離指、割込み、向き変更、画面端、復帰、安全な選択を確認。既存主要SFXの音量/欠落を実聴確認|mobile viewportは物理スマホの証拠ではない。新操作方式・新音制作は要求しない|
|公開前に必要|公開枠で成功/失敗→Retry、Buildを変える再挑戦、Portalへ戻る流れを点検|単体の既存通しQAは再利用し、接続で変わる経路のみ追加検証。両Build全編Human受入を自動付与しない|
|公開前に必要|中断方針を決め、正しく表示する|最小案は「タブが生きている間はpause/resume、reload/閉じるとRun終了」。blur/visibility停止は既存、永続保存なし。短いRunとしてこの制約を許容するかHuman未決。自動復帰の実機安全性も確認|
|公開前に必要|作品別の最小Portal接続仕様を確定。locale、card/cover/説明/操作、版付きbuild、load/error、戻る、保存なしの表示|現行src/rc/Play.astroとpagesはlevelsByGame[id].length等のpuzzle前提、共通saveCopyは保存を約束。src/data/games.tsのsave戦略もlocalのみ。単純なregistry追加では不足。既存3作品を変えない局所接続を次工程で設計|
|公開前に必要|公開game-only配布とReview/QAを分離し、相対assetパス、版、CSP/network、ready/エラー連携を確認|現行buildはgame+reviewの2entryでbrandもReviewへ戻る。現在は独立実験用のまま。公開registry追加やbridgeは今回実装しない|
|公開前に必要|正式公開名・コード/Art/SFX/依存license/NOTICE/Credits・作品固有の権利判断と公開承認を記録|自作コードの出自は記録済みでも名称/類似性/法的・公開承認まで確定しない。既存サイトの運営情報を勝手に再設定しない|
|公開前に必要|日英の説明なし初見確認を少人数で行う、または未実施を明記した明示的な公開判断を得る|既に遊んだHumanを外部初見と呼ばない。調査人数や市場性証明を大きな開発条件にしない。手配や外部送信は別許可|
|公開前に必要|接続後の影響範囲QA・Security・配布隔離・明示公開判断|現行単体QAはPortal統合後の証拠ではない。旧試作/Reviewや秘密の配布を防ぐ。既存計測の変更・新しい計測基盤は必要条件にしない|
|公開後へ回せる|途中Runの永続保存/区画checkpoint、設定保持、記録履歴|中断負担や要望が確認されてから判断。追加する場合だけnamespace/version/破損時原データ保全を定義。初回公開で保存を約束しない案を優先|
|公開後へ回せる|初見観察を踏まえた説明の小修正、対応機種拡大、細かなbalance確認|採用した体験を基準に実際の問題へ対応。全組合せ最適化や市場性証明を今回PASSにしない|
|今回は作らない|新敵・進化・区画・大量stage・追加Polish・BGM・恒久育成・shop・広告・App Store・account/cloud-save・追加計測基盤|第4作の有限Run成立に不要。既存Researchの他作品にある機能を必須条件へ転写しない|

未決の核心は、**保存なしの短いRunとして出すか、対象端末、Portalとの局所接続、公開名/権利/公開判断**。今回のcheckpointはその実装を開始する許可ではない。

## Git・Security・停止点

開始時 main / HEAD / origin/main / 実remote main は `bc31be2043e32cec573e0e54521e14a733056b2a`、index差分0。GitHub connectorで既存originがPrivateかつmainをdefaultと確認。今回Humanはこの採用checkpointに限る1commit・通常fast-forward pushを明示許可した。過去の許可は使用しない。

現在地文書は今回の採用記録だけをindexへ選択し、既存のNurture等の未commit追記はworking treeに保持する。ASSET_REGISTERの既存未commit差分も今回stageしない。対象manifest外を追加しない。reset/clean/stash/rebase/force/amendなし。postflightでHEAD/origin/main/実remoteを照合する。

Securityは全project（ignored含む）・full index・push前local historyを既存scannerで検査。既知SHA誤検知とlocal TLS真secretの限定判定は維持し、raw2件FAILをPASSへ変更しない。新規候補なら停止。TLS鍵のindex/history不在、hook/scanner不変を再確認。値や鍵hashは出さない。

実利用model: primary `gpt-6-astra`、Phase2の独立read-onlyレビュー `gpt-6-astra`。採用元制作のモデル履歴は旧Reviewどおり。checkpointと範囲整理を完了して停止し、追加制作・deploy・公開registry追加・LAN公開・購入・外部設定変更は行わない。
