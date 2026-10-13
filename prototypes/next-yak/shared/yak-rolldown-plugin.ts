import {transform as swcTransform} from '@swc/core'
import {parseExports, parseModule, resolveCrossFileConstant} from 'next-yak/cross-file-resolver'
import {createEvaluator, type Evaluator} from 'next-yak/isolated-source-eval'
import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {dirname, relative, resolve} from 'node:path'
import type {Plugin} from 'rolldown'

const require = createRequire(import.meta.url)

export interface YakRolldownPluginOptions {
  /** Hash base for file paths, must be the same on every machine (defaults to the package root) */
  basePath?: string
  /** Class/variable name prefix, see yak-prefix.ts */
  prefix?: string
  /** Name of the emitted stylesheet, relative to the output dir */
  cssFileName?: string
  minify?: boolean
}

const VIRTUAL_PREFIX = 'virtual:yak-css:'
const RESOLVED_PREFIX = `\0${VIRTUAL_PREFIX}`
const SOURCE_FILE = /\.(tsx?|m?jsx?)$/
const DTS_CHUNK = /\.d\.[cm]?ts$/

/**
 * Feasibility probe for `@sanity/ui`'s tsdown build: next-yak ships no rolldown/tsdown plugin
 * (only Vite, webpack, Turbopack and Rsbuild integrations), but the compiler is a plain SWC wasm
 * plugin and the cross-file resolver is exported, so a bundler integration is ~120 lines:
 *
 *  1. `transform`: run SWC with the yak wasm plugin on every module that imports `next-yak`.
 *     The plugin injects `import "virtual:yak-css:<relative path>.css"` and leaves the CSS in
 *     `/*YAK Extracted CSS:…*\/` comments; cross-file constants (`${vars.x}`) are left as
 *     `--yak-css-import: url(...)` placeholders that `resolveCrossFileConstant` fills in.
 *  2. `resolveId`/`load`: the virtual CSS import becomes an empty side-effect JS module, so the
 *     CSS stays attached to the chunk graph without relying on rolldown's own CSS pipeline.
 *  3. `generateBundle`: concatenate the CSS of every module in chunk order into one asset —
 *     the same shape `@sanity/vanilla-extract-rolldown-plugin` uses for `styles.css`.
 *
 * Not covered here (would be needed for production): lightningcss minification/lowering of the
 * emitted CSS, `inject`/nodeCompat `exports` wiring, watch-mode invalidation of `.yak.ts`
 * dependencies, source maps for the CSS, and per-file caching.
 */
export function yakRolldownPlugin(options: YakRolldownPluginOptions = {}): Plugin {
  const yakSwcWasm = resolve(
    dirname(require.resolve('yak-swc/package.json')),
    require('yak-swc/package.json').main as string,
  )
  const cssFileName = options.cssFileName ?? 'index.css'
  const cssByModule = new Map<string, string>()
  let basePath = options.basePath ?? process.cwd()
  let evaluator: Evaluator | undefined

  const transform = (code: string, file: string, emitCssComments: boolean) =>
    swcTransform(code, {
      filename: file,
      sourceMaps: true,
      sourceFileName: file,
      sourceRoot: basePath,
      isModule: true,
      jsc: {
        parser: {syntax: 'typescript', tsx: /\.[jt]sx$/.test(file)},
        target: 'es2022',
        transform: {react: {runtime: 'preserve'}},
        preserveAllComments: true,
        experimental: {
          keepImportAttributes: true,
          plugins: [
            [
              yakSwcWasm,
              {
                minify: options.minify ?? true,
                basePath,
                prefix: options.prefix,
                displayNames: false,
                foldStatic: true,
                strictCssProp: true,
                emitCssComments,
                importMode: {
                  value: `${VIRTUAL_PREFIX}{{__MODULE_PATH__}}.css`,
                  transpilation: 'Css',
                  encoding: 'None',
                },
              },
            ],
          ],
        },
      },
    })

  const extractCss = (code: string) =>
    code
      .split('/*YAK Extracted CSS:\n')
      .slice(1)
      .map((part) => part.split('*/')[0])
      .join('')

  return {
    name: 'yak-rolldown',
    options(inputOptions) {
      if (options.basePath) return
      const [entry] = Array.isArray(inputOptions.input)
        ? inputOptions.input
        : Object.values(inputOptions.input ?? {})
      if (typeof entry === 'string') basePath = dirname(resolve(entry)).replace(/[\\/]src$/, '')
    },
    async buildStart() {
      evaluator ??= await createEvaluator()
    },
    async closeBundle() {
      await evaluator?.dispose()
      evaluator = undefined
    },
    transform: {
      filter: {id: SOURCE_FILE, code: 'next-yak'},
      async handler(code, id) {
        const result = await transform(code, id, true)
        const css = extractCss(result.code)
        if (css) {
          const {resolved} = await resolveCrossFileConstant(
            {
              parse: (modulePath) =>
                parseModule(
                  {
                    transpilationMode: 'Css',
                    extractExports: async (p) => parseExports(await readFile(p, 'utf8')),
                    getTransformed: async (p) => transform(await readFile(p, 'utf8'), p, true),
                    evaluateYakModule: async (p) => {
                      const evaluation = await evaluator!.evaluate(p)
                      if (!evaluation.ok) throw new Error(evaluation.error.message)
                      for (const dep of evaluation.dependencies) this.addWatchFile(dep)
                      return evaluation.value
                    },
                  },
                  modulePath,
                ),
              resolve: async (specifier, importer) => {
                const r = await this.resolve(specifier, importer)
                if (!r) throw new Error(`Could not resolve ${specifier} from ${importer}`)
                return r.id
              },
            },
            id,
            css,
          )
          cssByModule.set(relative(basePath, id).split('\\').join('/'), resolved)
        }
        return {code: result.code, map: result.map}
      },
    },
    resolveId: {
      filter: {id: /^virtual:yak-css:/},
      handler(id) {
        // `.css.js`: tsdown's css-guard rejects ids ending in `.css` unless @tsdown/css is
        // installed, and this module is an empty JS carrier anyway (same trick as
        // @sanity/vanilla-extract-rolldown-plugin)
        return `\0${id}.js`
      },
    },
    load: {
      filter: {id: /^\0virtual:yak-css:/},
      handler() {
        return {code: '', moduleType: 'js', moduleSideEffects: 'no-treeshake'}
      },
    },
    generateBundle(_outputOptions, bundle) {
      const chunks = Object.values(bundle).filter(
        (item) => item.type === 'chunk' && !DTS_CHUNK.test(item.fileName),
      )
      const seen = new Set<string>()
      let css = ''
      for (const chunk of chunks) {
        if (chunk.type !== 'chunk') continue
        for (const moduleId of chunk.moduleIds) {
          if (!moduleId.startsWith(RESOLVED_PREFIX)) continue
          const key = moduleId.slice(RESOLVED_PREFIX.length, -'.css.js'.length)
          if (seen.has(key)) continue
          seen.add(key)
          css += cssByModule.get(key) ?? ''
        }
      }
      if (css) this.emitFile({type: 'asset', fileName: cssFileName, source: css})
    },
  }
}
