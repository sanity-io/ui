import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Spinner} from './Spinner'

registerPerfReportHook()

describe('Performance – Spinner', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Spinner should mount within threshold', () => {
    const metrics = measureRender(<Spinner />, 'Spinner')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
