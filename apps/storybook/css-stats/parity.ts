// oxlint-disable no-console, no-await-in-loop -- CLI script: reports to stdout and drives one browser page at a time
/**
 * Visual parity check between two static Storybook builds (`storybook build`).
 *
 *   pnpm css-stats:parity capture <storybook-static> <out-dir>
 *   pnpm css-stats:parity compare <baseline-out-dir> <candidate-out-dir> [<baseline-rerun-out-dir>]
 *
 * `capture` renders every story that runs as a browser test, in both color schemes and at two
 * viewport widths, finishes transitions, pauses infinite animations and records:
 * - per element, a hash of its attributes (except `class`) and of the computed styles (every
 *   property, custom properties included) of the element, its ::before, ::after and ::placeholder
 * - with :hover, :active, :hover:active, :focus and :focus:focus-visible forced through the
 *   DevTools protocol on interactive elements, the same for the subtree of the element's parent,
 *   which covers sibling selectors such as `input:focus + span`
 * - a full-page screenshot per story and scheme (desktop viewport)
 *
 * `compare` reports every value and screenshot that differs. Values that also differ between
 * the baseline and a second capture of the same baseline build are reported as nondeterministic
 * instead. `PARITY_RAW=1` captures the full styles instead of hashes, so that `compare` lists the
 * properties that differ; `PARITY_FILTER=<story id part>` limits the stories.
 */
import fs from 'node:fs'
import path from 'node:path'

import {chromium, type CDPSession, type Page} from 'playwright'

import {cacheRemoteRequests, serveStatic, testedStories, waitForStory} from './storybook.ts'

const VIEWPORTS = [
  {name: 'desktop', width: 1280, height: 900},
  {name: 'mobile', width: 400, height: 800},
]
const SCHEMES = ['dark', 'light']
const STATES = [['hover'], ['active'], ['hover', 'active'], ['focus'], ['focus', 'focus-visible']]
const INTERACTIVE =
  'button, a[href], input, select, textarea, label, [tabindex], [role="button"], [role="menuitem"], [role="tab"], [role="treeitem"], [role="option"], [data-as="button"], [data-as="a"]'
const MAX_INTERACTIVE_PER_RENDER = 60
const RAW = Boolean(process.env.PARITY_RAW)

type Capture = Record<string, string>

/**
 * In the page: one entry per element of the subtree, keyed by its index path from `<body>`.
 * Serialized into the page, so it must not reference anything outside of itself.
 */
function captureSubtree(this: unknown, options: {selector: string; raw: boolean}) {
  const root = this instanceof Element ? this : document.querySelector(options.selector)
  if (!root) return {}

  // Forcing a state starts transitions; read their end state
  for (const animation of document.getAnimations()) {
    if (animation.effect?.getComputedTiming().endTime === Infinity) {
      animation.pause()
      animation.currentTime = 0
    } else {
      animation.finish()
    }
  }

  function hash(input: string) {
    let h1 = 0x811c9dc5
    let h2 = 5381
    for (let i = 0; i < input.length; i++) {
      const c = input.charCodeAt(i)
      h1 = Math.imul(h1 ^ c, 0x01000193)
      h2 = (Math.imul(h2, 33) ^ c) | 0
    }
    return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36)
  }

  function styleString(element: Element, pseudo: string | null) {
    const style = getComputedStyle(element, pseudo)
    if (pseudo && pseudo !== '::placeholder' && ['none', 'normal'].includes(style.content)) {
      return ''
    }
    // Custom properties are enumerated in no particular order
    const declarations: string[] = []
    for (let i = 0; i < style.length; i++) {
      declarations.push(`${style[i]}:${style.getPropertyValue(style[i])}`)
    }
    return declarations.toSorted().join(';')
  }

  function pathOf(element: Element) {
    const parts: string[] = []
    let node: Element | null = element
    while (node && node !== document.body && node.parentElement) {
      const index = Array.prototype.indexOf.call(node.parentElement.children, node)
      parts.push(`${node.tagName.toLowerCase()}${index}`)
      node = node.parentElement
    }
    return parts.reverse().join('/')
  }

  const result: Record<string, string> = {}
  for (const element of [root, ...root.querySelectorAll('*')]) {
    if (element.closest('script, style, link, meta, noscript')) continue
    const attributes = [...element.attributes]
      .filter((attribute) => attribute.name !== 'class')
      .map((attribute) => `${attribute.name}=${attribute.value}`)
      .toSorted()
      .join('|')
    const styles = [
      styleString(element, null),
      styleString(element, '::before'),
      styleString(element, '::after'),
      element.matches('input, textarea') ? styleString(element, '::placeholder') : '',
    ]
    result[pathOf(element)] = options.raw
      ? [attributes, ...styles].join('\n')
      : `${hash(attributes)}:${styles.map(hash).join(',')}`
  }
  return result
}

async function settle(page: Page) {
  // Load every declared face up front: a weight that only appears after forcing a state would
  // otherwise swap in mid-capture and change text metrics
  await page.evaluate(async () => {
    await Promise.all([...document.fonts].map((font) => font.load().catch(() => undefined)))
    await document.fonts.ready
  })
  await page.waitForTimeout(400)
}

async function captureStates(page: Page, cdp: CDPSession, out: Capture, prefix: string) {
  const {root} = await cdp.send('DOM.getDocument', {depth: -1})
  const {nodeIds} = await cdp.send('DOM.querySelectorAll', {
    nodeId: root.nodeId,
    selector: INTERACTIVE.split(', ')
      .map((selector) => `body ${selector}`)
      .join(', '),
  })

  // Both builds render the same markup, so the first elements in document order are the same
  // elements in both, including variants that differ only by their generated classes
  const picked = nodeIds.slice(0, MAX_INTERACTIVE_PER_RENDER).map((_, index) => index)

  for (const index of picked) {
    const nodeId = nodeIds[index]
    for (const state of STATES) {
      await cdp.send('CSS.forcePseudoState', {nodeId, forcedPseudoClasses: state})
      const {object} = await cdp.send('DOM.resolveNode', {nodeId})
      const {result} = await cdp.send('Runtime.callFunctionOn', {
        objectId: object.objectId,
        // The element's subtree and its next sibling's, which sibling selectors (`input:checked +
        // span`) style; the whole parent's subtree is quadratic in lists
        functionDeclaration: `function () { const capture = ${captureSubtree.toString()}; const options = {selector: 'body', raw: ${RAW}}; return Object.assign(capture.call(this, options), this.nextElementSibling ? capture.call(this.nextElementSibling, options) : {}) }`,
        returnByValue: true,
      })
      await cdp.send('CSS.forcePseudoState', {nodeId, forcedPseudoClasses: []})
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      for (const [elementPath, value] of Object.entries(result.value as Capture)) {
        out[`${prefix}|${index}:${state.join('+')}|${elementPath}`] = value
      }
    }
  }
}

async function capture(dir: string, outDir: string) {
  const filter = process.env.PARITY_FILTER
  const stories = testedStories(dir).filter((id) => !filter || id.includes(filter))
  const server = await serveStatic(dir)
  const browser = await chromium.launch()
  const values: Capture = {}
  const errors: string[] = []
  fs.mkdirSync(path.join(outDir, 'screenshots'), {recursive: true})

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: {width: viewport.width, height: viewport.height},
        deviceScaleFactor: 1,
      })
      await cacheRemoteRequests(context)
      const page = await context.newPage()
      const cdp = await context.newCDPSession(page)
      await cdp.send('DOM.enable')
      await cdp.send('CSS.enable')
      await cdp.send('Emulation.setEmulatedMedia', {features: [{name: 'hover', value: 'hover'}]})

      for (const story of stories) {
        for (const scheme of SCHEMES) {
          const prefix = `${story}|${scheme}|${viewport.name}`
          try {
            await page.goto(
              `${server.url}/iframe.html?viewMode=story&id=${story}&globals=theme:${scheme}`,
            )
            await waitForStory(page)
            await settle(page)
            const base = await page.evaluate(captureSubtree, {selector: 'body', raw: RAW})
            for (const [elementPath, value] of Object.entries(base)) {
              values[`${prefix}|base|${elementPath}`] = value
            }
            if (viewport.name === 'desktop') {
              await page.screenshot({
                path: path.join(outDir, 'screenshots', `${story}--${scheme}.png`),
                fullPage: true,
                animations: 'disabled',
                caret: 'hide',
              })
              await captureStates(page, cdp, values, prefix)
            }
          } catch (err) {
            errors.push(
              `${prefix}: ${err instanceof Error ? err.message.split('\n')[0] : String(err)}`,
            )
          }
        }
      }
      await context.close()
    }
  } finally {
    await browser.close()
    server.close()
  }

  fs.writeFileSync(path.join(outDir, 'capture.json'), JSON.stringify({errors, values}))
  console.log(`captured ${Object.keys(values).length} values, ${errors.length} errors`)
  for (const error of errors) console.log(`  ${error}`)
}

function load(dir: string): {errors: string[]; values: Capture} {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return JSON.parse(fs.readFileSync(path.join(dir, 'capture.json'), 'utf8')) as {
    errors: string[]
    values: Capture
  }
}

function describeRaw(a: string, b: string) {
  const lines: string[] = []
  const [aAttributes, ...aStyles] = a.split('\n')
  const [bAttributes, ...bStyles] = b.split('\n')
  if (aAttributes !== bAttributes) lines.push(`    attributes: ${aAttributes} -> ${bAttributes}`)
  for (const [i, target] of ['element', '::before', '::after', '::placeholder'].entries()) {
    const aDeclarations = new Map(aStyles[i]?.split(';').map((d) => [d.split(':')[0], d]))
    const bDeclarations = new Map(bStyles[i]?.split(';').map((d) => [d.split(':')[0], d]))
    for (const property of new Set([...aDeclarations.keys(), ...bDeclarations.keys()])) {
      if (aDeclarations.get(property) !== bDeclarations.get(property)) {
        lines.push(
          `    ${target} ${aDeclarations.get(property) ?? '(none)'} -> ${bDeclarations.get(property) ?? '(none)'}`,
        )
      }
    }
  }
  return lines
}

function compare(baselineDir: string, candidateDir: string, rerunDir?: string) {
  const baseline = load(baselineDir)
  const candidate = load(candidateDir)
  const rerun = rerunDir ? load(rerunDir) : undefined
  const differences: string[] = []
  const nondeterministic: string[] = []

  for (const key of new Set([...Object.keys(baseline.values), ...Object.keys(candidate.values)])) {
    const a = baseline.values[key]
    const b = candidate.values[key]
    if (a === b) continue
    if (rerun && rerun.values[key] !== a) {
      nondeterministic.push(key)
      continue
    }
    differences.push(`  ${key}`)
    if (a?.includes('\n') && b?.includes('\n')) differences.push(...describeRaw(a, b))
  }

  const screenshotDir = (dir: string) => path.join(dir, 'screenshots')
  const screenshots = fs.readdirSync(screenshotDir(baselineDir))
  const screenshotDifferences = screenshots.filter((name) => {
    const b = path.join(screenshotDir(candidateDir), name)
    // Same pixels encode to the same PNG bytes
    return (
      !fs.existsSync(b) ||
      !fs.readFileSync(path.join(screenshotDir(baselineDir), name)).equals(fs.readFileSync(b))
    )
  })

  console.log(
    `baseline: ${Object.keys(baseline.values).length} values, ${baseline.errors.length} errors`,
  )
  console.log(
    `candidate: ${Object.keys(candidate.values).length} values, ${candidate.errors.length} errors`,
  )
  if (rerun) console.log(`nondeterministic in the baseline: ${nondeterministic.length} values`)
  console.log(`differing values: ${differences.filter((line) => !line.startsWith('    ')).length}`)
  for (const line of differences.slice(0, 500)) console.log(line)
  console.log(`screenshots: ${screenshots.length}, differing: ${screenshotDifferences.length}`)
  for (const name of screenshotDifferences) console.log(`  ${name}`)
  const errors = [...baseline.errors, ...candidate.errors, ...(rerun?.errors ?? [])]
  for (const error of errors) console.log(`  error: ${error}`)
  process.exitCode = differences.length || screenshotDifferences.length || errors.length ? 1 : 0
}

const [command, ...args] = process.argv.slice(2)
if (command === 'capture' && args.length === 2) {
  await capture(args[0], args[1])
} else if (command === 'compare' && args.length >= 2) {
  compare(args[0], args[1], args[2])
} else {
  throw new Error(
    'usage: parity.ts capture <storybook-static> <out-dir> | compare <baseline> <candidate> [<baseline-rerun>]',
  )
}
