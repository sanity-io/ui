import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Box} from '../box/Box'
import {Text} from '../text/Text'

import {Stack} from './Stack'

registerPerfReportHook()

describe('Performance – Stack', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Stack should mount within threshold', () => {
    const metrics = measureRender(
      <Stack gap={3}>
        <Box>a</Box>
        <Box>b</Box>
        <Box>c</Box>
      </Stack>,
      'Stack',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })

  it('Stack should handle many children efficiently', () => {
    const children = Array.from({length: 200}, (_, i) => <Text key={i}>{`Item ${i}`}</Text>)
    const metrics = measureRender(<Stack gap={2}>{children}</Stack>, 'Stack-200-children')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS * 5)
  })
})
