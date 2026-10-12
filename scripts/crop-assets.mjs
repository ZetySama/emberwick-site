// Generates production assets from reference-images/ into src/assets and public/.
// Run once with `npm run assets`; outputs are committed so the Cloudflare build does not depend on it.
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const REF = 'reference-images';
const MOODBOARD = path.join(REF, 'Emberwick Games Piksel Sanat Varlık Panosu.png');
const LOGO = path.join(REF, 'Logo v2.png');

const out = (...p) => path.join(...p);
await Promise.all(
  ['src/assets/brand', 'src/assets/scenes', 'src/assets/games/dice-merge', 'public'].map((d) =>
    mkdir(d, { recursive: true }),
  ),
);

// --- 404 scene cropped from the moodboard (inner panel area, labels and borders excluded) ---
const scenes = {
  // 404: lost traveller with a lantern (left part of the panel, away from the baked-in text).
  'lost-traveller': { left: 1134, top: 844, width: 110, height: 82 },
};
for (const [name, region] of Object.entries(scenes)) {
  await sharp(MOODBOARD).extract(region).png().toFile(out('src/assets/scenes', `${name}.png`));
}

// Dedicated full-size scenes supplied separately (copied as-is; astro:assets optimises them at build).
await copyFile(path.join(REF, 'Main Page Backgorund.png'), out('src/assets/scenes', 'hero.png'));
await copyFile(path.join(REF, 'Studio Section.jpg'), out('src/assets/scenes', 'studio.jpg'));
await copyFile(path.join(REF, 'Footer backgorund.jpg'), out('src/assets/scenes', 'footer.jpg'));
await copyFile(path.join(REF, 'Private Policy.jpg'), out('src/assets/scenes', 'privacy.jpg'));

// --- Logo ---
// Full framed logo: trim the transparent outer margin.
await sharp(LOGO).trim().png().toFile(out('src/assets/brand', 'logo-full.png'));

// Ember mark and wordmark: key out the flat inner background (#212429) with colour decontamination
// so no dark halo remains on other backgrounds.
const BG = [33, 36, 41];
async function keyed(region, file) {
  const { data, info } = await sharp(LOGO).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const d = Math.hypot(data[i] - BG[0], data[i + 1] - BG[1], data[i + 2] - BG[2]);
    const a = Math.min(1, Math.max(0, (d - 12) / 48));
    if (a === 0) {
      data[i + 3] = 0;
      continue;
    }
    for (let c = 0; c < 3; c++) {
      data[i + c] = Math.round(Math.min(255, Math.max(0, (data[i + c] - (1 - a) * BG[c]) / a)));
    }
    data[i + 3] = Math.round(a * 255);
  }
  await sharp(data, { raw: info }).trim({ threshold: 0 }).png().toFile(file);
}
await keyed({ left: 380, top: 230, width: 264, height: 360 }, out('src/assets/brand', 'logo-mark.png'));
await keyed({ left: 190, top: 620, width: 644, height: 172 }, out('src/assets/brand', 'logo-wordmark.png'));

// --- Favicons from the ember mark ---
const mark = out('src/assets/brand', 'logo-mark.png');
const square = async (size, bg) => {
  const pad = Math.round(size * 0.08);
  const inner = await sharp(mark)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: inner, gravity: 'center' }])
    .png();
};
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const night = { r: 16, g: 18, b: 26, alpha: 1 };
await (await square(32, clear)).toFile('public/favicon-32.png');
await (await square(192, clear)).toFile('public/favicon-192.png');
await (await square(512, night)).toFile('public/icon-512.png');
await (await square(180, night)).toFile('public/apple-touch-icon.png');

// --- Open Graph image: hero scene + framed logo ---
const ogLogo = await sharp(out('src/assets/brand', 'logo-full.png')).resize({ width: 380 }).toBuffer();
await sharp(out('src/assets/scenes', 'hero.png'))
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .modulate({ brightness: 0.7 })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .png()
  .toFile('public/og-image.png');

// --- Dice Merge assets (LeaderBoard.png intentionally excluded: shows other players' data) ---
const game = {
  '512x512.png': 'icon.png',
  '1024x500.png': 'feature.png',
  'GamePlay.jpeg': 'gameplay-1.jpeg',
  'GamePlay2.jpeg': 'gameplay-2.jpeg',
  'Bomb Joker.jpeg': 'joker-bomb.jpeg',
  'ClearValue Joker.jpeg': 'joker-clear-value.jpeg',
  'main menu.png': 'main-menu.png',
  'Profile panel.png': 'player-profile.png',
};
for (const [from, to] of Object.entries(game)) {
  await copyFile(path.join(REF, from), out('src/assets/games/dice-merge', to));
}

console.log('Assets generated.');
