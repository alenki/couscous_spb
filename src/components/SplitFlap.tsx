/**
 * Табло Солари: строка перекидных карточек. Направления = блюда-страны.
 * Механика: на смене слова каждая колонка с задержкой i·90мс перекидывает
 * верхнюю половинку старой буквы вниз, за ней раскрывается нижняя половинка
 * новой. Никакого JS на кадр — только CSS-анимации.
 */
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const STAGGER_MS = 90
const HALF_MS = 280

function pad(word: string, len: number): string {
  const extra = len - word.length
  const left = Math.floor(extra / 2)
  return ' '.repeat(left) + word + ' '.repeat(extra - left)
}

function Cell({ from, to, index }: { from: string; to: string; index: number }) {
  if (from === to) {
    return (
      <span className="flap">
        <span className="flap__half flap__half--top">
          <span className="flap__glyph">{to}</span>
        </span>
        <span className="flap__half flap__half--bottom">
          <span className="flap__glyph flap__glyph--low">{to}</span>
        </span>
        <span className="flap__hinge" />
      </span>
    )
  }
  return (
    <span className="flap" style={{ ['--d' as string]: `${index * STAGGER_MS}ms` }}>
      {/* статичные слои: сверху уже новая буква, снизу пока старая */}
      <span className="flap__half flap__half--top">
        <span className="flap__glyph">{to}</span>
      </span>
      <span className="flap__half flap__half--bottom">
        <span className="flap__glyph flap__glyph--low">{from}</span>
      </span>
      {/* перекидные створки */}
      <span className="flap__half flap__half--top flap__leaf-front">
        <span className="flap__glyph">{from}</span>
      </span>
      <span className="flap__half flap__half--bottom flap__leaf-back">
        <span className="flap__glyph flap__glyph--low">{to}</span>
      </span>
      <span className="flap__hinge" />
    </span>
  )
}

export function SplitFlap({ words, intervalMs = 2600 }: { words: string[]; intervalMs?: number }) {
  const reduced = useReducedMotion()
  const len = Math.max(...words.map((w) => w.length))
  const [idx, setIdx] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const flipTimer = useRef<number>()

  useEffect(() => {
    const tick = window.setInterval(() => {
      if (document.hidden) return
      setIdx((i) => {
        setPrev(i)
        return (i + 1) % words.length
      })
      window.clearTimeout(flipTimer.current)
      flipTimer.current = window.setTimeout(
        () => setPrev(null),
        len * STAGGER_MS + HALF_MS * 2 + 60,
      )
    }, intervalMs)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(flipTimer.current)
    }
  }, [words.length, intervalMs, len])

  const word = pad(words[idx], len)

  if (reduced) {
    return (
      <span className="splitflap" role="text" aria-label={words[idx].trim()}>
        {word.split('').map((ch, i) => (
          <span key={`${idx}-${i}`} className="flap flap--plain">
            <span className="flap__glyph flap__glyph--center">{ch}</span>
          </span>
        ))}
      </span>
    )
  }

  const fromWord = prev !== null ? pad(words[prev], len) : word

  return (
    <span className="splitflap" role="text" aria-label={words[idx].trim()}>
      {word.split('').map((ch, i) => (
        <Cell key={prev !== null ? `f${prev}-${idx}-${i}` : `s${idx}-${i}`} from={fromWord[i]} to={ch} index={i} />
      ))}
    </span>
  )
}
