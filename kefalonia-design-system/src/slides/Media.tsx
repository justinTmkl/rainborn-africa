/**
 * Media slides — photos and video. This is where a holiday deck lives or dies,
 * so the rules are strict: images go full-bleed or into arches, never into
 * rounded rectangles floating in white space; every text-over-photo gets a
 * scrim; every still image gets slow motion so nothing sits dead on screen.
 */

import React, { useCallback, useRef, useState } from 'react';
import { Slide, useSlideActive } from '../primitives/DeckShell';
import { SunGlint, WaveRule } from '../primitives/Ornaments';

/* ---------------------------------------------------------------- PhotoHero */

export type PhotoHeroProps = {
  image: string;
  headline?: string;
  caption?: string;
  /** Handwritten margin note — the travel-journal touch. Max one per slide. */
  note?: string;
  /** Where the text block sits. Pick the corner with the least going on. */
  anchor?: 'bottom-left' | 'bottom-right' | 'top-left';
  /** GPS or place label, set in mono. */
  place?: string;
};

/** One photo, full bleed, slowly pushing in. The workhorse slide. */
export function PhotoHero({ image, headline, caption, note, anchor = 'bottom-left', place }: PhotoHeroProps) {
  const pos: React.CSSProperties =
    anchor === 'bottom-right'
      ? { right: 0, bottom: 0, textAlign: 'right', alignItems: 'flex-end' }
      : anchor === 'top-left'
        ? { left: 0, top: 0 }
        : { left: 0, bottom: 0 };

  return (
    <Slide surface="photo" image={image}>
      <SunGlint opacity={0.5} />
      <div
        className="kef-stagger"
        style={{ position: 'absolute', maxWidth: 1080, display: 'flex', flexDirection: 'column', ...pos }}
      >
        {place && (
          <p className="kef-mono" style={{ color: 'var(--kef-sea-myrtos)', letterSpacing: '0.14em' }}>
            {place}
          </p>
        )}
        {headline && (
          <h2 className="kef-display-m" style={{ marginTop: 14 }}>
            {headline}
          </h2>
        )}
        {caption && (
          <p className="kef-body-l" style={{ marginTop: 16, maxWidth: 860 }}>
            {caption}
          </p>
        )}
        {note && (
          <p className="kef-note" style={{ marginTop: 18, transform: 'rotate(-1.4deg)' }}>
            {note}
          </p>
        )}
      </div>
    </Slide>
  );
}

/* --------------------------------------------------------------- VideoSlide */

export type VideoSlideProps = {
  src: string;
  poster?: string;
  headline?: string;
  caption?: string;
  /** Muted ambience (default) or the clip's own audio for a wow moment. */
  audio?: boolean;
  /** Frosted caption card instead of a plain scrim label. */
  glassCard?: boolean;
};

/**
 * Full-bleed video. Plays only while its slide is on screen — so a ten-clip
 * deck doesn't decode ten videos at once and stutter on the projector.
 */
export function VideoSlide({ src, poster, headline, caption, audio = false, glassCard = true }: VideoSlideProps) {
  const active = useSlideActive();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(!audio);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) void v.play().catch(() => undefined);
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active]);

  return (
    <Slide surface="photo" padded={false} scrim>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--kef-grad-scrim)' }} />

      {(headline || caption) && (
        <div
          className={glassCard ? 'kef-glass kef-anim-rise' : 'kef-anim-rise'}
          style={{
            position: 'absolute',
            left: 'var(--kef-gutter)',
            bottom: 190,
            maxWidth: 900,
            padding: glassCard ? '32px 40px' : 0,
          }}
        >
          {headline && <h2 className="kef-title">{headline}</h2>}
          {caption && (
            <p className="kef-body" style={{ marginTop: 12 }}>
              {caption}
            </p>
          )}
        </div>
      )}

      {audio && (
        <button
          data-kef-interactive
          onClick={() => setMuted((m) => !m)}
          className="kef-glass"
          style={{
            position: 'absolute',
            right: 'var(--kef-gutter)',
            bottom: 190,
            padding: '14px 24px',
            cursor: 'pointer',
            fontSize: 17,
            fontFamily: 'var(--kef-font-sans)',
          }}
        >
          {muted ? 'Sound on' : 'Sound off'}
        </button>
      )}
    </Slide>
  );
}

/* -------------------------------------------------------------- PhotoMosaic */

export type MosaicItem = { image: string; caption?: string; span?: 'wide' | 'tall' | 'normal' };

export type PhotoMosaicProps = {
  eyebrow?: string;
  headline?: string;
  items: MosaicItem[];
  surface?: 'white' | 'limestone' | 'foam';
};

/**
 * Editorial photo grid, 3–6 images. Reveals one after another, and any image
 * lifts under the cursor so you can single one out while talking.
 */
export function PhotoMosaic({ eyebrow, headline, items, surface = 'limestone' }: PhotoMosaicProps) {
  return (
    <Slide surface={surface}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 28 }}>
        {(eyebrow || headline) && (
          <header className="kef-anim-rise">
            {eyebrow && <p className="kef-eyebrow">{eyebrow}</p>}
            {headline && (
              <h2 className="kef-display-m" style={{ marginTop: 10 }}>
                {headline}
              </h2>
            )}
          </header>
        )}
        <div
          className="kef-stagger"
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: '1fr',
            gap: 20,
            minHeight: 0,
          }}
        >
          {items.map((it, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--kef-radius-lg)',
                boxShadow: 'var(--kef-shadow-md)',
                gridColumn: `span ${it.span === 'wide' ? 4 : 2}`,
                gridRow: `span ${it.span === 'tall' ? 2 : 1}`,
                transition: 'transform var(--kef-dur-base) var(--kef-ease-lift), box-shadow var(--kef-dur-base) linear',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.015)';
                e.currentTarget.style.boxShadow = 'var(--kef-shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = 'var(--kef-shadow-md)';
              }}
            >
              <img
                src={it.image}
                alt={it.caption ?? ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {it.caption && (
                <figcaption
                  style={{
                    position: 'absolute',
                    inset: 'auto 0 0 0',
                    padding: '46px 22px 18px',
                    background: 'var(--kef-grad-scrim)',
                    color: 'var(--kef-ink-ondark)',
                    fontFamily: 'var(--kef-font-sans)',
                    fontSize: 18,
                  }}
                >
                  {it.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* --------------------------------------------------------------- ArchGallery */

export type ArchGalleryProps = {
  eyebrow?: string;
  headline?: string;
  items: { image: string; label: string; sub?: string }[];
};

/**
 * Portrait images in Greek arches — the shape of every whitewashed church
 * window on the island. Use once or twice; it's the deck's signature move.
 */
export function ArchGallery({ eyebrow, headline, items }: ArchGalleryProps) {
  return (
    <Slide surface="limestone">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 40 }}>
        <header className="kef-anim-rise" style={{ textAlign: 'center' }}>
          {eyebrow && <p className="kef-eyebrow">{eyebrow}</p>}
          {headline && (
            <h2 className="kef-display-m" style={{ marginTop: 10 }}>
              {headline}
            </h2>
          )}
        </header>
        <div
          className="kef-stagger"
          style={{ flex: 1, display: 'flex', gap: 34, justifyContent: 'center', alignItems: 'stretch', minHeight: 0 }}
        >
          {items.map((it) => (
            <figure key={it.label} style={{ margin: 0, flex: 1, maxWidth: 380, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflow: 'hidden',
                  borderRadius: 'var(--kef-radius-arch)',
                  border: '10px solid var(--kef-whitewash)',
                  boxShadow: 'var(--kef-shadow-lg)',
                }}
              >
                <img
                  src={it.image}
                  alt={it.label}
                  className="kef-ken-burns"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <figcaption style={{ marginTop: 20, textAlign: 'center' }}>
                <p className="kef-title" style={{ fontSize: 34 }}>
                  {it.label}
                </p>
                {it.sub && (
                  <p className="kef-caption" style={{ marginTop: 6 }}>
                    {it.sub}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------ CompareSlider */

export type CompareSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  headline?: string;
  caption?: string;
};

/**
 * Drag-to-compare wipe. Built for one specific moment: Myrtos at noon versus
 * the same frame at sunset. Hand the mouse to the room and let them scrub.
 */
export function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Noon',
  afterLabel = 'Sunset',
  headline,
  caption,
}: CompareSliderProps) {
  const [pct, setPct] = useState(52);
  const box = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <Slide surface="white" padded={false}>
      <div
        ref={box}
        data-kef-interactive
        onPointerDown={(e) => {
          dragging.current = true;
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
        style={{ position: 'absolute', inset: 0, cursor: 'ew-resize', userSelect: 'none', touchAction: 'none' }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <img
          src={beforeImage}
          alt={beforeLabel}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
          }}
        />

        {/* Handle */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pct}%`, width: 3, background: 'var(--kef-whitewash)', boxShadow: '0 0 24px rgba(6,56,75,0.5)' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--kef-whitewash)',
              boxShadow: 'var(--kef-shadow-lg)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--kef-font-sans)',
              fontSize: 22,
              color: 'var(--kef-sea-deep)',
            }}
          >
            ↔
          </div>
        </div>

        <Label side="left" text={beforeLabel} />
        <Label side="right" text={afterLabel} />

        {(headline || caption) && (
          <div className="kef-glass kef-anim-rise" style={{ position: 'absolute', left: 'var(--kef-gutter)', bottom: 190, maxWidth: 760, padding: '30px 38px' }}>
            {headline && <h2 className="kef-title">{headline}</h2>}
            {caption && (
              <p className="kef-body" style={{ marginTop: 10 }}>
                {caption}
              </p>
            )}
            <WaveRule width={140} stroke="var(--kef-sea-myrtos)" style={{ marginTop: 16 }} />
          </div>
        )}
      </div>
    </Slide>
  );
}

function Label({ side, text }: { side: 'left' | 'right'; text: string }) {
  return (
    <span
      className="kef-chip"
      style={{
        position: 'absolute',
        top: 56,
        [side]: 56,
        background: 'rgba(6,56,75,0.5)',
        borderColor: 'rgba(253,251,246,0.3)',
        color: 'var(--kef-ink-ondark)',
        backdropFilter: 'var(--kef-blur-glass)',
      } as React.CSSProperties}
    >
      {text}
    </span>
  );
}
