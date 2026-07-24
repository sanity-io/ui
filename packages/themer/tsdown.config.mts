import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const config: UserConfig = await defineConfig({
  entry: {
    index: './src/index.ts',
    legacy: './src/legacy/index.ts',
    tool: './src/tool/index.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.dist.json',
})

const baseOutputOptions = config.outputOptions

// Emit shared (non-entry) chunks to `dist/_chunks/` so they can never collide
// with entry filenames (the `index` and `tool` entries share the theme
// generator code). See https://github.com/sanity-io/ui/issues/2262 for the
// d.ts collision this prevents.
config.outputOptions = async (outputOptions, format, context) => {
  const base =
    typeof baseOutputOptions === 'function'
      ? await baseOutputOptions(outputOptions, format, context)
      : baseOutputOptions

  return {
    ...outputOptions,
    ...base,
    dir: base?.dir ?? outputOptions.dir,
    file: base?.file ?? outputOptions.file,
    chunkFileNames: `_chunks/[name].${format === 'cjs' ? 'cjs' : 'js'}`,
  }
}

export default config
