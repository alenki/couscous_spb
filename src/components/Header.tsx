import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { useLang } from '../lang'
import { UI } from '../data'
import { KingMark } from './ornaments/engraved'

/**
 * Плавающий переключатель языка для телефона.
 *
 * Шапка стоит absolute внутри героя и уезжает вместе с ним, а страница на 390px
 * высотой около 5800px. После первого экрана сменить язык было нечем — только
 * прокруткой до самого верха. На телефоне из шапки к тому же убраны ссылки,
 * так что штамп языка остаётся единственным управляющим элементом и должен
 * быть под рукой. Появляется, когда герой (#top) уходит из вида; пока скрыт —
 * вне порядка обхода, чтобы два одинаковых переключателя не существовали разом.
 */
export function FloatingLang() {
  const { lang, toggle, t } = useLang()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const top = document.getElementById('top')
    if (!top || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0 })
    io.observe(top)
    return () => io.disconnect()
  }, [])

  return (
    <button
      type="button"
      className={`lang-stamp lang-stamp--float font-mono${shown ? ' is-shown' : ''}`}
      onClick={toggle}
      aria-label={t(UI.langSwitch)}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
    >
      {lang === 'ru' ? 'EN' : 'RU'}
    </button>
  )
}

export function Header() {
  const { lang, toggle, t } = useLang()
  const other = lang === 'ru' ? 'EN' : 'RU'
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label="Casbah">
        <KingMark size={46} />
        <span className="header__word">
          <span className="header__name font-display">{t(UI.brand)}</span>
          <span className="header__sub font-mono">{t(UI.brandSub)}</span>
        </span>
      </a>
      <nav className="header__nav font-mono" aria-label={lang === 'ru' ? 'Разделы' : 'Sections'}>
        <a href="#menu">{t(UI.navMenu)}</a>
        <a href="#branches">{t(UI.navBranches)}</a>
        <m.button
          type="button"
          className="lang-stamp font-mono"
          onClick={toggle}
          aria-label={t(UI.langSwitch)}
          whileTap={{ scale: 0.9 }}
        >
          {/* key на внутреннем span: кнопка не перемонтируется — фокус не теряется */}
          <m.span
            key={lang}
            style={{ display: 'grid', placeItems: 'center' }}
            initial={{ scale: 1.35, rotate: -16, opacity: 0.6 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          >
            {other}
          </m.span>
        </m.button>
      </nav>
    </header>
  )
}
