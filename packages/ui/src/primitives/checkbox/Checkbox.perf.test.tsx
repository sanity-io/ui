import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Checkbox} from './Checkbox'

registerPerfReportHook()

describe('Performance – Checkbox', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Checkbox should mount within threshold', () => {
    const metrics = measureRender(<Checkbox />, 'Checkbox')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
