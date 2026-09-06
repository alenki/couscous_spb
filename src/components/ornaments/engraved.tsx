/**
 * Act 1 — engraved parchment art. Всё нарисовано руками, только inline SVG.
 * Штрих — var(--sepia), как гравюры на флаере.
 */
import type { CSSProperties, ReactNode } from 'react'

const S = 'var(--sepia)'

/* ---------- гравюрный фриз: Петербург → Алжир ---------- */

const P = {
  fill: 'none',
  stroke: S,
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  pathLength: 1,
  className: 'frieze-path',
}
/* пунктирные линии рисуем БЕЗ frieze-path: его CSS-штрих переопределил бы точки.
   Свой класс нужен, чтобы узкая полоса могла считать пунктир в экранных
   пикселях (vector-effect в styles.css) — иначе точки мельчали вместе с кадром. */
const DOTTED = {
  fill: 'none',
  stroke: S,
  strokeLinecap: 'round' as const,
  className: 'frieze-dots',
}

/* Все постройки нарисованы в координатах широкой панорамы (viewBox 1200×150).
   Узкая полоса берёт те же фигуры и только переставляет их: <At dx> сдвигает
   блок по горизонтали, так что путей всего один набор — правка купола видна
   в обеих компоновках. */
function At({ dx, children }: { dx: number; children: ReactNode }) {
  return <g transform={`translate(${dx} 0)`}>{children}</g>
}

/** Классический купол (70…140). */
const Dome = () => (
  <>
    <path d="M70 130 V96 H140 V130" {...P} />
    <path d="M78 96 V78 A27 27 0 0 1 132 78 V96" {...P} />
    <path d="M100 60 A6 6 0 0 1 110 60 L110 78 M100 78 L100 60 M105 54 V47 M101 50 H109" {...P} />
    <path d="M84 112 V96 M97 112 V96 M113 112 V96 M126 112 V96" {...P} />
  </>
)

/** Петропавловский шпиль (156…214). */
const Spire = () => (
  <>
    <path d="M156 130 V84 H214 V130" {...P} />
    <path d="M162 84 V70 H208 V84" {...P} />
    <path d="M172 70 L185 46 L198 70" {...P} />
    <path d="M185 46 L185 12 M181 20 L189 20 M185 6 L188 11 L185 16 L182 11 Z" {...P} />
    <path d="M168 112 V96 H178 V112 M192 112 V96 H202 V112" {...P} />
  </>
)

/** Набережная-домик (232…290). */
const House = () => (
  <path d="M232 130 V102 H290 V130 M240 112 H250 M258 112 H268 M276 112 H282" {...P} />
)

/** Макам Эшахид: три лепестка (930…1030). */
const Monument = () => (
  <>
    <path d="M930 130 C 942 92 962 56 980 30 C 972 68 966 100 964 130" {...P} />
    <path d="M1030 130 C 1018 92 998 56 980 30 C 988 68 994 100 996 130" {...P} />
    <path d="M968 130 C 972 96 976 62 980 34 C 984 62 988 96 992 130" {...P} />
    <path d="M980 30 V16 M976 20 H984" {...P} />
  </>
)

/** Минарет (1060…1096). */
const Minaret = () => (
  <>
    <path d="M1064 130 V58 H1092 V130" {...P} />
    <path d="M1060 58 H1096 M1064 74 H1092 M1070 58 V46 A8 8 0 0 1 1086 46 V58" {...P} />
    <path d="M1078 40 V32 M1074 36 H1082 M1070 112 V96 H1086 V112" {...P} />
  </>
)

/** Высокая пальма (874…924). */
const PalmTall = () => (
  <>
    <path d="M906 130 C 908 110 906 92 900 78" {...P} />
    <path
      d="M900 78 q-16 -10 -26 -2 q14 -2 26 2 M900 78 q-4 -18 -16 -22 q10 8 16 22 M900 78 q4 -18 14 -22 q-8 10 -14 22 M900 78 q16 -8 24 0 q-12 -4 -24 0"
      {...P}
    />
  </>
)

/** Молодая пальма (1112…1148). */
const PalmShort = () => (
  <>
    <path d="M1128 130 C 1126 112 1128 96 1134 84" {...P} />
    <path
      d="M1134 84 q-14 -8 -22 -2 q12 -2 22 2 M1134 84 q-2 -16 -12 -20 q8 8 12 20 M1134 84 q6 -14 14 -16 q-8 6 -14 16"
      {...P}
    />
  </>
)

/**
 * Маршрут: пунктирная дуга от x0 к x1. Дуга — квадратичная Безье с вершиной
 * ровно на `lift` выше основания `base`, поэтому обе компоновки строятся одной
 * формулой, а не подобранными на глаз контрольными точками.
 */
function Route({ x0, x1, base, lift }: { x0: number; x1: number; base: number; lift: number }) {
  const mid = (x0 + x1) / 2
  return (
    <path
      d={`M${x0} ${base} Q ${mid} ${base - 2 * lift} ${x1} ${base}`}
      {...DOTTED}
      strokeWidth={3}
      strokeDasharray="0.1 13"
    />
  )
}

/**
 * Гравюрный фриз: Петербург → Алжир, между ними пунктирный маршрут.
 *
 * Две компоновки, а не одна с кадрированием. Прежде узкий экран получал ту же
 * панораму 8:1, прижатую вправо через preserveAspectRatio="slice": окно кадра
 * считалось из ширины и высоты сразу, поэтому на 500–560px рез приходился
 * ровно по Петербургу — из-за левого края торчала половина купола или шпиля.
 * Теперь широкая полоса никогда не режется, а узкая — отдельная компоновка тех
 * же фигур: город отправления и город прибытия сходятся ближе, маршрут между
 * ними короче, пустая середина исчезает. Обе полосы лежат в разметке, показ
 * переключает CSS (см. .frieze--wide / .frieze--narrow).
 */
export function SkylineFrieze() {
  return (
    <>
      <svg className="frieze frieze--wide" viewBox="0 0 1200 150" aria-hidden="true">
        <path d="M40 130 H1160" {...DOTTED} strokeWidth={1.6} strokeDasharray="1 7" />
        <Dome />
        <Spire />
        <House />
        <Route x0={320} x1={880} base={84} lift={39} />
        <PalmTall />
        <Monument />
        <Minaret />
        <PalmShort />
      </svg>

      {/* 710×150 вместо 1200×150: те же постройки в кадре вдвое короче, поэтому
          на телефоне полоса выходит вдвое выше прежних 48px и штрих читается.
          Набережная-домик и молодая пальма в узкий кадр не идут: без них между
          городами остаётся место на дугу, а не на две тесные гроздья у краёв. */}
      <svg className="frieze frieze--narrow" viewBox="0 0 710 150" aria-hidden="true">
        <path d="M22 130 H686" {...DOTTED} strokeWidth={1.6} strokeDasharray="1 7" />
        <At dx={-45}>
          <Dome />
          <Spire />
        </At>
        <Route x0={194} x1={436} base={88} lift={40} />
        <At dx={-414}>
          <PalmTall />
          <Monument />
          <Minaret />
        </At>
      </svg>
    </>
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

/** Логотип: гравюра касбы с короной над цитаделью, в кольце. */
export function KingMark({ size = 56 }: { size?: number }) {
  return (
    <span className="king" style={{ width: size, height: size }}>
      <img src="/logo-crop.png" alt="" width={size} height={size} loading="eager" />
    </span>
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
