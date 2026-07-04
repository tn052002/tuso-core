# TUSO Core

TUSO Core is a Next.js prototype for exploring the TUSO product direction. The current working experience lives on `/web`: a bilingual I Ching question-and-casting flow built around a breathing compass, a captured question, and primary/moving hexagram reveal cards.

This document summarizes the current codebase for product and design handoff.

## Update Notes

### 2026-07-04 12:10 +07 - Sheet Interaction Model

- `/web/test` now exercises the real `AppShell`, `SheetHost`, `Compass`, and Zustand sheet state instead of a standalone mock shell.
- Top/left and bottom/right sheets support `hidden`, `collapsed`, `half`, and `full` modes with controller UI for visual testing.
- When both sheets are visible, opening one sheet as `full` collapses the other sheet and the full sheet occupies the remaining screen space.
- The real `/web` ask flow now opens the casting sheet in `half` mode through `bottomSheet`, using the same shell-driven sheet behavior.

### 2026-07-04 11:58 +07 - Compass Prompt And Date Placement

- The breathing prompt now appears above the compass in the top half, preserving the gold eyebrow visual treatment.
- The current date now appears above the question title in the bottom half, preserving the smaller muted date visual treatment.
- `TopBar.tsx` now focuses on brand and language controls; `Compass.tsx` owns the compass prompt; `QuestionForm.tsx` owns the localized date display.

## Current Routes

- `/` is a visual direction and moodboard reference page.
- `/app` is still a placeholder route.
- `/web` is the active Oracle landing and casting experience.
- `/web/test` is the shell visual test route for top/bottom regions and top/bottom sheet modes.

## Product Experience On `/web`

The `/web` page is a full-screen two-panel experience:

- Left/top panel: TUSO brand, language toggle, breathing prompt, and breathing compass.
- Right/bottom panel: current date, question prompt, textarea, CTA, and the casting sheet.
- The user can ask a question or leave the field empty. Empty questions use a localized default question.
- Clicking the CTA opens a half-height sheet for casting.
- Each cast produces one I Ching line after a short loading pause.
- Six casts form the primary hexagram.
- If any line is moving, the changing hexagram is calculated and shown on the second card.
- If there are no moving lines, the moving card remains a skeleton and is labeled as no moving.
- After the final reveal, the primary card auto-flips once to show the traditional description.
- Completed hexagram cards can be flipped manually. The primary and moving card flip states are independent.
- Language can be toggled between English and Vietnamese from the compass topbar.

## Code Organization

```text
app/
  layout.tsx                 Root app shell and metadata
  globals.css                Global visual system and shared route styles
  page.tsx                   Moodboard / visual direction route
  app/page.tsx               Placeholder app route
  web/
    page.tsx                 /web route entry
    WebOracle.tsx            /web store-to-shell composition bridge
    web.css                  /web-only layout, animation, and component styles
    shell/
      AppShell.tsx           Living app shell: top half, bottom half, sheets
      TopHalf.tsx            Top screen container
      BottomHalf.tsx         Bottom screen container
      SheetHost.tsx          Generic top/bottom sheet container
      sheetTypes.ts          Sheet modes and active context types
    components/
      TopBar.tsx             Brand and language toggle
      Compass.tsx            Interactive breathing compass and breathing prompt
      QuestionForm.tsx       Current date, question prompt, textarea, main CTA
      CastingSheet.tsx       Casting panel, metadata, cards, cast CTA
      HexagramCard.tsx       Flip-card container for one hexagram
      HexagramLines.tsx      Six-line visual renderer
    store/
      useTusoStore.ts        Zustand app state, actions, runtime timers
      selectors.ts           Derived presentation state
      persistence.ts         local/session storage IO
    i18n/
      locales.ts             UI copy for en/vi
      hexagrams.ts           Hexagram names/descriptions for en/vi
    lib/
      date.ts                Locale-aware date formatting
      iching.ts              Cast math, King Wen lookup, line classes
```

## Presentation Layer

Presentation is split between `/app/web/shell`, `/app/web/components`, and `/app/web/web.css`.

- `WebOracle.tsx` connects Zustand state to localized copy, derived selectors, and shell slots.
- `AppShell.tsx` is the living object container. It owns the stable screen regions: top half, bottom half, top sheet, and bottom sheet.
- `TopHalf.tsx` holds the topbar and compass region.
- `BottomHalf.tsx` holds contextual bottom content.
- `SheetHost.tsx` provides top/bottom sheet positions and sheet modes: hidden, collapsed, half, full.
- `TopBar.tsx` renders brand and language toggle.
- `Compass.tsx` renders the compass ring, breathing prompt, breathing dot, and breathing cues.
- `QuestionForm.tsx` renders the current date and user prompt area.
- `CastingSheet.tsx` renders the casting workflow panel and action button.
- `HexagramCard.tsx` renders each flippable hexagram card.
- `HexagramLines.tsx` renders the six bars from bottom to top using line classes from `iching.ts`.
- `web.css` owns the full-screen responsive layout, sheet transitions, compass breathing/capture animations, hexagram skeletons, cast spinner, and card flip animation.

The visual direction is quiet, dark, instrument-like, and compass-led. Key palette variables come from global CSS: Midnight Blue, Polaris Gold, Stone, Dawn Blue, and related neutrals.

## Data Layer

There is no backend yet. All current data is local and client-side.

- `i18n/locales.ts` contains UI copy for `en` and `vi`.
- `i18n/hexagrams.ts` contains localized hexagram names and descriptions.
- `store/persistence.ts` is the storage boundary for data that can later move to a server database.
- `lib/iching.ts` contains the structural I Ching data and logic:
  - line types: `yin`, `yang`, `moving-yin`, `moving-yang`
  - random line casting
  - changing line values
  - King Wen hexagram table lookup
  - CSS class generation for rendered lines
- `lib/date.ts` formats topbar and cast timestamps by locale.

Current persistence uses browser storage:

- Selected locale is stored under `tuso-web-locale`.
- Casting session is stored under `tuso-web-casting-session` in both `localStorage` and `sessionStorage`.
- Zustand hydrates from browser storage on `/web` load.
- Runtime-only animation state and timer refs are not persisted.

## State Model

The main state engine is `store/useTusoStore.ts`, powered by Zustand.

Shell state:

- `topSheet`: hidden, collapsed, half, or full.
- `bottomSheet`: hidden, collapsed, half, or full.
- `activeContext`: question, casting, or result.
- The current UI maps the question prompt to the bottom half and the casting workflow to the bottom sheet.

Core state:

- `asked`: whether the casting sheet is open.
- `question`: raw question text from the textarea.
- `castTime`: timestamp captured when the sheet opens.
- `lines`: cast line results, filled from 0 to 6.
- `isCasting`: true while a single line is being cast.
- `isRevealing`: true during the final forming pause after six lines.
- `isRevealed`: true once final hexagram results should be visible.
- `isReleasing`: short state for returning the compass from capture glow to breathing.
- `hasHydrated`: true after Zustand has loaded browser storage.
- `flippedHex`: independent flip state for primary and moving hexagram cards.

Derived state:

Derived presentation data lives in `store/selectors.ts`.

- `capturedQuestion`: trimmed question or localized default question.
- `mainHexagram`: primary hexagram calculated from the six original line values.
- `changedHexagram`: calculated from changing values only when moving lines exist.
- `displayMainHexagram`: hidden until final reveal completes.
- `displayChangedHexagram`: hidden until final reveal completes and moving lines exist.
- `mainTitle` and `changedTitle`: localized live labels such as Ready, line result, Forming, No Moving, or final hexagram name.

Timed behavior:

- Each cast takes `1500ms`.
- After six lines, final forming pause takes `2500ms`.
- Compass release animation runs for `900ms`.
- Primary card auto-flips `500ms` after reveal.
- Timer refs live outside persisted data inside the store module.

## Interaction Flow

1. User lands on `/web`.
2. Compass breathes continuously.
3. User enters a question or leaves the field empty.
4. User clicks the main CTA.
5. Casting sheet opens and captures the current date/time and question.
6. User clicks Cast/Gieo six times.
7. Each click adds one line from bottom to top.
8. After the sixth line, UI enters Forming state.
9. Final primary hexagram appears.
10. Moving hexagram appears only when moving lines exist.
11. Primary card flips automatically once, then cards remain manually flippable.
12. Final CTA text changes to the localized meaning prompt.

## Localization Notes

The `/web` route is currently locale-ready for English and Vietnamese.

- UI labels live in `app/web/i18n/locales.ts`.
- Hexagram names and descriptions live in `app/web/i18n/hexagrams.ts`.
- The language toggle is local to `/web` and persisted in browser storage.
- Vietnamese copy uses proper accents.
- `app/layout.tsx` still declares `<html lang="en">`; if locale becomes app-wide later, this should move to a dynamic app-level i18n strategy.

## Product Handoff Notes

- The current `/web` page is a client-only prototype. It does not call an API and does not create user accounts.
- Casting results are random in the browser and stored locally.
- The final CTA has updated text but no next screen or interpretation workflow yet.
- The `/app` route is not implemented beyond a placeholder.
- The route-local component split is a good base for the new TUSO vision: product can evolve the Oracle flow, interpretation flow, onboarding, or app shell without editing one large page file.
- The next likely product decision is what happens after the final CTA: personalized interpretation, saved reading, account creation, or a deeper TUSO blueprint flow.

## Development

```bash
npm install
npm run dev
npm run build
```

The active implementation can be reviewed at `http://localhost:3000/web` when the dev server is running.
