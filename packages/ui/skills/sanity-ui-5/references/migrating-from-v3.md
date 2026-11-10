# Migrating from Sanity UI 3 to Sanity UI 5

Read this file when you port v3 code or compare v3 and v5. It covers v3 against v5 only. Per-component detail lives in each component's `Migrating from Sanity UI 3` section, in `components/<id>.dsds.yaml`. Read `guides/migrating-v3-to-v5.dsds.yaml` for the overview.

## Contents

- What changed
- Before you begin
- Remove the provider
- Component map
- Prop changes by component
- Manual migrations
- Codemods
- Plan the work

## What changed

v3 and v5 publish under the same package name, `@sanity/ui`, at different majors. The bare name does not install v5. Install v5 with `@sanity/ui@alpha`.

| Area           | v3                                            | v5                                      |
| -------------- | --------------------------------------------- | --------------------------------------- |
| Styling engine | `styled-components`, runtime CSS              | Static CSS in one stylesheet            |
| Theming        | `ThemeProvider` and a JavaScript theme object | CSS custom properties                   |
| Setup          | Wrap the app in `ThemeProvider`               | Import the polyfills and the stylesheet |
| Layout styling | `style` for many cases                        | Layout props that map to design tokens  |
| Class names    | Generated                                     | Prefixed with `sui-`                    |
| Dark mode      | Theme scheme                                  | CSS `light-dark()`                      |
| Extending      | `styled(Component)`                           | A `className` and your own CSS          |

`styled(Box)` and other styled-components extensions of Sanity UI components do not work in v5. Use a `className` and CSS.

## Before you begin

- React 19.2 or later.
- Node `>=20.19 <22` or `>=22.12`.
- `@sanity/icons` 5.2.1 or later. Icons now come from their own paths: `import {SearchIcon} from '@sanity/icons/Search'`. The v3 and v4 root import no longer gives a usable icon.
- Set up the entry file as `setup.md` shows. Without the entry imports, v5 renders as plain HTML with no error.

## Remove the provider

```tsx
// v3
import {ThemeProvider, studioTheme} from '@sanity/ui'

<ThemeProvider theme={studioTheme}>
  <App />
</ThemeProvider>

// v5: no provider. The entry-file imports replace it.
<App />
```

v5 has no `ThemeProvider`, no `studioTheme`, and no runtime scheme switch. The codemods do not port theme customization. Rebuild it with CSS custom properties.

## Component map

| v3                                                                           | v5                                    | Note                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| Box, Flex, Grid, Card, Container                                             | Same names                            | Many props changed. See the next section               |
| Stack                                                                        | VStack                                | Accepts only `as` and `gap`                            |
| Inline                                                                       | HStack                                | v5 also ships `Inline`, but it is deprecated           |
| Text, Heading, Code                                                          | Same names                            | `textOverflow` and `accent` removed                    |
| Label (small uppercase text)                                                 | Eyebrow                               | `accent` and `textOverflow` removed                    |
| A separate label element for a form field                                    | `Text as="label"` with `htmlFor`      | v5 has no `Label` component                            |
| Tab, TabList, TabPanel                                                       | Tabs, Tabs.List, Tabs.Tab, Tabs.Panel | The v3 names are not v5 exports                        |
| Dialog                                                                       | Dialog                                | Different model. Migrate by hand                       |
| Popover, Tooltip                                                             | Popover, Tooltip                      | Uncontrolled and CSS-positioned. Migrate by hand       |
| TooltipDelayGroupProvider                                                    | TooltipGroup                          | A rendered element, not a context provider             |
| Badge, Button, Checkbox, Radio, Select, Switch, Spinner, TextArea, TextInput | Same names                            | Props changed                                          |
| Avatar, AvatarStack, KBD, Hotkeys                                            | Same names                            | Exported in alpha.20. KBD and Hotkeys are experimental |
| Rendering an `@sanity/icons` component directly                              | `Icon` with `icon={SomeIcon}`         | New component                                          |
| A hand-built skip link                                                       | SkipToContent                         | New                                                    |
| A hand-built clickable surface                                               | PressArea                             | New                                                    |
| A `Stack` of cards or a custom `ul`                                          | List                                  | New                                                    |
| Styled dots built from Box                                                   | Indicator and IndicatorStack          | New                                                    |

New in v5, with no v3 equivalent: Divider, HStack, IconButton, IndicatorStack, Indicator, Link, List, PressArea, SkipToContent, TooltipGroup, VisuallyHidden.

No v5 counterpart yet: Autocomplete, Menu and its parts, SegmentedControl, Skeleton, Toast, Breadcrumbs, Tree, and VirtualList. Layering and portal helpers have none either. Build a stand-in from components that exist, and tell the user. List the exports of the installed package (see `setup.md`) to see whether that has changed.

## Prop changes by component

An old prop name in v5 is either a type error or a silent no-op. Search for each one.

**Box**

| v3                                                                | v5                                                                                        |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `display="flex"` or `"grid"`                                      | Use `Flex` or `Grid`. Box renders `display: block`                                        |
| `flex={1}`                                                        | `flexGrow`, `flexShrink`, `flexBasis`                                                     |
| `height="fill"` or `"stretch"`                                    | `height="100%"` or `"100vh"`                                                              |
| `sizing="border"`                                                 | `style={{boxSizing: 'border-box'}}` if needed                                             |
| `column`, `columnStart`, `columnEnd`, `row`, `rowStart`, `rowEnd` | `gridColumn`, `gridColumnStart`, `gridColumnEnd`, `gridRow`, `gridRowStart`, `gridRowEnd` |
| Default `margin` of `0`                                           | No default. Add `margin={0}` if you relied on it                                          |

**Flex**

| v3                                      | v5                                                          |
| --------------------------------------- | ----------------------------------------------------------- |
| `direction`, `align`, `justify`, `wrap` | `flexDirection`, `alignItems`, `justifyContent`, `flexWrap` |
| `gapX`, `gapY`                          | `columnGap`, `rowGap`                                       |
| `flex={1}`                              | `flexGrow`, `flexShrink`, `flexBasis`                       |

The old names are silent no-ops. A missing `wrap` is the most common cause of 320px reflow failures.

**Grid**

| v3                                                         | v5                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------ |
| `columns={3}`                                              | `gridTemplateColumns="repeat(3, 1fr)"`                 |
| `rows={2}`                                                 | `gridTemplateRows="repeat(2, 1fr)"`                    |
| `autoRows`, `autoCols`, `autoFlow`                         | `gridAutoRows`, `gridAutoColumns`, `gridAutoFlow`      |
| `gapX`, `gapY`                                             | `columnGap`, `rowGap`                                  |
| Child props `column`, `row`, and their start and end forms | `gridColumn`, `gridRow`, and their start and end forms |

**Card**

| v3                                                  | v5                                                       |
| --------------------------------------------------- | -------------------------------------------------------- |
| `padding`, `radius`                                 | `density` (`compact`, `regular`, `loose`)                |
| `shadow`, `border`, `borderTop` and the other sides | Removed. Card always has a 1px border, colored by `tone` |
| `scheme`                                            | Removed                                                  |
| `tone="inherit"`                                    | Removed                                                  |
| `muted`, `pressed`, `selected`                      | Removed. Card is not interactive                         |
| Layout props                                        | Removed. Wrap the Card in a `Box` or `Flex`              |

**Container**

| v3                     | v5                                                                      |
| ---------------------- | ----------------------------------------------------------------------- |
| `width={3}`            | `size={3}`. v5 `width` takes a CSS string only                          |
| Implicit `width: 100%` | Gone. Container fills a block parent                                    |
| `width="auto"`         | Omit `size`                                                             |
| Scale `1` to `5`       | Scale `0` to `5`. A v3 `width={1}` maps to `size={0}`. Audit each value |

**Text, Heading, Eyebrow (v3 Label)**

| v3                              | v5                                                           |
| ------------------------------- | ------------------------------------------------------------ |
| `textOverflow="ellipsis"`       | `truncate={1}`                                               |
| `accent`                        | `tone="suggest"`. On Text, use a parent with a semantic tone |
| Heading default element `<div>` | `as` is required. There is no default level                  |
| Eyebrow default element `<div>` | Default `<span>`. Set `as="div"` to keep a block             |
| Layout props on Eyebrow         | Removed. Use a wrapping `Box`                                |

**Stack and Inline**

| v3                                                      | v5                                                                          |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| `<Stack space={3}>`                                     | `<VStack gap={3}>`                                                          |
| `sizing`                                                | Removed, no replacement                                                     |
| `padding`, `margin`, `overflow`, or flex props on Stack | Use `Flex flexDirection="column"`, since VStack accepts only `gap` and `as` |
| `<Inline space={2}>`                                    | `<Inline gap={2}>`, or better `<HStack gap={2}>`                            |

**Form controls**

| v3                                                                | v5                                                                                                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `customValidity` on TextInput, TextArea, Select, Checkbox, Radio  | `hasError` on TextInput, TextArea, Select, and Checkbox. It sets styling and `aria-invalid`, and you render the message. Radio has no error prop |
| `fontSize`, `padding`, `radius`, `space`, `weight`, `border`      | Removed. Use `density` on TextInput, TextArea, Select                                                                                            |
| TextInput `icon`, `iconRight`, `suffix`, `clearButton`, `onClear` | Removed. TextInput is a plain input                                                                                                              |
| Setting a width on the field                                      | Removed. The field fills its container. Size the parent                                                                                          |
| TextArea resize handle                                            | Removed. Set `rows` or use `autoResize`                                                                                                          |
| Switch `indeterminate`                                            | Removed. Use Checkbox for a mixed state                                                                                                          |

**Others**

| Component | Change                                                                |
| --------- | --------------------------------------------------------------------- |
| Icon      | `symbol` is now `icon`                                                |
| Code      | `maxWidth` and flex props removed. `as` accepts only `pre` and `span` |
| Spinner   | `tone` and `muted` removed                                            |
| Badge     | `tone="default"` is gone. Use `neutral`                               |
| Button    | `tone` accepts `neutral` and `critical` only                          |

## Manual migrations

Dialog, Popover, and Tooltip need hand work. A codemod cannot do it.

**Dialog.** v3 mounts the dialog conditionally and passes a `footer` prop. v5 uses the `open` prop with subcomponents.

```tsx
// v3
{
  open && (
    <Dialog footer={footerContent} {...dialogProps}>
      {dialogContent}
    </Dialog>
  )
}

// v5
;<Dialog open={open} {...dialogProps}>
  <Dialog.Content>{dialogContent}</Dialog.Content>
  <Dialog.Footer>{footerContent}</Dialog.Footer>
</Dialog>
```

More than a dozen v3 props changed or went: `animate`, `cardRadius`, `cardShadow`, and the sizing, layering, and lifecycle props. Check each prop your code passes against `components/dialog.dsds.yaml`.

**Popover.** v3 was controlled. v5 is uncontrolled and built on the native Popover API.

- `open` is gone. The trigger opens it. You cannot drive it from state.
- `children` is the trigger and must render a `<button>`. v3 used it as a positioning reference, or `referenceElement`.
- Radius, shadow, tone, padding, overflow, width, and `arrow` are gone. Compose a `Card` inside `content` for more.
- `zOffset`, `onActivate`, and the `Layer` context are gone.

**Tooltip.** `content` keeps its name.

- There is no `disabled` prop. Render the trigger with or without the Tooltip wrapper.
- `arrow` and the card styling props are gone.
- The polyfills import is now required.
- Replace `TooltipDelayGroupProvider` with `TooltipGroup`.

## Codemods

v5 ships codemods built with jscodeshift. They rewrite imports and transform props. They cover the mechanical work only.

```sh
pnpx @sanity/ui-codemod latest:box --paths "src/**/*.tsx" --dry
```

There is one command per component: `box`, `card`, `text`, `flex`, `grid`, `heading`, `container`, `code`, `stack`, `label`, and `inline`.

| Flag            | Use                                                           |
| --------------- | ------------------------------------------------------------- |
| `--paths`       | The files to transform. Required. Takes globs and repeats     |
| `--dry`         | Run without writing files. Always start here                  |
| `--print`       | Print the output for review                                   |
| `--fromPackage` | The source import to match, if you import v3 through an alias |
| `--toPackage`   | The target import. Defaults to `@sanity/ui`                   |

Safe workflow:

1. Run with `--dry` to see the scope.
2. Run with `--print` and read the output.
3. Run for real, one component and one surface at a time.
4. Run your formatter. Sanity and jscodeshift disagree on spaces and semicolons.
5. Search for comments that start with `UI-POC-CODEMOD TODO`. Resolve or delete each one before you commit.
6. Review the diff and run the tests.

The codemods do not translate tone values across packages, port theme customization, or rewrite `styled()` wrappers. Treat the output as a first pass.

## Plan the work

1. Install v5 and set up the entry file.
2. Start new features with the layout and typography primitives.
3. Migrate Box, Flex, Grid, Text, and Heading first.
4. Keep a list of places where v3 has no v5 counterpart.
5. Migrate by surface, not by component type. A surface you can test and ship end to end is safer than a global find and replace.
