// Single source of truth for site-wide settings.

// Canlı adres (GitHub Pages). Özel alan adı bağlanınca burayı onunla değiştir.
export const SITE_URL = 'https://zetysama.github.io';

export interface SocialLinks {
  discord: string;
  x: string;
  youtube: string;
  instagram: string;
}

export const site = {
  name: 'Emberwick Games',
  url: SITE_URL,
  description:
    'Emberwick Games is an independent studio crafting thoughtful games with distinctive worlds, satisfying mechanics, and a spark of wonder.',
  email: 'emberwickgames842@gmail.com',
  // Leave empty until the store listing is live; empty values are never rendered.
  googlePlayUrl: '',
  socials: {
    discord: '',
    x: '',
    youtube: '',
    instagram: '',
  } satisfies SocialLinks as SocialLinks,
};

export type SocialKey = keyof SocialLinks;

export const socialLabels: Record<SocialKey, string> = {
  discord: 'Discord',
  x: 'X',
  youtube: 'YouTube',
  instagram: 'Instagram',
};

/** Social profiles that actually have a URL configured. */
export const activeSocials = (Object.keys(site.socials) as SocialKey[])
  .filter((key) => site.socials[key].trim() !== '')
  .map((key) => ({ key, label: socialLabels[key], url: site.socials[key] }));

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/games', label: 'Games' },
  { href: '/studio', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Email split after "@" so it can wrap cleanly on narrow screens (render with set:html). */
export const emailWrapHtml = site.email.replace('@', '@<wbr>');
