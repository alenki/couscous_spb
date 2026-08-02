import { MotionConfig } from 'motion/react'
import { Hero } from './components/Hero'
import { Board } from './components/Board'
import { Atmosphere } from './components/Atmosphere'
import { Terminals } from './components/Terminals'
import { Footer } from './components/Footer'
import { Perforation } from './components/ornaments'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#tablo">
        К меню
      </a>
      <Hero />
      <Perforation topColor="var(--parch)" bottomColor="var(--board)" />
      <main>
        <Board />
        <Perforation topColor="var(--board)" bottomColor="var(--parch)" />
        <Atmosphere />
        <Perforation topColor="var(--parch)" bottomColor="var(--ink-2)" />
        <Terminals />
      </main>
      <Footer />
    </MotionConfig>
  )
}
