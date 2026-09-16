import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, LANGS, UI, type Lang } from '../data'
import { ArchMark } from './ornaments/damascene'

/**
 * Переключатель языка на три значения.
 *
 * Не `<select>` и не пара кнопок «туда-обратно»: с тремя языками циклическая
 * кнопка заставляет угадывать, что будет следующим, а на арабском ещё и
 * переворачивает страницу — цена ошибки высокая. Сегментированная группа
 * показывает все три сразу и текущий выбор.
 *
 * Роль группы задана `role="group"` с общей подписью, состояние — `aria-pressed`:
 * это кнопки-переключатели, а не ссылки и не радиогруппа формы.
 */
function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="langs" role="group" aria-label={t(UI.langLabel)}>
      {LANGS.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            className={`langs__btn${active ? ' is-active' : ''}`}
            onClick={() => setLang(l.code as Lang)}
            aria-pressed={active}
            lang={l.code}
          >
            <span aria-hidden="true">{l.label}</span>
            <span className="visually-hidden">{t(l.full)}</span>
            {active && <m.span className="langs__pill" layoutId="lang-pill" aria-hidden="true" />}
          </button>
        )
      })}
    </div>
  )
}

export function Header() {
  const { t } = useLang()
  const [stuck, setStuck] = useState(false)

  /* Шапка липкая всю дорогу, но фон и тень получает только после ухода первого
     экрана: на камне героя сплошная плашка обрезала бы арку. Наблюдаем за
     часовым-пикселем, а не за событием прокрутки — без слушателя на scroll. */
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  return (
    <header className={`header${stuck ? ' is-stuck' : ''}`}>
      <div className="header__inner">
        <a className="header__brand" href="#top" aria-label={`${CAFE.wordmark} — ${t(CAFE.tagline)}`}>
          <ArchMark size={30} />
          <span className="header__word">
            <span className="header__name">{CAFE.wordmark}</span>
            <span className="header__sub">{t(CAFE.tagline)}</span>
          </span>
        </a>

        <nav className="header__nav" aria-label={t(UI.sections)}>
          <a href="#menu">{t(UI.navMenu)}</a>
          <a href="#room">{t(UI.navRoom)}</a>
          <a href="#visit">{t(UI.navVisit)}</a>
        </nav>

        <LangSwitch />
      </div>
    </header>
  )
}
