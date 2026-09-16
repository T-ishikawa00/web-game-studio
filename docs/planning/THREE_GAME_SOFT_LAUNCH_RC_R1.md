# Three-game Soft Launch — Local Release Candidate R1

作成日：2026-09-16
目的：採用済み3作品を、実際の公開導線で遊べるローカル公開候補版へ統合する。
対象：①ゲーム統合 ②3作品用Portal ③技術QAとHuman確認準備 ④公開対象の権利・運営ページ準備。
**本書は公開・契約・法務最終承認ではない。実装と必要な確認を一括で終え、Humanへ返す。**

## 1. 今回の差分と境界

- 新方針は「3作品でSoft Launchを目指す」。旧約10本は初回公開の必須条件から外す。実際の公開在庫はdeploy承認・実施まで0本。
- repo-local AGENTSとPRODUCTION_CURRENTから必要資料へ進む。基準確認時のremote mainは `44ce3ca2e079aa64733be7da3435726e400a54c6`。開始時の実状態を確認し、無関係な未tracked成果（報告上13件）も保全する。相違を巻戻しで解消しない。
- 許可する変更：公開候補用registry/ルート/Play接続/ビルド、3作品に合わせたPortalの局所調整、素材の公開用出力、必要なテストと運営・権利文書。従来の「通常Portalへ統合しない」制約は、このローカル候補版の範囲だけ更新する。
- 維持：全57問（Lightwork18／Two Ways21／Tiny18）のルール・問題ID・導入順、保存と入力、採用済みArt/Motion/SFX、日英、通常/9:16/16:9。Tinyだけ採用BGM B（D1 Rhythm Refine・80 BPM）、他2作品はBGMなし。音量・ミュートのユーザー設定を尊重する。
- 不要：新作、追加面、再Polish、エンジン移行、巨大SDK/CMS/アカウント/クラウド保存。本バッチの実広告・外部計測は無効。既存の必要なイベント接続は維持するが、収集サービスを新設しない。
- 旧Baseline・比較証拠を消さない。既存Securityと2件の限定判定を維持。秘密鍵は真の秘密としてGit・出力・Reviewへ入れない。
- stage/commit/push、deploy、LAN再公開、証明書/Firewall変更、購入/契約、外部APIや計測の接続・送信は禁止。公開済み一次資料のread-only調査は可。私有コード・素材・個人情報を外部へ送信しない。主担当/モデル運用はAGENTSに従う。

## 2. 統合設計：旧成果を保存し、公開候補を別に再現する

### 2.1 registryと起動版

既存registryをmetadataの正本として拡張し、同じ情報を別カタログへ手作業で複製しない。candidate表示と実際の公開状態を分離し、3本を表示するために未公開作品をreleasedと偽記録しない。

公開候補の導線は既存形式を使う：`/{ja,en}/` → `games/<slug>/` → `play/<slug>/`。ID/slugは原則維持。関連作品は自分以外の実2作品。公開候補profileが含む作品を、固定の3 IDで明示選択する。

通常の「遊ぶ」だけで、以下の採用内容が起動すること：

| ID | 採用する内容 |
|---|---|
| `tiny-delivery` | Craft R2：Accepted Motion/SFX＋BGM B。証拠側の`music=D1`はBを指す点に注意 |
| `light-garden` | Lightwork R1：LG-C＋Object Design＋Art Polish。BGMなし |
| `two-ways-home` | Two Ways R1：TW-C。BGMなし |

`?tw=TW-C`等を利用者へ要求しない。A/B比較selectorや候補曲は公開候補bundleに入れず、旧URLパラメーターで未採用版へ切り替わらないこと。通常設定・ヘルプ・音量・操作代替・表示切替まで削らない。

### 2.2 Play接続と保存

**registryへ追加するだけでは完了しない。** 確認版の`src/scripts/play-shell.ts`はConnection Labの9パネル状態と`wgs-fixture-v1`を扱う。一方、実3作品の`src/prototypes/shell.ts`/`protocol.ts`/`state.ts`は、盤面進行と`wgs-prototype-v1`を扱う。

公開用Playは実ゲーム側の検証・保存契約を再利用する薄い接続にする。内部fixtureへゲームの進行を押し込まない。名前にprototypeとあるだけで正常な契約を改名する必要はない。少数の明示的なentry/profile/adaptorで解決し、ゲームルールを三重実装しない。

origin・frame source・gameId・読込generation・message形状の照合、ready timeout、再読込、破損データ保全、書込結果の確認を維持。内部QAボタンやログ表示を外す際に、必須DOMがなくなって起動不能になる依存も解消する。

進行と音設定は作品別、進行は言語非依存。保存形式のversionと配布versionを混同しない。確認版state.tsの保存envelopeは`0.1.0`を検査するため、見栄えだけのversion変更で旧保存を無効化しない。同じoriginでの互換性を検証し、別port/本番domainへの自動移行は約束しない。Tinyに1手Undoを新設しない。

### 2.3 出力・再現性

既存名との整合を優先し、`build:rc`と`preview:rc`相当の少数のコマンドを用意する。既存開発profileを保持し、RC用出力へ必要ファイルだけを明示生成する。Repo/public/cacheを無条件に丸ごとコピーしない。

旧46/48/44ファイル等の凍結manifestは不変。共有Portalの変更で旧再現に影響する場合、固定checkpointの入力から隔離再現する等で旧版を保存できる。旧manifestの書換えで差分を隠さない。

新RCには、起点commit・未commit差分の識別・採用profile・配布ファイルとdigest・容量・検証結果を持つ別manifestを残す。URL変更や比較機能の除去によるbyte差は、理由と同等性を検証する。採用原本の意味を変えず、ビルド接続だけ最小変更すること。

公開候補から除くもの：Connection Lab、Design Preview10件、prototype/review画面、比較曲/動画、QA解答・内部solver/test harness、.tmp/.cacheの無関係物、証明書と秘密鍵、内部文書、不要なsource map/絶対path。必要な盤面データ・ルール・通常のヒントは含める。ブラウザ用コードを秘密化できるとは主張しない。

公開候補のstatic serverはRC出力だけをserveし、範囲外URLや内部パスは404にする。noindexはアクセス制御の代用にしない。現バッチはloopback限定・noindexを維持し、本番SEO切替は後の公開承認へ分ける。

## 3. 3作品用Portal：新デザインではなく本物への置換

- 採用済みPortalの配色・タイポグラフィ・カードの文法を維持する。3本用の列数/余白/短いHero文言の調整は可。空き枠・水増し・架空の人気/星/人数・仮作品を公開候補へ残さない。
- Homeは3作品を見つけやすくし、一覧・詳細・Play・別作品への回遊を完結させる。不要なカテゴリや空のランキングを足さない。
- 各cover/OG画像は実際の採用Art/盤面から生成する。旧Prototype/R5だけの古い絵や、見本の生成Artworkを混ぜない。画像のために未取得素材/APIを追加しない。
- 日英のタイトル・一文説明・操作/目的・対応端末・保存の注意を作品ごとに正しく用意する。fixtureのHow-toを流用しない。ゲーム内の常設文章を増やす依頼ではない。
- サイト名/正式タイトル/domain/公開連絡先は中央の設定へ集約。未決項目は既存仮名と明示的な未設定値でローカル実装を進め、架空の法人名・住所・メールを埋めない。承認前の個人情報をGit履歴等から流用しない。
- 日英切替は同じ作品/ページを維持。入口`/`は英語利用者を強制的に日本語へ送らない単純な導線へ調整可。URLは明示localeを基準にする。
- 広告枠・模擬広告UIは公開候補では出さない。広告/計測の後付けは可能な状態に留め、今はSDK・cookieバナー・会員機能を先回りで作らない。

## 4. 公開対象の権利・運営準備

既存の台帳/文書を更新し、同じ履歴を新しい管理システムへ複製しない。

### 4.1 素材・依存・名称

実際のRC出力から、コード・Art・cover・採用BGM/SFX・font・配布OSSを棚卸しする。元データ/生成方法/入力参照/利用条件/改変/必要な表示/ゲームと実況動画の利用範囲を、確認できる証拠に結び付ける。過去の「音なし」「5面のみ」等は履歴と現状を区別する。

packageのlicense名だけで適合を断言せず、配布される依存のLICENSE/NOTICE義務を確認・同梱する。AI支援制作やローカル合成を、独占的著作権・非侵害・配信自由の保証にしない。Suno等の未使用サービスを利用済みと書かない。

現行の仮ゲーム名について実際に参照可能な検索/公式商標DBで予備確認し、対象国・表記/称呼・日付・確認範囲・懸念を記録。アクセス不能は未確認とする。サイトの正式名称未定で他の作業を止めないが、名前の最終確認は公開前に残す。既存ゲームの具体表現・盤面・素材に関する懸念があれば対象を特定する。調査結果なしを法的安全の保証にしない。

### 4.2 運営ページとデータ実態

About / Terms / Privacy / Contact / Creditsを日英で整備する。実況/動画利用方針は確認済み素材の範囲で草案化し、未確認の権利を自動許諾しない。

Privacyの根拠として、実装上のlocalStorage/sessionStorage・音/進行/表示設定・イベント・外部通信を表で整理する。用途、保存先、第三者への送信の有無、寿命/削除方法を記載し、ゲームresetで音設定まで消える等の不正確な説明をしない。

本番hosting/access log、計測provider、問い合わせ処理/保持期間は未選定なら未確定。外部SDKが今ないことから「個人情報を一切扱わない」「GDPR/COPPA完全準拠」と書かない。対象年齢はHuman決定と実際の表現/収集内容の両方を確認し、規約の13歳以上表記だけで解決しない。

問合せは公開連絡先の設定を待てる静的導線でよい。動かない送信フォームや「送信成功」を作らない。秘密値・個人住所等を推測して表示しない。免責文を無制限な免責保証として記載しない。

一次資料は作業に必要な論点だけ確認し、適用法域/時点/根拠/未確認を残す。日本、米国、EU/英国を一つの共通ルールと見なさない。判断が必要な点は具体的に切り出し、専門レビュー候補にする。これは法的助言・最終クリアランスではない。

### 4.3 未決事項は公開を止めるが、ローカル実装は止めない

公開準備チェックを小さいスクリプト/既存QAに設ける。未設定の運営情報・未解決権利/名称・本番データ構成・必要なHuman受入があれば、具体的なblockerを出す。RC previewは動いてよいが、全体をrelease-readyと書かない。

未確定値をサンプルで埋めて検査を通さない。RC内の法務草案には未確定表示を残す。本番用設定検査で草案/placeholderが残る場合は失敗させる。検査PASS自体もdeploy権限の代わりではない。

Humanへの確認は最後に原則3群へまとめる：
1. ブランド：正式サイト名/domainとゲーム名の承認。
2. 運営：公開する運営者表記・連絡先と問合せ運用。
3. 対象とデータ：対象市場/年齢、本番hosting/log/計測と保持・同意方針。
機微情報は公開範囲が決まるまでRepoへ記入を求めない。費用が生じる設定は後段の別承認。

## 5. QAと一括作業の終点

内部順序は、現物確認 → 出力/接続方式 → 1作品で公開導線検証 → 残り2作品 → Portal/運営ページ → 回帰・自己修正 → Reviewにする。途中で色・ページ・作品ごとの承認待ちを挟まない。未知の重要な安全条件は既存policyどおり停止/分離する。

最低限の新規検証：
- 候補3 IDだけの一覧/詳細/Play/関連作品・JA/EN・直リンク・戻る/再訪・404。素のPlay URLで採用版。fixture説明/比較selectorがない。
- RCの実UIで全57問の解答再生。代表面で凍結版とのArt/Motion/SFX/BGM同等性を確認。機械的完走をHuman面白さPASSと呼ばない。
- 同一originで3作品を行き来し、保存/音設定の衝突なし。既存同origin保存・破損/未知version・write失敗・reset・言語切替・新規状態を確認。初期化で原データを隠して直さない。
- pause/resume、pagehide/復帰、再ロード、音unlock/mute/gain、連打、表示切替、reduced motion、keyboard/タッチ代替。退出した作品の音・timer・listenerを残さない。
- 型/関連unit/route/build、配布allowlist・秘密情報・内部path/QAの漏出検査、外部通信なし、個々/全体の圧縮転送量とasset数。性能は測定環境付きで報告。
- 未決の運営/権利条件で公開準備検査が実際にblockすること。接続可能なボタンと実サービスなしの草案を混同しない。
- PC/スマホ幅/3表示の確認。実機はエミュレーションと別。Tinyの過去限定実機PASSは保全するが、新RC実機を自動PASSにしない。Lightwork/Two Waysの物理確認と全編Humanは待ちとして準備。外部初見はDEFERRED / NOT TESTED。

既存の未変更部分は有効な証拠を再利用。原因不明の失敗がない限り全QAや大量動画を何周も再生成しない。公開配布物ではなく内部Review側に必要な証拠を保存する。

## 6. 成果物・報告

1. 一つのローカルRC Portal：日英Homeから3作品を普通に遊び、別作品へ回遊できる。
2. 再現コマンド、配布manifest、公開準備チェック、出力分離/採用同等性の根拠。
3. 更新した権利/依存台帳、日英運営ページ、実データ取扱表、未解決の公開blocker。
4. 一つのReview Pack：代表PC/スマホ画面、必要な短い操作証拠、実機/全編確認票、残る判断。LANは起動しない。

loopbackの実応答を確認し、RC試遊URL・Review URL・再起動/停止コマンドをプレーンテキストでも報告する。Markdownカードだけに依存しない。ホストはRepo rootをserveしない。

終了報告は「実装/技術QA」「Human受入待ち」「権利/運営の未確定」「本番配信/計測/広告は未着手」を別々に記す。既存の未trackedと今回の差分を分ける。stage/commit/push/deployは0で停止する。

## 必要時の一次参照（2026-09-16確認）

Repoの根拠：`src/scripts/play-shell.ts`、`src/prototypes/{shell,protocol,state}.ts`、`scripts/{craft-r2,twoways}-build.mjs`、`src/pages/[locale]/[...path].astro`。本書は確認したremote構成を前提とするため最新ローカルで照合する。

- 日本の個人情報：PPC通則編（目的の通知/公表等。実処理に合わせて確認） https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/
- 英国の保存/アクセス：ICO。例外は目的と条件で判定し、localStorage等を一律免除としない。 https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-pecr-rules/
- 同例外の条件： https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/
- 子ども向け判断：FTC COPPA FAQ。絵や音、対象とする利用者等の総合要素を確認。 https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions
- 名称の予備確認：INPIT https://faq.inpit.go.jp/FAQ/2024/03/000288.html
- WIPO：対象市場の国/地域登録簿も確認。 https://www.wipo.int/en/web/madrid-system/how_to/search/index
- noindexは検索制御：Google https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
