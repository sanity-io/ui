import {Page} from 'puppeteer/lib/cjs/puppeteer/common/Page'

export type MeasureFn = (name: string, fn: () => Promise<void>) => Promise<number>

export interface Measurer {
  getMeasurements: () => {[key: string]: number[]}
  measure: MeasureFn
}

export interface Test {
  name: string
  fn: (page: Page, measure: MeasureFn) => Promise<void>
}

export type Measurements = {[key: string]: number[]}

export function createMeasurer(): Measurer {
  const measurements: Measurements = {}

  return {
    getMeasurements() {
      return measurements
    },

    async measure(name: string, fn: () => Promise<void>) {
      if (!measurements[name]) {
        measurements[name] = []
      }

      const startTime = process.hrtime()

      await fn()

      const diff = process.hrtime(startTime)
      const ms = diff[0] * 1000 + diff[1] / 1000000

      measurements[name].push(ms)

      return ms
    },
  }
}

export const tests: Test[] = []

export function test(name: string, fn: (page: Page, measure: MeasureFn) => Promise<void>) {
  tests.push({name, fn})
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
