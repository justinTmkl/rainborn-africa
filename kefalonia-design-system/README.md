# Kefalonia Summer — a design system for one presentation

A Mediterranean deck system: sun, sea, limestone, olive. Built so Claude Design can generate
a 27-slide talk about seven days on Kefalonia that looks like a travel film instead of a
slideshow — and so the same bones can carry a second deck about Sicily.

Everything is in English. The Greek that appears is deliberate.

```
kefalonia-design-system/
├── DESIGN_BRIEF.md          ← read this first. Art direction, slide-by-slide storyboard,
│                              feature list, shot list, and the prompt for Claude Design.
├── tokens/
│   ├── tokens.json          ← machine-readable tokens (the source of truth)
│   ├── tokens.css           ← CSS custom properties, type utilities, motion library
│   └── theme.ts             ← typed theme for the React components
├── src/
│   ├── index.ts             ← public surface
│   ├── primitives/
│   │   ├── DeckShell.tsx    ← Deck + Slide: canvas scaling, keyboard, chapter rail, notes
│   │   └── Ornaments.tsx    ← meander, wave rule, olive sprig, sun disc, glint, grain
│   └── slides/
│       ├── Openers.tsx      ← TitleSlide, ChapterDivider, QuoteSlide, ClosingSlide
│       ├── Media.tsx        ← PhotoHero, VideoSlide, PhotoMosaic, ArchGallery, CompareSlider
│       ├── Journeys.tsx     ← IslandMap (drawing route), BoatTour (sailing timeline)
│       ├── Story.tsx        ← SplitSlide, Itinerary, StatRow, FactRow, Phrasebook
│       ├── Food.tsx         ← TavernaGrid (flip cards), MenuSlide
│       └── Interactive.tsx  ← QuizSlide, IslandDuel (Kefalonia vs Sicily)
├── examples/
│   └── KefaloniaDeck.tsx    ← the full 27-slide deck, assembled, with real copy
├── preview/
│   └── deck.html            ← runnable demo. Open it in a browser, no build step.
└── previews/                ← component cards for the Claude Design pane
```

## Using it with Claude Design

```bash
cd kefalonia-design-system
claude
> /design-sync
```

`/design-sync` reads `tokens/` and `src/` and uploads the system to claude.ai/design, where it
appears under **Design systems**. Then start a slide deck and paste the prompt from
[`DESIGN_BRIEF.md` §6](DESIGN_BRIEF.md#6-prompt-for-claude-design).

The prompt is short on purpose — the storyboard, the non-negotiables, and the interaction list
live in the brief so you can edit them once and re-run the generation without rewriting a
paragraph of instructions.

## Seeing it without Claude Design

Open `preview/deck.html` in any browser. It is self-contained: the tokens, the motion library,
and eleven representative slides, with placeholder art where photos go. It runs the real
keyboard shortcuts, so it is also how you rehearse.

## Building a deck by hand

```tsx
import { Deck, TitleSlide, ChapterDivider, PhotoHero, ClosingSlide } from './src';
import './tokens/tokens.css';

<Deck meta={[{ chapter: 'Arrival', note: 'Wait for the room to go quiet.' }]} title="Kefalonia">
  <TitleSlide title="Kefalonia" subtitle="Seven days in the Ionian" video="./assets/myrtos.mp4" />
  <ChapterDivider number="01" title="Exploring the island" greek="Εξερεύνηση" image="./assets/road.jpg" />
  <PhotoHero image="./assets/myrtos.jpg" headline="Myrtos" note="the water really is that colour" />
  <ClosingSlide line="Going back in autumn." image="./assets/sunset.jpg" />
</Deck>
```

Every slide renders with text alone. A missing photo gives you a text slide, not a broken one.

## Presenter controls

| Key | Does |
| --- | --- |
| `→` `Space` `PageDown` | Next slide |
| `←` `PageUp` | Previous |
| `O` | Slide overview grid — jump anywhere mid-talk |
| `P` | Show the spoken note for this slide (never projected) |
| `S` | Ambient sound on/off (waves, faint bouzouki) |
| `F` | Fullscreen |
| `Home` / `End` | First / last slide |
| `#13` in the URL | Open directly on slide 13 |

Clicking the background also advances. Clicking inside an interactive slide — the compare
slider, a taverna card, a quiz option, a phrasebook row — does not.

## The three rules that hold the look together

1. **One surface per slide.** White, limestone, foam, sea, sunset, or a photo. Never two.
2. **Text over a photo always gets the scrim.** A projector in a bright room eats unscrimmed
   white type alive.
3. **Something is always moving slowly; nothing is ever moving fast.** Ken Burns on every
   still, 90ms stagger on every list, and no transition shorter than 180ms.

The rest of the reasoning is in `DESIGN_BRIEF.md`.

## Assets

Drop photos and clips into `examples/assets/` using the names in
[`DESIGN_BRIEF.md` §4](DESIGN_BRIEF.md#4-asset-shot-list). Two notes worth reading before you
sort through the camera roll:

- **The Myrtos pair is a deliberate shot**, not a lucky find: the same frame at noon and at
  sunset, camera in the same place. That pair is the compare slider on slide 8, and it is the
  best thirty seconds in the deck.
- **Three of the beach photos should not be Kefalonia.** They are the decoys for the quiz on
  slide 18.

## Sicily

Mischka's Sicily deck follows this one. Keep the bones — canvas, type, gutter, motion, chapter
rail — and swap the palette to volcanic: Etna basalt `#2E2A2B`, ceramic yellow `#E8B22E`,
prickly-pear green `#5E7A4A`, blood orange `#D4562B`. Details in
[`DESIGN_BRIEF.md` §7](DESIGN_BRIEF.md#7-handing-the-palette-to-the-sicily-deck).
