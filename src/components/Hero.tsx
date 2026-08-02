import { motion } from 'motion/react'
import { useLang } from '../lang'
import { AWARD, DESTINATIONS, TOTAL_RATINGS, UI } from '../data'
import { SplitFlap } from './SplitFlap'
import { SkylineFrieze, Stamp, TicketStub, ZelligeCorner } from './ornaments/engraved'

const rise = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

function HeroStamps({ className }: { className: string }) {
  const { t } = useLang()
  const stamps = [
    { tone: 'red' as const, rotate: -12, body: <>{t(UI.stampHalal)}</> },
    {
      tone: 'sepia' as const,
      rotate: 5,
      body: (
        <>
          5,0★
          <br />
          {t(TOTAL_RATINGS)}
        </>
      ),
    },
    { tone: 'red' as const, rotate: -5, body: <>{t(AWARD)}</> },
  ]
  return (
    <div className={className} aria-hidden="true">
      {stamps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1.6, opacity: 0, rotate: s.rotate - 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 1.15 + i * 0.18 }}
        >
          <Stamp tone={s.tone} rotate={s.rotate}>
            {s.body}
          </Stamp>
        </motion.div>
      ))}
    </div>
  )
}

export function Hero() {
  const { lang, t } = useLang()
  return (
    <section className="hero act-parchment grain" id="top">
      <div className="hero__corners" aria-hidden="true">
        <span className="hero__corner hero__corner--tl"><ZelligeCorner /></span>
        <span className="hero__corner hero__corner--tr"><ZelligeCorner flip="x" /></span>
        <span className="hero__corner hero__corner--bl"><ZelligeCorner flip="y" /></span>
        <span className="hero__corner hero__corner--br"><ZelligeCorner flip="xy" /></span>
      </div>

      <motion.div
        className="wrap hero__inner"
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
      >
        <motion.p className="hero__ribbon font-mono" variants={rise}>
          {t(UI.ribbon)}
        </motion.p>

        <motion.h1 className="hero__title" variants={rise}>
          <span className="hero__title-a">{t(UI.heroTitleA)}</span>
          <span className="hero__title-b">{t(UI.heroTitleB)}</span>
        </motion.h1>

        <motion.div className="hero__board" variants={rise}>
          <div className="hero__board-col">
            <span className="hero__board-label font-mono">{t(UI.departureLabel)}</span>
            <span className="hero__board-city font-mono">{t(UI.fromCity)}</span>
          </div>
          <svg className="hero__board-arrow" width="42" height="14" viewBox="0 0 42 14" aria-hidden="true">
            <path
              d="M2 7 H36 M29 2 L37 7 L29 12"
              fill="none"
              stroke="var(--sepia)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="hero__board-col">
            <span className="hero__board-label font-mono">{t(UI.destinationLabel)}</span>
            <span className="hero__board-flap">
              <SplitFlap words={DESTINATIONS[lang]} />
            </span>
          </div>
        </motion.div>

        <motion.div className="hero__ctas" variants={rise}>
          <TicketStub href="#menu" primary>
            {t(UI.ctaMenu)}
          </TicketStub>
          <TicketStub href="#branches">{t(UI.ctaRoute)}</TicketStub>
        </motion.div>

        <HeroStamps className="hero__stamps hero__stamps--inline" />

        <motion.p className="hero__hint font-mono" variants={rise} transition={{ delay: 1.8 }}>
          ↓ {t(UI.boardingHint)}
        </motion.p>
      </motion.div>

      <HeroStamps className="hero__stamps hero__stamps--side" />

      <div className="hero__frieze frieze--animate">
        <SkylineFrieze />
      </div>
    </section>
  )
}
