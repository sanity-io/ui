// oxlint-disable no-console, no-await-in-loop -- CLI script: reports to stdout and measures one story render at a time
/**
 * Render performance of two static Storybook builds (production React and styled-components).
 *
 *   pnpm css-stats:bench <baseline-storybook-static> <candidate-storybook-static>
 *
 * Per story: a cold render (no class of the story generated yet, so styled-components evaluates,
 * compiles and injects all of its CSS), then warm remounts (every class cached). Records the time
 * until Storybook reports the story as rendered plus a forced layout, and Chrome's script, style
 * recalculation and layout durations. The builds alternate within every round to spread machine
 * noise evenly; the medians over `BENCH_ROUNDS` rounds are reported.
 */
import path from 'node:path'

import {chromium, type Browser, type CDPSession, type Page} from 'playwright'

import {cacheRemoteRequests, serveStatic, waitForStory} from './storybook.ts'

const STORIES = (
  process.env.BENCH_STORIES ??
  'tests-tones--default,primitives-card--matrix-as-button,primitives-card--with-buttons-and-tones,primitives-button--tones,primitives-button--modes,primitives-text--sizes,primitives-textinput--input-states,primitives-checkbox--multiple-tones,components-menu--default,components-autocomplete--default'
).split(',')
const ROUNDS = Number(process.env.BENCH_ROUNDS ?? 7)
const WARM_REMOUNTS = Number(process.env.BENCH_REMOUNTS ?? 5)
const WARMUP_STORY = 'primitives-spinner--default'
const KEYS = [
  'coldWall',
  'coldScript',
  'coldRecalcStyle',
  'coldLayout',
  'warmWall',
  'warmScript',
  'warmRecalcStyle',
  'warmLayout',
] as const

type Sample = Record<(typeof KEYS)[number], number>

/** Emits a Storybook channel event and resolves with the time until the story has rendered. */
function renderStory(page: Page, event: 'setCurrentStory' | 'forceRemount', storyId: string) {
  return page.evaluate(
    ([eventName, id]) =>
      new Promise<number>((resolve) => {
        const channel = window.__STORYBOOK_ADDONS_CHANNEL__
        if (!channel) throw new Error('Not a Storybook preview')
        const start = performance.now()
        const done = (renderedId: string) => {
          if (renderedId !== id) return
          channel.off('storyRendered', done)
          // Include the style recalculation and layout of what was rendered
          void document.body.offsetHeight
          resolve(performance.now() - start)
        }
        channel.on('storyRendered', done)
        channel.emit(eventName, {storyId: id, viewMode: 'story'})
      }),
    [event, storyId] as const,
  )
}

async function durations(cdp: CDPSession) {
  const {metrics} = await cdp.send('Performance.getMetrics')
  const value = (name: string) =>
    (metrics.find((metric) => metric.name === name)?.value ?? 0) * 1000
  return {
    script: value('ScriptDuration'),
    recalcStyle: value('RecalcStyleDuration'),
    layout: value('LayoutDuration'),
  }
}

async function measure(browser: Browser, url: string, story: string): Promise<Sample> {
  const context = await browser.newContext({viewport: {width: 1280, height: 900}})
  await cacheRemoteRequests(context)
  const page = await context.newPage()
  const cdp = await context.newCDPSession(page)
  await cdp.send('Performance.enable')

  // Render the measured story in a preview that has only rendered a trivial story before, so
  // none of its classes exist yet
  await page.goto(`${url}/iframe.html?viewMode=story&id=${WARMUP_STORY}&globals=theme:light`)
  await waitForStory(page)

  const before = await durations(cdp)
  const coldWall = await renderStory(page, 'setCurrentStory', story)
  const cold = await durations(cdp)

  let warmWall = 0
  for (let i = 0; i < WARM_REMOUNTS; i++) {
    warmWall += await renderStory(page, 'forceRemount', story)
  }
  const warm = await durations(cdp)
  await context.close()

  return {
    coldWall,
    coldScript: cold.script - before.script,
    coldRecalcStyle: cold.recalcStyle - before.recalcStyle,
    coldLayout: cold.layout - before.layout,
    warmWall: warmWall / WARM_REMOUNTS,
    warmScript: (warm.script - cold.script) / WARM_REMOUNTS,
    warmRecalcStyle: (warm.recalcStyle - cold.recalcStyle) / WARM_REMOUNTS,
    warmLayout: (warm.layout - cold.layout) / WARM_REMOUNTS,
  }
}

function median(values: number[]) {
  return values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)]
}

const [baselineDir, candidateDir] = process.argv.slice(2)
if (!baselineDir || !candidateDir) {
  throw new Error('usage: bench.ts <baseline-storybook-static> <candidate-storybook-static>')
}

const builds = {
  baseline: await serveStatic(path.resolve(baselineDir)),
  candidate: await serveStatic(path.resolve(candidateDir)),
}
const browser = await chromium.launch()
const samples = new Map<string, {baseline: Sample[]; candidate: Sample[]}>(
  STORIES.map((story) => [story, {baseline: [], candidate: []}]),
)

try {
  for (let round = 0; round < ROUNDS; round++) {
    const order =
      round % 2 ? (['candidate', 'baseline'] as const) : (['baseline', 'candidate'] as const)
    for (const story of STORIES) {
      for (const name of order) {
        // A story that navigates while it renders fails the sample; measure it again
        const sample = await measure(browser, builds[name].url, story).catch(() =>
          measure(browser, builds[name].url, story),
        )
        samples.get(story)?.[name].push(sample)
      }
    }
    console.log(`round ${round + 1}/${ROUNDS}`)
  }
} finally {
  await browser.close()
  builds.baseline.close()
  builds.candidate.close()
}

const totals = Object.fromEntries(KEYS.map((key) => [key, {baseline: 0, candidate: 0}]))
console.log(`| Story | ${KEYS.join(' | ')} |`)
console.log(`| --- | ${KEYS.map(() => '--:').join(' | ')} |`)
for (const [story, {baseline, candidate}] of samples) {
  const cells = KEYS.map((key) => {
    const a = median(baseline.map((sample) => sample[key]))
    const b = median(candidate.map((sample) => sample[key]))
    totals[key].baseline += a
    totals[key].candidate += b
    return `${a.toFixed(0)} → ${b.toFixed(0)}`
  })
  console.log(`| ${story} | ${cells.join(' | ')} |`)
}
const sums = KEYS.map((key) => {
  const {baseline, candidate} = totals[key]
  const change = baseline ? `${(((candidate - baseline) / baseline) * 100).toFixed(0)}%` : '–'
  return `**${baseline.toFixed(0)} → ${candidate.toFixed(0)} (${change})**`
})
console.log(`| **Sum** | ${sums.join(' | ')} |`)
