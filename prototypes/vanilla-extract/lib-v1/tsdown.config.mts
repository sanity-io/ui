import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

import {
  IDENTIFIER_MODES,
  identifiersForMode,
  type IdentifiersMode,
  readPackageIdentity,
} from '../identifiers/versionedIdentifiers'

// `VE_IDENTIFIERS` selects the naming strategy under test (see ../README.md):
//   default         — upstream `short` names (the control; reproduces SAPP-4639)
//   version         — upstream `identifiers` function salted with name@version
//   version+module  — … plus a hash of each .css.ts module's source
//   content         — content-hashed names (needs the patched @vanilla-extract/css, see ../patches)
const mode = (process.env.VE_IDENTIFIERS ?? 'version') as IdentifiersMode
if (!IDENTIFIER_MODES.includes(mode)) {
  throw new Error(`VE_IDENTIFIERS must be one of ${IDENTIFIER_MODES.join(', ')}, got "${mode}"`)
}

const root = process.cwd()
const identity = readPackageIdentity(new URL('./package.json', import.meta.url).pathname)

const config: UserConfig = await defineConfig({
  entry: {index: './src/index.ts'},
  outDir: process.env.VE_OUT_DIR ?? `dist/${mode}`,
  tsconfig: 'tsconfig.json',
  dts: true,
  // Leave package.json alone: the same source is built once per naming mode.
  exports: false,
  vanillaExtract: {
    fileName: 'styles.css',
    inject: false,
    exports: false,
    minify: false,
    // The whole fix. `identifiersForMode` returns upstream's `'short'` for the control build
    // and a plain function — upstream's public `identifiers` option — for the salted builds.
    identifiers: identifiersForMode(mode, identity, root),
  },
})

// publint checks package.json against one dist layout; this package is built once per mode.
export default {...config, publint: false}
