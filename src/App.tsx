import { MotionConfig } from 'motion/react'
import { LangProvider } from './lang'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Tear } from './components/Tear'
import { Menu } from './components/Menu'

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <Header />
        <main>
          <Hero />
          <Tear />
          <Menu />
        </main>
      </MotionConfig>
    </LangProvider>
  )
}
