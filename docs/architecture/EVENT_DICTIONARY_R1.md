# Local Event Dictionary R1

送信先なし。`src/lib/analytics.ts` のinterfaceを使用。最新50件をページメモリで保持、ページを離れると破棄。連番はこのページ内だけ。記録項目はevent name、固定のgameId、ja/en、実装定義のresult code、sequence。利用者ID、IP、email、URL query、保存内容、座標、毎フレーム状態は記録しない。

| Event | 発火条件 / 解釈 |
|---|---|
| portal_session_start | sessionStorageに開始印がない初回ページ。storage拒否時はページ単位となるため実セッション数に使わない |
| game_card_open | registryゲームカード/内部featureを開く |
| game_load_start | iframeの新規load/retry開始 |
| game_load_success | origin/source/id/generation確認済みready受信 |
| game_load_error | iframe error / 8秒ready-timeout / qa-simulated |
| first_input | loadまたはresetから最初の有効パネル操作のみ |
| meaningful_progress | fixtureでは3パネル以上の点灯に初めて到達。実ゲームには固有定義が必要 |
| stage_complete | interfaceのみ。fixtureはステージを持たず発火しない |
| run_complete | fixtureで9パネル点灯に初到達。製品クリア/面白さの意味ではない |
| retry | 再読込または成功したreset |
| related_game_open | releasedの関連カードから移動。現在0件で実回遊データなし |
| language_change | 対応言語リンクのクリック。遷移前ページのメモリだけに残る |
| save_result | persisted / failed / reset / reset-failed |
| ad_opportunity | show-mock / unavailable / cooldown / busy |
| ad_resume | reward-granted / no-reward |

Portalイベントとゲームイベントは別のメモリバッファ。ゲームは検証パネルで確認できる。Portal側は開発者向けread-only観測関数 `window.__portalEvents()`、ゲーム側は `window.__gameEvents()`。後者もデータ輸送を持たない。page navigationを跨ぐ集計、return visitの同定、集客帰属は実装していない。

外部分析を導入するときは、目的、イベント辞書、同意、保持期間、集計の正確性、支出を再設計する。現在のログを本番analyticsとして流用しない。
