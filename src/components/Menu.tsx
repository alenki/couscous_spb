import { useEffect, useRef, useState } from 'react'
import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, MENU, UI, srcSet, type Course, type Dish } from '../data'
import { ArrowGlyph, OliveBranch, Star8 } from './ornaments/damascene'

const COURSE_IDS = MENU.map((c) => c.id)

/**
 * Какой раздел меню сейчас под шапкой.
 *
 * Наблюдатель, а не слушатель `scroll`: на странице в девять разделов и
 * шестьдесят два блюда пересчёт позиций на каждый кадр прокрутки — самая
 * дорогая вещь, какую можно себе позволить.
 *
 * Верхняя граница окна наблюдения опущена под шапку и ленту (-152px), нижняя
 * поднята до 55% экрана: в полосе остаётся только то, что читатель правда
 * видит сверху. Из всех попавших берём первый по документу — иначе на стыке
 * разделов активная вкладка прыгала бы вперёд-назад.
 */
function useActiveCourse(): string {
  const [active, setActive] = useState(COURSE_IDS[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const seen = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id.replace('course-', ''), e.isIntersecting)
        const first = COURSE_IDS.find((id) => seen.get(id))
        if (first) setActive(first)
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

/** Лента разделов: сайдбар на широком экране, горизонтальный скроллер на узком. */
function Rail({ active }: { active: string }) {
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
      <ul className="rail__list" ref={ref}>
        {MENU.map((c) => {
          const on = c.id === active
          return (
            <li key={c.id}>
              <a
                className={`rail__chip${on ? ' is-active' : ''}`}
                href={`#course-${c.id}`}
                aria-current={on ? 'true' : undefined}
              >
                {t(c.title)}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function DishRow({ dish }: { dish: Dish }) {
  const { t } = useLang()
  return (
    <li className="dish">
      <span className="dish__line">
        <span className="dish__name">{t(dish.name)}</span>
        <span className="dish__dots" aria-hidden="true" />
        <span className="dish__meta">
          <span className="dish__weight num">{t(dish.weight)}</span>
          <span className="dish__price num">{dish.price}&nbsp;₽</span>
        </span>
      </span>
      {dish.desc && <span className="dish__desc">{t(dish.desc)}</span>}
    </li>
  )
}

function CourseBlock({ course }: { course: Course }) {
  const { t } = useLang()
  const shot = course.dishes.find((d) => d.photo)

  return (
    <section className="course" id={`course-${course.id}`} aria-labelledby={`h-${course.id}`}>
      <h3 className="course__title" id={`h-${course.id}`}>
        <Star8 size={13} className="course__star" />
        {t(course.title)}
      </h3>

      {shot?.photo && (
        <m.figure
          className="course__photo"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={shot.photo.src}
            srcSet={srcSet(shot.photo)}
            sizes="(min-width: 1080px) 620px, (min-width: 700px) 62vw, 92vw"
            alt={t(shot.photo.alt)}
            width={shot.photo.width}
            height={shot.photo.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            {t(shot.name)} · <span className="num">{shot.price}&nbsp;₽</span>
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
      </div>

      <div className="wrap menu__body">
        <Rail active={active} />
        <div className="menu__courses">
          {MENU.map((c) => (
            <CourseBlock key={c.id} course={c} />
          ))}

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
