/**
 * `@sanity/ui/styles.css` is the CSS `tsdown.config.mts` emits:
 * `getLayerCss({layers: ['tokens', 'utilities'], emitLayerDeclaration: false})`.
 * Those are Panda's logical layers; `panda.config.ts` `layers` renames them.
 * The defaults (`@layer utilities` and the rest) break Tailwind v3 and merge
 * with other Panda bundles.
 */
import path from 'node:path'

import {createNodeDriver} from '@pandacss/dev/node'
import {expect, test} from 'vitest'

const UI_DIR = path.resolve(import.meta.dirname, '..')

test('@sanity/ui/styles.css uses only u- cascade layers', async () => {
  const driver = await createNodeDriver({cwd: UI_DIR})

  driver.parseFiles()

  const css = driver.getLayerCss({layers: ['tokens', 'utilities'], emitLayerDeclaration: false}).css
  const names = [...new Set([...css.matchAll(/@layer\s+([^{,\s]+)/g)].map((match) => match[1]))]

  expect(names).toEqual(['u-tokens', 'u-utilities'])
  expect(css).not.toMatch(/@layer\s+(reset|base|tokens|recipes|utilities)\b/)
})
