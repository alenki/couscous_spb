import { motion, type Variants } from 'motion/react'
import { FlagChip } from './ornaments'
import { MENU, DRINKS, DRINKS_NOTE, MENU_SOURCE_NOTE } from '../data'

const listVar: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const rowVar: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export function Board() {
  return (
    <section className="board" id="tablo" aria-labelledby="tablo-h">
      <div className="board-inner">
        <p className="eyebrow eyebrow--light">меню · социалистическая, 15</p>
        <h2 className="board-title" id="tablo-h" aria-label="Табло отправлений">
          <span className="board-title-word" aria-hidden="true">
            {'ТАБЛО'.split('').map((ch, i) => (
              <span className="board-title-cell" key={i}>
                {ch}
              </span>
            ))}
          </span>{' '}
          <span className="board-title-word" aria-hidden="true">
            {'ОТПРАВЛЕНИЙ'.split('').map((ch, i) => (
              <span className="board-title-cell" key={i}>
                {ch}
              </span>
            ))}
          </span>
        </h2>

        <div className="board-cols" aria-hidden="true">
          <span>направление</span>
          <span>вес</span>
          <span>цена</span>
        </div>

        {MENU.map((group) => (
          <section className="board-group" key={group.title}>
            <h3 className="board-group-title">{group.title}</h3>
            <motion.ul
              className="board-list"
              variants={listVar}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              {group.dishes.map((d) => (
                <motion.li className="board-row" key={d.name} variants={rowVar}>
                  <span className="board-name">
                    <FlagChip kind={d.flag} />
                    <span className="board-name-text">{d.name}</span>
                    <span className="board-leader" aria-hidden="true" />
                  </span>
                  <span className="board-weight">{d.weight}</span>
                  <span className="board-price">{d.price} ₽</span>
                  {d.desc && <span className="board-desc">{d.desc}</span>}
                </motion.li>
              ))}
            </motion.ul>
          </section>
        ))}

        <aside className="board-drinks">
          <p className="board-drinks-title">и у бара —</p>
          <p className="board-drinks-list">{DRINKS.join(' · ')}</p>
          <p className="board-drinks-note">{DRINKS_NOTE}</p>
        </aside>

        <p className="source-note">{MENU_SOURCE_NOTE}</p>
      </div>
    </section>
  )
}
