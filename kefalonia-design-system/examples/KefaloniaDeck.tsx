/**
 * The Kefalonia deck, assembled.
 *
 * This is the storyboard from DESIGN_BRIEF.md §2 turned into code: 27 slides,
 * six chapters, every component in the system used at least once. Copy of the
 * content is written to be spoken, not read — swap in your own and the layout
 * holds.
 *
 * Asset paths assume ./assets/ next to this file. Anything missing degrades to
 * a text-only slide rather than an empty frame.
 */

import React from 'react';
import {
  ArchGallery,
  BoatTour,
  ChapterDivider,
  ClosingSlide,
  CompareSlider,
  Deck,
  FactRow,
  IslandDuel,
  IslandMap,
  Itinerary,
  MenuSlide,
  Phrasebook,
  PhotoHero,
  PhotoMosaic,
  QuizSlide,
  QuoteSlide,
  SplitSlide,
  StatRow,
  TavernaGrid,
  TitleSlide,
  VideoSlide,
} from '../src';

const img = (name: string) => `./assets/${name}`;
const vid = (name: string) => `./assets/${name}`;

/** Presenter metadata, in slide order: chapter for the rail, note for the "P" key. */
const meta = [
  { chapter: 'Arrival', surface: 'photo' as const, note: 'Wait for the room to go quiet. The footage does the work.' },
  { chapter: 'Arrival', surface: 'photo' as const, note: 'Thirty-six degrees at nine in the evening. Nobody warned us.' },
  { chapter: 'Arrival', surface: 'foam' as const, note: 'Point at Ainos. Greenest island in the Ionian, and that is why.' },
  { chapter: 'Arrival', surface: 'limestone' as const, note: 'Flag the boat day here — tell them it is coming.' },

  { chapter: 'The island', surface: 'photo' as const },
  { chapter: 'The island', surface: 'white' as const, note: 'The turtles are in the harbour at six in the morning. We only saw them once.' },
  { chapter: 'The island', surface: 'photo' as const, note: 'This road has no barrier. Say it, then stay quiet for four seconds.' },
  { chapter: 'The island', surface: 'white' as const, note: 'Hand the mouse to the front row. Let them drag it.' },
  { chapter: 'The island', surface: 'limestone' as const, note: 'Fiskardo is the one the earthquake missed — that comes up again in two slides.' },
  { chapter: 'The island', surface: 'limestone' as const },
  { chapter: 'The island', surface: 'white' as const, note: 'The sinkhole fact is the one people remember. Slow down for it.' },

  { chapter: 'Boat day', surface: 'photo' as const },
  { chapter: 'Boat day', surface: 'sea' as const, note: 'Let the boat finish sailing before you talk over it.' },
  { chapter: 'Boat day', surface: 'photo' as const, note: 'Press the sound button. This is the only clip with audio.' },
  { chapter: 'Boat day', surface: 'photo' as const, note: 'Eight metres, and you can count the links in the chain.' },
  { chapter: 'Boat day', surface: 'sea' as const },

  { chapter: 'Beaches', surface: 'photo' as const },
  { chapter: 'Beaches', surface: 'sea' as const, note: 'Ask for hands up before anyone clicks.' },
  { chapter: 'Beaches', surface: 'limestone' as const },
  { chapter: 'Beaches', surface: 'sea' as const, note: 'Twenty-three frappés is not an exaggeration.' },

  { chapter: 'Tavernas', surface: 'photo' as const },
  { chapter: 'Tavernas', surface: 'limestone' as const, note: 'Flip one card — whichever place you want to talk about longest.' },
  { chapter: 'Tavernas', surface: 'photo' as const, note: 'Read the Greek names badly on purpose. It always works.' },
  { chapter: 'Tavernas', surface: 'foam' as const, note: 'Get them to say kalimera back. It wakes everyone up.' },

  { chapter: 'Closing', surface: 'white' as const, note: 'Mischka is next. Be generous — and mean it.' },
  { chapter: 'Closing', surface: 'limestone' as const },
  { chapter: 'Closing', surface: 'photo' as const, note: 'Let the sun finish sinking. Then take questions.' },
];

export default function KefaloniaDeck() {
  return (
    <Deck meta={meta} title="Kefalonia" ambientSrc={vid('ambient-waves.mp3')}>
      {/* ── 00 · Arrival ─────────────────────────────────────────────── */}
      <TitleSlide
        title="Kefalonia"
        subtitle="Seven days on the greenest island in the Ionian"
        eyebrow="Ionian Sea · Greece"
        byline="Justin · Summer 2026"
        video={vid('myrtos-aerial.mp4')}
        poster={img('myrtos-noon.jpg')}
      />

      <PhotoHero
        image={img('arrival-heat.jpg')}
        place="38°07′N 20°30′E · Kefalonia Airport"
        headline="It hits you before you leave the airport"
        caption="Thirty-six degrees, nine in the evening, and the air smells of pine and hot stone."
        note="the rental car had no air conditioning"
      />

      <IslandMap
        headline="Nowhere near where you think it is"
        caption="West coast of Greece, an hour's ferry from Ithaca, and green in a way Greek islands are usually not — Ainos holds a fir forest that exists nowhere else on earth."
        route={['argostoli', 'lixouri', 'myrtos', 'assos', 'fiskardo', 'sami', 'ainos', 'poros']}
        facts={[
          { label: 'Area', value: '781 km²' },
          { label: 'People', value: '~36,000' },
          { label: 'Highest point', value: 'Ainos · 1,628 m' },
          { label: 'From Hamburg', value: '3 h direct' },
          { label: 'Km we drove', value: '412' },
        ]}
      />

      <Itinerary
        days={[
          { day: 'Sat', title: 'Argostoli', detail: 'Land, find the apartment, eat too late', icon: '🛬' },
          { day: 'Sun', title: 'Lixouri', detail: 'Ferry across the gulf, red sand at Xi', icon: '⛴️' },
          { day: 'Mon', title: 'Myrtos', detail: 'The photo everyone has seen', icon: '🏖️' },
          { day: 'Tue', title: 'Boat day', detail: 'Four bays, no licence required', icon: '⛵', accent: true },
          { day: 'Wed', title: 'Ainos', detail: 'Wild horses, fir forest, 1,628 m', icon: '🐎' },
          { day: 'Thu', title: 'Caves', detail: 'Melissani and Drogarati', icon: '💧' },
          { day: 'Fri', title: 'Fiskardo', detail: 'The village the earthquake missed', icon: '⚓' },
        ]}
      />

      {/* ── 01 · Exploring the island ────────────────────────────────── */}
      <ChapterDivider
        number="01"
        title="Exploring the island"
        greek="Εξερεύνηση"
        blurb="412 kilometres on roads built for goats, in a car built for cities."
        image={img('coast-road-still.jpg')}
      />

      <SplitSlide
        eyebrow="Argostoli · the capital"
        headline="A town that was rebuilt twice"
        body="Flattened in 1953 and put back up in concrete, which sounds bleak and isn't — the waterfront at dusk is the whole town walking in one direction and then back again."
        points={[
          'Loggerhead turtles in the harbour at dawn',
          'The Drapano bridge — 900 m of 1813 stonework',
          'Katavothres, where the sea runs into the ground',
          'Every café serves frappé and nothing faster',
        ]}
        media={{ image: img('argostoli-harbour.jpg'), caption: 'Drapano bridge, 06:40' }}
        mediaSide="right"
      />

      <VideoSlide
        src={vid('coast-road.mp4')}
        poster={img('coast-road-still.jpg')}
        headline="The road above Myrtos"
        caption="Six hairpins, no barrier, and a view that makes you stop in exactly the place you should not stop."
      />

      <CompareSlider
        beforeImage={img('myrtos-noon.jpg')}
        afterImage={img('myrtos-sunset.jpg')}
        beforeLabel="12:30"
        afterLabel="20:45"
        headline="The same bay, eight hours apart"
        caption="At noon it is almost too bright to look at. By nine the cliffs go pink and the water turns to ink. Drag the handle."
      />

      <ArchGallery
        eyebrow="Three villages"
        headline="Whitewash, bougainvillea, cats"
        items={[
          { image: img('assos.jpg'), label: 'Assos', sub: 'A Venetian castle and eleven houses' },
          { image: img('fiskardo.jpg'), label: 'Fiskardo', sub: 'The only village the 1953 earthquake spared' },
          { image: img('sami.jpg'), label: 'Sami', sub: 'Where the ferries and the caves are' },
        ]}
      />

      <PhotoMosaic
        eyebrow="Underground and uphill"
        headline="The island has a basement and an attic"
        items={[
          { image: img('melissani.jpg'), caption: 'Melissani — the roof fell in, the light comes straight down', span: 'wide' },
          { image: img('drogarati.jpg'), caption: 'Drogarati, 60 m down' },
          { image: img('ainos-horses.jpg'), caption: 'Wild horses on Ainos' },
          { image: img('ainos-summit.jpg'), caption: '1,628 m, and you can see Zakynthos' },
          { image: img('fir-forest.jpg'), caption: 'Abies cephalonica — grows here and nowhere else' },
        ]}
      />

      <FactRow
        eyebrow="Three things about this island"
        headline="Worth knowing before you go"
        facts={[
          {
            icon: '🎻',
            title: 'Captain Corelli lived here',
            body: 'The novel and the film with Nicolas Cage are set on Kefalonia and were shot in Sami. The island has never quite let it go — and the bookshops will not let you either.',
          },
          {
            icon: '🌍',
            title: '1953 changed everything',
            body: 'An earthquake flattened almost every village on the island. Fiskardo in the north was the only one left standing, which is exactly why it looks the way it does.',
          },
          {
            icon: '🌀',
            title: 'The sea flows inland',
            body: 'At Katavothres the sea pours into sinkholes and disappears. Dye tests in 1963 found it again fifteen kilometres away, on the other coast, in the lake at Melissani.',
          },
        ]}
      />

      {/* ── 02 · Boat day ────────────────────────────────────────────── */}
      <ChapterDivider
        number="02"
        title="Boat day"
        greek="Βαρκάδα"
        blurb="In Greece you can rent a 30 hp boat with no licence at all. That is either wonderful or terrifying."
        image={img('boat-wide.jpg')}
      />

      <BoatTour
        headline="Eight hours, four bays, one anchor"
        stops={[
          { time: '09:00', name: 'Argostoli harbour', detail: 'Twenty minutes of instructions, none of them about the wind.', tag: 'cast off', image: img('boat-harbour.jpg') },
          { time: '11:30', name: 'The blue cave', detail: 'You go in on your back so you can watch the light change.', tag: 'swim stop', image: img('blue-cave.jpg') },
          { time: '13:30', name: 'A bay with no name', detail: 'Bread, feta, tomatoes, and the boat rocking hard enough to spill things.', tag: 'lunch', image: img('bay-lunch.jpg') },
          { time: '17:00', name: 'Past Lixouri, home', detail: 'The wind gets up at five. Nobody warns you about that either.', tag: 'sunset run', image: img('lixouri-evening.jpg') },
        ]}
      />

      <VideoSlide
        src={vid('boat-jump.mp4')}
        poster={img('boat-jump-still.jpg')}
        headline="Twenty-six degrees"
        caption="Which sounds warm until you are the one going first."
        audio
      />

      <PhotoHero
        image={img('anchor-turquoise.jpg')}
        place="Straight down · ~8 m"
        headline="You can see the anchor"
        caption="Eight metres of water and you can count the links in the chain. No filter on this one — there was no need."
        note="I checked twice. It really was eight metres."
        anchor="bottom-right"
      />

      <StatRow
        eyebrow="Boat day"
        headline="One day, in numbers"
        stats={[
          { icon: '⚓', value: '41', label: 'nautical miles', sub: 'and one wrong turn' },
          { icon: '🏝️', value: '4', label: 'bays', sub: 'three of them empty' },
          { icon: '🌡️', value: '26 °C', label: 'water', sub: 'at eleven in the morning' },
          { icon: '🧴', value: '1', label: 'sunburnt shoulder', sub: 'the left one, always' },
        ]}
      />

      {/* ── 03 · The beaches ─────────────────────────────────────────── */}
      <ChapterDivider
        number="03"
        title="The beaches"
        greek="Παραλίες"
        blurb="Nine of them in seven days, which is either thorough or a problem."
        image={img('antisamos.jpg')}
      />

      <QuizSlide
        question="Three of these are Kefalonia. Which one isn't?"
        options={[
          { label: 'A', image: img('quiz-myrtos.jpg') },
          { label: 'B', image: img('quiz-sardinia.jpg'), correct: true },
          { label: 'C', image: img('quiz-petani.jpg') },
          { label: 'D', image: img('quiz-antisamos.jpg') },
        ]}
        reveal="B is Sardinia. The giveaway is the sand — Kefalonia's west coast beaches are white pebbles and limestone, so the water goes turquoise. Fine golden sand means somewhere else."
      />

      <PhotoMosaic
        eyebrow="Nine beaches, five worth the drive"
        headline="Pebbles, not sand — that's why the water looks like that"
        surface="limestone"
        items={[
          { image: img('antisamos.jpg'), caption: 'Antisamos — where they filmed the film', span: 'wide' },
          { image: img('xi-beach.jpg'), caption: 'Xi — red sand, shallow for 80 m' },
          { image: img('petani.jpg'), caption: 'Petani — the one with nobody on it' },
          { image: img('skala.jpg'), caption: 'Skala — three kilometres long' },
          { image: img('makris-gialos.jpg'), caption: 'Makris Gialos — sunbeds and a bar' },
        ]}
      />

      <StatRow
        eyebrow="The week"
        headline="Seven days, in numbers"
        stats={[
          { icon: '🏖️', value: '9', label: 'beaches', sub: 'five we went back to' },
          { icon: '🏊', value: '14 km', label: 'swum', sub: 'mostly in one bay' },
          { icon: '🌅', value: '7', label: 'sunsets', sub: 'not one bad one' },
          { icon: '🥤', value: '23', label: 'frappés', sub: 'this is not an exaggeration' },
        ]}
      />

      {/* ── 04 · Tavernas ────────────────────────────────────────────── */}
      <ChapterDivider
        number="04"
        title="Where we ate"
        greek="Στην τάβερνα"
        blurb="Dinner starts at nine and the bill takes an hour to arrive. Both of these are on purpose."
        image={img('taverna-evening.jpg')}
      />

      <TavernaGrid
        headline="Four tavernas worth the drive"
        footnote="Click any card for the thing we wish we'd known first."
        tavernas={[
          {
            name: 'Tassia',
            place: 'Fiskardo · harbour',
            image: img('taverna-tassia.jpg'),
            rating: 4.5,
            price: '€€€',
            mustOrder: 'kreatopita',
            note: 'On the water, white tablecloths, and the only place we dressed up for.',
            tip: 'Book two days ahead and ask for a table on the outer row — the inner tables face a wall.',
          },
          {
            name: 'To Perasma',
            place: 'Hill village · inland',
            image: img('taverna-perasma.jpg'),
            rating: 5,
            price: '€€',
            mustOrder: 'lamb kleftiko',
            note: "Someone's grandmother cooks, someone's son serves, and there is no menu on Tuesdays.",
            tip: 'No card machine, no English menu, and worth the 40-minute drive up. Bring cash and point at things.',
          },
          {
            name: 'Paradise Beach',
            place: 'Agia Efimia · fish',
            image: img('taverna-fish.jpg'),
            rating: 4,
            price: '€€',
            mustOrder: 'grilled octopus',
            note: 'Fish sold by weight, chosen at the counter, eaten twelve metres from where it was landed.',
            tip: 'Ask what came in that morning instead of reading the menu. The answer changes the order.',
          },
          {
            name: 'Casa Grec',
            place: 'Argostoli · old town',
            image: img('taverna-casagrec.jpg'),
            rating: 4.5,
            price: '€€',
            mustOrder: 'Robola and mezze',
            note: 'The one we went back to twice, which is the only rating that actually counts.',
            tip: 'Robola is the local white — grown on Ainos in volcanic soil, and half the price of anything imported.',
          },
        ]}
      />

      <MenuSlide
        restaurant="To Perasma"
        place="Wednesday · the drive up the hill"
        image={img('dinner-table.jpg')}
        courses={[
          { dish: 'Bread, olives, oil', greek: 'ψωμί', detail: 'Brought without asking. Charged for. Fair enough.' },
          { dish: 'Fried courgette with tzatziki', greek: 'κολοκυθάκια', detail: 'Sliced thin enough to see through' },
          { dish: 'Lamb kleftiko', greek: 'κλέφτικο', detail: 'Four hours in paper. Falls apart when looked at.' },
          { dish: 'Kefalonian meat pie', greek: 'κρεατόπιτα', detail: 'The island dish. Rice, meat, cinnamon.' },
          { dish: 'Robola, half litre', greek: 'Ρομπόλα', detail: 'From the slopes of Ainos, in a jug' },
          { dish: 'Watermelon', greek: 'καρπούζι', detail: 'Free, unasked for, at every single meal' },
        ]}
        total="Two people, everything above — €43"
      />

      <Phrasebook
        phrases={[
          { greek: 'Καλημέρα', latin: 'ka-li-MÉ-ra', english: 'Good morning', when: 'until 12:00' },
          { greek: 'Ευχαριστώ', latin: 'ef-ha-ri-STÓ', english: 'Thank you', when: 'constantly' },
          { greek: 'Ένα φραπέ παρακαλώ', latin: 'É-na fra-PÉ pa-ra-ka-LÓ', english: 'One frappé, please', when: '23 times' },
          { greek: 'Πόσο κάνει;', latin: 'PÓ-so KÁ-ni', english: 'How much is it?', when: 'at the market' },
          { greek: 'Στην υγειά μας', latin: 'stin yá mas', english: "Cheers — to our health", when: 'every evening' },
        ]}
      />

      {/* ── 05 · Closing ─────────────────────────────────────────────── */}
      <IslandDuel
        rows={[
          { criterion: 'Size', left: '781 km² — you can drive it in a day', right: '25,711 km² — you cannot', winner: 'right' },
          { criterion: 'Water', left: 'Turquoise over white pebbles', right: 'Deep blue, and warmer', winner: 'left' },
          { criterion: 'Food', left: 'Kreatopita, Robola, grilled fish', right: 'Arancini, cannoli, 3,000 years of it', winner: 'right' },
          { criterion: 'Driving', left: 'Hairpins with no barrier', right: 'Palermo at rush hour', winner: 'tie' },
          { criterion: 'Crowds', left: 'Empty bays in August', right: 'Taormina in August', winner: 'left' },
          { criterion: 'Volcanoes', left: 'None. Just an earthquake in 1953.', right: 'Etna. Actively erupting.', winner: 'right' },
        ]}
        verdict="Different holidays. Go to both — Mischka goes first next time."
      />

      <QuoteSlide
        quote="We said we would come back in autumn, when the water is still warm and the road above Myrtos is empty."
        attribution="Last evening · Argostoli waterfront"
      />

      <ClosingSlide
        headline="Efharistó"
        translation="Thank you · ευχαριστώ"
        line="Seven days, 412 kilometres, nine beaches, and one island we are definitely going back to."
        image={img('last-sunset.jpg')}
        credits={['Photos · Justin', 'Ambience · waves, Lassi beach', 'Travelled with · Mischka']}
      />
    </Deck>
  );
}
