import { motion, useReducedMotion, type Variants } from 'motion/react'
import { SplitFlap } from './SplitFlap'
import { ZelligeCorner, SkylineFrieze, HalalStamp, AwardStamp, RatingStamp } from './ornaments'
import { DESTINATIONS, TOTAL_RATINGS } from '../data'

export function Hero() {
  const reduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  }
  const rise: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] } },
  }
  const stampIn = (delay: number, tilt: number): Variants => ({
    hidden: { opacity: 0, scale: reduced ? 1 : 1.7, rotate: tilt + (reduced ? 0 : 14) },
    show: {
      opacity: 1,
      scale: 1,
      rotate: tilt,
      transition: {
        delay,
        scale: { type: 'spring', stiffness: 340, damping: 17 },
        opacity: { duration: 0.15, delay },
      },
    },
  })

  return (
    <header className="hero" id="top">
      <motion.div className="hero-inner" variants={container} initial="hidden" animate="show">
        <ZelligeCorner />
        <ZelligeCorner flip />
        <motion.nav className="ribbon" variants={rise} aria-label="Разделы страницы">
          <span className="ribbon-brand">Couscous · Algerian Kitchen</span>
          <span className="ribbon-links">
            <a href="#tablo">Табло</a>
            <a href="#atmosphere">Атмосфера</a>
            <a href="#terminals">Адреса</a>
          </span>
        </motion.nav>

        <motion.p className="microprint" variants={rise}>
          билет № кс-2026 · серия спб · мест: 2 · выдан: кропоткина 19/8 · социалистическая 15
        </motion.p>

        <div className="hero-main">
          <div className="hero-title">
            <h1 className="hero-h1">
              <motion.span className="hero-line" variants={rise}>
                Ваш билет
              </motion.span>
              <motion.span className="hero-line" variants={rise}>
                в мир кухни
              </motion.span>
              <motion.span className="hero-line hero-line--brand" variants={rise}>
                Couscous
              </motion.span>
            </h1>

            <motion.div className="hero-flap" variants={rise}>
              <span className="flap-caption">направление</span>
              <SplitFlap words={DESTINATIONS} />
            </motion.div>

            <motion.p className="hero-sub" variants={rise}>
              Алжирская шаурма, тарелки и&nbsp;фалафель&nbsp;— халяль. Петроградская сторона
              и&nbsp;центр города, каждый день с&nbsp;11:00.
            </motion.p>

            <motion.div className="hero-ctas" variants={rise}>
              <a className="stub-btn stub-btn--primary" href="#tablo">
                Смотреть табло
              </a>
              <a className="stub-btn" href="#terminals">
                Как добраться
              </a>
            </motion.div>
          </div>

          <div className="hero-side">
            <motion.img
              variants={rise}
              className="hero-logo"
              src="/logo-crop.png"
              alt="Логотип Couscous: лицо короля-путешественника, наполовину пергамент, наполовину чернила"
              width="176"
              height="176"
            />
            <div className="hero-stamps">
              <motion.span className="stamp-wrap" variants={stampIn(1.0, -9)}>
                <HalalStamp />
              </motion.span>
              <motion.span className="stamp-wrap" variants={stampIn(1.18, 5)}>
                <AwardStamp />
              </motion.span>
              <motion.span className="stamp-wrap" variants={stampIn(1.36, -4)}>
                <RatingStamp ratings={TOTAL_RATINGS} />
              </motion.span>
            </div>
          </div>
        </div>

        <motion.div variants={rise}>
          <SkylineFrieze />
        </motion.div>
      </motion.div>
    </header>
  )
}
