/**
 * Real-browser proof that two versions of the same Griffel-styled package on one
 * page cannot collide — the exact failure of @sanity/ui 4.4.3 + 4.4.4 (SAPP-4639).
 *
 * Serves the production builds with Vite's preview server, drives the system
 * Chrome through Playwright and writes `results/two-versions.json` plus
 * `results/two-versions.png`.
 *
 *   pnpm build && node tests/two-versions.test.mjs
 */
import {copyFileSync, existsSync, mkdirSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {chromium} from 'playwright'
import {preview} from 'vite'

const here = dirname(fileURLToPath(import.meta.url))
const appDir = join(here, '..')
const resultsDir = join(appDir, 'results')

const failures = []
function check(name, condition, detail) {
  if (!condition) failures.push({name, detail})
  return condition
}

const EXPECTED = {
  '1.0.0': {radius: '3px', paddingTop: '8px', paddingLeft: '12px', fontWeight: '500', textTransform: 'none', transitionDuration: '0.08s'},
  '2.0.0': {radius: '6px', paddingTop: '12px', paddingLeft: '20px', fontWeight: '600', textTransform: 'uppercase', transitionDuration: '0.12s'},
}

/** Collects every Griffel rule on the page and checks that no selector has two meanings. */
function auditPage() {
  const GRIFFEL_CLASS = /\.([fr][0-9a-z]+)/g
  const rules = []

  const visit = (rule, context, origin) => {
    if (!(rule instanceof CSSStyleRule)) {
      const prelude = rule.cssText.slice(0, rule.cssText.indexOf('{')).trim()
      for (const child of rule.cssRules ?? []) visit(child, `${context}${prelude} `, origin)
      return
    }
    const classes = [...rule.selectorText.matchAll(GRIFFEL_CLASS)].map((m) => m[1])
    if (classes.length === 0) return
    rules.push({
      key: `${context}${rule.selectorText}`,
      classes,
      body: rule.cssText.slice(rule.cssText.indexOf('{')),
      origin,
    })
  }

  const bucketOrder = ['r', 'd', 'l', 'v', 'w', 'f', 'i', 'h', 'a', 's', 'k', 't', 'm', 'c', 'x']
  const bucketElements = [...document.head.querySelectorAll('style[data-make-styles-bucket]')]
  const bucketSequence = bucketElements.map(
    (el) => `${el.getAttribute('data-make-styles-bucket')}${el.getAttribute('data-priority') === '0' ? '' : `(p${el.getAttribute('data-priority')})`}`,
  )
  const bucketIndexes = bucketElements.map((el) => bucketOrder.indexOf(el.getAttribute('data-make-styles-bucket')))
  const bucketsInOrder = bucketIndexes.every((index, i) => i === 0 || index >= bucketIndexes[i - 1])
  // One "d" bucket element per renderer (per priority); priority 0 exists for every renderer
  const renderers = bucketElements.filter(
    (el) => el.getAttribute('data-make-styles-bucket') === 'd' && el.getAttribute('data-priority') === '0',
  ).length

  for (const sheet of document.styleSheets) {
    const origin =
      sheet.ownerNode?.tagName === 'LINK'
        ? 'extracted'
        : `runtime:${sheet.ownerNode?.getAttribute('data-make-styles-bucket') ?? '?'}`
    for (const rule of sheet.cssRules) visit(rule, '', origin)
  }

  const meanings = new Map()
  for (const rule of rules) {
    if (!meanings.has(rule.key)) meanings.set(rule.key, new Set())
    meanings.get(rule.key).add(rule.body)
  }
  const collisions = [...meanings.entries()]
    .filter(([, bodies]) => bodies.size > 1)
    .map(([key, bodies]) => ({key, bodies: [...bodies]}))

  const classesOf = (version) =>
    new Set(
      [...document.querySelectorAll(`[data-ui="Button"][data-version="${version}"]`)].flatMap((el) =>
        [...el.classList].filter((c) => /^[fr][0-9a-z]+$/.test(c)),
      ),
    )
  const v1Classes = classesOf('1.0.0')
  const v2Classes = classesOf('2.0.0')

  return {
    totalRules: rules.length,
    distinctSelectors: meanings.size,
    duplicateRuleTexts: rules.length - meanings.size,
    collisions,
    runtimeStyleElements: bucketElements.length,
    renderers,
    bucketSequence,
    bucketsInOrder,
    v1ClassCount: v1Classes.size,
    v2ClassCount: v2Classes.size,
    sharedClasses: [...v1Classes].filter((c) => v2Classes.has(c)),
    v1OnlyClasses: [...v1Classes].filter((c) => !v2Classes.has(c)),
    v2OnlyClasses: [...v2Classes].filter((c) => !v1Classes.has(c)),
  }
}

function measureButtons() {
  const providers = [...document.querySelectorAll('[data-ui="ThemeProvider"]')]
  return [...document.querySelectorAll('[data-ui="Button"]')].map((el) => {
    const s = getComputedStyle(el)
    return {
      version: el.dataset.version,
      tone: el.dataset.tone,
      mode: el.dataset.mode,
      text: el.textContent,
      inDark: el.closest('[data-ui="ThemeProvider"]') === providers[1],
      radius: s.borderTopLeftRadius,
      paddingTop: s.paddingTop,
      paddingLeft: s.paddingLeft,
      fontWeight: s.fontWeight,
      fontSize: s.fontSize,
      textTransform: s.textTransform,
      transitionDuration: s.transitionDuration,
      backgroundColor: s.backgroundColor,
      color: s.color,
      width: el.getBoundingClientRect().width,
    }
  })
}

async function openBuild(browser, outDir, port) {
  const server = await preview({root: appDir, build: {outDir}, preview: {port, strictPort: true}, logLevel: 'silent'})
  const page = await browser.newPage({viewport: {width: 1400, height: 1000}})
  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(String(error)))
  await page.goto(`http://localhost:${port}/`)
  await page.waitForSelector('[data-ui="Button"][data-version="2.0.0"]')
  return {server, page, consoleErrors}
}

const browser = await chromium.launch({channel: 'chrome', headless: true})
const summary = {generatedAt: new Date().toISOString(), chrome: browser.version()}

try {
  // ── A. Runtime build: both libraries and the app go through Griffel's runtime ──
  const runtime = await openBuild(browser, 'dist', 4173)
  try {
    const audit = await runtime.page.evaluate(auditPage)
    const buttons = await runtime.page.evaluate(measureButtons)

    check('runtime: no selector on the page has two meanings', audit.collisions.length === 0, audit.collisions)
    check('runtime: two Griffel runtime copies each inserted their own buckets', audit.renderers === 2, audit.bucketSequence)
    check('runtime: bucket order is global across both runtime copies', audit.bucketsInOrder, audit.bucketSequence)
    check('runtime: v1 and v2 share the classes whose declarations did not change', audit.sharedClasses.length > 10, audit.sharedClasses.length)
    check('runtime: v2 has classes v1 does not (changed declarations hash differently)', audit.v2OnlyClasses.length > 5, audit.v2OnlyClasses)

    for (const button of buttons) {
      if (button.text.includes('override')) continue
      for (const [prop, value] of Object.entries(EXPECTED[button.version])) {
        check(`runtime: ${button.version} ${button.mode}/${button.tone} "${button.text}" ${prop}=${value}`, button[prop] === value, button[prop])
      }
    }

    const primary = buttons.filter((b) => b.tone === 'primary' && b.mode === 'default' && /^primary v[12]$/.test(b.text))
    const light = primary.filter((b) => !b.inDark)
    const dark = primary.filter((b) => b.inDark)
    check('runtime: primary/default is #2276fc in defaultTheme for both versions', light.length === 2 && light.every((b) => b.backgroundColor === 'rgb(34, 118, 252)'), light)
    check('runtime: primary/default is #4d8dff in darkTheme for both versions', dark.length === 2 && dark.every((b) => b.backgroundColor === 'rgb(77, 141, 255)'), dark)
    const bleed = buttons.filter((b) => b.mode === 'bleed')
    check('runtime: bleed mode is transparent in both versions', bleed.length === 20 && bleed.every((b) => b.backgroundColor === 'rgba(0, 0, 0, 0)'), bleed.map((b) => b.backgroundColor))
    const dynamic = buttons.filter((b) => b.text.includes('width=200'))
    check('runtime: dynamic width (inline CSS variable) is 200px in both versions', dynamic.length === 4 && dynamic.every((b) => Math.round(b.width) === 200), dynamic.map((b) => b.width))
    const fill = buttons.filter((b) => b.text.includes('width=fill'))
    check('runtime: width="fill" stretches in both versions', fill.length === 4 && fill.every((b) => b.width > 300), fill.map((b) => b.width))

    const override = buttons.find((b) => b.text.includes('override'))
    check('runtime: consumer className overrides font-size/weight through mergeClasses', override?.fontSize === '14px' && override?.fontWeight === '600', override)

    const hover = {}
    for (const version of ['1.0.0', '2.0.0']) {
      const selector = `[data-ui="Button"][data-version="${version}"][data-tone="primary"][data-mode="default"]`
      const before = await runtime.page.$eval(selector, (el) => getComputedStyle(el).backgroundColor)
      await runtime.page.hover(selector)
      await runtime.page.waitForTimeout(250)
      const after = await runtime.page.$eval(selector, (el) => getComputedStyle(el).backgroundColor)
      hover[version] = {before, after}
      check(`runtime: ${version} hover applies the "h" bucket`, before !== after, hover[version])
    }
    await runtime.page.mouse.move(0, 0)
    await runtime.page.waitForTimeout(200)

    check('runtime: no console errors', runtime.consoleErrors.length === 0, runtime.consoleErrors)

    mkdirSync(resultsDir, {recursive: true})
    await runtime.page.screenshot({path: join(resultsDir, 'two-versions.png'), fullPage: true})

    summary.runtimeBuild = {audit, hover, override, buttons, consoleErrors: runtime.consoleErrors}
  } finally {
    await runtime.page.close()
    await runtime.server.close()
  }

  // ── B. Extraction build: the app's CSS is extracted by @griffel/vite-plugin, the libraries stay runtime ──
  const extract = await openBuild(browser, 'dist-extract', 4174)
  try {
    const audit = await extract.page.evaluate(auditPage)
    const buttons = await extract.page.evaluate(measureButtons)
    const override = buttons.find((b) => b.text.includes('override'))
    const extractedSheets = await extract.page.evaluate(() => document.querySelectorAll('link[rel="stylesheet"]').length)

    check('extract: no selector on the page has two meanings', audit.collisions.length === 0, audit.collisions)
    check('extract: the app CSS was extracted to a stylesheet', extractedSheets === 1, extractedSheets)
    for (const button of buttons) {
      if (button.text.includes('override')) continue
      for (const [prop, value] of Object.entries(EXPECTED[button.version])) {
        check(`extract: ${button.version} "${button.text}" ${prop}=${value}`, button[prop] === value, button[prop])
      }
    }

    summary.extractBuild = {
      audit,
      override,
      mixedModeHazard: {
        description:
          'The extracted <link> precedes every runtime bucket, so the library reset (font: inherit, bucket r) wins over the extracted app override (font-size: 14px, bucket d). font-weight: 600 survives only because v2 also inserts that exact class at runtime.',
        overrideFontSize: override?.fontSize,
        overrideFontWeight: override?.fontWeight,
        overrideLostToRuntimeReset: override?.fontSize !== '14px',
      },
      consoleErrors: extract.consoleErrors,
    }
  } finally {
    await extract.page.close()
    await extract.server.close()
  }
} finally {
  await browser.close()
}

summary.failures = failures
summary.passed = failures.length === 0
mkdirSync(resultsDir, {recursive: true})
writeFileSync(join(resultsDir, 'two-versions.json'), JSON.stringify(summary, null, 2))

const artifacts = '/opt/cursor/artifacts'
if (existsSync(artifacts)) {
  copyFileSync(join(resultsDir, 'two-versions.png'), join(artifacts, 'griffel-two-versions-one-page.png'))
  copyFileSync(join(resultsDir, 'two-versions.json'), join(artifacts, 'griffel-two-versions-one-page.json'))
}

const a = summary.runtimeBuild.audit
console.log(
  [
    `[runtime build] Griffel rules on page: ${a.totalRules} (${a.distinctSelectors} distinct selectors, ${a.duplicateRuleTexts} exact duplicates — identical rules inserted by both runtime copies)`,
    `[runtime build] Selectors with two meanings (collisions): ${a.collisions.length}`,
    `[runtime build] Runtime <style> buckets: ${a.runtimeStyleElements} from ${a.renderers} Griffel runtime copies, globally ordered: ${a.bucketsInOrder} → ${a.bucketSequence.join(' ')}`,
    `[runtime build] Atomic classes on v1 buttons: ${a.v1ClassCount}, on v2 buttons: ${a.v2ClassCount}, shared: ${a.sharedClasses.length}, v1-only: ${a.v1OnlyClasses.length}, v2-only: ${a.v2OnlyClasses.length}`,
    `[runtime build] Buttons measured: ${summary.runtimeBuild.buttons.length}; hover: ${JSON.stringify(summary.runtimeBuild.hover)}`,
    `[extract build] collisions: ${summary.extractBuild.audit.collisions.length}; mixed-mode hazard reproduced: ${summary.extractBuild.mixedModeHazard.overrideLostToRuntimeReset} (override font-size=${summary.extractBuild.mixedModeHazard.overrideFontSize})`,
    failures.length ? `FAILURES (${failures.length}):\n${JSON.stringify(failures, null, 2)}` : 'All checks passed.',
  ].join('\n'),
)

process.exit(failures.length ? 1 : 0)
