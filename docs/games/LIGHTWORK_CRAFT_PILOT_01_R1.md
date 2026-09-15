# Lightwork Garden — Craft Pilot 01 / R1

作成日：2026-09-15  
対象：`C:\projects\Web Game Studio` / `T-ishikawa00/web-game-studio`  
Chatが実確認したremote main：`e24556ba57284d993cdb0ac9c476a975f63bef11`  
今回の目的：**既存の光の因果表示を土台に、Lightwork専用のMotionとSFXを統合し、18問すべてで動くA/B/C比較版まで一括実装する。**  
停止点：ローカル実装・自己修正・技術QA・Review Pack完了後、Human Craft Review待ち。Gitへの保存・外部公開の許可ではない。

## 0. 今回の判断と権限

HumanはTinyの採用済みCraftを維持し、次にLightworkへ作品固有のCraft工程を適用する方針を選択した。本書はその一括作業指示であり、次の境界を守る。

- **Tiny DeliveryはCraft Baseline R2をFREEZE。** B / D1 Rhythm Refine / 80 BPM、Accepted Motion・SFX・Mixを変更しない。
- **Lightwork：18問・R5 Visual・直接操作・導入修正・因果表示の理解改善を保全。** 今回は音と表示専用の反応を追加／調整する。ルール・問題・解答・難易度は変更しない。
- **Two Ways Home：21問・導入改善・保存ID・入力を保全。** 今回は音・演出の横展開をしない。
- 全57問（18 / 21 / 18）、Portal Baseline、旧fixture、日英、3表示、prototype/Design Previewの隔離、公開0本を維持。
- 初見外部ユーザーテストはHuman判断で**DEFERRED / NOT TESTED**。本バッチの開始・完了の条件にしない。人気・理解・市場適合が確認されたとは扱わない。
- Tinyの物理スマホは、Humanの「すべて問題なし」による**試験した端末・条件に限定したPASS**。機種・OSが記録から分からなければunknown。Lightworkや別OSへ広げない。
- Lightworkの新Craft、Lightworkの物理スマホ、全57問のHumanゲーム性、一般公開・法務・広告は未受入。
- 主担当は既存方針のAstra。実利用モデルIDを確認し、役割名だけで使用済みにしない。モデル変更機能がなければその事実を一度報告し、global設定・課金プランを勝手に変更しない。
- ローカル実装、既存環境での音源制作、テスト、ループバックの試遊環境、資料更新を行う。通常の判断は自律的に進め、一音・一画面ごとのHuman確認は挟まない。
- 今回の直接指示は「他作品のCraftへ進まない」という過去の停止点を**Lightworkの本Pilotに限り更新**する。過去の一回限りのcommit/push承認は再利用しない。

本書を `docs/games/LIGHTWORK_CRAFT_PILOT_01_R1.md` に保存。Humanへ以前のファイル再添付、素材配置、フォルダ整理を求めない。最上位のSTART_HEREとSecurity規則は維持し、AGENTSの現行作業参照とPRODUCTION_CURRENTに今回の範囲を簡潔に追記する。過去の記録を事後的に書き換えない。

## 1. 最初に実物と現在地を確認する

### 1.1 読む対象

- `AGENTS.md`、`START_HERE_CODEX_WEB_GAME_STUDIO.md`、`SECURITY.md`
- `docs/planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md`
- `docs/planning/CRAFT_PIPELINE_LEARNING_R2.md`
- `docs/games/PRODUCTION_CURRENT.md`
- `docs/games/CRAFT_BASELINE_R1.md`、`CRAFT_BASELINE_R2.md`
- `docs/games/GAME_VISUAL_LANGUAGE_BASELINE_R5.md`
- `docs/games/BATCH_01_LEARNING_AND_CAUSE.md`と対応QA
- `src/prototypes/light-cause.ts`、`light-feedback.ts`、`light-r2.ts`
- `src/prototypes/game-r2.ts`、`board-view.ts`、`craft-audio.ts`、`craft-sound.ts`、`craft-motion.ts`
- `scripts/craft-r2-build.mjs`、Tinyのfrozen-runtimeと最終QA
- 既知Secret候補の限定Human判定、既存の音設定・保存仕様

### 1.2 Git・作業保全

CWD/Git root、branch、HEAD/upstream、tracked/untracked/ignoredの現状、起動中のプロセスを確認する。remoteの想定SHAは本書冒頭だが、作業中の最新ローカル資料・LAN検証成果があれば保全する。dirtyを理由にreset/clean/stashで消さない。想定外のbranchや他作業との競合は内容を確認し、安全に分離できなければ停止する。

保全は必要範囲のファイル一覧・ハッシュ・ignored内のスナップショットで行う。全キャッシュや過去動画を重複複製しない。空白を含むWindowsパスは既存の安全なprojectPath等を利用し、出力先を正規化してプロジェクト内に限定する。SHA値をSecretログへ不用意に展開せず、既知の誤検出処理と整合させる。

### 1.3 Chat実確認済みの技術前提

これは旧会話からの推測ではなく、上記commitの実物から確認した前提。ローカルで再確認して使う。

- `light-cause.ts` は before/after、gate phases、retained、previousPaths、newFlowersを計算する**表示用の因果モデル**。ゲームのsettle・保存は別で即時実行される。
- `light-feedback.ts` は光路、分岐、スイッチ、門、花、開門保持を表示する既存の因果演出。これを削除してTinyの演出へ置換しない。
- `craft-audio.ts` はTinyのsound型と `wgs:audio:tiny-delivery` に結び付いている。単に別ゲームで呼ぶと、音・設定の責任範囲を混ぜるため、そのままの流用はしない。
- `game-r2.ts` のCraft接続は現在Tinyに限定されている。描画の再実行から音を発火しないという方針を維持する。
- Tinyの `scripts/craft-r2-build.mjs` は生成ファイルを凍結manifestと照合する。新Lightworkのためにmanifestを再採番して「一致」にしてはいけない。

## 2. 目標となる体験

**「鏡をひとつ回すと、光が進み、装置が反応し、庭が灯る。その理由が目でも耳でも追える。」**

狙うのは騒がしさでも派手な魔法でもない。短い触覚的な操作音、透明だが刺さらない倍音、門の小さな機械音、花とクリアの控えめな和音で、一つの世界にまとめる。

KEEP：輪郭の明快なR5、少ない文字、盤面中心、瞬時に受け付ける直接操作。  
Avoid：長い残響、毎マスの電子音、常時レーザー音、ネオン化、画面揺れ、意味のない粒子、Tinyの車・到着音の色替え、正解を先に教える音。

**無音でも理解できることが前提。音は分かりやすさと満足感を増やすが、必要な情報を音だけに移さない。**

## 3. 作業範囲とBGMの扱い

今回まとめて行う：

1. 現状の因果演出・イベント・キャンセル・設定の監査。
2. 作品固有の主要SFXと、必要な箇所だけのMotion精度向上。
3. 同じ因果タイムラインに基づく音と表示の同期。
4. 音量・ミュート、入力開始、停止・復帰、保存・表示の整合。
5. 導入／仕掛け導入／終盤の比較と、Lightwork全18問への適用。
6. A/B/C比較、実ブラウザ自己レビュー、回帰QA、短い制作レシピ。

**今回のPilotはBGMなし。** 操作・因果・結果の音を判定できる状態を先に作る。自動的に次のBGM制作へ進まない。Cが十分ならBGMなしでCraftを採用してよい。必要性をHumanが感じた場合だけ、後続の比較にする。BGMなしを未完成や失敗と扱わない。

## 4. Sound Directionとイベント設計

音源数は目標ではない。以下の7〜9機能程度を出発点に、不要なものは統合／省略する。実装するイベント、発火条件、視覚同期点、優先度、長さ、gain、音源の作り方を一枚のsound mapへまとめる。長さは初期設計の目安で、合否の絶対値ではない。

| 機能 | 発火条件・意味 | 音と見た目の出発点 | 無駄に鳴らさない条件 |
|---|---|---|---|
| mirror_turn | 受理された鏡の向き変更 | 70〜120ms程度の小さな乾いたクリック＋丸い倍音。回転対象だけ短く反応 | 無効入力、hover、再描画、長押しだけでは鳴らさない |
| ray_change（任意） | 実際に変化した光路の提示開始 | 弱い短い流れ音を一操作あたり最大一つ。不要なら無音 | 経路の各セル・常時点灯・同一の再描画では鳴らさない |
| split（任意） | 光が実際に分光器へ到達し、分岐を提示 | 一つの短い音に二つの成分。分岐線と対応 | pathsが複数なだけで分光器到達と推定しない。毎枝に独立音を乱発しない |
| switch_on | 今回の手で新しく門を開けるスイッチが反応 | 100〜180ms程度の丸い「点」の音。対応紋章に短い反応 | 既に開いている門のスイッチを照らし直すだけで解除音を反復しない |
| gate_open | 対応門がclosed→openに変わった因果段階 | 100〜200ms程度の小さな機械ラッチ。切れのよい音 | retainedの門、読込、Undoによる復元は新規開門として鳴らさない |
| flower_lit | beforeより新しく点灯した花 | 短い丸いマレット／ガラス風の一音。実際の開花と対応 | 同時複数は束ねる。消灯に罰の音を付けない。初期状態復元では鳴らさない |
| puzzle_clear | 受理された操作で未完了→クリア | 小さな2〜3音の解決フレーズ、目安350〜550ms | 同じ手の最後の花音と二重の報酬にしない。renderごとに鳴らさない |
| run_complete | 既存の全編終了条件がプレイにより成立 | クリアを置き換える短い終止形、目安600〜800ms以内 | clearと同時二重再生しない。全クリア済データ読込だけでは鳴らさない |
| undo | 実際に履歴から一手戻った | 主操作より弱い、短い戻り音 | 履歴なし／取消では鳴らさない。戻った先の門・花の達成音を再生しない |

### 4.1 Silenceの契約

- 考えている間、光が壁で止まっているだけ、既存の門が開いたまま、マウスhover、メニュー閲覧、ロード／リサイズは原則静かにする。
- 光をあえて外すのは解法の一部。消灯や行き止まりを「間違い」と決めつけるブザーは付けない。
- 開いたままの門は、既存の形と必要な表示で分かるようにする。開放維持のたびに音を付けない。
- 同じ操作で複数の花や門が反応するとき、視覚上の変化はすべて示し、音だけを同時群ごとに束ねる。
- 未解答の先読み、正解手順との照合による「近づいた音」、ヒントの漏洩はしない。

### 4.2 音の作り方・品質

既存のローカル合成・加工の手段を使う。単純なテストtoneを完成品と呼ばず、envelope、倍音、弱いnoise成分、短い余韻などを役割に合わせて設計する。鋭い高音を増やして「光らしさ」にしない。候補は内部で絞り、全音×大量候補をHumanへ投げない。

- UIクリック、機械ラッチ、到達の和音が一つの世界として聞こえるよう調整。
- 反復に必要なら、限定的な微差を2〜3種まで用意。ただし比較・再現時はseedを固定し、randomにより結果を変えない。
- 浮動小数の不正値・DC・クリップ・切断時のクリック・無音冒頭の過長を検査。
- 一律peak正規化だけで全音を同じ強さにしない。役割と頻度で個別gainを決める。
- スマホのスピーカーでも低音だけに意味を依存させない。実機で未聴ならNOT TESTED。
- 合成コード／パラメータ／原本／加工履歴／実装への対応を残す。外部sampleの混入なしを確認。法務の最終承認とは区別する。

## 5. Motionと音を同じ因果計画から出す

### 5.1 機能の時間と演出の時間は分離する

`accepted input → before/after → deterministic rule result → save/checkpoint` は現在のゲーム仕様どおり。描画や音が終わるのを待ってルール・保存・次の入力を進める構成は禁止。

既存 `lightCause()` と `showLightCause()` の因果表示を活かす。表示専用のplanに、必要ならtarget/phase/時刻情報を付け、MotionとSFXが同じ意味・順序を見るようにする。

- source→path→split→switch→gate→次phase、という実際の依存関係を守る。
- 一つの光が届いたことで後から開く門を、前の門より先に鳴らさない。
- 最終状態のgate boolがtrueだから、すべての音を入力直後に一斉再生する実装は不可。
- `newFlowers`を含め、該当する変化がない操作に達成音を作らない。
- paths配列の順番だけを実世界の時間や因果と決めつけない。既存traceとphaseの意味を読む。
- 読込・Undo・Reset・表示変更は「状態復元」。新規プレイ操作と分け、達成音を再発火させない。

### 5.2 タイミングの起点

現行値（ray100ms / branchDelay110ms / switchArrival215ms / gate245ms / phase300ms）は**開始基準**。既に受入方向の因果理解を壊して、Tinyの移動時間へ統一しない。

鏡の操作反応は即時。門や花の短い反応は既存phaseと合う位置に置く。実際の同期改善に必要な表示値だけ変更し、何を何ms変えたかと理由を記録する。演出は現在より不必要に長くしない。最大密度面でも長い鑑賞待ちを作らず、次の入力で直ちに更新できる。

音の予約はAudioContextの時計、表示は表示側時計を使うため、同じtransitionの起点と相対offsetで対応させる。`setTimeout`の結果だけを音楽的な精密同期の保証としない。発火ログの一致と、実際の聴感・端末出力遅延の評価は別。

### 5.3 取消・最新状態優先

一操作ごとに単調増加のgeneration/transition IDを持つ等の小さい仕組みで、古い表示・予約音を無効化する。

取消対象：連続した次の鏡操作、Undo、Reset、別面、Help/設定、pause、広告停止、hidden/pagehide、画面幅・表示モード変更、比較条件変更、破棄。

- 古い発音予約も実際にstop/disconnectする。IDを書き換えるだけで既予約AudioBufferSourceが鳴る実装にしない。
- 演出用overlay、隠したbeam/gate/flower、caption、Animation、timerを確実に掃除する。取消で盤面が欠落したままにならない。
- clear直後の即Nextで、前面の達成音が次面の操作へ重ならない。
- AudioContext.resumeが非同期で戻ったとき、古い入力の音を遅れて鳴らさない。現在も有効な操作の短い受付範囲だけ扱い、範囲外は音を省略してゲームを継続する。
- 音が落ちても入力を再実行しない。音が使えなくても論理状態・保存・Undoは同一。

### 5.4 Reduced motionと視認性

Reduced motionでは過渡的な光移動・拡縮を抑え、必要な最終状態と対応関係は残す。SFX muteとは独立する。無音＋reduced motionでも解ける。光演出の高速点滅、全画面flash、camera shake、constant particlesは入れない。

## 6. 技術構成：Tinyを変えず、小さなLightwork用接続を作る

### 6.1 Frozen buildを壊さない

Tinyのコード・BGM・WAV・採用設定・比較証拠・frozen manifestはそのまま保つ。特に `scripts/craft-r2-build.mjs` の**元の厳密照合が、従来どおり成功すること**を受入条件にする。新baselineへ無断更新して通すのは禁止。

そのため、Lightwork用Pilotは専用entry／専用出力を第一候補にする。同じゲームルール・レベル・表示資産をimportし、巨大なゲームコピーを作らない。既存buildが使うsourceへ直接変更するとTiny凍結出力まで変わる点を考慮する。

Pilot専用build変換でイベントhookを追加する場合は、変換箇所・条件を明示し、一致数をassert、出力差分・再現テストを用意する。DOMのMutationObserverで鳴らす、文字列を無条件に広範囲置換する、手編集したビルド成果物だけを正本にする方法は禁止。

既存Tinyの音資産・音量・スケジュールを変えない範囲でライフサイクルの小さな関数を再利用できるが、初回から万能なAudio Engineを作らない。共有sourceの変更がどうしても必要で、元Tiny出力の再現を維持できない場合は、問題と最小案を報告し、その変更だけ保留する。

### 6.2 Audio settings

- Lightwork独自のversion付きキー（例：`wgs:audio:light-garden`）。既存ゲーム進行schema、Tinyのaudio/musicキー、他ゲーム設定を変更しない。
- 音設定は既存メニュー内へ。盤面に大型ツマミやバーを追加しない。日本語／英語ラベル、mute、音量、保存不可／音声不可の表示を用意。
- 初期音量は小さめを設計し、候補の音量を上げて良く聞かせない。最終値は比較時に記録。Tinyの0.35などを絶対正解と機械的にコピーしない。
- 実ユーザー操作により音声contextを開始／再開。ページを開くだけ、hover、自動QA state注入で音を勝手に始めない。
- 一context／一生存runtimeを基本に、再描画でcontextやlistenersを増殖させない。メニュー開閉・連続reloadで二重音が生じないようにする。
- context unavailable/suspended/interrupted/closed、保存拒否・破損にも対応。OSやブラウザの制約を回避するための自動設定変更はしない。
- 総音数の上限を設ける。出発点は同時発音とfade中を合わせ3voice程度、結果に優先権。単に全予約数を同時発音と数えて後半の因果を全部落とす設計にしない。予約も有限・取消可能にする。
- mute/gain変更は再生中にも反映し、短いfadeで停止。設定保存失敗でゲーム進行を壊さない。復帰時に古い音を再開しない。

## 7. A/B/C比較を一つの名前空間に固定

Tinyの過去A/B/C、BGM選定のBと混同しない。内部IDは次のように作品固有にする。

| ID / 表示 | 内容 |
|---|---|
| `LG-A` / A | **現在のLightwork因果演出そのまま・音なし**。因果改善前の旧版へ戻す意味ではない |
| `LG-B` / B | 今回整えたMotion・因果表示。音なし |
| `LG-C` / C | **Bと全く同じMotion＋Lightwork専用SFX**。今回の第一比較候補 |

BをAと違わせるために不要な変更をしない。既存Motionで十分なら差は小さいと正直に報告してよい。CのためにBの入力待ち時間や難易度を変えない。

同一の初期状態、面ID、入力時刻、表示サイズ、速度、設定で比較する。A→B→C変更はReview操作であり、別の進行へロードし直す必要はない。比較切替では予約と演出だけcancel。ゲーム状態やUndoを失わない。

代表面は番号だけで機械的に選ばず、実データから次を満たす最少3場面を選び、IDと選定理由を記録。

1. 最初の鏡操作→光路変更→成功。
2. スイッチ→開門→光を外しても開門保持。Undoの対照を含む。
3. 分岐・複数phase・複数目標を含む中後半または最終面。短い入力列が見せやすいもの。

Lightwork全18問へ今回の接続を適用し、代表面だけでなく全問で成立させる。

## 8. QA：技術、感覚、Human判断を分ける

### 8.1 必須確認

| 領域 | 確認 |
|---|---|
| 同一ゲーム性 | Lightwork18問×A/B/Cの解答・論理中間状態、保存・Undo一致。全57問の既存回帰 |
| 発火 | 鏡の受理入力のみclick、実際に開く門だけgate、花新規点灯、clear/complete重複防止、retained無音 |
| 反復 | 門を照らし直す、花を点灯/消灯、連続鏡操作、ループ光路、無効操作、Undo/Resetで不正達成音なし |
| 取消 | 発音前・発音中・複数phase途中のUndo、別面、設定、表示変更、hiddenで古い音/overlayが残らない |
| 音量 | mute/unmute、gain0、上限、同時音、fade、resume非同期競合、音源失敗、破損/拒否保存 |
| 初回 | 新規contextでの最初の実入力と音開始。新規状態QAを初見ユーザー理解PASSと呼ばない |
| 入力/表示 | mouse/touch/keyboard、通常/9:16/16:9、JA/EN、狭幅・高密度面、指と鏡の位置一致 |
| アクセシビリティ | muteとreduced motion独立、無音でも状態が分かる、focus/ラベル/既存Help維持 |
| 継承 | Tinyの元凍結build照合と代表操作・音設定・BGM Bの不変、Two Ways導入と入力、Portal/Connection Lab |
| ビルド | 既存check/unit、3種類build、routes/output隔離、音候補・解答・内部reviewが通常buildへ出ない |
| 保全/安全 | project path境界、変更範囲・差分、Secret新規検出、旧証拠/既存未commit成果の保全 |

### 8.2 音と動画の評価限界

- 実際のブラウザが出した音を録音し、単体音に限らず合成された一手・連鎖・クリアの出力も確認する。手で別のWAVを後付けした動画を「実同期証拠」にしない。
- 発音数、時間、peak、NaN、無音、キャンセル、数分の反復でのnode/メモリ増加等は機械測定できる。5分程度の操作・反復シナリオで重なりと解放を確認する。アイドルの無音5分だけで疲労検証済みにしない。
- サンプルの同時刻発火やログの整合だけで、スマホスピーカーの聞こえ方や知覚的同期をPASSにしない。
- 主担当が実際に聴けない環境なら「聴感NOT TESTED」と明記する。プロンプトや波形を見ただけで「心地よい」と報告しない。
- 静止画だけでMotionをPASSにせず、実操作映像で視認性・因果・取消を自己確認する。
- 新規外部ユーザーのテストはHumanの選択で保留中。募集、連絡、個人情報収集を開始しない。
- Lightwork実機操作は今回未実施ならNOT TESTED。Tinyの実機PASSをコピーしない。

全項目は対象差分に比例して検証する。過去の巨大なスクショ群を再生成する必要はない。新sourceが共通処理へ触れる場合は影響する回帰を省かない。古いテスト数（189等）を達成目標にせず、今回実行した内容と結果を報告する。

## 9. 作業順序：一回の実装バッチ

1. 現行実画面・比較基準とdirty成果を確認し、少量のBeforeと保全manifestを作る。
2. `lightCause`に沿ったSound Mapと表示専用タイムラインをまとめる。監査と実装を同じバッチで進める。
3. 代表的な門・分岐のある一面で、音、表示、取消、silentを先に成立させる。
4. 同じ部品を導入・全18問・日英・3表示へ適用。個別面の固定条件で音を出す実装はしない。
5. Tinyのfrozen buildと全体回帰を確認。見た目・同期・音の過剰があれば自ら局所修正。
6. Review Packと短い制作レシピ、現在地をまとめ、Humanへ一回で提示して停止。

音一個・面一個ごとの承認待ちを作らない。一方、無断の権限拡張、ゲームルール変更、新しいSecret疑い、他repo出力、Tiny凍結破損は通常の試行錯誤とは別で止める。

## 10. 最小Review Pack

`docs/qa/lightwork-craft-pilot-01/`等、一つの入口に集約する。以下で足りる。

- LG-A/B/Cを明記したJA/ENの試遊導線。全18問を遊べること、比較用の代表面と新規開始が分かること。
- 最少3つの代表シーンを同条件で比較する短い録音付き動画。各シーン内A/B/C並べでも、分割でもよい。速度・gainを明示。
- 採用候補の単体試聴一覧と、ゲームイベントへの対応。実物と同じ音源から再現する。
- 通常／縦／横の代表画像。大量の色違い・似た画面を増やさない。
- 技術結果、差分、Tiny不変、既知Secret disposition、聴感/実機/Human未判定の区別。
- **Lightwork Craft Recipe Draft**：Tinyから再利用した工程、Lightwork独自の設計、次作へ再利用可能な仕組み／未検証部分を短く記録。Human未採用の音をStudio標準に昇格させない。

Humanへ求める判断は「AよりCが自然に理解できて気持ちよいか」「目立つ／うるさい音がないか」「文字を戻さずに因果が追えるか」の3点へ絞る。

ファイルは再現に必要なsource/設定/小さな証拠を優先。候補生成物・キャッシュ・中間buildはignoredに保持。原本素材や証拠を勝手に削除しない。

## 11. ネットワーク・費用・Security・Git

- 新しい外部音源API、音楽生成契約、音源購入、外部送信、実広告、analytics、deploy、Public化は禁止。既存ローカル合成・加工の範囲で作る。
- 音源やEditorの不足があれば具体的に報告する。未検証素材を権利確認済みと書かない。工程のためだけに有料サービスを追加しない。
- Reviewは127.0.0.1にbindする。競合しないportを選びURLを実確認する。既存プロセスを無断でkillしない。
- LANの再公開、証明書の作成/信頼設定、Firewall変更、トンネル、ルーター設定は今回の対象外。過去の一時LAN許可を常設公開へ拡張しない。
- `.tmp/r3-before/manifest.json` の既知1候補は、既存証拠で確認された保全SHA256の **FALSE POSITIVE / NON-CREDENTIAL / APPROVED** を維持。今回のために再びPENDINGへ戻さない。
- raw scanがその1件を返すなら、raw結果と承認済み判定、新規0を分けて記録。「raw0」に書き換えない。別の候補には自動適用せず、値を出さず停止／判定依頼。
- stage、commit、push、force push、rebase、履歴改変、他repo/global設定変更は行わない。採用後の保存は後続の明示指示で行う。

## 12. 完了報告と次の停止位置

報告は簡潔にまとめる：

- 対象ゲーム、主担当実モデル、開始HEADと現worktree。
- 実装した主要音とMotion、既存から変えなかった範囲。
- LG-A/B/Cの内容、試遊/動画/音源/QAの一つの入口。
- Light18問／全57問回帰、Tiny凍結再現、音lifecycle、mute/reduced motion、日英/3表示/保存、Security。
- 実際に再生・計測したことと、聴感・初見・実機の未確認事項。
- git stage/commit/push、deploy/新規外部API/購入は0。

**Human Craft Review待ちで停止。**

Cを自動採用しない。BGM制作、Two WaysへのCraft横展開、新作、公開工程へ自走しない。HumanがCを受け入れた後、明確な不満がなければ不要な派生候補を作らず固定する。

## 13. 参照資料

以下は今回確認した技術的根拠。音色・長さ・比較設計はこのプロジェクト向けの提案であり、公式の正解値ではない。

### Repo（確認ref：e24556ba57284d993cdb0ac9c476a975f63bef11）

- https://github.com/T-ishikawa00/web-game-studio/blob/e24556ba57284d993cdb0ac9c476a975f63bef11/AGENTS.md
- https://github.com/T-ishikawa00/web-game-studio/blob/e24556ba57284d993cdb0ac9c476a975f63bef11/docs/games/CRAFT_BASELINE_R2.md
- https://github.com/T-ishikawa00/web-game-studio/blob/e24556ba57284d993cdb0ac9c476a975f63bef11/src/prototypes/light-cause.ts
- https://github.com/T-ishikawa00/web-game-studio/blob/e24556ba57284d993cdb0ac9c476a975f63bef11/src/prototypes/light-feedback.ts
- https://github.com/T-ishikawa00/web-game-studio/blob/e24556ba57284d993cdb0ac9c476a975f63bef11/src/prototypes/craft-audio.ts
- https://github.com/T-ishikawa00/web-game-studio/blob/e24556ba57284d993cdb0ac9c476a975f63bef11/scripts/craft-r2-build.mjs

### 公式Web資料（2026-09-15確認）

- MDN Web Audio best practices — gestureからのcontext開始／resume、音の制御、合成の方式。
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices
- MDN AudioBufferSourceNode.start — 音声context時刻での予約と、sourceの一回性。
  https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start
- MDN AudioScheduledSourceNode.stop — 予約の停止。start前にstopすれば未発音にできる。
  https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/stop
- W3C Understanding SC 2.3.3 — 不要なインタラクション由来の動きを抑える選択肢。AAAの説明であり、本Pilotの包括的なWCAG適合宣言ではない。
  https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
