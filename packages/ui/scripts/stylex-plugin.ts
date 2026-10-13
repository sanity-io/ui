import stylexRollup from '@stylexswc/unplugin/rollup'
import stylexVite from '@stylexswc/unplugin/vite'

import {stylexPluginOptions} from './stylex-options'

const CSS_FILE = 'styles.css'
const SHIM_JS = 'styles-css.js'
const SHIM_DTS = 'styles-css.d.ts'

const SHIM_SOURCE = `// No-op shim for \`styles.css\`, resolved by the \`node\`/\`default\` conditions of the
// conditional CSS export so the self-referential import is harmless in runtimes that cannot
// load \`.css\` files. Intentionally has no JS syntax: it parses as both CommonJS and an ES
// module, regardless of the package \`type\`.
`

const SHIM_DTS_SOURCE = `// Type declarations for \`styles.css\` and its no-op JS shim.
export {}
`

const CONDITIONAL_EXPORT = {
  types: './dist/styles-css.d.ts',
  browser: './dist/styles.css',
  style: './dist/styles.css',
  node: './dist/styles-css.js',
  default: './dist/styles-css.js',
}

interface BundleAsset {
  type: string
  fileName?: string
}

interface EmitFileThis {
  emitFile: (file: {type: 'asset'; fileName: string; source: string}) => void
}

interface TsdownExports {
  enabled?: string
  customExports?: unknown
}

/**
 * Emits the node/default shim next to `styles.css` and keeps the conditional
 * `./styles.css` export that `@sanity/ui` already publishes. The vanilla-extract
 * tsdown option used to do this. `@sanity/tsdown-config` has no StyleX option,
 * so the wiring stays in this repo.
 */
function stylesCssNodeCompat() {
  return {
    name: 'sanity-ui:styles-css-node-compat',
    // tsdown calls this hook. Rolldown ignores hooks it does not know.
    tsdownConfig(config: {exports?: unknown}) {
      const exportsOption = config.exports

      if (!exportsOption || exportsOption === false) return

      const exportsOptions: TsdownExports =
        exportsOption === true
          ? {}
          : typeof exportsOption === 'string'
            ? {enabled: exportsOption}
            : {...exportsOption}

      const previous = exportsOptions.customExports

      exportsOptions.customExports = async (
        exportsMap: Record<string, unknown>,
        context: unknown,
      ) => {
        const base = await resolveExports(exportsMap, context, previous)

        return insertCssExport(base)
      }

      config.exports = exportsOptions
    },
    generateBundle: {
      order: 'post' as const,
      handler(this: EmitFileThis, _options: unknown, bundle: Record<string, BundleAsset>) {
        const css = Object.values(bundle).find(
          (item) => item.type === 'asset' && item.fileName === CSS_FILE,
        )

        if (!css) return

        if (!bundle[SHIM_JS]) {
          this.emitFile({type: 'asset', fileName: SHIM_JS, source: SHIM_SOURCE})
        }

        if (!bundle[SHIM_DTS]) {
          this.emitFile({type: 'asset', fileName: SHIM_DTS, source: SHIM_DTS_SOURCE})
        }
      },
    },
  }
}

async function resolveExports(
  exportsMap: Record<string, unknown>,
  context: unknown,
  previous: unknown,
): Promise<Record<string, unknown>> {
  if (typeof previous === 'function') {
    const resolved: unknown = await previous(exportsMap, context)

    if (resolved && typeof resolved === 'object') {
      return Object.fromEntries(Object.entries(resolved))
    }
  }

  if (previous && typeof previous === 'object') {
    return {...exportsMap, ...Object.fromEntries(Object.entries(previous))}
  }

  return exportsMap
}

function insertCssExport(exportsMap: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = {}
  let inserted = false

  for (const [key, value] of Object.entries(exportsMap)) {
    if (key === './styles.css') continue

    if (key === './package.json' && !inserted) {
      next['./styles.css'] = CONDITIONAL_EXPORT
      inserted = true
    }

    next[key] = value
  }

  if (!inserted) next['./styles.css'] = CONDITIONAL_EXPORT

  return next
}

export function stylexTsdownPlugins() {
  return [stylexRollup(stylexPluginOptions), stylesCssNodeCompat()]
}

export function stylexVitePlugin() {
  // Serve mode cannot `emitFile` a stylesheet. A CSS module that contains
  // `@stylex;` receives the same `transformCss` output, including in tests.
  return stylexVite({...stylexPluginOptions, useCssPlaceholder: true})
}
