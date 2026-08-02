import { motion } from 'motion/react'
import { AwardStamp } from './ornaments'
import { BRANCHES, BRANCHES_SOURCE_NOTE } from '../data'

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function Terminals() {
  return (
    <section className="terminals" id="terminals" aria-labelledby="term-h">
      <div className="terminals-inner">
        <p className="eyebrow eyebrow--light">адреса</p>
        <h2 className="section-h section-h--light" id="term-h">
          Два терминала
        </h2>
        <p className="terminals-sub">обе точки — каждый день с 11:00</p>

        <div className="terminal-grid">
          {BRANCHES.map((b, i) => (
            <motion.article
              className="terminal-card"
              key={b.terminal}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12 }}
            >
              <img className="terminal-icon" src={b.icon} alt="" width="92" height="92" loading="lazy" />
              <p className="terminal-code">{b.terminal}</p>
              <h3 className="terminal-area">{b.area}</h3>
              <p className="terminal-addr">
                {b.address}
                {b.addressNote && <span className="terminal-addr-note">{b.addressNote}</span>}
              </p>
              {b.metro && <p className="terminal-metro">{b.metro}</p>}
              <a className="terminal-phone" href={b.phoneHref}>
                {b.phone}
              </a>
              <p className="terminal-hours">{b.hours}</p>
              <p className="terminal-rating">
                ★ {b.rating} · {b.ratingsCount}
              </p>
              <span className="terminal-award">
                <AwardStamp compact />
              </span>
              <a className="stub-btn stub-btn--map" href={b.yandexUrl} target="_blank" rel="noopener noreferrer">
                Маршрут в Яндекс Картах ↗
              </a>
            </motion.article>
          ))}
        </div>

        <p className="source-note source-note--center">
          {BRANCHES_SOURCE_NOTE} Меню и цены немного различаются между точками.
        </p>
      </div>
    </section>
  )
}
