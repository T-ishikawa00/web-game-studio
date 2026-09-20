# PROJECT MAGNET — Full Game Production R1 / Review Pack

2026-09-20。Expansion Slice A **Human Expansion Gate PASS /「かなり良い」** を受け、独立候補で完成版を制作。

**GAME004_FULL_GAME_CANDIDATE_READY / HUMAN_FULL_GAME_GATE_PENDING**

## 遊ぶ・判断する

- [日本語](http://127.0.0.1:4371/?lang=ja) / [English](http://127.0.0.1:4371/?lang=en) / [映像付きReview](http://127.0.0.1:4371/review/)
- [画面全体・全作戦完了動画](full-flow.webm)：新規保存→A→B解放→C解放→NORMAL END、等速・通常操作入力・連続収録。画面全体版は無音。
- [音声付きCanvas全編](full-canvas-audio.webm)：447.229秒。作戦HubはDOMなので画面全体版で確認。[Highlight](highlight.webm)：B終盤〜C最終Bossの連続抜粋。生成映像・倍速なし。stream-copyで抽出。再生/seekの実測は [delivery.json](delivery.json)。
- [完成版設計](../../games/GAME004_FULL_GAME_PRODUCTION_R1.md)：18区画、通常敵、3Boss、4形態、module、保存の定義。
- 再起動：repo rootで `powershell -NoProfile -File scripts/magnet-full-local.ps1`。4371使用中は既存を停止せずエラー。自分の候補の停止のみ同scriptに `-Stop`。R2.1/Expansionの4369/4370を停止しない。

Human確認順：AをclearしてB解放→途中で作戦画面・再読込・区画再開→Bの支援/射線/運搬機→Cの床切替/磁場中枢→NORMAL END→別形態でRetry。WASD/矢印で移動、マウス押下で吸引・離して射出。touchは左指移動・右指吸引/照準/射出。

## 今回の完成範囲

|項目|結果|
|---|---|
|作戦|A/B/C各6区画、18区画。Aは採用R2.1配置・送電・炉心を継承。Bは優先度/射線、Cは位置/射出timingを統合|
|Boss|Reactor、Carrier、Magnet Core。追加Bossは正面/露出と磁力pulseの固有判断があり、無敵待ちを置かない|
|進化|SWARM / LANCE → CYCLONE / SATELLITE / RETURN / FOUNDRY|
|module|FIELD / BRAKE / DRIVE / SHOCKの4つ。上限12を埋めるための要素は追加せず。1Run4選択、moduleは2つ・重複なし|
|継続|作戦解放・clear回数・最短記録とその形態・設定・区画開始checkpoint・Retry・NORMAL END|
|保存|独立key `tinlumo.game004.magnet.full.v1`、schema1 / content magnet-full-r1。破損原文保持、失敗表示、別タブ競合抑止、確認付き限定reset|
|導入|長いtutorial modalなし。A冒頭の状態別copyで押す/狙う/離す→光る装甲→送電→進化。JA/EN、pointer/keyboard/two-finger|
|追加しないもの|Challenge（本体Human評価後の候補）、shop/grind/gacha/account/cloud-save/multiplayer/leaderboard/daily/story/広告/App Store/live service/endless|

調査方向は [独立検証](../../games/GAME004_INDEPENDENT_VALIDATION_R1.md) を維持。短時間でも「拾って自分で狙って崩す」手触りを求めるアクション層が想定対象。選ばれる理由は磁力回収と狙った一斉射出の一続きの操作、再挑戦の理由は形態/module/最短記録の比較という**商業的仮説**。需要、広告収益、継続率、初見成功率は未確認。今回Humanが採用したのはSlice Aの体験であり、完成版・市場性の受入へ拡張しない。

## 実装中の修正

- Bを2系統で完走後、Cへ進行。C4は速い撃破でも床切替判断が起きるよう最初の撃破をtriggerにした。C最終Bossの円予告・吸引・露出を専用art/SFXで区別。
- 30秒以内の速い撃破ではrepair counterが8を超える採用挙動を保存validatorが誤拒否していたため修正。invalid transactionもゲームを落とさず保存失敗を表示。
- LANCE選択後の保持数を12へ制限し、充電片を優先。checkpointに回収報酬/repair進捗/SATELLITE予約属性を保持。
- reset成功で進行中runも破棄し、Aへ戻す。Hub上のRetryでcheckpointを無確認上書きしない。Escape伝播とcanvas focusを修正し、復帰直後のキーボードを使用可能にした。
- SHOCKは実射出時の通常敵だけに限定し、A炉心も除外。SATELLITEの4防御片のみではSHOCK/BRAKEを発動しない。2回帰unitとB SATELLITE再完走で確認。
- 明示したreduced motion OFFを再読込時にsystem preferenceで上書きしない。最短記録に対応する形態を保持。

## QAと証拠

|対象|結果と範囲|
|---|---|
|対象型/build|候補のstrict TypeScript PASS。Vite専用build PASS、4配布files約156KB。source/public/registry/config/lockfileに共通変更なし。[build.json](build.json)|
|Unit|**28 PASS**。[unit.json](unit.json)。3作戦×4形態×6moduleペアの全区画checkpoint、解放/best/保存拒否/破損/別タブ、LANCE保持、SATELLITE予約、module、有限増援、bossdamage、C4切替、Retry、resource上限|
|Browser edge|**87 PASS**、最終buildで再実行。[qa-results.json](qa-results.json)。1280×800 / 390×844 / 844×390、JA/EN、保存/再読込/再開/reset/破損/未知version/拒否/容量不足、pause/blur/focus/resize、keyboard/two-finger、音声初期化失敗、通常入力死亡/Retry。blur/focusは明示イベント経路で、物理OS割込みではない|
|新規保存から通し|[加速clock](full-flow-fast.json)：A249.22 / B39.72 / C37.29秒、各6区画、実解放・記録・NORMAL END、page/external errors0。敵/HP/勝利状態の書換えなし|
|等速通し|[full-flow-realtime.json](full-flow-realtime.json)：A321.03 / B44.41 / C38.47秒、各HP6。CYCLONE→FOUNDRY→RETURN。新規保存から実操作で解放、page/external errors0。高効率の自動入力であり平均所要時間ではない|
|SATELLITE / mobile|A SATELLITE全編207.58秒の先行加速試遊。最終buildのB SATELLITE全6区画とC FOUNDRY mobile全6区画を追加検証。最新値は [B-satellite-fast.json](B-satellite-fast.json) / [C-foundry-mobile-fast.json](C-foundry-mobile-fast.json)。両moduleペアFIELD+BRAKE / DRIVE+SHOCKを実入力。全72組をHuman試遊した意味ではない|
|描画/cleanup|[performance-audio.json](performance-audio.json)。等速desktopの直近6000frame中央値16.7ms / p95 16.8ms。scrap最大70/particle最大160/enemy最大5。caps：scrap70/particle220/audio voice18/event180/frame samples6000。各作戦結果時audio active0、Retryでeffects初期化。長時間heap解析や実機性能の証明ではない|
|Audio|既存SFXを継承、追加pulse/core-open等のroutingと初期化失敗を確認。voice上限による要求dropが累計263回（同時発音抑制）、初期化failure0。聴感やmix適否は**NOT TESTED**|
|独立レビュー|SolがHub限定実装後、save/core/main/hubをread-onlyレビュー。発見事項はAstraが修正して再検証。[independent-review.json](independent-review.json)。320×568 / 844×390の到達性も補助確認|
|Production|別出力先への既存Astro build **PASS / 18pages**。既存unit214/215、1件FAILは `tests/unit/rc-readiness.test.ts:13` の未取得domain/contact前提と現在の採用済み連絡先との不一致。全体checkは旧3試作のTS18048が12件。今回対象error0。旧前提を弱めず、不変hash＋buildで分離。[production-regression.json](production-regression.json)|
|配布|[delivery.json](delivery.json)：JA/EN/game/review/media、CSP `connect-src 'none'`、source/secret/API404、POST405、動画decode/seek。loopbackのみ|
|Security|[security.json](security.json)：全project raw **FAIL / 既知判定済み2件**維持、新規0。候補配布PASS。TLS keyはignored、index/history path不在。値は記載/複製/配信しない。scanner/hook/例外変更0、完全な秘密不在の証明とはしない|
|保全|[accepted-baselines.json](accepted-baselines.json) / [preservation.json](preservation.json)：開始2684files、現在地/asset registerの追記以外に既存変更なし。R2.1・Expansion・Production3作57問・Portal・保存・計測・Cloudflare・旧試作・証拠・既存未commit成果を保全|

最終の初回保存文言は「保存します」とし、未保存を「保存済み」と表示しない。SHOCK/4片のみ補助効果修正はunitとB SATELLITEで再検証。等速映像のAはSHOCKなし、B/Cは別形態でこの経路を使わないため再利用。

最終best-form保存修正は、初回各1clearのみの等速通し挙動を変えない。後から遅いtimeで再clearしても最短形態が変わらないunitを追加確認。全編映像を再生成せず再利用理由を限定した。

## 既知事項 / 未検証 / Human判断

- **物理iPhone/Android、Safari、実聴、外部初見：NOT TESTED。** 技術PASSはHumanの面白さ・達成感・全編受入ではない。
- Aは設備接続が多い採用構造、B/Cは有限編隊中心で、今回自動試遊ではA約5分・B/C各40秒前後。長さを揃えるためのHP倍率/待機は追加しない。この密度と長さの差、初見の予告理解、各形態の優劣はHuman Full Gateで確認する。
- 区画再開は開始時点に戻る。選択途中も同じ区画の最初へ戻る。記録/解放がmemory-onlyのときはreloadで以前の保存へ戻る可能性を明示。
- 操作中のすべての組合せ、極端な長時間連続プレイ、あらゆるstorage障害、全OS/ブラウザを網羅したとは主張しない。
- Challengeは未実装。Full Gameの採用後に、既存の再挑戦で不足する理由が確認できた場合だけ検討。残り18区画の未制作はない。
- Production収載・公開可否・法務/運営・実広告・配布運用は今回未実行、別承認。

## ファイル / モデル / 操作境界

[touched-files.json](touched-files.json) に新規candidate/source/scripts/tests/docs/QAと既存文書への追記を列挙。`.tmp`はローカル実行ログ・生収録、`.cache`は隔離build/Production再build先。既存秘密ファイルは複製していない。

実利用model：主担当・設計・保存・ゲーム実装・統合・最終QA **`gpt-6-astra`**。Hub2filesの限定実装と後続read-onlyレビュー **`gpt-5.6-sol`**。役割名の読み替えではない。

Git：`main` / HEAD `f84671f1957da73b99a173e4c7a88d33ece3f141` / local upstream `origin/main` とahead0 behind0、index空。既存2tracked差分と未tracked成果を保持、今回の成果は未stage。remote照会/pull/fetchなし。

**stage / commit / push / deploy / LAN / Production registry追加 / Cloudflare変更 / 広告 / 購入・契約 / 外部投稿・送信 = 0。** localhost previewと公開資料の既存参照のみ。ここで停止し、Human Full Game受入や公開完了を宣言しない。
