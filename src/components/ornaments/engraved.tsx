/**
 * Act 1 — engraved parchment art. Всё нарисовано руками, только inline SVG.
 * Штрих — var(--sepia), как гравюры на флаере.
 */
import type { CSSProperties, ReactNode } from 'react'

const S = 'var(--sepia)'

/** Два повёрнутых квадрата = восьмиконечная звезда зелиджа (хатам). */
function Star8({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const s = r * 1.35
  return (
    <g fill={fill} stroke="var(--parchment-hi)" strokeWidth={1.6}>
      <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} />
      <rect
        x={cx - s / 2}
        y={cy - s / 2}
        width={s}
        height={s}
        transform={`rotate(45 ${cx} ${cy})`}
      />
    </g>
  )
}

/** Мозаичный угол из звёзд — приглушённые цвета флаера. */
export function ZelligeCorner({ flip = '' }: { flip?: '' | 'x' | 'y' | 'xy' }) {
  const t =
    flip === 'x' ? 'scale(-1,1)' : flip === 'y' ? 'scale(1,-1)' : flip === 'xy' ? 'scale(-1,-1)' : ''
  return (
    <svg
      className="zellige"
      viewBox="0 0 170 170"
      width="170"
      height="170"
      aria-hidden="true"
      style={{ transform: t ? `${t}` : undefined }}
    >
      <g opacity="0.6">
        <Star8 cx={8} cy={8} r={46} fill="#b8432f" />
        <Star8 cx={76} cy={4} r={24} fill="#c99b33" />
        <Star8 cx={4} cy={76} r={24} fill="#5f8fa3" />
        <Star8 cx={58} cy={58} r={20} fill="#6d8f4e" />
        <Star8 cx={118} cy={14} r={16} fill="#5f8fa3" />
        <Star8 cx={14} cy={118} r={16} fill="#c99b33" />
        <Star8 cx={96} cy={52} r={12} fill="#b8432f" />
        <Star8 cx={52} cy={96} r={12} fill="#b8432f" />
        <Star8 cx={130} cy={52} r={8} fill="#6d8f4e" />
        <Star8 cx={52} cy={130} r={8} fill="#6d8f4e" />
        <Star8 cx={92} cy={92} r={8} fill="#c99b33" />
      </g>
    </svg>
  )
}

/** Гравюрный фриз: Петербург ↔ Алжир, пунктирный маршрут, птицы. */
export function SkylineFrieze() {
  const p = {
    fill: 'none',
    stroke: S,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    pathLength: 1,
    className: 'frieze-path',
  }
  /* пунктирные линии рисуем БЕЗ frieze-path: его CSS-штрих переопределил бы точки */
  const dotted = {
    fill: 'none',
    stroke: S,
    strokeLinecap: 'round' as const,
  }
  return (
    <svg
      className="frieze"
      viewBox="0 0 1200 150"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      {/* земля */}
      <path d="M40 130 H1160" {...dotted} strokeWidth={1.6} strokeDasharray="1 7" />

      {/* — Петербург — */}
      {/* классический купол */}
      <path d="M70 130 V96 H140 V130" {...p} />
      <path d="M78 96 V78 A27 27 0 0 1 132 78 V96" {...p} />
      <path d="M100 60 A6 6 0 0 1 110 60 L110 78 M100 78 L100 60 M105 54 V47 M101 50 H109" {...p} />
      <path d="M84 112 V96 M97 112 V96 M113 112 V96 M126 112 V96" {...p} />
      {/* Петропавловский шпиль */}
      <path d="M156 130 V84 H214 V130" {...p} />
      <path d="M162 84 V70 H208 V84" {...p} />
      <path d="M172 70 L185 46 L198 70" {...p} />
      <path d="M185 46 L185 12 M181 20 L189 20 M185 6 L188 11 L185 16 L182 11 Z" {...p} />
      <path d="M168 112 V96 H178 V112 M192 112 V96 H202 V112" {...p} />
      {/* набережная-домик */}
      <path d="M232 130 V102 H290 V130 M240 112 H250 M258 112 H268 M276 112 H282" {...p} />

      {/* маршрут */}
      <path d="M320 84 Q 600 6 880 84" {...dotted} strokeWidth={3} strokeDasharray="0.1 13" />
      {/* роза ветров в зените */}
      <path d="M600 20 L605 31 L616 34 L605 37 L600 48 L595 37 L584 34 L595 31 Z" {...p} />
      {/* птицы с флаера */}
      <path d="M462 56 q8 -9 16 0 q8 -9 16 0" {...p} strokeWidth={2} />
      <path d="M702 50 q7 -8 14 0 q7 -8 14 0" {...p} strokeWidth={2} />

      {/* — Алжир — */}
      {/* Макам Эшахид: три лепестка */}
      <path d="M930 130 C 942 92 962 56 980 30 C 972 68 966 100 964 130" {...p} />
      <path d="M1030 130 C 1018 92 998 56 980 30 C 988 68 994 100 996 130" {...p} />
      <path d="M968 130 C 972 96 976 62 980 34 C 984 62 988 96 992 130" {...p} />
      <path d="M980 30 V16 M976 20 H984" {...p} />
      {/* минарет */}
      <path d="M1064 130 V58 H1092 V130" {...p} />
      <path d="M1060 58 H1096 M1064 74 H1092 M1070 58 V46 A8 8 0 0 1 1086 46 V58" {...p} />
      <path d="M1078 40 V32 M1074 36 H1082 M1070 112 V96 H1086 V112" {...p} />
      {/* пальмы */}
      <path d="M906 130 C 908 110 906 92 900 78" {...p} />
      <path d="M900 78 q-16 -10 -26 -2 q14 -2 26 2 M900 78 q-4 -18 -16 -22 q10 8 16 22 M900 78 q4 -18 14 -22 q-8 10 -14 22 M900 78 q16 -8 24 0 q-12 -4 -24 0" {...p} />
      <path d="M1128 130 C 1126 112 1128 96 1134 84" {...p} />
      <path d="M1134 84 q-14 -8 -22 -2 q12 -2 22 2 M1134 84 q-2 -16 -12 -20 q8 8 12 20 M1134 84 q6 -14 14 -16 q-8 6 -14 16" {...p} />
    </svg>
  )
}

/** Круглый штамп: двойное кольцо + текст. */
export function Stamp({
  children,
  tone = 'sepia',
  rotate = 0,
  className = '',
}: {
  children: ReactNode
  tone?: 'red' | 'sepia'
  rotate?: number
  className?: string
}) {
  return (
    <span
      className={`stamp stamp--${tone} ${className}`}
      style={{ '--stamp-rotate': `${rotate}deg` } as CSSProperties}
    >
      <span className="stamp__inner">{children}</span>
    </span>
  )
}

/** Логотип-король: настоящая картинка клиента в кольце. */
export function KingMark({ size = 56 }: { size?: number }) {
  return (
    <span className="king" style={{ width: size, height: size }}>
      <img src="/logo-crop.png" alt="" width={size} height={size} loading="eager" />
    </span>
  )
}

/** Ряд перфорационных отверстий (для линии отрыва). */
export function PerforationEdge() {
  return (
    <svg className="perforation" viewBox="0 0 1200 16" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 60 }, (_, i) => (
        <circle key={i} cx={10 + i * 20} cy={8} r={4} fill="var(--board)" />
      ))}
    </svg>
  )
}

function ArrowGlyph() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
      <path
        d="M1 6 H15 M10 1.5 L15.5 6 L10 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** CTA-корешок билета. */
export function TicketStub({
  children,
  href,
  primary = false,
}: {
  children: ReactNode
  href: string
  primary?: boolean
}) {
  return (
    <a className={`stub${primary ? ' stub--primary' : ''}`} href={href}>
      <span>{children}</span>
      <span className="stub__end" aria-hidden="true">
        <ArrowGlyph />
      </span>
    </a>
  )
}
