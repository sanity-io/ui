# @sanity/themer

Generate [Sanity Studio](https://www.sanity.io/studio) themes, and preview them with a Studio tool.

This package is the npm migration path off the hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) — the generators run locally, so Studio configs no longer need to import modules from a hosted URL.

```sh
npm install @sanity/themer
```

## Usage

Generate a theme from a handful of colors:

```ts
// sanity.config.ts
import {createTheme} from '@sanity/themer'
import {defineConfig} from 'sanity'

export default defineConfig({
  theme: createTheme({primary: '#2276fc'}),
  // ...rest of the config
})
```

Every color is optional — omitted colors keep their default Sanity ramps:

| Color      | Drives                                  |
| ---------- | --------------------------------------- |
| `primary`  | Buttons, focus rings, links, selections |
| `gray`     | Neutral surfaces, borders and text      |
| `positive` | Success accents                         |
| `caution`  | Warning accents                         |
| `critical` | Errors and destructive actions          |
| `lightest` | Light mode background                   |
| `darkest`  | Dark mode background                    |

Preset themes are available from the `presets` export:

```ts
import {createTheme, presets} from '@sanity/themer'

const verdant = presets.find((preset) => preset.slug === 'verdant')
const theme = createTheme(verdant.colors)
```

For customization beyond colors, `themeConfigFromColors` maps colors to a [`@sanity/ui`](https://github.com/sanity-io/ui) `ThemeConfig` to pass to `buildTheme`:

```ts
import {themeConfigFromColors} from '@sanity/themer'
import {buildTheme} from '@sanity/ui/theme'

const theme = buildTheme({
  ...themeConfigFromColors({primary: '#2276fc'}),
  // ...other ThemeConfig properties
})
```

## The Studio tool

The `themerTool` plugin previews generated themes live on your own Studio (requires `sanity` v6):

```ts
// sanity.config.ts
import {themerTool} from '@sanity/themer/tool'
import {defineConfig} from 'sanity'

export default defineConfig({
  plugins: [themerTool()],
  // ...rest of the config
})
```

A color wheel toggle in the navbar opens the themer sidebar next to the active tool, so you can browse around the Studio while tweaking presets and colors. Toggle between light and dark mode with the regular appearance menu — the preview follows it. When the theme looks right, copy the generated `createTheme` snippet into the Studio config.

If the Studio is already themed, pass the same colors to the plugin so the sidebar starts editing from them:

```ts
import {createTheme} from '@sanity/themer'
import {themerTool} from '@sanity/themer/tool'
import {defineConfig} from 'sanity'

const colors = {primary: '#2276fc'}

export default defineConfig({
  theme: createTheme(colors),
  plugins: [themerTool({colors})],
})
```

## Migrating from themer.sanity.build

`@sanity/themer/legacy` generates the exact same colors as the hosted service, with the same `createTheme`, `hues` and `theme` exports that `https://themer.sanity.build/api/hues` served. Replace the URL import with `createThemeFromUrl` and the URL as a string:

```ts
// Before:
import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8'

// After:
import {createThemeFromUrl} from '@sanity/themer/legacy'

const theme = createThemeFromUrl(
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

The hosted presets are also available directly:

```ts
import {createTheme, getPreset} from '@sanity/themer/legacy'

const theme = createTheme(getPreset('verdant').hues)
```

Once migrated, remove any `themer.d.ts` module declarations and `urlImports` config that the URL imports needed.

The legacy API is frozen — it exists to make leaving the hosted service painless. New themes should use `createTheme` from the `@sanity/themer` root export instead.

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
