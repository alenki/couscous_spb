import { SOCIAL } from '../data'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <img
          className="footer-logo"
          src="/logo-crop.png"
          alt=""
          width="72"
          height="72"
          loading="lazy"
        />
        <p className="footer-brand">
          Couscous <span>· Algerian Kitchen</span>
        </p>
        <p className="footer-tag">ваш билет в мир кухни</p>

        <nav className="footer-social" aria-label="Мы на связи">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
              <b>{s.label}</b> {s.handle}
            </a>
          ))}
        </nav>

        <p className="footer-fine">билет действителен ежедневно с 11:00 · халяль · санкт-петербург</p>
        <p className="footer-fine">
          цены могут меняться — актуальное меню уточняйте в кафе. фото — из профиля кафе на яндекс
          картах.
        </p>
      </div>
    </footer>
  )
}
