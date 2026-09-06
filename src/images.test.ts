/**
 * Дескриптор `w` в srcSet должен совпадать с настоящей шириной файла.
 *
 * Повод: interior-counter-640.jpg был назван по длинной стороне и лежал как
 * 480×640, объявляясь при этом как `640w`. Браузер на DPR 2–3 честно выбирал
 * его, считая, что получит 640 физических точек, а получал 480 — самое высокое
 * фото на странице отрисовывалось в 1,34× на двукратном экране. Верстку это
 * не ломало (пропорции совпадали, CLS ноль), поэтому глазами не ловилось.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const PUBLIC = join(import.meta.dirname ?? new URL('.', import.meta.url).pathname, '..', 'public')

/** Ширина и высота JPEG из маркера SOF — без зависимостей. */
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

/** Все пары «файл — дескриптор» из всех srcSet в компонентах. */
function declaredCandidates(): { file: string; declared: number }[] {
  const dir = join(PUBLIC, '..', 'src', 'components')
  const out: { file: string; declared: number }[] = []
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.tsx')) continue
    const src = readFileSync(join(dir, name), 'utf8')
    for (const m of src.matchAll(/srcSet="([^"]+)"/g)) {
      for (const part of m[1].split(',')) {
        const [url, desc] = part.trim().split(/\s+/)
        if (desc?.endsWith('w')) out.push({ file: url.replace(/^\//, ''), declared: parseInt(desc, 10) })
      }
    }
  }
  return out
}

describe('srcSet descriptors', () => {
  const candidates = declaredCandidates()

  it('finds the srcSet candidates to check', () => {
    expect(candidates.length).toBeGreaterThan(0)
  })

  it.each(candidates)('$file is really $declared px wide', ({ file, declared }) => {
    const { width } = jpegSize(readFileSync(join(PUBLIC, file)))
    expect(width).toBe(declared)
  })
})
