# Sanity UI 5

The next version of Sanity's component library. Faster, simpler, and built on CSS instead of styled-components.

## What's different from v3

- **CSS classes instead of styled-components.** No runtime style generation. Smaller bundles, faster renders.
- **Direct props for layout.** Width, height, position, border, and overflow are first-class props — no more `style={{ ... }}` escape hatches.
- **Works alongside v3.** Both versions run in the same app, in the same component tree. No forced migration.

Requires React 19.2+ and Node >=20.19 <22 || >=22.12.

## For new apps

### Install

#### Recommended: the setup CLI

```sh
npx @sanity/ui@alpha init
```

`init` detects your framework and package manager, checks your React and Node versions, then installs the package along with `@sanity/icons`, adds the stylesheet import to your entry file, reconciles `tsconfig.json`, and writes a `sanity-ui.json`. It prints a plan and asks before changing anything.

`@sanity/icons` is a dependency of this package, so your package manager installs it either way. `init` also adds it to your own `package.json` because you import icons directly to pass to components, and under pnpm an import that isn't declared in your project doesn't resolve.

- `--dry` print the plan and exit without changing anything
- `--yes` accept every prompt with its default (non-interactive, for CI and agents)
- `--cwd <dir>` run against another directory

#### Manual

```sh
pnpm add @sanity/ui@alpha
```

Using npm or yarn? Use `npm add` or `yarn add` instead. (`init` above picks the right one for you.)

Then import the stylesheet at your app entry point. Without it, components render as unstyled HTML.

```tsx
import '@sanity/ui/styles.css'
```

### Usage

```tsx
import {Box, Flex, Card, Heading, Text, Button} from '@sanity/ui'
import {AddIcon} from '@sanity/icons/Add'

export default function App() {
  return (
    <Flex minHeight="100vh">
      <Box as="nav" aria-label="Main" padding={3} borderRight width="240px">
        <Heading as="h2" size={1}>
          My App
        </Heading>
      </Box>
      <Box as="main" padding={4} flexGrow={1}>
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Heading as="h1" size={2}>
            Documents
          </Heading>
          <Button iconStart={AddIcon} text="New" />
        </Flex>
        <Box marginTop={3}>
          <Card density="loose">
            <Text size={1}>First document</Text>
            <Text size={1} muted>
              Edited 2 hours ago
            </Text>
          </Card>
        </Box>
      </Box>
    </Flex>
  )
}
```

### Checking your setup

Run `doctor` at any time to verify an install and get a one-line fix for anything broken:

```sh
npx @sanity/ui@alpha doctor
```

It checks that the package and `@sanity/icons` are installed, the stylesheet resolves and is imported, `tsconfig.json` has the options the components need, and your React and Node versions are supported.

## For apps using Sanity UI v3

### Install

v3 and v5 are the same npm package at different majors, so an app that wants both needs a package alias to tell them apart.

In apps still using v3 components, we recommend installing v5 with a package alias. This way, your existing `@sanity/ui` imports keep resolving to v3, so nothing you have already written needs to change.

```sh
pnpm add ui5@npm:@sanity/ui@alpha
```

This gives you:

```json
{
  "dependencies": {
    "@sanity/ui": "^3.5.1",
    "ui5": "npm:@sanity/ui@alpha"
  }
}
```

Now `@sanity/ui` means v3 everywhere in your codebase and `ui5` means v5. You migrate one import at a time, at whatever pace suits you, instead of rewriting every file before anything runs.

The alias name is yours to choose. `ui5` is what we use internally. npm, pnpm, and yarn all support the `npm:` protocol.

### Setup

v5 has no `ThemeProvider`, and it does not read v3's theme. Keep your existing provider setup exactly as it is: v3 components still need it, and it has no effect on v5.

With v5 installed under an alias, the stylesheet comes from the alias too.

```tsx
import {ThemeProvider, studioTheme, ToastProvider} from '@sanity/ui' // v3
import 'ui5/styles.css' // v5
import App from './App'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={studioTheme}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ThemeProvider>,
)
```

### Usage

With v5 aliased, which version you get is just which specifier you import from. Anything without a v5 equivalent keeps coming from `@sanity/ui`, and the two sit next to each other in the same tree.

```tsx
import {Dialog} from '@sanity/ui' // v3
import {Button, Card, Text} from 'ui5' // v5
```

## Components

### Layout

| Component   | What it does                                                                        |
| ----------- | ----------------------------------------------------------------------------------- |
| `Box`       | General container. Padding, margin, border, overflow, and position as direct props. |
| `Flex`      | Flexbox layout. `alignItems`, `justifyContent`, `flexDirection`, `gap`.             |
| `Grid`      | CSS grid. Use `gridTemplateColumns` with a CSS string (e.g. `"repeat(3, 1fr)"`).    |
| `Container` | Max-width content wrapper.                                                          |
| `HStack`    | Horizontal stack. Accepts `gap` and `as` only — use `Flex` for alignment control.   |
| `VStack`    | Vertical stack. Accepts `gap` and `as` only — use `Flex` for alignment control.     |
| `Inline`    | Inline flow layout with wrapping and gap.                                           |

### Typography

| Component | What it does                                                            |
| --------- | ----------------------------------------------------------------------- |
| `Heading` | Semantic headings (`h1`–`h6`). Always set `as` to match the level.      |
| `Text`    | Body copy, captions, labels. Props: `size`, `weight`, `muted`, `align`. |
| `Label`   | Form input label. Use only with form elements.                          |
| `Code`    | Inline or block code. Uses the system monospace font.                   |

### Interactive

| Component  | What it does                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Button`   | `level` (primary/secondary/tertiary), `tone` (neutral/critical), `iconStart`, `iconEnd`, `text`, `fullWidth`, `loading`. |
| `Checkbox` | Controlled checkbox. Requires `label` (string).                                                                          |
| `Radio`    | Controlled radio button.                                                                                                 |
| `Switch`   | Toggle control. Requires `label` (string).                                                                               |
| `Link`     | Anchor element styled as a link.                                                                                         |

### Display

| Component        | What it does                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Card`           | Raised surface with background and `tone`. Does not accept padding, margin, or layout props — wrap content in `Box`. |
| `Divider`        | Horizontal rule between content sections.                                                                            |
| `Icon`           | Renders a `@sanity/icons` icon component. Always set `aria-label` or `aria-hidden`.                                  |
| `Indicator`      | Status dot with `tone`.                                                                                              |
| `IndicatorStack` | Grouped `Indicator` elements.                                                                                        |
| `Spinner`        | Loading indicator.                                                                                                   |

### Lists

| Component | What it does                                        |
| --------- | --------------------------------------------------- |
| `List`    | Semantic list. Use `List.Item` and `List.ItemText`. |

### Accessibility

| Component        | What it does                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `SkipToContent`  | Visually hidden skip-nav link. Must be the first focusable element. Requires `href` and `label`. |
| `VisuallyHidden` | Hides content visually while keeping it in the accessibility tree.                               |

### Still only in v3

Menu, Dialog, TextInput, Select, Stack, Badge, ThemeProvider, ToastProvider, and other components not yet migrated to v5. Import these from `@sanity/ui` exactly as you do today.

## Contributing

We welcome feedback and contributions. Start here:

1. **Try the components** and report what breaks, what confuses, or what's missing.
2. **Read the contribution model** — build a recipe with existing building block components, then propose graduating it.
3. **Open a PR** following the branch naming and checklist in the developer contribution docs.

During preview, the most useful contribution is using the components and telling us what happens.
