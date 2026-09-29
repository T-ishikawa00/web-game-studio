# Tinlumo Content Trust Polish R1 / Copy Debt Cleanup R1 — Production postflight

**PRODUCTION RELEASE COMPLETE / PRODUCTION SMOKE PASS**

2026-09-27。最新Human依頼は両Reviewの公開文面差分をHuman Acceptedとし、その範囲のstage・checkpoint・private main通常push・Production deploy・smokeを明示承認した。今回release中の追加copy編集、ゲーム・保存・デザイン実装はない。

| 項目 | 検証結果 |
|---|---|
| Commit | `d8ca30c36d94f1a9272267497c993a12dd0e9f25` |
| Parent | `af7016d14c9f151a9c1136379c85de26bbe24e2a` |
| Git | main / origin/main / 実remote main一致、private、通常push、ahead/behind 0/0 |
| Worker | tinlumo-production |
| Production version | `0ae48d37-5fdc-4263-8c74-fa631f6308ec` |
| Deployment | `514e4168-3dae-4d13-b14a-faad7481b945` |
| 反映完了 | 2026-09-27 18:36:19 JST |
| Traffic | 100%。workers.dev / preview URLsは無効のまま |
| Artifact | release-artifacts/tinlumo-copy-debt-r1 — 102 files |
| 配信照合 | 101/101ファイルがHuman Reviewedかつcommit済みのbytesと一致。_headersは配信設定として除外 |
| 公開routes | 39/39 HTTP 200・content一致。不存在routeはHTTP 404 |

[deploy](deploy.json) / [cloud](cloud-postflight.json) / [配信照合](live-distribution.json) / [push](push.json) / [scoped manifest](approved-scope.json)

## 本番ブラウザーsmoke

https://tinlumo.com の通常UIを使用。save注入、加速clock、profile複製、セーブ消去なし。日英28 Portalページを実表示し、title・description・OG・alt・aria・本文を確認。descriptionとOG一致、横はみ出し0。全ゲームJA/ENルートの起動を確認。ブラウザー記録の20検証PASS、観測console error0。

| 対象 | 本番の確認 |
|---|---|
| Two Ways Home | 「Tinlumoのゲームへ / Tinlumo games」、全21面の日英読み上げ番号一致。保存管理の消去範囲説明を日英確認。最初の帰り道を右1回で成功、再読込後も1/21保持 |
| PROJECT MAGNET | ヘッダー/ハブはTINLUMO。消去確認は正式名PROJECT MAGNETで日英表示し、両方とも取消。A・区画1のcheckpointから再開、通常キー入力、一時停止応答、reload後checkpoint保持 |
| 島をつなぐ日 | 通常の木材出荷が完了し資金4→10、reload後も10。市場の配置previewで日英の「海岸沿い / 村の広場」「Coast / Village」を確認。建設は確定せず取消 |
| Hakorilo | 既存D01の北/東の矢印を復元し出発。6拍で配達成功、EN再読込後も1/18・D01保持 |
| Lightwork Garden | 保存済みL01を復元。クリア記録を残す通常の面やり直し→鏡操作で花1/1・成功。EN再読込でも解答状態を復元 |
| Consent C | 初期panel非表示・beacon0。明示許可で1、reload後1、明示撤回とreload後0。専用の撤回後network captureは欠落なしでtinlumo.comのみ。終了時は計測OFF |
| モバイル | EN Home 375×812、横はみ出し0、可視image全件ロード。viewportは元へ復元 |

IslandはAccepted仕様の保存言語優先を維持。EN routeへ移動しても保存済みJAで初期表示され、設定→Englishで英語表示/英語戻り先となる。確認後は元のJAへ復元した。音・画質・動きの設定は変更していない。

本番ユーザー向けの観測範囲で不適切なCopy Debt表現0。URL・保存key・内部ID・正当な面数・ライセンス文は置換していない。Privacy/Termsの現在の広告非配信説明はJA/EN 4ページで保持。恒常的な無広告宣伝を追加していない。

最終進化CYCLONE/RETURN、GPU停止・storage failure文、Island raw entry/移設等はHuman Accepted local QAと本番配信JSの完全一致を根拠に確認し、本番で故障や後半saveを注入していない。全編再クリア・実機/Safari・実指touch・読み上げ音声・聴感を今回PASSにはしない。全session network bufferはtruncatedのため、全通信の網羅的な負の証拠には使わない。

[browser smoke](browser-smoke.json) / [JA Home](screenshots/production-home-ja.png) / [EN mobile](screenshots/production-home-en-mobile.png) / [Magnet確認](screenshots/magnet-reset-ja.png) / [島の英語配置](screenshots/island-place-en.png)

## Securityとscope

- scoped stage/commitは**155 paths**。27 source、102 artifact、23 Review evidence、承認文書、scope manifest、Current専用block。git add .なし。独立read-only監査もindex tree・path一致を確認。
- fresh full-project ignored-inclusiveは**raw FAIL22を保持**。既知17＋同一ファイル内の既存Human判定5。追加新規候補0。full index PASS、reachable history PASS、source/distribution findings0。
- 実pre-commit hookはfresh PASS、hook bypassなし。commit後のfresh historyもPASSで通常push。
- TRR1-NEW-01–04の既存FALSE POSITIVE/NON-CREDENTIAL判定は同一性確認の範囲で保持。05はENCRYPTED LOCAL INTEGRITY METADATA / RESTRICTED LOCAL RETENTION ONLY。平文・復旧可能性UNKNOWNを維持し、別profile/別値/将来候補へ承認を広げない。
- 当該profileはuntrackedかつnot ignoredのまま。profile/TLS private keyはindex・reachable/reflog history・stage manifest・配布物から除外。候補値、断片、完全fingerprint、profile hashを証拠へ出力していない。
- scanner/hook/allowlist/例外は不変。historical FAIL11、S04/S05 UNKNOWNも変更なし。

[fresh Security](security-poststage.json) / [実commit hook](commit.json) / [prepush](security-prepush.json)

## 保全と残作業ツリー

保護対象405files、sourceと配布物hash、宣言copy差分の再構成を照合。CSS6、Cover/scene25、D1音源、Consent/保存設定/言語/Portal JS、Island engine、Hakorilo engine、headers/robots/sitemapは旧Productionと同一。3本のgame.jsは文字列変更でhashが変わるが、ソースのgameplay/save/audio処理は不変。全45 HTMLのConsent componentも同一。build設定は既存設定と明示artifact path / --keep-varsを使用。Preview workerは旧version/deploymentのまま。

旧Production101filesと旧々版84filesを保持。入口untracked **11,824 pathsは全て存在**。作業中に追加された別タスクのYouTube Audio R2 Currentメモは保持し、今回のstageから除外。対象外distribution-security.jsonも不変。新しいglobal設定・Gitルール・外部サービス設定はない。Google/Ads/CMP/YouTube/X/Reddit/夢現は変更なし。

worktreeは**C:/projects/Web Game Studio の1件、main**。index空、remoteとのahead/behind 0/0。Currentの既存/新postflight追記と旧distribution-security.jsonの未commit差分、今回対象外の多数のuntracked成果物、local Reviewを保持。release postflightはlocal記録とし、2回目のcommit/pushは行っていない。

既存QAはartifact/source一致を確認して再利用（対象型検査0 errors、root+integration276 PASS、現行Consent C8 PASS、local browser119+30、Review43、最終copy検証228）。旧analytics-consent suiteの1 PASS / 6 FAILは既知の旧fixture/旧Gate不整合で、今回の変更による新規失敗ではない。テスト修正・assert緩和はしていない。

準備時guardは並行Currentの先頭追記を検知しstage前に停止した後、その追記を保持して再確認した。git whitespace warningは既存Accepted bundleの同一行だけで、bytesを変えず記録した。postflightの6非ASCII pathはGitのC-quoted表記をdecodeして存在を確認しており、削除はなかった。

[保全/Git postflight](preservation-postflight.json) / [whitespace記録](whitespace-review.json)

Rollback参照: version aad80d7b-373b-4dc3-8026-40fbb73c14e5、Deployment 3827f5b6-87bb-4d0f-a273-3e164fcc8f98、commit af7016d14c9f151a9c1136379c85de26bbe24e2a。今回rollbackは不要・未実施。重大な起動/保存/Consent障害が出た場合は追加反映を停止し、当該版へのrollbackをHuman判断へ戻す。

実model ID: primary UNKNOWN / independent facts audit UNKNOWN。推奨Tier名から実IDを推定していない。

手順照合: [Cloudflare Wrangler Workers commands](https://developers.cloudflare.com/workers/wrangler/commands/workers/)。
