import type { FlagKind } from '../data'

/* Вся графика рисуется от руки здесь: зеллидж, перфорация, фриз-маршрут,
   штампы, меловые флажки. Никаких стоков и иконочных шрифтов. */

function Star8({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const s = r * 1.42
  return (
    <g opacity="0.88">
      <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill={color} />
      <rect
        x={cx - s / 2}
        y={cy - s / 2}
        width={s}
        height={s}
        fill={color}
        transform={`rotate(45 ${cx} ${cy})`}
      />
      <circle cx={cx} cy={cy} r={r * 0.28} fill="#2A2013" opacity="0.85" />
    </g>
  )
}

/** Угловой орнамент из восьмиконечных звёзд — как мозаика на углах флаера. */
export function ZelligeCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`zellige${flip ? ' zellige--flip' : ''}`}
      width="78"
      height="78"
      viewBox="0 0 78 78"
      aria-hidden="true"
    >
      <Star8 cx={16} cy={16} r={13} color="#A34A35" />
      <Star8 cx={47} cy={13} r={8} color="#5C7A8A" />
      <Star8 cx={13} cy={47} r={8} color="#77713F" />
      <circle cx={68} cy={13} r={2} fill="#2A2013" opacity="0.6" />
      <circle cx={13} cy={68} r={2} fill="#2A2013" opacity="0.6" />
    </svg>
  )
}

/** Линия отрыва между секциями. dotColor — цвет фона соседней секции. */
export function Perforation({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <div className="perforation" style={{ background: topColor }} aria-hidden="true">
      <svg width="100%" height="26" preserveAspectRatio="none">
        <rect x="0" y="13" width="100%" height="13" fill={bottomColor} />
        <line
          x1="0"
          y1="13"
          x2="100%"
          y2="13"
          stroke={bottomColor}
          strokeWidth="16"
          strokeDasharray="0 26"
          strokeLinecap="round"
        />
      </svg>
      <span className="perforation-label">
        <ScissorsGlyph /> линия отрыва
      </span>
    </div>
  )
}

function ScissorsGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <circle cx="3.2" cy="4" r="2" />
        <circle cx="3.2" cy="12" r="2" />
        <path d="M5 5.2 L14 11 M5 10.8 L14 5" />
      </g>
    </svg>
  )
}

/** Гравюрный фриз: Петербург → Алжир, пунктирный маршрут, самолётик. */
export function SkylineFrieze() {
  return (
    <div className="frieze">
      <svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <g stroke="var(--sepia)" strokeWidth="1.6" fill="none" strokeLinecap="round">
          {/* земля/вода */}
          <path d="M20 132 H1180" strokeDasharray="2 7" opacity="0.5" />
          {/* Петропавловская крепость */}
          <path d="M58 132 V108 H100 V132" />
          <path d="M66 120 a4 5 0 0 1 8 0 M84 120 a4 5 0 0 1 8 0" strokeWidth="1.1" />
          <path d="M100 132 V88 H144 V132" />
          <path d="M108 100 a4 5 0 0 1 8 0 M126 100 a4 5 0 0 1 8 0" strokeWidth="1.1" />
          <path d="M104 88 L122 30 L140 88" />
          <path d="M122 30 V20" strokeWidth="1.2" />
          <circle cx="122" cy="17" r="2.4" strokeWidth="1.2" />
          {/* волны Невы */}
          <path d="M170 128 q9 -7 18 0 t18 0 t18 0 t18 0" opacity="0.7" strokeWidth="1.2" />
          {/* маршрут */}
          <path className="route-arc" d="M300 118 Q600 18 900 118" strokeDasharray="5 9" strokeWidth="1.8" />
          {/* Макам Эшахид */}
          <path d="M966 132 C972 82 990 52 1002 36" />
          <path d="M1038 132 C1032 82 1014 52 1002 36" />
          <path d="M1002 132 C1000 96 1000 60 1002 36 M1002 36 V20" />
          <circle cx="1002" cy="104" r="6" strokeWidth="1.2" />
          <path d="M1002 100 q3 -5 0 -9" strokeWidth="1.1" />
          {/* пальмы */}
          <path d="M1090 132 C1088 108 1092 92 1099 76" />
          <path
            d="M1099 76 q-16 -10 -28 -2 M1099 76 q-2 -17 -14 -22 M1099 76 q8 -15 22 -14 M1099 76 q16 -6 24 4"
            strokeWidth="1.2"
          />
          <path d="M1152 132 C1151 116 1153 106 1158 96" strokeWidth="1.2" />
          <path d="M1158 96 q-11 -7 -19 -1 M1158 96 q5 -10 15 -9 M1158 96 q-1 -11 -9 -14" strokeWidth="1" />
        </g>
        {/* самолётик на маршруте */}
        <g transform="translate(582 48) rotate(8) scale(1.35)">
          <path d="M0 8 L26 0 L12 12 L11 20 L7 13 Z" fill="var(--sepia)" />
        </g>
      </svg>
      <div className="frieze-labels" aria-hidden="true">
        <span>САНКТ-ПЕТЕРБУРГ · 59°57′ N</span>
        <span>АЛЖИР · 36°46′ N</span>
      </div>
    </div>
  )
}

/** Круглый штамп «Халяль» — красные чернила. */
export function HalalStamp() {
  return (
    <svg className="stamp stamp--halal" viewBox="0 0 104 104" width="104" height="104" role="img" aria-label="Халяль">
      <g fill="none" stroke="currentColor">
        <circle cx="52" cy="52" r="48" strokeWidth="2.4" />
        <circle cx="52" cy="52" r="40" strokeWidth="1" strokeDasharray="3 4" />
      </g>
      <text x="52" y="47" textAnchor="middle" className="stamp-text-lg">
        ХАЛЯЛЬ
      </text>
      <text x="52" y="66" textAnchor="middle" className="stamp-text-sm">
        حلال
      </text>
      <text x="52" y="26" textAnchor="middle" className="stamp-text-xs">
        ✶ ✶ ✶
      </text>
    </svg>
  )
}

/** Прямоугольный штамп-награда Яндекса. */
export function AwardStamp({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`stamp stamp--award${compact ? ' stamp--compact' : ''}`}
      viewBox="0 0 168 72"
      width="168"
      height="72"
      role="img"
      aria-label="Награда «Хорошее место 2026», Яндекс"
    >
      <g fill="none" stroke="currentColor">
        <rect x="3" y="3" width="162" height="66" rx="8" strokeWidth="2" />
        <rect x="9" y="9" width="150" height="54" rx="5" strokeWidth="0.8" strokeDasharray="3 3" />
        {/* лавровые веточки */}
        <path d="M24 52 Q18 42 24 32" strokeWidth="1.2" />
        <path d="M144 52 Q150 42 144 32" strokeWidth="1.2" />
      </g>
      <g fill="currentColor">
        {[38, 43, 48].map((y, i) => (
          <ellipse key={y} cx={21 - i} cy={y} rx="2.6" ry="1.4" transform={`rotate(-38 ${21 - i} ${y})`} />
        ))}
        {[38, 43, 48].map((y, i) => (
          <ellipse key={y} cx={147 + i} cy={y} rx="2.6" ry="1.4" transform={`rotate(38 ${147 + i} ${y})`} />
        ))}
      </g>
      <text x="84" y="30" textAnchor="middle" className="stamp-text-md">
        ХОРОШЕЕ МЕСТО
      </text>
      <text x="84" y="50" textAnchor="middle" className="stamp-text-lg">
        2026
      </text>
      <text x="84" y="61" textAnchor="middle" className="stamp-text-xs">
        ЯНДЕКС
      </text>
    </svg>
  )
}

/** Почтовый штемпель с рейтингом — синие чернила. */
export function RatingStamp({ ratings }: { ratings: string }) {
  return (
    <svg
      className="stamp stamp--rating"
      viewBox="0 0 110 110"
      width="110"
      height="110"
      role="img"
      aria-label={`Рейтинг 5,0 по ${ratings} оценкам на Яндекс Картах`}
    >
      <g fill="none" stroke="currentColor">
        <circle cx="55" cy="55" r="50" strokeWidth="1.6" strokeDasharray="6 4" />
        <circle cx="55" cy="55" r="42" strokeWidth="0.9" />
        <path d="M8 78 q8 -5 16 0 M86 78 q8 -5 16 0" strokeWidth="1.1" />
      </g>
      <text x="55" y="50" textAnchor="middle" className="stamp-text-xl">
        5,0★
      </text>
      <text x="55" y="67" textAnchor="middle" className="stamp-text-xs">
        {ratings} ОЦЕНОК
      </text>
      <text x="55" y="80" textAnchor="middle" className="stamp-text-xs">
        ЯНДЕКС КАРТЫ
      </text>
    </svg>
  )
}

/** Почтовый штемпель на открытках. */
export function Postmark() {
  return (
    <svg className="postmark" viewBox="0 0 96 96" width="96" height="96" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle cx="48" cy="48" r="44" strokeWidth="1.4" strokeDasharray="5 4" />
        <circle cx="48" cy="48" r="34" strokeWidth="0.8" />
      </g>
      <text x="48" y="42" textAnchor="middle" className="stamp-text-xs">
        САНКТ-ПЕТЕРБУРГ
      </text>
      <text x="48" y="58" textAnchor="middle" className="stamp-text-md">
        C·C
      </text>
      <text x="48" y="72" textAnchor="middle" className="stamp-text-xs">
        2026
      </text>
    </svg>
  )
}

/** Меловое сердечко — как на их доске. */
export function ChalkHeart({ color }: { color: string }) {
  return (
    <svg width="16" height="15" viewBox="0 0 20 18" aria-hidden="true">
      <path
        d="M10 17 C4 12 1.5 8 4.5 5 C7 3 10 5 10 7.5 C10 5 13 3 15.5 5 C18.5 8 16 12 10 17 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

/** Меловые флажки и дудлы у блюд — на их табло флаги нарисованы мелом. */
export function FlagChip({ kind }: { kind: FlagKind }) {
  if (!kind) return <span className="flag flag--empty" aria-hidden="true" />
  const flagNames: Record<string, string> = {
    ru: 'флаг России',
    dz: 'флаг Алжира',
    fr: 'флаг Франции',
    jo: 'флаг Иордании',
    va: 'флаг Ватикана',
    pomegranate: 'гранат',
    leaf: 'листик',
    moustache: 'усы',
  }
  return (
    <span className="flag" role="img" aria-label={flagNames[kind]}>
      <FlagArt kind={kind} />
    </span>
  )
}

function FlagArt({ kind }: { kind: Exclude<FlagKind, null> }) {
  switch (kind) {
    case 'ru':
      return (
        <svg width="22" height="15" viewBox="0 0 22 15">
          <rect width="22" height="5" y="0" fill="#E8E2D2" />
          <rect width="22" height="5" y="5" fill="#4A6E96" />
          <rect width="22" height="5" y="10" fill="#B8452F" />
        </svg>
      )
    case 'dz':
      return (
        <svg width="22" height="15" viewBox="0 0 22 15">
          <rect width="11" height="15" fill="#3E7A52" />
          <rect x="11" width="11" height="15" fill="#E8E2D2" />
          <path d="M12.6 3.6 A4.1 4.1 0 1 0 12.6 11.4 A4.9 4.9 0 1 1 12.6 3.6 Z" fill="#B8452F" />
        </svg>
      )
    case 'fr':
      return (
        <svg width="22" height="15" viewBox="0 0 22 15">
          <rect width="7.3" height="15" fill="#4A6E96" />
          <rect x="7.3" width="7.3" height="15" fill="#E8E2D2" />
          <rect x="14.6" width="7.4" height="15" fill="#B8452F" />
        </svg>
      )
    case 'jo':
      return (
        <svg width="22" height="15" viewBox="0 0 22 15">
          <rect width="22" height="5" y="0" fill="#2B2419" />
          <rect width="22" height="5" y="5" fill="#E8E2D2" />
          <rect width="22" height="5" y="10" fill="#3E7A52" />
          <path d="M0 0 L9 7.5 L0 15 Z" fill="#B8452F" />
        </svg>
      )
    case 'va':
      return (
        <svg width="22" height="15" viewBox="0 0 22 15">
          <rect width="11" height="15" fill="#D9A93E" />
          <rect x="11" width="11" height="15" fill="#E8E2D2" />
          <circle cx="16.5" cy="6" r="2.6" fill="none" stroke="#8a7350" strokeWidth="1" />
          <path d="M16.5 8.6 V12" stroke="#8a7350" strokeWidth="1" />
        </svg>
      )
    case 'pomegranate':
      return (
        <svg width="18" height="16" viewBox="0 0 18 16">
          <circle cx="9" cy="9.5" r="6" fill="#B8452F" />
          <path d="M6.5 4 L9 1.5 L11.5 4" fill="none" stroke="#B8452F" strokeWidth="1.6" />
          <circle cx="7.5" cy="8.5" r="0.9" fill="#F2E6C5" opacity="0.7" />
          <circle cx="10.6" cy="10.6" r="0.9" fill="#F2E6C5" opacity="0.7" />
        </svg>
      )
    case 'leaf':
      return (
        <svg width="18" height="16" viewBox="0 0 18 16">
          <path d="M3 13 C3 6 8 2.5 15 2.5 C15 10 10 13.5 3 13 Z" fill="#3E7A52" opacity="0.9" />
          <path d="M4.5 12 C7 9 10 6.5 13.5 4.5" stroke="#F2E6C5" strokeWidth="0.8" fill="none" opacity="0.6" />
        </svg>
      )
    case 'moustache':
      return (
        <svg width="22" height="12" viewBox="0 0 24 12">
          <path
            d="M12 5 C10 2 6.5 1.5 4.5 3.5 C2.8 5.2 3 8 1 9.5 C4.5 10.8 8.5 10 12 6.5 C15.5 10 19.5 10.8 23 9.5 C21 8 21.2 5.2 19.5 3.5 C17.5 1.5 14 2 12 5 Z"
            fill="#E8E2D2"
            opacity="0.85"
          />
        </svg>
      )
  }
}
