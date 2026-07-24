import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const config: UserConfig = await defineConfig({
  entry: {
    'index': './exports/index.ts',
    'theme': './exports/theme.ts',
    '_visual-editing': './exports/_visual-editing.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.dist.json',
  styledComponents: true,
  reactCompiler: {target: '18'},
})

const baseOutputOptions = config.outputOptions

// Emit shared (non-entry) chunks to `dist/_chunks/` so they can never collide
// with entry filenames. Code shared between the `index` and `theme` entries
// forms a chunk that rolldown also names `theme`: the JS output deduplicates
// in favor of the entry (`theme.mjs` + `theme2.mjs`), but the d.ts output
// resolved the collision the other way around, placing the shared chunk (which
// re-exports everything under minified aliases like `buildTheme as x`) at
// `theme.d.ts` and the entry's declarations at `theme2.d.ts`. TypeScript picks
// up the `theme.d.(m)ts` sibling of `theme.(m)js`, so named imports from
// `@sanity/ui/theme` failed with TS2460 (https://github.com/sanity-io/ui/issues/2262).
config.outputOptions = async (outputOptions, format, context) => {
  const base =
    typeof baseOutputOptions === 'function'
      ? await baseOutputOptions(outputOptions, format, context)
      : baseOutputOptions

  return {
    ...outputOptions,
    ...base,
    // Preserve dir/file from the resolved options: spreading only `base` can
    // drop them, and tsdown's report plugin then crashes on path.resolve(cwd, undefined).
    dir: base?.dir ?? outputOptions.dir,
    file: base?.file ?? outputOptions.file,
    chunkFileNames: `_chunks/[name].${format === 'cjs' ? 'js' : 'mjs'}`,
  }
}

export default config
