# GAME005 Hillside Representative Slice R1 — interrupted candidate

2026-09-23。**IMPLEMENTATION INCOMPLETE / HUMAN_SECURITY_DISPOSITION_PENDING**。

## Human direction

HumanはC1 Compact「一つの島を結ぶ」をv1採用方向とした。最終Scope PASSではない。仮Scopeは全3地区（初期村・暮らしの入り江・見晴らしの丘）、3住民、木材／資金、個別割当なし、offlineなし、深い交易なし。本編15〜30分は仮説。代表Sliceで新しい判断と島全体の完成感を確かめるまでFull Productionへ進まない。

最新Humanの眺望軸は **海／港** と **育てた村全体**。旧研究の「開く／木立を残す」を選択名として継承しない。Accepted source／saveを変更しない隔離rootは `game005-island/hillside-r1/`。

## 途中実装

- 接続：村側／入り江側の別の登り道。既存の橋を使用し、新しい島・海上歩行・新橋を追加しない。
- 眺望：海港側／村側の異なる停止地点・向き・縁台構成。2軸4構成。
- 既存島内の限定した高さ関数を地形・道・住民の足元・配置markerで共有。平面fallbackより地形raycastを優先する。
- 新投資は丘道（木材12／資金6／work20）と見晴らし（木材8／資金6／work18）。その他のAccepted経済を変更しない。
- 自動idleの巡回に丘と旧広場・村を含める。海際／木陰の過去選択を停止地点へ反映する。毎回全員を丘へ送らず、旧村の短い滞在も交える。
- 保存は専用key `tinlumo:game005:island:hillside:r1`、schema4。MVP／Expansionの保存読込み・移行なし。
- Galleryは同じGold CSSに2候補を追加。完成時は短いGoal／toast・既存完成音・短い視覚feedback。強制Resultなし。
- 原baselineの植生は変更せず、候補の丘周辺のみ樹木2本・植栽床1つの位置を調整。道／眺望を隠す問題への対応。Craft受入済みとは扱わない。
- 接続・眺望の完成後再選択はまだ実装していない。既存市場・広場の移設は候補にも残る。Full Scopeの有限調整仕様は未確定。

## Securityによる停止

稼働中の今回QA browser profileを含めてGitleaks8.30.1で検査したところ、**新規11候補／generic-api-key／3files**を検出した。値・断片を表示／記録せず、[file/type/action記録](../../game005-island/hillside-r1/review/security-active-browser.json)を保全。配布distは0件だったが、候補全体はraw **FAIL**。技術的なcredential／non-credential判定は未実施。

Human指示「新規candidateが出れば従来ルールで停止」により、実装・通常試遊を停止した。A/B自動入力の今回Node processだけを停止し、手動のprofile削除、rotation、allowlist変更、scanner緩和はしていない。元profileの将来の保持はbrowser lifecycleに依存し、永続保全を保証しない。source fileの秘密値を別artifactへ複製していない。

S01〜S03の過去承認を転用しない。S04〜S05はhistorical UNKNOWN／UNRESOLVED。前checkpoint-only risk acceptanceは使用済みであり今回に転用しない。

## 検証・残件

停止までにstrict typecheck、candidate build、31 unit／simulation testsがPASS。8組合せ（接続×眺望×既存広場）で実進行・保存roundtrip・高度到達・旧地区訪問・idle→仕事→idleを確認した。通常試遊A/Bは序盤で中断し、丘までの通常入力完走・等速完成動画・Human比較は未完了。technical seeded画像は描画調整用だけで、Human評価の証拠に使わない。

残件：通常入力の代表2構成完走、残り2構成のbrowser成立、Before／工事／選択／完成／利用／同camera最終景観、実際の足元／段差／hit testing、JA/EN・mobile・Gallery・保存失敗系、代表性能／長session、独立Craft／行動review。候補内にコピーした既存browser／performance／review scaffoldには未適応部分があり、再開時に原Expansionを指すpathを確認してから使用すること。

Accepted MVP133入力／22派生、Expansion102入力＋4依存／12派生は停止後も隔離再現PASS。詳細は[途中QA／保全](../../game005-island/hillside-r1/review/REPORT.md)。Physical iPhone／Safari **NOT TESTED**。

stage／commit／push／deploy／public registry／Cloudflare／Ads／App Store／外部設定変更0。loopback4396候補previewは起動済みだが、完成Reviewの公開状態ではない。既存previewは停止していない。

**NOT READY / HUMAN_SECURITY_DISPOSITION_PENDING**。要求された `GAME005_HILLSIDE_REPRESENTATIVE_SLICE_R1_READY / HUMAN_FINAL_SCOPE_GATE_PENDING` は未達。Human Security disposition前に続きを自動実行せず、Full Productionへも進まない。
