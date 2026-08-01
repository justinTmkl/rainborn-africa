// Cinematic asset set for the Kefalonia keynote.
// Everything is drawn locally — no network. Design intent:
//   · deep, filmic gradients (not flat brand colours)
//   · vignettes and scrims so white type always has something to sit on
//   · photo frames that look like *intentional design*, not "missing image"
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'assets');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const W = 2560, H = 1440;

async function svgToPng(svg, file, w = W, h = H) {
  await sharp(Buffer.from(svg), { density: 300 }).resize(w, h).png().toFile(path.join(OUT, file));
  console.log('·', file);
}

/* Filmic background: a diagonal gradient + radial warm light + vignette.
   The vignette is what makes it read "cinematic" rather than "PowerPoint". */
async function cine(file, stops, opts = {}) {
  const { lightX = 72, lightY = 22, lightColor = '#FFE9B8', lightOpacity = 0.5, vignette = 0.55, angle = 155 } = opts;
  const rad = (angle * Math.PI) / 180;
  const dx = Math.sin(rad) * 0.5, dy = -Math.cos(rad) * 0.5;
  const x1 = (0.5 - dx) * 100, y1 = (0.5 - dy) * 100, x2 = (0.5 + dx) * 100, y2 = (0.5 + dy) * 100;
  const stopsXml = stops.map(s => `<stop offset="${s.o}%" stop-color="${s.c}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stopsXml}</linearGradient>
      <radialGradient id="light" cx="${lightX}%" cy="${lightY}%" r="62%">
        <stop offset="0%" stop-color="${lightColor}" stop-opacity="${lightOpacity}"/>
        <stop offset="55%" stop-color="${lightColor}" stop-opacity="${lightOpacity * 0.22}"/>
        <stop offset="100%" stop-color="${lightColor}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="vig" cx="50%" cy="48%" r="76%">
        <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="${vignette}"/>
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#g)"/>
    <rect width="100" height="100" fill="url(#light)"/>
    <rect width="100" height="100" fill="url(#vig)"/>
  </svg>`;
  await svgToPng(svg, file);
}

async function main() {
  // ---- Chapter / hero backgrounds ---------------------------------------
  // Dawn — cool blue turning to warm at the horizon. For "Imagine waking up here"
  await cine('cine-dawn.png',
    [{ o: 0, c: '#0A3550' }, { o: 42, c: '#2A6B87' }, { o: 74, c: '#7FB3B8' }, { o: 100, c: '#F2C79A' }],
    { lightX: 62, lightY: 78, lightColor: '#FFD9A0', lightOpacity: 0.62, vignette: 0.5, angle: 178 });

  // Deep sea — the opener. Almost black at the top, luminous below.
  await cine('cine-deep.png',
    [{ o: 0, c: '#04222F' }, { o: 45, c: '#0A4A63' }, { o: 100, c: '#1B8FA6' }],
    { lightX: 50, lightY: 8, lightColor: '#9FE8F0', lightOpacity: 0.32, vignette: 0.62, angle: 178 });

  // Golden hour — the emotional peak.
  await cine('cine-golden.png',
    [{ o: 0, c: '#2B3B63' }, { o: 32, c: '#B5604C' }, { o: 66, c: '#E89552' }, { o: 100, c: '#FFD79A' }],
    { lightX: 50, lightY: 72, lightColor: '#FFE0A8', lightOpacity: 0.72, vignette: 0.5, angle: 178 });

  // Dusk / slow evening — wine and warm lamplight.
  await cine('cine-dusk.png',
    [{ o: 0, c: '#1E1B2E' }, { o: 40, c: '#4A2B3C' }, { o: 78, c: '#8A4A42' }, { o: 100, c: '#C77A४C'.replace('४','4') }],
    { lightX: 24, lightY: 62, lightColor: '#FFC98A', lightOpacity: 0.55, vignette: 0.6, angle: 168 });

  // Turquoise water — hidden beaches / boat day.
  await cine('cine-water.png',
    [{ o: 0, c: '#0B5E77' }, { o: 40, c: '#159BAF' }, { o: 100, c: '#79DCD8' }],
    { lightX: 70, lightY: 16, lightColor: '#FFFFFF', lightOpacity: 0.34, vignette: 0.5, angle: 162 });

  // Night — for the closing / "only us".
  await cine('cine-night.png',
    [{ o: 0, c: '#050D18' }, { o: 55, c: '#0C2740' }, { o: 100, c: '#1B4A63' }],
    { lightX: 50, lightY: 92, lightColor: '#FFD9A0', lightOpacity: 0.4, vignette: 0.66, angle: 178 });

  // Soft light — for the light "breath" slides between chapters.
  await cine('cine-linen.png',
    [{ o: 0, c: '#FFFDF9' }, { o: 60, c: '#F7F1E6' }, { o: 100, c: '#EDE2D2' }],
    { lightX: 30, lightY: 20, lightColor: '#FFFFFF', lightOpacity: 0.6, vignette: 0.16, angle: 150 });

  // ---- Photo frames -------------------------------------------------------
  // A frame that reads as a deliberate design element: soft tonal field,
  // hairline border, small centred mark. Never says "broken image".
  async function frame(file, w, h, tone, label) {
    const T = {
      water: ['#CFEDEF', '#8FD3D8', '#0E7A8C'],
      dawn:  ['#F3E3D2', '#E5C3A8', '#9A6A55'],
      night: ['#16334A', '#0C2338', '#061524'],
      linen: ['#FBF6EE', '#F0E6D6', '#B9A88F'],
      olive: ['#E4E7D2', '#C7CFA8', '#6F7F4C'],
    }[tone];
    const line = tone === 'night' ? '#FFFFFF' : '#12303B';
    const lineOp = tone === 'night' ? 0.26 : 0.16;
    const txt = tone === 'night' ? '#FFFFFF' : '#12303B';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="f" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stop-color="${T[0]}"/><stop offset="55%" stop-color="${T[1]}"/><stop offset="100%" stop-color="${T[2]}"/>
        </linearGradient>
        <radialGradient id="v" cx="50%" cy="45%" r="72%">
          <stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.2"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#f)"/>
      <rect width="${w}" height="${h}" fill="url(#v)"/>
      <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${line}" stroke-opacity="${lineOp}" stroke-width="2"/>
      <g transform="translate(${w / 2}, ${h / 2 - 14})" opacity="0.42">
        <circle r="26" fill="none" stroke="${txt}" stroke-width="2.5"/>
        <circle r="9" fill="none" stroke="${txt}" stroke-width="2.5"/>
        <path d="M-40 -30 h14 l5 -8 h20 l5 8 h14" fill="none" stroke="${txt}" stroke-width="2.5" stroke-linejoin="round"/>
      </g>
      <text x="${w / 2}" y="${h / 2 + 42}" text-anchor="middle" font-family="Calibri, Arial, sans-serif"
        font-size="17" letter-spacing="2.5" fill="${txt}" fill-opacity="0.55">${label}</text>
    </svg>`;
    await svgToPng(svg, file, w, h);
  }

  await frame('frame-water-full.png', 2560, 1440, 'water', 'YOUR PHOTO HERE');
  await frame('frame-dawn-full.png', 2560, 1440, 'dawn', 'YOUR PHOTO HERE');
  await frame('frame-night-full.png', 2560, 1440, 'night', 'YOUR PHOTO HERE');
  await frame('frame-golden-full.png', 2560, 1440, 'dawn', 'YOUR PHOTO HERE');
  await frame('frame-water-half.png', 1280, 1440, 'water', 'YOUR PHOTO');
  await frame('frame-dawn-half.png', 1280, 1440, 'dawn', 'YOUR PHOTO');
  await frame('frame-water-sq.png', 1000, 1000, 'water', 'PHOTO');
  await frame('frame-dawn-sq.png', 1000, 1000, 'dawn', 'PHOTO');
  await frame('frame-olive-sq.png', 1000, 1000, 'olive', 'PHOTO');
  await frame('frame-night-sq.png', 1000, 1000, 'night', 'PHOTO');
  await frame('frame-linen-sq.png', 1000, 1000, 'linen', 'PHOTO');
  await frame('frame-water-wide.png', 1600, 900, 'water', 'PHOTO');
  await frame('frame-dawn-wide.png', 1600, 900, 'dawn', 'PHOTO');
  await frame('frame-night-wide.png', 1600, 900, 'night', 'PHOTO');
  await frame('frame-olive-wide.png', 1600, 900, 'olive', 'PHOTO');

  // ---- Bottom scrim (transparent → dark), for text over any photo --------
  const scrimSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs><linearGradient id="s" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#04222F" stop-opacity="0.88"/>
      <stop offset="32%" stop-color="#04222F" stop-opacity="0.52"/>
      <stop offset="62%" stop-color="#04222F" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#04222F" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="100" height="100" fill="url(#s)"/></svg>`;
  await svgToPng(scrimSvg, 'scrim-bottom.png');

  // Left-edge scrim, for text sitting on the left over a full-bleed photo
  const scrimLeftSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#04222F" stop-opacity="0.82"/>
      <stop offset="38%" stop-color="#04222F" stop-opacity="0.42"/>
      <stop offset="72%" stop-color="#04222F" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#04222F" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="100" height="100" fill="url(#s)"/></svg>`;
  await svgToPng(scrimLeftSvg, 'scrim-left.png');

  // Full soft darkening, for maximum-contrast statement slides
  const scrimFullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#04222F" fill-opacity="0.42"/></svg>`;
  await svgToPng(scrimFullSvg, 'scrim-full.png');

  // ---- Thin hairline rule (used sparingly, never as a "accent bar") ------
  const ruleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="4">
    <rect width="600" height="4" fill="#FFFFFF" fill-opacity="0.5"/></svg>`;
  await svgToPng(ruleSvg, 'rule-light.png', 600, 4);
  const ruleDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="4">
    <rect width="600" height="4" fill="#12303B" fill-opacity="0.28"/></svg>`;
  await svgToPng(ruleDarkSvg, 'rule-dark.png', 600, 4);

  // ---- Line icons (thin, Apple-ish; drawn not downloaded) ----------------
  async function icon(file, inner, color = '#FFFFFF') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 48 48"
      fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    await svgToPng(svg, file, 240, 240);
  }
  await icon('ic-sun.png', `<circle cx="24" cy="24" r="9"/>
    <path d="M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.5 3.5M33.9 33.9l3.5 3.5M37.4 10.6l-3.5 3.5M14.1 33.9l-3.5 3.5"/>`);
  await icon('ic-wave.png', `<path d="M4 20c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>
    <path d="M4 30c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>`);
  await icon('ic-thermo.png', `<path d="M20 28V10a4 4 0 0 1 8 0v18a8 8 0 1 1-8 0z"/><circle cx="24" cy="36" r="3.5" fill="${'#FFFFFF'}" stroke="none"/>`);
  await icon('ic-people.png', `<circle cx="18" cy="18" r="6"/><path d="M8 38c0-5.5 4.5-10 10-10s10 4.5 10 10"/>
    <circle cx="33" cy="20" r="5"/><path d="M31 29c5 0 9 4 9 9"/>`);
  await icon('ic-coffee.png', `<path d="M10 18h22v10a11 11 0 0 1-22 0z"/><path d="M32 20h4a4 4 0 0 1 0 8h-4"/>
    <path d="M16 10c0 2-2 2-2 4M22 9c0 2-2 2-2 4M28 10c0 2-2 2-2 4"/>`);
  await icon('ic-boat.png', `<path d="M8 32h32l-4 8H12z"/><path d="M24 30V8l12 14H24"/><path d="M20 30V16l-8 14"/>`);
  await icon('ic-moon.png', `<path d="M32 26a12 12 0 0 1-14-16 14 14 0 1 0 14 16z"/>`);
  await icon('ic-heart.png', `<path d="M24 38s-13-8-13-17a7.5 7.5 0 0 1 13-5 7.5 7.5 0 0 1 13 5c0 9-13 17-13 17z"/>`);
  await icon('ic-euro.png', `<path d="M32 14a11 11 0 1 0 0 20"/><path d="M10 21h14M10 27h14"/>`);
  // Paper plane, nose up-right. The fold line is what stops it reading as an arrowhead.
  await icon('ic-plane.png', `<path d="M6 23L43 8 30 42 23 28z"/><path d="M23 28L43 8"/>`);
  await icon('ic-clock.png', `<circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 4"/>`);
  await icon('ic-pin.png', `<path d="M24 42s12-13 12-21a12 12 0 1 0-24 0c0 8 12 21 12 21z"/><circle cx="24" cy="21" r="4.5"/>`);

  // Dark variants, for every icon that ever lands on a light background.
  const DARK = '#12303B';
  await icon('ic-sun-d.png', `<circle cx="24" cy="24" r="9"/>
    <path d="M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.5 3.5M33.9 33.9l3.5 3.5M37.4 10.6l-3.5 3.5M14.1 33.9l-3.5 3.5"/>`, DARK);
  await icon('ic-wave-d.png', `<path d="M4 20c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>
    <path d="M4 30c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>`, DARK);
  await icon('ic-people-d.png', `<circle cx="18" cy="18" r="6"/><path d="M8 38c0-5.5 4.5-10 10-10s10 4.5 10 10"/>
    <circle cx="33" cy="20" r="5"/><path d="M31 29c5 0 9 4 9 9"/>`, DARK);
  await icon('ic-euro-d.png', `<path d="M32 14a11 11 0 1 0 0 20"/><path d="M10 21h14M10 27h14"/>`, DARK);
  await icon('ic-clock-d.png', `<circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 4"/>`, DARK);
  await icon('ic-heart-d.png', `<path d="M24 38s-13-8-13-17a7.5 7.5 0 0 1 13-5 7.5 7.5 0 0 1 13 5c0 9-13 17-13 17z"/>`, DARK);
  await icon('ic-coffee-d.png', `<path d="M10 18h22v10a11 11 0 0 1-22 0z"/><path d="M32 20h4a4 4 0 0 1 0 8h-4"/>
    <path d="M16 10c0 2-2 2-2 4M22 9c0 2-2 2-2 4M28 10c0 2-2 2-2 4"/>`, DARK);
  await icon('ic-boat-d.png', `<path d="M8 32h32l-4 8H12z"/><path d="M24 30V8l12 14H24"/><path d="M20 30V16l-8 14"/>`, DARK);
  await icon('ic-moon-d.png', `<path d="M32 26a12 12 0 0 1-14-16 14 14 0 1 0 14 16z"/>`, DARK);
  await icon('ic-thermo-d.png', `<path d="M20 28V10a4 4 0 0 1 8 0v18a8 8 0 1 1-8 0z"/><circle cx="24" cy="36" r="3.5" fill="${DARK}" stroke="none"/>`, DARK);

  // ---- Minimal island silhouette (for the "where" beat, no labels) --------
  const OUTLINE = 'M308 40 C316 43 327 95 330 118 C333 141 325 181 326 205 C327 229 328 267 338 288 ' +
    'C348 309 386 340 399 356 C412 372 416 388 432 404 C448 420 493 452 512 470 ' +
    'C531 488 556 507 566 528 C576 549 584 601 586 620 C588 639 591 652 578 660 ' +
    'C565 668 519 681 494 674 C469 667 430 622 403 612 C376 602 328 605 300 600 ' +
    'C272 595 219 598 206 580 C193 562 208 494 208 470 C208 446 213 421 205 412 ' +
    'C197 403 160 396 152 408 C144 420 148 476 146 500 C144 524 150 566 140 574 ' +
    'C130 582 94 573 78 558 C62 543 37 492 30 470 C23 448 22 419 26 400 ' +
    'C30 381 43 347 56 336 C69 325 104 324 120 322 C136 320 159 326 172 320 ' +
    'C185 314 203 296 214 282 C225 268 243 240 248 224 C253 208 247 186 250 168 ' +
    'C253 150 264 118 272 100 C280 82 300 37 308 40 Z';
  await svgToPng(
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="760" viewBox="-30 0 680 700">
      <path d="${OUTLINE}" fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="3"/>
    </svg>`, 'island-outline-light.png', 700, 760);
  await svgToPng(
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="760" viewBox="-30 0 680 700">
      <path d="${OUTLINE}" fill="#12303B" fill-opacity="0.07" stroke="#12303B" stroke-opacity="0.4" stroke-width="3"/>
    </svg>`, 'island-outline-dark.png', 700, 760);

  console.log('\nassets →', OUT);
}
main().catch(e => { console.error(e); process.exit(1); });
