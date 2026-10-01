# Desktop / Mobile / Accessibility

Desktop: mouse drag/releaseが主、Arrows/WASD＋Space/Enterがfallback。canvas focus時に方向/発射keysを処理する。Escはwindow-level toggleで、repeat guardはない。result時Enterで同じ配置Retryし、同じeventがwindow listenerへ伝播すると最初の上向き発射も進み得る（sourceからの推論）。これらはAccepted挙動として保全し、統合candidateの入力回帰項目に含める。設定buttonへfocusを移しただけではRunは停止しない。画面のPause/Resumeも使用可能。

Mobile: Pointer Eventsのprimary finger drag/release、touch-action:noneはgame canvasのみ。追加pointerで照準を奪わない。pointerupの最終座標で発射、pointercancel/unexpected lost captureで取消。回復中の1回予約はpause/blur/hidden/restartで消す。予測経路とfinger occlusion lensを保つ。

論理arena540×760。縦持ち推奨。viewport metaとCSSのdvh、safe UI、scroll/touchを統合frameで再確認。JA/ENの320×568、360×640、390×844、844×390を確認済み。主要ボタン44px以上。縦長arenaが横画面では小さくなり精密照準は難しい。

要求するdevice/OSの最低model・最低browser versionは未確定。Canvas2D roundRect/ellipse、Pointer Events/capture、matchMedia/Intl、CSS min()/dvh等も必要。physical smartphone、iOS Safari、low-performance deviceのRelease QAで決定する。desktop Windows Chrome/IAB結果をmobile保証にしない。hostは選定takeで約59.94–60 draws/wall-second、Full60 CPU draw p95 .6ms。GPU/低性能phone/Safari性能の証明ではない。simulationは120Hz、RAF deltaを100msへclampするため、visible stallで60 active secondsが60 wall secondsより長くなる場合がある。

Accessibility: mute、低FX、prefers-reduced-motion初期値、keyboard操作、focus outline、pause、形状によるsoft/relay/armor区別、JA/EN aria labels、result polite live announcement。初期localeはnavigator.languageがjaならJA、他はEN。toolbarで手動切替。language/mute/FXは永続保存しない。

部分対応: screen-readerのみで空間アクションを完結する設計ではない。remapping/gamepadなし。高連鎖時の小popupが重なる場合がある。Portal wrapperでcanvas縮小、常時header/ad slotで遮蔽、focus trapやtouch scroll競合を作らない。物理phone上のfinger occlusion、browser chrome、safe-area、orientation、音の復帰を実際に検証する。
