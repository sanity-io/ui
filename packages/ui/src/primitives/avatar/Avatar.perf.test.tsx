import {describe, expect, it} from 'vitest'

import {
  measureRender,
  MOUNT_THRESHOLD_MS,
  registerPerfReportHook,
  TEST_TIMEOUT_MS,
} from '$test/perf'

import {Avatar} from './Avatar'
import {AvatarCounter} from './AvatarCounter'

registerPerfReportHook()

describe('Performance – Avatar', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Avatar should mount within threshold', () => {
    const metrics = measureRender(<Avatar initials="AB" size={1} />, 'Avatar')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })

  it('AvatarCounter should mount within threshold', () => {
    const metrics = measureRender(<AvatarCounter count={5} />, 'AvatarCounter')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })
})
