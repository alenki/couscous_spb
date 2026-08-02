/**
 * ЕДИНСТВЕННЫЙ источник фактов о кафе. Всё проверено по Яндекс Картам
 * (организации 26524829091 и 203444001790, получено 2026-08-02), флаеру
 * бренда и предыдущей сверке с 2ГИС (2026-08-01).
 * Ничего не выдумывать. Непроверенное помечать PLACEHOLDER.
 * JSON-LD в index.html держать в согласии с этим файлом.
 */

export type FlagKind =
  | 'ru' | 'dz' | 'fr' | 'jo' | 'va'
  | 'pomegranate' | 'leaf' | 'moustache' | null

export interface Dish {
  name: string
  weight: string
  price: number
  flag: FlagKind
  /** Состав указывается ТОЛЬКО если он подтверждён (карточки Яндекса, Кропоткина). */
  desc?: string
}

export interface DishGroup {
  title: string
  dishes: Dish[]
}

/** Меню точки на Социалистической, 15 — вкладка «Меню» на Яндекс Картах, 2026-08-02. */
export const MENU: DishGroup[] = [
  {
    title: 'Шаурма',
    dishes: [
      {
        name: 'Питерская (классическая)',
        weight: '350 г',
        price: 290,
        flag: 'ru',
        desc: 'лаваш · курица · огурцы · томаты · салат · соус',
      },
      {
        name: 'Алжирская',
        weight: '400 г',
        price: 340,
        flag: 'dz',
        desc: 'лаваш · курица гриль · картофель фри · гауда · айсберг · томаты · алжирский соус',
      },
      { name: 'Французская', weight: '350 г', price: 340, flag: 'fr' },
      { name: '«Гранат»', weight: '320 г', price: 340, flag: 'pomegranate' },
      { name: 'Иорданская', weight: '350 г', price: 410, flag: 'jo' },
      { name: 'Ватиканская', weight: '350 г', price: 380, flag: 'va' },
      { name: 'Такос куриный', weight: '350 г', price: 380, flag: null },
      { name: 'Такос MIX', weight: '350 г', price: 400, flag: null },
    ],
  },
  {
    title: 'Тарелки',
    dishes: [
      { name: 'Алжирская тарелка', weight: '400 г', price: 550, flag: 'dz' },
      { name: 'Иорданская тарелка', weight: '400 г', price: 580, flag: 'jo' },
      { name: 'Шаурма на тарелке', weight: '400 г', price: 450, flag: null },
    ],
  },
  {
    title: 'Без мяса',
    dishes: [
      {
        name: 'Шаурма овощная',
        weight: '300 г',
        price: 290,
        flag: 'leaf',
        desc: 'лаваш · томаты · огурцы · салат · хумус · соус · фри',
      },
      { name: 'Фалафель «Усатого»', weight: '450 г', price: 430, flag: 'moustache' },
    ],
  },
]

/** Напитки видны на меловом табло в зале (фото профиля); цен на доске нет. */
export const DRINKS = ['эспрессо', 'американо', 'капучино', 'латте', 'какао', 'чай в ассортименте']
export const DRINKS_NOTE = 'напитки и десерты — от 120 ₽'

export const MENU_SOURCE_NOTE =
  'Меню и цены — точка на Социалистической, 15 (Яндекс Карты, август 2026). ' +
  'На Кропоткина, 19/8 меню и цены немного отличаются.'

export interface Branch {
  terminal: string
  area: string
  address: string
  addressNote?: string
  metro?: string
  phone: string
  phoneHref: string
  hours: string
  rating: string
  ratingsCount: string
  yandexUrl: string
  icon: string
  iconAlt: string
}

export const BRANCHES: Branch[] = [
  {
    terminal: 'Терминал 1',
    area: 'Петроградская сторона',
    address: 'ул. Кропоткина, 19/8',
    addressNote: 'угол Саблинской улицы',
    phone: '+7 996 772-20-26',
    phoneHref: 'tel:+79967722026',
    hours: '11:00 – 00:00',
    rating: '5,0',
    ratingsCount: '2 011 оценок',
    yandexUrl: 'https://yandex.ru/maps/org/cous_cous/26524829091/',
    icon: '/chalk-pin.png',
    iconAlt: 'Меловой рисунок: оранжевая метка на карте',
  },
  {
    terminal: 'Терминал 2',
    area: 'Центр',
    address: 'Социалистическая ул., 15',
    addressNote: 'цокольный этаж',
    metro: 'м. Звенигородская · Лиговский проспект · Владимирская',
    phone: '+7 911 786-30-26',
    phoneHref: 'tel:+79117863026',
    hours: '11:00 – 23:00',
    rating: '5,0',
    ratingsCount: '639 оценок',
    yandexUrl: 'https://yandex.ru/maps/org/cous_cous/203444001790/',
    icon: '/chalk-store.png',
    iconAlt: 'Меловой рисунок: лавка с полосатым навесом',
  },
]

export const BRANCHES_SOURCE_NOTE = 'Часы и оценки — Яндекс Карты, август 2026.'

/** Проценты — вкладка отзывов точки на Социалистической (Яндекс, 2026-08-02). */
export const REVIEW_STATS = [
  { label: 'персонал', value: '93%' },
  { label: 'атмосфера', value: '100%' },
  { label: 'кухня', value: '90%' },
]
export const REVIEW_STATS_NOTE = 'по 415 отзывам на Яндекс Картах (Социалистическая, 15)'

export const SOCIAL = [
  { label: 'Telegram', handle: '@coucousdz', url: 'https://t.me/coucousdz' },
  { label: 'Instagram', handle: '@cafe_cous_cous', url: 'https://www.instagram.com/cafe_cous_cous/' },
]

export const AWARD = 'Хорошее место 2026'
export const AWARD_SOURCE = 'Яндекс'

/** Города-направления = реальные названия шаурмы в меню. */
export const DESTINATIONS = ['АЛЖИР', 'ПАРИЖ', 'АММАН', 'ВАТИКАН', 'ПЕТЕРБУРГ']

export const TOTAL_RATINGS = '2 650+' // 2 011 + 639, обе точки, Яндекс 2026-08-02
