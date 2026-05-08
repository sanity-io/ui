# Sanity UI v4

The next version of Sanity's component library. Faster, simpler, and built on CSS instead of styled-components.

Seven layout and typography building block components ship today: **Box**, **Flex**, **Grid**, **Card**, **Heading**, **Text**, and **Divider**. More components follow each quarter.

## What's different from v3

- **CSS classes instead of styled-components.** No runtime style generation. Smaller bundles, faster renders.
- **Direct props for layout.** Width, height, position, border, and overflow are first-class props — no more `style={{ ... }}` escape hatches.
- **Works alongside v3.** Install both packages in the same app. No forced migration.

## Install

```sh
pnpm add @sanity-labs/ui-poc
```

Requires React 19 and Node 24+.

## Setup

Import the stylesheet at your app entry point. Without it, components render as unstyled HTML with no error.

```tsx
import '@sanity-labs/ui-poc/styles.css'
```

If your app uses Sanity UI v3, keep the existing `ThemeProvider` setup.

```tsx
import { ThemeProvider, studioTheme, ToastProvider } from '@sanity/ui'
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

## Usage

Import v4 building block components from `@sanity-labs/ui-poc`. Import everything else from `@sanity/ui`.

```tsx
import { Box, Flex, Card, Heading, Text } from '@sanity-labs/ui-poc'
import { Button, Stack, Badge } from '@sanity/ui'
import { AddIcon } from '@sanity/icons'

export default function App() {
  return (
    <Flex style={{ minHeight: '100vh' }}>
      <Box as="nav" aria-label="Main" padding={3} borderRight width="240px">
        <Heading as="h2" size={1}>My App</Heading>
      </Box>
      <Box as="main" padding={4} flexGrow={1}>
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Heading as="h1" size={2}>Documents</Heading>
          <Button icon={AddIcon} text="New" />
        </Flex>
        <Card density="regular" marginTop={3}>
          <Text size={1} weight="medium">First document</Text>
          <Text size={1} muted>Edited 2 hours ago</Text>
        </Card>
      </Box>
    </Flex>
  )
}
```

## Components

| Component | Package | What it does |
|-----------|---------|-------------|
| `Box` | `@sanity-labs/ui-poc` | General container with padding, margin, border, tone, and layout props |
| `Flex` | `@sanity-labs/ui-poc` | Flexbox layout with alignment and gap |
| `Grid` | `@sanity-labs/ui-poc` | CSS grid layout for card grids and dashboards |
| `Card` | `@sanity-labs/ui-poc` | Visual surface with background, tone, and density |
| `Heading` | `@sanity-labs/ui-poc` | Semantic headings (`h1`–`h6`) with size and weight |
| `Text` | `@sanity-labs/ui-poc` | Body text, captions, and metadata |
| `Divider` | `@sanity-labs/ui-poc` | Horizontal rule between content sections |
| Everything else | `@sanity/ui` | Button, Menu, Dialog, TextInput, Stack, Badge, etc. |

## Repo structure

```
ui-poc/
├── packages/
│   ├── ui/                  # The component library (@sanity-labs/ui-poc)
│   ├── ui-codemod/          # Migration codemods for v3 → v4
│   └── @repo/               # Shared repo tooling (eslint config, etc.)
├── apps/
│   ├── storybook/           # Component stories — run locally
│   └── performance-testing/ # Render benchmarks
├── turbo.json               # Turborepo pipeline config
└── pnpm-workspace.yaml      # Workspace definition
```

## Development

```sh
# Install dependencies
pnpm install

# Start dev mode (components + storybook)
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build

# Type check
pnpm ts:check
```

## Run Storybook

```sh
cd apps/storybook
pnpm dev
```

Opens the Storybook app with all component stories. Use it to browse variants, test props, and verify behavior.

## Contributing

We welcome feedback and contributions. Start here:

1. **Try the components** and report what breaks, what confuses, or what's missing.
2. **Read the contribution model** — build a recipe with existing building block components, then propose graduating it.
3. **Open a PR** following the branch naming and checklist in the developer contribution docs.

During preview, the most useful contribution is using the components and telling us what happens.
