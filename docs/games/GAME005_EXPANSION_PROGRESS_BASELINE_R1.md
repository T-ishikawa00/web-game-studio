# Game005 — Accepted Progression Baseline R1

2026-09-23。**GAME005_EXPANSION_PROGRESS_BASELINE_FROZEN / FULL_GAME_SCOPE_RESEARCH_PENDING**。

Humanは通常試遊を行い、Expansion Sliceを「かなりいい」、単なる装飾ではなく「生活圏が広がる発展」として受入れた。[製品受入Authority](GAME005_EXPANSION_SLICE_R1_ACCEPTANCE.md)と[今回のSecurity disposition](../security/GAME005_EXPANSION_R1_HUMAN_DISPOSITION.md)を別々に保持する。

## 固定するAccepted Progression

- A「住み継ぐ島」。一つの島を長く育てる方向。
- 「橋の向こうを暮らしの入り江にする」Slice：暮らしの広場、回遊路／小道、縁台・植栽・景観。
- idle時の住民の歩行・立寄り・着席、work発生時の自動復帰、個別住民割当なし。
- 広場先行／回遊路先行の進行差、海際／木陰の配置差。通常入力のA・B両経路と等速動画・比較画像を保持。
- B Gallery Gold UI、島を主役とする構成、Accepted MVPのCraft／UI／tempo。木材／資金の2資源、住民3人、建築・配置・投資順はHumanが決める。

## 凍結対象と再現

実装rootは `game005-island/expansion-r1/`。[凍結manifest](../qa/game005-expansion-baseline-r1/frozen-manifest.json)に受入入力・Review証拠102files、既存dependency manifest4files、派生distribution12filesのhashを記録する。binary／画像／動画はbytes一致、textは元bytesとCRLF/LFのみを正規化したhashを併記する。

元の[候補manifest](../../game005-island/expansion-r1/review/candidate-manifest.json)と旧READY／PENDINGのQAは履歴として保全し、最新の受入は本書を正本とする。派生distはignoredのまま保持し、Gitにforce-addしない。採用前の一度限りのsetup／implement scaffoldingはローカルに残すがcheckpointには含めない。

再現：repo rootで `node scripts/game005-expansion-baseline-verify.mjs`。full indexからの照合は末尾に `--index`。入力をrepo内ignored領域へ取り出して隔離buildし、採用distや原Reviewへ上書きしない。今後変更前後にこの照合と `node scripts/game005-baseline-verify.mjs` を実行し、採用hashを変更して差分を隠さない。

[Accepted MVP Baseline](GAME005_HIGH_QUALITY_MVP_BASELINE_R1.md)の133inputs／22派生buildは不変。旧R2／R3.2 source・旧保存version2／namespaceを置き換えず、Expansionは専用version3保存を維持する。Baselineの採用は保存移行の許可ではない。

## Securityと今回限りのGit許可

S01〜S03は当該3候補だけ **FALSE POSITIVE / NON-CREDENTIAL / APPROVED**。S04〜S05は **historical UNKNOWN / UNRESOLVED** のまま、**HUMAN RISK ACCEPTED FOR THIS CHECKPOINT ONLY**。このcheckpoint後に許可を再利用しない。過去既知6件の限定判定とは別で、raw FAILをPASSへ変更しない。scanner allowlist／ruleを変更しない。

今回の条件はfresh full project（ignored含む）、full index、local history、distribution、TLS鍵index／history不在、新規候補0。条件を満たした場合だけ対象限定stage → 1 checkpoint commit → private origin/mainへの通常push。実際のSHA・refs・postflightは[checkpoint記録](../qa/game005-expansion-baseline-r1/REPORT.md)と、その後のPOSTFLIGHTに記録する。本文の受入／凍結状態をpush完了の証拠として扱わない。

## 次工程の境界

**Full Game Scope Research待ちで停止する。自動開始しない。** 港・高台・地区3〜5、新資源・新住民・新島・交易・offline収益・人口管理・管理画面・コンテンツ量産を許可しない。deploy／public registry／Cloudflare／広告／App Store／外部設定変更も今回の範囲外。

Physical iPhone／Safariは **NOT TESTED**、現時点の必須Gateではない。長時間継続、初見、市場性、実機性能、App Store適合は別の未確認事項として保持する。
