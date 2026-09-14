import type { HomeLevel } from './rules';

// T01–T05 preserve the MVP board, ID and content version. R2 adds localized guidance.
export const homeLevelsR2: HomeLevel[] = [
  {
    "kind": "home",
    "id": "T01",
    "version": 1,
    "answerKey": "T01@1",
    "size": 4,
    "title": {
      "ja": "いっしょに一歩",
      "en": "One step together"
    },
    "lesson": {
      "ja": "ひとつの方向ボタンで、ふたりが動く。○と□をそれぞれの家へ。",
      "en": "One direction moves both friends. Bring ○ and □ to their matching homes."
    },
    "starts": [
      12,
      12
    ],
    "homes": [
      14,
      14
    ],
    "walls": [
      0,
      1,
      5,
      7
    ],
    "otherWalls": [
      0,
      2,
      5,
      7
    ],
    "hints": [
      {
        "ja": "右へ押すと、ふたりとも右へ一歩。",
        "en": "Press right: both friends take one step."
      },
      {
        "ja": "右をもう一度。家の印にふたりを重ねよう。",
        "en": "Press right again to bring both friends home."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T02",
    "version": 1,
    "answerKey": "T02@1",
    "size": 4,
    "title": {
      "ja": "壁でひとやすみ",
      "en": "A wall lends a hand"
    },
    "lesson": {
      "ja": "壁に当たった子だけ止まる。ふたりの位置をずらそう。",
      "en": "Only the friend facing a wall stops. Use that to adjust their positions."
    },
    "starts": [
      12,
      13
    ],
    "homes": [
      6,
      6
    ],
    "walls": [
      3,
      7,
      11
    ],
    "otherWalls": [
      0,
      4,
      8
    ],
    "hints": [
      {
        "ja": "位置の差は、片方だけ止まると変わる。",
        "en": "Their spacing changes when only one friend stops."
      },
      {
        "ja": "左右の端を使って、横の位置をそろえよう。",
        "en": "Use the left or right edge to line up their columns."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T03",
    "version": 1,
    "answerKey": "T03@1",
    "size": 4,
    "title": {
      "ja": "近道はどっち？",
      "en": "Which way is shorter?"
    },
    "lesson": {
      "ja": "片方だけでなく、ふたつの庭を見比べよう。",
      "en": "Look at both gardens before choosing your next step."
    },
    "starts": [
      12,
      15
    ],
    "homes": [
      3,
      0
    ],
    "walls": [
      5,
      6,
      10
    ],
    "otherWalls": [
      5,
      9,
      10
    ],
    "hints": [
      {
        "ja": "片方の近道を選ぶ前に、もう一方の壁も見よう。",
        "en": "Before taking one shortcut, check the other garden."
      },
      {
        "ja": "家の左右が逆。片方を端で止めて、位置を入れ替えよう。",
        "en": "The homes are on opposite sides. Hold one friend at an edge to change their spacing."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T04",
    "version": 1,
    "answerKey": "T04@1",
    "size": 4,
    "title": {
      "ja": "おかえり、もう一歩",
      "en": "Home, then one more step"
    },
    "lesson": {
      "ja": "ひとり帰っても、まだ続く。家から出て、ふたり同時に帰ろう。",
      "en": "One friend home is not the finish. You can leave home to get both back together."
    },
    "starts": [
      12,
      14
    ],
    "homes": [
      13,
      2
    ],
    "walls": [
      8,
      5,
      6,
      7
    ],
    "otherWalls": [
      10,
      13,
      4,
      5,
      9
    ],
    "hints": [
      {
        "ja": "先に着いた子も、次の矢印で動く。",
        "en": "The first friend home still moves with the next arrow."
      },
      {
        "ja": "右でひとり帰宅したら、上へ。いったん家を出よう。",
        "en": "After right brings one friend home, press up to leave it."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T05",
    "version": 1,
    "answerKey": "T05@1",
    "size": 4,
    "title": {
      "ja": "最後の待ち合わせ",
      "en": "The last rendezvous"
    },
    "lesson": {
      "ja": "どちらの壁を使おう？ずらして、最後の一歩をそろえよう。",
      "en": "Choose which walls to use. Line up the final step together."
    },
    "starts": [
      12,
      3
    ],
    "homes": [
      3,
      13
    ],
    "walls": [
      5,
      6
    ],
    "otherWalls": [
      6,
      10
    ],
    "hints": [
      {
        "ja": "同じ方向に進める一歩手前を、ふたり分探そう。",
        "en": "Look for a square before each home that shares a final direction."
      },
      {
        "ja": "片方を壁で止める調整を、横と縦で使おう。",
        "en": "Use a wall to adjust one friend horizontally and vertically."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T06",
    "version": 1,
    "answerKey": "T06@1",
    "size": 4,
    "title": {
      "ja": "庭を読みなおす",
      "en": "Read the gardens"
    },
    "lesson": {
      "ja": "ふたりの位置を見て、自分で家への道を作ろう。",
      "en": "Read both positions and find your own route home."
    },
    "starts": [
      12,
      10
    ],
    "homes": [
      0,
      7
    ],
    "walls": [
      1,
      5,
      10
    ],
    "otherWalls": [
      2,
      6,
      9
    ],
    "hints": [
      {
        "ja": "家までの道を、ふたり分まとめて追ってみよう。",
        "en": "Trace both routes home together."
      },
      {
        "ja": "上を二回で壁に合わせる。そのあと右、上。",
        "en": "Move up twice to align at the walls, then right and up."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T07",
    "version": 1,
    "answerKey": "T07@1",
    "size": 4,
    "title": {
      "ja": "横の待ち合わせ",
      "en": "Across the page"
    },
    "lesson": {
      "ja": "横の差を、端で止まる一歩で調整しよう。",
      "en": "Use an edge to adjust their columns."
    },
    "starts": [
      11,
      0
    ],
    "homes": [
      10,
      1
    ],
    "walls": [
      5,
      6,
      9
    ],
    "otherWalls": [
      2,
      6,
      10
    ],
    "hints": [
      {
        "ja": "近い家へ直行すると、もうひとりの横位置が合わない。",
        "en": "Going straight to the nearer home leaves the other friend in the wrong column."
      },
      {
        "ja": "下へ一歩、左へ二歩。端で差を作ってから右、上。",
        "en": "Go down once and left twice. Use the edge to change spacing, then right and up."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T08",
    "version": 1,
    "answerKey": "T08@1",
    "size": 4,
    "title": {
      "ja": "縦の待ち合わせ",
      "en": "A little further down"
    },
    "lesson": {
      "ja": "下の壁を使って、ふたりの高さを調整しよう。",
      "en": "Use the lower walls to adjust their rows."
    },
    "starts": [
      0,
      0
    ],
    "homes": [
      13,
      1
    ],
    "walls": [
      1,
      5,
      7,
      10
    ],
    "otherWalls": [
      5,
      8,
      9,
      14
    ],
    "hints": [
      {
        "ja": "今度は上下の位置をずらす。下側の壁を見比べよう。",
        "en": "This time adjust their rows. Compare the walls below them."
      },
      {
        "ja": "まず右。下へ三回で片方を止めたら、左、右。",
        "en": "Start right. Press down three times to hold one friend, then left and right."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T09",
    "version": 1,
    "answerKey": "T09@1",
    "size": 4,
    "title": {
      "ja": "角で待っていて",
      "en": "Wait at the corner"
    },
    "lesson": {
      "ja": "角でひとりを止め、もうひとりの位置を作ろう。",
      "en": "Hold one friend at a corner to prepare the other position."
    },
    "starts": [
      11,
      13
    ],
    "homes": [
      1,
      0
    ],
    "walls": [
      5,
      7,
      9,
      10
    ],
    "otherWalls": [
      1,
      5,
      6,
      10
    ],
    "hints": [
      {
        "ja": "端でひとりが止まる間、もうひとりを角へ運ぼう。",
        "en": "While one friend waits at an edge, bring the other to a corner."
      },
      {
        "ja": "下へ進み、左端までそろえる。上へ進んで最後は右。",
        "en": "Go down, then align at the left edge. Head up; finish with right."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T10",
    "version": 1,
    "answerKey": "T10@1",
    "size": 5,
    "title": {
      "ja": "家は通り道",
      "en": "Home is on the way"
    },
    "lesson": {
      "ja": "家を通り道にして、次の準備へ進もう。",
      "en": "Pass through an early home to prepare the next move."
    },
    "starts": [
      15,
      24
    ],
    "homes": [
      21,
      3
    ],
    "walls": [
      6,
      7,
      8,
      16,
      18
    ],
    "otherWalls": [
      6,
      8,
      12,
      13,
      16
    ],
    "hints": [
      {
        "ja": "先着した家は通り道。帰宅後も動かせる。",
        "en": "An early home is part of the route. Keep moving after one friend arrives."
      },
      {
        "ja": "下、右でひとり帰宅。上へ四歩進み、右、左で合わせよう。",
        "en": "Down and right bring one home. Go up four times, then right and left to align."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T11",
    "version": 1,
    "answerKey": "T11@1",
    "size": 5,
    "title": {
      "ja": "壁を使う順番",
      "en": "Walls in order"
    },
    "lesson": {
      "ja": "横の差を作ってから、縦の壁へ向かおう。",
      "en": "Adjust across the garden, then use the vertical walls."
    },
    "starts": [
      15,
      9
    ],
    "homes": [
      22,
      17
    ],
    "walls": [
      2,
      7,
      12,
      16,
      18
    ],
    "otherWalls": [
      6,
      8,
      11,
      13,
      18
    ],
    "hints": [
      {
        "ja": "先に横の差を作ると、下への道がそろう。",
        "en": "Change their columns first to align the way down."
      },
      {
        "ja": "上、左二回で準備。下二回、右二回、下で帰ろう。",
        "en": "Prepare with up and two lefts. Then down twice, right twice, and down."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T12",
    "version": 1,
    "answerKey": "T12@1",
    "size": 5,
    "title": {
      "ja": "ふたつの調整",
      "en": "Two adjustments"
    },
    "lesson": {
      "ja": "二つの壁の働きを組み合わせよう。",
      "en": "Combine two wall adjustments."
    },
    "starts": [
      1,
      1
    ],
    "homes": [
      22,
      4
    ],
    "walls": [
      6,
      8,
      11,
      13,
      18
    ],
    "otherWalls": [
      6,
      7,
      8,
      12,
      16
    ],
    "hints": [
      {
        "ja": "横で作った差を、縦の壁で使おう。",
        "en": "Use the spacing made across the garden at the vertical walls."
      },
      {
        "ja": "右、下、右、下二回。終わりは右、左、下、右。",
        "en": "Go right, down, right, down twice. Finish right, left, down, right."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T13",
    "version": 1,
    "answerKey": "T13@1",
    "size": 5,
    "title": {
      "ja": "最後の一歩から",
      "en": "Start with the last step"
    },
    "lesson": {
      "ja": "最後は上へ一歩。そこから逆に考えよう。",
      "en": "Finish with one step up. Plan backward from there."
    },
    "starts": [
      14,
      19
    ],
    "homes": [
      19,
      0
    ],
    "walls": [
      1,
      6,
      8,
      12,
      16,
      18
    ],
    "otherWalls": [
      6,
      8,
      11,
      13,
      17,
      18
    ],
    "hints": [
      {
        "ja": "最後は上へ一歩。家の真下にふたりをそろえよう。",
        "en": "The last step is up. Line up both friends just below home."
      },
      {
        "ja": "下へ進み左へ三歩。下、左から上へ戻り、右で最後の列を合わせる。",
        "en": "Go down and left three times. Down and left let you turn back up; right aligns the final columns."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T14",
    "version": 1,
    "answerKey": "T14@1",
    "size": 5,
    "title": {
      "ja": "遠ざかる一歩",
      "en": "A step away"
    },
    "lesson": {
      "ja": "遠ざかる一歩も、ふたりの帰り道になる。",
      "en": "A step away can bring both friends closer to home."
    },
    "starts": [
      12,
      21
    ],
    "homes": [
      23,
      1
    ],
    "walls": [
      6,
      7,
      8,
      13,
      16,
      18
    ],
    "otherWalls": [
      6,
      8,
      11,
      12,
      16,
      18
    ],
    "hints": [
      {
        "ja": "家へ近づくだけではそろわない。いったん遠ざけてみよう。",
        "en": "Getting closer is not enough. Try a step away from home."
      },
      {
        "ja": "下二回、左、上三回、右二回、上。最後は左、右。",
        "en": "Down twice, left, up three times, right twice, up. Finish left and right."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T15",
    "version": 1,
    "answerKey": "T15@1",
    "size": 5,
    "title": {
      "ja": "準備の場所",
      "en": "A place to wait"
    },
    "lesson": {
      "ja": "待てる場所を先に作って、ふたりをそろえよう。",
      "en": "Prepare a waiting spot, then line up both friends."
    },
    "starts": [
      5,
      18
    ],
    "homes": [
      9,
      4
    ],
    "walls": [
      6,
      8,
      11,
      13,
      16,
      18
    ],
    "otherWalls": [
      2,
      7,
      11,
      13,
      17
    ],
    "hints": [
      {
        "ja": "片方を下の端で待たせ、もう片方の通路を作ろう。",
        "en": "Hold one friend at the bottom edge while preparing the other route."
      },
      {
        "ja": "下三回から右、上。右へ三歩で列をそろえ、上へ。",
        "en": "Go down three times, then right and up. Three rights align the columns; head up."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T16",
    "version": 1,
    "answerKey": "T16@1",
    "size": 5,
    "title": {
      "ja": "ふたりでひとつの位置",
      "en": "Think in pairs"
    },
    "lesson": {
      "ja": "ひとりずつでなく、ふたりの位置をひと組で考えよう。",
      "en": "Think about both positions as a pair."
    },
    "starts": [
      17,
      2
    ],
    "homes": [
      1,
      13
    ],
    "walls": [
      6,
      7,
      12,
      13,
      16,
      18
    ],
    "otherWalls": [
      6,
      8,
      12,
      16,
      17,
      18
    ],
    "hints": [
      {
        "ja": "同じ場所へ戻っても、もうひとりの位置が違えば前進。",
        "en": "Returning to a square can help when the other friend is in a new place."
      },
      {
        "ja": "下、左二回、上四回。右二回、下二回で最後の左を準備。",
        "en": "Down, left twice, up four times. Two rights and two downs prepare the final left."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T17",
    "version": 1,
    "answerKey": "T17@1",
    "size": 5,
    "title": {
      "ja": "帰る前の寄り道",
      "en": "One last detour"
    },
    "lesson": {
      "ja": "壁で止まり、家から離れ、最後の一歩を合わせよう。",
      "en": "Use walls, leave home, and align the last step."
    },
    "starts": [
      5,
      10
    ],
    "homes": [
      19,
      5
    ],
    "walls": [
      1,
      6,
      8,
      11,
      13,
      17,
      18
    ],
    "otherWalls": [
      6,
      7,
      8,
      13,
      16,
      18
    ],
    "hints": [
      {
        "ja": "壁でずらすことと、先着した家から出ることを組み合わせよう。",
        "en": "Combine wall adjustments with leaving an early home."
      },
      {
        "ja": "右、下二回、左、下、右二回、上二回。右二回のあと下、上。",
        "en": "Right, down twice, left, down, right twice, up twice. Two rights, then down and up."
      }
    ]
  },
  {
    "kind": "home",
    "id": "T18",
    "version": 1,
    "answerKey": "T18@1",
    "size": 5,
    "title": {
      "ja": "おかえり",
      "en": "Welcome home"
    },
    "lesson": {
      "ja": "何度か位置をずらして、最後はふたり一緒に帰ろう。",
      "en": "Adjust their positions, then take the last step home together."
    },
    "starts": [
      10,
      6
    ],
    "homes": [
      1,
      23
    ],
    "walls": [
      6,
      7,
      8,
      11,
      13,
      16,
      18
    ],
    "otherWalls": [
      2,
      7,
      11,
      13,
      16,
      17,
      18
    ],
    "hints": [
      {
        "ja": "先着より、ふたりの最後の一歩を準備しよう。家から出ても大丈夫。",
        "en": "Prepare the shared last step, even if a friend must leave home first."
      },
      {
        "ja": "上二回、右二回、下、左、下二回、左、下、右二回、上。最後は右。",
        "en": "Up twice, right twice, down, left, down twice, left, down, right twice, up. Finish right."
      }
    ]
  }
];
