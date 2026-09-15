# Lightwork — Art Polish 01

2026-09-15 Human依頼。HumanはObject Designの改善を評価し、現在の鏡・受光器・シャッターの基本構造を維持した仕上げを指定。今回の比較元は開始時の最新Object Design。旧LG-Cへ戻さず、旧ソース・出力・証拠を保持する。

## 差分と境界

- 受光器：現在受光は明るいレンズ/光点、作動保持は外れた鉤形の留め金。光を外すとレンズだけ暗くなる。段階的な充電、待機、吸収ルールを追加しない。
- 門：四枚の板が四隅へ退き、解除した留め金を残す。小さなチェックは外し、対応紋章は維持。静止/演出の終点をともに `translate(±13,±13) scale(.4)` とし、退いた板を小画面でも残す。LG-Cの開門245ms/45ms、受光215ms、因果順序は変更しない。
- 鏡：回転台・軸・両面対称板を通常形に。回転矢印はL01未操作（案内文のdismissと独立）、対応機器のhover、keyboard focus時だけ。既存hitbox/入力/saveを維持。
- 光源/分光器：銀白の筐体、青い光学部、琥珀の光/作動部。光源の射出口、分光器の広い入口と細い出口を明示。微細な装飾や常時animationは追加しない。花・床・壁・光線の芯と経路は原本不変。

`light-polish-art.ts` / CSSと専用buildの描画接続だけ。既存Object view/motionを一致数assert付き変換で再利用する。LG-Cの音源・イベント計画・Runtime、全57問のルール・問題・保存・Undo、Tiny R2・Two Ways・Portal・依存・既存test/hook/scanner設定は変更しない。

## 参照とQA

[Object Design基準](LIGHTWORK_OBJECT_DESIGN_01.md) → [Pilot](LIGHTWORK_CRAFT_PILOT_01_R1.md) §0・2・5–6・11–12 → [R5](GAME_VISUAL_LANGUAGE_BASELINE_R5.md)。QA選択は[Playbook §4.2](../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md#qa-by-change)。

導入L01・保持L05・密集L16を同じ操作で比較。全18問の描画/結果、L13花の消灯、L15順次開門、日英/3表示、touch/keyboard、消音/reduced motion/320・390pxを確認。Tinyは既存frozen manifestの46ファイルを再現する。比較動画と結果は[一つのReview Pack](../qa/lightwork-art-polish-01/REPORT.md)。

## 停止点

実装・自己レビュー・局所修正・技術QA後、Humanレビュー待ち。初見理解は未実証、外部初見はDEFERRED / NOT TESTED、Lightwork実機・個別聴感はNOT TESTED、今回Art Polish/全57問Human全編受入/公開はPENDING。既知SHA誤検出とlocal TLS実秘密鍵の限定判定は別のまま保持し、新規候補へ拡張しない。stage / commit / push / deploy / LAN再公開 / 購入 / 外部送信は行わない。
