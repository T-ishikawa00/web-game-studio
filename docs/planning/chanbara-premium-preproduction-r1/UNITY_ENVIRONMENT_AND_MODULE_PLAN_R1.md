# Unity 6.3 LTS — Environment and Module Plan R1

2026-09-29 JST · **UNITY_PREPRODUCTION_PLAN_READY / NO_UNITY_INSTALL**

[総合入口](CHANBARA_PREMIUM_PREPRODUCTION_VALIDATION_R1.md)

## 1. 結論

**Unity 6.3 LTS 6000.3.19f1は既に存在する。Editorを新規installする必要があるという前提は誤り。** 今回はexe・導入folder・module metadata・Windows環境だけをread-onlyで確認した。Editor/Hub起動、activation、account操作、project作成、package解決、buildは行っていない。

最初の将来validation候補は既存 **6000.3.19f1 / Windows x64 / URP / Direct3D 11 / Mono**。新規projectでexact版を固定する案で、既存Chanbaraの移植ではない。公式で確認できた後続patch **6000.3.25f1（2026-09-24）** は更新候補として別記する。既存版でも後続版でも今回の動作保証はない。6.3 LTSの通常supportは2027-12まで。[公式support](https://unity.com/releases/unity-6/support) / [19f1 release notes](https://unity.com/releases/editor/whats-new/6000.3.19f1) / [25f1 release notes](https://unity.com/releases/editor/whats-new/6000.3.25f1)

19f1には特定assetでのproject終了crashやPlay Mode移行のimporter問題、25f1にも既知問題が掲載される。最新だから無条件PASSとしない。実際の候補assetを使う前の空project検証と、問題が再現した場合のpatch比較は次回承認範囲で行う。今回patch更新なし。

## 2. 現在のWindows環境

観測時刻：2026-09-29 00:11–00:15 JST。証拠：[windows-environment.json](internal/windows-environment.json) / [unity-modules.json](internal/unity-modules.json)。machine名、serial、user token、licensefileは取得しない。

| 項目 | 現物で確認 | 判断範囲 |
|---|---|---|
| OS | Windows 11 Home x64、10.0.26200 / build26200 | Windows x64 Editor候補。OS更新操作なし |
| CPU | Intel Core i7-14700F、20cores/28logical | CPU型番と64bit確認。benchmarkなし |
| RAM | 31.82GiB（公称32GB級） | 公式のEditor推奨最小8GBを上回るがscene性能は未測定 |
| GPU | NVIDIA GeForce RTX4060 Ti、8188MiB、driver591.59 | D3D11候補。driver更新、GPU stress testなし |
| Disk C: | 空き441.13GiB / 1861.94GiB | 観測時点。素材・Library・recordingの実容量はUNKNOWN |
| Hub | 3.19.4 | installed registryで確認。起動/loginなし |
| Unity6.3 | `C:\Program Files\Unity\Hub\Editor\6000.3.19f1\Editor\Unity.exe`、product版6000.3.19f1 | exe存在・version確認。起動成功/ライセンス状態UNKNOWN |
| 別Editor | 6000.5.3f1 | 既存保全。今回採用・upgrade元・削除対象にしない |
| Blender | 4.4.3、既存4.4 folder | 新規installなし。前研究の輸送成功を今回asset互換と同一視しない |
| C++ build tools | VS Build Tools2022 17.14、VC tools14.44.35207、x86/x64 component | installed componentをvswhereで確認。GUI IDE完全導入の証拠とは別 |
| Windows SDK | Include/Lib10.0.26100.0、SDK登録10.1.26100.7175 | IL2CPP要件の最低10.0.19041.0より新しい。build未実施 |
| Editor/Hub process | 監査時は検出なし | 既存process停止なし。他用途の起動状態を継続監視しない |

公式はWindows対応、CPU/GPU条件、8GB RAM推奨最小、IL2CPPのVS2019以降＋C++ tools＋SDK条件を列挙する。本機の基本構成に明白な不足は見つからないが、North Star品質・fps・import安定性を保証しない。[Unity6.3 system requirements](https://docs.unity3d.com/6000.3/Documentation/Manual/system-requirements.html)

## 3. Moduleとpackageを区別する

| 対象 | 今回の確認 | 最小visual validation案 |
|---|---|---|
| Windows Standalone Mono | `windowsstandalonesupport`とwin64 development/nondevelopment Mono variation存在 | 使用候補。追加module不要というfile上の見通し。buildは未実施 |
| Windows Build Support IL2CPP | module `selected:false`、Windows IL2CPP variationなし | **未導入と判断**。Editorの共通`il2cpp`folderだけではWindows module導入済と判定しない。初回visual validationには不要 |
| Android / iOS | folderとselected情報あり | 保全、利用しない |
| Web / Linux / UWP / server | module選択なし、該当support folderを確認できず | 今回不要。Steam Windows試験にもSteam登録は不要 |
| Visual Studio IDE | modules.jsonはCommunity2026 selected、vswhereはBuild Tools2022のみ | selectedをinstall成功の証明に使わない。初回は既存editorでC#編集可否を確認する計画のみ |
| Universal RP | 新validation project未作成のためinstall状態NOT TESTED | 6.3対応のUniversal3D template由来versionを固定。実解決前にpatch番号を捏造しない |
| Input System | 6.3公式のreleased欄は1.20.0 | 将来の候補。既存projectへ追加しない |
| Animation Rigging | 6.3公式のreleased欄は1.4.1 | 将来の候補。Two Bone IK等を利用。自動依存のBurst等もlock記録 |
| Physics / Animator / Particle System | Editor標準機能を使う設計 | DOTS Physics、外部controller、full-body ragdoll pluginは初回不要 |
| Recorder / Cinemachine | 今回未確認・未導入 | 必須にしない。承認済み録画手段と単純cameraで始める |

source：[Input System6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/com.unity.inputsystem.html) / [Animation Rigging6.3](https://docs.unity.com/en-us/engine/6000.3/manual/packages-list/packages-all/pack-safe/com-unity-animation-rigging) / [URP6.3](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/urp-introduction.html)。全URL閲覧2026-09-29。package download/依存追加はHuman承認後であり、Editorが既存という理由では許可されない。

## 4. 将来の実行計画（今回未実行）

1. Humanがexact Editor版と「隔離project作成・起動・必要package解決」の範囲を承認する。既存19f1を第一候補、後続25f1の追加は別選択。
2. 既存Editorを使う場合、新しいrepo内隔離directoryだけを指定。既存Web/Chanbara projectを開いて変換しない。activation/account操作が必要ならHumanに戻す。
3. URP、Input System、Animation Riggingのexact解決版と依存を記録。API/Cloud/Ads/Analytics/AI/Steamworksを追加しない。初回package解決のネット通信も承認範囲内だけ。
4. 権利確認済みの検証素材へ進む前に、空scene・compile・Windows Mono buildの基本経路を確認。sourceassetの取得許可はこれと別。
5. Windows IL2CPPが必要になった時点だけ、同一Editor版のWindows Build Support(IL2CPP)をHubから追加する計画。既存C++/SDKを先に再確認し、VS全体の重複installを避ける。
6. 将来新しいPCでEditor未導入なら、公式Hub→指定6.3patch→Windows Editor＋必要Windows moduleだけを選ぶ。ダウンロード容量・展開容量は当日の公式表示で記録し、現在UNKNOWNの容量を架空で埋めない。

提案するworking budgetはproject/Library/数点asset/録画用に50–100GiBの余裕を確保すること。これはUnity公式の必要容量ではなく運用仮説。今回外部・global・Hub設定への書込み0、license適格性・activationはUNKNOWN。
