import type { CSSProperties } from 'react'
import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, PRAISE, ROOM_PHOTOS, UI, srcSet } from '../data'
import { num, reviews } from '../plural'
import { ArrowGlyph, RatingStar, Star8 } from './ornaments/damascene'

const rise = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/**
 * Одна тема отзывов: доля положительных и объём выборки.
 *
 * Полоса чертится CSS-переходом на `transform: scaleX`, а не анимацией ширины:
 * ширина вызывает раскладку на каждом кадре, а таких полос четыре, и рядом
 * лежит длинная страница меню. Покойное состояние полосы содержит уже готовый
 * процент, поэтому если класс `is-drawn` почему-то не придёт, гость увидит
 * верное число, просто без прочерка.
 */
function PraiseBar({
  label,
  pct,
  count,
  index,
}: {
  label: string
  pct: number
  count: number
  index: number
}) {
  const { lang } = useLang()
  return (
    <m.li
      className="praise"
      style={{ '--pct': pct / 100, '--delay': `${0.1 + index * 0.1}s` } as CSSProperties}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-40px' }}
      variants={rise}
      onViewportEnter={(e) => (e?.target as HTMLElement | undefined)?.classList.add('is-drawn')}
    >
      <span className="praise__label">{label}</span>
      <span className="praise__value num">{pct}%</span>
      <span className="praise__track" aria-hidden="true">
        <span className="praise__fill" />
      </span>
      <span className="praise__count">{reviews(count, lang)}</span>
    </m.li>
  )
}

export function Room() {
  const { t, lang } = useLang()

  return (
    <section className="room" id="room" aria-labelledby="room-title">
      {/* потолок: россыпь золотых звёзд, как по кессонам зала */}
      <div className="room__stars" aria-hidden="true">
        {[8, 23, 39, 52, 68, 81, 94].map((left, i) => (
          <Star8 key={left} size={i % 3 === 0 ? 18 : 12} className={`room__star room__star--${i}`} />
        ))}
      </div>

      <div className="wrap room__head">
        <h2 className="section-title" id="room-title">
          {t(UI.roomTitle)}
        </h2>
        <p className="section-lead">{t(UI.roomText)}</p>
        <p className="room__rating">
          <RatingStar />
          <span className="visually-hidden">{t(UI.ratingLabel)}: </span>
          <span className="num">{t(CAFE.rating)}</span>
          <span className="num">{num(CAFE.ratingsCount, lang)}</span> {t(UI.ratingsSuffix)}
        </p>
      </div>

      <div className="wrap room__gallery">
        {ROOM_PHOTOS.map((p, i) => (
          <m.figure
            key={p.src}
            className={`room__photo room__photo--${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            <img
              src={p.src}
              srcSet={srcSet(p)}
              sizes="(min-width: 900px) 30vw, 46vw"
              alt={t(p.alt)}
              width={p.width}
              height={p.height}
              loading="lazy"
              decoding="async"
            />
          </m.figure>
        ))}
      </div>

      <div className="wrap room__praise">
        <h3 className="room__praise-lead">{t(UI.praiseLead)}</h3>
        <ul className="praise__list" role="list">
          {PRAISE.map((p, i) => (
            <PraiseBar key={p.label.ru} label={t(p.label)} pct={p.pct} count={p.count} index={i} />
          ))}
        </ul>
        <p className="room__praise-note">
          <a href={CAFE.yandexReviewsUrl} target="_blank" rel="noopener noreferrer">
            {t(UI.reviewsCta)}: {reviews(CAFE.reviewsCount, lang)}
            <ArrowGlyph />
          </a>
        </p>
      </div>
    </section>
  )
}
