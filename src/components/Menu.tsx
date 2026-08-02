import { m } from 'motion/react'
import { useLang } from '../lang'
import { DRINKS, DRINKS_NOTE, MENU, MENU_SOURCE_NOTE, UI, type Dish, type DishGroup } from '../data'
import { Bunting, ChalkFlag, ChalkHeart, ChalkRule } from './ornaments/chalk'

const GROUP_TONES = ['red', 'yellow', 'green'] as const

const groupVariants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

/* сердечки, рассыпанные по доске — фиксированные позиции, как накидано мелом */
const HEARTS: { top: string; left: string; size: number; tone: 'red' | 'white' | 'yellow'; rotate: number }[] = [
  { top: '9%', left: '6%', size: 15, tone: 'red', rotate: -10 },
  { top: '14%', left: '92%', size: 12, tone: 'white', rotate: 12 },
  { top: '30%', left: '48%', size: 13, tone: 'red', rotate: 6 },
  { top: '46%', left: '4%', size: 11, tone: 'yellow', rotate: -14 },
  { top: '55%', left: '95%', size: 14, tone: 'red', rotate: -6 },
  { top: '72%', left: '50%', size: 11, tone: 'white', rotate: 10 },
  { top: '86%', left: '8%', size: 13, tone: 'red', rotate: 8 },
  { top: '90%', left: '90%', size: 12, tone: 'yellow', rotate: -12 },
]

function DishRow({ dish }: { dish: Dish }) {
  const { t } = useLang()
  return (
    <m.li className="dish" variants={itemVariants}>
      <span className="dish__row">
        <span className="dish__name font-chalk">
          <ChalkFlag kind={dish.flag} />
          {t(dish.name)}
        </span>
        <span className="dish__dots" aria-hidden="true" />
        <span className="dish__weight font-mono">{t(dish.weight)}</span>
        <span className="dish__price font-mono">{dish.price}&nbsp;₽</span>
      </span>
      {dish.desc && <span className="dish__desc font-chalk">{t(dish.desc)}</span>}
    </m.li>
  )
}

function Group({ group, tone }: { group: DishGroup; tone: (typeof GROUP_TONES)[number] }) {
  const { t } = useLang()
  return (
    <m.div
      className="menu-group"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-60px' }}
      variants={groupVariants}
    >
      <m.h3 className={`menu-group__title menu-group__title--${tone} font-chalk`} variants={itemVariants}>
        {t(group.title)}
      </m.h3>
      <ul className="menu-group__list">
        {group.dishes.map((d) => (
          <DishRow key={d.name.ru} dish={d} />
        ))}
      </ul>
    </m.div>
  )
}

export function Menu() {
  const { t } = useLang()
  const [shawarma, plates, meatless] = MENU
  return (
    <section id="menu" className="menu act-board">
      <div className="menu__hearts" aria-hidden="true">
        {HEARTS.map((h, i) => (
          <m.span
            key={i}
            style={{ position: 'absolute', top: h.top, left: h.left }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.15 + i * 0.1 }}
          >
            <ChalkHeart size={h.size} tone={h.tone} rotate={h.rotate} />
          </m.span>
        ))}
      </div>

      <div className="wrap menu__inner">
        <Bunting />
        <m.h2
          className="menu__title font-chalk"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ChalkHeart size={16} tone="red" rotate={-12} />
          {t(UI.menuTitle)}
          <ChalkHeart size={16} tone="red" rotate={10} />
        </m.h2>
        <ChalkRule />

        <div className="menu__columns">
          <Group group={shawarma} tone={GROUP_TONES[0]} />
          <div className="menu__col2">
            <Group group={plates} tone={GROUP_TONES[1]} />
            <Group group={meatless} tone={GROUP_TONES[2]} />

            <m.div
              className="menu-group"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '-60px' }}
              variants={groupVariants}
            >
              <m.h3 className="menu-group__title menu-group__title--blue font-chalk" variants={itemVariants}>
                {t(UI.drinksTitle)}
              </m.h3>
              <m.p className="menu__drinks font-chalk" variants={itemVariants}>
                {t(DRINKS).join(' · ')}
              </m.p>
              <m.p className="menu__drinks-note font-chalk" variants={itemVariants}>
                {t(DRINKS_NOTE)}
              </m.p>
            </m.div>
          </div>
        </div>

        <p className="menu__source font-mono">{t(MENU_SOURCE_NOTE)}</p>
      </div>
    </section>
  )
}

