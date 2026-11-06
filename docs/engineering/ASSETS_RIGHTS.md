# Assets, Credits & Rights

Private repositoryとして保管します。公開licenseを新規付与していません。第三者libraryのMIT等のnoticeはそのlibraryに適用され、Tinlumo全体の再配布許可ではありません。

| 区分 | 例・扱い |
| --- | --- |
| 編集source | 作品別TS / JS、templates、save schema。採用版とarchive差分を保全 |
| 元素材 | archiveの器状態PNG等。配布用変換画像と分ける |
| 公開artifact | 固定commit / manifest / Git treeで同定 |
| build入力 | 先行artifact、pinned package。重複として一括削除しない |
| QA / Review | result、manifest、Human採用、capture。旧URL・権限を再利用しない |
| Shared / Chanbara / UNKNOWN | 他企画、共有tool、未照合local-only。今回変更・移動・削除しない |

全local-only素材の所有権・原本性を確認済みとはしていません。開始時の未追跡14,362パスには別企画と保全資料も含まれます。

## Artworkと版

最終[EN Credits](../../tinlumo-visual-remaster-final-integration-r1/builds/candidate/en/credits/index.html)は、初期5作品のcodeによる3D形状、game描画からのcover、合成音を説明しています。初期Art Direction用AI conceptはこの5作品の配布画面・coverには使っていないという記録です。

同creditsはRIMBLOOMの温室背景、COILHOPの雲上庭園背景、EMBER & GLAZEの窯・器状態素材へのAI生成画像使用を説明しています。初期packageの「外部画像なし」等をfinal remasterへ流用しません。

README画像は今回の5作品復元版からの実browser captureです。人物、account、browser chrome、秘密値、profile、内部QA一覧を含めず、ゲームだけを掲載します。[撮影条件](SCREENSHOTS.md)。これは全mediaの法務確認ではありません。

## Noticeと限界

| 根拠 | 対象・制約 |
| --- | --- |
| [ASTRO-LICENSE](../../release-artifacts/tinlumo-copy-debt-r1/licenses/ASTRO-LICENSE.txt) | 配布物に保存されたAstro notice |
| 各runtimeの`THREE-LICENSE.txt` | 初期5作品のThree.js notice |
| [依存license inventory](../records/DEPENDENCY_LICENSES_R1.json) | 2026-09-13 lock metadata。legal clearanceではない |
| [COILHOP rights](../../game008-009-production-r1/game008/inputs/package/source/docs/release/RIGHTS.md) | 当該packageの制作由来 |
| [RIMBLOOM rights](../../rimbloom-complete-r2-integration/inputs/standalone/docs/RIGHTS.md) | 販促coverと実playの区別 |
| [EMBER initial rights](../../game008-009-production-r1/game009/inputs/package/source/docs/rights.md) | final bitmap追加前の範囲 |

従来video policyは通常playの動画・captureと、本体・抽出素材の再配布を区別します。事業終了を超える新規許諾、全素材の権利確定、外部公開は今回の整理から推定しません。

scannerは画像・動画のOCRや全個人情報の意味理解を行いません。新規captureは目視確認し、過去全mediaの全面的な個人情報監査はNOT TESTEDとします。profile、Cookie、鍵、環境secret、未判定候補はREADME / Reviewへ転載しません。
