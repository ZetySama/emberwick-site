# Emberwick Games site

Static site for Emberwick Games, built with Astro + TypeScript and deployed on Cloudflare Pages.

## Commands

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies (Node 22.12+) |
| `npm run dev` | Local dev server |
| `npm run build` | Type-check (`astro check`) and build to `dist/` |
| `npm run preview` | Serve the built site |
| `npm run verify` | After a build: check internal links/anchors and that the privacy policy matches `privacy-source.html` |
| `npm run assets` | Regenerate images in `src/assets` and `public/` from `reference-images/` |

## Configuration

Everything site-wide lives in `src/config/site.ts`: `SITE_URL` (canonical, sitemap and OG URLs), contact email,
`googlePlayUrl` and social links. Empty values are never rendered.

Games are listed in `src/data/games.ts`; adding an entry creates its card and `/games/<slug>` page.

The Dice Merge privacy policy is read verbatim from `privacy-source.html` at build time.

See `docs/asset-inventory.md` for where each reference image is used.

## Cloudflare Pages

Build command `npm run build`, output directory `dist`, environment variable `NODE_VERSION=22`.
