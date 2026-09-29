# Hillside R1 — interrupted work / preservation

2026-09-23。**NOT READY / HUMAN_SECURITY_DISPOSITION_PENDING**。

[今回の仕様・停止記録](../../../docs/games/GAME005_HILLSIDE_REPRESENTATIVE_SLICE_R1.md)。実装はこの隔離candidateのみ。Accepted原source／build／save／manifestは変更していない。

## Security stop

[Active browser scan](security-active-browser.json)：Gitleaks8.30.1 raw FAIL、新規11候補。秘密値・断片は非出力。file/type/action以外の候補内容を含まない。

| file（candidate rootから） | type | action |
|---|---|---|
| `.cache/browser-temp/playwright_chromiumdev_profile-32i3MC/Local State` | generic-api-key：1候補 | HUMAN REVIEW REQUIRED |
| `.cache/browser-temp/playwright_chromiumdev_profile-JdI4wx/Default/Secure Preferences` | generic-api-key：5候補 | HUMAN REVIEW REQUIRED |
| `.cache/browser-temp/playwright_chromiumdev_profile-32i3MC/Default/Secure Preferences` | generic-api-key：5候補 | HUMAN REVIEW REQUIRED |

全11候補についてcredential／non-credentialの技術判定は未実施。前回の公開鍵候補と同じdetector／browser由来でも同じ判定を適用しない。S04/S05 historical UNKNOWNと使用済みcheckpoint-only risk acceptanceを保持する。配布dist scanはPASS／0だが、全candidate PASSへ読み替えない。full project／index／history scanは今回未実施でGit許可もない。

新規候補検出により通常入力script A/Bの今回processだけを停止。手動のbrowser profile削除・値の複製・rotation・allowlist追加・rule緩和なし。完走しなかった動画／途中証拠はHuman受入資料へ昇格しない。

## 実施した検証

- strict TypeScript check：PASS（最終camera／copy微調整前の実行。buildはその後もPASS）。
- candidate build：PASS。既存500KB超warningは抑制していない。
- [unit / simulation 31 tests](unit.txt)：PASS。旧MVP回帰、入り江回帰、高台4構成×広場2配置、save roundtrip、高さ、旧地区と丘の利用、idle→work→idle、拒否／返金。これはbrowser通常試遊の代替ではない。
- [MVP開始](mvp-before.json)／[停止後](mvp-after.json)：133入力・隔離22派生一致。
- [Expansion開始](expansion-before.json)／[停止後](expansion-after.json)：102入力＋4依存・隔離12派生一致。
- technical seeded描画確認：実施。`.cache/technical-*.png`は調整用だけで、通常試遊／Human Craftの証拠ではない。
- 通常入力A/B：開始から桟橋／作業場／市場付近まで進行、Securityで中断。丘の通常完走は0。動画完走0。

## 未実施

最終のbrowser回帰・JA/EN／mobile／Gallery、hill途中保存のbrowser確認、quota／conflict／破損、hit test、通常比較画像・等速完成動画、性能測定、long-session、独立完成物review。再開後に候補scriptsの未適応scaffoldを確認する。入力が受理された場合だけの音・無音／reduced・pauseの最終確認も残る。

物理iPhone／Safariは **NOT TESTED**。現在のPC画像・simulationを実機性能・Human受入へ一般化しない。

[preservation.json](preservation.json)に開始3,727files、旧Current内容、Git HEAD/upstream/index、Accepted配布物の照合を記録する。今回のCurrent block追加以外の既存成果を保全。HEADは`39d2b13d09de5b85eed169fd79a6c3cb78270aef`。

主担当モデルgpt-6-astra、独立read-only構造助言gpt-6-astra。助言の初期hill位置は母屋増築部分と近いため採用せず、候補では既存島の北東側へ調整。完成物の独立受入は未実施。stage／commit／push／外部設定変更0。
