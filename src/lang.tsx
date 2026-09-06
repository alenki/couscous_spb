import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { L } from './data'

type Lang = 'ru' | 'en'

const KEY = 'casbah-lang'

const LangContext = createContext<{ lang: Lang; toggle: () => void } | null>(null)

function initialLang(): Lang {
  try {
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'ru'
  } catch {
    return 'ru'
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* приватный режим — просто не сохраняем */
    }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'ru' ? 'en' : 'ru')), [])

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang outside LangProvider')
  const { lang, toggle } = ctx
  const t = useCallback(<T,>(l: L<T>): T => l[lang], [lang])
  return { lang, toggle, t }
}
