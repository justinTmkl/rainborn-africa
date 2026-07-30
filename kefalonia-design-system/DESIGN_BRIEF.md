# Kefalonia Summer — Design Brief

Everything Claude Design needs to build the deck: the art direction, the slide-by-slide
storyboard, the feature list, and the asset shot list. The tokens in `tokens/` and the
components in `src/` are the implementation of this brief — if the two ever disagree, the
tokens win.

**Deck in one line:** a 27-slide, 16:9, English-language talk about seven days on Kefalonia,
built to feel like a travel film rather than a slide show.

**Runtime:** 12–15 minutes speaking. 27 slides across 6 chapters.

---

## 1. Art direction

### The feeling

Midday on a Greek island. High-key, bleached, hot. Whitewashed limestone against water
that is genuinely, implausibly turquoise. Nothing muddy, nothing dark, no black — the
darkest value in the deck is deep sea blue `#06384B`, and it only ever appears as a scrim
under text or as a chapter background.

The reference is Greek tourism photography and Mediterranean editorial layout: enormous
photographs, one idea per page, high-contrast serif headlines, and a lot of empty space
that reads as light rather than as unfinished.

### Palette

| Role | Token | Hex | Where it goes |
| --- | --- | --- | --- |
| Deepest value | `sea.abyss` | `#06384B` | Scrims, overview background. Never large flat areas. |
| Primary blue | `sea.deep` | `#0B5673` | Chapter backgrounds, headline colour on light |
| Mid water | `sea.mid` | `#1187A8` | Eyebrows, links, map ink |
| **Primary accent** | `sea.lagoon` | `#35B8C4` | Meanders, rules, chips, active states |
| Highlight | `sea.myrtos` | `#6FD9DC` | Glows, wave bands, accents on dark |
| Tinted surface | `sea.foam` | `#C7EFEC` | Whole-slide surface for map/phrasebook slides |
| **Canvas** | `stone.whitewash` | `#FDFBF6` | Default slide background. Not pure white. |
| Second surface | `stone.limestone` | `#F4ECDD` | Cards on white, alternating slides |
| Quiet borders | `stone.sand` | `#E7D6B8` | Dividers, table rules |
| Nature accent | `grove.olive` | `#7E8F4E` | Olive sprigs, ratings, island fill |
| **Warm accent** | `sun.core` | `#F6C049` | Chapter numerals, progress, the one thing the eye finds |
| Sun light | `sun.glow` | `#FFE29A` | Sun discs, glint washes |
| Warm structure | `sun.terracotta` | `#C05A38` | Handwritten notes, town pins, Sicily side of the duel |
| Loud accent | `bloom.bougainvillea` | `#D8456E` | Route lines, wrong quiz answers. Once or twice per deck. |
| Food chapter | `bloom.mavrodaphne` | `#6E2438` | Taverna chapter only — it makes that chapter feel like evening |

Rules that keep it coherent:

- **One surface per slide.** White, limestone, foam, sea, sunset, or a photo. Never two.
- **Blue and warm never split a slide 50/50.** One dominates, the other accents.
- **Bougainvillea pink is a spice.** More than two slides using it and the deck goes fairground.
- **Text on photos always gets the scrim** (`gradient.scrim`). No exceptions — a projector in
  a bright room will eat unscrimmed white text alive.

### Typography

- **Display: Cormorant Garamond, light (300).** All headlines. High-contrast, slightly
  classical, does the Mediterranean work without a single stone column in sight.
- **Body: DM Sans.** Everything readable. 21px body, 26px lead — on a 1920 canvas, that is
  legible from the back of a lecture room.
- **Script: Caveat.** Handwritten margin notes. **Exactly one per slide, maximum.** It is
  the deck's warmest device and dies instantly from overuse.
- **Mono: IBM Plex Mono.** Times, coordinates, sea temperature, the score in the duel.
  It signals "this is a real measurement" and stops the deck feeling like a brochure.
- **Greek text is a feature, not decoration.** Chapter titles carry their Greek spelling
  (Βαρκάδα, Στην τάβερνα). Set it in Caveat, small, under the Latin title.
- Never centre body copy. Centre display type only on quote, stats, and closing slides.

### Layout

- Fixed **1920×1080** canvas, scaled to the screen by `DeckShell`. Design once, project anywhere.
- **128px safe gutter.** Nothing but full-bleed media crosses it.
- Text blocks max out at **~900px** wide. Long measures read as a wall.
- Portrait media goes in the **arch** (`radius.arch`) — the shape of every church window on
  the island. Twice per deck; more and it becomes a gimmick.
- Landscape media is either **full bleed** or in a **mosaic**. Never a small rounded rectangle
  centred in white space.

### Motion

The rule: **something is always moving slowly, nothing is ever moving fast.**

| Move | Duration | Where |
| --- | --- | --- |
| Ken Burns push on stills | 18s, alternating | Every still photograph, always |
| Word-by-word headline rise | 140ms stagger | Title slide only |
| Staggered child reveal | 90ms stagger, 640ms each | Lists, grids, cards |
| Route draw | 3.6s | Island map |
| Boat sailing between stops | 900ms per hop | Boat tour |
| Sun sinking below horizon | 4.2s | Closing slide |
| Wave band drift | 22–30s loop | Sea surfaces |
| Sun glint shimmer | 7s loop | Photo and sea slides |

Easing is `swell` (`cubic-bezier(.22,1,.36,1)`) unless you have a reason — it is a wave
arriving on sand, fast then settling. `lift` (slight overshoot) is for pins, chips, and quiz
cards only.

Everything collapses to a plain fade under `prefers-reduced-motion`. Animation gates on the
active slide, so entrances replay every time you arrive and offscreen video never decodes.

### Photo treatment

- Shoot and pick **bright**. If a photo is underexposed, it does not go in the deck.
- One subject per frame. A cluttered holiday snap looks worse at 1920px, not better.
- Prefer horizon lines and water. The deck's rhythm is: wide → detail → wide → face.
- Keep faces in — three or four photos with people in them stop it being a postcard rack.

---

## 2. Deck architecture

Six chapters, 27 slides. The chapter rail at the bottom of every slide shows the audience
where they are, which buys patience for the middle third.

### Chapter 00 · Arrival (slides 1–4)

| # | Component | Content |
| --- | --- | --- |
| 1 | `TitleSlide` | Drone footage of Myrtos from the clifftop road, muted loop. **"Kefalonia"**, subtitle "Seven days on the greenest island in the Ionian", byline "Justin · Summer 2026". Words rise one at a time; sun disc top right; wave band along the bottom. |
| 2 | `PhotoHero` | The first five minutes: heat haze over the airport tarmac or the rental car. Headline "It hits you before you leave the airport", note "36 °C at nine in the evening". Anchor bottom-left. |
| 3 | `IslandMap` | Stylised island, route drawn between the week's stops, pins for Argostoli, Lixouri, Myrtos, Assos, Fiskardo, Sami, Poros. Facts panel: area 781 km², ~36 000 people, highest point Mount Ainos 1 628 m, flight from Hamburg ~3 h. |
| 4 | `Itinerary` | Seven days as a coast road, revealing day by day. Mark the boat day with `accent: true` so the audience knows the good part is coming. |

### Chapter 01 · Exploring the island (slides 5–11)

| # | Component | Content |
| --- | --- | --- |
| 5 | `ChapterDivider` | `01` / "Exploring the island" / Greek "Εξερεύνηση" / blurb about 400 km of driving on roads built for goats. |
| 6 | `SplitSlide` | Argostoli — the Drapano bridge, loggerhead turtles in the harbour at dawn. Media right. Four bullet beats. |
| 7 | `VideoSlide` | Gimbal or dashcam clip of the coast road above Myrtos. Glass caption card, muted. |
| 8 | `CompareSlider` | **Myrtos at noon vs the same frame at sunset.** Drag to wipe. Hand the mouse to someone in the front row. |
| 9 | `ArchGallery` | Three villages in arches: Assos ("a castle and eleven houses"), Fiskardo ("the only village the 1953 earthquake spared"), Sami. |
| 10 | `PhotoMosaic` | Underground and uphill: Melissani cave, Drogarati cave, Mount Ainos summit, the wild horses. Six frames, one wide. |
| 11 | `FactRow` | Three island facts: *Captain Corelli's Mandolin* was filmed here; the 1953 earthquake flattened almost every village except Fiskardo; the katavothres sinkholes swallow seawater that resurfaces 15 km away on the other coast. |

### Chapter 02 · Boat day (slides 12–16)

| # | Component | Content |
| --- | --- | --- |
| 12 | `ChapterDivider` | `02` / "Boat day" / Greek "Βαρκάδα" / "No licence needed. That is either wonderful or terrifying." |
| 13 | `BoatTour` | Four stops with times: 09:00 Argostoli harbour (pick up the boat), 11:30 the blue cave (swim stop), 13:30 a bay with no name (lunch on the anchor), 17:00 back past Lixouri (sunset). Boat sails along the wave as each stop appears. |
| 14 | `VideoSlide` with `audio` | Jumping off the boat. **This is the one clip that plays with sound** — engine, then water. A "Sound on" button so it is your choice, not an accident. |
| 15 | `PhotoHero` | Anchor rope disappearing into turquoise, shot straight down. Note in Caveat: "you can see the anchor at eight metres". |
| 16 | `StatRow` | Boat day in numbers: 41 nautical miles, 4 bays, 26 °C water, 1 sunburnt shoulder. Values count up. |

### Chapter 03 · Beaches (slides 17–20)

| # | Component | Content |
| --- | --- | --- |
| 17 | `ChapterDivider` | `03` / "The beaches" / "Παραλίες". |
| 18 | `QuizSlide` | "Three of these are Kefalonia. Which one is Sardinia?" Four beach photos, click to answer, reveal explains the giveaway. Put this here on purpose — it is exactly where attention dips. |
| 19 | `PhotoMosaic` | Antisamos, Xi (red sand), Petani, Skala, Makris Gialos. Captions name each. |
| 20 | `StatRow` | The week in numbers: 9 beaches, 14 km swum, 7 sunsets, 23 frappés. |

### Chapter 04 · Tavernas (slides 21–24)

| # | Component | Content |
| --- | --- | --- |
| 21 | `ChapterDivider` | `04` / "Where we ate" / "Στην τάβερνα". Shot of a lit taverna terrace at dusk. |
| 22 | `TavernaGrid` | Four tavernas, olive ratings, one must-order dish each, **click a card to flip it** for the insider tip. Cover the range: a harbour place in Fiskardo, a family kitchen in a hill village, a fish taverna in Agia Efimia, the one in Argostoli you went back to twice. |
| 23 | `MenuSlide` | The standout dinner, dish by dish, with Greek names in Caveat. Wine-red wash over a photo of the table. End with the total — a Greek bill is always part of the story. |
| 24 | `Phrasebook` | Five phrases: Καλημέρα / kalimera / good morning; Ευχαριστώ / efharistó / thank you; Ένα φραπέ παρακαλώ / éna frapé parakaló / one frappé please; Πόσο κάνει; / póso káni / how much is it; Στην υγειά μας / stin yiá mas / cheers. **Click a row and the browser says it aloud.** |

### Chapter 05 · Closing (slides 25–27)

| # | Component | Content |
| --- | --- | --- |
| 25 | `IslandDuel` | **Kefalonia vs Sicily** — the bridge to Mischka's talk. Six rows, revealed one at a time, tally building: size (Sicily), water colour (Kefalonia), food range (Sicily), driving (tie — both terrifying), crowds (Kefalonia), volcanoes (Sicily, unbeatable). Verdict in Caveat: "Different holidays. Go to both." |
| 26 | `QuoteSlide` | One line, a lot of air. Something you actually said on the last evening beats a famous quote every time. |
| 27 | `ClosingSlide` | "Efharistó" / "Thank you · ευχαριστώ", the sun sinking below the horizon over four seconds and staying there while you take questions. Credits row: photos, music, and "travelled with —". |

---

## 3. Signature features

The things that make this a talk rather than a slideshow. Each one is already built:

1. **Fixed-canvas scaling.** Designed on 1920×1080, scaled to any projector. What you
   rehearsed is what appears.
2. **Presenter keyboard.** `←` `→` `Space` navigate, `O` opens a slide grid to jump anywhere
   mid-talk, `P` shows the spoken note for the current slide, `S` toggles ambient sound,
   `F` fullscreen. Deep links: `#13` opens on slide 13.
3. **Chapter rail.** A six-segment bar that fills as you move through the story, plus
   `Chapter · 13/27`. Clickable, so questions can send you back a chapter without fumbling.
4. **Presenter notes that never project.** `meta[i].note` is spoken-word prompting, held off
   the slide, toggled with `P`.
5. **Active-slide animation gating.** Entrance animations replay every time you land on a
   slide, and video on other slides never decodes — no stutter on a tired laptop.
6. **Ambient sound bed.** Waves and distant bouzouki, off until you press `S`. One clip
   (slide 14) plays its own audio on purpose.
7. **Drag-to-compare wipe** (slide 8) — the audience's favourite thirty seconds.
8. **Self-drawing map route** (slide 3) and a **boat that sails its own timeline** (slide 13).
9. **Flip cards** on the taverna slide — a reward for the people watching closely.
10. **Audience quiz** (slide 18) placed exactly where attention dips.
11. **Speaking phrasebook** (slide 24) — click a Greek phrase, hear it.
12. **Counting numbers** on both stat slides.
13. **The Sicily duel** (slide 25) — turns two separate presentations into one afternoon.
14. **Reduced-motion and projector safety.** Every animation collapses to a fade; every
    text-on-photo gets a scrim; the darkest value is never black.

---

## 4. Asset shot list

Gather these into `assets/`. Names are what the deck expects. **Your own trip photos and
video always beat any stand-in** — swap them in the moment you have them; the brief below is
for shooting your own list and for what `preview/deck.html` uses meanwhile.

**Video (mp4, H.264, 1920×1080, ≤ 12 s, silent unless noted):**

| File | Shot |
| --- | --- |
| `myrtos-aerial.mp4` | Myrtos bay from the clifftop road. The title slide lives on this. |
| `coast-road.mp4` | Driving the corniche — gimbal out the window or dashcam. |
| `boat-jump.mp4` | Someone going off the boat. **Keep the audio.** |
| `taverna-evening.mp4` | Optional: a terrace at dusk, glasses and low light. |

**Photographs (JPEG, ≥ 2400px on the long edge, bright):**

Argostoli harbour at dawn · the Drapano bridge · Myrtos at noon **and** the same frame at
sunset (same position — this pair is the compare slider, so shoot it deliberately) · Assos
village and its castle · Fiskardo harbour · Sami · Melissani cave with the light shaft ·
Drogarati cave · Mount Ainos with the wild horses · the anchor rope in turquoise water ·
four bays from the boat day · five beaches (Antisamos, Xi, Petani, Skala, Makris Gialos) ·
four tavernas (exterior or table) · the standout dinner table · a last-evening sunset.

Plus **three decoy beach photos** that are not Kefalonia, for the quiz.

**Audio:** `ambient-waves.mp3` — waves with faint bouzouki, loopable, 60–120 s.

Missing assets are not a blocker. Every component renders with text alone, and a slide with
a good line and no photo beats a slide with a bad photo.

### 4.1 Real photos currently wired into `preview/deck.html`

Until your own photos are in, the preview uses real Wikimedia Commons photographs — not
illustrations — loaded straight from Commons via each file's stable `Special:FilePath` link
(the same mechanism Wikipedia's own apps use, so a valid filename always resolves to the
current image; the failure mode for a bad filename is a blank slot, not a wrong photo).

**Important:** these were sourced by an agent that could search Commons but not open pages,
so licences and photographer names below are the best available read, not independently
re-verified by opening each file page. Kefalonia is a real place either of us could visit —
before this deck leaves your laptop, click through each link once and confirm the licence
tag matches what's here. That's a five-minute pass, not a redesign.

| Used for | File (Commons) | Licence (unverified where noted) | Credit |
| --- | --- | --- | --- |
| Title slide, compare-slider "midday" | Myrtos Beach, Kefalonia.jpg | CC BY 2.0 | Matt Sims |
| Chapter divider "Exploring the island" | Mount-Aenos.JPG | CC BY-SA 2.5 | *author not recovered — verify* |
| Compare-slider "sunset", boat stop 17:00, closing slide | Sunset, Kefalonia (8104570279).jpg | *unconfirmed* | *verify on page* |
| Arch gallery + taverna "Tassia" | Fiskardo, Kefalonia.jpg | likely PD (old Wikipedia transfer) | *author not recovered — verify* |
| Arch gallery + taverna "Paradise" | Waterfront in Sami on Kefalonia.jpg | *unconfirmed* | *verify on page* |
| Boat stop 09:00, taverna "Casa Grec" | De Bosset Bridge.JPG | CC BY-SA 3.0 | Evangelia Papanastasatou (Saintfevrier) |
| Boat stop 11:30 ("Melissani cave") | Melissani Cave, Kefalonia 1.jpg | CC BY 2.0 | Matt Sims |
| Boat stop 13:30 | Petani beach-kefalonia.JPG | CC BY 3.0 | *verify exact name on page* |
| Quiz option A | Skala, Kefalonia1.jpg | *unconfirmed* | *verify on page* |
| Quiz option B (the decoy — Sardinia, not Kefalonia) | Beach of Platamona, Sardinia.jpg | CC BY-SA 3.0 | Zxasqw80 |
| Quiz option C | Kafalonia Paralia Xi.jpg | CC BY-SA 3.0 | AlMare |
| Quiz option D | Sailing at Kefalonia (Greece).jpg | CC BY 2.0 | Flickr user Paul_Naturist |
| Taverna "To Perasma" | Babulas Taverna, Mykonos, Greece (29741939366).jpg | likely CC BY 2.0 | Flickr user mustangjoe — **this one is Mykonos, not Kefalonia; it's standing in for "a taverna terrace," not documenting a specific place** |
| Island-map background | Kefallonia IthakiWW.jpg | Public domain | NASA World Wind |

**Not found with a confirmed licence — currently an honest "add your photo" placeholder, or
dropped from the copy rather than faked:** Assos village and its castle (the arch-gallery
slot shows a plain empty-frame card, not a fake), Mount Ainos's wild horses, a close-up
anchor/chain shot, genuine drone footage of the coastline, and a Kefalonia-specific
whitewashed archway. None of these block the deck — they're exactly the shots worth taking
yourself, since your own photo of Assos beats any stock photo of it anyway.

If you open the preview and a specific image looks wrong (broken, mislabelled, or the
licence doesn't check out on the Commons page), that's a one-line fix — say which slot and
it gets swapped or pulled back to a placeholder.

---

## 5. Accessibility and room-proofing

- Body text never below 21px on the 1920 canvas (≈ 12pt projected).
- Text on photos: scrim always, and check contrast against the *brightest* part of the image,
  not the average.
- Every animation has a reduced-motion fallback.
- Every interactive element is a real `<button>` and reachable by keyboard.
- Colour never carries meaning alone — the duel marks winners with a `◆`, not just a hue.
- The deck works with the projector's sound muted. Nothing important is audio-only.

---

## 6. Prompt for Claude Design

Paste this into Claude Design once the design system is synced. It assumes the system is
available; the storyboard above is the detail it will follow.

> Build a 27-slide, 16:9 presentation called **"Kefalonia — Seven days on the greenest island
> in the Ionian"** using the **Kefalonia Summer** design system. English throughout.
>
> Use the system's tokens and slide components exactly as defined — do not invent new colours,
> fonts, or shadow values, and do not restyle headings ad hoc. Six chapters: Arrival,
> Exploring the island, Boat day, The beaches, Tavernas, Closing. Follow the slide-by-slide
> storyboard in `DESIGN_BRIEF.md` §2, one component per slide as listed.
>
> Non-negotiables: every still photo gets a slow Ken Burns push; every text block over a photo
> gets the scrim gradient; one surface per slide; the handwritten Caveat note appears at most
> once per slide; the darkest value in the deck is `#06384B`, never black.
>
> Interactive features to keep working: the drag-to-compare wipe on Myrtos, the self-drawing
> map route, the boat sailing its timeline, the flip cards on the taverna slide, the audience
> quiz, the speaking Greek phrasebook, and the counting numbers on both stat slides.
>
> The closing chapter includes a **Kefalonia vs Sicily** comparison slide — my girlfriend
> Mischka is presenting Sicily right after me, so this slide should be generous to Sicily and
> end on "different holidays, go to both", not on a winner.
>
> Where a photo or clip is missing, use a placeholder that matches the palette and leave the
> caption in place. Don't leave an empty frame.

---

## 7. Handing the palette to the Sicily deck

Mischka's Sicily talk follows this one, and two decks in a row look accidental unless they
either match or deliberately don't. The cleanest split: **same bones, different heat.**

Keep from this system: the 1920 canvas, Cormorant + DM Sans, the 128px gutter, the motion
durations, the chapter rail, the scrim rule.

Swap the palette: Kefalonia is turquoise and limestone; Sicily is volcanic — Etna basalt
`#2E2A2B`, Sicilian ceramic yellow `#E8B22E`, prickly-pear green `#5E7A4A`, blood-orange
`#D4562B`, and the same warm off-white canvas. Both decks then read as one afternoon with
two different climates, and slide 25 works from either side of the stage.
