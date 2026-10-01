# Portal integration requirements — next task, no integration in this pack

本packはproduction用のAccepted game sourceとstatic buildを渡す。現在のWeb Game Studio/Portalに変更を入れていない。Portalの最新schema/paths/Consent Cのauthorityは今回検証していないため、既存契約へ適合済みとは宣言しない。

1. **Authority / integrity**: HUMAN_ACCEPTANCE.jsonとbaseline hashを先に確認。source9+dist9を比較。speed1450/.62dash/.23recovery、60秒、chain propagation、pacing、renderer/SE、Result/Retry/JA-ENを不用意に変更しない。baselineを編集せず別integration candidate。
2. **Mount / asset base**: Accepted HTMLはorigin-root /src/style.css と /src/game.mjs。専用origin/root、または別candidateで2URLをgame baseへ調整。module内relative importsは同じsrc treeを保つ。実Portalのdirectory convention、slug、trailing slash、404/reloadを確認してから統合。proposed slugはrimbloom/game007、未登録。global /srcをPortalで上書きしない。
3. **Catalog / art**: catalog/ja-en.jsonのtitle/description/controlsとcover candidateを既存のschemaへ写す。cover寸法/aspect/altをPortal現行契約に合わせる。新thumbnailはlisting候補でありHuman Accepted Gameplay visualの差し替えではない。
4. **Storage**: localStorageのnamespace1key。origin隔離はpath隔離ではない。既存save/Consent Cを保全し、衝突/migration/consent拒否を別review。4187ローカル記録をproductionへ移さない。
5. **Input / lifecycle**: canvas focus、mouse/touch ownership、pointercancel、queued shot、blur/visibility pause、keyboardイベントとPortal navの共存。iframeの場合親Page exit/hideが子へ適切に伝わるか、独立candidateで確認。現在はstandalone full-pageで起動する構造。CSSは:root/body/*/button/navへ適用し、汎用IDsとdocument.querySelector('nav')を使うため、Portal DOMへinline移植すると衝突しうる。dispose/unmount/postMessage/parent pause APIはない。SPA mount/remountでwindow listenerやRAF/audio graphを重複させないことは未検証。独立documentのiframeを選ぶ場合も、local previewのframe-ancestors noneは埋込を拒否するので、productionのembedding policyを別途決める。現在のheadersをそのまま埋込用としない。
6. **Audio / a11y**: user gesture unlock、Portal global muteとの接続を検討。BGMなし/短SEのAccepted方針、mute/lowFX/focus/JA-EN shape labelsを維持。Safari/physical phone実機確認が必要。
7. **Security / public surface**: deploy対象はruntime9filesだけ。QA/scripts/tests/evidence/package/manifestsの不要公開を避ける。/__recordと/__qaは公開しない。?review=1をroute layerで拒否/無効化するか、別candidateでQA UIだけを除いたentryをレビューする。現packはAccepted runtime bytesを維持。ES moduleのMIMEをJavaScriptにし、appropriate CSP/self-only・nosniff・HTTPSを既存hosting契約で設定。camera/microphone/geolocation不要。外部script/CDNなし。
8. **Ads**: 今回SDK/ads/Consent変更は一切ない。将来の自然候補はRun終了/Game Over/retryの境界。run/dash/chain中に広告を要求せず、広告待ちが即Retryをどう変えるかを別Human Gateで判断。
9. **Release gates**: physical smartphone / iOS Safari / low-performance deviceを完了。integration candidateのpath/save/Consent/input/audio/JAEN/Portal戻り/既存games回帰を検証。Humanが明示的に公開・deployを許可するまではremote operationを行わない。

今回はWeb Game Studio変更、Portal統合、Git stage/commit/push、Production deploy、public release、ads integrationを行わず、WEB_GAME_STUDIO_INTEGRATION_PENDINGで停止。
