# GAME004 MAGNET — Progression Research R1 / R2 Authority

2026-09-20。Human依頼「Research → Structure Decision → Vertical Slice R2」の実装前判断。Craft Quality / Core Combat は Human PASS。進行・目的・終わり・成長の発展性は未受入。主担当/統合/構造判断 `gpt-6-astra`、限定read-only調査 `gpt-5.6-sol` 2名。市場規模・売上推計ではない。

## Evidence policy

FACT = ストア/開発元が明記した仕様・取得日の表示値。OBSERVED-REVIEW = 公開レビュー個人の申告。REFERENCE = Wiki等二次資料の記載（公式FACTに昇格しない）。INFERENCE = 本作への設計推論。UNKNOWN = 未確認。今回、動画計測を行っておらず「何秒で面白い」は全作品UNKNOWN。秒数のない矢印は順序だけを示す。retention/revenue/DAU、代表的な平均run長、因果効果は全作品UNKNOWN。評価値は2026-09-20取得・地域/言語/フィルタ別のsnapshotであり比較ランキングではない。

## Benchmarks — 10作品 / 3系統

### Combat / encounter analogs

|作品・成功の公開proxy|確認できた構造・選択・難化|終了 / 再挑戦 / 恒久側 / touch適合|
|---|---|---|
|Hades: Steam英語98% / 142,374件、recent94% / 1,120|FACT: escape attempts、神々の力/武器、反復で強化と物語。最初のboon/選択数/敵・eliteの秒数と頻度はUNKNOWN。REFERENCE: biome/room経由で最終bossへ。15–30分はplayer申告で平均値ではない|死亡/脱出→House→別武器/boon。恒久強化あり。INFERENCE: 分岐報酬と死後の意味が強いが、入力数・長いrunはtouch負担|
|Enter the Gungeon: Steam英語95% / 39,203、recent89% / 276|FACT: 手作りroomを手続生成、武器/item/chest/shop、floor末boss。REFERENCE: 通常5floor。初chest/強化候補数/所要時間/elite時刻UNKNOWN|死亡でrun装備喪失、Hegemony Credits等で解放。INFERENCE: resource判断が明確、dodge/blank/切替はMagnetへ移植しない|
|Nuclear Throne: Steam英語96% / 9,805、recent93% / 72|FACT: radiation→mutation、武器選択、Throne。REFERENCE: 7-3終点、奇数area末boss。初mutationは取得量次第、秒数/候補数UNKNOWN。10–12分は個人review申告。under10min achievementは平均時間ではない|死/Throne/loop→即retry、character/crown等解放。INFERENCE: 短い戦闘と素早い再開が適合、奇襲の理不尽さは避ける|
|Go Mecha Ball: Steam購入者85% / 369（all-language entries456とは母数が別）|FACT: arcade level、wave、boss、4mech、武器/能力/upgrade。OBSERVED/REFERENCE: 3attack stage→shop→boss×4chapter。under30min achievementは平均ではない。選択候補数/初強化/elite秒数UNKNOWN|死亡/clear→mech強化/解放・別loadout。INFERENCE: 物理collisionと短い達成区切りが近いが、立体地形/転がり入力は移植しない|

Sources: [Hades store](https://store.steampowered.com/app/1145360/Hades/), [Gungeon store](https://store.steampowered.com/app/311690/Enter_the_Gungeon/), [developer Gungeon guide](https://blog.playstation.com/2016/04/05/how-to-get-started-in-enter-the-gungeon-on-ps4/), [Gungeon bosses reference](https://enterthegungeon.wiki.gg/wiki/Bosses), [Nuclear Throne store](https://store.steampowered.com/app/242680/Nuclear_Throne/), [areas reference](https://idntg.com/areas), [achievements](https://steamcommunity.com/stats/242680/achievements/), [Go Mecha Ball store](https://store.steampowered.com/app/2008510/Go_Mecha_Ball/), [player discussion](https://steamcommunity.com/app/2008510/discussions/0/4137186960650896996/), [achievements](https://steamcommunity.com/stats/2008510/achievements/).

### Progression / mobile / browser analogs

|作品・成功の公開proxy|確認できた構造・選択・難化|終了 / 再挑戦 / 恒久側 / touch適合|
|---|---|---|
|Brotato: Steam英語96% / 32,323、recent89% / 1,082。Android Premium4.8 / 60.3K、1M+ downloads|FACT: 20–30分run、20–90秒wave、最大6武器、auto-fire。REFERENCE: 20waves、wave1=20秒、levelup4択/shop4枠、Danger2+の11/12 elite/horde、20boss。初decisionはwave1後、spikeは購入内容次第|死/20boss→別character/weapon/Danger。解放あり。INFERENCE: action/選択分離はtouch向き、20回shopは本sliceには多い|
|Survivor.io: Android4.5 / 1.12M、50M+ DL。US iOS4.7 / 245K|FACT: 片手、stage難度。REFERENCE: EXP3択、5star+support→EVO、square8分boss2/4/6/7/8、他15分boss5/10/15というcommunity報告。elite/初upgrade秒数UNKNOWN|最終boss/死→gear等恒久強化→retry。INFERENCE: EVOが明確な期待を作るがgear grindや画面飽和は採らない|
|Archero初代: Android4.3 / 1.74M、50M+ DL。US iOS4.7 / 470K|FACT Apple tips: 開始perk3択、levelup3択、死でrun skill消失。REFERENCE: 50room型10room毎boss、20wave型5毎boss。一般run長/elite/2回目選択時刻UNKNOWN|chapter clear/death→gear/hero強化→retry。INFERENCE: 小区切りと予告は使えるが50room/恒久強化待ちは過剰|
|Soul Knight: Android4.6 / 1.77M、100M+ DL。US iOS4.8 / 127K|FACT: 20+hero/400+weapon/random dungeon/autoaim、公式speedrun終点3-5 GAME COMPLETE。REFERENCE: 3biome×5floor、x-5boss、buff3択/7枠。15–30分はplayer申告。初buff/elite秒数UNKNOWN|死/3-5→別hero/weapon/mode、解放。INFERENCE: 武器差とautoaimはtouch向き、多数buttonは不要|
|Vampire Survivors: Steam英語98% / 128,028、recent95% / 1,178。US iOS4.6 / 5.1K|FACT: time survival、runのgoldで次を強化、touch対応。REFERENCE: levelup3/4択、武器evolution。30分標準というplayer申告、map/mode差あり。初upgrade/elite/全boss秒数UNKNOWN|死/規定stage終了→gold/character/unlockでretry。公式Adventuresはchapter別setup/勝利条件。INFERENCE: 成長予告は有効、30分とgrind前提は本作に重い|
|10 Minutes Till Dawn **HTML5 demo**: itch4.8 / 742ratings|FACT developer: 10分horde生存、50+upgrades、character/weapon選択、5–10分quick sessionと説明。初levelup/候補数/elite/boss秒数UNKNOWN。Steam製品20 Minutesとは混同しない|10分生存/死→別build retry。恒久側詳細UNKNOWN。INFERENCE: browserで短いrunとbuild差の近い参考、WASD+mouseをそのままtouchに移さない|

Sources: [Brotato Steam](https://store.steampowered.com/app/1942280/Brotato/?l=english), [Brotato mobile Premium](https://play.google.com/store/apps/details?id=com.brotato.shooting.survivors.games.paid.android), [waves reference](https://brotato.wiki.spellsandguns.com/Waves), [upgrades reference](https://brotato.wiki.spellsandguns.com/Upgrades), [shop reference](https://brotato.wiki.spellsandguns.com/Shop), [Survivor.io Play](https://play.google.com/store/apps/details?id=com.dxx.firenow&hl=en-US), [iOS](https://apps.apple.com/us/app/survivor-io/id1528941310), [EVO secondary](https://www.allclash.com/survivor-io-evo-skill-guide-tier-list/), [map timing community](https://www.reddit.com/r/Survivorio/comments/1duw0rl/), [Archero Play](https://play.google.com/store/apps/details?id=com.habby.archero&hl=en-US), [Apple tips](https://apps.apple.com/us/story/id1500619510), [50room example](https://archero.fandom.com/wiki/The_Capital), [20stage example](https://archero.fandom.com/wiki/Abandoned_Dungeon), [Soul Knight Play](https://play.google.com/store/apps/details?id=com.ChillyRoom.DungeonShooter&hl=en-US), [developer speedrun](https://soulknight.chillyroom.com/et/article/base/19), [levels](https://soulknight.fandom.com/wiki/Levels), [buffs](https://soulknight.fandom.com/wiki/Buffs), [VS Steam](https://store.steampowered.com/app/1794680/Vampire_Survivors/), [VS iOS reviews](https://apps.apple.com/us/app/vampire-survivors/id6444525702?see-all=reviews), [poncle Adventures](https://poncle.games/adventures-faq), [VS levelup reference](https://vampire-survivors.fandom.com/wiki/Level_up), [10MTD developer and comments](https://flanne.itch.io/10-minutes-till-dawn).

## Ten-step flow (order, not invented timestamps)

Columns: START → FIRST FUN → FIRST DECISION → FIRST SPIKE → NEW THREAT → SECOND DECISION → ESCALATION → CLIMAX → RESULT → RETRY. Timing not explicitly shown is UNKNOWN, choices/areas from references retain REFERENCE status above.

|Title|Flow|
|---|---|
|Hades|weapon → first fight → boon/route → synergy → biome enemy → boon/shop → later biomes → surface boss → escape/death → House/weapon|
|Gungeon|starter gun → room → key/chest/shop → useful gun → floor boss → ammo/reward → later floors → Dragun → clear/death → Breach/unlocks|
|Nuclear Throne|character → firefight → weapon trade → mutation → area boss → next mutation → later areas → 7-3 Throne → death/loop → quick restart|
|Go Mecha Ball|mech → roll/collision → stage reward → synergy → next arena → shop after3 (secondary) → later worlds → fourth boss → result → mech/loadout|
|Brotato|character → autofire → **20s wave1 end** → weapon/stat synergy → Danger elite11/12 → repeated shop → later waves → wave20 → win/death → character/Danger|
|Survivor.io|gear → first horde → XP choice → EVO → boss2/5min by map (community) → skill/chest → later boss → 8/15min final (community) → clear/death → gear/retry|
|Archero|**initial3choice** → room → next level → multishot synergy → room10 orwave5 boss → skill/Angel → later rooms → chapter final → clear/death → equipment/retry|
|Soul Knight|hero → autoaim room → weapon/buff → synergy → 1-5 boss → next buff → biome2/3 → 3-5 → complete/death → hero/dungeon|
|VS|character → gems/horde → XP choice → weapon synergy/evolution → time enemy change → XP/chest → later density → map endpoint → death/result → unlock/build|
|10MTD|character/weapon → aimed shooting → XP upgrade → synergy → horde types → next upgrade → late pressure → **10min endpoint** → survive/death → different build|

## Player feedback — descriptive samples, no causal inference

These are individual public comments, not representative sentiment measurements. No claim that rating proves retention or a particular mechanic works.

|Title|Positive / reason to return|Negative / reason to stop|Sample source|
|---|---|---|---|
|Hades|responsive combat、death-integrated story、power combinations|later repetition、dialogue/RNG grind|[reviews](https://steamcommunity.com/app/1145360/reviews/), [individual](https://steamcommunity.com/id/clumbernut/recommended/1145360/)|
|Gungeon|skill ownership、gun variety、resource decisions|starter-gun RNG、steep barrier、repeated bosses|[individual](https://steamcommunity.com/id/Rokk/recommended/311690/), [individual](https://steamcommunity.com/id/Brian_Colfxire/recommended/311690/)|
|Nuclear Throne|quick retry、crunch、pressure|surprise spawn、mutation balance、recycled loop|[reviews](https://steamcommunity.com/app/242680/reviews/), [individual](https://steamcommunity.com/id/bi0v0id/recommended/242680)|
|Go Mecha Ball|momentum、pinball impacts、synergy|remembered waves、airborne downtime、unclear upgrade effect|[discussion](https://steamcommunity.com/app/2008510/discussions/0/4137186960650896996/)|
|Brotato|character/build variety、shop/action separation|same empty arena、similar enemies、mobile late lag|[reviews](https://steamcommunity.com/app/1942280/reviews/?browsefilter=toprated&l=english)|
|Survivor.io|extreme weapon growth、time-killer|late grind、single meta、power creep、old-device crash|[Play reviews](https://play.google.com/store/apps/details?id=com.dxx.firenow&hl=en-US), [longtime sample](https://www.reddit.com/r/Survivorio/comments/1lwevz6/)|
|Archero|chapter breakthrough、skill stacking|months stuck、weak perks、bullet-sponge bosses、feature overload|[iOS reviews](https://apps.apple.com/us/app/archero/id1453651052?platform=ipad&see-all=reviews)|
|Soul Knight|distinct hero/weapon playstyles、returning content|same hero repetition、event grind/FOMO、connection/crash concerns|[iOS reviews](https://apps.apple.com/us/app/soul-knight/id1184159988?platform=ipad&see-all=reviews), [event sample](https://www.reddit.com/r/SoulKnight/comments/1abe0g0/)|
|VS|different run outcomes、discoveries、clear endpoint|permanent-stat grind felt mandatory; interrupted run loss reported with cause uncertain; visual-motion accessibility complaint|[iOS reviews](https://apps.apple.com/us/app/vampire-survivors/id6444525702?see-all=reviews)|
|10MTD|visible bullet/build synergies、experimentation|late enemy spam、dominant builds、hand fatigue|[developer page comments](https://flanne.itch.io/10-minutes-till-dawn)|

Synthesis (INFERENCE): short legible commitments, a choice with immediate consequence, new threat that tests that choice, and a finite visible destination fit this combat. Avoid HP-only difficulty, enemy-count-only escalation, numeric-only upgrades, identical early grind, many interruption screens, meta prerequisites, and long tail after the final new mechanic. No available review sample establishes an optimal number of choices or an optimal session duration.

## Structure comparison / decision BEFORE implementation

Scores are design judgment H/M/L, not market measurements. Ads/App Store compatibility is architectural only; approval/compliance/distribution remain UNKNOWN and no implementation is authorized.

|Criterion|A timed stage survival|B continuous arena/wave|C room exploration|D objective encounter circuit|
|---|---|---|---|---|
|Magnet pull/orbit/launch/recovery|H|H|M|H|
|Gold feel preservation|H|H|M (travel)|H|
|Repetition risk|M|H|M|M (must vary objective pressure)|
|Progression clarity|H|M|H|H: relays→route→reactor|
|Build diversity|H|H|H|H|
|Mobile / web / short session|H/H/H|H/H/M|M/H/M|H/H/H|
|Implementation complexity|L|L|H|M|
|Future content scalability|M|M|H|H via encounters|
|Future ad-break boundary|clear|weak|room clear|clear, optional only|
|Future App Store fit|plausible|plausible|plausible|plausible; packaging untested|

**Choose D: Salvage Circuit.** Six compact encounters share the accepted yard and controls. Fired scrap powers physical relay targets; repaired equipment changes the destination and closes each encounter. Enemies interrupt that purpose. Three calm decisions after encounters1/2/5; two meaningful evolution moments after2/5. The final Foreman is protected by reactor locks that must be powered, then exposes a damage segment/counterattack. Finish all segments for an explicit RUN CLEAR. No random navigation, inventory shop, meta progression, story system, save, or external integration.

Reject A as primary: a clock can make skilled play wait and repeat R1's weakness. Reject B: new enemy timestamps alone do not answer “why move forward.” Reject C: traversal/room generation adds scope and weakens the immediate recovery loop. D retains useful short clear/choice punctuation from A/C without their unrelated systems. Six encounters and three choices are prototype judgments, not proven market optima.

## GAME004 PROGRESSION HYPOTHESIS / pre-implementation criteria

1. Next objective: power marked salvage relays to reopen six links of the yard circuit; the HUD shows completed links and the next mechanical test.
2. Growth: first recovered armor retains Gold's immediate transformation; first selected module changes return/orbit/defense behavior. Evolution1 chooses **SWARM** (wide collection, many spread projectiles) or **LANCE** (narrow fast piercing line). Evolution2 adds orbit shockwave or returning piercing shots, with distinct hardware/trails.
3. New decisions: shield requires flank/plate break; charger requires lane bait/dodge; mixed groups force when to spend scrap on a relay vs a threat; pulse lanes add positioning without more input buttons.
4. Evolution changes acquisition radius/capacity, spread/speed/pierce and late utility. Both builds have a complete route; neither requires future unlocks.
5. Climax: the lit circuit predicts a final target. Relay locks, exposed segments and countercharge demand the same collect/aim/release skill with a changed target priority, not a larger HP pool alone.
6. Retry: result names the selected build and offers immediate retry plus the alternate evolution to try, without a grind prerequisite.

Success criteria (test targets, not Human PASS): first combat available immediately; initial choice preferably within45s skilled play; three choices only, paused safely, no timer choice expiry; two branch evolutions have visible/mechanical differences; each encounter has a named new decision; exact six-step progress and finite clear/failure; final target cannot be bypassed by one huge volley; both branches finish through ordinary input; result→retry one action. **6–8min target for a deliberate first complete run**, measured and adjusted in playtest; do not add idle minimum-time gates to force this length. Faster scripted/high-skill clears are reported separately and cannot establish first-time Human duration. Maintain Gold TUNE/first volley, reduced motion, mute/pause/blur/pointer cancellation, bounded objects/audio, mobile simultaneous movement/aim and orientation continuity. No network/storage/production mutation.

## Unknowns / limits

Human A–H fun/progression/quality, first-time duration, physical mobile thermals/touch/listening, broad build balance, retention and commercial viability remain PENDING/NOT TESTED. Store popularity is an inclusion proxy, not a forecast. No run footage was measured for benchmark timing. Reference sites/community reports may drift or differ by version/mode. R2 QA must attach actual timings, failures and adjustments without retroactively describing implementation as research FACT.

## Post-implementation findings (not retroactive benchmark FACT)

Relay-only hit quota initially produced152.36s objective DPS. Playtest changed this to one-time recovered-armor delivery and tactical shield/current power windows. A later6:08.75 SWARM run included unnecessary reinforcement waits; these were shortened to2.2s after clearing guards. Final actual timings and branch differences are in the R2 Review Pack. The6–8min first-time target remains unvalidated: retaining empty time to match it was rejected. Boss relay power now triggers a committed countercharge before exposure. These are prototype decisions from technical play, not Human fun acceptance.
