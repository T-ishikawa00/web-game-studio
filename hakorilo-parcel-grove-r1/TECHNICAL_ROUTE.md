# U1 — Parcel Grove / Technical route decision

2026-09-27 · Local Quality Slice · D03 / D18 only · Human Quality Slice Gate PENDING

**採用：Three.js WebGL 2による実体3D世界＋HTMLの操作・状態・アクセシビリティ層。** 既存canonicalルール、18面データ、保存validator、直接入力、accepted SFX/BGMを再利用する。色替え、生成背景、SVG再装飾は採用しない。

評価は、このrepoに既にある依存関係・D03/D18の情報密度・固定パズル契約を前提とした設計判断。点数は市場検証や実測性能を意味しない。

| 技術ルート | 品質上限 / 奥行き | 性能・mobile | 工数 / 保守 | accessibility | logic / save | 結論 |
|---|---|---|---|---|---|---|
| 現行SVG強化 | 輪郭と状態には強いが、連続光・素材・カメラの上限が低い | 最も軽い | 小 / 小。ただし絵の密度を足すと手作業増 | 既存HTML操作を活用 | そのまま再利用 | 今回の構造変革を満たしにくい |
| Canvas 2D | 良い絵は可能。立体の照明/影/向きは別制作 | 描画をまとめやすい。解像度管理必要 | 中 / 中。大きなasset制作費 | HTML overlay必須 | 純粋関数なら再利用 | キャラ/光の方位別作画負担 |
| 素のWebGL | 高い | draw call / VRAMを細かく制御 | 大 / 大。engine保守まで所有 | HTML overlay必須 | 再利用可 | Sliceでは過剰な基盤投資 |
| **Three.js** | **PBR・bevel・影・実体カメラ・motionを一つのsceneで検証** | **WebGL 2。desktop実測良好、実機mobile未検証** | **中〜大 / 中。既存導入0.186.0を利用** | **semantic button / keyboard / live statusをHTMLで分離** | **canonical import、schema無変更** | **今回採用** |
| Pre-rendered 3D | 静止画の上限は高い | runtime軽いが画像容量・読み込み増 | カメラ別再renderとasset管理が必要 | HTML overlay | 再利用可 | mobile独立構図と経路可変への対応が重い |
| 高品質sprite | キャラ表現は優秀 | atlasの容量・方向数が制約 | 方位×行動×解像度の制作が大 | HTML overlay | 再利用可 | 背景との接地・影・材質一致に追加費用 |
| Hybrid 2.5D | 背景画像＋立体などで高品質化できる | assetとWebGL双方を管理 | 中〜大 / 中〜大 | HTML overlay | 再利用可 | 将来遠景に限定採用可。今回のパズル世界は実体3D |

「3Dだから」ではなく、**D03からD18へ同じルールで展開し、desktop/mobileカメラを変え、同じオブジェクトで実際のmove・turn・waitを見せられること**を選択理由とする。再利用するのはゲームの真値で、旧render/UIは引き継がない。

## 実装と責任境界

- `src/world.ts`：original procedural geometry / material / camera / projection / event motion。AI rasterをruntimeへ読み込まない。PBR材質、soft key/fill、環境反射、shadow map、軽いscreen-space AO、接地陰影、露出・sRGB出力を管理。
- `src/main.ts`：D03/D18だけを選択可能。600ms/tick。視覚補間180msは判定時計から独立。failureは最後の合法位置を保持し、拒否されたセルをringで示す。違法移動を演出で成功扱いしない。
- `src/prototypes/delivery-r2.ts` / `delivery-levels-r2.ts` / `state.ts` / `direct-input.ts`：read-only import。18面の問題・解・version・保存形式を変更しない。
- `craft-audio.ts` / `craft-sound.ts`：accepted variant 0を再利用。`music-audio.ts`は候補bundleのbuild時のみ、accepted public packagingと同じD1固定・保存済みenabled/gain尊重へ変換。canonical sourceは変更しない。
- `baseline-public/`：既存release artifactの4filesをbyte-identical copy。比較hostだけ追加。4405の別originで通常D01起動→通常面一覧から選択。win/solution注入なし。

## 描画予算と限界

- 最大60Hz程度へrenderを抑制。simulationは常に600ms。backgroundでは描画を止め、入力・音・schedulerをpause。
- 静的な地形/植物/建物をmaterial別にmerge。動的なcourier/矢印/時計は独立。decorは実道路セルを避ける。
- pixel ratio上限1.75、AOは70%解像度、shadow 2048。これは今回の品質優先設定であり、低性能端末の保証ではない。
- texture/geometryはstage切替時に所有物を解放。失敗ringはretry時にdispose。単一courierモデルをそのまま全18面へ量産したとは扱わない。
- WebGL 2開始不可時は明示エラー。現段階で同品質の2D fallbackはない。context loss / thermal / low-end GPUの長時間実機試験は次段階。
- BGM PCMはaccepted 96秒・12.29MBを維持。trusted input後に遅延loadし、gameplay起動をblockしない。productionの音声配信形式圧縮は別作業・別検証。

MDNはsystem limitsの差、draw call集約、不要resourceの早期解放、back buffer解像度調整を推奨している。本候補のmerge・解放・pixel ratio制限はそれに沿う。実端末の性能は推測でPASSにしない。[MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

操作領域44×44 CSS pxは今回のHuman指定に従う。W3CのTarget Size Enhancedにも同じ寸法が示されるが、これだけでWCAG全体準拠とはしない。[W3C Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)

Threeのweb manual URLは今回取得404。API・AO orthographic定義・影・geometry解放は**repo内の実導入0.186.0のsource/type**を正本として確認した。最新web版と同一だという主張はしない。
