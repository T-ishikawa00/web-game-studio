# 次回実装依頼案 — Human選択前／実行許可ではない

2026-09-20。 [統合Review](REVIEW.html) / [根拠・観測・適用条件](AUDIT.md)

## 推奨するGoal

4作品の選択と回遊を迷いにくくし、現行データ処理に合った短い公開説明と、実行可能な問い合わせ手順を整える。広告導入や全面再設計を目的としない。

## Delta：最大5件

|順位|事実/仮説・影響・根拠の強さ|範囲／想定対象|工数帯・回帰リスク|依存・完了条件・rollback|
|---|---|---|---|---|
|1 P1|運営者情報照会にも本人確認が掛かる現行文F、問い合わせ運用/契約U。必要情報に到達しにくくする説明は具体的。法的違反の確定ではない|`src/rc/site.json`, `PublicOperations.astro` のContact/Privacy差分。docsの運用メモ。契約・法域は確認記録だけ|S:小〜中。法域/メール契約の専門確認待ちは工数外。誤った法的保証を公開するリスク|Human群2。本人確認をデータ請求に限定、目的/提供先/保持/権利の条件を対応表へ、未確定文は公開しない。日英生成物で照合。rollbackは文案差分のみ、問い合わせデータは触れない|
|2 P2|全4作の関連導線が非対称F/O。到達は可能だが余分な一覧経由。成果改善はH|`src/rc/pages/[locale]/[...path].astro`, `scripts/magnet-public-build.mjs`, `game004-public/catalog.json`等の関連metadataとdetail/離脱先。Magnet runtime/source保存/artは対象外|A/S統合:小〜中。JA/ENリンク・公開/draft混入リスク|群1。全4作JA/ENから各他3作の正しいPlay/detailへ、自己重複/Preview/fixture0、004の全画面Playを保持。リンク行列＋実ブラウザ一巡。rollbackは関連sectionのみ|
|3 P2|画像/作品名の行先不一致F/O、迷う可能性H。4枚目が下にあるO。現行は動作する|上記route templateと限定Portal CSS。A棚案を採る場合のみ。`Hero.astro`全体再制作なし|A:小〜中。長いJA名・mobile・focus/同意banner回帰|群1。カード主領域=Play、Details明示分離、44px目標/24px例外検討、390/768/1366で横overflowなし・拒否操作保全。開始クリック1を維持。rollbackはclass/リンク差分のみ|
|4 P2|videoPolicy null F、Creatorsに許可範囲が伝わらない。許諾はHuman選択。日付/変更方法未設定F|`site.json`/`PublicOperations.astro`の実況・Terms版/リンク。必要なら短いvideo route（既存route正本から）。Astro/Vite noticeは保持|B文案/S権利統合:小。新許諾の範囲逸脱、JA/EN不一致|群3。通常録画/配信/標準広告収益化/ネタバレ/第三者/素材単体/批評を対照、採用日を実日付で付す。権利確認事項を埋めずPENDING保持。rollbackは将来利用への影響をHuman/専門家確認し、過去許諾の自動撤回をしない|
|5 P2|生成後replaceが複数工程に存在F。公開版は正しい。次の誤配布リスクH|`scripts/public-release-build.mjs`, `magnet-public-build.mjs`, `magnet-release-build.mjs`, `src/rc/site.json`, registry/catalog。公開本文・作品数・related集合のみ正本集約|S:中。共通buildに波及するため5件中最も回帰リスクが高い|1〜4の最終範囲に従属。新出力rootでJA/EN本文・リンク行列・公開manifest/隔離/consentを比較。既存artifact上書き禁止、採用ゲームpayloadはbyte不変。差分許容リストを限定。rollbackは旧生成経路と既存artifactへ戻せるよう保持、deployは別許可|

精密な時間見積りはしていない。「小」は限定文言/局所template、「中」は複数生成経路と回帰確認を伴う。上記はすべて選定候補で、今回未実装。1を法務未確認のまま強引に公開するためのフラグは作らない。必要なら1の確定部分と保留事項を分離し、2〜4の独立した安全な作業を進める。

## Keep

公開4作品、旧57問と004の3作戦18区画、採用Craft/Combat/Progression/音/Art/Portal Visual、save keys/schema/version/互換、JA/EN。Analytics explicit opt-in/manual/auto OFF、Preview Access/Analytics OFF、Cloudflare。無料・無課金・account/cloud-saveなし。既存untracked/QA/既知12型error等の履歴。SMTPなし・外部初見DEFERRED。既存Human判断を専門適合証明へ変換しない。

## Done／QA

1. 開始HEAD/index/worktree/必要ignored証拠を保全し、許可pathをHuman採否から確定。別担当が本番共通部へ同時書込みしない。
2. 日英の現行→案→理由をReviewへ。source/生成物/実ブラウザの整合、4作品相互リンク、操作/保存文の一致を確認。新規広告・SDK・永続IDなし。
3. 文言だけなら対象生成物/リンク検証。Portal template/styleならtype/build/route/responsive/keyboard/200%/同意banner。共通buildを直す場合は全影響作品・Preview/fixture隔離・game payload byte一致まで拡大。旧既知FAILの意味を記録し、assertion/hookを弱めない。
4. ゲーム内容/保存を触らなければ同artifactの全57問/004完走・failure QAを再利用。影響が生じた場合のみその回帰を追加。新しい変更を古いQAで覆わない。
5. 技術QA/視覚/実機/聴感/外部初見/法務/広告/公開を別判定。自己操作でCTR/再訪/売上向上を証明したとしない。
6. ローカル実装とHuman reviewで停止。stage/commit/push/deploy/広告/外部設定は別の明示依頼を待つ。

## 後回し・変更しない理由

- 実広告/H5/認定CMP/ads.txt：provider未選定・資格未確認。Bは配置を判断する資料のみ。審査条件の読取調査は並行可能だが申請ではない。
- Home「続きから」：4つの保存判定に横断アクセスする変更が必要。今のゲーム内再開は機能する。文言/回遊より高い回帰リスク。
- 新計測/UTM/永続ID：今のWAで全体開始率/D1/D7を評価できないが、今回の目的に新基盤は不要。実流入不足とUI不足は区別。
- 全面Hero・ランキング・検索・account・コメント・CMS・005：4作品の具体的摩擦の解決から外れる。
- 保存/音/ゲーム制作、独自SMTP、延期した外部初見：今回の改善の前提に戻す根拠なし。

## Human判断（最大3群）

1. **改修範囲**：1〜5とA・広告なしを採用するか。B/広告枠は比較資料のまま残すか。採用範囲が決まるまで本番sourceは触らない。
2. **運営・法域**：運営者情報回答の準備、専用Gmailの契約種別、返信From/保持/児童対応の担当、EEA/UKの実提供意図と限定専門確認の要否。実名・住所・メール本文は回答に不要。適法性をHuman承認フラグで埋めない。
3. **公開許諾**：個人/法人の実況・通常platform広告収益化・ネタバレを草案範囲で許可するか。日英の版・発効方法・権利範囲を確定する。

専門家へ回す場合は①運営者特定/域外適用/代表者、②サービス別データ処理/国外/児童、③責任/改訂/紛争/実況権利の3束に限定。専門家照会・有料相談・送信はこの文書によって許可されない。

## 提出previewと停止

提出用 [Review](http://127.0.0.1:4380/docs/qa/tinlumo-audit-r1/REVIEW.html) はloopbackのみ、noindex、外部connect禁止。起動する場合はrepo rootから `node docs/qa/tinlumo-audit-r1/evidence/server.mjs`。ポート使用中なら既存プロセスを止めず、まず用途確認。PIDは `evidence/server.json`。

停止は次のようにPIDのcommand lineと開始時刻を照合して、このReview自身だけに限定する。PIDが再利用されていれば停止しない。

```powershell
$auditInfo = Get-Content -LiteralPath 'C:\projects\Web Game Studio\docs\qa\tinlumo-audit-r1\evidence\server.json' | ConvertFrom-Json
$auditProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($auditInfo.pid)"
if ($auditProcess -and $auditProcess.CommandLine -like '*tinlumo-audit-r1/evidence/server.mjs*' -and [math]::Abs(($auditProcess.CreationDate.ToUniversalTime() - [datetime]::Parse($auditInfo.startedAt).ToUniversalTime()).TotalSeconds) -lt 15) {
  Stop-Process -Id $auditInfo.pid
}
```

**TINLUMO_AUDIT_AND_CHANGE_PLAN_READY / HUMAN_SCOPE_DECISION_PENDING**
