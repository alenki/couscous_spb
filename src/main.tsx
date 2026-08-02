import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/oranienbaum'
import '@fontsource/pt-serif'
import '@fontsource/pt-serif/700.css'
import '@fontsource/pt-serif/400-italic.css'
import '@fontsource/pt-mono'
import '@fontsource/neucha'
import './styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
