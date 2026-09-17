import { m } from 'motion/react'
import { useLang } from '../lang'
import { CAFE, UI } from '../data'
import { AblaqArch, Qamariyya, ArrowGlyph, DescentGlyph, PinGlyph } from './ornaments/damascene'

const rise = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/* Тот же подъём без прозрачности для заголовка.
   Заголовок первого экрана это LCP-элемент, а Chrome не засчитывает кандидата,
   пока он на opacity 0: выцветание честно отодвигает LCP на длительность
   анимации. Сдвиг по Y на метрику не влияет, поэтому движение остаётся. */
const riseOpaque = {
  hidden: { y: 22 },
  shown: { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="top">
      {/* Кладка зала, вынесенная на фасад: арка из чередующихся клиньев стоит
          фоном за содержимым и вписана в полосу целиком, вместе с опорами. */}
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
            оказывался прижат к краю экрана, в трёх сантиметрах от адреса,
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
          <a className="btn btn-primary" href="#menu">
            {t(UI.ctaMenu)}
            <ArrowGlyph />
          </a>
          <a className="btn" href={CAFE.bookUrl} target="_blank" rel="noopener noreferrer">
            {t(UI.ctaBook)}
          </a>
        </m.div>

      </m.div>

      {/* Подсказка спуска стоит в столбец: подпись, под ней отвес. Строкой
          она повторяла кнопку и спорила с парой призывов над собой; столбцом
          она читается указателем, а не третьим призывом.

          Выезжает последней и уже за пределами stagger-цепочки hero__inner:
          цепочка отмеряет шаг от появления лампы, а подсказке нужно
          дождаться, пока встанут кнопки. */}
      <m.a
        className="hero__descent"
        href="#room"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="hero__descent-label">{t(UI.scrollHint)}</span>
        <DescentGlyph />
      </m.a>

      {/* Часовой для шапки: пока он в кадре, шапка прозрачная. */}
      <span id="top-sentinel" aria-hidden="true" />
    </section>
  )
}
