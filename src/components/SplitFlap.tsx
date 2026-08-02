import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/* Табло Solari: ячейки перещёлкиваются через случайные буквы к цели.
   При prefers-reduced-motion — статичное первое слово, без таймеров. */

const GLYPHS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦШЭЯ'

function padCenter(word: string, len: number): string {
  const total = len - word.length
  const left = Math.floor(total / 2)
  return ' '.repeat(left) + word + ' '.repeat(total - left)
}

export function SplitFlap({ words, interval = 3400 }: { words: string[]; interval?: number }) {
  const reduced = useReducedMotion()
  const maxLen = Math.max(...words.map((w) => w.length))
  const padded = words.map((w) => padCenter(w, maxLen))
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [reduced, words.length, interval])

  const current = reduced ? padded[0] : padded[wordIdx]

  return (
    <span className="flap-row" aria-label={`направления: ${words.join(', ').toLowerCase()}`}>
      {Array.from({ length: maxLen }).map((_, i) => (
        <FlapCell key={i} target={current[i]} cellIndex={i} reduced={!!reduced} />
      ))}
    </span>
  )
}

function FlapCell({ target, cellIndex, reduced }: { target: string; cellIndex: number; reduced: boolean }) {
  const [state, setState] = useState({ char: ' ', tick: 0 })

  useEffect(() => {
    if (reduced) {
      setState({ char: target, tick: 0 })
      return
    }
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const steps = target === ' ' ? 0 : 1 + ((cellIndex + target.charCodeAt(0)) % 3)
    let step = 0
    const advance = () => {
      if (cancelled) return
      if (step < steps) {
        const glyph = GLYPHS[(cellIndex * 7 + step * 13 + target.charCodeAt(0)) % GLYPHS.length]
        setState((s) => ({ char: glyph, tick: s.tick + 1 }))
        step += 1
        timer = setTimeout(advance, 82)
      } else {
        setState((s) => (s.char === target ? s : { char: target, tick: s.tick + 1 }))
      }
    }
    timer = setTimeout(advance, cellIndex * 38)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [target, cellIndex, reduced])

  return (
    <span className={`flap-cell${state.char === ' ' ? ' flap-cell--blank' : ''}`} aria-hidden="true">
      <span key={state.tick} className="flap-glyph">
        {state.char}
      </span>
    </span>
  )
}
