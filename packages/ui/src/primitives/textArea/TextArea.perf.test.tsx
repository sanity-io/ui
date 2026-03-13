import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {TextArea} from './TextArea'

registerPerfReportHook()

describe('Performance – TextArea', {timeout: TEST_TIMEOUT_MS}, () => {
  it('TextArea should mount within threshold', () => {
    const metrics = measureRender(<TextArea rows={4} placeholder="Write something…" />, 'TextArea')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
