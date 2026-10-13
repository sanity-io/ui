import stylex from '@stylexjs/unplugin'

import {versionScopedModuleResolution} from './stylex-options.mjs'

/**
 * `@stylexjs/unplugin` appends the collected CSS to an existing CSS asset of the
 * bundle, and otherwise writes a fallback to `<outDir>/assets/stylex.css`. A
 * library wants a stable, exported file, so this plugin seeds an empty
 * `stylex.css` asset for the unplugin to fill in (it runs first in the chain).
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
 * Rolldown plugins that compile StyleX inside a tsdown library build and emit
 * `dist/<fileName>` — the equivalent of `@sanity/tsdown-config`'s
 * `vanillaExtract: {fileName: 'styles.css'}` option.
 */
export function stylexLibraryPlugins({fileName = 'stylex.css', ...options} = {}) {
  return [
    seedCssAsset(fileName),
    stylex.rolldown({
      dev: false,
      // see scripts/stylex-options.mjs — version-scoped `defineVars` identifiers
      unstable_moduleResolution: versionScopedModuleResolution(),
      ...options,
    }),
  ]
}
