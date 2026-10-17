// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config/site.ts';
import { isLandingPath } from './src/data/landing.ts';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !isLandingPath(new URL(page).pathname) })],
  image: {
    responsiveStyles: false,
  },
});
