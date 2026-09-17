import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, MENU, UI, srcSet, type Course, type Dish } from '../data'
import { ArrowGlyph, OliveBranch } from './ornaments/damascene'

const COURSE_IDS = MENU.map((c) => c.id)
const PRICES = MENU.flatMap((c) => c.dishes.map((d) => d.price))
const DISH_COUNT = PRICES.length
/** Разброс цен по меню. Тире полукегельное, как в часах и среднем чеке. */
const PRICE_SPAN = `${Math.min(...PRICES)}–${Math.max(...PRICES)} ₽`

/**
 * Номер раздела в два знака: «01», а не «1».
 *
 * Колонка номеров в боковике и в шапке раздела стоит слева от текста, и на
 * девятом разделе одноразрядное число сдвинуло бы всю колонку названий.
 */
const ord = (i: number) => String(i + 1).padStart(2, '0')

/**
 * Какой раздел меню сейчас под шапкой. Возвращается номер, а не идентификатор:
 * по нему же заливается полоса прогресса в боковике.
 *
 * Наблюдатель, а не слушатель `scroll`: на странице в девять разделов и
 * шестьдесят два блюда пересчёт позиций на каждый кадр прокрутки является самой
 * дорогая вещь, какую можно себе позволить.
 *
 * Верхняя граница окна наблюдения опущена под шапку и ленту (-152px), нижняя
 * поднята до 55% экрана: в полосе остаётся только то, что читатель правда
 * видит сверху. Из всех попавших берём первый по документу, иначе на стыке
 * разделов активная вкладка прыгала бы вперёд-назад.
 */
function useActiveCourse(): number {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const seen = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id.replace('course-', ''), e.isIntersecting)
        const first = COURSE_IDS.findIndex((id) => seen.get(id))
        if (first !== -1) setActive(first)
      },
      { rootMargin: '-152px 0px -55% 0px', threshold: 0 },
    )
    const els = COURSE_IDS.map((id) => document.getElementById(`course-${id}`)).filter(
      (el): el is HTMLElement => el !== null,
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}

/**
 * Указатель разделов: оглавление сбоку на широком экране, лента вкладок на узком.
 *
 * `--i` и `--n` уезжают в CSS, потому что заливка вертикальной полосы считается
 * долей пройденного (`(--i + 1) / --n`), а высота пунктов одинаковая: доля и
 * есть высота заливки. Держать ту же арифметику в JS значило бы читать
 * геометрию из лэйаута на каждый сдвиг активного раздела.
 */
function Rail({ active }: { active: number }) {
  const { t } = useLang()
  const ref = useRef<HTMLUListElement>(null)

  /* Догоняем активную вкладку в горизонтальном скроллере. `scrollBy` со
     смещением, а не `scrollLeft = …`: знак scrollLeft в RTL разный у движков,
     а дельта одинаково работает в обе стороны. */
  useEffect(() => {
    const rail = ref.current
    if (!rail || rail.scrollWidth <= rail.clientWidth + 1) return
    const chip = rail.querySelector<HTMLElement>('[aria-current="true"]')
    if (!chip) return
    const r = rail.getBoundingClientRect()
    const c = chip.getBoundingClientRect()
    const delta = c.left + c.width / 2 - (r.left + r.width / 2)
    if (Math.abs(delta) < 8) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rail.scrollBy({ left: delta, behavior: still ? 'auto' : 'smooth' })
  }, [active])

  return (
    <nav className="rail" aria-label={t(UI.menuNav)}>
      <p className="rail__head" aria-hidden="true">
        {t(UI.sections)}
      </p>

      <ul
        className="rail__list"
        ref={ref}
        style={{ '--i': active, '--n': MENU.length } as CSSProperties}
      >
        {MENU.map((c, i) => {
          const on = i === active
          return (
            <li key={c.id}>
              <a
                className={`rail__chip${on ? ' is-active' : ''}`}
                href={`#course-${c.id}`}
                aria-current={on ? 'true' : undefined}
              >
                <span className="rail__ord num" aria-hidden="true">
                  {ord(i)}
                </span>
                <span className="rail__name">{t(c.title)}</span>
                <span className="rail__count num" aria-hidden="true">
                  {c.dishes.length}
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Читатель меню находится ровно в той точке, где бронь имеет смысл, а
          боковик стоит на экране все шесть тысяч пикселей списка. Кнопка тихая,
          обведённая: заливать её в олив значит спорить с ценами за внимание. */}
      <a
        className="btn rail__book"
        href={CAFE.bookUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t(UI.ctaBook)}
        <ArrowGlyph />
      </a>
    </nav>
  )
}

/**
 * Строка блюда: название с выносной пунктирной линейкой, вес и цена справа,
 * состав под названием.
 *
 * Сетка, а не одна флекс-строка: состав обязан стоять в колонке названия, иначе
 * длинное описание подтекает под цену и приходится отбивать его фиктивным
 * отступом. Выравнивание по базовой линии держит цену на строке названия.
 */
function DishRow({ dish }: { dish: Dish }) {
  const { t } = useLang()
  return (
    <li className="dish">
      <p className="dish__head">
        <span className="dish__name">{t(dish.name)}</span>
        <span className="dish__lead" aria-hidden="true" />
      </p>
      <p className="dish__meta">
        <span className="dish__weight num">{t(dish.weight)}</span>
        <span className="dish__price num">{dish.price}&nbsp;₽</span>
      </p>
      {dish.desc && <p className="dish__desc">{t(dish.desc)}</p>}
    </li>
  )
}

function CourseBlock({ course }: { course: Course }) {
  const { t, lang } = useLang()
  const shot = course.dishes.find((d) => d.photo)

  return (
    <section className="course" id={`course-${course.id}`} aria-labelledby={`h-${course.id}`}>
      <header className="course__head">
        <h3 className="course__title" id={`h-${course.id}`}>
          {t(course.title)}
        </h3>
        {/* Арабское имя раздела стоит парой к русскому: кафе сирийское, и
            вязь здесь такой же факт, как цена. На самом арабском она была бы
            повтором заголовка, поэтому там её нет. Для чтеца скрыта: озвучивать
            арабское слово голосом русской локали незачем. */}
        {lang !== 'ar' && (
          <span className="course__ar" lang="ar" dir="rtl" aria-hidden="true">
            {course.title.ar}
          </span>
        )}
      </header>

      {shot?.photo && (
        <m.figure
          className="course__plate"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={shot.photo.src}
            srcSet={srcSet(shot.photo)}
            sizes="(min-width: 1080px) 60vw, (min-width: 700px) 72vw, 92vw"
            alt={t(shot.photo.alt)}
            width={shot.photo.width}
            height={shot.photo.height}
            style={shot.photo.focus ? { objectPosition: shot.photo.focus } : undefined}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <span className="course__plate-name">{t(shot.name)}</span>
            <span className="course__plate-price num">{shot.price}&nbsp;₽</span>
          </figcaption>
        </m.figure>
      )}

      <ul className="course__list" role="list">
        {course.dishes.map((d) => (
          <DishRow key={d.name.ru} dish={d} />
        ))}
      </ul>
    </section>
  )
}

/** Лента фактов под заголовком: три числа, которыми меню описывается целиком. */
function Facts() {
  const { t } = useLang()
  return (
    <dl className="menu__facts">
      <div className="fact">
        <dt>{t(UI.sections)}</dt>
        <dd className="num">{MENU.length}</dd>
      </div>
      <div className="fact">
        <dt>{t(UI.menuDishes)}</dt>
        <dd className="num">{DISH_COUNT}</dd>
      </div>
      <div className="fact">
        <dt>{t(UI.menuPrices)}</dt>
        <dd className="num">{PRICE_SPAN}</dd>
      </div>
    </dl>
  )
}

export function Menu() {
  const { t } = useLang()
  const active = useActiveCourse()

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="wrap menu__head">
        <OliveBranch width={188} className="menu__branch" />
        <h2 className="section-title" id="menu-title">
          {t(UI.menuTitle)}
        </h2>
        <p className="section-lead">{t(UI.menuLead)}</p>
        <Facts />
      </div>

      <div className="wrap menu__body">
        <Rail active={active} />

        <div className="menu__card">
          <div className="menu__courses">
            {MENU.map((c) => (
              <CourseBlock key={c.id} course={c} />
            ))}
          </div>

          <p className="menu__source">
            {t(UI.menuSource)}{' '}
            <a href={CAFE.yandexMenuUrl} target="_blank" rel="noopener noreferrer">
              {t(UI.menuFull)}
              <ArrowGlyph />
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
