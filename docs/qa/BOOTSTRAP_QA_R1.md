# Bootstrap QA / Human Review R1

実施日: 2026-09-13。対象: `C:\projects\Web Game Studio`。最上位Authorityの全文を読み、指定ディレクトリと既存ファイル（Authority 1件だけ）を確認してから書込みを開始した。

**結論: ローカルPortal Core R1の実装・技術確認を完了。HumanによるPortal受入と最初の実ゲームテーマ選択待ち。製品の最終受入・公開許可ではない。**

## A. 環境と範囲
- Git branch: `main`。HEAD: unborn（初回commitなし）。untracked 52 files（元のAuthorityを含む）、既存ファイルの変更なし。remoteなし、stashなし。
- Node 24.14.0 / npm 11.9.0 / Astro 7.3.2 / TypeScript 6.0.3。
- 本番静的出力 `dist/`、localhost preview `http://127.0.0.1:4322`。ブラウザ確認はCodex in-app browser。
- 書込み操作は本project内。npm cache `.cache/npm/`、一時領域 `.tmp/`、Astro状態 `.astro/`。すべてGit除外。global設定は変更していない。
- 別repoへの編集/commit/checkout/reset等の操作なし。全PC/全repoの開始前snapshotは取得しておらず、他プロセスを含む完全な状態不変までは証明しない。
- Authorityの内容は編集していない。SHA256: `FAAB664608C7F80FE6A5E5E543A9D632ED23939E7A5DD6461E24EF19B22A3F73`。

## B. 成果物
日英Home、Games index、詳細、プレイ、About、Privacy、Terms、Contact、root誘導、404。型付きregistry、独立版付き内部fixture、local save/reset/migration、disabled/mock ads、メモリ内analytics、ローカルリソース件数診断。必須planning文書8件、event辞書、asset/依存license台帳、README、AGENTS。

内部fixtureは1本だけ。Game 001ではなく、公開数に算入せず、外部へ宣伝していない。関連releasedゲームは0件で、その空状態を表示する。3つのゲーム候補は構想のみで、実制作を始めていない。

## C. 再現コマンド
```powershell
Set-Location -LiteralPath 'C:\projects\Web Game Studio'
npm ci
npm run check
npm test
npm run build
npm run preview -- --port 4322
npm run test:routes
```
開発時は `npm run dev -- --port 4321`。起動/停止はREADME参照。上記コマンドはdeployではない。

## D. QA結果
| 項目 | 結果 | 実施内容・根拠 |
|---|---|---|
| cwd / write scope | PASS | 初期cwd完全一致、全書込み先を本project内に限定。外部repo/globalへの書込み操作なし |
| diff / 新規テキスト | PASS | `git diff --check`。untrackedは別途47テキストを空ファイルとの差分でcheckし、whitespace診断なし（元AuthorityとPNGは除外）。GitのLF/CRLF通知はコマンド単位のautocrlf=falseで検査条件を固定し、global設定は不変 |
| 型チェック | PASS | `npm run check`、21 files、errors/warnings/hintsすべて0 |
| lint | NOT TESTED | linter未設定。lint実行済みとは扱わない |
| 本番build | PASS | `npm run build`、静的18ページ出力、外部resource/DBなし |
| adapter単体テスト | PASS | `npm test`、10 tests / 10 pass / 0 fail |
| 本番HTTPルート | PASS | `npm run test:routes`、3 tests / 3 pass。日英16ルート、root、404、全抽出href/src、fixture HTML/CSS/JS |
| locale / metadata | PASS | HTTPとブラウザでlang/title/description、hreflang日英、noindex、深いプレイURLからの対応言語切替を確認 |
| 全画面レスポンシブ | PASS | 日英16画面×390/1440pxの32組で横はみ出し/壊れた画像0。`browser-layout-results.json` |
| プレイ画面resize | PASS | 320/390/768/1440pxでscrollWidthがviewport以下。iframe幅267/337/424/884pxへ追従 |
| 見た目 | PASS | デスクトップHome/play、モバイルHome/play/modalを実画像で確認。`screens/`に証跡 |
| fixture load | PASS | generation付きiframe ready、game_load_start→success、9ボタン操作可能 |
| pointer / keyboard | PASS | マウスclick、Enter、Spaceで各パネル切替。3/9とfirst_input 1件、meaningful_progressを確認 |
| タッチ端末の実機操作 | NOT TESTED | 物理iOS/Androidは未使用。touch-action:manipulationとnative buttonの共通click経路、モバイル幅を確認した範囲に限定 |
| save / restore | PASS | 3パネル操作→再読込3/9。4枚目追加→日英切替後4/9、保存成功表示 |
| reset / cancel | PASS | cancel後4/9維持。明示delete後再読込0/9。単体で他game IDの保存不変も確認 |
| 不正save / migration / quota | PASS | 単体で壊れたJSON、異game ID、未知schema、重複index、旧schema移行、getter拒否、quota、黙った書込失敗、reset失敗。成功を偽らず原データを保持 |
| ブラウザstorage拒否の実再現 | NOT TESTED | 例外/保存失敗はadapter注入による単体検証。実ブラウザの設定を変更する検証は未実施 |
| failure / retry | PASS | 英語画面でqa-simulated error→エラーUI、iframe除去、操作停止→reload→既存4/9復元、retry/load/success |
| ready-timeoutの実待機 | NOT TESTED | 8秒timeoutはコード実装。今回のブラウザ失敗確認は意図的なエラー経路 |
| mock pause/resume | PASS | interstitial表示中ボタンdisabled、skip後復帰して4枚目を操作可能 |
| rewarded / cancel | PASS | 任意選択→completeでTest rewards:1、操作再開。別のrewardedをEscape終了→no-reward、操作enabled |
| disabled / pressure | PASS | disabled→unavailableで継続。日英フルページ遷移直後の次広告はcooldown。別ゲームadapter間の共有も単体で確認 |
| events / privacy | PASS | load、first_input、progress、retry、save/ad結果をローカル表示。単体で50件上限/スナップショット分離確認。個人情報/座標/state送信なし |
| console | PASS | 実操作中のin-app browser warn/error 0（故意エラーはローカルeventとして表示） |
| 外部ゲーム/広告への通信 | PASS | 本番プレイのResource Timing診断: 外部0件（全resource 8〜9件、cache状況で変化）。HTTP抽出リンク/assetは同一origin。runtime sourceにfetch/XHR/beacon/WebSocket/外部URLなし |
| registry / related | PASS | 唯一のinternal fixture、公開0。relatedのreleased/self/draft/missing除外を合成データで検証 |
| 権利・法務の最終確認 | NOT TESTED | 法務草案、license metadata台帳、チェックリストを作成した段階 |
| 外部サービス/実広告 | NOT TESTED | 意図的に未接続。push/deploy/申請/契約/購入/実広告/外部送信は0操作 |
| Humanの面白さ・Portal受入 | NOT TESTED | Human確認待ち。自動QAから推定しない |

初回buildと最終buildは成功。CLI wrapperとregistry表示調整後にも型/build/unit/routesを再実行し成功。最終buildで再度日本語play、モバイルmock→Escape、外部0、console 0、Homeを確認。独立エージェントによるsave/ad/analytics/fixture/registryの読取レビューに具体的findingsなし。Human受入の代用ではない。

## E. Humanが見るポイント
1. [日本語Home](http://127.0.0.1:4322/ja/) / [英語Home](http://127.0.0.1:4322/en/): 第一印象、未公開/内部/候補の区別が明快か。
2. [内部テスト](http://127.0.0.1:4322/ja/play/connection-lab/): パネル操作、reloadでの保存、日英切替、戻る導線。狭い画面でも触りやすいか。
3. モック広告: 操作後1.2秒以上空けて開始。前回から60秒未満は見送りが正常。skip/完了で復帰するか。

## F. 最初のゲームテーマ
A 幼体進化ラボ: 姿と能力を変え、未到達のルートへ。B 光と仕掛けの工房: 部品を回して光をつなぎ、装置を動かす。C ワンムーブ・チェイン: 一手からの連鎖を予測し、すぐ再挑戦。

詳細は `../planning/INITIAL_GAME_THEME_CARDS_R1.md`。制作の始めやすさからBを提案するが、市場評価は未検証。Humanが1つ選ぶまで実ゲーム制作は開始しない。

## G. 残るunknown
- **技術:** 実機iOS/Android、複数実ゲームの負荷/保存schema、将来のruntime契約、配信先上限、実SDK障害、公開用internal/draft除外。fixture合格は全ゲーム互換性の保証ではない。
- **事業:** 実ゲームの楽しさ、入口作品、獲得/再訪/回遊、制作速度、正式名称、公開時期、単位採算、10作の内訳。
- **法務:** 運営者公開情報、地域/年齢、商標/類似性、全素材/依存の配布義務、録画/配信権、Privacy/Terms最終版。
- **外部サービス:** Cloudflareの最終方式/実料金/予算通知先、domain、広告の承認/契約/地域/独占/データ処理、公開サポート窓口。
