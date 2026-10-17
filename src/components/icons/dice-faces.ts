// 16x16 pixel dice faces (1–6) for PixelIcon, in the same outline style as diceMap.

type Value = 1 | 2 | 3 | 4 | 5 | 6;

// Top-left corner of each 3x3 pip slot.
const slots = {
  tl: [3, 3], tr: [10, 3],
  ml: [3, 6], c: [6, 6], mr: [10, 6],
  bl: [3, 10], br: [10, 10],
} as const;

const slots6 = {
  tl: [3, 3], tr: [11, 3],
  ml: [3, 7], mr: [11, 7],
  bl: [3, 11], br: [11, 11],
} as const;

const faces: Record<Value, (keyof typeof slots)[]> = {
  1: ['c'],
  2: ['tl', 'br'],
  3: ['tl', 'c', 'br'],
  4: ['tl', 'tr', 'bl', 'br'],
  5: ['tl', 'tr', 'c', 'bl', 'br'],
  6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'],
};

export function dieFaceMap(value: Value): string[] {
  const grid: string[][] = Array.from({ length: 16 }, (_, y) =>
    Array.from({ length: 16 }, (_, x) => {
      if (y === 0 || x === 0) return '.';
      if (y === 1 || y === 15 || x === 1 || x === 15) return 'k';
      if (y === 14 || x === 14) return 's';
      return 'c';
    }),
  );
  // Six pips need three rows, which only fit at 2x2.
  const [size, table] = value === 6 ? [2, slots6] : [3, slots];
  for (const slot of faces[value]) {
    const [sx, sy] = table[slot as keyof typeof table];
    for (let dy = 0; dy < size; dy++) for (let dx = 0; dx < size; dx++) grid[sy + dy][sx + dx] = 'p';
  }
  return grid.map((row) => row.join(''));
}

/** Body (c), shade (s), pip (p) and outline (k) colours per die value. */
export const diePalettes: Record<Value, Record<string, string>> = {
  1: { k: '#1A1208', c: '#F1E8D5', s: '#C9B99A', p: '#2A1D17' },
  2: { k: '#1A1208', c: '#4FA3E0', s: '#2F6FA8', p: '#F1E8D5' },
  3: { k: '#1A1208', c: '#5CC46A', s: '#36884A', p: '#F1E8D5' },
  4: { k: '#1A1208', c: '#B45BD6', s: '#7A3A99', p: '#F1E8D5' },
  5: { k: '#1A1208', c: '#FF8145', s: '#C4552A', p: '#2A1D17' },
  6: { k: '#1A1208', c: '#D8433A', s: '#932A24', p: '#F1E8D5' },
};
