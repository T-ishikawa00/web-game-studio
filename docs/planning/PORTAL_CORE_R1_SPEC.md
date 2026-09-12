# Portal Core R1 Specification

状態: Portal Baseline R1はHuman Acceptance PASS・正式採用（2026-09-13）。前回採用したHome Visualを維持し、今回確認したPlayを含むローカルPortal本体を受入。物理スマホはNOT TESTED。一般公開・実広告・法務確定・実ゲーム完成の承認ではない。受入記録・技術QAは `docs/qa/baseline-r1/REPORT.md`。最上位Authorityはルートの `START_HERE_CODEX_WEB_GAME_STUDIO.md`。

## スタックと選択理由
Astro 7.3.2、TypeScript 6.0.3、通常のCSS、ゲームfixtureはHTML/CSS/JavaScript。Node 22.12以上（今回24.14.0）。依存バージョンは `package-lock.json` に固定。

Portalはビルド時にHTMLを出力する。React等のクライアントUIランタイムやSSR、DB、CMSを必要としない。ゲームだけiframe内で実行し、Portalと版付きプロトコルで接続する。ゲームは別パスに独立して版管理できる。Cloudflareへの将来の静的配置が可能な構成だが、今回サービス登録やadapter導入は不要。

Astroのlocale付きルートをファイルルーティング/getStaticPathsで明示生成する。日英で同じページ構造、別文言・title/description・html lang・相互hreflangを出力する。公開ドメイン未確定のため、架空のcanonical URLやsitemapは生成しない。全ページnoindex、robotsはDisallow。これらは認証ではなく、ローカルHTTPを127.0.0.1に限定することが現時点の公開境界。

公式参照（2026-09-13に確認）: [Astro i18n](https://docs.astro.build/en/guides/internationalization/)、[CloudflareのAstro静的配置手順](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)。将来公開時は最新の条件を再確認する。

## 画面・ルート
| パス | 内容 |
|---|---|
| `/` | 日本語へ誘導、日英の通常リンクも用意 |
| `/{ja,en}/` | 受入済み共通VisualのHome、公開0作品の空状態、内部接続テストへの導線 |
| `/{ja,en}/games/` | 公開作品の空状態、内部fixtureの別枠 |
| `/{ja,en}/games/connection-lab/` | 詳細、操作、対応端末、保存、関連作品領域 |
| `/{ja,en}/play/connection-lab/` | 全幅ゲーム、戻る/詳細、loading/error/retry/JS無効、保存/reset。内部QAは下部折りたたみ |
| `/{ja,en}/{about,privacy,terms,contact}/` | スタジオ仮情報、法務草案、未設定のサポート連絡先 |
| `/404.html` | 日英Homeへ戻れる404 |

18 HTMLルート（ゲームの静的fixtureファイルは別）。通常のリンクによるページ遷移を採用し、ゲーム遷移時の購読解除を単純化。言語スイッチは詳細/プレイを含む対応パスを維持する。

明示的なDesign buildのみ `/{ja,en}/design-preview/`、`design-preview/games/` と仮10作品の詳細/Play見本を追加し計62ページ。仮Artwork/metadataは通常buildから除外する。HomeのHeroとGames indexの一覧見出しを区別し、検索・初期カテゴリ・空状態は共通。404は静的配信の共通ページとして日英を併記し、個々の文言にlangを付ける。

## Registry契約
`src/data/games.ts` の `Game` にID/slug、日英タイトルと説明、cover、入力方式、desktop/mobile、orientation、buildPath、version、state、category/tags、related、save/ad方針、legal evidenceを持たせる。ページ追加はregistryから生成する。Game配列は1本のinternal fixtureだけ。3候補は別のthemes配列でありプレイ可能作品ではない。

releasedだけを公開一覧・関連作品に使う。internalはローカルレビュー用の別枠。R1のルート生成自体はinternalを含むため、将来の公開ビルドにはinternal/draft除外ゲートを追加する。noindexのまま公開してよいという意味ではない。複数のゲームがないため、関連作品は正直な空状態。related解決は合成データの単体テストで確認する。

## ゲーム接続
ビルド: `public/games/connection-lab/v0.1.0/`。プロトコル `wgs-fixture-v1`。同一origin、iframeのcontentWindow、gameId、読込ごとのgenerationを照合し、ready/input/stateを交換する。入力index/active集合を検証。8秒のready timeout、iframe error、再読み込み、意図的エラーを扱う。

同一originの自社コードを信頼する設計。第三者ゲームのセキュリティ隔離を保証しない。第三者配信、別origin版、WebGLゲーム、モバイル実機のメモリ制約は追加設計/検証が必要。

## 保存・広告・イベント
保存は `wgs:save:<gameId>`。schema/version/gameIdを検証し、未知版/破損時は元データを保持した一時モード。schema 0→1の移行例と、reset成功後の再開を用意。書込後の読戻し確認が成功した場合のみ保存成功とする。ブラウザ削除、別端末、private modeの寿命は保証しない。

広告はmock/disabledのみ。明示ボタン操作でのみ開始し、入力直後1.2秒と前回表示から60秒は見送る。値は内部QA方針で、実広告の最終頻度ではない。`sessionStorage` のゲーム非依存キーでフルページ移動後も間隔を維持。storage不調時は広告を見送り、ゲーム継続を優先。optional rewardedは完了時のみ模擬報酬、skip/Escapeでは付与しない。

内部イベントは最新50件のページメモリのみ。プロバイダー、送信、広告SDKはない。辞書は `docs/architecture/EVENT_DICTIONARY_R1.md`。

## UX・品質と限界
desktop/tablet/mobileのレスポンシブ、44px以上の主要操作、Tab/Enter/Space、focus-visible、skip link、aria-live、native dialog、reduce-motion。PortalはHuman採用済みの白系・lime、compact Hero、Artwork中心のカード、PC約5列・通常スマホ2列（受入済み実装の320px幅では可読性のため1列）を維持。ゲーム内の旧配色はfixture自身の表現として保全。外部フォント/画像は不要。fixtureはゲームの面白さ・負荷・本番広告SDK・実機互換性の証明ではない。初期QAは `docs/qa/BOOTSTRAP_QA_R1.md`、Home受入は `docs/qa/visual-r1/REPORT.md`、最新QAは `docs/qa/baseline-r1/REPORT.md` を参照する。
