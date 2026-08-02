import { expect, test } from 'vitest'
import { BRANCHES, DESTINATIONS, DRINKS, MENU, SOCIAL, UI } from './data'

test('exactly two branches, never a third', () => {
  expect(BRANCHES).toHaveLength(2)
  expect(JSON.stringify(BRANCHES)).not.toMatch(/Громовой/i)
})

test('verified prices are intact', () => {
  const flat = MENU.flatMap((g) => g.dishes)
  const price = (ru: string) => flat.find((d) => d.name.ru === ru)?.price
  expect(price('Питерская (классическая)')).toBe(290)
  expect(price('Алжирская')).toBe(340)
  expect(price('Французская')).toBe(340)
  expect(price('«Гранат»')).toBe(340)
  expect(price('Иорданская')).toBe(410)
  expect(price('Ватиканская')).toBe(380)
  expect(price('Такос куриный')).toBe(380)
  expect(price('Такос MIX')).toBe(400)
  expect(price('Алжирская тарелка')).toBe(550)
  expect(price('Иорданская тарелка')).toBe(580)
  expect(price('Шаурма на тарелке')).toBe(450)
  expect(price('Шаурма овощная')).toBe(290)
  expect(price('Фалафель «Усатого»')).toBe(430)
  expect(flat).toHaveLength(13)
})

test('only the three verified dishes have compositions', () => {
  const withDesc = MENU.flatMap((g) => g.dishes)
    .filter((d) => d.desc)
    .map((d) => d.name.ru)
  expect(withDesc.sort()).toEqual(
    ['Алжирская', 'Питерская (классическая)', 'Шаурма овощная'].sort(),
  )
})

test('every localized value has both non-empty sides', () => {
  const bad: string[] = []
  const ok = (x: unknown) =>
    Array.isArray(x) ? x.length > 0 : typeof x === 'string' && x.trim() !== ''
  const walk = (v: unknown, path: string) => {
    if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>
      if ('ru' in o && 'en' in o) {
        if (!ok(o.ru) || !ok(o.en)) bad.push(path)
        return
      }
      Object.entries(o).forEach(([k, x]) => walk(x, `${path}.${k}`))
    }
  }
  walk({ MENU, DRINKS, DESTINATIONS, UI, BRANCHES }, '$')
  expect(bad).toEqual([])
})

test('telegram before instagram', () => {
  expect(SOCIAL[0].label).toBe('Telegram')
  expect(SOCIAL[1].label).toBe('Instagram')
})

test('destinations match on both sides', () => {
  expect(DESTINATIONS.ru).toHaveLength(5)
  expect(DESTINATIONS.en).toHaveLength(DESTINATIONS.ru.length)
})
