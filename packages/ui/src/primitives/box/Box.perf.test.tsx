import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Box} from './Box'

registerPerfReportHook()

describe('Performance – Box', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Box should mount within threshold', () => {
    const metrics = measureRender(<Box padding={3}>content</Box>, 'Box')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })

  it('Box should handle many children efficiently', () => {
    const children = Array.from({length: 200}, (_, i) => (
      <Box key={i} padding={1}>
        {i}
      </Box>
    ))
    const metrics = measureRender(<Box>{children}</Box>, 'Box-200-children')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS * 5)
  })
})
