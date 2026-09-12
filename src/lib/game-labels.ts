import type { Game, Locale } from '../data/games';
export function gameLabels(game: Game, locale: Locale) {
  const names = locale === 'ja'
    ? { pointer: 'マウス', touch: 'タッチ', keyboard: 'キーボード', desktop: 'PC', mobile: 'モバイル', any: '縦・横', portrait: '縦', landscape: '横' }
    : { pointer: 'Mouse', touch: 'Touch', keyboard: 'Keyboard', desktop: 'Desktop', mobile: 'Mobile', any: 'Any orientation', portrait: 'Portrait', landscape: 'Landscape' };
  const devices = (['desktop', 'mobile'] as const).filter(key => game.devices[key]).map(key => names[key]);
  return { inputs: game.inputs.map(input => names[input]).join(' / '), devices: `${devices.join(' & ')} / ${names[game.orientation]}` };
}
