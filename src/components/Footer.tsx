import { useLang } from '../lang'
import { SOCIAL, UI } from '../data'
import { KingMark } from './ornaments/engraved'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <KingMark size={52} />
          <span className="footer__word font-display">CASBAH</span>
          <span className="footer__sub font-mono">{t(UI.footerSub)}</span>
        </div>
        <ul className="footer__social font-mono">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label} <span className="footer__handle">{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="footer__fine font-mono">
          <p>{t(UI.footerFine)}</p>
        </div>
        <p className="footer__made font-mono">
          {t(UI.madeBy)}{' '}
          <a className="lumako" href="https://lumako.ru" target="_blank" rel="noopener noreferrer">
            Lumako<span className="lumako__dot" aria-hidden="true">.</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
