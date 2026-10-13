#!/usr/bin/env node
/**
 * Browser proof: serves apps/demo/dist (both library versions on ONE page,
 * v1 stylesheet loaded first, v2 last), then asserts with headless Chromium
 * that every Button renders the styles ITS OWN version declares, computes the
 * class-name overlap between the two versions from the live DOM/CSSOM, and
 * saves a full-page screenshot.
 *
 * Expectations are derived from the two packages' source (tokens + recipe):
 *   v1 (4.4.3): padding-inline 12px, radius 6px, gap 8px, font-weight 500,
 *               primary bg #3e6bff (blue.500)
 *   v2 (4.4.4): padding-inline 16px, radius 9px, gap 12px, font-weight 600,
 *               primary bg #2a4fd9 (blue.600)
 */
import {createServer} from 'node:http'
import {readFileSync, existsSync, mkdirSync, writeFileSync, copyFileSync} from 'node:fs'
import {dirname, extname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from 'playwright'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'apps/demo/dist')
if (!existsSync(join(distDir, 'index.html'))) {
  console.error('apps/demo/dist missing — run `pnpm build` first')
  process.exit(1)
}

const mime = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.map': 'application/json'}
const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  const file = join(distDir, url.pathname === '/' ? 'index.html' : url.pathname)
  if (!existsSync(file)) {
    res.writeHead(404).end()
    return
  }
  res.writeHead(200, {'content-type': mime[extname(file)] ?? 'application/octet-stream'})
  res.end(readFileSync(file))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const port = server.address().port

const hex = (h) => {
  const n = parseInt(h.slice(1), 16)
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`
}

// Values both versions share (palette + light scheme semantic roles).
const palette = {
  gray800: '#252837',
  blue500: '#3e6bff',
  blue600: '#2a4fd9',
  blue700: '#1e3bb3',
  green500: '#2fa666',
  yellow500: '#d99e0f',
  red500: '#e64747',
  red700: '#a32626',
  gray200: '#e3e4e8',
  blue400: '#6690ff',
}

const expectations = {
  v1: {paddingInline: '12px', radius: '6px', gap: '8px', fontWeight: '500', primaryBg: palette.blue500, badgePaddingInline: '8px'},
  v2: {paddingInline: '16px', radius: '9px', gap: '12px', fontWeight: '600', primaryBg: palette.blue600, badgePaddingInline: '12px'},
}

const browser = await chromium.launch()
const page = await browser.newPage({viewport: {width: 1280, height: 900}})
const consoleErrors = []
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
page.on('pageerror', (e) => consoleErrors.push(String(e)))
await page.goto(`http://127.0.0.1:${port}/`)
await page.waitForSelector('[data-testid="v2-light-critical-bleed"]')

const read = (testid, props) =>
  page.evaluate(
    ([id, props]) => {
      const el = document.querySelector(`[data-testid="${id}"]`)
      if (!el) throw new Error(`missing ${id}`)
      const cs = getComputedStyle(el)
      const out = {className: el.className}
      for (const p of props) out[p] = cs[p]
      out.width = el.getBoundingClientRect().width
      return out
    },
    [testid, props],
  )

const props = ['backgroundColor', 'color', 'borderTopColor', 'paddingLeft', 'borderTopLeftRadius', 'fontWeight', 'columnGap']
const results = []
let failures = 0
const check = (label, actual, expected) => {
  const ok = actual === expected
  if (!ok) failures++
  results.push({label, expected, actual, ok})
}

for (const v of ['v1', 'v2']) {
  const exp = expectations[v]
  // Default mode, every tone, light scheme: bg is the tone bg; structural styles are the version's.
  const toneBg = {
    default: palette.gray800,
    primary: exp.primaryBg,
    positive: palette.green500,
    caution: palette.yellow500,
    critical: palette.red500,
  }
  for (const [tone, bg] of Object.entries(toneBg)) {
    const r = await read(`${v}-light-${tone}-default`, props)
    check(`${v} light ${tone}/default background`, r.backgroundColor, hex(bg))
    check(`${v} light ${tone}/default padding-inline`, r.paddingLeft, exp.paddingInline)
    check(`${v} light ${tone}/default radius`, r.borderTopLeftRadius, exp.radius)
    check(`${v} light ${tone}/default gap`, r.columnGap, exp.gap)
    check(`${v} light ${tone}/default font-weight`, r.fontWeight, exp.fontWeight)
  }
  // Ghost + bleed: transparent background, tinted text, border only for ghost.
  const ghost = await read(`${v}-light-critical-ghost`, props)
  check(`${v} light critical/ghost background`, ghost.backgroundColor, 'rgba(0, 0, 0, 0)')
  check(`${v} light critical/ghost color`, ghost.color, hex(palette.red700))
  check(`${v} light critical/ghost border`, ghost.borderTopColor, hex(palette.red500))
  const bleed = await read(`${v}-light-primary-bleed`, props)
  check(`${v} light primary/bleed background`, bleed.backgroundColor, 'rgba(0, 0, 0, 0)')
  check(`${v} light primary/bleed color`, bleed.color, hex(palette.blue700))
  check(`${v} light primary/bleed border`, bleed.borderTopColor, 'rgba(0, 0, 0, 0)')
  // Dark scheme: the dark semantic values apply under this provider only.
  const dark = await read(`${v}-dark-default-default`, props)
  check(`${v} dark default/default background`, dark.backgroundColor, hex(palette.gray200))
  const darkPrimary = await read(`${v}-dark-primary-default`, props)
  check(`${v} dark primary/default background`, darkPrimary.backgroundColor, hex(palette.blue400))
  // Dynamic styles through inline CSS variables.
  const dyn = await read(`${v}-dynamic`, props)
  check(`${v} dynamic width=240`, Math.round(dyn.width), 240)
  check(`${v} dynamic radius=full`, dyn.borderTopLeftRadius, '9999px')
  const dyn2 = await read(`${v}-dynamic-2`, props)
  check(`${v} dynamic radius=0`, dyn2.borderTopLeftRadius, '0px')
  // Runtime theme override through the provider.
  const themed = await read(`${v}-themed`, props)
  check(`${v} themed primary background (runtime theme)`, themed.backgroundColor, hex('#8e44ad'))
}

// Negative controls (documented pitfalls, expected to collide because v2's stylesheet loads last).
const v1Badge = await read('v1-badge', props)
const v2Badge = await read('v2-badge', props)
const v1Unprovided = await read('v1-unprovided-primary', props)
const v2Unprovided = await read('v2-unprovided-primary', props)
const pitfalls = {
  configRecipeBadge: {
    sameClassName: v1Badge.className === v2Badge.className,
    v1PaddingInline: v1Badge.paddingLeft,
    v1Expected: expectations.v1.badgePaddingInline,
    v2PaddingInline: v2Badge.paddingLeft,
    v2Expected: expectations.v2.badgePaddingInline,
    collided: v1Badge.paddingLeft !== expectations.v1.badgePaddingInline,
  },
  rootTokenDefaultWithoutProvider: {
    v1Background: v1Unprovided.backgroundColor,
    v1OwnDefault: hex(expectations.v1.primaryBg),
    v2Background: v2Unprovided.backgroundColor,
    v2OwnDefault: hex(expectations.v2.primaryBg),
    collided: v1Unprovided.backgroundColor !== hex(expectations.v1.primaryBg),
  },
}

// Class-name overlap from the live DOM + CSSOM.
const overlap = await page.evaluate(() => {
  const classesIn = (version) => {
    const set = new Set()
    for (const el of document.querySelectorAll(`[data-version="${version}"] *`))
      for (const c of el.classList) if (c.startsWith('sui-')) set.add(c)
    return set
  }
  const v1 = classesIn('4.4.3')
  const v2 = classesIn('4.4.4')
  // The config-recipe Badge is the negative control; its classes are reported separately.
  const controlClasses = new Set()
  for (const el of document.querySelectorAll('[data-testid$="-badge"]')) for (const c of el.classList) controlClasses.add(c)
  const rules = new Map()
  for (const sheet of document.styleSheets) {
    const walk = (list) => {
      for (const rule of list) {
        if (rule.cssRules && !(rule instanceof CSSStyleRule)) walk(rule.cssRules)
        if (rule instanceof CSSStyleRule) {
          for (const sel of rule.selectorText.split(',')) {
            const m = sel.trim().match(/^\.((?:sui-)[\w-]+)/)
            if (!m) continue
            if (!rules.has(m[1])) rules.set(m[1], new Set())
            rules.get(m[1]).add(rule.style.cssText)
          }
        }
      }
    }
    walk(sheet.cssRules)
  }
  const shared = [...v1].filter((c) => v2.has(c))
  const differing = shared.filter((c) => (rules.get(c)?.size ?? 0) > 1)
  const sharedWithDifferentRules = differing.filter((c) => !controlClasses.has(c))
  const controlClassesWithDifferentRules = differing.filter((c) => controlClasses.has(c))
  return {
    v1Classes: v1.size,
    v2Classes: v2.size,
    shared: shared.length,
    sharedAtomic: shared.filter((c) => !controlClasses.has(c)).length,
    sharedWithDifferentRules,
    controlClassesWithDifferentRules,
    onlyV1: [...v1].filter((c) => !v2.has(c)).length,
    onlyV2: [...v2].filter((c) => !v1.has(c)).length,
  }
})

const resultsDir = join(root, 'results')
mkdirSync(resultsDir, {recursive: true})
const screenshot = join(resultsDir, 'two-versions-one-page.png')
await page.screenshot({path: screenshot, fullPage: true})
const artifactsDir = '/opt/cursor/artifacts'
if (existsSync(artifactsDir)) copyFileSync(screenshot, join(artifactsDir, 'panda-two-versions-one-page.png'))

// Version skew (SAPP-4639 shape): v2 JavaScript with ONLY v1's stylesheet.
// A v2 class either exists in v1's CSS with the identical rule, or has no rule.
// So colors (shared classes + inline theme vars) must be v2's, and changed
// structural properties must fall back to UA defaults — never to v1's values.
const skewPage = await browser.newPage({viewport: {width: 1280, height: 600}})
const skewErrors = []
skewPage.on('pageerror', (e) => skewErrors.push(String(e)))
await skewPage.goto(`http://127.0.0.1:${port}/skew.html`)
await skewPage.waitForSelector('[data-testid="skew-critical-bleed"]')
const skewToneBg = {
  default: palette.gray800,
  primary: palette.blue600,
  positive: palette.green500,
  caution: palette.yellow500,
  critical: palette.red500,
}
const skew = {assertions: [], failures: 0, sample: null}
for (const [tone, bg] of Object.entries(skewToneBg)) {
  const r = await skewPage.evaluate((id) => {
    const el = document.querySelector(`[data-testid="${id}"]`)
    const cs = getComputedStyle(el)
    return {backgroundColor: cs.backgroundColor, paddingLeft: cs.paddingLeft, fontWeight: cs.fontWeight, columnGap: cs.columnGap, borderTopLeftRadius: cs.borderTopLeftRadius}
  }, `skew-${tone}-default`)
  const push = (label, ok, actual) => {
    if (!ok) skew.failures++
    skew.assertions.push({label, ok, actual})
  }
  push(`skew ${tone}: background is v2's own color (shared class + inline theme var)`, r.backgroundColor === hex(bg), r.backgroundColor)
  push(`skew ${tone}: padding-inline is NOT v1's 12px (v2 class has no rule in v1 CSS → UA default)`, r.paddingLeft !== '12px' && r.paddingLeft !== '16px', r.paddingLeft)
  push(`skew ${tone}: font-weight is NOT v1's 500`, r.fontWeight !== '500' && r.fontWeight !== '600', r.fontWeight)
  push(`skew ${tone}: gap is NOT v1's 8px`, r.columnGap !== '8px' && r.columnGap !== '12px', r.columnGap)
  if (tone === 'primary') skew.sample = r
}
const skewShot = join(resultsDir, 'version-skew-v2-js-with-v1-css.png')
await skewPage.screenshot({path: skewShot, fullPage: true})
if (existsSync(artifactsDir)) copyFileSync(skewShot, join(artifactsDir, 'panda-version-skew-v2-js-with-v1-css.png'))
skew.pageErrors = skewErrors

await browser.close()
server.close()

const badgeClass = pitfalls.configRecipeBadge
const report = {
  assertions: results,
  failures,
  classNameOverlap: overlap,
  pitfalls,
  versionSkew: skew,
  consoleErrors,
}
writeFileSync(join(resultsDir, 'browser-proof.json'), JSON.stringify(report, null, 2) + '\n')

console.log(`Browser proof (headless Chromium, ${results.length} computed-style assertions)`)
for (const r of results) if (!r.ok) console.log(`  FAIL ${r.label}: expected ${r.expected}, got ${r.actual}`)
console.log(`  passed: ${results.length - failures}/${results.length}`)
console.log(
  `  class names in DOM: v1=${overlap.v1Classes} v2=${overlap.v2Classes} shared=${overlap.shared} (only v1: ${overlap.onlyV1}, only v2: ${overlap.onlyV2})`,
)
console.log(
  `  shared ATOMIC class names backed by DIFFERENT rules (collisions): ${overlap.sharedWithDifferentRules.length} ${JSON.stringify(overlap.sharedWithDifferentRules)}`,
)
console.log('  negative control — config recipe badge:')
console.log(`    same class name in both versions: ${badgeClass.sameClassName}`)
console.log(`    badge classes backed by different rules: ${JSON.stringify(overlap.controlClassesWithDifferentRules)}`)
console.log(`    v1 badge padding-inline: ${badgeClass.v1PaddingInline} (its own source says ${badgeClass.v1Expected}) → collided: ${badgeClass.collided}`)
console.log('  pitfall — :root token default read outside a ThemeProvider:')
console.log(
  `    v1 primary bg: ${pitfalls.rootTokenDefaultWithoutProvider.v1Background} (v1's own default ${pitfalls.rootTokenDefaultWithoutProvider.v1OwnDefault}) → collided: ${pitfalls.rootTokenDefaultWithoutProvider.collided}`,
)
console.log(`  console errors: ${consoleErrors.length}`)
console.log(`  screenshot: ${screenshot}`)
console.log(`  version skew (v2 JS + v1 CSS only): ${skew.assertions.length - skew.failures}/${skew.assertions.length} assertions passed`)
for (const a of skew.assertions) if (!a.ok) console.log(`    FAIL ${a.label}: got ${a.actual}`)
console.log(`    sample computed style of v2 primary/default under v1 CSS: ${JSON.stringify(skew.sample)}`)
console.log(`    screenshot: ${skewShot}`)

const ok =
  failures === 0 &&
  overlap.sharedWithDifferentRules.length === 0 &&
  consoleErrors.length === 0 &&
  badgeClass.sameClassName &&
  badgeClass.collided &&
  skew.failures === 0 &&
  skewErrors.length === 0
console.log(ok ? '\nRESULT: PASS' : '\nRESULT: FAIL')
process.exit(ok ? 0 : 1)
