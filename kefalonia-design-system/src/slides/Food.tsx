/**
 * Food slides — the taverna chapter.
 *
 * The food chapter gets its own accent (mavrodaphne wine red on limestone) so
 * it feels like a different room from the sea chapters. Ratings are olives,
 * not stars: five olives, filled with olive green.
 */

import React, { useState } from 'react';
import { Slide } from '../primitives/DeckShell';
import { Meander } from '../primitives/Ornaments';

export type Taverna = {
  name: string;
  place: string;
  image?: string;
  /** 0–5, halves allowed. */
  rating: number;
  /** The one thing to order. */
  mustOrder: string;
  /** Two lines, max. What it felt like to sit there. */
  note: string;
  price?: '€' | '€€' | '€€€';
  /** Shown as a small mono line: "book two days ahead". */
  tip?: string;
};

function Olives({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5`} style={{ display: 'inline-flex', gap: 6 }}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <defs>
              <linearGradient id={`kef-olive-${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="var(--kef-olive)" />
                <stop offset={`${fill * 100}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
            <ellipse
              cx="11"
              cy="11"
              rx="7"
              ry="9.5"
              fill={`url(#kef-olive-${i}-${Math.round(fill * 100)})`}
              stroke="var(--kef-olive-deep)"
              strokeWidth="1.6"
            />
          </svg>
        );
      })}
    </span>
  );
}

/** A single taverna card. Flips on click to show the tip on the back. */
export function TavernaCard({ t }: { t: Taverna }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      data-kef-interactive
      onClick={() => t.tip && setFlipped((f) => !f)}
      style={{ perspective: 1400, cursor: t.tip ? 'pointer' : 'default', height: '100%' }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'none',
          transition: 'transform var(--kef-dur-slow) var(--kef-ease-tide)',
        }}
      >
        {/* Front */}
        <article
          className="kef-card"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {t.image && (
            <img src={t.image} alt={t.name} style={{ width: '100%', height: 250, objectFit: 'cover', display: 'block' }} />
          )}
          <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <h3 className="kef-title" style={{ fontSize: 34 }}>
                {t.name}
              </h3>
              {t.price && (
                <span className="kef-mono" style={{ color: 'var(--kef-mavrodaphne)', fontSize: 20 }}>
                  {t.price}
                </span>
              )}
            </div>
            <p className="kef-caption" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t.place}
            </p>
            <Olives rating={t.rating} />
            <p className="kef-body" style={{ marginTop: 6 }}>
              {t.note}
            </p>
            <p
              style={{
                marginTop: 'auto',
                paddingTop: 16,
                borderTop: 'var(--kef-border-sand)',
                fontFamily: 'var(--kef-font-sans)',
                fontSize: 19,
                color: 'var(--kef-mavrodaphne)',
                fontWeight: 500,
              }}
            >
              Order the {t.mustOrder}
            </p>
          </div>
        </article>

        {/* Back */}
        {t.tip && (
          <article
            className="kef-card"
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'var(--kef-mavrodaphne)',
              border: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 20,
              padding: 40,
              color: 'var(--kef-ink-ondark)',
            }}
          >
            <p className="kef-eyebrow" style={{ color: 'var(--kef-sun)' }}>
              Insider tip
            </p>
            <p className="kef-body-l" style={{ color: 'rgba(253,251,246,0.92)' }}>
              {t.tip}
            </p>
            <Meander width={160} stroke="var(--kef-sun)" opacity={0.6} />
          </article>
        )}
      </div>
    </div>
  );
}

/**
 * The taverna slide: three or four cards side by side. Click any card for the
 * insider tip on the back — a small reward for the people paying attention.
 */
export function TavernaGrid({
  eyebrow = 'Chapter · where we ate',
  headline = 'Four tavernas worth the drive',
  tavernas,
  footnote,
}: {
  eyebrow?: string;
  headline?: string;
  tavernas: Taverna[];
  footnote?: string;
}) {
  return (
    <Slide surface="limestone">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 34 }}>
        <header className="kef-anim-rise">
          <p className="kef-eyebrow" style={{ color: 'var(--kef-mavrodaphne)' }}>
            {eyebrow}
          </p>
          <h2 className="kef-display-m" style={{ marginTop: 12 }}>
            {headline}
          </h2>
        </header>
        <div
          className="kef-stagger"
          style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: `repeat(${tavernas.length}, 1fr)`, gap: 26 }}
        >
          {tavernas.map((t) => (
            <TavernaCard key={t.name} t={t} />
          ))}
        </div>
        {footnote && <p className="kef-caption">{footnote}</p>}
      </div>
    </Slide>
  );
}

/**
 * Menu slide for a single standout dinner — the one you want to describe dish
 * by dish. Set on wine red so it reads as an evening, not an afternoon.
 */
export function MenuSlide({
  restaurant,
  place,
  courses,
  image,
  total,
}: {
  restaurant: string;
  place: string;
  courses: { dish: string; greek?: string; detail?: string }[];
  image?: string;
  total?: string;
}) {
  return (
    <Slide surface="photo" image={image} padded>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(110,36,56,0.55)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div className="kef-stagger">
          <p className="kef-eyebrow" style={{ color: 'var(--kef-sun)' }}>
            {place}
          </p>
          <h2 className="kef-display-l" style={{ marginTop: 14 }}>
            {restaurant}
          </h2>
          <Meander width={220} stroke="var(--kef-sun)" style={{ marginTop: 24 }} />
        </div>
        <div className="kef-glass kef-stagger" style={{ padding: 44, display: 'grid', gap: 22 }}>
          {courses.map((c) => (
            <div key={c.dish} style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 16, borderBottom: '1px solid rgba(253,251,246,0.18)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
                <span className="kef-title" style={{ fontSize: 32 }}>
                  {c.dish}
                </span>
                {c.greek && (
                  <span className="kef-note" style={{ fontSize: 26 }}>
                    {c.greek}
                  </span>
                )}
              </div>
              {c.detail && <span className="kef-caption">{c.detail}</span>}
            </div>
          ))}
          {total && (
            <p className="kef-mono" style={{ fontSize: 20, color: 'var(--kef-sun)' }}>
              {total}
            </p>
          )}
        </div>
      </div>
    </Slide>
  );
}
