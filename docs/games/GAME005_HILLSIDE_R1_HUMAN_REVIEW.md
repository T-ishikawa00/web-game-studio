# GAME005 Hillside Representative Slice R1 — Human Review

2026-09-23。隔離candidate：`game005-island/hillside-r1/`。主担当・独立read-only reviewerの実モデル：**gpt-6-astra**。Accepted基準checkpoint：`39d2b13d09de5b85eed169fd79a6c3cb78270aef`。

**第三地区「見晴らしの丘」の代表Slice。Full Game Productionでも、新しいAccepted Baselineでもない。** Humanが3地区で完成品として納得できるかを判断する資料。

## 試遊と比較

- [ローカルHuman Review・4構成比較・等速動画](http://127.0.0.1:4396/review/)
- [通常試遊](http://127.0.0.1:4396/)
- [独立した完成物レビュー](../../game005-island/hillside-r1/review/INDEPENDENT_REVIEW.md)

loopback限定。Reviewの「通常試遊を開く」から、初期村→暮らしの入り江→丘を通常操作で進める。新規save namespace/schema4でAccepted保存と分離。既存candidate saveを最初から試す場合は既存設定内の確認付きresetを使用する。ReviewのRoute切替は比較画像・動画の選択であり、ゲーム状態を注入しない。

## 今回の変化

「丘を結ぶ道」「見晴らしの縁」の2投資を既存Gold Galleryへ統合。村からの上りを主導線にするか、橋・入り江側から回り込む道を主導線にするかを選ぶ。次に海・港を見る縁台か、育てた村を見る屋根付きの縁台かを選ぶ。

接続軸は入口・中間経由点・巡回順序を変える。眺望軸は住民の到達する席・向き・滞在場所・通常の丘カメラ構図を変える。どちらの接続でも最後は村と既存橋を含む回遊を作る。眺望だけを変える混合構成も成立し、単なる座標違いに限定しない。

Accepted Expansionの広場位置・回遊路はそのまま利用先に残る。海際／木陰に応じた既存の休憩場所を経由し、仕事がなければ旧地区→接続路→丘→旧地区を自動巡回する。丘だけを優先し続けず、旧地区の席も予約制で利用。仕事が発生すると自動復帰し、終了後は余剰時間行動へ戻る。個別割当・人口管理・新しい数値ボーナスは追加しない。

既存の島へ限定した高さパッチと海岸の盛土を追加した。地表高は基準0.35から最大1.60。住民は同じ高さ関数に沿って実際に上下移動する。工事中のaccessと完成後のrouteはグラフで区別し、到達不能な直線移動で代用しない。道の斜面・階段・手すり・縁台・植生を一体化。自由地形編集や大規模terrain systemは導入しない。

最後の完成では短い視覚・音・カメラfeedback後に通常操作へ戻る。長いResult、星、スコア、強制Endingは追加しない。音はAccepted方式を利用し、ミュートとreduced motionを尊重する。これはEnding候補の検証であり、最終演出のHuman承認ではない。

## 4構成の通常入力証拠

4構成すべて新規開始から通常のクリック入力で完走。時間加速・state注入・Review専用の景観変更なし。各traceは73クリック、3住民、page error 0。Before／route選択／道の工事／道完成／眺望選択／縁台工事／完成／利用中／最終景観／同一Homeカメラを保存した。

| Route | 以前の入り江選択 | 接続 | 眺望 | 全記録 | 丘開始→完成 | 丘開始→最初の利用 |
|---|---|---|---|---:|---:|---:|
| A | 広場先行・海際 | 村側 | 海・港 | 6分46.74秒 | 40.62秒 | 54.15秒 |
| B | 回遊路先行・木陰 | 入り江側 | 育てた村 | 7分36.91秒 | 43.48秒 | 70.31秒 |
| C | 広場先行・海際 | 村側 | 育てた村 | 6分47.06秒 | 40.65秒 | 55.27秒 |
| D | 回遊路先行・木陰 | 入り江側 | 海・港 | 7分21.99秒 | 41.52秒 | 65.24秒 |

全記録は初期村・入り江・丘・観察を含む。**丘そのものの追加プレイ時間を約7分とは扱わない。** 自動入力で迷いの少ない進行であり、Humanの初見時間・選択の楽しさはUNKNOWN。本編15〜30分のScope仮説は今回だけでは確定しない。コスト・工事時間・納品回数で引き伸ばしていない。

A/CとB/Dは過去の広場と接続を固定して眺望だけを比較できる。A/Bの接続比較には以前の広場選択も含まれるため、純粋な接続軸だけの知覚比較ではない。技術テストでは市場配置も含む16組を独立に検証した。

動画は等速1x、無編集の全記録。Playwright録画のため音声は含まない。Review用seekable版は映像streamを再符号化せずコンテナのみ調整し、長さ・seekを検証した。音の有無は別のbrowser計測とHuman試聴で分ける。

## QA結果と証拠の種類

| 確認 | 結果と範囲 | 証拠 |
|---|---|---|
| 型・build | PASS。bundle約655KB、gzip約176KB。500KB超のbuild警告は残る | candidate dist、再現可能なtsconfig/build script |
| unit / simulation | 42 PASS。既存MVP回帰、cove順序、hill16組、経路・席予約・保存不正拒否・仕事復帰 | [unit](../../game005-island/hillside-r1/review/unit.txt) |
| 総合browser | 20 PASS。工事途中save、選択保持、完了save、Gallery、JA/EN、360/390/844、touch、pause、保存失敗・破損保全等 | [browser](../../game005-island/hillside-r1/review/browser-qa.json) |
| 実地形・hit test | 4構成PASS。地形raycastと経路高の差は最大約0.022、lookout選択4/4 | [terrain](../../game005-island/hillside-r1/review/terrain-qa.json) |
| 完成後browser | A/B×desktop/mobileの4 PASS。EN/reduced、配置変更・reload・Accepted保存保全 | [finish](../../game005-island/hillside-r1/review/final-browser-qa.json) |
| 完成音・復帰 | mute offで2音event、mute onで0。pause時発音なし、通常controls復帰 | [audio](../../game005-island/hillside-r1/review/audio-qa.json) |
| Review表示 | 1440/390で全32画像decode、4動画長さ・1x・seek・収まり、非公開pathの404 | [review](../../game005-island/hillside-r1/review/review-qa.json) |
| 継続動作 | 約905秒、31観測、error 0、最後のreloadと保存検証PASS | [long-session](../../game005-island/hillside-r1/review/long-session.json) |

通常試遊画像・動画と、技術確認用にcompleted saveを読み込んだfixtureを分離した。terrain・finish・audio・性能・継続動作のfixtureはHuman通常入力証拠として使用しない。

15分観測でWebGL buffer 572／texture 7／program 7は一定。60秒時点のGC後heap約21.64MBに対して終了時約21.62MB。保存は観測中993〜1328bytes。30秒ごとの明示GCを使った保持メモリ比較であり、自然GC・数時間・mobile熱／電池の保証ではない。

## 性能

最終測定結果は[performance](../../game005-island/hillside-r1/review/performance.json)。Accepted MVP／Accepted Expansion／完成Hillside Home／丘カメラを同じPCで順番に測定。各cellは2秒warmup＋8秒計測、desktop／390px DPR2／mobile lowの12cell。技術fixtureであり、実機iPhone性能へ一般化しない。

Windows Edge／RTX 4060 Tiで、desktopのdraw calls中央値はMVP317→Expansion445→Hillside521（Expansion比+17.1%）。frame間隔P95は16.8→16.8→16.9ms、描画callback CPU P95は1.8→2.1→2.2ms、script負荷は90.3→106.6→110.9ms/秒。丘カメラでも521calls、P95 16.8ms。callbackはGPU描画時間ではない。

390px DPR2も同じPCでP95 16.8ms。lowは既存の約30fps動作を維持し、Hillside268calls／P95 33.5ms。小さな1回8秒の標本にすぎず、低性能mobileの余裕を証明しない。次の実機Gateでは丘完成状態、屋根越しの住民可読性、GPU負荷を優先して確認する。

## Craftと独立レビュー

独立reviewerは通常入力A/B、混合C/Dの完成画像、trace、修正source、Route Bの等速動画から切り出した正確な8時点、補正後mobile画像を確認。確認範囲で新規P1/P2 blockerなし。「空いた斜面へ道が伸び、橋・村を結び、高い場所で住民が休む」変化を認め、装飾追加だけとは判断していない。

全動画の連続視聴・全フレーム検査ではない。390px全島表示では住民は小さく、屋根・植生の遮蔽もある。mobileで行動が十分伝わるかはHuman Gate。Physical iPhone / Safari、実機操作・熱・電池、Humanの聴感は **NOT TESTED**。

## Security / 保全 / 権限

[今回のHuman disposition](../security/GAME005_HILLSIDE_R1_HUMAN_DISPOSITION.md)を記録した。H01 currentはTRUE SECRET / LOCAL TEMP QA PROFILE ONLY / APPROVED FOR LOCAL RETENTION。残るcurrent10候補は公開鍵6／profile integrity4の限定承認。元profileとSecurity evidenceは削除・変更していない。原scan値との同一性はUNKNOWN、原raw FAIL11を維持する。S04/S05 UNKNOWN / UNRESOLVED、過去checkpoint-only risk acceptanceは転用しない。

新QA harnessはrunごとにOS temporary rootへ新規profileを作る。個人profile・loginコピー・real account loginなし。実profile pathを記録しない。終了時は自身のrootを再確認し、そのrunだけをcleanupする。既存browser／profile／processは操作しない。外向きbrowser通信は無効proxyとloopback限定request制御で遮断。scanner／allowlist／hookは変更しない。repo外profileが秘密を含まないと主張するものではない。

[最終Security](../../game005-island/hillside-r1/review/security-final.json)と[保全確認](../../game005-island/hillside-r1/review/resume-preservation.json)が最終結果。対象はcandidate全体（ignored含む）・dist・今回文書／現在地。full-project checkpoint前scanの代わりにはしない。

Accepted MVP133入力・22派生、Expansion102入力＋4依存・12派生を再現検証。Accepted source／distributionを更新せず、Gold CSSと音sourceの一致も確認。既存3798fileの開始snapshotから対象外作業の保全を検査する。HEAD・index・upstreamは維持。stage／commit／push／deploy／public registry／Cloudflare／Ads／App Store／外部設定変更なし。

## Humanが決める8項目

1. 入り江の焼き直しではなく、島を結ぶ発展に感じるか。
2. 過去の地区を見ながら、接続と眺望を選ぶ判断になっているか。
3. 実高低差が景観・動線に意味を持つか。
4. 住民が丘だけでなく島全体を使うように見えるか。
5. 3地区で完成品として納得できそうか。
6. 管理負担と操作の面倒さが増えていないか。
7. 追加地区なしでも一つの島を完成させたと感じるか。
8. Accepted Craft / Gallery Gold / tempoを維持しているか。

Scope・面白さ・完成感のPASSはHumanのみが判断する。このGateまでFull Productionへ進まない。

**GAME005_HILLSIDE_REPRESENTATIVE_SLICE_R1_READY / HUMAN_FINAL_SCOPE_GATE_PENDING**
