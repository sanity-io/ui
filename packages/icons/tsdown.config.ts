import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const base = defineConfig({
  tsconfig: './tsconfig.dist.json',
  // The root barrel plus one entry point per icon. The object-with-glob form maps
  // e.g. `src/exports/AccessDenied.tsx` → `@sanity/icons/AccessDenied`; the matched
  // filename replaces the `*` in the key, which is what drives the generated
  // `package.json` `exports` subpaths. Keeping these as separate entries lets
  // consumers import a single icon (or `React.lazy()` it) without pulling in the set.
  //
  // `icon` and `icons` are entries too, but only so the `Icon` component and the
  // `icons` map are emitted as their own chunks instead of being inlined into the
  // root barrel. They are kept out of the public `exports` map via `exports.exclude`
  // below — the barrel references them by relative path, so they don't need their
  // own subpaths.
  entry: [
    './src/index.ts',
    {
      'icon': './src/icon.tsx',
      'icons': './src/icons.ts',
      '*': './src/exports/*.tsx',
    },
  ],
})

// The explicit `UserConfig` annotation gives the default export a portable type
// name (via the direct `tsdown` dependency); without it `declaration` emit fails
// with TS2883 because `@sanity/tsdown-config` returns `tsdown`'s `UserConfig`.
const config: UserConfig = {
  ...base,
  exports: {
    ...(base.exports as Extract<UserConfig['exports'], object>),
    exclude: ['icon', 'icons'],
  },
}

export default config
