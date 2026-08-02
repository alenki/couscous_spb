import { motion } from 'motion/react'
import { Postmark, ChalkHeart } from './ornaments'
import { REVIEW_STATS, REVIEW_STATS_NOTE } from '../data'

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function Atmosphere() {
  return (
    <section className="atmosphere" id="atmosphere" aria-labelledby="atmo-h">
      <div className="atmosphere-inner">
        <p className="eyebrow">интерьер</p>
        <h2 className="section-h" id="atmo-h">
          Открытка изнутри
        </h2>
        <p className="chalk-line">
          дерево, мел и сердечки <ChalkHeart color="var(--red)" /> <ChalkHeart color="var(--parch-hi)" />{' '}
          <ChalkHeart color="var(--yellow)" /> — и гирлянда флажков над стойкой
        </p>

        <div className="postcards">
          <motion.figure
            className="postcard postcard--wide"
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <img
              src="/interior-hall.jpg"
              alt="Зал кафе: деревянные столы и стены, меловое табло с меню, тёплые лампы и расписной потолок"
              loading="lazy"
              width="1600"
              height="1200"
            />
            <span className="postcard-mark" aria-hidden="true">
              <Postmark />
            </span>
            <figcaption>зал: меловое табло, лампы и длинный стол</figcaption>
          </motion.figure>
          <motion.figure
            className="postcard postcard--tall"
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <img
              src="/interior-counter.jpg"
              alt="Барная стойка из дерева под меловым табло с сердечками и гирляндой из разноцветных флажков"
              loading="lazy"
              width="1000"
              height="1333"
            />
            <span className="postcard-mark" aria-hidden="true">
              <Postmark />
            </span>
            <figcaption>стойка под гирляндой из флажков</figcaption>
          </motion.figure>
        </div>

        <ul className="review-stamps" aria-label="Что хвалят гости">
          {REVIEW_STATS.map((s) => (
            <li className="review-stamp" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="source-note source-note--dark">{REVIEW_STATS_NOTE}</p>
      </div>
    </section>
  )
}
