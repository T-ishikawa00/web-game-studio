# Game005 Hillside R1 — Human Security disposition

2026-09-23。Humanは今回再検出・技術分類したcurrent H01〜H11のみを承認。対象file／structured pathは[分類Review](GAME005_HILLSIDE_R1_SECURITY_CLASSIFICATION.md)と[候補別記録](../qa/game005-hillside-security-classification-r1/classification.json)で固定する。分類時のPENDING記録を履歴として上書きしない。

| current candidate | Human disposition | 限定scope |
|---|---|---|
| H01 | TRUE SECRET / LOCAL TEMP QA PROFILE ONLY / APPROVED FOR LOCAL RETENTION | 今回確認したcurrent candidateのみ。FALSE POSITIVE／NON-CREDENTIAL化、Git収載、配布、allowlist化は禁止 |
| H02 / H03 / H04 / H07 / H08 / H09 | PUBLIC KEY / NON-CREDENTIAL / FALSE POSITIVE / APPROVED | 今回分類した6候補のみ |
| H05 / H06 / H10 / H11 | PROFILE INTEGRITY METADATA / NON-CREDENTIAL / FALSE POSITIVE / APPROVED | 今回分類した4候補のみ |

原scan時の値との同一性はUNKNOWN。原raw FAIL 11件を技術的に完全解決済みに変更しない。過去S04/S05 UNKNOWN / UNRESOLVED、使用済みcheckpoint-only risk acceptanceを維持し今回へ転用しない。今後のcandidateや別の公開鍵・integrity fieldへの自動適用は禁止。

## QA harnessの限定例外と再開範囲

Humanはbrowser自身が生成するprofileをproject treeから分離するため、**今回のQA runが生成する専用OS temporary rootへのrepo外書込みと、そのrunが所有するdirectoryだけのcleanup**を明示許可。通常のrepo内書込み原則に対するこの限定例外を適用する。他repo／global設定／personal browser profileへの変更は許可されない。

- QA runごとに新規temporary profile。persistent personal profile・login済みprofileコピー・real account loginを使わない。
- 実profile pathをGit／配布物へ記録しない。scanner／allowlist／hookを変更しない。
- 既存repo内profileとSecurity evidenceはそのまま保全。新runのcleanupは所有rootを検証し、他browser／profile／processに触れない。
- Accepted gameplay／UI／save／Baselineを変更しないharness改善後、隔離Hillsideのlocal implementation／QA／Reviewを再開可。
- 新規Security candidateで再停止。stage／commit／push／deploy／public registry／Cloudflare／Ads／App Store／external settingsは禁止。

Human Final Scope Gateは未通過。目標は GAME005_HILLSIDE_REPRESENTATIVE_SLICE_R1_READY / HUMAN_FINAL_SCOPE_GATE_PENDING。Full Game Productionへ進まない。
