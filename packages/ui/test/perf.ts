import * as fs from 'node:fs'
import * as path from 'node:path'
import {createElement, Profiler, type ProfilerOnRenderCallback} from 'react'
import {afterAll} from 'vitest'

import {render} from '$test/utils'

// Per-test timeout in ms — applies to the test body AND lifecycle hooks
// (beforeEach / afterEach). If a component hangs during mount or cleanup,
// that is a real bug and should surface as a failure.
export const TEST_TIMEOUT_MS = 5_000

// jsdom is significantly slower than a real browser, so use a generous
// per-component threshold. The goal is regression detection, not an
// absolute benchmark.
export const MOUNT_THRESHOLD_MS = 200

export interface RenderMetrics {
  actualDuration: number
  baseDuration: number
  startTime: number
  commitTime: number
}

export interface ReportEntry {
  component: string
  actualDuration: number
  baseDuration: number
  heapUsedBefore: number
  heapUsedAfter: number
  heapDelta: number
  status: 'pass' | 'fail' | 'error'
  error?: string
}

export const report: ReportEntry[] = []

export function measureRender(component: React.ReactElement, testName: string): RenderMetrics {
  let metrics: RenderMetrics | undefined

  const onRender: ProfilerOnRenderCallback = (
    _id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
    if (phase === 'mount' && !metrics) {
      metrics = {actualDuration, baseDuration, startTime, commitTime}
    }
  }

  const gcAvailable = typeof global.gc === 'function'
  if (gcAvailable) global.gc()
  const heapBefore = process.memoryUsage().heapUsed

  try {
    render(createElement(Profiler, {id: testName, onRender}, component))
  } catch (err) {
    if (gcAvailable) global.gc()
    const heapAfter = process.memoryUsage().heapUsed
    report.push({
      component: testName,
      actualDuration: -1,
      baseDuration: -1,
      heapUsedBefore: heapBefore,
      heapUsedAfter: heapAfter,
      heapDelta: heapAfter - heapBefore,
      status: 'error',
      error: err instanceof Error ? err.message : String(err),
    })
    throw err
  }

  if (gcAvailable) global.gc()
  const heapAfter = process.memoryUsage().heapUsed

  if (!metrics) {
    report.push({
      component: testName,
      actualDuration: -1,
      baseDuration: -1,
      heapUsedBefore: heapBefore,
      heapUsedAfter: heapAfter,
      heapDelta: heapAfter - heapBefore,
      status: 'error',
      error: 'No mount metrics captured',
    })
    throw new Error(`No mount metrics captured for "${testName}"`)
  }

  report.push({
    component: testName,
    actualDuration: metrics.actualDuration,
    baseDuration: metrics.baseDuration,
    heapUsedBefore: heapBefore,
    heapUsedAfter: heapAfter,
    heapDelta: heapAfter - heapBefore,
    status: 'pass',
  })

  return metrics
}

function formatBytes(bytes: number): string {
  if (Math.abs(bytes) < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (Math.abs(kb) < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

function writeReport() {
  const lines: string[] = []
  const now = new Date().toISOString()

  lines.push('# Sanity UI – Component Performance Report')
  lines.push('')
  lines.push(`Generated: ${now}`)
  lines.push(`Environment: jsdom (vitest)`)
  lines.push(`Node: ${process.version}`)
  lines.push(
    `GC available: ${typeof global.gc === 'function' ? 'yes (--expose-gc)' : 'no — heap deltas may be inaccurate due to GC noise'}`,
  )
  lines.push('')
  lines.push('## Render Times')
  lines.push('')
  lines.push('| Component | Actual Duration (ms) | Base Duration (ms) | Heap Δ | Status |')
  lines.push('| :--- | ---: | ---: | ---: | :---: |')

  for (const entry of report) {
    const actual = entry.actualDuration >= 0 ? entry.actualDuration.toFixed(2) : '—'
    const base = entry.baseDuration >= 0 ? entry.baseDuration.toFixed(2) : '—'
    const delta = formatBytes(entry.heapDelta)
    const status = entry.status === 'pass' ? '✅' : entry.status === 'error' ? '💥' : '❌'
    const note = entry.error ? ` (${entry.error})` : ''
    lines.push(`| ${entry.component}${note} | ${actual} | ${base} | ${delta} | ${status} |`)
  }

  lines.push('')
  lines.push('## Summary')
  lines.push('')

  const passing = report.filter((e) => e.status === 'pass')
  const failing = report.filter((e) => e.status !== 'pass')

  if (passing.length > 0) {
    const durations = passing.map((e) => e.actualDuration)
    const heaps = passing.map((e) => e.heapDelta)
    const totalDuration = durations.reduce((a, b) => a + b, 0)
    const avgDuration = totalDuration / durations.length
    const maxDuration = Math.max(...durations)
    const maxEntry = passing.find((e) => e.actualDuration === maxDuration)!
    const totalHeap = heaps.reduce((a, b) => a + b, 0)

    lines.push(`- **${passing.length}** components measured`)
    lines.push(`- **Total render time:** ${totalDuration.toFixed(2)} ms`)
    lines.push(`- **Average render time:** ${avgDuration.toFixed(2)} ms`)
    lines.push(`- **Slowest component:** ${maxEntry.component} (${maxDuration.toFixed(2)} ms)`)
    lines.push(`- **Total heap delta:** ${formatBytes(totalHeap)}`)
  }

  if (failing.length > 0) {
    lines.push(`- **${failing.length}** component(s) failed or errored`)
  }

  lines.push('')

  const markdown = lines.join('\n')
  const reportPath = path.resolve(__dirname, '..', 'performance-report.md')
  fs.writeFileSync(reportPath, markdown, 'utf-8')

  // Also print to console
  // eslint-disable-next-line no-console
  console.log(`\n${markdown}`)
  // eslint-disable-next-line no-console
  console.log(`Report written to ${reportPath}\n`)
}

/**
 * Call this in any perf test file to register the afterAll hook that writes
 * the shared performance report.
 */
export function registerPerfReportHook() {
  afterAll(() => {
    writeReport()
  })
}
