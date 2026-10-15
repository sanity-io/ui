/**
 * `@sanity/ui/styles.css` is the CSS `tsdown.config.mts` emits:
 * `getLayerCss({layers: ['tokens', 'utilities'], emitLayerDeclaration: false})`.
 * Those are Panda's logical layers; `panda.config.ts` `layers` renames them.
 * The defaults (`@layer utilities` and the rest) break Tailwind v3 and merge
 * with other Panda bundles.
 *
 * The styled-components rules of the components are in `u-styled`, which both
 * `styles.css` and the root `ThemeProvider` order after those layers.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {createNodeDriver} from '@pandacss/dev/node'
import {defineConfig} from '@sanity/tsdown-config'
import {renderToString} from 'react-dom/server'
import {ServerStyleSheet, styled} from 'styled-components'
import {build, mergeConfig} from 'tsdown'
import {describe, expect, test} from 'vitest'

import {Button} from '../src/core/primitives/button/button'
import {Card} from '../src/core/primitives/card/card'
import {ThemeProvider} from '../src/core/theme/themeProvider'
import {buildTheme} from '../src/theme/build/buildTheme'
import {options, STYLES_LAYER_ORDER, stylesLayerOrder} from '../tsdown.config.mjs'

const UI_DIR = path.resolve(import.meta.dirname, '..')

const theme = buildTheme()

function renderRules(element: React.JSX.Element): string[] {
  const sheet = new ServerStyleSheet()

  try {
    renderToString(sheet.collectStyles(element))

    return sheet
      .getStyleTags()
      .replace(/^<style[^>]*>|<\/style>\s*$/g, '')
      .split('/*!sc*/\n')
      .filter((rule) => rule && !rule.startsWith('data-styled.'))
  } finally {
    sheet.seal()
  }
}

describe('styles.css', () => {
  test('uses only u- cascade layers', async () => {
    const driver = await createNodeDriver({cwd: UI_DIR})

    driver.parseFiles()

    const css = driver.getLayerCss({
      layers: ['tokens', 'utilities'],
      emitLayerDeclaration: false,
    }).css
    const names = [...new Set([...css.matchAll(/@layer\s+([^{,\s]+)/g)].map((match) => match[1]))]

    expect(names).toEqual(['u-tokens', 'u-utilities'])
    expect(css).not.toMatch(/@layer\s+(reset|base|tokens|recipes|utilities)\b/)
  })

  test('starts with the layer order statement', {timeout: 60_000}, async () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sanity-ui-styles-'))

    try {
      await build({
        ...mergeConfig(
          await defineConfig({
            ...options,
            cwd: UI_DIR,
            dts: false,
            exports: false,
            outDir,
            panda: {...options.panda, codegen: false},
          }),
          {plugins: [stylesLayerOrder(options.panda.fileName)]},
        ),
        config: false,
        logLevel: 'silent',
      })

      const css = fs.readFileSync(path.join(outDir, options.panda.fileName), 'utf8')
      const blocks = [...new Set([...css.matchAll(/@layer\s+([\w-]+)\s*\{/g)].map((m) => m[1]))]

      expect(css.startsWith(`@layer u-tokens, u-utilities, u-styled;\n`)).toBe(true)
      expect(STYLES_LAYER_ORDER).toBe(`@layer ${[...blocks, 'u-styled'].join(', ')};`)
    } finally {
      fs.rmSync(outDir, {force: true, recursive: true})
    }
  })
})

describe('styled-components rules', () => {
  test('come after the same statement from the root ThemeProvider, in u-styled', () => {
    const [statement, ...rules] = renderRules(
      <ThemeProvider theme={theme}>
        <Card padding={2} tone="primary">
          <Button mode="ghost" text="Button" />
        </Card>
      </ThemeProvider>,
    )

    expect(statement).toBe(STYLES_LAYER_ORDER.replaceAll(', ', ','))
    expect(rules.length).toBeGreaterThan(0)
    for (const rule of rules) {
      expect(rule).toMatch(/^@layer u-styled\{.+\}$/)
    }
  })

  test('declare the layer order once, in the root ThemeProvider', () => {
    const rules = renderRules(
      <ThemeProvider theme={theme}>
        <ThemeProvider scheme="dark" tone="critical">
          <Button text="Button" />
        </ThemeProvider>
      </ThemeProvider>,
    )

    expect(rules.filter((rule) => rule.startsWith('@layer u-tokens,'))).toHaveLength(1)
  })

  test('leave components that consumers extend with styled-components unlayered', () => {
    const Extended = styled(Button)`
      white-space: normal;
    `

    const rules = renderRules(
      <ThemeProvider theme={theme}>
        <Extended text="Button" />
      </ThemeProvider>,
    )

    expect(rules.filter((rule) => !rule.startsWith('@layer'))).toEqual([
      expect.stringMatching(/^\.[\w-]+\{white-space:normal;\}$/),
    ])
  })
})
