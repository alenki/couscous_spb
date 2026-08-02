# Cous Cous SPb — site design («Ваш билет в мир кухни COUSCOUS»)

Date: 2026-08-02. Autonomous session: brainstorming skill adapted (no interactive
gate possible); decisions recorded here instead. Supersedes/rebuilds the
2026-08-01 effort — repo was found reset to the initial commit.

## Concept — the site IS the ticket

One signature device, taken from the client's own material, everything else quiet:

1. Their flyer literally reads **«Ваш билет в мир кухни COUSCOUS»** — an aged
   parchment travel document with engraved Algiers landmarks and zellige corners.
2. Their menu names dishes after **destinations**: Питерская, Алжирская,
   Французская, Иорданская, Ватиканская, Такос (+ Гранат). The menu is a route map.
3. Their logo is a **split face** — half parchment, half ink — a king/traveler.

So: the site is a vintage travel ticket from Санкт-Петербург into the world of
the kitchen. Menu = табло отправлений (split-flap departure board). Branches =
two terminals. Photos = postcards. Fine print = ticket conditions.

**Signature interaction:** a Solari-style split-flap line in the hero flipping
through the real dish destinations (АЛЖИРСКАЯ → ФРАНЦУЗСКАЯ → ИОРДАНСКАЯ →
ВАТИКАНСКАЯ → ПИТЕРСКАЯ). CSS 3D flaps, reduced-motion fallback = plain swap.

Vibe target: vintage, warm, a bit loud (their chalkboard has colored hearts and
bunting) — NOT luxury-minimal. Reference gourouindianfood.fr for structure
discipline only (hero → menu → story → contacts), not for its aesthetics.

## Sections

1. **Hero** — parchment ticket: fine-print ribbon (COUSCOUS · ALGERIAN KITCHEN ·
   САНКТ-ПЕТЕРБУРГ), display headline, split-flap board, stamp cluster animating
   in (ХАЛЯЛЬ, «Хорошее место 2026», 5,0★), engraved SPb↔Algiers skyline frieze
   (hand-drawn SVG: Петропавловский шпиль ↔ Макам Эшахид, dotted route), CTA
   stubs «Меню» / «Как добраться». Perforated tear edge into next section.
2. **Табло** (menu) — ink/chalkboard dark section. Departure-board rows: dish,
   weight, price (PT Mono), category groups Шаурма / Тарелки / Вегетарианское /
   Напитки. Verified compositions shown only for Питерская, Алжирская, Овощная.
   Footnote: menu/prices = Социалистическая branch per Yandex; Кропоткина differs.
3. **Атмосфера** — parchment; the two real interior photos as postcards with
   postmarks; chalk accent lines (Neucha) echoing their heart-covered board.
4. **Два терминала** — branch cards: address, tel: link, hours, rating+count,
   award badge, «Маршрут в Яндекс Картах» link to the org page.
5. **Footer** — ink; logo, Telegram first (@coucousdz), Instagram
   (@cafe_cous_cous), ticket-conditions fine print («Билет действителен
   ежедневно с 11:00»).

## Verified facts (sources: Yandex Maps orgs 26524829091 & 203444001790,
fetched 2026-08-02; brand flyer photo; prior verification 2026-08-01 incl. 2GIS)

- **Кропоткина 19/8** (угол Саблинской 8, этаж 1): +7 996 772-20-26,
  11:00–00:00, 5,0★ (2 011 оценок / 1 223 отзыва), «Хорошее место 2026».
- **Социалистическая 15** (пом. 2Н, цоколь): +7 911 786-30-26, 11:00–23:00
  (per Yandex 2026-08-02), 5,0★ (639 оценок / 415 отзывов), «Хорошее место
  2026». Metro: Звенигородская / Лиговский пр. / Владимирская.
- Exactly TWO branches. Ульяны Громовой 3 is a different business — never add.
- Menu (Социалистическая, Yandex menu tab 2026-08-02): Шаурма — Алжирская
  340₽/400г, Питерская (классическая) 290₽/350г, Французская 340₽/350г,
  «Гранат» 340₽/320г, Иорданская 410₽/350г, Такос куриный 380₽/350г, Такос MIX
  400₽/350г, Ватиканская 380₽/350г. Горячее — Алжирская тарелка 550₽/400г,
  Иорданская тарелка 580₽/400г, Шаурма на тарелке 450₽/400г. Вегетарианское —
  Овощная 290₽/300г. Фалафель «Усатого» 430₽/450г. Напитки и десерты от 120₽.
- Verified compositions (Кропоткина listing; brand-level recipes): Алжирская =
  лаваш, курица гриль, картофель фри, гауда, айсберг, томаты, алжирский соус;
  Питерская = лаваш, курица, огурцы, томаты, салат, соус; Овощная = лаваш,
  томаты, огурцы, салат, хумус, соус, фри. No invented descriptions elsewhere.
- Telegram @coucousdz listed BEFORE Instagram @cafe_cous_cous (IG restricted in RU).
- Халяль: stated by the client brief. Chalkboard drinks (эспрессо, американо,
  капучино, латте, какао, чай) visible in interior photo — list without prices.

## Look

- Palette (CSS vars): parchment `#EAD9AE`/`#F2E6C5`, warm ink `#191307`,
  engraving sepia `#6B5638`; accents used as chalk/stamps only: red `#E2543F`
  (their chalk hearts, primary accent), yellow `#E9B94D` (bulbs/stars), dusty
  blue `#86B9CC` (ceiling, tiny doses — postmarks).
- Type (all self-hosted via @fontsource, Cyrillic — Google Fonts CDN unreliable
  in RU): display **Oranienbaum** (Russian classicism engraving, SPb name);
  body **PT Serif**; ticket codes/prices **PT Mono**; chalk accents **Neucha**.
- Ornament: hand-drawn inline SVG only — zellige 8-point-star corners (muted
  flyer colors), perforation tear lines, stamps, skyline frieze. No stock, no
  emoji, no icon fonts.
- Motion (`motion` lib): one orchestrated hero load (stagger + stamp thuds),
  whileInView rises, split-flap; everything honors prefers-reduced-motion.

## Stack & production

Vite + React + TS, static single page, RU lang. Self-hosted fonts subset to
Cyrillic+Latin. Real photos: logo crop + 2 interiors from the client's own
Yandex profile (provided by user). SEO: title/description RU, OG card
(screenshot of hero), JSON-LD Restaurant ×2 (address, phone, hours,
aggregateRating, servesCuisine Algerian, sameAs). A11y: landmarks, contrast,
focus states, reduced motion. Perf: font preload, lazy images below fold,
no external requests at runtime. Output: dist/ + zip for hosting upload.
Facts live ONLY in src/data.ts; anything unverified is marked PLACEHOLDER.

## QA

Playwright screenshots desktop/mobile; then ultracode Workflow review —
parallel reviewers (design/AI-slop, facts-vs-this-spec, a11y, RU typography,
responsive/perf) with adversarial verification; fix confirmed findings.
