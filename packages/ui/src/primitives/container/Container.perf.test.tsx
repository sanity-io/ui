import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Text} from '../text/Text'

import {Container} from './Container'

registerPerfReportHook()

describe('Performance – Container', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Container should mount within threshold', () => {
    const metrics = measureRender(
      <Container width={1}>
        <Text>Contained content</Text>
      </Container>,
      'Container',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
