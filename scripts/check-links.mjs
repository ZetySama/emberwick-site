// Checks every built page in dist/: internal links and #anchors resolve, no empty hrefs,
// and nothing tied to empty config values (socials, Google Play) is rendered.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const ids = new Map(pages.map((p) => [p, new Set([...readFileSync(p, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

const resolvePage = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const candidates = [path.join(DIST, clean), path.join(DIST, clean, 'index.html'), path.join(DIST, `${clean}.html`)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};

const errors = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const rel = path.relative(DIST, page).replaceAll('\\', '/');

  for (const [, attr, value] of html.matchAll(/\s(href|src|srcset)="([^"]*)"/g)) {
    if (attr !== 'srcset' && value.trim() === '') errors.push(`${rel}: empty ${attr}`);
    const urls = attr === 'srcset' ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const url of urls) {
      if (!url || /^(https?:|mailto:|data:)/.test(url)) continue;
      checked++;
      if (url === '#') {
        errors.push(`${rel}: placeholder link "#"`);
        continue;
      }
      const [p, hash] = url.split('#');
      const target = p ? resolvePage(p) : page;
      if (!target) {
        errors.push(`${rel}: broken link ${url}`);
        continue;
      }
      if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) {
        errors.push(`${rel}: missing anchor ${url}`);
      }
    }
  }

  // Empty config values must not leak into the UI.
  if (/aria-label="(Discord|YouTube|Instagram|X)"/.test(html)) errors.push(`${rel}: social link rendered`);
  if (/Get it on Google Play/i.test(html)) errors.push(`${rel}: Google Play badge/button rendered`);
  if (/coming soon|yakında|lorem ipsum/i.test(html)) errors.push(`${rel}: placeholder text`);
  if (/fonts\.googleapis|fonts\.gstatic/.test(html)) errors.push(`${rel}: Google Fonts request`);
}

const required = [
  'index.html',
  'games/index.html',
  'games/dice-merge/index.html',
  'privacy/dice-merge/index.html',
  'studio/index.html',
  'contact/index.html',
  '404.html',
];
for (const r of required) if (!existsSync(path.join(DIST, r))) errors.push(`missing page dist/${r}`);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages, ${checked} internal references OK; no empty/placeholder links or unset config items.`);
