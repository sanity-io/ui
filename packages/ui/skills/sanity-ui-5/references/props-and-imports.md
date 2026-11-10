# Props and imports

Read this file when you write props, space or size elements, or import icons.

## Contents

- Value types: spacing, sizing, and scales
- Which component accepts which prop
- Prop names that people get wrong
- Responsive arrays
- Color and tokens
- Imports
- Things to leave alone

## Value types: spacing, sizing, and scales

Spacing and sizing take different value types. Both are correct on the same element:

```tsx
<Box padding={2} width="300px" />
```

| Kind           | Props                                                               | Value                            | Example             |
| -------------- | ------------------------------------------------------------------- | -------------------------------- | ------------------- |
| Spacing        | `padding`, `margin`, `gap`, `rowGap`, `columnGap`                   | Integer step, 0 to 9             | `padding={3}`       |
| Position       | `top`, `right`, `bottom`, `left`, `inset`                           | Integer step 0 to 9, or `"auto"` | `top={0}`           |
| Sizing         | `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight` | CSS string, including `"0"`      | `width="140px"`     |
| Flex values    | `flexGrow`, `flexShrink`                                            | Number                           | `flexGrow={1}`      |
| Flex basis     | `flexBasis`                                                         | CSS string                       | `flexBasis="260px"` |
| Radius         | `radius`                                                            | Step 0 to 6, or `"full"`         | `radius={2}`        |
| Shadow         | `shadow`                                                            | Step 0 to 5                      | `shadow={1}`        |
| Type size      | `size` on Text (0 to 4), Heading (0 to 5), Code, Eyebrow            | Step                             | `size={1}`          |
| Icon size      | `size` on Icon (0 to 4)                                             | Step                             | `size={2}`          |
| Container size | `size` on Container (0 to 5)                                        | Step                             | `size={3}`          |
| Tone           | `tone`                                                              | Key                              | `tone="critical"`   |

Things that fail:

- `padding="2"` is a type error. A string is not a step.
- `padding` does not take pixels. The scale is not linear. `top={4}` is step 4, not four pixels.
- `width={140}` is a type error. Write `width="140px"`.
- `flexGrow={true}` is a type error. Pass a number.
- `<Text size={20}>` is a type error. Size is a step.
- A hex color or any CSS color in `tone` is a type error.

The flexbox shrink idiom mixes both types. Write `<Flex flexGrow={1} minHeight="0">`. `flexGrow` is a number and `minHeight` is a string.

Choose `shadow` by the surface's role:

| Step | Use for                                |
| ---- | -------------------------------------- |
| 0    | A flat surface                         |
| 1    | A resting card                         |
| 2    | A hovered card or small raised element |
| 3    | A popover, dropdown, or menu           |
| 4    | A modal or overlay                     |
| 5    | A top-layer surface                    |

Never write a `box-shadow` in `style`.

Read `docs/tokens/dtcg/json/` for the real values behind each step. Pass `space`, `radius`, `shadow`, `typography`, `font-family`, `font-weight`, `container`, `semantic`, or a color name such as `blue`.

## Which component accepts which prop

| Component                   | Accepts                                                                                 | Does not accept                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Box, Container, Flex, Grid  | `padding`, `margin`, sizing, position, `border`, `overflow`, `tone`, `shadow`, `radius` | Text styles                                                                             |
| Box                         | The props above                                                                         | `flexDirection`, `alignItems`, `justifyContent`, `flexWrap` (these belong to Flex)      |
| Card                        | `density`, `tone`, `as`                                                                 | `padding`, `gap`, `radius`, `flexGrow`, `minWidth`, `overflow`, `onClick`               |
| VStack, HStack              | `as`, `gap`                                                                             | Everything else                                                                         |
| Text                        | `size`, `weight`, `tone`, `muted`, `truncate`, `trim`, margin props                     | Other layout props                                                                      |
| Heading                     | `as` (required), `size`, `tone`, `truncate`, `trim`, margin props                       | `weight`, `muted`, other layout props                                                   |
| Button, IconButton          | Their own props, plus native button attributes                                          | `padding`, `margin`, `width`, `height`, `flexGrow`, `alignSelf`                         |
| Icon                        | `icon`, `size`, `tone`, `aria-label`                                                    | Layout props                                                                            |
| TextInput, TextArea, Select | `density`, `hasError`, native attributes                                                | `fontSize`, `padding`, `radius`, `space`, `customValidity`, icons or slots on TextInput |
| Checkbox, Radio, Switch     | Native input attributes (Checkbox and Switch also take `hasError`)                      | `label`, margin props                                                                   |

When a component rejects a prop, wrap it in a `Box` or `Flex` and put the prop there.

Do not wrap a component in a `Box` only to add spacing the component withholds. That repeats the override one level out. Pick the nearest value the component offers.

Key props by component, as of alpha.20:

- **Button:** `text`, `level` (`primary`, `secondary`, `tertiary`), `tone` (`neutral`, `critical`), `iconStart`, `iconEnd`, `loading`, `density` (`regular`, `loose`), `fullWidth`, `as`.
- **IconButton:** `icon` and `aria-label`, both required, plus `level`, `tone`, `loading`, `density`.
- **Badge:** `text`, `iconStart`, `tone`.
- **Dialog:** `open`, `onClose`, `header`, `size`.
- **Tooltip:** `content`, `placement`, `portal`, and one child.
- **Tabs:** `value` and `onValueChange` on `Tabs`. `value` on each `Tabs.Tab` and `Tabs.Panel`.
- **Link:** `href`, `openInNewTab`, `underlined`.
- **Avatar:** `name` (required), `src`, `size` (0 to 2), `color`.
- **List.ButtonItem:** `selected`, `as`, `density`, `start`, `end`.

Read `docs/components/<id>.dsds.yaml` for the full list and the rules for each.

## Prop names that people get wrong

| Component                   | Wrong                                         | Right                                                                            |
| --------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| Flex                        | `direction`, `align`, `justify`, `wrap`       | `flexDirection`, `alignItems`, `justifyContent`, `flexWrap`                      |
| Grid                        | `columns`, `rows`, `autoRows`, `gapX`, `gapY` | `gridTemplateColumns`, `gridTemplateRows`, `gridAutoRows`, `columnGap`, `rowGap` |
| Icon                        | `symbol`, `as={SomeIcon}`                     | `icon={SomeIcon}`                                                                |
| Tooltip                     | `text`, `trigger`                             | `content`, with the trigger as the child                                         |
| Container                   | `width={3}`                                   | `size={3}`                                                                       |
| IconButton                  | `label`, `size`                               | `aria-label` (it has no `size`)                                                  |
| SkipToContent               | `hash`                                        | `href="#main-content"` and `label`                                               |
| Button                      | `tone="primary"`, `"positive"`, `"caution"`   | `level="primary"`, and `tone` of `neutral` or `critical` only                    |
| Stack (v3)                  | `space`                                       | `VStack` with `gap`                                                              |
| Heading                     | `as="p"` or `as="div"`                        | `as` of `h1` to `h6` only                                                        |
| Select, TextInput, TextArea | `customValidity`, `fontSize`, `padding`       | `hasError`, `density`                                                            |

Set `as` on every Heading. Without it, Heading renders an `<h2>`, whatever the context.

Do not write a prop at its default value. `<Card density="regular">` renders the same as `<Card>`.

Avoid spreading props from a loosely typed object:

```tsx
const p: Record<string, unknown> = {direction: 'row'}
<Flex {...p} />   // skips type checking; the wrong name does nothing
```

If a new prop has no visible effect, look for a spread like this first.

## Responsive arrays

A responsive array has up to six slots, one per breakpoint: `[base, 360px, 600px, 900px, 1200px, 1800px]`. Each value applies from that `min-width` up. Slots past the sixth are ignored.

```tsx
<Flex flexDirection={['column', undefined, 'row']} gap={[2, undefined, 3]} />
```

An `undefined` slot behaves in one of two ways:

- For step and keyword props, such as `padding` and `flexDirection`, it keeps the previous breakpoint's value.
- For CSS string and number props, such as `width`, `flexBasis`, and `gridTemplateColumns`, it resets the value. Write every slot up to the last one you set.

## Color and tokens

- Use `tone` for meaning. Do not pass colors.
- In custom markup that no component covers, use the semantic custom properties. They follow light and dark mode on their own:
  - `var(--background-low)` for a surface
  - `var(--foreground-high)` and `var(--foreground-low)` for text
  - `var(--separator-low)` for a border
- The names `--card-border-color`, `--card-bg-color`, and `--card-fg-color` do not exist. A declaration that uses them does nothing.
- Do not override a component's own color, spacing, or radius through custom properties. They let custom markup match the system. They do not restyle its components.
- Light and dark colors resolve through the CSS `light-dark()` function.

## Imports

```tsx
import {Box, Button, Card, Flex, List, Text} from '@sanity/ui'
import {SearchIcon} from '@sanity/icons/Search'
```

- Import each icon from its own path. The path drops the `Icon` suffix: `@sanity/icons/Search`.
- Do not import an icon from `@sanity/icons`. The root ships a type-only stub. The import passes `tsc` and fails in the browser.
- To choose an icon, search `docs/icons.dsds.yaml` by purpose. It lists every icon with its import path and other names.
- Import `List` alone and use `List.Item`, `List.ItemText`, `List.ItemImage`, and `List.ButtonItem`. `ListItem` is not an export.
- Tabs works the same way: `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel`.
- v5 has no `ThemeProvider`, no `studioTheme`, and no runtime scheme toggle. Importing them is a type error.

## Things to leave alone

- Do not restyle a design system component with `style={{…}}` or `className`. Inline styles skip the token system, break in dark mode, and drift from other instances.
- Use `style` only for a value with no prop path. Examples are a transform, a gradient, an aspect ratio, or a custom property. On a native element with no Sanity UI equivalent, such as `<table>` or `<fieldset>`, `style` is correct.
- Do not use `as` to turn a layout primitive into a `button`, `dialog`, `select`, `details`, `summary`, or `fieldset`. They do not meet the keyboard, focus, and ARIA needs of those elements.
- Do not use inline text styles. Box, Container, Flex, and Grid set no font size, weight, or color. Use Text or Heading.
- Reach for the component before the native element: `Text` for `p` and `span`, `Heading` for `h1` to `h6`, `Button` for `button`, `Link` for `a`, `List` for `ul`, and `Divider` for `hr`.
