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
          <span className="footer__word font-display">COUSCOUS</span>
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
          <p>{t(UI.footerData)}</p>
        </div>
      </div>
    </footer>
  )
}
