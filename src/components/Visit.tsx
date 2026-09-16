import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, SOCIAL, UI } from '../data'
import { useOpenNow, hhmm } from '../useOpenNow'
import { ArrowGlyph, ClockGlyph, PhoneGlyph, PinGlyph, Star8 } from './ornaments/damascene'

function Row({ children, glyph }: { children: React.ReactNode; glyph: React.ReactNode }) {
  return (
    <div className="visit__row">
      <span className="visit__glyph" aria-hidden="true">
        {glyph}
      </span>
      <span className="visit__rowbody">{children}</span>
    </div>
  )
}

export function Visit() {
  const { t } = useLang()
  const open = useOpenNow()

  return (
    <section className="visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit__head">
        <h2 className="section-title" id="visit-title">
          {t(UI.visitTitle)}
        </h2>
        <p className="section-lead">{t(UI.visitLead)}</p>
      </div>

      <div className="wrap">
        <m.div
          className="visit__card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="visit__main">
            <p className="visit__label">{t(UI.addressLabel)}</p>
            <p className="visit__address">{t(CAFE.street)}</p>
            <p className="visit__note">
              {t(CAFE.city)} · {t(CAFE.floor)} · <span className="num">{CAFE.postcode}</span>
            </p>

            <ul className="visit__metro" role="list">
              {CAFE.metro.map((stop) => (
                <li key={stop.station.ru}>
                  <span
                    className="visit__dot"
                    style={{ background: stop.line }}
                    aria-hidden="true"
                  />
                  <span className="visit__kind">
                    {t(stop.kind === 'metro' ? UI.metroKind : UI.stopKind)}
                  </span>
                  {t(stop.station)}{' '}
                  <span className="visit__walk">
                    · <span className="num">{t(stop.walk)}</span> {t(UI.walkTo)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="visit__rows">
            <Row glyph={<ClockGlyph />}>
              <span className="visit__label">{t(UI.hoursLabel)}</span>
              <span>
                {t(UI.daily)} <span className="num">{CAFE.hours.text}</span>
              </span>
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
            </Row>

            <Row glyph={<PhoneGlyph />}>
              <span className="visit__label">{t(UI.phoneLabel)}</span>
              <a className="visit__link num" href={CAFE.phoneHref}>
                {CAFE.phone}
              </a>
              <span className="visit__social">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </span>
            </Row>

            <Row glyph={<PinGlyph />}>
              <a
                className="btn btn--primary visit__route"
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
            </Row>
          </div>

          <Star8 size={22} className="visit__seal" />
        </m.div>
      </div>
    </section>
  )
}
