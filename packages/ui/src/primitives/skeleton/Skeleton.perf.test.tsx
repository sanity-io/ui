import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Skeleton} from './Skeleton'

registerPerfReportHook()

describe('Performance – Skeleton', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Skeleton should mount within threshold', () => {
    const metrics = measureRender(
      <Skeleton style={{width: 200, height: 20}} radius={2} />,
      'Skeleton',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
