import fs from 'node:fs/promises';
const root='docs/qa/tinlumo-audit-r1/';
let js=await fs.readFile(root+'review.js','utf8');
const layout=await fs.readFile('src/rc/Layout.astro','utf8');const svg=layout.match(/<svg width="52"[\s\S]*?<\/svg>/)?.[0];if(!svg)throw Error('Missing brand');
js=js.replace('<span class="logo">N</span>',svg);await fs.writeFile(root+'review.js',js);
let report=await fs.readFile(root+'AUDIT.md','utf8');report=report.replace('Art27例外は小規模だけでなくoccasionally等を検討。DPOと別','Art27例外は、処理が偶発的で、大規模な特別カテゴリー/犯罪関連データ処理を含まず、権利自由へのリスクが低い等の要件を併せて検討。継続運営を小規模だけで例外扱いしない。DPOと別');await fs.writeFile(root+'AUDIT.md',report);
let html=await fs.readFile(root+'REVIEW.html','utf8');html=html.replace('対応終了後90日を目安とする削除、未解決の月次確認、合理的な例外、ごみ箱・バックアップの制限は現行説明を維持します。','お問い合わせは、対応終了後90日を目安に削除します。未解決のお問い合わせは月1回確認します。法令への対応、セキュリティ、不正利用、紛争のため合理的に必要な場合は、より長く保持することがあります。メール事業者のごみ箱やバックアップには別途残る場合があります。');html=html.replace('The current explanation of deletion around 90 days after resolution, monthly reviews, reasonable exceptions, and trash/backup limits remains in place.','We normally delete inquiries around 90 days after resolution and review unresolved inquiries monthly. We may keep information longer when reasonably needed for legal obligations, security, abuse or disputes. Copies may remain in the email provider’s trash or backups.');await fs.writeFile(root+'REVIEW.html',html);
await fs.appendFile(root+'review.css','\n.brand{display:inline-flex;align-items:center;gap:9px}.brand svg{width:42px;height:38px;flex:none}\n');
