import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, UI } from '../data'
import { useOpenNow, hhmm } from '../useOpenNow'
import { num } from '../plural'
import { AblaqArch, Qamariyya, RatingStar, ArrowGlyph, PinGlyph } from './ornaments/damascene'

const rise = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/* Тот же подъём без прозрачности — для заголовка.
   Заголовок первого экрана это LCP-элемент, а Chrome не засчитывает кандидата,
   пока он на opacity 0: выцветание честно отодвигает LCP на длительность
   анимации. Сдвиг по Y на метрику не влияет, поэтому движение остаётся. */
const riseOpaque = {
  hidden: { y: 22 },
  shown: { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/** «Открыто · до 23:30» либо «Закрыто · откроется в 11:00». */
function OpenStatus() {
  const { t } = useLang()
  const open = useOpenNow()
  return (
    <span className={`status${open ? ' is-open' : ''}`}>
      <span className="status__dot" aria-hidden="true" />
      {open ? (
        <>
          {t(UI.openNow)} · {t(UI.openUntil)}{' '}
          <span className="num">{hhmm(CAFE.hours.closeMin)}</span>
        </>
      ) : (
        <>
          {t(UI.closedNow)} · {t(UI.opensAt)}{' '}
          <span className="num">{hhmm(CAFE.hours.openMin)}</span>
        </>
      )}
    </span>
  )
}

export function Hero() {
  const { t, lang } = useLang()

  return (
    <section className="hero" id="top">
      {/* Кладка зала, вынесенная на фасад: арка из чередующихся клиньев стоит
          фоном за содержимым и намеренно обрезается по краям полосы. */}
      <div className="hero__arch" aria-hidden="true">
        <AblaqArch />
      </div>

      <m.div
        className="wrap hero__inner"
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
      >
        <m.div className="hero__lamp" variants={rise}>
          <Qamariyya size={132} lit />
        </m.div>

        {/* Булавка стоит внутри строки, а не отдельным flex-элементом рядом с
            ней: на 390px адрес переносится на две строки, текстовый блок
            забирает всю доступную ширину, и значок в любой раскладке flex
            оказывался прижат к краю экрана — в трёх сантиметрах от адреса,
            который он помечает. Внутри строки он переносится вместе с ней. */}
        <m.p className="hero__eyebrow" variants={rise}>
          <PinGlyph />
          {t(CAFE.street)} · {t(CAFE.floor)}
        </m.p>

        <m.h1 className="hero__title" variants={riseOpaque}>
          {t(UI.heroTitle)}
        </m.h1>

        <m.p className="hero__lead" variants={rise}>
          {t(UI.heroLead)}
        </m.p>

        <m.div className="hero__ctas" variants={rise}>
          <a className="btn btn--primary" href="#menu">
            {t(UI.ctaMenu)}
            <ArrowGlyph />
          </a>
          <a className="btn" href={CAFE.bookUrl} target="_blank" rel="noopener noreferrer">
            {t(UI.ctaBook)}
          </a>
        </m.div>

        <m.ul className="hero__meta" variants={rise} role="list">
          <li>
            <RatingStar />
            <span className="visually-hidden">{t(UI.ratingLabel)}: </span>
            <span className="num">{t(CAFE.rating)}</span>
            <span className="hero__meta-sub">
              {/* Не toLocaleString('ru-RU') вслепую: на английском и арабском
                  разряды остались бы русскими. Формат берём по языку. */}
              <span className="num">{num(CAFE.ratingsCount, lang)}</span> {t(UI.ratingsSuffix)}
            </span>
          </li>
          <li>
            <OpenStatus />
          </li>
          <li>
            <span className="hero__meta-sub">{t(UI.billLabel)}</span>
            <span className="num">{t(CAFE.bill)}</span>
          </li>
        </m.ul>
      </m.div>

      <p className="hero__hint" aria-hidden="true">
        {t(UI.scrollHint)}
      </p>

      {/* Часовой для шапки: пока он в кадре, шапка прозрачная. */}
      <span id="top-sentinel" aria-hidden="true" />
    </section>
  )
}
