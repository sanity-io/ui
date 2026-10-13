import {defaultCompareMediaQueries, type CSSRulesByBucket, type GriffelRenderer} from '@griffel/core'
import {sortCSSRules} from '@griffel/css-extraction-utils'
import {EvalCache, transformSync, type TransformResolver} from '@griffel/transform'
import {createResolverFactory} from '@griffel/vite-plugin'
import MagicString from 'magic-string'
import {parseSync} from 'oxc-parser'
import {ScopeTracker, type ScopeTrackerImport, walk} from 'oxc-walker'
import type {Plugin} from 'rolldown'

/**
 * How the precompiled styles reach the browser.
 *
 * - `inject` — the Fluent UI publishing model: `makeStyles()` becomes
 *   `__styles(classesMap, cssRules)`. Class names are computed at build time, the
 *   CSS rules travel inside the JS and the Griffel runtime inserts them into
 *   `<style data-make-styles-bucket>` elements on first render. Consumers need no
 *   CSS import and no bundler plugin; SSR uses `renderToStyleElements()`.
 * - `extract` — `makeStyles()` becomes `__css(classesMap)` and every rule is
 *   written to {@link GriffelPluginOptions.fileName}, like `@sanity/ui/styles.css`
 *   today. The runtime then does no DOM insertion at all.
 */
export type GriffelOutputMode = 'inject' | 'extract'

export interface GriffelPluginOptions {
  /** @defaultValue `'inject'` */
  mode?: GriffelOutputMode
  /**
   * Name of the stylesheet asset. In `extract` mode this is the stylesheet consumers
   * must load. In `inject` mode it is still emitted (sorted the same way the runtime
   * orders its buckets) so the CSS footprint can be measured and diffed between
   * releases, but the runtime never reads it. `false` disables the asset.
   * @defaultValue `'styles.css'`
   */
  fileName?: string | false
  /** Salt mixed into every class hash (`createDOMRenderer({classNameHashSalt})` must match). */
  classNameHashSalt?: string
  /** @defaultValue `/\.[cm]?[jt]sx?$/` */
  include?: RegExp
  exclude?: RegExp
  /** Modules whose `makeStyles`/`makeResetStyles`/`makeStaticStyles` exports are compiled. */
  importsToTransform?: string[]
  compareMediaQueries?: GriffelRenderer['compareMediaQueries']
  compareContainerQueries?: GriffelRenderer['compareContainerQueries']
}

const DEFAULT_INCLUDE = /\.[cm]?[jt]sx?$/
// tsdown's declaration bundling runs `transform` hooks on `.d.ts` files as well
const DEFAULT_EXCLUDE = /\.d\.[cm]?ts$/
const DEFAULT_IMPORTS = ['@griffel/core', '@griffel/react']
const QUICK_CHECK = /makeStyles|makeResetStyles|makeStaticStyles/

/**
 * `@griffel/transform` always emits the extraction shape (`__css`, `__resetCSS`,
 * `__staticCSS`) and hands the CSS rules back separately. The `inject` shape
 * differs only in the runtime identifier and in the CSS rules argument.
 */
const INJECT_IDENTIFIERS: Record<string, {name: string; appendRules: boolean}> = {
  __css: {name: '__styles', appendRules: true},
  __resetCSS: {name: '__resetStyles', appendRules: true},
  // `__staticCSS` already receives `{d: [...]}`, which is the `__staticStyles` argument
  __staticCSS: {name: '__staticStyles', appendRules: false},
}

const RULES_IDENTIFIER = '__griffelCssRules'

function isNonESMError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('is not an ES module')
}

/**
 * Rewrites the extraction shape produced by `@griffel/transform` into the
 * runtime-injection shape. The CSS of the whole file is attached to every call:
 * the renderer dedupes rules by their text (`insertionCache`), so the extra
 * references cost nothing, and a file is the natural insertion unit for a
 * component module anyway.
 */
function toInjectShape(code: string, filename: string, cssRules: CSSRulesByBucket, importsToTransform: Set<string>) {
  const parsed = parseSync(filename, code)
  const magic = new MagicString(code)
  const scopeTracker = new ScopeTracker()

  let lastImportEnd = 0
  for (const statement of parsed.program.body) {
    if (statement.type !== 'ImportDeclaration') continue
    lastImportEnd = Math.max(lastImportEnd, statement.end)
    if (!importsToTransform.has(statement.source.value)) continue
    for (const specifier of statement.specifiers) {
      if (specifier.type !== 'ImportSpecifier' || specifier.imported.type !== 'Identifier') continue
      const target = INJECT_IDENTIFIERS[specifier.imported.name]
      if (!target) continue
      if (specifier.local.name === specifier.imported.name) {
        magic.overwrite(specifier.start, specifier.end, target.name)
      } else {
        magic.overwrite(specifier.imported.start, specifier.imported.end, target.name)
      }
    }
  }

  walk(parsed.program, {
    scopeTracker,
    enter(node) {
      if (node.type !== 'CallExpression' || node.callee.type !== 'Identifier') return
      const declaration = scopeTracker.getDeclaration(node.callee.name) as ScopeTrackerImport | null
      if (declaration?.type !== 'Import' || declaration.node.type !== 'ImportSpecifier') return
      if (!importsToTransform.has(declaration.importNode.source.value)) return
      const imported = declaration.node.imported
      if (imported.type !== 'Identifier') return
      const target = INJECT_IDENTIFIERS[imported.name]
      if (!target) return
      if (declaration.node.local.name === imported.name) {
        magic.overwrite(node.callee.start, node.callee.end, target.name)
      }
      if (target.appendRules) {
        magic.appendLeft(node.end - 1, `, ${RULES_IDENTIFIER}`)
      }
    },
  })

  const declaration = `\nconst ${RULES_IDENTIFIER} = ${JSON.stringify(cssRules)};\n`
  if (lastImportEnd > 0) magic.appendRight(lastImportEnd, declaration)
  else magic.prepend(declaration)

  return magic.toString()
}

/**
 * Precompiles Griffel style calls while tsdown (rolldown) bundles a library.
 *
 * The heavy lifting is `@griffel/transform` — the same oxc-based evaluator the
 * official `@griffel/vite-plugin` uses — so this plugin is only the glue between
 * it and rolldown's hooks (~100 lines, versus the four vendored vanilla-extract
 * packages in sanity-io/pkg-utils).
 */
export function griffelTsdownPlugin(options: GriffelPluginOptions = {}): Plugin {
  const {
    mode = 'inject',
    fileName = 'styles.css',
    classNameHashSalt,
    include = DEFAULT_INCLUDE,
    exclude = DEFAULT_EXCLUDE,
    importsToTransform = DEFAULT_IMPORTS,
    compareMediaQueries = defaultCompareMediaQueries,
    compareContainerQueries = compareMediaQueries,
  } = options

  const importsToTransformSet = new Set(importsToTransform)
  const rulesByFile = new Map<string, CSSRulesByBucket>()
  let resolveModule: TransformResolver | undefined

  return {
    name: 'css-eval:griffel',

    buildStart() {
      rulesByFile.clear()
      resolveModule = createResolverFactory()({})
    },

    transform: {
      filter: {id: {include, exclude}},
      handler(code, id) {
        if (id.includes('\0') || !QUICK_CHECK.test(code)) return null
        const [filename] = id.split('?')

        // Allow re-evaluation when a module changes between watch-mode builds
        EvalCache.clearForFile(filename)

        let result
        try {
          result = transformSync(code, {
            filename,
            resolveModule: resolveModule!,
            classNameHashSalt,
            importsToTransform,
          })
        } catch (error) {
          if (isNonESMError(error)) return null
          throw error
        }

        if (!result.usedProcessing || !result.cssRulesByBucket) return null
        rulesByFile.set(filename, result.cssRulesByBucket)

        if (mode === 'extract') return {code: result.code, map: null}
        return {
          code: toInjectShape(result.code, filename, result.cssRulesByBucket, importsToTransformSet),
          map: null,
        }
      },
    },

    generateBundle() {
      if (rulesByFile.size === 0) return
      assertOneMeaningPerClass([...rulesByFile.values()])
      if (fileName === false) return
      // Same ordering as the runtime's style buckets and as `@griffel/vite-plugin`
      const source = sortCSSRules([...rulesByFile.values()], compareMediaQueries, compareContainerQueries)
      this.emitFile({type: 'asset', fileName, source})
    },
  }
}

const GRIFFEL_CLASS = /\.([fr][0-9a-z]+)/

/**
 * Class names are murmur2 (32-bit) hashes of `salt + selector + at-rules +
 * property + value`, so two different declarations can only share a name through
 * a hash collision (p ≈ n²/2³³ for n distinct declarations). Within one build
 * that is cheap to rule out entirely, so the build fails instead of shipping a
 * class with two meanings.
 */
export function assertOneMeaningPerClass(sets: CSSRulesByBucket[]): void {
  const meaning = new Map<string, string>()
  for (const set of sets) {
    for (const entries of Object.values(set)) {
      for (const entry of entries) {
        const rule = typeof entry === 'string' ? entry : entry[0]
        const className = GRIFFEL_CLASS.exec(rule)?.[1]
        if (!className) continue
        // An atomic ("f") class is exactly one rule. A reset ("r") class legitimately
        // spans several rules (`.r…`, `.r…::after`, `.r…>span`), so it is keyed by selector.
        const key = className.startsWith('r') ? rule.slice(0, rule.lastIndexOf('{')) : className
        const previous = meaning.get(key)
        if (previous !== undefined && previous !== rule) {
          throw new Error(
            `Griffel class "${className}" has two meanings in this build (hash collision):\n  ${previous}\n  ${rule}`,
          )
        }
        meaning.set(key, rule)
      }
    }
  }
}
