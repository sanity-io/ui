# @sanity/themer

Recreate [Sanity Studio](https://www.sanity.io/studio) themes from the hosted Themer service locally.

This package is the npm migration path off the hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) — the generator runs locally, so Studio configs no longer need to import modules from a hosted URL. The `@sanity/themer/legacy` subpath generates the exact same colors the service serves. There is no root export yet.

```sh
npm install @sanity/themer
```

## Migrating from themer.sanity.build

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

The hosted presets are also available directly:

```ts
import {createTheme, getPreset} from '@sanity/themer/legacy'

const theme = createTheme(getPreset('verdant').hues)
```

Once migrated, remove any `themer.d.ts` module declarations and `urlImports` config that the URL imports needed.

The generated theme carries no `__themer` flag, which is the one intentional difference from the hosted module. Sanity Studio uses that flag to throw away the fonts the hosted module bundled, because they had drifted from the Studio's own; here the fonts come from the `@sanity/ui` installed next to the Studio, so there is nothing to throw away.

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
