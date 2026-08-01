/**
 * Openers — the slides that set tone: title, chapter dividers, quotes, closing.
 * These carry the ornaments. Content slides stay plain by comparison.
 */

import React, { useEffect, useState } from 'react';
import { Slide, useSlideActive } from '../primitives/DeckShell';
import { Meander, OliveSprig, SunDisc, SunGlint, WaveBand, WaveRule } from '../primitives/Ornaments';

/* ---------------------------------------------------------------- TitleSlide */

export type TitleSlideProps = {
  /** "Kefalonia" */
  title: string;
  /** "Seven days on the greenest island in the Ionian" */
  subtitle?: string;
  eyebrow?: string;
  /** "Justin · Summer 2026" */
  byline?: string;
  /** Background video (mp4/webm, muted loop). Wins over image if both are set. */
  video?: string;
  poster?: string;
  image?: string;
};

/**
 * Opening slide. Letters rise one word at a time out of the scrim while the
 * background footage keeps moving — the room goes quiet on its own.
 */
export function TitleSlide({
  title,
  subtitle,
  eyebrow = 'Ionian Sea · Greece',
  byline,
  video,
  poster,
  image,
}: TitleSlideProps) {
  const active = useSlideActive();
  const words = title.split(' ');

  return (
    <Slide surface="photo" image={video ? undefined : image} padded={false} scrim>
      {video && (
        <video
          key={active ? 'play' : 'idle'}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--kef-grad-scrim)' }} />
      <SunGlint opacity={0.8} />
      <SunDisc size={420} style={{ position: 'absolute', right: 120, top: 70, opacity: 0.5 }} />
      <WaveBand height={150} opacity={0.28} />

      <div
        style={{
          position: 'absolute',
          left: 'var(--kef-gutter)',
          bottom: 190,
          maxWidth: 1300,
        }}
      >
        <div className="kef-anim-rise" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Meander width={140} stroke="var(--kef-sun)" />
          <p className="kef-eyebrow">{eyebrow}</p>
        </div>

        <h1 className="kef-display-xl" style={{ marginTop: 26, display: 'flex', flexWrap: 'wrap', gap: '0 0.28em' }}>
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: `kef-rise var(--kef-dur-cinematic) var(--kef-ease-swell) both`,
                animationDelay: `${180 + i * 140}ms`,
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        {subtitle && (
          <p
            className="kef-subtitle"
            style={{
              marginTop: 26,
              maxWidth: 900,
              animation: 'kef-rise var(--kef-dur-cinematic) var(--kef-ease-swell) both',
              animationDelay: `${300 + words.length * 140}ms`,
            }}
          >
            {subtitle}
          </p>
        )}

        {byline && (
          <p
            className="kef-caption"
            style={{
              marginTop: 34,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              animation: 'kef-fade var(--kef-dur-cinematic) linear both',
              animationDelay: `${600 + words.length * 140}ms`,
            }}
          >
            {byline}
          </p>
        )}
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------ ChapterDivider */

export type ChapterDividerProps = {
  /** "01" */
  number: string;
  title: string;
  blurb?: string;
  image?: string;
  /** Greek spelling shown small under the title, e.g. "Βαρκάδα". */
  greek?: string;
};

/** Chapter break. Oversized numeral, image pushing slowly, one line of promise. */
export function ChapterDivider({ number, title, blurb, image, greek }: ChapterDividerProps) {
  return (
    <Slide surface="photo" image={image} padded>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '340px 1fr', alignItems: 'center', gap: 72 }}>
        <span
          className="kef-numeral kef-anim-rise"
          style={{ color: 'var(--kef-sun)', opacity: 0.92, textAlign: 'right' }}
        >
          {number}
        </span>
        <div className="kef-stagger">
          <WaveRule width={200} stroke="var(--kef-sea-myrtos)" />
          <h2 className="kef-display-l" style={{ marginTop: 22 }}>
            {title}
          </h2>
          {greek && (
            <p className="kef-note" style={{ marginTop: 12 }}>
              {greek}
            </p>
          )}
          {blurb && (
            <p className="kef-body-l" style={{ marginTop: 24, maxWidth: 820 }}>
              {blurb}
            </p>
          )}
        </div>
      </div>
    </Slide>
  );
}

/* -------------------------------------------------------------- QuoteSlide */

export type QuoteSlideProps = {
  quote: string;
  attribution?: string;
  surface?: 'limestone' | 'foam' | 'sea';
};

/** A breath between chapters. One sentence, a lot of air, nothing else. */
export function QuoteSlide({ quote, attribution, surface = 'limestone' }: QuoteSlideProps) {
  return (
    <Slide surface={surface}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 34,
        }}
        className="kef-stagger"
      >
        <OliveSprig width={120} />
        <blockquote
          className="kef-display-m"
          style={{ maxWidth: 1250, margin: 0, fontStyle: 'italic', fontWeight: 300 }}
        >
          “{quote}”
        </blockquote>
        {attribution && <p className="kef-eyebrow">{attribution}</p>}
        <Meander width={260} stroke="var(--kef-sand)" />
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------- ClosingSlide */

export type ClosingSlideProps = {
  /** "Efharistó" */
  headline?: string;
  /** Latin gloss under it, e.g. "Thank you — ευχαριστώ". */
  translation?: string;
  /** Closing line: where you're going next, or an invitation. */
  line?: string;
  image?: string;
  /** Small credits row: photos, music, travel companion. */
  credits?: string[];
};

/**
 * The last slide. Sun sinks into the horizon over ~4s and stays there, so the
 * deck ends on a held image instead of a black screen while you take questions.
 */
export function ClosingSlide({
  headline = 'Efharistó',
  translation = 'Thank you · ευχαριστώ',
  line,
  image,
  credits = [],
}: ClosingSlideProps) {
  const active = useSlideActive();
  const [sunk, setSunk] = useState(false);

  useEffect(() => {
    if (!active) {
      setSunk(false);
      return;
    }
    const t = setTimeout(() => setSunk(true), 400);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <Slide surface="photo" image={image} padded>
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'var(--kef-grad-sunset)', opacity: 0.38, mixBlendMode: 'screen' }}
      />
      <SunDisc
        size={360}
        animate={false}
        style={{
          position: 'absolute',
          left: '50%',
          marginLeft: -180,
          bottom: sunk ? -170 : 90,
          opacity: sunk ? 0.85 : 0.55,
          transition: 'bottom 4200ms var(--kef-ease-drift), opacity 4200ms linear',
        }}
      />
      <WaveBand height={170} opacity={0.4} speed={30} />

      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 18,
        }}
      >
        <h2 className="kef-display-xl kef-anim-rise">{headline}</h2>
        <p className="kef-eyebrow kef-anim-fade" style={{ animationDelay: '400ms' }}>
          {translation}
        </p>
        {line && (
          <p className="kef-subtitle kef-anim-fade" style={{ marginTop: 18, maxWidth: 900, animationDelay: '700ms' }}>
            {line}
          </p>
        )}
      </div>

      {credits.length > 0 && (
        <p
          className="kef-caption"
          style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex', gap: 28, flexWrap: 'wrap' }}
        >
          {credits.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </p>
      )}
    </Slide>
  );
}
