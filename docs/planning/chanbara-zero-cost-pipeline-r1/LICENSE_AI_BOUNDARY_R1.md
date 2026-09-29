# ZERO-COST — License / AI Boundary R1

2026-09-29 JST · **USD 0 / JPY 0 / LICENSE_RESEARCH_READY / HUMAN_REVIEW_PENDING**

[Review入口](ZERO_COST_PREMIUM_3D_PIPELINE_R1.md) / [候補別確認](ZERO_COST_ASSET_SHORTLIST_R1.md)

## 今回の適用範囲

最新Human判断により第三者Asset・Toolへの支払いは0。旧Preproductionの有料候補は全て今回のProduction Candidateから除外し、購入Gateを廃止する。無料取得、account操作、導入、生成、実装も今回の許可には含まれない。研究R1のHuman AcceptedとAのCreative Authorityは維持する。

調べたのは公開の商品説明、仕様、価格表示、公式規約本文。第三者mesh・texture・animation・package・preview画像/動画・派生renderを取得してAIに入力していない。候補のA適合は公開仕様からの**設計上の見込み**で、実物の視覚検収、import、rig検査、性能測定はNOT TESTED。

## Licenseを候補へ適用する方法

候補表の「Steam可」は当該素材を商用ゲームへ適法に組み込んで配布できるとの判断。Steamの審査、登録、公開、費用、規約全体への適合を承認するものではない。商用可・改変可と、元素材の再配布可は別項目として扱う。

| Profile | 商用 / Steam / 改変 | 再配布と表示 | AIの扱い |
|---|---|---|---|
| CC0 | 著作権上はいずれも可 | 素材本体の再配布も可、credit義務なし。商標・肖像・第三者権利までは解除しない | CC0本文にAI固有の禁止なし。配布元の条件と対象物の範囲を確認。**今回のHuman指示によるAI入力/改変未許可は継続** |
| CGTrader Royalty Free (no AI) | Incorporated Productとしての商用ゲーム組込み・改変は可 | 単体素材や抽出可能な再販売/再配布は不可。credit一般義務は確認されず、exact listing/Custom Licenseの照合が必要 | NoAIの学習等禁止を遵守。通常の人手編集権をAI解析/改変権へ読み替えない。今回AI経路へ一切流さない |
| Adobe / Mixamo | Adobe FAQのcommercial game使用とGeneral TermsのContent Files改変条件を併読 | End Useへ組込み。元animation/modelの単体再配布・asset pack化不可。credit一般義務は確認されず | MixamoのContent Files・Output・serviceを使ったML/AIの作成・学習・検証・改善を禁止。HumanによるBlender編集のみを想定 |
| Blender / 自作成果物 | 商用制作可。自身が権利を持つ出力はSteam利用・改変可 | Blender本体/GPL codeと制作した画像・meshを混同しない。素材の元licenseは引き継ぐ | GPLは取り込んだ素材のAI許諾を追加しない。Human操作の通常DCC経路が主案 |
| Unity engine / 同梱機能 | Personal適格性とEditor Termsの範囲で商用制作・runtime組込み可 | runtimeをゲームの一部として配布。Editor単体再配布とは別。creditsがある場合のUnity表示等を保持 | Asset Store規約とは別に、一般Termsのagentic access制約も確認する。下記参照 |

根拠：[CC0本文](https://creativecommons.org/publicdomain/zero/1.0/legalcode) / [CGTrader Terms §21A–21B・23](https://www.cgtrader.com/pages/terms-and-conditions) / [Adobe General Terms §3.6](https://www.adobe.com/legal/terms.html) / [Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) / [Mixamo追加規約](https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Mixamo-Addl-Terms-en_US-20210623.pdf) / [Blender License](https://www.blender.org/about/license/) / [Unity Editor Terms](https://unity.com/legal/editor-terms-of-service/software)。各candidateとprofileの対応は候補表に明記する。

## 配布元ごとの重要差

**Poly Haven**：asset本体はCC0。公式FAQはAI学習も許容と明示しているが、websiteのpreview render等を同じCC0と扱わない。本案件で許諾されていないAI入力は実施しない。[License](https://polyhaven.com/license) / [FAQ](https://docs.polyhaven.com/en/faq)。live APIには別条件があり、assetのCC0と混同しない。今回はAPI連携も取得もない。

**ambientCG**：公式Licenseはassetとmaterial preview renderをCC0と明記。Poly Havenのpreview区別をそのまま転用しない。ただし今回はambientCG画像もAI入力していない。[License](https://docs.ambientcg.com/license/)

**MakeHuman / MPFB**：core assetと第三者community assetを区別する。今回の候補はCC0のcoreのみ。追加衣服やcommunity packをまとめてCC0認定しない。[公式license説明](https://static.makehumancommunity.org/about/license.html)

**Unity Asset Store**：無料表示でもAI条件は消えない。Store Terms §3.8(v) / EULA §2.2.1.1(g)のAI/ML入力・creation process等の制限を継続適用。本shortlistの主経路はStore assetへ依存させていない。[Asset Store Terms/EULA](https://unity.com/legal/as-terms)

**UnityのAI操作**：2026-06-30版一般Terms §17.2(dd)–(gg)にはAI用途、agentic access、integrationの制限がある。Unityが指定・許可した経路である証拠がないまま、Codex/MCP/CLIによるEditor操作を無料pipelineの成立前提にしない。今回はHuman-operated Unityを計画し、agentic経路はUNKNOWNとして保留する。これは「自作C#が一律禁止」とする判断ではない。[Unity Terms / Authorized Agentic Access定義](https://unity.com/legal/terms-of-service)

## AI 3Dの追加境界

Meshy Free / Meshy 6 Liteは無料exportと商用条件を確認できても、A級のhero素材としては未採用。Free出力のCC BY 4.0はcredit・license link・変更表示が必要で、assetに追加の利用制限を課せない。ゲーム全体をCC BYにする条件とは異なる。[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

Meshyのproviderによるinput/output利用条件は、商用利用権と別に確認する。無料枠へNoAI asset・Mixamo出力・商品preview・A画像を自動投入しない。Human自身のoriginal入力でも今回は生成・送信未許可。pricing FAQとTermsの記述差は候補表に残す。

## 将来の担当とデータ経路（今回未実行）

```text
Humanがexact無料対象・取得範囲を選定
  → 取得時点のprice=0 / license / attribution / custom条件を記録
  → HumanのローカルBlender作業：shape・UV・material・rig・animation
  → HumanのUnity作業：import・shader・IK・reaction・light
  → HumanによるAとのside-by-side / 動作検収
  → 合否とHuman記述の差分をReviewへ

Codex：公開仕様・license・原素材を含まない抽象要件を研究・文書化
原素材 / preview / 派生render / asset同梱code → AI：未許可のまま遮断
```

AIが書いたscriptでassetを解析/改変する経路も自動許可しない。ローカル、学習不使用、CC0、無料という理由だけで今回のHuman境界を解除しない。将来、素材ごとの権利と具体的操作が許可されるまでHumanのDCC操作で扱う。

購入Gateは設けない。残るのは**無料候補のHuman Review、権利・利用資格・担当の確認、将来の取得/実装範囲の明示**。その許可を今回要求したり、実行したりしていない。
