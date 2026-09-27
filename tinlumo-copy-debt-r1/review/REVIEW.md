# Tinlumo User-facing Copy Debt Cleanup

**LOCAL READY / HUMAN FINAL COPY GATE PENDING**

Content Trust R1 direction is Human Accepted. This local cleanup is a new final-copy candidate, not a release authorization.

- Local consolidated Review: http://127.0.0.1:4418/review/
- Candidate: `release-artifacts/tinlumo-copy-debt-r1` (102 files, 39 routes + 404; one added accessible-name asset).
- Before: accepted-direction Content Trust R1 candidate served at 4419. Earlier 4416 Review remains immutable historical evidence and includes original production comparison.
- HEAD: `af7016d14c9f151a9c1136379c85de26bbe24e2a`; branch/upstream/index unchanged; no stage/commit/push/deploy/production write.

## Copy decisions

### Two Ways Home — タイトル／各画面のTinlumoリンク・読み上げ

Before: JA: Tinlumoの5作品へ
EN source: Tinlumo five-game preview（既存候補ではTinlumo gamesへ加工）

After: JA: Tinlumoのゲームへ
EN: Tinlumo games

公開作品数に依存しない案内。原sourceを修正し、古いadapter上書きを取り除いた。

Source: `tinlumo-remaster-wave1/two-ways/src/main.ts:44 → scripts/visual-remaster-adapter.mjs`

Evidence: 日英初期画面・設定・面選択のDOMとリンク名。

### PROJECT MAGNET — 常設ヘッダー／ハブ／消去確認

Before: TINLUMO / 004 · TINLUMO / GAME 004
Game004 のデータをリセットしますか？
Reset Game004 data?

After: TINLUMO
PROJECT MAGNETのデータをリセットしますか？
Reset PROJECT MAGNET data?

制作番号を外し、確認の対象を正式作品名で明示。ボタンは「セーブデータをリセット / RESET SAVE DATA」「リセットする / RESET DATA」。解放・クリア・途中再開・設定の対象範囲は保持。

Source: `tinlumo-remaster-wave1/magnet/public/index.html:4; src/hub.ts:19–107`

Evidence: ハブ・確認・取消・確定・名前の折返しを日英で確認。

### Two Ways Home — 21面の選択カード・読み上げ

Before: 見える番号01 → 読み上げT19
見える番号02 → 読み上げT01

After: JA: 帰り道 1 · ひとつの合図
EN: Journey 1 · One shared signal
以降も表示順に一致

表示番号と読み上げ番号を揃える。data-actionのlevel:T19、保存・解答のstable IDは同一。

Source: `tinlumo-remaster-wave1/two-ways/src/main.ts:57; src/prototypes/home-levels-learning.ts:23`

Evidence: 日英で全21件の対応、最初のdata-actionがlevel:T19のままであることをassert。

### PROJECT MAGNET — 最終進化の選択画面

Before: CYCLONE · R2.1 / RETURN · R2.1
サイクロン · 既存形態 / リターン · 既存形態

After: CYCLONE / RETURN
サイクロン / リターン

現行の進化名はそのまま、内部版と旧実装注記のみ除去。選択キー・性能値・説明・演出は同一。

Source: `tinlumo-remaster-wave1/magnet/src/expansion-progression.ts:15–16 → main.ts:84`

Evidence: 有効な区画開始fixtureからマウスの通常操作でB区画5を攻略。変更前後の両分岐に到達し、JA/ENで撮影。全編達成の証拠とは区別。

### 島をつなぐ日 / An Island Connected — 市場の建設・移設マーカー・読み上げ

Before: JA/ENとも coast / village

After: JA: 海岸沿い / 村の広場
EN: Coast / Village

可視の配置ボタンと同じ場所名を提供。公開用の小さいcopy adapterがaria-labelだけを補い、凍結engine・配置値・保存を保持。Playとraw entryの双方で適用。

Source: `src/production/island-copy.js; src/production/GamePage.astro; src/rc/IslandPlay.astro; scripts/visual-remaster-game-html.mjs`

Evidence: JA/ENの建設・移設・ゲーム内言語切替、raw entryを実ブラウザーで確認。

### Two Ways Home — 初回・消去直後の保存案内

Before: このブラウザに保存 / Saved in this browser

After: 進行はこのブラウザに保存します / Progress saves in this browser.

まだ保存していない初回に「保存済み」と読める表現を避ける。invalid/unavailable/failedの警告分岐は保持。

Source: `tinlumo-remaster-wave1/two-ways/src/main.ts:40`

Evidence: 初回DOMと消去後の実状態を確認。保存条件・処理は変更なし。

### Two Ways Home — 保存管理／消去確認

Before: 進行・全クリア記録・途中の位置だけを説明。動きの設定を省略。

After: JA: 進行・クリア記録・動きを控える設定を消去。音の設定と他の作品の保存は残る。
EN: Progress, completions and reduced-motion preference are removed. Sound settings and other games’ saves remain.

実際に既に消える項目を明示し、採用済みPortalの説明と一致させる。削除対象は増やさない。

Source: `tinlumo-remaster-wave1/two-ways/src/main.ts:77,94; src/prototypes/state.ts:42`

Evidence: 取消で保存保持、確定で対象keyのみ消去、reduced motionが初期値へ戻ることを確認。

### Two Ways Home / Lightwork Garden — 保存消去の失敗メッセージ

Before: 元の保存はそのままです / The original save remains.
記録を消したとは表示しません / has not been reported as erased.

After: JA: 消去の完了を確認できません。保存機能を利用できる状態で、もう一度確認してください。
EN: Deletion could not be confirmed. Check again when browser storage is available.

removeItem後の読取確認が失敗する場合がある。元データ残存を保証せず、内部検証の説明を利用者の状態と次の行動へ。

Source: `tinlumo-remaster-wave1/two-ways/src/main.ts:95; lightwork/src/main.ts:44`

Evidence: run専用contextで「消去後に例外」を注入し、false成功/false保持表示がないことを日英で確認。

### PROJECT MAGNET — 描画停止の通知

Before: 再読込すると区画開始地点から再開できます。 / Reload to resume the sector checkpoint.

After: JA: 描画が停止しました。ページを再読み込みしてください。保存できていない進行は失われます。
EN: Graphics interrupted. Reload the page to continue. Unsaved progress will be lost.

保存不可でも無条件に再開できる保証を外す。描画停止・再開・保存の挙動は不変。

Source: `tinlumo-remaster-wave1/magnet/src/world.ts:46`

Evidence: webglcontextlost合成イベントで通知コピーを確認。実GPU障害試験ではない。

### Hakorilo / 島をつなぐ日 — JA/EN Creditsから開く作品制作情報

Before: Accepted D1 music.
島をつなぐ日 / An Island Connected — Tinlumo Studio. Web v1.

After: Original synthesized music.
島をつなぐ日 / An Island Connected — Tinlumo Studio.

採用工程・内部版ラベルを除去。正式名、音楽の制作来歴、AI支援、ライセンス、参考画像非配布の説明を保持。旧artifactを編集せず次回buildにも反映する生成元修正。

Source: `scripts/visual-remaster-build.mjs`

Evidence: 配布するcredits.txtの前後差分・参照リンクを検証。D1.wavを含む音源はbyte同一。

## Kept by context

- **KEEP — URL / slug / save key / version ID**: 全existing path・game ID・save namespace/schema・選択順は同一。Game004等の内部値は今後も必要。ソース内の一致数を0にしない。
- **KEEP — D01–D18 / L01–L18**: 全件、可視の01–18と一致する面番号。HUD・ヒント・再開案内の参照対象として利用可能。Two WaysのT19→表示01の不一致と区別。
- **KEEP — 18配送／18問／21問／3作戦・各6区画／島の施設数**: 実内容・現在の進捗を示す数。ブランドの固定作品数とは異なる。
- **KEEP — Parcel Grove / THE CONSERVATORY / ISLAND GALLERY**: 採用済みゲーム画面の舞台名・世界観。U1/L1等の選考IDを伴わず、旧作品名へ切り替わる箇所ではない。
- **KEEP — 島をつなぐ日 / An Island Connected**: 現行registryの正式日英タイトル。island-connectionsはURL slugであり正式名の代替ではない。
- **KEEP — Privacy / Termsの現在の広告非配信、問い合わせ目的の制限**: 法務4ページはR1候補とbyte同一。利用目的・運営者・保持期間・権利・日付・Consent Cを変更しない。広告なしの宣伝コピーは戻していない。
- **KEEP — Internal reference images are not distributed.**: 制作来歴と権利確認のための非配布説明。Internalという単語だけで削除しない。
- **KEEP — More is not always safer / Every journey is open / no time limit**: それぞれ問題の学習内容・全問題選択・進化選択中の仕様。サービスの永続保証ではない。
- **KEEP — NORMAL END / SWARM / LANCE / BASE 0**: ゲームの完了状態、形態、進化段階を表す既存のゲーム用語。プロジェクト番号・版IDとは区別。
- **現在の利用者表示なし — PROJECT ISLAND / version辞書 / capture / prototype-note / FULL GAME**: 未使用辞書、除去済み録画UI、CSS class、常時display:noneの旧HUD。ソース存在を実表示と扱わない。公開画面へ追加する際は再監査。
- **KEEP / 表記整形候補 — 島の10番目のカード番号010**: 10番目の施設という順序は正しい。内部プロジェクトIDでも旧仕様でもなく、今回のコピー漏れには数えない。採用済み画面の番号表現を維持。

## Evidence and limitations

- 32-file Astro check: 0 errors/warnings/hints. Build succeeded.
- 276 existing unit/production regression tests + 8 current Consent C tests PASS. Existing integration tests that reference the historical production artifact are reused only for that scope; new candidate links/metadata/DOM are verified separately.
- Browser QA 119 PASS, supplemental 30 PASS; 80 route DOM snapshots, 84 game-state snapshots before/after; two final evolution branches × two languages reached through real mouse input.
- 24 changed-dialog responsive conditions (320/375/390/430/768/1440), 8 text-only 200% conditions. Prior 108 Portal responsive conditions are reused after byte identity of Portal HTML/CSS.
- Source and artifact exact-delta reconstruction; 405 protected files checked with only declared editable exceptions. Cover/CSS/audio/core/save and Island engine remain unchanged. Source snapshots preserve pre-edit authoring.
- Scoped gitleaks 0 new findings; historical raw FAIL22 / historical FAIL11 / S04-S05 UNKNOWN / TRR1-NEW-05 limited retention remain unchanged. Not a full-project/index/history release scan. No known profile read/copied or excluded permission expanded.
- Old `tests/analytics-consent.mjs`: existing 6 failures from earlier fixture/gate, previously proven HEAD-identical. Not relabeled PASS or modified here. Current Consent C suite is separately PASS.
- Real devices, Safari, real fingers, spoken screen-reader output, listening, real GPU loss, legal compliance and Human acceptance are NOT TESTED/PENDING. GPU notification was invoked via a synthetic event. Models: actual IDs UNKNOWN.
- QA profiles use the existing Human-authorized owned OS-temp exception, with only each run's temp directory removed. Application data fixtures were restricted to fresh loopback contexts.

## Completion criterion

**No inappropriate user-facing expressions remain in the audited production surfaces**: source-to-output paths, 45 generated HTML documents, JA/EN runtime states, accessible names, metadata and linked credits were reviewed. This is not a raw-token-zero claim: internal identifiers, meaningful stage/game counts, legitimate provenance and current legal facts are retained. No newly found copy issue has been deferred as an internal-ID leak.

Human Final Copy Gate is pending. Release preparation, full Security gates and publication require separate explicit authorization.
