# PROJECT MAGNET — R2.1 Tempo & Clear Feedback

2026-09-20。**実装・技術QA完了 / Human Progression Gate は再試遊待ち**。R2全体の品質への好評を保持し、今回の2点だけを改善。公開許可ではない。

- [R2.1を試遊](http://127.0.0.1:4369/) / [ブラウザReview](http://127.0.0.1:4369/review/) / [保存したR2](http://127.0.0.1:4368/)
- PC: WASD移動、押す→吸引・照準→離して射出。Touch: 左移動・右吸引/照準。上部でJA/EN・音・停止・Retry。
- 実利用model: 統合/実装/最終QA gpt-6-astra、限定read-only参考調査とレビュー gpt-5.6-sol。追加writerなし。

## 変更と資源判断

R2のrelayは「拾った敵装甲の一回分の電力」を射出して充電。通常金属は充電しない。同じ金属本体は再使用でき、電力は攻撃ダメージ倍率ではない。ただし戦闘中の送電で盾を3秒開き、床電流を7秒止めるため、射出先とタイミングには戦術価値がある。

R2.1はその**戦闘中の手動送電と炉心戦を維持**。stage1–5で敵がいない状態が既存の回収開始時間0.25秒続いたら、その区画で得た電力だけをactive relayへ必要量まで順番に自動送電。金属本体、回収時の装甲加算、余剰電力、前区画からの持越し電力は保持。次区画のquotaへ先払いしない。残量不足なら既存増援経路が続く。所持不足を隠して架空充電する処理なし。敵HP・quota・spawn間隔・6区画・3選択・Build・炉心HP24/3lockはR2と同一。

clear確定→0.16秒から設備復旧/強化予告と短い既存達成音→0.65秒で候補選択可能。最後の破壊・回収・送電線はその間も世界に残り、敵/床/残弾の攻撃判定は停止。追加確認ボタンなし。選択は時間制限なし、候補表示後の新しいpointer押下またはキー押下が必要。選択後0.18秒の装着反応で再開。全遅延はworld状態に属し、pauseで停止、Retryで破棄。setTimeoutの古い演出なし。

## 同じ代表区画の実測

|第1区画 / 敵優先の通常入力|Before R2|After R2.1|
|---|---:|---:|
|敵がいない・設備未充電の時間の合計|4.189秒|0.255秒|
|clear確定→候補選択可能|0.000秒（同一観測frame）|0.654秒|
|クリアまでのgame clock|14.942秒|7.908秒|
|撃破数 / 自動充電数|6 / 0|5 / 13|

同じseed/初期配置/viewport/敵優先方針の別々の実時間プレイ。完全同一入力列ではなく、Beforeでは充電手続中の増援が増えた。非戦闘時間は増援との戦闘時間を含まない。rAF観測の誤差約1frame、単一比較で平均や初見所要時間を代表しない。Afterの0.25秒は操作不要の自動回収/送電余韻で、長押しや移動の要求時間は0。数値根拠: [comparison.json](comparison.json)、before/after/play-results.json。

短い無編集動画: [Before](before/full-run.webm) / [After](after/full-run.webm)。開幕から最初の選択まで連続収録。カット・倍速・補間・生成画像なし。CanvasとWebAudioをnative収録し、DOM上部ボタン等は動画外。コンテナ索引のstream-copyのみで映像/音声再encodeなし。

## 通し試遊 / QA

- SWARM: **最終CLEAR**、3:59.66、3選択、6区画、Retry初期化。[無編集通し動画](full-run.webm) / [詳細](play-results.json)。
- LANCE: **最終CLEAR**、3:35.97。[通常touch入力の全区画trace](mobile-run.json)。Windows上の390×844 mobile viewport、実機ではない。
- LANCE初回は炉心第3lockで接触被弾し失敗。失敗結果/Retryは正常。敵HP等は変えず、試遊driverの壁際回避を修正して再試遊。失敗証拠はmobile-first-attempt.json / mobile-first-failure.pngに保持。
- 型検査/専用build、core/art/resource/transition **22 tests PASS**、通常browser **15 groups PASS**、terminal **4 groups PASS**、追加のchoice入力取消/二重選択/無音/reduced/pause/settle・equip Retry PASS。個別ログ/JSONを同梱。
- 達成の表示、元の破壊粒子、設備への接続、装着反応を実画面で確認。自己修正: candidate背面の文字透けを解消し、選択/停止中も上部mute/pause/Retryへアクセス可能にした。さらにclear後HUDの「残った敵を撃破」を「設備復旧」に修正し、After比較は撮り直した。通し動画/traceはこのHUD文言修正前（core/入力処理は同一）、SWARM通し時の候補DOMは背景/controls修正前で動画のCanvas描画には影響なし。全57問の再実行は共有source/runtimeの変更なし・hash保全により省略。R2 Production browser証拠は対象不変を確認して再利用。
- 全期間の無傷保証ではなく、clear/choice/equip中のHP不変、残弾無害化、選択重複拒否を状態テストで確認。全Build/モジュール組合せの最適balanceは未検証。

## 参考の限定再確認

既存benchmarkの3件のみ。Brotato: wave終了→残存material回収→crate/upgrade→shop ([wave](https://brotato.wiki.spellsandguns.com/Waves)、[shop](https://brotato.wiki.spellsandguns.com/Shop)、非公式reference)。Nuclear Throne: 撃破でrads→4択mutationは[開発者記事](https://blog.playstation.com/archive/2015/11/09/how-nuclear-throne-on-ps3-ps4-ps-vita-aims-to-be-mean-fun-and-never-unfair/)、全敵排除→portalは[TAS説明](https://tasvideos.org/8633S)の二次資料。Hadesのboon pickup専用AVは[公式patch記事](https://www.supergiantgames.com/blog/5)。**動画補強は2場面に限定**。Hades公式Showcase（https://www.youtube.com/watch?v=YZZFlcE0fWE）の1:46戦闘→1:48編集タイトルをブラウザで観測したが、報酬まで連続していない。Nuclear Throne TAS（https://www.youtube.com/watch?v=nko7HkajcBM）は0:20–0:21戦闘/回収→0:24生成遷移→0:25次エリアを観測。Mutation選択は捕捉できず、TASを通常速度の設計値にしない。**戦闘終了→報酬選択の完結した2場面と所要秒数は未確認/UNKNOWN**。文章の順序/AV記述と部分的な動画観測を分離する。

採用理由（設計推論）: 戦闘の終わりを見せてから安全に判断する区切りを、MAGNETの同じarena内に圧縮する。0.65秒/0.18秒は本作の仮設定で、参考動画の観測値ではない。参考作の長いshop精算や移動は持ち込まない。新しい構造選定/大規模再調査なし。

## 保全・Security・残る確認

Gold/R2 art/audio sourceはbyte同一、主要TUNEはGold比較test維持。R2 source/evidence/distと旧試作、Production3作品57問・Portal・保存・計測を保全。preservation.jsonに開始時2490ファイルの検証。既存変更2文書のみ追記許容、他baseline変更0。stage/commit/push/deploy/LAN/外部書込み0。今回のpreviewは127.0.0.1:4369のみ。

Security raw全project scanは判定済み2件の **FAILを保持**、新規0、専用配布物0、index変更0、既知TLS鍵のindex/history不在。既存scanner/hook/例外を変更せず。詳細security.json。

**Human Progression Gate PENDING**。達成感・初見理解・聴感の良否・物理iPhone/Android・6–8分初見run・最終製品受入はNOT TESTED/PENDING。音声信号や自動操作PASSでこれらを代替しない。公開・広告・法務承認はこの作業の対象外。ここでHuman再試遊待ち。
