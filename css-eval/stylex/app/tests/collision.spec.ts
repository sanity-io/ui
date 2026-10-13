import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {expect, test, type Page} from '@playwright/test'
import {tokens as tokensV1} from 'stylex-button-v1/tokens.stylex'
import {tokens as tokensV2} from 'stylex-button-v2/tokens.stylex'

import {compareSheets, indexRulesByClass} from './css-rules'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const evidenceDir = path.join(root, 'evidence')

const v1Css = fs.readFileSync(fileURLToPath(import.meta.resolve('stylex-button-v1/styles.css')), 'utf8')
const v2Css = fs.readFileSync(fileURLToPath(import.meta.resolve('stylex-button-v2/styles.css')), 'utf8')

// Expected computed values per version. v2 changed the padding (space3),
// radius (radius2) and font-weight token defaults; everything else is shared.
const EXPECT = {
  v1: {padding: '12px', radius: '3px', fontWeight: '500', darkDefaultFill: 'rgb(29, 31, 42)'},
  v2: {padding: '14px', radius: '4px', fontWeight: '600', darkDefaultFill: 'rgb(38, 41, 53)'},
} as const

const TRANSPARENT = 'rgba(0, 0, 0, 0)'
const PRIMARY_FILL = 'rgb(34, 118, 252)' // #2276fc
const PRIMARY_FILL_HOVER = 'rgb(30, 97, 205)' // #1e61cd
const CRITICAL_TEXT = 'rgb(204, 56, 41)' // #cc3829
const POSITIVE_TEXT = 'rgb(47, 149, 82)' // #2f9552
const DEFAULT_FILL_ACTIVE = 'rgb(212, 214, 220)' // #d4d6dc
const DISABLED_FILL = 'rgb(242, 243, 245)' // #f2f3f5
const DISABLED_TEXT = 'rgb(182, 185, 195)' // #b6b9c3
const BRAND_FILL = 'rgb(255, 51, 153)' // #ff3399

const cssVarName = (ref: string) => ref.slice('var('.length, -1)

async function expectVersion(page: Page, v: 'v1' | 'v2') {
  const e = EXPECT[v]
  const id = (name: string) => page.getByTestId(`${v}-${name}`)

  // default mode, primary tone — token-driven values differ per version
  const primary = id('default-primary')
  await expect(primary).toHaveCSS('background-color', PRIMARY_FILL)
  await expect(primary).toHaveCSS('color', 'rgb(255, 255, 255)')
  await expect(primary).toHaveCSS('padding-top', e.padding)
  await expect(primary).toHaveCSS('padding-left', e.padding)
  await expect(primary).toHaveCSS('border-radius', e.radius)
  await expect(primary).toHaveCSS('font-weight', e.fontWeight)
  await expect(primary).toHaveCSS('white-space', 'nowrap') // shared static root rule

  // ghost / bleed modes: transparent background, tone text color, border via box-shadow
  const ghostCritical = id('ghost-critical')
  await expect(ghostCritical).toHaveCSS('background-color', TRANSPARENT)
  await expect(ghostCritical).toHaveCSS('color', CRITICAL_TEXT)
  await expect(ghostCritical).toHaveCSS('box-shadow', 'rgb(240, 62, 47) 0px 0px 0px 1px inset')
  const bleedPositive = id('bleed-positive')
  await expect(bleedPositive).toHaveCSS('background-color', TRANSPARENT)
  await expect(bleedPositive).toHaveCSS('color', POSITIVE_TEXT)
  await expect(bleedPositive).toHaveCSS('box-shadow', 'none')

  // hover (`:hover` inside `@media (hover: hover)`)
  await primary.hover()
  await expect(primary).toHaveCSS('background-color', PRIMARY_FILL_HOVER)
  await page.mouse.move(0, 0)
  await expect(primary).toHaveCSS('background-color', PRIMARY_FILL)

  // JS-driven variants
  await expect(id('selected')).toHaveCSS('background-color', DEFAULT_FILL_ACTIVE)
  await expect(id('disabled')).toHaveCSS('background-color', DISABLED_FILL)
  await expect(id('disabled')).toHaveCSS('color', DISABLED_TEXT)
  await expect(id('disabled')).toHaveCSS('cursor', 'default')
  await expect(id('disabled')).toBeDisabled()

  // static scale variants and the dynamic (inline custom property) width
  await expect(id('radius')).toHaveCSS('border-radius', '6px')
  await expect(id('padding')).toHaveCSS('padding-top', '4px')
  await expect(id('dynamic')).toHaveCSS('width', '180px')
  await expect(id('dynamic')).toHaveAttribute('style', /--x-width:\s*180px/)
  await expect(id('fill')).toHaveCSS('width', '300px')

  // createTheme (dark) re-assigns the token variables for a subtree
  await expect(id('dark-default-default')).toHaveCSS('background-color', e.darkDefaultFill)
  await expect(id('dark-default-default')).toHaveCSS('padding-top', e.padding)
}

for (const order of ['v1,v2', 'v2,v1']) {
  test.describe(`stylesheet order ${order}`, () => {
    test.beforeEach(async ({page}) => {
      await page.goto(`/?order=${order}`)
      await expect(page.getByTestId('sheet-order')).toHaveText(order)
    })

    test('v1 renders v1 styles and v2 renders v2 styles on the same page', async ({page}) => {
      await expectVersion(page, 'v1')
      await expectVersion(page, 'v2')
    })

    test('v2-only feature (loading overlay) and v1-only consumer theme are isolated', async ({
      page,
    }) => {
      const loading = page.getByTestId('v2-loading')
      await expect(loading).toBeDisabled()
      await expect(loading.locator('[data-ui="ButtonLoading"]')).toHaveCSS('position', 'absolute')
      await expect(loading.locator('[data-ui="ButtonLoading"]')).toHaveCSS('opacity', '0.8')

      // theme compiled in the app over the published v1 tokens
      await expect(page.getByTestId('v1-brand-default-primary')).toHaveCSS(
        'background-color',
        BRAND_FILL,
      )
      // untouched tones inherit, other versions are unaffected
      await expect(page.getByTestId('v1-brand-default-positive')).toHaveCSS(
        'background-color',
        'rgb(58, 181, 100)',
      )
      await expect(page.getByTestId('v2-default-primary')).toHaveCSS('background-color', PRIMARY_FILL)
    })

    test('both versions keep their own :root token defaults (no last-sheet-wins)', async ({
      page,
    }) => {
      const read = (ref: string) =>
        page.evaluate(
          (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
          cssVarName(ref),
        )
      expect(cssVarName(tokensV1.radius2)).not.toBe(cssVarName(tokensV2.radius2))
      expect(await read(tokensV1.radius2)).toBe('3px')
      expect(await read(tokensV2.radius2)).toBe('4px')
      expect(await read(tokensV1.space3)).toBe('12px')
      expect(await read(tokensV2.space3)).toBe('14px')
      expect(await read(tokensV1.fontWeight)).toBe('500')
      expect(await read(tokensV2.fontWeight)).toBe('600')
    })
  })
}

test('class names shared by v1.css and v2.css always carry identical rules', async () => {
  const a = indexRulesByClass(v1Css)
  const b = indexRulesByClass(v2Css)
  const result = compareSheets(a, b)

  fs.mkdirSync(evidenceDir, {recursive: true})
  fs.writeFileSync(
    path.join(evidenceDir, 'class-name-comparison.json'),
    JSON.stringify(
      {
        description:
          'Class names present in both stylesheets, and whether any of them maps to different declarations (a vanilla-extract style collision).',
        v1Rules: a.ruleCount,
        v2Rules: b.ruleCount,
        v1Classes: result.classesA,
        v2Classes: result.classesB,
        sharedClasses: result.shared.length,
        v1OnlyClasses: result.onlyA,
        v2OnlyClasses: result.onlyB,
        sharedClassesWithDifferentRules: result.conflicts.length,
        sharedSample: result.shared.slice(0, 12).map((cls) => ({
          className: cls,
          rule: [...a.byClass.get(cls)!][0],
        })),
        conflicts: result.conflicts,
      },
      null,
      2,
    ),
  )

  expect(result.shared.length).toBeGreaterThan(0) // literal-valued rules dedupe across versions
  expect(result.conflicts).toEqual([]) // never the same class name with a different rule
})

test('published package contract: styles.css and tokens.stylex resolve through exports', async () => {
  for (const alias of ['stylex-button-v1', 'stylex-button-v2']) {
    expect(fs.existsSync(fileURLToPath(import.meta.resolve(`${alias}/styles.css`)))).toBe(true)
    expect(fs.existsSync(fileURLToPath(import.meta.resolve(`${alias}/tokens.stylex`)))).toBe(true)
    expect(fs.existsSync(fileURLToPath(import.meta.resolve(alias)))).toBe(true)
  }
})

test('screenshot of both versions on one page', async ({page}) => {
  await page.goto('/?order=v1,v2')
  await expect(page.getByTestId('v2-default-primary')).toBeVisible()
  fs.mkdirSync(evidenceDir, {recursive: true})
  await page.screenshot({path: path.join(evidenceDir, 'one-page-v1-v2.png'), fullPage: true})
})
