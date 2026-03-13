import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Badge} from '../badge/Badge'

import {Inline} from './Inline'

registerPerfReportHook()

describe('Performance – Inline', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Inline should mount within threshold', () => {
    const metrics = measureRender(
      <Inline gap={2}>
        <Badge>A</Badge>
        <Badge>B</Badge>
        <Badge>C</Badge>
      </Inline>,
      'Inline',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
