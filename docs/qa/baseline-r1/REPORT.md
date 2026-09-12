# Portal Baseline R1 — Human final review

**現在の判定: Portal Baseline R1 — Human Acceptance PASS・正式採用。確認済みPlayを含むローカルPortal本体を受入。** [今回の受入範囲と残課題](#human-acceptance)を末尾に追記。以下の技術QA・Git状態・確認待ち表記は受入前の実装完了時点の記録であり、事後的に書き換えない。

2026-09-13 JST。ローカル実装・技術QA完了、最終Human確認待ち。Homeの既存Human PASSを維持し、Play受入・物理端末・公開可否へ拡大しない。

## Accepted checkpoint

開始時にmain/HEAD=`95e3360b8de68a4df89a1a8889653af8c8e41d40`、clean、origin/mainより1commit先行（behind 0）を確認。Private repository確認、既存型・単体・build・route QA、whole project/full index/local historyのGitleaks PASS後、このcommitだけを通常pushした。

push直後のlocal HEAD・origin/main・upstream・直接確認したremote mainは上記SHAで一致し、worktreeはclean。証跡は [accepted-checkpoint.json](accepted-checkpoint.json)。それ以降のremote操作、新しいcommit、stage、pushは行っていない。現在の改修はすべてローカル未commit。

## Human review — 開くURLと実装画像

Homeの仮10作品はDesign Preview専用。Playの以下3画像は実際に操作できる内部接続fixtureであり、Game 001ではない。

| 画面 | 実際のローカルURL | 実ブラウザ画像 |
|---|---|---|
| 日本語PC Home | [開く](http://127.0.0.1:4323/ja/design-preview/) | [1440px](screens/home-ja-1440.png) |
| 英語PC Home | [Open](http://127.0.0.1:4323/en/design-preview/) | [1672px](screens/home-en-1672.png) |
| 日本語スマホHome | [開く](http://127.0.0.1:4323/ja/design-preview/) | [390px](screens/home-ja-390.png) |
| 日本語PC Play | [開く](http://127.0.0.1:4323/ja/play/connection-lab/) | [1440px](screens/play-ja-1440.png) |
| 英語PC Play | [Open](http://127.0.0.1:4323/en/play/connection-lab/) | [1440px](screens/fixture-en-1440.png) |
| 日本語スマホPlay | [開く](http://127.0.0.1:4323/ja/play/connection-lab/) | [390px](screens/fixture-ja-390.png) |

追加: [英語スマホHome画像](screens/home-en-390.png)、[見本Games index](http://127.0.0.1:4323/ja/design-preview/games/)、[詳細見本](http://127.0.0.1:4323/ja/design-preview/games/clockwork-repair-workshop/)、[ゲーム未制作のPlay見本](http://127.0.0.1:4323/ja/design-preview/play/larva-evolution-lab/)。通常データは [日本語Home](http://127.0.0.1:4322/ja/) / [English Home](http://127.0.0.1:4322/en/)（公開0件）。

ローカルpreviewは127.0.0.1限定。4322と4323の保存は別origin。同一port内の日英は共有する。再起動手順はREADME参照。これはdeployではない。

## 変更とVisual自己レビュー

- HomeのHero/Card/Grid/global paletteと採用画像・Artwork原本を保全。Games indexだけに一覧見出しを設け、Homeとナビのpage判定を区別した。見本にも独立したindexを追加。
- Playは1列・全幅のゲーム領域、短いタイトル帯、明確な一覧へ戻る/詳細リンク。内部QAはゲーム下の閉じたdetailsに分離。保存/resetはゲーム直下に維持。モック広告・意図的失敗・イベントログはdetailsを開くと利用可能。
- 実fixtureのJS無効時はLoadingを隠して説明と戻るリンクをステージ内に表示。既存error/retryは維持。画像失敗後に正常な画像へ切り替えるとfallback状態を解除。
- 関連作品0件を正直に表示。404は日英併記の共通静的ページ。About/Privacy/Terms/Contactは共通Visualと既存の未確定情報・草案表示を維持。
- Registry、runtime、保存/migration、広告adapter、local events、fixture本体、Security設定、依存関係を変更していない。公開作品0、内部fixture1、Design見本10。実ゲーム用の汎用runtime拡張は今回制作していない。

実装画像を目視し、ゲーム領域がPCで全幅、スマホでも主操作が初期viewport内に収まること、QAが閉じた状態で下部に分離されることを確認。Hero・カード・グリッド・明るい白/limeの方向は採用状態を維持。Homeの比較数値は [home-comparison.json](home-comparison.json) に保存。画像デコードを待って撮影し、過去の受入画像は変更しない。

最終3画像は同じ寸法で、画像要素の矩形外の変更pixel数はいずれも0。画像内にはブラウザ描画の残差があるため、最終スクリーンショットの完全一致とは記録しない。Hero/Card/global CSSと元ArtworkにGit差分はなく、目視でも構図・配色・文字・配置の変更はない。

## 最新QA

| 検査 | 結果 | 根拠・範囲 |
|---|---|---|
| Type check | PASS | 34 files、0 errors / warnings / hints |
| Unit tests | PASS | 12/12。保存・旧schema migration・reset失敗・広告圧力・registry等 |
| Production / design build | PASS | 通常18ページ、明示Design62ページ |
| HTTP route tests | PASS | 3/3。通常日英16画面、root、日英unknown URLの404、local links/assets |
| Design isolation | PASS | 2/2。通常distに仮Artwork/metadata/routeなし、Designに10見本、偽runtimeなし |
| Browser interaction | PASS | Edge/Chromium 153.0.4234.32、19/19項目。[生結果](browser-results.json) |
| Responsive / JA / EN | PASS | 日英24画面×320/390/768/1024/1440/1672px = 144組。横溢れ0、画像失敗0、h1各1 |
| Search/filter/navigation | PASS | 日英名/説明、category併用、0件/解除、10/2/0見本、別タブ、言語切替と安全な条件保持、通常公開0件、Home/index区別 |
| Save/reset/input | PASS | Pointer/Enter/Space、reload/言語で復元、reset取消/Escape/確認、別save保全、未知/破損save保持、storage拒否注入で失敗表示 |
| Mock ads | PASS | pause/resume、Escape/skip/完了、報酬1回、disabled、言語をまたぐcooldown、focus復帰 |
| Loading/error/recovery | PASS | ready timeout 8秒→error→retry、故意失敗、日英JS無効、画像fallback→正常画像復旧 |
| Mobile input | PASS（emulation） | touch tap、390→844回転相当resize、iframeからTab退出、ゲーム主操作の初期表示 |
| Reflow/accessibility | PASS（限定） | 200%相当viewport/root文字拡大、主要44px操作、代表色contrast、reduced motion。包括監査ではない |
| Console/network | PASS | pageerror 0、外部origin要求0。実外部サービスへの接続なし |
| Secret scan | PASS | Gitleaks 8.30.1 whole project/full index。候補0、hook `.githooks`、既存Securityルールを保全 |
| Diff/保全範囲 | PASS | `git diff --check`、新規text check、[Git証跡](git-state.json)のprotected paths不変 |
| 物理スマホ操作 | NOT TESTED | エミュレーションを実機確認と扱わない |
| 他browser engine / 実広告 / 本番サービス | NOT TESTED | 今回Edge Chromiumで確認。本番接続なし |
| Play Human受入 / 公開可否 | PENDING | 今回の最終Human判断待ち。既存Home受入から推定しない |

途中の回帰で見つかったPlayの非表示重複戻りリンクは除去し、19項目を再実行してPASS。撮影はfont/image decodeを待つよう改善した。アプリの保存・広告ロジックを変更してテストを通したものではない。

## Git / 停止境界

branch main。local HEAD / origin/main / upstreamはAccepted SHAのまま（終了時はlocal refsのみ確認、STEP 0後のremote再照会なし）。worktreeは今回のソース・QA・文書の未commit変更あり、index差分なし、stashなし。詳細は [git-state.json](git-state.json)。

今回追加のcommit/push、deploy、Cloudflare本番接続、domain購入、実広告、Analytics本番接続、外部契約、Game 001制作は行わず、Human最終確認待ちで停止する。法務文書の実情報・権利確認・公開ゲートは別途必要。

<a id="human-acceptance"></a>
## Human Acceptance — 2026-09-13

Humanの明示判断: 「ゲーム画面もこれでいい。Portalとして完成でOK」。この発言を根拠に、Portal Baseline R1をHuman Acceptance PASS・正式採用として固定する。自動QAから推定した受入ではない。

| 対象 | 判定・境界 |
|---|---|
| 前回採用したHome Visual | 維持・正式採用。配色、Hero、カード、グリッド、全体の雰囲気を保全 |
| 今回確認したPlayを含むローカルPortal本体 | Human Acceptance PASS。追加の再デザイン・機能追加・作り直しは不要 |
| 物理スマホの実機操作 | NOT TESTEDのまま。画像やemulation、今回の受入から推定しない |
| 一般公開・実広告・法務確定・実ゲーム完成 | 未承認。Portalの受入とは別ゲート |
| 作品数と隔離 | 公開ゲーム0本、内部接続fixture1本、仮10作品はDesign Preview専用を維持 |

### 採用状態の保存とQA継承

- 保存開始時: CWD `C:\projects\Web Game Studio`、main、HEAD `95e3360b8de68a4df89a1a8889653af8c8e41d40`。remote mainも同じSHA。実装完了時の30対象ファイルの差分のみ存在し、index差分なし。
- 今回の追加編集は本記録、従来Visual採用記録、README、Portal仕様の採用状態、repo-local AGENTSのBaseline参照のみ。アプリ・CSS・テスト・画像に追加変更なし。直近の型・単体12/12・build・route 3/3・出力分離2/2・browser 19/19・144画面幅組合せの技術QAを継承し、全ブラウザQAは形式的に再実行しない。
- commit対象はBaseline実装・そのQA証跡・受入記録の32ファイル。原Authority、保存/runtime/広告/event、Securityルール・例外、依存関係、仮作品データ、原Artworkを変更しない。cache/build/tempを含めない。
- originはPrivate `T-ishikawa00/web-game-studio`。保存前のGitHub read-only確認でPages未設定、workflow 0、有効webhook 0、deployment履歴0。ローカルに自動deploy設定なし。push直前にもremote mainの予期しない更新を確認する。
- 既存hookを維持し、whole project/full indexのSecret ScanとDiff確認後に通常commit、local history scan等の確認後に通常fast-forward pushする。検出例外追加・hook迂回・force push・履歴書換えは行わない。
- 今回許可された外部変更はこのPrivate RepoへのBaseline commitのpushのみ。実際のcommit/parent SHA、remoteとの一致、最終worktreeは保存後の完了報告で示す。既存 `git-state.json` は前工程のsnapshotであり、保存後の状態とは区別する。

残課題は、物理スマホ実機確認、公開・広告・法務・素材権利の各判断、最初の実ゲームのテーマ選択と制作工程。今回これらを開始せず停止する。
