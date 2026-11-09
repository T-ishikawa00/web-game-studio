# Assets, Credits & Rights

固定main b21d4389c7737de621fb97ebdc0adddce379f537から作ったローカル公開準備候補の素材台帳です。これは公開許諾・配信再開・外部公開承認ではありません。remote状態は変更しておらず、現在値も再確認していません。ソース一式に包括的なOSS licenseは付与していません。第三者libraryのNOTICEは各libraryと対応する配布物だけに適用され、Tinlumo全体の再配布許可ではありません。

## R2 owner decision

2026-11-09、本人はTinlumoの画像・音楽に無断利用した第三者素材がないことを確認しました：`OWNER_CONFIRMED_NO_UNAUTHORIZED_THIRD_PARTY_ASSETS`。この確認に基づき、下記のR1記録にある対象6画像と選定済みD1.wavの権利HOLDを、本公開準備候補において解除します。R1のC2PA記録はファイル内metadataに関する技術的観察として保持し、生成経路・契約・アカウント等の追加証明は求めません。この本人確認はC2PA署名検証でも、プロジェクト全体へのOSS license付与でもありません。

本人は過去Git commitのauthor・committer emailの公開を承認しています。この承認範囲はGitのauthor/committer metadataです。公式サービス窓口として既存のContact/Privacyページや`mailto`導線に掲載している連絡先は、その用途により意図的に公開されています。その他の本文・QA記録に含まれる連絡先情報が自動的に承認されたものとは扱いません。

第三者libraryを含む配布物では既存のLICENSE/NOTICEと各適用条件を維持してください。これらのnoticeはlibraryに適用され、Tinlumo全体の再配布許可にはなりません.

## 重点素材台帳

6点の画像は固定候補artifactのSHA-256とbytesを照合しました。PNGにはC2PA形式のcaBX Manifest Storeがあり、claim内に「OpenAI Media Service API」、created時刻、trainedAlgorithmicMediaが記録されています。これはファイルに埋め込まれた声明の読み取り結果で、サービス利用経路・モデル・署名の有効性・利用者アカウント・入力権利を検証したものではありません。4つのWebPにはC2PA metadataがなく、archive側の対応名source PNGとの変換を示す署名済みingredient linkageも確認していません。

| 最終候補artifact | bytes / SHA-256 | C2PAに記録された生成時刻 UTC | source / 状態 |
| --- | ---: | --- | --- |
| games/game007/2.0.0-remaster-r1/art/garden.png | 3,098,033 / 09e123ef5dc40d28673ba49e8441293e3ebc2040d648418f8006adb306e0c106 | 2026-10-13 02:31:35 | 同一PNG内にOpenAI Media Service APIのclaim。モデル名なし。HOLD |
| games/game008/1.0.0-remaster-r1/coilhop/art/cloud-garden.png | 1,565,022 / ee15246bceb3127f24d0a02b5adc2c30d3f182869aa4bcf19138aff36c59cd50 | 2026-10-13 03:17:38 | 同一PNG内にOpenAI Media Service APIのclaim。モデル名なし。HOLD |
| games/game009/1.0.0-remaster-r1/art/bowl-states.webp | 188,386 / b7b0ced47e9dccc644312b4dfe95bf31f3909ac07fc487ba605d918527ddf313 | 2026-10-13 04:25:08 (source PNG) | archive source bowl-states-source.png, SHA-256 abb037f167afe7d8f9396546a8630d8267216692a52b7fea5bcb169ed68e86d0。WebP自体にC2PAなし。HOLD |
| games/game009/1.0.0-remaster-r1/art/kiln-empty.webp | 220,000 / 31cf3fe13e3ec66bbefc1542ff9afe7293c8e6ae6d433263c1dadf8652b9194e | 2026-10-13 04:24:29 (source PNG) | archive source kiln-empty-source.png, SHA-256 1b3fbabc2079851f466bbfa337ad90237233ba4d714e8b27ace29c5119fade1b。WebP自体にC2PAなし。HOLD |
| games/game009/1.0.0-remaster-r1/art/pitcher-states.webp | 318,402 / 8a610c5513eea2d0dd25d761817ebb904ccaaeb3a1780d80d382ebe4f53e49cd | 2026-10-13 04:26:50 (source PNG) | archive source pitcher-states-source.png, SHA-256 e396b29f13f580b2f8fc85492227b431eb3811bc3e9a79781dfb59f085846a05。WebP自体にC2PAなし。HOLD |
| games/game009/1.0.0-remaster-r1/art/vase-states.webp | 376,848 / e26374893692b0e71fbe249b2c35a29270c323d08dbb14d53f4253294ba28b07 | 2026-10-13 04:26:07 (source PNG) | archive source vase-states-source.png, SHA-256 20ca8c1b45c6c13ee1c907d2d956ad3e742f1e7557fab8e5e44fb016cc23a332。WebP自体にC2PAなし。HOLD |

C2PA仕様ではPNGのManifest StoreはcaBX chunkに格納され、claimは署名対象です。ただし署名・証明書chain・信頼list・asset bindingは検証していません。claim内のサービス名と時刻は「埋込metadataがそう申告する」という証拠に限定します。モデル名は記録されていません。PNGからWebPへの変換の存在や方法も、画像名の対応だけでは独立検証できません。

OpenAIの公式資料を参照しました。2026-01-01有効のTerms of Useは個人向けサービスのOutput所有権を規定し、2026-01-01有効のServices AgreementはAPI等のbusiness/developer向けでOutputの扱いを規定しています。Service Termsは2026-09-10更新と表示されています。C2PAのOpenAI Media Service APIという文字列だけでは、ChatGPT/Codex/APIのどの画面・account/contractで生成したか、当時の利用条件がどれか、prompt/inputに第三者素材が含まれたかは決まりません。規約上のOutput所有権も、入力権利・第三者権利・商標・特定の公開用途の承認とは別です。

- C2PA Technical Specification: https://spec.c2pa.org/specifications/specifications/2.3/specs/C2PA_Specification.html
- OpenAI provenance signals: https://help.openai.com/en/articles/8912793-c2pa-in-chatgpt-images
- OpenAI Terms of Use: https://openai.com/policies/terms-of-use/
- OpenAI Services Agreement: https://openai.com/policies/services-agreement/
- OpenAI Service Terms: https://openai.com/policies/service-terms/

## 音源

最終候補のgames/tiny-delivery/parcel-grove-r1/bgm-audio/D1.wavは12,288,044 bytes、SHA-256 05b01efe37574c335b5164b92c8c80896e20a452696fd66fd55c1d5336a75945です。固定mainのprivate QA記録にあるB.wavとbytes単位で一致します。そのQA folderはpolicy.jsonでpublic-preparation exportから除外しています。docs/games/CRAFT_BASELINE_R2.mdは2026-09-15にHumanがBを選択・freezeしたと記録し、src/prototypes/music-score.tsとscripts/rhythm-samples.tsはローカル合成手順を記録しています。PCM WAVの解析範囲に標準的なテキストmetadata chunkはありませんでした。これは埋込watermarkの不存在や権利を証明しません。

BのHuman creative acceptanceは音の選択記録です。配信・実況・収益化動画・切り出し再利用・事業終了後の再利用の権利承認ではありません。D1.wavは最終候補のゲームruntimeに必要なので、権利未確定を理由に公開候補から黙って削除しません。条件解決まで素材とゲームのpublic reproductionをHOLDします。

## 作品別の制作記録と第三者NOTICE

初期5作品はコードで描く図形・既存実play画面に基づくcover・合成音を使用する記録です。後続3作品はAI bitmap画像を含む版として分けます。Humanは目的・制約・選択・受入・公開判断を担当し、AIはlogic、描画、UI、音、素材、テスト、文書等の制作を支援したとPROCESS.mdは説明します。手書き実装率は主張しません。

候補artifact内の次のnoticeは、対応する配布物を保つ場合に一緒に保持してください。NOTICEの存在はソース全体のlicenseを与えません。

- licenses/ASTRO-LICENSE.txt
- games/game005/web-v1-r1/THREE-LICENSE.txt
- games/light-garden/conservatory-r1/THREE-LICENSE.txt
- games/project-magnet/frontier-r1/THREE-LICENSE.txt
- games/tiny-delivery/parcel-grove-r1/THREE-LICENSE.txt
- games/two-ways-home/little-towns-r1/THREE-LICENSE.txt

権利台帳・制作由来の範囲を読む場合は以下を参照してください。これらはauthorship/inventory記録であり、独立した法的clearanceではありません。

- docs/engineering/PROCESS.md
- docs/records/ASSET_REGISTER_R1.md — dated rights/inventory history; not an independent legal clearance.
- docs/records/DEPENDENCY_LICENSES_R1.json — dependency metadata inventory; not an independent legal clearance.
- game008-009-production-r1/game008/inputs/package/source/docs/release/RIGHTS.md
- game008-009-production-r1/game009/inputs/package/source/docs/rights.md
- rimbloom-complete-r2-integration/inputs/standalone/docs/RIGHTS.md
- docs/games/CRAFT_BASELINE_R2.md

## 判定と残作業

- AI画像6点: 本人が生成時のOpenAI account種別、適用agreement、生成画面/Service route、prompt/inputの権利、公開・クレジット方針、WebP変換のsource lineageを確認するまでHOLD。
- D1.wav: 本人が最終候補内での公衆送信・再配布・動画利用・事業終了後の再利用範囲を確認するまでHOLD。
- 第三者library/notices: sourceとして再配布する場合、dependency licenseの全noticeと適用条件を配布treeで再確認する。
- 全repo/履歴/media: この文書は全体の権利・個人情報監査ではありません。内部QA・資料・別企画の公開可否は別の全履歴triageが必要です。

repo全体を公開してreview掲載する必要はありません。case studyに使う素材だけを指定し、本人確認済みの範囲を使う運用を推奨します。source repositoryの公開やOSS再配布は別の決定です。