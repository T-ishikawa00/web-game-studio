# Tinlumo Trust & UX R2 — Human Review

2026-09-20。主担当・独立read-only文案/実装レビューともに `gpt-6-astra`。A案・広告なしをローカル実装。

**TINLUMO_TRUST_UX_R2_READY / HUMAN_ACCEPTANCE_PENDING**

[統合Review](http://127.0.0.1:4381/review/REVIEW.html) / [JA Home](http://127.0.0.1:4381/ja/) / [EN Home](http://127.0.0.1:4381/en/)。loopbackのみ。実際の配布候補はnoindexで、文書の適用日・最終更新日は未確定表示。公開サイトは変更していない。

|優先|変更・理由|範囲・検証|
|---|---|---|
|P0|一般問い合わせ、運営者照会、本人データ請求を3見出しに分離。照会だけの本人確認を原則不要とし、データ請求は適用法と期限で対応|Contact/Privacy/site.json。日英全文と同一正本の表示、独立read-onlyレビュー|
|P0|Privacy/Termsを実態に合わせて保持・明確化。Analytics同意を広告に流用しない旨、版と変更方法を追加|旧3作品/Magnetの保存・resetの違い、90日目安、provider保持限界を維持。未確認法域を準拠済みにしない|
|P0|公開選択・件数・関連集合・短文・文書版を限定した正本へ整理。古い置換build3本を停止|新しい隔離出力64ファイル、34 HTML、全ローカル参照・anchor・公開集合、保持26payloadのhash一致|
|P1|Homeの主リンクをPlayへ統一。Detailsを独立。Desktop4列、Mobileは短文の横型カード|44px操作領域、Tab→Details→Enter、320/390/683/1366幅を確認。Visualの色・ロゴ・カバー・Heroは維持|
|P1/P2|全4作品の相互回遊、Play上部の他作品へ移動、Magnetの詳細/結果から回遊。日英動画方針を追加|各作品の他3作へのリンク検査、実ゲーム起動・クリア後移動。動画許諾全文はHuman承認候補|

5件のHuman採用範囲を実装した。ゲーム終了後も一覧を探し直す必要を減らすが、回遊率や収益向上の実証とはしない。広告コード・空の広告枠・検索/カテゴリは追加していない。カード、ゲームstage、関連sectionは独立しており、将来広告を検討する際もgame領域への重なりを前提にしない。

## QAと保全

- 既存unit **215/215 PASS**（保存・ルール・既存57問の検証を含む）。ゲーム本体の再制作・全問の大量録画はしていない。
- R2 distribution/routes/copy/byte-preservation **4/4 PASS**。旧fixture向け `tests/routes.test.ts` はR2に適合しないため、公開4作品を起点とする専用integration検査を実行。
- AstroのR2 build **PASS**。64ファイル、33公開候補URL＋404、関連は各他3作品。Preview/fixture/source maps/秘密ファイル混入なし。
- 日英Portal 12画面×Desktop/Mobile＝48巡回。画像の即時読込未完了2件は、遅延読込後に実画像の自然幅を再確認。破損画像ではなかった。
- Play：4作品×日英×Desktop/Mobile＝16起動確認。元のゲームJS/CSS・shell・保存処理を保持。Hakorilo編集→保存→reload、Lightwork/Two Waysの1問クリア→保存→他作品、Magnet開始→Pause/Resume→詳細→関連を確認。日英切替後も保存表示を確認。
- Analytics：UIでdeny→設定変更→allow→設定変更→denyを確認。localではbeacon script 0。既存consentテストの挙動6件PASS（default OFF、拒否、許可、取消、storage失敗、Preview/iframe拒否等）。本番で新たな通信や設定変更は行っていない。
- Keyboard：主要リンクのTab順、DetailsのEnter、Two Ways方向ボタンEnter、Magnet結果fixtureからEnterで関連先へ確認。44pxのDetails/CTA。
- 200%：IABでブラウザズームキーが反映されず、ネイティブ200%は **NOT TESTED**。1366pxの半分に相当する683px幅でreflowとkeyboard到達を代替確認。320pxと390pxでも横overflowなし。実機タッチ試験ではない。
- Magnetの新しい結果リンク：runtimeを実行しない隔離HTML/CSS fixtureで390pxの表示・Enter遷移を確認。自然な作戦完了後の結果画面は今回再走していない。既存完走QAとruntime同一性を再利用する。
- Security：full index **PASS**、新配布候補 **PASS**。全project raw scanは既知の2件で **FAILのまま**。各Human限定判定を適用し、新規候補0。scanner設定変更なし、TLS鍵のindex/history path不在・配信対象外を確認。
- 採用済み配布62ファイル、既存untracked成果、ゲーム/保存/Cloudflare/Preview/consent sourceを保全。stage/index変更なし。最終差分とhashの証拠はpostflight.json。

## 既知FAILと未確認

`npm run check` は **既知12件でFAIL**。`game004-magnet-expansion/core.ts:30`、`game004-magnet-progression/core.ts:30`、`game004-magnet-vertical/core.ts:23` の各4件TS18048。いずれも今回非配布の旧試作・開始前から不変。R2の新規型errorは0。既存assertionやtsconfigを緩めていない。

`tests/analytics-consent.mjs:60` は既存の公開前gate期待で **1件FAIL**。現在のrelease済み `deploymentHold:false` とテストの `deployment:humanFinalGate` 期待が不一致。開始前の監査でも同じ失敗。後続assertionはそこまで到達しないためPASS扱いしない。過去承認フラグを変更して帳尻を合わせない。

実機iPhone/Android・複数browser・支援技術の実機読上げ・ネイティブ200%・新たな全57問/004全完走・聴感・外部初見・本番データ/メール契約/運用実施・世界各法域適合は今回 **NOT TESTED / 未確認**。広告・SMTP・延期済み外部初見を新たな必須条件にしない。動画方針と公開日付はHuman全文確認待ち。

## 根拠と文案

監査の現物照合は [Audit R1](../tinlumo-audit-r1/AUDIT.md) を引き継ぎ、今回の生成物と実ブラウザで差分を再確認した。運営者情報と本人データ請求の区別は [個人情報保護委員会・通則](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/)、適用時の請求期限/本人確認は [GDPR Article 12](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679) の条件を参照。consumer GmailにWorkspace契約を仮定しない（[Google公式説明](https://support.google.com/policies/answer/9581826?hl=en)）。法的適用の結論はこの技術Reviewから作らない。

[全日英文面](PUBLIC_COPY.md) は実際のR2生成物から30ページのmain表示を採取。共有header/footer/consent、全画面Magnetの既存ゲーム内コピーは配布manifestにあるHTML/保持JSを参照し、新規ゲーム文言は結果の「ほかの作品 / Other games →」のみ。文書原稿の転記と生成物を混同しない。統合ReviewにはAbout/Contact/Privacy/Terms/Credits/Videoの全文章も直接収録。

[source-of-truth構造・運用引継ぎ](SOURCE_OF_TRUTH.md)。既存brand/文面の長文化を避け、必要な境界だけ追記した。動画許諾には通常広告収益化、事前連絡不要、任意クレジット、ネタバレ、批評、ソース/素材再配布との区別、第三者条件を含む。新しい包括同意・言語優先条項・過去許諾の自動撤回を設けていない。

## Human確認と停止

Humanには一つのReviewで①操作/見た目、②日英の運営・法務全文と実行可能性、③動画許諾全文と公開時の適用日の3群を確認いただく。今回の実装依頼は受領済みで、追加の実装許可は求めない。適用日は実際の公開に対応させ、架空の日付で埋めない。

stage / commit / push / deploy / 外部設定変更 / 広告申請・接続 / 有料操作 / 問い合わせ送信は実施0。レビュー用serverだけloopbackで保持。起動した一時serverの旧PIDは照合して停止し、既存プロセスは停止していない。再起動はrepo rootで `docs/qa/tinlumo-trust-ux-r2/restart.ps1`。終了時はserver.jsonのPID・command line・creation timeを照合してそのPIDだけ停止する。

**TINLUMO_TRUST_UX_R2_READY / HUMAN_ACCEPTANCE_PENDING**
