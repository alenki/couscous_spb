# Cous Cous SPb Site v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved two-act «Билет → в зал» site: parchment ticket hero → torn perforation → chalkboard cafe world, RU/EN, static, production-ready.

**Architecture:** Vite + React + TS single page. All facts and all UI strings live in `src/data.ts` as `{ ru, en }` pairs; a tiny `LangContext` picks the side. All ornament art is hand-drawn inline SVG in two component libraries (engraved for Act 1, chalk for Act 2). Sections are self-contained components composed in `App.tsx`.

**Tech Stack:** vite, react 18, typescript, `motion` (Framer Motion successor), @fontsource packages (oranienbaum, pt-serif, pt-mono, neucha), vitest for data-integrity tests, Playwright MCP for visual verification.

## Global Constraints

- Facts ONLY from `src/data.ts`; RU side copied verbatim from `git show 799ddba:src/data.ts`; EN is faithful translation; nothing invented (spec «Verified facts»).
- Exactly TWO branches; never add пер. Ульяны Громовой 3.
- Palette hexes verbatim from spec: parchment `#EAD9AE`/`#F2E6C5`, ink `#191307`, sepia `#6B5638`, board `#16130F`, chalk `#F2EFE6`, red `#E2543F`, yellow `#E9B94D`, green `#7FA85C`, blue `#86B9CC`, wood `#8A5A33`/`#6E4526`.
- Fonts self-hosted via @fontsource only (no Google CDN); subsets cyrillic+latin; display Oranienbaum, body PT Serif, mono PT Mono, chalk Neucha.
- Ornament: inline SVG only; no stock icons, no emoji in UI, no icon fonts.
- Zero external network requests at runtime (fonts/images local; only outbound `<a href>` links).
- Every animation has a `prefers-reduced-motion` fallback (fade or none).
- RU canonical: `<html lang="ru">` default, SEO meta RU; EN via client toggle persisted in localStorage.
- Telegram listed before Instagram everywhere.
- Commit after every task with the session trailer lines.

## File Structure

```
index.html                    — meta RU, JSON-LD ×2, font preloads (task 12)
public/                       — photos + chalk art restored from git HEAD (task 1)
src/main.tsx                  — mount + fonts import
src/styles.css                — CSS vars, base type, textures, utilities
src/data.ts                   — ALL facts + ALL strings, { ru, en }
src/lang.tsx                  — LangContext, useLang, <Lang> helper
src/components/SplitFlap.tsx  — split-flap word line
src/components/ornaments/engraved.tsx — Act 1 SVG art
src/components/ornaments/chalk.tsx    — Act 2 SVG art
src/components/Header.tsx     — logo mark + RU/EN passport-stamp toggle
src/components/Hero.tsx       — Act 1 ticket
src/components/Tear.tsx       — perforation transition
src/components/Menu.tsx       — chalkboard menu
src/components/Atmosphere.tsx — ceiling/bulbs/photos/stats
src/components/Branches.tsx   — two boarding stubs
src/components/Footer.tsx     — ink footer
src/data.test.ts              — vitest data-integrity tests
src/App.tsx                   — composition
```

---

### Task 1: Scaffold, assets, fonts

**Files:** Create `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html` (minimal for now), `src/main.tsx`, `src/styles.css` (empty shell), `src/App.tsx` (placeholder `<h1>COUSCOUS</h1>`). Restore binaries.

**Interfaces — Produces:** working `npm run dev`/`build`; photos at `/interior-counter.jpg`, `/interior-hall.jpg`, `/chalk-pin.png`, `/chalk-store.png`, `/logo-crop.png`.

- [ ] **Step 1:** Restore v1 binary assets from git (do NOT restore v1 sources):
  `git checkout HEAD~1 -- public/interior-counter.jpg public/interior-hall.jpg public/chalk-pin.png public/chalk-store.png public/logo-crop.png public/favicon.png public/apple-touch-icon.png public/robots.txt` (HEAD~1 = 799ddba after spec commit; verify hash first with `git log --oneline`).
- [ ] **Step 2:** Write `package.json` deps: react@^18.3, react-dom@^18.3, motion@^11; dev: vite@^6, @vitejs/plugin-react, typescript@~5.6, vitest@^2, @types/react, @types/react-dom, @fontsource/oranienbaum, @fontsource/pt-serif, @fontsource/pt-mono, @fontsource/neucha. Scripts: dev/build/preview/test (`vitest run`). `"type": "module"`.
- [ ] **Step 3:** Standard Vite React TS configs (target ES2022, strict, jsx react-jsx, moduleResolution bundler). `vite.config.ts`: `plugins: [react()]`.
- [ ] **Step 4:** `src/main.tsx` imports the four @fontsource css sets (400/700 where available, `cyrillic` + `latin` subset files explicitly) then `./styles.css`, renders `<App/>`.
- [ ] **Step 5:** Run `npm install && npm run build`. Expected: builds clean.
- [ ] **Step 6:** Commit `chore: scaffold vite react ts, restore client assets, self-hosted fonts`.

### Task 2: Design tokens & base styles

**Files:** Modify `src/styles.css`.

**Interfaces — Produces:** CSS custom props `--parchment`, `--parchment-hi`, `--ink`, `--sepia`, `--board`, `--chalk`, `--chalk-red`, `--chalk-yellow`, `--chalk-green`, `--chalk-blue`, `--wood`, `--wood-dark`, `--navy`, `--sky`, `--plaster`; classes `.font-display`, `.font-chalk`, `.font-mono`; `.grain` (parchment noise via layered radial-gradients, no images); `.act-parchment`, `.act-board` section wrappers; global reduced-motion kill-switch:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration .01ms !important; transition-duration .01ms !important; }
}
```

- [ ] **Step 1:** Write tokens (hexes from Global Constraints; `--navy:#1E2A4A; --sky:#7EC8E3; --plaster:#C9A6A0`), font stacks (`Oranienbaum, "PT Serif", serif` for display; `"PT Serif", Georgia, serif` body; `"PT Mono", monospace`; `Neucha, "PT Serif", cursive` chalk), fluid type scale via `clamp()`, selection color, focus-visible outlines (2px `--chalk-red`), scroll-behavior smooth (guarded by reduced-motion).
- [ ] **Step 2:** Temporarily render swatch rows in App, `npm run dev`, Playwright screenshot, confirm palette/type; remove swatches.
- [ ] **Step 3:** `npm run build` clean → commit `feat: design tokens, fonts, base styles`.

### Task 3: Data + language layer (TDD)

**Files:** Create `src/data.ts`, `src/lang.tsx`, `src/data.test.ts`.

**Interfaces — Produces:**
```ts
export type L<T = string> = { ru: T; en: T }
// data.ts re-exports v1 types (Dish, DishGroup, Branch, FlagKind) localized:
// Dish { name: L; weight: L; price: number; flag: FlagKind; desc?: L }
// DishGroup { title: L; dishes: Dish[] }
// Branch { terminal: L; area: L; address: L; addressNote?: L; metro?: L;
//          phone: string; phoneHref: string; hours: string; rating: string;
//          ratingsCount: L; yandexUrl: string; icon: string; iconAlt: L }
export const MENU: DishGroup[]; export const DRINKS: L<string[]>;
export const DRINKS_NOTE: L; export const MENU_SOURCE_NOTE: L;
export const BRANCHES: Branch[]; export const BRANCHES_SOURCE_NOTE: L;
export const REVIEW_STATS: { label: L; value: string }[]; export const REVIEW_STATS_NOTE: L;
export const SOCIAL: { label: string; handle: string; url: string }[];
export const AWARD: L; export const DESTINATIONS: L<string[]>;
export const UI: Record<string, L> // all section headings, CTAs, microcopy, footer fine print
// lang.tsx:
export function LangProvider({children}): JSX.Element // localStorage 'couscous-lang', default 'ru', sets document.documentElement.lang
export function useLang(): { lang: 'ru'|'en'; toggle(): void; t<T>(l: L<T>): T }
```

- [ ] **Step 1:** Write `src/data.test.ts` FIRST (vitest, node env):

```ts
import { describe, expect, test } from 'vitest'
import { MENU, BRANCHES, DRINKS, SOCIAL, DESTINATIONS, UI } from './data'

test('exactly two branches, never a third', () => {
  expect(BRANCHES).toHaveLength(2)
  expect(JSON.stringify(BRANCHES)).not.toMatch(/Громовой/i)
})
test('verified prices are intact', () => {
  const flat = MENU.flatMap(g => g.dishes)
  const price = (ru: string) => flat.find(d => d.name.ru === ru)?.price
  expect(price('Питерская (классическая)')).toBe(290)
  expect(price('Алжирская')).toBe(340)
  expect(price('Иорданская')).toBe(410)
  expect(price('Алжирская тарелка')).toBe(550)
  expect(price('Фалафель «Усатого»')).toBe(430)
  expect(flat).toHaveLength(13)
})
test('only the three verified dishes have compositions', () => {
  const withDesc = MENU.flatMap(g => g.dishes).filter(d => d.desc).map(d => d.name.ru)
  expect(withDesc.sort()).toEqual(['Алжирская', 'Питерская (классическая)', 'Шаурма овощная'].sort())
})
test('every localized string has both non-empty sides', () => {
  const seen: string[] = []
  const walk = (v: unknown, path: string) => {
    if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>
      if ('ru' in o && 'en' in o) {
        const ok = (x: unknown) => (Array.isArray(x) ? x.length > 0 : typeof x === 'string' && x.trim() !== '')
        if (!ok(o.ru) || !ok(o.en)) seen.push(path)
        return
      }
      Object.entries(o).forEach(([k, x]) => walk(x, `${path}.${k}`))
    }
  }
  walk({ MENU, DRINKS, DESTINATIONS, UI, BRANCHES }, '$')
  expect(seen).toEqual([])
})
test('telegram before instagram', () => {
  expect(SOCIAL[0].label).toBe('Telegram')
})
```

- [ ] **Step 2:** `npx vitest run` → FAIL (module missing).
- [ ] **Step 3:** Write `src/data.ts`: RU strings verbatim from `git show 799ddba:src/data.ts`; EN per spec translation table; `UI` dict covering: nav labels, hero ribbon, headline «Ваш билет в мир кухни»/“Your ticket to the world of the kitchen”, stamps (ХАЛЯЛЬ/HALAL etc.), tear microcopy «линия отрыва»/“tear here”, section headings (Меню/Menu, Атмосфера/The room, Куда прибыть/Where to arrive, footer «Билет действителен ежедневно с 11:00»/“Ticket valid daily from 11:00”), CTA labels, `MENU_SOURCE_NOTE`, alt texts for both interior photos. DESTINATIONS: ru `['АЛЖИР','ПАРИЖ','АММАН','ВАТИКАН','ПЕТЕРБУРГ']`, en `['ALGIERS','PARIS','AMMAN','VATICAN','PETERSBURG']`.
- [ ] **Step 4:** Write `src/lang.tsx` (context + localStorage + `document.documentElement.lang = lang`).
- [ ] **Step 5:** `npx vitest run` → PASS; `npm run build` clean.
- [ ] **Step 6:** Commit `feat: bilingual data layer with integrity tests`.

### Task 4: Engraved ornaments (Act 1 art)

**Files:** Create `src/components/ornaments/engraved.tsx`.

**Interfaces — Produces:** `ZelligeCorner({flip?})`, `SkylineFrieze()` (SPb left: Петропавловский шпиль + dome; dotted arc route; Algiers right: Makam Echahid three fins + minaret + two palms; all 1.5px sepia strokes, `pathLength` set for draw-in), `Stamp({children, tone: 'red'|'sepia', rotate?})` (double ring, inner text slot, rough edge via stroke-dasharray), `KingMark({size?})` (split-face circle: left parchment/right ink halves re-drawn as simplified SVG of the logo — crown left, feathered hat right; if fidelity is poor use `<img src="/logo-crop.png">` inside a circle instead — decide by screenshot), `PerforationEdge()` (row of circles cut from parchment), `TicketStub({children, href})` — CTA styled as ticket stub with notched corners and dashed left edge.

- [ ] **Step 1:** Implement; every path hand-authored viewBox art, stroke `var(--sepia)`.
- [ ] **Step 2:** Render all in a temporary gallery route in App; screenshot desktop; judge silhouettes readable at 50%; iterate once.
- [ ] **Step 3:** Build clean; commit `feat: engraved SVG ornament library`.

### Task 5: Chalk ornaments (Act 2 art)

**Files:** Create `src/components/ornaments/chalk.tsx`.

**Interfaces — Produces:** `ChalkHeart({tone?: 'red'|'white', size?})`, `ChalkFlag({kind: FlagKind})` (12×9 hand-wobbly flags: ru tricolor, dz crescent+star halves, fr/jo/va simplified, pomegranate fruit, leaf, moustache — 2px chalk strokes, slight rotation each), `Bunting({width?})` (string + alternating red/chalk/yellow/blue triangles), `Bulb({delay?})` (cord + teardrop glass + warm radial glow `#E9B94D`→transparent, CSS sway keyframes), `MandalaDisc({size?})` (navy disc, inner mandala: 3 concentric pattern rings using red/yellow/green/blue/plaster segments + sky-blue wave arcs around; slow CSS rotate 240s on inner group), `ChalkRule()` (wobbly horizontal divider), `ChalkArrow()`.

- [ ] **Step 1:** Implement; strokes `var(--chalk)` with `stroke-linecap="round"`, opacity .92, `filter: url(#chalk-rough)` optional feTurbulence (skip if perf/visual noise — judge by eye).
- [ ] **Step 2:** Gallery screenshot on `--board` background; iterate once; remove gallery.
- [ ] **Step 3:** Build clean; commit `feat: chalk SVG ornament library`.

### Task 6: SplitFlap

**Files:** Create `src/components/SplitFlap.tsx`.

**Interfaces — Produces:** `SplitFlap({ words: string[], intervalMs?: number })` — pads to longest word; per-letter card with top/bottom halves; flip = top half rotateX 0→-90 (old letter) then bottom -90→0 (new letter), 90ms stagger per column, cycle every `intervalMs` (default 2600); letters in PT Mono uppercase on ink cards with parchment text; `prefers-reduced-motion` (via `useReducedMotion` from motion) → crossfade only. Cleanup timers on unmount; pause when tab hidden (`document.visibilitychange`).

- [ ] **Step 1:** Implement with plain state + CSS 3D (no per-frame JS).
- [ ] **Step 2:** Temp render with RU destinations; screenshot mid-flip; verify no layout shift (fixed `ch`-based width).
- [ ] **Step 3:** Build; commit `feat: split-flap destination line`.

### Task 7: Header + language toggle

**Files:** Create `src/components/Header.tsx`.

**Interfaces — Consumes:** `useLang`, `KingMark`, `UI`. **Produces:** `<Header/>` absolute over hero: left `KingMark` + wordmark COUSCOUS (Oranienbaum, letterspaced) + «ALGERIAN KITCHEN» fine print; right: passport-stamp toggle — round dashed-border stamp reading the OTHER lang (`EN`/`RU`), on click rotates -8° with a thud (motion spring) and switches; `aria-pressed`, `aria-label` («Switch to English»/«Переключить на русский»); nav anchor links Меню · Адреса (PT Mono small caps).

- [ ] **Step 1:** Implement; **Step 2:** screenshot both lang states; **Step 3:** build, commit `feat: header with passport-stamp language toggle`.

### Task 8: Hero (Act 1)

**Files:** Create `src/components/Hero.tsx`; modify `src/App.tsx` (compose Header+Hero).

**Interfaces — Consumes:** engraved lib, SplitFlap, UI, AWARD. **Produces:** `<Hero/>` full-viewport parchment `.act-parchment.grain`; layout (desktop): centered column — fine-print ribbon, king mark, «Ваш билет в мир кухни» (clamp 44→84px Oranienbaum, «мир кухни» on second line with engraved underline flourish), boarding row `САНКТ-ПЕТЕРБУРГ → <SplitFlap/>` (PT Mono labels ОТПРАВЛЕНИЕ/НАПРАВЛЕНИЕ), stamp cluster right-of-headline on ≥1024 (absolute, rotated -12°/6°/-4°: ХАЛЯЛЬ red, 5,0★ + «2 650+ оценок» sepia, «Хорошее место 2026» red ring), two `TicketStub` CTAs, `SkylineFrieze` bottom full-width, `ZelligeCorner` in all four corners. Orchestrated load via motion variants: corners fade 0s → frieze draw (pathLength 0→1, 1.2s) → headline rise+fade (.5s, stagger .08) → stamps scale 1.4→1 with rotation settle («thud», spring, stagger .15) → flaps start. Mobile: stamps become a horizontal row under CTAs.

- [ ] **Step 1:** Implement. **Step 2:** dev screenshots 1440 + 390, both langs; iterate composition once (spacing, stamp overlap legibility). **Step 3:** build; commit `feat: act 1 ticket hero with orchestrated load`.

### Task 9: Tear transition

**Files:** Create `src/components/Tear.tsx`.

**Interfaces — Produces:** `<Tear/>` ~140px band between acts: parchment top with `PerforationEdge`, «✂ линия отрыва» PT Mono microcopy (scissors = own tiny SVG, not emoji), torn-paper lower edge (jagged SVG polygon filled parchment over `--board`); scroll-linked: `useScroll` + `useTransform` — as band crosses viewport, top strip translates/rotates slightly (-2°) like lifting, board darkness reveals beneath; reduced-motion → static torn edge.

- [ ] **Step 1:** Implement. **Step 2:** scroll-through screenshots at 3 offsets. **Step 3:** build; commit `feat: scroll-linked ticket tear`.

### Task 10: Menu chalkboard (Act 2)

**Files:** Create `src/components/Menu.tsx`.

**Interfaces — Consumes:** chalk lib, MENU, DRINKS, DRINKS_NOTE, MENU_SOURCE_NOTE, UI. **Produces:** `<Menu id="menu"/>` on `.act-board`: `Bunting` across top; heading «МЕНЮ» in Neucha yellow chalk with red `ChalkHeart`s flanking; two-column board ≥900px (Шаурма | Тарелки+Без мяса+Напитки), one column mobile; group titles green chalk Neucha; dish rows: `ChalkFlag` + name (Neucha chalk white 20px) + dotted leader + weight (PT Mono sepia-on-board? no — chalk dim .6) + price `290 ₽` PT Mono chalk; verified `desc` lines under their three dishes in dimmed chalk 14px; drinks as inline chalk list + note; `chalk-pin.png`/`chalk-store.png` NOT here (they belong to branches); random-ish scattered `ChalkHeart`s (fixed positions, not Math.random — SSR/determinism); `MENU_SOURCE_NOTE` footnote PT Mono 12px dim. whileInView: each group's items draw in stagger (opacity+y 8px), hearts pop scale 0→1.
  EN prices keep `₽` (`290 ₽`); EN weights `350 g`.

- [ ] **Step 1:** Implement. **Step 2:** screenshots both widths/langs; verify AA contrast (chalk dim ≥ #A9A398 on #16130F). **Step 3:** vitest still green, build; commit `feat: chalkboard menu`.

### Task 11: Atmosphere + Branches + Footer

**Files:** Create `src/components/Atmosphere.tsx`, `src/components/Branches.tsx`, `src/components/Footer.tsx`.

**Interfaces — Consumes:** chalk lib, BRANCHES, REVIEW_STATS(+NOTE), SOCIAL, AWARD, UI, photos. **Produces:**
- `<Atmosphere/>`: stays on board bg → wood-plank band (CSS repeating-linear-gradient planks + subtle inner shadow): `MandalaDisc` + 3 `Bulb`s hanging over section title «Атмосфера/The room»; the two photos in thin wood frames, slight rotations (-1.5°/1°), lazy `loading="lazy"` with width/height; caption strip; halal + Algerian-kitchen paragraph (PT Serif on parchment card); `REVIEW_STATS` as three chalk circles (value big Neucha, label small) + note.
- `<Branches id="branches"/>`: board bg; two `TicketStub`-derived parchment boarding-pass cards: `ТЕРМИНАЛ 1/2` PT Mono, area, address (Oranienbaum 28px), addressNote, metro (if present), hours row with tiny clock SVG, tel: link (PT Mono, underline on hover), rating «5,0★» + ratingsCount, `AWARD` red stamp mini, chalk icon img (`chalk-pin.png`/`chalk-store.png`), CTA link «Маршрут в Яндекс Картах»/“Route in Yandex Maps” (target _blank rel noopener); BRANCHES_SOURCE_NOTE under grid.
- `<Footer/>`: ink `#191307`; king mark; SOCIAL links Telegram then Instagram (PT Mono, handles); fine print ticket conditions + «Сайт использует данные Яндекс Карт, август 2026»; no invented legal entity.

- [ ] **Step 1:** Implement all three. **Step 2:** screenshots. **Step 3:** build; commit `feat: atmosphere, branches, footer`.

### Task 12: SEO, JSON-LD, meta, robots, OG

**Files:** Modify `index.html`; create `public/og.jpg` (from hero screenshot 1200×630); verify `public/robots.txt`.

- [ ] **Step 1:** `index.html`: `lang="ru"`, title «Cous Cous — алжирская кухня и халяль-шаурма в Санкт-Петербурге», meta description (два адреса, 5,0★ на Яндекс Картах), theme-color `#EAD9AE`, OG/Twitter card tags → `/og.jpg`, icons, preload woff2 for Oranienbaum 400 + Neucha 400 (exact @fontsource file paths), JSON-LD: two `Restaurant` objects with address, geo omitted (not verified), telephone, openingHoursSpecification (Mo-Su 11:00-00:00 / 11:00-23:00), aggregateRating (5.0, ratingCount 2011 / 639), servesCuisine «Алжирская», acceptsReservations false omitted, sameAs [t.me, instagram, both yandex org urls], parentOrganization Couscous.
- [ ] **Step 2:** Playwright: screenshot hero at 1200×630, save as `public/og.jpg` (jpeg q85).
- [ ] **Step 3:** `npm run build` + `npm run preview`; screenshot; commit `feat: seo meta, json-ld, og card`.

### Task 13: Responsive & polish pass

**Files:** Modify any component + `styles.css`.

- [ ] **Step 1:** Playwright sweep: 1440/1024/768/390 widths × ru/en × light only; fix overflow, type scale, stamp collisions, tap targets ≥44px, keyboard focus order.
- [ ] **Step 2:** `npx vitest run` + build clean.
- [ ] **Step 3:** Commit `fix: responsive polish across breakpoints`.

### Task 14: QA gate (ultracode Workflow) + fixes + ship

- [ ] **Step 1:** Serve `dist` via `npm run preview`; capture fresh full-page screenshots (desktop+mobile, ru+en) to scratchpad.
- [ ] **Step 2:** Run ultracode Workflow per spec QA gate: parallel reviewers — (a) design/AI-slop vs README aesthetics + HEP bar, (b) facts vs spec/data.ts (feed both), (c) a11y, (d) RU + EN typography/copy, (e) responsive/perf/code — each returns structured findings; adversarial verify each finding (refuter agents); fix confirmed findings; re-screenshot.
- [ ] **Step 3:** Final `vitest` + `build`; commit `fix: confirmed QA findings`; final commit of dist is NOT committed (dist gitignored).
- [ ] **Step 4:** Update memory files (couscous-spb-site: v2 shipped, concept, RU/EN; design-taste unchanged unless new signal). Send final summary + screenshots to user.

## Self-Review

- **Spec coverage:** hero/tear/menu/atmosphere/branches/footer → tasks 8–11; split-flap → 6; bilingual → 3,7; look/tokens → 2,4,5; motion → 6,8,9,10,11; facts → 3 (tests); SEO/perf/a11y → 12,13; QA gate → 14. Gaps: none found.
- **Placeholder scan:** none; visual iteration steps intentionally say "judge by screenshot" — that is the test cycle for art, not a TBD.
- **Type consistency:** `L<T>`, `useLang`, ornament names cross-checked between tasks 3–11.
