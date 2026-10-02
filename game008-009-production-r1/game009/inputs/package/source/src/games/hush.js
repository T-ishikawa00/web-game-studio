const W = 720;
const H = 720;
const INSPECTIONS_TO_WIN = 9;
const ALARMS_TO_LOSE = 3;
const POSES = [
  { id: "fold", name: { ja: "伏せる", en: "FOLD" }, height: 0.69, width: 1.02, arms: 0.25, robe: 0.94 },
  { id: "spire", name: { ja: "そびえる", en: "SPIRE" }, height: 1.22, width: 0.58, arms: 0.18, robe: 0.49 },
  { id: "fan", name: { ja: "ひらく", en: "FAN" }, height: 0.99, width: 1.15, arms: 1.24, robe: 1.28 },
];
const CARD_RECTS = [
  { x: 46, y: 608, w: 194, h: 108 },
  { x: 263, y: 608, w: 194, h: 108 },
  { x: 480, y: 608, w: 194, h: 108 },
];
const HOLD_RECT = { x: 248, y: 483, w: 224, h: 108 };

export const meta = {
  id: "hush",
  name: { ja: "静止の幕", en: "HUSH STAGE" },
  hook: {
    ja: "移りゆく視線に、彫像のような一瞬を。",
    en: "Become the exact shape the moving eye expects.",
  },
  controls: {
    ja: "左右キーで姿勢を選び、Spaceで静止。画面下の姿勢札と静止ボタンも使えます。",
    en: "Left / right selects a pose; Space freezes it. Tap a pose card and the HOLD button.",
  },
  goal: {
    ja: "9回の検分を欺く。警報が3回で舞台は終演。",
    en: "Pass 9 inspections. Three alarms end the performance.",
  },
  hint: {
    ja: "次の姿勢を見て先に整え、光が触れる前にHOLD。静止中の形と動きも見られます。",
    en: "Read the call, shape up early, then HOLD before the beam arrives. The eye judges both shape and motion.",
  },
  accent: "#E9B66D",
  role: {
    ja: "ひとり用・タイミングと姿勢読み",
    en: "Solo timing and pose-reading",
  },
};

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

function language(getLang) {
  try {
    return getLang?.() === "en" ? "en" : "ja";
  } catch {
    return "ja";
  }
}

function callAudio(audio, kind, pitch = 1) {
  try {
    audio?.play?.(kind, pitch);
  } catch {
    // Audio is feedback only; a blocked device must not interrupt a run.
  }
}

function rngFor(seed) {
  let value = (Number(seed) >>> 0) || 0x4d595df4;
  return () => {
    value ^= value << 13;
    value ^= value >>> 17;
    value ^= value << 5;
    return (value >>> 0) / 0x100000000;
  };
}

function t(ja, en, lang) {
  return lang === "en" ? en : ja;
}

export function createGame({ ctx, audio, settings = () => ({}), lang = () => "ja", onReport = () => {} } = {}) {
  let rand = rngFor(9);
  let state;
  let press = null;
  let pointerIsDown = false;
  let motionReduced = false;
  let highContrast = false;
  let textScale = 1;
  let compactLayout = false;
  let lastCueKey = "";

  const readSettings = () => {
    try {
      const value = settings?.() || {};
      motionReduced = Boolean(value.reducedMotion);
      highContrast = Boolean(value.highContrast);
    } catch {
      motionReduced = false;
      highContrast = false;
    }
  };

  const locale = () => language(lang);
  const report = (status, detail, reason) => {
    const payload = { status, value: (state?.passed || 0) * 100 + (state?.clean || 0) * 20, goal: INSPECTIONS_TO_WIN * 120, progress: { value: state?.passed || 0, goal: INSPECTIONS_TO_WIN }, detail };
    if (reason) payload.reason = reason;
    try {
      onReport?.(payload);
    } catch {
      // The host may unmount between frames; keep game state self-contained.
    }
  };

  const localizedReason = (reason, l = locale()) => {
    if (reason === "moving") return t("動きを見られた", "Movement was seen", l);
    if (reason === "transition") return t("姿勢の変化を見られた", "Pose was still changing", l);
    if (reason === "shape") return t("輪郭が違った", "Wrong silhouette", l);
    return "";
  };

  const nextCue = () => {
    state.target = Math.floor(rand() * POSES.length);
    state.direction = rand() < 0.5 ? -1 : 1;
    const round = state.inspections;
    state.sweepSeconds = clamp(3.18 - round * 0.065 + rand() * 0.34, 2.58, 3.48);
    state.prepareSeconds = 1.42 + rand() * 0.18;
    state.recoverSeconds = 0.62;
    state.scanElapsed = 0;
    state.crossingAt = state.direction > 0
      ? ((360 - (-78)) / (798 - (-78))) * state.sweepSeconds
      : ((798 - 360) / (798 - (-78))) * state.sweepSeconds;
    state.beamX = state.direction > 0 ? -78 : 798;
    state.judged = false;
    state.phase = "prepare";
    state.timer = state.prepareSeconds;
    state.poseFrom = state.selected;
    state.transitionElapsed = 0.4;
    state.transitionSeconds = 0.38;
    reportCue();
  };

  function reportCue() {
    if (!state || state.status !== "running" || (state.judged && state.phase !== "prepare")) return;
    const l = locale();
    const direction = state.direction > 0 ? t("左", "left", l) : t("右", "right", l);
    const current = POSES[state.selected].name[l];
    const called = POSES[state.target].name[l];
    const prepareCue = (Math.ceil(Math.max(0, state.timer) * 2) / 2).toFixed(1);
    const centerCue = (Math.ceil(Math.max(0, state.crossingAt - state.scanElapsed) * 2) / 2).toFixed(1);
    const timing = state.phase === "prepare"
      ? t("約" + prepareCue + "秒後に視線", "Gaze in about " + prepareCue + "s", l)
      : state.phase === "scan"
        ? t("中央まで約" + centerCue + "秒", "Center in about " + centerCue + "s", l)
        : t("次の視線を待つ", "Waiting for the next gaze", l);
    const detail = t(
      "お題 " + called + " · 今 " + current + " · " + direction + "から · " + timing + " · 警報 " + state.alarms + "/3" + (state.locked ? " · 静止中" : " · 調整中"),
      "CALL " + called + " · NOW " + current + " · FROM " + direction + " · " + timing + " · ALARMS " + state.alarms + "/3" + (state.locked ? " · HELD" : " · SHAPING"),
      l,
    );
    if (detail === lastCueKey) return;
    lastCueKey = detail;
    report("running", detail);
  }

  function reset(seed = 9, options = {}) {
    rand = rngFor(seed);
    lastCueKey = "";
    press = null;
    pointerIsDown = false;
    readSettings();
    state = {
      status: "running",
      phase: "prepare",
      timer: 0,
      passed: 0,
      inspections: 0,
      alarms: 0,
      clean: 0,
      target: 0,
      selected: 1,
      poseFrom: 1,
      transitionElapsed: 0.4,
      transitionSeconds: 0.38,
      direction: 1,
      beamX: -78,
      scanElapsed: 0,
      sweepSeconds: 3.2,
      prepareSeconds: 1.5,
      recoverSeconds: 0.62,
      crossingAt: 1.6,
      judged: false,
      lastResult: "ready",
      lastReason: "",
      freezeAge: 0,
      inputFlash: 0,
      time: 0,
      seed: Number(seed) >>> 0,
    };
    nextCue();
    callAudio(audio, "tap", 0.88);
    return snapshot();
  }

  function snapshot() {
    if (!state) {
      return {
        status: "idle",
        phase: "idle",
        passed: 0,
        inspections: 0,
        alarms: 0,
        target: null,
        selected: 1,
        locked: false,
      };
    }
    return {
      status: state.status,
      phase: state.phase,
      passed: state.passed,
      inspections: state.inspections,
      alarms: state.alarms,
      clean: state.clean,
      target: state.target,
      selected: state.selected,
      locked: state.locked === true,
      transition: clamp(state.transitionElapsed / state.transitionSeconds, 0, 1),
      beamX: state.beamX,
      direction: state.direction,
      timer: state.timer,
      crossingAt: state.crossingAt,
      lastResult: state.lastResult,
      lastReason: state.lastReason,
      seed: state.seed,
      elapsed: state.time,
    };
  }

  function setPose(index) {
    if (!state || state.status !== "running" || !["prepare", "scan"].includes(state.phase) || state.locked || state.judged) return false;
    const next = (index + POSES.length) % POSES.length;
    if (next === state.selected) return false;
    state.poseFrom = state.selected;
    state.selected = next;
    state.transitionElapsed = 0;
    state.transitionSeconds = 0.36;
    state.inputFlash = 0.16;
    callAudio(audio, "step", [0.94, 1.02, 1.1][next]);
    reportCue();
    return true;
  }

  function cyclePose(delta) {
    if (!state) return false;
    return setPose(state.selected + delta);
  }

  function freeze() {
    if (!state || state.status !== "running" || !["prepare", "scan"].includes(state.phase) || state.judged) return false;
    state.locked = !state.locked;
    state.freezeAge = 0;
    state.inputFlash = 0.18;
    callAudio(audio, state.locked ? "tap" : "swish", state.locked ? 1.12 : 0.86);
    reportCue();
    return true;
  }

  function pointer(kind, point) {
    if (kind === "cancel") {
      cancel();
      return;
    }
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
    if (kind === "down") {
      pointerIsDown = true;
      press = { x: point.x, y: point.y, card: cardAt(point), hold: inside(point, HOLD_RECT) };
      return;
    }
    if (kind === "move") {
      if (!pointerIsDown || !press) return;
      const nextCard = cardAt(point);
      if (nextCard !== null && nextCard !== press.card) {
        press.card = nextCard;
        setPose(nextCard);
      }
      return;
    }
    if (kind === "up") {
      if (!pointerIsDown || !press) return;
      const start = press;
      pointerIsDown = false;
      press = null;
      const card = cardAt(point);
      if (card !== null && (start.card === card || start.card === null)) {
        setPose(card);
      } else if (start.hold && inside(point, HOLD_RECT)) {
        freeze();
      }
      return;
    }
  }

  function cardAt(point) {
    for (let i = 0; i < CARD_RECTS.length; i += 1) {
      if (inside(point, CARD_RECTS[i])) return i;
    }
    return null;
  }

  function inside(point, rect) {
    return point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h;
  }

  function key(keyName) {
    if (!state) return;
    const key = String(keyName || "").toLowerCase();
    if (key === "arrowleft" || key === "a") {
      cyclePose(-1);
    } else if (key === "arrowright" || key === "d") {
      cyclePose(1);
    } else if (key === "arrowup" || key === " " || key === "space" || key === "enter") {
      freeze();
    } else if (key === "escape") {
      cancel();
    }
  }

  function cancel() {
    press = null;
    pointerIsDown = false;
  }

  function judge() {
    if (!state || state.judged || state.status !== "running") return;
    state.judged = true;
    state.inspections += 1;
    const settled = state.transitionElapsed >= state.transitionSeconds;
    const cleanTiming = state.locked && state.freezeAge >= 0.32 && state.freezeAge <= 1.28;
    const passed = state.locked && settled && state.selected === state.target;
    if (passed) {
      state.passed += 1;
      state.clean += cleanTiming ? 1 : 0;
      state.lastResult = cleanTiming ? "clean" : "passed";
      state.lastReason = "";
      callAudio(audio, cleanTiming ? "success" : "tap", cleanTiming ? 1.08 : 0.97);
      const detail = cleanTiming
        ? t("見事な静止。", "Perfect stillness.", locale())
        : t("姿勢は合格。次は光の少し前に静止。", "Pose accepted. Freeze a little before the beam.", locale());
      report("running", detail);
      if (state.passed >= INSPECTIONS_TO_WIN) {
        state.status = "won";
        state.phase = "result";
        state.lastResult = "won";
        callAudio(audio, "finale", 1.14);
        report("won", t("九つの視線を欺いた。間合い成功 " + state.clean + "/9。", "Nine eyes fooled. Clean holds " + state.clean + "/9.", locale()));
        return;
      }
    } else {
      state.alarms += 1;
      state.lastResult = "alarm";
      if (!state.locked) {
        state.lastReason = "moving";
      } else if (!settled) {
        state.lastReason = "transition";
      } else {
        state.lastReason = "shape";
      }
      state.locked = true;
      callAudio(audio, "impact", 0.84 + state.alarms * 0.08);
      const reason = state.lastReason;
      const detail = reason === "moving"
        ? t("警報。光が来たとき、まだ動いていた。", "Alarm. You were still moving when the beam arrived.", locale())
        : reason === "transition"
          ? t("警報。静止しても、姿勢の移り変わりが残っていた。", "Alarm. Your shape was still changing when the beam arrived.", locale())
          : t("警報。求められた輪郭と違っていた。", "Alarm. The requested silhouette did not match.", locale());
      report("running", detail, localizedReason(reason));
      if (state.alarms >= ALARMS_TO_LOSE) {
        state.status = "lost";
        state.phase = "result";
        state.lastResult = "lost";
        callAudio(audio, "fail", 0.82);
        report("lost", t("三度の警報。舞台は閉じた。", "Three alarms. The stage is closed.", locale()), localizedReason(reason));
        return;
      }
    }
  }

  function step(dt) {
    if (!state || state.status !== "running" || !Number.isFinite(dt) || dt <= 0) return;
    readSettings();
    const delta = clamp(dt, 0, 0.1);
    state.time += delta;
    state.inputFlash = Math.max(0, state.inputFlash - delta);
    if (state.transitionElapsed < state.transitionSeconds) {
      state.transitionElapsed = Math.min(state.transitionSeconds, state.transitionElapsed + delta);
    }
    if (state.locked) state.freezeAge += delta;
    if (state.phase === "prepare") {
      state.timer -= delta;
      reportCue();
      if (state.timer <= 0) {
        state.phase = "scan";
        state.scanElapsed = 0;
        state.beamX = state.direction > 0 ? -78 : 798;
        state.locked = state.locked === true;
        callAudio(audio, "swish", state.direction > 0 ? 0.92 : 1.06);
        reportCue();
      }
    } else if (state.phase === "scan") {
      const previous = state.scanElapsed;
      state.scanElapsed = Math.min(state.sweepSeconds, state.scanElapsed + delta);
      reportCue();
      const ratio = state.scanElapsed / state.sweepSeconds;
      state.beamX = lerp(state.direction > 0 ? -78 : 798, state.direction > 0 ? 798 : -78, ratio);
      const crossed = previous < state.crossingAt && state.scanElapsed >= state.crossingAt;
      if (crossed) judge();
      if (state.status === "running" && state.scanElapsed >= state.sweepSeconds) {
        state.phase = "rest";
        state.timer = state.recoverSeconds;
        state.locked = false;
      }
    } else if (state.phase === "rest") {
      state.timer -= delta;
      if (state.timer <= 0) nextCue();
    }
  }

  function palette() {
    return highContrast
      ? {
        bg: "#070A10", curtain: "#18202C", curtainLine: "#35465B", stage: "#111A25", stageEdge: "#E7F0FF",
        gold: "#FFD66E", text: "#FFFFFF", soft: "#D0DCEC", dim: "#9CAEC5", red: "#FF6678",
        beam: "rgba(255,246,196,0.28)", beamEdge: "rgba(255,253,224,0.82)", actor: "#FFFFFF", shadow: "#03060A",
        teal: "#7EF4E2", card: "#131D29", cardActive: "#283449", panel: "#101923",
      }
      : {
        bg: "#100D19", curtain: "#261624", curtainLine: "#472337", stage: "#171725", stageEdge: "#7E5362",
        gold: "#E9B66D", text: "#F5EADB", soft: "#CFC1B8", dim: "#95838A", red: "#EE6576",
        beam: "rgba(244,217,160,0.16)", beamEdge: "rgba(255,225,171,0.52)", actor: "#EFE1CA", shadow: "#090912",
        teal: "#9BD8C4", card: "#211A28", cardActive: "#392936", panel: "#1D1723",
      };
  }

  function roundedRect(g, x, y, w, h, r, fill, stroke, lineWidth = 1) {
    const radius = Math.min(r, w / 2, h / 2);
    g.beginPath();
    g.moveTo(x + radius, y);
    g.lineTo(x + w - radius, y);
    g.quadraticCurveTo(x + w, y, x + w, y + radius);
    g.lineTo(x + w, y + h - radius);
    g.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    g.lineTo(x + radius, y + h);
    g.quadraticCurveTo(x, y + h, x, y + h - radius);
    g.lineTo(x, y + radius);
    g.quadraticCurveTo(x, y, x + radius, y);
    g.closePath();
    if (fill) {
      g.fillStyle = fill;
      g.fill();
    }
    if (stroke) {
      g.lineWidth = lineWidth;
      g.strokeStyle = stroke;
      g.stroke();
    }
  }

  function drawText(g, text, x, y, size, color, align = "left", weight = 500, spacing = 0, maxWidth = Infinity) {
    g.save();
    g.fillStyle = color;
    g.font = String(weight) + " " + String(size * textScale) + "px system-ui, sans-serif";
    g.textAlign = align;
    g.textBaseline = "middle";
    if (typeof g.letterSpacing !== "undefined") g.letterSpacing = String(spacing * textScale) + "px";
    if (Number.isFinite(maxWidth) && maxWidth > 0) g.fillText(text, x, y, maxWidth);
    else g.fillText(text, x, y);
    g.restore();
  }

  function drawEye(g, x, y, color, pulse) {
    g.save();
    g.translate(x, y);
    g.strokeStyle = color;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-24, 0);
    g.quadraticCurveTo(0, -16, 24, 0);
    g.quadraticCurveTo(0, 16, -24, 0);
    g.stroke();
    g.beginPath();
    g.arc(0, 0, 5 + pulse, 0, Math.PI * 2);
    g.fillStyle = color;
    g.fill();
    g.beginPath();
    g.arc(0, 0, 11 + pulse, 0, Math.PI * 2);
    g.strokeStyle = color;
    g.globalAlpha = 0.42;
    g.stroke();
    g.restore();
  }

  function poseVector(index) {
    const pose = POSES[index];
    return { height: pose.height, width: pose.width, arms: pose.arms, robe: pose.robe };
  }

  function currentPoseVector() {
    const from = poseVector(state.poseFrom);
    const to = poseVector(state.selected);
    const blend = smooth(state.transitionElapsed / state.transitionSeconds);
    return {
      height: lerp(from.height, to.height, blend),
      width: lerp(from.width, to.width, blend),
      arms: lerp(from.arms, to.arms, blend),
      robe: lerp(from.robe, to.robe, blend),
    };
  }

  function drawPerformer(g, x, baseline, vector, colors, alpha = 1, scale = 1) {
    if (scale !== 1) {
      g.save();
      g.translate(x, baseline);
      g.scale(scale, scale);
      drawPerformer(g, 0, 0, vector, colors, alpha, 1);
      g.restore();
      return;
    }
    const height = vector.height * scale;
    const width = vector.width * scale;
    const arms = vector.arms;
    const robe = vector.robe * scale;
    const headY = baseline - 118 * height;
    const headR = 14 * scale;
    const shoulderY = baseline - 82 * height;
    const hipY = baseline - 36 * height;
    const shoulderW = 20 * width;
    const hipW = 25 * width;
    const skirtW = 36 * robe;
    const armReach = (25 + 49 * arms) * width;
    const armY = shoulderY + (arms < 0.45 ? 27 : -10) * (1 - arms * 0.12);
    g.save();
    g.globalAlpha *= alpha;
    g.fillStyle = colors.actor;
    g.strokeStyle = colors.actor;
    g.lineJoin = "round";
    g.lineCap = "round";
    g.beginPath();
    g.arc(x, headY, headR, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(x - 8 * width, headY + headR - 2);
    g.lineTo(x + 8 * width, headY + headR - 2);
    g.lineTo(x + 9 * width, shoulderY + 18 * width);
    g.quadraticCurveTo(x, shoulderY + 22 * width, x - 9 * width, shoulderY + 18 * width);
    g.closePath();
    g.fill();
    g.beginPath();
    g.moveTo(x - shoulderW, shoulderY);
    g.quadraticCurveTo(x - 14 * width, hipY - 12, x - hipW, hipY);
    g.lineTo(x - skirtW, baseline - 2);
    g.quadraticCurveTo(x, baseline + 8, x + skirtW, baseline - 2);
    g.lineTo(x + hipW, hipY);
    g.quadraticCurveTo(x + 14 * width, hipY - 12, x + shoulderW, shoulderY);
    g.closePath();
    g.fill();
    g.lineWidth = 13 * clamp(width, 0.68, 1.18);
    g.beginPath();
    g.moveTo(x - shoulderW + 3, shoulderY + 4);
    g.quadraticCurveTo(x - armReach * 0.46, armY + (arms > 0.75 ? -5 : 13), x - armReach, armY);
    g.stroke();
    g.beginPath();
    g.moveTo(x + shoulderW - 3, shoulderY + 4);
    g.quadraticCurveTo(x + armReach * 0.46, armY + (arms > 0.75 ? -5 : 13), x + armReach, armY);
    g.stroke();
    g.lineWidth = 14 * clamp(width, 0.65, 1.1);
    g.beginPath();
    g.moveTo(x - 10 * width, baseline - 2);
    g.lineTo(x - 19 * width, baseline + 21);
    g.moveTo(x + 10 * width, baseline - 2);
    g.lineTo(x + 19 * width, baseline + 21);
    g.stroke();
    g.strokeStyle = colors.gold;
    g.lineWidth = 2.3;
    g.globalAlpha *= 0.7;
    g.beginPath();
    g.moveTo(x - skirtW * 0.72, baseline - 5);
    g.quadraticCurveTo(x, baseline + 4, x + skirtW * 0.72, baseline - 5);
    g.stroke();
    g.globalAlpha *= 0.52;
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(x - shoulderW * 0.52, shoulderY + 17 * width);
    g.lineTo(x, shoulderY + 26 * width);
    g.lineTo(x + shoulderW * 0.52, shoulderY + 17 * width);
    g.moveTo(x - 8 * width, hipY + 8);
    g.quadraticCurveTo(x - 14 * robe, baseline - 22, x - 19 * robe, baseline - 7);
    g.moveTo(x + 8 * width, hipY + 8);
    g.quadraticCurveTo(x + 14 * robe, baseline - 22, x + 19 * robe, baseline - 7);
    g.stroke();
    g.restore();
  }

  function drawTarget(g, x, baseline, poseIndex, colors, scale = 0.45) {
    drawPerformer(g, x, baseline, poseVector(poseIndex), colors, 1, scale);
  }

  function drawBeam(g, colors) {
    if (state.phase !== "scan") return;
    const topY = 174;
    const bottomY = 480;
    const center = state.beamX;
    const travel = clamp((center + 90) / 900, 0, 1);
    const beamWidth = 17 + 15 * Math.sin(travel * Math.PI);
    g.save();
    g.beginPath();
    g.moveTo(center - beamWidth * 0.36, topY);
    g.lineTo(center - 114, bottomY);
    g.quadraticCurveTo(center, bottomY + 18, center + 114, bottomY);
    g.lineTo(center + beamWidth * 0.36, topY);
    g.closePath();
    g.fillStyle = colors.beam;
    g.fill();
    g.strokeStyle = colors.beamEdge;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(center - beamWidth * 0.36, topY);
    g.lineTo(center - 114, bottomY);
    g.moveTo(center + beamWidth * 0.36, topY);
    g.lineTo(center + 114, bottomY);
    g.stroke();
    g.fillStyle = colors.gold;
    g.beginPath();
    g.ellipse(center, topY, beamWidth, 8, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }

  function drawBackground(g, colors, time) {
    g.fillStyle = colors.bg;
    g.fillRect(0, 0, W, H);
    const glow = g.createRadialGradient ? g.createRadialGradient(360, 355, 55, 360, 355, 480) : null;
    if (glow) {
      glow.addColorStop(0, highContrast ? "#172130" : "#241720");
      glow.addColorStop(1, colors.bg);
      g.fillStyle = glow;
      g.fillRect(0, 0, W, H);
    }
    g.fillStyle = colors.curtain;
    g.fillRect(0, 150, 28, 360);
    g.fillRect(692, 150, 28, 360);
    g.strokeStyle = colors.curtainLine;
    g.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const x = 36 + i * 8;
      g.beginPath();
      g.moveTo(x, 162);
      g.quadraticCurveTo(x + (motionReduced ? 0 : Math.sin(time * 0.35 + i) * 2), 334, x, 486);
      g.stroke();
      g.beginPath();
      g.moveTo(684 - i * 8, 162);
      g.quadraticCurveTo(684 + (motionReduced ? 0 : Math.sin(time * 0.35 + i) * 2), 334, 684 - i * 8, 486);
      g.stroke();
    }
    roundedRect(g, 32, 159, 656, 340, 22, colors.stage, colors.stageEdge, 1.5);
    g.save();
    g.globalAlpha = 0.34;
    g.fillStyle = colors.shadow;
    for (let i = 0; i < 19; i += 1) {
      const x = 56 + i * 34;
      const radius = 8 + (i % 3) * 2;
      g.beginPath();
      g.arc(x, 480 + (i % 2) * 4, radius, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.ellipse(x, 504, radius * 1.7, 20 + (i % 4) * 4, 0, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
    g.strokeStyle = colors.stageEdge;
    g.globalAlpha = 0.65;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(55, 464);
    g.lineTo(665, 464);
    g.stroke();
    g.globalAlpha = 1;
    g.fillStyle = highContrast ? "#2A3645" : "#39262D";
    g.fillRect(53, 466, 614, 18);
    g.strokeStyle = colors.gold;
    g.globalAlpha = 0.45;
    g.beginPath();
    g.moveTo(58, 468);
    g.lineTo(662, 468);
    g.stroke();
    g.globalAlpha = 1;
  }

  function drawHUD(g, colors) {
    const l = locale();
    if (compactLayout) {
      const phaseLabel = state.phase === "prepare"
        ? t("形を整える", "SET SHAPE", l)
        : state.phase === "scan"
          ? t("視線通過", "SCANNING", l)
          : state.phase === "rest"
            ? t("次のお題", "NEXT CALL", l)
            : state.status === "won"
              ? t("終演", "CURTAIN", l)
              : state.status === "lost"
                ? t("閉幕", "CLOSED", l)
                : t("待機", "READY", l);
      drawText(g, "H U S H", 30, 29, 15, colors.gold, "left", 750, 1.8, 260);
      drawText(g, t("静止の幕 · ひとり芝居", "A THEATRE OF STILLNESS", l), 31, 57, 8, colors.dim, "left", 600, 0.5, 325);
      roundedRect(g, 404, 10, 282, 40, 19, colors.panel, colors.curtainLine, 1);
      drawText(g, phaseLabel, 545, 30, 9, colors.gold, "center", 700, 0.5, 250);
      drawText(g, t("検分", "READS", l), 31, 91, 8, colors.dim, "left", 650, 0.5, 125);
      drawText(g, String(state.passed).padStart(2, "0") + " / 09", 31, 119, 19, colors.text, "left", 750, 0.2, 185);
      drawText(g, t("警報", "ALARMS", l), 532, 91, 8, colors.dim, "left", 650, 0.5, 138);
      for (let i = 0; i < ALARMS_TO_LOSE; i += 1) {
        const x = 575 + i * 28;
        g.beginPath();
        g.arc(x, 120, 8, 0, Math.PI * 2);
        g.fillStyle = i < state.alarms ? colors.red : colors.panel;
        g.fill();
        g.strokeStyle = i < state.alarms ? colors.red : colors.dim;
        g.lineWidth = 1.5;
        g.stroke();
      }
      if (state.phase === "prepare") {
        const remaining = clamp(state.timer / state.prepareSeconds, 0, 1);
        roundedRect(g, 31, 143, 656, 5, 2, colors.panel, null);
        roundedRect(g, 31, 143, 656 * remaining, 5, 2, colors.gold, null);
      }
      return;
    }
    drawText(g, "H U S H", 38, 36, 19, colors.gold, "left", 750, 2.5);
    drawText(g, t("稽古場 / ひとり芝居", "THE STILLNESS TRIAL", l), 39, 61, 10, colors.dim, "left", 600, 1.1);
    drawText(g, t("検分", "READS", l), 39, 96, 10, colors.dim, "left", 650, 1.4);
    drawText(g, String(state.passed).padStart(2, "0") + " / 09", 39, 120, 22, colors.text, "left", 750, 0.5);
    drawText(g, t("警報", "ALARMS", l), 564, 96, 10, colors.dim, "left", 650, 1.4);
    for (let i = 0; i < ALARMS_TO_LOSE; i += 1) {
      const x = 575 + i * 27;
      g.beginPath();
      g.arc(x, 122, 7, 0, Math.PI * 2);
      g.fillStyle = i < state.alarms ? colors.red : colors.panel;
      g.fill();
      g.strokeStyle = i < state.alarms ? colors.red : colors.dim;
      g.lineWidth = 1;
      g.stroke();
    }
    const phaseLabel = state.phase === "prepare"
      ? t("姿勢を整える", "SET YOUR SHAPE", l)
      : state.phase === "scan"
        ? t("視線が通過中", "EYE IN MOTION", l)
        : state.phase === "rest"
          ? t("視線を欺いた", "EYE PASSED", l)
          : state.status === "won"
            ? t("終演", "CURTAIN", l)
            : state.status === "lost"
              ? t("閉幕", "CLOSED", l)
              : t("待機", "READY", l);
    const phaseColor = state.lastResult === "alarm" && state.phase !== "prepare" ? colors.red : colors.gold;
    roundedRect(g, 178, 23, 364, 37, 18, colors.panel, colors.curtainLine, 1);
    drawText(g, phaseLabel, 360, 42, 12, phaseColor, "center", 700, 1.4);
    if (state.phase === "prepare") {
      const remaining = clamp(state.timer / state.prepareSeconds, 0, 1);
      roundedRect(g, 178, 65, 364, 3, 2, colors.panel, null);
      roundedRect(g, 178, 65, 364 * remaining, 3, 2, colors.gold, null);
    }
  }

  function drawCue(g, colors, time) {
    const l = locale();
    if (compactLayout) {
      roundedRect(g, 82, 170, 556, 94, 16, colors.panel, colors.curtainLine, 1.4);
      drawText(g, t("今回のお題", "THIS CALL", l), 360, 184, 8, colors.dim, "center", 650, 0.5, 500);
      drawText(g, POSES[state.target].name[l], 360, 211, 18, colors.gold, "center", 760, 0.5, 510);
      const timing = state.phase === "prepare"
        ? t("約" + (Math.ceil(Math.max(0, state.timer) * 2) / 2).toFixed(1) + "秒後", "IN " + (Math.ceil(Math.max(0, state.timer) * 2) / 2).toFixed(1) + "s", l)
        : state.phase === "scan"
          ? t("中央まで約" + (Math.ceil(Math.max(0, state.crossingAt - state.scanElapsed) * 2) / 2).toFixed(1) + "秒", "CENTER IN " + (Math.ceil(Math.max(0, state.crossingAt - state.scanElapsed) * 2) / 2).toFixed(1) + "s", l)
          : t("次の視線を待つ", "WAIT FOR THE NEXT GAZE", l);
      const direction = state.direction > 0 ? t("左から", "FROM LEFT", l) : t("右から", "FROM RIGHT", l);
      const cue = state.phase === "rest"
        ? timing
        : state.phase === "scan"
          ? t((state.direction > 0 ? "← " : "→ ") + "視線通過 · " + timing, (state.direction > 0 ? "← " : "→ ") + "GAZE · " + timing, l)
          : t((state.direction > 0 ? "← " : "→ ") + direction + " · " + timing, (state.direction > 0 ? "← " : "→ ") + direction + " · " + timing, l);
      drawText(g, cue, 360, 241, 9, colors.soft, "center", 650, 0.3, 520);
      return;
    }
    roundedRect(g, 532, 176, 142, 177, 15, colors.panel, colors.curtainLine, 1.2);
    drawText(g, t("次のお題", "NEXT CALL", l), 603, 194, 10, colors.dim, "center", 650, 1.1);
    drawTarget(g, 603, 287, state.target, colors, 0.37);
    drawText(g, POSES[state.target].name[l], 603, 326, l === "ja" ? 12 : 10, colors.gold, "center", 720, 0.5);
    const directionText = state.direction > 0
      ? t("左から視線", "EYE FROM LEFT", l)
      : t("右から視線", "EYE FROM RIGHT", l);
    drawText(g, directionText, 603, 342, 10, colors.soft, "center", 600, 0.4);
    if (state.phase === "prepare") {
      const markerX = state.direction > 0 ? 76 : 496;
      drawEye(g, markerX, 202, colors.gold, motionReduced ? 0 : 1.2);
      g.fillStyle = colors.gold;
      g.beginPath();
      if (state.direction > 0) {
        g.moveTo(markerX + 32, 204);
        g.lineTo(markerX + 43, 198);
        g.lineTo(markerX + 43, 210);
      } else {
        g.moveTo(markerX - 32, 204);
        g.lineTo(markerX - 43, 198);
        g.lineTo(markerX - 43, 210);
      }
      g.closePath();
      g.fill();
    } else if (state.phase === "scan") {
      drawEye(g, state.beamX, 174, colors.gold, 0);
    }
    const message = state.lastResult === "alarm" && state.phase !== "prepare"
      ? state.lastReason === "moving"
        ? t("動きを止めきれなかった", "MOTION GAVE YOU AWAY", l)
        : state.lastReason === "transition"
          ? t("輪郭の変化を見られた", "THE SHIFT WAS SEEN", l)
          : t("輪郭が合わなかった", "WRONG SILHOUETTE", l)
      : state.lastResult === "clean"
        ? t("静止、完璧。", "A PERFECT HOLD.", l)
        : state.lastResult === "passed"
          ? t("視線は通り過ぎた。", "THE EYE MOVES ON.", l)
          : t("お題の輪郭に合わせる", "MATCH THE CALLED SHAPE", l);
    if (!compactLayout) drawText(g, message, 352, 467, l === "ja" ? 10 : 9, state.lastResult === "alarm" ? colors.red : colors.soft, "center", 620, 0.4);
  }

  function drawCards(g, colors) {
    const l = locale();
    for (let i = 0; i < CARD_RECTS.length; i += 1) {
      const rect = CARD_RECTS[i];
      const active = state.selected === i;
      const target = state.target === i;
      const fill = active ? colors.cardActive : colors.card;
      const edge = active ? colors.gold : target ? colors.teal : colors.curtainLine;
      roundedRect(g, rect.x, rect.y, rect.w, rect.h, 14, fill, edge, active || target ? 2 : 1);
      drawTarget(g, rect.x + rect.w / 2, rect.y + (compactLayout ? 51 : 64), i, colors, compactLayout ? 0.27 : 0.21);
      drawText(g, POSES[i].name[l], rect.x + rect.w / 2, rect.y + (compactLayout ? 87 : 91), compactLayout ? (l === "ja" ? 9 : 8) : (l === "ja" ? 12 : 10), active ? colors.gold : colors.soft, "center", active ? 720 : 600, 0.25, rect.w - 20);
      if (target) {
        g.beginPath();
        g.arc(rect.x + rect.w - 16, rect.y + 16, 4, 0, Math.PI * 2);
        g.fillStyle = colors.teal;
        g.fill();
      }
    }
    const holdText = state.locked ? t("静止中  ·  解除", "HELD  ·  RELEASE", l) : t("HOLD  ·  静止", "HOLD  ·  FREEZE", l);
    const holdEdge = state.locked ? colors.teal : colors.gold;
    const holdFill = state.locked ? colors.cardActive : colors.panel;
    roundedRect(g, HOLD_RECT.x, HOLD_RECT.y, HOLD_RECT.w, HOLD_RECT.h, 22, holdFill, holdEdge, 1.7);
    drawText(g, holdText, 360, 537, compactLayout ? 10 : 16, holdEdge, "center", 750, compactLayout ? 0.5 : 1.2, compactLayout ? HOLD_RECT.w - 24 : Infinity);
    if (state.phase === "prepare" && state.locked) {
      const early = clamp(state.freezeAge / 1.28, 0, 1);
      roundedRect(g, HOLD_RECT.x + 21, HOLD_RECT.y + 33, (HOLD_RECT.w - 42) * early, 2, 1, colors.teal, null);
    }
  }

  function drawResult(g, colors) {
    const l = locale();
    const won = state.status === "won";
    roundedRect(g, 111, 203, 498, 286, 24, "rgba(10,9,15,0.92)", won ? colors.gold : colors.red, 2);
    drawText(g, won ? t("見破られなかった", "THE EYE WAS FOOLED") : t("終演", "THE STAGE IS CLOSED"), 360, 274, compactLayout ? 17 : 25, won ? colors.gold : colors.red, "center", 760, 0.5, 450);
    drawText(g, won ? t("九つの姿を、九つの静寂に。", "Nine silhouettes. Nine moments of stillness.") : t("三度の警報で幕が降りた。", "Three alarms brought down the curtain."), 360, 321, compactLayout ? 9 : 13, colors.text, "center", 560, 0.2, 445);
    drawText(g, t("検分 " + state.passed + " / 9", "READS " + state.passed + " / 9", l), 360, 371, compactLayout ? 10 : 14, colors.soft, "center", 650, 0.4, 400);
    drawText(g, t("静止の間合い " + state.clean, "CLEAN HOLDS " + state.clean, l), 360, 400, 10, colors.dim, "center", 600, 0.6);
    roundedRect(g, 253, 435, 214, 37, 19, colors.panel, colors.gold, 1);
    drawText(g, t("もう一度 · Enter", "REHEARSE · ENTER", l), 360, 454, compactLayout ? 8 : 11, colors.gold, "center", 680, 0.3, 200);
  }

  function drawIdlePreview(g, colors) {
    drawBackground(g, colors, 0);
    g.save();
    g.globalAlpha = 0.68;
    drawPerformer(g, 360, 460, poseVector(1), colors, 1, 1.05);
    g.restore();
    drawTarget(g, 138, 456, 0, colors, 0.62);
    drawTarget(g, 582, 456, 2, colors, 0.62);
    g.save();
    g.globalAlpha = 0.62;
    g.strokeStyle = colors.gold;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(70, 454);
    g.lineTo(650, 454);
    g.stroke();
    g.restore();
    drawText(g, t("選ぶ。整える。静止する。", "CHOOSE. SHAPE. HOLD.", locale()), 360, 556, compactLayout ? 12 : 17, colors.gold, "center", 740, 0.8, 600);
    drawText(g, t("三つの姿勢で、視線を欺く。", "THREE SHAPES. ONE WATCHING EYE.", locale()), 360, 586, compactLayout ? 8 : 10, colors.soft, "center", 580, 0.3, 580);
  }

  function render(time = 0) {
    if (!ctx) return;
    readSettings();
    const g = ctx;
    try {
      const rect = g.canvas?.getBoundingClientRect?.();
      const side = rect ? Math.min(rect.width, rect.height) : 0;
      textScale = side > 0 ? clamp(W / side, 1, 2.35) : 1;
      compactLayout = side > 0 && side <= 500;
    } catch {
      textScale = 1;
      compactLayout = false;
    }
    const colors = palette();
    const now = Number.isFinite(time) ? time : state.time;
    const ambient = motionReduced ? 0 : Math.sin(now * 1.15) * 0.7;
    g.save();
    g.clearRect(0, 0, W, H);
    if (!state) {
      drawIdlePreview(g, colors);
      g.restore();
      return;
    }
    drawBackground(g, colors, now);
    drawHUD(g, colors);
    drawBeam(g, colors);
    const pose = currentPoseVector();
    const performerGlow = state.phase === "scan" && Math.abs(state.beamX - 360) < 126 ? 1 : 0;
    g.save();
    g.globalAlpha = 0.24 + performerGlow * 0.14;
    g.fillStyle = colors.shadow;
    g.beginPath();
    g.ellipse(360, 481, 78, 10, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
    drawPerformer(g, 360, 447 + ambient, pose, colors, 1, 1);
    drawCue(g, colors, now);
    drawCards(g, colors);
    if (state.phase === "prepare") {
      const countdown = clamp(state.timer / state.prepareSeconds, 0, 1);
      g.strokeStyle = colors.gold;
      g.globalAlpha = 0.18 + (1 - countdown) * 0.4;
      g.lineWidth = 1;
      g.beginPath();
      g.arc(360, 296, 116 + (motionReduced ? 0 : (1 - countdown) * 9), -Math.PI * 0.9, -Math.PI * 0.9 + (1 - countdown) * Math.PI * 1.8);
      g.stroke();
      g.globalAlpha = 1;
    }
    if (state.phase === "scan" && state.locked && !state.judged) {
      drawText(g, t("静止", "HOLDING", locale()), 360, 185, 9, colors.teal, "center", 700, 1.4);
    }
    if (state.status !== "running") drawResult(g, colors);
    g.restore();
  }

  return { reset, step, render, pointer, key, cancel, snapshot };
}
