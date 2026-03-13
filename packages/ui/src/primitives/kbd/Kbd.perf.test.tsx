import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {KBD} from './Kbd'

registerPerfReportHook()

describe('Performance – KBD', {timeout: TEST_TIMEOUT_MS}, () => {
  it('KBD should mount within threshold', () => {
    const metrics = measureRender(<KBD>⌘</KBD>, 'KBD')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
