import { useId, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { useLang } from '../lang'
import { CAFE, UI } from '../data'

/**
 * План подхода: главный предмет четвёртого акта.
 *
 * Карту из плиток сюда не ставим намеренно: Яндекс выглядит на любом сайте
 * одинаково, а рассказать нужно ровно то, что сказано в лиде: вход с
 * Кронверкского, рынок напротив, крепость за спиной. Поэтому подход
 * вычерчен: золотая волосяная линия по тёмной пластине, как насечка по
 * дамасской стали, от которой и город, и кафе получили имя.
 *
 * Лист собран поясами, и в каждом поясе ровно одно высказывание:
 *
 *     застройка   квартал по северной стороне, все на одной линии фасада
 *     проспект    имя улицы и размерная линия до метро
 *     маршрут     пунктир от вестибюля до двери, остановка узлом на нём
 *     парк        аллея точками и имя парка
 *     крепость    северный фас, обрезанный нижним краем листа
 *
 * Так читается сверху вниз, без пересечений. Всё, что не помогает дойти до
 * двери, с листа снято: дворы кварталов, россыпь деревьев, штриховка по
 * крепости. Штриховка осталась одна, на Сытном рынке, и потому работает.
 *
 * Масштаба нет, о чём сказано в легенде, но внутренние пропорции честные:
 * 625 единиц чертежа это 460 м до Горьковской, и остановка в 70 м стоит
 * ровно на своих 95 единицах.
 *
 * Раскладок две, и выбираются они по ширине полосы, а не по устройству:
 *
 *     WIDE  1200 × 430   от 60rem: широкий лист, каким он задуман
 *     TALL  1200 × 860   уже 60rem: тот же чертёж, растянутый на юг
 *
 * Восток с западом не двигаются ни на единицу ни там, ни там: дверь стоит на
 * 430, остановка на 525, метро на 1055, и «460 м» остаётся честным на обеих
 * раскладках. Растянут только юг с севером, и вся прибавка ушла в поля между
 * поясами. Взамен узкая раскладка набрана вдвое крупнее: на телефоне лист
 * входит в полосу целиком, и кегль в 23 единицы это читаемые буквы, а не
 * серая рябь, тогда как на широком листе те же 23 единицы были бы криком.
 * Проезжая часть от этого получила там два ряда: на одной осевой имя улицы и
 * размерная на крупном кегле уже не расходятся.
 */

const W = 1200
/** Проём в 18 единиц по северному фасу: ровно туда входит пунктир. */
const JAMB = 9

type Box = { x: number; y: number; w: number; h: number }
/** Подпись: где стоит и каким кеглем набрана. */
type Type = { x: number; y: number; size: number }

type Sheet = {
  h: number
  /** Проспект: бордюры снаружи, кромки проезжей части внутри. */
  kerbN: number
  walkN: number
  walkS: number
  kerbS: number
  /** Пешеходная дорожка по южному тротуару, между кромкой и бордюром. */
  pathY: number
  /**
   * Дом с кафе и дверь в его западном углу. Дверь стоит на тех же 430, на
   * которых стояла всегда: от неё отмеряны и 460 м до метро, и 70 м до
   * остановки, и размерная линия. Двигался дом, а не точка отсчёта.
   */
  home: Box
  door: { x: number; y: number }
  metro: { x: number; y: number; r: number }
  /** Скругление обоих поворотов маршрута. */
  bend: number
  facade: number
  blockH: number
  /** Сытный рынок: единственный названный дом, и потому выше и со штриховкой. */
  market: Box
  alleyY: number
  treeR: number
  /** Северный фас Петропавловки: два бастиона с плоскими напольными фасами. */
  fortress: string
  /** Размерная «460 м» с разрывом под число и засечками по краям. */
  dimY: number
  dimGap: readonly [number, number]
  dimTick: number
  dimText: Type
  /** Врезка «вход · разрез»: рамка, земля, шесть ступеней, пол цоколя. */
  inset: Box
  cut: { ground: string; hatch: string; stairs: string; floor: string; arch: string }
  north: { label: Type; shaft: string; head: string }
  /** Радиусы узлов: ореол и сам знак. */
  ring: { stopHalo: number; stop: number; metroHalo: number; ping: number; door: number }
  name: {
    market: Type
    street: Type
    park: Type
    fortress: Type
    metro: Type
    mark: Type
    insetTitle: Type
    insetNote: Type
  }
}

/**
 * Широкий лист: 1200 × 430, как чертёж и был задуман. Подписи набраны мелко,
 * потому что на 60rem и шире мелкое здесь читается.
 */
const WIDE: Sheet = {
  h: 430,
  kerbN: 152,
  walkN: 164,
  walkS: 226,
  kerbS: 238,
  pathY: 232,
  home: { x: 376, y: 240, w: 124, h: 70 },
  door: { x: 430, y: 280 },
  metro: { x: 1055, y: 322, r: 17 },
  bend: 16,
  facade: 140,
  blockH: 80,
  market: { x: 300, y: 44, w: 320, h: 96 },
  alleyY: 258,
  treeR: 3.4,
  fortress: 'M330 430 V378 H500 L536 348 H604 L640 378 H872 L908 348 H976 L1012 378 H1190 V430 Z',
  dimY: 195,
  dimGap: [716, 776],
  dimTick: 6,
  dimText: { x: 746, y: 200, size: 15 },
  inset: { x: 30, y: 268, w: 230, h: 132 },
  cut: {
    ground: 'M46 316 H112',
    hatch: 'M54 316 l-7 8 M72 316 l-7 8 M90 316 l-7 8 M108 316 l-7 8',
    stairs: 'M112 316 h10 v7 h10 v7 h10 v7 h10 v7 h10 v7 h10 v7',
    floor: 'M172 358 H244',
    arch: 'M194 358 V344 A16 17 0 0 1 226 344 V358',
  },
  north: {
    label: { x: 1106, y: 40, size: 13 },
    shaft: 'M1106 124 V60',
    head: 'M1100 66 L1106 52 L1112 66 Z',
  },
  ring: { stopHalo: 19, stop: 7, metroHalo: 29, ping: 11, door: 4.5 },
  name: {
    market: { x: 460, y: 98, size: 17 },
    street: { x: 206, y: 200, size: 16 },
    park: { x: 790, y: 304, size: 17 },
    fortress: { x: 790, y: 402, size: 15 },
    metro: { x: 1055, y: 358, size: 15 },
    mark: { x: 1055, y: 328, size: 17 },
    insetTitle: { x: 145, y: 290, size: 11 },
    insetNote: { x: 145, y: 384, size: 10.5 },
  },
}

/**
 * Узкий лист: тот же чертёж на 1200 × 860. Ширина та же, высота вдвое, и
 * прибавка роздана поясам, чтобы в них встали подписи вдвое крупнее.
 */
const TALL: Sheet = {
  h: 860,
  kerbN: 300,
  walkN: 324,
  walkS: 448,
  kerbS: 472,
  pathY: 460,
  home: { x: 376, y: 476, w: 124, h: 130 },
  door: { x: 430, y: 550 },
  metro: { x: 1055, y: 644, r: 34 },
  bend: 24,
  facade: 270,
  blockH: 120,
  market: { x: 300, y: 84, w: 320, h: 186 },
  alleyY: 516,
  treeR: 6,
  fortress: 'M330 860 V756 H500 L548 696 H604 L652 756 H872 L920 696 H976 L1024 756 H1190 V860 Z',
  dimY: 420,
  dimGap: [686, 806],
  dimTick: 12,
  dimText: { x: 746, y: 430, size: 28 },
  inset: { x: 30, y: 480, w: 270, h: 220 },
  cut: {
    ground: 'M52 574 H136',
    hatch: 'M62 574 l-9 11 M84 574 l-9 11 M106 574 l-9 11 M128 574 l-9 11',
    stairs: 'M136 574 h14 v10 h14 v10 h14 v10 h14 v10 h14 v10 h14 v10',
    floor: 'M220 634 H286',
    arch: 'M228 634 V612 A22 22 0 0 1 272 612 V634',
  },
  north: {
    label: { x: 1106, y: 72, size: 24 },
    shaft: 'M1106 250 V112',
    head: 'M1094 122 L1106 96 L1118 122 Z',
  },
  ring: { stopHalo: 38, stop: 14, metroHalo: 58, ping: 20, door: 8 },
  name: {
    market: { x: 460, y: 188, size: 26 },
    /* Имя улицы ушло в северную половину проезжей части: на одной осевой с
       размерной они на этом кегле уже не расходятся. */
    street: { x: 300, y: 350, size: 28 },
    /* Парку оставлено ровно то, что помещается между восточной стеной дома и
       ореолом метро, не задев ни того, ни другого. */
    park: { x: 758, y: 608, size: 23 },
    fortress: { x: 790, y: 806, size: 26 },
    /* Метро стоит в 130 единицах от обреза листа: шире подпись не влезет. */
    metro: { x: 1055, y: 714, size: 23 },
    mark: { x: 1055, y: 656, size: 34 },
    insetTitle: { x: 165, y: 517, size: 17 },
    insetNote: { x: 165, y: 674, size: 16 },
  },
}

/**
 * Дома по проспекту: безымянная застройка, дающая чертежу городскую ткань.
 * Все посажены на одну линию фасада и разделены одинаковым разрывом в 36
 * единиц, поэтому квартал читается как квартал, а не как четыре случайных
 * прямоугольника.
 */
const BLOCKS: [number, number][] = [
  [96, 168],
  [656, 168],
  [860, 168],
]

/**
 * Аллея Александровского парка: один шаг, один радиус, и парк сразу виден
 * посаженным. Ряд обрывается, не дойдя до маршрута: узел метро должен стоять
 * на чистом поле.
 */
const ALLEY = Array.from({ length: 8 }, (_, i) => 620 + i * 56)

/**
 * Граница между раскладками там же, где раньше начиналась боковая прокрутка:
 * на 60rem широкий лист перестаёт читаться, и вместо него встаёт узкий.
 */
const NARROW = '(max-width: 59.98rem)'
const watchNarrow = (notify: () => void) => {
  const mq = window.matchMedia(NARROW)
  mq.addEventListener('change', notify)
  return () => mq.removeEventListener('change', notify)
}
const isNarrow = () => window.matchMedia(NARROW).matches

/**
 * Стена дома вычерчена с разрывом на дверь, а не сплошным прямоугольником с
 * накладной меткой поверх. Разрыв в стене это и есть чертёжный знак проёма,
 * и он не спорит с пунктиром, а впускает его.
 */
function homeWall({ home, door }: Sheet) {
  return (
    `M${door.x - JAMB} ${home.y} H${home.x} V${home.y + home.h} ` +
    `H${home.x + home.w} V${home.y} H${door.x + JAMB}`
  )
}

/**
 * Путь от вестибюля: на тротуар, вдоль витрин на запад и внутрь дома.
 * Пунктир не обрывается у стены и не проходит мимо: он сворачивает в дверь
 * и доходит до точки, ради которой гость шёл. Оба поворота скруглены,
 * потому что человек на углу не чертит прямой угол.
 */
function route({ metro, pathY, bend, door }: Sheet) {
  return (
    `M${metro.x} ${metro.y - metro.r} V${pathY + bend} ` +
    `A${bend} ${bend} 0 0 0 ${metro.x - bend} ${pathY} ` +
    `H${door.x + bend} A${bend} ${bend} 0 0 0 ${door.x} ${pathY + bend} V${door.y}`
  )
}

/**
 * Подпись чертежа. Разрядка и капитель только на латинице и кириллице:
 * арабская вязь от разрядки рассыпается на отдельные буквы, поэтому там
 * текст идёт как есть.
 */
function Label({
  at,
  children,
  className = '',
}: {
  at: Type
  children: string
  className?: string
}) {
  const { rtl } = useLang()
  return (
    <text
      className={`plan__label ${className}`.trim()}
      x={at.x}
      y={at.y}
      fontSize={at.size}
      letterSpacing={rtl ? 0 : at.size * 0.16}
      textAnchor="middle"
    >
      {rtl ? children : children.toLocaleUpperCase('ru')}
    </text>
  )
}

/** Слой чертежа: своя задержка в общей раскадровке проявления. */
function Layer({
  delay,
  children,
  className = '',
}: {
  delay: number
  children: ReactNode
  className?: string
}) {
  return (
    <g className={`plan__layer ${className}`.trim()} style={{ '--d': `${delay}s` } as CSSProperties}>
      {children}
    </g>
  )
}

export function ApproachPlan({ hl }: { hl: 'metro' | 'stop' | null }) {
  const { t } = useLang()
  const narrow = useSyncExternalStore(watchNarrow, isNarrow, () => false)
  const s = narrow ? TALL : WIDE
  const { home, door, metro, inset, cut, north, ring, name } = s
  /** 95 единиц от двери это те самые 70 м до остановки. */
  const stop = { x: door.x + 95, y: s.pathY }
  const path = route(s)

  // useId отдаёт «:r0:», а двоеточия в url(#…) ломают Safari, поэтому убираем
  const uid = useId().replace(/:/g, '')
  const clip = `${uid}-clip`
  const hatch = `${uid}-hatch`
  const mask = `${uid}-route`

  return (
    <svg
      className="plan"
      viewBox={`0 0 ${W} ${s.h}`}
      data-hl={hl ?? ''}
      data-sheet={narrow ? 'tall' : 'wide'}
      role="img"
      aria-label={t(UI.planAlt)}
    >
      <defs>
        <clipPath id={clip}>
          <rect x="15" y="15" width={W - 30} height={s.h - 30} />
        </clipPath>
        <pattern
          id={hatch}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="plan__hatchline" x1="0" y1="0" x2="0" y2="12" />
        </pattern>
        {/* Маска прочерчивает путь: сплошной штрих открывает пунктир от метро к двери. */}
        <mask id={mask}>
          <path
            className="plan__draw"
            style={{ '--d': '0.75s', '--dur': '1.15s' } as CSSProperties}
            d={path}
            pathLength={1}
            fill="none"
            stroke="#fff"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* пластина */}
      <rect className="plan__ground" x="6" y="6" width={W - 12} height={s.h - 12} rx="2" />

      <g clipPath={`url(#${clip})`}>
        {/* ---------------------------------------------------- проспект */}
        <Layer delay={0.1}>
          <rect className="plan__road" x="0" y={s.kerbN} width={W} height={s.kerbS - s.kerbN} />
          <path className="plan__kerb" d={`M0 ${s.kerbN} H${W} M0 ${s.kerbS} H${W}`} />
          <path className="plan__walkline" d={`M0 ${s.walkN} H${W} M0 ${s.walkS} H${W}`} />
        </Layer>

        {/* --------------------------------------------------- застройка */}
        <Layer delay={0.18}>
          {BLOCKS.map(([x, w]) => (
            <rect
              key={x}
              className="plan__block"
              x={x}
              y={s.facade - s.blockH}
              width={w}
              height={s.blockH}
            />
          ))}
          {/* Сытный рынок, напротив входа, через проспект */}
          <rect
            className="plan__block plan__block--named"
            x={s.market.x}
            y={s.market.y}
            width={s.market.w}
            height={s.market.h}
          />
          <rect
            className="plan__hatch"
            x={s.market.x}
            y={s.market.y}
            width={s.market.w}
            height={s.market.h}
            fill={`url(#${hatch})`}
          />
          {/* дом с кафе: заливка и отдельно стена, потому что в стене проём */}
          <rect className="plan__block--home" x={home.x} y={home.y} width={home.w} height={home.h} />
          <path className="plan__home-wall" d={homeWall(s)} />
        </Layer>

        {/* ---------------------------------------------- парк и крепость */}
        <Layer delay={0.26}>
          {ALLEY.map((x) => (
            <circle key={x} className="plan__tree" cx={x} cy={s.alleyY} r={s.treeR} />
          ))}
          <path className="plan__fortress" d={s.fortress} />
        </Layer>

        {/* ----------------------------------------------------- подписи */}
        <Layer delay={0.36} className="plan__names">
          <Label at={name.market}>{t(CAFE.metro[1].station)}</Label>
          <Label at={name.street} className="plan__street">
            {t(UI.planStreet)}
          </Label>
          <Label at={name.park}>{t(UI.planPark)}</Label>
          <Label at={name.fortress} className="plan__fortress-name">
            {t(UI.planFortress)}
          </Label>
        </Layer>

        {/* ------------------------------------------- размерная до метро */}
        <Layer delay={0.5}>
          <path
            className="plan__dim"
            d={`M${door.x} ${s.dimY} H${s.dimGap[0]} M${s.dimGap[1]} ${s.dimY} H${metro.x}`}
          />
          <path
            className="plan__dim-tick"
            d={
              `M${door.x - s.dimTick} ${s.dimY + s.dimTick} l${s.dimTick * 2} -${s.dimTick * 2} ` +
              `M${metro.x - s.dimTick} ${s.dimY + s.dimTick} l${s.dimTick * 2} -${s.dimTick * 2}`
            }
          />
          <text
            className="plan__dimtext num"
            x={s.dimText.x}
            y={s.dimText.y}
            fontSize={s.dimText.size}
            textAnchor="middle"
          >
            {t(CAFE.metro[0].walk)}
          </text>
        </Layer>

        {/* -------------------------------------------------------- путь */}
        <g mask={`url(#${mask})`}>
          <path className="plan__route" d={path} />
        </g>

        {/* -------------------------------------------------------- узлы */}
        <Layer delay={1.35} className="plan__node plan__node--stop">
          <circle className="plan__halo" cx={stop.x} cy={stop.y} r={ring.stopHalo} />
          <circle className="plan__stop" cx={stop.x} cy={stop.y} r={ring.stop} />
        </Layer>

        <Layer delay={1.3} className="plan__node plan__node--metro">
          <circle className="plan__halo" cx={metro.x} cy={metro.y} r={ring.metroHalo} />
          <circle
            className="plan__disc"
            cx={metro.x}
            cy={metro.y}
            r={metro.r}
            fill={CAFE.metro[0].line}
          />
          <circle className="plan__ring" cx={metro.x} cy={metro.y} r={metro.r} />
          <text
            className="plan__mark"
            x={name.mark.x}
            y={name.mark.y}
            fontSize={name.mark.size}
            textAnchor="middle"
          >
            {t(UI.metroMark)}
          </text>
          <Label at={name.metro}>{t(CAFE.metro[0].station)}</Label>
        </Layer>

        {/* ------------------------------------------------------- дверь */}
        <Layer delay={1.5}>
          {/* Тихий пинг внутри дома: раз в несколько секунд от конца маршрута
              расходится кольцо. Единственная точка на листе, до которой гость
              идёт, и потому единственная, которой позволено шевелиться. */}
          <circle className="plan__ping" cx={door.x} cy={door.y} r={ring.ping} />
          {/* Номер дома здесь больше не набран: он и так стоит в адресной
              пластине над чертежом, а на листе только сорил поверх самого
              дома, ради которого чертёж и сделан. */}
          <circle className="plan__door" cx={door.x} cy={door.y} r={ring.door} />
        </Layer>

        {/* ---------------------------------------- вынос и врезка-разрез */}
        <Layer delay={1.75}>
          {/* Поводок идёт от западной стены дома к верхнему углу врезки:
              там же, на той же высоте, разрез показывает эту самую дверь. */}
          <path className="plan__leader" d={`M${inset.x + inset.w + 8} ${door.y} H${home.x}`} />

          <rect
            className="plan__inset"
            x={inset.x}
            y={inset.y}
            width={inset.w}
            height={inset.h}
            rx="2"
          />
          <Label at={name.insetTitle} className="plan__inset-title">
            {t(UI.planEntrance)}
          </Label>

          <path className="plan__ground-line" d={cut.ground} />
          <path className="plan__ground-hatch" d={cut.hatch} />
          <path
            className="plan__stairs plan__draw"
            style={{ '--d': '1.95s', '--dur': '0.8s' } as CSSProperties}
            d={cut.stairs}
            pathLength={1}
          />
          <path className="plan__ground-line" d={cut.floor} />
          <path className="plan__arch" d={cut.arch} />

          <Label at={name.insetNote} className="plan__inset-note">
            {t(CAFE.floor)}
          </Label>
        </Layer>
      </g>

      {/* ----------------------------------------------- рамка и север */}
      <Layer delay={0}>
        <rect className="plan__frame" x="6" y="6" width={W - 12} height={s.h - 12} rx="2" />
        <rect
          className="plan__frame plan__frame--inner"
          x="15"
          y="15"
          width={W - 30}
          height={s.h - 30}
        />
        {/* Стрелка севера стоит в разрыве застройки, а не поверх дома */}
        <g className="plan__north">
          <Label at={north.label}>{t(UI.planNorth)}</Label>
          <path d={north.shaft} />
          <path className="plan__north-head" d={north.head} />
        </g>
      </Layer>
    </svg>
  )
}
