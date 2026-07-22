import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

// The root barrel plus one entry point per icon. The object-with-glob form maps
// e.g. `src/exports/AccessDenied.tsx` → `@sanity/icons/AccessDenied`; the matched
// filename replaces the `*` in the key, which is what drives the generated
// `package.json` `exports` subpaths. Keeping these as separate entries lets
// consumers import a single icon (or `React.lazy()` it) without pulling in the set.
//
// The `Icon` component and the `icons` map are not entries: only the root barrel
// imports them, so they are inlined into `dist/index.js` (the map's lazy per-icon
// `import()` calls still resolve to the per-icon entry chunks).
//
// No `await`: tsdown accepts a promise default export (`UserConfigExport` is
// `Awaitable<…>`) and awaits it itself. The explicit `Promise<UserConfig>`
// annotation gives the default export a portable type name (via the direct
// `tsdown` dependency); without it `declaration` emit fails with TS2883
// because `@sanity/tsdown-config` returns `tsdown`'s `UserConfig`.
const config: Promise<UserConfig> = defineConfig({
  tsconfig: './tsconfig.dist.json',
  entry: [
    './src/index.ts',
    {
      '*': './src/exports/*.tsx',
    },
  ],
})

export default config
