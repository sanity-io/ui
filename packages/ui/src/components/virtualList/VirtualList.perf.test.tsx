import {describe, expect, it} from 'vitest'

import {
  measureRender,
  MOUNT_THRESHOLD_MS,
  registerPerfReportHook,
  TEST_TIMEOUT_MS,
} from '$test/perf'

import {VirtualList} from './VirtualList'

registerPerfReportHook()

describe('Performance – VirtualList', {timeout: TEST_TIMEOUT_MS}, () => {
  it('VirtualList should mount within threshold', () => {
    const items = Array.from({length: 100}, (_, i) => ({id: String(i), label: `Item ${i}`}))
    const metrics = measureRender(
      <VirtualList items={items} renderItem={(item) => <div>{item.label}</div>} />,
      'VirtualList',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
