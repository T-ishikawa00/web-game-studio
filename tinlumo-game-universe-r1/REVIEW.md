# Tinlumo Game Universe / Remaster Review R1

2026-09-26–27 • Research / Audit / Art Direction / Remaster Plan / Pilot proposal

**推奨：Hakoriloを新しいscene・UI構造で作り直し、U1「Parcel Grove」を最初の品質見本にする。** 全5作品へ同じ素材を貼る方針は採らない。統一するのは「触れたくなる小世界」「行為が景色に返る」「説明より先に遊びが見える」という品質の約束である。

Portal North Starの方向は **HUMAN APPROVED**。このReviewのGame Universe、各ゲームの改修規模、HakoriloのU1/U2/U3、Pilot着手は **PROPOSED / HUMAN GATE PENDING**。画像は完成品質を比較するための生成Conceptであり、実装済み画面でも実機性能の証拠でもない。今回、本実装へ進まない。

## 1. 今回の判断と、前回から外す前提

既存3 Puzzleの共通矩形盤面・共通Menuを維持したまま、色・枠・材質を変えてもPortalとの落差は残る。前回のSVG比較は保全するが、今回の到達目標にも制作原型にもしない。先に「どんな場所で、誰が、何をしているゲームか」を一枚の構図で成立させる。その後にrendererとコードの再利用範囲を決める。

現在の公開版を安全に保全することと、新候補の構造を大胆に変えることは両立する。18面・21面・600ms・既存engineは現行の契約であり、将来の設計を永久固定する本質ではない。一方、旧saveの問題IDを別問題として黙って読み替えることは許容しない。

| 対象 | 今回の扱い |
|---|---|
| Portal North Star | Human承認済みのブランド方向。再選定しない |
| North Star内の箱・魔女・人物・星等 | 画像内の表現。個々のキャラクターや新しいゲーム内容まで製品採用されたとは扱わない |
| 現行5作品 | 公開版・既存受入・save・音・配布物を保全。旧資料の公開0本は現状ではない |
| Game redesign | コア体験を保つ新候補の計画。既存ルールの再編集、新描画、専用UIを提案可能 |
| 今回作るもの | 3方向のHigh-Fidelity Concept、構造比較、Visual Bible、5作品監査、工数仮説、Pilot仕様 |
| 今回の停止点 | Review完成。ゲーム本実装、stage、commit、push、deploy、Production変更なし |

## 2. Research：借りるのは判断原理

2026-09-26に以下の一次資料を確認した。FACTは公式の説明、TRANSFERはTinlumoへの設計推論。実ゲームの全編試遊、市場性や売上の証明ではない。他社画像やキャラクターを制作素材として取り込まない。

| 一次資料 | FACT：公式説明から確認 | TRANSFER：今回へ適用する判断 | 採らないもの |
|---|---|---|---|
| [Captain Toad / Nintendo](https://www.nintendo.com/us/store/products/captain-toad-treasure-tracker-switch/) | 仕掛けのあるcourseを探索し、宝を探す構造を説明 | 一場面を完結した場所として設計し、主役・目的地・障害を同じ画面に収める | キャラクター、固有造形、カメラ回転を必須にする設計 |
| [Monument Valley / ustwo](https://ustwo.com/blog/monument-valley-out-now/) | 画面ごとの美しさ、少ない説明、短く質のある体験、抑制された音・動きへの設計意図を説明 | 構図と入力の理解を同時に設計。短い作品でも完成度を優先する | 不可能図形や静けさを5作品全てに強制 |
| [LEGO Builder’s Journey / LEGO](https://www.lego.com/en-us/categories/games/builders-journey) | 雰囲気を重視した幾何学パズルとして紹介 | 材料・接地・光で「実在しそうな小物」を成立させるU2の考え方 | LEGOのstud、brick形状、商標や製品外観 |
| [Lumino City / Noodlecake](https://noodlecake.com/games/lumino-city/) | 紙・カード・小型照明・motorを用いた手作り世界と説明 | 素材を貼るだけでなく、構造・継ぎ目・光源の理由を一貫させる | 手作業撮影を本案件の必須制作方法にすること |
| [Mini Motorways / Dinosaur Polo Club](https://dinopoloclub.com/games/mini-motorways/) | 道を描き直し、都市の交通を流す操作を主題化 | 装飾より先に経路と交通の関係を読ませる。Hakoriloの経路可読性の反証基準 | 成長都市・終わりなき混雑・同じ平面絵柄 |
| [Botany Manor / Whitethorn](https://whitethorngames.com/botany-manor) | 植物を育てるために環境条件や手がかりを解く探索パズル | Lightworkでは正解を数値だけでなく植物と庭の変化に返す | 探索ADV、魔女、収集・育成gameを無条件に追加 |

結論は「全作3D化」ではない。画面の主役と行為を先に固定し、2.5D・3D・描き下ろし背景を作品ごとに選ぶ。Portalの高品質画像と実ゲームの可読性・操作・loadingの両立は、他作品の存在では保証できない。実際のTinlumo Pilotで検証する。

## 3. Visual Bible：ブランド世界

**Tinlumoは、小さな行為が世界を少し良くするゲームの集まり。** 届ける、光を通す、帰る、集めて打ち返す、つなぐ。それぞれの行為に、見て分かる心地よい返事がある。共通の地理や大きな物語を無理に作る必要はない。

North Starの強みは、明るい色そのものより、親しみやすい主役、触感が想像できる物、奥行きのある場面、迷わない誘導が一体になっている点。ゲーム側も背景・キャラ・UIを別々に飾るのではなく、一つの体験として設計する。

| 軸 | 採用する定義 | 失敗例 |
|---|---|---|
| かわいさ | 小さくても意思と重さがある。丸い大形、少数の特徴、相手を待つ・頷く等の行動から愛着が出る | 全物体へ顔を付ける、常時跳ねる、目を巨大化するだけ |
| premium感 | silhouette・比率・接地・光・タイポ・入力の反応が揃う。少数の素材を丁寧に作る | 全面glow、粒子の追加、高解像度textureで形の弱さを覆う |
| 親しみやすさ | 間違えても世界が応答し、原因を理解してすぐ直せる | 勝手に解く、失敗を隠す、長い説明で操作を止める |
| 子供っぽさとの境界 | 明るさと可愛さは保ち、色数・装飾・言葉・動きを抑制する。大人が机に飾りたい物の品位 | 原色の均等配分、玩具売場のようなbutton密度、幼児語、報酬の過剰演出 |
| スクリーンショット価値 | 主役・場所・遊びの関係が一枚で分かり、触ってみたくなる | Coverだけ映画品質、gameplayはgeneric board。静止画のために操作点を隠す |

## 4. Visual Bible：光・色・素材・空気

光は「一つの主光＋柔らかい環境光＋接地影」を出発点とする。遠景は低contrast、操作物は明瞭。手前の飾りが入力点を横切らない。霧・被写界深度・bloomでルールをぼかさない。MAGNETの暗部でも、金属・自機・予告は背景から分かれる。

候補共通paletteはwarm white #FFF9EE、深いink #25214E、晴天blue #DCEFF5。semantic accent候補はcoral #EF7561 / teal #207F85。これらは**出発点の候補**であり、全gameに同じ色を強制するtoken承認ではない。色に加え、形・図柄・位置を併用する。文字と操作のcontrastは実際の最終背景で検査し、paletteだけで合格にしない。

| ゲーム | 固有の素材と光 | 同一ブランドにする接点 |
|---|---|---|
| Hakorilo | 暖かな石、釉薬、塗装した小型配送機、陽光 | 触れそうな主役・世界の余白・優しい失敗 |
| Lightwork Garden | 磨かれた鏡、薄い葉、ガラス、土、局所的な光 | 操作の因果が美しい環境変化として返る |
| Two Ways Home | 漆喰、布、木、夕方の柔らかい光 | 2者の関係をsilhouetteと構図で見せる |
| PROJECT MAGNET | マットな工業塗装、読みやすい金属塊、鮮明なenergy | 機能が形に出る、反応の良さ、可愛さと力強さの両立 |
| An Island Connected | 海・石・木・帆布、空気遠近、生活の小さな動き | 選んだ行為が風景になり、完成を眺めたくなる |

共通化するのはmaterial shader一式ではなく、明暗の階層、接地、形の丁寧さ、装飾の予算。植物や木箱を全作品へ大量配布して世界観を統一しない。

## 5. Visual Bible：UI・HUD・Motion・Audio

世界が主画面。HUDは現在の判断に必要なものだけを残す。上端に戻る・短い場面名・設定、操作は親指が届く下端へ。複数の大きなpanelで場面を囲まない。初回説明は操作対象のそばに一つずつ置き、常設の制作説明は出さない。ゲーム内にResearch/Pilot/renderer名を表示する設計はしない。

Titleはsceneへの入口、Level Selectはその世界の行先、Resultは今の行為の余韻と次の選択とする。言語変更はゲーム別world labelを含むJA/EN、settings・pause・reset・save failureは共通の意味と操作位置を保つ。文字をartへ焼き込まずHTML側で組版する。

入力targetは設計目標48 CSS px以上、狭い場合でも44pxを下回らない候補とし、隣接誤入力を含め実機確認する。これはTinlumoの設計目標で、アクセシビリティ規格への適合宣言ではない。controller/keyboardのfocusとTouchのpressed stateを世界へ翻訳する。回転した透視図の見た目の面積をそのままhit areaにしない。

| Motion | 目的・候補 | 禁止する挙動 |
|---|---|---|
| 入力 | 80–140msの押下・向きの返事。操作確定が一目で分かる | 長いspringが連続入力を妨げる |
| 行為 | 移動前の意図→移動→接地。timingはルールclockと別の描画層で調整 | 見た目の遅延で衝突順が変わる |
| 成功 | 主要行為の完了を先に見せ、350–700ms程度の短い反応、その後に次へ | screenをすぐ隠す、勝手に次面へ進む |
| 失敗 | 原因位置を止めて示し、1操作で編集へ戻れる | 大爆発、罰、長いresult、振動だけで原因を示す |
| 場面遷移 | 同じ世界のカメラ距離・照明をつなぐ。操作開始時には完全に静止 | パズル中の自動camera、隠れる道 |
| Reduced motion | camera移動・跳ね・粒子を省き、位置/輪郭/短いfadeで意味を残す | 動きを減らすと入力・成功が分からない |

数値は制作仮説。実装済みの測定値ではない。音は各作品の固有素材と行為へ結び付ける。既存BGMなし・SFX中心の受入を再設計を理由に自動変更しない。静止画Reviewから聴感をPASSにしない。

## 6. CoverとPortalからの連続性

Coverは「誰が・どんな場所で・何をする」を圧縮した一枚。ゲーム中と同じ主役比率、素材群、光の方向、重要objectを使う。実装後は代表的なplay場面から構図を整える。Coverだけ巨大な別キャラ・別genre・存在しない景観を見せない。

Portalで使うportraitとゲーム内のlandscape/portraitは、一枚を機械cropしない。共通sceneからカメラを別設計し、主役・目的・ルールの一端を残す。文字は別layer。240px幅でも主役を見分けられるか、タイトルを隠しても作品が区別できるかを確認する。

Portal → detail → loading → Title → playで、色だけでなく同じ「物」が続く。Hakoriloなら配送機・郵便所・道標。loadingに無関係なmascot animationを挟まず、世界を短く先見せする。共通brandmarkは入口や戻り導線に控えめに置き、play中の装飾を増やさない。

## 7. 監査方法と改修規模の定義

OBSERVEDは保存済み代表screenと今回のsource/doc監査、JUDGMENTは専門的な評価、HYPOTHESISは未検証の計画。代表screenは現行/直近accepted制作工程の既存証拠を再利用。Islandの画像は正式公開名確定前のISLAND表記を含む。今回、Productionへ接続して5作品を新たに全編試遊したとは扱わない。実際のclick率・離脱・retention・売上はUNKNOWN。

| 分類 | 今回の意味 |
|---|---|
| KEEP | 表現を含め採用し、改修対象にしない |
| POLISH | 既存のscene構成の中で精度を上げる |
| REMASTER | コアを残し、Art・カメラ・場面・固有UIを広く再設計する |
| FULL REBUILD | scene構造・画面フロー・操作の提示・制作pipelineを新候補として作り直す。engine廃棄を先に決める意味ではない |

## 8. 5作品監査

### Hakorilo — FULL REBUILD / 優先1

OBSERVED：濃色の壁面が大きく、白い経路と小さな配送機を四角い盤面へ閉じ込めている。矢印は読めるが、配送先や待機が「そこにある理由」を持つ世界になっていない。JUDGMENT：Portalの触れそうな主役・光・高さ・風景との落差が、ブランド入口で最も大きな問題と評価する。

KEEP：経路と待ち方を準備→2台の意図を予測→実行→干渉原因を見て直す→2台とも届く満足。入力と結果の決定性、形で区別できる2台、再試行の軽さ。

DISCARD：方眼を全て見せる前提、壁tileで余白を埋める構成、現bot造形、数字だけの待機、共通shell、常時tool列。既存18面/順番の絶対視も外す。ルールや問題数の再編集は別に検証する。

TARGET：配送の小世界そのものがパズル。配送機・junction・待避場所・depotが一体になり、一枚で「2台をどう通すか」が伝わる。運任せphysics、実行中の反射操作、自動解答へ移るとコアを失う。

### Lightwork Garden — REMASTER / 優先2

OBSERVED：線と機構記号は読めるが、庭より光学回路図に近い。花が開く価値が小アイコンと文言へ圧縮されている。JUDGMENT：North Starの生命感、薄い葉を透かす光、手入れされた場所としての魅力は不足と評価する。

KEEP：光を向け直す因果、先に仕掛けを準備してから再配光する発見、複数の花を現在同時に照らす成功。receiver/latchと花の違いを明瞭にする。

DISCARD：白い全面grid、太線だけの鏡・受光器、同じ小花、機械的な面番号中心UI、generic壁。TARGET：小さな温室の可動鏡・集光器・シャッター・植物床。光は空間を通るが、上から追える経路と役割silhouetteを優先。既存光路計算の再利用価値が高いためREMASTER。

Pilot候補はL05型の「門を準備→光を戻す→花」。過去の点灯を合算して成功にする変更、雰囲気のために光路を隠す変更は避ける。魔女・育成・色混合は別gameplay仮説で、今回の採用案ではない。

### Two Ways Home — FULL REBUILD / 優先3

OBSERVED：2つの濃色矩形と○/◇が強く、2者の帰路より二枚の計算盤に見える。JUDGMENT：現在の表示は比較には有効だが、住みたい場所や帰った喜びの視覚表現は弱いと評価する。

KEEP：一つの入力→異なる2結果、片方を壁で止めて相対位置を調整、同時帰宅。方向の対応と2者の状態を常に同時に見られること。

DISCARD：必ず独立矩形2枚を並べること、箱顔、同形の家、共通shell、現21問の順序。TARGET：対になった2つの小庭/街路が一つの構図に入り、暖色の布の子と寒色の角張った子が違う生活圏へ帰る。左右の装飾を対比させるが、入力方向の座標は同じ。portraitは両世界を一緒に設計し、単純stackで主役を小さくしない。

独立操作、一方の画面を隠すcamera、一度帰宅した者の永久固定は核を変える。恋愛ADV風coverへ寄せることを目標にしない。画面構造を一から組み直すためFULL REBUILD。

### PROJECT MAGNET — REMASTER / 優先4

OBSERVED：工業的な世界は既に成立している。ただしmobileではHUD・説明・arena・touch領域の競合があり、自機と回収物が小さい。金属を持つ重みと射出の瞬間が一枚の魅力になりにくい。

KEEP：吸引→保持→狙って射出→装甲が剥がれて次の資源になる循環。位置取り・敵優先・形態成長・素早い再開。力強い作品としてTinlumoの幅を担う。

DISCARD：背景の細部で工業感を作る手法、小文字中心HUD、均一arena framing、文字中心の強化/result。TARGET：丸みのある丈夫な回収機、塊として見えるmetal、明瞭な敵予告、行為の方向に空いたcamera構図。明るい塗装工場と冷たい機能光を両立させる。

Pilotは同じ敵配置で回収前→圧縮保持→射出→再回収を比較。全作cozyに合わせて弱い攻撃にしない。auto射撃化、粒子で予告を隠す変更は不採用。戦闘のコード廃棄より画面・機体scale・FX優先順位の再設計が高return。

### An Island Connected — REMASTER（範囲限定）/ 優先5

OBSERVED：既に3Dの島と建築が主役で、5作品中North Starへ最も近い。mobileでは海の占有が大きく、住民・建物利用が小さい。建築選択をしてから生活に返る場面の見せ方に余地がある。FULL REBUILDの必要性を示す根拠はない。

KEEP：島中心、プレイヤーの建築/配置/投資/出荷判断、自動住民・個別割当なし、短いtempo、完成後に眺められること。現行3地区体験の受入を尊重する。

DISCARD：全島を同じ距離から見続ける前提、建築の選択が必ず大きなGalleryを経由すること、小さ過ぎる住民、既存meshの絶対視。TARGET：場面に合う二段階のframing、完成直後の住民利用、建築中/完成のsilhouette差、近景でも耐える接地・素材。cameraは勝手に主導権を奪わず、ユーザーが戻せる。

独立監査はPOLISH＋限定REMASTERを推奨。主担当は、Home cameraと建築の提示構造まで検証対象にするため**範囲限定REMASTER**へ分類した。機能追加で重くする案ではない。住民割当・資源複雑化・待ち時間水増しは今回のコア改善と逆行する。

## 9. Remaster Priority Plan

工数は**設計時点の幅を持つ概算、人日（制作・実装・検証の合算）**。見積依頼/納期保証/費用承認ではない。1名相当・既存資産活用・新規online機能なし・1方向選択を前提とする。Human待ち・外注調達・大規模ルール変更は含めない。完成版の範囲はG2で再見積する。

| 順位 | 作品 / 規模 | 品質Slice / その後の完成版追加 | 期待return（仮説） | 主なコスト・不確実性 |
|---|---|---|---|---|
| 1 | Hakorilo / FULL REBUILD | 12–20 / 25–45人日 | Portalの顔になる。ルールが短く、ブランド品質と可読性を最短で判定できる | 新world/主役/renderer/画面フロー。既存問題再編集の量 |
| 2 | Lightwork / REMASTER | 8–14 / 16–28人日 | 光と開花で同一brandの別表情を検証できる | 透明材・beam・stateの可読性、動的照明のmobile負荷 |
| 3 | Two Ways / FULL REBUILD | 10–18 / 22–38人日 | キャラクター性と関係のある世界を広げる | portraitで2世界を同時に読ませる再構成、導入再設計 |
| 4 | MAGNET / REMASTER | 10–18 / 20–35人日 | Tinlumoが静かなPuzzleだけのbrandになるのを防ぐ | 戦闘可読性と華やかさ、入力遅延、形態別Art |
| 5 | Island / 限定REMASTER | 6–10 / 12–20人日 | 既存の強い景観を生活感のある看板へ育てる | 遮蔽・camera・住民scale、既存短tempo保全 |

全件を機械合算して着手しない。HakoriloのG2合格後、Lightworkで「共通基準が別作品にも効くか」を検証してから量産。先に5本を並行で作り直すと、未確定の品質基準を5倍に複製する。

もし最初の1本だけに投資するならHakorilo。最もgapが大きく、Portalの主役として自然で、配送の成功1場面にArt・操作・motion・resultの全てを集約できる。現在の利用者数や売上を根拠にした順位ではない。Islandを先に磨く方が早い可能性はあるが、残る3 Puzzleの構造的な弱さを解消する制作基準にはなりにくい。

## 10. Hakorilo：3方向の構造比較

3案とも「2台、2配送先、一つの共有交差、待つことで解ける」という同じ比較課題を想定する。生成画像はその課題を厳密にsolverで検証した盤面ではなく、光・造形・密度・cameraの品質目標。経路の正しさは次のgrayboxで検証する。画像内の矢印をそのままlevel dataへ採用しない。

| | U1 Parcel Grove | U2 Pocket Dispatch | U3 Terrace Post |
|---|---|---|---|
| 方向 | Soft Miniature World | Premium Toy Mechanism | Architectural Delivery Diorama |
| 主語 | 小さな配送村を動かす | 手元の機械を組み合わせる | 立体的な町の通行を整える |
| 世界の構造 | 外へ開いた不整形terrain、連続する道、同じ高さの交差 | caseに収まる溝・junction disc・dock。一つの物体 | 高さの違うterrace、ramp、共有landing、建物の断面 |
| camera | 約50°俯瞰、orthographic候補、play中固定 | 約70°俯瞰、回転なし、机と装置の境界を見せる | 約35°正面斜め、全経路を同時に見せるcutaway |
| 入力 | 路上の道標を選ぶ、待避所で待ち方を指定 | junction discを回す、待機detentを切替 | landingの道標と待機alcove。上下の経路を選別 |
| 待機の意味 | 相手を通してから出る小さな郵便広場 | 機構に1拍の余裕を作る | 狭い共有landingを譲る |
| mobile再構図 | valleyを縦長に組み、depotを対角、交差を中央 | 縦長case版を専用設計。横長caseを縮小しない | 高さは使いやすいが、ramp重なりと奥行き誤認が最大リスク |
| 訴求 | Portalから最も自然に入れる、広がりと愛着 | 触覚と操作の気持ちよさ、最も明快な物体 | 一枚の特異性と建築の魅力が強い |
| 主な代償 | 背景密度とmobileの主役scaleを抑える必要 | Portalの空気感から少し内向き。道具より教材に見える危険 | levelごとの手作りコスト、遮蔽、方向座標の説明 |
| 推奨 | **最初の品質Sliceに採用を提案** | 素材の品位と入力可読性でU1を上回るなら逆転候補 | 強い将来候補。最初の基準作りには不確実性が大きい |

違いはtheme名ではない。U1はworldの中へ入る、U2は物体を操作する、U3は高さのある建築を読む。terrain・object scale・camera・input位置・level制作方法がそれぞれ変わる。3案を同時に完成版へ進めない。

## 11. U1先行案：見た目の構造から作り直す

### Board / World / Depth

現状のwall tile領域をそのまま草や石に置換しない。まず経路graphを作り、周囲に郵便所・待避所・水路・植栽を配置する。道は同じ高さで連続させ、装飾の高低差は背面と外周へ逃がす。操作空間と景観空間を分けつつ、同じ場所として見せる。境界はsquare boardではなく地形の輪郭で作る。

奥行きは前景の低い縁→遊べる中景→静かな遠景の3層。play画面で全ルートを見せる。自由回転を前提にしない。最初のSliceにはbridgeの上下交差・移動platform・elevatorを入れない。見た目の立体化と新しい経路ルールを同時に検証しない。

### Camera / Character / Objects

通常cameraは固定、デジタルに見下ろし過ぎず両車の顔と経路が読める角度をgrayboxで選ぶ。TitleやResultで近づく場合も、入力可能になる前に通常位置へ戻す。portraitは同じlandscape画像をcropする設計にせず、同じgraphの配置・cameraを縦向きに設計する。

配送機は小箱の単純化したbody＋車輪＋parcel＋小さな表情。身軽なcream/coral機と、少し幅広いcream/teal機。識別badgeはtriangle/circle候補を固定し、depotにも対応させる。AI画像間のbadge・車輪・屋根のばらつきは製品仕様ではない。G1で正面・側面・背面・通常scaleのmodel sheetを作る。

depotは単なる色枠ではなく、parcelを受け取る床・扉・小さな明かりを持つ。可動junctionは道に埋まった方向plate、待避所は位置が読める輪郭とpause mark。植木・小包の山・窓は非操作物とsilhouetteを分ける。benchだけで待機を暗示するのは曖昧なため、選択時に短いラベルと明確な操作点を出す。

### Material / Lighting

大きな面の形とbevelを先に作り、textureは最後。stoneは弱い凹凸、bodyは塗装ceramic風、wheelは暗いmatte、金属は小さな接合部だけ。全物体をplush化/wood化しない。固定環境の照明はbake候補、動く配送機は簡潔なlightとcontact shadowで接地。高精度なConceptの影や反射をそのままweb runtime要件にしない。

### HUD / Buttons / Panels

上端：戻る、短い配達名、設定。達成数はdepotの状態と小さな2個のstampに集約。下端：主CTA「出発 / Send」、Undo、選択対象がある時だけ補助操作。待ち方は位置に結び付いた「待たない / 1拍待つ / …」のpreview。全ての数値を消すのではなく、意味の分かる表示へ再編する。

走行中は編集操作を収めてPause/一歩/編集へ戻るを提示する候補。衝突原因の比較にstepが役立つかを試す。機能増設を自動決定せず、現行pause/resetとの使いやすさをPilotで比較する。Menuはbottom sheet、確認が必要なresetは設定内へ分け、playの主CTAと並列にしない。

### Success / Failure / Transitions

到着：parcelがdockへ収まる→depotが短く応答→配送機が軽く頷く。2台成立後に小さな「お届けできました / Delivered together」と次へのCTAを出す。祝福のために主役を巨大なmodalで隠さない。

干渉：接触直前/原因位置で止め、双方の意図を短く示す。羞恥や破壊ではなく「ここで重なりました / Paths meet here」。編集に戻ると直前の設定が残り、原因場所が分かる。成功/失敗のcameraはreduced motionでは省略し、状態表示は保持。

場面移動：次の配達先へ視線が移る短いtransition、または小さなfade。移動演出を待たせるためのloadingにしない。音は機体の小さな機械音とparcelの接地、depotの控えめな返事。BGM追加は今回の提案に含めない。

## 12. Title / Level Select / Play / Result の設計

Review画面の4つのframeは、U1採用時の静止したcomposition mock。buttonは製品機能ではない。生成artを使うため構図の細部は同じだが、最終制作では各状態に合うcameraとobjectを同じsceneから撮る。

| 画面 | 表示の主役 | UIと行動 | 移行の条件 |
|---|---|---|---|
| Title | 始業前の郵便広場、2台の関係 | Hakorilo / ちいさな配達、大CTA「つづきから / Continue」、新規時「はじめる / Start」、設定 | 初回と復帰を分ける。save失敗を成功扱いしない |
| Level Select | 配送先の小さな地図・3件ずつのroute cards | 配達名＋小scene、完了stamp、戻る。長い数字の一覧を主役にしない | 未解放と未選択が区別できる。現在地を失わない |
| Play | 2台・目的地・交差・待避所 | 路上操作、下端Send、選択時だけ補助UI | 下端panelが交差を隠さない、JA/ENで寸法維持 |
| Result | 届いたparcelと2台の余韻 | 短い成功文、次の配達、もう一度。経路を確認できる | 自動遷移なし。再挑戦が簡単で、達成保存は確認済み時のみ表示 |
| Failure | 因果の分かる停止frame | 原因表示、編集へ戻る。設定を保つ | 誤った経路とtimingを区別、運任せに見えない |

390px portrait設計の初期予算：top safe area＋HUD約64、world約440–500、補助説明/下端操作約112、残りを余白。固定pixelの完成仕様ではなくlayout研究の枠。320px・短いlandscapeでは文字を小さくする前に装飾を減らし、操作点の実寸を守る。

## 13. Rule / Content再設計の自由度

| 層 | 再設計可能な例 | 別途証明すべきこと |
|---|---|---|
| 表現 | renderer、camera、scene、配送機、UI、遷移、音の再演出 | 可読性・反応・端末性能・操作等価性 |
| コアを保つ再編集 | square gridを内部だけに残す/graph化、道の曲線化、問題数/順番、待機の提示、tick cadence | 同じ設定の決定性、衝突・辺交換・到着の定義、解答と学習、旧版との違い |
| 新gameplay仮説 | 条件付き分岐、自由な経路描画、高低差/昇降機 | コアの面白さを強めるか、説明負担と解法探索の増加。G2とは別検証 |

最初の品質Sliceではコア変数を絞る。既存D03型の「交差へ同時進入すると衝突し、待機で順序をずらす」問題をベンチマークとして使い、解法・入力結果の比較基準にする。ただしD03をそのまま製品の最終盤面と決めない。新sceneへ載せるためにルールを意図せず変えることを避けるための基準である。

## 14. 実装計画：何を先に固定するか

今回ここに示す工程は**将来の承認後の計画**。Review用HTMLと静止画を作ったことはゲームPilot着手を意味しない。

| 工程 | 作業と成果 | 進めない条件 |
|---|---|---|
| G0 / 今回のReview | Universe方向、HakoriloのU1/U2/U3、予算帯、コア契約をHumanが選ぶ | 方向未選択、Portalとの品質差が許容できない |
| 1. Research & lock / 2–3人日 | 2台のmodel sheet、depot/junction/wait役割表、3比率のcamera graybox、入力寸法、最終描画方式比較 | 390pxで2台・共有交差・待機が識別できない。mobileが単純縮小になる |
| G1 / Art lock | 代表play frameとportrait frame、object sheet、Title/Select/Resultの組版をまとめて選ぶ | artだけ良くて経路を追えない。ここで戻す |
| 2. Quality Slice / 8–13人日 | 1つのscene、2台、route編集/待機、通常実行、失敗→修正→成功、短いTitle/Select/Result、JA/EN、無音/reduced、local隔離 | Conceptと実rendererの品質差が解消しない。rulesの因果が曖昧 |
| 3. Verify & refine / 2–4人日 | 初見5名程度の形成的試遊、端末性能、短画面/縦横/keyboard/Touch、保存方針の確認、必要修正 | 5名は統計的市場検証ではない。未実施をPASSにしない |
| G2 / Quality + Core Gate | Humanが通常プレイで「Portalから入って落差がない」「配送計画として楽しい」を判断 | スクリーンショットだけ合格、操作品質未達なら量産しない |
| 4. Production kit | 採用scene module、asset naming、material/lighting recipe、camera framing、UI states、level authoringを固定 | 一場面を作れただけで他の盤面が成立しない |
| G3 / Full-game candidate | 必要面数/学習曲線を再見積。全採用面、save version/移行、全編QAを別バッチ | 旧IDへ新問題を割当てる、暗黙save破棄、全編未評価 |
| G4 / Release | 公開版と候補の移行・rollback・Security・公開許可を別途判定 | Art承認をGit/公開許可に転用しない |

Hakoriloの12–20人日は上記1〜3の合計で、三案を実装する費用ではない。工程内の小変更ごとには承認を求めず、G1/G2は比較材料を一括提出する。量産は先に3場面（導入・共有交差・複合待機）で制作方法の再現性を確認してから進める。

## 15. 技術方針と量産境界

推奨候補：game固有scene renderer＋HTML UI＋独立した決定的rules。Hakoriloは低負荷3D/2.5Dの二案を最初のgrayboxで比較し、可読性と採用Artが実現できる方を選ぶ。3D採用やlibrary追加はこの文書だけで決定しない。既存共通board-viewへ複雑な装飾を積む方法は優先しない。

候補の初期性能予算：play scene初期transfer 6MB以下を目安、midrange mobileで安定30fps以上を最低研究ライン、60fpsを目標、触れた返事は100ms以内を目標とする。いずれも未計測の設計仮説。実機・ブラウザ・通信条件を明記して測り、device性能が足りない時は動的影/遠景/粒子の順に削り、経路・主役・入力を削らない。ネットワークやrender APIsの詳細は技術選定時に公式仕様を確認する。

量産してよいもの：検証済みasset export、色/形識別、余白とtype階層、focus/pressed/disabledの意味、pause/reduced/audio設定の契約、QA撮影の構図。

量産してはいけないもの：同じworld mesh、全作品同じpanel、同じ成功jingle、同じcamera、同じ芝生、同じbot顔。共通Runtimeは複数作品の必要性が確認されてから最小限を抽出する。先に万能engineを作らない。

旧saveは原データ保全。新版のcontent versionとnamespace、旧版を残す期間、進捗対応の有無、変換不可時の説明をG3前に設計する。読込/保存失敗、拒否、reset、破損の各ケースを検証し、旧データを新しい問題へ無断適用しない。現行saveへの書込みは今回0。

## 16. 品質Gate：一枚で欲しくなる、その先

| 判定 | 確認する具体条件 | 現在 |
|---|---|---|
| ブランド | North Starと横並びで、同じ完成度・親しみ・光の品位を感じる | Human判断待ち |
| 一枚の魅力 | 5秒程度で主役/場所/行為の関係が説明できる。posterだけ別物ではない | Concept比較可能、初見未検証 |
| 可読性 | grayscale/縮小でも2者/目的地/可動点を識別。操作中に経路遮蔽0を狙う | 最終asset・実renderer未検証 |
| 操作 | 選択/変更/実行/原因/修正を人が説明なしに辿れる。target実寸と誤入力を確認 | NOT TESTED |
| コア | 失敗理由と待つ意図を理解し、自分で修正できる | NOT TESTED。旧版のPASSを転用しない |
| 演出 | 行為→世界の応答→result、入力を妨げない。音と無音/reduced両方成立 | 提案のみ |
| 実機 | iPhone/Safari、Android中位端末、PC、短い横画面で確認 | NOT TESTED |
| 製品 | JA/EN、save、pause、失敗、mock ads、外部通信、全編contentの必要QA | 将来G3 |

生成画像の精密さは、モデルの生成能力を示すものであり、ブラウザで同じsceneを軽く描画できる証明ではない。G1でArtの魅力、G2で実際の遊びと到達品質を分けて判定する。

## 17. 今回のReview Packと根拠

一括比較は `public/index.html`、全文は本書と `public/report.html`。3案の原寸画像は `public/assets/u1.png`、`u2.png`、`u3.png`。標準画像生成built-in modeを使用。Humanが今回限定で許可した既定生成先から選定画像をrepo内へcopy。最終prompt/生成条件は `internal/prompts.json` と `internal/u3-edit-prompt.txt`、採否・由来は `internal/asset-provenance.json`。透過なし。seed・実モデルIDなどツールが返さない値はUNKNOWNとする。

source根拠：`src/prototypes/board-view.ts`、`game-r2.ts`、`game-r5.css`（共通画面構造）、`delivery-r2.ts`/`delivery-levels-r2.ts`（経路・同時移動・待機）、`light-r2.ts`（現在光と保持状態）、`rules.ts`（2者同時移動）。個別根拠は `docs/games/tiny-delivery/R2-CONTENT.md`、`light-garden/R2-CONTENT.md`、`BATCH_01_LEARNING_AND_CAUSE.md`、`GAME004_FULL_GAME_BASELINE_R1.md`、`GAME004_FULL_GAME_DESIGN_R1.md`、`GAME005_HIGH_QUALITY_MVP_BASELINE_R1.md` と最新 `GAME005_WEB_V1_RELEASE_R1.md`。Islandの動作は `game005-island/web-v1-r1/src/core.ts`。

主担当と独立read-only監査担当の実利用model IDは、この実行で確認できないため **UNKNOWN**。役割Tierや推奨モデル名を実利用IDとして記載しない。独立監査はcore境界とscope分類、主担当はVisual統合と最終検証を担当した。

## 18. QA・権限・停止点

Playbook §4.2に従い、今回の変更は隔離Review資料・静止画・閲覧用HTML・現在地の追記。ゲームsource/build/registry/依存に変更を入れない。必要QAは参照/配信、desktop/mobile表示、比較操作、画像読込、keyboard focus、外部自動通信なし、差分と既存成果の保全、対象Security。最終結果は `internal/verification.json` / `public/qa.json`。

ゲームunit/build/全57問、save/広告/runtime、音の再生、実機試遊は今回未実施。製品を変更しておらず、新ゲームは実装していないため。これらを既存証拠のPASSで埋めない。以前の技術PASSも今回のConceptの可用性保証にしない。

開始時の8,668files、ignored release配布物を含むhash、HEAD/branch/upstream/indexを保全対象に記録。既存PRODUCTION_CURRENTは今回blockを追加する以外そのまま保つ。既存Security raw FAIL17 / historical FAIL11 / S04S05 UNKNOWNを維持。今回の対象scanはcheckpoint承認の代用ではない。

Humanに必要な次の判断は、**U1を本命にしてHakorilo Quality Sliceへ進めるか、U2/U3を選ぶか、まだ品質方向を作り直すか**。このReviewの提出でゲーム本実装へ自動移行しない。Portal North StarのHuman承認は記録済み。stage / commit / push / deploy / Production変更0で停止する。
