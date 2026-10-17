// Ad landing pages for Dice Merge: /dice-merge/ plus one page per ad channel.
// These pages never redirect on their own; the visitor taps the button to reach Google Play.

export const LANDING_BASE = '/dice-merge';

const PLAY_APP_ID = 'com.emberwick.dicemerge';

/** URL segment → utm_source. The root page (/dice-merge/) uses 'web'. */
export const landingSources = {
  ig: 'instagram',
  tt: 'tiktok',
  yt: 'youtube',
} as const;

export type LandingSlug = keyof typeof landingSources;

/** Play listing with the install referrer; & and = inside the referrer stay URL-encoded. */
export const playUrl = (utmSource: string) =>
  `https://play.google.com/store/apps/details?id=${PLAY_APP_ID}&referrer=` +
  encodeURIComponent(`utm_source=${utmSource}&utm_medium=paid&utm_campaign=launch`);

/** True for paths that belong to the landing pages (kept out of the sitemap). */
export const isLandingPath = (pathname: string) =>
  pathname.startsWith(`${LANDING_BASE}/`);
