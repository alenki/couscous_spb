/**
 * ЕДИНСТВЕННЫЙ источник фактов о кафе.
 *
 * «Дамаск» — настоящее заведение: Санкт-Петербург, Кронверкский проспект, 45,
 * цокольный этаж. Всё ниже снято с карточки организации на Яндекс Картах
 * 16 сентября 2026 года:
 *   https://yandex.ru/maps/org/damask/1050716428/
 *
 * Русский — источник. Английский и арабский — перевод, НИКОГДА не новые факты.
 * JSON-LD в index.html держать в согласии с этим файлом: адрес, телефон, часы
 * и aggregateRating продублированы там.
 *
 * Правки против данных Яндекса (описаны в спеке, docs/superpowers/specs):
 *   1. Telegram из карточки (`t.me/damask_cafe45-instagram`) выброшен: дефис в
 *      имени пользователя Telegram недопустим, а `damask_cafe45` не занят.
 *   2. WhatsApp — `79811642424`, а не `89811642424`: «8» это внутрироссийский
 *      код выхода, wa.me его не понимает.
 *   3. Два раздела «Закуски» (во втором латинская `c`) объединены в один.
 *   4. Цены взяты с вкладки «Меню», а не с обзорной: они расходятся, вкладка
 *      «Меню» полнее и свежее.
 */

export type Lang = 'ru' | 'en' | 'ar'

export type L<T = string> = { ru: T; en: T; ar: T }

/** Языки, между которыми переключается шапка. Порядок — порядок кнопок. */
export const LANGS: { code: Lang; label: string; full: L }[] = [
  { code: 'ru', label: 'RU', full: { ru: 'Русский', en: 'Russian', ar: 'الروسية' } },
  { code: 'en', label: 'EN', full: { ru: 'Английский', en: 'English', ar: 'الإنجليزية' } },
  { code: 'ar', label: 'AR', full: { ru: 'Арабский', en: 'Arabic', ar: 'العربية' } },
]

/* ============================================================
   Кафе
   ============================================================ */

export const CAFE = {
  /** Латиницей — как в логотипе. Не переводится и не транслитерируется. */
  wordmark: 'DAMASK',
  name: { ru: 'Дамаск', en: 'Damask', ar: 'دمشق' } satisfies L,
  tagline: {
    ru: 'кафе арабской кухни',
    en: 'arabic kitchen',
    ar: 'مطعم المأكولات العربية',
  } satisfies L,

  city: { ru: 'Санкт-Петербург', en: 'Saint Petersburg', ar: 'سانت بطرسبرغ' } satisfies L,
  street: {
    ru: 'Кронверкский проспект, 45',
    en: 'Kronverksky Prospekt, 45',
    ar: 'شارع كرونفيرسكي 45',
  } satisfies L,
  floor: { ru: 'цокольный этаж', en: 'basement level', ar: 'الطابق السفلي' } satisfies L,
  postcode: '197101',

  /**
   * Горьковская — станция метро, Сытный рынок — наземная остановка. В карточке
   * Яндекса они лежат вперемешку в одном списке «Как добраться», и если не
   * подписать тип, гость идёт искать вестибюль там, где стоит автобус.
   */
  metro: [
    {
      kind: 'metro' as const,
      station: { ru: 'Горьковская', en: 'Gorkovskaya', ar: 'غوركوفسكايا' } satisfies L,
      walk: { ru: '460 м', en: '460 m', ar: '460 م' } satisfies L,
      /** Московско-Петроградская линия, синяя. */
      line: '#0078C9',
    },
    {
      kind: 'stop' as const,
      station: { ru: 'Сытный рынок', en: 'Sytny Market', ar: 'سوق سيتني' } satisfies L,
      walk: { ru: '70 м', en: '70 m', ar: '70 م' } satisfies L,
      line: '#C9A227',
    },
  ],

  phone: '+7 981 164-24-24',
  phoneHref: 'tel:+79811642424',

  /** Одинаково все семь дней. `openMin`/`closeMin` — минуты от полуночи, МСК. */
  hours: { text: '11:00–23:30', openMin: 11 * 60, closeMin: 23 * 60 + 30 },

  rating: { ru: '4,4', en: '4.4', ar: '4.4' } satisfies L,
  ratingValue: 4.4,
  ratingsCount: 1010,
  reviewsCount: 557,

  bill: { ru: '600–1100 ₽', en: '600–1100 ₽', ar: '600–1100 ₽' } satisfies L,

  yandexUrl: 'https://yandex.ru/maps/org/damask/1050716428/',
  yandexReviewsUrl: 'https://yandex.ru/maps/org/damask/1050716428/reviews/',
  yandexMenuUrl: 'https://yandex.ru/maps/org/damask/1050716428/menu/',
  /** Бронь стола — личные сообщения сообщества ВКонтакте (так указано в карточке). */
  bookUrl: 'https://vk.me/damask2024',
} as const

/**
 * У WhatsApp `handle` намеренно нет: он повторял бы телефон, который в подвале
 * и так стоит отдельной ссылкой — номер печатался дважды подряд.
 */
export const SOCIAL: { label: string; handle?: string; url: string }[] = [
  { label: 'VK', handle: 'damask2024', url: 'https://vk.com/damask2024' },
  { label: 'WhatsApp', url: 'https://wa.me/79811642424' },
]

/** Из блока «Особенности» карточки. */
export const FEATURES: L[] = [
  { ru: 'кальян', en: 'hookah', ar: 'أراكيل' },
  { ru: 'летняя терраса', en: 'summer terrace', ar: 'تراس صيفي' },
  { ru: 'восточная музыка', en: 'oriental music', ar: 'موسيقى شرقية' },
  { ru: 'Wi-Fi', en: 'Wi-Fi', ar: 'واي فاي' },
  { ru: 'доставка', en: 'delivery', ar: 'توصيل' },
  { ru: 'с собой', en: 'takeaway', ar: 'طلبات خارجية' },
  { ru: 'оплата картой', en: 'card payment', ar: 'الدفع بالبطاقة' },
  { ru: 'банкеты', en: 'banquets', ar: 'حفلات' },
]

/**
 * Доли положительных отзывов по темам — прямо из карточки Яндекса.
 * `count` — сколько отзывов в теме; без него процент ничего не значит.
 */
export const PRAISE: { label: L; pct: number; count: number }[] = [
  { label: { ru: 'еда', en: 'the food', ar: 'الطعام' }, pct: 91, count: 453 },
  { label: { ru: 'персонал', en: 'the staff', ar: 'الخدمة' }, pct: 90, count: 255 },
  { label: { ru: 'атмосфера', en: 'the atmosphere', ar: 'الأجواء' }, pct: 96, count: 182 },
  { label: { ru: 'чай', en: 'the tea', ar: 'الشاي' }, pct: 92, count: 37 },
]

/* ============================================================
   Меню
   ============================================================ */

/**
 * Снимок в двух ширинах.
 *
 * `smallWidth` и `width` — настоящие ширины файлов в пикселях, а не пожелания:
 * из них собирается srcSet, и на них же смотрит images.test.ts. Соврать в
 * дескрипторе — значит заставить браузер выбрать файл мельче, чем он думает,
 * и отрисовать его с растяжением; вёрстку это не ломает и глазами не ловится.
 */
export interface Photo {
  src: string
  small: string
  smallWidth: number
  width: number
  height: number
  alt: L
}

/** Единственное место, где склеивается srcSet: два вызова — две ошибки. */
export function srcSet(p: Photo): string {
  return `${p.small} ${p.smallWidth}w, ${p.src} ${p.width}w`
}

export interface Dish {
  name: L
  /** Состав — только там, где он есть в меню Яндекса. Выдумывать нельзя. */
  desc?: L
  weight: L
  price: number
  /** Блюдо, которое кафе показывает карточкой с фотографией. */
  photo?: Photo
}

export interface Course {
  /** Якорь раздела и ключ в ленте навигации. */
  id: string
  title: L
  dishes: Dish[]
}

const G = (n: number): L => ({ ru: `${n} г`, en: `${n} g`, ar: `${n} غ` })
const ML = (n: number): L => ({ ru: `${n} мл`, en: `${n} ml`, ar: `${n} مل` })
const LTR = (ru: string, en: string): L => ({ ru: `${ru} л`, en: `${en} l`, ar: `${en} ل` })
const PC: L = { ru: '1 шт', en: '1 pc', ar: 'قطعة' }

export const MENU: Course[] = [
  {
    id: 'breakfast',
    title: { ru: 'Завтраки', en: 'Breakfast', ar: 'الفطور' },
    dishes: [
      {
        name: { ru: 'Фуль', en: 'Ful', ar: 'فول' },
        desc: {
          ru: 'Бобы, овощи, маринованные огурцы, тахина',
          en: 'Fava beans, vegetables, pickles, tahini',
          ar: 'فول، خضار، مخلل، طحينة',
        },
        weight: G(300),
        price: 480,
      },
      {
        name: { ru: 'Фалафель', en: 'Falafel', ar: 'فلافل' },
        desc: {
          ru: 'Котлеты из нута, жаренные во фритюре. Подаётся с соусом шахини, свежими овощами, маринованными огурцами',
          en: 'Deep-fried chickpea patties. Served with tahini sauce, fresh vegetables and pickles',
          ar: 'أقراص الحمص المقلية، تُقدّم مع صلصة الطحينة والخضار الطازجة والمخلل',
        },
        weight: G(300),
        price: 440,
      },
      {
        name: { ru: 'Фатте', en: 'Fatteh', ar: 'فتّة' },
        desc: {
          ru: 'Нут, овощи, маринованные огурцы, тахина, сухари, сливочное масло',
          en: 'Chickpeas, vegetables, pickles, tahini, toasted bread, butter',
          ar: 'حمص، خضار، مخلل، طحينة، خبز محمّص، زبدة',
        },
        weight: G(300),
        price: 430,
      },
      {
        name: { ru: 'Омлет с сыром', en: 'Cheese omelette', ar: 'عجّة بالجبنة' },
        desc: {
          ru: 'Омлет из трёх яиц с сыром и свежими овощами',
          en: 'Three-egg omelette with cheese and fresh vegetables',
          ar: 'عجّة من ثلاث بيضات مع الجبنة والخضار الطازجة',
        },
        weight: G(250),
        price: 380,
      },
      {
        name: { ru: 'Мусабаха', en: 'Musabaha', ar: 'مسبّحة' },
        desc: {
          ru: 'Нут, овощи, маринованные огурцы, тахина',
          en: 'Whole chickpeas, vegetables, pickles, tahini',
          ar: 'حمص حبّ، خضار، مخلل، طحينة',
        },
        weight: G(250),
        price: 360,
      },
      {
        name: { ru: 'Макдус', en: 'Makdous', ar: 'مكدوس' },
        desc: {
          ru: 'Баклажаны, фаршированные грецкими орехами и красным перцем',
          en: 'Baby aubergines stuffed with walnuts and red pepper',
          ar: 'باذنجان محشو بالجوز والفليفلة الحمراء',
        },
        weight: G(150),
        price: 320,
      },
      {
        name: { ru: 'Лабне', en: 'Labneh', ar: 'لبنة' },
        desc: {
          ru: 'Домашний сыр лабне, оливковое масло',
          en: 'House-made labneh, olive oil',
          ar: 'لبنة بلدية مع زيت الزيتون',
        },
        weight: G(150),
        price: 250,
      },
    ],
  },

  {
    id: 'mezze',
    title: { ru: 'Закуски', en: 'Mezze', ar: 'المقبلات' },
    dishes: [
      {
        name: { ru: 'Картофель фри с сыром и пряностями', en: 'Fries with cheese and spices', ar: 'بطاطا بالجبنة والبهارات' },
        desc: {
          ru: 'Картофель фри, сыр моцарелла, сыр чеддер и зелень',
          en: 'Fries, mozzarella, cheddar and herbs',
          ar: 'بطاطا مقلية، جبنة موزاريلا، شيدر، وخضرة',
        },
        weight: G(150),
        price: 480,
      },
      {
        name: { ru: 'Хумус с мясом', en: 'Hummus with lamb', ar: 'حمّص باللحمة' },
        desc: {
          ru: 'Паста из нута с бараниной, оливковое масло',
          en: 'Chickpea purée with lamb, olive oil',
          ar: 'معجون الحمص مع لحم الغنم وزيت الزيتون',
        },
        weight: G(220),
        price: 420,
      },
      {
        name: { ru: 'Бурак с сыром', en: 'Cheese burek', ar: 'بوراك بالجبنة' },
        weight: G(150),
        price: 420,
      },
      {
        name: { ru: 'Хумус', en: 'Hummus', ar: 'حمّص' },
        desc: {
          ru: 'Паста из нута, оливковое масло',
          en: 'Chickpea purée, olive oil',
          ar: 'معجون الحمص مع زيت الزيتون',
        },
        weight: G(150),
        price: 320,
      },
      {
        name: { ru: 'Мутабаль', en: 'Mutabbal', ar: 'متبّل' },
        desc: {
          ru: 'Паста из печёных баклажанов, чеснок, сметана, тахинная паста',
          en: 'Smoked aubergine purée, garlic, sour cream, tahini',
          ar: 'باذنجان مشوي، ثوم، قشدة، طحينة',
        },
        weight: G(180),
        price: 320,
      },
      {
        name: { ru: 'Мухаммара', en: 'Muhammara', ar: 'محمّرة' },
        desc: {
          ru: 'Сухари в панировке, красный перец, грецкий орех, гранатовый соус, кунжутная паста',
          en: 'Breadcrumbs, red pepper, walnuts, pomegranate molasses, sesame paste',
          ar: 'بقسماط، فليفلة حمراء، جوز، دبس الرمان، طحينة',
        },
        weight: G(200),
        price: 320,
      },
      {
        name: { ru: 'Наггетсы', en: 'Chicken nuggets', ar: 'ناغتس الدجاج' },
        weight: G(180),
        price: 320,
      },
      {
        name: { ru: 'Овощное ассорти', en: 'Vegetable platter', ar: 'خضار مشكّلة' },
        desc: {
          ru: 'Огурцы, помидоры, зелень',
          en: 'Cucumbers, tomatoes, herbs',
          ar: 'خيار، بندورة، وخضرة',
        },
        weight: G(250),
        price: 290,
      },
      {
        name: { ru: 'Картофель фри', en: 'French fries', ar: 'بطاطا مقلية' },
        desc: { ru: 'Подаётся с соусом', en: 'Served with sauce', ar: 'تُقدّم مع الصلصة' },
        weight: G(150),
        price: 280,
      },
      {
        name: { ru: 'Картофель на углях', en: 'Charcoal-grilled potatoes', ar: 'بطاطا على الفحم' },
        weight: G(250),
        price: 280,
      },
    ],
  },

  {
    id: 'salads',
    title: { ru: 'Салаты', en: 'Salads', ar: 'السلطات' },
    dishes: [
      {
        name: { ru: 'Цезарь с креветками', en: 'Caesar with prawns', ar: 'سيزر بالروبيان' },
        desc: {
          ru: 'Креветки тигровые, айсберг, соус цезарь, сухари',
          en: 'Tiger prawns, iceberg, Caesar dressing, croutons',
          ar: 'روبيان نمري، خس، صلصة سيزر، خبز محمّص',
        },
        weight: G(280),
        price: 530,
      },
      {
        name: { ru: 'Греческий салат', en: 'Greek salad', ar: 'سلطة يونانية' },
        desc: {
          ru: 'Помидоры, огурцы, айсберг, перец болгарский, лук, маслины, сыр фитаки, лимон, оливковое масло',
          en: 'Tomatoes, cucumbers, iceberg, bell pepper, onion, black olives, fitaki cheese, lemon, olive oil',
          ar: 'بندورة، خيار، خس، فليفلة، بصل، زيتون أسود، جبنة، ليمون، زيت الزيتون',
        },
        weight: G(300),
        price: 420,
      },
      {
        name: { ru: 'Цезарь с курицей', en: 'Caesar with chicken', ar: 'سيزر بالدجاج' },
        desc: {
          ru: 'Куриное филе, айсберг, соус цезарь, сухари',
          en: 'Chicken fillet, iceberg, Caesar dressing, croutons',
          ar: 'صدر دجاج، خس، صلصة سيزر، خبز محمّص',
        },
        weight: G(480),
        price: 390,
      },
      {
        name: { ru: 'Табуле', en: 'Tabbouleh', ar: 'تبّولة' },
        desc: {
          ru: 'Петрушка, булгур, томаты, лук, мята, лимонный сок, оливковое масло',
          en: 'Parsley, bulgur, tomatoes, onion, mint, lemon juice, olive oil',
          ar: 'بقدونس، برغل، بندورة، بصل، نعناع، عصير الليمون، زيت الزيتون',
        },
        weight: G(250),
        price: 375,
      },
      {
        name: { ru: 'Фатуш', en: 'Fattoush', ar: 'فتّوش' },
        desc: {
          ru: 'Томаты, огурцы, редис, айсберг, мята, оливки, натуральные чипсы, гранатовый соус, оливковое масло',
          en: 'Tomatoes, cucumbers, radish, iceberg, mint, olives, crisp bread, pomegranate molasses, olive oil',
          ar: 'بندورة، خيار، فجل، خس، نعناع، زيتون، خبز محمّص، دبس الرمان، زيت الزيتون',
        },
        weight: G(250),
        price: 330,
      },
      {
        name: { ru: 'Арабский салат', en: 'Arabic salad', ar: 'سلطة عربية' },
        desc: {
          ru: 'Томаты, огурцы, айсберг, петрушка, лимон, оливковое масло',
          en: 'Tomatoes, cucumbers, iceberg, parsley, lemon, olive oil',
          ar: 'بندورة، خيار، خس، بقدونس، ليمون، زيت الزيتون',
        },
        weight: G(250),
        price: 330,
      },
    ],
  },

  {
    id: 'soups',
    title: { ru: 'Супы', en: 'Soups', ar: 'الشوربات' },
    dishes: [
      {
        name: { ru: 'Суп из баранины', en: 'Lamb soup', ar: 'شوربة لحم الغنم' },
        desc: {
          ru: 'Баранина, картофель, морковь, рис, лук, томатная паста',
          en: 'Lamb, potato, carrot, rice, onion, tomato paste',
          ar: 'لحم غنم، بطاطا، جزر، أرز، بصل، معجون البندورة',
        },
        weight: G(350),
        price: 490,
      },
      {
        name: { ru: 'Чечевичный крем-суп', en: 'Lentil cream soup', ar: 'شوربة العدس' },
        desc: {
          ru: 'Чечевица, лук, картофель, морковь, лимон',
          en: 'Lentils, onion, potato, carrot, lemon',
          ar: 'عدس، بصل، بطاطا، جزر، ليمون',
        },
        weight: G(350),
        price: 280,
      },
      {
        name: { ru: 'Куриный крем-суп', en: 'Chicken cream soup', ar: 'شوربة الدجاج' },
        desc: {
          ru: 'Куриное филе, лук, морковь, соус бешамель',
          en: 'Chicken fillet, onion, carrot, béchamel',
          ar: 'صدر دجاج، بصل، جزر، صلصة بشاميل',
        },
        weight: G(350),
        price: 280,
      },
      {
        name: { ru: 'Грибной крем-суп', en: 'Mushroom cream soup', ar: 'شوربة الفطر' },
        desc: { ru: 'Грибы, соус бешамель', en: 'Mushrooms, béchamel', ar: 'فطر، صلصة بشاميل' },
        weight: G(350),
        price: 280,
      },
    ],
  },

  {
    id: 'hot',
    title: { ru: 'Горячие блюда', en: 'Hot dishes', ar: 'الأطباق الرئيسية' },
    dishes: [
      {
        name: { ru: 'Маклюбе с баклажаном и мясом', en: 'Maqluba with aubergine and lamb', ar: 'مقلوبة باللحمة' },
        desc: {
          ru: 'Баранина, баклажаны, сметана, орешки, рис. Подаётся с соусом',
          en: 'Lamb, aubergine, sour cream, nuts, rice. Served with sauce',
          ar: 'لحم غنم، باذنجان، قشدة، مكسّرات، أرز. تُقدّم مع الصلصة',
        },
        weight: G(500),
        price: 980,
      },
      {
        name: { ru: 'Фрике с бараниной', en: 'Freekeh with lamb', ar: 'فريكة باللحمة' },
        desc: { ru: 'Фрике, баранина, орехи', en: 'Freekeh, lamb, nuts', ar: 'فريكة، لحم غنم، مكسّرات' },
        weight: G(500),
        price: 980,
      },
      {
        name: { ru: 'Мансаф из мяса', en: 'Mansaf with lamb', ar: 'منسف باللحمة' },
        desc: {
          ru: 'Рис, мясо, микс орехов, кинза, чеснок, соус джамид',
          en: 'Rice, lamb, mixed nuts, coriander, garlic, jameed sauce',
          ar: 'أرز، لحم، مكسّرات، كزبرة، ثوم، صلصة الجميد',
        },
        weight: G(500),
        price: 930,
      },
      {
        name: { ru: 'Шакрие с мясом', en: 'Shakriyeh with lamb', ar: 'شاكرية باللحمة' },
        desc: {
          ru: 'Мясо в кисломолочном соусе, лук, кинза, кумин, подаётся с рисом',
          en: 'Lamb in a yoghurt sauce, onion, coriander, cumin, served with rice',
          ar: 'لحم بصلصة اللبن، بصل، كزبرة، كمّون، يُقدّم مع الأرز',
        },
        weight: G(500),
        price: 870,
      },
      {
        name: { ru: 'Кабсе с половиной курицы', en: 'Kabsa with half a chicken', ar: 'كبسة بنصف دجاجة' },
        desc: {
          ru: 'Рис с овощами, половина курицы, морковь, болгарский перец, зелёный горошек, кукуруза. Подаётся с аджикой',
          en: 'Rice with vegetables, half a chicken, carrot, bell pepper, green peas, sweetcorn. Served with adjika',
          ar: 'أرز بالخضار، نصف دجاجة، جزر، فليفلة، بازلاء، ذرة. تُقدّم مع الشطّة',
        },
        weight: G(500),
        price: 860,
        photo: {
          src: '/kabsa.jpg',
          small: '/kabsa-640.jpg',
          smallWidth: 640,
          width: 1280,
          height: 960,
          alt: {
            ru: 'Кабсе: половина курицы на жёлтом рисе с морковью, миндалём и соусом, на красной камчатной скатерти',
            en: 'Kabsa: half a chicken on yellow rice with carrot, almonds and sauce, on a red damask cloth',
            ar: 'كبسة: نصف دجاجة على أرز أصفر مع الجزر واللوز والصلصة، على مفرش دمقس أحمر',
          },
        },
      },
      {
        name: { ru: 'Куббе Лабание', en: 'Kibbeh Labaniyeh', ar: 'كبة لبنية' },
        desc: {
          ru: 'Вареная котлета из теста на основе пшеницы, фаршированная бараниной и грецкими орехами, в соусе на основе кефира и сметаны. Подаётся с рисом',
          en: 'Poached wheat-dough dumplings stuffed with lamb and walnuts, in a yoghurt and sour-cream sauce. Served with rice',
          ar: 'كبة مسلوقة من عجين البرغل محشوّة باللحم والجوز، بصلصة اللبن والقشدة. تُقدّم مع الأرز',
        },
        weight: G(500),
        price: 830,
      },
      {
        name: { ru: 'Бамия с бараниной', en: 'Bamia with lamb', ar: 'بامية باللحمة' },
        desc: {
          ru: 'Бамия, мясо баранины в томатном соусе, рис, чеснок, кинза',
          en: 'Okra, lamb in tomato sauce, rice, garlic, coriander',
          ar: 'بامية، لحم غنم بصلصة البندورة، أرز، ثوم، كزبرة',
        },
        weight: G(500),
        price: 820,
      },
      {
        name: { ru: 'Фрике с куриным филе', en: 'Freekeh with chicken', ar: 'فريكة بالدجاج' },
        desc: {
          ru: 'Фрике, курица, орехи, сметанный соус',
          en: 'Freekeh, chicken, nuts, sour-cream sauce',
          ar: 'فريكة، دجاج، مكسّرات، صلصة القشدة',
        },
        weight: G(500),
        price: 790,
      },
      {
        name: { ru: 'Маклюбе с баклажаном куриный', en: 'Maqluba with aubergine and chicken', ar: 'مقلوبة بالدجاج' },
        desc: {
          ru: 'Куриное филе, баклажаны, сметана, орешки, рис. Подаётся со сметанным соусом',
          en: 'Chicken fillet, aubergine, sour cream, nuts, rice. Served with a sour-cream sauce',
          ar: 'صدر دجاج، باذنجان، قشدة، مكسّرات، أرز. تُقدّم مع صلصة القشدة',
        },
        weight: G(500),
        price: 690,
      },
      {
        name: { ru: 'Млухия', en: 'Mulukhiyah', ar: 'ملوخية' },
        desc: {
          ru: 'Царская трава, куриное филе, кинза, чеснок. Подаётся с рисом',
          en: 'Jute leaf, chicken fillet, coriander, garlic. Served with rice',
          ar: 'ملوخية، صدر دجاج، كزبرة، ثوم. تُقدّم مع الأرز',
        },
        weight: G(500),
        price: 680,
      },
      {
        name: { ru: 'Марина', en: 'Marina', ar: 'مارينا' },
        desc: {
          ru: 'Рубленая говядина и баранина с зеленью и луком в лепёшке, приготовленное на углях',
          en: 'Minced beef and lamb with herbs and onion in flatbread, cooked over charcoal',
          ar: 'لحم بقر وغنم مفروم مع الخضرة والبصل داخل الخبز، مشوي على الفحم',
        },
        weight: G(300),
        price: 670,
      },
      {
        name: { ru: 'Мансаф куриный', en: 'Mansaf with chicken', ar: 'منسف بالدجاج' },
        desc: {
          ru: 'Рис, куриное филе, микс орехов, кинза, соус джамид',
          en: 'Rice, chicken fillet, mixed nuts, coriander, jameed sauce',
          ar: 'أرز، صدر دجاج، مكسّرات، كزبرة، صلصة الجميد',
        },
        weight: G(500),
        price: 660,
      },
      {
        name: { ru: 'Шакрие с курицей', en: 'Shakriyeh with chicken', ar: 'شاكرية بالدجاج' },
        desc: {
          ru: 'Куриное филе в соусе на основе кефира и сметаны, лук, кинза, кумин, подаётся с рисом',
          en: 'Chicken fillet in a yoghurt and sour-cream sauce, onion, coriander, cumin, served with rice',
          ar: 'صدر دجاج بصلصة اللبن والقشدة، بصل، كزبرة، كمّون، يُقدّم مع الأرز',
        },
        weight: G(500),
        price: 660,
      },
      {
        name: { ru: 'Куббе золотистые', en: 'Golden kibbeh', ar: 'كبة مقلية' },
        desc: {
          ru: 'Котлета из теста на основе пшеницы, фаршированная бараниной и грецкими орехами, жаренная во фритюре. Подаётся с картофелем фри',
          en: 'Wheat-dough shells stuffed with lamb and walnuts, deep-fried. Served with fries',
          ar: 'كبة من عجين البرغل محشوّة باللحم والجوز، مقلية. تُقدّم مع البطاطا',
        },
        weight: G(400),
        price: 590,
      },
    ],
  },

  {
    id: 'arabic',
    title: { ru: 'Арабские блюда', en: 'Arabic specialities', ar: 'أطباق عربية' },
    dishes: [
      {
        name: { ru: 'Фрике с половиной курицы', en: 'Freekeh with half a chicken', ar: 'فريكة بنصف دجاجة' },
        desc: {
          ru: 'Фрике, запечённая в духовке курица, орехи, сметанный соус',
          en: 'Freekeh, oven-roasted chicken, nuts, sour-cream sauce',
          ar: 'فريكة، دجاج مشوي بالفرن، مكسّرات، صلصة القشدة',
        },
        weight: G(750),
        price: 890,
      },
      {
        name: { ru: 'Куббе на углях', en: 'Charcoal-grilled kibbeh', ar: 'كبة على الفحم' },
        desc: {
          ru: 'Фаршированная булгуром, мясом говядины и баранины, бараний жир, орехи, гранатовый соус',
          en: 'Stuffed with bulgur, beef and lamb, lamb fat, nuts, pomegranate molasses',
          ar: 'محشوّة بالبرغل ولحم البقر والغنم، دهن الغنم، مكسّرات، دبس الرمان',
        },
        weight: G(650),
        price: 860,
      },
    ],
  },

  {
    id: 'grill',
    title: { ru: 'Мангал', en: 'From the grill', ar: 'المشاوي' },
    dishes: [
      {
        name: { ru: 'Микс-гриль', en: 'Mixed grill', ar: 'مشاوي مشكّلة' },
        desc: {
          ru: 'Шиш-таук, кебаб из баранины и курицы, шашлык из говядины, овощи гриль. Подаётся с чесночным соусом',
          en: 'Shish taouk, lamb and chicken kebab, beef shashlik, grilled vegetables. Served with garlic sauce',
          ar: 'شيش طاووق، كباب غنم ودجاج، شيش لحم بقر، خضار مشوية. تُقدّم مع صلصة الثوم',
        },
        weight: G(850),
        price: 2220,
        photo: {
          src: '/grill.jpg',
          small: '/grill-640.jpg',
          smallWidth: 640,
          width: 1280,
          height: 960,
          alt: {
            ru: 'Микс-гриль: пять шампуров кебаба и шашлыка на лепёшке, соусы, коул-слоу и лук на углях',
            en: 'Mixed grill: five skewers of kebab and shashlik on flatbread, sauces, coleslaw and charred onion',
            ar: 'مشاوي مشكّلة: خمسة أسياخ من الكباب واللحم على الخبز، مع الصلصات والسلطة والبصل المشوي',
          },
        },
      },
      {
        name: { ru: 'Форель на углях', en: 'Charcoal-grilled trout', ar: 'تراوت على الفحم' },
        desc: {
          ru: 'Подаётся с картофелем, салатом коул-слоу и соусом бешамель',
          en: 'Served with potatoes, coleslaw and béchamel',
          ar: 'تُقدّم مع البطاطا وسلطة الملفوف وصلصة البشاميل',
        },
        weight: G(400),
        price: 1230,
      },
      {
        name: { ru: 'Дорадо на углях', en: 'Charcoal-grilled sea bream', ar: 'دوراد على الفحم' },
        desc: {
          ru: 'Подаётся с картофелем, салатом коул-слоу и двумя видами соусов',
          en: 'Served with potatoes, coleslaw and two sauces',
          ar: 'تُقدّم مع البطاطا وسلطة الملفوف ونوعين من الصلصة',
        },
        weight: G(450),
        price: 1170,
      },
      {
        name: { ru: 'Шашлык из баранины', en: 'Lamb shashlik', ar: 'شيش لحم الغنم' },
        desc: {
          ru: 'Подаётся с овощами гриль и фирменным соусом',
          en: 'Served with grilled vegetables and the house sauce',
          ar: 'يُقدّم مع الخضار المشوية وصلصة المطعم',
        },
        weight: G(350),
        price: 940,
      },
      {
        name: { ru: 'Шашлык из говядины', en: 'Beef shashlik', ar: 'شيش لحم البقر' },
        desc: {
          ru: 'Подаётся с овощами гриль и фирменным соусом',
          en: 'Served with grilled vegetables and the house sauce',
          ar: 'يُقدّم مع الخضار المشوية وصلصة المطعم',
        },
        weight: G(350),
        price: 940,
      },
      {
        name: { ru: 'Дамаск-кебаб', en: 'Damask kebab', ar: 'كباب دمشقي' },
        desc: {
          ru: 'Кебаб из баранины. Подаётся с картофелем, пиязом и красным соусом',
          en: 'Lamb kebab. Served with potatoes, piyaz and red sauce',
          ar: 'كباب لحم غنم. يُقدّم مع البطاطا والبصل بالسمّاق والصلصة الحمراء',
        },
        weight: G(350),
        price: 680,
      },
      {
        name: { ru: 'Шиш-таук', en: 'Shish taouk', ar: 'شيش طاووق' },
        desc: {
          ru: 'Куриное филе, приготовленное на мангале. Подаётся с картофелем фри, салатом коул-слоу и чесночным соусом',
          en: 'Chicken fillet from the charcoal grill. Served with fries, coleslaw and garlic sauce',
          ar: 'صدر دجاج مشوي على الفحم. يُقدّم مع البطاطا وسلطة الملفوف وصلصة الثوم',
        },
        weight: G(500),
        price: 670,
      },
      {
        name: { ru: 'Кебаб из курицы', en: 'Chicken kebab', ar: 'كباب دجاج' },
        desc: {
          ru: 'Подаётся с картофелем, пиязом и красным соусом',
          en: 'Served with potatoes, piyaz and red sauce',
          ar: 'يُقدّم مع البطاطا والبصل بالسمّاق والصلصة الحمراء',
        },
        weight: G(400),
        price: 580,
      },
    ],
  },

  {
    id: 'desserts',
    title: { ru: 'Десерты', en: 'Desserts', ar: 'الحلويات' },
    dishes: [
      {
        name: { ru: 'Кнафе с мороженым', en: 'Knafeh with ice cream', ar: 'كنافة بالبوظة' },
        desc: {
          ru: 'Тесто катаиф, сыр моцарелла, сливочное масло и сироп',
          en: 'Kataifi pastry, mozzarella, butter and syrup',
          ar: 'عجين الكتايف، جبنة موزاريلا، زبدة وقطر',
        },
        weight: G(270),
        price: 580,
      },
      {
        name: { ru: 'Кнафе', en: 'Knafeh', ar: 'كنافة' },
        desc: {
          ru: 'Тесто катаиф, сыр моцарелла, сливочное масло, сироп',
          en: 'Kataifi pastry, mozzarella, butter, syrup',
          ar: 'عجين الكتايف، جبنة موزاريلا، زبدة، قطر',
        },
        weight: G(200),
        price: 480,
        photo: {
          src: '/knafeh.jpg',
          small: '/knafeh-560.jpg',
          smallWidth: 560,
          width: 1120,
          height: 1493,
          alt: {
            ru: 'Кнафе на серебряном блюде рядом с латунным чайником и стаканом чая на красной камчатной скатерти',
            en: 'Knafeh on a silver dish beside a brass teapot and a glass of tea on a red damask cloth',
            ar: 'كنافة في صحن فضي إلى جانب إبريق نحاسي وكأس شاي على مفرش دمقس أحمر',
          },
        },
      },
      {
        name: { ru: 'Кнафе Набульсия', en: 'Knafeh Nabulsiyeh', ar: 'كنافة نابلسية' },
        desc: {
          ru: 'Манная крупа, сыр моцарелла, сироп',
          en: 'Semolina, mozzarella, syrup',
          ar: 'سميد، جبنة موزاريلا، قطر',
        },
        weight: G(250),
        price: 430,
      },
    ],
  },

  {
    id: 'drinks',
    title: { ru: 'Напитки', en: 'Drinks', ar: 'المشروبات' },
    dishes: [
      {
        name: { ru: 'Арабский кофе с кардамоном', en: 'Arabic coffee with cardamom', ar: 'قهوة عربية بالهيل' },
        weight: LTR('0,5', '0.5'),
        price: 590,
      },
      {
        name: { ru: 'Чайник чая «Дамаск»', en: '“Damask” teapot', ar: 'إبريق شاي «دمشق»' },
        weight: ML(500),
        price: 400,
      },
      {
        name: { ru: 'Манго-маракуйя лимонад', en: 'Mango and passion fruit lemonade', ar: 'ليموناضة المانجا والباشن فروت' },
        desc: {
          ru: 'Приготовлен на основе сиропов и газированной воды',
          en: 'Made with syrups and sparkling water',
          ar: 'محضّرة من الشراب والمياه الغازية',
        },
        weight: LTR('0,5', '0.5'),
        price: 380,
      },
      {
        name: { ru: 'Клубника-мята лимонад', en: 'Strawberry and mint lemonade', ar: 'ليموناضة الفراولة والنعناع' },
        desc: {
          ru: 'Приготовлен на основе сиропов и газированной воды',
          en: 'Made with syrups and sparkling water',
          ar: 'محضّرة من الشراب والمياه الغازية',
        },
        weight: LTR('0,5', '0.5'),
        price: 380,
      },
      {
        name: { ru: 'Апельсиновый сок (свежевыжатый)', en: 'Orange juice (freshly squeezed)', ar: 'عصير برتقال طازج' },
        weight: ML(350),
        price: 350,
      },
      {
        name: { ru: 'Мате', en: 'Mate', ar: 'متّة' },
        weight: PC,
        price: 270,
      },
      {
        name: { ru: 'Капучино', en: 'Cappuccino', ar: 'كابتشينو' },
        weight: PC,
        price: 250,
      },
      {
        name: { ru: 'Чашка чая', en: 'Cup of tea', ar: 'كوب شاي' },
        weight: LTR('0,3', '0.3'),
        price: 180,
      },
    ],
  },
]

/* ============================================================
   Фотографии зала
   ============================================================ */

export const ROOM_PHOTOS: Photo[] = [
  {
    src: '/ceiling.jpg',
    small: '/ceiling-560.jpg',
    smallWidth: 560,
    width: 1120,
    height: 1493,
    alt: {
      ru: 'Потолок зала: три витражные розетки-камарии — красные, синие и бирюзовые стёкла — в резных восьмиугольных рамах',
      en: 'The ceiling: three stained-glass qamariyya rosettes — red, blue and turquoise glass — in carved octagonal frames',
      ar: 'سقف الصالة: ثلاث قمريات زجاجية ملوّنة — أحمر وأزرق وفيروزي — ضمن أطر خشبية مثمّنة',
    } satisfies L,
  },
  {
    src: '/hall.jpg',
    small: '/hall-560.jpg',
    smallWidth: 560,
    width: 1120,
    height: 1493,
    alt: {
      ru: 'Зал кафе: кессонный потолок с золотыми звёздами, резные деревянные скамьи, каменные арки и стойка',
      en: 'The room: a coffered ceiling of gold stars, carved wooden benches, stone arches and the counter',
      ar: 'صالة المطعم: سقف مقسّم بالنجوم الذهبية، مقاعد خشبية محفورة، أقواس حجرية والبار',
    } satisfies L,
  },
  {
    src: '/lanterns.jpg',
    small: '/lanterns-560.jpg',
    smallWidth: 560,
    width: 1120,
    height: 1493,
    alt: {
      ru: 'Два фонаря с бисерной бахромой светятся под потолком с восьмиконечными звёздами',
      en: 'Two beaded-fringe lanterns glowing beneath a ceiling of eight-pointed stars',
      ar: 'ثريّتان بشراشيب من الخرز تضيئان تحت سقف مزيّن بالنجوم الثمانية',
    } satisfies L,
  },
]

/* ============================================================
   Строки интерфейса
   ============================================================ */

export const UI = {
  skip: { ru: 'Перейти к меню', en: 'Skip to menu', ar: 'انتقل إلى القائمة' },
  navMenu: { ru: 'Меню', en: 'Menu', ar: 'القائمة' },
  navRoom: { ru: 'Зал', en: 'The room', ar: 'الصالة' },
  navVisit: { ru: 'Как дойти', en: 'Find us', ar: 'كيف تصل' },
  langLabel: { ru: 'Язык', en: 'Language', ar: 'اللغة' },
  sections: { ru: 'Разделы', en: 'Sections', ar: 'الأقسام' },

  /* --- первый экран --- */
  heroTitle: { ru: 'Спуститесь в Дамаск', en: 'Take the stairs to Damascus', ar: 'انزل إلى دمشق' },
  heroLead: {
    ru: 'Кафе арабской кухни в цоколе дома на Кронверкском. Мезе, мангал на углях, кнафе и чайник дамасского чая.',
    en: 'An Arabic kitchen in a basement on Kronverksky. Mezze, a charcoal grill, knafeh and a pot of Damascus tea.',
    ar: 'مطبخ عربي في الطابق السفلي على شارع كرونفيرسكي. مقبلات، مشاوٍ على الفحم، كنافة وإبريق شاي دمشقي.',
  },
  ctaMenu: { ru: 'Смотреть меню', en: 'See the menu', ar: 'تصفّح القائمة' },
  ctaBook: { ru: 'Забронировать стол', en: 'Reserve a table', ar: 'احجز طاولة' },
  ratingLabel: { ru: 'Рейтинг', en: 'Rating', ar: 'التقييم' },
  ratingsSuffix: { ru: 'оценок', en: 'ratings', ar: 'تقييم' },
  billLabel: { ru: 'Средний чек', en: 'Average bill', ar: 'متوسط الفاتورة' },
  openNow: { ru: 'Открыто', en: 'Open', ar: 'مفتوح' },
  openUntil: { ru: 'до', en: 'until', ar: 'حتى' },
  closedNow: { ru: 'Закрыто', en: 'Closed', ar: 'مغلق' },
  opensAt: { ru: 'откроется в', en: 'opens at', ar: 'يفتح الساعة' },
  scrollHint: { ru: 'вниз по лестнице', en: 'down the stairs', ar: 'نزولاً على الدرج' },

  /* --- меню --- */
  menuTitle: { ru: 'Меню', en: 'Menu', ar: 'القائمة' },
  menuLead: {
    ru: 'Сирийская кухня: мезе, рис, мангал и кнафе. Всё меню целиком — 62 блюда.',
    en: 'Syrian cooking: mezze, rice, charcoal grill and knafeh. The whole menu — 62 dishes.',
    ar: 'مطبخ سوري: مقبلات، أرز، مشاوٍ وكنافة. القائمة كاملة — 62 طبقاً.',
  },
  menuNav: { ru: 'Разделы меню', en: 'Menu sections', ar: 'أقسام القائمة' },
  menuSource: {
    ru: 'Состав и цены — карточка кафе на Яндекс Картах, сентябрь 2026 года. Актуальные уточняйте в зале.',
    en: 'Ingredients and prices from the cafe’s Yandex Maps listing, September 2026. Please confirm current ones in the room.',
    ar: 'المكوّنات والأسعار من صفحة المطعم على خرائط ياندكس، أيلول 2026. يُرجى التأكّد من الأسعار الحالية في المطعم.',
  },
  menuFull: { ru: 'Меню на Яндекс Картах', en: 'Menu on Yandex Maps', ar: 'القائمة على خرائط ياندكس' },

  /* --- зал --- */
  roomTitle: { ru: 'Зал', en: 'The room', ar: 'الصالة' },
  roomText: {
    ru: 'Резной потолок с золотыми звёздами, витражные розетки-камарии, фонари с бисерной бахромой и полосатая кладка арок: зал собран как дамасский дом. Кальян, восточная музыка, летом — терраса.',
    en: 'A carved ceiling of gold stars, stained-glass qamariyya rosettes, beaded lanterns and striped ablaq arches: the room is put together like a house in Damascus. Hookah, oriental music, a terrace in summer.',
    ar: 'سقف محفور بالنجوم الذهبية، قمريات زجاجية ملوّنة، ثريّات بشراشيب من الخرز وأقواس بالحجر الأبلق: الصالة مبنية على طراز البيت الدمشقي. أراكيل، موسيقى شرقية، وتراس في الصيف.',
  },
  praiseLead: { ru: 'Что хвалят гости', en: 'What guests praise', ar: 'ما يُثني عليه الضيوف' },
  praiseNote: {
    ru: 'Доли положительных отзывов по темам — Яндекс Карты, сентябрь 2026.',
    en: 'Share of positive reviews by topic — Yandex Maps, September 2026.',
    ar: 'نسبة المراجعات الإيجابية حسب الموضوع — خرائط ياندكس، أيلول 2026.',
  },
  reviewsCta: { ru: 'Все отзывы', en: 'All reviews', ar: 'كل المراجعات' },
  reviewsOf: { ru: 'из', en: 'of', ar: 'من' },

  /* --- как дойти --- */
  visitTitle: { ru: 'Как дойти', en: 'Finding us', ar: 'كيف تصل إلينا' },
  visitLead: {
    ru: 'Вход с Кронверкского, вниз по лестнице. Напротив — Сытный рынок, за спиной — Петропавловка.',
    en: 'The entrance is on Kronverksky, down the stairs. Sytny Market is across the road, the Peter and Paul Fortress behind you.',
    ar: 'المدخل من شارع كرونفيرسكي، نزولاً على الدرج. سوق سيتني في المقابل، وقلعة بطرس وبولس خلفك.',
  },
  addressLabel: { ru: 'Адрес', en: 'Address', ar: 'العنوان' },
  hoursLabel: { ru: 'Часы', en: 'Hours', ar: 'أوقات العمل' },
  daily: { ru: 'ежедневно', en: 'daily', ar: 'يومياً' },
  phoneLabel: { ru: 'Телефон', en: 'Phone', ar: 'الهاتف' },
  routeCta: { ru: 'Маршрут в Яндекс Картах', en: 'Route in Yandex Maps', ar: 'الطريق على خرائط ياندكس' },
  walkTo: { ru: 'пешком', en: 'on foot', ar: 'سيراً' },
  metroKind: { ru: 'метро', en: 'metro', ar: 'مترو' },
  stopKind: { ru: 'остановка', en: 'tram & bus stop', ar: 'موقف باص' },

  /* --- подвал --- */
  footerSub: {
    ru: 'КАФЕ АРАБСКОЙ КУХНИ · САНКТ-ПЕТЕРБУРГ',
    en: 'ARABIC KITCHEN · SAINT PETERSBURG',
    ar: 'مطعم المأكولات العربية · سانت بطرسبرغ',
  },
  /** Подпись разработчика. «Lumako» — часть вёрстки, не переводится. */
  madeBy: { ru: 'Сделано в', en: 'Made by', ar: 'من تنفيذ' },
} satisfies Record<string, L>

/** Все снимки сайта в одном месте — по ним ходит images.test.ts. */
export const ALL_PHOTOS: Photo[] = [
  ...ROOM_PHOTOS,
  ...MENU.flatMap((c) => c.dishes.map((d) => d.photo).filter((p): p is Photo => p !== undefined)),
]
