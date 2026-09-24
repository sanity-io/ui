# @sanity/themer

Generate [Sanity Studio](https://www.sanity.io/studio) themes from a handful of colors.

```sh
npm install @sanity/themer
```

## Usage

`buildTheme` builds the same type of theme as `buildTheme` from `@sanity/ui/theme` — ready for the `theme` property of a Studio config — but takes colors instead of design tokens. Under the hood it only swaps out the color palette that `@sanity/ui/theme` otherwise fills with [`@sanity/color`](https://www.sanity.io/docs/color):

```ts
import {buildTheme} from '@sanity/themer'
import {defineConfig} from 'sanity'

export const theme = buildTheme({
  accent: '#f00', // required
  text: '#727892', // optional
  background: {dark: '#0d0e12', light: '#ffffff'}, // optional
  contrast: 85, // optional, 15–100
})

export default defineConfig({
  theme,
  // ...rest of the config
})
```

- `accent` replaces the `blue` scale of the palette, which Sanity UI uses for primary buttons, focus rings and links.
- `text` replaces the `gray` scale — text, icons, borders and neutral surfaces. When omitted it is derived from `accent`: a mostly desaturated version of it, the way the stock gray carries a hint of the stock blue.
- `background.dark` replaces `black` and `background.light` replaces `white` — the backgrounds of the two color schemes that every other color blends onto.
- `contrast` controls how strongly text and borders separate from the accent. The default `85` uses the text color as-is; `100` removes its tint entirely (a high contrast scheme with no mixing of text and accent), and lower values blend more and more of the accent into the text scale, giving text and borders more color.

A few ground rules keep the generated palette usable: the accent and text colors cannot be too dark or too light (they would mess with the rest of their scales), `background.dark` is made darker until it has enough contrast with both of them (it can never be lighter than either), and `background.light` can never be darker than either.

Called with the stock colors — like `text` and `background` in the example — the generated colors match `buildTheme()` from `@sanity/ui/theme` with no options exactly.

`buildPalette` returns the generated `@sanity/color`-shaped palette without building a theme from it, and `presets` ships the hosted Themer service presets translated to `buildTheme` options:

```ts
import {buildTheme, presets} from '@sanity/themer'

const verdant = presets.find((preset) => preset.slug === 'verdant')
const theme = buildTheme(verdant.options)
```

## Studio tool

`@sanity/themer/tool` adds a themer sidebar to the Studio for these themes: presets, accent/text/background pickers and a contrast slider preview a `buildTheme` theme live on the whole Studio, plus the snippet to make it permanent:

```ts
import {themerTool} from '@sanity/themer/tool'
import {defineConfig} from 'sanity'

export default defineConfig({
  plugins: [themerTool()],
  // ...rest of the config
})
```

If the Studio already uses a `buildTheme` theme, pass the same options so the tool starts editing from them: `themerTool({config: {accent: '#1cb485'}})`.

## Migrating from themer.sanity.build

The npm migration path off the hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) is [`@sanity/themer-legacy`](https://www.npmjs.com/package/@sanity/themer-legacy): the exact same generator, running locally.

`@sanity/themer/legacy` still works as a deprecated re-export of that package until `@sanity/themer@1.0` removes it. Swap the import specifier to migrate:

```diff
-import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8'
+import {buildThemeFromUrl} from '@sanity/themer-legacy'
+const theme = buildThemeFromUrl('https://themer.sanity.build/api/huespreset=verdant&primary=22fca8')
+import {buildThemeFromUrl} from '@sanity/themer-legacy'
```

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
