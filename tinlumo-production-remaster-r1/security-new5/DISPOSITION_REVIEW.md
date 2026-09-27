# Tinlumo Production Remaster R1 — 新規5件 Human disposition review

2026-09-27。**推奨のみ／Human未承認／RELEASE GATE CLOSED**。

今回の新規5件だけをローカル解析した。過去17件、historical11件、S04/S05の判定・Security設定・既存Gate報告は変更していない。候補値、断片、候補／対象ファイルの完全fingerprint、復号内容は本資料・新規出力に含めない。外部照会・復号・credential使用・削除・rotation・profile変更・allowlist変更・Git書込み・deployは行っていない。

## 共通の対象

- File path（5件共通）: `marketing/m01-post-ready-r1-2026-09-26/internal/browser-profile/Default/Secure Preferences`
- File type: Microsoft Edge / Chromium persistent profile の `Secure Preferences` JSON。
- Scanner: Gitleaks 8.30.1 / `generic-api-key`。5件ともJSON文字列のleaf全体への一致。汎用ルールによる検出であり、有効なAPI credentialだと検証した結果ではない。
- Browser由来: `marketing/m01-post-ready-r1-2026-09-26/internal/verify.mjs:20` が、同じディレクトリを `launchPersistentContext`、`channel: msedge` で使用。ローカル動画QA用profileの書込みデータと判断する根拠がある。ファイル生成時のOS監査記録はないため、個別write主体を監査ログで証明したものではない。
- 公開鍵3件は「browserが保存したmanifestの公開鍵」であり、「browser自身が鍵ペアを生成した」とは判断していない。
- IDは今回の同一ファイルに対するscanner順序に対応。拡張機能ID等は出力しない。ファイルが変化した場合はこのID対応・推奨の再利用を止め、再確認する。

## 候補別判定表

| Candidate ID | Structural context | 分類・credentialとしての構造 | 推奨disposition | 推奨根拠 | 残る不確実性 |
|---|---|---|---|---|---|
| TRR1-NEW-01 | `extensions.settings.[entry 1].manifest.key` | RSA公開鍵。秘密credentialとしては利用不可。 | **A案：FALSE POSITIVE / NON-CREDENTIAL**。APPROVEDはHuman判断待ち。 | 候補全体をローカルでDER SubjectPublicKeyInfoとして解析でき、public keyと確認。秘密鍵の署名・復号能力を含まない。 | 配布元や拡張機能の信頼性は外部確認していない。公開鍵という判定は拡張機能やprofile全体の安全承認ではない。 |
| TRR1-NEW-02 | `extensions.settings.[entry 2].manifest.key` | RSA公開鍵。秘密credentialとしては利用不可。 | **A案：FALSE POSITIVE / NON-CREDENTIAL**。APPROVEDはHuman判断待ち。 | 01とは別leafについて、同じ公開鍵構造検証を独立して実施。 | 01と同じ。外部providerでの認証・検証は未実施。 |
| TRR1-NEW-03 | `extensions.settings.[entry 3].manifest.key` | RSA公開鍵。秘密credentialとしては利用不可。 | **A案：FALSE POSITIVE / NON-CREDENTIAL**。APPROVEDはHuman判断待ち。 | 01・02とは別leafについて、同じ公開鍵構造検証を独立して実施。 | 01と同じ。外部providerでの認証・検証は未実施。 |
| TRR1-NEW-04 | `protection.macs.enterprise_signin.policy_recovery_token` | 設定保護用の整合性MACメタデータ。直接使うcredentialの構造は観察されない。 | **A案：FALSE POSITIVE / NON-CREDENTIAL**。APPROVEDはHuman判断待ち。 | 検出leafは `protection.macs` 内の整合性値。末尾は保護対象設定の名前であり、実際の `enterprise_signin` token設定そのものとは位置が異なる。整合性値の形式とも一致。 | MACの再計算、真正性、内部アルゴリズム／鍵は検証していない。別位置にある実tokenの有無・有効性を調査した判定ではない。 |
| TRR1-NEW-05 | `protection.macs.enterprise_signin.policy_recovery_token_encrypted_hash` | 暗号化されたローカル整合性hashと整合する構造。平文内容は未確認。 | **D案：ENCRYPTED LOCAL INTEGRITY METADATA / RESTRICTED LOCAL RETENTION ONLY / HUMAN PENDING**。平文分類が必須なら **C：UNKNOWN / UNRESOLVED**を維持。 | 設定保護のMAC領域、`encrypted_hash`フィールド、Chromiumのversion付き暗号化envelopeと整合する形式をローカルで確認。平文API key・tokenとして直接使用できる構造は観察されない。 | 平文、暗号方式・鍵との対応、OS／browserによる回復可能性、04と同じMACを暗号化したものかはUNKNOWN。復号していないため **TRUE SECRETと断定するB案にも、平文まで検証済みのA案にも進めない**。 |

D案は「現在の限定されたローカル保全という取扱い」の提案であり、既に保持承認済みという意味ではない。05の内容を秘密ではないと確定せず、Human判断まで慎重な取扱いとGate停止を維持する。

## 収載・到達性・同一性（各候補）

| Candidate ID | current fileがGit indexに含まれるか | reachable historyに含まれるか | Production配布物に含まれるか | 現RC artifactから到達可能か | 元候補との同一性を検証できるか |
|---|---|---|---|---|---|
| TRR1-NEW-01 | NO | NO | NO | NO（ローカルartifact検査） | 同一開始時ファイル＋再検出で検証。下記の証拠限界あり。 |
| TRR1-NEW-02 | NO | NO | NO | NO（ローカルartifact検査） | 同上 |
| TRR1-NEW-03 | NO | NO | NO | NO（ローカルartifact検査） | 同上 |
| TRR1-NEW-04 | NO | NO | NO | NO（ローカルartifact検査） | 同上 |
| TRR1-NEW-05 | NO | NO | NO | NO（ローカルartifact検査） | 同上 |

確認方法と境界：

- full Git index／全reachable refsで、対象pathと現在ファイルの完全一致blobの不在を確認。履歴中のあらゆる断片・変形・別encodingまで不存在と証明したものではない。remote/providerへの照会はしない。
- 新RC `release-artifacts/tinlumo-visual-remaster-r1/` 全101ファイルと、現行Productionのローカル保存artifact `release-artifacts/game005-web-v1/` 全84ファイルを、今回5候補だけについてメモリ内で比較。候補の文字列表現と対応するbinary表現の一致は0。対象profileファイルも新RCにない。
- 新RC内にprofileへ向かうsymlinkはなく、専用ローカルserverの配信rootはartifactとReviewに限定される。repo内profileへの到達経路を配布構造に認めない。実Productionのlive配信・外部provider設定を確認したものではない。
- 対象は **untrackedかつGit ignore対象ではない**。収載されていない事実を「ignoreに守られている」と読み替えない。今回ignore設定は変更しない。将来のscoped stageでもprofileを対象外に保つ必要がある。
- Remaster開始時の `internal/before.json` に対象ファイルの既存記録があり、現在の全byteがその記録と一致。比較はメモリ内で行い、fingerprintは出力しない。今回再scanで同じ5件・同じruleを再現した。
- 元scanはfile/type/actionだけを保存しており、各候補の元値・元fingerprintを独立保存していない。したがって **開始時と同一のファイルから5件を再現できる**が、**独立した元候補値receiptと直接比較した**という証明はない。scan時点の一時的変更と復帰まで否定する監査ログもない。

## 停止状態と保全

**SECURITY_RELEASE_GATE_STOPPED / HUMAN DISPOSITION PENDING**。

01〜04はAの承認候補、05はDの限定分類候補として提出する。過去候補の承認は今回へ一切転用しない。Humanが承認するまでは5件とも未承認。今回の解析は、raw FAIL22、過去17件、historical11件、S04/S05、既存release gateを変更しない。

対象profile、既存Security文書、scanner設定／関連script、既存Gate・Security報告、PRODUCTION_CURRENTは解析前後の一致を確認。新規成果はこの `security-new5/` ディレクトリだけ。値・長い値断片・fingerprintが新規成果に含まれないことをローカルで照合した。OSや既存ツールの内部動作まで完全なメモリ消去を保証するものではない。

実利用model ID: **UNKNOWN（正確なIDが非公開）**。外部資料・外部APIを使用せず、ローカル構造・暗号公開鍵パーサー・既存生成sourceに限定した解析。

- [機械可読の値なし結果](disposition.json)
- [ローカル解析script](analyze.mjs)

scriptはscannerの生結果をprocess内だけで受け取り、標準出力／保存先には許可されたメタデータだけを出す。再実行時も対象profileの変化と開始時同一性を確認し、以前の推奨を無条件に使い回さない。
