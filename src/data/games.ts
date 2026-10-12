import type { ImageMetadata } from 'astro';
import icon from '../assets/games/dice-merge/icon.png';
import feature from '../assets/games/dice-merge/feature.png';
import gameplay1 from '../assets/games/dice-merge/gameplay-1.jpeg';
import gameplay2 from '../assets/games/dice-merge/gameplay-2.jpeg';
import jokerBomb from '../assets/games/dice-merge/joker-bomb.jpeg';
import jokerClear from '../assets/games/dice-merge/joker-clear-value.jpeg';
import mainMenu from '../assets/games/dice-merge/main-menu.png';
import profile from '../assets/games/dice-merge/player-profile.png';
import { site } from '../config/site';

export interface Screenshot {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface Game {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  platform: string;
  icon: ImageMetadata;
  feature: ImageMetadata;
  featureAlt: string;
  screenshots: Screenshot[];
  features: string[];
  googlePlayUrl: string;
  privacyPath: string;
}

export const games: Game[] = [
  {
    slug: 'dice-merge',
    title: 'Dice Merge',
    tagline: 'A pixel-art dice merging puzzle.',
    summary:
      'Place dice on a 5x5 board, merge them to climb in value and chase a new best score. When the board gets tight, a joker can turn things around.',
    platform: 'Android',
    icon,
    feature,
    featureAlt: 'Dice Merge key art: colourful pixel-art dice and the Dice Merge scroll on a candle-lit wooden table.',
    screenshots: [
      { src: gameplay1, alt: 'Dice Merge gameplay: a 5x5 wooden board with coloured dice and the current score above.', caption: 'Merge on a 5x5 board' },
      { src: jokerBomb, alt: 'The Bomb joker card with the caption “Blast the board”.', caption: 'Bomb joker' },
      { src: jokerClear, alt: 'The Clear Value joker card with the caption “Remove matching dice”.', caption: 'Clear Value joker' },
      { src: gameplay2, alt: 'Dice Merge gameplay with a higher score and the next dice to place below the board.', caption: 'Chase your best score' },
      { src: mainMenu, alt: 'Dice Merge main menu with Play, Settings and Leaderboards buttons.', caption: 'Main menu' },
      { src: profile, alt: 'Player Profile panel showing an avatar, global rank and best score.', caption: 'Player profile' },
    ],
    features: [
      'Pixel-art dice merging puzzle',
      '5x5 board',
      'Jokers such as Bomb and Clear Value',
      'Score and best score tracking',
      'Leaderboard',
      'Player profile with avatar selection',
    ],
    googlePlayUrl: site.googlePlayUrl,
    privacyPath: '/privacy/dice-merge',
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
