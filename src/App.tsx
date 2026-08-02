import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { LangProvider, useLang } from './lang'
import { UI } from './data'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Tear } from './components/Tear'
import { Menu } from './components/Menu'
import { Atmosphere } from './components/Atmosphere'
import { Branches } from './components/Branches'
import { Footer } from './components/Footer'

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link font-mono" href="#menu">
      {t(UI.skip)}
    </a>
  )
}

export default function App() {
  return (
    <LangProvider>
      {/* LazyMotion + m.* вместо motion.*: в бандл попадает только domAnimation (~-60 КБ) */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <Header />
          <main>
            <Hero />
            <Tear />
            <Menu />
            <Atmosphere />
            <Branches />
          </main>
          <Footer />
        </MotionConfig>
      </LazyMotion>
    </LangProvider>
  )
}
