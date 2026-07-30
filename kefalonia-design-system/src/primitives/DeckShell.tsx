/**
 * DeckShell — the presenter frame.
 *
 * Everything in this system assumes a fixed 1920x1080 canvas. DeckShell scales
 * that canvas to whatever screen it lands on, so slide layouts never need media
 * queries and typography never reflows between the rehearsal and the room.
 *
 * Presenter features (the reason this exists rather than plain slides):
 *   - ← / → / Space / Home / End keyboard navigation, click-anywhere-to-advance
 *   - a chapter rail that shows where you are in the story
 *   - "O" opens the slide overview grid, Esc closes it
 *   - "P" toggles the presenter note for the current slide
 *   - "S" toggles ambient sound (waves + bouzouki bed), off by default
 *   - "F" fullscreen
 *   - deep links: #7 opens on slide 7, so you can jump mid-talk
 *   - only the active slide animates, so entrance motion always plays on arrival
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CANVAS, surfaceStyle, isDarkSurface, type Surface } from '../../tokens/theme';

type SlideMeta = {
  chapter?: string;
  /** Spoken note for the presenter — never rendered on the projected slide. */
  note?: string;
  surface?: Surface;
};

const SlideCtx = createContext<{ active: boolean; index: number }>({ active: false, index: 0 });

/** True while this slide is the one on screen. Gate expensive animation on it. */
export const useSlideActive = () => useContext(SlideCtx).active;

export type DeckProps = {
  children: React.ReactNode;
  /** Per-slide metadata, in slide order. */
  meta?: SlideMeta[];
  /** Looping ambient audio (waves, distant bouzouki). Muted until the user presses S. */
  ambientSrc?: string;
  title?: string;
};

export function Deck({ children, meta = [], ambientSrc, title = 'Kefalonia' }: DeckProps) {
  const slides = React.Children.toArray(children);
  const [index, setIndex] = useState(() => {
    const fromHash = Number(window.location.hash.replace('#', ''));
    return Number.isFinite(fromHash) && fromHash > 0 ? Math.min(fromHash - 1, slides.length - 1) : 0;
  });
  const [overview, setOverview] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [sound, setSound] = useState(false);
  const [scale, setScale] = useState(1);
  const audio = useRef<HTMLAudioElement | null>(null);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, slides.length - 1));
      setIndex(clamped);
      window.history.replaceState(null, '', `#${clamped + 1}`);
    },
    [slides.length],
  );

  /* Scale the fixed canvas to the viewport, letterboxing the remainder. */
  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / CANVAS.width, window.innerHeight / CANVAS.height));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          go(index + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          go(index - 1);
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(slides.length - 1);
          break;
        case 'Escape':
          setOverview(false);
          break;
        case 'o':
        case 'O':
          setOverview((v) => !v);
          break;
        case 'p':
        case 'P':
          setShowNote((v) => !v);
          break;
        case 's':
        case 'S':
          setSound((v) => !v);
          break;
        case 'f':
        case 'F':
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen?.();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go, slides.length]);

  useEffect(() => {
    if (!audio.current) return;
    if (sound) void audio.current.play().catch(() => undefined);
    else audio.current.pause();
  }, [sound]);

  const chapters = useMemo(() => {
    const seen: { name: string; index: number }[] = [];
    meta.forEach((m, i) => {
      if (m.chapter && seen[seen.length - 1]?.name !== m.chapter) {
        seen.push({ name: m.chapter, index: i });
      }
    });
    return seen;
  }, [meta]);

  const current = meta[index] ?? {};
  const activeChapter = [...chapters].reverse().find((c) => c.index <= index)?.name;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--kef-sea-abyss)',
        overflow: 'hidden',
        fontFamily: 'var(--kef-font-sans)',
      }}
      onClick={(e) => {
        // Advance on background clicks only; interactive slides keep their own clicks.
        if ((e.target as HTMLElement).closest('[data-kef-interactive]')) return;
        go(index + 1);
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: CANVAS.width,
          height: CANVAS.height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {slides.map((slide, i) => (
          <SlideCtx.Provider key={i} value={{ active: i === index, index: i }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === index ? 1 : 0,
                pointerEvents: i === index ? 'auto' : 'none',
                transition: `opacity var(--kef-dur-slow) var(--kef-ease-swell)`,
              }}
              aria-hidden={i !== index}
            >
              {/* Remount on arrival so entrance animations replay every time. */}
              {i === index ? <React.Fragment key={`live-${index}`}>{slide}</React.Fragment> : slide}
            </div>
          </SlideCtx.Provider>
        ))}

        <ProgressRail
          chapters={chapters}
          total={slides.length}
          index={index}
          activeChapter={activeChapter}
          dark={isDarkSurface(current.surface ?? 'white')}
          onJump={go}
        />
      </div>

      {overview && (
        <Overview
          count={slides.length}
          index={index}
          meta={meta}
          title={title}
          onPick={(i) => {
            go(i);
            setOverview(false);
          }}
        />
      )}

      {showNote && current.note && (
        <div
          data-kef-interactive
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 24,
            padding: '18px 24px',
            borderRadius: 16,
            background: 'rgba(6,56,75,0.92)',
            color: 'var(--kef-ink-ondark)',
            fontSize: 18,
            lineHeight: 1.5,
            boxShadow: 'var(--kef-shadow-lg)',
          }}
        >
          <strong style={{ color: 'var(--kef-sun)', marginRight: 10 }}>Say:</strong>
          {current.note}
        </div>
      )}

      <HotkeyHint />

      {ambientSrc && <audio ref={audio} src={ambientSrc} loop preload="none" />}
    </div>
  );
}

function ProgressRail({
  chapters,
  total,
  index,
  activeChapter,
  dark,
  onJump,
}: {
  chapters: { name: string; index: number }[];
  total: number;
  index: number;
  activeChapter?: string;
  dark: boolean;
  onJump: (i: number) => void;
}) {
  const fg = dark ? 'rgba(253,251,246,0.9)' : 'var(--kef-ink-soft)';
  const track = dark ? 'rgba(253,251,246,0.22)' : 'rgba(18,48,59,0.14)';
  return (
    <div
      data-kef-interactive
      style={{
        position: 'absolute',
        left: 128,
        right: 128,
        bottom: 52,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        pointerEvents: 'auto',
      }}
    >
      <div style={{ display: 'flex', gap: 10, flex: 1 }}>
        {chapters.map((c) => {
          const on = c.name === activeChapter;
          return (
            <button
              key={c.name}
              onClick={() => onJump(c.index)}
              title={c.name}
              style={{
                flex: 1,
                height: 3,
                border: 0,
                padding: 0,
                cursor: 'pointer',
                borderRadius: 999,
                background: on ? 'var(--kef-sun)' : track,
                transition: 'background var(--kef-dur-base) var(--kef-ease-swell)',
              }}
            />
          );
        })}
      </div>
      <span
        style={{
          fontFamily: 'var(--kef-font-mono)',
          fontSize: 15,
          letterSpacing: '0.08em',
          color: fg,
          whiteSpace: 'nowrap',
        }}
      >
        {activeChapter ? `${activeChapter} · ` : ''}
        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

function Overview({
  count,
  index,
  meta,
  title,
  onPick,
}: {
  count: number;
  index: number;
  meta: SlideMeta[];
  title: string;
  onPick: (i: number) => void;
}) {
  return (
    <div
      data-kef-interactive
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(6,56,75,0.96)',
        padding: '56px 64px',
        overflowY: 'auto',
        color: 'var(--kef-ink-ondark)',
      }}
    >
      <p className="kef-eyebrow" style={{ color: 'var(--kef-sea-myrtos)' }}>
        {title} · overview
      </p>
      <div
        style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 18,
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => onPick(i)}
            style={{
              aspectRatio: '16 / 9',
              borderRadius: 14,
              cursor: 'pointer',
              textAlign: 'left',
              padding: 16,
              color: 'inherit',
              background: i === index ? 'rgba(246,192,73,0.22)' : 'rgba(253,251,246,0.08)',
              border: i === index ? '2px solid var(--kef-sun)' : '1px solid rgba(253,251,246,0.18)',
            }}
          >
            <span style={{ fontFamily: 'var(--kef-font-mono)', fontSize: 13, opacity: 0.7 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ display: 'block', marginTop: 8, fontSize: 16, lineHeight: 1.3 }}>
              {meta[i]?.chapter ?? '—'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HotkeyHint() {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSeen(true), 6000);
    return () => clearTimeout(t);
  }, []);
  if (seen) return null;
  return (
    <div
      style={{
        position: 'absolute',
        right: 22,
        top: 18,
        fontFamily: 'var(--kef-font-mono)',
        fontSize: 13,
        letterSpacing: '0.05em',
        color: 'rgba(253,251,246,0.55)',
        transition: 'opacity var(--kef-dur-slow) linear',
      }}
    >
      ← → move · O overview · P notes · S sound · F fullscreen
    </div>
  );
}

export type SlideProps = {
  children: React.ReactNode;
  surface?: Surface;
  /** Full-bleed background image. Implies the photo surface. */
  image?: string;
  /** Slow Ken Burns push on the background image. */
  kenBurns?: boolean;
  /** Bottom-up scrim so text stays readable on photos. On by default with image. */
  scrim?: boolean;
  padded?: boolean;
  style?: React.CSSProperties;
};

/** The base slide. Every other slide component builds on this one. */
export function Slide({
  children,
  surface = 'white',
  image,
  kenBurns = true,
  scrim,
  padded = true,
  style,
}: SlideProps) {
  const active = useSlideActive();
  const effective: Surface = image ? 'photo' : surface;
  const dark = isDarkSurface(effective);
  const wantScrim = scrim ?? Boolean(image);

  return (
    <section
      className={dark ? 'kef-on-dark' : undefined}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: image ? 'var(--kef-sea-abyss)' : surfaceStyle[effective as 'white'],
        padding: padded ? 'var(--kef-gutter)' : 0,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {image && (
        <div
          aria-hidden="true"
          className={kenBurns && active ? 'kef-ken-burns' : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }}
        />
      )}
      {wantScrim && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--kef-grad-scrim)' }} />
      )}
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>{children}</div>
    </section>
  );
}
