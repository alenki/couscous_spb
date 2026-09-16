import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { LangProvider, useLang } from './lang'
import { UI } from './data'
import { useSmoothScroll } from './useSmoothScroll'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Room } from './components/Room'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#menu">
      {t(UI.skip)}
    </a>
  )
}

export default function App() {
  useSmoothScroll()
  return (
    <LangProvider>
      {/* LazyMotion + m.* вместо motion.*: в бандл попадает только domAnimation (~-60 КБ) */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <Header />
          <main>
            <Hero />
            <Menu />
            <Room />
            <Visit />
          </main>
          <Footer />
        </MotionConfig>
      </LazyMotion>
    </LangProvider>
  )
}
