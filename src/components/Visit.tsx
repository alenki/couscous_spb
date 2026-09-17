import { useRef, useState, type CSSProperties } from 'react'
import { m, useInView } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, SOCIAL, UI } from '../data'
import { hhmm, useOpenNow } from '../useOpenNow'
import { walkMinutes } from '../plural'
import { ApproachPlan } from './ApproachPlan'
import { ArrowGlyph } from './ornaments/damascene'

/**
 * Акт 4, «Как дойти»: лист с чертежом.
 *
 * Раньше здесь стояла карточка с адресом: всё правда, и ничего, кроме правды.
 * Теперь тот же набор сведений разложен как чертёжный лист: заголовок,
 * адресная пластина, вычерченный план подхода с легендой и внизу штамп с
 * часами, телефоном и двумя кнопками. Это не украшение ради украшения:
 * человек, который ищет вход в цоколь, читает план быстрее, чем абзац.
 *
 * Легенда и план связаны: наведение на строку «метро Горьковская» поднимает
 * на чертеже её узел. Связь сделана только курсором: строки не кнопки, и
 * лишних остановок табуляции на декоративной подсветке быть не должно; всё,
 * что она показывает, в строке уже написано словами.
 */

const rise = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = { shown: { transition: { staggerChildren: 0.1 } } }
const viewport = { once: true, margin: '-60px' } as const

type Kind = (typeof CAFE.metro)[number]['kind']

export function Visit() {
  const { t, lang } = useLang()
  const open = useOpenNow()
  const [hl, setHl] = useState<Kind | null>(null)

  const sheet = useRef<HTMLElement>(null)
  // Раскадровка чертежа висит на CSS-задержках; здесь только спусковой крючок
  const drawn = useInView(sheet, { once: true, amount: 0.12 })

  return (
    <section
      className={`visit${drawn ? ' is-drawn' : ''}`}
      id="visit"
      ref={sheet}
      aria-labelledby="visit-title"
    >
      <m.div
        className="wrap visit__head"
        initial="hidden"
        whileInView="shown"
        viewport={viewport}
        variants={stagger}
      >
        <m.div className="visit__intro" variants={rise}>
          <h2 className="section-title" id="visit-title">
            {t(UI.visitTitle)}
          </h2>
          <p className="section-lead">{t(UI.visitLead)}</p>
        </m.div>

        <m.div className="visit__plaque" variants={rise}>
          <p className="visit__label">{t(UI.addressLabel)}</p>
          <p className="visit__address">{t(CAFE.street)}</p>
          <p className="visit__note">
            {t(CAFE.city)} · {t(CAFE.floor)} · <span className="num">{CAFE.postcode}</span>
          </p>
        </m.div>
      </m.div>

      <m.div
        className="wrap visit__sheet"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ApproachPlan hl={hl} />
      </m.div>

      <m.div
        className="wrap visit__legendrow"
        initial="hidden"
        whileInView="shown"
        viewport={viewport}
        variants={stagger}
      >
        <m.ul className="legend" role="list" variants={rise}>
          {CAFE.metro.map((stop) => (
            <li
              key={stop.station.ru}
              className={`legend__row${hl === stop.kind ? ' is-active' : ''}`}
              onMouseEnter={() => setHl(stop.kind)}
              onMouseLeave={() => setHl(null)}
            >
              <span
                className={`legend__mark legend__mark--${stop.kind}`}
                style={{ '--line': stop.line } as CSSProperties}
                aria-hidden="true"
              >
                {stop.kind === 'metro' ? t(UI.metroMark) : null}
              </span>
              <span className="legend__name">
                <span className="legend__kind">
                  {t(stop.kind === 'metro' ? UI.metroKind : UI.stopKind)}
                </span>
                {t(stop.station)}
              </span>
              <span className="legend__dots" aria-hidden="true" />
              <span className="legend__val">
                <span className="num">{t(stop.walk)}</span>
                {' · ≈ '}
                {walkMinutes(stop.meters, lang)}
              </span>
            </li>
          ))}
        </m.ul>
      </m.div>

      <m.div
        className="wrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="titleblock">
          <div className="titleblock__cell">
            <p className="visit__label">{t(UI.hoursLabel)}</p>
            <div className="hours">
              <div className="hours__body">
                <p className="hours__line">
                  {t(UI.daily)} <span className="num">{CAFE.hours.text}</span>
                </p>
                {/* Текст статуса это один flex-элемент: иначе узкая ячейка рвала
                    строку между словами и временем, оставляя дыру посередине. */}
                <p className={`status${open ? ' is-open' : ''}`}>
                  <span>
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
                </p>
              </div>
            </div>
          </div>

          <div className="titleblock__cell">
            <p className="visit__label">{t(UI.phoneLabel)}</p>
            <a className="visit__link num" href={CAFE.phoneHref}>
              {CAFE.phone}
            </a>
            <p className="visit__social">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </p>
          </div>

          <div className="titleblock__cell titleblock__cell--acts">
            <a
              className="btn btn--gold"
              href={CAFE.yandexUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(UI.routeCta)}
              <ArrowGlyph />
            </a>
            <a className="btn" href={CAFE.bookUrl} target="_blank" rel="noopener noreferrer">
              {t(UI.ctaBook)}
            </a>
          </div>
        </div>
      </m.div>
    </section>
  )
}
