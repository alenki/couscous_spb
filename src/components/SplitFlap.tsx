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

/**
 * Добивка пробелами — только справа. Раньше пустые ячейки делились поровну по
 * краям: АЛЖИР (5) в поле из 9 получал по две чёрные пустые карточки слева и
 * справа, и на каждом перекиде слово прыгало по горизонтали. На телефоне, где
 * табло стоит под САНКТ-ПЕТЕРБУРГ по левому краю, это читалось как не
 * загрузившийся шрифт. Теперь направление всегда начинается на той же левой
 * линии, а незанятые ячейки уходят вправо — как на настоящем табло Солари.
 */
function pad(word: string, len: number): string {
  return word + ' '.repeat(len - word.length)
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
  const flips = useRef(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  /* держим ref в согласии с состоянием: интервал читает ref, поэтому список
     зависимостей эффекта не меняется и таймер не пересоздаётся на каждом тапе */
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  /* Круг по направлениям конечен: пять слов по 2,6 с и таймер сам себя гасит.
     На десктопе движение придерживает курсор. При reduced-motion анимация не
     идёт вовсе — табло сразу показывает слово целиком. */
  useEffect(() => {
    if (reduced) return
    const tick = window.setInterval(() => {
      if (document.hidden || pausedRef.current) return
      if (flips.current >= words.length) {
        window.clearInterval(tick)
        return
      }
      flips.current += 1
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
  }, [words.length, intervalMs, len, reduced])

  /* курсор по-прежнему придерживает табло, но только там, где курсор есть:
     на тач-экране эти два события приходят подряд и залипания не создают */
  const hold = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setPaused(true)
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setPaused(false)
    },
  }

  const word = pad(words[idx], len)

  /* скринридеру — слово одной строкой; перекидные половинки букв прячем */
  if (reduced) {
    return (
      <span className="splitflap-wrap">
        <span className="visually-hidden">{words[idx].trim()}</span>
        <span className="splitflap" aria-hidden="true">
          {word.split('').map((ch, i) => (
            <span key={`${idx}-${i}`} className="flap flap--plain">
              <span className="flap__glyph flap__glyph--center">{ch}</span>
            </span>
          ))}
        </span>
      </span>
    )
  }

  const fromWord = prev !== null ? pad(words[prev], len) : word

  return (
    <span className="splitflap-wrap" {...hold}>
      <span className="visually-hidden">{words[idx].trim()}</span>
      <span className="splitflap" aria-hidden="true">
        {word.split('').map((ch, i) => (
          <Cell key={prev !== null ? `f${prev}-${idx}-${i}` : `s${idx}-${i}`} from={fromWord[i]} to={ch} index={i} />
        ))}
      </span>
    </span>
  )
}
