// Verifies that the published privacy policy text is identical to privacy-source.html.
import { readFileSync } from 'node:fs';

const source = readFileSync('privacy-source.html', 'utf8');
const built = readFileSync('dist/privacy/dice-merge/index.html', 'utf8');

const pick = (html, re, label) => {
  const m = html.match(re);
  if (!m) throw new Error(`Could not find ${label}`);
  return m[1];
};

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
const toText = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#?\w+);/g, (m, e) => entities[e] ?? (e.startsWith('#') ? String.fromCodePoint(Number(e.slice(1))) : m))
    .replace(/\s+/g, ' ')
    .trim();
const links = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

const srcBody = pick(source, /<div class="card">([\s\S]*?)<\/div>\s*<\/main>/, 'source body');
const srcFooter = pick(source, /<footer>([\s\S]*?)<\/footer>/, 'source attribution');
const outBody = pick(built, /<article class="policy"[^>]*>([\s\S]*?)<\/article>/, 'built body');
const outFooter = pick(built, /<footer class="policy-attribution"[^>]*>([\s\S]*?)<\/footer>/, 'built attribution');

const pairs = [
  ['policy text', toText(srcBody), toText(outBody)],
  ['attribution text', toText(srcFooter), toText(outFooter)],
  ['policy links', links(srcBody).join('\n'), links(outBody).join('\n')],
];

let failed = false;
for (const [label, a, b] of pairs) {
  if (a === b) {
    console.log(`✓ ${label} identical (${a.length} chars)`);
    continue;
  }
  failed = true;
  let i = 0;
  while (a[i] === b[i]) i++;
  console.error(`✗ ${label} differs at char ${i}:\n  source: …${a.slice(Math.max(0, i - 40), i + 60)}\n  built:  …${b.slice(Math.max(0, i - 40), i + 60)}`);
}

const date = source.match(/Effective as of (\d{4}-\d{2}-\d{2})/)?.[1];
if (!date || !new RegExp(`Effective as of <time datetime="${date}"[^>]*>${date}</time>`).test(built)) {
  failed = true;
  console.error('✗ effective date missing from banner');
} else console.log(`✓ effective date ${date} shown`);

process.exit(failed ? 1 : 0);
