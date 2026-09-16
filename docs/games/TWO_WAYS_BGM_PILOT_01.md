# Two Ways Home BGM Pilot 01

2026-09-16 Human依頼。TW-C Human Craft採用をBaseline R1として1 checkpoint/push・HEAD/origin/main/実remote一致後に開始。

## Goal / 比較

BGM追加が採用済みTW-Cの体験品質を明確に上げるかを比較する。**BGM採用は必須ではない。** Cは正式採用のBGMなし、D1はC＋playful minimal / wood-toy、D2はC＋calm quirky / light ambient。

- D1「Two little detours」：40秒。間を空けた短い木質音、低い支え、不均等な句と休み。常設のdrum・metronomeなし。
- D2「Windows at dusk」：48秒。柔らかい低中域の持続音と疎な丸い音。長いreverbなし。
- ローカルの独自譜面・決定的な合成のみ。外部音源API・購入・契約なし。Tiny/Lightworkの具体音・曲は流用しない。
- BGM既定gainは両候補18%、SFXは採用値のまま。盤面入力時はBGMだけ短く28%へ退かせ、SFXの芯を優先。片方帰宅・出直しに追加祝福なし。同時clear確定時はBGMを短く停止し、180ms後の採用clear SFXを保護する。

## Keep / lifecycle

採用TW-Cのsourceと配布44ファイルをbuild前に照合し、専用cacheへ同じbyteをコピー。BGMは別entry/別音源のみ。入力、ルール、全21問、保存、Undo、Motion/SFX時刻、R5・日英・3表示、Tiny R2・Lightwork Craft・全57問・Portalを変更しない。

trusted盤面操作からだけBGM再生。ロード・decodeは非同期で入力を待たせない。1sourceでloopし毎手再開始しない。menu/settings/表示形式や幅変更/hidden/blur/pagehide/mock広告で停止。表示復帰だけで自動再生せず、次のtrusted入力を必要とする。BGMの停止位置は同じ曲の再開時に保持し、方向変更では曲頭へ戻る。古い非同期開始は世代確認とfetch取消で破棄。

`wgs:music-pilot:two-ways-home`の音楽設定はゲーム進行・SFX・他作品から独立。master muteはSFX/BGM共通、各gainは独立。破損/未来versionの原文保持、書込拒否/無反応は保存できないと表示。Cでは音楽を開始せず、選択曲の既定条件は新しい比較へ移った時だけ適用し、同条件reloadは設定を維持する。

## Review / QA / 停止

[Review Pack](../qa/twoways-bgm-pilot-01/REPORT.md)に日英試遊、同じ代表面・操作列の9動画、単体音源2本、各330秒の実時間loop、lifecycle・失敗回復・凍結保全を集約。

技術QAとHumanの「思考を邪魔しない・SFXを埋めない・反復疲労がない・明確に良い」は別Gate。BGM聴感/採用は **PENDING**、実機 **NOT TESTED**、外部初見 **DEFERRED / NOT TESTED**、全21問/全57問ゲーム性・公開は未受入。

このPhase 2のstage/commit/pushは0、Human BGMレビュー待ち停止。deploy・LAN再公開・購入・契約・外部音源API・外部公開は禁止。Secret限定2件の別判定を保持する。
