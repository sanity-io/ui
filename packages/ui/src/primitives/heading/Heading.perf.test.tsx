import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Heading} from './Heading'

registerPerfReportHook()

describe('Performance – Heading', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Heading should mount within threshold', () => {
    const metrics = measureRender(
      <Heading as="h1" size={3}>
        Page title
      </Heading>,
      'Heading',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
