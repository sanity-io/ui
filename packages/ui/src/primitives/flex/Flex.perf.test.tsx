import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Box} from '../box/Box'

import {Flex} from './Flex'

registerPerfReportHook()

describe('Performance – Flex', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Flex should mount within threshold', () => {
    const metrics = measureRender(
      <Flex gap={2}>
        <Box>a</Box>
        <Box>b</Box>
      </Flex>,
      'Flex',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
