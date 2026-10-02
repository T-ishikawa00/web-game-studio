import { MAX_CHARGE_SECONDS, launchVelocity, descendingFlightTime } from './physics.js';

// The charge/deltaY pairs are authoring landmarks. X is derived from the same
// flight model used at runtime, then rounded for clean canvas coordinates.
// This keeps all normal edges learnable with ordinary holds while giving each
// course its own rhythm and silhouette.
const COLORS = {
  jade: { skyTop: '#163c3a', skyBottom: '#8bc6a2', mist: '#d7e8c8', platform: '#456e58', leaf: '#a9d79b' },
  peach: { skyTop: '#513d55', skyBottom: '#f4ba88', mist: '#ffe0b2', platform: '#a76c61', leaf: '#d9a66d' },
  blue: { skyTop: '#203a62', skyBottom: '#91c8df', mist: '#d8f1ef', platform: '#4d718d', leaf: '#a7ddcf' },
  violet: { skyTop: '#35264e', skyBottom: '#ac9bc8', mist: '#e7d9f0', platform: '#6e5b85', leaf: '#d1b4d8' },
  amber: { skyTop: '#573d36', skyBottom: '#f4c076', mist: '#ffe4ad', platform: '#9a684c', leaf: '#dfb36c' },
  rose: { skyTop: '#482d55', skyBottom: '#d392ad', mist: '#f4d5dc', platform: '#885d75', leaf: '#d2a6b7' },
  night: { skyTop: '#172c4c', skyBottom: '#617fa5', mist: '#c6d8ea', platform: '#47617e', leaf: '#96b7c6' },
  summit: { skyTop: '#3b3458', skyBottom: '#f1b879', mist: '#fff0c5', platform: '#9c7157', leaf: '#e0c383' },
};

const TITLES = [
  ['Jade Steps', '翡翠の段丘'], ['Peach Morning', '桃色の朝'],
  ['Lantern Sweep', '灯りの回廊'], ['Cloud Lift', '雲の昇降路'],
  ['Two Ways Up', 'ふたつの登り道'], ['Blue Hour Crossing', '青時の渡り'],
  ['Garden Fork', '庭園の分かれ道'], ['Summit Canopy', '頂の灯り'],
];

const HINTS = [
  ['Short and long hops trade height for distance.', '短いジャンプと長いジャンプで高さと距離が変わります。'],
  ['A lower landing gives a longer flight. Read the next rim.', '低い足場ほど飛行時間が長くなります。次の縁を見ましょう。'],
  ['Watch the lantern rail move before you release.', '放す前に、灯りの足場の動きを見ましょう。'],
  ['The lift moves up and down. Let it come into range.', '昇降する足場が届く位置まで来るのを待ちましょう。'],
  ['At the fork, choose a high long hop or a low near hop.', '分かれ道では、高く遠い道か低く近い道を選べます。'],
  ['Mix a moving landing with a deliberate high arc.', '動く足場と高い弧を組み合わせましょう。'],
  ['The upper route is quicker; the lower route asks for more range.', '上の道は近道、下の道はより長いジャンプが必要です。'],
  ['Use the beacon, then time the final moving rest before the bell.', '灯台で休み、最後の動く足場から鐘へ向かいましょう。'],
];

function landingDistance(holdSeconds, deltaY) {
  const power = holdSeconds / MAX_CHARGE_SECONDS;
  const time = descendingFlightTime(deltaY, power);
  if (time === null) throw new Error(`Unreachable authored height: ${deltaY}`);
  return launchVelocity(power).vx * time;
}

function normalizeMotion(motion) {
  if (!motion) return { ampX: 0, ampY: 0, freq: 0, phase: 0 };
  return {
    ampX: motion.ampX ?? 0,
    ampY: motion.ampY ?? 0,
    freq: motion.freq ?? 0,
    phase: motion.phase ?? 0,
  };
}

function makePad(id, x, y, width, opts = {}) {
  return {
    id, x: Math.round(x), y: Math.round(y), width,
    ...normalizeMotion(opts.motion),
    beacon: Boolean(opts.beacon),
    next: [],
    final: Boolean(opts.final),
  };
}

function createCourse(number, theme, beats, options = {}) {
  const pads = [makePad(0, 140, 620, 166)];
  let current = pads[0];
  let landing = 0;
  const addLanding = (source, { hold, dy, width = 112, motion, beacon = false, final = false, x: fixedX } = {}) => {
    landing += 1;
    const pad = makePad(pads.length, fixedX ?? source.x + landingDistance(hold, dy), source.y + dy, width, { motion, beacon, final });
    source.next.push(pad.id);
    pads.push(pad);
    return pad;
  };
  const checkpoint = (ordinal) => [3, 6, 9].includes(ordinal);

  if (options.forkAfter) {
    for (let i = 0; i < options.forkAfter; i += 1) {
      const beat = beats[i];
      current = addLanding(current, { ...beat, beacon: checkpoint(landing + 1) });
    }
    const forkSource = current;
    const [lowBeat, highBeat] = options.fork;
    // Create the near/lower branch first so the declared pad list also reads
    // left-to-right. Both routes converge on the same later ledge.
    const branchOrdinal = landing + 1;
    const makeBranchPad = (beat) => makePad(
      pads.length,
      forkSource.x + landingDistance(beat.hold, beat.dy),
      forkSource.y + beat.dy,
      beat.width ?? 112,
      { motion: beat.motion },
    );
    const lower = makeBranchPad(lowBeat);
    forkSource.next.push(lower.id);
    pads.push(lower);
    const upper = makeBranchPad(highBeat);
    forkSource.next.push(upper.id);
    pads.push(upper);
    landing = branchOrdinal;
    const joinX = forkSource.x + options.joinDistance;
    const joinY = forkSource.y + options.joinDy;
    const joinPad = makePad(pads.length, joinX, joinY, options.joinWidth ?? 120, { motion: options.joinMotion, beacon: true });
    lower.next.push(joinPad.id);
    upper.next.push(joinPad.id);
    pads.push(joinPad);
    current = joinPad;
    landing += 1;
    for (let i = options.forkAfter + 1; i < beats.length; i += 1) {
      const beat = beats[i];
      const isFinal = i === beats.length - 1;
      current = addLanding(current, { ...beat, beacon: checkpoint(landing + 1), final: isFinal });
    }
  } else {
    for (let i = 0; i < beats.length; i += 1) {
      const beat = beats[i];
      const isFinal = i === beats.length - 1;
      current = addLanding(current, { ...beat, beacon: checkpoint(landing + 1), final: isFinal });
    }
  }
  current.final = true;
  return {
    id: `course-${String(number).padStart(2, '0')}`,
    title: { ja: TITLES[number - 1][1], en: TITLES[number - 1][0] },
    hint: { ja: HINTS[number - 1][1], en: HINTS[number - 1][0] },
    theme: { ...COLORS[theme] },
    pads,
  };
}

const basic = (hold, dy, width = 112, motion) => ({ hold, dy, width, motion });
const horizontal = (phase, ampX = 24, freq = 0.31) => ({ ampX, ampY: 0, freq, phase });
const vertical = (phase, ampY = 17, freq = 0.29) => ({ ampX: 0, ampY, freq, phase });

const authored = [
  createCourse(1, 'jade', [
    basic(.46, -35, 138), basic(.72, 15), basic(.34, -65, 132), basic(.66, 20), basic(.44, -60),
    basic(.79, 5), basic(.52, -72, 126), basic(.88, 18), basic(.56, -44), basic(.91, -90, 148),
  ]),
  createCourse(2, 'peach', [
    basic(.38, 30, 132), basic(.84, -105), basic(.62, 20), basic(.78, -72, 128), basic(.58, 15),
    basic(.88, -115), basic(.56, 35), basic(.82, -62), basic(.6, 10), basic(.9, -95, 148),
  ]),
  createCourse(3, 'blue', [
    basic(.49, -10, 132), basic(.8, 20), basic(.57, -35, 116, horizontal(.3, 26, .27)),
    basic(.73, 30), basic(.44, -5), basic(.93, -65, 108, horizontal(2.1, 31, .24)),
    basic(.6, 12), basic(.78, -40, 116, horizontal(4.2, 24, .3)), basic(.5, 18), basic(.87, -70, 146),
  ]),
  createCourse(4, 'violet', [
    basic(.52, -40), basic(.76, 25, 118, vertical(.4, 15, .26)), basic(.41, -80), basic(.84, 10),
    basic(.58, -55, 118, vertical(1.8, 19, .25)), basic(.92, 30), basic(.45, -85), basic(.74, 15, 112, vertical(3.5, 17, .28)),
    basic(.5, -62), basic(.86, -75, 148),
  ]),
  createCourse(5, 'amber', [
    basic(.48, -40), basic(.76, 22), basic(.42, -58, 122), basic(.69, 18, 120),
    // Landing five is a real route decision: a higher, farther transfer or a
    // lower, nearer resting shelf. Their distinct rejoin launches are tested.
    basic(.51, -62), basic(.97, -30, 112), basic(.62, -20), basic(.82, -86, 112, horizontal(1.1, 27, .28)),
    basic(.48, -46), basic(.9, -116, 150),
  ], { forkAfter: 4, fork: [basic(.5, 70, 124), basic(.96, -45, 110)], joinDistance: 810, joinDy: -80, joinWidth: 130 }),
  createCourse(6, 'rose', [
    basic(.45, 30), basic(.8, -95, 116, horizontal(.5, 22, .26)), basic(.58, 20), basic(.88, -105, 110, vertical(2, 17, .24)),
    basic(.51, 35), basic(.94, -100, 108, horizontal(4, 28, .23)), basic(.67, 15, 116, vertical(.8, 19, .27)),
    basic(.83, -90), basic(.54, 12), basic(.92, -110, 150, horizontal(2.7, 24, .25)),
  ]),
  createCourse(7, 'night', [
    basic(.5, -45), basic(.82, 20, 118, horizontal(1.5, 22, .25)), basic(.56, -68), basic(.72, 10),
    basic(.54, 35), basic(.99, -70, 112), basic(.64, -38, 116, vertical(2.2, 18, .25)), basic(.84, 15),
    basic(.48, -52), basic(.91, -88, 148),
  ], { forkAfter: 4, fork: [basic(.54, 35, 126), basic(.99, -70, 110)], joinDistance: 800, joinDy: -40, joinWidth: 132 }),
  createCourse(8, 'summit', [
    basic(.48, -70), basic(.81, -75, 114, horizontal(.9, 25, .24)), basic(.58, -85), basic(.9, -65, 110, vertical(2.4, 18, .25)),
    basic(.62, -70, 112, horizontal(4.1, 30, .22)), basic(.96, -80), basic(.53, -65, 116, vertical(1.3, 20, .23)),
    basic(.86, -80, 108, horizontal(3, 27, .25)), basic(.65, -70, 122, vertical(4.6, 14, .26)),
    basic(.88, -90, 172),
  ]),
];

// Courses share no runtime state. The frozen authoring data makes route edits
// deliberate and prevents a play session from mutating future targets.
function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const nested of Object.values(value)) deepFreeze(nested);
  }
  return value;
}

export const COURSES = deepFreeze(authored);
export const courseById = (id) => COURSES.find((course) => course.id === id) ?? null;

