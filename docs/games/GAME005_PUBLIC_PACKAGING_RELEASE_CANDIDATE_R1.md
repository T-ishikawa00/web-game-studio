# GAME005 — Public Packaging & Release Candidate R1

2026-09-24。**GAME005_WEB_V1_FULL_GAME_HUMAN_PLAY_GATE_PASS**。Humanが通常試遊して「問題ない」と判断し、Web v1の現行gameplayを完成基準として受入。公開名・cover・Portal統合・公開権限は別Gate。

## Scope / 固定するもの

Accepted `game005-island/web-v1-r1/` は変更しない。初期村・暮らしの入り江・見晴らしの丘、完成後の鑑賞、B Gallery Gold、最大3住民、木材／資金、自動作業、個別割当なし、tempo／completion／save／JA・ENを固定。4地区目・資源／住民追加・経済／progression変更・App Store・Ads・待機水増し・gameplay再設計を行わない。

`game005-island/public-r1/` にPortal・runtime・配布物・QA・Reviewを隔離。Production registry、rootのPortal source、旧配布物、provider設定を変更しない。主担当・独立read-only reviewer実モデル：gpt-6-astra。

## ローカル試遊

- [一括Human Review](http://127.0.0.1:4398/review/)
- [JA Portal](http://127.0.0.1:4398/ja/) / [EN Portal](http://127.0.0.1:4398/en/)
- [JA detail](http://127.0.0.1:4398/ja/games/island-connections/) / [EN detail](http://127.0.0.1:4398/en/games/island-connections/)
- [JA Play](http://127.0.0.1:4398/ja/play/island-connections/) / [EN Play](http://127.0.0.1:4398/en/play/island-connections/)
- 起動：repo rootから `node game005-island/public-r1/scripts/server.mjs`。loopbackのみ。

PreviewのタイトルA・cover Aは比較用の仮採用。正式承認ではない。公開metadataはdraftのまま。localhostのportが異なるため4397の保存は4398へ自動で移らない。本公開時もoriginが異なるので自動移行を約束しない。

## タイトル — 3案に絞る

| 案 | JA / EN | 意味・内容との一致 | 他作品との識別性 / 小さいcard |
|---|---|---|---|
| A 推奨・Preview表示 | 島をつなぐ日 / An Island Connected | 道と暮らしを結び、1回の完成を迎える体験。3地区を包む | Hakorilo、Lightwork Garden、Two Ways Home、PROJECT MAGNETと語感・題材が違う。JA6文字、ENは2行で読める |
| B | ひとつづきの島 / Paths of a Little Island | 経路選択と一つの島を住み継ぐ方向を強調 | 島づくりと分かる。JA7文字、ENは長めで小cardの2行占有が大きい |
| C | 入り江のある暮らし / Life by the Cove | 住民が歩く・休む雰囲気を最も強く伝える | 他4作品とは区別できる。JA9文字・EN短め。ただし丘と島全体の完成を代表しにくい |

3案とも既存Reviewの候補から選定。商標・同名作品・検索競合・slug利用可能性は未調査。商標安全性、独占性、売上・集客を断定しない。Humanタイトル承認後、必要な名称調査は別工程。

## Cover — 実ゲーム2構図

通常入力で新規開始から完成させた同一の島から取得。AはHome俯瞰、Bは丘からの構図。ゲームの通常cameraボタンで移動し、撮影時だけHUD／操作UIを非表示。地形・建物・住民・光・色・時間・stateを作り替えない。AI生成・架空の住民増量・合成広告素材は使わない。

Previewのcover Aを推薦。村、海、橋、入り江、丘が一画面に収まり、5本一覧で「3D島づくり」が伝わることを優先。Bは高低差と暮らしの奥行きの比較候補。元画像は1440×1000、Portalは既存960×600相当のcover枠へobject-fitで収める。新たな画像補間・美化は行わない。PC cardとmobile約100pxの小さい画像を両方確認する。小さいcoverで住民の細部は読みにくく、数や行動を誇張して補わない。

## Copy / metadata

| 項目 | JA | EN |
|---|---|---|
| 短文card | 道をつなぎ、暮らしの景色を育てよう。 | Connect the paths. Watch island life grow. |
| description | 建てる場所と順番を選び、村から入り江、見晴らしの丘へ。住民が働き、歩き、休む景色を育てる、小さな3D島づくりゲーム。 | Choose where to build, from a village to a cove and hillside lookout. Grow a little 3D island and watch residents work, wander and rest. |
| 詳細 | 建築・施設から、次に作る場所を選びます。木材と資金を使い、作業は住民におまかせ。入り江の広場、丘への入口、見晴らしの向きを選び、島全体をつなぎましょう。完成後も鑑賞と市場・広場の配置調整ができます。 | Open Build & explore and choose what to make next. Spend timber and coins; residents handle the work. Choose a cove commons, a path up the hill and a view to bring the island together. After completion, keep looking around or reposition the market and commons. |
| 操作 | タッチ・マウス・キーボード。ドラッグで回転、ホイール／ピンチで拡大縮小。矢印・＋／−・Homeで視点。音・動き・画質は設定から。 | Touch, mouse and keyboard. Drag to orbit; scroll or pinch to zoom. Arrow keys, +/− and Home move the view. Sound, motion and graphics are in Settings. |
| 保存 | 建物・資源・進行・配置と設定をこのブラウザに自動保存。進行消去後も設定は残る。保存失敗を通知。JA/ENで進行を共有し、保存済み言語を優先。 | Progress, placements and settings save in this browser. Reset keeps settings. Saving failures are shown. JA/EN share progress; a saved language preference takes priority. |

候補ID `game005`、slug候補 `island-connections`、version `web-v1-r1`、state `draft`、広告disabled、local save schema1／key `tinlumo:game005:web:v1`。PC／mobile browser向けという設計表記で、実機互換性PASSとは扱わない。公開名・cover承認はmetadata上もPENDING。

## Production integration diff

基準は現行 `release-artifacts/tinlumo-trust-ux-r2/` の64file manifest。Trust & UX R2にConsent Architecture R1 C、既存の所有確認metaを含む。古いGame004候補を基準にしない。現在のlocal artifactはmanifestで検証。live Productionへの新規照会・操作は行わない。

- 同じPortal components・styles・layoutを隔離コピーで使用。カードを5件にし、各detail／通常PlayのrelatedへGame005を含める。既存の主CTA、ナビゲーション、4作品のpayload・save adapter・coverは保全。
- Game005のJA/EN detail／fullscreen Playを追加。パズルの共通shellやMAGNET専用launcherへ誤接続しない。島を縮めるPortal常設管理UIは追加しない。
- runtimeの変更は新規saveがないEN入口の初期言語と、左上ISLANDから詳細・relatedへ戻るlinkのみ。既存saveの言語・内容を強制上書きしない。core／storage／save key／scene／completion／Gold CSS／audioはAccepted bytesを維持。
- About／Termsの作品数は同じcatalogから5へ導出。Privacy／TermsへGame005固有のsave説明、Creditsへ制作情報とThree.js MIT noticeを追加。既存のtrust/legal本文を改変しない。追加保存説明は「改定案・未適用」と表示し、古い適用日で承認済みにしない。
- Consentの明示設定・初期OFF・本番hostname guard、所有確認metaを保全。Ads SDK／CMP／新analyticsは追加しない。
- 全候補ページnoindex、robots Disallow、空の候補sitemap。これらはlocal reviewの封じ込め差分。将来の公開切替は承認後の別作業。
- cloned source pathによりAstroのscope IDとCSS filenameが変わる。旧scope IDを正規化するとcompiled CSSは同一で、ページ側scopeとの対応を確認。新デザインのCSS変更ではない。

追加／変更／削除file一覧・bytesはcandidate `review/distribution.json`、source差分は `review/integration-diff.json`。デプロイ先rootの書換えは行っていない。

## Credits / rights

Tinlumo Studio、AI支援制作。元台帳 `game005-island/review/ASSETS.md` を継承。島・建物・住民・海・入り江・丘はコードのgeometry/shader、効果音はWeb Audio合成、system font。Gallery PNGは既存の局所レンダー素材をbyte保持。ユーザー提供参考画像は内部参照のみで配布しない。Three.js 0.186.0のMIT全文を配布物に含めCreditsから参照。Human title／cover／公開承認は別に必要。

## QA / Security

| 確認 | 今回の結果 / 証拠 |
|---|---|
| Gameplay型 / build | Game005 strict typecheck PASS、Vite／Astro build PASS。既存500KB超警告は保持。Portalは38 HTML（404含む）、37対象route、配布84files |
| unit / simulation | 42 PASS。MVP経済、入り江、丘の4構成と旧選択を再確認 |
| 通常完走 | Public JA PortalからRoute Bを新規開始。445.62秒、76クリック、等速・状態注入なし。完成reloadとrelatedへの往復を含む。工事完成352.06秒。既存Accepted動画も保全 |
| Game005 browser | 20項目PASS。工事途中／完成保存、設定、破損・失敗・競合、pause／hidden、touch pinch、JA/EN、360／390／landscape、Gallery、WebGL／load failureを含む |
| 公開導線 | 14シナリオPASS＋56local参照確認。JA/EN×1440/390、Portal→detail→Play→related、4作品×JA/EN、Consent、credits、37route HTTP200。page error／外部request／failed response 0 |
| Sound / mute | 2 PASS。完成発火2event、mute0、pause無音、reducedで通常操作復帰。聴感の新規Human評価とは別 |
| 既存4作品 | 26配布payloadをbyte保持。JA/EN起動・通常入力・保存表示／reload・related確認。57パズルとMAGNET18区画の全編は今回再演せず、payload不変を根拠に既存証拠を再利用 |
| 配布検査 | source／Review／tests／profiles／source maps／内部参考画像なし。Three.js MIT noticeを同梱。旧4作品の保存・Consent asset・4cover不変 |
| 保全 | 開始4,152filesの対象外作業、Accepted Web v1、旧MVP／Expansion／Hillside、Production64files、HEAD／upstream／indexを保全 |
| Security | full project ignored込みは既知17件のraw FAIL維持。元6件のSHA／TLSとcurrent H01〜H11の限定dispositionを確認。full index／local history PASS。candidate ignored込み／distribution／更新文書の最終scanは新規0。TLS／現存profileのindex・all refs＋reflog historyへの元file混入0 |

今回のQA設定移植中、URLのoriginとpublic routeを混同した検査、旧bilingual loading文言期待、MAGNETの初期作戦選択を飛ばした検査が失敗した。検査の入口を修正し、結果をiteration evidenceへ保全。gameplayを変更せずGame00518項目＋失敗2項目の再検査、Portal全14シナリオ再実行で確認。期待結果を緩めていない。

記録はcandidate `review/unit.txt`、`browser-qa-final.json`、`portal-qa.json`、`audio-qa.json`、`route-B-play.json`、`media-verification.json`、`distribution.json`、`integration-diff.json`、`preservation.json`、`security-final.json`、`checkpoint-inspection.json`。技術seeded検査と通常完走・coverを分ける。再撮影・再演していない性能15分等はAccepted証拠であり今回の新規計測ではない。今回のfull indexは現時点のindex全体に対するread-only検査で、新RCのstageは行っていない。Human承認後にstage／commitする際はその対象indexでfresh再検査が必要。

Review表示は1440／390pxで各12通りのtitle／language／cover比較と等速video seekを確認。独立review（gpt-6-astra）はsource、指定画像、QA証拠を確認し、未解決P1/P2なし。比較用cardと実Portalのcontain表示の差を指摘・修正し、再確認してclosed。全動画連続視聴ではない。詳しくは `review/INDEPENDENT_REVIEW.md`。

Physical iPhone / SafariはNOT TESTED。今回のWeb release blockerへ自動昇格させない。新しい聴感・端末の熱／電池・商標／法律判断・live release smokeを自動PASSにしない。Acceptedのゲーム全編Human Play GateはPASSとして保持。

H01 currentはTRUE SECRET／LOCAL TEMP QA PROFILE ONLY／local retention承認、current公開鍵6件・integrity4件は限定承認。原raw FAIL11と原検出値同一性UNKNOWN、S04/S05 UNKNOWNを保持。過去のcheckpoint限定risk acceptanceを転用しない。既知6件のSHA／TLSも範囲を拡張しない。新規候補で停止。QA profileはrepo外のrun所有OS temp、自runだけcleanup。scanner／allowlist／hook変更なし。

## Rollback plan — 未実行

1. 今回はlocal候補のみなのでProductionへ影響なし。Human不採用時はcandidateの参照を止め、受入済み4397と旧Productionを継続する。自動削除はしない。
2. 将来の公開承認時は、現行remote version／deploymentを改めて確認し、直前の配布manifestを凍結する。現在手元にある記録はConsent R1 C：version `0245614c-19fa-4e6c-a1bb-180a3230caff`、deployment `de0d7486-768c-4e70-933d-ef814333812a`、checkpoint `ed0695b5f187567cd52a30759774ff945c5a6e19`。これは2026-09-21の記録であり、実行時の最新remote状態を保証しない。
3. 承認後の公開で問題が起きた場合は、Humanのrollback権限に従い、直前の4作品artifact全体へ戻す。Game005追加HTMLだけでなく対応CSS、catalog、sitemap／metadataも組として戻す。Preview／Consent／Email／Ads設定は触らない。
4. Game005のlocalStorageを消去・移行しない。4作品の既存saveも維持。復旧後にJA/EN、4作品、Consent、trust/legal、assetsを再確認する。
5. commit／push／deploy／rollbackは今回実行しない。実行時は再度fresh Security・対象index／history／dist・Human release権限を確認する。

## Human Public Release Gate

承認対象はタイトル1案、cover1案、Portal／detail／Play／related／creditsと公開説明、release state／残件。gameplayを再拡張しない。正式名・cover確定前にProduction registryへ反映しない。

**GAME005_PUBLIC_PACKAGING_RELEASE_CANDIDATE_R1_READY / HUMAN_PUBLIC_RELEASE_GATE_PENDING**
