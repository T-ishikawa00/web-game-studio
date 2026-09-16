# Tinlumo — Portal brand decision R2

2026-09-16 最新Human判断。**Nolippa / Nolippa Studioの採用を撤回**し、ローカルRCのPortalブランドを **Tinlumo / ティンルモ**、制作元表記を **Tinlumo Studio** へ更新。制作元ブランドは法人名・公開運営者の確定ではない。名称選択とローカル反映のみ承認、商標確認完了・公開・購入・外部登録の承認ではない。

## 撤回理由と調査履歴

- Humanが追加調査で、現在営業中の既存事業 **NORIPPA（ノリッパ）** を確認したと報告し、撤回を決定した。今回の実装ではHuman報告を判断根拠として記録する。事業のURL・業種・運営主体・登録商標・権利範囲は提供されておらず、推測しない。こちらで営業状況や商標の独立検証を実施したとは扱わない。
- 旧[選択記録](NOLIPPA_HAKORILO_NAMING_R1.md)、[権利台帳](../records/ASSET_REGISTER_R1.md)、[Nolippa時点QA](../qa/soft-launch-rc-r1/naming-r1/REPORT.md)を保持。旧選択文書に撤回済み注記を追加。ジョルダンの2014年norippa発表は別の既存調査履歴として保持し、今回の営業中NORIPPAと同一事業だとは扱わない。
- **Tinlumoも商標・類似名称・権利確認は未完了。** domain/candidateはnull。取得済み・使用可能なdomainやメールアドレスを生成しない。Nolippaの旧domain候補は現行候補から外し、旧記録だけに残す。

## 実装とKEEP

中央正本 `src/rc/site.json` のブランド名・読み・制作元表記だけを更新し、既存テンプレート経由でHeader/Footer/title/description/OG/言語入口/404/運営草案へ反映。現行rights blockerをTinlumoの未確認へ変更。名称更新前後のQA出力は別フォルダに保存。

Hakorilo / ハコリロ / ちいさな配送パズル、他2作品の名称、registry、内部game ID、slug、保存・音設定キー・protocol、全57問、Art / Motion / Audio、RCの図形マークとfavicon、CSS・レイアウト、旧Baseline・比較画像/動画は変更しない。保存の削除・移行なし。

## QA / 停止

[最新の表示・route・保存回帰報告](../qa/soft-launch-rc-r1/brand-r2/REPORT.md)。変更影響に絞り、全編57問replay・動画・実機/聴感試験は再実行しない。過去の技術証拠とbyte一致を再利用。公開checkerは未確認の権利・運営情報・Human GateでBLOCKEDを維持。

stage / commit / push / deploy / LAN再公開 / 購入 / 契約 / 外部登録・問い合わせ送信0。実機・初見・全編Human受入・法務/公開許可へ自動PASSを付けず、**Human確認待ちで停止**。主担当実モデル `gpt-6-astra`。
