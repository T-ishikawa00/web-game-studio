# Chanbara Visual Direction Brief R1 — 4 independent directions

2026-09-28 · **CHANBARA_VISUAL_DIRECTION_3_TO_5_READY / HUMAN_PROCESS_GATE_PENDING**

**画像生成のためのArt Direction Brief。Concept画像は未生成、4案とも未採用。** コードで作った画面、既存R1の背景差替え、完成ゲームの証拠ではない。Human / ChatGPTが次工程で実画像を作り、画像を見て選ぶ。

根拠は [Phase 0 Product Role](PRODUCT_ROLE_R1.md) と最新Humanの一人称・実マウス直結・接近するstylized stick fightersという核。旧TinlumoのArt／Craft画像・procedural造形例は参照しない。Creative importsは **NONE**。

## 比較条件と生成セット

各案を同じ条件で作る。初回は各案1枚、計4枚の **16:9、1920×1080想定、実ゲームplay画面**。映画ポスター、キャラクター設定画、第三者視点、俯瞰dioramaにしない。プレイヤー全身は映さず、一人称の右下から剣と握りが見え、少なくとも刃の接触点・敵の足元・接近方向が分かる。

共通比較場面は「手前の敵を右上→左下へ大きく斬り、その敵が左へ反応。中距離と遠距離に2体が迫る」。手前の敵は画面高のおよそ45〜55%、中距離25〜35%、遠距離12〜18%を目安とする。3体を横一列に整列させず、動きと奥行きで分離する。敵を20体並べて迫力を代用しない。これは画像比較用の構図条件であり、ゲーム敵数の採用ではない。

HUDは上部の小さな状況表示と隅のPause程度。数値一覧、常設操作説明、大きなカード枠、SNS用chrome、scoreの巨大演出は描かない。ロゴ・タイトル文字・架空の実績・読めない文字を生成しない。日英のUI文言は後工程で組む。

4案の一次画像を見た後、候補を絞るため必要なら同方向の「初期画面」と「hit直後」を追加生成し、一貫性を比較する。静止画はMotion・Sound・input feelの証明ではない。Human採用はexact画像のpath／版／判断範囲とともに記録する。

| Direction | 空間／shape | 物性と敵 | 主なpayoff | 主なリスク |
|---|---|---|---|---|
| **A — MONOLITH RUSH / 朱の断崖** | 大きな石塊・水平の地平・開いた崖上 | 高密度の黒いstick fighter、鋼の剣、乾いた石 | 振り方向へ体ごと飛ぶ、砂塵が道筋を示す | 汎用の闘技場に見える／敵が背景へ沈む |
| **B — INK TEMPEST / 墨嵐** | 3Dの筆勢、縦に裂けた空間、余白 | 墨の太細を持つstick fighter、刷毛跡の刀 | 一振りが長い墨の切断線と方向崩れを残す | 雰囲気画に化ける／hitと装飾が混同する |
| **C — PRISM BREAK / 光晶回廊** | 長い斜めの晶柱、暗い床、屈折した奥行き | 分節した光晶stick fighter、硬い薄刃 | 大きな破片が振り方向に扇状へ開く | 透明と発光で輪郭が消える／描画負荷 |
| **D — SKY RIBBON / 空裂くリボン** | 高空、張力のある膜と線、開放的な空間 | 細長い布帯のstick fighter、磨いた平刃 | 全身の帯がほどけ、風と打撃方向へ走る | 柔らかすぎて斬撃感が弱い／布で遮蔽 |

4案とも色変更だけで成立する派生案にしない。以下のcamera、輪郭、material、光源、敵反応、空間構成を一体として描き分ける。

## A — MONOLITH RUSH / 朱の断崖

- **Core fantasy:** 崖上へ迫る戦士を、手元の鋼で大きく斬り払う。軽い入力から、体重のある相手が大きく動く対比。
- **Player sword appearance:** 薄く長い直線的な鋼の一枚刃。刃先が鋭く読める白い反射、暗い巻き柄、小さな朱の鍔。竹刀・木剣・玩具の丸い刃にしない。
- **Enemy / stick fighter design:** 細長い黒い肢体、明確な肩／肘／膝、頭は小さな無表情の楕円。胸と前腕に切り込みのような朱の帯。球を積んだ可愛い人形にせず、前傾と長い四肢で速度・接近を伝える。
- **Arena / environment:** 建物で囲わない、乾いた白亜の石の台地。大きな一枚岩を左右にずらし、向こうに断崖と低い地平。道場、竹林、庭、小さな門、床の稽古円は入れない。
- **Palette:** 白亜、煤の黒、深い朱、乾いた砂色。彩度の主役は敵の帯と一瞬のhitだけ。
- **Lighting:** 高い位置の硬い斜光。足元の短い影で距離を読む。柔らかい全周光・pastelのambientで丸めない。
- **Materials:** 石は大きな面とわずかな欠け、敵は光を吸う密なmatte素材、刃は明確なspecular。細かなtexture量で品質を代用しない。
- **Hit VFX:** 接触点から短く白い火花、長く薄い一筋の弧、足元に振り方向と同じ砂塵。画面全体のflashは使わない。
- **Enemy defeat reaction:** 胸／肩が先に振り方向へ動き、体全体が左へ傾いて滑る・飛ぶ。手足が遅れて追従し、地面の砂塵が軌跡を示す。血・写実的な傷・切断なし。
- **Camera feel:** 目の高さ、広さを感じるmoderate wide。武器の弧を大きく見せつつ敵の足と地平を残す。camera shakeは迫力の主因にしない。
- **HUD philosophy:** 少量の白黒の線と数字。中央の攻防・剣・影に文字を重ねない。
- **Why it works for Shorts:** 黒い体が明るい大きな空間を横切り、斜めの一振りから横方向の大きな移動が一瞬で読める。3体が作る奥行きから進路が開く。
- **Distinct from old Tinlumo:** 小物を並べた小型worldではなく、人間の目線・等身大の相手・硬い日差し・大きな空白を核にした独立方向。既存palette／模型構造は輸入しない。
- **Risks:** 汎用の白い闘技場化、黒つぶれ、scaleの乏しさ、静止画では爽快でも入力が重くなる危険。固有の輪郭とhit後の体重移動をGoldで確かめる。

**Visual AIへの差分指示:** 上の共通比較場面を、白亜の断崖と黒い長肢の戦士、硬い斜光、長い鋼の剣で描く。全身の左への重心移動、細い白い接触線、接地影を明瞭にする。first-person playable game screenshot、背景の空白を保つ。cinematic poster、dojo、bamboo、pastel toy、isometric cameraは避ける。

## B — INK TEMPEST / 墨嵐

- **Core fantasy:** 自分の一振りが空間に筆勢を作り、迫る墨の戦士の輪郭を崩す。刃の方向を、強い白黒の形で感じる。
- **Player sword appearance:** 刀身は長い淡い灰、片側のedgeを墨黒の鋭い線で示す。柄は黒、鍔は薄い横線。浮遊する筆そのものには置き換えない。
- **Enemy / stick fighter design:** 3Dの細い人型を、大きな太細の筆跡として表現。肩から腕、腰から脚が一本の勢いでつながる。目の小さな寒色の点と前傾姿勢でこちらへの接近を示す。
- **Arena / environment:** 白い無限背景にはせず、乾いた灰色の地面と前方へ連なる裂けた墨の岩壁。縦の筆線を持つ遠景と足元のcontact shadowで3Dの奥行きを維持。畳・障子・寺・竹へ寄せない。
- **Palette:** 紙のような灰白、深い墨、薄い青灰。hitにだけ小さな電光色のyellow-white。赤い飛沫を避ける。
- **Lighting:** 明るい空の面光と締まった接地影。墨の外縁に薄い明暗差を作り、黒の塊同士を分離。
- **Materials:** flatな色面と乾いたedge、局所的なbrush grain。画面全体へ紙textureや汚れを被せない。立体と遮蔽が読める表面。
- **Hit VFX:** 刃の移動に一致する細い白抜き線と、その左右へほどける黒い飛沫・細片。敵全身を隠す墨煙にしない。
- **Enemy defeat reaction:** 当たった肩から筆線の姿勢が左へ折れ、全身の長い墨の形が地面へ流れる。非写実の墨の解体。近・中・遠の輪郭が混ざらない密度にする。
- **Camera feel:** やや落ち着いた目線、武器と手前の敵を大きく。視点自体を振り回さず、刃と輪郭の変化で速度を表現。
- **HUD philosophy:** 黒い短線を端へ数個。巻物・書道看板・和風menuの装飾を常設しない。
- **Why it works for Shorts:** 無音でも一振りの斜線と敵の崩れが読める。小さいスマホ映像でも白黒の主従が残り、連続する敵の反応が一枚の絵を変える。
- **Distinct from old Tinlumo:** 柔らかい立体模型や生活小物を基準にしない。空白と筆線、視点の近さ、形そのものの崩れを主役にする。
- **Risks:** 2D雰囲気画やポスターになりやすい。手足の当たりと筆跡が離れる、墨の残留が次の敵を隠す危険。静止画で良くてもMotionの可読性は未実証。

**Visual AIへの差分指示:** 共通比較場面を、立体の墨の長肢fighterと灰白の岩の空間で描く。perspective、足元、地平、player swordの同一空間への存在を優先する。接触の白抜き線と左へ折れる敵を明確に。書道ポスター、平面の挿絵、漢字、血しぶき、畳の部屋は避ける。

## C — PRISM BREAK / 光晶回廊

- **Core fantasy:** 接近する硬質な光晶fighterを、薄い刃で一瞬の方向性ある破片へ変える。硬さがほどける明瞭な破壊の快感。
- **Player sword appearance:** 暗い柄から伸びる細いsilver-whiteの刃。刃中央はsolid、edgeだけわずかに虹色。常時光る太いlaser棒にしない。
- **Enemy / stick fighter design:** 細長い肢体を大きな数枚の晶面で分節。頭・胸はsemi-opaqueな白灰、腕脚は青灰、輪郭に淡いcyan。透過で骨格やhit対象が消えないようsolid coreを持つ。
- **Arena / environment:** 奥へ斜めに伸びる巨大な晶柱の回廊。床は黒に近い石、周囲は深い青の空間。工場、scrap、conveyor、machine部品は置かない。
- **Palette:** deep blue-black、frost white、cyan、局所的なvioletの屈折。すべてをneonにしない。
- **Lighting:** 一本の強い側光と晶柱を通る細い光。敵の正面には弱いfillで姿勢を残す。bloomはedgeを潰さない少量。
- **Materials:** 主役は少数の大きなfacetsと半透明／不透明の対比。reflectionは限定。微細破片の数で迫力を作らない。
- **Hit VFX:** 接触点に短い硬質なstar shape、刃に沿う細い光線。大きな破片3〜7個が左へ扇状に開き、中心に空隙を作る。
- **Enemy defeat reaction:** 人体の切断表現ではなく、非生物の晶面がjointから分離。腰のcoreが左へ倒れ、長いarm/leg片が追う。次の敵と破片の明度を分ける。
- **Camera feel:** 目線は低すぎない。遠くまで続く斜線で接近感を作り、剣は下から対角へ走る。強制ズーム・camera kickに頼らない。
- **HUD philosophy:** matte白の小さなglyph。透明panelやSF管理dashboardは入れない。
- **Why it works for Shorts:** 明確な人型→大きな扇状の破片→次の敵が見える空間、という三段階が短時間で読める。縦cropでも接触点から結果が中央付近に残る。
- **Distinct from old Tinlumo:** 可愛い小型worldや既存industrial模型を参照せず、等身大のfaceted silhouetteと長い透視、硬い破壊反応で成り立つ方向。
- **Risks:** 透明物・反射・particlesの過負荷、輪郭消失、背景光とhitの混同。実装可能性を理由に旧materialへ戻さず、必要なら画像の段階でsimplificationをHumanへ提示する。

**Visual AIへの差分指示:** 共通比較場面を、暗い長い晶柱回廊、solid coreを持つ細身の晶体fighter、薄い白銀の剣で描く。hit後は大きな数枚の破片が左へ広がり、後方の二体が読める。excess bloom、laser saber、透明すぎる敵、工場模型、tiny dioramaは避ける。

## D — SKY RIBBON / 空裂くリボン

- **Core fantasy:** 高い空の中で、張力を持つリボンfighterを自分の一振りでほどく。刃の動きが長い軌跡と空間の変化になる。
- **Player sword appearance:** 幅を抑えた平らなsilver blade、濃紺の短い柄、薄い円弧の鍔。反射は一辺だけに走り、布の敵と硬い刃の違いが分かる。
- **Enemy / stick fighter design:** slenderな棒人間の骨格を幅の違う布帯で作る。細い手足、長いすね、扁平な輪状の頭。光沢のない濃紺の胴とorange-redの帯が関節の曲がりを示す。ぬいぐるみや風船体型にはしない。
- **Arena / environment:** 高空に張られた広い一枚のtension deck。左右に遠い支点と巨大な帆状の膜、下方と奥に空が抜ける。小島・家・庭・木の桟橋は置かない。
- **Palette:** 深い群青、強いorange-red、明るい空の青、少量の冷たい白。pastelの玩具配色に丸めない。
- **Lighting:** 高い空のclear light、膜が作る大きな影、fighter edgeの明確なrim。細かなライトを多数置かない。
- **Materials:** 布の方向性と張力、刃の硬い反射、床のmatte。fabric weaveは近距離のアクセントに留め、質感noiseを抑える。
- **Hit VFX:** 短い白い切っ先線と、hit箇所から長くほどける帯。小さな紙吹雪やconfettiの洪水にせず、主な帯2〜4本の方向を読む。
- **Enemy defeat reaction:** 胸の張力が左へ崩れ、長い腕・脚の帯が順にほどけて流れる。最初の打撃方向が先、風の余韻が後。敵の消滅を飾りparticleで隠さない。
- **Camera feel:** 開放的な目線、水平を保ち、わずかな遠近感で前方の走りを読む。揺れる地面を標準にせず、武器の広い弧と布の反応を見せる。
- **HUD philosophy:** 小さな線と記号のみ。背景の帆や空をmenu panelで覆わない。
- **Why it works for Shorts:** 人型の張力→一振り→長い帯が空を裂く、という大きな形の変化。複数体の位置・動き・ほどける方向が画面を連続して作り替える。
- **Distinct from old Tinlumo:** 外から眺める小世界ではなく、高空の抜け・目線の近さ・長い連続線・張力が主役。既存の柔らかいtoy geometryやmotionは輸入しない。
- **Risks:** 布が柔らかすぎてhitの強さが伝わらない、ほどけた帯が次の敵を隠す、剣の位置と見せ場が縦cropから外れる。回転や風だけが主役になるのも失敗。

**Visual AIへの差分指示:** 共通比較場面を、高空のtension deckと大きな帆、濃紺／朱の長い布帯のstick fighterで描く。薄い鋼の刃と、左へほどける長い2〜4本の帯の因果を明瞭に。stuffed toy、balloon body、small island village、wooden garden、confetti explosionは避ける。

## Human / ChatGPTへの生成依頼文

```text
添付のChanbara Visual Direction Brief R1の共通比較条件を守り、
A / B / C / Dを独立した4枚の完成ゲーム画面Conceptとして生成してください。
各案の「Visual AIへの差分指示」を、その案の全項目と一緒に適用してください。
一人称3D、手元の刀、迫るstylized stick fighters、接触と方向反応を判断できる画面です。
16:9、共通のhit場面、近中遠の3体、HUDは最小。画像内の文字やロゴは不要です。
既存Tinlumo画像、chanbara R1画像、旧palette、旧UI、道場／竹／木の構成は参照しないでください。
4案は色違いではなく、shape・空間・material・光・敵の反応を明確に分けてください。
この画像はVisual Conceptであり、実装済みゲームや操作感の証拠ではありません。
生成後、Humanが画像を見て選ぶまでVisual Bibleやコード実装へ進めないでください。
```

## 比較で見る点と未採用台帳

Humanには、第一印象、手元の剣と敵の大きさ、hit方向の明瞭さ、複数敵の画面密度、新作としての個性、15秒の始動→行動→payoffを想像できるかを比較してもらう。現時点で推薦1案へ固定しない。静止画から「気持ちよく遊べる」「Shortsで止まる」と断定しない。

| Item | Status |
|---|---|
| A / B / C / D Brief | READY FOR IMAGE GENERATION HANDOFF |
| Visual Concept images | NOT GENERATED |
| Human Accepted Visual North Star | NONE |
| Game-specific Visual Bible | NOT STARTED |
| Gold Craft Slice / R2 gameplay | NOT IMPLEMENTED |
| Human Process Gate / Visual selection | PENDING |

**ここで停止。NO_CHANBARA_R2_IMPLEMENTATION。** このBriefは画像生成サービスへの送信、費用、公開、外部変更、Git操作の許可ではない。
