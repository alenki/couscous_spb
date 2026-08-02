import '@fontsource/oranienbaum/cyrillic-400.css'
import '@fontsource/oranienbaum/latin-400.css'
import '@fontsource/pt-serif/cyrillic-400.css'
import '@fontsource/pt-serif/latin-400.css'
import '@fontsource/pt-serif/cyrillic-700.css'
import '@fontsource/pt-serif/latin-700.css'
import '@fontsource/pt-mono/cyrillic-400.css'
import '@fontsource/pt-mono/latin-400.css'
import '@fontsource/neucha/cyrillic-400.css'
import '@fontsource/neucha/latin-400.css'
import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
