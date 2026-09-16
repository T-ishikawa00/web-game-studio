# Nolippa / Hakorilo — Human naming decision and local RC delta

> **2026-09-16 最新Human判断：Nolippa / Nolippa Studioの採用は撤回済み。** Humanは追加調査で営業中の既存事業NORIPPA（ノリッパ）を確認したと報告。PortalはTinlumo / ティンルモ、制作元表記はTinlumo Studioへ変更。Hakorilo / ハコリロ・日本語名は維持。[撤回と最新判断](TINLUMO_BRAND_R2.md)。以下は当時の選択記録として削除せず保持し、現在の採用を示さない。

2026-09-16。最新Human依頼の名称選択とローカル反映の記録。商標確認完了・実公開・購入・契約・外部への登録/問い合わせは承認されていない。

| 対象 | 選択 |
|---|---|
| Portal | **Nolippa** / **ノリッパ** |
| 制作元ブランド | **Nolippa Studio**。法人名・公開運営者の確定ではない |
| 配送ゲーム英語名 | **Hakorilo** / **ハコリロ** |
| 配送ゲーム日本語名 | **ちいさな配送パズル**を保持。Humanが許可した **Hakorilo — ちいさな配送パズル** の併記をRCの日英対応表示に使用 |
| 他2作品 | ひかりの仕掛け庭 / Lightwork Garden、ふたりの帰り道 / Two Ways Home を保持 |

## 正本と境界

- Portalの正本：`src/rc/site.json`。作品の現行名称正本：`src/data/game-identities.json` を `src/data/games.ts` のregistryへ明示適用。凍結prototype catalogを変更しない。
- Header / Footer / cards / detail / Play / title / description / OG / iframeのアクセシブル名を正本から生成。日英の運営草案にはサービス名だけを反映し、Nolippa Studioを法人・運営者として確定しない。
- 内部ID `tiny-delivery`、save version `0.1.0`、`wgs:save:tiny-delivery`、`wgs:audio:tiny-delivery`、`wgs:music-pilot:tiny-delivery`、`wgs-prototype-v1` は不変。
- 公開slug変更は許容されたが必須ではないため、既存RCリンク継続を優先して `tiny-delivery` を保持。旧日英の詳細/Playは同じURLでHakoriloを表示。新slugへのredirectや保存migrationは不要、実施なし。同一originで継続し、別port/domainへの移行を保証しない。
- W文字だけをRC専用N文字へ局所変更。既存の色・形・レイアウトを維持。旧 `public/favicon.svg` とBaselineは不変。実画面coverに旧タイトルの画像内文字はなく、再生成不要。
- Repo名、作業フォルダ、旧Baseline・比較証拠の名前/内容は変更しない。全57問・Art・Motion・SFX・TinyのBGM Bを保持。

## 名称確認の訂正・公開前残件

**Humanの選択は完了、商標・権利確認は未完了。** 旧Tiny Deliveryの同名調査は改名前の履歴として保持する。選択の完了を、懸念の不存在やクリアランス完了へ読み替えない。

- Jorudanの[2014-04-30公式発表](https://www.jorudan.co.jp/company/data/press/2014/20140430_norippa.html)を2026-09-16に読み取り確認。同社はiPhoneアプリ **乗換案内norippa（のりっぱ）** を当時発表していた。Nolippa / ノリッパの類似表記・称呼として記録する。ページ自体が発表時点の情報である旨を示す。
- 現在の提供状況、登録商標、権利者・指定商品役務・地域・権利範囲は **未確認**。使用不可とも安全とも断定しない。今回の調査範囲は上記歴史的な一次資料の確認だけで、商標DB調査や法務判断を実施したとは扱わない。
- Hakoriloも商標・類似称呼・権利確認は未完了。Lightwork Garden / Two Ways Homeの既存確認残件も引き継ぐ。
- `nolippa.com` は照会候補にとどまる。取得・所有・利用可能性を確認していない。`domain` はnullのまま、canonical / メール / リンク先として配布しない。登録・照会フォーム送信は行わない。
- 過去の[権利調査メモ](../records/ASSET_REGISTER_R1.md)・初回RC Reviewは消さず、本訂正と名称選択を別記する。

## QAと停止点

[名称差分の統合Review](../qa/soft-launch-rc-r1/naming-r1/REPORT.md)。日英名称・リンク・幅・起動・保存継続・配布隔離を再確認。ゲームplaythroughや比較動画は再生成せず、実行payloadと旧証拠のbyte一致を用いて既存結果を再利用する。

主担当/統合/独立read-only review実モデル `gpt-6-astra`。実機・初見・全57問Human全編・聴感・法務・公開許可は別Gate。stage / commit / push / deploy / LAN再公開 / 購入 / 契約 / 外部登録・問い合わせは行わず停止。
