import { useEffect, useState } from 'react'
import { CAFE } from './data'

/**
 * Открыто ли кафе прямо сейчас по московскому времени, а не по времени
 * посетителя. Гость из Дубая или Берлина должен видеть то же самое, что гость
 * с Петроградской.
 *
 * `Intl` с явным `timeZone` является единственным способом узнать московское время без
 * таблицы переходов: смещение России не менялось с 2014 года, но зашивать его
 * константой всё равно нельзя.
 */
const MOSCOW = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Moscow',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function minutesInMoscow(now: Date): number {
  const parts = MOSCOW.formatToParts(now)
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  // 24:00 вместо 00:00 встречается в некоторых движках, приводим к нулю
  return (h % 24) * 60 + m
}

export function isOpenAt(now: Date): boolean {
  const mins = minutesInMoscow(now)
  return mins >= CAFE.hours.openMin && mins < CAFE.hours.closeMin
}

/**
 * Московские минуты от полуночи, пересчёт раз в минуту. Первое значение
 * считается синхронно, до первого кадра: иначе статус успевал мигнуть
 * «закрыто» на открытом кафе, а стрелка циферблата стояла бы на полуночи.
 */
export function useMoscowMinutes(): number {
  const [mins, setMins] = useState(() => minutesInMoscow(new Date()))

  useEffect(() => {
    const tick = () => setMins(minutesInMoscow(new Date()))
    tick()
    const id = window.setInterval(tick, 60_000)
    // вкладку могли свернуть на час, поэтому при возврате пересчитываем сразу
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [])

  return mins
}

/** Один и тот же счётчик минут кормит и статус, и стрелку: таймер один. */
export function useOpenNow(): boolean {
  const mins = useMoscowMinutes()
  return mins >= CAFE.hours.openMin && mins < CAFE.hours.closeMin
}


/** «11:00» и «23:30» из минут, чтобы часы жили в одном месте, в data.ts. */
export function hhmm(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
