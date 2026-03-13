import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Switch} from './Switch'

registerPerfReportHook()

describe('Performance – Switch', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Switch should mount within threshold', () => {
    const metrics = measureRender(<Switch />, 'Switch')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
