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

import {LAYER_ORDER, STYLED_LAYER} from '../src/core/styles/styled'

const UI_DIR = path.resolve(import.meta.dirname, '..')

async function getStylesCssLayers() {
  const driver = await createNodeDriver({cwd: UI_DIR})

  driver.parseFiles()

  const css = driver.getLayerCss({layers: ['tokens', 'utilities'], emitLayerDeclaration: false}).css

  return {
    css,
    names: [...new Set([...css.matchAll(/@layer\s+([^{,\s]+)/g)].map((match) => match[1]))],
  }
}

test('@sanity/ui/styles.css uses only u- cascade layers', async () => {
  const {css, names} = await getStylesCssLayers()

  expect(names).toEqual(['u-tokens', 'u-utilities'])
  expect(css).not.toMatch(/@layer\s+(reset|base|tokens|recipes|utilities)\b/)
})

test('the layer order statement puts every layer of styles.css below the styled-components layer', async () => {
  const {names} = await getStylesCssLayers()

  expect(LAYER_ORDER).toEqual(['sui', ...names, STYLED_LAYER])
})
