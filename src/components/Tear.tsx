import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLang } from '../lang'
import { UI } from '../data'

function Scissors() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="3.2" cy="3.4" r="2.2" />
        <circle cx="3.2" cy="10.6" r="2.2" />
        <path d="M5.2 4.4 L18 10.4 M5.2 9.6 L18 3.6" />
      </g>
    </svg>
  )
}

/** Зубчатый нижний край оторванного билета. */
function RippedEdge() {
  const teeth: string[] = ['M0 0']
  let x = 0
  const steps = [34, 22, 41, 27, 36, 19, 44, 30, 24, 38, 21, 42, 28, 35, 23, 40, 26, 33, 20, 37, 29, 43, 25, 31, 39, 22, 36, 27, 41, 24]
  const depths = [10, 4, 13, 6, 11, 3, 14, 8, 5, 12, 4, 13, 7, 10, 3, 12, 6, 9, 4, 11, 7, 14, 5, 8, 12, 4, 10, 6, 13, 5]
  steps.forEach((w, i) => {
    x += w
    teeth.push(`L${x} ${depths[i]}`)
    x += 8
    teeth.push(`L${x} ${Math.max(1, depths[i] - 7)}`)
  })
  teeth.push(`L${x} 0 Z`)
  return (
    <svg className="tear__rip" viewBox={`0 0 ${x} 16`} preserveAspectRatio="none" aria-hidden="true">
      <path d={teeth.join(' ')} fill="var(--parchment)" />
    </svg>
  )
}

export function Tear() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 30%'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 18])

  return (
    <div ref={ref} className="tear" aria-hidden="true">
      <m.div
        className="tear__strip"
        style={reduced ? undefined : { rotate, y, transformOrigin: '12% 0%' }}
      >
        <div className="tear__line font-mono">
          <span className="tear__dashes" />
          <Scissors />
          <span className="tear__label">{t(UI.tear)}</span>
          <span className="tear__dashes" />
        </div>
        <RippedEdge />
      </m.div>
    </div>
  )
}
