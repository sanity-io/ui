import {describe, expect, it} from 'vitest'

import {
  measureRender,
  MOUNT_THRESHOLD_MS,
  registerPerfReportHook,
  TEST_TIMEOUT_MS,
} from '$test/perf'

import {Tree} from './Tree'
import {TreeItem} from './TreeItem'

registerPerfReportHook()

describe('Performance – Tree', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Tree should mount within threshold', () => {
    const metrics = measureRender(
      <Tree>
        <TreeItem text="Item 1" />
        <TreeItem text="Item 2" />
        <TreeItem text="Item 3" />
      </Tree>,
      'Tree',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
