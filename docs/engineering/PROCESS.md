# Development Process & AI Collaboration

企画、候補比較、実装、技術QA、Human受入、releaseを段階ごとに記録してきました。過去Gateや採用Baselineを後から一律PASSへ変更しません。

| 工程 | 主な成果と判断 |
| --- | --- |
| 目的・制約 | Humanが事業方針、対象、保全、費用・外部操作の境界を指定 |
| 企画・visual | 参考・conceptと実ゲームを区別し、Humanが選択・採用 |
| Gold Craft Slice等 | 新作ごとのGateとHuman受入範囲を記録 |
| 実装 | AIがlogic、描画、UI、音、素材、adapter、tests等を制作・修正 |
| 技術QA | 影響に応じた型、unit、build、route、browser、保存・失敗等 |
| Human review | 画像、実物、音、操作を確認。技術PASSと区別 |
| Release | 個別承認、scope manifest、Security、通常push、当時の配信照合 |
| 終了・保全 | 公開経路撤去と履歴・配布物・重要原本保全を別々に記録 |

Humanが判断・制約・受入・公開権限を持ち、AIが実作業を支援しました。Game008の[RIGHTS](../../game008-009-production-r1/game008/inputs/package/source/docs/release/RIGHTS.md)等にはAIによる実装、course、Canvas artwork、copy、tests、docsの制作が記録されています。本人の手書き率やAI使用率は確認できません。

初期5作品のprocedural artworkと、後期remaster3作品のAI bitmapは版を分けて[権利文書](ASSETS_RIGHTS.md)に記載しています。販促coverを実play captureとは呼びません。

今回の主担当、調査、独立レビューのモデルとruntime ID確認可否はReport（参照原本はPrivate保全・候補には非同梱）に記載します。推奨Tier名から実runtime IDを推定しません。独立レビューの設定モデルは`gpt-6-luna`です。

規範はSTART_HERE（参照原本はPrivate保全・候補には非同梱）、[Playbook](../planning/WEB_GAME_STUDIO_PRODUCTION_PLAYBOOK_R2.md)、AGENTS（参照原本はPrivate保全・候補には非同梱）、各作品のSPEC / 採用記録です。旧文書の命令形は新しい作業権限ではありません。
