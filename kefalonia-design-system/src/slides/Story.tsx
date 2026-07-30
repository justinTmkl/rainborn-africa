/**
 * Story slides — the connective tissue: split layouts, the itinerary, numbers,
 * "did you know" cards, and the Greek phrasebook.
 *
 * These are the slides you'll use most, so they're deliberately plainer than
 * the media slides. One idea each, generous whitespace, no more than two
 * ornaments. If a story slide feels busy, split it into two.
 */

import React, { useEffect, useState } from 'react';
import { Slide, useSlideActive } from '../primitives/DeckShell';
import { Meander, OliveSprig, WaveRule } from '../primitives/Ornaments';

/* --------------------------------------------------------------- SplitSlide */

export type SplitSlideProps = {
  eyebrow?: string;
  headline: string;
  body?: string;
  /** Bulleted beats. Keep to four, six words each. */
  points?: string[];
  media: { image?: string; video?: string; poster?: string; caption?: string };
  /** Which side the media sits on. Alternate through the deck for rhythm. */
  mediaSide?: 'left' | 'right';
  surface?: 'white' | 'limestone' | 'foam';
  note?: string;
};

/** Half text, half media. The default content slide. */
export function SplitSlide({
  eyebrow,
  headline,
  body,
  points = [],
  media,
  mediaSide = 'right',
  surface = 'white',
  note,
}: SplitSlideProps) {
  const active = useSlideActive();
  const mediaBlock = (
    <figure style={{ margin: 0, position: 'relative', height: '100%', borderRadius: 'var(--kef-radius-lg)', overflow: 'hidden', boxShadow: 'var(--kef-shadow-lg)' }}>
      {media.video ? (
        <video
          key={active ? 'on' : 'off'}
          src={media.video}
          poster={media.poster}
          autoPlay={active}
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <img src={media.image} alt={media.caption ?? headline} className="kef-ken-burns" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {media.caption && (
        <figcaption
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            padding: '54px 26px 20px',
            background: 'var(--kef-grad-scrim)',
            color: 'var(--kef-ink-ondark)',
            fontFamily: 'var(--kef-font-sans)',
            fontSize: 18,
          }}
        >
          {media.caption}
        </figcaption>
      )}
    </figure>
  );

  const textBlock = (
    <div className="kef-stagger" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      {eyebrow && <p className="kef-eyebrow">{eyebrow}</p>}
      <h2 className="kef-display-m" style={{ marginTop: 14 }}>
        {headline}
      </h2>
      <WaveRule width={160} style={{ marginTop: 22 }} />
      {body && (
        <p className="kef-body-l" style={{ marginTop: 26, maxWidth: 720 }}>
          {body}
        </p>
      )}
      {points.length > 0 && (
        <ul style={{ marginTop: 28, padding: 0, listStyle: 'none', display: 'grid', gap: 16 }}>
          {points.map((p) => (
            <li key={p} className="kef-body-l" style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <span aria-hidden="true" style={{ color: 'var(--kef-sun)', fontSize: 22 }}>
                ◆
              </span>
              {p}
            </li>
          ))}
        </ul>
      )}
      {note && (
        <p className="kef-note" style={{ marginTop: 30, transform: 'rotate(-1deg)' }}>
          {note}
        </p>
      )}
    </div>
  );

  return (
    <Slide surface={surface}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 88, height: '100%' }}>
        {mediaSide === 'left' ? mediaBlock : textBlock}
        {mediaSide === 'left' ? textBlock : mediaBlock}
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------- Itinerary */

export type ItineraryDay = {
  day: string;
  title: string;
  detail?: string;
  icon?: string;
  /** Highlight the day you want the room to remember. */
  accent?: boolean;
};

/**
 * Seven days across the slide as a coast road. Reveals day by day so you can
 * talk over it rather than let the audience read ahead.
 */
export function Itinerary({
  eyebrow = 'The week',
  headline = 'Seven days, clockwise around the island',
  days,
}: {
  eyebrow?: string;
  headline?: string;
  days: ItineraryDay[];
}) {
  const active = useSlideActive();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    const timers = days.map((_, i) => setTimeout(() => setShown(i + 1), 420 + i * 260));
    return () => timers.forEach(clearTimeout);
  }, [active, days]);

  return (
    <Slide surface="limestone">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header className="kef-anim-rise">
          <p className="kef-eyebrow">{eyebrow}</p>
          <h2 className="kef-display-m" style={{ marginTop: 12 }}>
            {headline}
          </h2>
        </header>

        <div style={{ position: 'relative', flex: 1, marginTop: 72 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 96, height: 2, background: 'var(--kef-sand)' }} />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 96,
              height: 2,
              background: 'var(--kef-sun)',
              width: `${(shown / days.length) * 100}%`,
              transition: 'width var(--kef-dur-slow) var(--kef-ease-swell)',
            }}
          />
          <div style={{ display: 'flex', gap: 20, height: '100%' }}>
            {days.map((d, i) => {
              const on = i < shown;
              return (
                <div
                  key={d.day}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    opacity: on ? 1 : 0.15,
                    transform: on ? 'none' : 'translateY(14px)',
                    transition: 'opacity var(--kef-dur-base) linear, transform var(--kef-dur-base) var(--kef-ease-swell)',
                  }}
                >
                  <p className="kef-eyebrow" style={{ color: d.accent ? 'var(--kef-terracotta)' : undefined }}>
                    {d.day}
                  </p>
                  <div style={{ height: 34 }} />
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: d.accent ? 'var(--kef-sun)' : 'var(--kef-whitewash)',
                      border: `3px solid ${d.accent ? 'var(--kef-terracotta)' : 'var(--kef-sea-mid)'}`,
                      boxShadow: 'var(--kef-shadow-sm)',
                    }}
                  />
                  <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                    {d.icon && <span style={{ fontSize: 40 }}>{d.icon}</span>}
                    <h3 className="kef-title" style={{ fontSize: 30 }}>
                      {d.title}
                    </h3>
                    {d.detail && <p className="kef-caption" style={{ maxWidth: 220 }}>{d.detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------- StatRow */

export type Stat = { value: string; label: string; sub?: string; icon?: string };

/**
 * The holiday in numbers. Values count up on arrival where they're numeric —
 * cheap trick, works every time.
 */
export function StatRow({
  eyebrow = 'By the numbers',
  headline,
  stats,
  surface = 'sea',
}: {
  eyebrow?: string;
  headline?: string;
  stats: Stat[];
  surface?: 'sea' | 'white' | 'limestone';
}) {
  return (
    <Slide surface={surface}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 64 }}>
        <header className="kef-anim-rise" style={{ textAlign: 'center' }}>
          <p className="kef-eyebrow">{eyebrow}</p>
          {headline && (
            <h2 className="kef-display-m" style={{ marginTop: 12 }}>
              {headline}
            </h2>
          )}
        </header>
        <div className="kef-stagger" style={{ display: 'flex', gap: 34, justifyContent: 'center' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ flex: 1, maxWidth: 340, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {s.icon && <span style={{ fontSize: 48 }}>{s.icon}</span>}
              <CountUp value={s.value} />
              <p className="kef-eyebrow" style={{ letterSpacing: '0.16em' }}>
                {s.label}
              </p>
              {s.sub && <p className="kef-caption">{s.sub}</p>}
            </div>
          ))}
        </div>
        <Meander width={340} stroke="var(--kef-sun)" opacity={0.7} style={{ margin: '0 auto' }} />
      </div>
    </Slide>
  );
}

/** Counts up to a numeric value, leaving any prefix/suffix intact ("28 °C", "1 628 m"). */
function CountUp({ value }: { value: string }) {
  const active = useSlideActive();
  const match = value.match(/^(\D*)([\d\s.,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/[\s,]/g, '')) : NaN;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active || !Number.isFinite(target)) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  if (!match || !Number.isFinite(target)) {
    return <p className="kef-display-l" style={{ fontSize: 96 }}>{value}</p>;
  }
  return (
    <p className="kef-display-l" style={{ fontSize: 96 }}>
      {match[1]}
      {n.toLocaleString('en-GB')}
      {match[3]}
    </p>
  );
}

/* ------------------------------------------------------------------ FactCard */

/**
 * "Did you know" card. Two per deck maximum — they're the seasoning, and the
 * Captain Corelli fact is the one that always lands.
 */
export function FactRow({
  eyebrow = 'Island trivia',
  headline,
  facts,
}: {
  eyebrow?: string;
  headline?: string;
  facts: { title: string; body: string; icon?: string }[];
}) {
  return (
    <Slide surface="white">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 52, justifyContent: 'center' }}>
        <header className="kef-anim-rise">
          <p className="kef-eyebrow">{eyebrow}</p>
          {headline && (
            <h2 className="kef-display-m" style={{ marginTop: 12 }}>
              {headline}
            </h2>
          )}
        </header>
        <div className="kef-stagger" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(facts.length, 3)}, 1fr)`, gap: 30 }}>
          {facts.map((f) => (
            <article key={f.title} className="kef-card" style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontSize: 46 }}>{f.icon ?? '☼'}</span>
              <h3 className="kef-title" style={{ fontSize: 34 }}>
                {f.title}
              </h3>
              <p className="kef-body">{f.body}</p>
            </article>
          ))}
        </div>
        <OliveSprig width={140} />
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------- Phrasebook */

export type Phrase = { greek: string; latin: string; english: string; when?: string };

/**
 * Greek phrasebook. Click a row and it speaks the phrase via the browser's
 * speech synthesis — the audience will make you do all of them.
 */
export function Phrasebook({
  eyebrow = 'Five words that got us everywhere',
  headline = 'A little Greek goes a long way',
  phrases,
}: {
  eyebrow?: string;
  headline?: string;
  phrases: Phrase[];
}) {
  const [spoken, setSpoken] = useState<string | null>(null);

  const say = (p: Phrase) => {
    setSpoken(p.greek);
    try {
      const u = new SpeechSynthesisUtterance(p.greek);
      u.lang = 'el-GR';
      u.rate = 0.85;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {
      /* No speech synthesis — the row still highlights. */
    }
  };

  return (
    <Slide surface="foam">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 44, justifyContent: 'center' }}>
        <header className="kef-anim-rise">
          <p className="kef-eyebrow">{eyebrow}</p>
          <h2 className="kef-display-m" style={{ marginTop: 12 }}>
            {headline}
          </h2>
          <p className="kef-caption" style={{ marginTop: 14 }}>
            Click a line to hear it.
          </p>
        </header>
        <div className="kef-stagger" style={{ display: 'grid', gap: 14 }}>
          {phrases.map((p) => (
            <button
              key={p.greek}
              data-kef-interactive
              onClick={() => say(p)}
              style={{
                display: 'grid',
                gridTemplateColumns: '280px 300px 1fr auto',
                alignItems: 'center',
                gap: 30,
                textAlign: 'left',
                padding: '24px 32px',
                cursor: 'pointer',
                borderRadius: 'var(--kef-radius-md)',
                border: spoken === p.greek ? '2px solid var(--kef-sun)' : 'var(--kef-border-sand)',
                background: spoken === p.greek ? 'rgba(246,192,73,0.16)' : 'var(--kef-whitewash)',
                transition: 'background var(--kef-dur-quick) linear, border-color var(--kef-dur-quick) linear',
              }}
            >
              <span className="kef-title" style={{ fontSize: 40 }}>
                {p.greek}
              </span>
              <span className="kef-mono" style={{ fontSize: 20, color: 'var(--kef-sea-mid)' }}>
                {p.latin}
              </span>
              <span className="kef-body-l" style={{ color: 'var(--kef-ink)' }}>
                {p.english}
              </span>
              {p.when && <span className="kef-chip kef-chip--olive">{p.when}</span>}
            </button>
          ))}
        </div>
      </div>
    </Slide>
  );
}
