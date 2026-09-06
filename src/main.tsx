/* Oranienbaum задан вручную в styles.css и предзагружен из /fonts (LCP-заголовок) */
/* Только 400: жирного начертания на сайте нет ни одного — все font-weight в
   styles.css равны 400, тегов <strong>/<b> нет. Пара 700 тянула ~50 КБ woff2
   впустую. Подсеты cyrillic/latin оставлены оба: @fontsource раздаёт их с
   unicode-range, браузер качает только нужный для текущего языка. */
import '@fontsource/pt-serif/cyrillic-400.css'
import '@fontsource/pt-serif/latin-400.css'
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
