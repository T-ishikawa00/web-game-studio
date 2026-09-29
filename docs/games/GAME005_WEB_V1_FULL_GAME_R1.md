# Game005 — Web v1 Full Game Candidate R1

2026-09-24。HumanはC1 Compact「一つの島を結ぶ」を正式Full Game Scopeとして採用。Web-first。これはlocal implementation / QA / Reviewの許可であり、製品受入・公開・Git checkpointの許可ではない。

**GAME005_WEB_V1_FULL_GAME_CANDIDATE_READY / HUMAN_FULL_GAME_GATE_PENDING**。ローカル候補完成。最終Human受入・公開・checkpointは未承認。

## Authority / Keep

Accepted MVPとExpansion、Hillside R1を基に、`game005-island/web-v1-r1/`へ候補を隔離。基準HEAD `39d2b13d09de5b85eed169fd79a6c3cb78270aef`。初期村→暮らしの入り江→見晴らしの丘の3地区、母屋増築でAcceptedどおり2人から3人、自動作業・個別割当なし。木材／資金、B Gallery Gold、既存Craft、プレイヤーが建設・配置・投資順を決める構造を維持する。

新地区・第3資源・深い交易・offline progression・daily・grind・新しい大規模管理システムは入れない。費用・工事時間・納品回数を増やさない。7〜12分程度でも許容するHuman方針を適用し、15〜30分へ合わせない。App Store/native iOSはv1 Scope外。Physical iPhone / SafariはNOT TESTED。

## Play / Review

- [Full Gameを通常試遊](http://127.0.0.1:4397/)
- [一括Human Review](http://127.0.0.1:4397/review/)
- 起動：repo rootから `node game005-island/web-v1-r1/scripts/server.mjs`。loopbackのみ。既存Hillsideの4396とは別process。
- 型：`node node_modules/typescript/bin/tsc --noEmit -p game005-island/web-v1-r1/tsconfig.json`
- build：`node game005-island/web-v1-r1/scripts/build.mjs`
- unit：`node game005-island/web-v1-r1/scripts/test.mjs`
- browser：`node game005-island/web-v1-r1/scripts/run-browser.mjs browser`

初期状態から通常操作で進める。Reviewページは比較・記録用。ゲーム本体にReviewリンク、状態注入フック、fixture起動引数はない。通常タイトルはworking titleのPROJECT ISLAND / ISLANDを維持し、公開名は確定しない。

## 完成品化の差分

1. 全3地区の既存進行を一つの通常entryと専用保存に統合。旧MVP・Expansion・Hillsideのsource／保存を上書きしない。
2. 丘の接続／眺望マーカーを正しい1・2へ統一。Galleryのアクセシブル名、後半案内、Settings/resetの日英から制作語を除去。
3. Goalの詳細は現在の短い目標と一つの行き先へ整理。完成後は「つながった島／YOUR ISLAND」と鑑賞CTAへ切替。
4. 最後のlookout完成時に既存の完成音・短いtoastとともに島全体を見せ、実際の接続と選択済みの席へ至る道を約2.4秒、淡い光で示す。長いResult・星・スコア・入力ロックはない。
5. Reducedでは自動視点変更と光を出さず、完成の文言を示す。pause・Settings・hiddenは進行と演出を止め、Reduced切替・resetでcueを解除。完成済みsaveのロードで完成演出を再発火しない。

完成後は自由に鑑賞できる。市場の海側／庭側、広場の海際／木陰という既存の有限選択肢を無料で調整できる。丘の接続・眺望を完成後に再施工する新システムは追加しない。異なる丘は新規プレイの選択になる。

## Save設計

| 項目 | Web v1仕様 |
|---|---|
| namespace | `tinlumo:game005:web:v1` |
| envelope / state schema | `version: 1` / `schemaVersion: 1`。通常writeはrevisionも保存 |
| 地区進行 | 初期施設、橋、入口、commons、promenade、hillpath、lookout |
| 選択 | 市場plot、広場plot、connection、viewpoint |
| 建設中 | 予約資材plan、工事project、費用控除済み状態、worker pathと仕事 |
| 完成 | hillpathとlookoutから導出。重複する完成管理値を増やさない |
| 設定 | JA/EN、mute、reduced motion、low graphics |
| 保存タイミング | 操作・進行event・5秒間隔・hidden/pagehide |
| 破損 | 原データを保持。一時モードと警告。黙って上書きしない |
| 書込不可 | 保存不能を明示。完成しても保存成功とは表示しない |
| 複数タブ | 他タブ変更を検知し停止。新しいsaveを上書きしない |
| reset | 確認付き。このkeyだけ消去し設定を維持 |
| 旧save | 読込・自動移行・上書き・削除を行わない |
| offline / cloud | なし。実時間差で進行を加算しない |

将来本公開のorigin／routeが決まるまでは、このlocalhost保存が公開originへ移るとは案内しない。prototype移行を必要とする場合は別途Human判断。schema変更も別の互換性設計を行う。

## 正式に成立させる4構成

| 接続 | 眺望 | 差 |
|---|---|---|
| 村側 | 海・港 | 村から登り、開いた海向きの縁台で休む |
| 村側 | 村全体 | 村から登り、育てた村を向く屋根下で休む |
| 入り江側 | 海・港 | 橋の入口から回り込み、海向きへ抜ける |
| 入り江側 | 村全体 | 橋から丘へ登り、村を見下ろして旧地区へ戻る |

以前の広場位置・回遊路は巡回先として利用する。住民は仕事で旧地区へ復帰し、余剰時間は旧地区の散歩・席・丘を使い分ける。最大3人を全員丘に常駐させない。

## QA設計と証拠区分

Human動画はfresh startから通常入力・等速。Route A（広場先行・海際／村接続／海港）、Route B（回遊路先行・木陰／入り江接続／村眺望）の全編を残す。fixtureをHuman動画へ混ぜない。通常記録と技術seeded testはファイル・説明を分ける。

技術QAでは型/build、既存経済parity、4構成と過去配置、工事途中／完成save、旧namespace保全、設定・JA/EN・mobile、Gallery、reduced、audio/mute、pause/hidden、保存失敗・WebGL/load failureを対象とする。15分継続観測は技術completed fixture。性能測定は他のQA browser終了後、Accepted Expansion・Hillsideと完成candidateを同じPCで比較し、Gallery開閉も測る。

## Public packaging案 — 未反映

これは将来接続の下書き。Portal本体・public registry・public metadataへ反映していない。

| 項目 | 候補 |
|---|---|
| internal game ID | `game005` |
| slug候補 | `island-connections`（公開名と合わせてHuman確定） |
| JA card copy | 小さな島に道をつなぎ、暮らしの景色を育てよう。 |
| EN card copy | Connect a little island. Watch life find its way. |
| JA description | 建てる場所と順番を選び、村から入り江、見晴らしの丘へ。住民が働き、歩き、休む景色を眺めながら、一つの島を結ぶ小さな建設ゲーム。 |
| EN description | Choose what to build and where it belongs. Grow a village, bring life to a cove, and connect them from a hillside lookout in a compact island builder. |
| JA detail copy | 木材と資金を使って建築を依頼。必要な作業は住民が自動で引き受けます。道の入口や広場、眺める方向を選び、完成した島はそのまま眺められます。 |
| EN detail copy | Spend timber and coins on the places you choose. Residents handle the work automatically. Choose paths, gathering places and a view, then stay to enjoy the island you have made. |
| controls JA | 施設や建築ボタンを選択。ドラッグで回転、ホイール／ピンチで拡大縮小。キーボードはTab／Enter、視点は矢印・＋／−・Home。 |
| controls EN | Select a place or open Build & explore. Drag to orbit; scroll or pinch to zoom. Use Tab/Enter and arrow keys, +/− or Home for the view. |
| save説明 JA | このブラウザに自動保存。別端末・別ブラウザへの同期はありません。保存できない場合は画面にお知らせします。 |
| save説明 EN | Progress saves automatically in this browser. There is no cross-device sync. A message appears if saving is unavailable. |
| thumbnail / cover要件 | 実ゲームの完成島を使い、村・橋・丘・入り江を同時に見せる。住民利用が読める構図。小さいcardでも橋と高低差を残す。JA/EN共用でUI文字は焼き込まない。比率／pixel数は現行Portalの実仕様に合わせる。架空施設・Review美化なし |
| public route requirements | registryに確定ID・slug・JA/EN metadataを登録する別工程、localized detail/play導線、埋込resize・pause/hidden、相対asset URL、local-save説明、失敗／再試行、権利・cover確認、routes QA。実際のroute命名は現行Portalとの照合後に確定 |

公開名候補は以下の6案。商標・既存作品名・slugの利用可能性は未調査で、採用済みとはしない。

| 日本語案 | English案 |
|---|---|
| 島をつなぐ日 | An Island Connected |
| ひとつづきの島 | Paths of a Little Island |
| 入り江のある暮らし | Life by the Cove |
| 小さな島のつづき | A Little Island, Growing |
| 橋の向こうの暮らし | Life Across the Bridge |
| 島に、道がつづく | Where Island Paths Meet |

実広告・広告SDK・CMP変更なし。将来候補は完成演出と住民利用を十分見た後、自発的にゲームを離れる等の自然な区切り。完成直後を自動で遮らない。今回広告接続はしない。

## Security / 権限

H01 currentだけTRUE SECRET / LOCAL TEMP QA PROFILE ONLY / APPROVED FOR LOCAL RETENTION。H02〜H04・H07〜H09 current6だけPUBLIC KEY / NON-CREDENTIAL / FALSE POSITIVE / APPROVED。H05〜H06・H10〜H11 current4だけPROFILE INTEGRITY METADATA / NON-CREDENTIAL / FALSE POSITIVE / APPROVED。

旧profileと証拠を保持。historical raw FAIL11と原scan値との同一性UNKNOWNを維持。S04/S05はUNKNOWN / UNRESOLVED、以前のcheckpoint-only risk acceptanceは使用済み。将来候補へ承認を転用しない。

QA browserはrunごとのrepo外OS tempを使う現行方式を維持。personal/persistent/login profileなし。実profile pathは記録せず、自身が作ったrootだけcleanup。scanner／allowlist／hook変更なし。新規candidateなら停止。今回scanはcandidate全体（ignored含む）・配布物・今回文書・承認current11fieldの保持fileを対象とし、将来のfull-project/index/history checkpoint Gateの代用ではない。

stage／commit／push／deploy／public registry／Cloudflare／Ads／App Store／外部設定変更は禁止。旧Baselineを候補で置換しない。主担当・独立read-onlyレビュー実モデル：gpt-6-astra。

## Human Gate

1. 3地区でWebゲームとして十分か。
2. 短くても完成品に感じるか。
3. 途中で作業感が出ていないか。
4. UI / Craft品質がAccepted水準を維持しているか。
5. 完成後に島を眺めたくなるか。
6. 別配置でもう一度遊ぶ余地があるか。
7. Tinlumoの5本目として公開したい品質か。

最終Human製品受入、公開名、公開・Git権限は未承認。Physical iPhone / Safari、実機の熱・電池・長時間性能、Human聴感はNOT TESTED / PENDING。

## 最終結果

通常入力の最終版記録：Route A 407.02秒（6分47秒）、Route B 441.98秒（7分22秒）、mobile M 441.80秒（7分22秒）。いずれも73クリック、個別割当0、state injectionなし、1x、page error 0。初期村から入り江・丘と完成後の観察を含む。最後の工事完成はA342.67秒／B352.08秒／M351.77秒。操作を知った自動入力であり、Human初見の実測や楽しさの証明ではない。時間を延ばす調整はしていない。

- [A全編](../../game005-island/web-v1-r1/review/video/route-A-seekable.webm)／[B全編](../../game005-island/web-v1-r1/review/video/route-B-seekable.webm)／[mobile全編](../../game005-island/web-v1-r1/review/video/route-M-seekable.webm)。原録画も保持。seekable版はstream-copyコンテナ調整のみで、切断・加速・再描画・色加工なし。録画は無音で、音は別の発火・mute検査とHuman試聴に分ける。
- 型・build PASS。bundle約660KB／gzip177KB。500KB超のbuild警告は保持。新規管理システムや依存追加なし。
- [unit / simulation](../../game005-island/web-v1-r1/review/unit.txt)：42 PASS。MVP経済parity、旧入り江の順序・配置、丘4構成と過去広場／市場の16組、仕事復帰、予約返却、保存検証。
- [総合browser](../../game005-island/web-v1-r1/review/browser-qa.json)：20 PASS。工事途中save、JA/EN、360/390/844px、Gallery、設定、pause/hidden、保存不可／破損／競合、WebGL／load failure等。
- [Full Game追加QA](../../game005-island/web-v1-r1/review/product-qa.json)：7 PASS。全4完成構成のreload・移設・reset、旧4namespace保全、制作語／Reviewリンク除去、完成pause／reduced、最終write失敗時の正直な警告。
- [地形・hit test](../../game005-island/web-v1-r1/review/terrain-qa.json)：4構成 PASS。経路高とterrain raycast差最大約0.022、lookout hit 4/4。
- [音・mute](../../game005-island/web-v1-r1/review/audio-qa.json)：2 PASS。完成音2event／mute0、pause無音、通常controlsへ復帰。音sourceはAcceptedと同じ。Human聴感はPENDING。
- [Settings](../../game005-island/web-v1-r1/review/settings-qa.json)：JA desktop／EN mobile、通常入力で確認。
- [15分継続観測](../../game005-island/web-v1-r1/review/long-session.json)：904.924秒、31観測、error0。buffer608／texture7／program7一定。GC後heapは60秒時21.456MB→最終21.500MB、保存989〜1316bytes。技術completed fixture、30秒毎の明示GC。自然GC・数時間・mobile熱／電池の保証ではない。

途中の完成演出2問題（未選択の枝道も光る、pause中の描画継続／Reduced変更未追従）を修正し、最終通常A/Bは修正版で再録。初回はiteration evidenceとして保全。GalleryキーボードQAの1件はtransition中の空innerTextを即時検査して失敗。専用診断でフォーカス・選択・表示を照合し、期待施設名の表示を待つ検査に修正、総合20項目を再実行してPASS。期待結果を緩めていない。

[独立完成物review](../../game005-island/web-v1-r1/review/INDEPENDENT_REVIEW.md)：実モデルgpt-6-astra、read-only。source修正、A/M指定画像、最終B3画像、等速B動画の正確な8時点を確認。範囲内に新規P1/P2 blockerなし。全動画の連続視聴ではなく、全時間帯の接地・Human面白さの保証ではない。

**残る視覚上の留保**：完成の光は細く控えめでGoal/toastが主要通知。mobileでは住民が小さく、屋根・植生で隠れる。Home俯瞰では海岸・岩の端が少し切れる。主要施設は読めるが、完成感・住民利用の伝わりやすさはHuman Gate。

[性能12cell](../../game005-island/web-v1-r1/review/performance.json)：Windows Edge／RTX 4060 Ti、2秒warmup＋8秒計測を順番に実施。比較中は他のQA browserを終了。通常画質でdesktop/mobile viewportの描画間隔P95は全版16.8ms、50ms超intervalは今回の標本で0。lowは約33.4ms（既存30fps方式）。CPU計測はGPU実時間ではない。

| desktop完成状態 | draw calls中央値 | render interval P95 | JS ms/秒 | callback CPU P95 |
|---|---:|---:|---:|---:|
| Accepted Expansion | 445 | 16.8ms | 107.57 | 2.3ms |
| Hillside Slice | 521 | 16.8ms | 105.90 | 2.4ms |
| Web v1 Home | 521 | 16.8ms | 71.02 | 1.3ms |
| Web v1 Gallery open | 523 | 16.8ms | 115.38 | 2.5ms |

Web v1はHillsideから常時draw数を増やさず、Galleryは選択輪等を含め+2。mobile viewportのJSはHillside109.75→v1 Home121.86→Gallery134.14ms/秒。短い1標本にはJIT・負荷変動を含むため、desktopの低いCPU値を改善率として主張しない。今回条件では重大な描画間隔悪化は観測されていないが、スマホ実機へ一般化しない。

最終の非視覚修正として、Goalから施設／鑑賞へ移る際の`aria-expanded`を閉状態へ同期した。通常動画・15分・性能の記録後のこの変更は表示・経済・住民・描画処理を変えない。型/buildと該当Full Game 7項目を再検査し、既存の通常記録・継続・性能証拠を再利用する。動画の通常操作列はGoal詳細を開かない。

Review表示は1440px／390pxで各24比較画像・mobile画像・全3動画の長さ／1x／チャプター再生を確認、横はみ出しなし。非公開JSON・source・profileへのHTTPアクセスは404。遅延画像の画面外decode待ちを検証側で修正し、Review末尾の長い状態名は折返し対応。ゲーム本体への追加変更なし。[Review QA](../../game005-island/web-v1-r1/review/review-qa.json)。

[最終Security](../../game005-island/web-v1-r1/review/security-final.json)の対象はcandidate全体（ignored含む）、dist、今回文書と現在地、既存current H01〜H11の3files。新規候補0。H01〜H11の元fileはHuman承認時からbytes不変、raw FAIL 1＋5＋5を維持。原scan値との同一性UNKNOWN、S04/S05 UNKNOWNを変更していない。全project/index/historyを対象とする将来checkpoint scanの代用ではない。

[最終保全](../../game005-island/web-v1-r1/review/preservation.json)：開始時3,958filesの範囲を照合し、対象外既存作業・Accepted MVP／Expansion・Hillside・旧Security evidence・HEAD／upstream／indexを保全。Gold CSSと音sourceはAcceptedと同一。QA profileは各run所有のrepo外rootだけcleanup。stage／commit／push／deploy／public registry／Cloudflare／Ads／App Store／外部設定変更なし。

**GAME005_WEB_V1_FULL_GAME_CANDIDATE_READY / HUMAN_FULL_GAME_GATE_PENDING**
