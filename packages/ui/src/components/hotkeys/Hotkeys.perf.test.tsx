import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Hotkeys} from './Hotkeys'

registerPerfReportHook()

describe('Performance – Hotkeys', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Hotkeys should mount within threshold', () => {
    const metrics = measureRender(<Hotkeys keys={['⌘', 'S']} />, 'Hotkeys')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
