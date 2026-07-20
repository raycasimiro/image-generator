import { randInt } from "./random";

export type PastelPalette = [string, string, string]; // [primary 60%, secondary 30%, accent 10%]

export const PASTEL_PALETTES: PastelPalette[] = [
  ["#FFB3C6", "#B4E8B4", "#FFF0A6"], // pink · mint · butter
  ["#FFC5A8", "#A8E6D9", "#D8B4E8"], // peach · aqua · orchid
  ["#A8D5F0", "#FFCAD4", "#DDF5A8"], // sky · rose · lime
  ["#C8B8F0", "#FFD9A0", "#A8E6D9"], // lavender · apricot · aqua
  ["#FFF3D6", "#C8E8B4", "#FFB4A8"], // cream · sage · coral
  ["#C4E8B4", "#FFB3C6", "#FFD9A0"], // mint · rose · apricot
  ["#FBC8CB", "#B8C8F5", "#FFF0A6"], // blush · periwinkle · butter
  ["#B8E8C4", "#C4B0E5", "#FFB0A0"], // sage · lilac · salmon
  ["#A8E0E6", "#FFC8D4", "#FFF085"], // aqua · blush · lemon
  ["#FFF0A6", "#D8B4E8", "#B4E8B4"], // butter · orchid · mint
];

export type DarkPalette = {
  base: [string, string, string]; // darkest → mid → brightest
  glows: [string, string];
  shadow: string;
};

export const DARK_PALETTES: DarkPalette[] = [
  // deep magenta → magenta → hot pink
  {
    base: ["#1D0619", "#63125A", "#C51E93"],
    glows: ["#F03E9E", "#FDA4E1"],
    shadow: "#0E020C",
  },
  // deep purple → violet → magenta
  {
    base: ["#1A0345", "#4C1D95", "#A21CAF"],
    glows: ["#E879F9", "#F472B6"],
    shadow: "#0F0327",
  },
  // near-black → indigo → sky
  {
    base: ["#0F172A", "#1E3A8A", "#0284C7"],
    glows: ["#22D3EE", "#67E8F9"],
    shadow: "#020617",
  },
  // deep teal → teal → bright teal
  {
    base: ["#03211F", "#0F4A47", "#0D9488"],
    glows: ["#2DD4BF", "#99F6E4"],
    shadow: "#021A18",
  },
  // deep slate → slate → slate gray
  {
    base: ["#1B222D", "#3B4553", "#708090"],
    glows: ["#94A3B8", "#CBD5E1"],
    shadow: "#12161E",
  },
  // deep navy → indigo → purple
  {
    base: ["#0C0A22", "#1E1B4B", "#6D28D9"],
    glows: ["#A78BFA", "#818CF8"],
    shadow: "#050318",
  },
  // wine → burgundy → rose
  {
    base: ["#1F0410", "#500724", "#BE185D"],
    glows: ["#F43F5E", "#FB7185"],
    shadow: "#0E020B",
  },
  // dark forest → forest → olive
  {
    base: ["#0A2E0F", "#166534", "#4D7C0F"],
    glows: ["#A3E635", "#84CC16"],
    shadow: "#052E16",
  },
  // dark brown → rust → burnt orange
  {
    base: ["#1C1005", "#7C2D12", "#C2410C"],
    glows: ["#F97316", "#FBBF24"],
    shadow: "#0F0705",
  },
  // near-black cyan → cyan → emerald
  {
    base: ["#052029", "#0E7490", "#047857"],
    glows: ["#34D399", "#22D3EE"],
    shadow: "#022C22",
  },
];

const GRADIENT_DIRECTIONS = [
  { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
  { x1: "0%", y1: "10%", x2: "100%", y2: "90%" },
  { x1: "10%", y1: "0%", x2: "90%", y2: "100%" },
  { x1: "15%", y1: "15%", x2: "100%", y2: "100%" },
];

function generateMeshBg(paletteIndex: number) {
  const [primary, secondary, accent] =
    PASTEL_PALETTES[paletteIndex % PASTEL_PALETTES.length];

  // 60/30/10: primary appears twice as large blobs, secondary as medium, accent as small
  const blobSpecs = [
    { color: primary, rxRange: [850, 1050], ryRange: [750, 950] },
    { color: primary, rxRange: [850, 1050], ryRange: [750, 950] },
    { color: secondary, rxRange: [650, 800], ryRange: [550, 700] },
    { color: accent, rxRange: [350, 500], ryRange: [300, 450] },
  ];

  const gradients = blobSpecs
    .map(
      (b, i) => `
      <radialGradient id="g${i}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${b.color}" stop-opacity="1" />
        <stop offset="100%" stop-color="${b.color}" stop-opacity="0" />
      </radialGradient>`,
    )
    .join("");

  const blobQuadrants = [
    { xMin: 960, xMax: 1820, yMin: 100, yMax: 720 }, // top-right
    { xMin: 100, xMax: 960, yMin: 720, yMax: 1340 }, // bottom-left
    { xMin: 960, xMax: 1820, yMin: 720, yMax: 1340 }, // bottom-right
  ];

  const ellipses = blobSpecs
    .map((b, i) => {
      const q = blobQuadrants[Math.floor(Math.random() * blobQuadrants.length)];
      const cx = randInt(q.xMin, q.xMax);
      const cy = randInt(q.yMin, q.yMax);
      const rx = randInt(b.rxRange[0], b.rxRange[1]);
      const ry = randInt(b.ryRange[0], b.ryRange[1]);
      return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#g${i})" />`;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1440" preserveAspectRatio="xMidYMid slice">
    <defs>${gradients}
      <filter id="mesh-blur" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="120" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#FFFFFF" />
    <g filter="url(#mesh-blur)">${ellipses}</g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function generateDarkGradient(paletteIndex: number) {
  const palette = DARK_PALETTES[paletteIndex % DARK_PALETTES.length];
  const dir =
    GRADIENT_DIRECTIONS[Math.floor(Math.random() * GRADIENT_DIRECTIONS.length)];
  const numBlobs = randInt(2, 4);
  const blobColorPool = [...palette.glows, palette.shadow];

  const blobGradients = Array.from({ length: numBlobs }, (_, i) => {
    const color = blobColorPool[i % blobColorPool.length];
    return `
      <radialGradient id="db${i}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="1" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0" />
      </radialGradient>`;
  }).join("");

  const blobQuadrants = [
    { xMin: 960, xMax: 1720, yMin: 200, yMax: 720 }, // top-right
    { xMin: 200, xMax: 960, yMin: 720, yMax: 1240 }, // bottom-left
    { xMin: 960, xMax: 1720, yMin: 720, yMax: 1240 }, // bottom-right
  ];

  const blobEllipses = Array.from({ length: numBlobs }, (_, i) => {
    const q = blobQuadrants[Math.floor(Math.random() * blobQuadrants.length)];
    const cx = randInt(q.xMin, q.xMax);
    const cy = randInt(q.yMin, q.yMax);
    const rx = randInt(700, 1000);
    const ry = randInt(600, 900);
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#db${i})" />`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1440" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="base-grad" x1="${dir.x1}" y1="${dir.y1}" x2="${dir.x2}" y2="${dir.y2}">
        <stop offset="0%" stop-color="${palette.base[0]}" />
        <stop offset="50%" stop-color="${palette.base[1]}" />
        <stop offset="100%" stop-color="${palette.base[2]}" />
      </linearGradient>
      ${blobGradients}
      <filter id="dark-blob-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="100" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#base-grad)" />
    <g filter="url(#dark-blob-blur)">${blobEllipses}</g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateBg(dark: boolean, paletteIndex: number) {
  return dark
    ? generateDarkGradient(paletteIndex)
    : generateMeshBg(paletteIndex);
}

export function paletteThumbnailBackground(
  palette: PastelPalette | DarkPalette,
  dark: boolean,
): string {
  if (dark) {
    const p = palette as DarkPalette;
    return `radial-gradient(circle at center, ${p.glows[0]} 0%, ${p.base[2]} 30%, ${p.base[1]} 65%, ${p.base[0]} 100%)`;
  }
  const [primary, secondary, accent] = palette as PastelPalette;
  return `
    radial-gradient(circle at 75% 75%, ${accent} 0%, transparent 30%),
    radial-gradient(circle at 25% 30%, ${secondary} 15%, transparent 60%),
    ${primary}
  `;
}
