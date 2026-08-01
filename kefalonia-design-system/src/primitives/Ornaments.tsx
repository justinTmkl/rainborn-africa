/**
 * Ornaments — the decorative vocabulary of the deck.
 *
 * Rule of thumb: at most two ornaments per slide, and never behind body copy.
 * They carry the Greek/Mediterranean signal so the typography can stay quiet.
 */

import React from 'react';
import { color } from '../../tokens/theme';

type OrnamentProps = {
  width?: number | string;
  stroke?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
};

/** Greek key / meander band. Use under eyebrows and above chapter titles. */
export function Meander({
  width = 320,
  stroke = color.sea.lagoon,
  opacity = 1,
  className,
  style,
}: OrnamentProps) {
  return (
    <svg
      width={width}
      height={24}
      viewBox="0 0 160 24"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity, display: 'block', ...style }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="kef-meander" width="40" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M2 22V6h16v12h-8v-6h20v16M22 2h16v20"
            fill="none"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="160" height="24" fill="url(#kef-meander)" />
    </svg>
  );
}

/** Three-line wave rule. The default divider of the system. */
export function WaveRule({
  width = 240,
  stroke = color.sea.mid,
  opacity = 0.9,
  className,
  style,
}: OrnamentProps) {
  return (
    <svg
      width={width}
      height={22}
      viewBox="0 0 120 22"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity, display: 'block', ...style }}
      aria-hidden="true"
    >
      {[3, 11, 19].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y}q7.5 -5 15 0t15 0t15 0t15 0t15 0t15 0t15 0t15 0`}
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={1 - i * 0.28}
        />
      ))}
    </svg>
  );
}

/** Olive sprig. Chapter markers, ratings, closing slide. */
export function OliveSprig({
  width = 96,
  stroke = color.grove.olive,
  opacity = 1,
  className,
  style,
}: OrnamentProps) {
  return (
    <svg
      width={width}
      height={Number(width) * 0.5}
      viewBox="0 0 96 48"
      className={className}
      style={{ opacity, display: 'block', ...style }}
      aria-hidden="true"
    >
      <path d="M4 44C22 40 44 30 60 14" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {[
        [22, 30, -28],
        [34, 24, -34],
        [46, 17, -40],
        [30, 40, 22],
        [43, 33, 16],
        [56, 25, 10],
      ].map(([cx, cy, rot], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="9"
          ry="4.2"
          fill={stroke}
          opacity={0.85}
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      ))}
      <circle cx="62" cy="12" r="5" fill={color.grove.oliveDeep} />
    </svg>
  );
}

/** Sun disc with rays. Ambient, animates by default. */
export function SunDisc({
  size = 260,
  fill = 'var(--kef-sun-glow)',
  animate = true,
  className,
  style,
}: {
  size?: number;
  fill?: string;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{
        display: 'block',
        animation: animate ? 'kef-sun-pulse 9s var(--kef-ease-drift) infinite' : undefined,
        ...style,
      }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="kef-sun-rg">
          <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
          <stop offset="55%" stopColor={fill} stopOpacity="0.35" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#kef-sun-rg)" />
      <circle cx="50" cy="50" r="21" fill={fill} opacity="0.9" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * 27}
            y1={50 + Math.sin(a) * 27}
            x2={50 + Math.cos(a) * 36}
            y2={50 + Math.sin(a) * 36}
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        );
      })}
    </svg>
  );
}

/** Full-width animated wave band. Footer of sea-surface slides. */
export function WaveBand({
  height = 120,
  fill = color.sea.myrtos,
  opacity = 0.5,
  speed = 22,
  style,
}: {
  height?: number;
  fill?: string;
  opacity?: number;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const d =
    'M0 40 Q120 0 240 40 T480 40 T720 40 T960 40 T1200 40 T1440 40 T1680 40 T1920 40 V120 H0 Z';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 'auto 0 0 0',
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width="3840"
        height={height}
        viewBox="0 0 3840 120"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          animation: `kef-wave-roll ${speed}s linear infinite`,
        }}
      >
        <path d={d} fill={fill} opacity={opacity} />
        <path d={d} fill={fill} opacity={opacity} transform="translate(1920 0)" />
      </svg>
    </div>
  );
}

/** Warm paper grain. Sits over limestone surfaces at very low opacity. */
export function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'multiply',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/** Sun glint wash. Drop into any photo/sea slide for the "hot midday" feel. */
export function SunGlint({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="kef-shimmer"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        background: 'var(--kef-grad-sunglint)',
      }}
    />
  );
}
