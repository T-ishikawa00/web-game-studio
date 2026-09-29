# License and AI Boundary R1

2026-09-29 JST · **LICENSE_AI_BOUNDARY_READY / NO_ASSET_PURCHASE**

[総合入口](CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md) / [候補一覧](ASSET_SHORTLIST_R1.md)

## 1. 今回のHuman指示

Humanは第三者assetのAI/ML input禁止を明示し、「Humanが購入・取得したAssetを、許諾確認なしにAI modelへのinputとして使用しない」「AIによるasset analysis / modificationを自動許可しない」と指定した。**PRIMARY採用、素材購入、商用利用可、改変可のいずれもAI利用許可を意味しない。**

今回読んだのは公開のproduct説明・仕様・価格・規約。素材本体、package、sample、preview画像・動画を取得してAIへ入力していない。候補のvisual適合は商品文面とHumanのA要件からの暫定分析であり、画像・実ファイルの検収ではない。AはHuman提供・採用済みの基準として保持するが、AI3D service等への送信許可へ広げない。

## 2. 作業を分ける

| 作業 | 既定の扱い | 実施担当／必要条件 |
|---|---|---|
| 公開のlicense・商品説明を調べる | 今回の調査scope | 主担当/限定read-only調査担当。規約を独自に解除しない |
| 購入、無料取得、account login、publisher問い合わせ | 今回禁止 | 将来exact対象・費用・操作のHuman許可 |
| assetをBlender/Unityへ通常importし、人が編集 | 今回未実施 | 将来Human/担当artist、commercial/modification/seat条件確認 |
| mesh、texture、rig、animation、同梱codeをAIがread/解析 | **許諾確認と具体的Human許可まで禁止** | ローカルfileでもmodel contextへの入力なら同じ |
| assetのrender、screenshot、動画、wireframe、部分切出しをAIに見せる | 原素材と同じ保留扱い | 派生物だから自動許可としない。Humanによるside-by-side比較で代替 |
| assetを含むscene/project丸ごとAIへ解析させる | 禁止 | model/textureだけ除外したつもりでもprefab、cache、logs等の漏れに注意 |
| modelのtraining/fine-tuning/RAG/embedding、AI retarget/生成service | 禁止 | 学習不使用設定、private、local AIでも利用権を追加しない |
| Codexの汎用C#・検証設計 | 原素材を入力しない独自部分に限定可能 | 公開API＋Human記述の抽象要件から作成。素材解析を隠れて行わない |
| AI作成のscriptで素材を自動解析/改変 | 自動許可しない | scriptがdeterministicでも、今回のHuman制約を迂回しない。具体的操作・出力・権利を確認 |
| Humanが結果をPASS/FAIL・自分の所見で伝える | 推奨する分業経路 | 再構成可能なgeometry/画像/元code等を添付しない。数値情報も自動抽出・送信しない |

## 3. 公式規約からの実務上の区別

**Unity Asset Store**：Terms §3.8(v)、EULA §2.2.1.1(g)はtrainingだけでなく、creation processやAI/ML model programsへのinput等を含む。非商用だから、model学習に使わないから、ローカルだから許可という解釈は採らない。Restricted Assetsは独自条件が優先する部分があるため、Standard表示だけで確認終了にしない。通常商用ゲームへの組込みと、素材の独立抽出・再配布は分ける。[現行Terms/EULA](https://unity.com/legal/as-terms) / [公式FAQ](https://assetstore.unity.com/ja-JP/browse/eula-faq?locale=zh-CN)

**CGTrader**：商品上のRF / NoAI表示と現行Termsの適用関係を確認する。通常RFのラベルだけからAI入力可としない。NoAI条項のtraining制限等と、Humanが今回指定した「許諾未確認のAI解析・改変禁止」を別々に守る。Steamへの組込みはIncorporated Product条件、元データの配布許可ではない。[Terms](https://www.cgtrader.com/pages/terms-and-conditions)

**直販の独自EULA**：Unity版と同一商品名でも、直販license・seat・AI制約は同じとは限らない。Synty/RamsterZ等は購入経路をSKUの一部として固定する。同一作品の中で併用する素材には最も厳しい条項が自動で他社素材まで拡張されるとは断言せず、個別の依存と配布方法を確認する。

Synty直販はGenAI用dataset/開発/3D生成に加え、GenAI関連の宣伝素材用途にも制限を置く。通常gameへの独立したコード支援が一律禁止とは断定しないが、AI制作紹介などの発信まで許可済みと扱わない。RamsterZはAI-generated systems等の表現が広いため本shortlistではHOLD。規約文面が未解決のまま「AIへ送らなければ全用途安全」と結論しない。[Synty規約](https://syntystore.com/pages/one-time-purchase-licence) / [RamsterZ規約](https://www.ramsterzanimations.com/end-user-license-agreement)

**CC0**：元の3D assetについて幅広い再利用が可能でも、サイトのlogo、preview render、第三者商標等まで同じとはしない。今回はCC0でも取得・AI解析を実施しない。CC0素材を選ぶことと、Humanの今回のdownload禁止解除は別。[Poly Haven license](https://polyhaven.com/license)

## 4. 将来のデータ経路

```text
HumanによるSKU/取得/利用範囲の承認
 → Human取得・購入証跡とexact licenseを保存
 → Human/artistのローカルBlender・Unity作業領域
 → HumanによるAとのside-by-side、変形/接地/握り検収
 → Human作成の差分所見・合否を本projectのレビュー資料へ

Codex: 公開API + 素材を含まない抽象仕様
 → 汎用C#・テスト設計・文書
 → Humanが素材を持つ環境へ適用・結果判断

原素材/派生render/同梱code → AI model: 許諾未確認の間は遮断
```

第三者素材をrootの通常読込範囲へ置いてから「読まなければよい」としない。将来取得前に、repo内の限定領域・agentからの読込除外・ignore・cloud同期対象外をHumanと具体化する。`.gitignore`だけではAIの読込や外部送信を防げない。今回は領域の設定変更も素材配置も行っていない。

## 5. 候補台帳の必須項目

`candidate ID / exact SKU URL / seller / date / current price+currency / license name+version / Restricted/custom status / permitted commercial+modification+Steam / raw redistribution / AI restriction / seats+contractor access / formats / rig / motion source / Blender editability / remaining questions / Human decision`。

取得後はreceipt、取得当日の規約、実ファイルのlicenseをHumanが照合する。公開情報が十分でもsupplierの権利来歴、ファイル破損、import成功、A一致は未証明。UNKNOWNは購入を急ぐ理由にせず、対象を保留または別候補へ切り替える。問合せ文を用意しても送信は別許可。

## 6. この境界が品質工程へ与える影響

原素材をAIへ見せられない場合、Codexによる自動のvisual判定やweight修正を納期前提にできない。**Human/artistがDCC編集・実物検収を担えることがPRIMARYの成立条件**。担当未確定のまま「AIが補修してGoldへ届く」と見積もらない。視覚担当が用意できない場合はCharacter/Animation Gate前で保留する。

全URL閲覧2026-09-29。これは作業上の権利確認台帳で、未知の利用を包括的に許諾するものではない。今回購入/取得/AI素材解析は0。
