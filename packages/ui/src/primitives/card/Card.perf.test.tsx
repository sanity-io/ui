import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Card} from './Card'
import {Text} from '../text/Text'

registerPerfReportHook()

describe('Performance – Card', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Card should mount within threshold', () => {
    const metrics = measureRender(
      <Card padding={3} radius={2} shadow={1} tone="default">
        Card content
      </Card>,
      'Card',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })

  it('Card should support nested tone changes', () => {
    const metrics = measureRender(
      <Card padding={3} tone="primary">
        <Card padding={3} tone="positive">
          <Card padding={3} tone="critical">
            <Text>Nested cards</Text>
          </Card>
        </Card>
      </Card>,
      'Card-nested',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
