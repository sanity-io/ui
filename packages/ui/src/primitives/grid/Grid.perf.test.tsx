import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Box} from '../box/Box'

import {Grid} from './Grid'

registerPerfReportHook()

describe('Performance – Grid', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Grid should mount within threshold', () => {
    const metrics = measureRender(
      <Grid gridTemplateColumns={3} gap={2}>
        {Array.from({length: 9}, (_, i) => (
          <Box key={i} padding={2}>
            {i}
          </Box>
        ))}
      </Grid>,
      'Grid',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
