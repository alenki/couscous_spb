import { useState } from 'react'
import { m } from 'motion/react'
import type { CSSProperties } from 'react'
import { useLang } from '../lang'
import { REVIEW_STATS, REVIEW_STATS_NOTE, UI } from '../data'
import { Bulb, MandalaDisc } from './ornaments/chalk'

const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/** Кольцо-шкала: дуга прочерчивается на долю процента. */
const RING_R = 44
const RING_C = 2 * Math.PI * RING_R

/**
 * Одна шкала отзывов.
 *
 * Дугу ведёт CSS (как штрихи фриза), а не анимация на самой <circle>. Прежде
 * дуга была m.circle со своим initial={strokeDashoffset: длина окружности} и
 * своим whileInView. Наблюдателя вешали прямо на фигуру SVG — а у фигуры нет
 * блочного бокса, и в Safari IntersectionObserver такую цель молча не считает
 * пересечённой. Тогда whileInView не наступал никогда: карточка всплывала (её
 * наблюдатель сидит на <li>, обычном блоке), число и подпись читались, а дуга
 * навсегда оставалась в стартовом «не прочерчено» — кольцо показывало одну
 * пунктирную подложку. Ровно это и видно было на телефоне.
 *
 * Теперь наблюдатель один и на блочном элементе, а покой дуги — уже готовый
 * процент. Класс включает прочерк; не придёт класс — шкала просто не
 * прорисуется на глазах, но покажет верное значение.
 */
function Stat({ label, pct, index }: { label: string; pct: number; index: number }) {
  const [drawn, setDrawn] = useState(false)
  return (
    <m.li
      className={`atmo__stat${drawn ? ' is-drawn' : ''}`}
      style={{ '--ring-delay': `${0.2 + index * 0.14}s` } as CSSProperties}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      onViewportEnter={() => setDrawn(true)}
      transition={{ type: 'spring', stiffness: 320, damping: 20, delay: index * 0.1 }}
    >
      <div className="atmo__stat-dial">
        <svg className="atmo__stat-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="atmo__stat-track" cx="50" cy="50" r={RING_R} />
          <circle
            className="atmo__stat-arc"
            cx="50"
            cy="50"
            r={RING_R}
            style={
              {
                '--ring-c': `${RING_C}`,
                '--ring-drawn': `${RING_C * (1 - pct / 100)}`,
              } as CSSProperties
            }
          />
        </svg>
        <span className="atmo__stat-value font-chalk">{pct}%</span>
      </div>
      <span className="atmo__stat-label font-chalk">{label}</span>
    </m.li>
  )
}

export function Atmosphere() {
  const { t } = useLang()
  return (
    <section className="atmo act-board">
      {/* потолок: мандала и лампы, как в зале */}
      <div className="atmo__ceiling" aria-hidden="true">
        <Bulb cord={46} delay={-1.2} />
        <Bulb cord={110} delay={-3.3} />
        <MandalaDisc size={280} />
        <Bulb cord={84} delay={-2.2} />
        <Bulb cord={30} delay={-4.1} />
      </div>

      <m.h2
        className="atmo__title font-chalk"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true }}
        variants={rise}
      >
        {t(UI.atmoTitle)}
      </m.h2>

      <div className="atmo__room wood">
        <div className="wrap atmo__gallery">
          <m.figure
            className="atmo__photo atmo__photo--a"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-60px' }}
            variants={rise}
          >
            <img
              src="/interior-counter.jpg"
              srcSet="/interior-counter-640.jpg 640w, /interior-counter.jpg 1000w"
              sizes="(min-width: 900px) 28vw, 45vw"
              alt={t(UI.photoAltCounter)}
              width="1000"
              height="1333"
              loading="lazy"
            />
          </m.figure>
          <m.figure
            className="atmo__photo atmo__photo--b"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-60px' }}
            variants={rise}
            transition={{ delay: 0.12 }}
          >
            <img
              src="/interior-hall.jpg"
              srcSet="/interior-hall-640.jpg 640w, /interior-hall.jpg 1600w"
              sizes="(min-width: 900px) 38vw, 45vw"
              alt={t(UI.photoAltHall)}
              width="1600"
              height="1200"
              loading="lazy"
            />
          </m.figure>
          <m.div
            className="atmo__card"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-60px' }}
            variants={rise}
            transition={{ delay: 0.2 }}
          >
            <p>{t(UI.atmoText)}</p>
          </m.div>
        </div>
      </div>

      <div className="wrap atmo__reviews">
        <m.h3
          className="atmo__reviews-lead font-chalk"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true }}
          variants={rise}
        >
          {t(UI.reviewsLead)}
        </m.h3>

        <ul className="atmo__stats-row" role="list">
          {REVIEW_STATS.map((s, i) => (
            <Stat key={s.label.ru} label={t(s.label)} pct={s.pct} index={i} />
          ))}
        </ul>

        <p className="atmo__stats-note font-mono">{t(REVIEW_STATS_NOTE)}</p>
      </div>
    </section>
  )
}
