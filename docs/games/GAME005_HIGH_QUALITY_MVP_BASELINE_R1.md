# Game005 High-Quality MVP — Accepted Baseline R1

2026-09-23 **HUMAN_ACCEPTANCE_PASS / BASELINE FROZEN**。

HumanがR3.2 Live Integration版を実際に試遊し、「かなりいい」「かなり満足」と評価した。以下の現行MVPを正式に採用する。本書が受入の正本であり、旧R3.2 Reviewの `HUMAN_LIVE_CRAFT_UI_GATE_PENDING` は採用前の履歴として保持する。旧証拠を現在の判定に書き換えない。

## 固定する体験

- 俯瞰型の島づくり。島を主役に残す画面構成、現行3D Craft。
- 開始2人・最大3人の働き手。採集・運搬・建設・再割当を自動化し、個別住民割当を要求しない。
- プレイヤーが建築、配置、投資順、明示出荷、必要な優先指定を決める。
- 現行R2 game loop、木材・資金、既存施設と橋による拡張、3つの小目標。建設開始→作業→完成→発展の短い一周と操作テンポ。
- B Gallery Gold Visual Direction、R3.2 Live UI Integration、現行HUD / Gallery / Settings、desktopとmobile tray / expandable構造、motion / feedback。
- 現行保存仕様。専用key `tinlumo:game005:island:live-ui:r3-2`、envelope/schema version2、破損原データ保全・失敗表示・複数タブ競合・制御されたreset。旧R2の保存への移行/読書きなし。

これは **Full Game完成ではない**。物理iPhone性能、Safari、App Store適合、外部初見、市場性、長期継続率は **UNKNOWN / NOT TESTED**。Humanが今回試遊した体験の受入を、端末や市場に関する別Gateへ拡張しない。

## 凍結対象とcheckpoint

[frozen-manifest.json](../qa/game005-high-quality-mvp-baseline/frozen-manifest.json) が採用入力・証拠・既存依存・派生buildの照合基準。[checkpoint-manifest.json](../qa/game005-high-quality-mvp-baseline/checkpoint-manifest.json) が今回だけstageする明示path集合。

|対象|扱い|
|---|---|
|R3.2 source / app / assets / fixtures / tests /必要scripts / Review|採用時のbytesを保全。通常ゲームのmock hook不在を再利用。比較fixtureは別build・保存無効|
|R2依存|core、art、scene、audio、ui-copy、game、storage、CSS。通常runtimeと旧UI比較の再現に必要。採用元を改変しない|
|依存lock|Game005のpackage / lockと既存root package / lock。Three0.186.0、Vite8.3.0。node_modulesはGitへ入れない|
|Gold比較|R3.1のGold entry/CSS/JSと自作モデル・背景画像。外部参考画像は収載・ゲーム転用しない|
|判断と証拠|R3研究文書・Gold独立Review、R3.2の一括Review、比較画像、2順序の等速全編と短尺、QA /性能 /保存の証拠|
|派生build|採用時dist / fixture-dist / baseline-distのhashを記録。再buildは隔離出力で一致を検証し、ローカルの原buildを上書きしない|

旧R1/R2/R3/R3.1一式や無関係作業をまとめてstageしない。選択外の履歴・参考・実行キャッシュはローカルで保全する。旧Reviewの4391/4393原版リンクなどはローカル履歴への参照であり、全旧世代のサーバーをこのcheckpointだけで再現する約束ではない。採用版と同条件比較は4394の通常route、`/baseline/`、`/gold/`、`/fixture/`で再現可能。

Currentの今回採用blockだけをHEAD由来本文へ追加してindexに載せる。作業ツリーにある既存の未commit履歴は保持し、今回のcommitへ紛れ込ませない。commit SHAやpush後のrefsは自己参照を避け、checkpoint後のローカル [POSTFLIGHT.md](../qa/game005-high-quality-mvp-baseline/POSTFLIGHT.md) に記録する。amendや二つ目のcommitは行わない。

## 継続作業の境界

以後のProgressionは別Human依頼・別候補で行う。R2の直接依存を編集するだけでもR3.2が変わるため、凍結manifestに含まれる依存を同時に保護する。凍結manifestを更新して変更を隠さない。採用UI方向、自動作業、個別割当なし、短いテンポ、島が主役という条件を維持し、方向転換はHuman判断を必要とする。

新建物・資源・クエスト・住民システム・オフライン収益・Full Game・App Store制作は今回行わない。公開4作品、Portal、Consent、広告、Cloudflare、public registry、Productionは変更しない。今回のstage→1 checkpoint→private origin/mainへの通常pushは一度だけの明示許可で、公開許可ではない。

## 再現と今回のQA

1. repo rootから `node scripts/game005-baseline-verify.mjs`。入力hashと隔離buildを確認する。`--index` はfull indexの入力から検証する。CRLF/LFのみ正規化して比較し、原bytes hashも保持する。画像/動画はbytes一致。
2. 依存が未導入の別checkoutではrootと `game005-island/` のlockを使って `npm ci` が必要。今回インストール・更新は行っていない。既存環境はNode24.14.0。
3. 専用previewを別checkoutで生成するときは `node game005-island/r3-2/scripts/build.mjs`。既存採用buildがある本workspaceでは不用意に再生成しない。
4. 別checkoutでは先に `New-Item -ItemType Directory -Force game005-island/r3-2/.cache`。空きportで `node game005-island/r3-2/scripts/server.mjs`。通常 [Live](http://127.0.0.1:4394/) / [Review](http://127.0.0.1:4394/review/)。loopback限定。停止はrepoから `powershell -NoProfile -File game005-island/r3-2/scripts/stop.ps1`。Playwright/ffmpeg検査helperの絶対パスは本Windows環境のものなので、別PCでは利用可能な既存ツールへ接続先を明示して使う。

今回runtime変更0のため、直前R3.2のcore11・browser14群・監査修正3群・Review7群と等速一周/性能証拠をhash照合して再利用する。Human PASSを技術QAの再実行と混同しない。今回新規に凍結検証、隔離再build、対象差分/参照、全project（ignored含む）・full index・local history Security、限定判定の再確認、private originとpush後refs照合を実施する。結果は採用QA領域に記録する。

過去raw scan FAILの6検出は消さず、既存Human dispositionと別々に記録する。新規候補はcommit/pushを停止しHuman判定待ち。scanner設定・hookを緩和せず、TLS鍵はindex/history/配布へ入れない。

主担当と限定read-only依存監査の実利用モデル：**gpt-6-astra**。追加writerなし。

次は [物理iPhone Web FeasibilityのHuman手順](GAME005_IPHONE_WEB_FEASIBILITY_GATE_R1.md) の準備だけ。LAN再公開・証明書・外部設定変更は未許可につき行わない。

**停止：GAME005_HIGH_QUALITY_MVP_BASELINE_FROZEN / IPHONE_FEASIBILITY_HUMAN_GATE_PENDING**。
