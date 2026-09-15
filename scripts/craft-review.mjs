import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {projectPath,projectRoot} from './project-path.mjs';
const out=projectPath(path.join(projectRoot,'docs/qa/tiny-craft-pilot-01')),json=async f=>JSON.parse(await readFile(path.join(out,f),'utf8'));
const audio=await json('audio-measurements.json'),cost=await json('cost-results.json'),labels={arrow:'矢印 / Arrow',wait:'時計 / Wait',undo:'調整へ / Edit route',start:'出発 / Start',arrive:'到着 / Arrival',collision:'要調整 / Bonk',clear:'問題クリア / Clear',complete:'全18問 / Signature'};
const summaries=[];for(const file of ['full-run-results.json','input-results.json','state-results.json','regression-results.json','layout-results.json','responsive-results.json','visual-contract-results.json','learning-cause-results.json','audio-browser-results.json','mode-results.json','portal/browser-results.json','review-results.json']){const data=await json(file),rows=Array.isArray(data)?data:data.results;if(!rows.length||rows.some(r=>r.status!=='PASS')||data.errors?.length||data.external?.length)throw Error('QA incomplete: '+file);summaries.push({file,count:rows.length});}
const media=await Promise.all(['A','B','C','C-alt'].map(m=>json('media-'+m+'.json')));
for(let i=0;i<3;i++)for(let m=1;m<4;m++){if(JSON.stringify(media[m][i].result)!==JSON.stringify(media[0][i].result)||JSON.stringify(media[m][i].actions.map(a=>a.label))!==JSON.stringify(media[0][i].actions.map(a=>a.label)))throw Error('Comparison input/result mismatch');}
const comparison=media[0].map((r,i)=>({id:r.id,identicalInputOrder:true,identicalResult:true,tickMs:600,interInputWaitMs:350,capture:r.capture,measuredActionTimes:Object.fromEntries(media.map(rows=>[rows[i].mode,rows[i].actions])),note:'Identical scripted delays and real-time tick. Browser automation adds variable action overhead; no claim of frame-exact wall time.'}));await writeFile(path.join(out,'comparison.json'),JSON.stringify(comparison,null,2)+'\n');
const game='http://127.0.0.1:4324',totalBytes=cost.sizes.reduce((n,r)=>n+r.addedBytes,0);
const report=`# Production System R2 Adoption + Tiny Delivery Craft Pilot 01

2026-09-15 / **Craft Pilot実装・技術QA済み、音と反応のHuman受入待ち。**

[統合Review Pack](http://127.0.0.1:4327/) / [Tiny Delivery 日本語](${game}/ja/prototypes/play/tiny-delivery/) / [English](${game}/en/prototypes/play/tiny-delivery/)。停止中なら ${String.fromCharCode(96)}npm run preview:prototypes${String.fromCharCode(96)} と ${String.fromCharCode(96)}node scripts/craft-review-server.mjs${String.fromCharCode(96)} を別ターミナルで実行。loopback限定。

## 現在地と保全

[採用Playbook](../../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md) は添付と完全一致。[現在地](../../games/PRODUCTION_CURRENT.md) とAGENTS、旧制作R1、READMEに短い参照を追加。START_HEREは不変。main / HEAD / local upstream reference ${String.fromCharCode(96)}7815bf03377e1063112406d28e404beffb017c5a${String.fromCharCode(96)}。remoteへの新規照会なし。最新dirty成果は ${String.fromCharCode(96)}.tmp/craft-before/${String.fromCharCode(96)} に保全し、54問へ戻していない。

Lightwork 18 / Two Ways 21 / Tiny Delivery 18、計57問。導入3問・学習順・光の因果反応、Portal Baseline、R5 Art/配色、直接操作、縦横/通常表示、解答・ルール・保存形式を保持。旧QAとSecurity判定も保全。今回のsource変更はTiny向けの表示/音の統合のみ。他2作品への新SFX/Motion追加なし。

主担当は実行記録で確認した **gpt-6-astra (high)**。独立読み取りレビューは **gpt-6-astra (medium)**。global設定・課金プラン変更なし。追加契約/API/素材購入費0、モデル利用量・Human工数の総量は取得していない。

## 実装と試聴

小さな玩具機械を意図した8イベント。矢印、時計、調整へ戻る、出発、到着、失敗、問題クリア、初回全18問クリア。停止/再開は無音。最終到着はclear/signatureへまとめ、毎tick・常時モーター・BGMは追加しない。代表の矢印/到着/clearは各2候補、計11 WAV。variant 0を仮採用し、variant 1をC-altで同じゲーム内比較できる素材として残す。耳で優劣を選定済みとはしない。

原本は ${String.fromCharCode(96)}src/prototypes/craft-sound.ts${String.fromCharCode(96)}、来歴は[素材台帳](../../records/ASSET_REGISTER_R1.md)。ローカルの決定的なノイズ/共鳴/エンベロープ合成のみ。外部生成・第三者素材・既存曲模倣なし。初期gain 35%は仮値、破損/読取拒否時は20%。Human試聴で最終調整する。

メニュー→設定に消音・音量。独立キー ${String.fromCharCode(96)}wgs:audio:tiny-delivery${String.fromCharCode(96)} version 1、進行セーブに新項目を加えない。破損/保存拒否/読戻し不一致は明示し、その回の設定とプレイを保つ。初回は本物の操作でAudioContext初期化/再開。拒否・非対応・音源作成/開始失敗でもプレイ継続。render/復元/resizeから発音しない。

Motionは押込み140ms、移動180ms、到着240ms、短い失敗/達成反応。判定と600ms tickはそのまま。pause/メニュー/Undo相当の調整/再起動/表示切替/page hideで世代を取消し、音は短いfadeと発音上限3。軽い操作は2音までとして結果音の枠を確保。reduced-motionでは補助演出を省略し、最終位置・待機・成功/失敗は既存の表示で伝える。

## 同条件A/B/C

D01導入・D12交差/待機・D18終盤、各432×768、同じ入力順・350ms操作後待機・600ms tick。Aは変更前の実録画、Bは新Motion/無音、Cは新Motion/SFX。異なる隔離browser contextを使い、Human保存を共有/変更しない。[入力・結果照合](comparison.json) / [A](media-A.json) / [B](media-B.json) / [C](media-C.json) / [別音候補](media-C-alt.json)。操作APIの処理時間には小さな変動があり、映像の全フレーム時刻一致を主張しない。

C/C-altは**実ゲームWeb Audio出力graphをMediaRecorderへ同時分岐**して取得した音。実測したwall-clock offsetで映像へ多重化。音を編集で再構成して付けたものではない。ただしブラウザ映像の開始時刻誤差、実スピーカー、聴感上の同期は未検証。同期/音量の判断は実ゲームURLを優先する。A/Bは意図した無音。波形/peak確認を聴感PASSと呼ばない。

## 技術QA

| 項目 | 結果 |
|---|---|
| Type check | 0 errors / warnings / hints |
| Unit | 181/181 PASS。混音headroom、厳密設定検証、順序逆転resume/拒否/開始失敗cleanupを含む |
| 通常 / Design / prototype build | PASS、18 / 62 / 26 HTML |
| Route / isolation | 7/7 PASS、公開ゲーム0・Design見本10を維持 |
${summaries.map(r=>`| [${r.file}](${r.file}) | ${r.count}/${r.count} PASS |`).join('\n')}

無音/音あり/reduced-motionそれぞれ配送18問、計54runの全中間状態・結果・保存再開が一致。mute保持、連打、同値待機、terminal重複、mock pause、表示切替、音源欠落、storage拒否/破損、visibility、初回以外の面での全クリアも確認。visibilityはsynthetic lifecycle検査であり物理スマホ背景復帰ではない。Portal既存回帰はDesign Baseline 4323と旧fixtureを使用、通常配布は4322のroute/isolation検査。

追加配布コード **${totalBytes.toLocaleString()} bytes (uncompressed)**、音ファイル追加配信/音源リクエスト **0**。[内訳・CPU測定](cost-results.json)。3音最大gainの保守的peak上限 **${audio.conservativeWorstCasePeak.toFixed(3)} < 1**。[波形測定](audio-measurements.json)。音色の聴感・疲労の証拠にはならない。

CPUはD01同条件をA/B/C各3回・順序回転し、読み込み後のrenderer TaskDurationを測定。中央値ms: ${cost.summary.map(r=>r.mode+' '+r.medianRendererTaskMs.toFixed(1)).join(' / ')}。小標本のdesktop実測で、audio worklet/デバイス処理を含む総CPU・電池・mobile性能ではない。負荷の増減を断定しない。

## 自己レビュー・失敗記録

独立レビューの3件を修正: 古いresumeが新しい入力を停止する競合、resume拒否時の利用不可表示、source.start失敗時のnode/voice残留。遅延Promiseを逆順に完了する試験、拒否後回復、開始失敗6連続後の回復で確認。実機iOS検証への読み替えなし。

QA初回の失敗は ${String.fromCharCode(96)}.tmp/craft-qa/${String.fromCharCode(96)} に保全。既存解答JSONのtick格納位置/第2矢印を読み違えた撮影/計測script、初期矢印値の固定assertion、signature終了前の350msでの残音検査を修正。layout suiteの比較fixture不足を既存基準から補い、Designカードを前提としたPortal suiteは誤指定した通常4322から正しい4323へ変更。製品のルールや受入条件をテスト都合で緩めていない。

## Security / 保全 / 停止

[Security検証](security.json): raw allは既知1件のFAILを維持、限定 **FALSE POSITIVE / NON-CREDENTIAL / APPROVED** を現物再確認。新規候補0、既存full index scan PASS（stageした意味ではない）、scanner/allowlist変更なし。値を出力せずprovider照会なし。[保全・差分](preservation.json)。大量の反復スクリーンショットはignored ${String.fromCharCode(96)}.tmp/craft-qa/${String.fromCharCode(96)}、Reviewには代表6画像・短い映像のみ。

**stage / commit / push / deploy / 実広告 / 外部サービス接続 / 購入 / 外部送信なし。** 次の明示承認までは実行しない。受入後は既存導入改善とCraft Pilotを識別できるcommit単位として保存する提案を行う。

## Humanレビューと残課題

聴感、音色選定、繰返し疲労、物理スマホ/Safari/Firefox、外部初見、全編ゲーム性、法務・公開・実広告は **NOT TESTED / PENDING**。初期gainとvariantは暫定。

手元の方式では録音由来の木/玩具素材の質感や端末スピーカーでの聞こえを検証できていない。特に短いarrowの刺さり、arrivalの重量感、signatureの独自性と繰返し疲労を評価対象に残す。不足がHuman試聴で具体化した場合のみ、該当音の録音素材/限定sound designer review/外部生成を比較して費用・許諾を別承認にまとめる。今回は契約・API利用・権利を推定しない。

初見: 制作に関わっていない成人の協力者をHumanが手配し、別browser profileでD01→D12を説明なしで試す。最初に触る対象、最初の成功、誤操作、retry、待機の理解を観測し、教えた時点を記録。録画は本人同意がある場合のみ。自動QAと既存Humanを初見人数に数えない。

実機: Humanの端末で届くローカル試遊手段の別確認が必要（現URLはこのPCのloopback限定）。スマホ実機を装わない。確認時は縦横、矢印/時計、消音/音量のreload保持、ロック/タブ切替→復帰、mock pause、連打→調整を短く試す。外部公開やトンネル作成は未承認。

## 動画Hook案（投稿未実施）

- JA 1: 「時計を1つ変えるだけ。ふたりの配達、ぶつからずに通せる？」D12の待機編集→交差→到着、実ゲーム5〜10秒。
- JA 2: 「近道が正解とは限らない。最後の配達、何拍待つ？」D18の経路と時計→最終交差。未実装の演出や架空の成功率を足さない。
- EN 1: “One tiny clock. Two deliveries. Can you make room for both?” D12, actual wait edit → crossing → delivery.
- EN 2: “The shortest road isn't always the answer. How long would you wait?” D18, actual route and clock setup → crossing.

観測した流入/再訪/収益はまだない。投稿・募集・外部送信・広告費は今回実行しない。
`;
await writeFile(path.join(out,'REPORT.md'),report);
const videos=(id,i)=>`<section><h2>${id} · ${['導入 / Opening','交差と待機 / Crossing','終盤 / Finale'][i]}</h2><div class="grid">${['A','B','C'].map((m,j)=>`<article><h3>${m} · ${['現行の無音','新Motion・無音','新Motion＋SFX'][j]}</h3><video controls preload="metadata" playsinline ${m!=='C'?'muted':''} src="videos/${m}-${id}.webm"></video></article>`).join('')}</div><button class="compare">3本を先頭から比較</button><p class="small">音の同期評価は試遊URLを優先。全動画は同じ問題・入力順・600ms tick。撮影操作の処理時間には変動があります。</p><details><summary>C-alt：別の音候補（Motion・ルールは同じ）</summary><video controls preload="metadata" playsinline src="videos/C-alt-${id}.webm"></video></details></section>`;
const html=`<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Tiny Delivery · Craft Pilot 01 Review</title><style>body{margin:0;background:#f4f6f7;color:#172533;font:16px/1.65 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:32px 24px}header,section{background:white;border:1px solid #d5dee4;border-radius:12px;padding:24px;margin-bottom:24px}h1{font-size:32px;line-height:1.25}h2{font-size:22px}h3{font-size:16px}a{color:#185aa5}nav{display:flex;flex-wrap:wrap;gap:16px}.badge{font-weight:700;color:#65450a;background:#fff1c9;padding:8px 12px;display:inline-block}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}video{display:block;width:100%;max-height:450px;background:#e7f1f7;border-radius:7px}details video{max-width:300px;margin-top:14px}audio{width:100%}.small{font-size:13px;color:#465c6c}button{padding:10px 16px;border:1px solid #687e8d;border-radius:6px;background:white;color:#172533;cursor:pointer;margin-top:12px;font:inherit}table{border-collapse:collapse;width:100%}td,th{text-align:left;padding:8px;border-bottom:1px solid #dce3e8}.sounds{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.sounds article{background:#f4f6f7;padding:12px}summary{cursor:pointer}li{margin:8px 0}@media(max-width:680px){main{padding:12px}header,section{padding:16px}.grid,.sounds{grid-template-columns:1fr}video{max-height:520px}h1{font-size:26px}}</style><main><header><p>WEB GAME STUDIO / PRODUCTION SYSTEM R2</p><h1>Tiny Delivery<br>Craft Pilot 01</h1><p class="badge">実装・技術QA済み / 音と反応のHuman受入待ち</p><p>R5 Art、直接操作、3表示、現行57問と導入改善を保全。Tiny Deliveryだけに音と必要な動きを追加しました。</p><nav><a href="${game}/ja/prototypes/play/tiny-delivery/">日本語で試遊</a><a href="${game}/en/prototypes/play/tiny-delivery/">Play in English</a><a href="REPORT.md">詳細・QA・来歴</a><a href="preservation.json">保全</a><a href="security.json">Security</a></nav><p class="small">☰ → 面一覧 → 01 / 12 / 18。☰ → 設定で消音・音量。既存保存を続けたい場合はそのまま遊べます。別状態で比較するなら別browser profileを使用。</p></header><section><h2>今回見てほしい3点</h2><ol><li>Bの動きで操作→移動→到着を追いやすくなったか。</li><li>Cの音が理解・達成感を助けるか。音量が大きいだけで判断しない。</li><li>繰り返したときの矢印音、到着音、短い達成音が疲れないか。初期35%は仮値。</li></ol><p>聴感・実機・初見・全編ゲーム性・公開は未受入。Cは実Web Audio信号の同時収録ですが、スピーカーと聴感上の同期は未検証です。試遊URLでの確認を優先してください。</p></section>${['D01','D12','D18'].map(videos).join('')}<section><h2>代表SFXと比較候補</h2><p>自作合成・同じ初期gain。0は仮採用、1は比較候補。音を最大peakへ揃えていません。個別再生の音は実操作に同期した証拠ではありません。</p><div class="sounds">${audio.rows.map(r=>`<article><b>${labels[r.id]} · ${r.variant}</b><audio controls preload="metadata" src="${r.file}"></audio><small>${Math.round(r.durationMs)} ms</small></article>`).join('')}</div><p><a href="audio-measurements.json">波形測定</a> · <a href="cost-results.json">サイズ・リクエスト・CPU実測</a> · <a href="comparison.json">A/B/C条件と入力時刻</a></p></section><section><h2>QAと残る判断</h2><table><tr><th>技術</th><th>結果</th></tr><tr><td>全57問 / 配送18問×3音・動き条件</td><td>PASS / PASS</td></tr><tr><td>Unit / 型 / 3 build / 隔離</td><td>181 PASS / PASS</td></tr><tr><td>日英・3表示・保存・停止復帰・mock</td><td>PASS（desktop自動QA）</td></tr><tr><td>追加配布bytes / 音源request</td><td>${totalBytes.toLocaleString()} bytes / 0</td></tr><tr><td>Secret</td><td>raw既知1候補。限定承認維持、新規0</td></tr><tr><td>聴感・実機・初見・全編・公開</td><td>NOT TESTED / PENDING</td></tr></table><p><a href="REPORT.md">全QA・自己修正・初見/実機手順・日英Hook各2案</a></p><p>短いクリックの刺さり、到着の重量感、Signatureの独自性はHuman試聴待ち。外部音源API・契約・購入は利用していません。stage / commit / push / deployなし。</p></section></main><script>for(const b of document.querySelectorAll('.compare'))b.onclick=()=>{const videos=b.parentElement.querySelectorAll('.grid video');for(const v of videos){v.currentTime=0;v.play().catch(()=>{});}};document.addEventListener('play',e=>{if(e.target.tagName==='AUDIO')for(const a of document.querySelectorAll('audio'))if(a!==e.target)a.pause();},true);</script></html>`;
await writeFile(path.join(out,'REVIEW.html'),html);console.log('Review generated',summaries.length,'QA suites');
