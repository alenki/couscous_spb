/**
 * ЕДИНСТВЕННЫЙ источник фактов о кафе. Русская сторона перенесена дословно из
 * проверенных данных v1 (Яндекс Карты, организации 26524829091 и 203444001790,
 * получено 2026-08-02; флаер бренда; сверка с 2ГИС 2026-08-01).
 * Английская сторона — только перевод русской, никогда не новые факты.
 * Ничего не выдумывать. Непроверенное помечать PLACEHOLDER.
 * JSON-LD в index.html держать в согласии с этим файлом.
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
  /** Состав указывается ТОЛЬКО если он подтверждён (карточки Яндекса, Кропоткина). */
  desc?: L
}

export interface DishGroup {
  title: L
  dishes: Dish[]
}

/** Меню точки на Социалистической, 15 — вкладка «Меню» на Яндекс Картах, 2026-08-02. */
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
    'Меню и цены — точка на Социалистической, 15 (Яндекс Карты, август 2026). ' +
    'На Кропоткина, 19/8 меню и цены немного отличаются.',
  en:
    'Menu and prices — Sotsialisticheskaya 15 (Yandex Maps, August 2026). ' +
    'At Kropotkina 19/8 the menu and prices differ slightly.',
}

/** Единый рейтинг обеих точек (Яндекс): локализуем только запятую/точку. */
export const RATING: L = { ru: '5,0', en: '5.0' }

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
  icon: string
  iconAlt: L
}

export const BRANCHES: Branch[] = [
  {
    terminal: { ru: 'Терминал 1', en: 'Terminal 1' },
    area: { ru: 'Петроградская сторона', en: 'Petrogradskaya side' },
    address: { ru: 'ул. Кропоткина, 19/8', en: '19/8 Kropotkina st.' },
    addressNote: { ru: 'угол Саблинской улицы', en: 'corner of Sablinskaya st.' },
    phone: '+7 996 772-20-26',
    phoneHref: 'tel:+79967722026',
    hours: '11:00–00:00',
    rating: RATING,
    ratingsCount: { ru: '2 011 оценок', en: '2,011 ratings' },
    yandexUrl: 'https://yandex.ru/maps/org/cous_cous/26524829091/',
    icon: '/chalk-pin.png',
    iconAlt: {
      ru: 'Меловой рисунок: оранжевая метка на карте',
      en: 'Chalk drawing: an orange map pin',
    },
  },
  {
    terminal: { ru: 'Терминал 2', en: 'Terminal 2' },
    area: { ru: 'Центр', en: 'City centre' },
    address: { ru: 'Социалистическая ул., 15', en: '15 Sotsialisticheskaya st.' },
    addressNote: { ru: 'цокольный этаж', en: 'basement level' },
    metro: {
      ru: 'м. Звенигородская · Лиговский проспект · Владимирская',
      en: 'Zvenigorodskaya · Ligovsky pr. · Vladimirskaya metro',
    },
    phone: '+7 911 786-30-26',
    phoneHref: 'tel:+79117863026',
    hours: '11:00–23:00',
    rating: RATING,
    ratingsCount: { ru: '639 оценок', en: '639 ratings' },
    yandexUrl: 'https://yandex.ru/maps/org/cous_cous/203444001790/',
    icon: '/chalk-store.png',
    iconAlt: {
      ru: 'Меловой рисунок: лавка с полосатым навесом',
      en: 'Chalk drawing: a small shop with a striped awning',
    },
  },
]

export const BRANCHES_SOURCE_NOTE: L = {
  ru: 'Часы и оценки — Яндекс Карты, август 2026.',
  en: 'Hours and ratings — Yandex Maps, August 2026.',
}

/** Проценты — вкладка отзывов точки на Социалистической (Яндекс, 2026-08-02). */
export const REVIEW_STATS: { label: L; value: string }[] = [
  { label: { ru: 'персонал', en: 'staff' }, value: '93%' },
  { label: { ru: 'атмосфера', en: 'atmosphere' }, value: '100%' },
  { label: { ru: 'кухня', en: 'food' }, value: '90%' },
]

export const REVIEW_STATS_NOTE: L = {
  ru: 'по 415 отзывам на Яндекс Картах (Социалистическая, 15)',
  en: 'across 415 reviews on Yandex Maps (Sotsialisticheskaya 15)',
}

export const SOCIAL = [
  { label: 'Telegram', handle: '@coucousdz', url: 'https://t.me/coucousdz' },
  { label: 'Instagram', handle: '@cafe_cous_cous', url: 'https://www.instagram.com/cafe_cous_cous/' },
] as const

export const AWARD: L = { ru: 'Хорошее место 2026', en: 'Good Place 2026' }

/** Города-направления = реальные названия шаурмы в меню. */
export const DESTINATIONS: L<string[]> = {
  ru: ['АЛЖИР', 'ПАРИЖ', 'АММАН', 'ВАТИКАН', 'ПЕТЕРБУРГ'],
  en: ['ALGIERS', 'PARIS', 'AMMAN', 'VATICAN', 'PETERSBURG'],
}

export const TOTAL_RATINGS: L = { ru: '2 650+ оценок', en: '2,650+ ratings' } // 2 011 + 639, обе точки

/** Все строки интерфейса. */
export const UI = {
  brand: { ru: 'COUSCOUS', en: 'COUSCOUS' },
  brandSub: { ru: 'ALGERIAN KITCHEN', en: 'ALGERIAN KITCHEN' },
  navMenu: { ru: 'Меню', en: 'Menu' },
  navBranches: { ru: 'Адреса', en: 'Find us' },
  langSwitch: { ru: 'Switch to English', en: 'Переключить на русский' },
  skip: { ru: 'Перейти к меню', en: 'Skip to menu' },

  ribbon: {
    ru: 'COUSCOUS · ALGERIAN KITCHEN · САНКТ-ПЕТЕРБУРГ',
    en: 'COUSCOUS · ALGERIAN KITCHEN · SAINT PETERSBURG',
  },
  heroTitleA: { ru: 'Ваш билет', en: 'Your ticket' },
  heroTitleB: { ru: 'в мир кухни', en: 'to the world of cuisine' },
  departureLabel: { ru: 'отправление', en: 'departure' },
  destinationLabel: { ru: 'направление', en: 'destination' },
  fromCity: { ru: 'САНКТ-ПЕТЕРБУРГ', en: 'SAINT PETERSBURG' },
  stampHalal: { ru: 'ХАЛЯЛЬ', en: 'HALAL' },
  ctaMenu: { ru: 'Меню', en: 'Menu' },
  ctaRoute: { ru: 'Как добраться', en: 'How to find us' },
  boardingHint: { ru: 'листайте вниз — посадка началась', en: 'scroll down — now boarding' },

  tear: { ru: 'линия отрыва', en: 'tear here' },

  menuTitle: { ru: 'Меню', en: 'Menu' },
  drinksTitle: { ru: 'Напитки', en: 'Drinks' },

  atmoTitle: { ru: 'Атмосфера', en: 'The room' },
  atmoText: {
    ru:
      'Маленькое алжирское кафе в Петербурге: шаурма, тарелки и фалафель — всё халяль. ' +
      'Внутри — дерево, гирлянды из флажков, лампы, мандала под потолком и меловое меню с сердечками.',
    en:
      'A small Algerian cafe in Petersburg: shawarma, plates and falafel — everything halal. ' +
      'Inside — wood, bunting, glowing bulbs, a mandala on the ceiling and a chalk menu covered in hearts.',
  },
  photoAltCounter: {
    ru: 'Стойка кафе: деревянные панели, меловое меню с сердечками, гирлянда из флажков',
    en: 'The counter: wood panelling, a chalk menu with hearts, a string of bunting',
  },
  photoAltHall: {
    ru: 'Зал: голубой потолок с мандалой, лампы Эдисона, деревянные столы',
    en: 'The hall: sky-blue ceiling with a mandala, Edison bulbs, wooden tables',
  },

  branchesTitle: { ru: 'Куда прибыть', en: 'Where to arrive' },
  daily: { ru: 'ежедневно', en: 'daily' },
  routeCta: { ru: 'Маршрут в Яндекс Картах', en: 'Route in Yandex Maps' },

  footerSub: {
    ru: 'ALGERIAN KITCHEN · САНКТ-ПЕТЕРБУРГ',
    en: 'ALGERIAN KITCHEN · SAINT PETERSBURG',
  },
  footerFine: {
    ru: 'Билет действителен ежедневно с 11:00',
    en: 'Ticket valid daily from 11:00',
  },
  footerData: {
    ru: 'Данные: Яндекс Карты, август 2026',
    en: 'Data: Yandex Maps, August 2026',
  },
} satisfies Record<string, L>
