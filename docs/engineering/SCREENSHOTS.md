# Screenshot Provenance

READMEの5枚は**CURRENT_CAPTURE**です。2026-09-27固定commit `d8ca30c36d94f1a9272267497c993a12dd0e9f25`から復元し、2026-11-07 JSTにWindows Chromium系browserで通常操作して撮影しました。

| File | 対象route |
| --- | --- |
| `screens/hakorilo.png` | `/ja/play/tiny-delivery/` |
| `screens/lightwork.png` | `/ja/play/light-garden/` |
| `screens/two-ways.png` | `/ja/play/two-ways-home/` |
| `screens/magnet.png` | `/ja/play/project-magnet/` |
| `screens/island.jpg` | `/ja/play/island-connections/` |

最初の4枚は1440×1000pxです。Islandは1230×1000px viewportからのIAB出力で、保存画像は1050×854pxです。独立した一時context / localStorage、loopback originを使用。公開時の画像や販促artの再掲ではありません。browser chrome、個人profile、認証、外部account画面を含めていません。生成AIによる作成・retouchはしていません。

HTTP guard / CSPとQA用off-origin request遮断を適用しています。asset bytesは固定版と一致しますが、production header・広告・CMPの完全再現ではありません。操作・保存QA（参照原本はPrivate保全・候補には非同梱）と、実機・全編・Human受入の未検証を区別します。
