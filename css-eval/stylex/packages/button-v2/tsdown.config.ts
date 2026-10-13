import {defineConfig} from '@sanity/tsdown-config'
import {mergeConfig, type UserConfig} from 'tsdown'

import {stylexLibraryPlugins} from '../../scripts/stylex-tsdown.mjs'

// Same wrapper @sanity/ui builds with today (`@sanity/tsdown-config` → tsdown →
// rolldown). The StyleX compiler is added as a rolldown plugin through
// `@stylexjs/unplugin`; it rewrites `stylex.create()` calls to class-name
// objects in the JS output and writes the collected rules to `dist/stylex.css`,
// which `package.json#exports["./styles.css"]` publishes to consumers.
const config: UserConfig = mergeConfig(
  await defineConfig({
    // `tokens.stylex.ts` is its own entry so consumers can import the token
    // group from `<pkg>/tokens.stylex` and `createTheme()` over it.
    entry: ['./src/index.ts', './src/tokens.stylex.ts'],
    tsconfig: 'tsconfig.json',
    // package.json#exports is hand-written for this prototype (dist paths only),
    // so the wrapper's exports generation (dev exports → source) is disabled.
    exports: false,
    sourcemap: false,
    // the unplugin re-emits the seeded `stylex.css` asset with its content
    suppressWarnings: [/The emitted file stylex\.css overwrites/],
  }),
  {
    // the unplugin re-emits the CSS asset through `assetFileNames`
    outputOptions: {assetFileNames: '[name][extname]'},
    plugins: stylexLibraryPlugins(),
  },
)

export default config
