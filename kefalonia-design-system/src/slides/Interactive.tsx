/**
 * Interactive slides — the parts of the talk where the room does something.
 *
 * Two of them exist for one reason each:
 *   QuizSlide   — wakes the audience up in the middle third, where attention dips.
 *   IslandDuel  — Mischka is presenting Sicily. This slide sets the two islands
 *                 side by side so the two talks join up instead of competing.
 */

import React, { useEffect, useState } from 'react';
import { Slide, useSlideActive } from '../primitives/DeckShell';
import { Meander, WaveRule } from '../primitives/Ornaments';

/* ---------------------------------------------------------------- QuizSlide */

export type QuizSlideProps = {
  question: string;
  /** Exactly one option has correct: true. */
  options: { label: string; image?: string; correct?: boolean }[];
  /** Shown after the reveal — the story behind the answer. */
  reveal?: string;
  eyebrow?: string;
};

/**
 * "Which one of these is Kefalonia?" Four photos, click one, the wrong ones fade
 * and the right one blooms. Works with a mouse or by hands up and one click.
 */
export function QuizSlide({ question, options, reveal, eyebrow = 'Your turn' }: QuizSlideProps) {
  const active = useSlideActive();
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (!active) setPicked(null);
  }, [active]);

  const answered = picked !== null;

  return (
    <Slide surface="sea">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 36 }}>
        <header className="kef-anim-rise">
          <p className="kef-eyebrow">{eyebrow}</p>
          <h2 className="kef-display-m" style={{ marginTop: 12 }}>
            {question}
          </h2>
        </header>

        <div className="kef-stagger" style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 24 }}>
          {options.map((o, i) => {
            const isCorrect = Boolean(o.correct);
            const state = !answered ? 'idle' : isCorrect ? 'right' : i === picked ? 'wrong' : 'dim';
            return (
              <button
                key={o.label}
                data-kef-interactive
                onClick={() => !answered && setPicked(i)}
                style={{
                  position: 'relative',
                  padding: 0,
                  overflow: 'hidden',
                  cursor: answered ? 'default' : 'pointer',
                  borderRadius: 'var(--kef-radius-lg)',
                  border:
                    state === 'right'
                      ? '4px solid var(--kef-sun)'
                      : state === 'wrong'
                        ? '4px solid var(--kef-bougainvillea)'
                        : 'var(--kef-border-glass)',
                  opacity: state === 'dim' ? 0.35 : 1,
                  transform: state === 'right' ? 'translateY(-10px) scale(1.02)' : 'none',
                  boxShadow: state === 'right' ? 'var(--kef-shadow-sun)' : 'var(--kef-shadow-md)',
                  transition: 'all var(--kef-dur-slow) var(--kef-ease-lift)',
                  background: 'rgba(6,56,75,0.4)',
                }}
              >
                {o.image && (
                  <img src={o.image} alt={o.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 300 }} />
                )}
                <span
                  style={{
                    position: 'absolute',
                    inset: 'auto 0 0 0',
                    padding: '48px 20px 20px',
                    background: 'var(--kef-grad-scrim)',
                    color: 'var(--kef-ink-ondark)',
                    fontFamily: 'var(--kef-font-sans)',
                    fontSize: 22,
                    fontWeight: 500,
                  }}
                >
                  {answered && isCorrect ? `✓ ${o.label}` : o.label}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ minHeight: 90 }}>
          {answered && reveal && (
            <p className="kef-body-l kef-anim-rise" style={{ maxWidth: 1300 }}>
              {reveal}
            </p>
          )}
          {!answered && <p className="kef-caption">Click the one you think it is.</p>}
        </div>
      </div>
    </Slide>
  );
}

/* --------------------------------------------------------------- IslandDuel */

export type DuelRow = {
  criterion: string;
  /** Left island (Kefalonia). */
  left: string;
  /** Right island (Sicily). */
  right: string;
  /** Who takes the point. 'tie' is allowed and often the honest answer. */
  winner: 'left' | 'right' | 'tie';
};

export type IslandDuelProps = {
  leftName?: string;
  rightName?: string;
  leftSub?: string;
  rightSub?: string;
  rows: DuelRow[];
  /** The closing line. Make it generous — she's in the room. */
  verdict?: string;
  eyebrow?: string;
};

/**
 * Kefalonia vs Sicily, row by row. Rows land one at a time and the point flies
 * to whichever side won it, so the tally builds while you talk.
 *
 * Written to be handed to a second presenter: the two decks share the same
 * table, so Mischka's Sicily deck can show the mirrored version.
 */
export function IslandDuel({
  leftName = 'Kefalonia',
  rightName = 'Sicily',
  leftSub = 'Ionian · 781 km²',
  rightSub = 'Tyrrhenian · 25 711 km²',
  rows,
  verdict,
  eyebrow = 'Ionian vs Tyrrhenian',
}: IslandDuelProps) {
  const active = useSlideActive();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    const timers = rows.map((_, i) => setTimeout(() => setShown(i + 1), 600 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, [active, rows]);

  const visible = rows.slice(0, shown);
  const leftScore = visible.filter((r) => r.winner === 'left').length;
  const rightScore = visible.filter((r) => r.winner === 'right').length;
  const ties = visible.filter((r) => r.winner === 'tie').length;

  return (
    <Slide surface="white">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 30 }}>
        <header className="kef-anim-rise" style={{ textAlign: 'center' }}>
          <p className="kef-eyebrow">{eyebrow}</p>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 120px 1fr', alignItems: 'center', gap: 20 }}>
            <div style={{ textAlign: 'right' }}>
              <h2 className="kef-display-m" style={{ color: 'var(--kef-sea-deep)' }}>
                {leftName}
              </h2>
              <p className="kef-caption">{leftSub}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span className="kef-mono" style={{ fontSize: 30, color: 'var(--kef-ink)' }}>
                {leftScore}–{rightScore}
              </span>
              {ties > 0 && <span className="kef-caption">{ties} tied</span>}
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 className="kef-display-m" style={{ color: 'var(--kef-terracotta)' }}>
                {rightName}
              </h2>
              <p className="kef-caption">{rightSub}</p>
            </div>
          </div>
          <WaveRule width={280} style={{ margin: '20px auto 0' }} />
        </header>

        <div style={{ flex: 1, minHeight: 0, display: 'grid', gap: 12, alignContent: 'start' }}>
          {rows.map((r, i) => {
            const on = i < shown;
            const leftWin = r.winner === 'left';
            const rightWin = r.winner === 'right';
            return (
              <div
                key={r.criterion}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 220px 1fr',
                  alignItems: 'center',
                  gap: 20,
                  padding: '18px 26px',
                  borderRadius: 'var(--kef-radius-md)',
                  background: i % 2 ? 'var(--kef-limestone)' : 'transparent',
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(16px)',
                  transition: 'opacity var(--kef-dur-slow) var(--kef-ease-swell), transform var(--kef-dur-slow) var(--kef-ease-swell)',
                }}
              >
                <p
                  className="kef-body-l"
                  style={{
                    textAlign: 'right',
                    color: leftWin ? 'var(--kef-sea-deep)' : 'var(--kef-ink-mute)',
                    fontWeight: leftWin ? 500 : 400,
                  }}
                >
                  {r.left}
                  {leftWin && <span style={{ color: 'var(--kef-sun)' }}> ◆</span>}
                </p>
                <p className="kef-caption" style={{ textAlign: 'center', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {r.criterion}
                </p>
                <p
                  className="kef-body-l"
                  style={{
                    color: rightWin ? 'var(--kef-terracotta)' : 'var(--kef-ink-mute)',
                    fontWeight: rightWin ? 500 : 400,
                  }}
                >
                  {rightWin && <span style={{ color: 'var(--kef-sun)' }}>◆ </span>}
                  {r.right}
                </p>
              </div>
            );
          })}
        </div>

        {verdict && (
          <footer style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: shown >= rows.length ? 1 : 0, transition: 'opacity var(--kef-dur-slow) linear' }}>
            <Meander width={160} stroke="var(--kef-sand)" />
            <p className="kef-note" style={{ fontSize: 34 }}>
              {verdict}
            </p>
          </footer>
        )}
      </div>
    </Slide>
  );
}
