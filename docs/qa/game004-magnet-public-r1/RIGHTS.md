# Game004 public candidate — rights / licenses / credits

2026-09-20。公開許可・名称商標クリアランスとは別の、配布内容の棚卸し。

|対象|出所と今回の扱い|
|---|---|
|ゲームコード・Canvas Art|採用 `game004-magnet-full/`。Tinlumoの同作品用AI支援制作。凍結manifestで照合。競合のコード・画像・地形の取込みなし|
|音|同作品のoriginal Web Audio合成。外部録音、sample、BGMなし。新しい音は追加していない。実聴NOT TESTED|
|Card / thumbnail|採用証拠 `docs/qa/game004-magnet-full-r1/B-foundry-stage5.png` をbyte-copy。実プレイの運搬機戦。新しい宣伝用架空画面は生成していない。source hashはdistribution.json|
|フォント|system font stackのみ。フォントファイルの配布なし|
|ゲームの実行依存|distribution.jsonのbundle module一覧はproject-local inputsのみ。Vite modulePreload polyfillは無効。OS/browser標準Canvas・WebAudioを使用|
|ビルドツール|lockfile固定のVite/TypeScript等。保守的にinstalled ViteのMITと同梱notice全文をgame-onlyの `licenses/vite.txt` に同梱。依存ツール全体を配布するわけではない|
|Portal|既存Astro notice `licenses/astro.txt` と20既存payloadを完全保持。3作品の素材・音楽・ライセンスは変更なし|
|credits|日英CreditsへGame004制作出所、配布noticeへのリンクを追加。game-onlyにもcredits.txtを同梱|
|Research引用|既存調査文書の出典・要約はprivate checkpoint。競合動画/音楽/画像を公開候補へ配布しない|
|未確定|PROJECT MAGNETの名称/商標、公開権利の最終Human判断、第三者権利・類似性の専門的評価。AI支援制作だけでこれらをPASSにしない|
|配信・動画利用|今回のlocal候補作成とprivate checkpointのみ実施。ゲームsourceに公開OSSライセンスを付与していない。第三者への再配布/二次利用許諾を新たに捏造しない|

実利用model: 原制作と今回統合 `gpt-6-astra`、原制作の限定Hubと今回read-only review `gpt-5.6-sol`。外部素材購入・画像生成service・契約・投稿0。
