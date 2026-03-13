import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Badge} from './Badge'

registerPerfReportHook()

describe('Performance – Badge', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Badge should mount within threshold', () => {
    const metrics = measureRender(<Badge tone="positive">Published</Badge>, 'Badge')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
