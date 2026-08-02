/**
 * Act 2 — меловая графика зала: сердечки, флажки у блюд, гирлянда,
 * лампы Эдисона, мандала с потолка. Только inline SVG, штрих «мелом».
 */
import { useId } from 'react'
import type { FlagKind } from '../../data'

const CH = 'var(--chalk)'
const RED = 'var(--chalk-red)'
const YEL = 'var(--chalk-yellow)'
const GRN = 'var(--chalk-green)'
const BLU = 'var(--chalk-blue)'

/** Сердечко, как на их доске. */
export function ChalkHeart({
  tone = 'red',
  size = 14,
  rotate = 0,
}: {
  tone?: 'red' | 'white' | 'yellow'
  size?: number
  rotate?: number
}) {
  const c = tone === 'red' ? RED : tone === 'yellow' ? YEL : CH
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 15"
      aria-hidden="true"
      style={{ rotate: `${rotate}deg` }}
    >
      <path
        d="M8 13.6 C 4.6 10.8 1.6 8.4 1.6 5.4 C 1.6 3.2 3.2 1.8 5 1.8 C 6.3 1.8 7.4 2.6 8 3.8 C 8.6 2.6 9.7 1.8 11 1.8 C 12.8 1.8 14.4 3.2 14.4 5.4 C 14.4 8.4 11.4 10.8 8 13.6 Z"
        fill={c}
        fillOpacity="0.85"
        stroke={c}
        strokeWidth="0.8"
      />
    </svg>
  )
}

/** Флажок-пометка у блюда — как флаги стран на их меловом меню. */
export function ChalkFlag({ kind }: { kind: FlagKind }) {
  if (!kind) return null
  const wob = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  let art: React.ReactNode = null
  switch (kind) {
    case 'ru':
      art = (
        <>
          <rect x="1.5" y="2" width="19" height="4" fill={CH} fillOpacity="0.9" />
          <rect x="1.5" y="6" width="19" height="4" fill={BLU} fillOpacity="0.9" />
          <rect x="1.5" y="10" width="19" height="4" fill={RED} fillOpacity="0.9" />
        </>
      )
      break
    case 'dz':
      art = (
        <>
          <rect x="1.5" y="2" width="9.5" height="12" fill={GRN} fillOpacity="0.9" />
          <rect x="11" y="2" width="9.5" height="12" fill={CH} fillOpacity="0.9" />
          <path
            d="M13.2 8 A 3.1 3.1 0 1 1 10.4 4.4 A 2.5 2.5 0 1 0 13.2 8 Z"
            fill={RED}
            transform="translate(-0.6 0)"
          />
          <path d="M13.4 6.7 L14 8 L15.4 8.1 L14.3 9 L14.7 10.3 L13.5 9.6 L12.3 10.3 L12.7 9 L11.6 8.1 L13 8 Z" fill={RED} />
        </>
      )
      break
    case 'fr':
      art = (
        <>
          <rect x="1.5" y="2" width="6.3" height="12" fill={BLU} fillOpacity="0.9" />
          <rect x="7.8" y="2" width="6.3" height="12" fill={CH} fillOpacity="0.9" />
          <rect x="14.1" y="2" width="6.4" height="12" fill={RED} fillOpacity="0.9" />
        </>
      )
      break
    case 'jo':
      art = (
        <>
          <rect x="1.5" y="2" width="19" height="4" fill={CH} fillOpacity="0.35" />
          <rect x="1.5" y="6" width="19" height="4" fill={CH} fillOpacity="0.9" />
          <rect x="1.5" y="10" width="19" height="4" fill={GRN} fillOpacity="0.9" />
          <path d="M1.5 2 L9.5 8 L1.5 14 Z" fill={RED} />
        </>
      )
      break
    case 'va':
      art = (
        <>
          <rect x="1.5" y="2" width="9.5" height="12" fill={YEL} fillOpacity="0.9" />
          <rect x="11" y="2" width="9.5" height="12" fill={CH} fillOpacity="0.9" />
          <path d="M13.5 5.5 L17.5 10.5 M17.5 5.5 L13.5 10.5" stroke={YEL} strokeWidth="1.4" {...wob} />
        </>
      )
      break
    case 'pomegranate':
      return (
        <svg className="dish-flag" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="10.5" r="5.5" fill={RED} fillOpacity="0.85" stroke={RED} strokeWidth="1" />
          <path d="M6.5 5.5 L7.5 3.4 M9 5 L9 2.8 M11.5 5.5 L10.5 3.4" stroke={RED} strokeWidth="1.5" {...wob} />
          <circle cx="7.4" cy="9.6" r="0.8" fill="var(--board)" />
          <circle cx="10.6" cy="9.6" r="0.8" fill="var(--board)" />
          <circle cx="9" cy="12.2" r="0.8" fill="var(--board)" />
        </svg>
      )
    case 'leaf':
      return (
        <svg className="dish-flag" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M3.5 14.5 C 3.5 8 8 3.5 14.5 3.5 C 14.5 10 10 14.5 3.5 14.5 Z"
            fill={GRN}
            fillOpacity="0.75"
            stroke={GRN}
            strokeWidth="1.2"
            {...wob}
          />
          <path d="M4.5 13.5 C 7.5 10.5 10 8 13 4.9" stroke={GRN} strokeWidth="1.1" fill="none" {...wob} />
        </svg>
      )
    case 'moustache':
      return (
        <svg className="dish-flag" width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <path
            d="M10 7.5 C 8.4 5 6 4.6 4.4 6 C 2.9 7.3 3.4 9.6 5.4 9.8 C 7 10 9 9 10 7.5 C 11 9 13 10 14.6 9.8 C 16.6 9.6 17.1 7.3 15.6 6 C 14 4.6 11.6 5 10 7.5 Z"
            fill={CH}
            fillOpacity="0.9"
            stroke={CH}
            strokeWidth="0.8"
          />
        </svg>
      )
  }
  return (
    <svg className="dish-flag" width="24" height="18" viewBox="0 0 24 18" aria-hidden="true">
      <g transform="rotate(-3 12 9)">{art}</g>
      <path d="M1.5 1.5 V16.5" stroke={CH} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/** Гирлянда из флажков — как над их стойкой. */
export function Bunting({ pennants = 12 }: { pennants?: number }) {
  const colors = [RED, CH, YEL, BLU, GRN]
  const y = (t: number) => (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 44 + t * t * 10
  const items = Array.from({ length: pennants }, (_, i) => {
    const t = (i + 0.5) / pennants
    const x = t * 600
    const yy = y(t)
    const lean = (t - 0.5) * 10
    return (
      <path
        key={i}
        d={`M${x - 11} ${yy} L${x + 11} ${yy} L${x} ${yy + 26} Z`}
        fill={colors[i % colors.length]}
        fillOpacity="0.9"
        transform={`rotate(${lean} ${x} ${yy})`}
      />
    )
  })
  return (
    <svg className="bunting" viewBox="0 0 600 76" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <path d="M0 10 Q 300 44 600 10" fill="none" stroke={CH} strokeWidth="1.4" strokeOpacity="0.7" />
      {items}
    </svg>
  )
}

/** Лампа Эдисона на шнуре — тёплое свечение, лёгкое качание. */
export function Bulb({ cord = 120, delay = 0 }: { cord?: number; delay?: number }) {
  const id = useId()
  return (
    <svg
      className="bulb"
      width="72"
      height={cord + 74}
      viewBox={`0 0 72 ${cord + 74}`}
      aria-hidden="true"
      style={{ animationDelay: `${delay}s` }}
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="#e9b94d" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#e9b94d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e9b94d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={`M36 0 C 34 ${cord * 0.4} 38 ${cord * 0.7} 36 ${cord}`} stroke="#0c0a08" strokeWidth="2.4" fill="none" />
      <circle cx="36" cy={cord + 34} r="34" fill={`url(#${id}-glow)`} className="bulb__glow" />
      <rect x="30" y={cord} width="12" height="12" rx="2" fill="#3a3128" />
      <path
        d={`M36 ${cord + 12} C 26 ${cord + 14} 22 ${cord + 24} 26 ${cord + 34} C 29 ${cord + 42} 43 ${cord + 42} 46 ${cord + 34} C 50 ${cord + 24} 46 ${cord + 14} 36 ${cord + 12} Z`}
        fill="#e9b94d"
        fillOpacity="0.28"
        stroke="#c99b33"
        strokeWidth="1.4"
      />
      <path
        d={`M32 ${cord + 14} C 33 ${cord + 22} 39 ${cord + 22} 40 ${cord + 14}`}
        stroke="#e9b94d"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Мандала с их потолка: тёмно-синий диск, кольца в цветах зала, волны неба. */
export function MandalaDisc({ size = 300 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" aria-hidden="true" className="mandala">
      {/* волны голубого потолка вокруг диска */}
      <path
        d="M18 96 C 44 76 66 76 92 92 M10 150 C 34 136 52 136 74 148 M20 208 C 46 194 66 194 90 206 M282 96 C 256 76 234 76 208 92 M290 150 C 266 136 248 136 226 148 M280 208 C 254 194 234 194 210 206"
        stroke="var(--sky)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="150" cy="150" r="118" fill="var(--navy)" />
      <g className="mandala__spin">
        <circle cx="150" cy="150" r="104" fill="none" stroke={YEL} strokeWidth="7" strokeDasharray="4 14" opacity="0.85" />
        <circle cx="150" cy="150" r="88" fill="none" stroke={RED} strokeWidth="10" strokeDasharray="20 12" opacity="0.8" />
        <circle cx="150" cy="150" r="70" fill="none" stroke={BLU} strokeWidth="7" strokeDasharray="2 10" opacity="0.85" />
        <circle cx="150" cy="150" r="54" fill="none" stroke={GRN} strokeWidth="9" strokeDasharray="16 10" opacity="0.8" />
        <circle cx="150" cy="150" r="38" fill="none" stroke="var(--plaster)" strokeWidth="6" strokeDasharray="3 9" opacity="0.85" />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d="M150 34 L154 46 L150 58 L146 46 Z"
            fill={[YEL, RED, BLU, GRN][i % 4]}
            opacity="0.9"
            transform={`rotate(${i * 30} 150 150)`}
          />
        ))}
        <circle cx="150" cy="150" r="22" fill={YEL} fillOpacity="0.9" />
        <circle cx="150" cy="150" r="12" fill={RED} fillOpacity="0.9" />
      </g>
    </svg>
  )
}

/** Волнистая меловая линейка-разделитель. */
export function ChalkRule() {
  return (
    <svg className="chalk-rule" viewBox="0 0 320 14" width="320" height="14" aria-hidden="true">
      <path
        d="M6 8 C 40 4 70 10 104 7 C 130 5 146 9 152 7 L160 7 M168 7 C 190 9 226 4 260 8 C 286 10 300 6 314 7"
        stroke={CH}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path d="M160 3.5 L163.5 7 L160 10.5 L156.5 7 Z" fill={RED} fillOpacity="0.9" />
    </svg>
  )
}

