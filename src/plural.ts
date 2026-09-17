import type { Lang } from './data'

/**
 * «453 отзыва», но «255 отзывов» и «37 отзывов».
 *
 * Русский различает три формы, арабский шесть, английский две. Свои
 * правила не пишем: `Intl.PluralRules` знает их для всех трёх языков, нам
 * остаётся держать таблицу слов. Формы, которых в наших числах не бывает
 * (арабские zero/one/two), всё равно заполнены, иначе однажды всплывёт
 * `undefined` на числе, о котором никто не подумал.
 */
type Forms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

const RULES: Record<Lang, Intl.PluralRules> = {
  ru: new Intl.PluralRules('ru'),
  en: new Intl.PluralRules('en'),
  ar: new Intl.PluralRules('ar'),
}

const REVIEWS: Record<Lang, Forms> = {
  ru: { one: 'отзыв', few: 'отзыва', many: 'отзывов', other: 'отзыва' },
  en: { one: 'review', other: 'reviews' },
  ar: {
    zero: 'مراجعة',
    one: 'مراجعة',
    two: 'مراجعتان',
    few: 'مراجعات',
    many: 'مراجعة',
    other: 'مراجعة',
  },
}

/**
 * «6 минут», но «1 минута» и «22 минуты». Время пешком считается из метров,
 * поэтому число заранее не известно и таблицу форм приходится держать целиком.
 */
const MINUTES: Record<Lang, Forms> = {
  ru: { one: 'минута', few: 'минуты', many: 'минут', other: 'минуты' },
  en: { one: 'minute', other: 'minutes' },
  ar: {
    zero: 'دقيقة',
    one: 'دقيقة',
    two: 'دقيقتان',
    few: 'دقائق',
    many: 'دقيقة',
    other: 'دقيقة',
  },
}

/** Неразрывный пробел является единственным разделителем, который мы выпускаем наружу. */
const NBSP = ' '

/**
 * Число с неразрывными разделителями групп: «1 010», а не «1,010».
 *
 * Класс символов широкий не от лени: ru-RU уже отдаёт U+00A0, en и ar отдают
 * запятую, а следующая версия ICU вполне может отдать узкий U+202F. Приводим
 * всё к одному неразрывному пробелу, чтобы «1 010 оценок» никогда не
 * переносилось по разрыву внутри числа.
 */
export function num(n: number, lang: Lang): string {
  return n
    .toLocaleString(lang === 'ar' ? 'ar-EG-u-nu-latn' : lang)
    .replace(/[\s  ,]/g, NBSP)
}

/** Число и слово тоже склеены неразрывным: «557 отзывов» не рвётся по строкам. */
function join(n: number, lang: Lang, forms: Forms): string {
  return `${num(n, lang)}${NBSP}${forms[RULES[lang].select(n)] ?? forms.other}`
}

export function reviews(n: number, lang: Lang): string {
  return join(n, lang, REVIEWS[lang])
}

/**
 * Время пешком по расстоянию. 75 м/мин это спокойный городской шаг: по нему
 * 460 м до Горьковской дают те же шесть минут, что и карточка Яндекса.
 */
export function walkMinutes(meters: number, lang: Lang): string {
  return join(Math.max(1, Math.round(meters / 75)), lang, MINUTES[lang])
}
