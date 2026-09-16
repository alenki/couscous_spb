/**
 * Дамасский орнамент. Всё нарисованное здесь взято либо с логотипа кафе, либо
 * с фотографий зала — ничего не придумано:
 *
 *   ArchMark   — знак из логотипа: колонна под аркой, три искры.
 *   Star8      — восьмиконечная звезда с кессонов потолка.
 *   Qamariyya  — витражная розетка (قمرية) из потолка зала.
 *   AblaqArch  — арка из клиньев чередующегося камня (أبلق) — кладка зала.
 *   OliveBranch— оливковая ветвь с логотипа, выбитая из фона в WebP с альфой.
 *
 * Все фигуры рисуются `currentColor` и масштабируются от кегля, поэтому
 * перекрашиваются вместе с актом и не требуют отдельных вариантов.
 */
import type { CSSProperties } from 'react'

/* ---------------------------------------------------------------- искра */

/** Четырёхлучевая искра логотипа: вогнутые лучи, не звезда-многоугольник. */
function Spark({ x, y, r }: { x: number; y: number; r: number }) {
  const w = r * 0.26
  return (
    <path
      d={`M${x} ${y - r} Q${x + w} ${y - w} ${x + r} ${y} Q${x + w} ${y + w} ${x} ${y + r} Q${x - w} ${y + w} ${x - r} ${y} Q${x - w} ${y - w} ${x} ${y - r} Z`}
      fill="currentColor"
      stroke="none"
    />
  )
}

/* ------------------------------------------------- знак: колонна под аркой */

/**
 * Знак кафе. Пропорции сняты с файла логотипа: стилизованная ионическая
 * капитель (абака, две волюты, эхин) и четыре каннелюры ствола внутри
 * подковообразной арки, искры в основании и над замком.
 *
 * `strokeWidth` задан в единицах viewBox и потому не «жиреет» на мелком
 * размере: на 28 px знак остаётся такой же лёгкой линией, как в логотипе.
 */
export function ArchMark({ size = 46, title }: { size?: number; title?: string }) {
  const volute = (cx: number, cy: number) => (
    <g key={cx}>
      <circle cx={cx} cy={cy} r="7.4" fill="none" />
      {/* завиток внутри волюты — полтора оборота спирали */}
      <path d={`M${cx + 3.2} ${cy} a3.2 3.2 0 1 0 -2.2 3.05`} fill="none" />
    </g>
  )

  return (
    <svg
      className="mark"
      width={size}
      height={size * (110 / 100)}
      viewBox="0 0 100 110"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* арка: вертикальные пяты и полуэллиптический верх */}
        <path d="M10 99 V42 A40 34 0 0 1 90 42 V99" />
        {/* линия основания, разорванная под стволом */}
        <path d="M7 99 H93" />

        {/* капитель */}
        <path d="M19.5 36.5 H80.5" />
        {volute(27.6, 46.5)}
        {volute(72.4, 46.5)}
        <path d="M35 43.5 H65" />
        <path d="M35 49.5 H65" />

        {/* ствол: четыре каннелюры */}
        <path d="M35 57.5 V92.5" />
        <path d="M45 57.5 V92.5" />
        <path d="M55 57.5 V92.5" />
        <path d="M65 57.5 V92.5" />
      </g>

      <g className="mark__sparks">
        <Spark x={50} y={9} r={6} />
        <Spark x={7} y={99} r={5} />
        <Spark x={93} y={99} r={5} />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------ восьмилучевая звезда */

/**
 * نجمة ثمانية — два наложенных квадрата. Ровно такие золотые звёзды набраны
 * по кессонам потолка в зале.
 */
export function Star8({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 0 L15.1 8.9 L24 12 L15.1 15.1 L12 24 L8.9 15.1 L0 12 L8.9 8.9 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path d="M3.5 3.5 L13.4 10.6 L20.5 20.5 L10.6 13.4 Z" fill="currentColor" opacity="0.55" />
      <path d="M20.5 3.5 L13.4 13.4 L3.5 20.5 L10.6 10.6 Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

/* ----------------------------------------------------------------- камария */

/**
 * Порядок стёкол вертушки — как читается по кругу на снимке потолка.
 * Белого здесь нет намеренно: светлое стекло на светлом камне читается дырой,
 * а не бликом. Единственное белое место розетки — её ядро.
 */
const PINWHEEL = [
  '--glass-cobalt',
  '--glass-amber',
  '--glass-turquoise',
  '--glass-amber',
  '--glass-cobalt',
  '--glass-turquoise',
  '--glass-amber',
  '--glass-cobalt',
] as const

/**
 * Витражная розетка из потолка зала (قمرية).
 *
 * Геометрия не сочинённая: внешний восьмиугольник и внутренний, повёрнутый на
 * 22,5°, — их вершины приходятся ровно на середины внешних рёбер, и кольцо
 * между ними замощается шестнадцатью треугольниками без зазоров. В потолке
 * это красный венец; внутри — вертушка из восьми сегментов вокруг светлого
 * ядра. Раньше венец был сплошной заливкой, и розетка читалась пляжным мячом:
 * вся выразительность такого окна — в гранях.
 *
 * `lit` включает свечение: сегменты пульсируют вразнобой, как лампы за
 * стеклом. Анимация живёт в CSS и сама отключается по prefers-reduced-motion.
 */
export function Qamariyya({ size = 200, lit = false }: { size?: number; lit?: boolean }) {
  const R_OUT = 49
  const R_IN = 33
  const C = 50

  /** Вершина восьмиугольника: `half` сдвигает на полшага — к середине ребра. */
  const pt = (i: number, r: number, half = false) => {
    const a = (Math.PI / 4) * (i + (half ? 0.5 : 0)) - Math.PI / 2
    return [C + r * Math.cos(a), C + r * Math.sin(a)] as const
  }
  const poly = (pts: readonly (readonly [number, number])[]) =>
    `M ${pts.map((p) => p.join(' ')).join(' L ')} Z`

  const O = (i: number) => pt(i, R_OUT)
  const M = (i: number) => pt(i, R_IN, true) // вершины внутреннего, повёрнутого

  return (
    <svg
      className={`qamariyya${lit ? ' is-lit' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {/* венец: 16 треугольников, два оттенка красного стекла вперемешку */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={`c${i}`}>
          <path d={poly([O(i), O(i + 1), M(i)])} fill="var(--glass-red)" />
          <path d={poly([M(i - 1), M(i), O(i)])} fill="var(--glass-red-dk)" />
        </g>
      ))}

      {/* вертушка */}
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={`p${i}`}
          className="qamariyya__pane"
          style={{ '--pane': i } as CSSProperties}
          d={poly([[C, C], M(i - 1), M(i)])}
          fill={`var(${PINWHEEL[i]})`}
        />
      ))}

      {/* ядро — самое яркое стекло розетки */}
      <path
        className="qamariyya__core"
        d={poly(Array.from({ length: 8 }, (_, i) => pt(i, 9)))}
        fill="var(--glass-white)"
      />

      {/* свинцовая расстекловка поверх всего */}
      <g fill="none" stroke="var(--lead)" strokeWidth="1.7" strokeLinejoin="round">
        <path d={poly(Array.from({ length: 8 }, (_, i) => O(i)))} strokeWidth="2.6" />
        <path d={poly(Array.from({ length: 8 }, (_, i) => M(i)))} />
        {Array.from({ length: 8 }, (_, i) => (
          <g key={`l${i}`}>
            <path d={`M${M(i).join(' ')} L${O(i).join(' ')}`} />
            <path d={`M${M(i).join(' ')} L${O(i + 1).join(' ')}`} />
            <path d={`M${C} ${C} L${M(i).join(' ')}`} />
          </g>
        ))}
        <path d={poly(Array.from({ length: 8 }, (_, i) => pt(i, 9)))} />
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------- арка абляк */

/**
 * Подковообразная арка из клиньев (أبلق): камень светлого и тёмного ряда
 * чередуется — так сложены все арки в зале.
 *
 * Рисуется фоном под содержимым первого экрана, поэтому `preserveAspectRatio`
 * оставлен по умолчанию, а сама SVG растягивается CSS-ом: обрезать арку по
 * бокам не страшно, текст она не держит.
 */
export function AblaqArch({ voussoirs = 13 }: { voussoirs?: number }) {
  const cx = 100
  const springing = 118 // высота пят: ниже этого арка переходит в прямые опоры
  const rIn = 62
  const rOut = 92

  const wedges = Array.from({ length: voussoirs }, (_, i) => {
    const a0 = Math.PI - (Math.PI / voussoirs) * i
    const a1 = Math.PI - (Math.PI / voussoirs) * (i + 1)
    const p = (a: number, r: number) => `${cx + r * Math.cos(a)} ${springing - r * Math.sin(a)}`
    return (
      <path
        key={i}
        className={`ablaq__wedge ablaq__wedge--${i % 2 ? 'dark' : 'light'}`}
        d={`M${p(a0, rIn)} L${p(a0, rOut)} A${rOut} ${rOut} 0 0 0 ${p(a1, rOut)} L${p(a1, rIn)} A${rIn} ${rIn} 0 0 1 ${p(a0, rIn)} Z`}
      />
    )
  })

  // опоры: те же чередующиеся ряды, но прямые
  const courses = Array.from({ length: 7 }, (_, i) => (
    <g key={i}>
      <rect
        className={`ablaq__wedge ablaq__wedge--${i % 2 ? 'light' : 'dark'}`}
        x={cx - rOut}
        y={springing + i * 22}
        width={rOut - rIn}
        height="22"
      />
      <rect
        className={`ablaq__wedge ablaq__wedge--${i % 2 ? 'light' : 'dark'}`}
        x={cx + rIn}
        y={springing + i * 22}
        width={rOut - rIn}
        height="22"
      />
    </g>
  ))

  return (
    <svg className="ablaq" viewBox="0 0 200 272" aria-hidden="true" focusable="false">
      {wedges}
      {courses}
    </svg>
  )
}

/* -------------------------------------------------------- оливковая ветвь */

/**
 * Ветвь с логотипа. Фон вырезан по расстоянию до фирменного зелёного, поэтому
 * лежит на любом акте. 440 px хватает с запасом: крупнее 220 CSS-пикселей она
 * нигде не показывается, то есть двукратный экран получает свои точки один в
 * один. WebP с альфой вместо PNG — 24 КБ против 173.
 */
export function OliveBranch({
  width = 220,
  flip = false,
  className = '',
}: {
  width?: number
  flip?: boolean
  className?: string
}) {
  return (
    <img
      className={`olive${flip ? ' olive--flip' : ''} ${className}`.trim()}
      src="/olive-branch.webp"
      alt=""
      aria-hidden="true"
      width={440}
      height={211}
      loading="lazy"
      decoding="async"
      style={{ width, height: 'auto' }}
    />
  )
}

/* ------------------------------------------------------------------ глифы */

/** Стрелка «дальше». В RTL отражается через `[dir='rtl'] .glyph--dir`. */
export function ArrowGlyph() {
  return (
    <svg
      className="glyph glyph--dir"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0.8 6 H12 M7.6 1.4 L12.6 6 L7.6 10.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClockGlyph() {
  return (
    <svg className="glyph" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <circle cx="7" cy="7" r="5.7" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 3.9 V7.2 L9.3 8.7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function PhoneGlyph() {
  return (
    <svg className="glyph" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d="M3.2 1.8 L5 1.2 L6.2 3.8 L4.9 5 C5.4 6.6 7.4 8.6 9 9.1 L10.2 7.8 L12.8 9 L12.2 10.8 C11.8 12 10.4 12.6 9.2 12.2 C5.8 11 3 8.2 1.8 4.8 C1.4 3.6 2 2.2 3.2 1.8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PinGlyph() {
  return (
    <svg className="glyph" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d="M7 12.8 C7 12.8 11.6 8.6 11.6 5.6 A4.6 4.6 0 0 0 2.4 5.6 C2.4 8.6 7 12.8 7 12.8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="5.5" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/** Сплошная звезда рейтинга — не путать со Star8, это шкала оценки. */
export function RatingStar() {
  return (
    <svg className="glyph" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M7 1.4 L8.75 5.2 L12.8 5.7 L9.8 8.5 L10.6 12.6 L7 10.55 L3.4 12.6 L4.2 8.5 L1.2 5.7 L5.25 5.2 Z" fill="currentColor" />
    </svg>
  )
}
