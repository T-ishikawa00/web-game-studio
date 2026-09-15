# Two Ways Craft Baseline R1 — checkpoint verification

2026-09-16。HumanがTW-Cを明確に最良と評価し正式採用。**Human Craft Acceptance PASS**：共通入力の同期感、片側停止の軽い反応、専用SFX方向、帰宅／出直し／同時クリア、現在のTW-C体験。

[採用範囲と再現](../../games/TWO_WAYS_CRAFT_BASELINE_R1.md)。実機・外部初見・全21問ゲーム性・公開は未確認。Tiny R2 / Lightwork R1と全57問を維持。TW-A/B/Cの比較証拠は採用前の状態のまま保全。

## 対象と検証

- [対象manifest](checkpoint-files.json)：今回のTwo Ways成果、入口/現在地、Baseline・再現/検証記録のみ。Tiny実機/LAN・旧局所監査helper計13件は対象外で未tracked保全。
- [最終差分確認](verification.json)：既存ゲームsource・音・比較証拠不変。canonical build→専用build→配布44件・固定source完全一致。Tiny46/Lightwork48も一致。
- 前回のunit209、browser17、edge5、Home入力7、Review22 PASSを版不変の根拠付きで再利用。今回の文書/固定差分に全21問再生や録画再生成は不要。文書参照・権限・採用範囲・whitespaceを検査。
- 独立read-onlyレビュー：重要blockerなし。主担当・レビュー実利用モデル `gpt-6-astra`。

## Security / Git

開始HEAD・origin/main・実remoteは `440b1b133a6863cd3d9e8b8f894bc4f581ae89a1`。Private `T-ishikawa00/web-game-studio`を再確認。今回の1 checkpointと通常fast-forward pushだけHumanが許可。force/rebase/履歴改変なし。

全project raw検査は既知2件のFAILを保持する。SHAは FALSE POSITIVE / NON-CREDENTIAL / APPROVED、TLS鍵は別の TRUE SECRET / LOCAL DEV ONLY / APPROVED FOR LOCAL RETENTION。新規候補には拡張しない。鍵のindex/history不在・候補内の秘密値不在とSHAの由来を値非表示で再確認。[最新検査](security.json)。全index・hookとpush前historyのPASSを必要条件とする。

この文書はcheckpoint前の検証記録。commit/push後の実際のhash・remote照合は次工程のpostflightへ分離し、自己参照hashのために追加commit/amendは行わない。BGM Pilotは照合成功後に開始し、BGM成果はstage/commit/pushせずHuman BGMレビュー待ちで停止。
