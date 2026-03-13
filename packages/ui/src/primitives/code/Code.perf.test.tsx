import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Code} from './Code'

registerPerfReportHook()

describe('Performance – Code', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Code should mount within threshold', () => {
    const metrics = measureRender(<Code>{'const x = 1'}</Code>, 'Code')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
