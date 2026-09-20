# R1 Asset and Rights Register

## Tinlumo Release Readiness Final R1 — 2026-09-17

対象は公開予定RCの48ファイルだけ。[Release Decision Pack](../planning/TINLUMO_RELEASE_DECISION_PACK_R1.md) §2–3に今回の個別結果と未取得範囲を集約。旧台帳本文と素材は履歴として保持。

- 採用BGM B.wavと配布music.wavはbyte一致（12,288,044 B）。作品別SFX、code/SVG/CSS Art、実画面coverを保持。font binaryなし。bundle inputsはrepo src/のみ、Astro LICENSE全文（SvelteKit/Vite由来noticeを含む）と配布noticeを一致確認。追加配布notice不足は今回未検出。
- 現行markの正本は `src/rc/favicon.svg` / `src/rc/Layout.astro`。既存N形状を保全し、Wという過去記載を最新の現物説明として使わない。新規デザイン・権利承認を意味しない。
- Tinlumo/Hakorilo採用を維持。J-PlatPat称呼・11C01検索でTIRMO（登録7014427）とHAKONE∞はこジ郎（登録5691985）を取得。指定商品全文・法的類否は未確認。AI支援/ローカル合成も権利確認完了の代用にしない。
- 公開配布・実況/収益化動画の範囲はHuman判断待ち。外部Portal/広告/事業承継は初回公開で実施しない将来scope。全project Security rawの既知2検出とRC配布scanは別。

## Tinlumo — 2026-09-16 latest brand / Nolippa adoption withdrawn

Humanが追加調査で営業中の既存事業 **NORIPPA（ノリッパ）** を確認したと報告し、**Nolippa / Nolippa Studioの採用を撤回**。最新は **Tinlumo / ティンルモ / Tinlumo Studio**。これはHuman報告と名称選択の記録であり、今回こちらで当該事業・商標・権利範囲を独立確認したものではない。URL/業種/運営者は未提示、推測しない。2014年のジョルダンnorippa記録とは区別する。

Tinlumoも商標/権利クリアランス未完了。domain/candidate未設定、取得済みと扱わない。制作元表記は法人・公開運営者の確定ではない。Hakoriloと他2作品の名称・全素材・保存識別子は不変。[最新決定](../planning/TINLUMO_BRAND_R2.md)、[最新Review](../qa/soft-launch-rc-r1/brand-r2/REPORT.md)。以下のNolippa選択と調査メモは撤回前の履歴として削除せず保持。

## Nolippa / Hakorilo — 2026-09-16 naming correction and selection

最新Human選択：Portal **Nolippa / ノリッパ**、制作元ブランド **Nolippa Studio**（法人名・運営者の確定ではない）、配送ゲーム英語 **Hakorilo / ハコリロ**。日本語 **ちいさな配送パズル**を保持し、RCでは許可済みの併記を使用。他2作品は不変。[決定記録](../planning/NOLIPPA_HAKORILO_NAMING_R1.md)、[最新配布manifest](../qa/soft-launch-rc-r1/naming-r1/distribution-manifest.json)。

**名称選択完了 ≠ 商標・権利確認完了。** [ジョルダン公式2014-04-30発表](https://www.jorudan.co.jp/company/data/press/2014/20140430_norippa.html)を2026-09-16に読み取り確認し、「乗換案内norippa（のりっぱ）」が当時発表されていたことをNolippaの類似名称として訂正・追記する。現在の提供、登録商標、商品役務・地域・権利範囲は未確認。安全/使用不可のいずれも結論にしない。Hakoriloも商標確認済みにしない。商標DB再調査・登録・問い合わせ・購入は未実施。

`nolippa.com`は未照会のdomain候補。所有・取得・使用可能性を推測せず、本番domain/canonical/連絡先は未設定。旧Tiny Delivery同名調査を下に残すが、現在の「名称選択待ち」と混同しない。他2作品・素材・配信許諾の権利残件は継続。

RCのHeader内W文字とfaviconのみNに局所変更。新編集元は `src/rc/Layout.astro` / `src/rc/favicon.svg`。既存色・図形を保つコードSVGで、外部素材/画像生成API/新規fontなし。旧 `public/favicon.svg`、実画面covers、ゲームArt・音楽・Motion・比較画像/動画は不変。ブランド選択はNマークの最終法務判断を含まない。

以下の初回RC・過去調査は改名前の記録として保全。最新の配布内容/名称は上記および名称差分Reviewを参照。

## Three-game Soft Launch RC R1 — 2026-09-16 current distribution review

Local candidate only, actual released inventory **0**. This section supersedes older present-tense claims of 5/54 puzzles or no audio for this RC only; the old records remain historical evidence. [Authorized specification](../planning/THREE_GAME_SOFT_LAUNCH_RC_R1.md), [RC review](../qa/soft-launch-rc-r1/REPORT.md), [actual distribution manifest](../qa/soft-launch-rc-r1/distribution-manifest.json).

| Distributed material | Editable source / provenance and adaptation | Verification / outstanding rights |
|---|---|---|
| 57 puzzles: Lightwork 18, Two Ways 21, Tiny 18; game code and guides | `src/prototypes/{levels,rules,state,protocol}.ts`, existing per-game data/rule modules and `guides.ts`. AI-assisted project-authored code/boards. No imported third-party board corpus identified | Stable IDs/order/rules/save version unchanged. RC real UI replay and existing independent solver tests verify behavior, not originality or Human fun |
| Game SVG/CSS art | `art.ts`, `visual-language.ts`, `game-r2/r3/r4/r5.css`; Lightwork adds `light-object-{view,motion}.ts`, `light-polish-art.ts`, object/polish CSS | Original code-drawn art with AI assistance. No new image API or third-party reference imported in RC. Frozen entry byte parity checked before RC connection changes |
| Lightwork R1 | `light-craft-{plan,motion,runtime,audio,sound}.ts`, LG-C + Object Design + Art Polish | 7 local synthesized SFX, no BGM. Exact accepted art/motion/PCM representative comparison. Human Craft accepted; public rights review still pending |
| Two Ways R1 | `twoways-craft-{plan,motion,runtime,audio,sound}.ts` | TW-C, 9 local synthesized SFX, no BGM. D1/D2 comparison music excluded. Human Craft accepted; public rights review pending |
| Tiny R2 | `craft-sound.ts`, `craft-motion.ts`, `music-score.ts`, `music-rhythm.ts`; accepted master `docs/qa/tiny-d1-rhythm-01/audio/B.wav` | B = D1 Rhythm Refine / 80 BPM. Copied byte-exact to `/games/tiny-delivery/rc-r1/music.wav`; digest in RC manifest. User enabled/gain/mute preserved, comparison direction locked. D2 and comparison controls not distributed |
| Covers / OG images | Actual RC browser `.play-area` captures, L12/T12/D12; no external input or asset service | [Capture provenance](../qa/soft-launch-rc-r1/covers/provenance.json), per-file digest in manifest. Displayed without cropping away the two boards. Same asset used for cover and relative OG image; production domain/absolute OG resolution pending |
| Portal, favicon and mark | Accepted Portal R1 CSS and visual grammar; project-authored `public/favicon.svg` and code-drawn W mark; localized RC layout/cards | Working brand only. Final brand/name/mark approval pending. No Design Preview artwork or fixture art in RC |
| Fonts / OSS | System font stack only; no font binaries. Browser JS metafile inputs are project source only; generated `_astro` output is CSS only | Full installed Astro LICENSE including SvelteKit/Vite-origin notices copied verbatim to `/licenses/astro.txt`. esbuild MIT text inspected, build-tool scope only. [Dependency record](DEPENDENCY_LICENSES_R1.json) now separates build metadata and actual distribution |

Sources are project-local and AI-assisted. No purchased samples, third-party recordings, Suno use, music service plan or external generation API is recorded for these assets. No service was purchased or called. That provenance does **not** establish exclusive copyright, non-infringement, transferable rights or unrestricted streaming rights. Commercial game use, creator video/monetization, advertisements, external portals and business transfer remain separate final rights decisions. No Content ID registration is authorized or performed.

### Provisional name search — 2026-09-16

Read-only general web search used English/Japanese exact names, English names + game, and phonetic variants: ライトワークガーデン / タイニーデリバリー / トゥーウェイズホーム (including spaced forms), ヒカリノシカケニワ / フタリノカエリミチ / チイサナハイソウパズル. Scope: publicly accessible Japanese and English-language results; **not** country-by-country trademark clearance.

| Name | Evidence actually retrieved | Concern / not established |
|---|---|---|
| Tiny Delivery / ちいさな配送パズル | [Steam: Tiny Delivery by Sinica](https://store.steampowered.com/app/3812830/Tiny_Delivery/) and [App Store: Tiny Delivery: City Courier](https://apps.apple.com/ca/app/tiny-delivery-city-courier/id6760705999) | **Release blocker:** exact-name game, including a delivery-robot theme. Decide a final name and assess confusion/expression. This is not a finding of infringement |
| Two Ways Home / ふたりの帰り道 | [UK music duo official site](https://www.twowayshome.com/), [film listing](https://play.google.com/store/movies/details/Two_Ways_Home?hl=en_US&id=HNPpIwViZ9s.P), [Japanese publisher episode title](https://souffle.life/manga/sake-koi-yotte-shikarubeki/20220607-2/) | Existing entertainment uses. Relevant goods/services, registration, similarity and territorial scope unverified |
| Lightwork Garden / ひかりの仕掛け庭 | No clear exact-name game primary source appeared in this search | Absence from returned results is not legal safety or evidence of exclusive use |

J-PlatPat, USPTO, TMview and WIPO result interfaces could not be read through this search tool; UK IPO search link returned an internal access error. **Japan / US / EU / UK register searches, phonetic similarity, goods/services, ownership and current status remain NOT VERIFIED.** [INPIT search guide](https://faq.inpit.go.jp/FAQ/2024/03/000288.html), [WIPO country/region register guidance](https://www.wipo.int/en/web/madrid-system/how_to/search/index), [UK official search entry](https://www.gov.uk/search-for-trademark).

No particular copied board/art/code was identified from the local provenance review. It was not an exhaustive comparison against existing games. The exact Tiny name and nearby theme warrant targeted Human/professional review of branding and concrete expression; do not infer that all game mechanics or all delivery robots are reserved.

### Data handling and operating drafts — 2026-09-16

JA/EN About / Terms / Privacy / Contact / Credits are implemented in `src/rc/Operations.astro`; the rendered Privacy table is derived from the inspected RC source and browser storage/network QA. Configuration is `src/rc/site.json`; game working names remain in the single shared registry metadata source. No form, fictitious address, age, organization or successful-send state is supplied.

| Data | Actual destination / purpose | Lifetime / deletion / transmission |
|---|---|---|
| `wgs:save:<gameId>` | localStorage: board, level ID/version, completed IDs, reducedMotion; schema 1 / version `0.1.0` | No expiry. Per-game progress reset or browser site-data removal. No third-party send |
| `wgs:audio:<gameId>` | localStorage: mute/gain, version 1 | No expiry. UI changes/site-data removal; progress reset retains it. No third-party send |
| `wgs:music-pilot:tiny-delivery` | localStorage: enabled/gain/direction, version 1; accepted D1 at runtime | Old enabled/gain respected even if stored comparison direction D2. Original invalid raw data retained. Reset does not erase. No third-party send |
| `wgs:guide:<gameId>` | localStorage: dismissed guide IDs/version 1 | No expiry. Site-data removal; progress reset retains it. No third-party send |
| `wgs:capture-layout` | sessionStorage: shared normal/portrait/landscape setting | Tab session/browser restore semantics; UI or site-data removal. No send |
| `wgs:input:two-ways-home` | sessionStorage: swipe/direction-button preference | Tab session/UI/site-data removal. No send |
| `wgs:session:v1` | sessionStorage: start-event dedup marker | Tab session. No send |
| Events | Page memory, at most 50 allowlisted name/gameId/locale/result/sequence records per adapter | Discarded with document; no transport/persistent event log. RC exposes no window QA event accessor |
| HTTP resources | Same-origin HTML/CSS/JS/art/BGM from loopback-only RC server | No external requests observed. Browser cache and server behavior are separate from localStorage. Production access logs/hosting remain undecided |

Comparison-mode keys and ad-pressure keys are not newly written by RC. Old comparison data is left untouched. Browser data belongs to the exact origin, including port; no cross-port/domain migration is promised. No claim that this avoids every form of personal-data processing.

### Primary-source legal review scope (2026-09-16)

- Japan: [PPC general guidelines](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/) (page displays June 2026 partial revision). Final inquiry data/log collection, purpose notice, security/processor practices depend on actual operating design. Client-only no-transmission does not settle future personal-information handling.
- US: [FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions). Intended/actual audience, art, sound and activities matter together. A "13+" line alone does not settle child-directed status; future hosting/ads collection needs separate analysis.
- EU: [GDPR Articles 3/6/8/13](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng), [ePrivacy Article 5(3)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219). Determine territorial scope, actual processing, basis/notices and each target country's implementation. Article 8 is not a single EU-wide minimum age for all games.
- UK: [ICO storage/access rules](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-pecr-rules/) and [exception conditions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/). Assess each purpose and applicable exception, information and objection requirements; do not exempt all localStorage by technology alone.

These are scoped research notes, not legal advice or final clearance. Target markets/age, public operator/contact, inquiry retention, hosting/logs/analytics, retention/consent, names and streaming rights are release blockers. Current streaming text is an **unapproved draft**, not a blanket permission. Confirmed materials can receive a final policy only after explicit rights approval.

## Tiny Delivery Craft Pilot 01 — 2026-09-15

- Asset IDs: `tiny-sfx-arrow`, `tiny-sfx-wait`, `tiny-sfx-undo`, `tiny-sfx-start`, `tiny-sfx-arrive`, `tiny-sfx-collision`, `tiny-sfx-clear`, `tiny-sfx-complete`. Arrow/arrival/clear each have variants 0 and 1. Uses and duration/peaks: [audio measurements](../qa/tiny-craft-pilot-01/audio-measurements.json).
- Original editable synthesis master: `src/prototypes/craft-sound.ts`, AI-assisted local TypeScript authored by actual `gpt-6-astra`. Deterministic filtered noise, nonharmonic resonances, envelopes and a short original note sequence; no third-party recordings, artist imitation, sound libraries or external generation API. Created locally on this date, no paid service/plan/license was purchased or consumed.
- Reproduction/edit pipeline: `scripts/craft-samples.ts` exports mono PCM16 44.1kHz preview WAVs at the same default gain as the runtime. Variants change representative timbre/pitch; no equal-peak normalization across events. Game synthesizes only needed buffers at device sample rate; WAV masters/previews are not included in normal, Design or prototype delivery. Necessary synthesis code is in the prototype bundle only.
- Runtime use: accepted route/wait edits, return to editing, departure, delivery arrival, rejected run, puzzle clear and first completion of all 18 stable IDs. Pause/resume are intentionally silent; no motor loop, per-tick SFX or BGM. Final arrival is coalesced with clear/signature to avoid stacking.
- Review videos are actual local Edge UI recordings. C/C-alt use a simultaneous tap of the real Web Audio output graph and measured wall-clock mux offset; no reconstructed post-dub sound. This is not a speaker/device/listening or perceptual synchronization acceptance. [Review](../qa/tiny-craft-pilot-01/REPORT.md) records limitations.
- Local project-created material; no third-party attribution requirement identified from imported assets because none were imported. Public/commercial/streaming/ad/external-platform/transfer rights review remains PENDING; AI authorship is not a copyright or legal-clearance guarantee. No Content ID registration or external publishing performed.

2026-09-13 / 内部レビュー用。公開許可未判定。

| Asset | 来歴 | 状態 / 証拠 |
|---|---|---|
| Portal・adapter・fixture source | このbootstrapでCodexによるAI支援開発、Human依頼から新規作成 | コードは本repo。Humanによる製品/権利受入は未実施 |
| `public/covers/connection-lab.svg` | 接続テストの9パネルを描いた新規の機能模式図。外部参照画像なし | 製品アートではなく内部fixtureの図。商用公開前レビュー待ち |
| `public/favicon.svg` | 仮スタジオ用のW幾何マークを新規作成 | 正式ブランド/商標レビュー未実施 |
| フォント | OSのfont stack。フォントbinaryを同梱しない | 配布フォントlicenseは対象外。将来webfont追加時に別途確認 |
| 音楽/SE/音声/映像 | 使用なし | 対象外 |
| 第三者ゲーム/第三者ゲーム素材 | 使用なし | 対象外 |
| OSS dependencies | npm、固定lockfile | `DEPENDENCY_LICENSES_R1.json` にinstalled package metadataの棚卸し。実ライセンス本文/NOTICE/配布義務の最終確認は公開前 |
| Working titles | Human Authorityの候補を元に仮称 | 名前調査・商標調査未実施 |

AI生成は法的安全の保証ではない。ライセンス文字列の自動抽出だけでOSS配布条件への適合を断言しない。

## Prototype Batch 01 — 2026-09-13

- G001 Lightwork Garden / G002 Two Ways Home / G003 Tiny Delivery: Human選択の導入MVP各5問。`src/prototypes/`のルール・UI・全15盤面・固定QA解答は本タスクでAI支援新規制作。既存ゲームのレベル・コード・素材の取込みなし。
- ゲーム内の庭・鏡・花・門・家・二人・配送ロボット・道路/受取口は`game.ts`/`game.css`のオリジナルSVG/CSS。案内カードのSVG3点は`scripts/prototype-assets.mjs`に原本コードを保持。外部フォント/素材/API・音楽/SEなし。生成画像APIは使用していない。
- Artwork/runtimeの配信ファイルは明示prototype buildの`.cache/prototype-public/prototype-assets/`と`.cache/prototype-dist/`のみ。通常public/dist、Design見本、公開registryへ昇格させない。QA解答JSONは配信しない。
- `docs/qa/prototype-batch-01/screens/`の6画像と案内画像は実ブラウザ実装のキャプチャ。生成画像による代替ではない。
- 仮題の名称/商標調査、類似性/商用権利/動画配信許可、Humanによる作品受入は未完了。導入MVPの技術検証を法的保証・公開許可・正式Artworkの採用と扱わない。

## Visual Reference R1 — 2026-09-13

### Batch 01 R2 original in-game art — 2026-09-13

- `src/prototypes/art.ts`: AI-assisted original state-aware SVG for greenhouse stone frame, glass lamp, metal mirror, blooming flowers, gate/switch badges, scarfed original characters, paired houses, parcel robots, roads, clocks and depots. Shapes, depth and states are authored as code; no third-party game assets or generated-image API used.
- `src/prototypes/guides.ts`: original bilingual, code-drawn rule diagrams; separate examples do not change play state. `game-r2.css` owns materials, responsive composition and reduced-motion handling. No sound/music or external fonts.
- `scripts/prototype-covers.mjs` creates the three covers from the same original sprite source, matching the playable worlds. Only prototype output receives these assets. Original R1 source is preserved in ignored `.tmp/r2-before/`.
- `docs/qa/batch-01-r2/screens/`: actual Edge Chromium screenshots, including same-first-stage PC Before/After, guides, interaction sequence, middle, ending and mobile views. These are implementation evidence, not concept renders.
- Human art/UX/full-run acceptance and legal/name/similarity clearance remain PENDING / NOT TESTED. AI assistance is provenance, not a legal guarantee.

- Human添付の採用Concept A原本を `docs/design/references/PORTAL_VISUAL_REFERENCE_R1.png`、対応文書を同名 `.md` に無変更コピー。画像SHA256: `c288f35353bf65f547bbe2c71f8ad6d4f564d884ee92c0550b844704fef67646`、1672×941。
- 指示書7節の明示許可に基づきArtwork10点と装飾2点だけを切出し。タイトル・タグ・ボタン・枠はHTML/CSS。切出し座標 `[name,x,y,width,height]` は `docs/design/references/crops.json`、再現処理は `scripts/design-assets.mjs`。カード1は画像内Newバッジを避けて下側を利用し、Heroは生成文字を避けたマスコット部分を利用。WebP quality 88、CSSによるobject-fit/装飾端のフェード。暫定利用であり公開時差替え必須。
- 仮Artworkは `.cache/visual-public/design-art/` と `.cache/visual-dist/design-art/` のみ。通常 `public/` / `dist/` へ配置しない。仮10作品は `src/design/catalog.ts`、実games/themes配列へ混入させない。
- 混在確認用SVG3点は、この工程で新規に記述したピクセル・抽象形状・機構の模式図。公開素材/実ゲームの制作ではない。元Concept Aの置換案でもない。
- Headerの仮WマークはHTML内SVGによる暫定図形。フォントは引き続きOS stack、追加binary・外部font通信なし。原画像・マーク・仮名・マスコットの採用は権利/商標/ブランド確定を意味しない。
- Clockwork Repair Workshopはデザイン見本の仮タイトルであり、他repoの正式作品・Artworkではない。他repoへの読取・書込みなし。

## Batch 01 R5 — local prototype visual language (2026-09-14)

- Editable masters: src/prototypes/art.ts; semantic roles and crests: src/prototypes/visual-language.ts; mirror/arrow/clock and scene CSS: src/prototypes/game-r5.css. Original AI-assisted vector/code shapes, no imported third-party image or image API. Actual authoring model verified: gpt-6-astra.
- Uses: all 54 prototype scenes and generated internal prototype cards; normal Portal / ten Design Preview samples unchanged. SVG center anchors use 60-unit cells; state is derived from the existing engine. Help imports the same actors and shapes.
- Derived evidence: docs/qa/batch-01-r5/MATERIALS.html, screenshots, three cropped Edge recordings, and RECIPE.md. No added sound or fonts.
- Old masters/source preserved in ignored .tmp/r5-before/src/prototypes/ and .tmp/r5-before/scripts/. Earlier R1-R4 evidence retained.
- Rights, similarity, names and publication acceptance remain PENDING. No claim of legal clearance or commercial acceptance.

## Tiny Delivery BGM Pilot 01 — 2026-09-15

- Original locally authored compositions/synthesis: `src/prototypes/music-score.ts`; WAV renderer: `scripts/bgm-samples.ts`. D1 uses toy pluck/pulse/brush at 80 BPM over 96 seconds; D2 uses sparse mallet/pad harmony at 64 BPM over 120 seconds. Different scores and arrangements, not one tune recolored.
- No external recordings, sampled instruments, copied music, audio API, purchase or service contract. Actual primary model: `gpt-6-astra`. Independent runtime/model evidence and limitations: [BGM Review](../qa/tiny-bgm-pilot-01/REPORT.md).
- Candidate WAVs, 330-second actual browser graph recordings and nine gameplay/mixed-audio videos are in `docs/qa/tiny-bgm-pilot-01/`. The isolated pilot serves them from `.cache/bgm-pilot`; accepted C/game assets and normal/Design outputs remain unchanged.
- C remains Human Accepted with no BGM. D1/D2 listening, repeated-listening comfort, concentration, adoption, rights and publication gates remain PENDING. Authorship provenance does not establish legal clearance or Human quality acceptance.

## D1 Rhythm Review 01 — 2026-09-15

- Human D1 Conditional PASS; current first choice with timing concern. New A = original D1 PCM exact, B =20 existing onset shifts, C = B tempo +3%. Original instruments, pitches, velocities, pan, waveform envelopes, normalization and mix retained. No new sampled/generated external assets.
- Source: src/prototypes/music-rhythm.ts; renderer: scripts/rhythm-samples.ts. Review: D1 Rhythm Review（参照原本はPrivate保全・候補には非同梱）. Old C/D2 evidence untouched. B/C listening and adoption pending. Authorship does not establish rights/publication acceptance.

## Tiny Craft Baseline R2 — BGM B accepted / frozen

Human formally selected B (D1 Rhythm Refine /80 BPM) with accepted Motion + SFX. [Craft R2](../games/CRAFT_BASELINE_R2.md) binds the retained B.wav/score-B.json and frozen runtime; no new sound was authored for this checkpoint. Original D1/A, tempo C, D2 and no-BGM evidence remain unchanged. Earlier pending/conditional reports are historical. No further variants. Reuse process, not this song/timbre/tempo. Physical-device, other-game Audio/Motion, rights, legal/ads and public acceptance remain separate.

## Game004 Nurture MVP R1 — 2026-09-19

- Original local AI-assisted vector/code artwork: `game004/art.ts` (egg, baby, Springstep/Roly/Glimmer silhouettes, sleeping pose, fruits, ball, nest, plant, garden), motion/materials: `game004/style.css`. Authoring/integration model `gpt-6-astra`. No external image generation, downloads, third-party sprites, emoji character art, font files, purchased assets or existing three-game art reuse.
- Original procedural SFX master/runtime: `game004/audio.ts`; seven event roles (hatch, eat, play, sleep, grow, pick, pet), sine/triangle plucked/airy voices, short envelopes, conservative summed gains. No samples, external API, recordings, BGM or existing three-game sound reuse. No separate upstream provider/license purchase; local code authorship, Human listening pending.
- Distribution only `.cache/game004-dist`; no Production registry/public assets. Actual Edge screenshots and 432x768 WebM under `docs/qa/game004-nurture-r1/`. Short clips are local extracts of real-time natural play, no generated frames, no recorded audio. Specification and Review contain exact use/limits.
- H1 provisional assets. Formal naming, similarity/legal clearance, commercial/publication rights acceptance, Human visual/aural/fun acceptance are not established by this provenance entry. No new external attribution obligation asserted, no Content ID registration.


## Game004 PROJECT MAGNET Gold Micro Slice R1 — 2026-09-19

- Original local Canvas/code art: `game004-magnet/art.ts` (robot, salvage-yard floor, enemy variants, plate/coil/nut scrap, fracture, magnetic field/trails/particles). Mechanics/camera timing: `core.ts` / `main.ts`. Primary actual model `gpt-6-astra`. No imported commercial artwork, fonts, image generation API, purchased assets or reuse of accepted game artwork. System font stack only.
- Original local Web Audio synthesis: `game004-magnet/audio.ts`, authored by actual model `gpt-5.6-sol`, integrated/reviewed by `gpt-6-astra`. Motor/magnetic hum, metallic snap, launch, hit, shatter/rattle, short transformation; no BGM or sampled recordings. Editable code is the master.
- Reference titles and attribution in `docs/games/GAME004_MAGNET_RESEARCH_R1.md`; reference media was viewed for analysis only, never shipped or copied into the pack. Derived actual-runtime screenshots and 25-second audiovisual capture: `docs/qa/game004-magnet-r1/`.
- Dedicated local candidate only; no production registry/distribution/Cloudflare changes. Human Craft, actual listening, physical-device suitability, rights/name/publication clearance remain PENDING; original authorship is not legal clearance. Nurture H1 rejected source and evidence remain archived in place.

## 2026-09-19 — PROJECT MAGNET Vertical Slice R1

- Gold Micro Slice R1のHuman Craft Gate PASSを受け、専用 `game004-magnet-vertical/` へ拡張。原本のArt/音/source/build/captureは保全。
- 新しいshield/charger/elite、coil/rail upgrade、開閉/突進予告/破壊描画はoriginal Canvas code。外部画像・音声素材の取込、素材購入、生成API利用なし。
- SFXはGoldのoriginal Web Audio synthesisを引継ぎ、30秒後だけ音の密集制御と短いblock/warning/damage/complete cueを追加。BGMなし。
- 実利用モデル：主担当・統合・最終Craft/QA `gpt-6-astra`、限定Art/SFX/テスト・独立レビュー `gpt-5.6-sol`。制作物の権利・商標・公開承認の法的保証ではない。ローカルHuman Vertical Slice Gate待ち。


## 2026-09-20 — PROJECT MAGNET Progression Slice R2

- Isolated `game004-magnet-progression/`: original relay machinery/circuit links/current telegraphs, SWARM coils/crown, LANCE rail/spine and trails are local Canvas code. Gold/Vertical R1 originals and evidence preserved. No imported/purchased/generated external bitmap/audio assets.
- Audio master remains the original same-game Web Audio synthesis; relay and evolution cues reuse that original vocabulary, no BGM or other-game sound transplant. Native runtime video/screenshots; video container seek metadata added with lossless stream copy, no reencoding/speed change.
- Actual models: primary research synthesis/architecture/integration/finalQA `gpt-6-astra`; bounded research/art/review page/unit tests `gpt-5.6-sol`. Human Craft/Core PASS inherited; Progression Human Gate, physical devices/listening and legal/public release remain separate pending gates.


## 2026-09-20 — PROJECT MAGNET Tempo & Clear Feedback R2.1

- Isolated game004-magnet-tempo. R2 art.ts/audio.ts byte-identical. Original same-game Canvas charge links and completion/equip text; existing complete/upgrade cues reused. No new external image/audio/font/BGM, purchase or asset generation.
- Native continuous Before/After and SWARM full-run capture; container stream-copy metadata only. LANCE ordinary real-time touch trace. Source/evidence of R2 and all older prototypes preserved.
- Actual primary model gpt-6-astra; bounded read-only research/review gpt-5.6-sol. Human Progression replay, physical devices/listening/first-use and legal/public-release gates remain pending.

## Game004 Expansion Slice A — local candidate / 2026-09-20

- Source: game004-magnet-expansion/. Accepted R2.1 source copied locally with provenance in GAME004_MAGNET_BASELINE_R2_1; original source/evidence unchanged.
- New original Canvas art: rail gunner (twin rails), repair support (three arms/link), armored carrier (tracks/front plate/side vents), satellite reservation arcs, foundry rail/bundled-shot markers. Original procedural WebAudio cues in candidate audio.ts; no external image/audio/generation service or paid asset.
- New source/QA/videos remain local and unpublished. Continuous 37.279s native canvas/WebAudio footage and 34.279s stream-copy excerpt derive from actual automated input, not generated imagery. See docs/qa/game004-magnet-expansion-a-r1/REVIEW.md and media.json.
- Public competitor pages/reviews are cited links/paraphrases only; competitor artwork/music/video is not incorporated. Formal naming/trademark/rights release acceptance remains pending. Primary/reviewer model: gpt-6-astra; additional cash spend/contract 0.

## Game004 Full Game Production R1 — isolated candidate / 2026-09-20

- R2.1 and Human Accepted Expansion Slice A source/build/evidence retained unchanged. New source is game004-magnet-full/. Original same-game Canvas assets and procedural WebAudio inherited locally.
- Added original six-coil Magnet Core boss, pulse/warning/recovery rings and procedural pulse/core-open cues. Hub is original HTML/CSS. No external media/font/BGM, asset purchase or image generation service.
- Native full browser flow 449.640s (silent UI), Canvas/WebAudio full 447.229s and 73.851s continuous B/C excerpt derive from actual automated input; no generated frames or speed changes. Canvas container indexed and excerpted by stream copy; original raw capture retained in repo-local ignored output.
- gpt-6-astra: primary/code/art/audio/integration/QA. gpt-5.6-sol: bounded Hub UI and read-only review. Source/provenance, frozen hashes and NOT TESTED listening/physical-device/release gates are in docs/qa/game004-magnet-full-r1/REVIEW.md. External writes/cost/contracts 0.
