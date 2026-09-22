# @sanity/themer

Generate [Sanity Studio](https://www.sanity.io/studio) themes from a handful of colors.

```sh
npm install @sanity/themer
```

## Usage

`buildTheme` builds the same type of theme as `buildTheme` from `@sanity/ui/theme` — ready for the `theme` property of a Studio config — but takes a handful of colors per color scheme instead of design tokens. Under the hood it only swaps out the color palette that `@sanity/ui/theme` otherwise fills with [`@sanity/color`](https://www.sanity.io/docs/color), once for each scheme:

```ts
import {buildTheme} from '@sanity/themer'
import {defineConfig} from 'sanity'

export const theme = buildTheme({
  light: {
    accent: '#f00',
    text: '#727892',
    background: '#ffffff',
    contrast: 85, // 15–100
  },
  dark: {
    accent: '#f66',
    background: '#0d0e12',
  },
})

export default defineConfig({
  theme,
  // ...rest of the config
})
```

Everything is optional — both schemes, and every color in them. Whatever is omitted falls back to the stock Studio colors, so `buildTheme({})` matches `buildTheme()` from `@sanity/ui/theme` with no options exactly, and the two schemes are free to differ in every color rather than only their background:

- `accent` replaces the `blue` scale of the scheme's palette, which Sanity UI uses for primary buttons, focus rings and links.
- `text` replaces the `gray` scale — text, icons, borders and neutral surfaces. When omitted it is derived from `accent`: a mostly desaturated version of it, the way the stock gray carries a hint of the stock blue.
- `background` replaces `black` in the dark scheme and `white` in the light scheme — the background that every other color of the scheme blends onto.
- `contrast` controls how strongly text and borders separate from the accent. The default `85` uses the text color as-is; `100` removes its tint entirely (a high contrast scheme with no mixing of text and accent), and lower values blend more and more of the accent into the text scale, giving text and borders more color.

A few ground rules keep the generated palettes usable: the accent and text colors cannot be too dark or too light (they would mess with the rest of their scales), the dark background is made darker until it has enough contrast with both of them (it can never be lighter than either), and the light background can never be darker than either.

`buildPalette` returns the generated `@sanity/color`-shaped palettes (`{light, dark}`) without building a theme from them, and `presets` ships the hosted Themer service presets translated to `buildTheme` options:

```ts
import {buildTheme, presets} from '@sanity/themer'

const verdant = presets.find((preset) => preset.slug === 'verdant')
const theme = buildTheme(verdant.options)
```

## Studio tool

`@sanity/themer/tool` adds a themer sidebar to the Studio for these themes. It lists the configured theme, the presets and your own themes, each previewed as a tiny Studio in both color schemes, and picking one applies it live to the whole Studio while you browse around. Your own themes are edited scheme by scheme — a light mode and a dark mode card with accent/text/background pickers and a contrast slider each, the one the Studio is showing marked as active — add one from scratch or duplicate a preset to start from it, and remove and restore them. A dialog shows the `buildTheme` snippet that makes the applied theme permanent:

```ts
import {themerTool} from '@sanity/themer/tool'
import {defineConfig} from 'sanity'

export default defineConfig({
  plugins: [themerTool()],
  // ...rest of the config
})
```

If the Studio already uses a `buildTheme` theme, pass the same options so the tool starts editing from them: `themerTool({config: {light: {accent: '#1cb485'}}})`.

## Migrating from themer.sanity.build

This package is also the npm migration path off the hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) — the generator runs locally, so Studio configs no longer need to import modules from a hosted URL.

`@sanity/themer/legacy` generates the exact same colors as the hosted service, with the same `createTheme`, `hues` and `theme` exports that `https://themer.sanity.build/api/hues` served. Replace the URL import with `buildThemeFromUrl` and the URL as a string:

```ts
// Before:
import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8'

// After:
import {buildThemeFromUrl} from '@sanity/themer/legacy'

const theme = buildThemeFromUrl(
  'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8',
)
```

Configs that used `createTheme` and `hues` from the URL import work the same way with `parseHuesFromUrl`:

```ts
// Before:
// import {createTheme, hues} from 'https://themer.sanity.build/api/hues?preset=verdant'

// After:
import {createTheme, parseHuesFromUrl} from '@sanity/themer/legacy'

const hues = parseHuesFromUrl('https://themer.sanity.build/api/hues?preset=verdant')

export default defineConfig({
  theme: createTheme({...hues, primary: {...hues.primary, mid: '#22fca8'}}),
  // ...rest of the config
})
```

The hosted presets are addressed by query, exactly like the service:

```ts
import {buildThemeFromUrl} from '@sanity/themer/legacy'

const theme = buildThemeFromUrl('?preset=verdant')
```

Once migrated, remove any `themer.d.ts` module declarations and `urlImports` config that the URL imports needed.

The generated theme carries no `__themer` flag, which is the one intentional difference from the hosted module. Sanity Studio uses that flag to throw away the fonts the hosted module bundled, because they had drifted from the Studio's own; here the fonts come from the `@sanity/ui` installed next to the Studio, so there is nothing to throw away.

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
