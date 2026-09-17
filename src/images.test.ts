/**
 * Дескриптор `w` в srcSet должен совпадать с настоящей шириной файла.
 *
 * Повод: interior-counter-640.jpg был назван по длинной стороне и лежал как
 * 480×640, объявляясь при этом как `640w`. Браузер на DPR 2–3 честно выбирал
 * его, считая, что получит 640 физических точек, а получал 480, самое высокое
 * фото на странице отрисовывалось в 1,34× на двукратном экране. Вёрстку это
 * не ломало (пропорции совпадали, CLS ноль), поэтому глазами не ловилось.
 *
 * Раньше тест вычитывал srcSet регуляркой прямо из JSX. Это держалось ровно до
 * первого шаблонного литерала: `srcSet={...}` регулярка не видит, кандидатов
 * находится ноль, и тест начинает молча ничего не проверять. Теперь снимки
 * описаны в data.ts, оттуда же собирается srcSet, и здесь сверяются ровно те
 * числа, которые уедут в разметку.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ALL_PHOTOS } from './data'

const PUBLIC = join(import.meta.dirname ?? new URL('.', import.meta.url).pathname, '..', 'public')

/** Ширина и высота JPEG из маркера SOF без зависимостей. */
function jpegSize(buf: Buffer): { width: number; height: number } {
  let i = 2 // пропускаем SOI
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1
      continue
    }
    const marker = buf[i + 1]
    // SOF0..SOF15, кроме DHT (c4), JPG (c8) и DAC (cc)
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  throw new Error('SOF marker not found')
}

const sizeOf = (url: string) => jpegSize(readFileSync(join(PUBLIC, url.replace(/^\//, ''))))

describe('srcSet descriptors', () => {
  it('finds the photos to check', () => {
    expect(ALL_PHOTOS.length).toBeGreaterThan(0)
  })

  it.each(ALL_PHOTOS.map((p) => [p.src, p] as const))(
    '%s is really the size it claims',
    (_name, p) => {
      const big = sizeOf(p.src)
      expect(big.width).toBe(p.width)
      expect(big.height).toBe(p.height)

      const small = sizeOf(p.small)
      expect(small.width).toBe(p.smallWidth)
    },
  )

  /**
   * Обе ширины одного снимка должны быть одной пропорции: `width`/`height` в
   * разметке берутся от большого файла и резервируют место под оба. Разойдись
   * они, маленький файл поедет с растяжением, а CLS останется нулевым, и
   * поймать это глазами снова не выйдет.
   */
  it.each(ALL_PHOTOS.map((p) => [p.src, p] as const))('%s keeps one aspect ratio', (_name, p) => {
    const big = sizeOf(p.src)
    const small = sizeOf(p.small)
    expect(Math.abs(big.width / big.height - small.width / small.height)).toBeLessThan(0.01)
  })
})
