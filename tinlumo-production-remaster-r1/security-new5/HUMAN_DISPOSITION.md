# New five candidates — Human disposition, this RC only

2026-09-27。最新Humanメッセージにより以下を承認。対象は **Tinlumo Production Remaster R1の今回RCだけ**。

対象file: `marketing/m01-post-ready-r1-2026-09-26/internal/browser-profile/Default/Secure Preferences`

| Candidate ID | Human disposition |
|---|---|
| TRR1-NEW-01 | FALSE POSITIVE / NON-CREDENTIAL / APPROVED |
| TRR1-NEW-02 | FALSE POSITIVE / NON-CREDENTIAL / APPROVED |
| TRR1-NEW-03 | FALSE POSITIVE / NON-CREDENTIAL / APPROVED |
| TRR1-NEW-04 | FALSE POSITIVE / NON-CREDENTIAL / APPROVED |
| TRR1-NEW-05 | ENCRYPTED LOCAL INTEGRITY METADATA / RESTRICTED LOCAL RETENTION ONLY / HUMAN APPROVED |

05はFALSE POSITIVE／NON-CREDENTIALに変更しない。平文内容・復旧可能性は **UNKNOWN**。Git index、reachable history、distribution、Production artifactへの収載は禁止。対象browser profileをProduction asset・証拠配布物へコピーしない。

この承認は他候補・他profile・将来候補に転用しない。開始時保全記録と同一ファイルであること、候補構造・5件の対応、artifactの同一性をfresh gateで再確認する。元候補値を独立保存したreceiptはないため、以前の同一性に関する証拠限界は維持する。

scanner、allowlist、Securityルールは変更しない。過去17件・historical11件・S04/S05の既存判定を変更しない。raw scan FAILをPASSへ書き換えない。

Humanが今回許可した次工程はfresh security gateのローカル再検証まで。追加新規候補0、full index／reachable history／distribution PASS、対象profileのscoped manifest除外が成立したときだけ、今回RCのSecurity Gateを解除可能として報告する。stage／commit／push／deployは許可されていない。最終停止は **HUMAN PRODUCTION RELEASE GATE PENDING**。

以前の [解析・推奨表](DISPOSITION_REVIEW.md) と [解析結果](disposition.json) は承認前の記録として保全し、本書が今回5件のHuman判断を追加する。profileのGit ignore対象外という事実も維持する。`git add .`は禁止。

この文書は承認記録であり、fresh検証の成功を先取りしない。結果は [fresh gate report](../review/security-fresh-gate.json) を参照。
