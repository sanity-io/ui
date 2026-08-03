# Sanity UI 4

The next version of Sanity's component library. Faster, simpler, and built on CSS instead of styled-components.

## What's different from v3

- **CSS classes instead of styled-components.** No runtime style generation. Smaller bundles, faster renders.
- **Direct props for layout.** Width, height, position, border, and overflow are first-class props — no more `style={{ ... }}` escape hatches.
- **Works alongside v3.** Install both packages in the same app. No forced migration.

Requires React 19.2+ and Node >=20.19 <22 || >=22.12.

## Install

### Recommended: the setup CLI

```sh
npx @sanity-labs/ui-poc init
```

`init` detects your framework and package manager, checks your React and Node versions, then installs the package along with `@sanity/icons`, adds the stylesheet import to your entry file, reconciles `tsconfig.json`, and writes a `sanity-ui.json`. It prints a plan and asks before changing anything.

`@sanity/icons` is a dependency of this package, so your package manager installs it either way. `init` also adds it to your own `package.json` because you import icons directly to pass to components, and under pnpm an import that isn't declared in your project doesn't resolve.

- `--dry` print the plan and exit without changing anything
- `--yes` accept every prompt with its default (non-interactive, for CI and agents)
- `--cwd <dir>` run against another directory

### Manual

```sh
npm install @sanity-labs/ui-poc
```

Using pnpm or yarn? Use `pnpm add` or `yarn add` instead. (`init` above picks the right one for you.)

Then import the stylesheet at your app entry point. Without it, components render as unstyled HTML with no error.

```tsx
import '@sanity-labs/ui-poc/styles.css'
```

## Using alongside Sanity UI v3

If your app uses Sanity UI v3, keep the existing `ThemeProvider` setup.

```tsx
import {ThemeProvider, studioTheme, ToastProvider} from '@sanity/ui'
import '@sanity-labs/ui-poc/styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={studioTheme}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ThemeProvider>,
)
```

## Checking your setup

Run `doctor` at any time to verify an install and get a one-line fix for anything broken:

```sh
npx @sanity-labs/ui-poc doctor
```

It checks that the package and `@sanity/icons` are installed, the stylesheet resolves and is imported, `tsconfig.json` has the options the components need, and your React and Node versions are supported.

## Usage

Import from `@sanity-labs/ui-poc`. Components not yet in v4 — Menu, Dialog, TextInput, Badge — remain in `@sanity/ui`.

```tsx
import {Box, Flex, Card, Heading, Text, Button} from '@sanity-labs/ui-poc'
import {AddIcon} from '@sanity/icons'

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

## Components

All components below are from `@sanity-labs/ui-poc`.

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
| `IndicatorGroup` | Grouped `Indicator` elements.                                                                                        |
| `Spinner`        | Loading indicator.                                                                                                   |

### Lists

| Component | What it does                                        |
| --------- | --------------------------------------------------- |
| `List`    | Semantic list. Use `List.Item` and `List.ItemText`. |

### Accessibility

| Component        | What it does                                                                          |
| ---------------- | ------------------------------------------------------------------------------------- |
| `SkipToContent`  | Visually hidden skip-nav link. Must be the first focusable element. Requires `href` and `label`. |
| `VisuallyHidden` | Hides content visually while keeping it in the accessibility tree.                    |

### Still from `@sanity/ui`

Menu, Dialog, TextInput, Select, Stack, Badge, ThemeProvider, ToastProvider, and other components not yet migrated to v4.

## Contributing

We welcome feedback and contributions. Start here:

1. **Try the components** and report what breaks, what confuses, or what's missing.
2. **Read the contribution model** — build a recipe with existing building block components, then propose graduating it.
3. **Open a PR** following the branch naming and checklist in the developer contribution docs.

During preview, the most useful contribution is using the components and telling us what happens.
