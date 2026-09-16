# Nolippa / Hakorilo — latest local RC naming review

2026-09-16。**名称のHuman選択・ローカル反映・対象技術QA完了。公開準備はBLOCKED、公開在庫0本。** 主担当/統合/独立read-only reviewerの実モデル `gpt-6-astra`。

## 試遊

- [日本語Portal](http://127.0.0.1:4350/ja/) / [English Portal](http://127.0.0.1:4350/en/)
- [Hakorilo 日本語](http://127.0.0.1:4350/ja/play/tiny-delivery/) / [Hakorilo English](http://127.0.0.1:4350/en/play/tiny-delivery/)
- [Lightwork Garden](http://127.0.0.1:4350/ja/play/light-garden/) / [Two Ways Home](http://127.0.0.1:4350/ja/play/two-ways-home/)
- [最新統合Review](http://127.0.0.1:4351/naming-r1/REVIEW.html)。4351ルートの[初回RC Review](../REPORT.md)は改名前の履歴として変更せず保全。

既存loopbackサーバー4350 / 4351を使用。停止・再起動・LAN公開なし。再現はrepoで `npm run build:rc`、必要時だけ `npm run preview:rc` / `npm run review:rc`。既存プロセスが動いている間は二重起動不要。現行のmanifest・配布audit・readinessは本フォルダへ出力する。

## 反映内容

1. Portal **Nolippa / ノリッパ**、制作元 **Nolippa Studio**。Header・Footer・言語入口・404・日英運営ページ・title/description/OGを整合。制作元ブランドは法人名/公開運営者ではない旨をAboutに明記。
2. 英語名 **Hakorilo**、読み **ハコリロ**。日本語 **ちいさな配送パズル**を削らず、Human許可済みの **Hakorilo — ちいさな配送パズル** を併記。カード・詳細・Play・metadata・画像リンク・iframeのアクセシブル名へ反映。他2作品の名称は維持。
3. ブランド正本は `src/rc/site.json`。現行作品名は `src/data/game-identities.json` を `src/data/games.ts` のregistryへ明示合成。旧prototype catalogを無差別置換せず、Baseline再現に使う旧タイトルを保全。
4. URLは既存 `tiny-delivery` のまま。日英の旧RC詳細/Playリンクが同じURLで新名称を表示。内部ID、save schema/version、音/musicキー、protocol、build pathは不変。保存を移行/消去しない。旧形式の保存検証は隔離したテストbrowserで行い、Humanのブラウザデータには触れていない。
5. RCのW文字だけをNへ小さく変更。旧Portalの色・形・CSS/布局は保持。旧favicon・Baseline・実画面cover・比較画像/動画はbyte不変。新ロゴ案の量産なし。
6. `nolippa.com`は設定内の照会候補のみ。domain/operator/contact/age等はnullを維持。canonical・メール・外部画像/計測・送信フォームを配布しない。

## 技術結果

| 確認 | 今回の結果 / 証拠 |
|---|---|
| 型 / RCビルド | PASS。`npm run check`: 0 errors / 0 warnings / 既存unused-import hints 3。`npm run build:rc`: 28ページ / 48配布ファイル |
| 日英名称・リンク・metadata・accessibility | PASS。[naming-results](naming-results.json) 4/4群。日英26ページ、root/404、全既存HTML URLと内部リンク。旧表示名の残存、未取得domain/canonical/mailtoがないことを検証 |
| 幅 / 起動 | PASS。JA/EN × 320/390/1440px。Home・Hakorilo詳細・3作品Playの文字幅/横overflowと起動。Edge headlessでのviewport試験であり実機受入ではない |
| 保存 / 音 | PASS。既存形式schema1/version0.1.0をseedし、3作品の読込、Hakorilo実操作→保存→reload→日英切替、既存mute/BGM off/gain保持、他2作品の進行不変、破損原データ保全を確認。新名称のsaveキーを作らない |
| 57問 / Art / Motion / 音 / 旧証拠保全 | PASS。[preservation](preservation.json)：14配布payload（全game JS/CSS/WAV、shell/portal JS、covers、Portal CSS）がbyte一致。旧QA全体・prototype source・旧publicを含む1599ファイルがbyte一致。18/21/18=57問 |
| 採用版一致 | PASS。[adoption-equivalence](adoption-equivalence.json)：RC接続前の3ゲームentryを旧凍結JSと再照合。名称変更後も固定採用profileを使用 |
| 配布隔離 / Security | PASS（今回RC配布）。[distribution-audit](distribution-audit.json)：48ファイルallowlist、内部/鍵等11 URLが404、Gitleaks8.30.1で0候補。browser外部通信試行0 |
| 公開gate | [release-readiness](release-readiness.json)：18 blocker、意図どおりexit1。既存unitのplaceholder/欠落/approval拒否1/1 PASS。名称選択を権利承認へ自動昇格させない |
| Git・範囲 | [final-verification](final-verification.json)。HEAD/index不変、差分check。旧作業を消さず、本件の選択的な変更のみ |

既存の213 unit、全57問UI replay、3作品音/lifecycle、代表DOM/PCM比較、凍結build再現は[改名前の技術結果](../technical-results.json)から**再利用**。今回はruntime/音源のbyte不変を確認したため、無関係な全編replay・比較動画・大量QAを再生成していない。

既存Security全project raw **FAIL（2件）**は過去実行のまま保持。SHAは限定 **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**、TLS鍵は別の **TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION**。今回全project再scanは実施しておらず、RC配布scanだけを新規実行。既知2件をPASSへ書換えず、新しい候補への承認拡張なし。鍵の読取/複製/Git収載/配布なし。

独立read-only reviewはstable identity・運営情報・配布名称を確認。日本語併記の範囲について照会があり、Human原文の「作品詳細等では『Hakorilo — ちいさな配送パズル』と併記可」を根拠としてprimaryが整合を確認。未解決の技術指摘なし。

## 公開blocker / Human確認

- **名称選択は完了。権利確認は未完了。** ジョルダンは[2014-04-30の一次資料](https://www.jorudan.co.jp/company/data/press/2014/20140430_norippa.html)で「乗換案内norippa（のりっぱ）」を発表していたことを記録。現在の提供、登録商標、商品役務・地域・権利範囲は未確認。Nolippaの使用不可/安全いずれも断定しない。Hakoriloおよび他2作品の最終商標/権利確認も未完了。
- domain取得/利用、公開運営者、連絡先/問い合わせ処理、対象市場・年齢、hosting/log/保持/同意の決定。`nolippa.com`は未照会の候補で、取得済みではない。
- 運営/法務草案、素材・名称・動画/配信/商用の権利範囲の最終確認、明示公開承認。
- RCの実機・聴感・初見理解・全57問Human全編受入は今回実施せず、既存の端末限定評価を一般化しない。名前の見え方・読みやすさは最新ReviewでHuman確認可能だが、自動的なHuman PASSにはしない。

stage / commit / push / deploy / LAN再公開 / 購入 / 契約 / 外部登録・問い合わせ送信 / 外部API・計測接続は **0**。ここで停止。

## 対象QAの再現

```powershell
npm run build:rc
npm run check
node --import tsx tests/rc-naming.mjs
node scripts/rc-audit.mjs
node --import tsx --test tests/unit/rc-readiness.test.ts
npm run check:release
```

公開checkerだけexit1が期待値。テストは127.0.0.1:4350の起動済みRCを使う。元の証拠を上書きする旧 `rc-review.mjs` は今回実行していない。
