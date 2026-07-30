/**
 * Kefalonia Summer — typed theme.
 * Mirrors tokens/tokens.json and tokens/tokens.css. Import this in components
 * instead of hardcoding values; the CSS variable names are the runtime contract.
 */

export const color = {
  sea: {
    abyss: 'var(--kef-sea-abyss)',
    deep: 'var(--kef-sea-deep)',
    mid: 'var(--kef-sea-mid)',
    lagoon: 'var(--kef-sea-lagoon)',
    myrtos: 'var(--kef-sea-myrtos)',
    foam: 'var(--kef-sea-foam)',
  },
  stone: {
    whitewash: 'var(--kef-whitewash)',
    limestone: 'var(--kef-limestone)',
    sand: 'var(--kef-sand)',
    pebble: 'var(--kef-pebble)',
  },
  grove: {
    olive: 'var(--kef-olive)',
    oliveDeep: 'var(--kef-olive-deep)',
    cypress: 'var(--kef-cypress)',
  },
  sun: {
    core: 'var(--kef-sun)',
    glow: 'var(--kef-sun-glow)',
    apricot: 'var(--kef-apricot)',
    terracotta: 'var(--kef-terracotta)',
  },
  bloom: {
    bougainvillea: 'var(--kef-bougainvillea)',
    mavrodaphne: 'var(--kef-mavrodaphne)',
  },
  ink: {
    strong: 'var(--kef-ink)',
    soft: 'var(--kef-ink-soft)',
    mute: 'var(--kef-ink-mute)',
    onDark: 'var(--kef-ink-ondark)',
  },
} as const;

export const gradient = {
  aegean: 'var(--kef-grad-aegean)',
  shallows: 'var(--kef-grad-shallows)',
  sunset: 'var(--kef-grad-sunset)',
  sunrise: 'var(--kef-grad-sunrise)',
  limestone: 'var(--kef-grad-limestone)',
  scrim: 'var(--kef-grad-scrim)',
  sunGlint: 'var(--kef-grad-sunglint)',
} as const;

export const font = {
  display: 'var(--kef-font-display)',
  sans: 'var(--kef-font-sans)',
  script: 'var(--kef-font-script)',
  mono: 'var(--kef-font-mono)',
} as const;

/** Canvas is a fixed 1920x1080; DeckShell scales it to the viewport. */
export const CANVAS = { width: 1920, height: 1080 } as const;

export const space = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96, 10: 128, 11: 160,
  gutter: 128,
} as const;

export const radius = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
  /** Greek arch — signature shape for portrait media. */
  arch: '50% 50% 0 0 / 42% 42% 0 0',
} as const;

export const shadow = {
  sm: 'var(--kef-shadow-sm)',
  md: 'var(--kef-shadow-md)',
  lg: 'var(--kef-shadow-lg)',
  sun: 'var(--kef-shadow-sun)',
  sea: 'var(--kef-shadow-sea)',
} as const;

export const motion = {
  duration: {
    quick: 180,
    base: 320,
    slow: 640,
    cinematic: 1200,
    kenBurns: 18000,
    shimmer: 7000,
  },
  easing: {
    swell: 'cubic-bezier(0.22, 1, 0.36, 1)',
    tide: 'cubic-bezier(0.65, 0, 0.35, 1)',
    lift: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    drift: 'cubic-bezier(0.45, 0, 0.55, 1)',
  },
  stagger: 90,
} as const;

/** Slide surfaces. Every slide picks exactly one. */
export type Surface = 'white' | 'limestone' | 'sea' | 'sunset' | 'foam' | 'photo';

export const surfaceStyle: Record<Exclude<Surface, 'photo'>, string> = {
  white: color.stone.whitewash,
  limestone: gradient.limestone,
  sea: gradient.aegean,
  sunset: gradient.sunset,
  foam: color.sea.foam,
};

/** Surfaces that need light text. */
export const isDarkSurface = (s: Surface) => s === 'sea' || s === 'photo';

export const theme = { color, gradient, font, space, radius, shadow, motion, CANVAS } as const;
export default theme;
