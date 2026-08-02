import { MotionConfig } from 'motion/react'
import { LangProvider } from './lang'
import { Header } from './components/Header'
import { Hero } from './components/Hero'

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <Header />
        <main>
          <Hero />
          <section id="menu" className="act-board" style={{ minHeight: '60vh' }} />
        </main>
      </MotionConfig>
    </LangProvider>
  )
}
