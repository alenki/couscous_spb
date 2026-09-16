/* Prata задана вручную в styles.css и предзагружена из /fonts: это шрифт
   заголовка первого экрана, то есть LCP-элемента страницы.

   Montserrat — только 400 и 600. Промежуточных начертаний на сайте нет, а
   каждая лишняя пара подсетов это ещё ~30 КБ. Подсеты cyrillic и latin
   оставлены оба: @fontsource раздаёт их с unicode-range, и браузер качает
   только тот, который реально понадобился набору.

   Арабские Amiri и Cairo здесь намеренно отсутствуют — их подтягивает
   lang.tsx динамическим import() при переключении на арабский. */
import '@fontsource/montserrat/cyrillic-400.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/cyrillic-600.css'
import '@fontsource/montserrat/latin-600.css'
import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
