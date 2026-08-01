/**
 * Kefalonia Summer — public surface of the deck system.
 *
 * Build a deck by composing these inside <Deck>. Nothing here needs props you
 * don't have: every slide degrades to something presentable with text only.
 */

export { Deck, Slide, useSlideActive } from './primitives/DeckShell';
export type { DeckProps, SlideProps } from './primitives/DeckShell';

export { Meander, WaveRule, WaveBand, OliveSprig, SunDisc, SunGlint, Grain } from './primitives/Ornaments';

export { TitleSlide, ChapterDivider, QuoteSlide, ClosingSlide } from './slides/Openers';
export type { TitleSlideProps, ChapterDividerProps, QuoteSlideProps, ClosingSlideProps } from './slides/Openers';

export { PhotoHero, VideoSlide, PhotoMosaic, ArchGallery, CompareSlider } from './slides/Media';
export type { PhotoHeroProps, VideoSlideProps, PhotoMosaicProps, ArchGalleryProps, CompareSliderProps, MosaicItem } from './slides/Media';

export { IslandMap, BoatTour, KEFALONIA_OUTLINE, KEFALONIA_RIDGE, KEFALONIA_PINS } from './slides/Journeys';
export type { IslandMapProps, MapPin, BoatTourProps, BoatStop } from './slides/Journeys';

export { SplitSlide, Itinerary, StatRow, FactRow, Phrasebook } from './slides/Story';
export type { SplitSlideProps, ItineraryDay, Stat, Phrase } from './slides/Story';

export { TavernaCard, TavernaGrid, MenuSlide } from './slides/Food';
export type { Taverna } from './slides/Food';

export { QuizSlide, IslandDuel } from './slides/Interactive';
export type { QuizSlideProps, IslandDuelProps, DuelRow } from './slides/Interactive';

export { default as theme, color, gradient, font, space, radius, shadow, motion, CANVAS, surfaceStyle, isDarkSurface } from '../tokens/theme';
export type { Surface } from '../tokens/theme';
