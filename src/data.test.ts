import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { CAFE, FEATURES, LANGS, MENU, PRAISE, ROOM_PHOTOS, SOCIAL, UI, srcSet } from './data'
import { isOpenAt, hhmm } from './useOpenNow'
import { reviews, num } from './plural'

const ROOT = join(import.meta.dirname ?? new URL('.', import.meta.url).pathname, '..')
const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8')
const ld = JSON.parse(
  indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1],
) as Record<string, any>

const ALL_DISHES = MENU.flatMap((c) => c.dishes)

/* ------------------------------------------------------------------ меню */

describe('menu', () => {
  it('has the nine courses from the Yandex listing, in serving order', () => {
    expect(MENU.map((c) => c.id)).toEqual([
      'breakfast',
      'mezze',
      'salads',
      'soups',
      'hot',
      'arabic',
      'grill',
      'desserts',
      'drinks',
    ])
  })

  it('carries all 62 dishes', () => {
    expect(ALL_DISHES).toHaveLength(62)
  })

  // Раздел «Закуски» в данных Яндекса задвоен: во втором латинская `c` и одно
  // осиротевшее блюдо. Тест сторожит, что мы его действительно приклеили и не
  // потеряли при следующей сверке с картой.
  it('keeps the orphan from Yandex’s duplicate “Закуски” section', () => {
    const mezze = MENU.find((c) => c.id === 'mezze')!
    expect(mezze.dishes.map((d) => d.name.ru)).toContain('Картофель фри с сыром и пряностями')
    expect(mezze.dishes).toHaveLength(10)
  })

  it('has no duplicate dish names, the key of every list on the page', () => {
    const names = ALL_DISHES.map((d) => d.name.ru)
    expect(new Set(names).size).toBe(names.length)
  })

  it('has no duplicate course ids because they are DOM anchors', () => {
    expect(new Set(MENU.map((c) => c.id)).size).toBe(MENU.length)
  })

  it('prices are whole roubles inside the plausible range', () => {
    for (const d of ALL_DISHES) {
      expect(Number.isInteger(d.price), d.name.ru).toBe(true)
      expect(d.price, d.name.ru).toBeGreaterThanOrEqual(150)
      expect(d.price, d.name.ru).toBeLessThanOrEqual(2500)
    }
  })

  // Ключевые цены с вкладки «Меню» Яндекса, снятой 16.09.2026. Обзорная вкладка
  // показывает другие; если однажды кто-то сверится с ней, тест это поймает.
  it('keeps the verified prices from the menu tab', () => {
    const price = (ru: string) => ALL_DISHES.find((d) => d.name.ru === ru)?.price
    expect(price('Микс-гриль')).toBe(2220)
    expect(price('Хумус')).toBe(320)
    expect(price('Кабсе с половиной курицы')).toBe(860)
    expect(price('Дамаск-кебаб')).toBe(680)
    expect(price('Шиш-таук')).toBe(670)
    expect(price('Кнафе')).toBe(480)
    expect(price('Фатуш')).toBe(330)
    expect(price('Табуле')).toBe(375)
    expect(price('Чашка чая')).toBe(180)
  })

  it('every course has at least one dish', () => {
    for (const c of MENU) expect(c.dishes.length, c.id).toBeGreaterThan(0)
  })
})

/* ------------------------------------------------------------ три языка */

describe('localisation', () => {
  it('offers exactly ru, en and ar', () => {
    expect(LANGS.map((l) => l.code)).toEqual(['ru', 'en', 'ar'])
  })

  /**
   * Каждая локализованная строка заполнена на всех трёх языках.
   *
   * Повод для обхода, а не для ручного списка: пропущенный `ar` не падает и
   * не подчёркивается типами (L требует ключ, но пустая строка является валидным
   * значение). На странице он выглядит как дыра, которую видно только тому,
   * кто читает по-арабски.
   */
  it('every localized value is filled in on all three sides', () => {
    const bad: string[] = []
    const ok = (x: unknown) =>
      Array.isArray(x) ? x.length > 0 : typeof x === 'string' && x.trim() !== ''
    const walk = (v: unknown, path: string) => {
      if (!v || typeof v !== 'object') return
      if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`))
      const o = v as Record<string, unknown>
      if ('ru' in o && 'en' in o && 'ar' in o) {
        for (const k of ['ru', 'en', 'ar']) if (!ok(o[k])) bad.push(`${path}.${k}`)
        return
      }
      Object.entries(o).forEach(([k, x]) => walk(x, `${path}.${k}`))
    }
    walk({ MENU, UI, CAFE, FEATURES, PRAISE, ROOM_PHOTOS, LANGS }, '$')
    expect(bad).toEqual([])
  })

  it('arabic strings are actually arabic, not copied russian', () => {
    const arabic = /[؀-ۿ]/
    for (const c of MENU) {
      expect(arabic.test(c.title.ar), c.id).toBe(true)
      for (const d of c.dishes) expect(arabic.test(d.name.ar), d.name.ru).toBe(true)
    }
    for (const [key, v] of Object.entries(UI)) {
      // Wi-Fi и подобные пишутся латиницей во всех трёх, исключений быть не
      // должно ни одного, поэтому проверяем весь UI без списка послаблений
      expect(arabic.test(v.ar), `UI.${key}`).toBe(true)
    }
  })

  // Пробелы записаны escape-последовательностями намеренно: между числом и
  // словом стоит неразрывный, и в исходнике его не отличить от обычного.
  it('plural forms pick the right word for the numbers we actually show', () => {
    expect(reviews(557, 'ru')).toBe('557\u00a0отзывов')
    expect(reviews(453, 'ru')).toBe('453\u00a0отзыва')
    expect(reviews(182, 'ru')).toBe('182\u00a0отзыва')
    expect(reviews(1, 'ru')).toBe('1\u00a0отзыв')
    expect(reviews(557, 'en')).toBe('557\u00a0reviews')
    expect(reviews(1, 'en')).toBe('1\u00a0review')
    // Разряды тоже неразрывные, и во всех трёх языках одинаково: цифры
    // европейские даже на арабском, как набраны цены во всём меню.
    expect(num(1010, 'ru')).toBe('1\u00a0010')
    expect(num(1010, 'en')).toBe('1\u00a0010')
    expect(num(1010, 'ar')).toBe('1\u00a0010')
  })
})

/* ------------------------------------------------- факты и их дубли в HTML */

describe('facts agree with index.html', () => {
  it('address', () => {
    expect(ld.address.streetAddress).toContain('Кронверкский проспект, 45')
    expect(ld.address.streetAddress).toContain(CAFE.floor.ru)
    expect(ld.address.postalCode).toBe(CAFE.postcode)
    expect(CAFE.street.ru).toBe('Кронверкский проспект, 45')
  })

  it('phone link matches the printed number', () => {
    expect(CAFE.phoneHref).toBe(`tel:+${CAFE.phone.replace(/\D/g, '')}`)
    expect(ld.telephone).toBe(`+${CAFE.phone.replace(/\D/g, '')}`)
  })

  it('opening hours', () => {
    expect(ld.openingHoursSpecification.opens).toBe(hhmm(CAFE.hours.openMin))
    expect(ld.openingHoursSpecification.closes).toBe(hhmm(CAFE.hours.closeMin))
    expect(CAFE.hours.text).toBe(`${hhmm(CAFE.hours.openMin)}–${hhmm(CAFE.hours.closeMin)}`)
    expect(ld.openingHoursSpecification.dayOfWeek).toHaveLength(7)
  })

  it('rating is the real one, and the same in both places', () => {
    expect(ld.aggregateRating.ratingValue).toBe(String(CAFE.ratingValue))
    expect(ld.aggregateRating.ratingCount).toBe(String(CAFE.ratingsCount))
    expect(ld.aggregateRating.reviewCount).toBe(String(CAFE.reviewsCount))
    // русская запятая в вёрстке, точка в разметке; обе про одно число
    expect(CAFE.rating.ru).toBe('4,4')
    expect(CAFE.rating.en).toBe('4.4')
  })

  it('links out only to destinations we verified', () => {
    expect(ld.sameAs).toEqual([CAFE.yandexUrl, SOCIAL[0].url, SOCIAL[1].url])
    expect(ld.acceptsReservations).toBe(CAFE.bookUrl)
    expect(ld.hasMenu).toBe(CAFE.yandexMenuUrl)
  })

  /**
   * В карточке Яндекса Telegram записан как `t.me/damask_cafe45-instagram`:
   * дефис в имени пользователя Telegram недопустим, а `damask_cafe45` никем
   * не занят. Ссылки на Telegram на сайте быть не должно, пока владелец не
   * поправит карточку, иначе гость уходит в пустоту.
   */
  it('has no telegram link while the listing’s handle is broken', () => {
    expect(indexHtml).not.toMatch(/t\.me/)
    expect(SOCIAL.map((s) => s.label)).toEqual(['VK', 'WhatsApp'])
  })

  /** wa.me не понимает внутрироссийскую «8», номер должен быть с «7». */
  it('whatsapp uses the international prefix', () => {
    const wa = SOCIAL.find((s) => s.label === 'WhatsApp')!
    expect(wa.url).toBe('https://wa.me/79811642424')
  })

  it('every praise figure is a share with a sample behind it', () => {
    for (const p of PRAISE) {
      expect(p.pct, p.label.ru).toBeGreaterThan(0)
      expect(p.pct, p.label.ru).toBeLessThanOrEqual(100)
      expect(p.count, p.label.ru).toBeGreaterThan(0)
      expect(p.count, p.label.ru).toBeLessThanOrEqual(CAFE.reviewsCount)
    }
  })
})

/* -------------------------------------------------------- часы работы */

describe('open-now clock', () => {
  /** Полдень в Петербурге соответствует 09:00 UTC зимой и летом (МСК = UTC+3). */
  const utc = (h: number, m = 0) => new Date(Date.UTC(2026, 8, 16, h, m))

  it('is open between 11:00 and 23:30 Moscow time', () => {
    expect(isOpenAt(utc(7, 59))).toBe(false) // 10:59 МСК, ещё закрыто
    expect(isOpenAt(utc(8, 0))).toBe(true) // 11:00 МСК, открылись ровно
    expect(isOpenAt(utc(12, 0))).toBe(true) // 15:00 МСК
    expect(isOpenAt(utc(20, 29))).toBe(true) // 23:29 МСК
    expect(isOpenAt(utc(20, 30))).toBe(false) // 23:30 МСК, закрылись
    expect(isOpenAt(utc(2, 0))).toBe(false) // 05:00 МСК
  })

  it('reads Moscow time, not the visitor’s', () => {
    // 23:00 UTC = 02:00 МСК следующего дня: кафе закрыто, хотя у гостя вечер
    expect(isOpenAt(utc(23, 0))).toBe(false)
  })

  it('formats minutes back into the printed hours', () => {
    expect(hhmm(CAFE.hours.openMin)).toBe('11:00')
    expect(hhmm(CAFE.hours.closeMin)).toBe('23:30')
  })
})

/* ------------------------------------------------------------- снимки */

describe('photos', () => {
  it('srcSet lists the small file first, as the browser expects', () => {
    for (const p of ROOM_PHOTOS) {
      expect(srcSet(p)).toBe(`${p.small} ${p.smallWidth}w, ${p.src} ${p.width}w`)
      expect(p.smallWidth).toBeLessThan(p.width)
    }
  })

  it('every photo is described for screen readers in all three languages', () => {
    for (const p of ROOM_PHOTOS) {
      for (const k of ['ru', 'en', 'ar'] as const) {
        expect(p.alt[k].length, `${p.src}.${k}`).toBeGreaterThan(20)
      }
    }
  })
})
