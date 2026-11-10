# Taste: judgment for Sanity UI 5

Read this file when you choose a tone, set density or spacing, pick between two components that both work, or review UI for quality. The docs say what is correct. This file says what is good.

## Contents

- The Sanity stance
- Tone and color
- Spacing and density
- Component choice
- Build with the grain
- When the docs and this file disagree

## The Sanity stance

- **Restraint is the discipline.** There is one good way to do a thing, not five. When two patterns both work, the simpler one is the Sanity one. Range comes from composing primitives, not from reaching for more components.
- **The base is a white wall.** A near-monochrome base makes one bold move count. Ration the accent. A toned or colored element should mean something. If everything is colored, nothing reads.
- **The system fails quietly in a few places.** A missing stylesheet import leaves the page unstyled. A prop spread from a loosely typed object skips type checking. Most other wrong props are type errors in v5, so `tsc --noEmit` catches them. Knowing what each primitive accepts is the discipline. `silent-failures.md` lists the rest.
- **Primitives do one job.** `Box` handles spacing, border, tone, and radius. It does not handle flex or clicks. `VStack` and `HStack` expose only `as` and `gap`. When you need more, step up to `Flex` or compose. Do not force a prop onto a primitive that ignores it.

Generic output is the usual failure here, not breakage. The output is correct and consistent, but it looks like everything else. Aim past that.

## Tone and color

Use a tone for its meaning, not for a raw color. The five semantic tones are `neutral`, `positive`, `suggest`, `caution`, and `critical`.

- **`suggest` is the AI-hint tone.** Use it when the UI marks something the agent produced or proposed.
- **Tone values differ by component.** Card, Box, Flex, Grid, and Container also take `default`. Button takes only `neutral` and `critical`. A wrong tone is a type error. The full table is in `tone-and-color.md`.
- **Ration the accent.** Default to neutral surfaces. Spend color where it carries weight.

## Spacing and density

- **The spacing scale is integers 0 to 9.** Spacing props (`padding`, `margin`, `gap`) take an integer step. Sizing props (`width`, `maxWidth`) take a CSS string. Mixing the two is a type error.
- **Density over padding on Card.** Card spacing comes from `density` (`compact`, `regular`, `loose`). Pick density by how much information the surface holds, not by nudging pixels. `padding` on a Card is a type error.

## Component choice

Picking the right component is taste. The wrong one still renders, and nothing flags it. `component-choice.md` has the full matrix. The main calls:

- **`data-table` or `sortable-data-table`.** Read-only display uses `data-table`. Clickable or selectable rows use `sortable-data-table`.
- **`VStack` or `HStack` or `Flex`.** A simple stack with a gap uses `VStack` or `HStack`. A flex child that grows or shrinks uses `Flex`, or a `Box` around the stack.
- **`Box` or `Card`.** Card is a toned surface with its own density. Layout props belong on a `Box` wrapping the Card, never on the Card.
- **`Button`, never `Box as="button"`.** `Box as="button"` keeps browser defaults with no prop to reset them.

## Build with the grain

- **Props over inline styles.** Every visual attribute with a prop uses the prop. Inline styles skip the spacing scale, break dark mode, and ignore responsive arrays. Use `style` only for values with no prop, such as `gridTemplateAreas` or `clipPath`, and on native elements like a raw `<table>`.
- **Set `as` on every Heading.** A Heading with no `as` breaks the document outline. Set `as` for the level. Use `size` for the visual size.
- **Build accessibility in.** Every input gets a label. Never nest clickable elements. A Card with `onClick` must not contain a Button. These rules apply on the first build, not at review.

## When the docs and this file disagree

The installed package's `docs/` folder is the source of what exists: the components, the props, and the rules. This file is the judgment for using them well. If a value here and a document disagree, the installed package wins. The judgment in this file still holds.
