import { m } from 'motion/react'
import { useLang } from '../lang'
import { DESTINATIONS, UI } from '../data'
import { SplitFlap } from './SplitFlap'
import { SkylineFrieze, TicketStub } from './ornaments/engraved'

const rise = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/* Тот же подъём, но без прозрачности. Заголовок — LCP-элемент страницы, а Chrome
   не засчитывает кандидата, пока он на opacity 0: выцветание отодвигало LCP на
   ~0,8 с (замер на Pixel 7, 390×844, Slow-4G + 4× CPU: 2179 мс против 1202 мс).
   Сдвиг по Y на LCP не влияет — движение сохраняем, прозрачность убираем. */
const riseOpaque = {
  hidden: { y: 26 },
  shown: { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/** Пунктирный маршрут между городами — тянется на всю свободную ширину полосы. */
function RouteLeader() {
  return (
    <span className="hero__route" aria-hidden="true">
      <span className="hero__route-dots" />
      <svg width="14" height="12" viewBox="0 0 14 12">
        <path
          d="M0 6 H12 M7.5 1.5 L13 6 L7.5 10.5"
          fill="none"
          stroke="var(--sepia)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function Hero() {
  const { lang, t } = useLang()
  return (
    <section className="hero act-parchment grain" id="top">
      <m.div
        className="wrap hero__inner"
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
      >
        <m.h1 className="hero__title" variants={riseOpaque}>
          {t(UI.heroTitle)}
        </m.h1>

        {/* Сетка в две строки: подписи стоят на одной линии, города — на одной
            базовой. Порядок в разметке — читательский (подпись → значение), а не
            «сначала обе подписи»: на телефоне сетка перекладывает поля в столбик,
            и прежний порядок давал скринридеру «отправление, направление,
            САНКТ-ПЕТЕРБУРГ, АЛЖИР» — вторая подпись отрывалась от своего города.
            Каждый элемент имеет свою grid-area, поэтому раскладка не изменилась. */}
        <m.div className="hero__board" variants={rise}>
          <span className="hero__board-label hero__board-label--from font-mono">
            {t(UI.departureLabel)}
          </span>
          <span className="hero__board-city font-mono">{t(UI.fromCity)}</span>
          <RouteLeader />
          <span className="hero__board-label hero__board-label--to font-mono">
            {t(UI.destinationLabel)}
          </span>
          <span className="hero__board-flap">
            <SplitFlap words={DESTINATIONS[lang]} />
          </span>
        </m.div>

        <m.div
          className="hero__foot"
          variants={{ shown: { transition: { staggerChildren: 0.45 } } }}
        >
          <m.div className="hero__ctas" variants={rise}>
            <TicketStub href="#menu" primary>
              {t(UI.ctaMenu)}
            </TicketStub>
            <TicketStub href="#branches">{t(UI.ctaRoute)}</TicketStub>
          </m.div>

          <m.p className="hero__hint font-mono" variants={rise}>
            ↓ {t(UI.boardingHint)}
          </m.p>
        </m.div>
      </m.div>

      <div className="hero__frieze frieze--animate">
        <SkylineFrieze />
      </div>
    </section>
  )
}
