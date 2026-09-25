# @sanity/themer-legacy

The hosted Themer service ([themer.sanity.build](https://themer.sanity.build)) as an npm package: the exact same [Sanity Studio](https://www.sanity.io/studio) theme generator, running locally, and a Studio tool to edit its themes.

```sh
npm install @sanity/themer-legacy
```

## The Studio tool

`themerTool` from `@sanity/themer-legacy/tool` re-hosts the Themer's editor inside your own Studio, so the theme previews on your real content instead of a demo:

```ts
import {themerTool} from '@sanity/themer-legacy/tool'
import {defineConfig} from 'sanity'

export default defineConfig({
  plugins: [themerTool()],
  // ...rest of the config
})
```

A toggle in the navbar opens the sidebar with the hosted presets and the six hue editors — the mid, lightest and darkest colors, the mid-point slider that places `mid` on the 50–950 ramp, and the generated tints (click one to copy its hex). Every change applies to the whole Studio while you browse around. The preview follows the Studio's appearance setting, or shows light and dark side by side with **Split-screen**. Drafts are kept in `localStorage`, so they survive reloads; **Reset** returns to the theme the Studio is configured with.

The plugin is named `themer-legacy` and titled "Themer (Legacy)", so it can be installed next to `themerTool` from [`@sanity/themer/tool`](https://www.npmjs.com/package/@sanity/themer), which edits the current `buildTheme` themes.

## Migrating from themer.sanity.build

This package is the npm migration path off the hosted Themer service — the generator runs locally, so Studio configs no longer need to import modules from a hosted URL.

It generates the exact same colors as the hosted service, with the same `createTheme`, `hues` and `theme` exports that `https://themer.sanity.build/api/hues` served. Replace the URL import with `buildThemeFromUrl` and the URL as a string:

```ts
// Before:
import {theme} from 'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8'

// After:
import {buildThemeFromUrl} from '@sanity/themer-legacy'

const theme = buildThemeFromUrl(
  'https://themer.sanity.build/api/hues?preset=verdant&primary=22fca8',
)
```

Configs that used `createTheme` and `hues` from the URL import work the same way with `parseHuesFromUrl`:

```ts
// Before:
// import {createTheme, hues} from 'https://themer.sanity.build/api/hues?preset=verdant'

// After:
import {createTheme, parseHuesFromUrl} from '@sanity/themer-legacy'

const hues = parseHuesFromUrl('https://themer.sanity.build/api/hues?preset=verdant')

export default defineConfig({
  theme: createTheme({...hues, primary: {...hues.primary, mid: '#22fca8'}}),
  // ...rest of the config
})
```

The hosted presets are addressed by query, exactly like the service:

```ts
import {buildThemeFromUrl} from '@sanity/themer-legacy'

const theme = buildThemeFromUrl('?preset=verdant')
```

Once migrated, remove any `themer.d.ts` module declarations and `urlImports` config that the URL imports needed.

To move on to the `buildTheme` themes of [`@sanity/themer`](https://www.npmjs.com/package/@sanity/themer) instead, paste the URL into its themer tool, which converts the theme — see [its migration guide](https://www.npmjs.com/package/@sanity/themer#migrating-from-themersanitybuild). That is a different generator, so the colors come out close to, not exactly like, the hosted ones.

The generated theme carries no `__themer` flag, which is the one intentional difference from the hosted module. Sanity Studio uses that flag to throw away the fonts the hosted module bundled, because they had drifted from the Studio's own; here the fonts come from the `@sanity/ui` this package depends on, so there is nothing to throw away.

## Migrating from `@sanity/themer/legacy`

The generator used to ship as the `@sanity/themer/legacy` subpath of [`@sanity/themer`](https://www.npmjs.com/package/@sanity/themer). That subpath still works as a deprecated re-export of this package until `@sanity/themer@1.0` removes it — swap the import specifier to migrate:

```diff
-import {buildThemeFromUrl} from '@sanity/themer/legacy'
+import {buildThemeFromUrl} from '@sanity/themer-legacy'
```

## License

MIT © Sanity.io — see [LICENSE](https://github.com/sanity-io/ui/blob/main/LICENSE)
