import pandacss from '@pandacss/rollup'
import {defineConfig} from '@sanity/tsdown-config'
import {mergeConfig} from 'tsdown'
import type {UserConfig} from 'tsdown'

// Zero-runtime variant of the library build, used only to measure what the
// Panda source transform (`transform: true`) saves: static `css()` / `cva()`
// call sites are rewritten to class strings, so the generated runtime is no
// longer referenced and tree-shakes away. Panda ships this as a Rollup plugin
// and documents Rolldown as working "through the Rollup adapter"; tsdown is
// built on Rolldown, which accepts Rollup plugins.
const base: UserConfig = await defineConfig({
  entry: {index: './src/index.ts'},
  tsconfig: 'tsconfig.dist.json',
  exports: false,
  dts: false,
  outDir: 'dist-transform',
  deps: {neverBundle: [/^react(\/|$)/, /^react-dom(\/|$)/]},
})

const config: UserConfig = mergeConfig(base, {
  plugins: [pandacss({transform: true, fileName: 'styles.css'})],
})

export default config
