import {defineConfig} from '@sanity/tsdown-config'

// The root barrel plus one entry point per icon. The object-with-glob form maps
// e.g. `src/exports/AccessDenied.tsx` → `@sanity/icons/AccessDenied`; the matched
// filename replaces the `*` in the key, which is what drives the generated
// `package.json` `exports` subpaths. Keeping these as separate entries lets
// consumers import a single icon (or `React.lazy()` it) without pulling in the set.
//
// The `Icon` component and the `icons` map are not entries: only the root barrel
// imports them, so they are inlined into `dist/index.js` (the map's lazy per-icon
// `import()` calls still resolve to the per-icon entry chunks).
export default defineConfig({
  tsconfig: './tsconfig.dist.json',
  entry: [
    './src/index.ts',
    {
      '*': './src/exports/*.tsx',
    },
  ],
})
