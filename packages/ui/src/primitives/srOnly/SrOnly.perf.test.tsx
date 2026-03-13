import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {SrOnly} from './SrOnly'

registerPerfReportHook()

describe('Performance – SrOnly', {timeout: TEST_TIMEOUT_MS}, () => {
  it('SrOnly should mount within threshold', () => {
    const metrics = measureRender(<SrOnly>Screen reader text</SrOnly>, 'SrOnly')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
