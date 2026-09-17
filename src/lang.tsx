import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { L, Lang } from './data'

const KEY = 'damask-lang'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null)

function isLang(v: unknown): v is Lang {
  return v === 'ru' || v === 'en' || v === 'ar'
}

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY)
    if (isLang(stored)) return stored
  } catch {
    /* приватный режим, просто не читаем */
  }
  return 'ru'
}

/**
 * Арабские шрифты грузятся только при выборе арабского.
 *
 * Amiri и Cairo вместе весят больше, чем вся остальная страница: платить за них
 * на русском и английском визите незачем. Vite выделяет эти два `import()` в
 * отдельный чанк, и браузер идёт за ним ровно один раз, обещание кешируется
 * в модульной переменной, так что переключение AR → RU → AR ничего не качает.
 *
 * Пока чанк едет, арабский набирается системным насхом из `--font-ar-*`
 * (Segoe UI / Geeza Pro / Noto Naskh): текст читается с первого кадра.
 */
let arabicFonts: Promise<unknown> | null = null
function loadArabicFonts() {
  arabicFonts ??= Promise.all([
    import('@fontsource/amiri/arabic-400.css'),
    import('@fontsource/cairo/arabic-400.css'),
    import('@fontsource/cairo/arabic-600.css'),
  ])
  return arabicFonts
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = lang === 'ar' ? 'rtl' : 'ltr'
    if (lang === 'ar') void loadArabicFonts()
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* приватный режим, просто не сохраняем */
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    // Начинаем качать шрифт по нажатию, а не после перерисовки: пара кадров
    // форы заметна на медленной сети.
    if (next === 'ar') void loadArabicFonts()
    setLangState(next)
  }, [])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang outside LangProvider')
  const { lang, setLang } = ctx
  const t = useCallback(<T,>(l: L<T>): T => l[lang], [lang])
  return { lang, setLang, t, rtl: lang === 'ar' }
}
