import { m } from 'motion/react'
import { useLang } from '../lang'
import { REVIEW_STATS, REVIEW_STATS_NOTE, UI } from '../data'
import { Bulb, MandalaDisc } from './ornaments/chalk'

const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
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
              sizes="(min-width: 900px) 28vw, 92vw"
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
              sizes="(min-width: 900px) 38vw, 92vw"
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

      <div className="wrap atmo__stats-row">
        {REVIEW_STATS.map((s, i) => (
          <m.div
            key={s.label.ru}
            className="atmo__stat"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, delay: i * 0.12 }}
          >
            <svg className="atmo__stat-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--chalk)"
                strokeWidth="2"
                strokeDasharray="4 7"
                opacity="0.7"
              />
            </svg>
            <span className="atmo__stat-value font-chalk">{s.value}</span>
            <span className="atmo__stat-label font-chalk">{t(s.label)}</span>
          </m.div>
        ))}
      </div>
      <p className="atmo__stats-note font-mono">{t(REVIEW_STATS_NOTE)}</p>
    </section>
  )
}
