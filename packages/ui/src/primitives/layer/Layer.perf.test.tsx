import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Card} from '../card/Card'
import {Text} from '../text/Text'

import {Layer} from './Layer'

registerPerfReportHook()

describe('Performance – Layer', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Layer should mount within threshold', () => {
    const metrics = measureRender(
      <Layer>
        <Card padding={3}>
          <Text>Layer content</Text>
        </Card>
      </Layer>,
      'Layer',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
