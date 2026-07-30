/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Inline} from '../../primitives/inline/inline'
import {Hotkeys} from './hotkeys'

vi.mock('../../primitives/inline/inline', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/inline/inline')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Inline: vi.fn((props: Record<string, unknown>) => (actual.Inline as any)(props)),
  }
})

describe('components/hotkeys spacing', () => {
  const mockedInline = vi.mocked(Inline)

  beforeEach(() => {
    mockedInline.mockClear()
  })

  it('should support `gap`', () => {
    render(<Hotkeys gap={2} keys={['Ctrl', 'S']} />)
    expect(mockedInline.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: [2]}),
    )
  })
})
