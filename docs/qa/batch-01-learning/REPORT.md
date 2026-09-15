# Batch 01 — 導入と因果表現の統合Review Pack

2026-09-15。**ローカル実装・技術QA。Human受入は再試遊待ち。** R5 Visual Languageの採用は維持し、全面再デザインはしていない。

試遊・短い操作動画・導入順は [Review Pack](http://127.0.0.1:4326/) に集約。ゲームは127.0.0.1:4324。`npm run preview:prototypes` と `node scripts/learning-review-server.mjs` で起動する。サーバーはloopback限定、今回のQAフォルダ内の許可ファイルだけを配信する。

## Human評価をどう扱ったか

ふたりは「問題が難しく解けなかった」「動かし方にも少し戸惑った」の両方を課題とした。**Humanが遊んだlevelId・表示番号・保存／再開状態は未特定**。テスト用の新規contextや保存fixtureからHumanの実際の状態を推測しない。入力不具合が原因だったとは断定しない。

旧新規起動はT01。旧再開は保存のlevelIdとversionで復元し、表示番号は配列順から求めていた。実装調査と独立レビューで、T02の「家から遠ざかる初手」、T03の最低8回の片側調整、T04の家からの出直し、T05の最低11回の調整を確認した。これは学習順を改善する根拠であり、Humanの失敗原因の特定ではない。

## ふたりの新しい導入

| 表示面 | 問題 | 狙い |
|---|---|---|
| 01 / T19 | ひとつの合図（新規） | 図解＋本人の1操作で、共通入力を経験。片側調整なし |
| 02 / T01 | いっしょに一歩 | 2手の短い既存問題で定着。自動案内なし |
| 03 / T20 | 壁がそろえてくれる（新規） | 曲がり角までの1歩の差を、片側停止でそろえる |
| 04 / T21 | こんどは縦の道（新規） | 向きが変わった別問題へ自力で応用。自動cueなし |
| 05〜09 | T02 / T06 / T07 / T08 / T09 | 壁の候補を選び、止まる側・横・縦・角の調整を組み合わせる |
| 10〜12 | 旧T03 / T04 / T05 | 複数調整・家から出直す・最後の一歩の合わせ方を後へ移す |
| 13〜21 | T10〜T18 | 既存後半を保持 |

T20/T21は最短3手、必要な片側調整1回、初手の有効方向1つ。T01には有効な初手が2つあるが、片側調整は不要。最初の4問はいずれも家から出直すことを必須としない。T06は4手でも調整3回なので、単純な初回問題として扱わなかった。最短手数だけでなく必要な発見・選択肢・二人の位置関係を分けて確認した。[分析値と全順序](home-order-analysis.json)

3問は学習段階を切り分けるための追加。ふたり21問、ひかり18問、配送18問となったが、問題数の増加自体を目標にしていない。最初の操作以降は常時の正解矢印や強制操作を出さない。ヒントはメニューから任意で開く。swipe / mouse drag / keyboard / 選択式D-padは維持。

## 保存と再開

**旧T01〜T18はID・version・盤面・解答・ヒント・中間状態を変更していない。** 新規T19〜T21にversion 1と専用の解答・中間状態を追加。内容を変更した既存IDはない。メニュー操作も `level:T03` 等の安定IDで解決し、配列番号を保存IDに使わない。

旧T03の途中は表示10へ移るが、T03の同じ盤面・同じ位置で再開。旧18問のクリア記録は18件のまま保持し、新規3問を勝手にクリア扱いしない。既存利用者を自動で01に戻さず、保存から続ける。導入を試すときは **☰ → 面一覧 → 01「ひとつの合図」**。面選択は従来どおりその面の初期状態から始まるので、現在の途中盤面を続けたい場合は、そのまま操作する。

旧18問それぞれの途中状態＋全18クリアのfixtureを、実ブラウザでJA/EN・表示切替後まで確認。ローカルのHuman保存は操作していない。破損・未知version等は元データを保持して一時モードとなり、全削除や他の問題への読み替えをしない。Undoは従来どおり現在の再開後の操作が対象。

## ひかりの因果表現

鏡を回すと旧光路が退き、新しい光が進む。分光器は入口の光が到達してから二枝が伸びる。スイッチの輪が反応してから対応する門が開き、その先の光路と花の変化が続く。光を外した開門はチェック・輪・短い「開いたまま」で示す。

判定・保存は即時。演出は描画だけで、通常約290ms、門連鎖でも最大約890ms。入力lockや待機queueを加えていない。連続入力・Undo・Menu・表示切替・外側viewport変更・pagehideで旧描画を破棄し、reduced-motionでは補助演出を省く。

実操作動画は各約4〜6秒、432×768、実速度・無音。録画領域のcropのみで、合成アニメーションや入力の捏造はない。

- [共通入力→片側停止→Undo](videos/shared-input.webm)
- [鏡→スイッチ→門→光を外す→Undo](videos/switch-latch-undo.webm)
- [分光器の入口→二つの出口](videos/splitter.webm)
- [枝先のスイッチから門が開く](videos/branch-opens-gate.webm)

[録画条件・操作時刻](media-manifest.json)。添付フレームはこの実動画から抽出したもの。

## QA

| 検証 | 結果・証拠 |
|---|---|
| 型チェック | PASS、errors / warnings / hints 0 |
| unit | 178/178 PASS。新規問題の独立座標oracle・中間状態・制約付き探索、全旧保存、光の因果順序を含む |
| 通常 / Design / prototype build | PASS、18 / 62 / 26 HTML |
| route / build isolation | 7/7 PASS。通常とDesignにprototype混入なし、prototypeに解答dataset混入なし |
| 全問題の実ブラウザ解答再生 | 57/57 PASS。[full-run-results.json](full-run-results.json)、ひかり18・ふたり21・配送18、終了・reload |
| 直接操作・D-pad・Undo・配送pause/resume | 14/14 PASS。[input-results.json](input-results.json) |
| 状態保持・表示切替・座標 | 6/6 PASS。[state-results.json](state-results.json) |
| 保存・エラー・JA/EN・mock・Connection Lab | 15/15 PASS。[regression-results.json](regression-results.json) |
| 既存盤面・3表示・日英 | 54/54 PASS。[layout-results.json](layout-results.json) |
| 狭幅・Help・D-pad | 84/84 PASS。[responsive-results.json](responsive-results.json) |
| R5共有素材・意味・操作領域 | 6/6 PASS。[visual-contract-results.json](visual-contract-results.json)、現行57盤面を含む |
| 新規導入と光の専用browser QA | 32/32 PASS。[learning-cause-results.json](learning-cause-results.json)、4入力、新導入18画面、320px、旧18問のJA/EN再開、演出取消 |
| Portal Baseline | 19/19 PASS。[portal/browser-results.json](portal/browser-results.json)、旧fixture・no-JS・200%・保存・mock |
| Review Pack | PASS。[review-results.json](review-results.json)、試遊リンク・動画decode・range・機密path拒否 |
| 保全 / diff | [preservation.json](preservation.json)。HEAD / index不変、既存保護対象欠損0、許可外変更0、新しい空白所見0 |
| Security | [security.json](security.json)。raw allは既知1候補のFAIL。限定Human dispositionは承認済み。新規検出0。full index PASSは既存indexの読み取り検査であり、今回の変更をstageした意味ではない |

今回のテストは隔離したEdge contextとlocal fixtureで実行し、外部通信を遮断・検査した。旧R5回帰を安定IDへ合わせて再利用した検査は、`learning-helpers.mjs` が旧問題を明示選択する。新規起動の検査は別の `learning-cause.browser.mjs` が新規T19から開始し、この違いを隠さない。

## 自己修正と残した失敗記録

- 旧テストの配列番号・T01の初回cue・「次はT02」という前提を、新しい順序と安定IDへ修正。旧保存fixtureのクリアIDを配列先頭から作らないよう変更した。旧source仕様に合わせた未修正テストのFAILは `attempts/` とregressionのpriorRunsに保存。
- 分光器の枝先がスイッチへ到達する前に門の演出が始まる時刻設定を修正。入口→枝→スイッチ→門の順序を独立レビューとunit検査に反映。
- 案内が消えてiframeの高さが変わったとき、新しい演出まで取り消される問題を修正。内部の高さ変化と外部viewport変更を区別。
- 動画で閉門の柵と開門チェックが重なって見えたため、最終状態の下絵も同時に切り替えるよう修正。新しい花も光到達後に開く。

## 保全・未確認事項・停止

開始はmain、HEAD `7815bf03377e1063112406d28e404beffb017c5a`、clean。`.tmp/r6-before/` に開始時1089 tracked filesの記録とprototype sourceを保全。旧R2〜R5 backup、QA、素材、承認済みSecurity根拠を保持。Portal source、配送data / engine / answer、R5 Art master・palette、直接入力adapter、ひかりdata / engine / answer、最上位Authority・既存Security設定を変更していない。

主担当は同セッションで確認済みのgpt-6-astra。global設定・課金プランの変更なし。今回のstage / commit / push / deploy / 購入 / 外部サービス接続は0。

**未確認**：Humanが実際に遊んだ面・状態、今回の導入が初見で理解できるか、主観的な難度・楽しさ、物理スマホ、Safari/Firefox。**Human受入は再試遊待ち**。新規保存での技術PASSを初見ユーザー理解PASSに読み替えない。全編Human受入、公開、法務、実広告もPENDING。ここでまとめてレビュー待ちとする。
