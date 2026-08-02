# Cous Cous SPb — site v2 design («Билет → в зал»)

Date: 2026-08-02. Supersedes 2026-08-02-couscous-site-design.md (v1, ticket-only
parchment execution). User feedback driving v2: the cafe is **not luxury or
minimalistic** — it is a warm, loud, vintage eatery; the site must carry the vibe
of their actual room, at the creative level of hepvintageclub.it (Awwwards
Honors) with the polish of restaurantgem.com. User approved this design and the
two decisions below in-session; then said “don’t ask any more questions” —
remaining execution is autonomous.

Decisions made with the user:
1. **Concept: «Ticket → into the room»** (chosen over “room-only” and
   “vintage poster club”).
2. **Language: RU + EN toggle.** RU canonical/default; EN is a faithful
   translation, never invention; tricky names transliterated.

## Concept

The site is a journey in two acts told with the cafe’s own two artifacts:

- **Act 1 — the Ticket**: their parchment flyer world («Ваш билет в мир кухни
  COUSCOUS», engraved Algiers/SPb landmarks, zellige corners, split-face king).
- **Act 2 — the Room**: their actual interior — near-black chalkboard menu
  handwritten in colored chalk with hearts and country flags, pine planks,
  triangle bunting, Edison bulbs, sky-blue sculpted ceiling with navy disc and
  colorful mandala, Algerian flag.

Scrolling is the trip: board in engraved parchment Petersburg → tear the ticket
along a perforation → arrive inside the warm dark cafe. Light and dark themes
coexist in one page because the place itself is both.

Two signature devices, everything else quiet:
1. **Split-flap destination line** in the hero (dishes are named after
   countries): АЛЖИР → ПАРИЖ → АММАН → ВАТИКАН → ПЕТЕРБУРГ.
2. **The ticket tear** — scroll-linked perforated «линия отрыва» where the
   parchment rips away to reveal the chalkboard world.

## Sections (single page)

1. **Hero — the Ticket (parchment).** Grain + zellige 8-point-star corners
   (muted flyer colors); split-face king logo; fine-print ribbon COUSCOUS ·
   ALGERIAN KITCHEN · САНКТ-ПЕТЕРБУРГ; display headline «Ваш билет в мир
   кухни»; split-flap line; stamp cluster thudding in (ХАЛЯЛЬ, 5,0★, «Хорошее
   место 2026»); engraved SPb↔Algiers skyline frieze with dotted route along
   the bottom; CTAs as tear-off stubs «Меню» / «Как добраться». Header: logo
   mark + RU/EN passport-stamp toggle.
2. **The tear.** Perforated edge, ✂ + «линия отрыва / tear here» microcopy;
   parchment edge rips open into the dark section on scroll.
3. **Menu — the Chalkboard (near-black).** Handwritten colored chalk like their
   real board: white items, red hearts scattered, yellow/green chalk category
   headings, tiny hand-drawn country flags by dish names, PT Mono prices.
   Groups: Шаурма / Тарелки / Без мяса / Напитки. Full verified menu below.
   Their chalk drawings (pin, storefront) as corner art; bunting garland on
   top. Footnote: menu/prices = Социалистическая, Кропоткина differs.
4. **Atmosphere — the Room.** Ceiling motif as section ornament: navy disc +
   mandala + sky-blue waves + dusty pink; SVG Edison bulbs hang, sway, glow.
   The two real interior photos framed like pictures on their plank wall.
   Short honest copy (Algerian kitchen in SPb, halal); coffee list from the
   board WITHOUT prices (эспрессо, американо, капучино, латте, какао, чай);
   review stats 93/100/90 with source note.
5. **Two addresses — boarding stubs.** Кропоткина 19/8 (угол Саблинской;
   11:00–00:00; +7 996 772-20-26; 5,0★ · 2 011 оценок) and Социалистическая 15,
   цоколь (11:00–23:00; +7 911 786-30-26; 5,0★ · 639 оценок; м. Звенигородская /
   Лиговский пр. / Владимирская), «Хорошее место 2026» badges, Yandex route
   links. EXACTLY TWO branches — Ульяны Громовой 3 is a different business.
6. **Footer — ink.** Split-face logo; Telegram FIRST (@coucousdz), Instagram
   second (@cafe_cous_cous) — IG restricted in RU; ticket-conditions fine print
   «Билет действителен ежедневно с 11:00».

## Look

- **Palette (CSS vars, from their materials):** Act 1 parchment `#EAD9AE` /
  `#F2E6C5`, warm ink `#191307`, engraving sepia `#6B5638`. Act 2 chalkboard
  `#16130F`, chalk white `#F2EFE6`. Chalk accents: red `#E2543F` (hearts,
  primary), yellow `#E9B94D`, green `#7FA85C`, dusty blue `#86B9CC`. Wood
  browns `#8A5A33`/`#6E4526`. Ceiling navy/sky/dusty-pink only in section 4.
- **Type (self-hosted @fontsource, Cyrillic+Latin subsets; no Google CDN — RU
  reliability):** display **Oranienbaum**; body **PT Serif**; prices/codes
  **PT Mono**; chalk **Neucha** (covers Latin for EN too).
- **Ornament:** hand-drawn inline SVG ONLY — zellige stars, perforation,
  stamps, skylines, chalk hearts/flags/bunting, bulbs, mandala. No stock, no
  emoji, no icon fonts.

## Motion (`motion` lib)

One orchestrated hero load: frieze strokes draw → headline rises → stamps thud
(slight rotation) → flaps flip. Scroll: ticket tear; chalk self-drawing
(stroke-dashoffset) on entry; hearts pop stagger; bulbs pendulum + warm
flicker; mandala rotates imperceptibly. `prefers-reduced-motion` → plain fades.

## Bilingual RU/EN

- RU canonical, default, `lang="ru"`; toggle flips `lang` + persists in
  localStorage; styled as passport stamp.
- One typed dictionary in `src/data.ts`: every user-facing string has
  `{ ru, en }` side by side. No i18n framework.
- EN menu names are translations of country adjectives (Алжирская → Algerian,
  Питерская (классическая) → Petersburg classic, Французская → French,
  «Гранат» → “Pomegranate”, Иорданская → Jordanian, Ватиканская → Vatican,
  Такос куриный → chicken tacos, Такос MIX → tacos MIX, тарелка → plate,
  Шаурма овощная → veggie shawarma, Фалафель «Усатого» → Falafel “Usatogo”
  (transliterated — brand name)). Compositions translate literally (лаваш →
  lavash, курица гриль → grilled chicken, …). SEO meta stays RU.

## Verified facts (sources: Yandex Maps orgs 26524829091 & 203444001790,
fetched 2026-08-02; brand flyer; 2GIS check 2026-08-01)

All published facts live ONLY in `src/data.ts`. The full verified dataset
(menu with prices/weights/flags, three verified compositions, drinks list,
branch cards, review stats 93/100/90 of 415 отзывов, socials, award, totals)
is recovered from v1 `git show 799ddba:src/data.ts` and reused verbatim as the
RU side. Unverifiable additions are forbidden; anything new must be marked
PLACEHOLDER. Compositions shown only for Питерская, Алжирская, Овощная.

## Stack & production

Vite + React + TS, static single page; `motion` for animation; self-hosted
subset fonts preloaded; images lazy below the fold with dimensions; zero
external runtime requests; OG card; JSON-LD `Restaurant` ×2 (address, phone,
hours, aggregateRating, servesCuisine Algerian, sameAs incl. both socials);
favicon + apple-touch from logo; robots.txt. A11y: landmarks, alt text,
focus-visible, AA contrast, reduced motion. Assets: logo crop, 2 interiors,
2 chalk drawings restored from git HEAD into `public/`.

## QA gate before “done”

`npm run build` clean → Playwright screenshots desktop (1440) + mobile (390),
both languages → ultracode Workflow review: parallel reviewers (design/AI-slop,
facts-vs-this-spec, a11y, RU+EN typography, responsive/perf) + adversarial
verification of each finding → fix confirmed findings → final screenshots.
