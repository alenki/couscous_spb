import { m } from 'motion/react'
import { useLang } from '../lang'
import { AWARD, BRANCHES, BRANCHES_SOURCE_NOTE, UI, type Branch } from '../data'
import { Stamp } from './ornaments/engraved'

function ClockGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4 V7 L9.2 8.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function PhoneGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3.2 1.8 L5 1.2 L6.2 3.8 L4.9 5 C 5.4 6.6 7.4 8.6 9 9.1 L10.2 7.8 L12.8 9 L12.2 10.8 C 11.8 12 10.4 12.6 9.2 12.2 C 5.8 11 3 8.2 1.8 4.8 C 1.4 3.6 2 2.2 3.2 1.8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 1.4 L8.75 5.2 L12.8 5.7 L9.8 8.5 L10.6 12.6 L7 10.55 L3.4 12.6 L4.2 8.5 L1.2 5.7 L5.25 5.2 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Билеты лежат врассыпную: свой наклон на карточку и на штамп. */
const TILT = [-1.2, 1.2, -0.8]
const STAMP_TILT = [-8, 6, -5]

function Pass({ branch, index }: { branch: Branch; index: number }) {
  const { t } = useLang()
  const tilt = TILT[index % TILT.length]
  return (
    <m.article
      className="pass"
      initial={{ opacity: 0, y: 22, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt / 2 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <div className="pass__main">
        <p className="pass__terminal font-mono">
          {t(branch.terminal)} · {t(branch.area)}
        </p>
        <h3 className="pass__address font-display">{t(branch.address)}</h3>
        {branch.addressNote && <p className="pass__note">{t(branch.addressNote)}</p>}
        {branch.metro && <p className="pass__metro font-mono">{t(branch.metro)}</p>}
        <div className="pass__rows font-mono">
          <span className="pass__row">
            <ClockGlyph />
            {t(UI.daily)} {branch.hours}
          </span>
          <a className="pass__row pass__tel" href={branch.phoneHref}>
            <PhoneGlyph />
            <span>{branch.phone}</span>
          </a>
          <span className="pass__row">
            <StarGlyph />
            <span className="visually-hidden">{t(UI.ratingLabel)}: </span>
            {t(branch.rating)} · {t(branch.ratingsCount)}
          </span>
        </div>
        <a className="pass__route font-mono" href={branch.yandexUrl} target="_blank" rel="noopener noreferrer">
          <span>{t(UI.routeCta)}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="pass__stub">
        <Stamp tone="red" rotate={STAMP_TILT[index % STAMP_TILT.length]} className="pass__award">
          {t(AWARD)}
        </Stamp>
      </div>
    </m.article>
  )
}

export function Branches() {
  const { t } = useLang()
  return (
    <section id="branches" className="branches act-board">
      <div className="wrap">
        <m.h2
          className="branches__title font-chalk"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t(UI.branchesTitle)}
        </m.h2>
        <div className="branches__grid">
          {BRANCHES.map((b, i) => (
            <Pass key={b.address.ru} branch={b} index={i} />
          ))}
        </div>
        <p className="branches__note font-mono">{t(BRANCHES_SOURCE_NOTE)}</p>
      </div>
    </section>
  )
}
