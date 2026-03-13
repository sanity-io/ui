import {SearchIcon} from '@sanity/icons'
import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {TextInput} from './TextInput'

registerPerfReportHook()

describe('Performance – TextInput', {timeout: TEST_TIMEOUT_MS}, () => {
  it('TextInput should mount within threshold', () => {
    const metrics = measureRender(
      <TextInput icon={SearchIcon} placeholder="Search…" />,
      'TextInput',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
