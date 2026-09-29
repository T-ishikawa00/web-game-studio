# Chanbara R1 Root Cause Audit

2026-09-28 · **ROOT_CAUSE_AUDIT_READY / HUMAN_PROCESS_GATE_PENDING**

**結論：入力・接触を確かめる限定試作の契約に、既存TinlumoのVisual方向と「Quality Slice」という成果名が結び付いた。新作の完成像を画像で採用する工程がなく、仮のArtと1vs1の核が、次のProduct Directionにも見える形で提出された。**

これは旧Craft文書が同じ見た目を強制したという監査結果ではない。根拠が強いのは「旧依頼 → 実際の読込 → 専用実装 → 評価・報告」の経路。心理的な影響量、旧Artの直接コピー、全内部思考は断定しない。

## 0. 方法・現在の判断

最初にcwd/Git root、現行Current、Security、必要な工程節、R1 report/source/台帳、旧chat「一人称マウスチャンバラを試作」と原依頼をread-onlyで確認した。独立read-only担当はR1と原依頼を別に確認。旧資料はAUDIT ONLYであり、新BriefのCreative参照にしない。監査後に本packと新規標準を作成した。

最新Human判断は、R1を **CHANBARA_R1_TECH_RESEARCH_ONLY / NOT_VISUAL_AUTHORITY / NOT_GAME_FEEL_AUTHORITY / NOT_PRODUCT_DIRECTION** とすること。R1 source・素材・QA・録画・旧報告は保存する。

分類：**FACT**＝原資料の明記、**OBSERVED**＝今回確認したread trace／source／実物の構造、**HYPOTHESIS**＝影響の推測、**UNKNOWN**＝証拠不足。根拠の原文抜粋・旧traceは [Historical Evidence](HISTORICAL_EVIDENCE.md)。

## A. なぜ旧Tinlumoに近いVisualへ寄ったか

| 分類 | 確認したこと | 含意 |
|---|---|---|
| FACT | 旧依頼§2、原文32行が「Tinlumo North StarとRemasterの制作上の学習」を指定 | 新作への入口で、保全・工程学習とCreative参照が分離されていなかった |
| FACT | 旧依頼97〜103行が現行Tinlumo品質思想、明るい小さな稽古場／玩具的闘技場、柔らかな照明、三方向選考へ戻らない一候補を指定 | Visualの寄り方はrepoだけから自然発生したわけではなく、当時の依頼にも具体的な誘導がある |
| OBSERVED | 旧main threadでNorth Star README/REVIEW、Remaster Magnet QUALITY_GATEの読込実行がある | Creative情報が到達した具体的な経路。読んだことと直接流用したことは別 |
| FACT | 同じ旧依頼98行は「仮設計」「新ブランドや正式タイトルの採用ではない」とも明記 | 当時の試作方向を今後の製品正本へ持ち越す根拠はない |
| HYPOTHESIS | 既存で表現可能な小型・柔らかい・proceduralな見せ方が、暫定手段から品質の既定値へ移った可能性 | Accepted画像を先に固定しないと、作りやすさが完成像を決めやすい |

当時の固定視点・1体ずつの短い連戦はHuman指定だった。今回の新方向とは異なるが、これ自体を実装者の独断や指示違反としない。問題は、**技術研究としての完成と製品品質としての到達を別名・別Gateで提示しなかったこと**。実装担当には、この差を見える形で示す責任がある。

## B. 参照・影響の経路

| 資料／source | 証拠 | 今回の評価 |
|---|---|---|
| root AGENTS、Current | 旧traceで読込。AGENTS旧12行は既存R5/Craftの保全を要求 | KEEPのAuthority。新作へ同じArtを適用する命令ではない。保全と参照の明示分離が不足 |
| START_HERE §6〜7、Playbook §1〜2 | 旧traceで該当節を読込 | 旧工程にも作品の個性、動画、Human gateがある。資料そのものがtechnical-onlyだったとは言えない |
| `tinlumo-north-star-r1/README.md` / `REVIEW.md` | 旧traceの `exec-3c73654d...` / `exec-86fdb785...`。READMEは冒頭110行read指定、REVIEWは冒頭78行read指定 | 既存Remasterの品質・表現文脈が届く経路。新作専用画像の採用記録は無かった |
| `tinlumo-remaster-wave1/magnet/QUALITY_GATE.md` | 旧traceで冒頭100行read指定（実物は短い文書） | 過去作品の見せ方と品質評価が混在。ただし同9行には「buildやdraw callsで弱いvisualは救えない」という反証もある |
| R5 / Tiny / Lightwork / Two Ways Craft本文 | 確認した旧main-thread command traceに直接読込の証拠なし | UNKNOWN。router上の存在だけで影響を確定しない |
| R1 `src/main.ts:1–4`、`src/art.ts:1–3` | ローカルcombat/art/sound/input、Three.jsとlocal geometry/combatのimport | 既存ゲームArt componentの直接importは見つからない。見た目が似ることはコードコピーの証拠ではない |
| R1 `scripts/build.mjs:6–8` | `game005-island/node_modules/three` を解決 | 描画ライブラリのINFRA利用。Islandの造形やpaletteのimportではない |
| R1 `src/art.ts:5–10,40–55,62–99` | 固有palette、Box/Sphere/Cylinder helpers、柔らかな光、円筒・球の人物、床／竹／柵／門 | proceduralな表現はOBSERVED。過去パターンの模倣や直接継承の因果はHYPOTHESIS |
| 既存build / tsconfig / browser QA / verify | 旧traceで読込 | 技術基盤・保全方式の再利用として合理的。これだけでVisual汚染としない |

原資料への入口：R1 report（参照原本はPrivate保全・候補には非同梱）、art source（参照原本はPrivate保全・候補には非同梱）、main（参照原本はPrivate保全・候補には非同梱）、build（参照原本はPrivate保全・候補には非同梱）、独立レビュー記録（参照原本はPrivate保全・候補には非同梱）。行番号は監査開始時の版。

## C. なぜ「Quality Slice」がmechanics中心へ処理されたか

**FACT:** 原依頼の表題はCore Feel / Quality Sliceの併記。原文5行の作業順は短い調査→入力・判定設計→隔離試作→自己調整→QA→Human Review。14行は1体とのやり取りの仮説、49〜51行は同時1体と大量敵等の後回し、35行は技術調査に絞り、103行はConcept三方向の選考へ戻らない指定だった。

**OBSERVED:** R1フォルダには入力・戦闘・描画・音・QAがある一方、新作専用のAccepted画像、Visual Bible、Final Productとの対応表は確認できない。`internal/local-ledger.json` は番号と保全の台帳であり、Creative採用台帳ではない。

**HYPOTHESIS:** 「小さく作る」が範囲の制約だけでなく、実装可能な一候補を整えればよいという品質解釈へ結び付いた。仮のArtは内部改善したが、比較すべきFinal Product画像がなく、主要評価がinput/collision/parryに集中した。

**反証:** Playbook旧65〜78行は核H1と品質H2を分け、H2には初動理解、中後半の深さ、操作・音、縦動画を要求する。旧資料に品質の概念が無かったのではない。今回の契約でその役割が再整理されず、名称だけが重なった。

**修正:** 技術研究はTECHNICAL RESEARCH ASSETへ固定。新作Creative GateはGOLD CRAFT SLICEとし、実装前にHuman Accepted画像と作品専用Bible、実装後にFirst Impression / Shorts / Human Craft Gateを要求する。

## D. なぜ技術QAがCraft判断より強く見えたか

**FACT:** R1 reportの最終Human質問は操作感、弾き反撃、再挑戦の3点で、旧依頼152〜155行と一致。独立レビューはinput/collision/lifecycleと証拠解釈が範囲だった。初期画面の魅力、旧作との差、Shortsでの理解、Final Productへの期待を独立に回収する設計ではなかった。

**OBSERVED:** 旧finalは最初にPlay URLと実画像を出している。従って「報告が最初からテストだけだった」とは言わない。ただしその後の大きいPASS表と技術説明に対し、Craftの弱点は主にバランスと手触りへ狭められていた。Current冒頭も16/16等のQAと保全を強く報告している。

**FACT:** R1 reportは楽しさ・聴感・物理マウス・初見・市場性を未確認として残した。技術QAをHuman採用へ偽装した証拠はない。しかし、未確認と添えるだけでは、作品として弱い第一印象を自ら止める判定にはならない。

**HYPOTHESIS:** 定義・自動検証しやすいinput/collision、media decode、数値を成果の中心に置き、作品としての到達点を「Humanが後で決める」に寄せた可能性。技術評価とCreative self-reviewの担当範囲が分離されていなかった。

**修正:** What it is／変化／Play／画像・映像／Craftの6問／既知のvisual・gameplay懸念を先に報告。Codexも第一画面・3秒・15秒を見て、弱ければCREATIVE NOT READYを明記する。技術件数は必要な裏付けとして残す。

## 再発防止と観測限界

| 対策 | 実装する文書・入口 |
|---|---|
| 必要最小Read Set、A/B/C、specific import、AUDIT_ONLY | [Firewall](../../planning/GREENFIELD_VISUAL_CONTEXT_FIREWALL_R1.md)、AGENTSのGreenfield入口 |
| 画像選択→新作Bible→Gold→Human→Full | [Creation System](../../planning/TINLUMO_NEW_GAME_CREATION_SYSTEM_R1.md)、Playbookの新作専用補足 |
| 第一印象、未編集実プレイ、Shortsと6問 | [Gold Standard](../../planning/GOLD_CRAFT_SLICE_STANDARD_R1.md) |
| 008/009でも同じ境界を再現 | [Start Template](../../planning/NEW_GAME_CODEX_START_TEMPLATE_R1.md) |
| R1の保全と新作への非継承 | Currentの最新判断、[Chanbara Phase 0](../../games/chanbara-restart/PRODUCT_ROLE_R1.md) |

制作時間配分、全内部推論、各資料の心理的な寄与率、旧作品との視覚類似度の定量測定はUNKNOWN。今回は映像の再制作・R1の再試遊・全旧作品画像比較をしない。旧作品を監査用に列挙したことを、新案の視覚参照に転用しない。

独立read-only監査の指定model IDは `gpt-6-astra`（spawnの指定値）。主担当の実行時model IDと独立したruntime telemetryは取得できずUNKNOWN。役割名や推奨名を観測値として埋めていない。監査担当に書込み・外部操作・採用の権限は委任していない。
