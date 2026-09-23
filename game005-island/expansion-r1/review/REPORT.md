# Game005 Expansion Slice R1 — Human Review

**GAME005_EXPANSION_SLICE_R1_READY / HUMAN_EXPANSION_GATE_PENDING**

Human採用A「住み継ぐ島」の最初の発展段階。Accepted MVPは変更せず、候補を別source/build/save/portへ隔離した。Full Gameではない。

[一括Review](index.html) / [通常試遊](http://127.0.0.1:4395/) / [仕様と判断](../../../docs/games/GAME005_EXPANSION_SLICE_R1.md) / [Accepted MVP](http://127.0.0.1:4394/)

## 実装した体験

橋の先を整え、広場と回遊路を好きな順で作る。海際では水面を向いて座り、木陰では樹木と格子屋根の下へ立ち寄る。住民は実シミュレーションの余剰時間で歩き、休み、仕事が来れば自動復帰する。席への進入路は通り抜け道と分けた。完成後の余白は残すが、次地区や港の解放は実装していない。

新規3候補・2つの短い目標・入り江を見るカメラ操作。既存Gallery、費用／状態／配置CTAを使用。Gold CSS／元の音sourceはbyte同一コピー。既存5施設も引き続きGalleryから到達可能。木材／資金、Slice中3人、個別割当なしを維持。新資源／住民／島／交易／offline収益／人口管理／新管理画面は0。

## 通常入力2経路

|経路|開始から橋まで|橋から最終工事完成まで|全編（観察を含む）|全クリック数|
|---|---:|---:|---:|---:|
|A 広場先行／海際|155.2秒|124.8秒|312.5秒|50|
|B 回遊路先行／木陰|156.3秒|136.5秒|342.6秒|50|

橋から最終工事までには最初の施設を使う様子を見る時間も含む。完成後の観察は必須タイマーではない。5〜10分の尺に合わせるための採集量／納品回数／待ち時間増加は行っていない。通常MVPから連続し、Sliceは短いまま成立する設計とした。楽しさや長期継続の証明ではない。

- [Route A 全編・等速・無音](video/route-A-full.webm)：広場先行／海際。最初は枝道を往復して着席し、回遊路で立ち寄りが増える。
- [Route B 全編・等速・無音](video/route-B-full.webm)：回遊路先行／木陰。最初は歩いて眺め、後から木陰で座れるようになる。
- 両方fresh browser、通常UIクリックのみ。資源／住民／時間／完成状態の注入0、個別割当0、ページエラー／外部request0。前後カメラは通常の入り江ボタン。Review専用モデル／美化／倍速なし。
- Playwright動画は無音。ゲーム内音は元の実装を維持。実聴評価はNOT TESTED。開発中のseeded studyや修正前diagnostic録画は.cacheに隔離し、本比較に使わない。
- [Route A 入力・状態・時刻](route-A-play.json)、[Route B 入力・状態・時刻](route-B-play.json)。JSONはディスク上の監査証拠のみで、Reviewサーバーでは配信しない。

## 独立レビュー

実利用モデル gpt-6-astra。書込み権限を渡さず、sourceと通常入力の実画像／動画抽出フレームをread-onlyで確認。最終判断：**装飾だけという停止条件には該当しない**。根拠／限界は[independent-review.json](independent-review.json)。連続した全編視聴ではなく、抽出フレームと入力／状態traceによる限定確認。Humanが発展・面白さ・Craftを受け入れた意味ではない。

初回に検出した共有座席の重複、橋完成後の既存Gallery候補欠落、reduced motionで着席の最終フレームが遅れる問題を修正。座席への移動枝と回遊路を分離し、未建設の木陰の近道を海際ルートが使わない検査を追加。破損保存で村に座るような不整合も拒否する。移動の全ての物理的到達可能性を証明するvalidatorではない。

## QA

- [Unit22](unit-tests.txt)：元MVP11件＋拡張11件。橋完成まで元coreと全経済／住民状態が一致。4通りの順序／配置、途中状態の複製再開、完成状態、資材取消、移設、idle→work→idle、未建設道の非使用、不正着席拒否。
- [Browser 18群](browser-qa.json)：既存回帰、保存／再読込、建設途中、回遊路先行＋木陰選択、完成保存、auto作業／出荷復帰、JA/EN、360/390タッチ模擬／desktop／横画面、Gallery／配置CTA、pause／hidden、破損／quota／拒否／競合、WebGL障害、私有source非配信。errors 0 / external 0。
- [完成状態追加Browser4群](final-browser-qa.json)：desktop／390pxの両配置、EN／reduced、広場移設＋reload、Accepted保存key sentinel保全。通常完走saveを読み込む技術fixtureで、Human比較画像とは区別。
- [Review3群](review-qa.json)：1440／390px画像・layout、等速動画と章ジャンプ、private source／JSON非配信。
- Strict TypeScript PASS、[build](build.txt) PASS。JS chunk 500KB警告は残る。警告閾値の緩和なし。型・描画・入力の成功はHuman Craft Acceptanceではない。
- [Security](security.json)：候補／配布／Review／新規文書の対象scan。全project rawは過去の既知6件FAILを維持し、新しい全repo PASSとはしない。検査中の一時Edge profileでは別途5候補を検出したため、[当時のraw FAIL](security-active-browser-scan.json)と[file/type/action・構造確認](security-profile-provenance.json)を保全。3件は公開拡張鍵構造、2件はprofile保護領域の値。Human dispositionはPENDINGで、将来Git／release前に判定が必要。allowlist・手動削除・rotationなし。今回はGit操作なしのためfull index/history scanを再実行せず、同一性を別に照合。
- [保全](preservation.json)、[Baseline before](baseline-before.json)、[Baseline after](baseline-after.json)：Accepted入力133と隔離派生22、原dist、既存未commit作業、HEAD／upstream／full indexを照合。変更は候補、新仕様、Current追記だけ。

## 性能

|条件|描画間隔 p50 / p95|JS時間|draw calls中央値|
|---|---:|---:|---:|
|desktop / accepted-MVP|16.7 / 16.8 ms|90.9 ms/s|317|
|desktop / expansion-home|16.7 / 16.8 ms|102.8 ms/s|445|
|desktop / expansion-cove|16.7 / 16.9 ms|104.4 ms/s|437|
|mobile-viewport / accepted-MVP|16.7 / 16.8 ms|81.9 ms/s|317|
|mobile-viewport / expansion-home|16.7 / 16.8 ms|106.0 ms/s|445|
|mobile-viewport / expansion-cove|16.7 / 16.8 ms|73.5 ms/s|316|
|mobile-low / accepted-MVP|33.3 / 33.5 ms|38.4 ms/s|166|
|mobile-low / expansion-home|33.3 / 33.5 ms|46.1 ms/s|230|
|mobile-low / expansion-cove|33.3 / 33.4 ms|33.7 ms/s|101|

[全測定](performance.json)。Windows Edgeの同一PC、逐次実行、各1.2秒warmup＋7秒。Accepted完成MVPと完成木陰Sliceをhome cameraで比較し、候補の入り江focusも測定。追加景観／自動散歩による負荷を含む異なるscene内容。seeded技術測定であり通常試遊証拠ではない。CPU時間はGPU実行時間ではない。単回の短い計測であり、mobile viewport/DPRはPC上の模擬。実機、発熱、電池、長時間メモリは未測定。

## Humanに残す7項目

1. 装飾追加でなく発展に感じるか。
2. 新しい場所を作る判断が楽しいか。
3. 住民の利用で暮らしを感じるか。
4. 海際と木陰に意味のある差があるか。
5. MVPより面倒になっていないか。
6. さらに育てたくなるか。
7. Accepted Craft／UI品質を維持するか。

全て **HUMAN PENDING**。Physical iPhone／Safariは **NOT TESTED** のまま、現時点の必須Gateにはしない。長期再訪／外部初見／10時間構造／配置嗜好／実聴／screen readerはUNKNOWNまたはNOT TESTED。Human Gate通過まで港・高台・地区3〜5・Full Gameへ進まない。

## 再現・隔離

repo rootで node game005-island/expansion-r1/scripts/build.mjs、その後 node game005-island/expansion-r1/scripts/server.mjs。現在はloopback4395で起動中。停止は powershell -NoProfile -File game005-island/expansion-r1/scripts/stop.ps1。PID／起動時刻／command／loopbackの所有を確認して当該processのみ停止する。

候補保存は専用key tinlumo:game005:island:expansion:r1 / version3。Accepted version2を移行・書換しない。通常試遊は候補内でMVPから開始し、橋の後に連続。試し直しは設定の候補専用「進行を消去」で明示確認する。

主担当・独立read-only reviewer実モデル gpt-6-astra。stage／commit／push／deploy／public registry／Cloudflare／AdSense／App Store／外部設定／LAN／TLS／Firewall変更0。既存serverは停止していない。

**GAME005_EXPANSION_SLICE_R1_READY / HUMAN_EXPANSION_GATE_PENDING**
