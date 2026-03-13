import {AddIcon} from '@sanity/icons'
import {describe, expect, it} from 'vitest'

import {measureRender, MOUNT_THRESHOLD_MS, registerPerfReportHook, TEST_TIMEOUT_MS} from '$test/perf'

import {Stack} from '../stack/Stack'

import {Button} from './Button'

registerPerfReportHook()

describe('Performance – Button', {timeout: TEST_TIMEOUT_MS}, () => {
  it('Button should mount within threshold', () => {
    const metrics = measureRender(
      <Button icon={AddIcon} text="Click me" tone="primary" />,
      'Button',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })

  it('Button with loading state should mount within threshold', () => {
    const metrics = measureRender(<Button loading text="Loading" />, 'Button-loading')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS)
  })

  it('many Buttons should render efficiently', () => {
    const buttons = Array.from({length: 50}, (_, i) => (
      <Button key={i} text={`Button ${i}`} mode={i % 3 === 0 ? 'ghost' : 'default'} />
    ))
    const metrics = measureRender(<Stack gap={1}>{buttons}</Stack>, 'Button-50-items')
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS * 5)
  })
})
