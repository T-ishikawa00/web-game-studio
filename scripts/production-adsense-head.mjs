import assert from 'node:assert/strict';

export const adsenseHeadScript = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2960465104451668" crossorigin="anonymous"></script>';

// One common Production head step covers Portal, GamePage and IslandPlay.
// The caller selects public page routes; raw game assets and 404 are unchanged.
export function productionAdsenseHtml(html) {
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/gi);
  assert.equal(head?.length, 1, 'One complete document head required');
  const loaders = html.match(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*\/adsbygoogle\.js(?:\?[^"']*)?["'][^>]*>[\s\S]*?<\/script>/gi) ?? [];
  assert(loaders.length <= 1, 'Duplicate AdSense loaders: review instead of inserting');
  if (loaders.length === 1) {
    assert.equal(loaders[0], adsenseHeadScript, 'Unexpected AdSense loader: review client and attributes');
    assert(head[0].includes(adsenseHeadScript), 'AdSense loader must be inside head');
    return html;
  }
  return html.replace(/<\/head>/i, adsenseHeadScript + '</head>');
}
