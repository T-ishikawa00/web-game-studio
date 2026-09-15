# Two Ways Home Craft Baseline R1

2026-09-16 Human Craft Acceptance **PASS**。TW-C（改善Motion＋専用SFX、BGMなし）を明確に最良と評価し、正式採用。

## 固定する範囲

共通入力の同期感、片側停止の軽い反応、Two Ways専用SFX方向、帰宅／出直し／同時クリアの区別、現在のTW-C体験。180msの同期Motionと取消・即時操作、専用9音、音設定の独立性を含む。具体音やMotionを他作品へ機械的にコピーしない。

実機、外部初見、全21問ゲーム性、全57問Human全編受入、公開・法務・広告へのPASS拡張は禁止。外部初見は **DEFERRED / NOT TESTED**。Tiny R2、Lightwork Craft R1は固定。

## 実装・素材・比較証拠

- [元仕様](TWO_WAYS_CRAFT_PILOT_01.md)、[採用前Review Pack](../qa/twoways-craft-pilot-01/REPORT.md)。TW-A/B/Cの動画9本、単体SFX9本、QA・比較条件・画像を保持。旧PENDINGは当時の記録であり、このHuman採用を取り消さない。
- `src/prototypes/twoways-craft-{plan,motion,sound,audio,runtime}.ts`、`scripts/twoways-build.mjs` / `twoways-server.mjs`。R5・元ルールsourceは変更せず、専用出力へ8箇所のassert付き接続。
- [固定manifest](../qa/twoways-craft-baseline-r1/frozen-runtime.json)：開始時の配布44ファイルと正規化source hash。再現時にmanifestを作り直さない。
- [checkpoint検証](../qa/twoways-craft-baseline-r1/REPORT.md)。最新Human依頼の一回限りのGit許可を適用し、過去の許可を再利用しない。

## 再現・閲覧

repoで `node scripts/twoways-baseline-build.mjs`。既存依存を使用してprototype build→専用接続→固定source/44ファイルの照合。閲覧のみなら `node scripts/twoways-server.mjs`、http://127.0.0.1:4343/ 。日本語試遊は `/ja/prototypes/play/two-ways-home/?tw=TW-C&layout=auto`、英語は`/en/`。

比較A/Bを保管することは製品defaultの変更ではない。BGM PilotはこのCを基準に独立したローカル出力で比較し、BGM採用は別Human Gate。
