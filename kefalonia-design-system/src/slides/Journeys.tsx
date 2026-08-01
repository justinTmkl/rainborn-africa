/**
 * Journeys — the two slides that answer "where actually is this?" and
 * "what did you do on the boat all day?".
 *
 * Both animate on arrival: the route draws itself, the pins drop in sequence,
 * the boat sails the path. Nothing appears all at once, because the point is to
 * narrate a movement through a place while the audience watches it happen.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Slide, useSlideActive } from '../primitives/DeckShell';
import { OliveSprig, WaveRule } from '../primitives/Ornaments';

/* --------------------------------------------------------------- IslandMap */

export type MapPin = {
  id: string;
  label: string;
  /** Position inside the 800x700 island viewBox. */
  x: number;
  y: number;
  /** Nudge the label off the pin when two sit close together. */
  align?: 'left' | 'right';
  kind?: 'town' | 'beach' | 'nature' | 'stay';
};

/**
 * The coastline of Kefalonia, sampled from real coordinates
 * (x = (lon − 20.34) × 1300, y = (38.48 − lat) × 1600) and smoothed.
 *
 * Not a survey map — a drawn shape. But the two features that make the island
 * recognisable from the back of a room are in the right places: the deep Gulf
 * of Argostoli splitting the south, and the long Erisos peninsula running up to
 * Fiskardo. Keep the viewBox at 620x700 so the pin coordinates still land.
 */
export const KEFALONIA_OUTLINE =
  'M308 40 C316 43 327 95 330 118 C333 141 325 181 326 205 C327 229 328 267 338 288 ' +
  'C348 309 386 340 399 356 C412 372 416 388 432 404 C448 420 493 452 512 470 ' +
  'C531 488 556 507 566 528 C576 549 584 601 586 620 C588 639 591 652 578 660 ' +
  'C565 668 519 681 494 674 C469 667 430 622 403 612 C376 602 328 605 300 600 ' +
  'C272 595 219 598 206 580 C193 562 208 494 208 470 C208 446 213 421 205 412 ' +
  'C197 403 160 396 152 408 C144 420 148 476 146 500 C144 524 150 566 140 574 ' +
  'C130 582 94 573 78 558 C62 543 37 492 30 470 C23 448 22 419 26 400 ' +
  'C30 381 43 347 56 336 C69 325 104 324 120 322 C136 320 159 326 172 320 ' +
  'C185 314 203 296 214 282 C225 268 243 240 248 224 C253 208 247 186 250 168 ' +
  'C253 150 264 118 272 100 C280 82 300 37 308 40 Z';

/** Mount Ainos, the island's spine. Drawn over the outline. */
export const KEFALONIA_RIDGE = 'M286 512 l36 -30 l30 24 l34 -20 l40 32';

/** The eight pins the deck uses, in the same coordinate space as the outline. */
export const KEFALONIA_PINS: MapPin[] = [
  { id: 'fiskardo', label: 'Fiskardo', x: 308, y: 46, kind: 'town' },
  { id: 'assos', label: 'Assos', x: 252, y: 170, kind: 'town', align: 'left' },
  { id: 'myrtos', label: 'Myrtos', x: 250, y: 222, kind: 'beach', align: 'left' },
  { id: 'sami', label: 'Sami', x: 397, y: 356, kind: 'town' },
  { id: 'ainos', label: 'Mt Ainos', x: 356, y: 468, kind: 'nature' },
  { id: 'argostoli', label: 'Argostoli', x: 208, y: 486, kind: 'stay' },
  { id: 'lixouri', label: 'Lixouri', x: 148, y: 470, kind: 'town', align: 'left' },
  { id: 'poros', label: 'Poros', x: 562, y: 528, kind: 'town', align: 'left' },
];

export type IslandMapProps = {
  eyebrow?: string;
  headline?: string;
  /** Defaults to KEFALONIA_PINS. */
  pins?: MapPin[];
  /** Ordered pin ids — the route drawn between them. Omit for pins only. */
  route?: string[];
  /** Facts printed beside the map: size, population, flight time. */
  facts?: { label: string; value: string }[];
  caption?: string;
};

const PIN_COLOR: Record<NonNullable<MapPin['kind']>, string> = {
  town: 'var(--kef-terracotta)',
  beach: 'var(--kef-sea-mid)',
  nature: 'var(--kef-olive)',
  stay: 'var(--kef-bougainvillea)',
};

export function IslandMap({
  eyebrow = 'The island',
  headline,
  pins = KEFALONIA_PINS,
  route,
  facts = [],
  caption,
}: IslandMapProps) {
  const active = useSlideActive();
  const byId = useMemo(() => Object.fromEntries(pins.map((p) => [p.id, p])), [pins]);

  const routePath = useMemo(() => {
    if (!route || route.length < 2) return null;
    const pts = route.map((id) => byId[id]).filter(Boolean) as MapPin[];
    if (pts.length < 2) return null;
    // Smooth the route with quadratic midpoints so it curves like a coast road.
    return pts.reduce((d, p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2 + (p.y - prev.y) * 0.16;
      const cy = (prev.y + p.y) / 2 - (p.x - prev.x) * 0.16;
      return `${d} Q${cx} ${cy} ${p.x} ${p.y}`;
    }, '');
  }, [route, byId]);

  return (
    <Slide surface="foam">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: 72, height: '100%', alignItems: 'center' }}>
        <div style={{ position: 'relative', height: '100%', display: 'grid', placeItems: 'center' }}>
          <svg viewBox="-30 10 690 700" style={{ width: '100%', height: '100%' }} role="img" aria-label="Map of Kefalonia">
            <defs>
              <linearGradient id="kef-island-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--kef-limestone)" />
                <stop offset="60%" stopColor="var(--kef-sand)" />
                <stop offset="100%" stopColor="var(--kef-olive)" />
              </linearGradient>
            </defs>

            {/* Sea rings around the coast — the classic drawn-map halo. */}
            {[1.035, 1.075, 1.115].map((k, i) => (
              <path
                key={k}
                d={KEFALONIA_OUTLINE}
                fill="none"
                stroke="var(--kef-sea-mid)"
                strokeWidth="2"
                opacity={0.2 * (1 - i * 0.3)}
                transform={`translate(${-306 * (k - 1)} ${-352 * (k - 1)}) scale(${k})`}
              />
            ))}

            <path d={KEFALONIA_OUTLINE} fill="url(#kef-island-fill)" stroke="var(--kef-olive-deep)" strokeWidth="3" />
            <path d={KEFALONIA_RIDGE} fill="none" stroke="var(--kef-cypress)" strokeWidth="5" strokeLinecap="round" opacity="0.5" />

            {routePath && (
              <path
                d={routePath}
                fill="none"
                stroke="var(--kef-bougainvillea)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="14 12"
                style={{
                  ['--kef-dash' as string]: 4000,
                  strokeDashoffset: active ? 0 : 4000,
                  transition: 'stroke-dashoffset 3600ms var(--kef-ease-tide)',
                }}
              />
            )}

            {pins.map((p, i) => (
              <g
                key={p.id}
                style={{
                  animation: active ? 'kef-pin-drop var(--kef-dur-slow) var(--kef-ease-lift) both' : undefined,
                  animationDelay: `${600 + i * 180}ms`,
                  transformOrigin: `${p.x}px ${p.y}px`,
                }}
              >
                <circle cx={p.x} cy={p.y} r="13" fill={PIN_COLOR[p.kind ?? 'town']} stroke="var(--kef-whitewash)" strokeWidth="4" />
                <text
                  x={p.align === 'left' ? p.x - 24 : p.x + 24}
                  y={p.y + 7}
                  textAnchor={p.align === 'left' ? 'end' : 'start'}
                  style={{ fontFamily: 'var(--kef-font-sans)', fontSize: 24, fontWeight: 500, fill: 'var(--kef-ink)' }}
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="kef-stagger">
          <p className="kef-eyebrow">{eyebrow}</p>
          {headline && (
            <h2 className="kef-display-m" style={{ marginTop: 12 }}>
              {headline}
            </h2>
          )}
          <WaveRule width={180} style={{ marginTop: 22 }} />
          {caption && (
            <p className="kef-body-l" style={{ marginTop: 24 }}>
              {caption}
            </p>
          )}
          {facts.length > 0 && (
            <dl style={{ marginTop: 34, display: 'grid', gap: 18 }}>
              {facts.map((f) => (
                <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, borderBottom: 'var(--kef-border-sand)', paddingBottom: 12 }}>
                  <dt className="kef-caption" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {f.label}
                  </dt>
                  <dd className="kef-body" style={{ margin: 0, fontWeight: 500, color: 'var(--kef-ink)' }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <OliveSprig width={130} style={{ marginTop: 30 }} />
        </div>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- BoatTour */

export type BoatStop = {
  time: string;
  name: string;
  detail?: string;
  image?: string;
  /** One-word feeling for the chip: "swim stop", "cave", "lunch". */
  tag?: string;
};

export type BoatTourProps = {
  eyebrow?: string;
  headline?: string;
  stops: BoatStop[];
};

/**
 * The boat day, told as a horizontal wave with the boat sailing across it.
 * Stops surface one at a time; the boat parks itself at the last one so you can
 * leave the slide up while you tell the story about the anchor.
 */
export function BoatTour({ eyebrow = 'Chapter · boat day', headline = 'Eight hours, four bays, one anchor', stops }: BoatTourProps) {
  const active = useSlideActive();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!active) {
      setStep(-1);
      return;
    }
    const timers = stops.map((_, i) => setTimeout(() => setStep(i), 500 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, [active, stops]);

  const boatPct = step < 0 ? 0 : ((step + 0.5) / stops.length) * 100;

  return (
    <Slide surface="sea">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header className="kef-anim-rise">
          <p className="kef-eyebrow">{eyebrow}</p>
          <h2 className="kef-display-m" style={{ marginTop: 12, maxWidth: 1200 }}>
            {headline}
          </h2>
        </header>

        <div style={{ position: 'relative', flex: 1, marginTop: 60, display: 'flex', alignItems: 'flex-start' }}>
          {/* The wave the boat rides */}
          <svg viewBox="0 0 1600 60" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, top: 128, height: 60, width: '100%' }} aria-hidden="true">
            <path d="M0 30 q50 -22 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0" fill="none" stroke="var(--kef-sea-myrtos)" strokeWidth="4" opacity="0.75" />
          </svg>

          {/* The boat */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 84,
              left: `${boatPct}%`,
              transform: 'translateX(-50%)',
              transition: 'left 900ms var(--kef-ease-tide)',
              fontSize: 54,
              filter: 'drop-shadow(0 8px 18px rgba(6,56,75,0.5))',
              animation: 'kef-sway 4s var(--kef-ease-drift) infinite',
            }}
          >
            ⛵
          </div>

          <div style={{ display: 'flex', gap: 26, width: '100%', alignItems: 'stretch' }}>
            {stops.map((s, i) => {
              const on = i <= step;
              return (
                <div
                  key={s.name}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: on ? 1 : 0,
                    transform: on ? 'none' : 'translateY(24px)',
                    transition: 'opacity var(--kef-dur-slow) var(--kef-ease-swell), transform var(--kef-dur-slow) var(--kef-ease-swell)',
                  }}
                >
                  <p className="kef-mono" style={{ color: 'var(--kef-sun)', fontSize: 20 }}>
                    {s.time}
                  </p>
                  <div style={{ height: 74 }} />
                  <div className="kef-glass" style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {s.image && (
                      <img
                        src={s.image}
                        alt={s.name}
                        style={{ width: '100%', height: 168, objectFit: 'cover', borderRadius: 'var(--kef-radius-md)' }}
                      />
                    )}
                    <div>
                      <h3 className="kef-title" style={{ fontSize: 32 }}>
                        {s.name}
                      </h3>
                      {s.detail && (
                        <p className="kef-body" style={{ marginTop: 8 }}>
                          {s.detail}
                        </p>
                      )}
                    </div>
                    {s.tag && (
                      <span className="kef-chip" style={{ alignSelf: 'flex-start', marginTop: 'auto', background: 'rgba(246,192,73,0.22)', borderColor: 'rgba(246,192,73,0.4)', color: 'var(--kef-sun-glow)' }}>
                        {s.tag}
                      </span>
                    )}
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
