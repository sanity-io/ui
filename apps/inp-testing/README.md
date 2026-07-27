# INP testing

Compares interaction responsiveness between `@sanity/ui` v3 and `@sanity-labs/ui-poc`.

INP (Interaction to Next Paint) is a Google Core Web Vital. It measures the delay between a user action — click, tap, key press — and the screen visibly reacting. Google's scoring: good is 200 ms or less, poor is over 500 ms.

## How it works

Two near-identical pages, one per library:

- `/` — UI POC
- `/ui3` — Sanity UI v3

Each page has six test sections. Every control is wired to React state, so a click forces the library to re-render real UI. The sections differ in how much UI one click redraws (the "blast radius"):

1. **Single control** — a switch and radios that re-render only themselves. Baseline.
2. **Select all (200 rows)** — one checkbox re-renders 200 checkbox rows.
3. **Tone toggle (500 cards)** — one button changes a style prop (`tone`) on 500 cards. This targets the styling engine, which is where the two libraries differ most: v3 computes styles in the browser during render; the POC's styles are prebuilt CSS.
4. **Panel swap (300 cards)** — one button mounts or unmounts 300 cards, like opening a pane or dialog.
5. **Tooltip mount (300 tooltips)** — one button mounts or unmounts 300 tooltip-wrapped buttons. Deliberately skips simulating interactions because the Popover API only allows one tooltip to be visible at a time in the POC.
6. **Popover mount (300 popovers)** — one button mounts or unmounts 300 popover-wrapped buttons. Same Popover API restrictions as tooltip.

A monitor in the bottom-right corner shows:

- **Last interaction** — the number to compare while clicking around.
- **Page INP** — the page's official score (its worst interaction so far).
- **Interactions** — how many have been measured.

The monitor is plain HTML and updates after each interaction has painted, so it does not affect the numbers.

## Test protocol

1. Build and serve a production build: `pnpm build && pnpm preview` (or use the Vercel deployment). Dev mode (`pnpm dev`) works but inflates numbers — React does extra checking work in dev. Only compare like with like.
2. In Chrome DevTools → Performance, set CPU throttling to 4x or 6x. On a fast laptop both libraries look instant; throttling simulates the slower machines where differences matter.
3. Load one library's page. Click each section's control 5 times, noting "Last interaction" each time. Sections 4, 5 and 6 alternate mount/unmount — note both.
4. Reload, repeat for the other library's page. INP is scored per page load, so switching libraries via the nav (a full page load) also resets the session.
5. Record the median per section per library.

Test sizes (`ROW_COUNT`, `TONE_CARD_COUNT`, `PANEL_CARD_COUNT`, `TOOLTIP_COUNT`, `POPOVER_COUNT`) are constants at the top of each route file. Keep both files in sync when changing them.

## Caveats

- Numbers vary by machine, browser, and throttling level. Compare libraries within one session, not across sessions.
- The browser rounds interaction durations to 8 ms steps and ignores anything under 16 ms — at high speed, differences can hide below that floor. Throttle harder or raise the counts.
- This measures interaction latency only. First-render speed is covered by the sibling `mount-testing` app.
