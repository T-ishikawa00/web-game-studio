import {drawGardenSky,drawGardenPad,drawBrassSpring} from './remaster-art.js';
// Original COILHOP vector renderer. The camera is specified in world units at
// the centre of the field; the canvas remains resolution independent.
const THEMES = [
  { sky: ['#183c43', '#5e967a', '#e2b779'], ridge: '#294e4b', leaf: '#7bbf8e', glow: '#f5d088', accent: '#d8936b' },
  { sky: ['#31465b', '#9a9180', '#f1c38c'], ridge: '#53635d', leaf: '#c18a71', glow: '#ffe0a0', accent: '#e5a06d' },
  { sky: ['#193b57', '#527e9a', '#bdc9bc'], ridge: '#284c5a', leaf: '#7cb4a2', glow: '#ffe5a5', accent: '#d98f75' },
  { sky: ['#292d56', '#6c668a', '#d49c91'], ridge: '#36385a', leaf: '#8d9e9a', glow: '#ffda9a', accent: '#e29675' },
  { sky: ['#49384e', '#b27669', '#f2cb91'], ridge: '#50404a', leaf: '#93a98a', glow: '#fff0bd', accent: '#e7a06f' },
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, Number.isFinite(v) ? v : lo));
const mix = (a, b, t) => a + (b - a) * t;
const roundRect = (ctx, x, y, w, h, r) => {
  const q = Math.min(r, w / 2, h / 2);
  ctx.beginPath(); ctx.moveTo(x + q, y); ctx.arcTo(x + w, y, x + w, y + h, q);
  ctx.arcTo(x + w, y + h, x, y + h, q); ctx.arcTo(x, y + h, x, y, q);
  ctx.arcTo(x, y, x + w, y, q); ctx.closePath();
};
const hash = (n) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

function themeOf(course) {
  if (course?.theme && typeof course.theme === 'object') {
    const authored = course.theme;
    if (authored.skyTop || authored.skyBottom) {
      const top = authored.skyTop || THEMES[0].sky[0];
      const bottom = authored.skyBottom || THEMES[0].sky[2];
      return { ...THEMES[0], sky: [top, blendHex(top, bottom, 0.55), bottom], ridge: authored.platform || THEMES[0].ridge, leaf: authored.leaf || THEMES[0].leaf, glow: '#f7d392', accent: authored.platform || THEMES[0].accent };
    }
    return { ...THEMES[0], ...authored };
  }
  const raw = Number.isInteger(course?.chapter) ? course.chapter : Number.isInteger(course?.index) ? course.index : Number.isInteger(course) ? course : 0;
  return THEMES[((raw % THEMES.length) + THEMES.length) % THEMES.length];
}
function blendHex(a, b, t) {
  const parse = (value) => /^#[0-9a-f]{6}$/i.test(value) ? [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16)) : [94, 150, 122];
  const aa = parse(a), bb = parse(b);
  return `#${aa.map((v, i) => Math.round(mix(v, bb[i], t)).toString(16).padStart(2, '0')).join('')}`;
}
function paletteColor(theme, key, fallback) {
  const value = theme[key];
  return Array.isArray(value) ? value : fallback;
}

const drawSky=drawGardenSky;

function worldPoint(p, camera, scale, w, h) {
  return { x: w / 2 + (p.x - camera.x) * scale, y: h / 2 + (p.y - camera.y) * scale };
}

function drawTrack(ctx, a, b, scale, moving, theme) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (len < 35 || len > 760) return;
  const gap = 14 * scale;
  ctx.save(); ctx.strokeStyle = moving ? 'rgba(255,226,171,.42)' : 'rgba(228,237,207,.14)';
  ctx.lineWidth = Math.max(1, 1.4 * scale); ctx.setLineDash([3 * scale, 8 * scale]);
  ctx.beginPath(); ctx.moveTo(a.x, a.y + gap); ctx.lineTo(b.x, b.y + gap); ctx.stroke(); ctx.setLineDash([]);
  if (moving) {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 + gap;
    ctx.fillStyle = theme.glow; ctx.globalAlpha = 0.62;
    ctx.beginPath(); ctx.arc(mx, my, Math.max(1.5, 2 * scale), 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawMotionRail(ctx, item, p, scale, w, h, theme) {
  const pad = item.pad ?? item;
  const ampX = Math.abs(Number(pad.ampX) || 0) * scale;
  const ampY = Math.abs(Number(pad.ampY) || 0) * scale;
  const baseX = p.x - ((item.position?.x ?? pad.x) - pad.x) * scale;
  const baseY = p.y - ((item.position?.y ?? pad.y) - pad.y) * scale;
  if (ampX < 2 && ampY < 2) return;
  if (p.x < -80 || p.x > w + 80 || p.y < -75 || p.y > h + 70) return;
  ctx.save(); ctx.strokeStyle = 'rgba(41,90,81,.55)'; ctx.fillStyle = theme.glow;
  ctx.lineWidth = Math.max(1, 1.1 * scale); ctx.setLineDash([3 * scale, 5 * scale]);
  ctx.beginPath(); ctx.moveTo(baseX - ampX, baseY + 31 * scale - ampY); ctx.lineTo(baseX + ampX, baseY + 31 * scale + ampY); ctx.stroke(); ctx.setLineDash([]);
  for (const side of [-1, 1]) {
    ctx.globalAlpha = 0.72;
    ctx.beginPath(); ctx.arc(baseX + side * ampX, baseY + 31 * scale + side * ampY, 2.1 * scale, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawPad(...args){drawGardenPad(...args,drawBeacon,drawBell);}

function drawBeacon(ctx, x, y, lit, scale, theme, scene) {
  const sway = scene.reducedMotion ? 0 : Math.sin((scene.time || 0) * 1.6 + x * 0.02) * 1.8 * scale;
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(248,228,189,.75)'; ctx.lineWidth = 1.7 * scale;
  ctx.beginPath(); ctx.moveTo(0, 4 * scale); ctx.lineTo(0, -29 * scale); ctx.stroke();
  ctx.fillStyle = lit ? '#ffd887' : '#8eb6a4';
  ctx.beginPath(); ctx.moveTo(1 * scale, -27 * scale); ctx.quadraticCurveTo(12 * scale, -31 * scale, 21 * scale, -23 * scale + sway); ctx.quadraticCurveTo(12 * scale, -17 * scale, 1 * scale, -20 * scale); ctx.closePath(); ctx.fill();
  if (lit) { ctx.shadowColor = theme.glow; ctx.shadowBlur = 14 * scale; ctx.fillStyle = '#ffe9aa'; ctx.beginPath(); ctx.arc(0, -29 * scale, 3 * scale, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; }
  ctx.restore();
}

function drawBell(ctx, x, y, scale, theme, celebratory, time) {
  const bob = celebratory ? Math.sin(time * 4) * 2 * scale : 0;
  ctx.save(); ctx.translate(x + 2 * scale, y - 41 * scale + bob);
  ctx.strokeStyle = '#fbe0a5'; ctx.lineWidth = 2 * scale; ctx.beginPath(); ctx.moveTo(0, 27 * scale); ctx.lineTo(0, 2 * scale); ctx.stroke();
  ctx.shadowColor = theme.glow; ctx.shadowBlur = 12 * scale;
  const gold = ctx.createLinearGradient(-14 * scale, 0, 14 * scale, 25 * scale);
  gold.addColorStop(0, '#ffe7a7'); gold.addColorStop(0.55, '#dfab68'); gold.addColorStop(1, '#aa6d50');
  ctx.fillStyle = gold; ctx.beginPath(); ctx.moveTo(-12 * scale, 17 * scale); ctx.quadraticCurveTo(-12 * scale, 1 * scale, 0, 0); ctx.quadraticCurveTo(12 * scale, 1 * scale, 12 * scale, 17 * scale); ctx.lineTo(16 * scale, 22 * scale); ctx.quadraticCurveTo(0, 27 * scale, -16 * scale, 22 * scale); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#fff0bd'; ctx.lineWidth = 1.4 * scale; ctx.stroke(); ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff0be'; ctx.beginPath(); ctx.ellipse(0, 23 * scale, 4.5 * scale, 2.2 * scale, 0, 0, Math.PI * 2); ctx.fill();
  if (celebratory) {
    for (let i = 0; i < 7; i += 1) {
      const a = (Math.PI * 2 * i) / 7 + time * 0.5;
      const radius = (25 + Math.sin(time * 2 + i) * 3) * scale;
      ctx.fillStyle = i % 2 ? '#fff0b1' : theme.accent; ctx.beginPath(); ctx.arc(Math.cos(a) * radius, (8 + Math.sin(a) * 12) * scale, 2 * scale, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
}

const drawPlayer=drawBrassSpring;

function drawParticles(ctx, particles, camera, scale, w, h) {
  if (!Array.isArray(particles)) return;
  for (const particle of particles) {
    const life = clamp(particle.life, 0, 1);
    if (!life) continue;
    const p = worldPoint(particle, camera, scale, w, h);
    if (p.x < -12 || p.x > w + 12 || p.y < -12 || p.y > h + 12) continue;
    ctx.globalAlpha = Math.min(0.9, life); ctx.fillStyle = particle.color || '#ffe5a2';
    ctx.beginPath(); ctx.arc(p.x, p.y, clamp(particle.size || 2.4, 1, 6) * scale * (0.4 + life * 0.6), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawRouteGlow(ctx, pads, mapped, scale, scene) {
  const ids = Array.isArray(scene.targetIds) ? scene.targetIds : [scene.currentId];
  const targetIndexes = ids.map((id) => pads.findIndex((item) => Number((item.pad ?? item).id ?? item.id) === Number(id))).filter((i) => i >= 0);
  for (const i of targetIndexes) {
    const p = mapped[i]; if (!p) continue;
    const radius = 40 * scale;
    const g = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, radius);
    g.addColorStop(0, 'rgba(255,220,135,.15)'); g.addColorStop(1, 'rgba(255,220,135,0)');
    ctx.fillStyle = g; ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
  }
}

function drawToast(ctx, width, toast, lang) {
  if (typeof toast !== 'string' || !toast.trim()) return;
  const message = toast.trim();
  ctx.save(); ctx.font = '700 13px system-ui, sans-serif';
  const textWidth = ctx.measureText(message).width;
  const boxWidth = Math.min(width - 28, Math.max(126, textWidth + 31));
  const x = (width - boxWidth) / 2, y = 61;
  ctx.fillStyle = 'rgba(20,43,46,.85)'; ctx.strokeStyle = 'rgba(255,222,160,.5)'; ctx.lineWidth = 1;
  roundRect(ctx, x, y, boxWidth, 34, 17); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffe3a4'; ctx.beginPath(); ctx.arc(x + 15, y + 17, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff0d1'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(message, width / 2 + 5, y + 17, boxWidth - 38);
  ctx.restore();
}

function drawRunStats(ctx, width, height, hops, falls, lang) {
  const jumpCount = Math.max(0, Math.floor(Number(hops) || 0));
  const fallCount = Math.max(0, Math.floor(Number(falls) || 0));
  // Zero values remain visible, as in the accepted HUD.
  const label = lang === 'ja' ? `ジャンプ ${jumpCount} · 落下 ${fallCount}` : `HOPS ${jumpCount} · FALLS ${fallCount}`;
  ctx.save(); ctx.font = '750 12px system-ui, sans-serif';
  const boxWidth = Math.min(width - 24, Math.max(104, ctx.measureText(label).width + 24));
  const x = 12, y = height - (width < 550 ? 137 : 57);
  ctx.fillStyle = 'rgba(17,41,45,.76)'; ctx.strokeStyle = 'rgba(235,232,199,.2)'; ctx.lineWidth = 1;
  roundRect(ctx, x, y, boxWidth, 27, 13.5); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e5ead6'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x + boxWidth / 2, y + 13.5, boxWidth - 14);
  ctx.restore();
}

/** Draw the full canvas scene. view.width/height are CSS pixels, dpr is backing scale. */
export function render(ctx, view, scene = {}) {
  const width = Math.max(1, Number(view?.width) || 1);
  const height = Math.max(1, Number(view?.height) || 1);
  const dpr = clamp(Number(view?.dpr) || 1, 1, 3);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const theme = themeOf(scene.course);
  const time = Number(scene.time) || 0;
  const reduced = Boolean(scene.reducedMotion);
  drawSky(ctx, width, height, theme, time, reduced);

  // When the menu is open, preview a tiny orchard ascent behind the scrim.
  const suppliedPads = Array.isArray(scene.pads) ? scene.pads : [];
  let pads = suppliedPads;
  let camera = scene.camera && Number.isFinite(scene.camera.x) && Number.isFinite(scene.camera.y)
    ? scene.camera : { x: 0, y: 0, scale: 1 };
  let scale = clamp(Number(camera.scale) || 1, 0.55, 1.35);
  if (!pads.length) {
    const x0 = (0 - width * 0.13) / scale + camera.x;
    const y0 = camera.y + height * 0.22 / scale;
    pads = Array.from({ length: 6 }, (_, i) => ({ pad: { id: i, x: x0 + i * 126, y: y0 - i * 72, width: i === 5 ? 118 : 96, checkpoint: i === 2 || i === 4, garden: true, ...(i === 5 ? { final: true } : {}) }, position: { x: x0 + i * 126, y: y0 - i * 72 } }));
    if (!scene.player) scene = { ...scene, player: { x: x0, y: y0, grounded: true }, currentId: 1, targetIds: [1], mode: 'menu' };
  }
  const mapped = pads.map((item) => {
    const position = item.position || item.pos || item.pad?.position || item.pad || item;
    return worldPoint({ x: Number(position.x) || 0, y: Number(position.y) || 0 }, camera, scale, width, height);
  });

  drawRouteGlow(ctx, pads, mapped, scale, scene);
  for (let i = 0; i < pads.length; i += 1) drawMotionRail(ctx, pads[i], mapped[i], scale, width, height, theme);
  const padIndexes = new Map(pads.map((item, index) => [Number((item.pad ?? item).id ?? item.id), index]));
  for (let i = 0; i < pads.length; i += 1) {
    const source = pads[i].pad ?? pads[i];
    for (const nextId of source.next || []) {
      const nextIndex = padIndexes.get(Number(nextId));
      if (nextIndex === undefined) continue;
      const nextPad = pads[nextIndex].pad ?? pads[nextIndex];
      drawTrack(ctx, mapped[i], mapped[nextIndex], scale, Boolean(source.moving || nextPad.moving || source.ampX || source.ampY || nextPad.ampX || nextPad.ampY), theme);
    }
  }
  for (let i = 0; i < pads.length; i += 1) drawPad(ctx, pads[i], mapped[i], scale, scene, theme, width, height);

  // A summit destination gets a quiet halo even before the final route is in view.
  const finalItem = pads.find((item) => {
    const pad = item.pad ?? item;
    return pad.final || pad.summit || pad.bell || Number(pad.id) === Number(scene.finalId);
  });
  if (finalItem && (scene.mode === 'complete' || scene.mode === 'finale')) {
    const finalPos = finalItem.position || finalItem.pos || finalItem.pad || finalItem;
    const p = worldPoint({ x: Number(finalPos.x) || 0, y: Number(finalPos.y) || 0 }, camera, scale, width, height);
    const glow = ctx.createRadialGradient(p.x, p.y - 24 * scale, 4, p.x, p.y - 24 * scale, 180 * scale);
    glow.addColorStop(0, 'rgba(255,229,164,.28)'); glow.addColorStop(1, 'rgba(255,229,164,0)');
    ctx.fillStyle = glow; ctx.fillRect(p.x - 180 * scale, p.y - 204 * scale, 360 * scale, 360 * scale);
    drawCanopy(ctx, p.x, p.y, scale, theme);
  }

  if (Array.isArray(scene.trail)) {
    for (const dot of scene.trail) {
      const p = worldPoint(dot, camera, scale, width, height);
      ctx.globalAlpha = clamp(Number(dot.life) / (Number(dot.maxLife) || 1), 0, 0.55);
      ctx.fillStyle = dot.color || '#ffd994'; ctx.beginPath(); ctx.arc(p.x, p.y, (Number(dot.size) || 3) * scale, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  drawParticles(ctx, scene.particles, camera, scale, width, height);
  const player = scene.player;
  if (player) {
    ctx.save(); const p = worldPoint(player, camera, scale, width, height);
    ctx.translate(p.x, p.y); drawPlayer(ctx, { ...player, x: 0, y: 0 }, Math.max(scale, 0.76), scene); ctx.restore();
  }

  if (scene.mode === 'complete' || scene.mode === 'finale') drawFinaleForeground(ctx, width, height, theme, time, reduced);
  drawToast(ctx, width, scene.toast, scene.lang);
  drawRunStats(ctx, width, height, scene.hops, scene.falls, scene.lang);
  // A restrained edge shade keeps the central platform area vivid under HUD copy.
  const edge = ctx.createLinearGradient(0, 0, 0, height);
  edge.addColorStop(0, 'rgba(255,255,230,.06)'); edge.addColorStop(0.15, 'rgba(15,34,41,0)'); edge.addColorStop(0.82, 'rgba(15,34,41,0)'); edge.addColorStop(1, 'rgba(255,255,230,.06)');
  ctx.fillStyle = edge; ctx.fillRect(0, 0, width, height);
}

function drawCanopy(ctx, x, y, scale, theme) {
  ctx.save();
  for (let i = 0; i < 9; i += 1) {
    const xx = x - 185 * scale + i * 46 * scale;
    const yy = y - 178 * scale - Math.sin(i * 0.77) * 18 * scale;
    ctx.strokeStyle = 'rgba(235,213,166,.35)'; ctx.lineWidth = 1.4 * scale;
    ctx.beginPath(); ctx.moveTo(xx, yy - 72 * scale); ctx.quadraticCurveTo(xx + 12 * scale, yy - 23 * scale, xx, yy + 5 * scale); ctx.stroke();
    ctx.fillStyle = i % 2 ? '#f3d695' : theme.glow; ctx.shadowColor = theme.glow; ctx.shadowBlur = 10 * scale;
    roundRect(ctx, xx - 5 * scale, yy, 10 * scale, 15 * scale, 3 * scale); ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,248,212,.9)'; ctx.fillRect(xx - 1 * scale, yy + 4 * scale, 2 * scale, 6 * scale);
  }
  ctx.restore();
}

function drawFinaleForeground(ctx, w, h, theme, time, reduced) {
  ctx.save();
  const warm = ctx.createLinearGradient(0, h * 0.58, 0, h);
  warm.addColorStop(0, 'rgba(255,226,164,0)'); warm.addColorStop(1, 'rgba(255,215,145,.16)');
  ctx.fillStyle = warm; ctx.fillRect(0, h * 0.55, w, h * 0.45);
  if (!reduced) {
    for (let i = 0; i < 24; i += 1) {
      const x = hash(i + 700) * w;
      const y = h * 0.35 + ((hash(i + 900) * h * 0.7 + time * (8 + hash(i + 90) * 7)) % (h * 0.68));
      ctx.globalAlpha = 0.2 + hash(i + 54) * 0.5; ctx.fillStyle = i % 3 ? '#ffdf9e' : '#f6c4a1';
      ctx.beginPath(); ctx.arc(x, y, 1.2 + hash(i + 22) * 1.6, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1; ctx.restore();
}
