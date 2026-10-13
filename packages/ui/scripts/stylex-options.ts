import browserslistConfig from '@sanity/browserslist-config'
import type {StyleXOptions} from '@stylexswc/rs-compiler'
import browserslist from 'browserslist'
import {browserslistToTargets, transform} from 'lightningcss'

import {GLOBAL_MARK, globalSheet} from '../src/stylex/globals'

/**
 * Compiler options shared by tsdown, Vite and Next.
 *
 * `dev` stays off so class names are content hashes in every environment.
 * Debug class names are file-derived and would bring back the cross-version
 * collision this migration exists to remove.
 *
 * The prefix is one character. A `sui4-` prefix would be repeated on every
 * atomic class and only exists to dodge v5's `sui-` classes, which a content
 * hash already cannot collide with.
 *
 * StyleX's own `priorityN` layers are not used. `legacyDisableLayers` stops
 * the assembler from emitting `:not(#\#)` and from declaring a priority-layer
 * order that would fight `@sanity/ui@5`'s `@layer sui`. The finished sheet is
 * wrapped in `@layer sui.global`, the same layer v5 uses.
 */
export const stylexRsOptions: StyleXOptions = {
  classNamePrefix: 'x',
  dev: false,
  enableDevClassNames: false,
  legacyDisableLayers: true,
  runtimeInjection: false,
  unstable_moduleResolution: {type: 'commonJS'},
}

const targets = browserslistToTargets(browserslist(browserslistConfig))

// Inside `@media`, the assembler repeats the class (`.a.a`). That extra
// specificity is not in the vanilla-extract sheet, and it beats a later
// styled-components rule. One class matches the old sheet; the media block
// has to follow the base rule so source order still lets the query win.
const doubledClass = /\.((?:[_a-zA-Z]|--)[_a-zA-Z0-9-]*)\.\1\b/g
const mediaBlock = /@media\b[^{]*\{(?:[^{}]|\{[^{}]*\})*\}/g

const SUI_LAYER = '@layer sui.global'

export function lowerStylexCss(css: string): string {
  if (css.includes(SUI_LAYER)) return css

  const flattened = css.replace(doubledClass, '.$1')
  const media: string[] = []
  const base = flattened.replace(mediaBlock, (block) => {
    media.push(block)

    return ''
  })
  const withGlobals = base.includes(GLOBAL_MARK) ? base : `${base}\n${globalSheet}`
  const result = transform({
    code: Buffer.from(`${withGlobals}\n${media.join('\n')}`),
    filename: 'styles.css',
    minify: true,
    targets,
  })

  // Same layer name as `@sanity/ui@5`, so the two sheets share one layer
  // instead of an unlayered v4 file outranking every v5 rule.
  return `@layer sui;${SUI_LAYER}{${result.code.toString()}}`
}

export const stylexPluginOptions = {
  fileName: 'styles.css',
  rsOptions: stylexRsOptions,
  transformCss: (css: string) => lowerStylexCss(css),
}
