import {PerfTest} from './types'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** @internal */
export async function _runTest(
  test: PerfTest,
  target: unknown
): Promise<{
  avgDuration: number
  sumDuration: number
  runs: number
}> {
  // // Do a run to heat up the browser
  // await test.run({target})

  const runs = 1

  performance.clearMarks()
  performance.clearMeasures()

  for (let i = 0; i < runs; i += 1) {
    performance.mark(`start:${test.name}`)

    await test.run({target})

    performance.mark(`end:${test.name}`)
    performance.measure(test.name, `start:${test.name}`, `end:${test.name}`)

    // sleep
    await delay(100)
  }

  const perfEntries = performance.getEntriesByName(test.name)
  const sumDuration = perfEntries.reduce((t, e) => t + e.duration, 0)
  const avgDuration = sumDuration / runs

  return {avgDuration, sumDuration, runs}
}
