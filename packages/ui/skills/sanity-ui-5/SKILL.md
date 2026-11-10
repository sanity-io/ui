---
name: sanity-ui-5
description: Build, edit, and review React UI with Sanity UI 5 (`@sanity/ui@alpha`, the CSS-based v5 line, not the v3 or v4 styled-components line). Covers install and entry-file setup, which components exist, prop value types, how to read the package docs, accessibility, and v3-to-v5 migration. Use this skill when the user builds screens, forms, layouts, or components with Sanity UI. Also use it when they mention `@sanity/ui` v5 or "Sanity UI 5", ask about Box, Flex, Card, Button, or Tooltip props, hit a build or styling problem, or port v3 code. Trigger even if they never say "design system". It also covers taste: tone, density, component choice, and the silent failures to avoid. DO NOT use it for Sanity Studio schemas, GROQ, or content work, or for apps that stay on Sanity UI 3 or 4.
---

# Sanity UI 5

This skill gets you from an empty project to UI that is correct. Correct means it type-checks, renders styled, and meets WCAG 2.2 AA. Correct is the floor. For tone, restraint, and component choice, read `references/taste.md`.

## Why this skill exists

Sanity UI 5 fails quietly. A missing import leaves the page unstyled with no error. A bare `npm install @sanity/ui` installs UI 4. A wrong prop name does nothing. Most work with this library goes wrong in those places. This skill puts them first.

Four facts shape everything below:

1. **Install the right package.** Use `@sanity/ui@alpha`, or the exact v5 version you were given. The bare package name resolves to the UI 4 line.
2. **Set up the entry file.** Import the polyfills and the stylesheet. Without them the page renders as plain HTML.
3. **The installed package beats the docs.** UI 5 is pre-1.0 and still changing. When a doc and the package disagree, trust the package. Check with `npx tsc --noEmit` and the export listing in `references/setup.md`.
4. **Check types after every change.** Most wrong props are type errors. The exception is props spread from a loosely typed object, which skip the check.

## Workflow

Follow these steps in order for any task that writes UI. Every fact you need is in the installed package. Read files from `node_modules/@sanity/ui/`. Do not look for other sources.

1. **Read the index.** Read `node_modules/@sanity/ui/llms.txt`. It lists every document in `docs/` and what each one covers.
2. **Check the project setup.** Run `npx sanity-ui doctor` in the project root. It checks the package, the stylesheet import, and `tsconfig.json`. Set up the files as `references/setup.md` shows.
3. **Pick components.** Read `docs/overview/component-reference.dsds.yaml` for each component's status. Confirm each export with the export listing in `references/setup.md`. See `references/components.md`.
4. **Read each component's rules.** Read `docs/components/<id>.dsds.yaml` for every component you will use. Read its guidelines in full. When a component has subcomponents, read each subcomponent's document too.
5. **Write the code.** Follow the rules in the next section. Find an icon by purpose by searching `docs/icons.dsds.yaml`.
6. **Verify.** Run `npx tsc --noEmit`. Confirm each export with the export listing. Open the page. Test it at 320px width, with the keyboard only, and in dark mode.

### Where the docs are

Everything is in the installed package:

- `node_modules/@sanity/ui/llms.txt` is the index.
- `node_modules/@sanity/ui/docs/` holds the documents. Each file is a DSDS document, written as YAML.
- `node_modules/@sanity/ui/skills/` holds these skills.

If a document and the installed package disagree, the package wins.

## Rules that prevent most failures

Each rule names the failure it prevents. Fuller tables are in the reference files.

### Setup

- Import `@sanity/ui/polyfills` on the line above `@sanity/ui/styles.css`, in the entry file. Tooltip and Dialog need the polyfills. Without them, tooltips never show in some browsers and Dialog backdrop clicks stop working in Safari.
- Write the stylesheet path as `@sanity/ui/styles.css`. The other forms fail at the dev server and print no useful error.
- Import the Sanity UI stylesheet before your own CSS.
- Use React 19.2 or later, and `"jsx": "react-jsx"` in `tsconfig.json`.
- Do not install `styled-components`, `@sanity-labs/ui-poc`, or `react-refractor`. v5 does not use the first. The second is an old internal name. The third installs on its own.
- Do not change `tsconfig.json` to fix a build. The cause is usually in the source.

### Props

- Spacing takes an integer step: `<Box padding={2}>`. Sizing takes a CSS string: `<Box width="300px">`. Do not mix the two forms. See `references/props-and-imports.md`.
- Pass tone as a key, not a color: `tone="critical"`. Tones are `neutral`, `positive`, `suggest`, `caution`, and `critical`.
- Use the CSS property names on Flex and Grid: `flexDirection`, `alignItems`, `justifyContent`, `flexWrap`, `gridTemplateColumns`. The v3 names do not exist.
- Use `icon`, not `symbol`, on `Icon`. Use `content`, not `text`, on `Tooltip`.
- Do not write a prop at its default value.
- Do not spread props from a `Record<string, unknown>`. A wrong name then does nothing and nothing reports it.

### Structure

- Card sizes through `density` (`compact`, `regular`, `loose`) and accepts no layout props. Put layout on a `Box` or `Flex` around it.
- `VStack` and `HStack` accept only `as` and `gap`. Use `Flex` when you need anything else.
- Use `Box` or `Flex` for toolbars, sidebars, and scroll wrappers. Do not use `Card` there.
- Put `Container` inside the scroll `Box`, not around it.
- Add `flexWrap="wrap"` to rows with two or more children, and `minWidth="0"` to flex children that hold text. This prevents overflow at 320px.
- Use `minHeight="100vh"` on the outer shell, not `height`.
- Render one `<main>`. Render shell regions as `nav`, `main`, and `aside`.

### Interaction

- Do not put `onClick` on `Box` or `Card`. Use `Button`, or wrap the surface in `PressArea`.
- A row that navigates is a link. Use `as="a"` and `href`.
- Do not render `button`, `dialog`, `select`, `details`, or `fieldset` through `as` on a layout primitive. Use the matching component.
- Do not restyle a component with `style` or `className`. If a prop is missing, pick the nearest value the component offers. Missing props are decisions.

### Imports

- Import each icon from its own path: `import {SearchIcon} from '@sanity/icons/Search'`. The root import passes `tsc` and then fails in the browser.
- Import `List` alone and use `List.Item`, `List.ItemText`, and `List.ButtonItem`.
- Do not import `ThemeProvider` or `studioTheme`. v5 has no theming API. Theming uses CSS custom properties.
- Do not import `Label`, `Menu`, `Toast`, `Skeleton`, `Autocomplete`, `SegmentedControl`, or `Image`. They are not exported yet.

### Forms and accessibility

- Checkbox, Radio, and Switch have no `label` prop. Name them with a label element linked by `id` and `htmlFor`, or with `aria-label` or `aria-labelledby`.
- Give every icon-only control an `aria-label` on the control itself. A tooltip does not name a control.
- Use `hasError` for error styling, and render the message yourself. Link it with `aria-describedby`.
- Never disable an input that has an error.
- A disabled control does not trigger a Tooltip. Wrap it in a `PressArea` if the tooltip must show.
- Never rely on tone alone. Pair it with words or an icon.

Read `references/forms-and-accessibility.md` before you build any form.

## A correct starting point

```tsx
// src/main.tsx
import '@sanity/ui/polyfills'
import '@sanity/ui/styles.css'
import {createRoot} from 'react-dom/client'
import {App} from './App'

createRoot(document.getElementById('root')!).render(<App />)
```

```tsx
// src/App.tsx
import {Box, Button, Card, Flex, Heading, Text, TextInput, VStack} from '@sanity/ui'

export function App() {
  return (
    <Box as="main" padding={4}>
      <Card density="loose">
        <VStack gap={4}>
          <Heading as="h1">Account</Heading>
          <VStack gap={2}>
            <Text as="label" htmlFor="email" size={1} weight="medium">
              Email address
            </Text>
            <TextInput id="email" type="email" />
          </VStack>
          <Flex gap={2} justifyContent="flex-end" flexWrap="wrap">
            <Button text="Cancel" level="tertiary" />
            <Button text="Save" level="primary" />
          </Flex>
        </VStack>
      </Card>
    </Box>
  )
}
```

The example sets the entry imports and names the input through a linked label. It sizes the Card with `density` and puts layout on `Flex` and `VStack`.

## Reference files

Read a file when the task touches its topic.

| File                                    | Read it when                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| `references/setup.md`                   | You create a project, fix a build or an unstyled page, or check versions              |
| `references/props-and-imports.md`       | You write props, size or space elements, or import icons                              |
| `references/components.md`              | You choose a component, check status, or look for a pattern                           |
| `references/forms-and-accessibility.md` | You build a form, an error state, or any interactive UI                               |
| `references/migrating-from-v3.md`       | You port v3 code or compare v3 and v5                                                 |
| `references/taste.md`                   | You choose a tone, set density, pick between two components, or review UI for quality |
| `references/tone-and-color.md`          | You choose a tone or set a color, and need the tone each component takes              |
| `references/component-choice.md`        | Two components both work and you need the one the system prefers                      |
| `references/silent-failures.md`         | A layout breaks or a style goes missing with no error                                 |

## Keeping this skill honest

The facts here were checked against `@sanity/ui` 5.0.0-alpha.20 and the documentation corpus. Both change. Run `npx sanity-ui doctor` and the export listing instead of trusting a component list from memory. If the docs and the installed package disagree, report the gap to the user.
