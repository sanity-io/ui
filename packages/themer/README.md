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

`@sanity/themer/tool` adds a themer sidebar to the Studio for these themes. It lists the configured theme, the presets and your own themes, each previewed as a tiny Studio in both color schemes, and picking one applies it live to the whole Studio while you browse around — in the appearance the Studio is set to or, with the split-screen toggle in the sidebar header, twice: the Studio next to the sidebar keeps the appearance it is set to, and a copy in the opposite scheme slides in on the far side (or on top, on small screens, where the sidebar covers the Studio instead of standing next to it). Your own themes are edited scheme by scheme — a light mode and a dark mode card with accent/text/background pickers and a contrast slider each, the one the Studio is showing marked as active — add one from scratch, duplicate a preset to start from it, or take the colors from an image: its palette is read on device (the image is drawn onto a canvas and its vibrant and muted colors extracted right there, nothing is uploaded), the vibrant color becomes the accent (adjusted until a button label reads on it), the muted one the text color and the light and dark muted colors tint the backgrounds, and a row of variants previews the theme built around each swatch instead — with an "I'm feeling lucky" button that picks an interesting one. Themes can be removed and restored, and a dialog shows the `buildTheme` snippet that makes the applied theme permanent:

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

The npm migration path off the hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) is [`@sanity/themer-legacy`](https://www.npmjs.com/package/@sanity/themer-legacy): the exact same generator, running locally.

`@sanity/themer/legacy` still works as a deprecated re-export of that package until `@sanity/themer@1.0` removes it; import from `@sanity/themer-legacy` instead. Migrating a hosted URL import looks like this:

```diff
-import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8'
+import {buildThemeFromUrl} from '@sanity/themer-legacy'
+const theme = buildThemeFromUrl('https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8')
```

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
