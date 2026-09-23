# Game005 Expansion R1 — Human Security disposition

2026-09-23。Authorityは最新Humanの `GAME005 EXPANSION R1 / HUMAN SECURITY DISPOSITION`。対象は[提示済み判定票](GAME005_EXPANSION_R1_CANDIDATE_DISPOSITION_PENDING.md)のS01〜S05だけ。旧PENDING資料とraw FAILは当時の証拠として保持する。

| 対象 | 技術状態 | Human disposition | 適用範囲 |
|---|---|---|---|
| S01・S02・S03 | 当時の構造解析記録によるDER SPKI公開拡張鍵 | **FALSE POSITIVE / NON-CREDENTIAL / APPROVED** | 今回提示した3候補だけ。他の公開鍵、generic-api-key検出、将来候補には適用しない |
| S04・S05 | **UNKNOWN / UNRESOLVED**。再分類しない | **HUMAN RISK ACCEPTED FOR THIS CHECKPOINT ONLY** | 今回のGame005 Expansion R1 checkpointに限る。安全性の証明ではなく、将来checkpoint・releaseへの承認ではない |

共通検出元：`game005-island/expansion-r1/.cache/browser-temp/playwright_chromiumdev_profile-6YTZix/Default/Secure Preferences`。Gitleaks generic-api-keyの5検出。QA生成temporary Playwright／Edge profile、not tracked／ignored。元fileは現在不存在。確認済みindex／local refs・reflogs／distributionに元file収載なし。元candidate value／fingerprintがなく、値コピー不在の証明や技術的再分類はできない。

HumanがS01〜S03について採用した根拠は当時のDER SPKI公開鍵構造、private key／credential／authentication secretである証拠なし、および上記の生成元・混入確認である。S04〜S05は外部配信・provider secret露出を示す証拠なしという限定された証拠を踏まえ、技術的不確実性を明示して今回のみリスク受容した。provider credentialを推測しない。

scanner allowlist追加、generic-api-key rule緩和、過去／将来候補への承認転用、根拠のないrotationは禁止。元の[5件raw FAIL](../../game005-island/expansion-r1/review/security-active-browser-scan.json)を変更しない。過去既知6件の承認とは独立したHuman判断である。

## 今回限りのcheckpoint条件

full project scan（ignored含む）、full index scan、local history scan、distribution scan、TLS local keyのindex／history不在、新規candidate確認を再実行する。**新規候補が出た場合は停止**。新規0かつ対象index／history／distribution PASSでのみAccepted Progression Baselineの記録、対象限定stage → checkpoint commit → private origin/mainへの通常pushを許可する。

無関係な既存作業、Accepted MVP Baselineを変更・収載しない。hook／scannerを迂回しない。commit／push後にHEAD・origin/main・actual remote main・ahead/behind・index・worktree保全を確認する。deploy／public registry／Cloudflare／広告／App Store／外部設定変更は禁止。

今回の進行・検査結果は[checkpoint記録](../qa/game005-expansion-baseline-r1/REPORT.md)を参照。成功時の停止状態は **GAME005_EXPANSION_PROGRESS_BASELINE_FROZEN / FULL_GAME_SCOPE_RESEARCH_PENDING**。Full Gameへ自動移行しない。Physical iPhone／SafariはNOT TESTEDを維持する。
