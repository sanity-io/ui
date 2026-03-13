import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Radio} from './Radio'

registerPerfReportHook()

describe('Performance – Radio', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Radio should mount within threshold', () => {
    const metrics = measureRender(<Radio />, 'Radio')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
