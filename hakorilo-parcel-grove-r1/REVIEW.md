# Hakorilo · Parcel Grove — Quality Slice R1

2026-09-27 · **D03 / D18の実操作版。Human Quality Slice Gate PENDING。**

今回のHuman判断対象は「Portalから入って、この実ゲームでも品質が落ちたと感じないか」。U1 Conceptの採用を取り消したり、旧SVG案へ戻したりする工程ではない。生成targetと、実ルール・実入力・実状態遷移を持つ画面を比較する工程である。

Local Review: `http://localhost:4404/`。Play: `http://localhost:4404/play.html`。QAは主に`127.0.0.1:4404`を使用したため、Human用`localhost:4404`の進捗とはoriginで分離される。どちらもloopbackのみ。旧版比較は`127.0.0.1:4405/host.html`の隔離コピー。

## 1. U1 North Star target

`public/assets/u1-target.png`と`portal-target.png`は前工程の承認方向を保全した参照画像。今回のgame runtimeはこの画像を背景や盤面として読み込まない。道・courier・家・木・崖・矢印・時計は実geometryで構成し、通常の状態変化で実際に動く。

維持する品質思想は、温かい小さな配送村、素材の違い、柔らかい光、触れそうな厚み、明るい余白、控えめな愛嬌。現実装では、連続した複雑な地形や非常に密な葉・石の細部をConceptより整理している。**Conceptと実ゲームが同等に魅力的かはHuman判定。画像生成の品質を根拠に実ゲームPASSとはしない。**

## 2. Selected technical route

**Three.js 0.186.0 + HTML controls**を採用。7ルート比較と理由は`TECHNICAL_ROUTE.md`。既存SVGを装飾する方式から、PBR・実体カメラ・geometry・光・shadow・AO・実状態motionを持つ方式へ変更した。Threeはrepo内の既存導入を利用し、新しい依存導入・有料asset・外部CDNはない。

## 3. Current Hakorilo

既存release artifactのindex / JS / CSS / musicをbyte-identicalで隔離コピーした。hostはnormal D01 bootと既存checkpoint protocolだけを使い、既存の面一覧からD03/D18へ移動した。旧版と新Sliceを同じ1440×1000、375×812で撮影。比較画像のstage、initial edit、localeを揃え、偽の完成盤面は作っていない。

旧版は情報効率のよいflat board。新Sliceは石の道、配送所、荷物を載せた配送機、草地と崖、物理的な時計、独立HUDへ構造を置換した。旧版のrule/solution/saveを悪いものとして捨てたわけではなく、見た目の役割を分離している。

## 4. New Title impression

大きなHakorilo wordmark、Parcel Grove副題、短い導入、実際の3D世界を使う。背景をAI Conceptへ置き換えず、ゲームと同じ材質・光・courierを見せる。desktopではcopyと世界を左右に配置し、mobileではtitle→world→actionの縦構成へ変更。ContinueはこのSlice内の保存面がある場合だけ表示する。

## 5. Level Select preview

D03「交差点でどうぞ」とD18「最後の配達」を実描画のthumbnailで選ぶ。全18という構成と既存cleared IDを維持し、他16面を偽の完成在庫・偽のclearとして表示しない。previewが2面だけであることを明記。D18を試せることと、全18面をクリアしたことは別。

## 6. D03 playable

5×5の正本セル、crossing、2台、editable arrows 11/7、wait cell 11を維持。初期wait0はtick2/cell12でcollision。1拍待機ではBが4拍、Aが5拍で到着する。待機時計は道と線で結ばれた道端の操作物として表示し、判定は元のwait cellに残す。

通常入力で、初期失敗→道を直す→時計変更→dispatch→staggered arrivals→successを検証。routeを完成状態へ注入するUIはない。候補にsolution JSONは配布しない。

## 7. D18 density / playable

7×7、二つの共有交差cell23/25、4 editable arrows、2 clocks、固定矢印37/39をそのまま表示。editableは丸い台座、fixedは路面の刻印で区別。道路のない位置へ走った場合は壁失敗で、装飾によって別の通行路を示唆しない。

authored configurationはarrows `[2,2,0,1]` / waits `[2,0]`。Bが8拍、Aが9拍で到着。近道+wait2の衝突、近道+wait1の別解、待機場所を変えた衝突も正本で検証する。視覚上の移動順が同時intent判定を置き換えることはない。

## 8. Desktop

1440×1000 / 1280×900。orthographic cameraは奥行きを持たせながら道路のセルを読める角度で固定。HUDは上部にstage・2台の到着状態、下部に最小限の操作。大きいパネルで世界を囲わない。配送所はA/B roof IDと色を併用し、色だけに依存しない。

## 9. Mobile

430×932 / 390×844 / 375×812。desktop縮小ではなく、yawをほぼ正面、俯角を深くし、横7セルと左右操作物を確保。全editable targetは44×44 CSS px以上。最小幅で時計と矢印の領域が重なったため配置を修正し、両面×日英×5サイズの20条件を再検証。最終結果は重なり0・画面外0・横overflow0。

これはWindows Chromiumのviewport検証。**物理iPhone / Android / Safari / 指によるtouchはNOT TESTED。** 少なくとも今回の必須幅の密度判断はHumanに提示できるが、全mobileでの性能保証ではない。

## 10. Motion

| 状態 | 表現 | 時間 / 制約 |
|---|---|---|
| 編集 | 台座の短いfocus feedback、矢印の即時変更 | input140ms以内、判定は即時 |
| Dispatch | start cue、1拍後に一斉走行 | canonical600ms/tick |
| Move | 隣接セルへのease、わずかな上下/lean | 180ms。scheduler非依存 |
| Turn | 現在方向から次方向へ短く回頭 | travel内、追加待ちなし |
| Wait | 停車の小さなlean、実remaining 2→1→0を車上表示 | 車は元セルのまま |
| Collision / conflict | 最後の合法位置で小さな接触反応、拒否セルのring | 約300ms以内、即retry可 |
| Failure | 原因の短文、道を直すaction | 長い罰・カメラshakeなし |
| Retry | runだけ破棄し編集設定保持 | 押した時点で操作再開 |
| Arrival / success | 小さなsettle / bounce、短い光粒、配送完了表示 | 180ms移動後にresult、長い演出待ちなし |
| Stage | 世界の短い立ち上がり | 約240ms、入力をblockしない |

Reduced motionでは世界とCSS双方を抑制し、essential stateは即時表示。pause/settings/hidden/resize/level/retryで旧callbackをcancel。terminal結果はcancel後も確定表示する。音や演出の完了を成功判定の条件にしない。

Reviewには通常操作から録画したscene映像も添える。映像はcanvasの実時間captureで、UI文字と音声は含まない。冒頭12秒をstream copyし、結果後の待機だけを切り落とした。元録画はinternalに保存。速度・frame・ゲーム状態は変更しない。音と操作全体はPlayで確認する。

## 11. Failure

wall / boundary / wrong depot / collision / swap / loop / safety limitを元のengineで判定。failure cellを強調して原因を短く表示。特にD18の中央交差を装飾の岩が隠さないよう、装飾の配置を道路セルとの距離で除外した。

## 12. Retry

「道を直す」は同じarrows/waitsのままrunを破棄。「最初に戻す」は確認dialogを経てinitialBoardへ戻す。clearedは消さない。pause後の「1拍進む」はちょうど1tick。「やり直す」と進捗全削除を混同しない。

## 13. Success / result

最後の配達到着後に短いresultを表示。D03からはD18へ、D18からは面選択へ戻る。D18成功だけで全18面completeを宣言しない。終端直後のblur/resize/settingsでも透明resultが残らないよう独立reviewで修正した。

## 14. Sound

accepted Tiny Craft R2は**SFX + BGM B / D1 Minimal Toy Electronic**。Two WaysのBGMなし判断を流用しない。今回、新しい音源・有料asset・権利不明素材は導入していない。

| イベント | 今回 | Polish判断 |
|---|---|---|
| select / arrow / wait | accepted variant0 | 物理台座への短い反応として再利用 |
| dispatch | accepted start | courier出発の軽い合図 |
| 通常move / wait countdown | 無音 | 毎拍clickを追加するとaccepted静けさを損なうため維持 |
| destination | accepted arrive、BGM duck | 最終到着はclearへcoalesce |
| collision / failure | accepted collision | 罰ではなく、短い修正の合図 |
| success | accepted clear / 全18時だけcomplete | 視覚反応と短く同期 |
| BGM | accepted B.wavと同一hash | 96秒、default .18、max .5、SFX .35 |

master mute、個別gain、trusted gesture、単一music source、同時SFX最大3、pause/hidden/exit/terminal停止を維持。音の機能QAとHuman聴感は別。新しい素材感に合わせて将来音色を作り替える場合も、最初に3イベント程度のAB試聴Gateを設け、一括差替えしない。

## 15. Cover candidates

**A：Village invitation** — D03の実sceneを大きく見せる横長案。村・2台・配送所・道が一緒に読み取れ、Portalからの入り口向き。推奨。

**B：A thoughtful journey** — D18の実sceneを使う縦長案。密度と経路の面白さを伝えるcollection card向き。小さい一覧ではD03より情報が多い。

両案とも実sceneのcapture＋文字組み＋CSSの縁マスク。元PNGのretouchはなく、gameの世界を足し描きしない。AI ConceptをCoverにしない。未実装物、別のキャラクター、存在しない道・光景を追加しない。Cover採用はHuman PENDING。

## 16. Performance / QA evidence

型check・isolated bundle build・canonical24 tests＋互換9 testsの**33 tests PASS**。D03全48設定/2成功、D18全144設定/11成功、全18保存roundtrip、別game namespace維持、非Slice現面、corrupt原文保持、quota/readback/reset失敗を検証。これはUI全体のPASSとは別。

候補browserは、通常play、20 responsive/locale条件、pause/step/retry/settings、音・保存済みOFF、新session、reduced motion、入力境界、反復resource、networkを確認。詳細・実測値はReviewのQA欄と`internal/browser-qa.json` / `public/qa.json`に記録する。通信はlocal originに限定。実機やHumanの視覚/聴感を自動PASSにしない。

Windows Chromium / DPR1で、D03の1440×707 canvasは直近1,800描画の間隔median16.7ms / P95 16.8ms、約60fps相当。これはCPU/GPU個別処理時間ではなく、requestAnimationFrameの描画間隔であり、mobile実機benchmarkではない。Three renderer.infoは314 draw calls / 約164万trianglesを記録し、shadow・AO等の複数passを含む。品質の試作としては動作するが、低価格mobile向けの負荷予算としては高い。量産前に品質を保ったgeometry削減、LOD、shadow/AO tier、preserveDrawingBufferのcapture時限定化を評価する。

20回のfailure→retryでgeometry38〜39（failure ring有無）、texture18が増加しないことを確認。その後、scene exportの背景をcanvasに含めるため固定sky textureを1枚加え、最終版は19。20回の結果を最終版texture19で再計測したとは表記しない。history戻りはnavigationとして再起動を確認できたが、BFCache復帰はブラウザーが使わずNOT EXERCISED。native multi-touch送信は当該ブラウザーAPI非対応のためNOT TESTED。

独立read-only reviewのP2 5件を修正し、source再reviewでは未解決blockerなし。実利用model IDは主担当・独立担当とも**UNKNOWN**（toolから確認可能なIDなし）。推奨モデル名を実利用証拠の代わりにしない。

## 17. Known limits / Human Gate

- 今回はD03/D18だけ。全18面のcamera/造形/QA量産、registry差替え、公開版への統合は未実施。
- Conceptの細密度・自然な植物/石肌に対し、runtimeは読みやすさを優先した整理された造形。これを十分なpremium品質とするかはHumanが判断する。
- DOM操作・keyboard・live statusはあるが、screen readerによる全パズル体験の受入は未実施。44px達成を全体accessibility合格としない。
- 物理mobile、Safari、thermal、low-end GPU、context-loss recoveryの機種横断評価はNOT TESTED。PCMの本番配信用圧縮も未実施。
- 録画はscene only。Humanの聴感・motion品質判定は実プレイを推奨。
- Portal本体、既存公開5ゲーム、過去Security証拠を変更しない。新候補scoped scanと過去raw FAIL17 / historical FAIL11 / S04S05 UNKNOWNを分ける。

**Humanに必要な判断：** ①Portalから入って品質差が許容できるか、②D03で配送機・待機・成功が気持ちよいか、③375px D18で道・矢印・時計・目的地が迷わず読めるか。この3点の明示承認があるまで全18面へ拡大しない。

## 18. Full 18-stage rollout estimate

見積りは設計判断で、実績納期・売上returnではない。経験のあるengineer＋3D/UI担当、既存ルール/音維持、新mechanicなしを仮定。1人日=実作業6〜8時間の概算。Human iteration待ち時間は別。

| 次の作業 | 概算 | 固定・成果物 |
|---|---:|---|
| Slice Human修正 / asset標準化 | 3–5人日 | courier、depot、road、clock、植生、light、low tier予算 |
| 残16面のcomposition | 6–10人日 | 各面の遮蔽/目的地/待機同居、3 sizes以上 |
| title / full level select / progression統合 | 2–3人日 | 現行save完全保持、resume/失敗復旧 |
| motion / sound仕上げと素材packaging | 2–3人日 | lifecycle・PCM圧縮比較・権利台帳 |
| 全18 rule/input/save QA＋実機検証 | 4–6人日 | iOS/Android tier、性能退行、通常全編 |
| Human差戻し余白・release候補pack | 3–5人日 | 再review、cover、配布検証 |
| **合計** | **20–32人日** | 並行可能な2人なら概ね3–5週＋Human待ち |

**Gate順：** 今回Quality Slice → asset/camera基準固定 → 密度が異なる数面で展開確認 → 全18の技術/視覚/聴感/実機review → 別途release承認。利益はブランド整合性・Coverと実体の一致・将来stage制作の再利用性。CVR/retention/revenue効果はUNKNOWN。

今回ここで停止：U1 TECHNICAL ROUTE SELECTED / D03 PLAYABLE READY / D18 DENSITY REVIEW READY / TITLE・LEVEL SELECT・RESULT READY / DESKTOP・MOBILE REVIEW READY / MOTION・SOUND REVIEW READY / COVER REVIEW READY / PERFORMANCE REPORT READY / FULL REMASTER ESTIMATE READY / **HUMAN QUALITY SLICE GATE PENDING**。

stage / commit / push / deploy / Production / Cloudflare / external publish / purchase / account変更は0。古いHistoryや以前の単発承認を今回の実行権限として再利用しない。
