import type {Localized} from '../data/games';

// Public editorial copy. Identity, selection, controls and save behavior stay in
// their existing registries/adapters. Descriptions are specific to each page.
export const pageDescription:Record<string,Localized>={
 '':{ja:'パズル、磁力アクション、島づくり。Tinlumoのオリジナルゲームを、ブラウザーですぐに。無料・インストール不要、日本語と英語で遊べます。',en:'Find your next puzzle, magnetic action game or little island to build. Play Tinlumo originals free in your browser, in Japanese or English. No installation needed.'},
 games:{ja:'道順を考える、光をつなぐ、金属を放つ、島を育てる。遊び方の異なるTinlumoの作品から、気になるゲームを選べます。',en:'Plan a delivery, guide the light, launch gathered metal or build an island. Explore Tinlumo games and find out how to play.'},
 about:{ja:'Tinlumo Studioは、ブラウザーですぐ遊べるオリジナルゲームを制作・公開する個人運営のスタジオです。無料で、日本語と英語に対応しています。',en:'Tinlumo Studio is an independent, individually operated studio creating original browser games. Play free in Japanese or English, with no account needed.'},
 settings:{ja:'任意のアクセス計測の選択と、ゲームの設定・保存の案内。Hakoriloの進行は、内容を確認してから消去できます。',en:'Choose whether to allow optional analytics and find game settings and save information. Review what will be erased before deleting Hakorilo progress.'},
 privacy:{ja:'ブラウザー内の保存、任意のアクセス計測、サイト配信、お問い合わせ情報の取扱いと個人情報に関する請求について。',en:'How Tinlumo handles browser saves, optional analytics, hosting and information you send us, including personal-data requests.'},
 terms:{ja:'Tinlumoのゲームを利用する際の条件、保存とサービス提供、作品の権利と利用上のお願い。',en:'Terms for playing Tinlumo games, including saves, service availability, rights and acceptable use.'},
 contact:{ja:'Tinlumo Studioへのお問い合わせ、運営者情報の照会、個人情報に関する請求の窓口。不具合を報告するときの案内も掲載しています。',en:'Contact Tinlumo Studio with feedback, bug reports, operator-information requests or personal-data requests.'},
 credits:{ja:'Tinlumoのゲームの制作情報、AI支援制作、画像・音の来歴、Three.jsとAstroのライセンス。',en:'Production credits for Tinlumo games: AI-assisted development, artwork and sound origins, and Three.js and Astro licenses.'},
 'video-policy':{ja:'Tinlumoのゲームの実況・動画・スクリーンショット利用について。収益化を含む利用条件とお問い合わせ先。',en:'Guidance for sharing Tinlumo gameplay videos, streams and screenshots, including monetization and contact information.'},
 '404':{ja:'ページが見つかりません。Tinlumoのホームからゲームを探せます。',en:'This page could not be found. Visit Tinlumo home to find a game to play.'},
};

export const coverAlt:Record<string,Localized>={
 'tiny-delivery':{ja:'配送ロボットと道が並ぶ小さな村',en:'Delivery robots and paths in a little village'},
 'light-garden':{ja:'鏡と花が並ぶ、光の通る温室',en:'Light passing through a conservatory of mirrors and flowers'},
 'two-ways-home':{ja:'ふたりがそれぞれの家を目指す、並んだ街',en:'Two neighboring towns, with a traveler heading home in each'},
 'project-magnet':{ja:'金属片と装甲の敵に囲まれた工業港の機体',en:'A machine among metal scraps and armored enemies in an industrial dock'},
 game005:{ja:'家や道、木々が広がる小さな島',en:'A little island with houses, paths and trees'},
};

export const playGuide:Record<string,Localized>={
 'tiny-delivery':{ja:'道の矢印をタップして進む向きを決め、時計の場所で待つ時間を選びます。「出発」で荷物を届けましょう。2台が登場したら、ぶつからずに通れる道順とタイミングを考えます。「道を直す」で調整に戻れます。',en:'Tap the route arrows to choose a direction and set how long to wait at each clock. Select “Go” to send the delivery. When two couriers appear, plan their routes and timing to avoid a collision. Select “Edit route” to return to editing.'},
 'light-garden':{ja:'鏡をタップして向きを変え、光をすべての花へ届けます。受光器に光を当てると門が開きます。直前の操作を戻しながら、光の通り道を探しましょう。',en:'Tap a mirror to turn it and guide light to every flower. Light up a receiver to open a gate. Use “Undo” to take back your last move as you work out the path of light.'},
 'two-ways-home':{ja:'ひとりでふたりを動かすパズルです。盤面をスワイプすると、ふたりが同じ方向へ動きます。壁で片方を止め、最後の一歩をそろえて両方の家へ帰しましょう。方向ボタン・矢印キー・WASDでも操作できます。',en:'A puzzle for one player, guiding two travelers. Swipe a board to move both in the same direction. Use walls to hold one in place, then line up the final step into both homes. Direction buttons, arrow keys and WASD also work.'},
 'project-magnet':{ja:'WASDまたは矢印キーで移動。マウスの左ボタンを押し続けて近くの金属を集め、敵を狙って離すと一斉射出します。タッチは左指で移動、右指で吸引・照準し、右指を離して射出。壊した装甲を回収して設備へ送電し、区画をクリアして進化を選びましょう。作戦Aを完了するとB、Bを完了するとCが開きます。',en:'Move with WASD or arrow keys. Hold the left mouse button to gather nearby metal, aim at an enemy, then release to launch it. On touch screens, move with your left thumb; gather and aim with your right, then release it. Reclaim broken armor to power relays, clear sectors and choose upgrades. Finish Mission A to unlock B, then B to unlock C.'},
 game005:{ja:'「建築・施設」で作るものを選び、木材と資金を使って住民に作業を頼みます。木材を出荷して資金を集め、入り江や丘へ道をつなぎましょう。広場や見晴らしの向きを選ぶと、暮らしの景色が変わります。完成後も島を眺め、市場・広場の配置を調整できます。',en:'Open “Build & explore”, choose what to build and spend timber and coins to let residents do the work. Ship timber for coins and connect paths to the cove and hill. Your choices for the commons and lookout shape the view. After completion, keep exploring or reposition the market and commons.'},
};
