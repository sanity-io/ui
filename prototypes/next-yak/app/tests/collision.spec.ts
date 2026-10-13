import {expect, test} from '@playwright/test'
import {mkdirSync} from 'node:fs'

import {DARK, intersect, LIGHT, readButton, readSharedClasses, stylesheetClasses} from './helpers.ts'

const ARTIFACTS = process.env.ARTIFACTS_DIR || 'test-results/artifacts'
mkdirSync(ARTIFACTS, {recursive: true})

test.describe('per-version prefix build (index.html)', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
    await expect(page.getByTestId('shared-classes')).toBeVisible()
  })

  test('v1 and v2 share no class names', async ({page}) => {
    // stylesheet level: no selector exists in both emitted stylesheets
    expect(intersect(stylesheetClasses(1, 'dist'), stylesheetClasses(2, 'dist'))).toEqual([])
    // DOM level: no class is applied to buttons of both versions
    const shared = await readSharedClasses(page)
    expect(shared).toEqual([])
    const v1 = await readButton(page, 'v1-light-primary-default')
    const v2 = await readButton(page, 'v2-light-primary-default')
    expect(v1.classes.length).toBeGreaterThan(0)
    expect(v2.classes.length).toBeGreaterThan(0)
    expect(v1.classes.some((c) => v2.classes.includes(c))).toBe(false)
    // every class of each version starts with that version's prefix
    expect(v1.classes.every((c) => c.startsWith('syu3tnb_'))).toBe(true)
    expect(v2.classes.every((c) => c.startsWith('syiir27_'))).toBe(true)
  })

  test('each version renders its own rules (tone, mode, theme, dynamic styles)', async ({page}) => {
    const v1 = await readButton(page, 'v1-light-primary-default')
    const v2 = await readButton(page, 'v2-light-primary-default')

    // same tone/mode/theme in both versions
    expect(v1.backgroundColor).toBe(LIGHT.primaryBg)
    expect(v2.backgroundColor).toBe(LIGHT.primaryBg)
    expect(v1.color).toBe(LIGHT.primaryFg)
    expect(v2.color).toBe(LIGHT.primaryFg)

    // what changed between v1 and v2
    expect(v1.borderRadius).toBe('6px') // radius 2 (dynamic style → inline custom property)
    expect(v2.borderRadius).toBe('12px') // v2 default radius 3
    expect(v1.fontWeight).toBe('500')
    expect(v2.fontWeight).toBe('600') // v2 textWeight default 'semibold'
    expect(v1.textTransform).toBe('none')
    expect(v2.textTransform).toBe('uppercase') // v2 primary tone
    expect(v1.boxShadow).not.toContain('0px 1px 2px')
    expect(v2.boxShadow).toContain('0px 1px 2px') // v2 default mode drop shadow

    // modes: ghost/bleed are transparent and use the tone text color
    for (const id of ['v1', 'v2']) {
      const ghost = await readButton(page, `${id}-light-primary-ghost`)
      expect(ghost.backgroundColor).toBe('rgba(0, 0, 0, 0)')
      expect(ghost.color).toBe(LIGHT.primaryText)
      const bleed = await readButton(page, `${id}-light-critical-bleed`)
      expect(bleed.backgroundColor).toBe('rgba(0, 0, 0, 0)')
      expect(bleed.boxShadow).toBe('none')
      const positive = await readButton(page, `${id}-light-positive-default`)
      expect(positive.backgroundColor).toBe(LIGHT.positiveBg)
    }

    // theme: the dark provider swaps every token through CSS variables
    expect((await readButton(page, 'v1-dark-primary-default')).backgroundColor).toBe(DARK.primaryBg)
    expect((await readButton(page, 'v2-dark-primary-default')).backgroundColor).toBe(DARK.primaryBg)
    expect((await readButton(page, 'v1-dark-default-default')).backgroundColor).toBe(DARK.defaultBg)

    // dynamic styles: padding/radius props flow through runtime custom properties
    const padded = await readButton(page, 'v1-light-padding')
    expect(padded.padding).toBe('4px')
    expect(padded.borderRadius).toBe('0px')
    const fill = await readButton(page, 'v1-light-fill')
    const rowWidth = await page
      .getByTestId('v1-light-fill')
      .evaluate((el) => getComputedStyle(el.parentElement!).width)
    expect(fill.width).toBe(rowWidth)

    await page.screenshot({path: `${ARTIFACTS}/next-yak-safe-prefixed.png`, fullPage: true})
  })
})

test.describe('default naming build (unsafe.html)', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/unsafe.html')
    await expect(page.getByTestId('shared-classes')).toBeVisible()
  })

  test('v1 and v2 reuse the same class names for different rules', async ({page}) => {
    // stylesheet level: v1 and v2 declare rules for the same selectors
    const v1Css = stylesheetClasses(1, 'dist-unsafe')
    const v2Css = stylesheetClasses(2, 'dist-unsafe')
    const sharedSelectors = intersect(v1Css, v2Css)
    test.info().annotations.push({type: 'shared-selectors', description: sharedSelectors.join(' ')})
    // 12 classes in v1, 13 in v2 — most of them exist in both with different meanings
    expect(sharedSelectors.length).toBeGreaterThanOrEqual(10)

    // DOM level: classes applied to rendered buttons of both versions
    const shared = await readSharedClasses(page)
    test.info().annotations.push({type: 'shared-on-buttons', description: shared.join(' ')})
    expect(shared.length).toBeGreaterThan(0)

    // the v1 Button root class is a rule in v2's stylesheet (where it styles `Badge`)
    const v1 = await readButton(page, 'v1-light-primary-default')
    const [rootClass] = v1.classes
    expect(v2Css.has(rootClass)).toBe(true)
  })

  test('v1 buttons are visibly broken by v2 CSS (the 4.4.3 → 4.4.4 failure)', async ({page}) => {
    const v1 = await readButton(page, 'v1-light-primary-default')
    const broken: string[] = []
    // v1's root class is v2's Badge class: pill radius, 11px font, uppercase, tint background
    if (v1.borderRadius !== '6px') broken.push(`border-radius ${v1.borderRadius} (v1 expects 6px)`)
    if (v1.fontSize !== '14px') broken.push(`font-size ${v1.fontSize} (v1 expects 14px)`)
    if (v1.textTransform !== 'none') broken.push(`text-transform ${v1.textTransform} (v1 expects none)`)
    if (v1.backgroundColor !== LIGHT.primaryBg)
      broken.push(`background ${v1.backgroundColor} (v1 expects ${LIGHT.primaryBg})`)
    test.info().annotations.push({type: 'v1-breakage', description: broken.join('; ')})
    expect(broken.length).toBeGreaterThan(0)

    await page.screenshot({path: `${ARTIFACTS}/next-yak-unsafe-default-naming.png`, fullPage: true})
  })
})
