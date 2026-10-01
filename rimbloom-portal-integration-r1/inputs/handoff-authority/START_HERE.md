# RIMBLOOM — Human Accepted Release Handoff R1

Human評価：「正直最高におもろい。俺はとても好き。」

RIMBLOOM_FULL_GAME_R1_HUMAN_ACCEPTED / CORE_FUN_HUMAN_ACCEPTED / CHAIN_FEEL_HUMAN_ACCEPTED / FULL_GAME_PRODUCT_ACCEPTED を確定。最新Authorityは HUMAN_ACCEPTANCE.json。過去ReviewとQAのPENDINGは当時の証跡として evidence/pre-acceptance に保持。

Release baseline SHA-256: `b25d2a4ac01c3d073bff24a80d8d6bc80b33c8ad93d9c45055be892c3959c0e6`

## このpackで渡すもの

- game007-full-r1: Human Acceptedのproduction用ゲームsource9ファイル。Visual・Audioはすべてcode-native。
- dist: そのsourceとbyte-identicalのstatic runtime。runtime9ファイル合計51,448bytes。manifest.jsonは検証用。
- GAMEPLAY_PARAMETERS.json / JA_EN_ACCEPTED_COPY.json: パラメータと受け入れ済みUI copy。
- catalog/ja-en.json: Portal用title / description / controls / alt text候補。
- assets: 16:9 coverとsquare thumbnail候補、編集可能なcode-native原稿。実際のPortalサイズは統合側で確認。
- docs: build、save、audio、requirements、accessibility、known limitations、QA、Portal統合要件。
- evidence: 選定動画、画像、capture時sourcehash、独立QA、pre-acceptance Review。
- game007 / game007-accepted-prototype-r1: 独立回帰試験用の原型coreのみ。公開runtimeへ混ぜない。

## Local verification

Node v24.14.0で検証。追加依存0、npm install不要。

```powershell
cd "C:\projects\App 007\rimbloom-release-handoff-r1"
npm run verify
npm run build
npm test
npm run preview
```

Preview http://127.0.0.1:4188/ ／ Handoff http://127.0.0.1:4188/handoff.html 。既存4177／4187と分離。previewはloopbackのみ、QA capture APIなし。終了は起動terminalのCtrl+C。他serverを停止しない。

## 未完了Release QA / Gate

**physical smartphone / iOS Safari / low-performance device は未完了。** ProductのHuman Acceptanceと公開可能判定は別。Web Game Studio変更・Portal統合・Git stage/commit/push・Production deploy・public release・ads integrationは今回行わない。公開・統合は別Human Gate。

ゲームsourceと操作感・テンポ・連鎖をこのpackで変更していない。後続のmount path等の変更も別candidateでdiffと回帰を取り、accepted baselineを上書きしない。

このpackはhandoff完成物。release blockerは docs/RELEASE_QA.md、統合contractは docs/PORTAL_INTEGRATION.md、全file hashesは HANDOFF_MANIFEST.json。完全な371-file snapshotは同workspaceの rimbloom-release-baseline-r1/accepted-build に保存。handoff自体のbuild/test/verificationに元workspaceは不要。

元snapshotのpathとこのpack内のpathの対応は [BASELINE_REFERENCE.md](docs/BASELINE_REFERENCE.md) と [SOURCE_MAP.json](SOURCE_MAP.json)。旧historicalEvidenceの実在pathは evidence/qa/FINAL_EVIDENCE.json、旧提出Reviewは evidence/pre-acceptance/REVIEW.md。ZIP内のruntime/source/QAはこのpackから読めます。

RIMBLOOM_RELEASE_HANDOFF_READY
WEB_GAME_STUDIO_INTEGRATION_PENDING
