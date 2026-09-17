import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLang } from '../lang'
import { CAFE, LANGS, UI } from '../data'
import { ArchMark } from './ornaments/damascene'

/**
 * Переключатель языка на три значения.
 *
 * Не `<select>` и не пара кнопок «туда-обратно»: с тремя языками циклическая
 * кнопка заставляет угадывать, что будет следующим, а на арабском ещё и
 * переворачивает страницу, поэтому цена ошибки высокая. Сегментированная группа
 * показывает все три сразу и текущий выбор.
 *
 * Роль группы задана `role="group"` с общей подписью, состояние задано через `aria-pressed`:
 * это кнопки-переключатели, а не ссылки и не радиогруппа формы.
 */
function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div
      className="langs"
      role="group"
      aria-label={t(UI.langLabel)}
      dir="ltr"
      style={{
        '--lang-index': LANGS.findIndex((l) => l.code === lang),
        '--lang-count': LANGS.length,
      } as CSSProperties}
    >
      <span className="langs__pill" aria-hidden="true" />
      {LANGS.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            className={`langs__btn${active ? ' is-active' : ''}`}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            lang={l.code}
          >
            <span aria-hidden="true">{l.label}</span>
            <span className="visually-hidden">{t(l.full)}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Ниже этого порога разделы и языки уезжают под кнопку-гамбургер. */
const NARROW = '(max-width: 719.98px)'

export function Header() {
  const { t } = useLang()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  /* Шапка липкая всю дорогу, но фон и тень получает только после ухода первого
     экрана: на камне героя сплошная плашка обрезала бы арку. Наблюдаем за
     часовым-пикселем, а не за событием прокрутки, без слушателя на scroll. */
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  /* Панель закрывают тремя привычными способами: Escape, нажатие мимо неё и
     переход по ссылке. Escape возвращает фокус на кнопку, иначе он остался бы
     на исчезнувшем элементе и следующий Tab начал бы обход с начала страницы.
     Слушатели живут только пока панель открыта. */
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      burgerRef.current?.focus()
    }
    /* pointerdown, а не click: на телефоне между ними лежит прокрутка, и
       по click панель успевала бы уехать вместе со страницей. */
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (drawerRef.current?.contains(target) || burgerRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  /* Поворот телефона в альбом переводит шапку в широкую раскладку, где кнопки
     уже нет. Забытое открытое состояние вернулось бы вместе с портретом. */
  useEffect(() => {
    const mq = window.matchMedia(NARROW)
    const sync = () => {
      if (!mq.matches) setOpen(false)
    }
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <header className={`header${stuck ? ' is-stuck' : ''}`}>
      <div className="header__inner">
        <a className="header__brand" href="#top" aria-label={`${CAFE.wordmark}: ${t(CAFE.tagline)}`}>
          <ArchMark size={30} />
          <span className="header__word">
            <span className="header__name">{CAFE.wordmark}</span>
            <span className="header__sub">{t(CAFE.tagline)}</span>
          </span>
        </a>

        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-label={t(UI.navToggle)}
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger__box" aria-hidden="true">
            <span className="burger__line" />
            <span className="burger__line" />
          </span>
        </button>

        {/* Одна разметка на обе раскладки: на широком экране у ящика
            display: contents, и разделы с языками становятся обычными
            соседями логотипа, как были. */}
        <div ref={drawerRef} className="header__drawer" id="site-drawer" data-open={open}>
          <nav className="header__nav" aria-label={t(UI.sections)} onClick={() => setOpen(false)}>
            <a href="#menu">{t(UI.navMenu)}</a>
            <a href="#room">{t(UI.navRoom)}</a>
            <a href="#visit">{t(UI.navVisit)}</a>
          </nav>

          {/* Выбор языка панель не закрывает: переключатель сам показывает
              состояние, и закрытие отняло бы эту обратную связь. */}
          <LangSwitch />
        </div>
      </div>
    </header>
  )
}
