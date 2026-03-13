import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Label} from './Label'

registerPerfReportHook()

describe('Performance – Label', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Label should mount within threshold', () => {
    const metrics = measureRender(<Label size={1}>Field label</Label>, 'Label')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
