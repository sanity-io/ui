import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

import {expect, type Page, test} from '@playwright/test'

const RESULTS_DIR = resolve(import.meta.dirname, '../results')
const ARTIFACTS_DIR = process.env.ARTIFACTS_DIR ?? '/opt/cursor/artifacts'

type Sample = {
  version: string
  lightPrimaryDefault: {bg: string; color: string; radius: string; position: string; animation: string; width: string}
  lightPrimaryGhost: {bg: string; color: string}
  darkDefaultDefault: {bg: string}
  overlay: {position: string; inset: string}
  accent: {outlineColor: string}
  classes: string[]
}

const EXPECTED = {
  '1.0.0': {primaryBg: 'rgb(34, 118, 252)', radius: '3px'},
  '2.0.0': {primaryBg: 'rgb(125, 60, 252)', radius: '6px'},
} as const

async function sample(page: Page, version: keyof typeof EXPECTED): Promise<Sample> {
  return page.evaluate((v) => {
    const section = document.querySelector(`section[data-release="${v}"]`)!
    const css = (el: Element | null, prop: string) => (el ? getComputedStyle(el).getPropertyValue(prop) : 'MISSING')
    const q = (theme: string, tone: string, mode: string) =>
      section.querySelector(`[data-theme="${theme}"] [data-ui="Button"][data-tone="${tone}"][data-mode="${mode}"]`)
    const lightPrimary = q('light', 'primary', 'default')
    const lightPrimaryGhost = q('light', 'primary', 'ghost')
    const darkDefault = q('dark', 'default', 'default')
    const overlay = section.querySelector('[data-theme="light"] [data-ui="Button-loading"]')
    const accent = section.querySelector('[data-theme="light"] [data-ui="Button"][style]')
    const classes = new Set<string>()
    for (const el of section.querySelectorAll('[class]')) {
      for (const name of el.classList) classes.add(name)
    }
    for (const name of ['panel', 'grid', 'row', 'classes']) classes.delete(name)
    return {
      version: v,
      lightPrimaryDefault: {
        bg: css(lightPrimary, 'background-color'),
        color: css(lightPrimary, 'color'),
        radius: css(lightPrimary, 'border-top-left-radius'),
        position: css(lightPrimary, 'position'),
        animation: css(lightPrimary, 'animation-name'),
        width: css(lightPrimary, 'width'),
      },
      lightPrimaryGhost: {bg: css(lightPrimaryGhost, 'background-color'), color: css(lightPrimaryGhost, 'color')},
      darkDefaultDefault: {bg: css(darkDefault, 'background-color')},
      overlay: {position: css(overlay, 'position'), inset: css(overlay, 'inset')},
      accent: {outlineColor: css(accent, 'outline-color')},
      classes: [...classes].sort(),
    }
  }, version)
}

function deviations(s: Sample): string[] {
  const expected = EXPECTED[s.version as keyof typeof EXPECTED]
  const out: string[] = []
  const check = (what: string, actual: string, wanted: string) => {
    if (actual !== wanted) out.push(`${what}: got ${actual}, expected ${wanted}`)
  }
  check('light primary/default background', s.lightPrimaryDefault.bg, expected.primaryBg)
  check('light primary/default color', s.lightPrimaryDefault.color, 'rgb(255, 255, 255)')
  check('light primary/default radius', s.lightPrimaryDefault.radius, expected.radius)
  check('light primary/default position', s.lightPrimaryDefault.position, 'relative')
  check('light primary/default animation', s.lightPrimaryDefault.animation, 'none')
  check('light primary/ghost background', s.lightPrimaryGhost.bg, 'rgba(0, 0, 0, 0)')
  check('light primary/ghost color', s.lightPrimaryGhost.color, expected.primaryBg)
  check('dark default/default background', s.darkDefaultDefault.bg, 'rgb(27, 29, 32)')
  check('loading overlay position', s.overlay.position, 'absolute')
  check('accent outline color (dynamic var)', s.accent.outlineColor, 'rgb(255, 0, 255)')
  return out
}

async function openMode(page: Page, mode: string) {
  await page.goto(`/?mode=${encodeURIComponent(mode)}`)
  await page.waitForSelector('body[data-ready="true"]')
  const v1 = await sample(page, '1.0.0')
  const v2 = await sample(page, '2.0.0')
  const sharedClasses = v1.classes.filter((c) => v2.classes.includes(c))
  const report = {mode, v1, v2, sharedClasses, deviationsV1: deviations(v1), deviationsV2: deviations(v2)}
  mkdirSync(RESULTS_DIR, {recursive: true})
  writeFileSync(resolve(RESULTS_DIR, `browser-${mode}.json`), JSON.stringify(report, null, 2))
  mkdirSync(ARTIFACTS_DIR, {recursive: true})
  await page.screenshot({path: resolve(ARTIFACTS_DIR, `ve-eval-${mode}.png`), fullPage: true})
  await page.screenshot({path: resolve(RESULTS_DIR, `browser-${mode}.png`), fullPage: true})
  return report
}

test('default (upstream) identifiers: two releases on one page collide — the SAPP-4639 failure', async ({page}) => {
  const report = await openMode(page, 'default')
  // The DOM of release 1.0.0 and the DOM of release 2.0.0 use the same class names…
  expect(report.sharedClasses.length).toBeGreaterThan(0)
  // …and because those names carry different rules in each stylesheet, both releases render wrong.
  expect(report.deviationsV1.length, report.deviationsV1.join('\n')).toBeGreaterThan(0)
  expect(report.deviationsV2.length, report.deviationsV2.join('\n')).toBeGreaterThan(0)
  console.log(`default mode: ${report.sharedClasses.length} shared class names; 1.0.0 deviations:\n  ${report.deviationsV1.join('\n  ')}\n2.0.0 deviations:\n  ${report.deviationsV2.join('\n  ')}`)
})

for (const mode of ['version', 'version+module']) {
  test(`${mode}-salted identifiers: both releases render exactly as built, no shared names`, async ({page}) => {
    const report = await openMode(page, mode)
    expect(report.sharedClasses).toEqual([])
    expect(report.deviationsV1).toEqual([])
    expect(report.deviationsV2).toEqual([])
    // Sanity-check that the page really renders the two different releases.
    expect(report.v1.lightPrimaryDefault.bg).toBe(EXPECTED['1.0.0'].primaryBg)
    expect(report.v2.lightPrimaryDefault.bg).toBe(EXPECTED['2.0.0'].primaryBg)
    expect(report.v1.lightPrimaryDefault.radius).toBe('3px')
    expect(report.v2.lightPrimaryDefault.radius).toBe('6px')
  })
}

for (const mode of ['content']) {
  test(`${mode}-hashed identifiers (patched upstream): shared names only where the rules are identical`, async ({page}) => {
    const report = await openMode(page, mode)
    // Identical rules (overlay, spinner) are *meant* to share a name across releases…
    expect(report.sharedClasses.length).toBeGreaterThan(0)
    const {compareStylesheets} = await import('../scripts/lib/cssIdentifiers.mjs')
    const cssFor = (lib: string) => readFileSync(resolve(import.meta.dirname, `../${lib}/dist/${mode}/styles.css`), 'utf8')
    const comparison = compareStylesheets(cssFor('lib-v1'), cssFor('lib-v2'))
    // …and every shared name carries byte-identical rules in both stylesheets.
    expect(comparison.conflicting).toEqual([])
    for (const name of report.sharedClasses) expect(comparison.identical).toContain(`.${name}`)
    expect(report.deviationsV1).toEqual([])
    expect(report.deviationsV2).toEqual([])
    // Sanity-check that the page really renders the two different releases.
    expect(report.v1.lightPrimaryDefault.bg).toBe(EXPECTED['1.0.0'].primaryBg)
    expect(report.v2.lightPrimaryDefault.bg).toBe(EXPECTED['2.0.0'].primaryBg)
    expect(report.v1.lightPrimaryDefault.radius).toBe('3px')
    expect(report.v2.lightPrimaryDefault.radius).toBe('6px')
  })
}
