# @sanity/themer

Recreate [Sanity Studio](https://www.sanity.io/studio) themes from the hosted Themer service locally, and preview them with a Studio tool.

This package is the npm migration path off the hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) — the generators run locally, so Studio configs no longer need to import modules from a hosted URL. The `@sanity/themer/legacy` subpath generates the exact same colors the service serves, and `@sanity/themer/tool` is a Studio plugin for editing and previewing those themes on your own Studio. There is no root export yet — a modern generator API may come later.

```sh
npm install @sanity/themer
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

The generated theme carries no `__themer` flag, which is the one intentional difference from the hosted module. Sanity Studio uses that flag to throw away the fonts the hosted module bundled, because they had drifted from the Studio's own; here the fonts come from the `@sanity/ui` installed next to the Studio, so there is nothing to throw away.

## The Studio tool

The `themerTool` plugin edits and previews legacy themes live on your own Studio (requires `sanity` v6):

```ts
// sanity.config.ts
import {themerTool} from '@sanity/themer/tool'
import {defineConfig} from 'sanity'

export default defineConfig({
  plugins: [themerTool()],
  // ...rest of the config
})
```

A color wheel toggle in the navbar opens the themer sidebar next to the active tool, so you can browse around the Studio while tweaking the theme. It has the hosted tool's editing model:

- Presets — the hosted service's preset themes as one-click starting points.
- Import — paste a `themer.sanity.build` URL (or just its query string) to load the exact theme it described, presets and per-hue overrides included.
- Hues — the six hues of a legacy theme (default, primary, transparent, positive, caution and critical), each with the mid color, the mid point tint it sits at, and the lightest and darkest ramp ends, previewed as the generated 50–950 tint ramp.

Toggle between light and dark mode with the regular appearance menu — the preview follows it. When the theme looks right, copy the generated `createTheme` snippet into the Studio config; it serializes only what differs from the default Studio hues.

If the Studio is already themed, pass the same hues to the plugin so the sidebar starts editing from them:

```ts
import {createTheme, parseHuesFromUrl} from '@sanity/themer/legacy'
import {themerTool} from '@sanity/themer/tool'
import {defineConfig} from 'sanity'

const hues = parseHuesFromUrl('https://themer.sanity.build/api/hues?preset=verdant')

export default defineConfig({
  theme: createTheme(hues),
  plugins: [themerTool({hues})],
})
```

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
