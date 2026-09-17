import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const EM_DASH = String.fromCodePoint(0x2014)
const TEXT_EXTENSIONS = new Set(['.css', '.html', '.md', '.ts', '.tsx'])
const SKIPPED_DIRECTORIES = new Set(['.chrome-debug', '.git', 'dist', 'node_modules'])

function textFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return SKIPPED_DIRECTORIES.has(entry.name) ? [] : textFiles(path)
    }

    return TEXT_EXTENSIONS.has(extname(entry.name)) ? [path] : []
  })
}

describe('typography', () => {
  it('contains no em dash characters in site text or documentation', () => {
    const offenders = textFiles(process.cwd())
      .filter((path) => readFileSync(path, 'utf8').includes(EM_DASH))
      .map((path) => relative(process.cwd(), path))

    expect(offenders).toEqual([])
  })
})
