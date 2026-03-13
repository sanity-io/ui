import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Text} from './Text'

registerPerfReportHook()

describe('Performance – Text', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Text should mount within threshold', () => {
    const metrics = measureRender(
      <Text size={2} weight="semibold">
        Hello world
      </Text>,
      'Text',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
