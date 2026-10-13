import fs from 'node:fs'
import path from 'node:path'

import stylexBabel from '@stylexjs/unplugin'
import stylexRs from '@stylexswc/unplugin/rollup'

import {versionScopedModuleResolution} from './stylex-options.mjs'

/**
 * Which StyleX compiler builds the libraries:
 *  - `babel` (default): the official `@stylexjs/babel-plugin` via `@stylexjs/unplugin`
 *  - `rs`: the community Rust port `@stylexswc/rs-compiler` (NAPI-RS + SWC) via
 *    `@stylexswc/unplugin` — the package referenced in facebook/stylex#1623
 */
export const STYLEX_COMPILER = process.env.STYLEX_COMPILER === 'rs' ? 'rs' : 'babel'

/**
 * `@stylexjs/unplugin` appends the collected CSS to an existing CSS asset of the
 * bundle, and otherwise writes a fallback to `<outDir>/assets/stylex.css`. A
 * library wants a stable, exported file, so this plugin seeds an empty
 * `stylex.css` asset for the unplugin to fill in (it runs first in the chain).
 * The unplugin re-emits the filled asset under the same name, which makes
 * rolldown print a harmless `FILE_NAME_CONFLICT` warning during the write phase
 * (outside tsdown's `suppressWarnings` path). A real `@sanity/tsdown-config`
 * integration would call `@stylexjs/babel-plugin` + `processStylexRules`
 * directly and emit the asset once.
 */
function seedCssAsset(fileName) {
  return {
    name: 'stylex-eval:seed-css-asset',
    generateBundle() {
      this.emitFile({type: 'asset', fileName, source: ''})
    },
  }
}

/**
 * The Rust compiler has no `custom` module resolution (its options cross a
 * NAPI boundary as data), so the version-scoped token identifiers of
 * `stylex-options.mjs` are not available. The remaining lever that both
 * compilers support is `classNamePrefix`: every class *and* variable name gets
 * a per-version prefix (`x100…` for 1.0.0), which rules out cross-version
 * collisions at the cost of cross-version dedupe.
 */
export function versionedClassNamePrefix(packageDir) {
  const pkg = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'))
  return `x${pkg.version.replace(/[^0-9]/g, '')}`
}

/**
 * Rolldown plugins that compile StyleX inside a tsdown library build and emit
 * `dist/<fileName>` — the equivalent of `@sanity/tsdown-config`'s
 * `vanillaExtract: {fileName: 'styles.css'}` option.
 */
export function stylexLibraryPlugins({packageDir, fileName = 'stylex.css', ...options} = {}) {
  // scripts/bench.mjs builds the same package without the compiler to isolate
  // its cost (the output is not usable: `stylex.create` stays a runtime call)
  if (process.env.STYLEX_EVAL_NO_STYLEX) return []

  if (STYLEX_COMPILER === 'rs') {
    return [
      // unplugin's rollup adapter; rolldown (and therefore tsdown) accepts
      // rollup plugins — there is no dedicated `rolldown` export in 0.19.1
      stylexRs({
        fileName,
        rsOptions: {
          dev: false,
          runtimeInjection: false,
          unstable_moduleResolution: {type: 'commonJS', rootDir: packageDir},
          classNamePrefix: process.env.STYLEX_RS_STOCK_PREFIX
            ? 'x'
            : versionedClassNamePrefix(packageDir),
          ...options,
        },
      }),
    ]
  }

  return [
    seedCssAsset(fileName),
    stylexBabel.rolldown({
      dev: false,
      // see scripts/stylex-options.mjs — version-scoped `defineVars` identifiers;
      // `STYLEX_BABEL_STOCK_RESOLUTION=1` uses StyleX's stock resolution so the
      // parity script can compare the two compilers end to end
      unstable_moduleResolution: process.env.STYLEX_BABEL_STOCK_RESOLUTION
        ? {type: 'commonJS', rootDir: packageDir}
        : versionScopedModuleResolution(),
      ...options,
    }),
  ]
}
