import { useLang } from '../lang'
import { CAFE, SOCIAL, UI } from '../data'
import { ArchMark } from './ornaments/damascene'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="footer__brand" href="#top">
          <ArchMark size={54} />
          <span className="footer__word">{CAFE.wordmark}</span>
          <span className="footer__sub">{t(UI.footerSub)}</span>
        </a>

        <ul className="footer__social" role="list">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
                {s.handle && <span className="footer__handle num"> {s.handle}</span>}
              </a>
            </li>
          ))}
          <li>
            <a href={CAFE.phoneHref} className="num">
              {CAFE.phone}
            </a>
          </li>
        </ul>

        <p className="footer__fine">
          {t(UI.daily)} <span className="num">{CAFE.hours.text}</span> · {t(CAFE.street)}
        </p>

        <p className="footer__made">
          {t(UI.madeBy)}{' '}
          <a className="lumako" href="https://lumako.ru" target="_blank" rel="noopener noreferrer">
            Lumako
            <span className="lumako__dot" aria-hidden="true">
              .
            </span>
          </a>
        </p>
      </div>
    </footer>
  )
}
