import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Select} from './Select'

registerPerfReportHook()

describe('Performance – Select', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Select should mount within threshold', () => {
    const options = Array.from({length: 20}, (_, i) => (
      <option key={i} value={String(i)}>{`Option ${i}`}</option>
    ))
    const metrics = measureRender(<Select>{options}</Select>, 'Select')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
