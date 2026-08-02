import { MotionConfig } from 'motion/react'
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
    </LangProvider>
  )
}
