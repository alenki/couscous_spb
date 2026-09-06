/**
 * ЕДИНСТВЕННЫЙ источник фактов о кафе.
 *
 * «Касба» — ВЫМЫШЛЕННЫЙ бренд. Всё, что могло бы указать на конкретное
 * заведение, выдумано вместе с ним: адреса, телефоны, рейтинги и число оценок,
 * ссылки на карты и соцсети. Улиц Звонарёва, Лоскутной и Стеклярусного переулка
 * в Петербурге нет; у телефонов несуществующий индекс 000 — дозвониться по ним
 * нельзя. Совпадения с реальными заведениями непреднамеренны.
 *
 * Настоящие здесь только город, станции метро, часы работы, состав меню и
 * цены — ничто из этого не идентифицирует конкретный бизнес.
 *
 * Английская сторона — только перевод русской, никогда не новые факты.
 * JSON-LD в index.html держать в согласии с этим файлом: адреса, телефоны и
 * aggregateRating продублированы там.
 *
 * Если сайт пойдёт в продакшен под настоящим брендом — блоки aggregateRating
 * либо заполнить подтверждёнными числами, либо убрать: размечать
 * несуществующие отзывы через schema.org нельзя.
 */

export type L<T = string> = { ru: T; en: T }

export type FlagKind =
  | 'ru' | 'dz' | 'fr' | 'jo' | 'va'
  | 'pomegranate' | 'leaf' | 'moustache' | null

export interface Dish {
  name: L
  weight: L
  price: number
  flag: FlagKind
  /** Состав есть только у трёх блюд — так задумано в макете, см. data.test.ts. */
  desc?: L
}

export interface DishGroup {
  title: L
  dishes: Dish[]
}

/** Меню точки на Лоскутной, 15. На двух других точках меню и цены отличаются. */
export const MENU: DishGroup[] = [
  {
    title: { ru: 'Шаурма', en: 'Shawarma' },
    dishes: [
      {
        name: { ru: 'Питерская (классическая)', en: 'Petersburg (classic)' },
        weight: { ru: '350 г', en: '350 g' },
        price: 290,
        flag: 'ru',
        desc: {
          ru: 'лаваш · курица · огурцы · томаты · салат · соус',
          en: 'lavash · chicken · cucumbers · tomatoes · lettuce · sauce',
        },
      },
      {
        name: { ru: 'Алжирская', en: 'Algerian' },
        weight: { ru: '400 г', en: '400 g' },
        price: 340,
        flag: 'dz',
        desc: {
          ru: 'лаваш · курица гриль · картофель фри · гауда · айсберг · томаты · алжирский соус',
          en: 'lavash · grilled chicken · fries · gouda · iceberg · tomatoes · Algerian sauce',
        },
      },
      {
        name: { ru: 'Французская', en: 'French' },
        weight: { ru: '350 г', en: '350 g' },
        price: 340,
        flag: 'fr',
      },
      {
        name: { ru: '«Гранат»', en: '“Pomegranate”' },
        weight: { ru: '320 г', en: '320 g' },
        price: 340,
        flag: 'pomegranate',
      },
      {
        name: { ru: 'Иорданская', en: 'Jordanian' },
        weight: { ru: '350 г', en: '350 g' },
        price: 410,
        flag: 'jo',
      },
      {
        name: { ru: 'Ватиканская', en: 'Vatican' },
        weight: { ru: '350 г', en: '350 g' },
        price: 380,
        flag: 'va',
      },
      {
        name: { ru: 'Такос куриный', en: 'Chicken tacos' },
        weight: { ru: '350 г', en: '350 g' },
        price: 380,
        flag: null,
      },
      {
        name: { ru: 'Такос MIX', en: 'Tacos MIX' },
        weight: { ru: '350 г', en: '350 g' },
        price: 400,
        flag: null,
      },
    ],
  },
  {
    title: { ru: 'Тарелки', en: 'Plates' },
    dishes: [
      {
        name: { ru: 'Алжирская тарелка', en: 'Algerian plate' },
        weight: { ru: '400 г', en: '400 g' },
        price: 550,
        flag: 'dz',
      },
      {
        name: { ru: 'Иорданская тарелка', en: 'Jordanian plate' },
        weight: { ru: '400 г', en: '400 g' },
        price: 580,
        flag: 'jo',
      },
      {
        name: { ru: 'Шаурма на тарелке', en: 'Shawarma on a plate' },
        weight: { ru: '400 г', en: '400 g' },
        price: 450,
        flag: null,
      },
    ],
  },
  {
    title: { ru: 'Без мяса', en: 'Meat-free' },
    dishes: [
      {
        name: { ru: 'Шаурма овощная', en: 'Veggie shawarma' },
        weight: { ru: '300 г', en: '300 g' },
        price: 290,
        flag: 'leaf',
        desc: {
          ru: 'лаваш · томаты · огурцы · салат · хумус · соус · фри',
          en: 'lavash · tomatoes · cucumbers · lettuce · hummus · sauce · fries',
        },
      },
      {
        name: { ru: 'Фалафель «Усатого»', en: 'Falafel “Usatogo”' },
        weight: { ru: '450 г', en: '450 g' },
        price: 430,
        flag: 'moustache',
      },
    ],
  },
]

/** Напитки видны на меловом табло в зале (фото профиля); цен на доске нет. */
export const DRINKS: L<string[]> = {
  ru: ['эспрессо', 'американо', 'капучино', 'латте', 'какао', 'чай в ассортименте'],
  en: ['espresso', 'americano', 'cappuccino', 'latte', 'cocoa', 'assorted tea'],
}

export const DRINKS_NOTE: L = {
  ru: 'напитки и десерты — от 120 ₽',
  en: 'drinks and desserts — from 120 ₽',
}

export const MENU_SOURCE_NOTE: L = {
  ru:
    'Меню и цены — точка на Лоскутной, 15. ' +
    'На Звонарёва, 19/8 и в Стеклярусном, 3 меню и цены отличаются.',
  en:
    'Menu and prices — Loskutnaya St., 15. ' +
    'At Zvonaryova St., 19/8 and Steklyarusny Lane, 3 the menu and prices differ.',
}

/**
 * Общий рейтинг двух старших точек: локализуем только запятую/точку.
 * У точки в Стеклярусном рейтинг свой — 4,7, он задан прямо в её карточке.
 */
export const RATING: L = { ru: '4,8', en: '4.8' }

export interface Branch {
  terminal: L
  area: L
  address: L
  addressNote?: L
  metro?: L
  phone: string
  phoneHref: string
  hours: string
  rating: L
  ratingsCount: L
  yandexUrl: string
}

export const BRANCHES: Branch[] = [
  {
    terminal: { ru: 'Терминал 1', en: 'Terminal 1' },
    area: { ru: 'Петроградская сторона', en: 'Petrogradskaya side' },
    address: { ru: 'ул. Звонарёва, 19/8', en: 'Zvonaryova St., 19/8' },
    addressNote: { ru: 'угол Звонарёвского переулка', en: 'corner of Zvonaryovsky lane' },
    phone: '+7 812 000-19-08',
    phoneHref: 'tel:+78120001908',
    hours: '07:00–00:00',
    rating: RATING,
    ratingsCount: { ru: '1 284 оценки', en: '1,284 ratings' },
    yandexUrl: 'https://yandex.ru/maps/org/casbah/10000000001/',
  },
  {
    terminal: { ru: 'Терминал 2', en: 'Terminal 2' },
    area: { ru: 'Центр', en: 'City centre' },
    address: { ru: 'Лоскутная ул., 15', en: 'Loskutnaya St., 15' },
    addressNote: { ru: 'цокольный этаж', en: 'basement level' },
    metro: {
      ru: 'м. Звенигородская · Лиговский проспект · Владимирская',
      en: 'Metro: Zvenigorodskaya · Ligovsky Prospekt · Vladimirskaya',
    },
    phone: '+7 812 000-24-51',
    phoneHref: 'tel:+78120002451',
    hours: '11:00–23:00',
    rating: RATING,
    ratingsCount: { ru: '396 оценок', en: '396 ratings' },
    yandexUrl: 'https://yandex.ru/maps/org/casbah/10000000002/',
  },
  {
    terminal: { ru: 'Терминал 3', en: 'Terminal 3' },
    area: { ru: 'Центр', en: 'City centre' },
    address: { ru: 'Стеклярусный пер., 3', en: 'Steklyarusny Lane, 3' },
    addressNote: { ru: '1 этаж, вход с улицы', en: 'ground floor, street entrance' },
    metro: {
      ru: 'м. Площадь Восстания · Маяковская · Владимирская',
      en: 'Metro: Ploshchad Vosstaniya · Mayakovskaya · Vladimirskaya',
    },
    phone: '+7 812 000-38-06',
    phoneHref: 'tel:+78120003806',
    hours: '11:00–23:00',
    rating: { ru: '4,7', en: '4.7' },
    ratingsCount: { ru: '87 оценок', en: '87 ratings' },
    yandexUrl: 'https://yandex.ru/maps/org/casbah/10000000003/',
  },
]

export const BRANCHES_SOURCE_NOTE: L = {
  ru: 'Часы и оценки — сентябрь 2026.',
  en: 'Hours and ratings — September 2026.',
}

/** Проценты — отзывы точки на Лоскутной. Как и рейтинги, выдуманы. */
export const REVIEW_STATS: { label: L; pct: number }[] = [
  { label: { ru: 'персонал', en: 'staff' }, pct: 91 },
  { label: { ru: 'атмосфера', en: 'atmosphere' }, pct: 96 },
  { label: { ru: 'кухня', en: 'food' }, pct: 88 },
]

export const REVIEW_STATS_NOTE: L = {
  ru: 'по 248 отзывам гостей (Лоскутная, 15)',
  en: 'across 248 guest reviews (Loskutnaya St., 15)',
}

export const SOCIAL = [
  { label: 'Telegram', handle: '@casbahdz', url: 'https://t.me/casbahdz' },
  { label: 'Instagram', handle: '@cafe_casbah', url: 'https://www.instagram.com/cafe_casbah/' },
] as const

export const AWARD: L = { ru: 'Выбор гостей 2026', en: "Guests' choice 2026" }

/** Города-направления = реальные названия шаурмы в меню. */
export const DESTINATIONS: L<string[]> = {
  ru: ['АЛЖИР', 'ПАРИЖ', 'АММАН', 'ВАТИКАН', 'ПЕТЕРБУРГ'],
  en: ['ALGERIA', 'PARIS', 'AMMAN', 'VATICAN', 'PETERSBURG'],
}

/** Все строки интерфейса. */
export const UI = {
  brand: { ru: 'CASBAH', en: 'CASBAH' },
  brandSub: { ru: 'ALGERIAN KITCHEN', en: 'ALGERIAN KITCHEN' },
  navMenu: { ru: 'Меню', en: 'Menu' },
  navBranches: { ru: 'Адреса', en: 'Find us' },
  langSwitch: { ru: 'Switch to English', en: 'Переключить на русский' },
  skip: { ru: 'Перейти к меню', en: 'Skip to menu' },

  /* Одна строка: на десктопе заголовок растягивается на всю ширину полосы
     (см. --title-fit в styles.css — коэффициенты пересчитывать при правке текста). */
  heroTitle: { ru: 'Ваш билет в мир кухни', en: 'Your ticket to the world of cuisine' },
  departureLabel: { ru: 'отправление', en: 'departure' },
  destinationLabel: { ru: 'направление', en: 'destination' },
  fromCity: { ru: 'САНКТ-ПЕТЕРБУРГ', en: 'SAINT PETERSBURG' },
  ctaMenu: { ru: 'Меню', en: 'Menu' },
  ctaRoute: { ru: 'Как добраться', en: 'How to find us' },
  boardingHint: { ru: 'листайте вниз — посадка началась', en: 'scroll down — now boarding' },

  menuTitle: { ru: 'Меню', en: 'Menu' },
  drinksTitle: { ru: 'Напитки', en: 'Drinks' },

  atmoTitle: { ru: 'Атмосфера', en: 'The room' },
  atmoText: {
    ru:
      'Маленькое алжирское кафе в Петербурге: шаурма, тарелки и фалафель — всё халяль. ' +
      'Внутри — дерево, гирлянды из флажков, лампы, мандала под потолком и меловое меню с сердечками.',
    en:
      'A small Algerian cafe in Petersburg: shawarma, plates and falafel — everything halal. ' +
      'Inside: wood, bunting, glowing bulbs, a mandala on the ceiling and a chalk menu covered in hearts.',
  },
  photoAltCounter: {
    ru: 'Стойка кафе: деревянные панели, меловое меню с сердечками, гирлянда из флажков',
    en: 'The counter: wood panelling, a chalk menu with hearts, a string of bunting',
  },
  photoAltHall: {
    ru: 'Зал: голубой потолок с мандалой, лампы Эдисона, деревянные столы',
    en: 'The hall: sky-blue ceiling with a mandala, Edison bulbs, wooden tables',
  },
  reviewsLead: { ru: 'Что хвалят в отзывах', en: 'What the reviews praise' },

  branchesTitle: { ru: 'Куда прибыть', en: 'Where to arrive' },
  daily: { ru: 'ежедневно', en: 'daily' },
  ratingLabel: { ru: 'Рейтинг', en: 'Rating' },
  routeCta: { ru: 'Маршрут в Яндекс Картах', en: 'Route in Yandex Maps' },

  footerSub: {
    ru: 'ALGERIAN KITCHEN · САНКТ-ПЕТЕРБУРГ',
    en: 'ALGERIAN KITCHEN · SAINT PETERSBURG',
  },
  /* Без времени: точки открываются по-разному (07:00 на Звонарёва, 11:00 на двух других). */
  footerFine: {
    ru: 'Билет действителен ежедневно',
    en: 'Ticket valid daily',
  },
  /* Подпись разработчика. Слово «Lumako» — часть вёрстки, не переводится. */
  madeBy: { ru: 'Сделано в', en: 'Made by' },
} satisfies Record<string, L>
