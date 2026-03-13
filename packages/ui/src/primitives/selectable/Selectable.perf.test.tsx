import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Selectable} from './Selectable'

registerPerfReportHook()

describe('Performance – Selectable', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Selectable should mount within threshold', () => {
    const metrics = measureRender(<Selectable>Option</Selectable>, 'Selectable')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
