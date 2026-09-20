# PROJECT MAGNET — Human Accepted Full Game Baseline R1

2026-09-20: **GAME004_FULL_GAME_GATE_PASS**。Humanが現行Full Game Candidateを実際に試遊し「これでいい」と判断。旧ReviewのPENDINGは受入前の履歴で、この記録が後継Authority。

採用範囲: 3 Missions / 18 zones / 3 Bosses / 4 final forms / 4 modules / Mission unlock / settings / records / zone checkpoint resume / Retry / current Craft・Combat・Progression・Tempo。`game004-magnet-full/` のsourceと採用証拠を凍結。個数合わせ・追加polish・Challenge・shop・ads・account/cloud・App Storeを開始しない。明確な公開blocker以外で採用設計を変えない。

物理スマホ・Safari・個別聴感・外部初見は **NOT TESTED**、市場性・継続率・収益は **UNKNOWN**。Humanゲーム受入はこれらや公開許可に拡張しない。

## 再現・証拠

- [Frozen manifest](../qa/game004-magnet-full-baseline-r1/frozen-manifest.json): source、専用build/server、対象tests、Research/設計、採用QAと代表画面・映像をhash固定。旧R2.1・Expansion・Nurtureは削除/上書きしない。
- `npm ci` 後 `node scripts/magnet-full-baseline-verify.mjs`。原本を変更せず `.tmp/magnet-full-baseline-verify/worktree/` で再buildし4配布fileを照合。`--index` はindex全入力を検証。Node 24.14.0 / lockfile固定。textのみCRLF/LFを正規化し、binaryは完全一致。
- `node scripts/magnet-full-baseline-media.mjs`: 32MiB以下の分割映像を検証し、欠落原本だけ復元。既存原本を上書きしない。元録画はローカルで不変保持。duplicate生収録・反復中間画像は新checkpointへ重複収載しない。
- unit: `node --import tsx --test tests/magnet-full-core.test.ts tests/magnet-full-mechanics.test.ts`。既存28 unit / 87 browser checks、等速A→B→C映像等は[採用Review](../qa/game004-magnet-full-r1/REVIEW.md)を再利用。専用browser scriptsは旧QA出力を上書きするため、再試験では出力先を新batchへ変更すること。
- Reviewの `B-satellite-fast.json` / `C-foundry-mobile-fast.json` link名は記載誤り。実在証拠は `satellite-fast.json` / `foundry-mobile-fast.json`。凍結原文は変更せず、この注記で訂正。
- Asset Registerの既存未commit追記は同作品の原制作からFullへのprovenanceとして保持。旧prototype実装を新checkpointへ混入しない。

## checkpointと次のGate

今回限りcheckpoint commit 1回とPrivate origin/mainへの通常fast-forward push 1回をHuman明示許可。基点 `f84671f1957da73b99a173e4c7a88d33ece3f141`。現在地・台帳以外の既存差分を改変しない。後続postflightはSHA確定後にローカル追記し、amend/2回目commitをしない。

Securityは既存raw FAIL2を維持し、新候補0を確認。全index・historyを別途scan。TLS鍵はignored/local-only、index/history不在、複製/配信禁止。新規候補は停止。詳細はpostflight。

checkpoint後は別候補のJA/EN導入・Portal局所統合・game-only配布・対象QAのみ。Production registry/deploy/Cloudflare/LANは変更しない。公開候補Reviewの **HUMAN_RELEASE_GATE_PENDING** で停止する。

主担当実model `gpt-6-astra`、限定read-only統合調査 `gpt-5.6-sol`。採用原制作でのSol Hub実装は旧Review記録のとおり。
