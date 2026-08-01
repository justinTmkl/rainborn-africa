/* ============================================================================
   KEFALONIA — a keynote, not a travel report.
   Goal: she should end up wanting to go, without ever being argued with.

   Structure (24 slides, ~9 min):
     ACT I   · The hook           1–4     a question, not a destination
     ACT II  · The days           5–15    seven emotional chapters, one feeling each
     ACT III · The window         16–19   why late September, framed as luck
     ACT IV  · The ask            20–24   the plan, the price, the yes

   Design rules held throughout:
     · one idea per slide, max ~12 words on emotional slides
     · type: Cambria display (safe-list serif) + Calibri body — both ship with Office
     · full-bleed image or gradient on every slide; no floating boxes on white
     · white type always sits on a scrim, never raw on a photo
     · one accent (warm gold) — never more than one loud colour per slide
     · no bullets anywhere, no accent stripes, no clip art
   ========================================================================== */

const pptxgen = require('pptxgenjs');
const path = require('path');
const A = (f) => path.join(__dirname, 'assets', f);

const C = {
  ink: '12303B', inkSoft: '3E5A66', inkMute: '77909B',
  cream: 'FBF6EE', white: 'FFFFFF',
  gold: 'F0B849', goldSoft: 'FFDFA0',
  sea: '0E7A8C', seaDeep: '04222F',
  clay: 'C0714C', olive: '7E8F4E',
  markLight: 'A6BDC6', // white knocked back over a dark photo, pre-blended
  ember: '4A2A18',     // warm near-black — the only type that reads on the sunset glow
};
const DISPLAY = 'Cambria';
const BODY = 'Calibri';
const MONO = 'Courier New';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
const PW = 13.333, PH = 7.5;
const M = 1.0; // generous outer margin — whitespace is the point

pres.defineSlideMaster({ title: 'k', background: { color: C.cream }, objects: [] });
const newSlide = (notes) => {
  const s = pres.addSlide({ masterName: 'k' });
  if (notes) s.addNotes(notes);
  return s;
};

// ---------------------------------------------------------------- helpers
const full = (s, img) => s.addImage({ path: A(img), x: 0, y: 0, w: PW, h: PH });
const scrimBottom = (s) => s.addImage({ path: A('scrim-bottom.png'), x: 0, y: 0, w: PW, h: PH });
const scrimLeft = (s) => s.addImage({ path: A('scrim-left.png'), x: 0, y: 0, w: PW, h: PH });
const scrimFull = (s) => s.addImage({ path: A('scrim-full.png'), x: 0, y: 0, w: PW, h: PH });

/** Small all-caps label. Used at most once per slide. */
function kicker(s, text, opts = {}) {
  s.addText(text.toUpperCase(), {
    x: opts.x ?? M, y: opts.y ?? 0.85, w: opts.w ?? 8, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, charSpacing: 4,
    color: opts.color ?? C.gold, align: opts.align ?? 'left', margin: 0,
  });
}
/** The one big line on the slide. */
function statement(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? M, y: opts.y ?? 2.4, w: opts.w ?? 9.6, h: opts.h ?? 2.2,
    fontFace: DISPLAY, fontSize: opts.size ?? 54, color: opts.color ?? C.white,
    align: opts.align ?? 'left', valign: opts.valign ?? 'middle', margin: 0,
    lineSpacingMultiple: opts.lsm ?? 1.08, italic: opts.italic ?? false,
  });
}
/** Quiet supporting line. Never more than two of these per slide. */
function sub(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? M, y: opts.y ?? 4.9, w: opts.w ?? 8.2, h: opts.h ?? 0.9,
    fontFace: BODY, fontSize: opts.size ?? 17, color: opts.color ?? C.white,
    align: opts.align ?? 'left', margin: 0, lineSpacingMultiple: 1.35,
    transparency: opts.t ?? 12,
  });
}
function hairline(s, opts = {}) {
  s.addImage({ path: A(opts.dark ? 'rule-dark.png' : 'rule-light.png'),
    x: opts.x ?? M, y: opts.y ?? 2.15, w: opts.w ?? 1.1, h: 0.028 });
}
/** Bottom-left slide mark. Deliberately tiny — orientation, not decoration.
    The dimming is baked into the colour rather than set with `transparency`:
    letter-spaced runs that also carry an alpha get clipped mid-glyph on PDF
    export, because the transparency group is measured without the spacing. */
function mark(s, text, light = true) {
  s.addText(text.toUpperCase(), {
    x: M, y: PH - 0.62, w: 9, h: 0.28, fontFace: BODY, fontSize: 9.5, charSpacing: 2.5,
    color: light ? C.markLight : C.inkMute, margin: 0,
  });
}

/* =============================================================== ACT I ==== */

// 1 · Cold open. No title, no place name. Just a question in the dark.
{
  const s = newSlide('Sag nichts. Lass die Folie 4 Sekunden stehen, bevor du weitersprichst.');
  full(s, 'cine-deep.png');
  statement(s, 'Can I show you\nsomething?', { y: 2.5, h: 2.4, size: 62, w: 10 });
  mark(s, 'september 2026');
}

// 2 · The real question. Still no destination.
{
  const s = newSlide('Das ist die eigentliche Frage. Sie darf kurz nachdenken.');
  full(s, 'cine-linen.png');
  statement(s, 'What do you actually want\nfrom a week off?', {
    y: 2.3, h: 2.4, size: 50, color: C.ink, w: 10.5,
  });
  sub(s, 'Not a checklist. A feeling.', { y: 4.7, color: C.inkSoft, t: 0, size: 19 });
  mark(s, '', false);
}

// 3 · Full-bleed photo. The first glimpse. Still unnamed.
{
  const s = newSlide('Erst jetzt das erste Bild. Noch immer kein Ortsname.');
  full(s, 'frame-water-full.png');
  scrimBottom(s);
  statement(s, 'This place is three hours away.', { y: 4.6, h: 1.0, size: 44, w: 11 });
  sub(s, 'We have never been. That is the point.', { y: 5.6, size: 17 });
  mark(s, 'ionian sea');
}

// 4 · Name it. One word, enormous, centred. Apple-style reveal.
{
  const s = newSlide('Jetzt der Name. Ein Wort. Lass es wirken.');
  full(s, 'cine-dawn.png');
  scrimFull(s);
  s.addText('Kefalonia', {
    x: 0, y: 2.6, w: PW, h: 1.6, fontFace: DISPLAY, fontSize: 96,
    color: C.white, align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('K E F A L O N I Á', {
    x: 0, y: 4.35, w: PW, h: 0.4, fontFace: BODY, fontSize: 12, charSpacing: 6,
    color: C.goldSoft, align: 'center', margin: 0,
  });
  s.addImage({ path: A('island-outline-light.png'), x: 11.15, y: 0.75, w: 1.35, h: 1.47 });
}

/* ============================================================== ACT II ==== */

// 5 · Chapter card: the seven days, as feelings not activities.
{
  const s = newSlide('Kurzer Überblick — aber als Gefühle, nicht als Programm.');
  full(s, 'cine-linen.png');
  kicker(s, 'Seven days', { color: C.clay, y: 1.0 });
  statement(s, 'Not an itinerary.\nSeven feelings.', { y: 1.5, h: 1.9, size: 46, color: C.ink, w: 9 });

  // Dark icons — these cards sit on the light linen background.
  const days = [
    ['ic-coffee-d.png', 'Morning coffee'], ['ic-wave-d.png', 'Hidden beaches'], ['ic-boat-d.png', 'Boat day'],
    ['ic-sun-d.png', 'Golden hour'], ['ic-moon-d.png', 'Slow evenings'], ['ic-clock-d.png', 'No plans'],
    ['ic-heart-d.png', 'Only us'],
  ];
  const colW = 1.55, gap = 0.19, startX = M;
  days.forEach(([ic, label], i) => {
    const x = startX + i * (colW + gap);
    s.addShape('roundRect', { x, y: 4.05, w: colW, h: 1.9, rectRadius: 0.09,
      fill: { color: C.white }, line: { color: C.ink, transparency: 88, width: 0.75 } });
    s.addImage({ path: A(ic), x: x + colW / 2 - 0.18, y: 4.4, w: 0.36, h: 0.36 });
    s.addText(label, { x: x + 0.1, y: 4.95, w: colW - 0.2, h: 0.75, fontFace: BODY, fontSize: 11.5,
      color: C.ink, align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.2 });
  });
  s.addText('One of these is a boat. The rest are just… time.', {
    x: M, y: 6.25, w: 9, h: 0.4, fontFace: BODY, fontSize: 14, italic: true, color: C.inkMute, margin: 0,
  });
}

// 6 · IMAGINE WAKING UP HERE — the emotional centrepiece of Act II
{
  const s = newSlide('Langsam vorlesen. Dann still sein.');
  full(s, 'frame-dawn-full.png');
  scrimLeft(s);
  kicker(s, 'Day one · 07:40', { y: 1.95 });
  statement(s, 'Imagine waking up\nhere.', { y: 2.4, h: 2.3, size: 50, w: 7.4 });
  sub(s, 'No alarm. The shutters are open. It is already warm.', { y: 5.0, w: 6.6, size: 17 });
  mark(s, 'morning coffee');
}

// 7 · Morning coffee — sensory detail, almost no text
{
  const s = newSlide('Details verkaufen mehr als Superlative.');
  s.addImage({ path: A('frame-dawn-half.png'), x: 0, y: 0, w: PW / 2, h: PH });
  s.addImage({ path: A('cine-linen.png'), x: PW / 2, y: 0, w: PW / 2, h: PH });
  const rx = PW / 2 + 0.9;
  s.addImage({ path: A('ic-coffee-d.png'), x: rx, y: 1.55, w: 0.42, h: 0.42 });
  statement(s, 'Coffee at 8.\nNobody waiting\nfor us.', {
    x: rx, y: 2.25, h: 2.4, size: 42, color: C.ink, w: 5.0, lsm: 1.12,
  });
  s.addText('The frappé is €2.80 and takes twenty minutes to drink, because there is no reason to hurry.', {
    x: rx, y: 4.85, w: 5.0, h: 1.2, fontFace: BODY, fontSize: 15, color: C.inkSoft,
    margin: 0, lineSpacingMultiple: 1.4,
  });
}

// 8 · Guess the place — the first interactive beat, placed early while attention is high
{
  const s = newSlide('Interaktiv: sie tippt. Beide Bilder sind Kefalonia — das ist der Witz.');
  full(s, 'cine-water.png');
  kicker(s, 'Guess the place', { y: 0.9 });
  statement(s, 'One of these is the Caribbean.', { y: 1.35, h: 0.9, size: 40, w: 11 });
  s.addImage({ path: A('frame-water-wide.png'), x: M, y: 2.55, w: 5.5, h: 3.1 });
  s.addImage({ path: A('frame-water-wide.png'), x: M + 5.83, y: 2.55, w: 5.5, h: 3.1 });
  s.addText('A', { x: M + 0.2, y: 2.75, w: 0.5, h: 0.45, fontFace: BODY, fontSize: 17, bold: true,
    color: C.white, margin: 0 });
  s.addText('B', { x: M + 6.03, y: 2.75, w: 0.5, h: 0.45, fontFace: BODY, fontSize: 17, bold: true,
    color: C.white, margin: 0 });
  s.addText('Neither. Both are twenty minutes from the airport.', {
    x: M, y: 5.95, w: 11, h: 0.5, fontFace: DISPLAY, fontSize: 24, italic: true,
    color: C.goldSoft, margin: 0,
  });
  mark(s, 'hidden beaches');
}

// 9 · Hidden beaches — the "empty" promise, stated as scarcity not as a brag
{
  const s = newSlide('Der Kern: leer. Nicht "schön" — leer.');
  full(s, 'frame-water-full.png');
  scrimBottom(s);
  statement(s, 'Some of these have no name\nand no road.', { y: 4.15, h: 1.4, size: 42, w: 10.5 });
  sub(s, 'You park, you walk eleven minutes, and it is yours for the afternoon.', { y: 5.65, size: 17 });
  mark(s, 'hidden beaches');
}

// 10 · Boat day — one hero line, no timetable
{
  const s = newSlide('KEIN Zeitplan mehr. Nur das Gefühl.');
  full(s, 'cine-water.png');
  scrimBottom(s);
  s.addImage({ path: A('ic-boat.png'), x: M, y: 1.5, w: 0.5, h: 0.5 });
  statement(s, 'In Greece you can rent a boat\nwithout a licence.', { y: 2.35, h: 1.5, size: 44, w: 10.5 });
  sub(s, 'Which means one day is entirely ours — no guide, no group, no schedule.', {
    y: 3.95, w: 9, size: 18,
  });
  s.addText('Captain: whoever is less hungover.', {
    x: M, y: 5.6, w: 8, h: 0.45, fontFace: DISPLAY, fontSize: 22, italic: true, color: C.goldSoft, margin: 0,
  });
  mark(s, 'boat day');
}

// 11 · Golden hour — the peak. Type is tiny, image is everything.
{
  const s = newSlide('Nichts sagen. Zehn Sekunden. Das ist der emotionale Höhepunkt.');
  full(s, 'cine-golden.png');
  // The type sits in the brightest part of the glow, so it has to go dark, not
  // white — a warm near-black keeps the slide cinematic instead of washing out.
  s.addText('Golden hour', {
    x: 0, y: 5.55, w: PW, h: 0.5, fontFace: DISPLAY, fontSize: 30, color: C.ember,
    align: 'center', margin: 0,
  });
  s.addText('lasts about forty minutes here', {
    x: 0, y: 6.08, w: PW, h: 0.35, fontFace: BODY, fontSize: 14, color: C.ember,
    align: 'center', margin: 0, transparency: 25,
  });
}

// 12 · Slow evenings
{
  const s = newSlide('Abende. Ruhig, warm, ohne Programm.');
  full(s, 'cine-dusk.png');
  scrimLeft(s);
  kicker(s, 'Slow evenings' , { y: 2.3 });
  statement(s, 'Dinner starts at nine\nand ends when it ends.', { y: 2.75, h: 2.0, size: 44, w: 7.8 });
  sub(s, 'The bill takes an hour to arrive. That is not bad service — that is the whole idea.', {
    y: 4.9, w: 6.8, size: 17,
  });
  mark(s, 'slow evenings');
}

// 13 · No stress — negative space as the message
{
  const s = newSlide('Diese Folie ist absichtlich fast leer.');
  full(s, 'cine-linen.png');
  s.addText('No transfers.\nNo queues.\nNo “we should probably also see…”', {
    x: M, y: 2.4, w: 10.5, h: 2.6, fontFace: DISPLAY, fontSize: 40, color: C.ink,
    margin: 0, lineSpacingMultiple: 1.35,
  });
  hairline(s, { y: 5.35, dark: true, w: 1.1 });
  s.addText('One island. One car. One week.', {
    x: M, y: 5.6, w: 8, h: 0.4, fontFace: BODY, fontSize: 16, color: C.inkSoft, margin: 0,
  });
}

// 14 · Only us — the relationship slide. This is the real argument.
{
  const s = newSlide('Das ist das eigentliche Argument. Ruhig sprechen.');
  full(s, 'cine-night.png');
  s.addImage({ path: A('ic-heart.png'), x: PW / 2 - 0.25, y: 1.95, w: 0.5, h: 0.5, transparency: 30 });
  s.addText('We have not had\nseven uninterrupted days\nsince 2023.', {
    x: 1.5, y: 2.75, w: 10.3, h: 2.4, fontFace: DISPLAY, fontSize: 42, color: C.white,
    align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.25,
  });
  s.addText('That is what I actually want to book.', {
    x: 0, y: 5.4, w: PW, h: 0.45, fontFace: BODY, fontSize: 17, color: C.goldSoft,
    align: 'center', margin: 0,
  });
  mark(s, 'only us');
}

// 15 · Create memories — a light, warm human beat before Act III
{
  const s = newSlide('Kleiner Humor-Moment. Auflockern vor den Fakten.');
  full(s, 'cine-linen.png');
  kicker(s, 'Create memories', { color: C.clay, y: 1.05 });
  statement(s, 'Things we will still\nbe quoting in five years:', { y: 1.55, h: 1.6, size: 38, color: C.ink, w: 9.5 });

  const quotes = [
    ['“It is only a small hill.”', 'said before the 40-minute climb'],
    ['“We do not need the big boat.”', 'said before the wind picked up'],
    ['“One more frappé and we go.”', 'said four frappés ago'],
  ];
  quotes.forEach(([q, note], i) => {
    const y = 3.55 + i * 1.05;
    // Both boxes share y/h and centre their text, so quote and aside sit on one line.
    s.addText(q, { x: M, y, w: 7.4, h: 0.5, fontFace: DISPLAY, fontSize: 25, italic: true,
      color: C.ink, margin: 0, valign: 'middle' });
    s.addText(note, { x: M + 7.5, y, w: 3.9, h: 0.5, fontFace: BODY, fontSize: 13,
      color: C.inkMute, margin: 0, valign: 'middle' });
  });
}

/* ============================================================= ACT III ==== */

// 16 · The window opens — reframe late September as luck, not compromise
{
  const s = newSlide('Jetzt der Wechsel: von Gefühl zu "und es passt auch noch perfekt".');
  full(s, 'cine-deep.png');
  kicker(s, 'One more thing', { y: 2.5 });
  statement(s, 'There is a two-week window\nwhen this island is at its best.', {
    y: 2.95, h: 1.8, size: 44, w: 10.5,
  });
  sub(s, 'It happens to be the end of September.', { y: 4.85, size: 19 });
}

// 17 · The four numbers — the only data slide in the deck
{
  const s = newSlide('Vier Zahlen. Mehr nicht. Jede einzeln kurz benennen.');
  full(s, 'cine-linen.png');
  kicker(s, 'Late September', { color: C.clay, y: 1.0 });
  statement(s, 'Still summer. Without the summer.', { y: 1.45, h: 0.9, size: 40, color: C.ink, w: 10 });

  const stats = [
    ['ic-sun-d.png', '26°', 'in the afternoon', 'warm, not punishing'],
    ['ic-thermo.png', '25°', 'the sea', 'warmer than in June'],
    ['ic-people-d.png', '−60%', 'visitors', 'against August'],
    ['ic-euro-d.png', '−35%', 'flights & stays', 'same island, off-peak'],
  ];
  const cw = 2.6, gap = 0.35, startX = M + 0.15;
  stats.forEach(([ic, big, label, note], i) => {
    const x = startX + i * (cw + gap);
    s.addImage({ path: A(ic.includes('-d') ? ic : ic), x, y: 3.0, w: 0.4, h: 0.4 });
    s.addText(big, { x, y: 3.5, w: cw, h: 1.0, fontFace: DISPLAY, fontSize: 60, color: C.ink, margin: 0 });
    s.addText(label, { x, y: 4.55, w: cw, h: 0.3, fontFace: BODY, fontSize: 14, bold: true,
      color: C.ink, margin: 0 });
    s.addText(note, { x, y: 4.85, w: cw, h: 0.5, fontFace: BODY, fontSize: 12.5, color: C.inkMute,
      margin: 0, lineSpacingMultiple: 1.25 });
  });
  s.addText('Numbers are averages for late September, Kefalonia — swap in whatever you find when you check.', {
    x: M, y: 6.35, w: 11.3, h: 0.35, fontFace: BODY, fontSize: 10.5, color: C.inkMute, margin: 0,
  });
}

// 18 · Before / after — August vs late September, as a feeling
{
  const s = newSlide('Vorher/Nachher. Nicht Sizilien vs Kefalonia — August vs September.');
  full(s, 'cine-linen.png');
  kicker(s, 'The same beach', { color: C.clay, y: 0.95 });
  statement(s, 'Two weeks apart.', { y: 1.4, h: 0.8, size: 40, color: C.ink, w: 8 });

  s.addImage({ path: A('frame-water-wide.png'), x: M, y: 2.5, w: 5.5, h: 3.1 });
  s.addImage({ path: A('frame-dawn-wide.png'), x: M + 5.83, y: 2.5, w: 5.5, h: 3.1 });
  // Labels flush with the left edge of the image they belong to, and with the line below.
  s.addText('MID-AUGUST', { x: M, y: 5.75, w: 3, h: 0.3, fontFace: BODY, fontSize: 11.5,
    bold: true, charSpacing: 3, color: C.inkMute, margin: 0 });
  s.addText('LATE SEPTEMBER', { x: M + 5.83, y: 5.75, w: 3.2, h: 0.3, fontFace: BODY, fontSize: 11.5,
    bold: true, charSpacing: 3, color: C.clay, margin: 0 });
  s.addText('Same water temperature. A third of the people.', {
    x: M, y: 6.2, w: 11, h: 0.4, fontFace: DISPLAY, fontSize: 22, italic: true, color: C.ink, margin: 0,
  });
}

// 19 · The 7-day plan — visual, low-text, one line per day
{
  const s = newSlide('Der Plan. Bewusst locker formuliert — nichts ist in Stein.');
  full(s, 'cine-linen.png');
  kicker(s, 'If we went', { color: C.clay, y: 0.95 });
  statement(s, 'Seven days, loosely.', { y: 1.4, h: 0.8, size: 40, color: C.ink, w: 8 });

  const plan = [
    ['SAT', 'Land at four. Swim before dinner.'],
    ['SUN', 'The beach nobody drives to.'],
    ['MON', 'Boat day.'],
    ['TUE', 'Nothing. Deliberately.'],
    ['WED', 'The cave, then the long way home.'],
    ['THU', 'Also nothing. Also deliberately.'],
    ['FRI', 'Last swim. Late flight.'],
  ];
  // The two empty days are the ones we accent — they are the actual argument.
  const empty = (i) => i === 3 || i === 5;
  plan.forEach(([d, t], i) => {
    const y = 2.55 + i * 0.56;
    s.addText(d, { x: M, y, w: 0.85, h: 0.42, fontFace: MONO, fontSize: 13, bold: true,
      color: empty(i) ? C.clay : C.inkMute, margin: 0, valign: 'middle' });
    s.addText(t, { x: M + 1.0, y, w: 9.5, h: 0.42, fontFace: DISPLAY,
      fontSize: empty(i) ? 26 : 23,
      color: empty(i) ? C.ink : C.inkSoft, margin: 0, valign: 'middle' });
  });
  s.addText('Two of these days have nothing in them. On purpose.', {
    x: M, y: 6.6, w: 10, h: 0.35, fontFace: BODY, fontSize: 13, italic: true, color: C.inkMute, margin: 0,
  });
}

/* ============================================================== ACT IV ==== */

// 20 · The honest slide — pre-empts doubt without naming Sicily
{
  const s = newSlide('Ehrlichkeit schafft Vertrauen. Sizilien wird NICHT genannt.');
  full(s, 'cine-linen.png');
  statement(s, 'It is a small island.', { y: 2.0, h: 0.9, size: 44, color: C.ink, w: 9 });
  s.addText('There is no big city. No famous museum. Nothing you have to see.', {
    x: M, y: 3.1, w: 9.6, h: 0.9, fontFace: BODY, fontSize: 20, color: C.inkSoft,
    margin: 0, lineSpacingMultiple: 1.4,
  });
  hairline(s, { y: 4.35, dark: true, w: 1.1 });
  s.addText('That is the entire reason I want to go.', {
    x: M, y: 4.65, w: 9.6, h: 0.9, fontFace: DISPLAY, fontSize: 34, color: C.ink, margin: 0,
  });
}

// 21 · Only if — the permission slide. Gives her the way out, which is what makes it work.
{
  const s = newSlide('Wichtigste Folie psychologisch: du gibst ihr die Kontrolle zurück.');
  full(s, 'cine-deep.png');
  statement(s, 'And if you would rather\ngo somewhere else —', { y: 2.35, h: 1.7, size: 42, w: 10 });
  s.addText('then we go somewhere else, and I will build that deck too.', {
    x: M, y: 4.2, w: 9.6, h: 0.8, fontFace: BODY, fontSize: 19, color: C.white,
    margin: 0, transparency: 15,
  });
  s.addText('I just wanted you to see this one first.', {
    x: M, y: 5.15, w: 9.6, h: 0.6, fontFace: DISPLAY, fontSize: 26, italic: true,
    color: C.goldSoft, margin: 0,
  });
}

// 22 · The ask — concrete, small, easy to say yes to
{
  const s = newSlide('Der eigentliche Call to Action. Klein halten — nicht "buchen wir", sondern "schauen wir".');
  full(s, 'cine-golden.png');
  scrimFull(s);
  kicker(s, 'The plan', { y: 1.75, color: C.white });
  statement(s, 'Sat 20 – Sat 27 September.', { y: 2.2, h: 1.0, size: 48, w: 11 });

  const bits = [
    ['ic-plane.png', 'Direct, about 3 hours'],
    ['ic-clock.png', 'Seven nights'],
    ['ic-euro.png', 'Roughly €780 each, all in'],
  ];
  bits.forEach(([ic, t], i) => {
    const y = 3.6 + i * 0.62;
    s.addImage({ path: A(ic), x: M, y: y + 0.03, w: 0.32, h: 0.32 });
    s.addText(t, { x: M + 0.55, y, w: 9, h: 0.4, fontFace: BODY, fontSize: 18, color: C.white,
      margin: 0, valign: 'middle' });
  });
  s.addText('Prices are what I found last week — worth re-checking before anything is booked.', {
    x: M, y: 5.75, w: 11, h: 0.35, fontFace: BODY, fontSize: 11, color: C.white,
    transparency: 28, margin: 0,
  });
}

// 23 · The yes — one line, nothing else on the slide
{
  const s = newSlide('Nichts sagen. Sie soll antworten, nicht du.');
  full(s, 'cine-night.png');
  s.addText('Shall we?', {
    x: 0, y: 3.0, w: PW, h: 1.5, fontFace: DISPLAY, fontSize: 84, color: C.white,
    align: 'center', valign: 'middle', margin: 0,
  });
  s.addText('The flights are open in another tab.', {
    x: 0, y: 4.65, w: PW, h: 0.4, fontFace: BODY, fontSize: 15, color: C.goldSoft,
    align: 'center', margin: 0,
  });
}

// 24 · Hold frame — stays up while you talk. No "thank you".
{
  const s = newSlide('Diese Folie bleibt stehen. Kein "Danke" — das beendet das Gespräch.');
  full(s, 'frame-golden-full.png');
  scrimBottom(s);
  s.addText('Kefalonia', {
    x: M, y: 5.45, w: 8, h: 0.7, fontFace: DISPLAY, fontSize: 38, color: C.white, margin: 0,
  });
  s.addText('20 – 27 September', {
    x: M, y: 6.1, w: 8, h: 0.4, fontFace: BODY, fontSize: 15, charSpacing: 2,
    color: C.goldSoft, margin: 0,
  });
}

pres.writeFile({ fileName: path.join(__dirname, 'Kefalonia-Keynote.pptx') })
  .then(() => console.log('written: 24 slides'))
  .catch(e => { console.error(e); process.exit(1); });
